import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import citrateLogoOrange from "@assets/citrate_icon_background_1761610658378.png";
import FullScreenNav from "./FullScreenNav";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
        }`}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <img
                  src={citrateLogoOrange}
                  alt="Citrate Logo"
                  className="w-10 h-10 rounded-md transition-transform group-hover:scale-110"
                />
                <span className="font-bold text-2xl text-[#ffffff]">Citrate</span>
              </div>
            </Link>

            {/* Orange Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 group"
              data-testid="button-menu"
              aria-label="Open menu"
            >
              <Menu size={28} className="text-black group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </nav>
      <FullScreenNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
