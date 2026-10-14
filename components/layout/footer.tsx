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
          <div aria-label="Redes sociais">
            <Heart />
            <UserRound />
            <ShieldCheck />
          </div>
        </div>
        <nav className="footer-links" aria-label="Links do rodapé">
          <div>
            <b>Institucional</b>
            <a href="#inicio">Sobre Nós</a>
            <a href="#inicio">Movimento</a>
            <a href="#inicio">Trabalhe conosco</a>
          </div>
          <div>
            <b>Ajuda</b>
            <a href="#inicio">Suporte</a>
            <a href="#inicio">Fale Conosco</a>
            <a href="#inicio">Perguntas Frequentes</a>
          </div>
          <div>
            <b>Termos</b>
            <a href="#inicio">Termos e Condições</a>
            <a href="#inicio">Política de Privacidade</a>
            <a href="#inicio">Troca e Devolução</a>
          </div>
        </nav>
      </div>
      <div className="copyright">Econverse. Todos os direitos reservados.</div>
    </footer>
  );
}
