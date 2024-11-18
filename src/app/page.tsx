import { ReactLenis } from 'lenis/react';

import { Welcome } from '@/sections/Welcome';
import { BlockchainAnimation } from '@/sections/BlockchainAnimation';
import { Projects } from '@/sections/Projects';

export default function Home() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <main className="h-[2000px]">
        <Welcome />
        <BlockchainAnimation />
        <Projects />
      </main>
    </ReactLenis>
  );
}
