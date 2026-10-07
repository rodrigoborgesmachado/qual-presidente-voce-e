import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { company } from "../data/company";

export default function Layout() {
  const { data, storageUnavailable, historyUnavailable } = useQuiz();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main-content")?.focus();
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <Link
          className="brand"
          to="/"
          aria-label="Qual Presidente é Você? — início"
        >
          <span className="brand-mark">
            q<span>?</span>
          </span>
          <span>
            qual presidente<span className="brand-sub">é você?</span>
          </span>
        </Link>
        <div className="header-actions">
          {pathname === "/" && (
            <Link className="history-home-link" to="/resultados-anteriores">
              Resultados anteriores
            </Link>
          )}
          <span className="edition">
            <span className="status-dot" /> ELEIÇÕES {data.election.year}
          </span>
        </div>
      </header>
      {data.development && (
        <div className="demo-banner">
          <span className="demo-dot" /> Versão de desenvolvimento · perguntas e
          candidatos fictícios
        </div>
      )}
      {storageUnavailable && (
        <p className="storage-warning" role="status">
          Seu navegador não permitiu salvar a sessão. As respostas serão
          mantidas apenas enquanto esta página estiver aberta.
        </p>
      )}
      {historyUnavailable && pathname === "/resultado" && (
        <p className="storage-warning" role="status">
          Não foi possível salvar seu resultado no histórico deste navegador.
          Ele ficará disponível apenas nesta sessão.
        </p>
      )}
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <strong>Suas opiniões. Sua reflexão. Sua escolha.</strong>
            <p>Comparação de propostas · Sem recomendação de voto</p>
          </div>
          <nav className="footer-nav" aria-label="Informações institucionais">
            <Link to="/sobre">Sobre o projeto</Link>
            <Link to="/privacidade">Política de privacidade</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            Desenvolvido por{" "}
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              {company.name} ↗
            </a>
          </span>
          <span>Edição {data.election.year} · Ideias antes de nomes</span>
        </div>
      </footer>
    </>
  );
}
