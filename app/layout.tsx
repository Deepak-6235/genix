import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { cookies } from "next/headers";
import { LANGUAGES, DEFAULT_LANGUAGE, type LanguageCode } from "@/lib/languages";
import AOSInit from "./components/AOSInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "مؤسسة ركن النخيل | خدمات التشغيل والصيانة",
  description: "مؤسسة ركن النخيل لخدمات التنظيف والصيانة والتشغيل ومكافحة وابادة الحشرات داخل المملكة العربية السعودية",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value as LanguageCode || DEFAULT_LANGUAGE;
  const dir = LANGUAGES[locale]?.dir || LANGUAGES[DEFAULT_LANGUAGE].dir;
  const lang = LANGUAGES[locale]?.code || DEFAULT_LANGUAGE;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedLang = localStorage.getItem('preferred-language');
                  var cookieLang = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
                  var lang = (cookieLang && cookieLang[1]) || savedLang || '${DEFAULT_LANGUAGE}';
                  var dir = (lang === 'ar') ? 'rtl' : 'ltr';
                  document.documentElement.dir = dir;
                  document.documentElement.lang = lang;
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased`}
      >
        <LanguageProvider initialLanguage={locale}>
          <AOSInit />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
