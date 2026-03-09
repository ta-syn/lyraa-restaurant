"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { RESTAURANT, STATS, CHEF } from "../../lib/data";
import { IMAGE_PLACEHOLDERS } from "../../lib/imagePlaceholders";

const StatItem = ({ number, suffix, label, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(number);
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <div 
      ref={ref}
      className={`text-center px-4 py-6 md:py-0 border-gold/10 ${
        index % 2 === 0 ? "border-r" : ""
      } md:border-r last:border-r-0`}
    >
      <div className="font-display text-[2.2rem] md:text-[3.5rem] gradient-gold leading-none mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent italic text-[12px] md:text-sm text-text-sub tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default function About() {
  const [imgErrorRes, setImgErrorRes] = useState(false);
  const [imgErrorChef, setImgErrorChef] = useState(false);

  const revealVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-[0.05] pointer-events-none" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          {...revealVariants}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="section-label">Our Story</span>
          <h2 className="section-heading mb-6">A Legacy of Culinary Excellence</h2>
          <div className="divider-gold mx-auto" />
          <p className="font-accent text-base md:text-lg text-text-sub leading-relaxed mt-6">
            {RESTAURANT.description}
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full bg-surface2 border-y border-gold/10 py-6 md:py-12 mb-16 md:mb-20 grid grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat, index) => (
            <StatItem key={index} {...stat} index={index} />
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-20">
          
          {/* Left Column: Image */}
          <motion.div
            {...revealVariants}
            className="relative"
          >
            {/* Gold Frame Effect */}
            <div className="absolute -inset-3 border border-gold/25 pointer-events-none hidden md:block"></div>
            
            <div className="relative h-[320px] md:h-[500px] overflow-hidden group">
              {!imgErrorRes ? (
                <img 
                  src="/images/about-restaurant.png" 
                  alt="Restaurant Atmosphere" 
                  onError={() => setImgErrorRes(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: IMAGE_PLACEHOLDERS.restaurant }}
                >
                  <span className="font-display italic text-gold/20 text-3xl">Restaurant</span>
                </div>
              )}
              
              {/* Year Badge */}
              <div className="absolute bottom-[-10px] left-[-10px] md:bottom-[-20px] md:left-[-20px] bg-gradient-to-br from-gold to-gold-dark px-5 py-4 md:px-7 md:py-6 shadow-luxury z-10">
                <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-[#080808]/70 font-bold mb-1">Est.</span>
                <span className="block font-display text-2xl md:text-4xl font-bold text-[#080808] leading-none">
                  {RESTAURANT.established}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            {...revealVariants}
          >
            <div className="flex flex-col">
              <span className="section-label">Meet the Mastermind</span>
              <h3 className="font-display text-[2rem] md:text-[2.5rem] text-cream font-bold leading-tight mb-2">
                {CHEF.name}
              </h3>
              <p className="font-accent italic text-gold text-base mb-6 tracking-wide">
                {CHEF.title}
              </p>
              
              <div className="w-16 h-[1px] bg-gold/40 mb-8" />
              
              <p className="font-accent text-text-sub text-sm md:text-base leading-[1.9] mb-8">
                {CHEF.bio}
              </p>

              {/* Awards Row */}
              <div className="flex flex-col gap-4 mb-10">
                {CHEF.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-gold text-[10px]">◆</span>
                    <span className="font-accent text-xs md:text-sm text-text-mid tracking-wide italic">
                      {award}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chef Image Strip */}
              <div className="relative w-full h-64 md:h-72 overflow-hidden border-l-[3px] border-gold">
                {!imgErrorChef ? (
                  <img 
                    src="/images/about-chef.png" 
                    alt={CHEF.name}
                    onError={() => setImgErrorChef(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: IMAGE_PLACEHOLDERS.chef }}
                  >
                    <span className="font-display text-gold/20 text-xl tracking-widest">{CHEF.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Quote */}
        <motion.div
          {...revealVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-surface2 border-l-[4px] border-gold p-8 md:p-14 md:px-16 shadow-luxury relative overflow-hidden">
            <div className="absolute top-[-20px] right-10 md:right-20 text-[60px] md:text-[100px] text-gold/5 font-display italic">&quot;</div>
            <p className="font-accent italic text-[1.1rem] md:text-[1.4rem] text-cream leading-relaxed mb-6">
              &quot;Great cooking is not about ingredients alone — it&apos;s about passion, precision, and the love you pour into every single plate.&quot;
            </p>
            <cite className="font-accent text-gold text-base md:text-lg not-italic">
              — {CHEF.name}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
