'use client';

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statistics from "./components/Statistics";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import WhatsAppSection from "./components/WhatsAppSection";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServices } from "@/hooks/useServices";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhyChooseUs />
      <AboutUs />
      <Services />
      <Statistics variant="dark" />
      <Testimonials />
      <Blog />
      <Footer />
    </div>
  );
}
