import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, batchScrollFade } from "@/lib/anim";
import { Code2, FlaskConical, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      batchScrollFade(sectionRef.current?.querySelectorAll(".feature-card") || []);
    });
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Code2,
      title: "Developers",
      description: "Build with familiar tools. Deploy AI as first-class assets.",
      features: [
        "100% EVM compatibility",
        "Solidity/Vyper support",
        "MetaMask integration",
        "TypeScript & Python SDKs",
        "AI-native precompiles",
        "Hardhat & Foundry support",
      ],
      testId: "card-developers",
    },
    {
      icon: FlaskConical,
      title: "Researchers",
      description: "Monetize models with verifiable, reproducible inference.",
      features: [
        "Decentralized model marketplace",
        "Automatic versioning & IPFS storage",
        "Pay-per-inference revenue",
        "Training provenance tracking",
        "LoRA fine-tuning factory",
        "Cryptographic verification",
      ],
      testId: "card-researchers",
    },
    {
      icon: Server,
      title: "Validators",
      description: "Earn from consensus and GPU inference rewards.",
      features: [
        "Block production rewards",
        "Inference computation bonuses",
        "Storage provision incentives",
        "10,000 SALT minimum stake",
        "Delegation support",
        "Governance participation",
      ],
      testId: "card-validators",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4" data-testid="text-features-title">
          Built for <span className="text-primary">Builders</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto">
          Whether you're building, researching, or validating
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card group border border-border rounded-lg p-8 transition-all duration-300 hover:border-primary hover:-translate-y-1"
                data-testid={feature.testId}
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon size={32} className="text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 flex-shrink-0">✓</span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="#"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                    data-testid={`link-learn-more-${feature.testId}`}
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
