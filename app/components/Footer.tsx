"use client";

import Link from "next/link";

export default function Footer() {
  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about-us" },
    { label: "الخدمات", href: "/services" },
    { label: "اسئلة شائعة", href: "/faq" },
    { label: "المدونة", href: "/blog" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  const services = [
    { label: "مكافحة الحشرات", href: "/services/pest-control" },
    { label: "تعقيم ضد الفيروسات", href: "/services/disinfection-against-viruses" },
    { label: "دهانات وديكورات", href: "/services/paints-and-decorations" },
    { label: "صيانة المكيفات", href: "/services/air-conditioner-maintenance" },
    { label: "تصميم وإنشاء الشلالات والنوافير", href: "/services/waterfalls-and-fountains" },
    { label: "إنشاء وصيانة المسابح", href: "/services/swimming-pools-construction-maintenance" },
    { label: "الترميم الداخلي والخارجي", href: "/services/interior-exterior-restoration" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-3 sm:mb-4">
              ركن النخيل
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              مؤسسة ركن النخيل لخدمات التنظيف والصيانة والتشغيل ومكافحة وإبادة الحشرات داخل المملكة العربية السعودية
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">روابط سريعة</h4>
            <ul className="space-y-2 sm:space-y-3 text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors text-sm sm:text-base block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">الخدمات</h4>
            <ul className="space-y-2 sm:space-y-3 text-slate-300">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="hover:text-blue-400 transition-colors text-sm sm:text-base block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Working Hours */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">التواصل</h4>
            <ul className="space-y-2 sm:space-y-3 text-slate-300 mb-6">
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                السعودية، الرياض
              </li>
              <li>
                <a href="tel:+966582010834" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0582010834
                </a>
              </li>
              <li>
                <a href="mailto:roknalnakheel@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-sm sm:text-base break-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">roknalnakheel@gmail.com</span>
                </a>
              </li>
            </ul>
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ساعات العمل</h4>
              <p className="text-slate-300 text-sm sm:text-base">نعمل طوال أيام الأسبوع</p>
              <p className="text-white font-bold mt-2 text-base sm:text-lg">24/7</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6 sm:pt-8 text-center">
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">© {new Date().getFullYear()} مؤسسة ركن النخيل. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">برمجة وتصميم ❤️ نوفل سيو</p>
        </div>
      </div>
    </footer>
  );
}
