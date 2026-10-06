import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { proposalUrl } from "../utils/proposalUrl";

export function CandidateAvatar({ candidate }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const name = candidate.displayName || candidate.name;
  return (
    <div className="candidate-avatar">
      {candidate.imageUrl && failedUrl !== candidate.imageUrl ? (
        <img
          src={candidate.imageUrl}
          alt={`Foto de ${name}`}
          onError={() => setFailedUrl(candidate.imageUrl)}
        />
      ) : (
        <span aria-label={`Foto indisponível de ${name}`}>
          {name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </span>
      )}
    </div>
  );
}

export default function CandidateResult({
  candidate,
  result,
  rank,
  featured,
  selected,
  onSelect,
}) {
  return (
    <article
      className={`candidate-card ${featured ? "featured" : ""} ${selected ? "candidate-selected" : ""}`}
      style={{
        "--candidate-color": /^#[0-9a-f]{3,8}$/i.test(candidate.color ?? "")
          ? candidate.color
          : "#718078",
      }}
    >
      <div className="candidate-rank">
        {rank}º{" "}
        <span>{featured ? "MAIOR COMPATIBILIDADE" : "COMPATIBILIDADE"}</span>
      </div>
      <CandidateAvatar candidate={candidate} />
      <h2>{candidate.displayName || candidate.name}</h2>
      <p className="candidate-party">
        {candidate.party}
        {candidate.partyNumber ? ` · ${candidate.partyNumber}` : ""}
      </p>
      <div className="candidate-percentage">
        {result.percentage.toLocaleString("pt-BR")}
        <span>%</span>
      </div>
      <ProgressBar value={result.percentage} />
      <button
        className="text-button"
        onClick={onSelect}
        aria-pressed={selected}
      >
        Ver compatibilidade por tema <span aria-hidden="true">↗</span>
      </button>
      {proposalUrl(null, candidate) && (
        <a
          className="candidate-proposal"
          href={proposalUrl(null, candidate)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ler propostas de ${candidate.displayName || candidate.name}`}
        >
          Ler propostas ↗
        </a>
      )}
    </article>
  );
}
