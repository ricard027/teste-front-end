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
import { Logo } from "@/components/ui/logo";

export function Header() {
  return (
    <header className="site-header">
      <div className="topbar" aria-label="Benefícios da loja">
        <span>
          <ShieldCheck aria-hidden="true" /> Compra <b>100% segura</b>
        </span>
        <span>
          <Truck aria-hidden="true" /> Frete grátis <b>acima de R$ 200</b>
        </span>
        <span>
          <CreditCard aria-hidden="true" /> Parcele <b>suas compras</b>
        </span>
      </div>
      <div className="header-main container">
        <button className="mobile-menu" type="button" aria-label="Abrir menu">
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
      <nav className="main-nav" aria-label="Navegação principal">
        <div className="container nav-links">
          <a href="#categorias">TODAS CATEGORIAS</a>
          <a href="#produtos">SUPERMERCADO</a>
          <a href="#produtos">LIVROS</a>
          <a href="#produtos">MODA</a>
          <a href="#parceiros">LANÇAMENTOS</a>
          <a className="active" href="#produtos">
            OFERTAS DO DIA
          </a>
          <a href="#newsletter">ASSINATURA</a>
        </div>
      </nav>
    </header>
  );
}
