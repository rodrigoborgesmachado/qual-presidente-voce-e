import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { calculateResult, NEUTRAL_OPTION } from "../utils/calculateResult";
import CandidateResult from "../components/CandidateResult";
import CategoryResult from "../components/CategoryResult";
import { shareResult } from "../utils/shareResult";
import { proposalUrl } from "../utils/proposalUrl";

export default function Result() {
  const { data, session, questions, reset } = useQuiz();
  const [selectedId, setSelectedId] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [shareFeedback, setShareFeedback] = useState("");
  const navigate = useNavigate();
  if (!session) return <Navigate to="/modos" replace />;
  if (!session.completed) return <Navigate to="/quiz" replace />;
  const results = calculateResult(questions, session.answers, data.candidates);
  const selected =
    results.find((result) => result.candidateId === selectedId) ?? results[0];
  const findCandidate = (id) =>
    data.candidates.find((candidate) => candidate.id === id);
  const name = (id) => {
    const candidate = findCandidate(id);
    return candidate?.displayName || candidate?.name || id;
  };
  const topResult = results[0];
  const topCandidate = topResult && findCandidate(topResult.candidateId);
  const canShare =
    Boolean(topCandidate?.displayName || topCandidate?.name) &&
    Number.isFinite(topResult?.percentage);

  async function handleShare() {
    if (!canShare || sharing) return;
    setSharing(true);
    setShareFeedback("");
    try {
      const outcome = await shareResult({
        projectName: data.project,
        projectUrl: data.projectURL,
        topResults: results.slice(0, 3).map((result) => ({
          candidateName: name(result.candidateId),
          percentage: result.percentage,
        })),
        answerCount: questions.filter(
          (question) => session.answers[question.id] !== undefined,
        ).length,
        modeName: data.quizModes[session.modeId].name,
        tied,
      });
      if (outcome === "copied") setShareFeedback("Resultado copiado!");
    } catch {
      setShareFeedback(
        "Não foi possível copiar o resultado. Tente novamente ou permita o acesso à área de transferência.",
      );
    } finally {
      setSharing(false);
    }
  }
  const neutralCount = questions.filter(
    (question) => session.answers[question.id] === NEUTRAL_OPTION,
  ).length;
  const tied = results.length > 1 && results[0].score === results[1].score;
  const renderCandidate = (result, index) => (
    <CandidateResult
      key={result.candidateId}
      candidate={findCandidate(result.candidateId)}
      result={result}
      rank={index + 1}
      featured={index === 0 && !tied && result.score > 0}
      selected={selected?.candidateId === result.candidateId}
      onSelect={() => setSelectedId(result.candidateId)}
    />
  );
  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">SUAS IDEIAS ENCONTRAM PROPOSTAS</span>
        <h1>Um retrato das suas afinidades.</h1>
        <p>
          {questions.length} respostas · Modo{" "}
          {data.quizModes[session.modeId].name.toLowerCase()}
        </p>
      </div>
      {neutralCount === questions.length ? (
        <div className="result-notice" role="status">
          Você respondeu “Não sei / Não tenho opinião” a todas as perguntas. Não
          há afinidade identificada; todos os percentuais são zero.
        </div>
      ) : (
        tied && (
          <div className="result-notice">
            Há empate na maior compatibilidade. A ordem entre os candidatos
            empatados segue o cadastro no JSON.
          </div>
        )
      )}
      {!results.length && (
        <p className="result-notice">
          Nenhum candidato cadastrado. Adicione candidatos ao arquivo de dados
          para visualizar a comparação.
        </p>
      )}
      <div className="results-grid">
        {results.slice(0, 3).map(renderCandidate)}
      </div>
      {results.length > 3 && (
        <details className="other-results">
          <summary>Ver os demais candidatos ({results.length - 3})</summary>
          <div className="results-grid">
            {results
              .slice(3)
              .map((result, index) => renderCandidate(result, index + 3))}
          </div>
        </details>
      )}
      {selected && (
        <section className="theme-section">
          <div>
            <span className="eyebrow">UM OLHAR MAIS DE PERTO</span>
            <h2>Compatibilidade por tema</h2>
            <p>Explore suas afinidades com cada candidato.</p>
            <label className="select-label" htmlFor="candidate-select">
              Candidato
            </label>
            <select
              id="candidate-select"
              value={selected.candidateId}
              onChange={(event) => setSelectedId(event.target.value)}
            >
              {results.map((result) => (
                <option key={result.candidateId} value={result.candidateId}>
                  {name(result.candidateId)}
                </option>
              ))}
            </select>
          </div>
          <div className="theme-bars">
            {Object.entries(selected.categories).map(([id, result]) => (
              <CategoryResult
                key={id}
                name={
                  data.categories.find((category) => category.id === id)
                    ?.name ?? id
                }
                result={result}
              />
            ))}
          </div>
        </section>
      )}
      <details className="explanation">
        <summary>
          Por que este resultado? <span>Veja suas respostas e as fontes</span>
        </summary>
        <div className="explanation-content">
          <p>
            O percentual compara os pontos obtidos com a maior pontuação
            possível nas perguntas deste quiz. A base é a mesma para todos os
            candidatos. O peso da pergunta multiplica o peso de cada associação.
            Respostas neutras somam zero e permanecem na base de comparação; os
            percentuais não precisam somar 100%.
          </p>
          {questions.map((question, index) => {
            const option = question.options.find(
              (item) => item.id === session.answers[question.id],
            );
            return (
              <article className="answer-review" key={question.id}>
                <span className="eyebrow">PERGUNTA {index + 1}</span>
                <h3>{question.question}</h3>
                <p>
                  <strong>Sua resposta:</strong>{" "}
                  {option?.text ?? "Não sei / Não tenho opinião"}
                </p>
                <p>
                  <strong>Associações:</strong>{" "}
                  {option?.matches?.length
                    ? option.matches.map((match, i) => (
                        <span key={`${match.candidateId}-${i}`}>
                          {i > 0 ? "; " : ""}
                          {name(match.candidateId)} (peso{" "}
                          {match.weight.toLocaleString("pt-BR")})
                        </span>
                      ))
                    : "Nenhum candidato pontuou."}
                </p>
                {question.sources?.length > 0 && (
                  <div className="sources">
                    <strong>Fontes da questão</strong>
                    <ul>
                      {question.sources.map((source, i) => (
                        <li key={i}>
                          {proposalUrl(
                            source,
                            findCandidate(source.candidateId),
                          ) ? (
                            <a
                              href={proposalUrl(
                                source,
                                findCandidate(source.candidateId),
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {source.title ||
                                source.document ||
                                "Fonte da questão"}{" "}
                              ↗
                            </a>
                          ) : (
                            source.title ||
                            source.document ||
                            "Fonte da questão"
                          )}
                          {source.candidateId &&
                            ` · ${name(source.candidateId)}`}
                          {source.page != null && ` · página ${source.page}`}
                          {source.note && <p>{source.note}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </details>
      <aside className="reflection-note">
        <span aria-hidden="true">ⓘ</span>
        <div>
          <strong>Compatibilidade não é recomendação de voto.</strong>
          <p>
            Este resultado reflete apenas as perguntas desta sessão. Confira as
            fontes e conheça os programas completos.
            {data.development &&
              " Esta versão utiliza exclusivamente dados fictícios de desenvolvimento."}
          </p>
        </div>
      </aside>
      <div className="result-actions">
        <button
          className="button primary"
          onClick={() => {
            reset();
            navigate("/modos");
          }}
        >
          Refazer quiz ↗
        </button>
        {canShare && (
          <button
            className="button secondary"
            onClick={handleShare}
            disabled={sharing}
            aria-busy={sharing}
          >
            Compartilhar resultado
          </button>
        )}
        <Link className="button secondary" to="/">
          Voltar ao início
        </Link>
      </div>
      <p className="share-feedback" role="status" aria-live="polite">
        {shareFeedback}
      </p>
    </div>
  );
}
