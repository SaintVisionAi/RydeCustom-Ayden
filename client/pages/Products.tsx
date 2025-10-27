import { useState } from "react";
import { ArrowRight, Filter, Star, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  badge?: string;
  badgeColor?: "gold" | "blue" | "green";
  rating?: number;
  reviews?: number;
}

const PRODUCTS: Product[] = [
  {
    id: "glow-kit",
    name: "Glow Kit Pro",
    category: "upgrades",
    price: 49.99,
    originalPrice: 79.99,
    image: "glow-kit",
    description: "RGB LED underglow lighting with app control",
    badge: "SALE",
    badgeColor: "gold",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "speed-mod",
    name: "Speed Mod Ultra",
    category: "performance",
    price: 89.99,
    image: "speed-mod",
    description: "Performance upgrade for increased top speed",
    badge: "NEW",
    badgeColor: "blue",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "carbon-fender",
    name: "Carbon Fender Set",
    category: "carbon",
    price: 129.99,
    image: "carbon-fender",
    description: "Lightweight carbon fiber fender set",
    badge: "PREMIUM",
    badgeColor: "green",
    rating: 5.0,
    reviews: 156,
  },
  {
    id: "custom-plate",
    name: "Custom License Plate",
    category: "decals",
    price: 24.99,
    image: "custom-plate",
    description: "Personalized custom license plate",
    rating: 4.7,
    reviews: 203,
  },
  {
    id: "vinyl-sticker",
    name: "Premium Vinyl Stickers",
    category: "stickers",
    price: 14.99,
    originalPrice: 24.99,
    image: "vinyl-sticker",
    description: "High-quality vinyl stickers for customization",
    badge: "SALE",
    badgeColor: "gold",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "carbon-seat",
    name: "Carbon Seat Post",
    category: "carbon",
    price: 159.99,
    image: "carbon-seat",
    description: "Ultra-light carbon fiber seat post",
    rating: 4.9,
    reviews: 145,
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
  const badgeColorMap = {
    gold: "bg-primary text-[#0f0f0f]",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
  };

  return (
    <div className="group overflow-hidden rounded-xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 bg-white">
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-all duration-300" />
        {product.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-block px-3 py-1 text-xs font-bold rounded-full tracking-wider ${
                badgeColorMap[product.badgeColor || "gold"]
              }`}
            >
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
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {product.reviews && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-primary text-primary"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-xs text-muted-foreground font-semibold">
              {product.rating} ({product.reviews})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
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
              backgroundImage:
                "url(https://images.pexels.com/photos/33503476/pexels-photo-33503476.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="container-section relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white mb-4" style={{ fontWeight: "300" }}>
                Our Products
              </h1>
              <p
                className="text-2xl text-gray-100"
                style={{ fontWeight: "300" }}
              >
                Premium custom parts, upgrades, and accessories for your
                electric bike
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
                        ? "bg-primary text-[#0f0f0f] shadow-lg shadow-primary/30 scale-105"
                        : "bg-white border-2 border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground font-semibold">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Most Popular</span>
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

        <section className="w-full bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] py-16 md:py-20">
          <div className="container-section">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-4xl md:text-5xl font-light mb-4 text-white"
                style={{ fontWeight: "300" }}
              >
                Can't Find It?
              </h2>
              <p
                className="text-2xl text-gray-300 mb-8"
                style={{ fontWeight: "300" }}
              >
                Design your own custom parts with our AI-powered customizer
              </p>
              <a
                href="/design"
                className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg font-bold hover:scale-105 transition-transform"
              >
                Start Designing <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-12 md:py-16">
          <div className="container-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground font-semibold">
                  Happy Customers
                </p>
              </div>
              <div className="p-6 border-l-2 border-r-2 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
                <p className="text-muted-foreground font-semibold">
                  Average Rating
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground font-semibold">
                  Customer Support
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
