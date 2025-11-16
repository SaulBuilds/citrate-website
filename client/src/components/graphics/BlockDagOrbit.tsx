import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

interface Props {
  className?: string;
  color?: string;
  opacity?: number;
}

/**
 * BlockDagOrbit
 *
 * Subtle SVG background: three orbit rings with nodes and faint connecting lines.
 * Rings rotate at differing speeds/directions for a continuous looping effect.
 */
export default function BlockDagOrbit({ className, color = "#FF9500", opacity = 0.25 }: Props) {
  const rootRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ring1 = rootRef.current?.querySelector(".ring-1");
      const ring2 = rootRef.current?.querySelector(".ring-2");
      const ring3 = rootRef.current?.querySelector(".ring-3");
      const blinks = rootRef.current?.querySelectorAll(".blink");

      const origin = "300px 300px";
      if (ring1) gsap.to(ring1, { rotate: 360, transformOrigin: origin, duration: 80, repeat: -1, ease: "none" });
      if (ring2) gsap.to(ring2, { rotate: -360, transformOrigin: origin, duration: 120, repeat: -1, ease: "none" });
      if (ring3) gsap.to(ring3, { rotate: 360, transformOrigin: origin, duration: 150, repeat: -1, ease: "none" });

      if (blinks && blinks.length) {
        gsap.to(blinks, {
          opacity: 0.36,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.2, from: "random", amount: 6 },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cx = 300;
  const cy = 300;
  const rings = [120, 180, 240];
  const counts = useMemo(() => (isMobile ? [8, 10, 12] : [10, 14, 18]), [isMobile]);

  const buildRing = (radius: number, count: number, ringClass: string) => {
    const nodes = Array.from({ length: count }).map((_, i) => {
      const a = (i / count) * Math.PI * 2;
      const x = cx + Math.cos(a) * radius;
      const y = cy + Math.sin(a) * radius;
      return { x, y, key: i };
    });

    return (
      <g key={radius} className={ringClass}>
        {/* Faint ring guide */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={color} strokeOpacity={(isMobile ? opacity * 0.25 : opacity * 0.35)} strokeWidth={1} />
        {/* Connect adjacent nodes */}
        {nodes.map((n, i) => {
          const n2 = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={`seg-${i}`}
              x1={n.x}
              y1={n.y}
              x2={n2.x}
              y2={n2.y}
              stroke={color}
              strokeOpacity={(isMobile ? opacity * 0.08 : opacity * 0.15)}
              strokeWidth={1}
            />
          );
        })}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle key={`pt-${i}`} cx={n.x} cy={n.y} r={isMobile ? 2.2 : 3} fill={color} fillOpacity={(isMobile ? opacity * 0.7 : opacity * 0.9)} />
        ))}
      </g>
    );
  };

  // A few cross-ring blink lines
  const blinkLines = () => {
    const pairs = [
      [120, 180, 0.1],
      [180, 240, 0.2],
      [120, 240, 0.15],
    ] as const;

    const buildLine = (r1: number, r2: number, offset: number, idx: number) => {
      const a = (offset % 1) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * r1;
      const y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a + Math.PI / 5) * r2;
      const y2 = cy + Math.sin(a + Math.PI / 5) * r2;
      return (
        <line
          key={`blink-${idx}`}
          className="blink"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeOpacity={opacity * 0.05}
          strokeWidth={1.5}
        />
      );
    };

    const lines = [] as JSX.Element[];
    let i = 0;
    for (const [r1, r2, seed] of pairs) {
      for (let k = 0; k < 12; k++) {
        if (!isMobile || (isMobile && k % 2 === 0)) {
          lines.push(buildLine(r1, r2, seed + k * 0.07, i++));
        }
      }
    }
    return lines;
  };

  return (
    <svg ref={rootRef} className={className} viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g opacity={1}>
        {blinkLines()}
        {buildRing(rings[0], counts[0], "ring-1")}
        {buildRing(rings[1], counts[1], "ring-2")}
        {buildRing(rings[2], counts[2], "ring-3")}
      </g>
    </svg>
  );
}
