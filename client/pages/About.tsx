import { ArrowRight, Heart, Zap, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We blend cutting-edge AI with traditional craftsmanship to create unique, personalized products.",
  },
  {
    icon: Heart,
    title: "Quality Obsessed",
    description:
      "Every product is hand-checked for quality. We never compromise on excellence.",
  },
  {
    icon: Globe,
    title: "Sustainable",
    description:
      "Print-on-demand means zero waste inventory. We build for the planet, not against it.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full">
        <section className="w-full relative overflow-hidden h-screen md:h-[600px] flex items-center justify-center">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/733740/pexels-photo-733740.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="container-section relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-white mb-6" style={{ fontWeight: '300' }}>About RYDE CUSTOM</h1>
              <p className="text-2xl text-gray-100 leading-relaxed max-w-2xl" style={{ fontWeight: '300' }}>
                We're building the future of custom electric bike parts—powered by AI, designed for style, and built to last.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-slate-50">
          <div className="container-section">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ fontWeight: '300' }}>Our Mission</h2>
              <p className="text-2xl text-muted-foreground leading-relaxed mb-8" style={{ fontWeight: '300' }}>
                At RYDE CUSTOM, we believe that electric bikes are more than just transportation—they're
                an expression of identity and individuality. We empower riders to customize and
                personalize their bikes exactly the way they want them.
              </p>
              <p className="text-2xl text-muted-foreground leading-relaxed" style={{ fontWeight: '300' }}>
                With our AI-powered design tools and seamless integration with Printify and
                Shopify, we make it effortless to create, customize, and order premium bike
                parts—from glow kits to carbon fiber upgrades to custom license plates.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-slate-50 border-y-2 border-primary/20">
          <div className="container-section">
            <h2 className="text-5xl md:text-6xl font-light mb-12 text-center" style={{ fontWeight: '300' }}>Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="group p-8 bg-white rounded-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/20">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-center text-foreground group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-center text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container-section">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontWeight: '300' }}>The RYDE Stack</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed" style={{ fontWeight: '300' }}>
                Behind every custom creation is a powerful technology stack designed to deliver
                the best experience:
              </p>

              <div className="space-y-8">
                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-bold text-lg mb-3">🛒 Shopify</h3>
                  <p className="text-muted-foreground">
                    Our e-commerce backbone. Shopify powers our product catalog, inventory
                    management, and secure checkout experience.
                  </p>
                </div>

                <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/20">
                  <h3 className="font-bold text-lg mb-3">🏭 Printify</h3>
                  <p className="text-muted-foreground">
                    Print-on-demand fulfillment partner. Printify handles production, quality
                    assurance, and direct shipping—zero inventory waste.
                  </p>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-bold text-lg mb-3">🧠 Claude (Anthropic)</h3>
                  <p className="text-muted-foreground">
                    Our AI agent. RYDE AI helps customers brainstorm designs, answer product
                    questions, and recommend perfect upgrades for their bikes.
                  </p>
                </div>

                <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/20">
                  <h3 className="font-bold text-lg mb-3">💳 Stripe</h3>
                  <p className="text-muted-foreground">
                    Advanced payment processing for specialized flows, coaching calls, and
                    custom orders outside the standard Shopify checkout.
                  </p>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-bold text-lg mb-3">🎨 Builder.io</h3>
                  <p className="text-muted-foreground">
                    Frontend control and visual management of our website. Builder.io lets us
                    rapidly iterate on design and content without redeploying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary/5 border-y border-border">
          <div className="container-section">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontWeight: '300' }}>Why RYDE CUSTOM?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-3">No Inventory Risk</h3>
                  <p className="text-muted-foreground">
                    Print-on-demand means we only produce what's ordered. Zero dead stock, zero
                    waste.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Lightning-Fast Design</h3>
                  <p className="text-muted-foreground">
                    Our AI agent guides you through the design process in minutes, not days.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    Every product is carefully crafted and quality-tested before shipping to you.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Seamless Experience</h3>
                  <p className="text-muted-foreground">
                    From design to checkout to fulfillment—everything integrates perfectly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-50 py-16 md:py-20 border-y border-border">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontWeight: '300' }}>
                Ready to Customize Your Ride?
              </h2>
              <p className="text-xl text-muted-foreground mb-8" style={{ fontWeight: '300' }}>
                Join the RYDE CUSTOM community and create something truly unique
              </p>
              <a href="/design" className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg font-bold">
                Start Designing <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
