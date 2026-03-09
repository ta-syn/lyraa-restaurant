"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Offers", href: "#special" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Reservation", href: "#reservation" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Active Section with IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -75% 0px", // Professional Top-Heavy detection
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    
    if (elem) {
      setMobileOpen(false);
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-all duration-400 ease-in-out ${
        scrolled
          ? "bg-[#080808]/92 backdrop-blur-[28px] border-bottom border-gold/12 shadow-luxury"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* LEFT - Logo */}
        <div 
          className="cursor-pointer group flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          tabIndex="0"
          role="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img 
            src="/favicon.svg" 
            alt="Lyraa Logo" 
            className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* CENTER - Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-accent text-sm tracking-[0.12em] uppercase transition-all duration-300 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  activeSection === link.href.replace("#", "")
                    ? "text-gold"
                    : "text-text-mid hover:text-gold"
                }`}
              >
                {link.name}
                {/* Active Indicator Dot */}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-glow-gold-sm"></span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT - Reserve Button (Desktop Only) */}
        <div className="hidden lg:block">
          <button 
            onClick={(e) => handleNavClick(e, "#reservation")}
            className="btn-gold px-8 py-3 text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="text-[10px]">◆</span>
            Reserve a Table
          </button>
        </div>

        {/* HAMBURGER (Mobile) */}
        <button
          className="lg:hidden text-gold z-[60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <HiX className="w-8 h-8" />
          ) : (
            <HiOutlineMenuAlt4 className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#080808]/98 backdrop-blur-2xl z-50 flex flex-col items-center justify-center lg:hidden"
          >
            <ul className="flex flex-col items-center gap-8 mb-12">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-display text-4xl italic text-text-main hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="w-full px-8"
            >
              <button
                onClick={(e) => handleNavClick(e, "#reservation")}
                className="btn-gold w-full text-sm py-5"
              >
                <span className="text-[10px]">◆</span>
                Reserve a Table
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
