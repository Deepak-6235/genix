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

interface Service {
  id: string;
  slug: string;
  name: string;
}

export default function ContactContent() {
  const t = useContactContentTranslations();
  const contactT = useContactTranslations();
  const { language } = useLanguage();

  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

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
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // Fetch Services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const response = await fetch(`/api/services?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setServices(data.services);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [language]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setSubmitting(true);
        setSubmitSuccess(false);

        // Find the selected service to get its slug
        const selectedService = services.find(s => s.name === formData.service);

        if (!selectedService) {
          setErrors({ service: 'Invalid service selected' });
          return;
        }

        const response = await fetch('/api/contact-form-submissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            serviceSlug: selectedService.slug,
            message: formData.message,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSubmitSuccess(true);
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            message: "",
          });
          // Show success message for 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } else {
          alert(data.message || 'Failed to submit form. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Failed to submit form. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ============================================
          HERO SECTION WITH BREADCRUMB
          ============================================ */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-5rem)] flex items-center py-20 overflow-hidden"
        style={{ backgroundImage: "url('/images/contact-us.webp')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/50 z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm sm:text-base text-white/90 justify-center">
                <li>
                  <Link href="/" className="hover:text-primary-400 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-white font-semibold">{t.breadcrumbContact}</li>
              </ol>
            </nav>

            {/* Main Page Title */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight text-center">
                {contactT.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-center">
                {contactT.subtitle}
              </p>
            </div>
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
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-lg flex items-center justify-center text-success-600">
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
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
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
                        className="block text-slate-900 hover:text-primary-600 font-semibold text-base sm:text-lg transition-colors"
                      >
                        {aboutUs.phoneNumber1}
                      </a>
                    )}
                    {aboutUs?.phoneNumber2 && (
                      <a
                        href={`tel:+966${aboutUs.phoneNumber2.replace(/^0/, '')}`}
                        className="block text-slate-900 hover:text-primary-600 font-semibold text-base sm:text-lg transition-colors"
                      >
                        {aboutUs.phoneNumber2}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
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
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {contactT.email}
                  </h3>
                </div>
                {loading ? (
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                ) : (
                  <a
                    href={`mailto:${aboutUs?.email || 'roknalnakheel@gmail.com'}`}
                    className="text-slate-900 hover:text-primary-600 font-semibold text-sm sm:text-base md:text-lg transition-colors break-all"
                  >
                    {aboutUs?.email || 'roknalnakheel@gmail.com'}
                  </a>
                )}
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-purple-100 rounded-lg flex items-center justify-center text-accent-purple-600">
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
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
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
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-orange-100 rounded-lg flex items-center justify-center text-accent-orange-600">
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
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-center">
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
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-slate-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900`}
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
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-slate-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900`}
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
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
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.service ? "border-red-500" : "border-slate-300"
                        } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900 bg-white appearance-none ltr:pr-10 rtl:pl-10`}
                    >
                      <option value="">{servicesLoading ? 'Loading services...' : t.form.chooseServices}</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3 pointer-events-none text-slate-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
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
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-slate-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900 resize-none`}
                    placeholder={t.form.messagePlaceholder}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div className="p-4 bg-success-100 border border-success-400 text-success-700 rounded-lg">
                    <p className="font-semibold">Success! Your message has been sent.</p>
                    <p className="text-sm">We will get back to you soon.</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="hero-gradient-btn text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : t.form.sendMessage}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
