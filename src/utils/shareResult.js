export async function shareResult({
  projectName,
  projectUrl,
  topResults,
  answerCount,
  modeName,
  tied = false,
}) {
  const title = projectName || "Qual Presidente é Você?";
  const url = projectUrl?.trim() || window.location.origin;
  const ranking = topResults
    .slice(0, 3)
    .map(
      (result, index) =>
        `${index + 1}. ${result.candidateName} — ${result.percentage.toLocaleString("pt-BR")}% de compatibilidade`,
    )
    .join("\n");
  const hasAffinity = topResults.some((result) => result.percentage > 0);
  const summary = `Respondi ${answerCount} ${answerCount === 1 ? "pergunta" : "perguntas"}${modeName ? ` no modo ${modeName}` : ""} para comparar minhas opiniões com as propostas dos candidatos.`;
  const note = !hasAffinity
    ? "Nenhuma afinidade foi identificada nesta sessão."
    : tied
      ? "Houve empate na maior compatibilidade."
      : "";
  const text = `Fiz o teste "${title}"!\n\n${summary}\n\n${hasAffinity ? "Minhas maiores afinidades:" : "Resultado da comparação:"}\n${ranking}${note ? `\n\n${note}` : ""}\n\nCompatibilidade com propostas, não recomendação de voto.\n\nE você, com quais propostas tem mais afinidade? Faça o teste:`;
  const shareData = { title, text, url };

  if (typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (error) {
      if (error.name === "AbortError") return "cancelled";
      // Real sharing failures use the same clipboard fallback as desktop.
    }
  }

  await navigator.clipboard.writeText(`${text}\n${url}`);
  return "copied";
}
