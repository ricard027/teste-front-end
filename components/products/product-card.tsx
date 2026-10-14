import type { Product } from '@/types/product'
import { formatCurrency } from '@/utils/currency'

export function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product, trigger: HTMLButtonElement) => void }) {
  return (
    <article className="product-card">
      <img src={product.photo} alt={product.productName} width="247" height="250" loading="lazy" />
      <div className="product-info">
        <h3>{product.productName}</h3>
        <strong>{formatCurrency(product.price)}</strong>
        <button type="button" onClick={(event) => onSelect(product, event.currentTarget)} aria-label={`Ver detalhes de ${product.productName}`}>COMPRAR</button>
      </div>
    </article>
  )
}
