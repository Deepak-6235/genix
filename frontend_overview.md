# Frontend Architecture & Development Guide

Welcome to the frontend documentation for the **Genix** application. This guide will help you understand the codebase, technologies used, and how to navigate and modify the application.

## 1. Technology Stack

This application is built using a modern React-based stack optimized for performance and SEO:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) - Handles routing, rendering (SSR/CSR), and optimization.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Adds static typing for better code quality and developer experience.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- **Icons**: SVG Icons (inline) and Heroicons.
- **Carousel**: [Swiper.js](https://swiperjs.com/) - Used for Service and Blog sliders.
- **Data Fetching**: Native Fetch API - Used to interact with backend API routes.

## 2. Project Structure

The project follows the standardized Next.js App Router structure:

```
genix/
├── app/                  # Main application source
│   ├── api/              # Backend API routes (server-side)
│   ├── components/       # Reusable UI components
│   ├── contact/          # Routes (e.g., /contact maps to contact/page.tsx)
│   ├── services/         # Dynamic routes (e.g., services/[slug])
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout (Html, Body, Providers)
│   └── page.tsx          # Homepage
├── components/           # (Optional) Shared or UI library components
├── contexts/             # React Contexts (Global State)
│   └── LanguageContext.tsx # Manages language (en/ar) and direction (ltr/rtl)
├── hooks/                # Custom React Hooks
│   └── useTranslations.ts # Hook for handling text translations
├── lib/                  # Utility functions and constants
│   └── languages.ts      # Language definitions and logic
├── prisma/               # Database schema and seed scripts
└── public/               # Static assets (images, fonts)
```

## 3. Core Concepts

### 3.1 Components System
The UI is composed of modular components found in `app/components/`. A typical page (e.g., Contact) is built like this:
- **`app/contact/page.tsx`**: The main route file. It usually imports a "Content" component.
- **`app/components/ContactContent.tsx`**: The actual implementation. Usually a "Client Component" (`"use client"`) that handles state (forms, loading).
- **`app/components/Header.tsx`** & **`Footer.tsx`**: Global components included in `layout.tsx`.

### 3.2 Styling (Tailwind CSS)
We use utility classes for almost everything.
- **Responsive**: `sm:p-4 md:p-8` (Padding 4 on mobile, Padding 8 on tablet+).
- **Colors**: Defined in `tailwind.config.ts` (e.g., `text-primary-600`).
- **RTL Support**: Critical for this app. We use RTL modifiers (`rtl:ml-4`, `rtl:rotate-180`) to ensure layouts flip correctly for Arabic.
- **Custom Styles**: complex styles like generic animations are in `app/globals.css`.

### 3.3 Internationalization (i18n)
The app supports English (`en`) and Arabic (`ar`).
- **`LanguageContext`**: Wraps the app to provide the current `language` and `dir` (direction: ltr/rtl).
- **`useTranslations`**: A custom hook that returns the correct text object based on the current language.
- **Direction**: The HTML tag gets `dir="rtl"` automatically when Arabic is selected, triggering CSS reversals.

### 3.4 Data Fetching
Data (Services, Blogs) is fetched from the internal API:
```tsx
useEffect(() => {
  fetch(`/api/services?lang=${language}`)
    .then(res => res.json())
    .then(data => setServices(data.services));
}, [language]);
```
This ensures that when the user switches language, the content updates dynamically.

## 4. Key Workflows

### How to Add a New Page
1. Create a folder in `app/`, e.g., `app/gallery/`.
2. Add `page.tsx` inside it.
3. Build your UI component.

### How to Modify Styling
1. Locate the component in `app/components/`.
2. Edit the Tailwind classes in `className`.
   - *Example*: Change `bg-white` to `bg-slate-50`.
3. Save, and Next.js HMR (Hot Module Replacement) will update the browser instantly.

### How to Debug Layout Issues
- Use the browser's **Inspect Element** tool.
- Check the **Console** for React errors.
- Verify `dir` attribute on the `<html>` tag if troubleshooting RTL issues.

## 5. UI Tips
- **Gradients**: Often used for buttons (`hero-gradient-btn`) and text highlights.
- **Spacing**: Use `gap-4`, `p-6` consistently to maintain rhythm.
- **Images**: Always use Next.js `<Image />` component for optimization. Use `.webp` format when possible.

If you have specific questions about any component or logic, feel free to ask!
