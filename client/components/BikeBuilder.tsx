import { useState } from "react";
import { ArrowLeft, ShoppingCart, ZoomIn } from "lucide-react";

interface BikeConfig {
  frameColor: string;
  frameType: string;
  wheelType: string;
  exhaustType: string;
  brakeType: string;
  suspensionType: string;
  price: number;
}

const FRAME_TYPES = [
  { name: "Aluminum", price: 0 },
  { name: "Carbon", price: 500 },
  { name: "Titanium", price: 800 },
];

const FRAME_COLORS = [
  { name: "Matte Black", hex: "#1a1a1a" },
  { name: "Metallic Gold", hex: "#d4af37" },
  { name: "Neon Orange", hex: "#ff6b00" },
  { name: "Racing Red", hex: "#dc143c" },
  { name: "Pearl White", hex: "#f0f0f0" },
  { name: "Deep Blue", hex: "#00008b" },
];

const WHEEL_TYPES = [
  { name: "Warp 9 Racing", price: 400 },
  { name: "Aluminum Stock", price: 200 },
  { name: "Carbon Sport", price: 600 },
  { name: "Forged Alloy", price: 350 },
];

const EXHAUST_TYPES = [
  { name: "Akrapovič", price: 1200 },
  { name: "Yoshimura", price: 900 },
  { name: "Two Brothers", price: 850 },
  { name: "Stock", price: 0 },
];

const BRAKE_TYPES = [
  { name: "Brembo Sport", price: 600 },
  { name: "Brembo Carbon", price: 1000 },
  { name: "PUIG", price: 400 },
  { name: "Stock", price: 0 },
];

const SUSPENSION_TYPES = [
  { name: "KYB Premium", price: 800 },
  { name: "Showa Sport", price: 700 },
  { name: "Stock", price: 0 },
];

// Real e-moto images (royalty-free from Pexels)
const BIKE_IMAGES = [
  {
    angle: "Side Profile",
    url: "https://images.pexels.com/photos/24375965/pexels-photo-24375965.jpeg",
    alt: "Classic black and white motorcycle",
  },
  {
    angle: "3/4 View",
    url: "https://images.pexels.com/photos/15009902/pexels-photo-15009902.jpeg",
    alt: "Modern electric bike",
  },
  {
    angle: "Close-up Detail",
    url: "https://images.pexels.com/photos/24375965/pexels-photo-24375965.jpeg",
    alt: "Motorcycle detail shot",
  },
];

interface BikeBuilderProps {
  onClose?: () => void;
}

