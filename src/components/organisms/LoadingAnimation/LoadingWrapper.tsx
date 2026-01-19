"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { LoadingAnimation } from "./LoadingAnimation";

const SESSION_KEY = "compassionate-design-visited";

interface LoadingWrapperProps {
  children: ReactNode;
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [showLoading, setShowLoading] = useState<boolean | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check if user has visited this session
    const hasVisited = sessionStorage.getItem(SESSION_KEY);

    if (hasVisited) {
      // Skip loading animation for returning visitors in same session
      setShowLoading(false);
      setIsComplete(true);
    } else {
      // Show loading animation for first visit
      setShowLoading(true);
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    // Mark as visited for this session
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsComplete(true);
    // Small delay before hiding to ensure smooth transition
    setTimeout(() => setShowLoading(false), 100);
  }, []);

  // Don't render anything until we know if we should show loading
  if (showLoading === null) {
    return (
      <div className="fixed inset-0 bg-background z-[100]" />
    );
  }

  return (
    <>
      {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <div
        style={{
          opacity: isComplete ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default LoadingWrapper;
