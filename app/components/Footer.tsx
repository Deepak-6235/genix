"use client";

import Link from "next/link";
import Image from "next/image";
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
    <footer className="bg-slate-900 text-white py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-3 sm:mb-4">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo-footer-final.png"
                alt={t.logo}
                width={150}
                height={60}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-primary-300">{t.quickLinks}</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary-400 transition-colors text-xs sm:text-sm block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Working Hours */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-primary-300">{t.contact}</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300 mb-3">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {contactT.location}، {contactT.city}
              </li>
              <li>
                <a href="tel:+966582010834" className="hover:text-primary-400 transition-colors flex items-center gap-2 text-xs sm:text-sm">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0582010834
                </a>
              </li>
              <li>
                <a href="mailto:roknalnakheel@gmail.com" className="hover:text-primary-400 transition-colors flex items-center gap-2 text-xs sm:text-sm break-all">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">roknalnakheel@gmail.com</span>
                </a>
              </li>
            </ul>
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 !text-primary-300">{t.workingHours}</h4>
              <p className="text-slate-300 text-xs sm:text-sm">{t.workingHoursText}</p>
              <p className="text-white font-bold mt-1 text-sm sm:text-base">24/7</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 !text-primary-300">{t.socialMedia}</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/people/Nakhel-clean/100067793743996/#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/rukn_alnakhil/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://x.com/rukn_alnakhil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://wa.me/966582010834"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-2 sm:pt-3 text-center">
          <p className="text-slate-400 text-[10px] sm:text-xs">© {new Date().getFullYear()} {t.companyName}. {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
