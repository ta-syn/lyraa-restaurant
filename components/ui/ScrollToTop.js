"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 24px rgba(212,168,83,0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 md:right-10 z-[200] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-black shadow-[0_4px_20px_rgba(212,168,83,0.35)] border border-gold/40 group"
        >
          {/* Ping animation ring */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-20 animate-ping" />
          <FiChevronUp
            size={22}
            className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 font-bold stroke-[3]"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
