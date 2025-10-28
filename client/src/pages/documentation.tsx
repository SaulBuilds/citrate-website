import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Book, FileText, Code, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("abstract");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = heroRef.current?.querySelector(".hero-title");
      const sections = document.querySelectorAll(".doc-section");
      
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (sections) {
        gsap.from(sections, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const sections = [
    { id: "abstract", title: "Abstract", icon: FileText },
    { id: "architecture", title: "Architecture", icon: Code },
    { id: "consensus", title: "Consensus (GhostDAG)", icon: Shield },
    { id: "whitepaper", title: "Full Whitepaper", icon: Book },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            <span className="text-primary">Documentation</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
            Technical documentation for the Citrate AI-native blockchain
          </p>
          <p className="text-sm text-white/50 mb-8">Version 1.0 - October 2025</p>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === section.id
                          ? "bg-primary text-black font-semibold"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeSection === "abstract" && (
                <div className="doc-section space-y-6">
                  <h2 className="text-4xl font-bold text-foreground mb-6">Abstract</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Citrate introduces the first blockchain architecture purpose-built for artificial intelligence workloads. 
                    By combining GhostDAG consensus for parallel block production, an EVM-compatible execution layer with 
                    AI-specific precompiles, and native Model Context Protocol (MCP) integration, Citrate creates a platform 
                    where AI models become first-class on-chain assets with verifiable provenance, decentralized hosting, and 
                    cryptographic guarantees.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Key Contributions</h3>
                  <ul className="space-y-3">
                    {[
                      "GhostDAG Consensus Adaptation - First production implementation with BFT checkpoints",
                      "AI-Native Execution Environment - EVM-compatible VM with tensor operations and ZK proofs",
                      "Model Context Protocol Layer - Standardized API for AI model orchestration",
                      "Dual Cryptographic System - ECDSA (Ethereum) + Ed25519 (native efficiency)",
                      "Decentralized Model Marketplace - On-chain registry with revenue distribution",
                    ].map((contribution, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-foreground">{contribution}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Design Goals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Throughput", value: "10,000+ TPS" },
                      { label: "Finality", value: "≤12 seconds" },
                      { label: "Compatibility", value: "100% EVM" },
                      { label: "Scalability", value: "GB-scale models" },
                    ].map((goal, idx) => (
                      <div key={idx} className="bg-[#1A1A1A] rounded-lg p-4 border border-[#404040]">
                        <div className="text-primary font-semibold mb-1">{goal.label}</div>
                        <div className="text-white text-xl font-bold">{goal.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "architecture" && (
                <div className="doc-section space-y-6">
                  <h2 className="text-4xl font-bold text-foreground mb-6">System Architecture</h2>
                  
                  <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#404040] mb-8">
                    <pre className="text-white/90 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre">
{`┌─────────────────────────────────────────────────┐
│  Layer 3: Model Context Protocol (MCP)          │
│  - OpenAI/Anthropic-compatible APIs              │
│  - Model registry and discovery                  │
└─────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────┐
│  Layer 2: Execution Layer (CVM)                 │
│  - EVM-compatible bytecode execution             │
│  - AI precompiles (0x1000-0x1004)               │
└─────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────┐
│  Layer 1: Consensus Layer (GhostDAG)            │
│  - BlockDAG structure with parallel production   │
│  - BFT checkpoints for finality                 │
└─────────────────────────────────────────────────┘`}
                    </pre>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Layer Components</h3>
                  <div className="space-y-6">
                    <div className="bg-card border-2 border-border rounded-lg p-6">
                      <h4 className="text-xl font-bold mb-3 text-primary">Consensus Layer</h4>
                      <ul className="space-y-2">
                        <li className="text-foreground">• GhostDAG Engine: Blue set calculation and topological ordering</li>
                        <li className="text-foreground">• Tip Selection: VRF-based leader election</li>
                        <li className="text-foreground">• Finality Committee: BFT checkpoints every ~10 blocks</li>
                        <li className="text-foreground">• DAG Store: Efficient block storage and retrieval</li>
                      </ul>
                    </div>

                    <div className="bg-card border-2 border-border rounded-lg p-6">
                      <h4 className="text-xl font-bold mb-3 text-primary">Execution Layer (CVM)</h4>
                      <ul className="space-y-2">
                        <li className="text-foreground">• 100% EVM-compatible bytecode interpreter</li>
                        <li className="text-foreground">• StateDB: Merkle Patricia Trie account state</li>
                        <li className="text-foreground">• AI Precompiles: Model registration, inference, tensor ops</li>
                        <li className="text-foreground">• Gas Scheduler: Adaptive metering for AI workloads</li>
                      </ul>
                    </div>

                    <div className="bg-card border-2 border-border rounded-lg p-6">
                      <h4 className="text-xl font-bold mb-3 text-primary">MCP Layer</h4>
                      <ul className="space-y-2">
                        <li className="text-foreground">• Model Registry: On-chain metadata and versioning</li>
                        <li className="text-foreground">• Router: Request routing to available instances</li>
                        <li className="text-foreground">• Scheduler: GPU resource allocation</li>
                        <li className="text-foreground">• Verifier: Proof generation and validation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "consensus" && (
                <div className="doc-section space-y-6">
                  <h2 className="text-4xl font-bold text-foreground mb-6">GhostDAG Consensus</h2>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">BlockDAG vs Blockchain</h3>
                  <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#404040] mb-6">
                    <pre className="text-white/90 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre">
{`Traditional Blockchain:
Genesis → Block 1 → Block 2 → Block 3
(Sequential, one at a time)

Citrate BlockDAG:
         ┌─ Block 3 ─┐
Genesis ─┼─ Block 2 ─┼─ Block 5
         └─ Block 4 ─┘
(Parallel, multiple simultaneous blocks)`}
                    </pre>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">Key Parameters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card border-2 border-primary rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">18</div>
                      <div className="text-sm text-muted-foreground">k-cluster</div>
                    </div>
                    <div className="bg-card border-2 border-primary rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">10</div>
                      <div className="text-sm text-muted-foreground">max parents</div>
                    </div>
                    <div className="bg-card border-2 border-primary rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">1-2s</div>
                      <div className="text-sm text-muted-foreground">block time</div>
                    </div>
                    <div className="bg-card border-2 border-primary rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">12s</div>
                      <div className="text-sm text-muted-foreground">finality</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">Security Properties</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5">•</span>
                      <span className="text-foreground"><strong>Liveness:</strong> Honest transactions confirmed within bounded time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5">•</span>
                      <span className="text-foreground"><strong>Safety:</strong> Finalized blocks irreversible with cryptographic security</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5">•</span>
                      <span className="text-foreground"><strong>Fairness:</strong> All honest blocks contribute to consensus</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeSection === "whitepaper" && (
                <div className="doc-section space-y-6">
                  <h2 className="text-4xl font-bold text-foreground mb-6">Full Technical Whitepaper</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    The complete Citrate whitepaper contains detailed technical specifications including:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {[
                      "Detailed consensus algorithms",
                      "Smart contract specifications",
                      "Tokenomics and economics",
                      "Security model and analysis",
                      "Performance benchmarks",
                      "Comparative analysis with other chains",
                      "Implementation details",
                      "Future development roadmap",
                    ].map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 text-center">
                    <Book className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-3">Download Complete Whitepaper</h3>
                    <p className="text-muted-foreground mb-6">
                      Access the full 100+ page technical specification
                    </p>
                    <Button size="lg" variant="default">
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
