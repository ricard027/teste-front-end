import { NextResponse } from 'next/server'
import { fetchOfficialProducts } from '@/services/products-server'

export async function GET() {
  try {
    const products = await fetchOfficialProducts()
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Falha ao consultar o catálogo oficial.', error)
    return NextResponse.json({ success: false, products: [] }, { status: 502 })
  }
}
