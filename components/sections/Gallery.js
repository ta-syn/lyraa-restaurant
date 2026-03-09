"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY } from "../../lib/data";
import { IMAGE_PLACEHOLDERS } from "../../lib/imagePlaceholders";
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    // eslint-disable-next-line
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // eslint-disable-next-line
    document.body.style.overflow = "unset";
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % GALLERY.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length);
  };

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxIndex]);

  const revealVariants = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-label">Visual Journey</span>
          <h2 className="section-heading">Gallery</h2>
          <div className="divider-gold mx-auto" />
          <p className="text-text-sub mt-4 italic font-accent text-sm md:text-base">
            &quot;A glimpse into our world of flavors, ambiance, and culinary artistry&quot;
          </p>
        </motion.div>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] md:auto-rows-[220px] gap-2 md:gap-4">
          {GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              {...revealVariants}
              transition={{ ...revealVariants.transition, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden cursor-pointer bg-surface3 group border border-transparent transition-colors duration-300 hover:border-gold/30 ${
                item.span === "large" ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              {!imgErrors[item.id] ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  onError={() => handleImgError(item.id)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: IMAGE_PLACEHOLDERS.gallery[index % 8] }}
                >
                  <span className="text-gold/20 font-display italic">Lyraa</span>
                </div>
              )}
              
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6">
                <div className="relative z-10">
                  <p className="font-display italic text-cream text-[10px] md:text-base leading-tight">
                    {item.alt}
                  </p>
                  <div className="w-6 md:w-8 h-[1px] bg-gold mt-2"></div>
                </div>
                
                {/* ZOOM ICON */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <FiZoomIn className="text-white text-xl md:text-3xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-14 text-center">
          <p className="font-accent italic text-text-sub text-sm">
            Follow us on Instagram for daily culinary inspiration{" "}
            <a href="#" className="text-gold hover:underline">@lyraa_restaurant</a>
          </p>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md px-4"
            onClick={closeLightbox}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-[110]"
              aria-label="Close lightbox"
            >
              <FiX size={20} />
            </button>

            {/* PREV ARROW */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gold/15 border border-gold/30 text-gold flex items-center justify-center hover:bg-gold/30 transition-all z-[110]"
              aria-label="Previous image"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* NEXT ARROW */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gold/15 border border-gold/30 text-gold flex items-center justify-center hover:bg-gold/30 transition-all z-[110]"
              aria-label="Next image"
            >
              <FiChevronRight size={24} />
            </button>

            {/* MAIN IMAGE CONTAINER */}
            <div className="relative max-w-5xl w-full h-[70vh] md:h-[80vh] flex flex-col items-center justify-center md:p-10" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={GALLERY[lightboxIndex].src}
                    alt={GALLERY[lightboxIndex].alt}
                    className="max-w-full max-h-full object-contain shadow-luxury"
                  />
                </motion.div>
              </AnimatePresence>

              {/* IMAGE INFO */}
              <div className="absolute -bottom-16 md:bottom-2 left-0 right-0 text-center flex flex-col items-center gap-2">
                <p className="font-display italic text-cream text-base md:text-lg">
                  {GALLERY[lightboxIndex].alt}
                </p>
                <p className="text-gold text-xs md:text-sm tracking-[0.2em]">
                  {lightboxIndex + 1} / {GALLERY.length}
                </p>
                
                {/* DOT INDICATORS */}
                <div className="flex gap-1.5 md:gap-2 mt-4 md:mt-6">
                  {GALLERY.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 md:h-1.5 transition-all duration-300 ${
                        i === lightboxIndex ? "w-4 md:w-5 bg-gold" : "w-1 md:w-1.5 bg-gold/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
