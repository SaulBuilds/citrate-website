import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, Code, ServerCog, ShieldCheck, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function DocumentationPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = heroRef.current?.querySelector(".hero-title");
      const tiles = document.querySelectorAll(".doc-tile");
      if (title) gsap.from(title, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });
      if (tiles) {
        gsap.from(tiles, { opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: "power3.out" });
      }
    });
    return () => ctx.revert();
  }, []);

  const tiles = [
    { href: "/docs/overview", title: "Overview", desc: "Architecture, vision, and core concepts", icon: Layers },
    { href: "/docs/developers", title: "Developers", desc: "SDKs, RPCs, contracts, examples", icon: Code },
    { href: "/docs/operators", title: "Operators", desc: "Run a node, monitor, maintain", icon: ServerCog },
    { href: "/docs/providers", title: "Providers", desc: "Model registry and inference", icon: BookOpen },
    { href: "/docs/users", title: "Users", desc: "Wallet, accounts, getting started", icon: Users },
    { href: "/docs/security", title: "Security", desc: "Threat model and audits", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section ref={heroRef} className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">Docs</h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">Start here by role. Content stubs for now.</p>
          <Link href="/">
            <Button variant="outline" size="lg">Back to Homepage</Button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiles.map((t) => {
              const Icon = t.icon as any;
              return (
                <Link key={t.href} href={t.href}>
                  <div className="doc-tile cursor-pointer bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{t.title}</h3>
                    <p className="text-muted-foreground">{t.desc}</p>
                    <p className="text-xs text-muted-foreground/70 mt-4">Stubbed. We may inline docs here later.</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
