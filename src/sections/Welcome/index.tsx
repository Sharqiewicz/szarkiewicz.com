'use client';

import { Canvas } from '@react-three/fiber';

import { DistortedImage } from '@/components/DistortedImage';
import { Logo } from '@/components/Logo';
import { Socials } from '@/components/Socials';

export const Welcome = () => (
  <>
    <div className="w-1/2 h-[2000px]">
      <Logo />
      <section>
        <h1>Kacper Szarkiewicz</h1>
        <h2>dApp Engineer</h2>
      </section>
      <section>
        <p>let&#39;s build together</p>
        <Socials />
      </section>
    </div>
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ width: '50vw', height: '100vh' }}
    >
      <DistortedImage />
    </Canvas>
  </>
);
