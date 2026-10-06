import ProgressBar from "./ProgressBar";
export default function CategoryResult({ name, result }) {
  return (
    <div className="category-result">
      <div>
        <span>{name}</span>
        <strong>{result.percentage.toLocaleString("pt-BR")}%</strong>
      </div>
      <ProgressBar
        value={result.percentage}
        label={`Compatibilidade em ${name}`}
      />
    </div>
  );
}
