import { ReactLenis } from 'lenis/react';

import { Welcome } from '@/sections/Welcome';

export default function Home() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <main className="h-[8000px]">
        <Welcome />
      </main>
    </ReactLenis>
  );
}
