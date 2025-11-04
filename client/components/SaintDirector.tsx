import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SAINT_DIRECTOR_CONTEXT = `You are SaintDirector, the ultimate AI agent for RYDE CUSTOM - a premium custom e-moto bike parts company.

Your personality:
- Knowledgeable about high-performance e-motorcycle parts
- Friendly, enthusiastic, and helpful
- Expert in brands like Brembo (brakes), Akrapovič (exhausts), Yoshimura, Two Brothers Racing, Warp 9 Racing, KYB, Showa, PUIG, Kuryakyn, Evotech, Samco Sport
- Can help customers design custom bikes, select parts, and place orders
- Understand e-moto specialization and performance requirements

Your capabilities:
1. Recommend parts based on customer needs (racing, street, mountain, freestyle)
2. Explain technical specs and performance benefits
3. Help design custom bike configurations
4. Process orders and answer shipping questions
5. Provide styling and aesthetic advice

Always be concise, helpful, and guide customers toward customization and orders.`;

export default function SaintDirector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "🏍️ Yo! I'm SaintDirector. Need help building your dream e-moto? Let's customize some parts!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response with contextual understanding
      const response = await generateResponse(input);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "Sorry, I'm having trouble connecting. Try again in a moment!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (userInput: string): Promise<string> => {
    // Parse user intent and provide contextual responses
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("exhaust")) {
      return "Looking for exhausts? We've got:\n🔥 Akrapovič - Premium performance\n🏁 Yoshimura - Racing precision\n⚡ Two Brothers Racing - Street credibility\n🎯 Polini - E-moto specialist\n\nWhat's your riding style?";
    }

    if (lowerInput.includes("brake")) {
      return "Brakes are critical! Our top picks:\n🛑 Brembo - Industry gold standard\n🛑 PUIG - Quality alternatives\n🛑 Evotech - Premium performance\n\nWhat bike are you building?";
    }

    if (lowerInput.includes("wheel")) {
      return "Wheels matter! Check these out:\n🏎️ Warp 9 Racing - E-moto specialists\n🏎️ UMA Racing - Asian quality\n🏎️ Racing Boy - Performance proven\n🏎️ Parts Unlimited - Reliable choice\n\nTread preference?";
    }

    if (
      lowerInput.includes("build") ||
      lowerInput.includes("design") ||
      lowerInput.includes("customize")
    ) {
      return "Let's build something sick! 🔧\n\n1️⃣ What's your bike style? (Street, Racing, Mountain, Freestyle)\n2️⃣ Performance or aesthetics focus?\n3️⃣ Budget range?\n\nI'll help you pick the perfect parts!";
    }

    if (lowerInput.includes("price") || lowerInput.includes("cost")) {
      return "Parts pricing varies:\n💰 Entry Level: $400-800\n💰 Mid-Range: $800-2000\n💰 Premium: $2000+\n\nCustom full-bike builds start at $1500. What's your budget?";
    }

    if (lowerInput.includes("street")) {
      return "Street Setup 🏙️\n🔥 Akrapovič Exhaust\n🛑 Brembo Brakes\n🏎️ Warp 9 Wheels\n📍 KYB Suspension\n\nThis combo is perfect for urban e-moto riders. Want to add it to cart?";
    }

    if (lowerInput.includes("racing") || lowerInput.includes("track")) {
      return "Track Setup 🏁\n⚡ Yoshimura Exhaust\n🛑 Brembo Brakes (upgraded)\n🏎️ Warp 9 Racing Wheels\n📍 Showa Suspension\n\nPeaks at 85mph+ performance. Add to cart?";
    }

    if (lowerInput.includes("order") || lowerInput.includes("cart")) {
      return "Ready to order? 🛒\n\n1️⃣ Head to /bike-builder to customize\n2️⃣ Add your parts combo to cart\n3️⃣ Checkout with your bike specs\n4️⃣ We ship to you in 5-7 days\n\nNeed help selecting parts?";
    }

    if (lowerInput.includes("shipping") || lowerInput.includes("delivery")) {
      return "Shipping Info 📦\n✈️ Standard: 5-7 business days\n✈️ Express: 2-3 days (+$25)\n✈️ International: 10-14 days\n\nFree shipping on orders $500+!";
    }

    if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("hey")
    ) {
      return "Yo! 🏍️ I'm SaintDirector, your RYDE CUSTOM AI guide. Want to:\n🔧 Build a custom bike\n📋 Learn about parts\n💳 Place an order\n\nWhat'll it be?";
    }

    // Default helpful response
    return `Great question! 🏍️\n\nI can help you with:\n✅ Recommending parts\n✅ Building custom bikes\n✅ Explaining specs\n✅ Processing orders\n\nTell me what you need!`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 btn-primary rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all group z-40"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-semibold">
          SaintDirector
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80" : "w-96 max-h-[600px] flex flex-col"
      }`}
    >
      <div className="bg-white rounded-2xl border-2 border-primary shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">SaintDirector</h3>
              <p className="text-xs text-white/80">E-Moto Expert</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/20 p-2 rounded transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      message.type === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white border border-border text-foreground rounded-bl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border px-4 py-2 rounded-lg text-sm">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about parts..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="btn-primary p-2 rounded-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
