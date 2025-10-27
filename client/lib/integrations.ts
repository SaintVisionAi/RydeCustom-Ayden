/**
 * EMOTO Integration Configuration
 * Centralized configuration for all external services
 */

// Anthropic / Claude Configuration
export const ANTHROPIC_CONFIG = {
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  model: "claude-3-5-sonnet-20241022",
  maxTokens: 1024,
  temperature: 0.7,
};

// Shopify Configuration
export const SHOPIFY_CONFIG = {
  storeId: import.meta.env.VITE_SHOPIFY_STORE_ID,
  accessToken: import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN,
  apiVersion: "2024-01",
  domain: import.meta.env.VITE_SHOPIFY_STORE_ID,
};

// Printify Configuration
export const PRINTIFY_CONFIG = {
  apiKey: import.meta.env.VITE_PRINTIFY_API_KEY,
  storeId: import.meta.env.VITE_PRINTIFY_STORE_ID,
  baseUrl: "https://api.printify.com/v1",
};

// Stripe Configuration (Optional)
export const STRIPE_CONFIG = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  enabled: !!import.meta.env.VITE_STRIPE_PUBLIC_KEY,
};

// EMOTO Business Configuration
export const EMOTO_CONFIG = {
  name: "EMOTO",
  tagline: "Custom Electric Bike Parts",
  description:
    "Premium custom bike parts, personalized plates, exclusive stickers, and premium carbon fiber upgrades for the ultimate electric bike experience.",

  // Product Categories
  categories: {
    performance: "Performance Bike Parts",
    carbon: "Carbon Fiber Upgrades",
    upgrades: "Custom Upgrades",
    stickers: "Stickers & Decals",
  },

  // Featured Products (Sample)
  featuredProducts: [
    {
      id: "glow-kit",
      name: "Glow Kit",
      description: "LED underglow lighting",
      price: 49.99,
      category: "upgrades",
    },
    {
      id: "speed-mod",
      name: "Speed Mod",
      description: "Performance upgrade",
      price: 89.99,
      category: "performance",
    },
    {
      id: "carbon-seat",
      name: "Carbon Seat Post",
      description: "Ultra-light carbon fiber",
      price: 159.99,
      category: "carbon",
    },
  ],

  // Pricing
  shipping: {
    free: 50, // Free shipping over $50
    standard: 7.99,
  },

  // AI Agent Settings
  ai: {
    systemPrompt: "EMOTO Custom Bike Parts Assistant",
    suggestedQuestions: [
      "What's a good upgrade for my e-bike?",
      "Help me design a custom sticker",
      "How do Glow Kits work?",
      "What material should I choose?",
    ],
  },
};

// Validation Helpers
export function validateIntegrations(): {
  valid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const isDev = import.meta.env.DEV;

  // In production, treat missing keys as errors. In dev, just warn.
  if (!ANTHROPIC_CONFIG.apiKey) {
    const msg = "VITE_ANTHROPIC_API_KEY is not set. AI features will not work.";
    if (isDev) {
      warnings.push(`[DEV] ${msg} Set it in .env.local to enable.`);
    } else {
      errors.push(msg);
    }
  }

  if (!SHOPIFY_CONFIG.storeId || !SHOPIFY_CONFIG.accessToken) {
    const msg =
      "Shopify configuration incomplete. Products and checkout will not work.";
    if (isDev) {
      warnings.push(
        `[DEV] ${msg} Set VITE_SHOPIFY_STORE_ID and VITE_SHOPIFY_ACCESS_TOKEN in .env.local to enable.`,
      );
    } else {
      errors.push(msg);
    }
  }

  if (!PRINTIFY_CONFIG.apiKey || !PRINTIFY_CONFIG.storeId) {
    warnings.push(
      "Printify configuration incomplete. Print-on-demand features limited. Set VITE_PRINTIFY_API_KEY and VITE_PRINTIFY_STORE_ID in .env.local.",
    );
  }

  if (!STRIPE_CONFIG.enabled) {
    warnings.push(
      "Stripe not configured. Some payment flows will be unavailable.",
    );
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}

// Log integration status
export function logIntegrationStatus() {
  const status = validateIntegrations();

  console.group("🚀 EMOTO Integration Status");

  if (status.errors.length > 0) {
    console.error("❌ Errors:");
    status.errors.forEach((err) => console.error(`  - ${err}`));
  }

  if (status.warnings.length > 0) {
    console.warn("⚠️ Warnings:");
    status.warnings.forEach((warn) => console.warn(`  - ${warn}`));
  }

  if (status.valid) {
    console.log("✅ All critical integrations configured!");
  }

  console.log("\n📊 Active Services:");
  console.log(`  • Anthropic: ${ANTHROPIC_CONFIG.apiKey ? "✅" : "❌"}`);
  console.log(`  • Shopify: ${SHOPIFY_CONFIG.storeId ? "✅" : "❌"}`);
  console.log(`  • Printify: ${PRINTIFY_CONFIG.apiKey ? "✅" : "❌"}`);
  console.log(`  • Stripe: ${STRIPE_CONFIG.enabled ? "✅" : "⏸️"}`);

  console.groupEnd();
}
