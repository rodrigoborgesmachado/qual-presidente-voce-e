import { NEUTRAL_OPTION } from "../utils/calculateResult";

export function AnswerOption({ option, selected, onChange, index }) {
  return (
    <label className={`answer-option ${selected ? "is-selected" : ""}`}>
      <input
        type="radio"
        name="answer"
        value={option.id}
        checked={selected}
        onChange={() => onChange(option.id)}
      />
      <span className="answer-letter" aria-hidden="true">
        {index === null ? "–" : String.fromCharCode(65 + index)}
      </span>
      <span>{option.text}</span>
      <span className="radio-indicator" aria-hidden="true" />
    </label>
  );
}

export default function QuestionCard({ question, selected, onChange }) {
  return (
    <fieldset className="question-card">
      <legend>{question.question}</legend>
      <p className="question-hint">
        Escolha a alternativa mais próxima do que você pensa.
      </p>
      <div className="answer-list">
        {question.options.map((option, index) => (
          <AnswerOption
            key={option.id}
            option={option}
            index={option.id === NEUTRAL_OPTION ? null : index}
            selected={selected === option.id}
            onChange={onChange}
          />
        ))}
      </div>
    </fieldset>
  );
}
