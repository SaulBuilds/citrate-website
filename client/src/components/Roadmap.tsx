import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phases = sectionRef.current?.querySelectorAll(".phase-item");
      
      if (phases) {
        phases.forEach((phase, index) => {
          gsap.from(phase, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: phase,
              start: "top 80%",
            },
            delay: index * 0.1,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const phases = [
    {
      status: "completed",
      phase: "Phase 1",
      title: "Foundation",
      date: "Completed",
      items: [
        "GhostDAG consensus implementation",
        "EVM-compatible execution layer",
        "Genesis block and testnet launch",
      ],
      testId: "phase-foundation",
    },
    {
      status: "completed",
      phase: "Phase 2",
      title: "Core Infrastructure",
      date: "Completed",
      items: [
        "Model registry smart contracts",
        "IPFS/Arweave integration",
        "Basic MCP endpoints",
      ],
      testId: "phase-infrastructure",
    },
    {
      status: "completed",
      phase: "Phase 3",
      title: "Developer Tools",
      date: "Completed",
      items: [
        "TypeScript SDK",
        "Python SDK",
        "CLI wallet",
        "Block explorer",
      ],
      testId: "phase-tools",
    },
    {
      status: "in-progress",
      phase: "Phase 4",
      title: "Model Marketplace",
      date: "In Progress - Week 3",
      items: [
        "Model marketplace contracts",
        "Discovery and search engine",
        "Rating and review system",
        "Payment processing",
      ],
      testId: "phase-marketplace",
    },
    {
      status: "future",
      phase: "Phase 5",
      title: "Advanced Features",
      date: "Q1 2025",
      items: [
        "Federated learning framework",
        "ZK proof integration",
        "LoRA fine-tuning at scale",
        "Cross-chain bridges",
      ],
      testId: "phase-advanced",
    },
    {
      status: "future",
      phase: "Phase 6",
      title: "Mainnet Launch",
      date: "Q2 2025",
      items: [
        "Security audits",
        "Mainnet genesis",
        "Validator onboarding",
        "Token distribution",
      ],
      testId: "phase-mainnet",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={32} className="text-primary" />;
      case "in-progress":
        return <Loader2 size={32} className="text-primary animate-spin" />;
      default:
        return <Circle size={32} className="text-border" />;
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white" data-testid="section-roadmap" id="roadmap">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-roadmap-title">
          Development <span className="text-primary">Roadmap</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto">
          Our journey from concept to mainnet
        </p>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-4 md:left-8 top-8 bottom-8 w-0.5 bg-border" />
          
          <div className="space-y-12">
            {phases.map((phase) => (
              <div key={phase.phase} className="phase-item relative" data-testid={phase.testId}>
                <div className="flex gap-6 md:gap-12">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-background border-4 border-background rounded-full flex items-center justify-center z-10 relative">
                      {getStatusIcon(phase.status)}
                    </div>
                  </div>
                  
                  <div className="flex-1 pb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="text-sm font-semibold text-primary mb-1">{phase.phase}</div>
                        <h3 className="text-2xl md:text-3xl font-bold">{phase.title}</h3>
                      </div>
                      <div className={`text-sm font-medium mt-2 md:mt-0 ${
                        phase.status === "in-progress" ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {phase.date}
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`mt-1.5 ${
                            phase.status === "completed" ? "text-primary" : "text-muted-foreground"
                          }`}>
                            {phase.status === "completed" ? "✓" : "•"}
                          </span>
                          <span className={phase.status === "completed" ? "text-foreground" : "text-muted-foreground"}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
