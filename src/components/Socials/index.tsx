import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Image from 'next/image';

const SOCIALS = [
  {
    alt: 'github',
    src: '/socials/github.svg',
    url: 'https://github.com/Sharqiewicz',
  },
  {
    alt: 'x',
    src: '/socials/x.svg',
    url: 'https://x.com/sharqiewicz',
  },
  {
    alt: 'linkedin',
    src: '/socials/linkedin.svg',
    url: 'https://www.linkedin.com/in/kacperszarkiewicz/',
  },
  {
    alt: 'youtube',
    src: '/socials/youtube.svg',
    url: 'https://www.youtube.com/@kszarkiewicz',
  },
  {
    alt: 'mail',
    src: '/socials/mail.svg',
    url: 'mailto:szarkiewiczmail@gmail.com',
  },
];

const MIN_PROGRESS = 0.001;
const MAX_PROGRESS = 0.98;

export const Socials = () => {
  const sectionRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollRef = useRef(0);
  const limitRef = useRef(0);
  const hoverAnimationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const socials = socialsRef.current;

    const tl = gsap.timeline();
    tl.fromTo(
      section,
      { width: 0, height: 56, display: 'none' },
      { width: 400, display: 'flex', duration: 1 }
    );

    tl.fromTo(
      socials.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
      }
    );
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll-based animations using Lenis
    lenis.on('scroll', ({ scroll, limit }) => {
      scrollRef.current = scroll;
      limitRef.current = limit;

      const progress = scroll / limit;

      if (!(progress > MIN_PROGRESS) && !(progress < MAX_PROGRESS)) {
        if (isHovered) return;
      }

      // Skip scroll animation if hover animation is active
      if (hoverAnimationRef.current?.isActive()) return;

      if (progress < MIN_PROGRESS) {
        gsap.to(section, {
          width: 400,
          left: '6%',
          duration: 0.3,
          borderRadius: '1.5rem',
          height: 56,
          bottom: '2.5rem',
        });
        if (showFooter) setShowFooter(false);
      } else if (progress >= MAX_PROGRESS) {
        gsap.to(section, {
          width: '100%',
          left: 0,
          borderRadius: 0,
          duration: 0.3,
          height: 154,
          bottom: 0,
        });
        if (!showFooter) setShowFooter(true);
      } else {
        gsap.to(section, {
          width: 80,
          left: window.innerWidth <= 768 ? '3%' : '46%',
          duration: 0.3,
          borderRadius: '1.5rem',
          height: 56,
          bottom: '2.5rem',
        });
        if (showFooter) setShowFooter(false);
      }
    });

    section.addEventListener('mouseenter', () => {
      const scroll = scrollRef.current;
      const limit = limitRef.current;
      if (!lenis) return;

      const progress = scroll / limit;

      if (progress > MIN_PROGRESS && progress < MAX_PROGRESS) {
        setIsHovered(true);
        hoverAnimationRef.current = gsap.timeline();
        hoverAnimationRef.current.to(section, {
          width: 400,
          duration: 0.3,
        });
      }
    });

    section.addEventListener('mouseleave', () => {
      const scroll = scrollRef.current;
      const limit = limitRef.current;
      if (!lenis) return;

      const progress = scroll / limit;

      if (progress > MIN_PROGRESS && progress < MAX_PROGRESS) {
        console.log(progress);
        console.log('HOVERED 2');
        setIsHovered(false);
        hoverAnimationRef.current = gsap.timeline();
        hoverAnimationRef.current.to(section, {
          width: 80,
          duration: 0.3,
        });
      }
    });

    return () => {
      lenis.destroy();
      section.removeEventListener('mouseenter', null);
      section.removeEventListener('mouseleave', null);
    };
  }, [isHovered, showFooter]);

  return (
    <section
      ref={sectionRef}
      className="border border-accent border-2 bg-primary rounded-3xl py-3 px-6 flex-col justify-center items-center fixed bottom-[7%] sm:bottom-[15%] lg:bottom-10 z-50 cursor-pointer"
    >
      <div className="flex justify-between w-full">
        <Image
          src="/logo-light.svg"
          width={30}
          height={30}
          alt="Sharqiewicz logo"
        />
        <div
          ref={socialsRef}
          className="grid grid-cols-5 gap-6 items-center mx-auto"
        >
          {SOCIALS.map((social) => (
            <a
              key={social.alt}
              href={social.url}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="hover:scale-105 transition opacity-80 hover:opacity-100"
                src={social.src}
                width={30}
                height={30}
                alt={social.alt}
              />
            </a>
          ))}
        </div>
      </div>
      {showFooter && (
        <footer className="text-center my-5 ml-7 font-anybody text-gray-400 font-bold text-xs text-center">
          Made with <span className="text-accent">❤</span> by Kacper Szarkiewicz
        </footer>
      )}
    </section>
  );
};
