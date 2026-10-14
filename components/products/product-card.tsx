import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product, trigger: HTMLButtonElement) => void;
}) {
  const originalPrice = product.price * 1.07;
  const installmentPrice = product.price / 2;

  return (
    <article className="product-card">
      <img
        src={product.photo}
        alt={product.productName}
        width="247"
        height="250"
        loading="lazy"
      />
      <div className="product-info">
        <h3>{product.productName}</h3>
        <p className="product-original-price">{formatCurrency(originalPrice)}</p>
        <p className="product-price">{formatCurrency(product.price)}</p>
        <p className="product-installments">
          ou 2x de {formatCurrency(installmentPrice)} sem juros
        </p>
        <p className="product-shipping">Frete grátis</p>
        <button
          type="button"
          onClick={(event) => onSelect(product, event.currentTarget)}
          aria-label={`Comprar — ver detalhes de ${product.productName}`}
        >
          COMPRAR
        </button>
      </div>
    </article>
  );
}
