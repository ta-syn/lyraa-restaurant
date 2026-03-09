"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT } from "../../lib/data";
import { IMAGE_PLACEHOLDERS } from "../../lib/imagePlaceholders";
import { FiArrowRight, FiX, FiInfo, FiCalendar, FiMessageCircle } from "react-icons/fi";

const getCategoryGradient = (category) => {
  switch (category) {
    case "Starters":
      return IMAGE_PLACEHOLDERS.menu.starters;
    case "Main Course":
      return IMAGE_PLACEHOLDERS.menu.mains;
    case "Desserts":
      return IMAGE_PLACEHOLDERS.menu.desserts;
    case "Drinks":
      return IMAGE_PLACEHOLDERS.menu.drinks;
    default:
      return "linear-gradient(135deg, #1A1A1A, #080808)";
  }
};

const MenuCard = ({ item, index, onOrder }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="card-luxury group overflow-hidden"
    >
      {/* IMAGE AREA */}
      <div className="relative h-[180px] md:h-[210px] overflow-hidden">
        {/* Placeholder Gradient */}
        <div 
          className="absolute inset-0 z-0 opacity-40" 
          style={{ background: getCategoryGradient(item.category) }}
        />
        
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10">
             <span className="font-display italic text-gold/20 text-3xl">{item.category}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-surface2 to-transparent z-20 opacity-60" />

        {/* BADGE */}
        {item.badge && (
          <div 
            className="absolute top-3 right-3 z-30 px-3 py-1 font-bold uppercase tracking-wider text-[9px]"
            style={{ 
              backgroundColor: item.badgeColor || "var(--gold)",
              color: item.badgeColor === "#D4A853" ? "#080808" : "#ffffff"
            }}
          >
            {item.badge}
          </div>
        )}

        {/* DIET INDICATORS */}
        <div className="absolute bottom-3 left-3 z-30 flex gap-2">
          {item.isVeg && (
            <span className="px-2 py-0.5 bg-green-900/80 text-green-400 text-[8px] font-bold border border-green-700/50 uppercase">
              Veg
            </span>
          )}
          {item.isSpicy && (
            <span className="px-2 py-0.5 bg-red-900/80 text-white text-[8px] font-bold border border-red-700/50 uppercase">
              🌶 Spicy
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h4 className="font-display text-[1.1rem] md:text-[1.2rem] text-cream font-semibold leading-tight line-clamp-1">
            {item.name}
          </h4>
          <span className="font-display text-[1.2rem] text-gold font-bold">
            {item.price}
          </span>
        </div>
        
        <p className="text-text-sub text-[12px] md:text-[13px] leading-relaxed line-clamp-2 h-[36px] md:h-[40px]">
          {item.description}
        </p>
        
        <div className="w-full h-[1px] bg-gold/10 mt-4 mb-4" />
        
        <div className="flex justify-between items-center">
           <span className="tag-category !mb-0 !py-1 !px-2 !text-[9px]">{item.category}</span>
          <button 
            onClick={() => onOrder(item)}
            className="flex items-center gap-2 font-accent italic text-[12px] text-gold group/btn hover:translate-x-1 transition-transform"
          >
            Order Now
            <FiArrowRight className="transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleScrollTo = (id) => {
    setSelectedItem(null);
    const elem = document.getElementById(id);
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
    <section id="menu" className="section-padding relative overflow-hidden">
      {/* Corner Candle Glow Blobs */}
      <div className="candle-glow top-0 left-[-100px] w-[500px] h-[500px] opacity-[0.4] animate-flicker" />
      <div className="candle-glow bottom-0 right-[-100px] w-[500px] h-[500px] opacity-[0.4] animate-flicker" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          {...revealVariants}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-label">Culinary Creations</span>
          <h2 className="section-heading">Our Menu</h2>
          <div className="divider-gold mx-auto" />
          <p className="text-text-sub mt-4 italic font-accent text-sm md:text-base">
            &quot;Each dish crafted with the finest seasonal ingredients and timeless technique&quot;
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="w-full flex justify-center">
            <div className="inline-flex bg-surface2 border border-gold/12 overflow-x-auto whitespace-nowrap no-scrollbar menu-tabs-scroll max-w-full">
              {MENU_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 md:px-7 py-3 font-accent text-[12px] md:text-sm tracking-widest uppercase italic transition-all duration-300 border-r border-gold/10 last:border-r-0 ${
                    activeCategory === category 
                      ? "bg-gradient-to-br from-gold to-gold-dark text-black font-bold" 
                      : "text-text-sub hover:text-gold hover:bg-gold/5"
                  }`}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} onOrder={setSelectedItem} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-accent italic text-text-sub text-sm mb-4">
            Looking for something specific? Ask our staff about our daily specials.
          </p>
          <div className="divider-gold w-12 mx-auto" />
        </motion.div>
      </div>

      {/* QUICK ORDER / INFO MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[900px] h-[90vh] md:h-[580px] bg-surface border border-gold/15 shadow-luxury grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-black/60 border border-gold/20 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
              >
                <FiX size={20} />
              </button>

              {/* Left Side: Image */}
              <div className="relative h-[50vh] md:h-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {/* Subtle bottom gradient for mobile price badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                
                {/* Price Badge on Image for Mobile */}
                <div className="absolute bottom-6 left-6 md:hidden">
                  <span className="font-display text-4xl text-gold font-bold">{selectedItem.price}</span>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-surface relative overflow-y-auto">
                <div className="mb-4 flex flex-wrap gap-3">
                  <span className="tag-category !mb-0">{selectedItem.category}</span>
                  {selectedItem.badge && (
                    <span className="px-3 py-1 bg-gold text-black text-[9px] font-bold uppercase tracking-widest leading-none">
                      {selectedItem.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-[2.2rem] md:text-5xl text-cream font-bold leading-tight mb-4">
                  {selectedItem.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="hidden md:block font-display text-3xl text-gold font-bold">{selectedItem.price}</span>
                  <div className="w-[1px] h-6 bg-gold/20 hidden md:block" />
                  <div className="flex gap-2">
                    {selectedItem.isVeg && <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest italic tracking-wider">🌿 Vegetarian</span>}
                    {selectedItem.isSpicy && <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest italic">🌶 Spicy</span>}
                  </div>
                </div>

                <p className="font-accent text-text-sub text-base md:text-lg leading-relaxed mb-10 italic">
                  &quot;{selectedItem.description}&quot;
                </p>

                <div className="space-y-4">
                  <p className="text-gold/60 text-[10px] uppercase font-bold tracking-[0.25em] mb-4 flex items-center gap-2">
                    <FiInfo className="text-gold" /> To enjoy this masterpiece:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleScrollTo("reservation")}
                      className="btn-gold py-4 text-[11px] flex items-center justify-center gap-2"
                    >
                      <FiCalendar /> Book a Table
                    </button>
                    <a 
                      href={`https://wa.me/${RESTAURANT.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-gold py-4 text-[11px] flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle /> WhatsApp Inquiry
                    </a>
                  </div>
                </div>
                
                <p className="mt-8 text-text-sub/40 text-[9px] uppercase tracking-widest text-center md:text-left">
                  * Seasonal availability may vary
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
