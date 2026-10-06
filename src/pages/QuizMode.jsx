import { useNavigate, Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { selectQuestions } from "../utils/selectQuestions";

export default function QuizMode() {
  const { data, start } = useQuiz();
  const navigate = useNavigate();
  return (
    <div className="container page-section">
      <Link className="back-link" to="/">
        ← Voltar ao início
      </Link>
      <div className="page-heading">
        <span className="eyebrow">ESCOLHA SEU RITMO</span>
        <h1>Quanto você quer explorar?</h1>
        <p>O mesmo propósito, diferentes profundidades.</p>
      </div>
      <div className="mode-grid">
        {Object.entries(data.quizModes).map(([id, mode], index) => {
          const available = selectQuestions(data.questions, mode).length;
          return (
            <article
              className={`mode-card ${id === "balanced" ? "mode-highlight" : ""}`}
              key={id}
            >
              <span className="mode-symbol" aria-hidden="true">
                {["◔", "◑", "●"][index % 3]}
              </span>
              <span className="eyebrow">
                {String(index + 1).padStart(2, "0")} / SEU RITMO
              </span>
              <h2>{mode.name}</h2>
              <p>{mode.description}</p>
              <div className="mode-count">
                <strong>{mode.questionCount}</strong> perguntas
              </div>
              {available < mode.questionCount && (
                <p className="availability">
                  {available} disponíveis nesta versão. Você responderá{" "}
                  {available}.
                </p>
              )}
              <button
                className="button primary"
                disabled={!available}
                onClick={() => {
                  if (start(id)) navigate("/quiz");
                }}
              >
                Escolher {mode.name.toLowerCase()}{" "}
                <span aria-hidden="true">→</span>
              </button>
            </article>
          );
        })}
      </div>
      <p className="center-note">
        Você pode voltar às perguntas e mudar suas respostas a qualquer momento
        durante o quiz.
      </p>
    </div>
  );
}
