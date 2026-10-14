'use client'

import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import type { Product } from '@/types/product'
import { formatCurrency } from '@/utils/currency'

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ProductModal({ product, onClose, returnFocus }: { product: Product; onClose: () => void; returnFocus: HTMLButtonElement | null }) {
  const modalRef = useRef<HTMLElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const modal = modalRef.current
    const page = document.getElementById('page-content')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    page?.setAttribute('inert', '')
    modal?.querySelector<HTMLElement>(focusableSelector)?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onClose()
      if (event.key !== 'Tab' || !modal) return
      const elements = [...modal.querySelectorAll<HTMLElement>(focusableSelector)]
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      page?.removeAttribute('inert')
      document.removeEventListener('keydown', onKeyDown)
      returnFocus?.focus()
    }
  }, [onClose, returnFocus])

  return <div className="modal-backdrop" onMouseDown={(event) => event.currentTarget === event.target && onClose()}><section ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}><button type="button" className="modal-close" onClick={onClose} aria-label="Fechar detalhes"><X /></button><img src={product.photo} alt={product.productName} width="280" height="280" /><div className="modal-content"><h2 id={titleId}>{product.productName}</h2><p id={descriptionId}>{product.descriptionShort}</p><strong>{formatCurrency(product.price)}</strong><button type="button" className="buy-button">COMPRAR</button></div></section></div>
}
