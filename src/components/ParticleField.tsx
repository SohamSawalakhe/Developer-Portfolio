import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating Glass Shapes ── */
function GlassShape({ position, scale, speed, color, geometry }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  geometry: 'ico' | 'torus' | 'oct' | 'dodec';
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    ref.current.rotation.y = t * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'torus': return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'oct': return <octahedronGeometry args={[1, 0]} />;
      case 'dodec': return <dodecahedronGeometry args={[1, 0]} />;
      default: return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
          distort={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

/* ── Central Orb ── */
function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]} scale={2.5}>
      <icosahedronGeometry args={[1, 3]} />
      <MeshTransmissionMaterial
        color="#00d4ff"
        transmission={0.95}
        thickness={0.5}
        roughness={0.1}
        chromaticAberration={0.03}
        anisotropy={0.3}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0.1}
        backside
        resolution={256}
      />
    </mesh>
  );
}

/* ── Ambient Grid Floor ── */
function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!ref.current) return;
    (ref.current.material as THREE.Material).opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
  });

  return (
    <gridHelper
      ref={ref}
      args={[80, 60, '#00d4ff', '#00d4ff']}
      position={[0, -6, 0]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial transparent opacity={0.04} color="#00d4ff" />
    </gridHelper>
  );
}

/* ── Floating Dust Particles ── */
function DustParticles() {
  const count = 300;
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.01;
    const posAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      posAttr.setY(i, y + 0.003);
      if (y > 15) posAttr.setY(i, -15);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Main Scene ── */
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 5]} intensity={0.3} color="#00d4ff" />
      <pointLight position={[-10, -5, 5]} intensity={0.15} color="#7c3aed" />

      <CentralOrb />
      <GridFloor />
      <DustParticles />

      {/* Floating wireframe shapes */}
      <GlassShape position={[-6, 3, -8]} scale={1.2} speed={0.8} color="#00d4ff" geometry="ico" />
      <GlassShape position={[7, -2, -10]} scale={0.8} speed={1.2} color="#7c3aed" geometry="torus" />
      <GlassShape position={[-4, -4, -12]} scale={1.5} speed={0.6} color="#f43f5e" geometry="oct" />
      <GlassShape position={[5, 4, -6]} scale={0.6} speed={1.0} color="#00d4ff" geometry="dodec" />
      <GlassShape position={[0, -3, -15]} scale={2.0} speed={0.4} color="#7c3aed" geometry="ico" />
      <GlassShape position={[-8, 1, -14]} scale={0.7} speed={0.9} color="#f59e0b" geometry="torus" />
    </>
  );
}

export default function ParticleField() {
  return (
    <div id="particle-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene3D />
      </Canvas>
    </div>
  );
}
