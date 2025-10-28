import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "BlockDAG", href: "/blockdag" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">C</span>
            </div>
            <span className="text-foreground font-bold text-2xl">Citrate</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("/");
              return isExternal ? (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-foreground/70 hover:text-foreground transition-colors relative group cursor-pointer"
                    data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/70 hover:text-foreground transition-colors relative group"
                  data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="default" data-testid="button-docs">
              Documentation
            </Button>
            <Button variant="default" size="default" data-testid="button-get-started">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10" data-testid="mobile-menu">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-foreground/70 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="ghost" size="default" className="w-full" data-testid="button-docs-mobile">
                Documentation
              </Button>
              <Button variant="default" size="default" className="w-full" data-testid="button-get-started-mobile">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
