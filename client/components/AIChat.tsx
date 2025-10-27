import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";
import { useClaudeChat } from "@/hooks/use-claude-chat";

interface AIChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMessage?: string;
}

export default function AIChat({
  isOpen = true,
  onClose,
  initialMessage,
}: AIChatProps) {
  const { messages, isLoading, error, sendMessage } = useClaudeChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialMessage && !hasInitialized) {
      setHasInitialized(true);
      sendMessage(initialMessage);
    }
  }, [initialMessage, hasInitialized, sendMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue("");
    await sendMessage(message);
  };

  const suggestedQuestions = [
    "What's a good upgrade for my e-bike?",
    "Help me design a custom sticker",
    "How do Glow Kits work?",
    "What material should I choose?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 h-[600px] md:h-[600px] bg-white border-l border-t border-border shadow-2xl rounded-t-xl md:rounded-t-xl z-40 flex flex-col">
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between rounded-t-xl">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <h3 className="font-bold">EMOTO AI Agent</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <h4 className="font-bold text-foreground mb-2">Hi! I'm EMOTO AI</h4>
            <p className="text-sm text-muted-foreground mb-4">
              I can help you design custom bike parts, answer questions, and
              recommend products.
            </p>

            <div className="space-y-2 w-full">
              <p className="text-xs text-muted-foreground font-semibold">
                Try asking about:
              </p>
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    setTimeout(() => {
                      const form = document.querySelector(
                        "[data-chat-form]",
                      ) as HTMLFormElement;
                      if (form)
                        form.dispatchEvent(
                          new Event("submit", { bubbles: true }),
                        );
                    }, 0);
                  }}
                  className="w-full text-left text-xs p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors text-foreground/80 hover:text-foreground"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-secondary/10 text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary/10 text-foreground rounded-lg p-3 rounded-bl-none">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-foreground animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
                <button
                  onClick={() => setInputValue("")}
                  className="text-xs mt-2 underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        data-chat-form
        className="border-t border-border p-3 bg-white rounded-b-xl"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
