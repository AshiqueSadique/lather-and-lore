# Lather & Lore — Premium Handmade Soap Landing Page

A breathtaking single-page landing site for an artisanal soap brand, built with Next.js 14, Framer Motion, GSAP, Three.js, and Lenis.

## Quick Start

```bash
cd lather-and-lore
npm install
npm run dev
# → http://localhost:3000
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Component-level animations |
| GSAP + ScrollTrigger | Scroll-driven sequences, hero text split |
| Lenis | Buttery smooth scrolling |
| Three.js + React Three Fiber | 3D soap bar hero |
| Lucide React | Icons |

## File Structure

```
app/
  layout.tsx          Root layout — Lenis, custom cursor
  page.tsx            Section composition
  globals.css         Paper grain, typography, base styles

components/
  ui/
    SmoothScroll.tsx  Lenis wrapper + GSAP ScrollTrigger sync
    CustomCursor.tsx  Dot-ring cursor with blend-mode
    Button.tsx        Diagonal-fill hover CTA button
  hero/
    Hero.tsx          Full-viewport hero — GSAP split text, parallax
    SoapModel.tsx     React Three Fiber 3D soap bar
    SteamParticles.tsx Canvas particle steam effect
  sections/
    IngredientsRibbon.tsx   Infinite marquee of botanicals
    TheProcess.tsx          ScrollTrigger-pinned 5-stage storytelling
    ProductCollection.tsx   6-card grid, magnetic hover, product modal
    Testimonials.tsx        Typewriter pull-quotes
    FounderStory.tsx        Split-column with scroll parallax photo
    Newsletter.tsx          Rising suds + floating label form
    Footer.tsx              Giant pinned wordmark, link grid

lib/
  (reserved for shared animation utilities)

public/
  textures/           (place custom grain / noise textures here)
```

## Swapping Real Content

### Images
Replace Unsplash URLs in each component with `next/image` paths pointing to `/public/images/`:
- `components/hero/Hero.tsx` — mobile fallback SVG
- `components/sections/TheProcess.tsx` — STAGES[].image
- `components/sections/ProductCollection.tsx` — PRODUCTS[].image
- `components/sections/FounderStory.tsx` — founder photo

### Copy
All text content lives in plain arrays/constants at the top of each component:
- `PRODUCTS` array in `ProductCollection.tsx`
- `STAGES` array in `TheProcess.tsx`
- `TESTIMONIALS` array in `Testimonials.tsx`
- `STORY_PARAGRAPHS` in `FounderStory.tsx`

### Colors
Defined once in `tailwind.config.ts` and `globals.css` CSS variables:
```
--cream:      #F5EFE6
--olive:      #3D4A2A
--terracotta: #C97B5C
--charcoal:   #1C1A17
--blush:      #E8D5C4
```

### Fonts
Loaded via Google Fonts in `globals.css`. Replace with self-hosted woff2 files for production performance — place them in `/public/fonts/` and update the `@font-face` rules.

## Accessibility

- Semantic HTML throughout (header, nav, main, section, footer, article)
- All interactive elements keyboard-navigable
- Screen reader-only skip link on `<main>`
- `aria-label` on every section and complex interactive widget
- `prefers-reduced-motion` disables heavy animations gracefully
- 3D canvas marked `aria-hidden` with a visible SVG fallback on mobile

## Performance Notes

- Three.js scene is `React.lazy` + `Suspense` — loads after initial paint
- All section images use `next/image` lazy loading
- GSAP ScrollTrigger instances are cleaned up on unmount
- Lenis is disabled when `prefers-reduced-motion: reduce` is set
