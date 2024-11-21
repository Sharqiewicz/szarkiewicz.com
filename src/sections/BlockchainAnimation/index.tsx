'use client';

import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Instances, Instance, Html, OrbitControls } from '@react-three/drei';
import { EffectComposer, N8AO, Bloom } from '@react-three/postprocessing';
import { RoundedBoxGeometry } from 'three-stdlib';

const CUBES_COUNT = 5;

extend({ RoundedBoxGeometry });

const usePositions = (count: number, gap: number) =>
  useMemo(
    () =>
      Array.from({ length: count }, (_, i) => [
        (i - count / 2) * (2 + gap),
        0,
        0,
      ]),
    [count, gap]
  );

interface CubeDetail {
  color: string;
  description: string;
}

const cubeDetails: CubeDetail[] = [
  { color: '#4ECDC4', description: 'Deloitte Credential Wallet' },
  {
    color: '#4ECDC4',
    description: 'Deloitte KYC-Credentials',
  },
  {
    color: '#907EA0',
    description: 'Pendulum Portal',
  },
  {
    color: '#0F4DC0',
    description: 'Vortex Finance',
  },
  {
    color: '#4EE59A',
    description: 'Foucoco Faucet',
  },
];

function Cube({
  position,
  detail,
  setHovered,
}: {
  position: number[];
  detail: CubeDetail;
  setHovered: (value: boolean) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      //@ts-ignore
      ref.current.color.lerp(
        isHovered ? new THREE.Color(detail.color) : new THREE.Color(0xffffff),
        0.1
      );
    }
  });

  return (
    <Instance
      ref={ref}
      //@ts-ignore todo
      position={position}
      onPointerOver={() => {
        setIsHovered(true);
        setHovered(true);
      }}
      onPointerOut={() => {
        setIsHovered(false);
        setHovered(false);
      }}
    >
      {isHovered && (
        <Html distanceFactor={10}>
          <div
            style={{
              background: 'white',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {detail.description}
          </div>
        </Html>
      )}
    </Instance>
  );
}

function Cubes({ gap = 0.5, count = CUBES_COUNT }) {
  const ref = useRef();
  const positions = usePositions(count, gap);
  const [hovered, setHovered] = useState(false);
  const animationSpeed = useRef(1);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();

      // Smoothly adjust animation speed
      animationSpeed.current = THREE.MathUtils.lerp(
        animationSpeed.current,
        hovered ? 0 : 1,
        0.05
      );

      //@ts-ignore todo
      ref.current.children.forEach((child, i) => {
        const [x] = positions[i];
        const targetY = Math.sin(time + x / 2) * 2;
        const targetZ = Math.cos(time + x / 2) * 2;

        // Smoothly interpolate to target position
        child.position.y = THREE.MathUtils.lerp(
          child.position.y,
          targetY,
          0.1 * animationSpeed.current
        );
        child.position.z = THREE.MathUtils.lerp(
          child.position.z,
          targetZ,
          0.1 * animationSpeed.current
        );
      });
    }
  });

  return (
    <Instances
      key={count}
      limit={count}
      castShadow
      receiveShadow
      frames={Infinity}
      //@ts-ignore todo
      ref={ref}
    >
      {/* @ts-expect-error todo */}
      <roundedBoxGeometry args={[2, 2, 2, 2, 0.15]} /> <meshStandardMaterial />
      {positions.map((position, index) => (
        <Cube
          key={index}
          position={position}
          detail={cubeDetails[index]}
          setHovered={setHovered}
        />
      ))}
    </Instances>
  );
}

export const BlockchainAnimation = () => (
  <section className="bg-primary pt-20">
    <p className="font-anybody text-gray-300 text-2xl font-bold sm:font-normal sm:text-3xl pt-5 mx-4 sm:mx-auto text-center">
      My Web3/Blockchain Projects
    </p>
    <p className=" text-gray-300 text-s mx-auto text-center  mx-4 sm:mx-auto">
      Although I have built 30+ commercial apps in my life (frontend and
      mobile), here - in this Blockchain - I am only posting blockchain-related
      ones.
    </p>
    <p className="text-gray-300 text-s mx-auto text-center  mx-4 sm:mx-auto">
      (I was developing non-blockchain apps for 4+ years, ask me for more
      details)
    </p>
    <Canvas
      style={{
        height: 500,
        width: '100%',
      }}
      shadows
      gl={{ antialias: false }}
      camera={{ position: [10, 10, 22], fov: 25 }}
    >
      <OrbitControls enableZoom={false} enablePan={false} />
      <color attach="background" args={['#2A2A48']} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[-10, 20, 20]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={2}
        castShadow
      />
      <Cubes gap={0.5} count={CUBES_COUNT} />
      <EffectComposer>
        <N8AO aoRadius={1} intensity={1} />
        <Bloom mipmapBlur luminanceThreshold={1} levels={7} intensity={1} />
      </EffectComposer>
    </Canvas>
  </section>
);
