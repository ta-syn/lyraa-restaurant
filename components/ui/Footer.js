"use client";

import { RESTAURANT } from "../../lib/data";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Menu", id: "menu" },
    { label: "Offers", id: "special" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
    { label: "Reserve", id: "reservation" }
  ];

  return (
    <footer className="bg-[#050505] border-t border-gold/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent blur-[2px]" />

      <div className="container relative z-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 md:py-20">
          
          {/* Col 1 — Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold gradient-gold tracking-widest mb-4">
              {RESTAURANT.name.toUpperCase()}
            </h2>
            <div className="w-12 h-px bg-gold/40 mb-4" />
            <p className="font-accent italic text-text-sub text-sm md:text-[15px] leading-relaxed mb-4 max-w-[280px]">
              {RESTAURANT.tagline}
            </p>
            <span className="text-[10px] text-gold uppercase tracking-[0.25em] font-bold">
              Est. {RESTAURANT.established}
            </span>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {[
                { icon: <FaInstagram />, href: RESTAURANT.social.instagram, label: "Instagram" },
                { icon: <FaFacebookF />, href: RESTAURANT.social.facebook, label: "Facebook" },
                { icon: <FaTwitter />, href: RESTAURANT.social.twitter, label: "Twitter" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gold/15 flex items-center justify-center text-gold hover:bg-gold/8 hover:scale-110 transition-all focus-visible:outline-gold"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="text-center sm:text-left">
            <h3 className="text-gold text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold mb-6 md:mb-8">
              Explore
            </h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="font-accent italic text-sm md:text-[15px] text-cream-dark hover:text-gold hover:translate-x-1 transition-all"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Opening Hours */}
          <div className="text-center sm:text-left">
            <h3 className="text-gold text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold mb-6 md:mb-8">
              Hours
            </h3>
            <div className="flex flex-col gap-4 max-w-[240px] mx-auto sm:mx-0">
              <div className="flex justify-between items-center text-[12px] md:text-[13px] font-accent italic">
                <span className="text-text-sub">Weekdays</span>
                <span className="text-gold">{RESTAURANT.openHours.weekdays}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] md:text-[13px] font-accent italic">
                <span className="text-text-sub">Weekends</span>
                <span className="text-gold">{RESTAURANT.openHours.weekends}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] md:text-[13px] font-accent italic">
                <span className="text-text-sub">Mondays</span>
                <span className="text-red-deep/80 font-bold uppercase tracking-[0.2em] text-[9px]">Closed</span>
              </div>
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-gold text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold mb-6 md:mb-8">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-[13px] md:text-sm text-text-sub font-accent italic">
              <p>{RESTAURANT.phone}</p>
              <p>{RESTAURANT.email}</p>
              <p className="not-italic font-body text-[11px] md:text-xs tracking-wider max-w-[200px] mx-auto sm:mx-0">{RESTAURANT.address}</p>
            </div>
            <button 
              onClick={() => handleNavClick("reservation")}
              className="btn-gold w-full max-w-[220px] mx-auto sm:mx-0 mt-8 py-3 text-[10px] md:text-xs"
            >
              Reserve Now
            </button>
          </div>
        </div>

        {/* Ornament Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent relative mb-1" />
        <div className="text-center text-gold/20 text-xs py-2 uppercase tracking-[0.5em] md:tracking-[1em]">◆ ◆ ◆</div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-6 text-center md:text-left">
          <p className="text-text-sub text-[10px] md:text-[12px] font-body tracking-wider order-2 md:order-1">
            © {currentYear} LYRAA. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-4 md:gap-6 order-1 md:order-2">
            <span className="text-gold font-accent italic text-[12px] md:text-sm cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <div className="w-[1px] h-3 bg-gold/10" />
            <span className="text-gold font-accent italic text-[12px] md:text-sm cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>

          <p className="font-accent italic text-text-sub text-[12px] md:text-[13px] tracking-wide order-3 text-center md:text-right">
            Developed with <span className="text-gold mx-1 animate-pulse">♥</span> by <span className="text-gold tracking-[0.1em] font-bold">Nishan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
