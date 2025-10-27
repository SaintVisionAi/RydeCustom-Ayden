import { ShoppingCart, ArrowRight, Truck, Lock, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Guarantee {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const GUARANTEES: Guarantee[] = [
  {
    icon: Truck,
    title: "Fast & Free Shipping",
    description: "Free shipping on orders over $50. Typically ships within 5-7 business days.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "Powered by Shopify. All transactions are encrypted and secure.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not satisfied? Return within 30 days for a full refund.",
  },
];

function GuaranteeCard({ guarantee }: { guarantee: Guarantee }) {
  const Icon = guarantee.icon;
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2">{guarantee.title}</h3>
      <p className="text-muted-foreground">{guarantee.description}</p>
    </div>
  );
}

export default function Shop() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full">
        <section className="w-full relative overflow-hidden h-96 md:h-[500px] flex items-center justify-center">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/33503476/pexels-photo-33503476.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="container-section relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white mb-4 flex items-center gap-3" style={{ fontWeight: '300' }}>
                <ShoppingCart className="w-10 h-10" /> Shop RYDE CUSTOM
              </h1>
              <p className="text-2xl text-gray-100" style={{ fontWeight: '300' }}>
                Browse and purchase custom electric bike parts, upgrades, and accessories
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-background to-slate-50">
          <div className="container-section">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontWeight: '300' }}>Featured Products</h2>
              <p className="text-2xl text-muted-foreground mb-8" style={{ fontWeight: '300' }}>
                Shopify product catalog integration will load here with live inventory and pricing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="group overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 bg-white"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-all" />
                      <span className="relative group-hover:text-primary/30 transition-colors">Product Image {item}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">Product Name {item}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Premium custom bike part with exceptional quality
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">$XX.XX</span>
                        <button className="btn-primary py-2 px-4 text-sm font-bold hover:scale-105 transition-transform">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-8 bg-white rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-all text-center">
                <p className="text-muted-foreground mb-4 font-semibold">
                  📌 Shopify Buy Button or Product Collection will be embedded here
                </p>
                <code className="text-xs bg-slate-100 px-4 py-2 rounded-lg inline-block text-muted-foreground font-mono">
                  {`<!-- Shopify Buy Button Code -->`}
                </code>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white border-y-2 border-primary/20">
          <div className="container-section">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center" style={{ fontWeight: '300' }}>
              How Our Fulfillment Works
            </h2>

            <div className="max-w-3xl mx-auto mb-12">
              <div className="space-y-6">
                <div className="flex gap-4 p-6 rounded-lg bg-white border-2 border-border hover:border-primary/30 transition-all">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">You Place an Order</h3>
                    <p className="text-muted-foreground">
                      Order through our Shopify store with your custom design or pre-made products.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-white border-2 border-border hover:border-primary/30 transition-all">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Printify Prints Your Order</h3>
                    <p className="text-muted-foreground">
                      Our print-on-demand partner, Printify, automatically receives your order and
                      starts production with zero inventory overhead.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-lg bg-white border-2 border-border hover:border-primary/30 transition-all">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Quality Control & Shipping</h3>
                    <p className="text-muted-foreground">
                      Printify handles quality assurance and ships directly to you. You'll receive
                      tracking updates every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-primary/20 rounded-xl p-8 text-center mb-8 hover:border-primary/50 transition-all">
              <p className="text-foreground font-semibold mb-2">
                🏭 Powered by Printify
              </p>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                We use Printify for sustainable, scalable print-on-demand production. No upfront
                inventory, fast turnaround, and high-quality products.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-slate-50">
          <div className="container-section">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center" style={{ fontWeight: '300' }}>
              Shop With Confidence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GUARANTEES.map((guarantee, index) => (
                <div key={index} className="group p-8 bg-white rounded-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/20">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <guarantee.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-center text-foreground group-hover:text-primary transition-colors mb-2">{guarantee.title}</h3>
                  <p className="text-muted-foreground text-center text-sm">{guarantee.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-16 md:py-20 border-y-2 border-primary/20">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontWeight: '300' }}>
                Want Something Custom?
              </h2>
              <p className="text-2xl text-muted-foreground mb-8" style={{ fontWeight: '300' }}>
                Design your perfect custom parts with our AI-powered design tool
              </p>
              <a href="/design" className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg font-bold">
                Start Designing <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-slate-50">
          <div className="container-section">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontWeight: '300' }}>Payment & Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  💳 <span className="font-semibold">Shopify Payments</span> - Our primary
                  checkout is powered by Shopify, supporting all major credit cards and payment
                  methods.
                </p>
                <p>
                  💰 <span className="font-semibold">Stripe Integration</span> - For advanced use
                  cases, custom orders, and alternative payment flows, we also support Stripe.
                </p>
                <p>
                  🔒 <span className="font-semibold">Secure & Encrypted</span> - All transactions
                  are PCI DSS compliant and fully encrypted.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
