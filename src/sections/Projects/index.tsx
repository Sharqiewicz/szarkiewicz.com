'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Image from 'next/image';

const PROJECT_WALLET = {
  id: 1,
  color: '#0D838F',
  image: '/logos/deloitte.svg',
  blockchain: 'Polkadot',
  url: 'https://chromewebstore.google.com/detail/deloitte-credentials-wall/bflldjbbpcjgooclhpmhdhioebmnnkcm',
};

const PROJECT_KYC = {
  id: 2,
  color: '#4ECDC4',
  image: '/logos/deloitte.svg',
  blockchain: 'Polkadot',
  url: 'https://kyc-credentials.com/home',
};

const PROJECT_PORTAL = {
  id: 3,
  color: '#907EA0',
  image: '/logos/pendulum.svg',
  blockchain: 'Polkadot',
  url: 'https://portal.pendulumchain.org/',
};

const PROJECT_FAUCET = {
  id: 4,
  color: '#4EE59A',
  image: '/logos/foucoco.svg',
  blockchain: 'Polkadot',
  url: 'https://faucet-service.pendulumchain.tech/',
};

const PROJECT_VORTEX = {
  id: 5,
  color: '#0F4DC0',
  image: '/logos/vortex.svg',
  blockchain: 'Ethereum',
  url: 'https://app.vortexfinance.co/',
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
    <section ref={sectionRef} className="h-[1400vh] pt-48 mx-20 pb-[300px]">
      <div className="sticky top-24 left-0 flex">
        <div className="hover:scale-[1.02] duration-500 transition border border-primary mr-4 border-2 rounded-xl min-w-[477px] h-[866px] overflow-hidden relative">
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
        <div className="flex flex-col gap-8 grow">
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
                style={{ borderLeftColor: project.project.color }}
                className={`
                  bg-[#3B3B58] rounded-xl transition-all duration-500 overflow-hidden flex border border-l-8 justify-center items-center flex-wrap shadow-xl
                  ${isCurrent ? 'h-[160px]' : 'h-[80px]'}
                  ${
                    index <= currentIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 hidden translate-y-8'
                  }
                  hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:h-[160px] group
                `}
              >
                <div className="w-full flex justify-between items-center">
                  <Image
                    src={project.project.image}
                    alt={project.title}
                    width={200}
                    height={120}
                    className="transition-all duration-500 hover:scale-105"
                  />
                  <div className="bg-black text-anybody text-white text-xs px-2 py-1 rounded-full inline-block mr-6">
                    <p className="opacity-100">{project.project.blockchain}</p>
                  </div>
                </div>

                <div
                  className={`
                    transition-all duration-500
                    ${
                      isCurrent
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-4'
                    }
                    group-hover:opacity-100 group-hover:translate-y-0
                  `}
                >
                  <div className="flex items-center mt-1 cursor-pointer">
                    <Image
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                      src="/socials/website.svg"
                      width={20}
                      height={20}
                      alt={`${project.title} website`}
                    />
                    <a
                      href={project.project.url}
                      rel="norefferer"
                      target="blank"
                      className="text-anybody text-gray-100 font-semibold text-base ml-2 group-hover:underline"
                    >
                      {`@${project.title.replaceAll(' ', '')}`}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
