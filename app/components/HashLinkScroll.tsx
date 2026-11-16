"use client";

import { useEffect } from "react";

/**
 * Clicking a link whose hash is already in the URL (e.g. "/#contact" twice in
 * a row) changes nothing, so neither the browser nor the Next.js router
 * scrolls. This re-scrolls to the target for those repeat clicks.
 */
export function HashLinkScroll() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") {
        return;
      }

      if (
        !anchor.hash ||
        anchor.origin !== window.location.origin ||
        anchor.pathname !== window.location.pathname ||
        anchor.hash !== window.location.hash
      ) {
        return;
      }

      const target = document.getElementById(
        decodeURIComponent(anchor.hash.slice(1))
      );
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
