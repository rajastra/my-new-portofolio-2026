"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every `.reveal` element the first time it enters the viewport, so section parts
 * rise once and then stay. Content is only hidden under `html.js` with motion allowed (see
 * globals.css), so it is always visible without script or with reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    watch(document);

    // Pages rendered after a client-side navigation bring new .reveal elements.
    const mo = new MutationObserver(() => watch(document));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
