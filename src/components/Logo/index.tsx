import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LogoProps {
  xStartPosition?: number;
  xEndPosition?: number;
}

export const Logo: FC<LogoProps> = ({
  xStartPosition = -800,
  xEndPosition = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.fromTo(
      svgRef.current!.children,
      {
        x: xStartPosition,
      },
      {
        stagger: 0.1,
        duration: 1,
        x: xEndPosition,
        ease: 'power3.inOut',
      }
    );
  }, [xStartPosition, xEndPosition]);

  const handleMouseEnter = () => {
    gsap.to(svgRef.current!.children, {
      x: -20,
      stagger: 0.1,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(svgRef.current!.children, {
      x: 0,
      stagger: 0.1,
      ease: 'power3.out',
    });
  };

  return (
    <svg
      ref={svgRef}
      width="62"
      height="62"
      viewBox="0 0 280 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svgfix hover:scale-105 transition overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <rect x="25" y="164" width="200" height="24" rx="12" fill="#2A2A48" />
      <rect x="45" y="123" width="160" height="24" rx="12" fill="#2A2A48" />
      <rect x="79" y="82" width="147" height="24" rx="12" fill="#2A2A48" />
      <rect x="114" y="41" width="144" height="24" rx="12" fill="#2A2A48" />
      <rect x="206" width="74" height="24" rx="12" fill="#2A2A48" />
      <rect x="174" width="25" height="24" rx="12" fill="#2A2A48" />
      <rect y="246" width="280" height="24" rx="12" fill="#2A2A48" />
      <rect y="205" width="250" height="24" rx="12" fill="#2A2A48" />
    </svg>
  );
};
