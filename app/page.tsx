'use client';

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import WhatsAppSection from "./components/WhatsAppSection";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServices } from "@/hooks/useServices";

export default function HomePage() {
  const { language, dir } = useLanguage();
  const { services, loading } = useServices();

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <WhatsAppSection />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
