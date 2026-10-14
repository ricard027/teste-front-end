'use client'

import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '@/services/products'
import type { Product } from '@/types/product'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [request, setRequest] = useState(0)

  const retry = useCallback(() => {
    setIsLoading(true)
    setError(null)
    setRequest((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts(controller.signal)
      .then(setProducts)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return
        setError(reason instanceof Error ? reason.message : 'Não foi possível carregar os produtos.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [request])

  return { products, isLoading, error, retry }
}
