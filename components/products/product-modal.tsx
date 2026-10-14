"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProductModal({
  product,
  onClose,
  returnFocus,
}: {
  product: Product;
  onClose: () => void;
  returnFocus: HTMLButtonElement | null;
}) {
  const modalRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const titleId = useId();
  const descriptionId = useId();

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    isClosingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = setTimeout(onClose, 220);
  }, [onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    const page = document.getElementById("page-content");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    modal?.querySelector<HTMLElement>(focusableSelector)?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return requestClose();
      if (event.key !== "Tab" || !modal) return;
      const elements = [
        ...modal.querySelectorAll<HTMLElement>(focusableSelector),
      ];
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      returnFocus?.focus();
    };
  }, [requestClose, returnFocus]);

  return (
    <div
      className={`modal-backdrop${isClosing ? " is-closing" : ""}`}
      onMouseDown={(event) => event.currentTarget === event.target && requestClose()}
    >
      <section
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          type="button"
          className="modal-close"
          onClick={requestClose}
          aria-label="Fechar detalhes"
        >
          <X />
        </button>
        <img
          src={product.photo}
          alt={product.productName}
          width="220"
          height="180"
        />
        <div className="modal-content">
          <h2 id={titleId}>{product.productName}</h2>
          <p className="modal-price">{formatCurrency(product.price)}</p>
          <p id={descriptionId} className="modal-description">{product.descriptionShort}</p>
          <p className="modal-details">Veja mais detalhes do produto &gt;</p>
          <div className="modal-actions">
            <div className="quantity-selector" role="group" aria-label="Quantidade do produto">
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity === 1} aria-label="Diminuir quantidade"><Minus aria-hidden="true" /></button>
              <output aria-live="polite" aria-label={`${quantity} unidade${quantity > 1 ? "s" : ""}`}>{quantity.toString().padStart(2, "0")}</output>
              <button type="button" onClick={() => setQuantity((current) => current + 1)} aria-label="Aumentar quantidade"><Plus aria-hidden="true" /></button>
            </div>
            <button type="button" className="buy-button">COMPRAR</button>
          </div>
        </div>
      </section>
    </div>
  );
}
