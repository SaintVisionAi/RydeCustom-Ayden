import { Mail, Instagram, TrendingUp, Send, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

const RYDE_LOGO =
  "https://cdn.builder.io/api/v1/image/assets%2F20e5d38115c54f2586198244c4136d74%2Fbb16d22ebcb0475a8325ae7e26809b83?format=webp&width=150";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-[#0f0f0f] text-white mt-20">
      <div className="border-t-2 border-primary/30">
        <div className="container-section py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 mb-6">
                Get exclusive deals, product launches, and custom design tips delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-white/10 border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 font-bold flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-primary font-semibold text-sm mt-2">
                  ✓ Thanks for subscribing!
                </p>
              )}
            </div>

            <div className="bg-white/5 border-2 border-primary/30 rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Payment & Security</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>All major credit cards accepted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 mb-2">Payment Methods:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs font-semibold">Visa</span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs font-semibold">Mastercard</span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs font-semibold">Amex</span>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs font-semibold">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={RYDE_LOGO}
                    alt="RYDE CUSTOM"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="flex flex-col">
                    <span
                      className="font-bold text-lg text-primary"
                      style={{ fontFamily: '"Clash Display", system-ui' }}
                    >
                      RYDE
                    </span>
                    <span className="text-xs font-bold text-gray-400">CUSTOM</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Custom electric bike parts, performance plates, and premium carbon fiber upgrades powered by innovation.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Products</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <a href="/products" className="hover:text-primary transition-colors">
                      Bike Parts
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="hover:text-primary transition-colors">
                      Plates & Decals
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="hover:text-primary transition-colors">
                      Carbon Fiber
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="hover:text-primary transition-colors">
                      Stickers
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <a href="/about" className="hover:text-primary transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <div className="flex gap-3 mb-6">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-[#0f0f0f] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-[#0f0f0f] transition-colors"
                  >
                    <TrendingUp className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-[#0f0f0f] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
              <p>&copy; 2024 RYDE CUSTOM. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
