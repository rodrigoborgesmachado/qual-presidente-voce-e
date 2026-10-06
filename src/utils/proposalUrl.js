export function safeExternalUrl(url) {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}

export function proposalUrl(source, candidate) {
  return (
    safeExternalUrl(source?.propostaUrl) ||
    safeExternalUrl(source?.url) ||
    safeExternalUrl(candidate?.propostaUrl)
  );
}
