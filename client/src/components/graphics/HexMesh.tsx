import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

interface Props {
  className?: string;
  color?: string;
  opacity?: number;
}

/**
 * HexMesh
 *
 * SVG honeycomb grid with subtle motion and pulsing nodes.
 * Density and opacity are reduced on small screens.
 */
export default function HexMesh({ className, color = "#FF9500", opacity = 0.22 }: Props) {
  const rootRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const view = { w: 600, h: 600 };
  const r = isMobile ? 18 : 24; // hex radius
  const hStep = 1.5 * r; // horizontal spacing
  const vStep = Math.sqrt(3) * r; // vertical spacing
  const cols = Math.ceil(view.w / hStep) + 2;
  const rows = Math.ceil(view.h / vStep) + 2;

  const grid = useMemo(() => {
    const items: { cx: number; cy: number; key: string }[] = [];
    let id = 0;
    for (let c = -1; c < cols; c++) {
      const x = 60 + c * hStep; // small left pad to avoid clipping
      for (let rIdx = -1; rIdx < rows; rIdx++) {
        const yBase = 60 + rIdx * vStep;
        const y = yBase + (c % 2 === 0 ? 0 : vStep / 2);
        items.push({ cx: x, cy: y, key: `${id++}` });
      }
    }
    return items;
  }, [cols, rows, hStep, vStep]);

  const hexPoints = (cx: number, cy: number, rad: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      const x = cx + Math.cos(a) * rad;
      const y = cy + Math.sin(a) * rad;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle drift
      const gridNode = rootRef.current?.querySelector(".grid");
      if (gridNode) {
        gsap.to(gridNode, {
          x: 8,
          y: 4,
          duration: 8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      // Pulse nodes
      const pulses = rootRef.current?.querySelectorAll(".pulse");
      if (pulses && pulses.length) {
        gsap.to(pulses, {
          opacity: isMobile ? 0.25 : 0.45,
          scale: 1.35,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.35, from: "random", amount: isMobile ? 3 : 6 },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [isMobile]);

  // Sparse selection of pulse nodes from the grid
  const pulseCount = isMobile ? 6 : 12;
  const pulseIdx = useMemo(() => {
    const idxs = new Set<number>();
    const max = grid.length;
    const step = Math.max(1, Math.floor(max / pulseCount));
    for (let i = 0; i < max && idxs.size < pulseCount; i += step) idxs.add(i);
    return idxs;
  }, [grid.length, pulseCount]);

  const baseOpacity = isMobile ? opacity * 0.7 : opacity;

  return (
    <svg ref={rootRef} className={className} viewBox={`0 0 ${view.w} ${view.h}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g className="grid">
        {grid.map((cell, i) => (
          <polygon
            key={cell.key}
            points={hexPoints(cell.cx, cell.cy, r)}
            fill="none"
            stroke={color}
            strokeOpacity={baseOpacity * 0.35}
            strokeWidth={1}
          />
        ))}

        {/* Pulsing nodes */}
        {grid.map((cell, i) => (
          pulseIdx.has(i) ? (
            <circle key={`p-${i}`} className="pulse" cx={cell.cx} cy={cell.cy} r={2.5} fill={color} opacity={0.15} />
          ) : null
        ))}
      </g>
    </svg>
  );
}

