import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function BodyPart({ position, scale, color = "#38bdf8", rotation = [0, 0, 0] }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.015;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
    >
      <capsuleGeometry args={[0.5, 1, 8, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.65}
        roughness={0.25}
      />
    </mesh>
  );
}

function Head() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, 2.75, 0]} castShadow>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshStandardMaterial
        color="#67e8f9"
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function HumanBody() {
  return (
    <group>
      {/* Head */}
      <Head />

      {/* Neck */}
      <BodyPart
        position={[0, 2.05, 0]}
        scale={[0.35, 0.45, 0.35]}
        color="#22d3ee"
      />

      {/* Chest */}
      <BodyPart
        position={[0, 1.25, 0]}
        scale={[1.05, 0.9, 0.55]}
        color="#06b6d4"
      />

      {/* Waist */}
      <BodyPart
        position={[0, 0.45, 0]}
        scale={[0.72, 0.65, 0.45]}
        color="#0891b2"
      />

      {/* Left Arm */}
      <BodyPart
        position={[-1.05, 1.15, 0]}
        scale={[0.35, 1.0, 0.35]}
        rotation={[0, 0, -0.15]}
        color="#38bdf8"
      />

      {/* Right Arm */}
      <BodyPart
        position={[1.05, 1.15, 0]}
        scale={[0.35, 1.0, 0.35]}
        rotation={[0, 0, 0.15]}
        color="#38bdf8"
      />

      {/* Left Leg */}
      <BodyPart
        position={[-0.48, -0.75, 0]}
        scale={[0.43, 1.45, 0.43]}
        color="#0284c7"
      />

      {/* Right Leg */}
      <BodyPart
        position={[0.48, -0.75, 0]}
        scale={[0.43, 1.45, 0.43]}
        color="#0284c7"
      />

      {/* Left Foot */}
      <mesh position={[-0.48, -2.05, 0.2]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.9]} />
        <meshStandardMaterial
          color="#0369a1"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Right Foot */}
      <mesh position={[0.48, -2.05, 0.2]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.9]} />
        <meshStandardMaterial
          color="#0369a1"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function ThreeDBody() {
  return (
    <div
      style={{
        width: "100%",
        height: "520px",
        borderRadius: "24px",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, #12304a 0%, #07111f 45%, #020617 100%)",
        border: "1px solid rgba(56,189,248,0.25)",
        boxShadow: "0 0 50px rgba(14,165,233,0.12)",
      }}
    >
      <Canvas
        camera={{ position: [0, 1, 7], fov: 45 }}
        shadows
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={3}
          castShadow
        />

        <pointLight
          position={[-4, 2, 3]}
          intensity={2}
          color="#22d3ee"
        />

        <pointLight
          position={[4, 1, -2]}
          intensity={1.5}
          color="#8b5cf6"
        />

        <HumanBody />

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}