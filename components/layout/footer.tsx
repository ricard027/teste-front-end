import { Heart, ShieldCheck, UserRound } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer>
      <section
        id="newsletter"
        className="newsletter"
        aria-labelledby="newsletter-title"
      >
        <div>
          <h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2>
          <p>Assine e receba novidades e conteúdos exclusivos da Econverse.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
            <label className="sr-only" htmlFor="newsletter-name">
              Nome
            </label>
            <input
              id="newsletter-name"
              autoComplete="name"
              placeholder="Digite seu nome"
            />
            <label className="sr-only" htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
            />
            <button className="yellow-button" type="submit">
              INSCREVER
            </button>
          </div>
          <label>
            <input type="checkbox" required /> Aceito os termos e condições
          </label>
        </form>
      </section>
      <div className="footer-main container">
        <div className="footer-brand">
          <Logo />
          <p>As melhores ofertas para você e sua família.</p>
          <div aria-hidden="true">
            <Heart aria-hidden="true" />
            <UserRound aria-hidden="true" />
            <ShieldCheck aria-hidden="true" />
          </div>
        </div>
        <div className="footer-links">
          <section>
            <h2>Institucional</h2>
            <ul><li>Sobre Nós</li><li>Movimento</li><li>Trabalhe conosco</li></ul>
          </section>
          <section>
            <h2>Ajuda</h2>
            <ul><li>Suporte</li><li>Fale Conosco</li><li>Perguntas Frequentes</li></ul>
          </section>
          <section>
            <h2>Termos</h2>
            <ul><li>Termos e Condições</li><li>Política de Privacidade</li><li>Troca e Devolução</li></ul>
          </section>
        </div>
      </div>
      <div className="copyright">Econverse. Todos os direitos reservados.</div>
    </footer>
  );
}
