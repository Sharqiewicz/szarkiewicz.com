'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Image from 'next/image';

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
    image: '/projects/kyc_1.png',
  },
  {
    id: 7,
    title: 'KYC Credentials',
    image: '/projects/kyc_2.png',
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;

    // Initialize all projects
    projectRefs.current.forEach((projectRef, index) => {
      gsap.set(projectRef, {
        y: index === 0 ? '0%' : '100%',
        opacity: index === 0 ? 1 : 0,
      });
    });

    // Initialize Lenis
    const lenis = new Lenis({
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll-based animations using Lenis
    lenis.on('scroll', ({ scroll, limit }) => {
      const progress = scroll / limit;
      const newIndex = Math.round(progress * (projects.length - 1));

      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < projects.length
      ) {
        // Animate previous project out
        if (projectRefs.current[currentIndex]) {
          gsap.to(projectRefs.current[currentIndex], {
            y: '-100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        }

        // Animate new project in
        if (projectRefs.current[newIndex]) {
          gsap.fromTo(
            projectRefs.current[newIndex],
            {
              y: '100%',
              opacity: 0,
            },
            {
              y: '0%',
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut',
            }
          );
        }

        setCurrentIndex(newIndex);
      }
    });

    return () => {
      lenis.destroy();
    };
  }, [currentIndex]);

  return (
    <section ref={containerRef} className="h-[500vh] pt-48 mx-20">
      <div className="sticky top-24 left-0">
        <div className="border border-accent border-4 rounded-xl w-[477px] h-[866px] overflow-hidden relative">
          {projects.map((project, index) => (
            <>
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={477}
                    height={866}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                  <h2 className="absolute bottom-8 left-8 text-anybody text-3xl font-bold">
                    {project.title}
                  </h2>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};
