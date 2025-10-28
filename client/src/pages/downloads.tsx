import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, Github, Terminal, Cpu, Monitor, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadsPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = heroRef.current?.querySelector(".hero-title");
      const cards = document.querySelectorAll(".download-card");
      
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const downloads = [
    {
      icon: Terminal,
      title: "Core Node",
      description: "Run a Citrate validator or full node. Participate in consensus, earn rewards, and help secure the network.",
      version: "v0.3.1",
      platforms: ["Linux", "macOS", "Windows"],
      features: [
        "GhostDAG consensus implementation",
        "EVM-compatible execution layer",
        "WebSocket RPC endpoints",
        "Metrics and monitoring",
      ],
      githubUrl: "https://github.com/saulbuilds/citrate/releases/tag/node-v0.3.1",
    },
    {
      icon: FileCode,
      title: "SDK & Libraries",
      description: "Developer SDKs for building on Citrate. Includes JavaScript/TypeScript, Python, Rust, and Go libraries.",
      version: "v1.0.0",
      platforms: ["npm", "PyPI", "crates.io", "Go"],
      features: [
        "Account management and transactions",
        "Smart contract deployment",
        "Model Context Protocol client",
        "WebSocket subscriptions",
      ],
      githubUrl: "https://github.com/saulbuilds/citrate/tree/main/sdk",
    },
    {
      icon: Monitor,
      title: "GUI Wallet",
      description: "Desktop wallet for managing LATT tokens, deploying contracts, and interacting with AI models.",
      version: "v0.2.0",
      platforms: ["Linux", "macOS", "Windows"],
      features: [
        "Hardware wallet support",
        "Smart contract interaction",
        "AI model deployment UI",
        "Network statistics dashboard",
      ],
      githubUrl: "https://github.com/saulbuilds/citrate/releases/tag/gui-v0.2.0",
    },
  ];

  const resources = [
    {
      icon: Github,
      title: "GitHub Repository",
      description: "Browse source code, contribute, and report issues",
      link: "https://github.com/saulbuilds/citrate",
    },
    {
      icon: FileCode,
      title: "API Documentation",
      description: "Complete API reference and integration guides",
      link: "https://docs.citrate.network/api",
    },
    {
      icon: Terminal,
      title: "Developer Tutorials",
      description: "Step-by-step guides for building on Citrate",
      link: "https://docs.citrate.network/tutorials",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            <span className="text-primary">Downloads</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Get started with Citrate. Download the core node, SDKs, and tools to build on the AI-native blockchain.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {downloads.map((download, index) => {
              const Icon = download.icon;
              return (
                <div
                  key={index}
                  className="download-card bg-card border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-[0_0_30px_rgba(255,149,0,0.15)] transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon size={28} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-foreground">{download.title}</h3>
                            <span className="text-xs bg-primary/20 text-primary font-semibold px-2 py-1 rounded">
                              {download.version}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4">{download.description}</p>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-semibold text-foreground">Platforms:</span>
                            <div className="flex gap-2">
                              {download.platforms.map((platform) => (
                                <span
                                  key={platform}
                                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                                >
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>

                          <ul className="space-y-2">
                            {download.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-foreground/80">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a href={download.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="w-full" data-testid={`button-download-${index}`}>
                          <Download className="mr-2" size={20} />
                          Download
                        </Button>
                      </a>
                      <a href="https://github.com/saulbuilds/citrate" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="w-full" data-testid={`button-github-${index}`}>
                          <Github className="mr-2" size={20} />
                          View on GitHub
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{resource.title}</h3>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
