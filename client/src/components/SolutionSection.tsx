import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const innovations = sectionRef.current?.querySelectorAll(".innovation-item");
      
      innovations?.forEach((innovation) => {
        gsap.from(innovation, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: innovation,
            start: "top 75%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const innovations = [
    {
      number: "1",
      title: "GhostDAG Consensus: Parallel Block Production",
      description: "Citrate uses GhostDAG—a BlockDAG consensus algorithm that allows multiple blocks to be produced simultaneously without conflicts.",
      benefits: [
        "10,000+ TPS throughput vs. 15 TPS on traditional chains",
        "Sub-12 second finality with BFT checkpoints",
        "100+ parallel blocks in the DAG simultaneously",
        "No uncle/orphan blocks—all valid blocks contribute to consensus",
      ],
      code: `Traditional Blockchain:  Block 1 → Block 2 → Block 3 → Block 4
                         (Sequential, one at a time)

Citrate BlockDAG:       Block 1 ← Block 3 ← Block 5
                          ↓         ↗
                        Block 2 ← Block 4 ← Block 6
                         (Parallel, multiple simultaneous blocks)`,
      testId: "innovation-ghostdag",
    },
    {
      number: "2",
      title: "EVM-Compatible Execution Layer (LVM)",
      description: "Citrate's Lattice Virtual Machine (LVM) is 100% EVM-compatible while adding native AI operations.",
      benefits: [
        "Deploy existing Solidity contracts without modification",
        "Use MetaMask, Hardhat, Foundry—all Ethereum tools work",
        "AI-specific precompiles for model registration, inference, and verification",
        "Dual signature support: ECDSA (Ethereum) + Ed25519 (native)",
      ],
      code: `// Register a model on-chain
function registerModel(
    bytes32 modelHash,
    string memory ipfsCID,
    string memory architecture,
    AccessPolicy policy
) external returns (ModelId);

// Run inference with verifiable results
function runInference(
    ModelId modelId,
    bytes memory inputData,
    uint64 maxGas
) external payable returns (bytes memory output);`,
      testId: "innovation-lvm",
    },
    {
      number: "3",
      title: "Model Context Protocol (MCP) Integration",
      description: "Citrate is the first blockchain to natively integrate MCP—Anthropic's open standard for AI model orchestration.",
      benefits: [
        "Standardized API: OpenAI-compatible and Anthropic-compatible endpoints",
        "Model Discovery: On-chain registry with metadata, versioning, and provenance",
        "Verifiable Inference: Cryptographic proofs that inference ran correctly",
        "Resource Management: Automatic batching, caching, and GPU allocation",
      ],
      code: `POST /v1/chat/completions          # OpenAI-compatible
POST /v1/messages                  # Anthropic-compatible
POST /v1/embeddings                # Embedding generation
GET  /v1/models                    # Model discovery
POST /v1/jobs                      # Async inference jobs`,
      testId: "innovation-mcp",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white" data-testid="section-solution" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-solution-title">
          The Solution: <span className="text-primary">Citrate</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto">
          Three Core Innovations
        </p>

        <div className="space-y-24">
          {innovations.map((innovation) => (
            <div key={innovation.number} className="innovation-item" data-testid={innovation.testId}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7">
                  <div className="text-8xl md:text-9xl font-bold text-primary/20 leading-none mb-4">
                    {innovation.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">{innovation.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {innovation.description}
                  </p>
                  <div className="space-y-3">
                    {innovation.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-border">
                    <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-border">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <pre className="m-0 p-6 bg-[#1A1A1A] text-sm text-white/90 overflow-x-auto font-mono leading-relaxed">
                      <code>{innovation.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
