"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RESTAURANT } from "../../lib/data";
import { IMAGE_PLACEHOLDERS } from "../../lib/imagePlaceholders";

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  const handleScroll = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 2.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen w-full bg-[#080808] overflow-hidden flex items-center justify-center">
      {/* BACKGROUND LAYERS */}
      
      {/* Layer 2: Hero Image or Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!imgError ? (
          <img 
            src="/images/hero-bg.png" 
            alt="Lyraa Interior"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover opacity-[0.35] scale-105"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center opacity-40"
            style={{ background: IMAGE_PLACEHOLDERS.hero }}
          >
             <span className="font-display italic text-gold/20 text-4xl tracking-widest">Fine Dining</span>
          </div>
        )}
      </div>

      {/* Layer 3: Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080808] via-transparent to-transparent h-[200px] bottom-0 w-full" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#080808]/50 to-transparent h-[200px] top-0 w-full" />
      <div className="absolute inset-x-0 inset-y-0 z-[1] bg-gradient-to-r from-[#080808] to-transparent w-full md:w-[400px] left-0 h-full opacity-60 pointer-events-none" />

      {/* Layer 4: Candle Glow Effects */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Blob 1: Gold */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.12, 0.08, 0.12]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gold blur-[100px] rounded-full animate-flicker"
        />
        {/* Blob 2: Deep Red */}
        <motion.div 
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.08, 0.05, 0.08]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-[180px] md:w-[350px] h-[180px] md:h-[350px] bg-[#8B0000] blur-[80px] rounded-full animate-flicker"
        />
      </div>

      {/* Layer 5: Dot Pattern */}
      <div className="absolute inset-0 z-[2] dot-pattern opacity-40 pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-24 pb-32 container text-center px-6">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center w-full"
        >
          {/* Small Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div className="hidden sm:block w-12 h-[1px] bg-gold/40"></div>
            <span className="font-accent italic text-[14px] md:text-[15px] text-gold tracking-[0.25em] uppercase px-4 text-center">
              Est. {RESTAURANT.established} · Fine Dining
            </span>
            <div className="hidden sm:block w-12 h-[1px] bg-gold/40"></div>
          </motion.div>

          {/* Restaurant Name */}
          <motion.h1 
            variants={itemVariants}
            className="font-display font-extrabold text-[clamp(3rem,14vw,10rem)] leading-none tracking-[0.15em] gradient-gold drop-shadow-[0_0_80px_rgba(212,168,83,0.3)] mb-4"
          >
            {RESTAURANT.name.toUpperCase()}
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants}
            className="font-accent italic text-[clamp(1.1rem,3vw,1.8rem)] text-cream-dark tracking-[0.08em] mb-6"
          >
            &quot;{RESTAURANT.tagline}&quot;
          </motion.p>

          {/* Divider */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 2.8, duration: 1, ease: "easeInOut" }}
            className="divider-gold h-[1px] !mb-8"
          />

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="font-accent text-[16px] md:text-[17px] text-text-sub max-w-[500px] leading-[1.8] mb-10"
          >
            {RESTAURANT.description}
          </motion.p>

          {/* Buttons Row */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-5 mt-4 w-full sm:w-auto px-4">
            <motion.button 
              whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(212,168,83,0.45)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScroll("reservation")}
              className="btn-gold px-12 py-4 w-full sm:w-auto"
              aria-label="Reserve a Table"
            >
              <span className="text-[10px]">◆</span>
              Reserve a Table
            </motion.button>
            <motion.button 
              whileHover={{ y: -3, backgroundColor: "rgba(212,168,83,0.06)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScroll("menu")}
              className="btn-outline-gold px-12 py-4 w-full sm:w-auto"
              aria-label="View Our Menu"
            >
              View Our Menu
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/50">Scroll to Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, 48, 48],
              height: [0, 48, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full bg-gold shadow-glow-gold-sm"
          />
        </div>
        <motion.span 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gold text-[10px]"
        >
          ▼
        </motion.span>
      </div>

      {/* AWARDS STRIP */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-gold/[0.06] border-t border-gold/12 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-10 px-10">
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              ⭐ Michelin Recommended
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🏆 Best Restaurant 2023
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              ✦ 15 International Awards
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🍽️ Best Fine Dining 2024
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🌍 Top 100 Worldwide
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🍷 Wine Spectator Award
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              ⭐ Forbes 5-Star Rating
            </span>
            <span className="text-gold/30">|</span>
            {/* Repeat for seamless loop */}
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              ⭐ Michelin Recommended
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🏆 Best Restaurant 2023
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              ✦ 15 International Awards
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🍽️ Best Fine Dining 2024
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🌍 Top 100 Worldwide
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              🍷 Wine Spectator Award
            </span>
            <span className="text-gold/30">|</span>
            <span className="font-accent italic text-gold text-[11px] md:text-sm flex items-center gap-2">
              ⭐ Forbes 5-Star Rating
            </span>
            <span className="text-gold/30">|</span>
          </div>
        </div>
      </div>
    </section>
  );
}
