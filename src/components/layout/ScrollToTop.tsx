/**
 * Botão flutuante "voltar ao topo".
 *
 * Aparece no canto inferior direito quando o scroll passa de 500px.
 * Scroll suave até o topo ao clicar.
 */

"use client";

import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="font-ui"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1px solid var(--border)",
        background: "white",
        fontSize: "16px",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        zIndex: 50,
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
