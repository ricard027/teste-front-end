"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel";
import { ProductCard } from "./product-card";

type Props = {
  sectionId: string;
  showTabs?: boolean;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelect: (product: Product, trigger: HTMLButtonElement) => void;
};

export function ProductShelf({
  sectionId,
  showTabs = false,
  products,
  isLoading,
  error,
  onRetry,
  onSelect,
}: Props) {
  const { carouselRef, navigation, navigate, handleKeyDown } =
    useHorizontalCarousel<HTMLDivElement>(products.length);

  return (
    <section
      id={sectionId}
      className="container products-section"
      aria-labelledby={`${sectionId}-title`}
      aria-busy={isLoading}
    >
      <div className="section-heading">
        <span />
        <div>
          <h2 id={`${sectionId}-title`}>Produtos relacionados</h2>
          {!showTabs && <a href="#produtos">Ver todos</a>}
        </div>
        <span />
      </div>
      {showTabs && (
        <ul className="tabs" aria-label="Categorias apresentadas no layout">
          {["CELULAR", "ACESSÓRIOS", "TABLETS", "NOTEBOOKS", "TVS", "VER TODOS"].map(
            (tab, index) => (
              <li className={index === 0 ? "active" : ""} key={tab}>
                {tab}
              </li>
            ),
          )}
        </ul>
      )}
      {isLoading && (
        <div className="product-status" role="status">
          Carregando produtos…
        </div>
      )}
      {!isLoading && error && (
        <div className="product-status" role="alert">
          <p>{error}</p>
          <button type="button" onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      )}
      {!isLoading && !error && products.length === 0 && (
        <div className="product-status">
          Nenhum produto disponível no momento.
        </div>
      )}
      {!isLoading && !error && products.length > 0 && (
        <div
          className="product-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label={`Produtos da vitrine ${sectionId}`}
        >
          <button
            className="carousel-control carousel-control--previous"
            type="button"
            onClick={() => navigate(-1)}
            disabled={!navigation.canGoBack}
            aria-label="Ver produtos anteriores"
            aria-controls={`${sectionId}-slider`}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div
            ref={carouselRef}
            id={`${sectionId}-slider`}
            className="products-grid"
            role="group"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Lista de produtos. Use as setas esquerda e direita para navegar."
          >
            {products.map((product, index) => (
              <ProductCard
                key={`${product.productName}-${index}`}
                product={product}
                onSelect={onSelect}
              />
            ))}
          </div>
          <button
            className="carousel-control carousel-control--next"
            type="button"
            onClick={() => navigate(1)}
            disabled={!navigation.canGoForward}
            aria-label="Ver próximos produtos"
            aria-controls={`${sectionId}-slider`}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
