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
      <ul className="category-grid">
        {categories.map(([label, image], index) => (
          <li key={label}>
            <a
              href="#produtos"
              className={`category ${index === 0 ? "selected" : ""}`}
            >
              <span className="category-icon">
                <img src={image} alt="" width="52" height="52" loading="lazy" />
              </span>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
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
      <ul className="brand-row" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((brand) => (
          <li className="brand-circle" key={brand}>
            <span className="brand-mark"><span>ec</span>onverse</span>
          </li>
        ))}
      </ul>
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
