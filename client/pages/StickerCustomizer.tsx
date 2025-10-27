import { useState } from "react";
import { ArrowLeft, Copy, Download, ShoppingCart, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

export default function StickerCustomizer() {
  const [text, setText] = useState("EMOTO");
  const [backgroundColor, setBackgroundColor] = useState("#6D28D9");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [size, setSize] = useState("medium");
  const [shape, setShape] = useState("round");
  const [borderStyle, setBorderStyle] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sizeMap: Record<string, string> = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
  };

  const shapeClass =
    shape === "round"
      ? "rounded-full"
      : shape === "square"
        ? "rounded-lg"
        : "rounded-3xl";

  const borderClass =
    borderStyle === "none"
      ? ""
      : borderStyle === "solid"
        ? "border-4 border-white"
        : "border-4 border-dashed border-white";

  const handleDownload = () => {
    alert("Download feature - you can integrate with html2canvas library");
  };

  const handleAddToCart = () => {
    const cartItem = {
      product: "Custom Sticker",
      text,
      backgroundColor,
      textColor,
      size,
      shape,
      borderStyle,
      quantity,
    };
    localStorage.setItem("lastCustomSticker", JSON.stringify(cartItem));
    alert(`Added ${quantity} custom sticker(s) to cart!`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full">
        <div className="container-section py-8 md:py-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          <h1 className="mb-2">Design Your Custom Sticker</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Personalize your sticker with colors, text, and style options
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-border">
                <h3 className="font-bold text-lg mb-6">Preview</h3>

                <div className="flex items-center justify-center min-h-96 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-8">
                  <div
                    className={`flex items-center justify-center font-bold text-center transition-all duration-300 ${sizeMap[size]} ${shapeClass} ${borderClass} shadow-lg`}
                    style={{
                      backgroundColor,
                      color: textColor,
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    <span className="text-lg md:text-2xl px-4">{text || "EMOTO"}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 btn-outline border-primary text-primary py-2 px-4 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify({
                          text,
                          backgroundColor,
                          textColor,
                          size,
                          shape,
                          borderStyle,
                        })
                      );
                      alert("Design copied to clipboard!");
                    }}
                    className="flex-1 btn-outline border-primary text-primary py-2 px-4 flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold mb-2 text-blue-900">Pricing</h4>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-blue-700">Price per sticker</p>
                    <p className="text-2xl font-bold text-primary">$4.99</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Quantity</p>
                    <p className="text-2xl font-bold text-primary">{quantity}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-700">Total</p>
                  <p className="text-3xl font-bold text-primary">
                    ${(4.99 * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-bold text-lg mb-4">Text Content</h3>

                <label className="block mb-4">
                  <span className="text-sm font-semibold text-foreground mb-2 block">
                    Sticker Text
                  </span>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value.substring(0, 20))}
                    maxLength={20}
                    placeholder="Enter sticker text"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {text.length}/20 characters
                  </p>
                </label>
              </div>

              <div className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-bold text-lg mb-4">Colors</h3>

                <div className="space-y-4">
                  <label>
                    <span className="text-sm font-semibold text-foreground block mb-2">
                      Background Color
                    </span>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-16 h-10 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </label>

                  <label>
                    <span className="text-sm font-semibold text-foreground block mb-2">
                      Text Color
                    </span>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-16 h-10 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-bold text-lg mb-4">Style Options</h3>

                <div className="space-y-4">
                  <label>
                    <span className="text-sm font-semibold text-foreground block mb-2">
                      Size
                    </span>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="small">Small (3")</option>
                      <option value="medium">Medium (4")</option>
                      <option value="large">Large (5")</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-sm font-semibold text-foreground block mb-2">
                      Shape
                    </span>
                    <select
                      value={shape}
                      onChange={(e) => setShape(e.target.value)}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="round">Round</option>
                      <option value="square">Square</option>
                      <option value="rounded">Rounded Square</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-sm font-semibold text-foreground block mb-2">
                      Border Style
                    </span>
                    <select
                      value={borderStyle}
                      onChange={(e) => setBorderStyle(e.target.value)}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="none">None</option>
                      <option value="solid">Solid White</option>
                      <option value="dashed">Dashed White</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-bold text-lg mb-4">Quantity</h3>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border border-border hover:bg-slate-50 font-bold text-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-2xl font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(100, quantity + 1))}
                    className="w-12 h-12 rounded-lg border border-border hover:bg-slate-50 font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
