import { ArrowRight, Sparkles, Palette, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Palette,
    title: "AI-Powered Design",
    description:
      "Get instant design suggestions powered by Claude AI. Describe your vision and watch it come to life.",
  },
  {
    icon: Sparkles,
    title: "Real-Time Preview",
    description:
      "See your custom designs in real-time as you make changes. No waiting, instant feedback.",
  },
  {
    icon: Zap,
    title: "Quick Customization",
    description:
      "Choose from templates or start from scratch. Create unique designs in minutes, not hours.",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="group p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card">
      <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-bold text-lg mb-3 text-foreground">{feature.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
    </div>
  );
}

export default function Design() {
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
              <div className="inline-block mb-6 px-4 py-2 bg-primary/20 rounded-full border border-primary/50 backdrop-blur-sm">
                <span className="text-primary font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Design Your Own
                </span>
              </div>

              <h1 className="text-white mb-6" style={{ fontWeight: '300' }}>
                Create Your Perfect Custom Bike Parts
              </h1>

              <p className="text-2xl text-gray-100 mb-8 leading-relaxed max-w-2xl" style={{ fontWeight: '300' }}>
                Powered by AI, our design tool helps you create custom stickers, plates, and parts exactly as you imagine them.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/customizer" className="btn-primary">
                  Start Customizing <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a href="/products" className="btn-outline border-white text-white hover:bg-white/10">
                  Browse Pre-Made Designs
                </a>
              </div>

              <p className="text-sm text-gray-400 mt-8">
                ✨ AI-powered • Real-time preview • Free design consultation
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Three simple steps to create your custom design
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="relative">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-center mb-3">Describe Your Vision</h3>
                <p className="text-muted-foreground text-center">
                  Tell our AI what you want. Be as creative or specific as you like.
                </p>
              </div>

              <div className="relative">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-center mb-3">Customize & Refine</h3>
                <p className="text-muted-foreground text-center">
                  Tweak colors, sizes, and styles with our intuitive design tool.
                </p>
              </div>

              <div className="relative">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-center mb-3">Order & Receive</h3>
                <p className="text-muted-foreground text-center">
                  Once happy, order your custom parts and we'll print and ship them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary/5 border-y border-border">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EMOTO?</h2>
              <p className="text-lg text-muted-foreground">
                The best custom bike parts experience, powered by AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container-section">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Expert Advice?
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                  Our AI agent can help you choose the right materials, suggest designs, and
                  answer any questions about custom bike parts.
                </p>
                <a href="/customizer" className="inline-flex items-center gap-2 btn-primary">
                  Chat with EMOTO AI <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
