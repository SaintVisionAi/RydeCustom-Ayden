import { useState, useCallback } from "react";
import { callClaudeAPI, streamClaudeResponse, Message } from "@/lib/anthropic";

interface UseClaudioChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  streamMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

export function useClaudeChat(): UseClaudioChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        setError(null);
        setIsLoading(true);

        const userMessage: Message = { role: "user", content };
        const updatedMessages = [...messages, userMessage];

        const response = await callClaudeAPI(updatedMessages);

        const assistantMessage: Message = {
          role: "assistant",
          content: response,
        };

        setMessages([...updatedMessages, assistantMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error sending message:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages],
  );

  const streamMessage = useCallback(
    async (content: string) => {
      try {
        setError(null);
        setIsLoading(true);

        const userMessage: Message = { role: "user", content };
        const updatedMessages = [...messages, userMessage];

        let fullResponse = "";

        await streamClaudeResponse(updatedMessages, (chunk) => {
          fullResponse += chunk;
          const assistantMessage: Message = {
            role: "assistant",
            content: fullResponse,
          };
          setMessages([...updatedMessages, assistantMessage]);
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error streaming message:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    streamMessage,
    clearMessages,
    setMessages,
  };
}
