import { useEffect, useRef } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

export default function Quiz() {
  const { data, session, questions, answer, go, finish } = useQuiz();
  const navigate = useNavigate();
  const card = useRef(null);
  useEffect(() => {
    card.current?.focus();
  }, [session?.index]);
  if (!session) return <Navigate to="/modos" replace />;
  if (session.completed) return <Navigate to="/resultado" replace />;
  const question = questions[session.index];
  const selected = session.answers[question.id];
  const answered = questions.filter(
    (item) => session.answers[item.id] !== undefined,
  ).length;
  const last = session.index === questions.length - 1;
  return (
    <div className="quiz-container page-section">
      <div className="quiz-top">
        <Link className="back-link" to="/modos">
          ← Escolher outro modo
        </Link>
        <span className="mode-pill">{data.quizModes[session.modeId].name}</span>
      </div>
      <div className="quiz-progress">
        <div>
          <span>
            Pergunta <strong>{session.index + 1}</strong> de {questions.length}
          </span>
          <span>{answered} respondidas</span>
        </div>
        <ProgressBar
          value={answered}
          max={questions.length}
          label="Perguntas respondidas"
        />
      </div>
      <div
        className="question-focus"
        ref={card}
        tabIndex={-1}
        key={question.id}
      >
        <div className="question-meta">
          <span className="category-pill">
            {data.categories.find(
              (category) => category.id === question.category,
            )?.name ?? question.category}
          </span>
          {question.development && (
            <span className="development-label">Exemplo fictício</span>
          )}
        </div>
        <QuestionCard
          question={question}
          selected={selected}
          onChange={(optionId) => answer(question.id, optionId)}
        />
      </div>
      <div className="quiz-actions">
        <button
          className="button secondary"
          disabled={session.index === 0}
          onClick={() => go(session.index - 1)}
        >
          ← Anterior
        </button>
        <button
          className="button primary"
          disabled={selected === undefined}
          onClick={() => {
            if (last) {
              finish();
              navigate("/resultado");
            } else go(session.index + 1);
          }}
        >
          {last ? "Ver meu resultado" : "Próxima pergunta"}{" "}
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="center-note">
        Não existe resposta certa. Existe o que faz sentido para você.
      </p>
    </div>
  );
}
