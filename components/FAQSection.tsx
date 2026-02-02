'use client';

import { useState, useEffect } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FAQSectionProps {
  language?: string;
  title?: string;
  className?: string;
}

export default function FAQSection({ 
  language = 'en', 
  title = 'Frequently Asked Questions',
  className = ''
}: FAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, [language]);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(`/api/faqs?lang=${language}`);
      const data = await response.json();
      if (data.success) {
        setFaqs(data.faqs);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (faqId: string) => {
    setExpandedFaqId(expandedFaqId === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">Loading FAQs...</div>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return null; // Don't show section if no FAQs
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* FAQ Question Header */}
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900 text-lg pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-blue-900 flex-shrink-0 transition-transform duration-200 ${
                    expandedFaqId === faq.id ? 'rotate-180' : ''
                  }`}
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

              {/* FAQ Answer (Expandable) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFaqId === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
