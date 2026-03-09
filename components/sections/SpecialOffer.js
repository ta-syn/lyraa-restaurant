"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPECIAL_OFFER } from "../../lib/data";
import { IMAGE_PLACEHOLDERS } from "../../lib/imagePlaceholders";
import { FaStar } from "react-icons/fa";

const CountdownBox = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-surface3 border border-gold/15 p-3 md:p-6 min-w-[60px] md:min-w-[90px] text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="block font-display text-2xl md:text-4xl text-gold font-bold"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[8px] md:text-[10px] tracking-[0.15em] text-text-sub mt-2 uppercase">
        {label}
      </span>
    </div>
  );
};

export default function SpecialOffer() {
  const [imgError, setImgError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const end = new Date(SPECIAL_OFFER.endDate);
      const now = new Date();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft((prev) => ({ ...prev, isEnded: true }));
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
          isEnded: false,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReserve = () => {
    const elem = document.getElementById("reservation");
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const revealVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section 
      id="special" 
      className="section-padding relative overflow-hidden bg-gradient-to-br from-[#0F0B07] via-[#080808] to-[#0F0B07]"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold opacity-[0.08] blur-[100px] rounded-full pointer-events-none animate-flicker" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B0000] opacity-[0.06] blur-[80px] rounded-full pointer-events-none animate-flicker" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[55%_45%] gap-12 md:gap-20 items-center">
          
          {/* IMAGE (Mobile First) */}
          <motion.div
            {...revealVariants}
            className="relative h-[300px] md:h-[520px] w-full order-1 lg:order-2"
          >
            {/* Gold Frame Decoration */}
            <div className="absolute -inset-4 border border-gold/20 pointer-events-none hidden md:block" />
            
            {/* Corner Ornaments */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold z-20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold z-20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold z-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold z-20" />

            {/* Main Image */}
            <div className="w-full h-full overflow-hidden relative shadow-luxury">
              {!imgError ? (
                <img 
                  src="/images/special-offer.png" 
                  alt="Special Offer" 
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: IMAGE_PLACEHOLDERS.specialOffer }}
                >
                   <span className="font-display italic text-gold/20 text-3xl">Special Offer</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Review Badge */}
            <div className="absolute bottom-[-10px] left-[-10px] md:bottom-[-20px] md:left-[-20px] glass-luxury p-3 md:p-6 shadow-luxury flex items-center gap-4 z-20">
              <span className="font-display text-2xl md:text-4xl text-gold font-bold leading-none">5.0</span>
              <div className="flex flex-col">
                <div className="flex text-gold text-[8px] md:text-xs gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <span className="text-[8px] md:text-[10px] text-text-sub uppercase tracking-[0.1em] whitespace-nowrap">
                  From 200+ reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* OFFER CONTENT */}
          <motion.div
            {...revealVariants}
            className="order-2 lg:order-1"
          >
            {/* Top Badge */}
            <motion.div
              animate={{ 
                borderTopColor: ["rgba(212,168,83,0.3)", "rgba(212,168,83,0.6)", "rgba(212,168,83,0.3)"],
                borderBottomColor: ["rgba(212,168,83,0.3)", "rgba(212,168,83,0.6)", "rgba(212,168,83,0.3)"],
                borderLeftColor: ["rgba(212,168,83,0.3)", "rgba(212,168,83,0.6)", "rgba(212,168,83,0.3)"],
                borderRightColor: ["rgba(212,168,83,0.3)", "rgba(212,168,83,0.6)", "rgba(212,168,83,0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block bg-gold/10 border border-gold/30 px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] text-gold uppercase"
            >
              Limited Time Offer
            </motion.div>

            <div className="mt-4">
              <span className="section-label">Chef&apos;s Special</span>
              <h2 className="section-heading mt-2">{SPECIAL_OFFER.title}</h2>
              <div className="inline-block bg-gradient-to-r from-gold to-gold-dark text-black font-bold text-lg md:text-2xl px-5 py-2 mt-4 shadow-glow-gold-sm">
                {SPECIAL_OFFER.discount}
              </div>
            </div>

            <p className="text-text-sub text-base md:text-lg leading-relaxed mt-6 max-w-[480px]">
              {SPECIAL_OFFER.description}
            </p>

            {/* Includes List */}
            <div className="mt-8">
              <span className="text-gold text-xs md:text-sm font-bold uppercase tracking-widest block mb-4">
                What&apos;s Included:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {SPECIAL_OFFER.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-gold text-[10px]">◆</span>
                    <span className="font-body text-xs md:text-sm text-cream-dark tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Row */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-text-sub text-lg md:text-xl line-through decoration-red-deep/40">
                  {SPECIAL_OFFER.originalPrice}
                </span>
                <span className="text-[10px] text-text-sub/60 uppercase tracking-tighter">Original</span>
              </div>
              <span className="text-gold text-2xl">→</span>
              <div className="flex flex-col">
                <span className="font-display text-3xl md:text-5xl text-gold font-bold">
                  {SPECIAL_OFFER.offerPrice}
                </span>
                <span className="text-[10px] text-text-sub uppercase tracking-widest text-right">per person</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mt-10">
              <p className="font-accent italic text-gold text-base md:text-lg mb-4">
                {timeLeft.isEnded ? "Offer has ended" : "Offer Ends In:"}
              </p>
              {!timeLeft.isEnded && (
                <div className="flex items-center gap-3 md:gap-4">
                  <CountdownBox value={timeLeft.days} label="Days" />
                  <span className="font-display text-xl md:text-2xl text-gold pt-2 md:pt-4">:</span>
                  <CountdownBox value={timeLeft.hours} label="Hours" />
                  <span className="font-display text-xl md:text-2xl text-gold pt-2 md:pt-4">:</span>
                  <CountdownBox value={timeLeft.minutes} label="Mins" />
                  <span className="font-display text-xl md:text-2xl text-gold pt-2 md:pt-4">:</span>
                  <CountdownBox value={timeLeft.seconds} label="Secs" />
                </div>
              )}
            </div>

            {/* Reserve Button */}
            <div className="mt-12">
              <button 
                onClick={handleReserve}
                className="btn-gold w-full sm:w-auto px-12 py-5 text-[12px] md:text-sm"
              >
                <span className="text-[10px]">◆</span>
                Reserve This Experience
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
