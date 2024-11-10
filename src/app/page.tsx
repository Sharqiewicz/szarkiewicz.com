'use client';

import { DistortedImage } from '@/components/DistortedImage';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '50vw', height: '100vh' }}
      >
        <DistortedImage />
      </Canvas>
    </>
  );
}
