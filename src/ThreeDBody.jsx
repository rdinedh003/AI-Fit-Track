import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function BodyPart({
  position,
  scale,
  color,
  rotation = [0, 0, 0],
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    ref.current.position.y =
      position[1] + Math.sin(t * 1.5) * 0.012;
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
  const head = useRef();

  useFrame((state) => {
    if (!head.current) return;

    head.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  return (
    <mesh
      ref={head}
      position={[0, 2.75, 0]}
      castShadow
    >
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
  const body = useRef();

  useFrame((state) => {
    if (!body.current) return;

    body.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.1) * 0.025;
  });

  return (
    <group ref={body}>
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
        scale={[0.35, 1, 0.35]}
        rotation={[0, 0, -0.15]}
        color="#38bdf8"
      />

      {/* Right Arm */}
      <BodyPart
        position={[1.05, 1.15, 0]}
        scale={[0.35, 1, 0.35]}
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
      <mesh
        position={[-0.48, -2.05, 0.2]}
        castShadow
      >
        <boxGeometry args={[0.55, 0.3, 0.9]} />

        <meshStandardMaterial
          color="#0369a1"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Right Foot */}
      <mesh
        position={[0.48, -2.05, 0.2]}
        castShadow
      >
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

function ScanLine() {
  const scan = useRef();

  useFrame((state) => {
    if (!scan.current) return;

    const t = state.clock.elapsedTime;

    scan.current.position.y =
      3.4 - ((t * 0.8) % 5.4);
  });

  return (
    <group ref={scan}>
      <mesh>
        <boxGeometry args={[2.8, 0.025, 0.04]} />

        <meshBasicMaterial
          color="#67e8f9"
        />
      </mesh>

      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[2.8, 0.1, 0.03]} />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

function HologramRing({
  position,
  radius,
  color,
  speed,
}) {
  const ring = useRef();

  useFrame((state) => {
    if (!ring.current) return;

    ring.current.rotation.z =
      state.clock.elapsedTime * speed;
  });

  return (
    <mesh
      ref={ring}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <torusGeometry
        args={[radius, 0.015, 12, 64]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function EnergyFloor() {
  const floor = useRef();

  useFrame((state) => {
    if (!floor.current) return;

    const t = state.clock.elapsedTime;

    floor.current.rotation.z = t * 0.6;

    const scale =
      1 + Math.sin(t * 3) * 0.05;

    floor.current.scale.set(
      scale,
      scale,
      scale
    );
  });

  return (
    <mesh
      ref={floor}
      position={[0, -2.05, 0]}
    >
      <torusGeometry
        args={[1.15, 0.035, 16, 64]}
      />

      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function Particles() {
  const group = useRef();

  const particles = Array.from(
    { length: 35 },
    (_, index) => ({
      x: ((index * 17) % 50) / 10 - 2.5,
      y: ((index * 23) % 50) / 10 - 2.5,
      z: ((index * 13) % 30) / 10 - 1.5,
    })
  );

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y =
      state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={[
            particle.x,
            particle.y,
            particle.z,
          ]}
        >
          <sphereGeometry
            args={[0.018, 8, 8]}
          />

          <meshBasicMaterial
            color={
              index % 2 === 0
                ? "#22d3ee"
                : "#8b5cf6"
            }
          />
        </mesh>
      ))}
    </group>
  );
}

function MovingLight() {
  const light = useRef();

  useFrame((state) => {
    if (!light.current) return;

    const t = state.clock.elapsedTime;

    light.current.position.x =
      Math.sin(t * 0.8) * 4;

    light.current.position.z =
      Math.cos(t * 0.8) * 3;
  });

  return (
    <pointLight
      ref={light}
      position={[3, 2, 3]}
      intensity={2.5}
      distance={8}
      color="#22d3ee"
    />
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
        position: "relative",
        background:
          "radial-gradient(circle at center, #12304a 0%, #07111f 45%, #020617 100%)",
        border:
          "1px solid rgba(56,189,248,0.3)",
        boxShadow:
          "0 0 60px rgba(14,165,233,0.18)",
      }}
    >
      <Canvas
        camera={{
          position: [0, 1, 7],
          fov: 45,
        }}
        shadows
        dpr={[1, 2]}
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

        <MovingLight />

        <HumanBody />

        <ScanLine />

        <HologramRing
          position={[0, 1.8, 0]}
          radius={1.4}
          color="#22d3ee"
          speed={0.7}
        />

        <HologramRing
          position={[0, 0.6, 0]}
          radius={1.15}
          color="#8b5cf6"
          speed={-0.5}
        />

        <HologramRing
          position={[0, -0.8, 0]}
          radius={0.9}
          color="#38bdf8"
          speed={0.35}
        />

        <Particles />

        <EnergyFloor />

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "18px",
          left: "18px",
          padding: "9px 15px",
          borderRadius: "999px",
          background:
            "rgba(2,6,23,0.75)",
          border:
            "1px solid rgba(56,189,248,0.35)",
          color: "#67e8f9",
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "1px",
        }}
      >
        ◉ AI BODY SCAN
      </div>

      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          padding: "8px 12px",
          borderRadius: "999px",
          background:
            "rgba(2,6,23,0.75)",
          border:
            "1px solid rgba(34,197,94,0.3)",
          color: "#86efac",
          fontSize: "10px",
          fontWeight: 800,
        }}
      >
        ● SYSTEM ACTIVE
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: "50%",
          transform:
            "translateX(-50%)",
          padding: "8px 15px",
          borderRadius: "999px",
          background:
            "rgba(2,6,23,0.7)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          color:
            "rgba(255,255,255,0.75)",
          fontSize: "11px",
          whiteSpace: "nowrap",
        }}
      >
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}