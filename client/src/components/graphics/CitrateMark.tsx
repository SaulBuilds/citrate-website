import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  size?: number;
  className?: string;
  animate?: boolean;
  title?: string;
}

/**
 * CitrateMark
 *
 * A resolution‑independent SVG glyph with subtle GSAP animation.
 * Inspired by a citrus cross‑section: ring + 6 spokes/wedges.
 */
export default function CitrateMark({ size = 48, className, animate = true, title = "Citrate" }: Props) {
  const rootRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const spokesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!animate || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // Draw ring
      if (ringRef.current) {
        const length = ringRef.current.getTotalLength?.() ?? 300;
        gsap.set(ringRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(ringRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "power3.out" });
      }

      // Stagger spokes
      if (spokesRef.current) {
        const items = Array.from(spokesRef.current.querySelectorAll("line"));
        gsap.from(items, {
          opacity: 0,
          scale: 0.9,
          transformOrigin: "50% 50%",
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Idle loop: slow rotation + breathing glow
      if (rootRef.current) {
        gsap.to(rootRef.current, { rotate: 360, duration: 40, repeat: -1, ease: "none" });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [animate]);

  const s = size;
  const rOuter = 22;
  const rInner = 14;
  const cx = 24;
  const cy = 24;

  const spokes = Array.from({ length: 6 }).map((_, i) => {
    const a = (i * Math.PI * 2) / 6;
    const x1 = cx + Math.cos(a) * rInner;
    const y1 = cy + Math.sin(a) * rInner;
    const x2 = cx + Math.cos(a) * (rOuter - 2);
    const y2 = cy + Math.sin(a) * (rOuter - 2);
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <svg
      ref={rootRef}
      width={s}
      height={s}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <radialGradient id="citrateGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,149,0,0.85)" />
          <stop offset="60%" stopColor="rgba(255,149,0,0.25)" />
          <stop offset="100%" stopColor="rgba(255,149,0,0)" />
        </radialGradient>
        <linearGradient id="citrateStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB84D" />
          <stop offset="50%" stopColor="#FF9500" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
      </defs>

      {/* Soft glow */}
      <circle cx={cx} cy={cy} r={rOuter} fill="url(#citrateGlow)" />

      {/* Outer ring */}
      <circle
        ref={ringRef}
        cx={cx}
        cy={cy}
        r={rOuter}
        fill="none"
        stroke="url(#citrateStroke)"
        strokeWidth={2.5}
      />

      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#FF9500" strokeOpacity={0.4} strokeWidth={1.2} />

      {/* Spokes */}
      <g ref={spokesRef} stroke="#FF9500" strokeOpacity={0.9} strokeLinecap="round" strokeWidth={2}>
        {spokes.map((s) => (
          <line key={s.key} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
        ))}
      </g>
    </svg>
  );
}