export default function BikeBuilder({ onClose }: BikeBuilderProps) {
  const [config, setConfig] = useState<BikeConfig>({
    frameColor: "#b8860b",
    frameType: "Aluminum",
    wheelType: "Warp 9 Racing",
    exhaustType: "Akrapovič",
    brakeType: "Brembo Sport",
    suspensionType: "KYB Premium",
    price: 3499.99,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const calculatePrice = () => {
    const framePrice =
      FRAME_TYPES.find((f) => f.name === config.frameType)?.price || 0;
    const wheelPrice =
      WHEEL_TYPES.find((w) => w.name === config.wheelType)?.price || 0;
    const exhaustPrice =
      EXHAUST_TYPES.find((e) => e.name === config.exhaustType)?.price || 0;
    const brakePrice =
      BRAKE_TYPES.find((b) => b.name === config.brakeType)?.price || 0;
    const suspensionPrice =
      SUSPENSION_TYPES.find((s) => s.name === config.suspensionType)?.price ||
      0;

    return (
      2499.99 +
      framePrice +
      wheelPrice +
      exhaustPrice +
      brakePrice +
      suspensionPrice
    );
  };

  const handleAddToCart = () => {
    const cartItem = {
      type: "bike",
      name: "Custom E-Moto Build",
      config,
      price: calculatePrice(),
      quantity: 1,
    };
    localStorage.setItem("lastCustomBike", JSON.stringify(cartItem));
    alert(`Added custom bike to cart! Total: $${calculatePrice().toFixed(2)}`);
  };

  const currentImage = BIKE_IMAGES[currentImageIndex];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {onClose && (
        <div className="p-4 border-b border-border">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Bike Display */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden border-2 border-border bg-white h-full">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 aspect-video flex items-center justify-center overflow-hidden">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={{
                  filter: `hue-rotate(${
                    config.frameColor === "#b8860b"
                      ? 0
                      : config.frameColor === "#1a1a1a"
                        ? 0
                        : config.frameColor === "#d4af37"
                          ? 40
                          : config.frameColor === "#ff6b00"
                            ? 25
                            : config.frameColor === "#dc143c"
                              ? -30
                              : config.frameColor === "#f0f0f0"
                                ? 0
                                : 240
                  }deg) brightness(${isZoomed ? 1.1 : 1})`,
                }}
              />

              {/* Frame Color Label Overlay */}
              <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-semibold">
                  {FRAME_COLORS.find((c) => c.hex === config.frameColor)
                    ?.name || "Custom"}
                </p>
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Angle Selector */}
            <div className="p-4 bg-slate-50 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 font-semibold">
                VIEW ANGLES
              </p>
              <div className="grid grid-cols-3 gap-3">
                {BIKE_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsZoomed(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all text-xs font-semibold ${
                      currentImageIndex === index
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {image.angle}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs Display */}
            <div className="p-4 bg-white border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Frame</p>
                  <p className="font-bold text-sm">{config.frameType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wheels</p>
                  <p className="font-bold text-sm">
                    {config.wheelType.split(" ")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Exhaust</p>
                  <p className="font-bold text-sm">
                    {config.exhaustType.split(" ")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Brakes</p>
                  <p className="font-bold text-sm">
                    {config.brakeType.split(" ")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Suspension</p>
                  <p className="font-bold text-sm">
                    {config.suspensionType.split(" ")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Power</p>
                  <p className="font-bold text-sm">8KW+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6 overflow-y-auto max-h-[700px]">
          {/* Frame Color */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Frame Color</h3>
            <div className="grid grid-cols-3 gap-3">
              {FRAME_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() =>
                    setConfig({ ...config, frameColor: color.hex })
                  }
                  className={`w-full aspect-square rounded-lg border-2 transition-all ${
                    config.frameColor === color.hex
                      ? "border-primary ring-2 ring-primary"
                      : "border-border hover:border-primary"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Frame Type */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Frame Material</h3>
            <div className="space-y-2">
              {FRAME_TYPES.map((type) => (
                <button
                  key={type.name}
                  onClick={() => setConfig({ ...config, frameType: type.name })}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.frameType === type.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{type.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${type.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Wheels</h3>
            <div className="space-y-2">
              {WHEEL_TYPES.map((wheel) => (
                <button
                  key={wheel.name}
                  onClick={() =>
                    setConfig({ ...config, wheelType: wheel.name })
                  }
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.wheelType === wheel.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{wheel.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${wheel.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exhaust */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Exhaust System</h3>
            <div className="space-y-2">
              {EXHAUST_TYPES.map((exhaust) => (
                <button
                  key={exhaust.name}
                  onClick={() =>
                    setConfig({ ...config, exhaustType: exhaust.name })
                  }
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.exhaustType === exhaust.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{exhaust.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${exhaust.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Brakes */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Brakes</h3>
            <div className="space-y-2">
              {BRAKE_TYPES.map((brake) => (
                <button
                  key={brake.name}
                  onClick={() =>
                    setConfig({ ...config, brakeType: brake.name })
                  }
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.brakeType === brake.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{brake.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${brake.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suspension */}
          <div className="bg-white rounded-xl border-2 border-border p-6">
            <h3 className="font-bold text-lg mb-4">Suspension</h3>
            <div className="space-y-2">
              {SUSPENSION_TYPES.map((suspension) => (
                <button
                  key={suspension.name}
                  onClick={() =>
                    setConfig({ ...config, suspensionType: suspension.name })
                  }
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    config.suspensionType === suspension.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-sm">{suspension.name}</div>
                  <div className="text-xs text-muted-foreground">
                    +${suspension.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 sticky bottom-0">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Custom Bike Total</p>
              <p className="text-4xl font-bold text-primary">
                ${calculatePrice().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 font-bold"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
