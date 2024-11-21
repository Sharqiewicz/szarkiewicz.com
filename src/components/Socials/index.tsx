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
] as const;

const MIN_PROGRESS = 0.001;
const MAX_PROGRESS = 0.98;

type ScrollState = {
  scroll: number;
  limit: number;
};

export const Socials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollState = useRef<ScrollState>({ scroll: 0, limit: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const socials = socialsRef.current;
    if (!section || !socials) return;

    const tl = gsap.timeline();
    tl.fromTo(
      section,
      { width: 0, height: 56, display: 'none' },
      {
        width: isMobile ? 320 : 400,
        display: 'flex',
        duration: 1,
      }
    );

    tl.fromTo(
      Array.from(socials.children),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
      }
    );
  }, [isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lenis = new Lenis();
    let animationFrame: number;

    const animate = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    const handleScroll = ({ scroll, limit }: ScrollState) => {
      scrollState.current = { scroll, limit };
      const progress = scroll / limit;

      if (isHovered) return;

      const baseStyles = {
        duration: 0.3,
        borderRadius: '1.5rem',
        height: 56,
        bottom: '2.5rem',
      };

      if (progress < MIN_PROGRESS) {
        gsap.to(section, {
          ...baseStyles,
          width: isMobile ? 320 : 400,
          left: '6%',
        });
        setShowFooter(false);
      } else if (progress >= MAX_PROGRESS) {
        gsap.to(section, {
          width: '100%',
          left: 0,
          borderRadius: 0,
          duration: 0.3,
          height: 154,
          bottom: 0,
        });
        setShowFooter(true);
        return;
      } else {
        gsap.to(section, {
          ...baseStyles,
          width: 80,
          left: isMobile ? '3%' : '46%',
        });
        setShowFooter(false);
      }
    };

    lenis.on('scroll', handleScroll);

    const handleInteraction = () => {
      const { scroll, limit } = scrollState.current;
      const progress = scroll / limit;

      if (progress > MIN_PROGRESS && progress < MAX_PROGRESS) {
        setIsHovered((prev) => !prev);
        gsap.to(section, {
          width: isHovered ? 80 : 320,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      const { scroll, limit } = scrollState.current;
      const progress = scroll / limit;

      if (progress > MIN_PROGRESS && progress < MAX_PROGRESS) {
        setIsHovered(false);
        gsap.to(section, {
          width: 80,
          duration: 0.3,
        });
      }
    };

    if (isMobile) {
      section.addEventListener('click', handleInteraction);
    } else {
      section.addEventListener('mouseenter', handleInteraction);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();

      if (isMobile) {
        section?.removeEventListener('click', handleInteraction);
      } else {
        section?.removeEventListener('mouseenter', handleInteraction);
        section?.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isHovered, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="border border-accent border-2 bg-primary rounded-3xl py-3 px-3 sm:px-6 flex-col justify-center items-center fixed bottom-[7%] sm:bottom-[15%] lg:bottom-10 z-50 cursor-pointer"
    >
      <div className="flex justify-between w-full">
        <Image
          src="/logo-light.svg"
          width={30}
          height={30}
          alt="Sharqiewicz logo"
          className="sm:mr-3"
        />
        <div
          ref={socialsRef}
          className="grid grid-cols-5 gap-3 sm:gap-6 items-center mx-auto"
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
        <footer className="text-center my-5 ml-7 font-anybody text-gray-400 font-bold text-xs">
          Made with <span className="text-accent">❤</span> by Kacper Szarkiewicz
        </footer>
      )}
    </section>
  );
};
