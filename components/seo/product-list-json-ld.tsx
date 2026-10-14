import type { Product } from "@/types/product";
import { serializeJsonLd } from "@/utils/serialize-json-ld";

type ProductListJsonLdProps = {
  products: Product[];
};

export function ProductListJsonLd({ products }: ProductListJsonLdProps) {
  if (products.length === 0) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produtos relacionados",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.productName,
        description: product.descriptionShort,
        image: product.photo,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "BRL",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
    />
  );
}
