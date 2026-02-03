"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { label: "مكافحة الحشرات", href: "/services/pest-control" },
    { label: "تعقيم ضد الفيروسات", href: "/services/disinfection-against-viruses" },
    { label: "دهانات وديكورات", href: "/services/paints-and-decorations" },
    { label: "صيانة المكيفات", href: "/services/air-conditioner-maintenance" },
    { label: "تصميم وإنشاء الشلالات والنوافير", href: "/services/waterfalls-and-fountains" },
    { label: "إنشاء وصيانة المسابح", href: "/services/swimming-pools-construction-maintenance" },
    { label: "الترميم الداخلي والخارجي", href: "/services/interior-exterior-restoration" },
  ];

  const navItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "من نحن", href: "/about-us" },
    { label: "الخدمات", href: "/services", hasDropdown: true },
    { label: "اسئلة شائعة", href: "/faq" },
    { label: "المدونة", href: "/blog" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4" suppressHydrationWarning>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent" suppressHydrationWarning>
            ركن النخيل
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
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
                      className="text-slate-700 hover:text-blue-600 font-semibold relative py-2 flex items-center gap-1 cursor-pointer"
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
                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2">
                        {services.map((service) => (
                          <a
                            key={service.label}
                            href={service.href}
                            className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                            onClick={() => setIsServicesOpen(false)}
                            suppressHydrationWarning
                          >
                            {service.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-slate-700 hover:text-blue-600 font-semibold relative group py-2"
                    suppressHydrationWarning
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-2 pb-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="w-full text-right text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-between"
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
                      <ul className="mr-4 mt-2 space-y-1">
                        {services.map((service) => (
                          <li key={service.label}>
                            <a
                              href={service.href}
                              className="block text-slate-600 hover:text-blue-600 hover:bg-slate-50 py-2 px-4 rounded-lg transition-colors text-sm"
                              onClick={() => {
                                setIsServicesOpen(false);
                                setIsMenuOpen(false);
                              }}
                              suppressHydrationWarning
                            >
                              {service.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-semibold py-3 px-4 rounded-lg transition-colors"
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
