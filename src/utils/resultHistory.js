import { calculateResult } from "./calculateResult.js";

export const HISTORY_KEY = "qual-presidente-resultados-v1";

export function loadHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem(HISTORY_KEY));
    const records =
      stored?.version === 1 && Array.isArray(stored.results)
        ? stored.results.filter(
            (record) =>
              typeof record?.id === "string" &&
              Number.isFinite(Date.parse(record.completedAt)) &&
              typeof record.modeName === "string" &&
              Number.isInteger(record.answerCount) &&
              Array.isArray(record.categories) &&
              record.categories.every(
                (category) =>
                  typeof category?.id === "string" &&
                  typeof category.name === "string",
              ) &&
              Array.isArray(record.ranking) &&
              record.ranking.every(
                (row) =>
                  typeof row?.candidate?.id === "string" &&
                  typeof row.candidate.name === "string" &&
                  Number.isFinite(row.score) &&
                  Number.isFinite(row.percentage) &&
                  row.categories &&
                  Object.values(row.categories).every(
                    (category) =>
                      Number.isFinite(category?.score) &&
                      Number.isFinite(category.percentage),
                  ),
              ),
          )
        : [];
    return {
      records: records.sort(
        (a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt),
      ),
      unavailable: false,
    };
  } catch (error) {
    return { records: [], unavailable: error.name !== "SyntaxError" };
  }
}

export function writeHistory(records) {
  if (!records.length) localStorage.removeItem(HISTORY_KEY);
  else
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify({ version: 1, results: records }),
    );
}

export function createHistoryRecord(data, session, questions) {
  const ranking = calculateResult(questions, session.answers, data.candidates);
  return {
    id: session.id,
    completedAt: session.completedAt,
    quizVersion: data.version,
    electionYear: data.election.year,
    modeName: data.quizModes[session.modeId].name,
    answerCount: questions.filter(
      (question) => session.answers[question.id] !== undefined,
    ).length,
    categories: data.categories.map(({ id, name }) => ({ id, name })),
    ranking: ranking.map((result) => {
      const candidate = data.candidates.find(
        (candidate) => candidate.id === result.candidateId,
      );
      const {
        id,
        name,
        displayName,
        party,
        partyNumber,
        imageUrl,
        color,
        propostaUrl,
      } = candidate;
      return {
        ...result,
        candidate: {
          id,
          name,
          displayName,
          party,
          partyNumber,
          imageUrl,
          color,
          propostaUrl,
        },
      };
    }),
  };
}
