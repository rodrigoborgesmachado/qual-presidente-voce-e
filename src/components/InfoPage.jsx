import { Link } from "react-router-dom";

export default function InfoPage({ eyebrow, title, intro, children }) {
  return (
    <div className="container page-section info-page">
      <Link className="back-link" to="/">
        ← Voltar ao início
      </Link>
      <div className="page-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <div className="info-content">{children}</div>
      <nav className="info-nav" aria-label="Mais informações sobre o projeto">
        <Link to="/sobre">Sobre o projeto →</Link>
        <Link to="/privacidade">Política de privacidade →</Link>
        <Link to="/contato">Contato →</Link>
      </nav>
    </div>
  );
}
