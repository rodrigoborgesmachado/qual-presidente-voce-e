import { createContext, useContext, useState, useEffect } from "react";
import data from "../data/quiz.json";
import { selectQuestions } from "../utils/selectQuestions";
import { NEUTRAL_OPTION } from "../utils/calculateResult";
import {
  HISTORY_KEY,
  createHistoryRecord,
  loadHistory,
  writeHistory,
} from "../utils/resultHistory";

const KEY = "qual-presidente-quiz-v1";
const QuizContext = createContext(null);

function restore() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(KEY));
    if (
      !stored ||
      stored.version !== data.version ||
      !data.quizModes[stored.modeId] ||
      !Array.isArray(stored.questionIds) ||
      !stored.questionIds.length
    )
      return null;
    const questions = stored.questionIds.map((id) =>
      data.questions.find((question) => question.id === id),
    );
    if (
      questions.some((question) => !question) ||
      new Set(stored.questionIds).size !== questions.length
    )
      return null;
    if (
      !Number.isInteger(stored.index) ||
      stored.index < 0 ||
      stored.index >= questions.length ||
      !stored.answers ||
      typeof stored.answers !== "object"
    )
      return null;
    for (const question of questions) {
      // Preserve answers saved before neutral options came exclusively from JSON.
      if (stored.answers[question.id] === "__neutral__") {
        stored.answers[question.id] = NEUTRAL_OPTION;
      }
      const answer = stored.answers[question.id];
      if (
        answer !== undefined &&
        !question.options.some((option) => option.id === answer)
      )
        return null;
    }
    if (
      stored.completed &&
      questions.some((question) => stored.answers[question.id] === undefined)
    )
      return null;
    stored.id ??= crypto.randomUUID();
    return stored;
  } catch {
    return null;
  }
}

export function QuizProvider({ children }) {
  const [session, setSession] = useState(restore);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [historyState, setHistoryState] = useState(loadHistory);
  function save(next) {
    setSession(next);
    try {
      if (next) sessionStorage.setItem(KEY, JSON.stringify(next));
      else sessionStorage.removeItem(KEY);
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
  }
  function start(modeId) {
    const questions = selectQuestions(data.questions, data.quizModes[modeId]);
    if (!questions.length) return false;
    save({
      id: crypto.randomUUID(),
      version: data.version,
      modeId,
      questionIds: questions.map((question) => question.id),
      answers: {},
      index: 0,
      completed: false,
    });
    return true;
  }
  const questions =
    session?.questionIds.map((id) =>
      data.questions.find((question) => question.id === id),
    ) ?? [];
  useEffect(() => {
    if (!session?.completed || session.historySaved) return;
    const completed = {
      ...session,
      completedAt: session.completedAt || new Date().toISOString(),
      historySaved: true,
    };
    const record = createHistoryRecord(data, completed, questions);
    const current = loadHistory();
    const records = [
      record,
      ...current.records.filter((item) => item.id !== record.id),
    ];
    let unavailable = false;
    try {
      writeHistory(records);
    } catch {
      unavailable = true;
    }
    setHistoryState({ records, unavailable });
    save(completed);
  }, [session]);

  useEffect(() => {
    const refresh = (event) => {
      if (event.key === HISTORY_KEY || event.key === null)
        setHistoryState(loadHistory());
    };
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  function removeHistory(id) {
    const records = id
      ? historyState.records.filter((record) => record.id !== id)
      : [];
    try {
      writeHistory(records);
      setHistoryState({ records, unavailable: false });
      return true;
    } catch {
      setHistoryState({ ...historyState, unavailable: true });
      return false;
    }
  }
  return (
    <QuizContext.Provider
      value={{
        data,
        session,
        questions,
        storageUnavailable,
        history: historyState.records,
        historyUnavailable: historyState.unavailable,
        removeHistory,
        start,
        reset: () => save(null),
        answer: (id, optionId) =>
          save({ ...session, answers: { ...session.answers, [id]: optionId } }),
        go: (index) => save({ ...session, index }),
        finish: () =>
          save({
            ...session,
            completed: true,
            completedAt: new Date().toISOString(),
          }),
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
