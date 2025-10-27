interface PrintifyProductEmbedProps {
  productId: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function PrintifyProductEmbed({
  productId,
  title,
  description,
  className = "",
}: PrintifyProductEmbedProps) {
  return (
    <div className={`printify-embed-container ${className}`}>
      <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {title && <h3 className="text-lg font-bold p-4 bg-slate-50">{title}</h3>}

        {description && <p className="text-muted-foreground p-4">{description}</p>}

        <div
          id={`printify-product-${productId}`}
          data-product-id={productId}
          className="printify-embed"
          style={{
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <script
            async
            type="module"
            src="https://embed.printify.com/embed.js"
            onLoad={() => {
              if (window.PrintifyEmbed) {
                window.PrintifyEmbed.render(document.getElementById(`printify-product-${productId}`), {
                  storeId: process.env.REACT_APP_PRINTIFY_STORE_ID,
                  productId: productId,
                });
              }
            }}
          />
          <p className="text-muted-foreground">Loading Printify product...</p>
        </div>

        <div className="p-4 bg-slate-50 text-center text-xs text-muted-foreground">
          <p>Powered by Printify</p>
          <p className="mt-1">Print-on-demand fulfillment</p>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    PrintifyEmbed?: any;
  }
}
