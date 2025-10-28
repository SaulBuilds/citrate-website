import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Zap, Cpu, Shield, Network, Lock, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = heroRef.current?.querySelector(".hero-title");
      const subtitle = heroRef.current?.querySelector(".hero-subtitle");
      const features = document.querySelectorAll(".feature-card");

      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (subtitle) {
        gsap.from(subtitle, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      if (features) {
        gsap.from(features, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: features[0],
            start: "top 80%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "10,000+ TPS Throughput",
      description: "BlockDAG consensus enables parallel block production, achieving massive throughput without sacrificing decentralization.",
      details: [
        "Multiple blocks produced simultaneously",
        "No uncle blocks—all valid blocks contribute",
        "Linear scaling with network capacity",
        "Sub-12 second finality",
      ],
    },
    {
      icon: Cpu,
      title: "AI-Native Execution",
      description: "Purpose-built virtual machine with native AI operations and EVM compatibility for seamless Ethereum integration.",
      details: [
        "Model registration and versioning",
        "On-chain inference with gas metering",
        "Tensor operations precompiles",
        "ZK proof generation for verifiable AI",
      ],
    },
    {
      icon: Network,
      title: "Model Context Protocol",
      description: "Standardized API layer compatible with OpenAI and Anthropic for universal AI model access.",
      details: [
        "OpenAI-compatible /v1/chat/completions",
        "Anthropic-compatible /v1/messages",
        "On-chain model registry and discovery",
        "Automatic routing and load balancing",
      ],
    },
    {
      icon: Shield,
      title: "Verifiable Inference",
      description: "Cryptographic proofs ensure AI outputs are genuine and unmanipulated.",
      details: [
        "ZK-SNARKs for computation verification",
        "Merkle proofs for data integrity",
        "Slashing for dishonest inference providers",
        "Transparent model provenance",
      ],
    },
    {
      icon: Lock,
      title: "Dual Signature Support",
      description: "Seamless compatibility with Ethereum ecosystem while optimizing for native efficiency.",
      details: [
        "ECDSA for MetaMask and Ethereum tools",
        "Ed25519 for faster native signatures",
        "Account abstraction for flexible auth",
        "Hardware wallet support",
      ],
    },
    {
      icon: Workflow,
      title: "Decentralized Model Marketplace",
      description: "On-chain marketplace for AI models with automated revenue distribution and access control.",
      details: [
        "Pay-per-inference pricing models",
        "Automatic royalty distribution",
        "Model access control and licensing",
        "Reputation and quality scoring",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            Citrate <span className="text-primary">Features</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
            Purpose-built infrastructure for the decentralized AI era
          </p>
          <Link href="/#features">
            <Button variant="outline" size="lg">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card bg-card border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-[0_0_30px_rgba(255,149,0,0.15)] transition-all duration-300"
                  data-testid={`feature-${index}`}
                >
                  <div className="w-14 h-14 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mb-6">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/80">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
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
