import { ReactLenis } from 'lenis/react';

import { Welcome } from '@/sections/Welcome';
import { Technologies } from '@/sections/technologies';

export default function Home() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <main className="h-[2000px]">
        <Welcome />
        <Technologies />
      </main>
    </ReactLenis>
  );
}
