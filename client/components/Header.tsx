import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50">
      <div className="container-section py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="font-bold text-xl text-foreground">EMOTO</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#products"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#categories"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </a>
            <button className="btn-primary">Shop Now</button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-border pt-4">
            <a
              href="#products"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#categories"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </a>
            <button className="btn-primary w-full">Shop Now</button>
          </nav>
        )}
      </div>
    </header>
  );
}
