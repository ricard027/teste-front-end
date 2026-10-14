'use client'

import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '@/services/products'
import type { Product } from '@/types/product'

export function useProducts(initialProducts: Product[], initialError: string | null) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(initialError)
  const [request, setRequest] = useState(0)

  const retry = useCallback(() => {
    setIsLoading(true)
    setError(null)
    setRequest((current) => current + 1)
  }, [])

  useEffect(() => {
    if (request === 0) return

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
