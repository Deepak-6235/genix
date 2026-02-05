# Implementation Plan - Section Scroll-Up Button

## Goal
Implement a feature on the homepage where an "up arrow" button appears when the user scrolls past 50% of a specific section. Clicking the button scrolls the user back to the top of **that active section**.

## Proposed Changes

### 1. New Component: `SectionScrollController`
Create `app/components/SectionScrollController.tsx`.
- **Logic**:
    - Use `IntersectionObserver` to track all elements with a specific class (e.g., `section-track`).
    - Monitor scroll position relative to the active section.
    - If `scrollTop > sectionHeight / 2`, show the button.
    - On click, `section.scrollIntoView({ behavior: 'smooth' })`.
- **UI**:
    - Fixed position button (bottom-right or similar, but scoped to viewport).
    - Styling: Rounded, primary color, up arrow icon.

### 2. Modify `app/page.tsx`
- Import `SectionScrollController`.
- Wrap each main component in a `<section>` or `<div>` with the tracking class/ID.
- Alternatively, modify each sub-component (`Hero`, `AboutUs`, etc.) to forward a ref or expose a class, but wrapping in `page.tsx` is less invasive.

#### Structure in `page.tsx`:
```tsx
<SectionScrollController>
  <section id="hero" className="scroll-section"><Hero /></section>
  <section id="why-choose-us" className="scroll-section"><WhyChooseUs /></section>
  // ... and so on
</SectionScrollController>
```
*Refinement*: Instead of a wrapper component logic, `SectionScrollController` can be a sibling that simply looks for `.scroll-section` elements on mount. This avoids nesting hell.

### 3. Styling
- Ensure sections have `relative` positioning if needed, or just rely on standard flow.
- Ensure the button z-index is high enough.

## Verification Plan

### Manual Verification
1. Open the homepage.
2. Scroll down to the "About Us" section.
3. Scroll past the halfway point of "About Us".
4. Verify an "Up Arrow" button appears.
5. Click the button.
6. Verify the page scrolls smoothly to the top of "About Us".
7. Repeat for "Services" and "Blog" sections.
8. Verify the button disappears when at the top of a section.
