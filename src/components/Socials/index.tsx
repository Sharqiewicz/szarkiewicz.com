import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
    ['block', 'none', 'none', 'block']
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
        style={{
          display,
        }}
      >
        <p className="text-white">THIS IS HIDDEN SECTION</p>
      </motion.div>
    </motion.section>
  );
};
