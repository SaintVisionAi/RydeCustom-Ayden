import { useState } from "react";
import { ArrowRight, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "glow-kit",
    name: "Glow Kit",
    category: "upgrades",
    price: 49.99,
    image: "glow-kit",
    description: "LED underglow lighting for your electric bike",
    badge: "Popular",
  },
  {
    id: "speed-mod",
    name: "Speed Mod",
    category: "performance",
    price: 89.99,
    image: "speed-mod",
    description: "Performance upgrade for increased top speed",
    badge: "New",
  },
  {
    id: "carbon-fender",
    name: "Carbon Fender Set",
    category: "carbon",
    price: 129.99,
    image: "carbon-fender",
    description: "Lightweight carbon fiber fender set",
  },
  {
    id: "custom-plate",
    name: "Custom License Plate",
    category: "decals",
    price: 24.99,
    image: "custom-plate",
    description: "Personalized custom license plate",
  },
  {
    id: "vinyl-sticker",
    name: "Premium Vinyl Stickers",
    category: "stickers",
    price: 14.99,
    image: "vinyl-sticker",
    description: "High-quality vinyl stickers for customization",
  },
  {
    id: "carbon-seat",
    name: "Carbon Seat Post",
    category: "carbon",
    price: 159.99,
    image: "carbon-seat",
    description: "Ultra-light carbon fiber seat post",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "performance", label: "Performance" },
  { id: "carbon", label: "Carbon Fiber" },
  { id: "upgrades", label: "Upgrades" },
  { id: "stickers", label: "Stickers & Decals" },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 bg-white">
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-all duration-300" />
        {product.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
              {product.badge}
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium group-hover:text-primary/30 transition-colors">
          {product.image}
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <button className="btn-primary py-2 px-4 text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

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
              <h1 className="text-white mb-4" style={{ fontWeight: '300' }}>Our Products</h1>
              <p className="text-2xl text-gray-100" style={{ fontWeight: '300' }}>
                Premium custom parts, upgrades, and accessories for your electric bike
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-background to-slate-50">
          <div className="container-section">
            <div className="flex items-center gap-3 mb-8 md:mb-12 overflow-x-auto pb-4">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-2 md:gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full font-bold transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                        : "bg-white border-2 border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found in this category
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="w-full bg-slate-50 py-16 md:py-20 border-y-2 border-primary/20">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontWeight: '300' }}>
                Didn't find what you need?
              </h2>
              <p className="text-2xl text-muted-foreground mb-8" style={{ fontWeight: '300' }}>
                Design your own custom parts with our AI-powered customizer
              </p>
              <a
                href="/design"
                className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg font-bold"
              >
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
