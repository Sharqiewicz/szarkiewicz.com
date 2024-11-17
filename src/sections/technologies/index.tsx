'use client';

import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Instances, Instance, Html } from '@react-three/drei';
import { EffectComposer, N8AO, Bloom } from '@react-three/postprocessing';
import { RoundedBoxGeometry } from 'three-stdlib';

const CUBES_COUNT = 8;

extend({ RoundedBoxGeometry });

const usePositions = (count: number, gap: number) =>
  useMemo(
    () => Array.from({ length: count }, (_, i) => [i * (1 + gap), 0, 0]),
    [count, gap]
  );

interface CubeDetail {
  color: string;
  description: string;
}

const cubeDetails: CubeDetail[] = [
  { color: '#FF6B6B', description: 'Red cube: Represents energy and passion.' },
  {
    color: '#4ECDC4',
    description: 'Teal cube: Symbolizes balance and harmony.',
  },
  {
    color: '#45B7D1',
    description: 'Blue cube: Signifies trust and stability.',
  },
  {
    color: '#FFA07A',
    description: 'Salmon cube: Denotes creativity and enthusiasm.',
  },
  {
    color: '#98D8C8',
    description: 'Mint cube: Embodies freshness and growth.',
  },
  {
    color: '#F7DC6F',
    description: 'Yellow cube: Stands for optimism and clarity.',
  },
  {
    color: '#BB8FCE',
    description: 'Lavender cube: Represents imagination and spirituality.',
  },
  {
    color: '#F1948A',
    description: 'Coral cube: Symbolizes nurturing and compassion.',
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
      ref.current.color.lerp(
        isHovered ? new THREE.Color(detail.color) : new THREE.Color(0xffffff),
        0.1
      );
    }
  });

  return (
    <Instance
      ref={ref}
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
      ref={ref}
    >
      <roundedBoxGeometry args={[1, 1, 1, 2, 0.15]} />
      <meshStandardMaterial />
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

export const Technologies = () => (
  <Canvas
    shadows
    gl={{ antialias: false }}
    camera={{ position: [32, 32, 32], fov: 25 }}
  >
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
    <OrbitControls />
  </Canvas>
);
