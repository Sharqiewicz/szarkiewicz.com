'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'Deloitte Credential Wallet',
    image: '/projects/deloitte_1.jpg',
  },
  {
    id: 2,
    title: 'Deloitte Credential Wallet',
    image: '/projects/deloitte_2.jpg',
  },
  {
    id: 3,
    title: 'Deloitte Credential Wallet',
    image: '/projects/deloitte_3.jpg',
  },
  {
    id: 4,
    title: 'Deloitte Credential Wallet',
    image: '/projects/deloitte_4.jpg',
  },
  {
    id: 5,
    title: 'Deloitte Credential Wallet',
    image: '/projects/deloitte_5.jpg',
  },
  {
    id: 6,
    title: 'KYC Credentials',
    image: '/projects/kyc-credentials_1.png',
  },
  {
    id: 7,
    title: 'KYC Credentials',
    image: '/projects/kyc-credentials_2.png',
  },
  {
    id: 8,
    title: 'Pendulum Portal',
    image: '/projects/portal_1.png',
  },
  {
    id: 9,
    title: 'Pendulum Portal',
    image: '/projects/portal_2.png',
  },
  {
    id: 10,
    title: 'Pendulum Portal',
    image: '/projects/portal_3.png',
  },
  {
    id: 11,
    title: 'Pendulum Portal',
    image: '/projects/portal_4.png',
  },
  {
    id: 12,
    title: 'Foucoco Faucet',
    image: '/projects/faucet_1.png',
  },
  {
    id: 13,
    title: 'Vortex Finance',
    image: '/projects/vortex_1.png',
  },
];

export const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const yPositions = projects.map((_, index) =>
    useTransform(
      scrollYProgress,
      [index / projects.length, (index + 1) / projects.length],
      [0, -100]
    )
  );

  return (
    <section ref={containerRef} className="w-full bg-primary pt-24">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          style={{ y: yPositions[index] }}
          className="sticky top-0 left-0 inset-0 flex items-center justify-center "
        >
          <div className="relative w-full max-w-3xl aspect-video">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.h2
              className="absolute bottom-8 left-8 text-white text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.title}
            </motion.h2>
          </div>
        </motion.div>
      ))}
    </section>
  );
};
