import type { Product, ProductsResponse } from '@/types/product'

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false
  const product = value as Record<string, unknown>
  return (
    typeof product.productName === 'string' &&
    typeof product.descriptionShort === 'string' &&
    typeof product.photo === 'string' &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price)
  )
}

export function validateProductsResponse(data: unknown): Product[] {
  if (!data || typeof data !== 'object') throw new Error('Resposta de produtos inválida.')

  const payload = data as Partial<ProductsResponse>
  if (payload.success !== true || !Array.isArray(payload.products)) {
    throw new Error('Resposta de produtos inválida.')
  }

  const products = payload.products.filter(isProduct)
  if (products.length !== payload.products.length) {
    throw new Error('Um ou mais produtos possuem dados inválidos.')
  }
  return products
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch('/api/products', { signal })
  if (!response.ok) throw new Error(`Falha ao consultar produtos (${response.status}).`)
  return validateProductsResponse(await response.json())
}
