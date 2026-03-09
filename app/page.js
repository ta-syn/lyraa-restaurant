"use client";
import { useState } from "react";
import PageLoader from "../components/ui/PageLoader";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Menu from "../components/sections/Menu";
import SpecialOffer from "../components/sections/SpecialOffer";
import Gallery from "../components/sections/Gallery";
import Testimonials from "../components/sections/Testimonials";
import Reservation from "../components/sections/Reservation";
import Contact from "../components/sections/Contact";
import Footer from "../components/ui/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <PageLoader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Menu />
            <SpecialOffer />
            <Gallery />
            <Testimonials />
            <Reservation />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
