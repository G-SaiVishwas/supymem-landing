"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

// Extend Three.js elements for React Three Fiber
extend({ Line_: THREE.Line });

interface NodeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

function Node({ position, color, scale = 1 }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.15, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      {/* Glow effect */}
      <mesh position={position} scale={scale * 1.5}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function Connection({ start, end, color }: ConnectionProps) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 0.5,
        (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 0.5,
        (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 0.5
      ),
      new THREE.Vector3(...end),
    ]);
    return curve.getPoints(50);
  }, [start, end]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  );
}

function Particles() {
  const count = 200;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 10;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  // Node positions and colors
  const nodes = useMemo(() => [
    // Center cluster (main brain)
    { position: [0, 0, 0] as [number, number, number], color: "#6366f1", scale: 1.5 },
    // Commits (green)
    { position: [-1.5, 0.8, 0.5] as [number, number, number], color: "#22c55e", scale: 1 },
    { position: [1.2, -0.5, 0.8] as [number, number, number], color: "#22c55e", scale: 0.8 },
    { position: [-0.8, -1.2, -0.3] as [number, number, number], color: "#22c55e", scale: 0.9 },
    // Messages (blue)
    { position: [1.8, 1, -0.2] as [number, number, number], color: "#3b82f6", scale: 1 },
    { position: [-1, 1.5, -0.5] as [number, number, number], color: "#3b82f6", scale: 0.85 },
    { position: [0.5, -1.5, 0.6] as [number, number, number], color: "#3b82f6", scale: 0.9 },
    // Decisions (purple)
    { position: [1.5, 0.3, 1] as [number, number, number], color: "#a855f7", scale: 1.1 },
    { position: [-1.8, -0.5, -0.8] as [number, number, number], color: "#a855f7", scale: 0.95 },
    { position: [0, 1.8, 0.2] as [number, number, number], color: "#a855f7", scale: 0.85 },
    // Additional nodes
    { position: [-2, 0.2, 0.3] as [number, number, number], color: "#ec4899", scale: 0.7 },
    { position: [2, -0.8, -0.5] as [number, number, number], color: "#f59e0b", scale: 0.75 },
  ], []);

  // Connections between nodes
  const connections = useMemo(() => [
    { start: nodes[0].position, end: nodes[1].position, color: "#22c55e" },
    { start: nodes[0].position, end: nodes[2].position, color: "#22c55e" },
    { start: nodes[0].position, end: nodes[3].position, color: "#22c55e" },
    { start: nodes[0].position, end: nodes[4].position, color: "#3b82f6" },
    { start: nodes[0].position, end: nodes[5].position, color: "#3b82f6" },
    { start: nodes[0].position, end: nodes[6].position, color: "#3b82f6" },
    { start: nodes[0].position, end: nodes[7].position, color: "#a855f7" },
    { start: nodes[0].position, end: nodes[8].position, color: "#a855f7" },
    { start: nodes[0].position, end: nodes[9].position, color: "#a855f7" },
    { start: nodes[1].position, end: nodes[5].position, color: "#6366f1" },
    { start: nodes[2].position, end: nodes[7].position, color: "#6366f1" },
    { start: nodes[4].position, end: nodes[9].position, color: "#6366f1" },
    { start: nodes[3].position, end: nodes[8].position, color: "#6366f1" },
    { start: nodes[10].position, end: nodes[1].position, color: "#ec4899" },
    { start: nodes[11].position, end: nodes[2].position, color: "#f59e0b" },
  ], [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((connection, i) => (
        <Connection key={i} {...connection} />
      ))}
      {nodes.map((node, i) => (
        <Node key={i} {...node} />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <NeuralNetwork />
      <Particles />
    </>
  );
}

export default function NetworkVisualization() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
