"use client";

import { useState, useEffect, RefObject } from "react";

interface ScrollProgress {
  progress: number;
  isInView: boolean;
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  offset: number = 0
): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    isInView: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top - offset;
      const elementBottom = rect.bottom + offset;

      const isInView = elementTop < windowHeight && elementBottom > 0;

      // Calculate progress: 0 when element enters view, 1 when it leaves
      const progress = isInView
        ? Math.min(
            1,
            Math.max(0, (windowHeight - elementTop) / (windowHeight + rect.height))
          )
        : 0;

      setScrollProgress({ progress, isInView });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref, offset]);

  return scrollProgress;
}
