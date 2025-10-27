import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const RYDE_LOGO = "https://cdn.builder.io/api/v1/image/assets%2F20e5d38115c54f2586198244c4136d74%2F5d751f2dc183466d8b3dc9f1dbadfabb?format=webp&width=200";

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
    <header className="w-full bg-white border-b-2 border-primary sticky top-0 z-50 shadow-sm">
      <div className="container-section py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <img
              src={RYDE_LOGO}
              alt="RYDE CUSTOM Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary group-hover:text-primary/90">RYDE</span>
              <span className="text-xs font-semibold text-foreground tracking-widest">CUSTOM</span>
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
