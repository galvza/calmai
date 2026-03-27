"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "lupai-banner-dismissed";

/** Banner de primeira visita — dismissível via localStorage */
export const FirstTimeBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="max-w-2xl mx-auto mb-8 bg-[#1A1A1A] border border-[#222] rounded-xl px-5 py-4 flex items-start gap-3"
        >
          <Search
            color="#C8FF3C"
            size={18}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0"
          />
          <p className="text-[13px] text-[#999] leading-relaxed flex-1">
            Descreva seu negócio ou nicho e o LupAI vai encontrar seus
            concorrentes, analisar o mercado e te dar recomendações
            estratégicas.
          </p>
          <button
            onClick={dismiss}
            className="text-[#555] hover:text-white transition-colors shrink-0"
            aria-label="Fechar banner"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
