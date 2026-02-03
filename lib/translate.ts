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

export async function translateContent<T extends Record<string, any>>(
  englishContent: T,
  targetLanguages: LanguageCode[]
): Promise<Record<LanguageCode, T>> {
  const translations: Record<LanguageCode, T> = {
    en: englishContent,
  } as Record<LanguageCode, T>;

  // Translate to each target language
  for (const lang of targetLanguages) {
    if (lang === 'en') continue;

    try {
      const translatedContent: any = {};

      // Translate each string field in the content
      for (const [key, value] of Object.entries(englishContent)) {
        if (typeof value === 'string') {
          translatedContent[key] = await translateText(value, lang);
        } else {
          // Keep non-string values as-is
          translatedContent[key] = value;
        }
      }

      translations[lang] = translatedContent as T;
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
