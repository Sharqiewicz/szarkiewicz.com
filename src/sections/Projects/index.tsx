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
  description:
    'The Deloitte Credentials Wallet is a browser extension that allows users to store and share their Deloitte KYC credentials with third-party verifiers, facilitating trusted identification and verification processes.',
};

const PROJECT_KYC = {
  id: 2,
  color: '#4ECDC4',
  image: '/logos/deloitte.svg',
  blockchain: 'Polkadot',
  url: 'https://kyc-credentials.com/home',
  description:
    'KYC Credentials is a platform for creating and managing self-sovereign digital identities, enabling secure and reusable KYC verification.',
};

const PROJECT_PORTAL = {
  id: 3,
  color: '#907EA0',
  image: '/logos/pendulum.svg',
  blockchain: 'Polkadot',
  url: 'https://portal.pendulumchain.org/',
  description:
    'The Pendulum Chain Portal is a platform for managing assets, swapping, staking, bridging, and participating in governance within the Pendulum blockchain ecosystem.',
};

const PROJECT_FAUCET = {
  id: 4,
  color: '#4EE59A',
  image: '/logos/foucoco.svg',
  blockchain: 'Polkadot',
  url: 'https://faucet-service.pendulumchain.tech/',
  description:
    'The Foucoco Faucet is a service that provides AMPE tokens for the Foucoco parachain.',
};

const PROJECT_VORTEX = {
  id: 5,
  color: '#0F4DC0',
  image: '/logos/vortex.svg',
  blockchain: 'Ethereum',
  url: 'https://app.vortexfinance.co/',
  description:
    'Vortex Finance is a platform that facilitates offramping, allowing users to convert cryptocurrency into fiat currency.',
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
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_1.png',
  },
  {
    id: 5,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_2.png',
  },
  {
    id: 6,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_3.png',
  },
  {
    id: 7,
    title: 'Pendulum Portal',
    project: PROJECT_PORTAL,
    image: '/projects/portal_4.png',
  },

  {
    id: 8,
    title: 'KYC Credentials',
    project: PROJECT_KYC,
    image: '/projects/kyc_1.png',
  },
  {
    id: 9,
    title: 'KYC Credentials',
    project: PROJECT_KYC,
    image: '/projects/kyc_2.png',
  },
  {
    id: 10,
    title: 'Foucoco Faucet',
    project: PROJECT_FAUCET,
    image: '/projects/faucet_1.png',
  },
  {
    id: 11,
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

      //@ts-expect-error todo
      const rect = section.getBoundingClientRect();
      const stickyOffset = 96;

      if (rect.top <= stickyOffset) {
        //@ts-expect-error todo
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

              //@ts-expect-error todo
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
    <section
      ref={sectionRef}
      className="h-[1400vh] pt-48 mx-4 sm:mx-20 pb-[300px]"
    >
      <div className="sticky top-4 md:top-12 left-0 flex flex-col lg:flex-row justify-center">
        <div className="mx-auto lg:mx-0 hover:scale-[1.02] duration-500 transition border border-primary mb-8 lg:mb-0 lg:mr-4 border-2 rounded-xl w-full md:w-[477px] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden relative">
          {projects.map((project, index) => (
            <div
              key={project.id}
              //@ts-expect-error todo
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
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center rounded-lg"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8 items-center">
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
                  bg-[#3B3B58] w-full md:w-[477px] rounded-xl transition-all
                  duration-500 overflow-hidden flex border border-l-8 justify-center
                  items-center flex-wrap shadow-xl
                  ${
                    isCurrent
                      ? 'h-[250px] md:h-[210px]'
                      : 'h-[80px] hover:h-[210px]'
                  }
                  ${
                    index <= currentIndex
                      ? 'lg:opacity-100 lg:translate-y-0'
                      : 'lg:opacity-0 lg:hidden lg:translate-y-8'
                  }
                  ${
                    project.project.id === projects[currentIndex].project.id
                      ? 'opacity-100 translate-y-0'
                      : 'hidden lg:block'
                  }
                  hover:scale-[1.02] cursor-pointer group
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
                  <div className="cursor-pointer mx-4 py-4">
                    <div className="flex">
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

                    <p className="text-gray-100 mt-2">
                      {project.project.description}
                    </p>
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
