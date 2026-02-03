"use client";

import Link from "next/link";
import { useFooterTranslations, useContactTranslations } from "@/hooks/useTranslations";

export default function Footer() {
  const t = useFooterTranslations();
  const contactT = useContactTranslations();
  
  const navItems = [
    { label: t.navItems.home, href: "/" },
    { label: t.navItems.about, href: "/about-us" },
    { label: t.navItems.services, href: "/services" },
    { label: t.navItems.faq, href: "/faq" },
    { label: t.navItems.blog, href: "/blog" },
    { label: t.navItems.contact, href: "/contact" },
  ];

  const services = [
    { label: t.serviceItems.pestControl, href: "/services/pest-control" },
    { label: t.serviceItems.disinfection, href: "/services/disinfection-against-viruses" },
    { label: t.serviceItems.paints, href: "/services/paints-and-decorations" },
    { label: t.serviceItems.acMaintenance, href: "/services/air-conditioner-maintenance" },
    { label: t.serviceItems.waterfalls, href: "/services/waterfalls-and-fountains" },
    { label: t.serviceItems.pools, href: "/services/swimming-pools-construction-maintenance" },
    { label: t.serviceItems.restoration, href: "/services/interior-exterior-restoration" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold !text-blue-300 mb-1.5 sm:mb-2">
              {t.companyName}
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-blue-300">{t.quickLinks}</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors text-xs sm:text-sm block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-blue-300">{t.services}</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="hover:text-blue-400 transition-colors text-xs sm:text-sm block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Working Hours */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-blue-300">{t.contact}</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300 mb-3">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {contactT.location}، {contactT.city}
              </li>
              <li>
                <a href="tel:+966582010834" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-xs sm:text-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0582010834
                </a>
              </li>
              <li>
                <a href="mailto:roknalnakheel@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-xs sm:text-sm break-all">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">roknalnakheel@gmail.com</span>
                </a>
              </li>
            </ul>
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-blue-300">{t.workingHours}</h4>
              <p className="text-slate-300 text-xs sm:text-sm">{t.workingHoursText}</p>
              <p className="text-white font-bold mt-1 text-sm sm:text-base">24/7</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-3 sm:pt-4 text-center">
          <p className="text-slate-400 text-[10px] sm:text-xs">© {new Date().getFullYear()} {t.companyName}. {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
