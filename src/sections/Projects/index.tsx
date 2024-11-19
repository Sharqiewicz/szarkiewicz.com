'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Deloitte Credential Wallet',
    image: '/projects/wallet_1.png',
  },
  {
    id: 2,
    title: 'Deloitte Credential Wallet',
    image: '/projects/wallet_2.png',
  },
  {
    id: 3,
    title: 'Deloitte Credential Wallet',
    image: '/projects/wallet_3.png',
  },
  {
    id: 4,
    title: 'Deloitte Credential Wallet',
    image: '/projects/wallet_4.png',
  },
  {
    id: 5,
    title: 'Deloitte Credential Wallet',
    image: '/projects/wallet_5.png',
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    projectRefs.current.forEach((projectRef, index) => {
      gsap.set(projectRef, {
        y: index === 0 ? '0%' : '100%',
        filter: 'blur(0px)',
      });
    });

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const stickyOffset = 96;

      if (rect.top <= stickyOffset) {
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        const scrollProgress =
          Math.abs(rect.top - stickyOffset) / scrollableHeight;
        const newIndex = Math.min(
          Math.floor((scrollProgress * projects.length) / 1.001),
          projects.length - 1
        );

        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < projects.length
        ) {
          const isScrollingUp = e.velocity < 0;

          if (projectRefs.current[currentIndex]) {
            gsap
              .timeline()
              .fromTo(
                projectRefs.current[currentIndex],
                {
                  y: '0%',
                  duration: 1,
                  scale: 1,
                  opacity: 1,
                },
                {
                  filter: 'blur(2px)',
                  duration: 0.5,
                  opacity: 1,
                  y: isScrollingUp ? '100%' : '-20%',
                }
              )
              .to(projectRefs.current[currentIndex], {
                opacity: 0,
                duration: isScrollingUp ? 0.001 : 0.5,
              });
          }

          if (projectRefs.current[newIndex]) {
            gsap.fromTo(
              projectRefs.current[newIndex],
              {
                y: isScrollingUp ? '-20%' : '100%',
                duration: isScrollingUp ? 1 : 0.5,
              },
              {
                y: '0%',
                filter: 'blur(0px)',
                opacity: 1,
                scale: 1,
                duration: 1,
              },
              isScrollingUp ? '=0' : '-=0.8'
            );
          }

          setCurrentIndex(newIndex);
        }
      }
    });

    return () => {
      lenis.destroy();
    };
  }, [currentIndex]);

  return (
    <section ref={sectionRef} className="h-[1800vh] pt-48 mx-20">
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
