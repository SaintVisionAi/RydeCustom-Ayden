import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const RYDE_LOGO = "https://cdn.builder.io/api/v1/image/assets%2F20e5d38115c54f2586198244c4136d74%2Fbb16d22ebcb0475a8325ae7e26809b83?format=webp&width=200";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Design", href: "/design" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="w-full bg-[#0f0f0f] bg-opacity-98 border-b-2 border-primary sticky top-0 z-50">
      <div className="container-section py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <img
              src={RYDE_LOGO}
              alt="RYDE CUSTOM Logo"
              className="w-14 h-14 object-contain drop-shadow-lg"
            />
            <div className="flex flex-col">
              <span className="font-black text-2xl text-white group-hover:text-primary transition-colors" style={{ fontFamily: '"Clash Display", system-ui' }}>RYDE</span>
              <span className="text-xs font-bold text-gray-300 tracking-widest">CUSTOM</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium text-sm transition-colors ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a href="/shop" className="btn-primary text-sm px-5 py-2">
              Shop Now
            </a>
          </nav>

          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-3 mt-4 pb-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors py-2 ${
                  isActive(item.href)
                    ? "text-primary border-l-2 border-primary pl-3"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="/shop" className="btn-primary w-full text-center py-3 mt-2">
              Shop Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
