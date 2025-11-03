import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin once. Safe to call multiple times.
try { gsap.registerPlugin(ScrollTrigger); } catch {}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const defaults = {
  ease: "power3.out" as gsap.EaseString,
  duration: 0.6,
  stagger: 0.08,
};

export function fadeInUp(target: gsap.TweenTarget, opts: Partial<gsap.TweenVars> = {}) {
  return gsap.from(target, { opacity: 0, y: 20, duration: defaults.duration, ease: defaults.ease, ...opts });
}

export function batchScrollFade(targets: string | Element[] | NodeListOf<Element>, opts: Partial<gsap.TweenVars> = {}) {
  const elements = typeof targets === "string" ? document.querySelectorAll(targets) : targets;
  if (!elements || (elements as any).length === 0) return;
  return gsap.from(elements as any, {
    opacity: 0,
    y: 20,
    duration: defaults.duration,
    ease: defaults.ease,
    stagger: defaults.stagger,
    scrollTrigger: { trigger: (elements as any)[0] || document.body, start: "top 75%" },
    ...opts,
  });
}

export function cleanup(ctx: gsap.Context | undefined) {
  if (ctx) ctx.revert();
}

