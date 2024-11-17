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
  const hoverAnimationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const socials = socialsRef.current;

    const tl = gsap.timeline();
    tl.fromTo(
      section,
      { width: 0, height: 54, display: 'none' },
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
      if (isHovered) return;

      const progress = scroll / limit;

      // Skip scroll animation if hover animation is active
      if (hoverAnimationRef.current?.isActive()) return;

      if (progress < MIN_PROGRESS) {
        gsap.to(section, {
          width: 400,
          left: '6%',
          duration: 0.3,
          borderRadius: '1.5rem',
          height: 54,
          bottom: '2.5rem',
        });
      } else if (progress > MAX_PROGRESS) {
        gsap.to(section, {
          width: '100vw',
          left: 0,
          borderRadius: 0,
          duration: 0.3,
          height: 254,
          bottom: 0,
        });
      } else {
        gsap.to(section, {
          width: 80,
          left: '46%',
          duration: 0.3,
          borderRadius: '1.5rem',
          height: 54,
          bottom: '2.5rem',
        });
      }
    });

    // Hover animations
    section.addEventListener('mouseenter', () => {
      const progress = lenis.scroll / lenis.limit; // Get the latest scroll progress

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
      const progress = lenis.scroll / lenis.limit; // Get the latest scroll progress

      if (progress > MIN_PROGRESS && progress < MAX_PROGRESS) {
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
  }, [isHovered]);

  return (
    <section
      ref={sectionRef}
      className="bg-primary rounded-3xl py-3 px-6 fixed bottom-10 flex z-50 cursor-pointer"
    >
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
    </section>
  );
};
