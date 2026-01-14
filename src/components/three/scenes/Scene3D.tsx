"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { InteractiveParticles, InteractiveParticlesSecondary } from "./InteractiveParticles";

interface Scene3DProps {
  className?: string;
}

export function Scene3D({ className }: Scene3DProps) {
  return (
    <div className={className} style={{ pointerEvents: "auto" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <InteractiveParticles count={1500} color="#00F5FF" size={0.018} />
          <InteractiveParticlesSecondary count={600} color="#FF006E" size={0.012} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene3D;
