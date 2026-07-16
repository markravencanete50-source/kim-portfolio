"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function PageTracker({ path = "/" }) {
  useEffect(() => {
    trackPageView(path);
  }, [path]);
  return null;
}
