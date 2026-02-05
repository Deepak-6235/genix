'use client';

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statistics from "./components/Statistics";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import SectionScrollController from "./components/SectionScrollController";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SectionScrollController />
      <div className="scroll-section relative">
        <Hero />
      </div>
      <div className="scroll-section relative">
        <WhyChooseUs />
      </div>
      <div className="scroll-section relative">
        <AboutUs />
      </div>
      <div className="scroll-section relative">
        <Services />
      </div>
      <div className="scroll-section relative">
        <Statistics variant="dark" />
      </div>
      <div className="scroll-section relative">
        <Testimonials />
      </div>
      <div className="scroll-section relative">
        <Blog />
      </div>
      <Footer />
    </div>
  );
}
