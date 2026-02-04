"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useHeaderTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import iconImage from "../icon.png";

interface Service {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  order: number;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const t = useHeaderTranslations();
  const { language, dir } = useLanguage();

  // Fetch services from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services?lang=${language}`);
        const data = await response.json();
        if (data.success) {
          setServices(data.services);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, [language]);

  const navItems = [
    { label: t.navItems.home, href: "/" },
    { label: t.navItems.about, href: "/about-us" },
    { label: t.navItems.services, href: "/services", hasDropdown: true },
    { label: t.navItems.faq, href: "/faq" },
    { label: t.navItems.blog, href: "/blog" },
    { label: t.navItems.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <nav className="container mx-auto px-4 sm:px-6 py-2 sm:py-3" suppressHydrationWarning>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Image
              src={iconImage}
              alt={t.logo}
              width={48}
              height={48}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              priority
            />
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent" suppressHydrationWarning>
              {t.logo}
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* Language Switcher */}
            <li>
              <LanguageSwitcher />
            </li>
            {navItems.map((item) => (
              <li key={item.href} className="relative group">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <a
                      href={item.href}
                      className="text-slate-700 hover:text-primary-600 font-semibold relative py-2 flex items-center gap-1 cursor-pointer"
                      suppressHydrationWarning
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>
                    {isServicesOpen && (
                      <div className={`absolute top-full pt-2 w-64 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
                        <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 max-h-96 overflow-y-auto">
                          {services.map((service) => (
                            <a
                              key={service.id}
                              href={`/services/${service.slug}`}
                              className="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors text-sm"
                              onClick={() => setIsServicesOpen(false)}
                              suppressHydrationWarning
                            >
                              {service.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-slate-700 hover:text-primary-600 font-semibold relative group py-2"
                    suppressHydrationWarning
                  >
                    {item.label}
                    <span className={`absolute bottom-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}></span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <LanguageSwitcher />
            </div>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-2 pb-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`w-full text-slate-700 hover:text-primary-600 hover:bg-slate-50 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      suppressHydrationWarning
                    >
                      {item.label}
                      <svg
                        className={`w-5 h-5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isServicesOpen && (
                      <ul className={`mt-2 space-y-1 ${dir === 'rtl' ? 'mr-4' : 'ml-4'} max-h-80 overflow-y-auto`}>
                        {services.map((service) => (
                          <li key={service.id}>
                            <a
                              href={`/services/${service.slug}`}
                              className="block text-slate-600 hover:text-primary-600 hover:bg-slate-50 py-2 px-4 rounded-lg transition-colors text-sm"
                              onClick={() => {
                                setIsServicesOpen(false);
                                setIsMenuOpen(false);
                              }}
                              suppressHydrationWarning
                            >
                              {service.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-slate-700 hover:text-primary-600 hover:bg-slate-50 font-semibold py-3 px-4 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    suppressHydrationWarning
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
