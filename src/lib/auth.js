// Admin authentication on top of Firebase Auth.
// Access to /admin requires a signed-in user whose profile document in the
// `user/{uid}` collection has role === "admin".

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, firebaseReady } from "./firebase";

// Reads the caller's profile doc and returns true only when role is "admin".
async function isAdminUser(uid) {
  if (!db || !uid) return false;
  try {
    const snap = await getDoc(doc(db, "user", uid));
    return snap.exists() && snap.data().role === "admin";
  } catch {
    return false;
  }
}

// Sign in with email + password, then confirm the account is an admin.
// Throws with a friendly message on bad credentials or a non-admin account.
export async function signInAdmin(email, password) {
  if (!firebaseReady || !auth) {
    throw new Error("Firebase isn't configured yet.");
  }
  let cred;
  try {
    cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (err) {
    const code = err?.code || "";
    if (
      code === "auth/invalid-credential" ||
      code === "auth/wrong-password" ||
      code === "auth/user-not-found" ||
      code === "auth/invalid-email"
    ) {
      throw new Error("Incorrect email or password.");
    }
    if (code === "auth/too-many-requests") {
      throw new Error("Too many attempts. Try again in a few minutes.");
    }
    throw new Error("Sign-in failed. Please try again.");
  }

  const admin = await isAdminUser(cred.user.uid);
  if (!admin) {
    await signOut(auth);
    throw new Error("This account isn't authorized for the command center.");
  }
  return cred.user;
}

export async function signOutAdmin() {
  if (auth) await signOut(auth);
}

// Subscribe to auth state and report whether the current user is an admin.
// Calls cb(true) for a signed-in admin, cb(false) otherwise. Returns the
// unsubscribe function.
export function watchAdmin(cb) {
  if (!firebaseReady || !auth) {
    cb(false);
    return () => {};
  }
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      cb(false);
      return;
    }
    cb(await isAdminUser(user.uid));
  });
}
