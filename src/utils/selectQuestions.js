import { shuffle } from "./shuffle.js";

export function selectQuestions(questions, mode, random = Math.random) {
  if (!mode || !Number.isInteger(mode.questionCount) || mode.questionCount <= 0)
    return [];
  const seen = new Set();
  const groups = new Map();
  for (const question of questions) {
    if (!mode.levels.includes(question.level) || seen.has(question.id))
      continue;
    seen.add(question.id);
    const group = groups.get(question.category) ?? [];
    group.push(question);
    groups.set(question.category, group);
  }
  for (const [category, group] of groups)
    groups.set(category, shuffle(group, random));
  const selected = [];
  while (groups.size && selected.length < mode.questionCount) {
    // Visit each remaining category once per round, with a new random order.
    for (const category of shuffle([...groups.keys()], random)) {
      selected.push(groups.get(category).pop());
      if (!groups.get(category).length) groups.delete(category);
      if (selected.length === mode.questionCount) break;
    }
  }
  return shuffle(selected, random);
}
