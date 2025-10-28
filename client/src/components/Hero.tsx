import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ArrowRight, Github } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import citrateIconOrange from "@assets/citrate_icon_orange_1761610658378.png";
import citrateIconBlack from "@assets/citrate_icon_black_1761610658378.png";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const backgroundLogoRef = useRef<HTMLImageElement>(null);

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

      if (backgroundLogoRef.current) {
        gsap.fromTo(
          backgroundLogoRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotation: -45,
          },
          {
            opacity: 0.03,
            scale: 1,
            rotation: 0,
            duration: 2,
            ease: "power2.out",
            delay: 0.5,
          }
        );

        gsap.to(backgroundLogoRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });

        gsap.to(backgroundLogoRef.current, {
          scale: 1.05,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white pt-32 pb-20 px-6 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,149,0,0.05)_0%,transparent_70%)]" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          ref={backgroundLogoRef}
          src={citrateIconOrange}
          alt=""
          className="w-[800px] h-[800px] opacity-0"
          style={{ maxWidth: '60vw', maxHeight: '60vh' }}
        />
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
