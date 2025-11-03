import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ArrowRight, Github } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import NeuralNetBackground from "./NeuralNetBackground";
import { prefersReducedMotion, fadeInUp, cleanup } from "@/lib/anim";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        gsap.from(words, { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "power3.out" });
      }
      if (subtitleRef.current) fadeInUp(subtitleRef.current);
      if (ctaRef.current) fadeInUp(ctaRef.current);
    });
    return () => cleanup(ctx);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white pt-32 pb-20 px-6 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 pointer-events-none">
        <NeuralNetBackground className="w-full h-full" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div ref={logoRef} className="flex justify-center mb-12">
            <AnimatedLogo size={150} autoPlay={true} delay={0.2} />
          </div>
          
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            <span className="word inline-block">Welcome</span>{" "}
            <span className="word inline-block">to</span>{" "}
            <span className="word inline-block">the</span>{" "}
            <span className="word inline-block text-primary">AI-Native</span>{" "}
            <span className="word inline-block">Blockchain</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            GhostDag Consensus, EVM Compatibility, and MCP for scalable distribution of models and inference on-chain.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" variant="default" className="text-lg px-8 h-14 min-w-[200px]" data-testid="button-get-started-hero">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 h-14 min-w-[200px] border-white text-white hover:bg-white/10" 
              data-testid="button-github-hero"
              onClick={() => window.open('https://github.com/saulbuilds/citrate', '_blank')}
            >
              <Github className="mr-2" size={20} />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
