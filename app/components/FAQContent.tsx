"use client";

import { useState } from "react";
import Link from "next/link";
import { useFAQContentTranslations } from "@/hooks/useTranslations";

/**
 * FAQ Content Component
 * 
 * This component displays a Frequently Asked Questions page with:
 * - A hero section with gradient background
 * - Expandable FAQ cards in a two-column layout
 * - A contact form section with contact information
 * 
 * Features:
 * - Accordion-style FAQ cards that expand/collapse on click
 * - Only one FAQ can be open at a time
 * - Contact form with validation
 * - Responsive design for all screen sizes
 */

// FAQ data structure
// Each FAQ item contains: id, question, answer, expanded state, and an icon
const faqs = [
  {
    id: 1,
    question: "What distinguishes Rakan Al Nakheel Paints and Decorations Company?",
    answer: "Rukn Al Nakheel Company keeps up with the latest trends in paints and decorations to keep pace with modern times. We have specialists and technicians to treat uneven walls.",
    expanded: true, // This FAQ will be open by default
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 2,
    question: "What are the prices for interior and exterior restoration services?",
    answer: "Our prices vary depending on the scope of work and materials used. Contact us for a customized quote based on your specific needs.",
    expanded: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    question: "What are the means of communication with Rukn Al Nakheel Company for the construction and maintenance of swimming pools?",
    answer: "You can contact us through phone, email, WhatsApp, or by filling out the contact form on our website. We are available 24/7 to assist you.",
    expanded: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: 4,
    question: "Why is Rukn Al Nakheel the best air conditioning maintenance company in Riyadh?",
    answer: "We are authorized agents. Rukn Al Nakheel Company provides original spare parts and warranty, and we have 24-hour customer service throughout the week to respond. Our goal is to work hard for your comfort.",
    expanded: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 5,
    question: "How does the antiviral sterilization service work at Rukan Al Nakheel Establishment?",
    answer: "Our antiviral sterilization service uses European-level disinfectants that eliminate the coronavirus and are registered with the Ministry of Health. We disinfect both indoor and outdoor areas.",
    expanded: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 6,
    question: "What are the advantages of Rukn Al Nakheel Establishment for the design and construction of waterfalls and fountains?",
    answer: "We offer modern and contemporary fountain designs equipped with all the amenities needed. We design all types of waterfalls and place them anywhere the customer desires, with lighting installation inside waterfalls and fountains.",
    expanded: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export default function FAQContent() {
  const t = useFAQContentTranslations();
  
  // State Management
  // Find the first FAQ with expanded: true to set initial open state
  // This ensures only one FAQ is open on page load
  const initialOpenIndex = faqs.findIndex(faq => faq.expanded) !== -1 ? faqs.findIndex(faq => faq.expanded) : null;
  
  // Tracks which FAQ card is currently open (by index)
  // null means no FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex);
  
  // Form data state for the contact form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    message: "",
  });

  /**
   * Toggle FAQ card open/closed state
   * @param index - The index of the FAQ to toggle
   * If the FAQ is already open, it will be closed (set to null)
   * If it's closed, it will be opened (set to the index)
   */
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /**
   * Handle form submission
   * Prevents default form submission, logs data, shows alert, and resets form
   * @param e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(t.alertMessage);
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      service: "",
      message: "",
    });
  };

  /**
   * Handle input field changes
   * Updates form data state when user types in any form field
   * @param e - Input change event (supports input, textarea, and select)
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Split FAQs into two columns for better layout
  // Left column: FAQs at even indices (0, 2, 4...)
  // Right column: FAQs at odd indices (1, 3, 5...)
  const leftColumnFAQs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFAQs = faqs.filter((_, index) => index % 2 === 1);

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-8 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-slate-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{t.breadcrumbFAQ}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
              {t.pageTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT SECTION
          ============================================ */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header - Secondary Title */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {t.sectionTitle}
              </h2>
            </div>

            {/* ============================================
                FAQ CARDS SECTION - Two Column Layout
                ============================================ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20">
              {/* Left Column - FAQs at even indices */}
              <div className="flex flex-col gap-4 md:gap-6">
                {leftColumnFAQs.map((faq, index) => {
                  // Find the actual index in the original faqs array
                  const actualIndex = faqs.findIndex(f => f.id === faq.id);
                  // Check if this FAQ is currently open
                  const isOpen = openIndex === actualIndex;
                  
                  return (
                    <div
                      key={faq.id}
                      className="group rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* FAQ Question Button - Clickable header */}
                      <button
                        onClick={() => toggleFAQ(actualIndex)}
                        className="w-full px-6 py-6 md:px-8 md:py-7 flex items-start gap-4 text-left hover:bg-slate-50 transition-all duration-300"
                      >
                        {/* FAQ Icon - Changes color when open */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? "bg-blue-600 text-white" 
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}>
                          {faq.icon}
                        </div>
                        
                        {/* Question Text */}
                        <div className="flex-1 pt-1.5">
                          <span className="text-base sm:text-lg font-bold text-slate-900 block leading-snug">
                            {faq.question}
                          </span>
                        </div>

                        {/* Chevron Icon - Rotates when FAQ is open */}
                        <div className={`flex-shrink-0 pt-1.5 transition-all duration-300 ${
                          isOpen ? "text-blue-600" : "text-slate-400"
                        }`}>
                          <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* FAQ Answer - Expandable content area */}
                      {/* Uses max-h-[2000px] to allow full content expansion without height constraints */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6 ml-16 md:ml-20">
                          {/* Answer text with left border accent */}
                          <div className="pl-4 md:pl-5 border-l-4 border-blue-200">
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column - FAQs at odd indices */}
              <div className="flex flex-col gap-4 md:gap-6">
                {rightColumnFAQs.map((faq, index) => {
                  // Find the actual index in the original faqs array
                  const actualIndex = faqs.findIndex(f => f.id === faq.id);
                  // Check if this FAQ is currently open
                  const isOpen = openIndex === actualIndex;
                  
                  return (
                    <div
                      key={faq.id}
                      className="group rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* FAQ Question Button - Clickable header */}
                      <button
                        onClick={() => toggleFAQ(actualIndex)}
                        className="w-full px-6 py-6 md:px-8 md:py-7 flex items-start gap-4 text-left hover:bg-slate-50 transition-all duration-300"
                      >
                        {/* FAQ Icon - Changes color when open */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? "bg-blue-600 text-white" 
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}>
                          {faq.icon}
                        </div>
                        
                        {/* Question Text */}
                        <div className="flex-1 pt-1.5">
                          <span className="text-base sm:text-lg font-bold text-slate-900 block leading-snug">
                            {faq.question}
                          </span>
                        </div>

                        {/* Chevron Icon - Rotates when FAQ is open */}
                        <div className={`flex-shrink-0 pt-1.5 transition-all duration-300 ${
                          isOpen ? "text-blue-600" : "text-slate-400"
                        }`}>
                          <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* FAQ Answer - Expandable content area */}
                      {/* Uses max-h-[2000px] to allow full content expansion without height constraints */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6 ml-16 md:ml-20">
                          {/* Answer text with left border accent */}
                          <div className="pl-4 md:pl-5 border-l-4 border-blue-200">
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ============================================
                CONTACT FORM SECTION
                ============================================ */}
            {/* Contact form container with top and bottom margins for spacing */}
            <div className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12 md:mb-14 rounded-3xl shadow-xl border border-slate-200">
              {/* Form Header - Solid background banner */}
              <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t.form.title}</h3>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">{t.form.subtitle}</p>
              </div>
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* ============================================
                      LEFT COLUMN - Contact Information
                      ============================================ */}
                  <div className="flex flex-col">
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">{t.form.contactInfo}</h4>
                    
                    {/* Address Card */}
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-2">{t.form.address}</p>
                        <p className="text-base text-slate-700">{t.form.addressValue}</p>
                      </div>
                    </div>

                    {/* Phone Card */}
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-2">{t.form.communication}</p>
                        <a href="tel:+966582598295" className="text-base text-slate-700 hover:text-blue-600 transition-colors font-medium">
                          0582598295
                        </a>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 mb-3">{t.form.email}</p>
                        <a href={`mailto:${t.form.emailValue}`} className="text-base text-slate-700 hover:text-blue-600 transition-colors break-all font-medium">
                          {t.form.emailValue}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ============================================
                      RIGHT COLUMN - Contact Form Fields
                      ============================================ */}
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    {/* First Row - Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {/* First Name Input */}
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-4">
                          {t.form.firstName} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder={t.form.firstNamePlaceholder}
                          className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300"
                          required
                        />
                      </div>

                      {/* Last Name Input */}
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-4">
                          {t.form.lastName} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder={t.form.lastNamePlaceholder}
                          className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Second Row - Service and Email Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {/* Service Selection Dropdown */}
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-4">
                          {t.form.selectService} <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300 cursor-pointer"
                          required
                        >
                          <option value="">{t.form.chooseServices}</option>
                          <option value="disinfection">تعقيم ضد الفيروسات</option>
                          <option value="painting">دهانات وديكورات</option>
                          <option value="ac-maintenance">صيانة المكيفات</option>
                          <option value="renovation">ترميم منازل</option>
                          <option value="pool">إنشاء وصيانة المسابح</option>
                          <option value="waterfall">إنشاء الشلالات والنوافير</option>
                          <option value="pest-control">مكافحة الحشرات</option>
                        </select>
                      </div>

                      {/* Email Input */}
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-4">
                          {t.form.mailAddress} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.form.mailAddressPlaceholder}
                          className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-4">
                        {t.form.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.form.messagePlaceholder}
                        rows={6}
                        className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all bg-white hover:border-blue-300"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 mt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        {t.form.submit}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
