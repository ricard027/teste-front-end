'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/types/product'
import { ProductCard } from './product-card'

type Props = {
  sectionId: string
  products: Product[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
  onSelect: (product: Product, trigger: HTMLButtonElement) => void
}

export function ProductShelf({ sectionId, products, isLoading, error, onRetry, onSelect }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [navigation, setNavigation] = useState({ canGoBack: false, canGoForward: false })

  const updateNavigation = useCallback(() => {
    const slider = sliderRef.current
    if (!slider) return

    const maximumScroll = Math.max(0, slider.scrollWidth - slider.clientWidth)
    const edgeTolerance = 8
    const nextNavigation = {
      canGoBack: slider.scrollLeft > edgeTolerance,
      canGoForward: maximumScroll > edgeTolerance && slider.scrollLeft < maximumScroll - edgeTolerance,
    }

    setNavigation((current) =>
      current.canGoBack === nextNavigation.canGoBack && current.canGoForward === nextNavigation.canGoForward
        ? current
        : nextNavigation,
    )
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const scheduleUpdate = () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = requestAnimationFrame(updateNavigation)
    }
    const resizeObserver = new ResizeObserver(scheduleUpdate)

    slider.addEventListener('scroll', scheduleUpdate, { passive: true })
    resizeObserver.observe(slider)
    scheduleUpdate()

    return () => {
      slider.removeEventListener('scroll', scheduleUpdate)
      resizeObserver.disconnect()
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [products, updateNavigation])

  const navigate = useCallback((direction: -1 | 1) => {
    const slider = sliderRef.current
    if (!slider) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    slider.scrollBy({
      left: direction * slider.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [])

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' && navigation.canGoBack) {
      event.preventDefault()
      navigate(-1)
    }
    if (event.key === 'ArrowRight' && navigation.canGoForward) {
      event.preventDefault()
      navigate(1)
    }
  }

  return (
    <section id={sectionId} className="container products-section" aria-labelledby={`${sectionId}-title`} aria-busy={isLoading}>
      <div className="section-heading"><span /><h2 id={`${sectionId}-title`}>Produtos relacionados</h2><span /></div>
      <ul className="tabs" aria-label="Categorias apresentadas no layout">
        {['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS', 'VER TODOS'].map((tab, index) => <li className={index === 0 ? 'active' : ''} key={tab}>{tab}</li>)}
      </ul>
      {isLoading && <div className="product-status" role="status">Carregando produtos…</div>}
      {!isLoading && error && <div className="product-status" role="alert"><p>{error}</p><button type="button" onClick={onRetry}>Tentar novamente</button></div>}
      {!isLoading && !error && products.length === 0 && <div className="product-status">Nenhum produto disponível no momento.</div>}
      {!isLoading && !error && products.length > 0 && (
        <div className="product-carousel" role="region" aria-roledescription="carrossel" aria-label={`Produtos da vitrine ${sectionId}`}>
          <button className="carousel-control carousel-control--previous" type="button" onClick={() => navigate(-1)} disabled={!navigation.canGoBack} aria-label="Ver produtos anteriores" aria-controls={`${sectionId}-slider`}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <div ref={sliderRef} id={`${sectionId}-slider`} className="products-grid" role="group" tabIndex={0} onKeyDown={handleSliderKeyDown} aria-label="Lista de produtos. Use as setas esquerda e direita para navegar.">
            {products.map((product, index) => <ProductCard key={`${product.productName}-${index}`} product={product} onSelect={onSelect} />)}
          </div>
          <button className="carousel-control carousel-control--next" type="button" onClick={() => navigate(1)} disabled={!navigation.canGoForward} aria-label="Ver próximos produtos" aria-controls={`${sectionId}-slider`}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
