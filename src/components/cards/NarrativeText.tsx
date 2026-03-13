/**
 * Wrapper de parágrafo narrativo com estilização editorial.
 *
 * Aplica tipografia de corpo de texto (15px, line-height 1.7)
 * com <strong> em cor primária pra destaques.
 */

/** Parágrafo narrativo estilizado pra corpo de texto editorial. */
const NarrativeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="narrative-text"
      style={{
        fontSize: "15px",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </div>
  );
};

export default NarrativeText;
