import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, fadeInUp, cleanup } from "@/lib/anim";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FeatureCards from "@/components/FeatureCards";
import { Layers, Cpu, Cloud, Database, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const title = heroRef.current?.querySelector(".hero-title");
      if (title) fadeInUp(title, { y: 30 });
      const layers = document.querySelectorAll(".arch-layer");
      if (layers && layers.length) {
        gsap.from(layers, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: layers[0], start: "top 75%" },
        });
      }
    });
    return () => cleanup(ctx);
  }, []);

  const layers = [
    {
      icon: Cloud,
      number: "Layer 3",
      title: "Model Context Protocol (MCP)",
      description: "Standardized API layer for universal AI model access and orchestration.",
      features: [
        "OpenAI-compatible /v1/chat/completions",
        "Anthropic-compatible /v1/messages",
        "On-chain model registry with discovery",
        "Automatic load balancing and routing",
        "Verifiable inference with cryptographic proofs",
        "Resource allocation and GPU scheduling",
      ],
      code: `// OpenAI-compatible API\nPOST /v1/chat/completions\n{\n  "model": "gpt-4-turbo",\n  "messages": [{\n    "role": "user",\n    "content": "Explain blockchain"\n  }]\n}\n\n// Anthropic-compatible API\nPOST /v1/messages\n{\n  "model": "claude-3-opus",\n  "messages": [...],\n  "max_tokens": 1024\n}`,
    },
    {
      icon: Cpu,
      number: "Layer 2",
      title: "Execution Layer (CVM)",
      description: "EVM-compatible virtual machine with AI-specific precompiles and native tensor operations.",
      features: [
        "100% EVM bytecode compatibility",
        "Deploy Solidity contracts unchanged",
        "AI precompiles at 0x1000-0x1004",
        "Model registration and inference",
        "ZK proof generation for verifiable AI",
        "Adaptive gas metering for AI workloads",
      ],
      code: `// Register AI model on-chain\nfunction registerModel(\n  bytes32 modelHash,\n  string memory ipfsCID,\n  string memory architecture,\n  AccessPolicy policy\n) external returns (ModelId);\n\n// Run verifiable inference\nfunction runInference(\n  ModelId modelId,\n  bytes memory inputData,\n  uint64 maxGas\n) external payable \n  returns (bytes memory output);`,
    },
    {
      icon: Layers,
      number: "Layer 1",
      title: "Consensus Layer (GhostDAG)",
      description: "BlockDAG consensus enabling parallel block production with total ordering and finality.",
      features: [
        "Parallel blocks (high throughput)",
        "k-cluster rule for Byzantine resistance",
        "BFT checkpoints for finality",
        "Selected parent chain ordering",
        "VRF-based leader election",
        "~12s finality",
      ],
      code: `// BlockDAG Structure\nGenesis → Block A ← Block C\n         ↓         ↗\n       Block B ← Block D\n\n// Parallel Production\nk = 18 (anticone parameter)\nmax_parents = 10\nblock_time = 1-2s\nfinality = 12s`,
    },
  ];

  const components = [
    { icon: Database, title: "Storage Layer", description: "RocksDB-backed chain storage with IPFS/Arweave integration for AI model artifacts." },
    { icon: Shield, title: "Network Layer", description: "libp2p-based P2P protocol for efficient block and transaction propagation." },
    { icon: Zap, title: "API Layer", description: "JSON-RPC endpoints compatible with Ethereum tooling (MetaMask, Hardhat, Foundry)." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">Technology</h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">Three layers, one AI‑native chain.</p>
          <Link href="/">
            <Button variant="outline" size="lg">Back to Homepage</Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {layers.map((layer) => {
              const Icon = layer.icon as any;
              return (
                <div key={layer.number} className="arch-layer">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="text-primary font-semibold mb-2">{layer.number}</div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center">
                          <Icon size={32} className="text-primary" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground">{layer.title}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{layer.description}</p>
                      <ul className="space-y-3">
                        {layer.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-primary mt-1.5">•</span>
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#404040]">
                      <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-[#404040]">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <pre className="p-6 text-sm text-white/90 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">{layer.code}</pre>
                    </div>
                  </div>

                  {layer.number !== "Layer 1" && (
                    <div className="flex justify-center my-8">
                      <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-primary/20" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-24">
            <h3 className="text-3xl font-bold text-center mb-16">Additional Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {components.map((component, index) => {
                const Icon = component.icon as any;
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 border border-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-foreground">{component.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{component.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Role-based feature summary */}
      <FeatureCards />

      <Footer />
    </div>
  );
}
