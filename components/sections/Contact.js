"use client";

import { motion } from "framer-motion";
import { RESTAURANT } from "../../lib/data";
import { FiMapPin, FiPhone, FiMail, FiMap } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const revealVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        {/* SECTION HEADER */}
        <motion.div 
          {...revealVariants}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="section-label">Find Us</span>
          <h2 className="section-heading">Visit Lyraa</h2>
          <div className="divider-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Column 1 — Address & Hours */}
          <motion.div
            {...revealVariants}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gold/8 border border-gold/15 transition-colors group">
                <FiMapPin className="text-gold group-hover:scale-110 transition-transform" size={24} />
              </div>
              <div>
                <span className="text-gold text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-bold block">
                  Our Location
                </span>
                <address className="not-italic font-display italic text-cream text-base md:text-[1.1rem] leading-relaxed mt-1">
                  {RESTAURANT.address}
                </address>
              </div>
            </div>
            
            <a 
              href={`https://maps.google.com/?q=${RESTAURANT.address}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-accent italic text-gold text-sm hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-2"
            >
              Get Directions →
            </a>

            <div className="w-16 h-[1px] bg-gold/30 my-8" />

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px] md:text-sm font-accent italic">
                <span className="text-cream-dark">Weekdays:</span>
                <span className="text-gold">{RESTAURANT.openHours.weekdays}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] md:text-sm font-accent italic">
                <span className="text-cream-dark">Weekends:</span>
                <span className="text-gold">{RESTAURANT.openHours.weekends}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] md:text-sm font-accent italic">
                <span className="text-cream-dark">Mondays:</span>
                <span className="text-red-deep/80 font-bold uppercase tracking-[0.2em] text-[10px]">Closed</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2 — Contact Info */}
          <motion.div
            {...revealVariants}
            transition={{ ...revealVariants.transition, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-5 md:gap-6">
              {/* Phone */}
              <a 
                href={`tel:${RESTAURANT.phone}`}
                className="flex items-center gap-4 group hover:translate-x-1 transition-all"
                aria-label="Call us"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-gold/8 border border-gold/15 group-hover:border-gold/40 transition-colors">
                  <FiPhone className="text-gold text-lg md:text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gold/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Call Us</span>
                  <span className="text-cream text-sm md:text-base font-medium tracking-wide">{RESTAURANT.phone}</span>
                </div>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${RESTAURANT.email}`}
                className="flex items-center gap-4 group hover:translate-x-1 transition-all"
                aria-label="Email us"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-gold/8 border border-gold/15 group-hover:border-gold/40 transition-colors">
                  <FiMail className="text-gold text-lg md:text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gold/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Email Us</span>
                  <span className="text-cream text-sm md:text-base font-medium tracking-wide">{RESTAURANT.email}</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href={`https://wa.me/${RESTAURANT.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:translate-x-1 transition-all"
                aria-label="WhatsApp chat"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-gold/8 border border-gold/15 group-hover:border-green-500/40 transition-colors">
                  <FaWhatsapp className="text-gold group-hover:text-green-500 transition-colors text-lg md:text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gold/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1">WhatsApp</span>
                  <span className="text-cream text-sm md:text-base font-medium tracking-wide">Live Chat Support</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Column 3 — Embedded Map Placeholder */}
          <motion.div
            {...revealVariants}
            transition={{ ...revealVariants.transition, delay: 0.2 }}
            className="w-full h-[250px] md:h-[280px] bg-surface3 border border-gold/12 flex flex-col items-center justify-center p-6 md:p-8 text-center relative group"
          >
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FiMap size={40} className="text-gold/40 mb-4 md:size-[48px]" />
            <h4 className="font-display italic text-cream text-base md:text-lg mb-6">Find us on Google Maps</h4>
            <a 
              href={`https://maps.google.com/?q=${RESTAURANT.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-3 text-[10px] md:text-xs"
            >
              Open in Maps
            </a>
          </motion.div>
        </div>

        {/* NEWSLETTER SECTION */}
        <motion.div
          {...revealVariants}
          className="mt-16 md:mt-24 card-luxury p-7 md:p-12 relative overflow-hidden border-t-[3px] border-t-gold"
        >
          <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gold opacity-[0.05] blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-4xl text-cream leading-tight mb-4">
                Stay Updated
              </h3>
              <p className="text-text-sub font-accent italic text-sm md:text-lg">
                Be the first to know about our seasonal menus and exclusive events
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 bg-white/[0.03] border border-gold/15 p-4 text-cream font-body text-sm outline-none transition-all placeholder:text-text-sub focus:border-gold/50"
                required
                aria-label="Email for newsletter"
              />
              <button 
                type="submit"
                className="btn-gold whitespace-nowrap px-10 py-4 sm:py-0 text-xs md:text-sm"
              >
                Subscribe ◆
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
