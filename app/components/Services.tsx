"use client";

import Image from "next/image";

const services = [
  {
    id: 1,
    title: "تعقيم ضد الفيروسات",
    description: "نعمل على تعقيم وتطهير الأماكن الداخلية والخارجية ضد الأمراض والفيروسات بمستوى أوروبي كمطهر يقضي على فيروس الكورونا ومسجل في وزارة الصحة",
    color: "blue",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "دهانات وديكورات",
    description: "شركة ركن النخيل للديكور والدهانات بالرياض تعد من أفضل الشركات في تقديم أعمال كل من الديكورات والدهانات لجميع المنشآت والمنازل والفلل",
    color: "purple",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "صيانة المكيفات",
    description: "صيانة مكيفات فريق صيانة جاهز ومدرب على أعلى مستوى ضمان كامل على الصيانة وقطع الغيار أفضل العروض والأسعار",
    color: "emerald",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "ترميم منازل",
    description: "أفضل شركة ترميم منازل وفلل بالرياض نقوم بالترميم الداخلي والخارجي للمنزل بجودة وكفاءة عالية",
    color: "orange",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "إنشاء وصيانة المسابح",
    description: "تعتبر شركتنا الرائدة والأولى في إنشاء وتصميم وصيانة المسابح بالمملكة العربية السعودية",
    color: "cyan",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "إنشاء الشلالات والنوافير",
    description: "خدمة تصميم النوافير العصرية والحديثة والمزودة بكافة الكماليات التي تحتاج إليها خدمة تصميم جميع أنواع الشلالات ووضعها في أي مكان يريده العميل",
    color: "indigo",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "مكافحة الحشرات",
    description: "في شركة ركن النخيل، نقدم خدمات إبادة الحشرات في الرياض بأعلى مستويات الجودة والفعالية. نعتمد على تقنيات حديثة في عملياتنا لضمان تخليصكم من الحشرات بشكل دائم",
    color: "rose",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

const colorClasses: { [key: string]: string } = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  emerald: "from-emerald-500 to-emerald-600",
  orange: "from-orange-500 to-orange-600",
  cyan: "from-cyan-500 to-cyan-600",
  indigo: "from-indigo-500 to-indigo-600",
  rose: "from-rose-500 to-rose-600",
};

// Placeholder image URLs for services
const getServiceImageId = (id: number): string => {
  const imageIds: { [key: number]: string } = {
    1: "1564013799919-ab608027fe79", // Disinfection - cleaning/medical
    2: "1581578731548-c64695cc6952", // Painting - interior design
    3: "1621906116683-7a4c85a3a8c1", // AC Maintenance - home maintenance
    4: "1564013799919-ab608027fe79", // Home Renovation - construction
    5: "1571896349842-33c89424de2d", // Pool - swimming pool
    6: "1600585154340-be6161a56a0c", // Waterfall - landscape
    7: "1584622782905-0c0c0c0c0c0c", // Pest Control - service
  };
  return imageIds[id] || "1564013799919-ab608027fe79";
};

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-32 md:py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            كافة الخدمات
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            اطلع خدمات منزلك بأقل من دقيقة وأبشر
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${getServiceImageId(service.id)}?w=600&h=400&fit=crop&q=80`}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Icon Overlay */}
                <div className={`absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm ${colorClasses[service.color]} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6 sm:p-8 md:p-10">

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>

              {/* Learn More Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
              >
                <span>اطلب الخدمة</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
