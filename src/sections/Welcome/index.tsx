'use client';

import { Canvas } from '@react-three/fiber';

import { DistortedImage } from '@/components/DistortedImage';
import { Logo } from '@/components/Logo';
import { Socials } from '@/components/Socials';

export const Welcome = () => (
  <section className="flex flex-col relative mx-8 lg:mx-0 lg:grid lg:grid-cols-2">
    <div className="mt-6 lg:hidden">
      <Logo />
    </div>
    <div className="h-[40vh] lg:hidden mt-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%' }}
      >
        <DistortedImage />
      </Canvas>
    </div>
    <div className="flex flex-col justify-between lg:mx-20">
      <div className="mt-6 lg:mt-12 hidden lg:block">
        <Logo />
      </div>
      <section>
        <h1 className="font-anybody text-5xl lg:text-6xl xl:text-7xl font-bold mt-10 lg:mt-0">
          Kacper Szarkiewicz
        </h1>
        <h2 className="font-anybody text-2xl lg:text-4xl">dApp Engineer</h2>
      </section>
      <section>
        <p className="mb-12 lg:mb-28 text-lg lg:text-xl pb-20 lg:pb-0 pt-10 sm:mt-0">
          let&#39;s build together
        </p>
        <Socials />
      </section>
    </div>
    <div className="hidden lg:block">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100vh' }}
      >
        <DistortedImage />
      </Canvas>
    </div>
  </section>
);
