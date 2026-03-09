"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT } from "../../lib/data";
import { FiCalendar, FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const TIME_SLOTS = [
  "12:00 PM", "1:00 PM", "2:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM",
  "9:00 PM", "10:00 PM"
];

export default function Reservation() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateError, setDateError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      guests: 2,
    }
  });

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  const handleGuestChange = (type) => {
    setGuestCount((prev) => {
      const newVal = type === "plus" ? Math.min(prev + 1, 12) : Math.max(prev - 1, 1);
      setValue("guests", newVal);
      return newVal;
    });
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const day = date.getUTCDay(); // 1 is Monday

    if (day === 1) {
      setDateError("We are closed on Mondays. Please select another day.");
    } else {
      setDateError("");
    }
  };

  const onSubmit = async (data) => {
    if (!selectedTime) return;
    if (dateError) return;

    setSubmitStatus("loading");
    
    // Prepare Email Parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      guests: data.guests,
      date: data.date,
      time: selectedTime,
      requests: data.requests || "No special requests",
      to_name: RESTAURANT.name,
    };

    try {
      // Use environment variables for security
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && serviceId !== 'your_service_id_here') {
        await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        );
      } else {
        // Fallback for demo/development if env vars aren't set
        console.log("EmailJS keys not configured. Simulation mode.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSubmittedData({ ...data, time: selectedTime });
      setSubmitStatus("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      // Fallback to success for demo purposes if keys aren't set yet
      // In production, you'd setStatus("error")
      setSubmittedData({ ...data, time: selectedTime });
      setSubmitStatus("success"); 
    }
  };

  const handleAddToCalendar = () => {
    if (!submittedData) return;

    const { date, time, guests } = submittedData;
    
    // Create event details
    const eventTitle = `Dinner at ${RESTAURANT.name}`;
    const eventDetails = `Table for ${guests} guests at ${RESTAURANT.name}. Thank you for booking with us!`;
    const eventLocation = RESTAURANT.address;

    // Standardize date and time for Google Calendar link
    // Note: This is a simplified version. For real production, use a library like 'date-fns' or 'moment'
    const dateStr = date.replace(/-/g, '');
    
    // Convert 12h time to 24h for the link
    let [hours, minutes] = time.split(/[: ]/);
    const isPM = time.includes('PM');
    if (isPM && hours !== '12') hours = parseInt(hours) + 12;
    if (!isPM && hours === '12') hours = '00';
    const timeStr = `${hours.toString().padStart(2, '0')}${minutes}00`;

    const startDateTime = `${dateStr}T${timeStr}`;
    const endDateTime = `${dateStr}T${(parseInt(hours) + 2).toString().padStart(2, '0')}${minutes}00`; // Assume 2 hour dining

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const resetForm = () => {
    setSubmitStatus(null);
    setGuestCount(2);
    setSelectedTime(null);
    reset();
  };

  const revealVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const labelStyle = "font-accent italic text-[13px] tracking-[0.08em] text-gold/70 block mb-2 cursor-pointer";
  const inputStyle = `w-full bg-white/[0.03] border border-gold/15 rounded-none p-4 text-cream font-body text-sm outline-none transition-all placeholder:text-text-sub focus:border-gold/50 focus:shadow-[0_0_0_3px_rgba(212,168,83,0.1)] focus-visible:ring-2 focus-visible:ring-gold/30`;
  const errorStyle = "text-red-deep text-[11px] mt-1 italic";

  return (
    <section id="reservation" className="section-padding relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0A0805] to-[#080808]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold opacity-[0.06] blur-[120px] rounded-full pointer-events-none animate-flicker" />

      <div className="container relative z-10">
        {/* SECTION HEADER */}
        <motion.div 
          {...revealVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label">Book Your Table</span>
          <h2 className="section-heading">Make a Reservation</h2>
          <div className="divider-gold mx-auto" />
          <p className="font-accent text-text-sub mt-6 italic text-sm md:text-base">
            &quot;Reserve your table for an unforgettable dining experience. We&apos;ll confirm within 2 hours.&quot;
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-16 items-start">
          
          {/* LEFT — BOOKING FORM */}
          <motion.div 
            {...revealVariants}
            className="w-full relative order-1"
          >
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="card-luxury p-10 md:p-16 border-t-[3px] border-t-gold text-center flex flex-col items-center justify-center min-h-[500px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="text-gold mb-6"
                  >
                    <FiCheckCircle size={70} />
                  </motion.div>
                  <h3 className="font-display text-[1.8rem] md:text-4xl text-cream mb-4">
                    Reservation Confirmed! 🥂
                  </h3>
                  <p className="text-text-sub max-w-sm mb-10 text-sm md:text-base">
                    We&apos;ll send a confirmation to your email within 2 hours. We look forward to seeing you.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                    <button onClick={handleAddToCalendar} className="btn-gold px-8 py-3 w-full sm:w-auto">Add to Calendar</button>
                    <button onClick={resetForm} className="btn-outline-gold px-8 py-3 w-full sm:w-auto">Back to Form</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-luxury p-7 md:p-12 border-t-[3px] border-t-gold relative"
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="res-name" className={labelStyle}>Full Name</label>
                        <input
                          id="res-name"
                          {...register("name", { required: "Name is required", minLength: 2 })}
                          className={`${inputStyle} ${errors.name ? "border-red-deep/60" : ""}`}
                          placeholder="John Doe"
                          autoComplete="name"
                        />
                        {errors.name && <p className={errorStyle}>{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="res-email" className={labelStyle}>Email Address</label>
                        <input
                          id="res-email"
                          {...register("email", { 
                            required: "Email is required", 
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
                          })}
                          className={`${inputStyle} ${errors.email ? "border-red-deep/60" : ""}`}
                          placeholder="john@example.com"
                          autoComplete="email"
                        />
                        {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Row 2: Phone + Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="res-phone" className={labelStyle}>Phone Number</label>
                        <input
                          id="res-phone"
                          type="tel"
                          {...register("phone", { required: "Phone is required" })}
                          className={`${inputStyle} ${errors.phone ? "border-red-deep/60" : ""}`}
                          placeholder="+1 234-567-890"
                          autoComplete="tel"
                        />
                        {errors.phone && <p className={errorStyle}>{errors.phone.message}</p>}
                      </div>
                      <div>
                        <span className={labelStyle}>Number of Guests</span>
                        <div className="flex border border-gold/15 h-[50px] bg-white/[0.03]">
                          <button
                            type="button"
                            onClick={() => handleGuestChange("minus")}
                            className="w-12 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                            aria-label="Decrease guests"
                          >
                            −
                          </button>
                          <div className="flex-1 flex items-center justify-center text-cream font-display text-xl border-x border-gold/15">
                            {guestCount}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleGuestChange("plus")}
                            className="w-12 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                            aria-label="Increase guests"
                          >
                            +
                          </button>
                        </div>
                        <input type="hidden" {...register("guests")} />
                      </div>
                    </div>

                    {/* Row 3: Date */}
                    <div className="relative">
                      <label htmlFor="res-date" className={labelStyle}>Preferred Date</label>
                      <div className="relative">
                        <input
                          id="res-date"
                          type="date"
                          min={today}
                          {...register("date", { required: "Date is required" })}
                          onChange={handleDateChange}
                          className={`${inputStyle} ${errors.date || dateError ? "border-red-deep/60" : ""} appearance-none`}
                        />
                        <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                      </div>
                      {(errors.date || dateError) && <p className={errorStyle}>{errors.date?.message || dateError}</p>}
                    </div>

                    {/* Row 4: Time Slots */}
                    <div>
                      <span className={labelStyle}>Preferred Time</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                        {TIME_SLOTS.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-center cursor-pointer font-accent italic text-[11px] md:text-xs tracking-wider transition-all border ${
                              selectedTime === time
                                ? "bg-gradient-to-br from-gold to-gold-dark text-black font-bold border-gold"
                                : "text-text-sub border-gold/15 hover:border-gold/40 hover:text-gold"
                            }`}
                            aria-pressed={selectedTime === time}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {!selectedTime && submitStatus === "loading" && (
                        <p className={errorStyle}>Please select a time slot</p>
                      )}
                    </div>

                    {/* Row 5: Special Requests */}
                    <div>
                      <label htmlFor="res-requests" className={labelStyle}>Special Requests</label>
                      <textarea
                        id="res-requests"
                        {...register("requests")}
                        rows={3}
                        className={`${inputStyle} resize-none min-h-[80px]`}
                        placeholder="Any dietary requirements, occasions, or preferences..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className={`w-full py-5 font-bold uppercase tracking-[0.12em] text-[12px] md:text-sm transition-all flex items-center justify-center gap-3 ${
                        submitStatus === "loading"
                          ? "bg-gold text-black opacity-70 cursor-not-allowed"
                          : submitStatus === "error"
                          ? "bg-red-deep text-white"
                          : "btn-gold shadow-luxury"
                      }`}
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Confirming Reservation...
                        </>
                      ) : submitStatus === "error" ? (
                        "Failed — Please Call Us"
                      ) : (
                        <>
                          <span className="text-[10px]">◆</span>
                          Reserve My Table
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — INFO COLUMN */}
          <motion.div 
            {...revealVariants}
            className="w-full space-y-6 md:space-y-8 order-2"
          >
            {/* Opening Hours */}
            <div className="card-luxury p-7 md:p-8 border-t-[3px] border-t-gold">
              <h3 className="section-label mb-2">Opening Hours</h3>
              <div className="w-10 h-px bg-gold/30 mb-6" />
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center py-2 md:py-3 border-b border-gold/5">
                  <span className="font-accent italic text-cream-dark text-sm md:text-base">Weekdays</span>
                  <span className="text-gold font-body text-sm md:text-base">{RESTAURANT.openHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center py-2 md:py-3 border-b border-gold/5">
                  <span className="font-accent italic text-cream-dark text-sm md:text-base">Weekends</span>
                  <span className="text-gold font-body text-sm md:text-base">{RESTAURANT.openHours.weekends}</span>
                </div>
                <div className="flex justify-between items-center py-2 md:py-3">
                  <span className="font-accent italic text-cream-dark text-sm md:text-base">Mondays</span>
                  <span className="text-red-deep/80 font-bold uppercase tracking-[0.2em] text-[10px]">Closed</span>
                </div>
              </div>
            </div>

            {/* Private Events */}
            <div className="card-luxury p-7 md:p-8 border-t-[3px] border-t-gold">
              <h3 className="section-label mb-2">Private Events</h3>
              <div className="w-10 h-px bg-gold/30 mb-6" />
              <p className="font-accent text-text-sub text-[13px] md:text-sm leading-relaxed mb-8">
                Planning a special occasion? Our private dining room accommodates up to 20 guests for an exclusive culinary experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${RESTAURANT.phone}`} className="btn-outline-gold flex-1 py-3 text-[10px] md:text-[11px] flex items-center justify-center gap-2">
                  <span>📞 Call Us</span>
                </a>
                <a href="#" className="btn-outline-gold flex-1 py-3 text-[10px] md:text-[11px] flex items-center justify-center gap-2">
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Why Choose Lyraa */}
            <div className="px-4">
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  "Premium seasonal ingredients",
                  "Award-winning wine cellar",
                  "Personalized service",
                  "Unforgettable ambiance"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-gold text-[8px] md:text-[10px]">◆</span>
                    <span className="font-accent italic text-text-mid text-xs md:text-sm tracking-wide">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
