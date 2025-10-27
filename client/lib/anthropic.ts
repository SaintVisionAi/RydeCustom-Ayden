const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const ANTHROPIC_BASE_URL = "https://api.anthropic.com/v1";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface AnthropicResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

const EMOTO_SYSTEM_PROMPT = `You are EMOTO, an AI assistant for custom electric bike parts and accessories. 

Your expertise includes:
- Custom bike design and customization
- Electric bike upgrades and performance parts
- Sticker and decal design recommendations
- Carbon fiber components and materials
- Print-on-demand production capabilities
- Product recommendations based on customer needs

When helping customers:
1. Ask clarifying questions about their bike type and preferences
2. Suggest products that match their style and budget
3. Help with design decisions for custom items
4. Provide recommendations for bundles and upgrades (like Glow Kits, Speed Mods)
5. Explain material options and durability
6. Guide them through the customization process
7. Suggest pricing and production timelines based on their choices

Always be enthusiastic about custom bikes and personalization. Keep responses concise and helpful.
If you don't know something about EMOTO's products, suggest they browse the shop or products page.`;

export async function callClaudeAPI(
  messages: Message[],
  options?: {
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("VITE_ANTHROPIC_API_KEY environment variable is not set");
  }

  try {
    const response = await fetch(`${ANTHROPIC_BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: options?.maxTokens || 1024,
        temperature: options?.temperature || 0.7,
        system: EMOTO_SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Anthropic API error: ${response.status} ${JSON.stringify(errorData)}`
      );
    }

    const data: AnthropicResponse = await response.json();

    if (!data.content || data.content.length === 0) {
      throw new Error("No content in response from Anthropic API");
    }

    const textContent = data.content.find((block) => block.type === "text");
    if (!textContent) {
      throw new Error("No text content in response from Anthropic API");
    }

    return textContent.text;
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    throw error;
  }
}

export async function streamClaudeResponse(
  messages: Message[],
  onChunk: (chunk: string) => void,
  options?: {
    maxTokens?: number;
    temperature?: number;
  }
): Promise<void> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("VITE_ANTHROPIC_API_KEY environment variable is not set");
  }

  try {
    const response = await fetch(`${ANTHROPIC_BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: options?.maxTokens || 1024,
        temperature: options?.temperature || 0.7,
        system: EMOTO_SYSTEM_PROMPT,
        messages: messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Anthropic API error: ${response.status} ${JSON.stringify(errorData)}`
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to create stream reader");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      buffer = lines[lines.length - 1];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith(":")) continue;

        if (line.startsWith("data: ")) {
          try {
            const json = JSON.parse(line.slice(6));
            if (
              json.type === "content_block_delta" &&
              json.delta?.type === "text_delta"
            ) {
              onChunk(json.delta.text);
            }
          } catch (e) {
            // Ignore JSON parse errors for streaming
          }
        }
      }
    }

    const finalLine = buffer.trim();
    if (finalLine.startsWith("data: ")) {
      try {
        const json = JSON.parse(finalLine.slice(6));
        if (
          json.type === "content_block_delta" &&
          json.delta?.type === "text_delta"
        ) {
          onChunk(json.delta.text);
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
  } catch (error) {
    console.error("Error streaming Claude response:", error);
    throw error;
  }
}

export { EMOTO_SYSTEM_PROMPT };
