/**
 * Wrapper de parágrafo narrativo com estilização editorial.
 *
 * Aplica tipografia serif de corpo de texto (16px, line-height 1.8)
 * com <strong> em cor primária pra destaques.
 */

/** Parágrafo narrativo estilizado pra corpo de texto editorial. */
const NarrativeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="narrative-text"
      style={{
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </div>
  );
};

export default NarrativeText;
