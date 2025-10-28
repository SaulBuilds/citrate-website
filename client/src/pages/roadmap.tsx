import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function RoadmapPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phases = document.querySelectorAll(".roadmap-phase");
      
      if (phases) {
        gsap.from(phases, {
          opacity: 0,
          x: -50,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const phases = [
    {
      quarter: "Q1 2025",
      title: "Foundation",
      status: "completed",
      milestones: [
        "GhostDAG consensus implementation",
        "EVM-compatible execution layer",
        "Basic MCP integration",
        "Testnet v1 launch",
        "Developer documentation",
      ],
    },
    {
      quarter: "Q2 2025",
      title: "Mainnet Preparation",
      status: "in-progress",
      milestones: [
        "Security audits (consensus + execution)",
        "Mainnet genesis preparation",
        "Model Context Protocol v1.0",
        "AI precompiles deployment",
        "Developer tooling (SDK, CLI)",
      ],
    },
    {
      quarter: "Q3 2025",
      title: "Mainnet Launch",
      status: "upcoming",
      milestones: [
        "Mainnet genesis block",
        "LATT token distribution",
        "Model marketplace launch",
        "Validator onboarding program",
        "First production AI models deployed",
      ],
    },
    {
      quarter: "Q4 2025",
      title: "Ecosystem Expansion",
      status: "upcoming",
      milestones: [
        "Developer grants program ($10M)",
        "Cross-chain bridges (Ethereum, Solana)",
        "Enhanced model discovery UI",
        "Decentralized model training",
        "Enterprise partnerships",
      ],
    },
    {
      quarter: "2026",
      title: "Advanced Features",
      status: "future",
      milestones: [
        "Zero-knowledge proof system for verifiable AI",
        "Federated learning infrastructure",
        "GPU resource marketplace",
        "Advanced governance mechanisms",
        "Layer 2 scaling solutions",
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="text-green-500" size={24} />;
    if (status === "in-progress") return <Clock className="text-primary" size={24} />;
    return <Circle className="text-muted-foreground" size={24} />;
  };

  const getStatusLabel = (status: string) => {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    if (status === "upcoming") return "Upcoming";
    return "Future";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Development <span className="text-primary">Roadmap</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
            Our journey to building the first AI-native blockchain
          </p>
          <Link href="/#roadmap">
            <Button variant="outline" size="lg">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {phases.map((phase, index) => (
                <div key={index} className="roadmap-phase relative pl-20">
                  {/* Status icon */}
                  <div className="absolute left-0 top-2 w-16 h-16 bg-background border-2 border-border rounded-full flex items-center justify-center">
                    {getStatusIcon(phase.status)}
                  </div>

                  {/* Content */}
                  <div className="bg-card border-2 border-border rounded-lg p-8 hover:border-primary transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-primary font-semibold mb-1">{phase.quarter}</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">{phase.title}</h3>
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
                        {getStatusLabel(phase.status)}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {phase.milestones.map((milestone, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground/80">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
