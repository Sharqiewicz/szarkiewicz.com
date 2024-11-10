'use client';

import { useRef } from 'react';
import { ThreeEvent, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);

    vec2 mouseDirection = u_mouse - u_prevMouse;

    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * - mouseDirection * 0.2;
    vec2 uv = vUv - uvOffset;

    vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 colorG = texture2D(u_texture, uv);
    vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`;

export const DistortedImage = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/profile.png');

  const dimensions = {
    width: 2,
    height: 2,
  };

  let easeFactor = 0.02;
  const mousePosition = { x: 0.5, y: 0.5 };
  let targetMousePosition = { x: 0.5, y: 0.5 };
  let aberrationIntensity = 0.0;
  let prevPosition = { x: 0.5, y: 0.5 };

  const uniforms = useRef({
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_aberrationIntensity: { value: 0.0 },
    u_texture: { value: texture },
  }).current;

  useFrame(() => {
    mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

    uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
    uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

    aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
    uniforms.u_aberrationIntensity.value = aberrationIntensity;
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!event.uv) return;

    easeFactor = 0.02;
    prevPosition = { ...targetMousePosition };

    targetMousePosition.x = event.uv.x;
    targetMousePosition.y = 1 - event.uv.y;

    aberrationIntensity = 1;
  };

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    if (!event.uv) return;

    easeFactor = 0.02;
    mousePosition.x = targetMousePosition.x = event.uv.x;
    mousePosition.y = targetMousePosition.y = event.uv.y;
  };

  const handlePointerLeave = () => {
    easeFactor = 0.05;
    targetMousePosition = { ...prevPosition };
  };

  return (
    <mesh
      //@ts-expect-error Version mismatch
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerEnter}
      onPointerOut={handlePointerLeave}
    >
      <planeGeometry args={[dimensions.width, dimensions.height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};
