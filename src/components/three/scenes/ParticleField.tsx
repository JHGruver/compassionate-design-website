"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  seed?: number;
}

// Seeded pseudo-random number generator (Mulberry32)
function createSeededRandom(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ParticleField({
  count = 2000,
  color = "#00F5FF",
  size = 0.02,
  speed = 0.0005,
  seed = 12345,
}: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const random = createSeededRandom(seed);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (random() - 0.5) * 10;
      pos[i3 + 1] = (random() - 0.5) * 10;
      pos[i3 + 2] = (random() - 0.5) * 10;

      vel[i3] = (random() - 0.5) * speed;
      vel[i3 + 1] = (random() - 0.5) * speed;
      vel[i3 + 2] = (random() - 0.5) * speed;
    }

    return { positions: pos, velocities: vel };
  }, [count, speed, seed]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positionArray = mesh.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positionArray[i3] += velocities[i3];
      positionArray[i3 + 1] += velocities[i3 + 1];
      positionArray[i3 + 2] += velocities[i3 + 2];

      // Wrap around
      if (Math.abs(positionArray[i3]) > 5) positionArray[i3] *= -0.9;
      if (Math.abs(positionArray[i3 + 1]) > 5) positionArray[i3 + 1] *= -0.9;
      if (Math.abs(positionArray[i3 + 2]) > 5) positionArray[i3 + 2] *= -0.9;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default ParticleField;
