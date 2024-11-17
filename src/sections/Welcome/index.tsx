'use client';

import { Canvas } from '@react-three/fiber';

import { DistortedImage } from '@/components/DistortedImage';
import { Logo } from '@/components/Logo';
import { Socials } from '@/components/Socials';

export const Welcome = () => (
  <section className="grid grid-cols-2">
    <div className="flex flex-col justify-between mx-20">
      <div className="mt-12">
        <Logo />
      </div>
      <section>
        <h1 className="font-anybody text-7xl font-bold">Kacper Szarkiewicz</h1>
        <h2 className="font-anybody text-4xl">dApp Engineer</h2>
      </section>
      <section>
        <p className="mb-28 text-xl">let&#39;s build together</p>
        <Socials />
      </section>
    </div>
    <div>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100vh' }}
      >
        <DistortedImage />
      </Canvas>
    </div>
  </section>
);
