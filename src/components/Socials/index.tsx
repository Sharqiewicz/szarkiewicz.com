import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export const Socials = () => {
  const { scrollYProgress } = useScroll();

  const width = useTransform(
    scrollYProgress,
    [0, 0.1, 0.95, 1],
    [400, 100, 100, 400]
  );

  return (
    <motion.section
      className="bg-[#2A2A48] rounded-3xl py-3 px-6  fixed bottom-10"
      style={{
        width,
      }}
    >
      <Image
        src="/logo-light.svg"
        width={30}
        height={30}
        alt="Sharqiewicz logo"
      />
    </motion.section>
  );
};
