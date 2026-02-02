import { LanguageCode } from './languages';

interface TranslationRequest {
  text: string;
  targetLanguage: LanguageCode;
}

interface TranslatedContent {
  title: string;
  shortDescription: string;
  fullDescription: string;
  servicesProvided: string;
  targetInsects: string;
  methodsTitle: string;
  methodsDescription: string;
  advancedTechnologies: string;
  safeUseDescription: string;
  serviceGuarantee: string;
}

// Map language codes to Google Translate codes
const LANGUAGE_MAP: Record<LanguageCode, string> = {
  en: 'en',
  ar: 'ar',
  pt: 'pt',
  zh: 'zh-CN',
  ja: 'ja',
  de: 'de',
  fr: 'fr',
};

async function translateText(text: string, targetLanguage: LanguageCode): Promise<string> {
  if (!text) return '';
  if (targetLanguage === 'en') return text;

  try {
    const googleTranslateCode = LANGUAGE_MAP[targetLanguage];

    // Using free Google Translate API (no key required for basic usage)
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Fallback to a simple translation approach using Google Translate free API
    const encoded = encodeURIComponent(text);
    const translationResponse = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleTranslateCode}&dt=t&q=${encoded}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    if (!translationResponse.ok) {
      console.error(`Translation failed for ${targetLanguage}:`, translationResponse.status);
      return text;
    }

    const data = await translationResponse.json();

    // Extract translated text from the response
    if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      const translatedText = data[0]
        .map((item: any) => item[0])
        .join('');
      return translatedText;
    }

    return text;
  } catch (error) {
    console.error(`Translation error for ${targetLanguage}:`, error);
    return text;
  }
}

export async function translateContent(
  englishContent: TranslatedContent,
  targetLanguages: LanguageCode[]
): Promise<Record<LanguageCode, TranslatedContent>> {
  const translations: Record<LanguageCode, TranslatedContent> = {
    en: englishContent,
  } as Record<LanguageCode, TranslatedContent>;

  // Translate to each target language
  for (const lang of targetLanguages) {
    if (lang === 'en') continue;

    try {
      translations[lang] = {
        title: await translateText(englishContent.title, lang),
        shortDescription: await translateText(englishContent.shortDescription, lang),
        fullDescription: await translateText(englishContent.fullDescription, lang),
        servicesProvided: await translateText(englishContent.servicesProvided, lang),
        targetInsects: await translateText(englishContent.targetInsects, lang),
        methodsTitle: await translateText(englishContent.methodsTitle, lang),
        methodsDescription: await translateText(englishContent.methodsDescription, lang),
        advancedTechnologies: await translateText(englishContent.advancedTechnologies, lang),
        safeUseDescription: await translateText(englishContent.safeUseDescription, lang),
        serviceGuarantee: await translateText(englishContent.serviceGuarantee, lang),
      };
    } catch (error) {
      console.error(`Failed to translate to ${lang}:`, error);
      // Return English as fallback
      translations[lang] = englishContent;
    }
  }

  return translations;
}

export async function translateSingleText(
  text: string,
  targetLanguage: LanguageCode
): Promise<string> {
  return translateText(text, targetLanguage);
}
