import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

// Module-level reference so App can access lenis for scroll reset + resize
let _lenis = null;
export const getLenis = () => _lenis;

export const useLenis = () => {
  useEffect(() => {
    // Disable Lenis on small screens to avoid jank
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    _lenis = lenis;

    let frameId;

    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute("href");
        if (href === "#") return;
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element, { offset: -100, duration: 1.5 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      _lenis = null;
    };
  }, []);
};
