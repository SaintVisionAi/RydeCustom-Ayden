import { Mail, Instagram, TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white mt-20">
      <div className="container-section py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                <span className="text-white font-bold">⚡</span>
              </div>
              <span className="font-bold text-lg">EMOTO</span>
            </div>
            <p className="text-gray-300 text-sm">
              Custom electric bike parts, performance plates, and premium carbon fiber upgrades.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Bike Parts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Plates & Decals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Carbon Fiber
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Stickers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
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
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>&copy; 2024 EMOTO Parts. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
