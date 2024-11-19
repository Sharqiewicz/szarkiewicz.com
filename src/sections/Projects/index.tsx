'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Image from 'next/image';

const PROJECT_WALLET = {
  id: 1,
  color: '#4ECDC4',
  image: '/logos/deloitte.png',
};

const PROJECT_KYC = {
  id: 2,
  color: '#4ECDC4',
  image: '/logos/deloitte.png',
};

const PROJECT_PORTAL = {
  id: 3,
  color: '#907EA0',
  image: '/logos/pendulum.svg',
};

const PROJECT_FAUCET = {
  id: 4,
  color: '#4EE59A',
  image: '/logos/foucoco.svg',
};

const PROJECT_VORTEX = {
  id: 5,
  color: '#0F4DC0',
  image: '/logos/vortex.svg',
};

const projects = [
  {
    id: 1,
    title: 'Deloitte Credential Wallet',
    project: PROJECT_WALLET,
    image: '/projects/wallet_1.png',
  },
  {
    id: 2,
    title: 'Deloitte Credential Wallet',
    project: PROJECT_WALLET,
    image: '/projects/wallet_2.png',
  },
  {
    id: 3,
    title: 'Deloitte Credential Wallet',
    project: PROJECT_WALLET,
    image: '/projects/wallet_3.png',
  },
  {
    id: 4,
    title: 'Deloitte Credential Wallet',
    project: PROJECT_WALLET,
    image: '/projects/wallet_4.png',
  },
  {
    id: 5,
    title: 'Deloitte Credential Wallet',
    project: PROJECT_WALLET,
    image: '/projects/wallet_5.png',
  },
  {
    id: 6,
    title: 'KYC Credentials',
    project: PROJECT_KYC,
    image: '/projects/kyc_1.png',
  },
  {
    id: 7,
    title: 'KYC Credentials',
    project: PROJECT_KYC,
    image: '/projects/kyc_2.png',
  },
  {
    id: 8,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_1.png',
  },
  {
    id: 9,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_2.png',
  },
  {
    id: 10,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_3.png',
  },
  {
    id: 11,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_4.png',
  },
  {
    id: 12,
    title: 'Foucoco Faucet',
    project: PROJECT_FAUCET,
    image: '/projects/faucet_1.png',
  },
  {
    id: 13,
    title: 'Vortex Finance',
    project: PROJECT_VORTEX,
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
    <section ref={sectionRef} className="h-[1800vh] pt-48 mx-20 pb-[300px]">
      <div className="sticky top-24 left-0 flex">
        <div className="border border-accent border-2 rounded-xl w-[477px] h-[866px] overflow-hidden relative">
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
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="ml-12 flex flex-col gap-8">
          {projects.map((project, index) => {
            const isAlreadyDisplayed = projects
              .slice(0, index)
              .some((p) => p.project.id === project.project.id);

            if (isAlreadyDisplayed) return null;

            const isCurrent =
              project.project.id === projects[currentIndex].project.id;

            return (
              <div
                key={project.project.id}
                style={{ backgroundColor: project.project.color }}
                className={`rounded-xl transition-all duration-500 overflow-hidden
                  ${isCurrent ? 'px-12 py-8 h-[300px]' : 'px-8 py-4 h-[100px]'}
                  ${
                    index <= currentIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
              >
                <div
                  className={`transition-all duration-500 ${
                    isCurrent ? 'scale-100' : 'scale-75'
                  }`}
                >
                  <Image
                    src={project.project.image}
                    alt={project.title}
                    width={150}
                    height={80}
                    className="transition-all duration-500"
                  />
                </div>

                <div
                  className={`transition-all duration-500 ${
                    isCurrent
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <h2 className="text-3xl mt-6">{project.title}</h2>

                  <div className="flex items-center mt-4">
                    <Image
                      className="hover:scale-105 transition opacity-80 hover:opacity-100"
                      src="/socials/x.svg"
                      width={18}
                      height={18}
                      alt={`${project.title} x.com`}
                    />
                    <p className="text-anybody text-gray-200 font-bold text-sm ml-1">
                      {`@${project.title}`}
                    </p>
                  </div>

                  <p className="text-anybody text-gray-200 font-bold text-sm mt-4">
                    Project Description Lorem ipsum dolor, sit amet consectetur.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
