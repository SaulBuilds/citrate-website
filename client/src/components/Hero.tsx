import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ArrowRight, Github } from "lucide-react";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.from(words, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.from(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.from(
        diagramRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );

      const blocks = diagramRef.current?.querySelectorAll(".block");
      if (blocks) {
        tl.from(
          blocks,
          {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white pt-32 pb-20 px-6 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,149,0,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            <span className="word inline-block">The</span>{" "}
            <span className="word inline-block">First</span>{" "}
            <span className="word inline-block text-primary">AI-Native</span>{" "}
            <span className="word inline-block">Blockchain</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            Built for the Age of Decentralized Intelligence
          </p>

          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-4xl mx-auto">
            Citrate combines cutting-edge BlockDAG consensus with standardized AI model orchestration, creating the first blockchain purpose-built for artificial intelligence workloads.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" variant="default" className="text-lg px-8 h-14 min-w-[200px]" data-testid="button-get-started-hero">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 min-w-[200px] border-white text-white hover:bg-white/10" data-testid="button-github-hero">
              <Github className="mr-2" size={20} />
              View on GitHub
            </Button>
          </div>

          <div ref={diagramRef} className="max-w-4xl mx-auto" data-testid="diagram-blockdag">
            <div className="bg-card/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-white/60">Traditional Blockchain</h3>
                  <div className="flex items-center gap-3">
                    <div className="block w-16 h-16 bg-white/10 border-2 border-white/30 rounded flex items-center justify-center text-sm">B1</div>
                    <div className="w-8 h-0.5 bg-white/30" />
                    <div className="block w-16 h-16 bg-white/10 border-2 border-white/30 rounded flex items-center justify-center text-sm">B2</div>
                    <div className="w-8 h-0.5 bg-white/30" />
                    <div className="block w-16 h-16 bg-white/10 border-2 border-white/30 rounded flex items-center justify-center text-sm">B3</div>
                  </div>
                  <p className="text-sm text-white/50 mt-4">Sequential, one at a time</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6 text-primary">Citrate BlockDAG</h3>
                  <div className="relative">
                    <div className="flex items-start gap-8">
                      <div className="flex flex-col gap-8">
                        <div className="block w-16 h-16 bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-sm">B1</div>
                        <div className="block w-16 h-16 bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-sm">B2</div>
                        <div className="block w-16 h-16 bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-sm">B4</div>
                      </div>
                      <div className="flex flex-col gap-8 mt-4">
                        <div className="block w-16 h-16 bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-sm">B3</div>
                        <div className="block w-16 h-16 bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-sm">B5</div>
                      </div>
                    </div>
                    <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
                      <line x1="70" y1="32" x2="130" y2="48" stroke="rgba(255,149,0,0.4)" strokeWidth="2" />
                      <line x1="70" y1="96" x2="130" y2="80" stroke="rgba(255,149,0,0.4)" strokeWidth="2" />
                      <line x1="70" y1="96" x2="130" y2="144" stroke="rgba(255,149,0,0.4)" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-sm text-primary/70 mt-4">Parallel, multiple simultaneous blocks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
