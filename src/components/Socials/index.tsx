import { motion, useScroll, useTransform } from 'framer-motion';
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

export const Socials = () => {
  const { scrollYProgress } = useScroll();

  const width = useTransform(
    scrollYProgress,
    [0, 0.1, 0.95, 1],
    [400, 100, 100, '100vw']
  );

  const left = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['10%', '50%', '50%', 0]
  );

  const display = useTransform(
    scrollYProgress,
    [0, 0.04, 0.98, 1],
    ['grid', 'none', 'none', 'grid']
  );

  return (
    <motion.section
      className="bg-[#2A2A48] rounded-3xl py-3 px-6 fixed bottom-10 flex"
      style={{
        width,
        left,
      }}
    >
      <Image
        src="/logo-light.svg"
        width={30}
        height={30}
        alt="Sharqiewicz logo"
      />
      <motion.div
        className="grid-cols-5 gap-6 items-center mx-auto"
        style={{
          display,
        }}
      >
        {SOCIALS.map((social) => (
          <a key={social.alt} href={social.url}>
            <Image
              className="hover:scale-105 transition opacity-80 hover:opacity-100"
              src={social.src}
              width={30}
              height={30}
              alt={social.alt}
            />
          </a>
        ))}
      </motion.div>
    </motion.section>
  );
};
