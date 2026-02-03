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

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  // If no API key, return original text immediately
  if (!apiKey || apiKey === 'your-google-translate-api-key-here') {
    console.warn(`GOOGLE_TRANSLATE_API_KEY not set, using English text for ${targetLanguage}`);
    return text;
  }

  try {
    const googleTranslateCode = LANGUAGE_MAP[targetLanguage];

    // Use official Google Translate API
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: googleTranslateCode,
          source: 'en',
        }),
      }
    );

    if (!response.ok) {
      console.error(`Translation API failed for ${targetLanguage}:`, response.status, response.statusText);
      return text;
    }

    const data = await response.json();

    // Extract translated text from the response
    if (data.data && data.data.translations && data.data.translations[0]) {
      return data.data.translations[0].translatedText;
    }

    console.warn(`No translation received for ${targetLanguage}`);
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
