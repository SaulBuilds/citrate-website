import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Database, ShieldAlert, Shuffle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector(".section-title");
      const cards = sectionRef.current?.querySelectorAll(".problem-card");

      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const problems = [
    {
      icon: Zap,
      title: "Slow & Sequential",
      description: "Traditional blockchains process transactions one block at a time, creating artificial bottlenecks that limit throughput to 15-100 TPS.",
      testId: "card-problem-slow",
    },
    {
      icon: Database,
      title: "AI Infrastructure Disconnect",
      description: "Existing chains treat AI models as afterthoughts—smart contracts weren't designed for gigabyte-scale neural networks and GPU-intensive inference.",
      testId: "card-problem-ai",
    },
    {
      icon: ShieldAlert,
      title: "No Verifiable Computation",
      description: "Users have no way to verify that AI inference ran correctly, opening the door to manipulation and censorship.",
      testId: "card-problem-verification",
    },
    {
      icon: Shuffle,
      title: "Fragmented Standards",
      description: "Every AI platform uses different APIs, making it impossible to build interoperable AI applications.",
      testId: "card-problem-standards",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white" data-testid="section-problem" id="problems">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title text-4xl md:text-6xl font-bold text-center mb-16 text-white" data-testid="text-problem-title">
          Current Blockchain Limitations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="problem-card group bg-[#1A1A1A] border-2 border-[#404040] rounded-lg p-8 transition-all duration-300 hover:border-primary hover:bg-[#222222] hover:shadow-[0_0_30px_rgba(255,149,0,0.2)]"
                data-testid={problem.testId}
              >
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{problem.title}</h3>
                <p className="text-white/70 leading-relaxed">{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
