# Implementation Plan - Integrate AOS Animation Library

The user wants to add "Animate On Scroll" (AOS) animations to all components in the application.

## User Review Required
- None.

## Proposed Changes

### Dependencies
- Install `aos` and `@types/aos`.

### Components
#### [NEW] [AOSInit.tsx](file:///c:/users/bairuha%20tech/genix/app/components/AOSInit.tsx)
- Create a client component `AOSInit` to handle `AOS.init()`.
- This avoids making `layout.tsx` a client component if it isn't already, or keeps the logic clean.
- Include `import 'aos/dist/aos.css';`

#### [MODIFY] [layout.tsx](file:///c:/users/bairuha%20tech/genix/app/layout.tsx)
- Import and include `<AOSInit />` within the `<body>`.

#### [MODIFY] [Header.tsx](file:///c:/users/bairuha%20tech/genix/app/components/Header.tsx)
- Add `data-aos="fade-down"` to the navbar.

#### [MODIFY] [Hero.tsx] (and other components)
- Systematically add `data-aos` attributes to main containers and children elements (cards, titles, images).
- Use `fade-up`, `fade-right`, `fade-left`, `zoom-in` as appropriate.
- List of components to update:
    - `Hero`
    - `AboutUs` / `AboutUsContent`
    - `WhyChooseUs`
    - `Services` / `ServicesContent`
    - `Statistics`
    - `Testimonials`
    - `Blog` / `BlogContent`
    - `Contact` / `ContactContent`
    - `Footer`

## Verification Plan
### Manual Verification
- Run `npm run dev`.
- Scroll through the homepage and verifying animations trigger correctly.
- Navigate to inner pages (Services, About, Contact) and verify animations.
