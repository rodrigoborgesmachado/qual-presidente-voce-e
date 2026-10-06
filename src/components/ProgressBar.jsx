export default function ProgressBar({
  value,
  max = 100,
  label = "Compatibilidade",
}) {
  const percentage =
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <span style={{ width: `${percentage}%` }} />
    </div>
  );
}
