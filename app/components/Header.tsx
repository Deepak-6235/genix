"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100" data-aos="fade-down">
      <nav className="container mx-auto px-4 sm:px-6 py-2 sm:py-3" suppressHydrationWarning>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Image
              src={iconImage}
              alt={t.logo}
              width={48}
              height={48}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
              priority
            />

          </Link>

          {/* Navigation & Actions Grouped at the End */}
          <div className="flex items-center gap-4 xl:gap-6">
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Language Switcher */}

              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/services' && pathname?.startsWith('/services'));

                return (
                  <li key={item.href} className="relative group">
                    {item.hasDropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <Link
                          href={item.href}
                          className={`font-semibold relative py-2 flex items-center gap-1 cursor-pointer transition-colors ${isActive ? 'text-primary-600' : 'text-slate-700 hover:text-primary-600'
                            }`}
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
                        </Link>
                        {isServicesOpen && (
                          <div className={`absolute top-full pt-2 w-64 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
                            <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 max-h-96 overflow-y-auto">
                              {services.map((service) => (
                                <Link
                                  key={service.id}
                                  href={`/services/${service.slug}`}
                                  className="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors text-sm"
                                  onClick={() => setIsServicesOpen(false)}
                                  suppressHydrationWarning
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`font-semibold relative group py-2 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-700 hover:text-primary-600'
                          }`}
                        suppressHydrationWarning
                      >
                        {item.label}
                        <span className={`absolute bottom-0 h-0.5 bg-primary-600 transition-all duration-300 ${dir === 'rtl' ? 'right-0' : 'left-0'} ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></span>
                      </Link>
                    )}
                  </li>
                );
              })}
              <li>
                <div className="flex items-center gap-3 border-x border-slate-200 px-4">
                  <a href="https://www.facebook.com/people/Nakhel-clean/100067793743996/#" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/rukn_alnakhil/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://x.com/rukn_alnakhil" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="https://wa.me/966582010834" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </li>
              <li>
                <LanguageSwitcher />
              </li>
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-2 pb-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/services' && pathname?.startsWith('/services'));

              return (
                <li key={item.href}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between text-start ${isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-700 hover:text-primary-600 hover:bg-slate-50'
                          }`}
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
                              <Link
                                href={`/services/${service.slug}`}
                                className="block text-slate-600 hover:text-primary-600 hover:bg-slate-50 py-2 px-4 rounded-lg transition-colors text-sm"
                                onClick={() => {
                                  setIsServicesOpen(false);
                                  setIsMenuOpen(false);
                                }}
                                suppressHydrationWarning
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block font-semibold py-3 px-4 rounded-lg transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-700 hover:text-primary-600 hover:bg-slate-50'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                      suppressHydrationWarning
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}
