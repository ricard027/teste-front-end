"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductModal } from "@/components/products/product-modal";
import { ProductShelf } from "@/components/products/product-shelf";
import { useProducts } from "@/hooks/use-products";
import { useHorizontalCarousel } from "@/hooks/use-horizontal-carousel";
import type { Product } from "@/types/product";

const categories = [
  ["Tecnologia", "/assets/category-technology.png"],
  ["Supermercado", "/assets/category-fashion.png"],
  ["Bebidas", "/assets/category-drinks.png"],
  ["Ferramentas", "/assets/category-tools.png"],
  ["Saúde", "/assets/category-market.png"],
  ["Esportes e Fitness", "/assets/category-sports.png"],
  ["Moda", "/assets/category-health.png"],
] as const;

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-copy">
        <h1>
          Venha conhecer nossas
          <br /> promoções
        </h1>
        <p>
          50% Off <span>nos produtos</span>
        </p>
        <a className="yellow-button" href="#produtos">
          Ver produto
        </a>
      </div>
    </section>
  );
}
function CategoryStrip() {
  const { carouselRef, navigation, navigate, handleKeyDown } =
    useHorizontalCarousel<HTMLUListElement>();

  return (
    <section
      id="categorias"
      className="container category-section"
      aria-label="Categorias"
    >
      <div className="strip-carousel">
        <button className="strip-control strip-control--previous" type="button" onClick={() => navigate(-1)} disabled={!navigation.canGoBack} aria-label="Ver categorias anteriores" aria-controls="categories-slider"><ChevronLeft aria-hidden="true" /></button>
        <ul ref={carouselRef} id="categories-slider" className="category-grid" tabIndex={0} onKeyDown={handleKeyDown} aria-label="Categorias. Use as setas esquerda e direita para navegar.">
          {categories.map(([label, image], index) => (
            <li key={label}>
              <a href="#produtos" className={`category ${index === 0 ? "selected" : ""}`}>
                <span className="category-icon"><img src={image} alt="" width="52" height="52" loading="lazy" /></span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button className="strip-control strip-control--next" type="button" onClick={() => navigate(1)} disabled={!navigation.canGoForward} aria-label="Ver próximas categorias" aria-controls="categories-slider"><ChevronRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}
function Partners() {
  return (
    <section
      id="parceiros"
      className="container partners"
      aria-label="Parceiros"
    >
      {[1, 2].map((item) => (
        <article
          className={`partner-card ${item === 2 ? "second" : ""}`}
          key={item}
        >
          <h2>Parceiros</h2>
          <p>
            Lorem ipsum dolor sit
            <br /> amet, consectetur.
          </p>
          <a className="yellow-button" href="#produtos">
            CONFIRA
          </a>
        </article>
      ))}
    </section>
  );
}
function Brands() {
  const { carouselRef, navigation, navigate, handleKeyDown } =
    useHorizontalCarousel<HTMLUListElement>();

  return (
    <section className="brands" aria-labelledby="brands-title">
      <h2 id="brands-title">Navegue por marcas</h2>
      <div className="strip-carousel brand-carousel">
        <button className="strip-control strip-control--previous" type="button" onClick={() => navigate(-1)} disabled={!navigation.canGoBack} aria-label="Ver marcas anteriores" aria-controls="brands-slider"><ChevronLeft aria-hidden="true" /></button>
        <ul ref={carouselRef} id="brands-slider" className="brand-row" tabIndex={0} onKeyDown={handleKeyDown} aria-label="Marcas. Use as setas esquerda e direita para navegar.">
          {[1, 2, 3, 4, 5].map((brand) => (
            <li className="brand-circle" key={brand} aria-label="Econverse">
              <span className="brand-mark" aria-hidden="true"><span>ec</span>onverse</span>
            </li>
          ))}
        </ul>
        <button className="strip-control strip-control--next" type="button" onClick={() => navigate(1)} disabled={!navigation.canGoForward} aria-label="Ver próximas marcas" aria-controls="brands-slider"><ChevronRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}

type StorefrontProps = {
  initialProducts: Product[];
  initialError: string | null;
};

export default function Storefront({ initialProducts, initialError }: StorefrontProps) {
  const { products, isLoading, error, retry } = useProducts(
    initialProducts,
    initialError,
  );
  const [selection, setSelection] = useState<{
    product: Product;
    trigger: HTMLButtonElement;
  } | null>(null);
  const closeModal = useCallback(() => setSelection(null), []);
  const shelfProps = {
    products,
    isLoading,
    error,
    onRetry: retry,
    onSelect: (product: Product, trigger: HTMLButtonElement) =>
      setSelection({ product, trigger }),
  };

  return (
    <>
      <div id="page-content">
        <Header />
        <main>
          <Hero />
          <CategoryStrip />
          <ProductShelf sectionId="produtos" showTabs {...shelfProps} />
          <Partners />
          <ProductShelf sectionId="destaques" {...shelfProps} />
          <Partners />
          <Brands />
          <ProductShelf sectionId="ofertas" {...shelfProps} />
        </main>
        <Footer />
      </div>
      {selection && (
        <ProductModal
          product={selection.product}
          returnFocus={selection.trigger}
          onClose={closeModal}
        />
      )}
    </>
  );
}
