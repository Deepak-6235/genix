"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFAQContentTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

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
 * - Dynamically fetches FAQs from database
 * - Only displays FAQs that have answers
 */

interface FAQ {
  id: string;
  faqId: string;
  question: string;
  answer: string | null;
  order: number;
  isActive: boolean;
}

export default function FAQContent() {
  const t = useFAQContentTranslations();
  const { language } = useLanguage();

  // State Management
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Form data state for the contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    question: "",
  });

  // Fetch FAQs from database
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/faqs?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          // Filter to only show FAQs that have answers
          const faqsWithAnswers = data.faqs.filter(
            (faq: FAQ) => faq.answer && faq.answer.trim() !== ''
          );
          setFaqs(faqsWithAnswers);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [language]);

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
      name: "",
      email: "",
      service: "",
      question: "",
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

  // Default icon for FAQs
  const getDefaultIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // Split FAQs into two columns for better layout
  // Left column: FAQs at even indices (0, 2, 4...)
  // Right column: FAQs at odd indices (1, 3, 5...)
  const leftColumnFAQs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFAQs = faqs.filter((_, index) => index % 2 === 1);

  return (
    <div className="min-h-screen">
      <section className="py-4 sm:py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3 sm:mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-slate-600 justify-center">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-slate-900 font-semibold">{t.breadcrumbFAQ}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center">
              {t.pageTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT SECTION
          ============================================ */}
      <section className="pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">


            {/* ============================================
                FAQ CARDS SECTION - Two Column Layout
                ============================================ */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600">No FAQs available at this time.</p>
              </div>
            ) : (
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
                          className="w-full px-6 py-6 md:px-8 md:py-7 flex items-start gap-4 text-start hover:bg-slate-50 transition-all duration-300"
                        >
                          {/* FAQ Icon - Changes color when open */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                            }`}>
                            {getDefaultIcon()}
                          </div>

                          {/* Question Text */}
                          <div className="flex-1 pt-1.5">
                            <span className="text-base sm:text-lg font-bold text-slate-900 block leading-snug">
                              {faq.question}
                            </span>
                          </div>

                          {/* Chevron Icon - Rotates when FAQ is open */}
                          <div className={`flex-shrink-0 pt-1.5 transition-all duration-300 ${isOpen ? "text-blue-600" : "text-slate-400"
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
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6 ms-16 md:ms-20">
                            {/* Answer text with start border accent */}
                            <div className="ps-4 md:ps-5 border-s-4 border-blue-200">
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
                          className="w-full px-6 py-6 md:px-8 md:py-7 flex items-start gap-4 text-start hover:bg-slate-50 transition-all duration-300"
                        >
                          {/* FAQ Icon - Changes color when open */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                            }`}>
                            {getDefaultIcon()}
                          </div>

                          {/* Question Text */}
                          <div className="flex-1 pt-1.5">
                            <span className="text-base sm:text-lg font-bold text-slate-900 block leading-snug">
                              {faq.question}
                            </span>
                          </div>

                          {/* Chevron Icon - Rotates when FAQ is open */}
                          <div className={`flex-shrink-0 pt-1.5 transition-all duration-300 ${isOpen ? "text-blue-600" : "text-slate-400"
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
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6 ms-16 md:ms-20">
                            {/* Answer text with start border accent */}
                            <div className="ps-4 md:ps-5 border-s-4 border-blue-200">
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
            )}

            {/* ============================================
                CONTACT FORM SECTION
                ============================================ */}
            {/* Contact form container with top and bottom margins for spacing */}
            <div className="max-w-2xl mx-auto mt-8 sm:mt-10 mb-8 sm:mb-10 rounded-2xl shadow-lg border border-slate-200">
              {/* Form Header - Solid background banner */}
              <div className="px-6 py-5 text-center border-b border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{t.form.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.form.subtitle}</p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                <div className="space-y-4 md:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      {t.form.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.form.namePlaceholder}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300 text-sm text-start"
                      required
                    />
                  </div>

                  {/* Second Row - Service and Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Selection Dropdown */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        {t.form.selectService} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300 cursor-pointer text-sm text-start"
                        required
                      >
                        <option value="">{t.form.chooseServices}</option>
                        <option value="disinfection">{t.form.servicesOptions.disinfection}</option>
                        <option value="painting">{t.form.servicesOptions.painting}</option>
                        <option value="ac-maintenance">{t.form.servicesOptions.acMaintenance}</option>
                        <option value="renovation">{t.form.servicesOptions.renovation}</option>
                        <option value="pool">{t.form.servicesOptions.pool}</option>
                        <option value="waterfall">{t.form.servicesOptions.waterfall}</option>
                        <option value="pest-control">{t.form.servicesOptions.pestControl}</option>
                      </select>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        {t.form.mailAddress} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.mailAddressPlaceholder}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white hover:border-blue-300 text-sm text-start"
                        required
                      />
                    </div>
                  </div>

                  {/* Question Textarea */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      {t.form.question} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleChange}
                      placeholder={t.form.questionPlaceholder}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all bg-white hover:border-blue-300 text-sm text-start"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-base hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {t.form.submit}
                    </button>
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
