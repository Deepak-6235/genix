"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContactContentTranslations } from "@/hooks/useTranslations";
import { useContactTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Contact Content Component
 *
 * This component displays a contact page with:
 * - A hero section with breadcrumb navigation
 * - Contact information cards
 * - Contact form with validation
 * - WhatsApp CTA section
 *
 * Features:
 * - Form validation with error messages
 * - Responsive design for all screen sizes
 * - Contact information display
 * - Dynamically fetches data from AboutUs table
 */

interface AboutUsData {
  email: string | null;
  phoneNumber1: string | null;
  phoneNumber2: string | null;
  workingHours: string | null;
  address: string | null;
}

export default function ContactContent() {
  const t = useContactContentTranslations();
  const contactT = useContactTranslations();
  const { language } = useLanguage();

  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  const phoneNumber = aboutUs?.phoneNumber1?.replace(/^0/, '') || "582010834";
  const whatsappMessage = encodeURIComponent(t.whatsappMessage);
  const whatsappLink = `https://wa.me/966${phoneNumber}?text=${whatsappMessage}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch About Us data
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/about-us?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setAboutUs(data.aboutUs);
        }
      } catch (error) {
        console.error('Failed to fetch about us data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, [language]);

  const services = [
    "House Cleaning",
    "Indoor Cleaning",
    "Plumbing Services",
    "Bathroom Cleaning",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
    }
    if (!formData.email.trim()) {
      newErrors.email = t.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }
    if (!formData.service) {
      newErrors.service = t.errors.serviceRequired;
    }
    if (!formData.message.trim()) {
      newErrors.message = t.errors.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      // For now, we'll use mailto as a fallback
      const subject = encodeURIComponent(`طلب خدمة: ${formData.service}`);
      const body = encodeURIComponent(
        `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nالهاتف: ${formData.phone || "غير محدد"}\nالخدمة: ${formData.service}\n\nالرسالة:\n${formData.message}`
      );
      window.location.href = `mailto:roknalnakheel@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section className="py-8 sm:py-14 md:py-16 lg:py-16 bg-gradient-to-b from-slate-50 to-white">
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
                <li className="text-slate-900 font-semibold">{t.breadcrumbContact}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              {contactT.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl">
              {contactT.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT INFORMATION CARDS
          ============================================ */}
      <section className="py-6 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
              {/* Phone Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mr-3 sm:mr-4">
                    {contactT.phone}
                  </h3>
                </div>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {aboutUs?.phoneNumber1 && (
                      <a
                        href={`tel:+966${aboutUs.phoneNumber1.replace(/^0/, '')}`}
                        className="block text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg transition-colors"
                      >
                        {aboutUs.phoneNumber1}
                      </a>
                    )}
                    {aboutUs?.phoneNumber2 && (
                      <a
                        href={`tel:+966${aboutUs.phoneNumber2.replace(/^0/, '')}`}
                        className="block text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg transition-colors"
                      >
                        {aboutUs.phoneNumber2}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mr-3 sm:mr-4">
                    {contactT.email}
                  </h3>
                </div>
                {loading ? (
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                ) : (
                  <a
                    href={`mailto:${aboutUs?.email || 'roknalnakheel@gmail.com'}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base md:text-lg transition-colors break-all"
                  >
                    {aboutUs?.email || 'roknalnakheel@gmail.com'}
                  </a>
                )}
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mr-3 sm:mr-4">
                    {contactT.address}
                  </h3>
                </div>
                {loading ? (
                  <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
                ) : (
                  <p className="text-slate-700 text-base sm:text-lg font-medium">
                    {aboutUs?.address || `${contactT.location} ${contactT.city}`}
                  </p>
                )}
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mr-3 sm:mr-4">
                    {contactT.hours}
                  </h3>
                </div>
                {loading ? (
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                ) : (
                  <p className="text-slate-700 text-base sm:text-lg font-bold">
                    {aboutUs?.workingHours || contactT.hoursValue}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-lg border border-slate-100 mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
                {t.formTitle}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm sm:text-base font-semibold text-slate-700 mb-2"
                  >
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-slate-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900`}
                    placeholder={t.form.namePlaceholder}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base font-semibold text-slate-700 mb-2"
                  >
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-slate-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900`}
                    placeholder={t.form.emailPlaceholder}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm sm:text-base font-semibold text-slate-700 mb-2"
                  >
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                    placeholder={t.form.phonePlaceholder}
                  />
                </div>

                {/* Services Field */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm sm:text-base font-semibold text-slate-700 mb-2"
                  >
                    {t.form.services}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.service ? "border-red-500" : "border-slate-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white`}
                  >
                    <option value="">{t.form.chooseServices}</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm sm:text-base font-semibold text-slate-700 mb-2"
                  >
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-slate-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 resize-none`}
                    placeholder={t.form.messagePlaceholder}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  {t.form.sendMessage}
                </button>
              </form>
            </div>

            {/* WhatsApp CTA */}
            <div className="text-center px-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                {contactT.offers}
              </h3>
              <p className="text-slate-600 mb-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {contactT.offersDescription}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {contactT.whatsappButton}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
