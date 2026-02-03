'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useServices } from '@/hooks/useServices';
import Link from 'next/link';

export default function HomePage() {
  const { language, dir } = useLanguage();
  const { services, loading } = useServices();

  return (
    <div dir={dir} className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🌿</div>
            <span className="text-2xl font-bold text-gray-900">Genix</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#services" className="text-gray-700 hover:text-purple-600 transition">
              {language === 'en' && 'Services'}
              {language === 'ar' && 'الخدمات'}
              {language === 'pt' && 'Serviços'}
              {language === 'zh' && '服务'}
              {language === 'ja' && 'サービス'}
              {language === 'de' && 'Dienstleistungen'}
              {language === 'fr' && 'Services'}
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-purple-600 transition">
              {language === 'en' && 'Contact'}
              {language === 'ar' && 'اتصل بنا'}
              {language === 'pt' && 'Contato'}
              {language === 'zh' && '联系'}
              {language === 'ja' && 'お問い合わせ'}
              {language === 'de' && 'Kontakt'}
              {language === 'fr' && 'Contact'}
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {language === 'en' && 'Welcome to Genix'}
            {language === 'ar' && 'أهلا وسهلا في جينكس'}
            {language === 'pt' && 'Bem-vindo ao Genix'}
            {language === 'zh' && '欢迎来到Genix'}
            {language === 'ja' && 'Genixへようこそ'}
            {language === 'de' && 'Willkommen bei Genix'}
            {language === 'fr' && 'Bienvenue chez Genix'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'en' && 'Professional pest control and maintenance services'}
            {language === 'ar' && 'خدمات مكافحة الآفات والصيانة المهنية'}
            {language === 'pt' && 'Serviços profissionais de controle de pragas e manutenção'}
            {language === 'zh' && '专业害虫防治和维护服务'}
            {language === 'ja' && 'プロフェッショナルな害虫駆除と保守サービス'}
            {language === 'de' && 'Professionelle Schädlingsbekämpfungs- und Wartungsdienste'}
            {language === 'fr' && 'Services professionnels de lutte antiparasitaire et de maintenance'}
          </p>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {language === 'en' && 'Our Services'}
            {language === 'ar' && 'خدماتنا'}
            {language === 'pt' && 'Nossos Serviços'}
            {language === 'zh' && '我们的服务'}
            {language === 'ja' && 'サービス'}
            {language === 'de' && 'Unsere Dienstleistungen'}
            {language === 'fr' && 'Nos Services'}
          </h2>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              {language === 'en' && 'No services available'}
              {language === 'ar' && 'لا توجد خدمات متاحة'}
              {language === 'pt' && 'Nenhum serviço disponível'}
              {language === 'zh' && '没有可用的服务'}
              {language === 'ja' && 'サービスはありません'}
              {language === 'de' && 'Keine Dienstleistungen verfügbar'}
              {language === 'fr' && 'Aucun service disponible'}
            </div>
          )}

          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105"
                >
                  {service.icon && (
                    <div className="text-5xl mb-4">{service.icon}</div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 line-clamp-3 mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="text-purple-600 font-medium flex items-center group-hover:gap-2 transition-all">
                    {language === 'en' && 'Read More'}
                    {language === 'ar' && 'اقرأ المزيد'}
                    {language === 'pt' && 'Leia Mais'}
                    {language === 'zh' && '阅读更多'}
                    {language === 'ja' && '詳細を読む'}
                    {language === 'de' && 'Mehr erfahren'}
                    {language === 'fr' && 'En savoir plus'}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 rounded-xl px-8 my-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'en' && 'Get in Touch'}
            {language === 'ar' && 'تواصل معنا'}
            {language === 'pt' && 'Entre em Contato'}
            {language === 'zh' && '联系我们'}
            {language === 'ja' && 'お問い合わせ'}
            {language === 'de' && 'Kontaktieren Sie uns'}
            {language === 'fr' && 'Nous Contacter'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' && 'Contact us for more information about our services.'}
            {language === 'ar' && 'تواصل معنا للحصول على مزيد من المعلومات حول خدماتنا.'}
            {language === 'pt' && 'Entre em contato conosco para mais informações sobre nossos serviços.'}
            {language === 'zh' && '联系我们以获取有关我们服务的更多信息。'}
            {language === 'ja' && 'サービスの詳細についてはお問い合わせください。'}
            {language === 'de' && 'Kontaktieren Sie uns für weitere Informationen zu unseren Dienstleistungen.'}
            {language === 'fr' && 'Contactez-nous pour plus d\'informations sur nos services.'}
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Genix. {language === 'en' && 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}
