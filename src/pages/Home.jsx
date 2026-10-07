import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function Home() {
  const { session, data } = useQuiz();
  return (
    <div className="home-page container">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">MENOS RÓTULOS. MAIS IDEIAS.</span>
          <h1>
            O que você pensa
            <br />
            sobre o <span className="serif-accent">futuro?</span>
          </h1>
          <p className="hero-description">
            Descubra qual candidato à Presidência de {data.election.year} possui
            propostas mais próximas das suas opiniões.
          </p>
          <Link className="button primary" to="/modos">
            Começar <span aria-hidden="true">↗</span>
          </Link>
          <p className="small-note">Sem cadastro. No seu ritmo.</p>
          {session && (
            <Link
              className="resume-link"
              to={session.completed ? "/resultado" : "/quiz"}
            >
              {session.completed
                ? "Ver meu último resultado"
                : "Continuar de onde parei"}{" "}
              →
            </Link>
          )}
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">+</span>
          <div className="floating-label label-top">
            <span className="status-dot" /> Ideias antes de nomes
          </div>
          <div className="ballot">
            <span className="ballot-eyebrow">QUAL PRESIDENTE É VOCÊ?</span>
            <div className="ballot-line long" />
            <div className="ballot-line short" />
            <div className="ballot-choice">
              <span className="ballot-check">✓</span>
              <div>
                <span />
                <span />
              </div>
            </div>
            <div className="ballot-choice">
              <span className="ballot-box" />
              <div>
                <span />
                <span />
              </div>
            </div>
            <div className="ballot-choice">
              <span className="ballot-box" />
              <div>
                <span />
                <span />
              </div>
            </div>
            <span className="ballot-bottom">Sua opinião faz parte.</span>
          </div>
          <div className="floating-label label-bottom">
            <span>↗</span> Descubra suas afinidades
          </div>
        </div>
      </section>
      <section className="how-section">
        <div className="section-heading">
          <span className="eyebrow">COMO FUNCIONA</span>
          <h2>Uma conversa sobre ideias.</h2>
          <p>Você responde. As propostas se encontram.</p>
        </div>
        <div className="steps-grid">
          <article>
            <span className="step-number">01</span>
            <h3>Escolha seu ritmo</h3>
            <p>
              Uma versão rápida, equilibrada ou completa. Você decide a
              profundidade.
            </p>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3>Responda sem rótulos</h3>
            <p>
              Compare ideias sem ver os nomes, fotos ou partidos dos candidatos
              nas alternativas.
            </p>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3>Explore suas afinidades</h3>
            <p>
              Veja a compatibilidade com os programas dos candidatos, tema por
              tema.
            </p>
          </article>
        </div>
      </section>
      <aside className="reflection-note">
        <span aria-hidden="true">ⓘ</span>
        <div>
          <strong>Um ponto de partida para sua reflexão.</strong>
          <p>
            O quiz compara suas respostas com propostas dos candidatos. O
            resultado não é uma recomendação de voto. Conheça os programas,
            confira as fontes e faça sua própria escolha.
          </p>
        </div>
      </aside>
      <section className="home-information">
        <div className="section-heading">
          <span className="eyebrow">PROPOSTAS COMO PONTO DE PARTIDA</span>
          <h2>Entenda as ideias por trás do resultado.</h2>
          <p>
            Todas as questões desta edição foram elaboradas a partir das
            propostas dos candidatos reunidas para o projeto de{" "}
            {data.election.year}. Os planos de governo fornecidos à curadoria
            orientam os temas e as associações das alternativas.
          </p>
          <p>
            O quiz adapta esse conteúdo para perguntas comparáveis. Você pode
            explorar as referências disponíveis na explicação do resultado e
            conhecer os limites da comparação antes de interpretar seu
            percentual.
          </p>
          <Link className="text-button" to="/sobre">
            Conhecer o projeto e a metodologia ↗
          </Link>
        </div>
        <div className="home-faq">
          <details>
            <summary>O resultado é uma indicação de voto?</summary>
            <p>
              Não. O percentual mostra a afinidade com as alternativas e
              associações das perguntas desta sessão. Ele não avalia toda a
              trajetória de um candidato, a viabilidade das propostas ou todos
              os fatores da sua decisão. Conheça os programas completos e faça
              sua própria escolha.
            </p>
          </details>
          <details>
            <summary>Por que os candidatos não aparecem nas respostas?</summary>
            <p>
              Para que você possa refletir primeiro sobre a ideia apresentada.
              Nomes, fotos e partidos aparecem no resultado, junto das
              informações que ajudam a compreender a comparação.
            </p>
          </details>
          <details>
            <summary>Posso mudar de opinião ou não responder?</summary>
            <p>
              Sim. Durante o quiz, você pode voltar e alterar uma resposta. A
              opção “Não sei / Não tenho opinião” não soma pontos a nenhum
              candidato. Ela mantém a pergunta na base de comparação do
              percentual.
            </p>
          </details>
          <details>
            <summary>Por que um novo quiz pode ter outro resultado?</summary>
            <p>
              As perguntas são sorteadas entre os níveis e categorias do modo
              escolhido, sem repetição. Outra sessão pode abordar temas
              diferentes. O resultado reflete essa seleção, suas respostas e a
              cobertura documental registrada para os candidatos.
            </p>
          </details>
          <details>
            <summary>
              Minhas respostas são enviadas para algum cadastro?
            </summary>
            <p>
              O código do quiz calcula o resultado no navegador e salva o
              andamento na sessão da aba e os resultados concluídos no histórico
              deste navegador. Não há cadastro ou envio das respostas a uma API
              de resultados. O compartilhamento é opcional e não inclui as
              respostas individuais.{" "}
              <Link to="/privacidade">Leia a política de privacidade.</Link>
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
