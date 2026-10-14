import Storefront from '@/components/storefront'
import { ProductListJsonLd } from '@/components/seo/product-list-json-ld'
import { fetchOfficialProducts } from '@/services/products-server'
import type { Product } from '@/types/product'

type ProductsState = {
  products: Product[]
  error: string | null
}

async function loadProducts(): Promise<ProductsState> {
  try {
    return { products: await fetchOfficialProducts(), error: null }
  } catch (error) {
    console.error('Falha ao renderizar o catálogo oficial.', error)
    return { products: [], error: 'Não foi possível carregar os produtos.' }
  }
}

export default async function Page() {
  const { products, error } = await loadProducts()

  return (
    <>
      <ProductListJsonLd products={products} />
      <Storefront initialProducts={products} initialError={error} />
    </>
  )
}
