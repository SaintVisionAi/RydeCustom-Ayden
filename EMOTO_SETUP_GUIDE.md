# EMOTO Custom Bike Parts Shop - Setup & Integration Guide

Welcome to EMOTO! This guide covers the complete setup and integration of all services needed to launch the custom bike parts shop.

## 🎯 Project Overview

EMOTO is a custom electric bike parts shop powered by:

- **Frontend**: React + Builder.io (this application)
- **eCommerce**: Shopify Store
- **Print-on-Demand**: Printify
- **AI Agent**: Claude via Anthropic API
- **Payments**: Stripe (optional) + Shopify Payments
- **Infrastructure**: Netlify or Vercel hosting

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Environment Setup](#environment-setup)
3. [Service Integrations](#service-integrations)
4. [Feature Overview](#feature-overview)
5. [Deployment](#deployment)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm 10+
- Accounts with: Shopify, Printify, Anthropic, and Stripe (optional)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

The app will run at `http://localhost:8080`

---

## 🔐 Environment Setup

### 1. Anthropic API Key

**Purpose**: Powers the EMOTO AI Agent for design assistance and product recommendations

**Steps**:

1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add to `.env.local`:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```

**Cost**: Anthropic charges per token. Monitor usage in the console.

### 2. Shopify Configuration

**Purpose**: Manages product catalog, inventory, and checkout

**Steps**:

1. Create a Shopify store (if not already done)
2. Install the Printify app from Shopify App Store
3. Get your store credentials:
   - Go to Settings → API credentials → Storefront API tokens
   - Create a token with `read_products` and `read_checkouts` scopes
   - Copy your store domain (e.g., `your-store.myshopify.com`)

4. Add to `.env.local`:
   ```
   VITE_SHOPIFY_STORE_ID=your-store.myshopify.com
   VITE_SHOPIFY_ACCESS_TOKEN=your_token_here
   ```

**Integration Points**:

- Homepage: Product showcase with Shopify Buy Buttons
- `/products` page: Product catalog and filtering
- `/shop` page: Main shopping interface
- Cart: Managed locally, syncs to Shopify checkout

### 3. Printify Setup

**Purpose**: Handles print-on-demand fulfillment with zero inventory

**Steps**:

1. Create a Printify account at [printify.com](https://printify.com)
2. Connect your Shopify store:
   - In Printify: Account Settings → Shop → Connect Shopify Store
   - Authorize the connection
3. Create products in Printify (they auto-sync to Shopify)
4. Get your API credentials:
   - Account Settings → API
   - Generate API key
5. Note your Store ID from the dashboard

6. Add to `.env.local`:
   ```
   VITE_PRINTIFY_API_KEY=your_api_key_here
   VITE_PRINTIFY_STORE_ID=your_store_id
   ```

**Product Examples**:

- Custom stickers (vinyl, 3D, specialty)
- Personalized license plates
- Carbon fiber decals
- T-shirts and apparel
- Custom bike frames and parts

**Important**: Products created in Printify automatically sync to your Shopify store.

### 4. Stripe Configuration (Optional)

**Purpose**: Advanced payment flows for custom orders and coaching calls

**Steps**:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → API Keys
3. Add to `.env.local`:
   ```
   VITE_STRIPE_PUBLIC_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

**Use Cases** (optional, Shopify handles primary checkout):

- Custom bike branding services
- Coaching call payments
- PDF guide downloads
- Sticker-only checkout flow

---

## 🔗 Service Integrations

### Routes & Pages

| Route         | Purpose            | Integration                      |
| ------------- | ------------------ | -------------------------------- |
| `/`           | Home               | Product showcase, featured items |
| `/products`   | Product Catalog    | Shopify products, filtering      |
| `/design`     | Design CTA         | Links to customizer              |
| `/customizer` | Custom Design Tool | AI chat, sticker customizer      |
| `/shop`       | Shopping Interface | Shopify checkout                 |
| `/about`      | Company Info       | EMOTO story, tech stack          |

### Key Components

#### AIChat Component

- **File**: `client/components/AIChat.tsx`
- **Purpose**: Floating chat widget for EMOTO AI Agent
- **Features**:
  - Real-time Claude API responses
  - Suggested questions
  - Design help and product recommendations
  - Mobile and desktop responsive

#### Customizer Page

- **File**: `client/pages/StickerCustomizer.tsx`
- **Purpose**: Interactive sticker customization
- **Features**:
  - Live preview
  - Color, size, shape, and border options
  - AI chat assistance
  - Add to cart functionality

#### Shopify Components

- **File**: `client/components/shopify/ShopifyBuyButton.tsx`
- **Purpose**: Embed Shopify products
- **Usage**:
  ```tsx
  <ShopifyBuyButton productId="product-handle" />
  ```

#### Printify Components

- **File**: `client/components/printify/PrintifyProductEmbed.tsx`
- **Purpose**: Display print-on-demand products
- **Usage**:
  ```tsx
  <PrintifyProductEmbed productId="product-id" />
  ```

### Cart Management

- **File**: `client/components/Cart.tsx`
- **Storage**: LocalStorage (emoto-cart)
- **Features**:
  - Persistent cart across sessions
  - Quantity management
  - Link to checkout

---

## ✨ Feature Overview

### 1. AI-Powered Design (Claude)

The EMOTO AI Agent helps customers:

- Brainstorm custom designs
- Get product recommendations
- Understand material options
- Answer questions about performance upgrades
- Suggest bundles and upsells

**System Prompt**: Located in `client/lib/anthropic.ts`

### 2. Custom Product Creation

Workflow:

1. User describes their vision to EMOTO AI
2. AI provides design suggestions
3. User customizes in the sticker designer
4. Design is added to cart
5. Order processed through Shopify

### 3. Print-on-Demand Fulfillment

When a customer orders:

1. Order created in Shopify
2. Automatically sent to Printify
3. Printify prints and ships directly to customer
4. Tracking updates provided

**Benefits**:

- No upfront inventory costs
- Fast production (typically 5-7 days)
- High quality assurance
- Scalable to any volume

### 4. Product Categories

- **Glow Kits**: LED underglow lighting
- **Speed Mods**: Performance upgrades
- **Carbon Fiber**: Lightweight components
- **Custom Plates**: Personalized license plates
- **Stickers & Decals**: Vinyl customization
- **Premium Gear**: Accessories and apparel

---

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repo**:
   - Push code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repo

2. **Build Settings**:
   - Build command: `pnpm build`
   - Publish directory: `dist`

3. **Environment Variables**:
   - Go to Site Settings → Build & Deploy → Environment
   - Add all variables from `.env.local`

4. **Deploy**:
   - Netlify automatically builds on push to main
   - Preview deploys available on pull requests

### Vercel

1. **Import Project**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo

2. **Environment Variables**:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`

3. **Deploy**:
   - Vercel automatically builds and deploys on push

### Custom Server

```bash
pnpm build
pnpm start
```

Runs on `http://localhost:5000` (or `$PORT` env var)

---

## 🔍 Monitoring & Debugging

### Check API Connectivity

```bash
# Test Anthropic API
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: $VITE_ANTHROPIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hi"}]
  }'
```

### Browser Console

Check the browser console (F12) for:

- API call errors
- Failed environment variables
- Missing API keys

### Network Tab

Monitor API requests to:

- `api.anthropic.com` - Claude API
- `*.shopifycdn.com` - Shopify products
- `*.printify.com` - Printify embeds

---

## 📝 Environment Variables Reference

```
VITE_ANTHROPIC_API_KEY=        # Anthropic API key (required for AI)
VITE_SHOPIFY_STORE_ID=         # Shopify store domain (required)
VITE_SHOPIFY_ACCESS_TOKEN=     # Shopify access token (required)
VITE_PRINTIFY_API_KEY=         # Printify API key (required)
VITE_PRINTIFY_STORE_ID=        # Printify store ID (required)
VITE_STRIPE_PUBLIC_KEY=        # Stripe public key (optional)
STRIPE_SECRET_KEY=             # Stripe secret key (optional)
PORT=                          # Server port (default: 5000)
NODE_ENV=                      # development or production
```

---

## 🆘 Troubleshooting

### "API Key Not Found" Error

**Solution**: Check that all `VITE_*` variables are in `.env.local` (note: VITE prefix)

### Chat Not Responding

**Solution**:

1. Verify `VITE_ANTHROPIC_API_KEY` is set
2. Check Network tab for API errors
3. Verify API key has remaining quota

### Shopify Products Not Loading

**Solution**:

1. Verify store ID matches your domain
2. Confirm products are published in Shopify
3. Check access token has `read_products` scope

### Printify Integration Not Working

**Solution**:

1. Verify Printify is installed in your Shopify store
2. Confirm API key is valid
3. Check that products are created in Printify

---

## 📚 Additional Resources

- [Anthropic API Docs](https://docs.anthropic.com/)
- [Shopify API Docs](https://shopify.dev/docs/api)
- [Printify API Docs](https://developers.printify.com/)
- [Stripe Docs](https://stripe.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)

---

## 🎉 You're Ready!

Your EMOTO shop is now configured. Next steps:

1. ✅ Create products in Shopify and Printify
2. ✅ Test the customizer and AI chat
3. ✅ Configure Stripe for optional payment flows
4. ✅ Deploy to Netlify or Vercel
5. ✅ Set up domain and SSL
6. ✅ Launch to customers!

For questions or issues, check the troubleshooting section or review the integration docs above.

**Happy customizing! ⚡**
