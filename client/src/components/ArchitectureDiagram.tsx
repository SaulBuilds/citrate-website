import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Cpu, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureDiagram() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = sectionRef.current?.querySelectorAll(".layer");
      
      if (layers) {
        layers.forEach((layer, index) => {
          gsap.from(layer, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: layer,
              start: "top 75%",
            },
            delay: index * 0.15,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const layers = [
    {
      icon: Cloud,
      number: "Layer 3",
      title: "Model Context Protocol (MCP)",
      features: [
        "OpenAI/Anthropic-compatible APIs",
        "Model discovery and routing",
        "Resource allocation and batching",
        "Inference verification",
      ],
      services: ["Registry", "Router", "Scheduler", "Verifier"],
      testId: "layer-mcp",
    },
    {
      icon: Cpu,
      number: "Layer 2",
      title: "Execution Layer (LVM)",
      features: [
        "EVM-compatible bytecode execution",
        "AI precompiles for model operations",
        "Merkle Patricia Trie state storage",
        "Gas metering for AI workloads",
      ],
      services: ["0x1000: Model registration", "0x1001: Inference execution", "0x1002: Tensor operations", "0x1003-1004: ZK proofs"],
      testId: "layer-lvm",
    },
    {
      icon: Layers,
      number: "Layer 1",
      title: "Consensus Layer (GhostDAG)",
      features: [
        "BlockDAG structure with parallel production",
        "k-cluster rule for blue set selection",
        "BFT checkpoints for finality",
        "Selected parent chain for total ordering",
      ],
      services: ["k = 18", "max_parents = 10", "block_time = 1-2s", "finality = 12s"],
      testId: "layer-ghostdag",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white" data-testid="section-architecture" id="architecture">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-architecture-title">
          Technical Architecture
        </h2>
        <p className="text-xl text-center text-white/70 mb-20 max-w-3xl mx-auto">
          Three-Layer Design for AI-Native Blockchain
        </p>

        <div className="space-y-8 max-w-5xl mx-auto">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div key={layer.number} className="layer" data-testid={layer.testId}>
                <div className="relative border-2 border-zinc-600 rounded-lg p-8 md:p-10 bg-zinc-800 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center">
                        <Icon size={32} className="text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm text-primary font-semibold mb-2">{layer.number}</div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{layer.title}</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-white/60 mb-3">Features:</h4>
                          <ul className="space-y-2">
                            {layer.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-white/80">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-white/60 mb-3">Key Parameters:</h4>
                          <ul className="space-y-2">
                            {layer.services.map((service, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-white/80 font-mono text-sm">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {index < layers.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
