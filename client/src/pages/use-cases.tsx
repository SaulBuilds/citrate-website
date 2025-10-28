import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Code, Brain, Database, Users, Workflow, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function UseCasesPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".use-case-card");
      
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const useCases = [
    {
      icon: Brain,
      title: "Decentralized AI Inference",
      description: "Run AI models without relying on centralized providers like OpenAI or Anthropic.",
      benefits: ["No censorship or access restrictions", "Verifiable outputs with cryptographic proofs", "Pay-per-use pricing without subscriptions", "Model diversity and competition"],
      example: "A developer builds a content moderation system that runs Llama 3 inference on-chain, ensuring outputs cannot be manipulated by any single party.",
    },
    {
      icon: Database,
      title: "AI Model Marketplace",
      description: "Researchers monetize models while users access diverse AI without platform lock-in.",
      benefits: ["Automated royalty distribution", "Model versioning and provenance", "Access control and licensing", "Discovery through on-chain registry"],
      example: "A research team deploys a specialized medical AI model, earning SALT tokens every time it's used for diagnosis.",
    },
    {
      icon: Code,
      title: "Smart Contract AI Integration",
      description: "Solidity contracts can directly call AI models for dynamic, intelligent behavior.",
      benefits: ["Native AI precompiles in EVM", "Gas-metered inference calls", "Composable with DeFi protocols", "Verifiable AI decisions"],
      example: "A DAO uses an AI model to analyze proposals and provide risk assessments, with all decisions recorded on-chain.",
    },
    {
      icon: Workflow,
      title: "Agent Economies",
      description: "Autonomous AI agents transact and coordinate trustlessly on-chain.",
      benefits: ["Agents own wallets and assets", "Cryptographic agent identity", "Interoperable protocols", "Automated workflows"],
      example: "AI trading bots autonomously manage portfolios, swapping tokens based on market sentiment analysis run on-chain.",
    },
    {
      icon: Shield,
      title: "Verifiable AI Applications",
      description: "Applications where AI integrity is critical benefit from cryptographic verification.",
      benefits: ["ZK proofs for computation correctness", "Immutable audit trails", "No black-box AI decisions", "Slashing for dishonest providers"],
      example: "A credit scoring platform uses AI models with ZK proofs, allowing users to verify their scores weren't manipulated.",
    },
    {
      icon: Users,
      title: "Collaborative AI Training",
      description: "Decentralized model training with federated learning and incentivized data contribution.",
      benefits: ["Privacy-preserving training", "Incentive alignment for contributors", "On-chain model checkpoints", "Transparent training logs"],
      example: "Healthcare providers collaboratively train a diagnostic model without sharing patient data, with Citrate coordinating the process.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Use <span className="text-primary">Cases</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
            Real-world applications powered by decentralized AI infrastructure
          </p>
          <Link href="/#use-cases">
            <Button variant="outline" size="lg">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="use-case-card bg-card border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-[0_0_30px_rgba(255,149,0,0.15)] transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mb-6">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/80">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#404040]">
                    <p className="text-sm text-white/80 leading-relaxed">
                      <span className="text-primary font-semibold">Example:</span> {useCase.example}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
