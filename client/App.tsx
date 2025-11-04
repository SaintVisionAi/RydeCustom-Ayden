import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StickerCustomizer from "./pages/StickerCustomizer";
import Products from "./pages/Products";
import Design from "./pages/Design";
import Shop from "./pages/Shop";
import About from "./pages/About";
import BikeBuilderPage from "./pages/BikeBuilderPage";
import SaintDirector from "./components/SaintDirector";
import { logIntegrationStatus } from "./lib/integrations";

const queryClient = new QueryClient();

function IntegrationInitializer() {
  useEffect(() => {
    logIntegrationStatus();
  }, []);

  return null;
}

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <IntegrationInitializer />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/design" element={<Design />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/customizer" element={<StickerCustomizer />} />
          <Route path="/customize-sticker" element={<StickerCustomizer />} />
          <Route path="/bike-builder" element={<BikeBuilderPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SaintDirector />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
