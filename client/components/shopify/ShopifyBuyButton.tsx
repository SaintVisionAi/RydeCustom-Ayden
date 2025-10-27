interface ShopifyBuyButtonProps {
  productId: string;
  variant?: string;
  className?: string;
}

export default function ShopifyBuyButton({
  productId,
  variant = "compact",
  className = "",
}: ShopifyBuyButtonProps) {
  return (
    <div
      id={`shopify-buy-button-${productId}`}
      className={`shopify-buy-button-container ${className}`}
      data-product-id={productId}
      data-variant={variant}
    >
      <script
        async
        type="text/javascript"
        src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"
        onLoad={() => {
          if (window.ShopifyBuy) {
            window.ShopifyBuy.UI.onReady((client: any) => {
              client.product.fetchByHandle(productId).then((product: any) => {
                const ui = client.UI.create({
                  type: "product",
                  node: document.getElementById(
                    `shopify-buy-button-${productId}`,
                  ),
                  options: {
                    product: {
                      variantId: variant === "all" ? "all" : "first",
                      width: "100%",
                      styles: {
                        product: {
                          "@media (min-width: 601px)": {
                            maxWidth: "calc(25% - 20px)",
                            marginLeft: "20px",
                            marginBottom: "20px",
                          },
                        },
                      },
                    },
                    cart: {
                      contents: {
                        cart: {
                          hidden: true,
                        },
                      },
                      styles: {
                        button: {
                          ":hover": {
                            "background-color": "#1a1a1a",
                          },
                        },
                        footer: {
                          "background-color": "#ffffff",
                        },
                      },
                    },
                  },
                });
                ui.render(product);
              });
            });
          }
        }}
      />
    </div>
  );
}

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}
