"use client";

import {
  CreditCard,
  Heart,
  Menu,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 800) setIsMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("resize", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <aside className="topbar" aria-label="Benefícios da loja">
        <span>
          <ShieldCheck aria-hidden="true" /> Compra <b>100% segura</b>
        </span>
        <span>
          <Truck aria-hidden="true" /> Frete grátis <b>acima de R$ 200</b>
        </span>
        <span>
          <CreditCard aria-hidden="true" /> Parcele <b>suas compras</b>
        </span>
      </aside>
      <div className="header-main container">
        <button
          className="mobile-menu"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <Menu />
        </button>
        <Logo />
        <form
          className="search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="site-search">
            Buscar produtos
          </label>
          <input id="site-search" placeholder="O que você está buscando?" />
          <button type="submit" aria-label="Pesquisar">
            <Search />
          </button>
        </form>
        <div className="header-actions">
          <button type="button" aria-label="Pedidos">
            <Package />
          </button>
          <button type="button" aria-label="Favoritos">
            <Heart />
          </button>
          <button type="button" aria-label="Minha conta">
            <UserRound />
          </button>
          <button type="button" aria-label="Carrinho">
            <ShoppingCart />
          </button>
        </div>
      </div>
      <nav
        id="main-navigation"
        className={`main-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Navegação principal"
      >
        <ul className="container nav-links">
          <li><a href="#categorias" onClick={closeMenu}>TODAS CATEGORIAS</a></li>
          <li><a href="#produtos" onClick={closeMenu}>SUPERMERCADO</a></li>
          <li><a href="#produtos" onClick={closeMenu}>LIVROS</a></li>
          <li><a href="#produtos" onClick={closeMenu}>MODA</a></li>
          <li><a href="#parceiros" onClick={closeMenu}>LANÇAMENTOS</a></li>
          <li><a className="active" href="#produtos" onClick={closeMenu}>OFERTAS DO DIA</a></li>
          <li><a href="#newsletter" onClick={closeMenu}>ASSINATURA</a></li>
        </ul>
      </nav>
    </header>
  );
}
