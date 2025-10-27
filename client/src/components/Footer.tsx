import { Github, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Architecture", href: "#architecture" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Roadmap", href: "#roadmap" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Whitepaper", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#faq" },
    ],
    community: [
      { label: "Discord", href: "#", icon: MessageCircle },
      { label: "Twitter", href: "#", icon: Twitter },
      { label: "GitHub", href: "#", icon: Github },
      { label: "Forum", href: "#" },
    ],
  };

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C</span>
              </div>
              <span className="text-white font-bold text-2xl">Citrate</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              The first AI-native blockchain built for the age of decentralized intelligence.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © 2025 Citrate Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
