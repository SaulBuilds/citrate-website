import { useEffect, useRef } from "react";
import gsap from "gsap";
import citrateIconOrange from "@assets/citrate_icon_orange_1761610658378.png";

interface AnimatedLogoProps {
  size?: number;
  autoPlay?: boolean;
  delay?: number;
}

export default function AnimatedLogo({ size = 200, autoPlay = true, delay = 0 }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const particles = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!autoPlay || !logoRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });

      tl.from(logoRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      tl.from(
        logoRef.current,
        {
          rotationY: 180,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

      particles.current.forEach((particle, i) => {
        tl.from(
          particle,
          {
            scale: 0,
            opacity: 0,
            x: gsap.utils.random(-100, 100),
            y: gsap.utils.random(-100, 100),
            duration: 0.6,
            ease: "power3.out",
          },
          `-=${0.7 - i * 0.1}`
        );
      });

      gsap.to(logoRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      particles.current.forEach((particle, i) => {
        gsap.to(particle, {
          rotation: 360,
          duration: 20 + i * 2,
          repeat: -1,
          ease: "none",
        });

        gsap.to(particle, {
          scale: 1.1,
          opacity: 0.8,
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [autoPlay, delay]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) particles.current[i] = el;
            }}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${50 + Math.cos((i * Math.PI * 2) / 6) * 40}%`,
              top: `${50 + Math.sin((i * Math.PI * 2) / 6) * 40}%`,
            }}
          />
        ))}
      </div>

      <img
        ref={logoRef}
        src={citrateIconOrange}
        alt="Citrate Logo"
        className="relative z-10"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-xl" />
    </div>
  );
}
