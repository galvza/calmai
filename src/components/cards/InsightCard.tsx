/**
 * Card de insight editorial com destaque numérico e cor contextual.
 *
 * Componente presentacional puro: recebe título, valor, corpo e
 * sentimento (positivo/negativo) pra determinar a cor do valor.
 */

type InsightCardProps = {
  title: string;
  value: string;
  body: string;
  sentiment?: "positive" | "negative";
};

/** Card de insight com valor destacado e cor contextual. */
const InsightCard = ({ title, value, body, sentiment }: InsightCardProps) => {
  const valueColor =
    sentiment === "positive"
      ? "var(--accent-green)"
      : sentiment === "negative"
        ? "var(--accent-red)"
        : "var(--text-primary)";

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--text-tertiary)",
          marginBottom: "4px",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "20px",
          fontWeight: 500,
          marginBottom: "8px",
          color: valueColor,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
        }}
      >
        {body}
      </p>
    </div>
  );
};

export default InsightCard;
