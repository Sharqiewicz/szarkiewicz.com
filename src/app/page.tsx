'use client';

import { Canvas } from '@react-three/fiber';

import { DistortedImage } from '@/components/DistortedImage';
import { Logo } from '@/components/Logo';

export default function Home() {
  return (
    <main className="flex">
      <div className="w-1/2">
        <Logo />
      </div>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '50vw', height: '100vh' }}
      >
        <DistortedImage />
      </Canvas>
    </main>
  );
}
