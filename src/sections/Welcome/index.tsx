'use client';

import { Canvas } from '@react-three/fiber';

import { DistortedImage } from '@/components/DistortedImage';
import { Logo } from '@/components/Logo';
import { Socials } from '@/components/Socials';

export const Welcome = () => (
  <section className="grid grid-cols-2">
    <div className="">
      <Logo />
      <section>
        <h1 className="font-anybody">Kacper Szarkiewicz</h1>
        <h2 className="font-anybody">dApp Engineer</h2>
      </section>
      <section>
        <p>let&#39;s build together</p>
        <Socials />
      </section>
    </div>
    <div className="">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100vh' }}
      >
        <DistortedImage />
      </Canvas>
    </div>
  </section>
);
