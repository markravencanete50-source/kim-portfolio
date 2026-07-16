"use client";

import { motion } from "framer-motion";

// Scroll-triggered reveal that respects reduced-motion (framer handles this
// when the OS setting is on, falling back to no transform).
export default function Reveal({ children, delay = 0, y = 20, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
