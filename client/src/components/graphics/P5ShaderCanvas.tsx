import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  density?: number; // pixel density cap
  speed?: number;   // animation speed multiplier
  opacity?: number; // overall opacity for blending into backgrounds
}

/**
 * P5ShaderCanvas
 *
 * Lightweight wrapper that mounts a p5.js WEBGL shader loop using the global p5 from CDN.
 * Cleans up on unmount. Uses a simple flow-noise fragment shader suitable for subtle backdrops.
 */
export default function P5ShaderCanvas({ className, density = 1.5, speed = 1.0, opacity = 0.9 }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<any>(null);

  useEffect(() => {
    const host = hostRef.current;
    const reduce = typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
    if (!host || !(window as any).p5 || reduce) return;

    const P5 = (window as any).p5;

    const sketch = (p: any) => {
      let shaderProg: any;
      let start = 0;

      const vert = `
        attribute vec3 aPosition;
        void main() {
          gl_Position = vec4(aPosition, 1.0);
        }
      `;

      // Subtle animated noise + circular vignette, orange hue
      const frag = `
        precision highp float;
        uniform vec2 u_res;
        uniform float u_time;
        uniform float u_speed;
        uniform float u_opacity;

        // iq-style hash noise
        float hash(vec2 p){
          p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)));
          return -1.0 + 2.0*fract(sin(p)*43758.5453123);
        }

        float noise(in vec2 p){
          const float K1 = 0.366025404; // (sqrt(3)-1)/2;
          const float K2 = 0.211324865; // (3-sqrt(3))/6;
          vec2 i = floor(p + (p.x+p.y)*K1);
          vec2 a = p - i + (i.x+i.y)*K2;
          vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
          vec2 b = a - o + K2;
          vec2 c = a - 1.0 + 2.0*K2;
          float h0 = max(0.5 - dot(a,a), 0.0);
          float h1 = max(0.5 - dot(b,b), 0.0);
          float h2 = max(0.5 - dot(c,c), 0.0);
          float n = h0*h0*h0*h0*hash(i) + h1*h1*h1*h1*hash(i+o) + h2*h2*h2*h2*hash(i+1.0);
          return n * 0.7;
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / u_res.xy;
          vec2 p = (uv - 0.5) * vec2(u_res.x/u_res.y, 1.0);

          float t = u_time * 0.05 * u_speed;
          float n = 0.0;
          // Fractal sum of noise for smooth flow
          n += noise(p*2.0 + t);
          n += 0.5*noise(p*4.0 - t*0.9);
          n += 0.25*noise(p*8.0 + t*1.3);
          n = smoothstep(-0.2, 0.8, n);

          // Orange gradient palette
          vec3 base = mix(vec3(0.06, 0.03, 0.00), vec3(1.0, 0.58, 0.0), n);

          // Vignette to keep edges subtle behind content
          float r = length(p);
          float vign = smoothstep(0.85, 0.2, r);
          vec3 col = base * vign;

          gl_FragColor = vec4(col, u_opacity);
        }
      `;

      p.setup = () => {
        const c = p.createCanvas(host.clientWidth, host.clientHeight, p.WEBGL);
        c.parent(host);
        p.pixelDensity(Math.min(window.devicePixelRatio, density));
        shaderProg = p.createShader(vert, frag);
        start = p.millis();
        p.noStroke();
      };

      p.windowResized = () => {
        p.resizeCanvas(host.clientWidth, host.clientHeight);
      };

      p.draw = () => {
        p.shader(shaderProg);
        shaderProg.setUniform("u_res", [p.width, p.height]);
        shaderProg.setUniform("u_time", (p.millis() - start) / 1000.0);
        shaderProg.setUniform("u_speed", speed);
        shaderProg.setUniform("u_opacity", opacity);
        p.rect(-p.width/2, -p.height/2, p.width, p.height);
      };
    };

    p5Ref.current = new P5(sketch);

    return () => {
      try { p5Ref.current?.remove?.(); } catch {}
      p5Ref.current = null;
    };
  }, [density, speed, opacity]);

  return <div ref={hostRef} className={className} />;
}
