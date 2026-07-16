// Lightweight, privacy-conscious analytics + lead capture on top of Firestore.
// No cookies, no third-party trackers — just page-view counts and booking leads.

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseReady } from "./firebase";

// A per-session id so we can approximate unique visitors without cookies.
function sessionId() {
  if (typeof window === "undefined") return "server";
  const key = "kc_session";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

// Record a page view. Fails silently — analytics should never break the page.
export async function trackPageView(path = "/") {
  if (!firebaseReady || !db || typeof window === "undefined") return;
  // Only count once per session per path.
  const seenKey = `kc_view_${path}`;
  if (window.sessionStorage.getItem(seenKey)) return;
  window.sessionStorage.setItem(seenKey, "1");
  try {
    await addDoc(collection(db, "pageviews"), {
      path,
      session: sessionId(),
      referrer: document.referrer || "direct",
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Page view not recorded:", err.message);
  }
}

// Save a booking / contact lead.
export async function submitLead(lead) {
  if (!firebaseReady || !db) {
    throw new Error("Firebase is not configured yet.");
  }
  return addDoc(collection(db, "leads"), {
    ...lead,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

// --- Admin reads ---

export async function fetchLeads() {
  if (!firebaseReady || !db) return [];
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchPageViews() {
  if (!firebaseReady || !db) return [];
  const q = query(collection(db, "pageviews"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateLeadStatus(id, status) {
  if (!firebaseReady || !db) return;
  await updateDoc(doc(db, "leads", id), { status });
}
