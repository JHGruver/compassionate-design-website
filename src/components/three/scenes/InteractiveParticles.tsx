"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  seed?: number;
}

interface Planet {
  id: number;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
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

const planetColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#FFE66D", // Yellow
  "#95E1D3", // Mint
  "#F38181", // Coral
  "#AA96DA", // Lavender
  "#FCBAD3", // Pink
  "#A8D8EA", // Light Blue
];

// Pre-computed planet properties for deterministic behavior
const PLANET_PRESETS = [
  { colorIndex: 0, size: 0.12, orbitRadius: 1.8, orbitSpeed: 0.45, orbitOffset: 0.5 },
  { colorIndex: 1, size: 0.18, orbitRadius: 2.5, orbitSpeed: 0.65, orbitOffset: 1.2 },
  { colorIndex: 2, size: 0.14, orbitRadius: 3.2, orbitSpeed: 0.38, orbitOffset: 2.1 },
  { colorIndex: 3, size: 0.22, orbitRadius: 2.1, orbitSpeed: 0.72, orbitOffset: 3.5 },
  { colorIndex: 4, size: 0.16, orbitRadius: 3.8, orbitSpeed: 0.52, orbitOffset: 4.2 },
  { colorIndex: 5, size: 0.13, orbitRadius: 2.8, orbitSpeed: 0.88, orbitOffset: 5.1 },
  { colorIndex: 6, size: 0.19, orbitRadius: 1.6, orbitSpeed: 0.42, orbitOffset: 0.8 },
  { colorIndex: 7, size: 0.15, orbitRadius: 3.5, orbitSpeed: 0.58, orbitOffset: 2.8 },
];

export function InteractiveParticles({
  count = 2000,
  color = "#00F5FF",
  size = 0.02,
  seed = 54321,
}: InteractiveParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const rotationSpeedRef = useRef(0.3);
  const zoomRef = useRef(1);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const [planets, setPlanets] = useState<Planet[]>([]);
  const planetIdRef = useRef(0);
  const { gl } = useThree();

  // Memoized click handler to use deterministic planet properties
  const handleClick = useCallback(() => {
    const presetIndex = planetIdRef.current % PLANET_PRESETS.length;
    const preset = PLANET_PRESETS[presetIndex];
    const newPlanet: Planet = {
      id: planetIdRef.current++,
      color: planetColors[preset.colorIndex],
      size: preset.size,
      orbitRadius: preset.orbitRadius,
      orbitSpeed: preset.orbitSpeed,
      orbitOffset: preset.orbitOffset,
    };
    setPlanets(prev => [...prev, newPlanet]);
  }, []);

  // Set up global mouse tracking
  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [gl, handleClick]);

  // Base particle positions with seeded random
  const { positions, basePositions } = useMemo(() => {
    const random = createSeededRandom(seed);
    const pos = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 3 + random() * 4;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      basePos[i3] = x;
      basePos[i3 + 1] = y;
      basePos[i3 + 2] = z;
    }

    return { positions: pos, basePositions: basePos };
  }, [count, seed]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    // Calculate mouse velocity
    const velX = mouseRef.current.x - mouseRef.current.prevX;
    const velY = mouseRef.current.y - mouseRef.current.prevY;

    // Update rotation speed based on horizontal mouse movement
    // Moving right = faster, moving left = slower
    const targetSpeed = 0.3 + velX * 8;
    rotationSpeedRef.current += (targetSpeed - rotationSpeedRef.current) * 0.15;
    rotationSpeedRef.current = Math.max(0.02, Math.min(3, rotationSpeedRef.current));

    // Update zoom based on vertical mouse movement
    // Moving up = zoom out, moving down = zoom in
    zoomRef.current -= velY * 1.5;
    zoomRef.current = Math.max(0.4, Math.min(2.5, zoomRef.current));

    const rotSpeed = rotationSpeedRef.current;
    const zoom = zoomRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Get base position
      const baseX = basePositions[i3];
      const baseY = basePositions[i3 + 1];
      const baseZ = basePositions[i3 + 2];

      // Apply zoom
      const zoomedX = baseX * zoom;
      const zoomedY = baseY * zoom;
      const zoomedZ = baseZ * zoom;

      // Rotate around Y axis
      const angle = time * rotSpeed + i * 0.0001;
      const x = zoomedX * Math.cos(angle) - zoomedZ * Math.sin(angle);
      const z = zoomedX * Math.sin(angle) + zoomedZ * Math.cos(angle);

      // Add gentle wave
      const waveY = zoomedY + Math.sin(time * 0.5 + i * 0.01) * 0.1;

      positionArray[i3] = x;
      positionArray[i3 + 1] = waveY;
      positionArray[i3 + 2] = z;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Stars */}
      <points ref={mesh} geometry={geometry}>
        <pointsMaterial
          size={size}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          rotationSpeed={rotationSpeedRef}
          zoom={zoomRef}
        />
      ))}
    </group>
  );
}

// Planet component
function Planet({
  planet,
  rotationSpeed,
  zoom,
}: {
  planet: Planet;
  rotationSpeed: React.RefObject<number>;
  zoom: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const rotSpeed = rotationSpeed.current;
    const z = zoom.current;

    // Orbit around center
    const orbitAngle = time * planet.orbitSpeed * rotSpeed + planet.orbitOffset;
    const orbitX = Math.cos(orbitAngle) * planet.orbitRadius * z;
    const orbitZ = Math.sin(orbitAngle) * planet.orbitRadius * z;
    const orbitY = Math.sin(time * 0.5 + planet.orbitOffset) * 0.5 * z;

    meshRef.current.position.set(orbitX, orbitY, orbitZ);
    meshRef.current.rotation.y = time * 2;
    meshRef.current.rotation.x = Math.sin(time) * 0.2;

    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1);
    }
  });

  return (
    <group>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[planet.size * 1.8, 16, 16]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

// Secondary particle layer
export function InteractiveParticlesSecondary({
  count = 800,
  color = "#FF006E",
  size = 0.015,
  seed = 67890,
}: InteractiveParticlesProps) {
  const mesh = useRef<THREE.Points>(null);

  const { positions, basePositions } = useMemo(() => {
    const random = createSeededRandom(seed);
    const pos = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 4 + random() * 5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      basePos[i3] = x;
      basePos[i3 + 1] = y;
      basePos[i3 + 2] = z;
    }

    return { positions: pos, basePositions: basePos };
  }, [count, seed]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    const rotSpeed = 0.15;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const baseX = basePositions[i3];
      const baseY = basePositions[i3 + 1];
      const baseZ = basePositions[i3 + 2];

      // Counter-rotate
      const angle = -time * rotSpeed + i * 0.0002;
      const x = baseX * Math.cos(angle) - baseZ * Math.sin(angle);
      const z = baseX * Math.sin(angle) + baseZ * Math.cos(angle);
      const waveY = baseY + Math.cos(time * 0.3 + i * 0.02) * 0.15;

      positionArray[i3] = x;
      positionArray[i3 + 1] = waveY;
      positionArray[i3 + 2] = z;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default InteractiveParticles;
