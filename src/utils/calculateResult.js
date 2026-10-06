export const NEUTRAL_OPTION = "neutral";

function optionScores(option, candidateIds) {
  const scores = new Map();
  for (const match of option?.matches ?? []) {
    if (
      candidateIds.has(match.candidateId) &&
      Number.isFinite(match.weight) &&
      match.weight > 0
    ) {
      scores.set(
        match.candidateId,
        (scores.get(match.candidateId) ?? 0) + match.weight,
      );
    }
  }
  return scores;
}

export function calculateResult(questions, answers, candidates) {
  const candidateIds = new Set(candidates.map((candidate) => candidate.id));
  const rows = candidates.map((candidate) => ({
    candidateId: candidate.id,
    score: 0,
    percentage: 0,
    categories: {},
  }));
  let maximum = 0;
  const categoryMaximums = {};
  for (const question of questions) {
    const weight =
      Number.isFinite(question.weight) && question.weight >= 0
        ? question.weight
        : 1;
    const possible = question.options.map((option) =>
      optionScores(option, candidateIds),
    );
    const ceiling =
      Math.max(0, ...possible.flatMap((scores) => [...scores.values()])) *
      weight;
    maximum += ceiling;
    categoryMaximums[question.category] =
      (categoryMaximums[question.category] ?? 0) + ceiling;
    const chosen = question.options.find(
      (option) => option.id === answers[question.id],
    );
    const scores =
      answers[question.id] === NEUTRAL_OPTION
        ? new Map()
        : optionScores(chosen, candidateIds);
    for (const row of rows) {
      const points = (scores.get(row.candidateId) ?? 0) * weight;
      row.score += points;
      row.categories[question.category] ??= { score: 0, percentage: 0 };
      row.categories[question.category].score += points;
    }
  }
  const percentage = (score, max) =>
    max > 0 ? Math.round((score / max) * 1000) / 10 : 0;
  for (const row of rows) {
    row.percentage = percentage(row.score, maximum);
    for (const [category, result] of Object.entries(row.categories)) {
      result.percentage = percentage(result.score, categoryMaximums[category]);
    }
  }
  return rows.sort((a, b) => b.score - a.score);
}
