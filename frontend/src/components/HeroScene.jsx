import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

function AnimatedBlob() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial color="#6366f1" distort={0.4} speed={2} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div style={{ height: '60vh', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedBlob />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
