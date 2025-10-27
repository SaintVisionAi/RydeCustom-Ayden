import { ArrowRight, Zap, Palette, Layers } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductCard = ({
  icon: Icon,
  title,
  description,
  image,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
}) => (
  <div className="group overflow-hidden rounded-xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
    <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="w-24 h-24 text-slate-300 group-hover:text-primary/30 transition-colors duration-300" />
      </div>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-0"
      />
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function Index() {
  const categories = [
    {
      icon: Zap,
      title: "Performance Bike Parts",
      description: "High-performance electric and custom bike components for speed and reliability.",
      image: "bike-parts",
    },
    {
      icon: Palette,
      title: "Custom Plates & Decals",
      description: "Personalized license plates and custom decals to make your ride unique.",
      image: "plates",
    },
    {
      icon: Layers,
      title: "Carbon Fiber Upgrades",
      description: "Lightweight and durable carbon fiber parts for maximum performance.",
      image: "carbon",
    },
    {
      icon: Palette,
      title: "Premium Stickers",
      description: "High-quality vinyl stickers for branding and customization.",
      image: "stickers",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full">
        <section className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-background py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="container-section relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-primary font-semibold text-sm">
                  ⚡ Custom Electric Bike Parts
                </span>
              </div>

              <h1 className="text-white mb-6 animate-fade-in">
                Power Your Ride with Custom Parts
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl animate-slide-up animation-delay-100">
                Premium custom bike parts, personalized plates, exclusive stickers, and premium
                carbon fiber upgrades for the ultimate electric bike experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-200">
                <a href="/shop" className="btn-primary">
                  Shop Now <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <button className="btn-outline border-white text-white hover:bg-white/10">
                  Watch Our Viral Video
                </button>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-8 text-gray-300 text-sm">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">500+</div>
                  <div>Custom Parts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">10K+</div>
                  <div>Happy Riders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">2M+</div>
                  <div>Video Views</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="w-full py-16 md:py-24 bg-background">
          <div className="container-section">
            <div className="text-center mb-16">
              <h2 className="mb-4">Our Product Categories</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to customize and upgrade your electric bike with premium
                performance parts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="animate-scale-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <ProductCard {...category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container-section">
            <div className="text-center mb-12">
              <h2 className="mb-4">See It In Action</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Watch our viral video showcasing the ultimate custom electric bike setup with
                EMOTO parts.
              </p>
            </div>

            <div className="relative bg-slate-900 rounded-2xl overflow-hidden h-96 md:h-screen max-h-screen flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <button className="relative z-10 w-20 h-20 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform group shadow-lg shadow-primary/40">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="absolute inset-0 flex items-center justify-center text-white text-center pointer-events-none">
                <div className="text-gray-400">Your Viral Video Here</div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">2M+</div>
                <p className="text-muted-foreground">Views on social media</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-border">
                <div className="text-4xl font-bold text-secondary mb-2">500K+</div>
                <p className="text-muted-foreground">Shares and engagement</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Trending in custom parts</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="w-full py-16 md:py-24 bg-background">
          <div className="container-section">
            <div className="text-center mb-16">
              <h2 className="mb-4">Featured Products</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handpicked custom parts and accessories for your electric bike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Pro Carbon Handlebars", price: "$79.99" },
                { name: "Baja for EMOTO", price: "$29.99" },
                { name: "Full Titanium Kit", price: "$149.99" },
                { name: "Titanium Pedals", price: "$59.99" },
                { name: "Professional Brakes", price: "$99.99" },
                { name: "Custom Wheel Stickers", price: "$9.99" },
              ].map((product, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-xl border border-border hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/5 group-hover:to-secondary/5 transition-colors">
                    <div className="text-slate-300 group-hover:text-primary/20 transition-colors">
                      [Product Image]
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    {product.name === "Custom Wheel Stickers" ? (
                      <a href="/customizer" className="btn-secondary py-2 px-4">
                        Design
                      </a>
                    ) : (
                      <button className="btn-secondary py-2 px-4">Add</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-16 md:py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-pattern" />
          </div>

          <div className="container-section relative z-10 text-center">
            <h2 className="text-white mb-6">Ready to Upgrade Your Ride?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              EMOTO's custom electric bike upgrades are built for speed, style, and personal
              flair. Join thousands of riders who have transformed their bikes with our
              premium custom parts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                Shop All Products <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/design"
                className="bg-white/20 text-white hover:bg-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center gap-2 border border-white"
              >
                Design Your Own <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
