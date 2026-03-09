"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "../../lib/data";
import { FiChevronLeft, FiChevronRight, FiMessageCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 8000); // Increased to 8s for better readability
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Variants for the testimonial card slide
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "50%" : "-50%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-50%" : "50%",
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 }
      }
    })
  };

  const revealVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const testimonial = TESTIMONIALS[currentIndex];

  // Logic for swipe gesture
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 pointer-events-none select-none font-display text-[150px] md:text-[300px] leading-none text-gold/[0.04] z-0">
        ❝
      </div>

      <div className="container relative z-10">
        {/* SECTION HEADER */}
        <motion.div 
          {...revealVariants}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="section-label">Guest Experiences</span>
          <h2 className="section-heading">What Our Guests Say</h2>
          <div className="divider-gold mx-auto" />
        </motion.div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative max-w-[1000px] mx-auto px-4 sm:px-12">
          
          {/* ARROWS (Desktop Only) */}
          <button
            onClick={() => { handlePrev(); stopTimer(); }}
            className="hidden lg:flex absolute left-[-20px] xl:left-[-60px] top-[45%] -translate-y-1/2 w-14 h-14 items-center justify-center border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all rounded-full z-20 group"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => { handleNext(); stopTimer(); }}
            className="hidden lg:flex absolute right-[-20px] xl:right-[-60px] top-[45%] -translate-y-1/2 w-14 h-14 items-center justify-center border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all rounded-full z-20 group"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* TESTIMONIAL CARD AREA */}
          <div className="relative min-h-[500px] md:min-h-[420px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev();
                  }
                }}
                className="card-luxury p-8 md:p-14 lg:p-16 border-t-[4px] border-t-gold rounded-none relative w-full cursor-grab active:cursor-grabbing bg-surface2/50 backdrop-blur-sm"
              >
                {/* Decorative Quote Mark */}
                <span className="absolute top-[-20px] left-6 md:top-[-30px] md:left-10 font-display text-[100px] md:text-[140px] leading-none text-gold/15 select-none pointer-events-none">
                  ❝
                </span>

                {/* Content Wrapper */}
                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex gap-1.5 mb-8 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-gold text-sm md:text-base animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="font-display italic text-lg md:text-2xl lg:text-[1.75rem] text-cream leading-[1.6] mb-10 text-center md:text-left">
                    <span className="text-gold/40 mr-1">&quot;</span>
                    {testimonial.text}
                    <span className="text-gold/40 ml-1">&quot;</span>
                  </blockquote>

                  {/* Reviewer Info */}
                  <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gold/10 gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                      {/* Avatar with dynamic contrast logic */}
                      <div 
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-display text-xl md:text-2xl font-bold border-2 border-gold/20 shadow-luxury"
                        style={{ 
                          backgroundColor: testimonial.avatarBg, 
                          color: "#FFF" // Ensuring high contrast on brand colors
                        }}
                      >
                        {testimonial.avatar}
                      </div>
                      
                      <div>
                        <h4 className="font-display text-lg md:text-xl text-cream font-semibold tracking-wide mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="font-accent italic text-gold text-sm md:text-base tracking-wider opacity-90">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="hidden lg:block text-gold/20 mr-4">
                      <FiMessageCircle size={40} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DOT INDICATORS */}
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentIndex 
                    ? "w-12 bg-gradient-to-r from-gold to-gold-dark shadow-[0_0_10px_rgba(212,168,83,0.3)]" 
                    : "w-4 bg-gold/15 hover:bg-gold/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM BRAND QUOTE */}
        <motion.div 
          {...revealVariants}
          className="mt-20 text-center flex flex-col items-center"
        >
          <div className="w-16 h-px bg-gold/20 mb-8" />
          <p className="font-accent italic text-xl md:text-2xl text-text-sub max-w-[700px] mb-6 leading-relaxed">
            &quot;Lyraa is not just a meal; it is an intimate conversation between the earth&apos;s finest bounty and our culinary legacy.&quot;
          </p>
          <div className="flex flex-col items-center">
             <span className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-2">
              — Marco Rosetti
            </span>
            <span className="text-text-sub/50 text-[10px] uppercase tracking-widest">Executive Chef & Founder</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
