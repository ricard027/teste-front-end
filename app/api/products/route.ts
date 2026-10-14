import { NextResponse } from 'next/server'
import { validateProductsResponse } from '@/services/products'

function getProductsEndpoint() {
  const configuredEndpoint = process.env.PRODUCTS_ENDPOINT
  if (!configuredEndpoint) {
    throw new Error('A variável de ambiente PRODUCTS_ENDPOINT não foi configurada.')
  }

  const endpoint = new URL(configuredEndpoint)
  if (endpoint.protocol !== 'https:') {
    throw new Error('PRODUCTS_ENDPOINT deve utilizar HTTPS.')
  }

  return endpoint
}

export async function GET() {
  try {
    const response = await fetch(getProductsEndpoint(), { next: { revalidate: 300 } })
    if (!response.ok) throw new Error(`Endpoint oficial respondeu ${response.status}.`)
    const products = validateProductsResponse(await response.json())
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Falha ao consultar o catálogo oficial.', error)
    return NextResponse.json({ success: false, products: [] }, { status: 502 })
  }
}
