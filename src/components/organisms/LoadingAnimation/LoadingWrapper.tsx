"use client";

import { useState, useCallback, ReactNode, useSyncExternalStore } from "react";
import { LoadingAnimation } from "./LoadingAnimation";

const SESSION_KEY = "compassionate-design-visited";

// Helper to check if we're in browser
const getSnapshot = () => sessionStorage.getItem(SESSION_KEY) === "true";
const getServerSnapshot = () => false;
const subscribe = () => () => {};

interface LoadingWrapperProps {
  children: ReactNode;
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
  // Use useSyncExternalStore to safely read sessionStorage
  const hasVisited = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [animationComplete, setAnimationComplete] = useState(hasVisited);
  const [showLoading, setShowLoading] = useState(!hasVisited);

  const handleLoadingComplete = useCallback(() => {
    // Mark as visited for this session
    sessionStorage.setItem(SESSION_KEY, "true");
    setAnimationComplete(true);
    // Small delay before hiding to ensure smooth transition
    setTimeout(() => setShowLoading(false), 100);
  }, []);

  // Show loading for first-time visitors
  if (showLoading && !hasVisited) {
    return (
      <>
        <LoadingAnimation onComplete={handleLoadingComplete} />
        <div style={{ opacity: 0 }}>{children}</div>
      </>
    );
  }

  return (
    <div
      style={{
        opacity: animationComplete || hasVisited ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default LoadingWrapper;
