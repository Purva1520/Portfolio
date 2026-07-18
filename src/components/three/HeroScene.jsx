import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { MathUtils } from 'three';

/** Iridescent orb that leans toward the pointer with heavy damping. */
function MoonOrb() {
  const mesh = useRef(null);
  const spin = useRef(0);

  useFrame(({ pointer }, delta) => {
    if (!mesh.current) return;
    // Clamp delta so resuming after a paused frameloop (hero off-screen)
    // never causes a burst of catch-up rotation.
    const dt = Math.min(delta, 0.05);
    spin.current += dt * 0.08;
    const targetY = spin.current + pointer.x * 0.3;
    const targetX = pointer.y * -0.2;
    mesh.current.rotation.y = MathUtils.damp(mesh.current.rotation.y, targetY, 1.6, dt);
    mesh.current.rotation.x = MathUtils.damp(mesh.current.rotation.x, targetX, 1.6, dt);
  });

  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} scale={0.92} position={[0.3, 0.1, 0]}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          color="#5d55c9"
          distort={0.55}
          speed={2}
          roughness={0.5}
          metalness={0.5}
          emissive="#1d1852"
          emissiveIntensity={0.7}
        />
      </mesh>
    </Float>
  );
}

/**
 * Lazy-loaded hero canvas. `active` pauses the frameloop entirely when the
 * hero has scrolled out of view so the rest of the page stays at 60fps.
 */
export default function HeroScene({ active = true }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
    >
      <ambientLight intensity={0.35} color="#d3d3ff" />
      <directionalLight position={[4, 4, 5]} intensity={1.9} color="#d3d3ff" />
      <directionalLight position={[-5, -2, 3]} intensity={1.2} color="#e8cfb5" />
      <directionalLight position={[2, -4, -3]} intensity={1.5} color="#efc3e4" />
      <MoonOrb />
      <Sparkles count={90} scale={[8, 6, 3.5]} size={1.7} speed={0.32} opacity={0.5} color="#d3d3ff" />
    </Canvas>
  );
}
