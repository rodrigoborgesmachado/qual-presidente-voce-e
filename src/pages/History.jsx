import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import CandidateResult from "../components/CandidateResult";
import CategoryResult from "../components/CategoryResult";

function HistoryEntry({ record, onDelete }) {
  const [selectedId, setSelectedId] = useState(record.ranking[0]?.candidate.id);
  const selected = record.ranking.find(
    (row) => row.candidate.id === selectedId,
  );
  const tied =
    record.ranking.length > 1 &&
    record.ranking[0].score === record.ranking[1].score;
  const hasAffinity = record.ranking.some((row) => row.score > 0);
  const date = new Date(record.completedAt);
  const renderCandidate = (row, index) => (
    <CandidateResult
      key={row.candidate.id}
      candidate={row.candidate}
      result={row}
      rank={index + 1}
      featured={index === 0 && !tied && hasAffinity}
      selected={selectedId === row.candidate.id}
      onSelect={() => setSelectedId(row.candidate.id)}
    />
  );
  return (
    <article className="history-entry">
      <div className="history-entry-heading">
        <div>
          <time dateTime={record.completedAt}>
            {date.toLocaleString("pt-BR", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </time>
          <p>
            {record.answerCount} respostas · Modo {record.modeName} · Edição{" "}
            {record.electionYear}
          </p>
        </div>
        <button
          className="text-button"
          onClick={() => onDelete(record.id)}
          aria-label={`Excluir resultado de ${date.toLocaleString("pt-BR")}`}
        >
          Excluir
        </button>
      </div>
      <p className="history-summary">
        {record.ranking.length ? (
          !hasAffinity ? (
            "Nenhuma afinidade identificada nesta sessão."
          ) : tied ? (
            "Empate na maior compatibilidade."
          ) : (
            <>
              Maior afinidade:{" "}
              <strong>
                {record.ranking[0].candidate.displayName ||
                  record.ranking[0].candidate.name}
              </strong>{" "}
              · {record.ranking[0].percentage.toLocaleString("pt-BR")}%
            </>
          )
        ) : (
          "Nenhum candidato disponível nesta sessão."
        )}
      </p>
      <details>
        <summary>Ver resultado salvo</summary>
        <div className="history-details">
          <div className="results-grid">
            {record.ranking.slice(0, 3).map(renderCandidate)}
          </div>
          {record.ranking.length > 3 && (
            <details className="other-results">
              <summary>
                Ver os demais candidatos ({record.ranking.length - 3})
              </summary>
              <div className="results-grid">
                {record.ranking
                  .slice(3)
                  .map((row, index) => renderCandidate(row, index + 3))}
              </div>
            </details>
          )}
          {selected && (
            <section>
              <h2>Compatibilidade por tema</h2>
              <label
                className="select-label"
                htmlFor={`history-candidate-${record.id}`}
              >
                Candidato
              </label>
              <select
                id={`history-candidate-${record.id}`}
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
              >
                {record.ranking.map((row) => (
                  <option key={row.candidate.id} value={row.candidate.id}>
                    {row.candidate.displayName || row.candidate.name}
                  </option>
                ))}
              </select>
              <div className="history-theme-bars">
                {Object.entries(selected.categories).map(([id, result]) => (
                  <CategoryResult
                    key={id}
                    name={
                      record.categories.find((category) => category.id === id)
                        ?.name || id
                    }
                    result={result}
                  />
                ))}
              </div>
            </section>
          )}
          <p className="history-version">
            Resultado preservado da base {record.quizVersion}. Perguntas e
            respostas individuais não são armazenadas neste histórico.
          </p>
        </div>
      </details>
    </article>
  );
}

export default function History() {
  const { history, historyUnavailable, removeHistory } = useQuiz();
  const [feedback, setFeedback] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  function remove(id) {
    setFeedback(
      removeHistory(id)
        ? id
          ? "Resultado excluído."
          : "Histórico apagado."
        : "Não foi possível apagar o histórico. Verifique as permissões de armazenamento do navegador.",
    );
    setConfirmClear(false);
  }
  return (
    <div className="container page-section history-page">
      <Link className="back-link" to="/">
        ← Voltar ao início
      </Link>
      <div className="page-heading">
        <span className="eyebrow">SUAS REFLEXÕES AO LONGO DO TEMPO</span>
        <h1>Resultados anteriores</h1>
        <p>Reveja suas comparações, salvas somente neste navegador.</p>
      </div>
      {historyUnavailable && (
        <p className="result-notice" role="status">
          O navegador não permitiu acessar ou salvar o histórico. Novos
          resultados podem ficar disponíveis apenas enquanto a página estiver
          aberta.
        </p>
      )}
      <p className="history-privacy">
        Os resultados permanecem neste dispositivo mesmo depois de fechar a aba.
        Em um dispositivo compartilhado, outras pessoas que usam o mesmo perfil
        do navegador podem consultá-los.{" "}
        <Link to="/privacidade">Entenda o armazenamento.</Link>
      </p>
      {history.length ? (
        <>
          <div className="history-toolbar">
            <span>
              {history.length}{" "}
              {history.length === 1 ? "resultado salvo" : "resultados salvos"}
            </span>
            {confirmClear ? (
              <div>
                <span>Apagar todos os resultados?</span>
                <button className="button secondary" onClick={() => remove()}>
                  Sim, apagar histórico
                </button>
                <button
                  className="text-button"
                  onClick={() => setConfirmClear(false)}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                className="button secondary"
                onClick={() => setConfirmClear(true)}
              >
                Limpar histórico
              </button>
            )}
          </div>
          <div className="history-list">
            {history.map((record) => (
              <HistoryEntry key={record.id} record={record} onDelete={remove} />
            ))}
          </div>
        </>
      ) : (
        <div className="history-empty">
          <h2>Nenhum resultado salvo ainda</h2>
          <p>
            Conclua um quiz para guardar sua primeira comparação. Os próximos
            resultados aparecerão aqui, do mais recente para o mais antigo.
          </p>
          <Link className="button primary" to="/modos">
            Começar um quiz →
          </Link>
        </div>
      )}
      <p className="share-feedback" role="status">
        {feedback}
      </p>
    </div>
  );
}
