"use client";

import { useCallback, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductModal } from "@/components/products/product-modal";
import { ProductShelf } from "@/components/products/product-shelf";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product";

const categories = [
  ["Tecnologia", "/assets/category-technology.png"],
  ["Supermercado", "/assets/category-market.png"],
  ["Bebidas", "/assets/category-drinks.png"],
  ["Ferramentas", "/assets/category-tools.png"],
  ["Saúde", "/assets/category-health.png"],
  ["Esportes e Fitness", "/assets/category-sports.png"],
  ["Moda", "/assets/category-fashion.png"],
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
  return (
    <section
      id="categorias"
      className="container category-section"
      aria-label="Categorias"
    >
      <div className="category-grid">
        {categories.map(([label, image], index) => (
          <a
            href="#produtos"
            className={`category ${index === 0 ? "selected" : ""}`}
            key={label}
          >
            <div className="category-icon">
              <img src={image} alt="" width="52" height="52" />
            </div>
            <span>{label}</span>
          </a>
        ))}
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
        <article className="partner-card" key={item}>
          <h2>Parceiros</h2>
          <p>
            Conheça nossas ofertas
            <br /> selecionadas.
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
  return (
    <section className="brands" aria-labelledby="brands-title">
      <h2 id="brands-title">Navegue por marcas</h2>
      <div className="brand-row">
        {[1, 2, 3, 4, 5].map((brand) => (
          <a
            className="brand-circle"
            href="#produtos"
            key={brand}
            aria-label={`Ver produtos da marca Econverse ${brand}`}
          >
            <span className="brand-mark">
              <span>ec</span>onverse
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Storefront() {
  const { products, isLoading, error, retry } = useProducts();
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
          <ProductShelf sectionId="produtos" {...shelfProps} />
          <Partners />
          <ProductShelf sectionId="destaques" {...shelfProps} />
          <Brands />
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
