import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";
import gsap from "gsap";
import citrateIconOrange from "@assets/citrate_icon_orange_1761610658378.png";

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenNav({ isOpen, onClose }: FullScreenNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Architecture", href: "/architecture" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "BlockDAG", href: "/blockdag" },
    { label: "Documentation", href: "/documentation" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
  ];

  useEffect(() => {
    if (isOpen) {
      // Animate overlay in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate menu items in with stagger
      const items = menuRef.current?.querySelectorAll(".menu-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: "power3.out", delay: 0.1 }
        );
      }

      // Animate logo in
      const logo = menuRef.current?.querySelector(".menu-logo");
      if (logo) {
        gsap.fromTo(
          logo,
          { opacity: 0, scale: 0.8, rotation: -45 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
        );
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    // Animate out before closing
    const items = menuRef.current?.querySelectorAll(".menu-item");
    if (items) {
      gsap.to(items, {
        opacity: 0,
        x: 50,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.in",
      });
    }
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black"
      data-testid="fullscreen-nav"
    >
      <div ref={menuRef} className="h-full flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="menu-logo absolute top-8 left-8 flex items-center gap-3">
          <img src={citrateIconOrange} alt="Citrate" className="w-12 h-12" />
          <span className="text-white font-bold text-2xl">Citrate</span>
        </div>

        {/* Close button */}
        <button
          onClick={handleLinkClick}
          className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
          data-testid="button-close-menu"
        >
          <X size={32} />
        </button>

        {/* Menu items */}
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <a
                className="menu-item text-4xl md:text-6xl font-bold text-white hover:text-primary transition-all duration-300 cursor-pointer relative group"
                onClick={handleLinkClick}
                data-testid={`menu-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </Link>
          ))}
        </nav>

        {/* Bottom decorative element */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary/50" />
      </div>
    </div>
  );
}
