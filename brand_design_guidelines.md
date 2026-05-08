# ModawalLabs — Brand Design & Visual Guidelines
> **Purpose:** LLM-consumable reference for reproducing, extending, or maintaining the ModawalLabs portfolio visual identity across any surface (web, email, docs, social, presentations). Paste this into any AI to generate a template that matches the layout, color scheme, animations, and component patterns of this site.

---

## 1. Brand Identity

| Attribute | Value |
|---|---|
| **Brand Name** | ModawalLabs |
| **Tagline** | Stop Overthinking. Start Building Your SaaS. |
| **Sub-tagline** | I help non-tech founders go from idea to live product — without needing technical skills or a big team. |
| **Logo Structure** | Two-part wordmark: "Modawal" in gradient + "Labs" in near-white |
| **Logo — "Modawal"** | `gradient-text` (blue-400 → blue-500 → indigo-400), `font-bold` |
| **Logo — "Labs"** | `rgba(255,255,255,0.90)`, `font-semibold` |
| **Logo Font** | Inter, 700 weight, `text-lg` / `1.125rem` |
| **Logo Hover** | text transitions to `#60A5FA` (blue-400), `duration-200` |
| **Voice & Tone** | Direct, confident, builder-first. Speaks to non-technical founders — cuts through jargon and gets to the point. Uses short punchy sentences. Contrasts "slow/traditional" vs "fast/AI-powered". |

---

## 2. Color Palette

### 2.1 Background & Surface Colors

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#0B0F1A` | Main page background, `<body>`, `<html>`, navbar transparent state |
| `--bg-secondary` | `#0F1629` | Card surfaces (badge pills, floating overlays, footer) |
| `--card-bg` | `rgba(255,255,255,0.03)` | Default card background (`.card-base`) |
| `--card-hover-bg` | `rgba(255,255,255,0.06)` | Card background on hover |
| Footer background | `#080C17` | Slightly darker than primary, creates visual separation |

### 2.2 Blue Accent Scale (Brand Core)

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--accent` | `#3B82F6` | `blue-500` | Primary accent, gradient start, btn border, glare glow, grid lines |
| `--accent-bright` | `#60A5FA` | `blue-400` | Gradient text midpoint, particle color, icon strokes, hover states, link accents |
| `--accent-glow` | `rgba(59,130,246,0.15)` | — | Card hover glow base, ambient glow circles |
| `--border-accent` | `rgba(59,130,246,0.30)` | — | Card border on hover, scrollbar thumb, btn-outline hover border |
| — | `#2563EB` | `blue-600` | Gradient button end, deeper emphasis |
| — | `#818CF8` | `indigo-400` | Gradient text endpoint, glare overlay |

### 2.3 Blue / Indigo — UI Accent Details

| Hex | Tailwind | Usage |
|---|---|---|
| `rgba(59,130,246,0.05)` | `blue-500/5` | Tag/badge background |
| `rgba(59,130,246,0.10)` | `blue-500/10` | Icon container bg, tag bg darker, section highlight bg |
| `rgba(59,130,246,0.15)` | `blue-500/15` | Card glow shadow layer 1 |
| `rgba(59,130,246,0.20)` | `blue-500/20` | Gradient card overlay (product/pillar cards) |
| `rgba(59,130,246,0.40)` | `blue-500/40` | TiltCard glow ring start, corner dot color |
| `rgba(59,130,246,0.50)` | `blue-500/50` | Scroll indicator gradient, btn-primary border |
| `rgba(59,130,246,0.20)` | `blue-400/20` | Tag/badge border |
| `rgba(99,102,241,0.40)` | `indigo-500/40` | TiltCard glow ring end |

### 2.4 Text Scale

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--text-primary` | `#F8FAFC` | `slate-50` | Headings, card titles, key emphasis |
| `--text-secondary` | `#94A3B8` | `slate-400` | Body text, descriptions, subtitles |
| `--text-muted` | `#475569` | `slate-600` | Copyright, timestamps, minor labels |
| — | `#CBD5E1` | `slate-300` | Secondary body, mobile nav links |
| — | `#64748B` | `slate-500` | Section sub-labels, contact field labels, footer tagline |
| — | `#93C5FD` | `blue-300` | Tag/badge text, product tag text |
| — | `#60A5FA` | `blue-400` | Section eyebrow labels, icon tints, link accents, CTA text |

### 2.5 Borders

| Token | Hex | Usage |
|---|---|---|
| `--border` | `rgba(255,255,255,0.08)` | Default card border, all `.card-base` elements |
| — | `rgba(255,255,255,0.05)` | Dividers, navbar bottom border, footer top border, inner card separators |
| — | `rgba(255,255,255,0.10)` | Floating badge borders, social icon buttons |
| — | `rgba(255,255,255,0.20)` | `.btn-outline` border |
| `--border-accent` | `rgba(59,130,246,0.30)` | Card border hover state |
| — | `rgba(59,130,246,0.20)` | Tag/badge borders |
| — | `rgba(59,130,246,0.40)` | Carousel nav button hover, card hover in products/contact |

### 2.6 Semantic Color Map (Quick Reference)

| Role | Value |
|---|---|
| Page background | `#0B0F1A` |
| Card surface | `rgba(255,255,255,0.03)` |
| Card surface hover | `rgba(255,255,255,0.06)` |
| Primary heading | `#F8FAFC` (white) |
| Body / description text | `#94A3B8` (slate-400) |
| Muted / caption | `#64748B` (slate-500) |
| Primary accent | `#3B82F6` (blue-500) |
| Accent bright | `#60A5FA` (blue-400) |
| Gradient accent | `#818CF8` (indigo-400) |
| Default border | `rgba(255,255,255,0.08)` |
| Accent border | `rgba(59,130,246,0.30)` |

---

## 3. Gradients

| Name | CSS Value | Usage |
|---|---|---|
| **Gradient Text** | `linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #818CF8 100%)` | `.gradient-text` — hero headline accent spans, logo "Modawal", product prices, section title accents |
| **Button Primary** | `linear-gradient(135deg, #3B82F6, #2563EB)` | `.btn-primary` rest state background |
| **Button Primary Hover** | `linear-gradient(135deg, #60A5FA, #3B82F6)` | `.btn-primary::after` fades in on hover |
| **Ambient Orb 1** | `radial, bg-blue-600/8, blur-[120px]` | Hero section top-left glow orb |
| **Ambient Orb 2** | `radial, bg-indigo-600/6, blur-[100px]` | Hero section bottom-right glow orb |
| **Contact Glow** | `bg-blue-600/8, blur-[100px]` | Contact section center ambient glow |
| **TiltCard Glow Ring** | `linear-gradient(to br, blue-500/40, blue-400/20, indigo-500/40), blur-md` | Ambient glow behind tilt cards |
| **Card Bottom Vignette** | `linear-gradient(to top, #0B0F1A/60, transparent)` | Bottom gradient overlay on TiltCard image |
| **Glare Overlay** | `radial-gradient(circle at X% Y%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)` | TiltCard glare — position tracks mouse |

---

## 4. Typography

### 4.1 Font Family

| Role | Family | Source | Variable |
|---|---|---|---|
| **All text** | Inter | Google Fonts (`next/font/google`) | `--font-inter` |

> Single-font system. Inter handles all type roles from display headings to captions. No secondary display font.

### 4.2 Font Weights Used

| Weight | Name | Usage |
|---|---|---|
| 400 | Regular | Body text, descriptions, footer links, nav links (resting), form labels |
| 500 | Medium | Section eyebrow labels, tracking-wide small caps |
| 600 | Semibold | Logo "Labs", buttons, tag/badge text, card company names, nav CTA |
| 700 | Bold | Logo "Modawal", section titles (`h2`), card titles (`h3`), hero headline |
| 800 | Extrabold | Hero headline (`text-7xl` sizes at large breakpoints) |

### 4.3 Type Scale

| Element | Tailwind Size | Weight | Color | Notes |
|---|---|---|---|---|
| **Hero H1 — main line** | `text-5xl` → `sm:text-6xl` → `md:text-7xl` | 700 | `white` | `leading-[1.05] tracking-tight` |
| **Hero H1 — gradient span** | Same as above | 700 | `gradient-text` + `text-glow` | Block-level span below main line |
| **Section H2** | `text-4xl` → `md:text-5xl` | 700 | `white` | Accent span uses `gradient-text` |
| **Contact H2** | `text-4xl` → `md:text-6xl` | 700 | `white` | Larger — focal CTA heading |
| **Card H3** | `text-xl` / `text-base` | 700 | `white` | `text-base` in CredibilityStrip, `text-xl` elsewhere |
| **Section eyebrow** | `text-xs` | 600 | `blue-400` | All caps, `tracking-widest`, pill badge |
| **Body / description** | `text-sm` → `text-lg` | 400 | `slate-400` | `leading-relaxed` |
| **Logo** | `text-lg` | 700 / 600 | gradient + white | `tracking-tight` |
| **Nav links** | `text-sm` | 400 | `slate-400` → `white` hover | `tracking-wide` |
| **Badge / tag pill** | `text-[10px]` → `text-xs` | 600–700 | `blue-300` | `px-2–3 py-0.5–1 rounded-full` |
| **Footer tagline** | `text-sm` | 400 | `slate-500` | |
| **Copyright** | `text-xs` | 400 | `slate-600` | |
| **Price** | `text-2xl` | 700 | `gradient-text` | Product cards |

### 4.4 Text Rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### 4.5 Gradient Text Implementation

```css
.gradient-text {
  background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #818CF8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Text glow companion (used on hero gradient span):
```css
.text-glow {
  text-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
}
```

---

## 5. Spacing & Layout

### 5.1 Core Tokens

| Token | Desktop | Mobile (≤768px) | Usage |
|---|---|---|---|
| `.section-padding` | `100px 0` | `64px 0` | All major section vertical padding |
| `container-max` | `max-w-[1200px]` | Same (with `px-6`) | All section content containers |
| Container side padding | `px-6` (24px) | `px-6` | Consistent horizontal padding |

### 5.2 Border Radii

| Value | Usage |
|---|---|
| `rounded-lg` (8px) | Small buttons, nav CTA, carousel nav buttons |
| `rounded-xl` (12px) | Badges, icon containers, download button in PSNote |
| `rounded-2xl` (16px) | All `.card-base` cards, TiltCard image, contact method cards |
| `rounded-full` | Eyebrow label pills, tag pills, avatar circles, corner dots, social icon buttons |

### 5.3 Grid Layouts

| Section | Layout | Gap | Notes |
|---|---|---|---|
| Hero | `flex-col lg:flex-row`, items-center | `gap-12 lg:gap-16` | Text left, TiltCard right |
| WhatIDo | `grid md:grid-cols-3` | `gap-6` | 3 pillar cards |
| CredibilityStrip | `flex-col lg:flex-row lg:items-stretch` | `gap-12` | TiltCard left, history right |
| Products | Horizontal `flex overflow-x-auto` (carousel) | `gap-5` | Scroll-snap, each card `w-[340px]` |
| Designs | `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | `gap-4` | Aspect ratio `4/3`, 8 items |
| Testimonials | `grid md:grid-cols-2` | `gap-6` | 4 cards in 2-col grid |
| Services | `grid md:grid-cols-3` | `gap-6` | 3 service cards |
| Contact | `grid sm:grid-cols-3` | `gap-4` | 3 contact method cards, centered |
| Footer | `flex flex-col md:flex-row` | `gap-6` | Brand + nav links + social icons |

### 5.4 Component Internal Spacing

| Component | Padding |
|---|---|
| `.card-base` standard | `p-6` (24px) to `p-8` (32px) |
| Products carousel card | `p-7` (28px) |
| Services card | `p-8` (32px) |
| CredibilityStrip history card | `p-6` (24px) |
| WhatIDo pillar card | `p-8` (32px) |
| PSNote card | `p-8 md:p-12` |
| Contact method card | `p-6` (24px) |
| Navbar height | `h-16` (64px) |
| Section eyebrow pill | `px-3 py-1` |
| Primary button (hero) | `px-8 py-4` |
| Primary button (small) | `px-5 py-2` |
| Outline button (hero) | `px-8 py-4` |

---

## 6. Component Patterns

### 6.1 `.card-base` (Core Card System)

```css
.card-base {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}
.card-base:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(59, 130, 246, 0.30);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1);
}
```

Applied to: WhatIDo cards, CredibilityStrip history cards, Products carousel cards, Testimonials cards, Services cards, Contact method cards, PSNote card.

### 6.2 Buttons

**`.btn-primary`**
```css
background: linear-gradient(135deg, #3B82F6, #2563EB);
border: 1px solid rgba(59, 130, 246, 0.5);
transition: all 0.3s ease;
position: relative;
overflow: hidden;
/* ::after pseudo-element: */
background: linear-gradient(135deg, #60A5FA, #3B82F6);
opacity: 0 → 1 on hover;
/* Hover state: */
box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
transform: translateY(-1px);
```
Usage: Hero "View Products", Navbar "Hire Me", Services "Book a Call", PSNote download, Products "Buy Now".

**`.btn-outline`**
```css
border: 1px solid rgba(255, 255, 255, 0.2);
transition: all 0.3s ease;
/* Hover: */
border-color: rgba(59, 130, 246, 0.6);
background: rgba(59, 130, 246, 0.1);
box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
```
Usage: Hero "Hire Me" secondary CTA, Services "Message Me".

> All button text content must be wrapped in a `<span>` inside `.btn-primary` so it sits above the `::after` pseudo-element (`position: relative; z-index: 1`).

### 6.3 Section Eyebrow Label (Universal Pattern)

Every section opens with this pill above the `<h2>`:
```html
<span class="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400
             px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-4">
  Label Text
</span>
```

Labels used: `Process`, `Professional History`, `Products`, `Designs`, `Testimonials`, `Services`, `P.S.`, `Contact`.

### 6.4 Navbar

- `fixed top-0 left-0 right-0 z-50`
- Default: `bg-transparent`
- On scroll (`window.scrollY > 20`): `bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20`
- Transition: `duration-300`
- Links: `text-sm text-slate-400 hover:text-white duration-200 tracking-wide`
- Mobile: hamburger with 3 lines (`h-0.5 w-6 bg-white`), animates to X. Mobile menu is `bg-[#0B0F1A]/95 backdrop-blur-xl`, slides in via `max-h-0 → max-h-80` with `overflow-hidden`.

### 6.5 TiltCard (Orbital 3D Tilt Component)

The site's most distinctive interactive component. Used in Hero and CredibilityStrip sections.

**Outer wrapper:** `relative w-fit {wrapperClassName}` — `w-fit` is critical to prevent glow overflow on mobile.

**Glow ring:** `absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/40 via-blue-400/20 to-indigo-500/40 blur-md pointer-events-none`

**Card element:** `relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F1629] to-[#0B0F1A] cursor-pointer {cardClassName}` with `style={{ transformStyle: "preserve-3d", willChange: "transform" }}`

**Corner dots (4x):** `absolute w-2 h-2 rounded-full bg-blue-500/40` at each corner (`top-3 left-3`, `top-3 right-3`, `bottom-3 left-3`, `bottom-3 right-3`)

**Bottom vignette:** `absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/60 via-transparent to-transparent pointer-events-none`

**Glare overlay:** `absolute inset-0 rounded-2xl pointer-events-none` — background and opacity set via JS

**Animation constants:**
```
AUTO_TILT   = 5°   (orbital auto loop amplitude)
MANUAL_TILT = 7°   (mouse hover amplitude)
GLARE_R     = 28   (glare radial offset %)
ORBIT_MS    = 6000 (one full orbit = 6 seconds)
```

**Orbital loop logic:**
```
rx = sin(angle) * AUTO_TILT
ry = cos(angle) * AUTO_TILT
transform: perspective(1000px) rotateX(rx) rotateY(ry) scale3d(s,s,1)
```
where `s = 1.02` when hovered, `1` otherwise.

**State machine (3 states, direct DOM manipulation — no React setState):**
1. **Auto orbit** — RAF loop runs, `transition: none`
2. **Manual hover** — `isHoveredRef = true`, transition `0.1s linear`, mouse position drives rx/ry
3. **Returning** — `isHoveredRef = false, isReturningRef = true`, transition `0.7s cubic-bezier(0.23, 1, 0.32, 1)`, snaps back to current orbital position. After 750ms, transition clears to `none` and auto-orbit resumes.

**Glare during auto orbit:**
```
gx = 50 + (ry / AUTO_TILT) * GLARE_R
gy = 50 + (-rx / AUTO_TILT) * GLARE_R
opacity: 0.6
```

**Glare during manual hover:**
```
gx = ((mouseX - rect.left) / rect.width) * 100
gy = ((mouseY - rect.top)  / rect.height) * 100
opacity: 1.0
```

**Children (badges/overlays):** Passed as `children` prop and rendered in the outer `relative` wrapper — they stay flat and don't tilt with the card.

### 6.6 Particle Background

Fixed-position full-screen canvas (`position: fixed, inset: 0, z-index: 0, opacity: 0.65, pointer-events-none`). Rendered once in `layout.tsx` body, persists across all sections.

```
Count:     80 particles
Size:      0.4–1.9px radius
Speed:     ±0.25px/frame (very slow drift)
Color:     rgba(96, 165, 250, 0.08–0.43)  [blue-400]
Bounce:    wall-bounce at canvas edges
Connections: drawn when dist < 110px
             strokeStyle: rgba(59, 130, 246, opacity) where opacity = 0.07 × (1 - dist/110)
             lineWidth: 0.5px
```

### 6.7 Grid Background

Applied only to the Hero section:
```css
.grid-bg {
  background-image:
    linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}
```
Used with `opacity-40` class on `absolute inset-0` div.

### 6.8 Section Header Pattern (Most Sections)

```
[eyebrow pill]
<h2> Main Title <span class="gradient-text">Accent Words</span> </h2>
<p class="text-slate-400 text-lg max-w-xl mx-auto"> Subtitle copy </p>
```
Centered (`text-center`) for: WhatIDo, Designs, Testimonials, Services, Contact.
Left-aligned for: Products (with arrow navigation on the right).

### 6.9 Scroll Reveal Pattern

Custom `useScrollReveal` hook (IntersectionObserver, `threshold: 0.15`, fires once):
```tsx
// Usage:
const { ref, isVisible } = useScrollReveal();
// Applied:
className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
```
Staggered children use `style={{ transitionDelay: `${i * 120}ms` }}`.

Framer Motion `useInView` is used instead in Hero (scroll-driven exit) and CredibilityStrip (slide-in from above):
- Hero: `useScroll` + `useTransform` — image fades and drifts at scroll 52–82%
- CredibilityStrip: `useInView` + `initial={{ opacity:0, y:-50 }}` — image slides in from above

### 6.10 Floating Badge Pattern (TiltCard children)

```html
<!-- Example: availability badge -->
<div class="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2
            rounded-xl bg-[#0F1629] border border-white/10 shadow-xl z-10">
  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
  <span class="text-xs text-slate-300 font-medium">Available</span>
</div>
```
Positioned with negative absolute offsets to overlap the card edge. Always `z-10`. Background always `#0F1629` (bg-secondary).

---

## 7. Shadows & Glow

| Name | Value | Usage |
|---|---|---|
| `.glow-blue` | `0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(59,130,246,0.05)` | Static blue glow utility |
| `.glow-blue-hover:hover` | `0 0 40px rgba(59,130,246,0.25), 0 0 80px rgba(59,130,246,0.10)` | Hover-triggered glow |
| `.card-base:hover` | `0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.10)` | Card lift + ring |
| `.btn-primary:hover` | `0 0 30px rgba(59,130,246,0.50)` | Button bloom |
| `.btn-outline:hover` | `0 0 20px rgba(59,130,246,0.20)` | Subtle outline bloom |
| Navbar scrolled | `shadow-lg shadow-black/20` | Navbar elevation |

---

## 8. Motion & Animation

### 8.1 CSS Keyframes

| Animation | Keyframes | Duration | Usage |
|---|---|---|---|
| `fadeInUp` | `opacity:0, translateY(30px)` → `opacity:1, translateY(0)` | `0.7s ease forwards` | Hero text elements (staggered with delay-100 through delay-700) |
| `fadeIn` | `opacity:0` → `opacity:1` | `0.5s ease forwards` | Scroll indicator fade |
| `float` | `translateY(0)` → `translateY(-10px)` → back | `6s ease-in-out infinite` | *(available, not currently active)* |
| `pulse-glow` | `opacity:0.4` → `opacity:0.8` → back | `3s ease-in-out infinite` | Hero ambient orbs (`.animate-pulse-glow`) |

### 8.2 Delay Utilities

`.delay-100` through `.delay-700` at 100ms steps. Used to stagger hero element entry:
- `delay-100`: hero H1
- `delay-200`: hero subtitle
- `delay-300`: hero CTAs
- `delay-700`: scroll indicator

### 8.3 Framer Motion Usage

| Component | Animation | Details |
|---|---|---|
| Hero image (entry) | `initial:{opacity:0, y:20}` → `animate:{opacity:1, y:0}` | `duration:0.6, delay:0.4, ease:"easeOut"` |
| Hero image (scroll exit) | `opacity: 1→0, y: 0→60px` | `useTransform` on scrollYProgress `[0.52, 0.82]` |
| CredibilityStrip image | `initial:{opacity:0, y:-50}` → `animate:{opacity:1, y:0}` | `duration:0.85, ease:[0.23,1,0.32,1]` (triggered by `useInView`) |
| CredibilityStrip eyebrow | `initial:{opacity:0}` → `animate:{opacity:1}` | `duration:0.4, delay:0.3` |
| CredibilityStrip cards | `initial:{opacity:0, y:16}` → `animate:{opacity:1, y:0}` | `duration:0.5, delay: 0.4 + i*0.12, ease:"easeOut"` |

### 8.4 Scroll-Driven Exit (Hero → CredibilityStrip)

The hero TiltCard uses `useScroll` to fade/drift as the user scrolls:
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
const scrollOpacity = useTransform(scrollYProgress, [0.52, 0.82], [1, 0]);
const scrollY       = useTransform(scrollYProgress, [0.52, 0.82], [0, 60]);
// Applied via: <motion.div style={{ opacity: scrollOpacity, y: scrollY }}>
```

### 8.5 Hover Micro-interactions

| Target | Effect |
|---|---|
| `.card-base` | `translateY(-4px)` + blue box-shadow |
| `.btn-primary` | `translateY(-1px)` + glow bloom + `::after` gradient fade-in |
| `.btn-outline` | Border turns blue, bg tints blue |
| Nav links | `text-slate-400 → text-white` |
| Product card H3 | `text-white → text-blue-200` |
| CredibilityStrip card H3 | `text-white → text-blue-100` |
| CredibilityStrip card border | hover: `border-blue-500/30` |
| Designs grid item | `opacity-0 → opacity-100` overlay with icon + title |
| Contact method cards | `border → blue-500/40`, icon container bg intensifies |
| Footer social buttons | `text-slate-500 → text-blue-400`, border/bg tints blue |

---

## 9. Iconography

| Attribute | Value |
|---|---|
| **Style** | Outlined / line icons (Heroicons / custom inline SVG) |
| **Stroke width** | `1.5` (section feature icons, contact icons), `2` (UI icons, checkmarks, nav arrows), `2.5` (PSNote download icon) |
| **Default size** | `28×28` (section icons), `18×18` (card utility icons), `14×14` (checklist items, social), `12×12` (inline link arrows) |
| **Color** | `currentColor` unless specified; feature icons inherit `text-blue-300`, UI icons use `stroke="#60A5FA"` |
| **Linecap / Linejoin** | `round` / `round` |
| **Checkmark color** | `stroke="#60A5FA"` (blue-400) |
| **Quote icon** | `fill="currentColor"`, `text-blue-400/30` |
| **Stars (testimonials)** | `fill="#F59E0B"` (amber-400), `14×14` |

---

## 10. Responsive Breakpoints

| Breakpoint | Key Layout Changes |
|---|---|
| **Base (mobile)** | All sections single-column. Designs grid: 2-col. Hero text centered. TiltCard max `w-[300px] h-[400px]`. |
| **`sm` (640px+)** | Hero CTAs in row. Contact grid: 3-col. TiltCard `w-[340px] h-[440px]`. |
| **`md` (768px+)** | WhatIDo: 3-col. Products header row. Designs: 3-col. Testimonials: 2-col. Services: 3-col. Footer row. Section padding returns to full. |
| **`lg` (1024px+)** | Hero: 2-col flex-row. CredibilityStrip: 2-col flex-row with `items-stretch`. Designs: 4-col. TiltCard Hero `w-[380px] h-[480px]`. CredibilityStrip image `lg:h-full`. |

### TiltCard sizing across breakpoints:

| Context | Base | sm | lg |
|---|---|---|---|
| Hero | `w-[300px] h-[400px]` | `w-[340px] h-[440px]` | `w-[380px] h-[480px]` |
| CredibilityStrip | `w-[300px] h-[400px]` | `w-[340px] h-[440px]` | `w-[380px h-full` (matches content column height) |

---

## 11. Background & Ambient Effects

### 11.1 Hero Ambient Orbs

Two blur circles create a living atmosphere behind the hero:
```html
<!-- Top-left blue orb -->
<div class="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full
            bg-blue-600/8 blur-[120px] animate-pulse-glow pointer-events-none" />
<!-- Bottom-right indigo orb -->
<div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full
            bg-indigo-600/6 blur-[100px] animate-pulse-glow delay-300 pointer-events-none" />
```

### 11.2 Contact Section Glow

```html
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[600px] h-[400px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />
```

### 11.3 Glassmorphism

Used on `.card-base`:
```css
backdrop-filter: blur(12px);
```

Used on navbar (scrolled state):
```css
background: rgba(11, 15, 26, 0.80);
backdrop-filter: blur(24px);  /* backdrop-blur-xl */
```

Used on mobile menu:
```css
background: rgba(11, 15, 26, 0.95);
backdrop-filter: blur(24px);
```

### 11.4 Custom Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0B0F1A; }
::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.30); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.60); }
```

---

## 12. Section-by-Section Design Spec

### 12.1 Navbar
- Fixed, full-width, `z-50`, `h-16`
- Logo left: "Modawal" (gradient) + "Labs" (white/90)
- Nav links center-right: Products, Designs, Services, Contact
- Primary CTA right: "Hire Me" (`btn-primary`)
- Mobile: hamburger → full-width slide-down menu

### 12.2 Hero
- `min-h-screen flex items-center justify-center overflow-hidden`
- Absolute: grid-bg (40% opacity), two ambient orbs
- Content: `max-w-[1200px]`, flex-col → lg:flex-row, `gap-12 lg:gap-16`
- Left: staggered-entry H1 → subtitle → dual CTA buttons
- Right: `motion.div` (entry) wrapping `motion.div` (scroll exit) wrapping `TiltCard`
- TiltCard children: "Available" badge (bottom-left), "4+ yrs experience" badge (top-right)
- Scroll indicator: bottom-left, scroll arrow line + "SCROLL TO EXPLORE"

### 12.3 WhatIDo
- `section-padding`, `border-y border-white/5 bg-white/[0.01]` (subtle separation)
- Centered header: "Process" pill → H2 "From Idea → Launch → Growth" → subtitle
- 3 cards: each with step number (top-left, muted blue), tag pill (top-right), gradient icon container, title, description
- Cards use individual gradient backgrounds (`from-blue-500/20 to-indigo-500/10`, etc.)

### 12.4 CredibilityStrip
- `py-14 border-y border-white/5 bg-white/[0.01]`
- 2-col on lg: `flex-col lg:flex-row lg:items-stretch gap-12`
- Left: `motion.div` sliding in from above → TiltCard with "Hey There!" badge (bottom-center, `-bottom-4`)
- Right: "PROFESSIONAL HISTORY" eyebrow → 4 stacked `.card-base` cards, each with role (bold white), tag pill, company (blue-400), description (slate-400)
- Cards stagger: `delay: 0.4 + i * 0.12`

### 12.5 Products
- Horizontal scroll carousel with `scroll-snap-type: x mandatory`
- Header: left-aligned title + right-aligned left/right arrow buttons
- Cards: `w-[340px] flex-none`, tag + emoji icon, title, tagline, feature checklist, price + "Buy Now"
- Arrow buttons: `w-11 h-11 rounded-xl border border-white/10`

### 12.6 Designs
- `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
- Each card: `aspect-[4/3] rounded-2xl overflow-hidden`, gradient background + fake UI skeleton elements
- Category badge: `absolute top-3 right-3`, `bg-black/30 backdrop-blur-sm`
- Hover: full overlay `bg-[#0B0F1A]/80 backdrop-blur-sm` with centered icon + title/category
- Scale entry animation: `opacity-0 scale-95` → `opacity-100 scale-100`, staggered `i * 60ms`
- CTA link below grid: "Want to see more? Let's connect →"

### 12.7 Testimonials
- 2-col grid, 4 cards
- Each card: quote SVG icon (blue-400/30), quote text (slate-200, font-medium), `border-t` separator, gradient avatar circle + name + role + 5 amber stars

### 12.8 Services
- 3-col grid
- Each card: gradient bg overlay (`absolute inset-0`), icon container, title, description, feature checklist, price/duration row, dual CTA buttons
- "Most Requested" badge: `absolute top-0 right-0`, `bg-blue-500`, `rounded-bl-xl rounded-tr-2xl`
- "Limited slots" amber banner in section header

### 12.9 PSNote
- `section-padding`, single full-width `.card-base` card (`max-w-[1200px]`)
- "P.S." eyebrow pill
- 6 paragraphs of copy with mixed `text-slate-200` / `text-slate-400` / `text-white font-semibold` weights
- Horizontal dividers `h-px bg-white/5` separating body → download CTA → closing line
- Download button: `btn-primary` with download SVG icon + text
- Closing: slate-400 → white `font-medium` inline emphasis

### 12.10 Contact
- Centered, `max-w-2xl`
- Large H2 (`text-4xl md:text-6xl`) with `text-glow` gradient span
- 3-col grid of contact method cards: Email (clipboard copy with "✓ Copied!" feedback), LinkedIn, Upwork
- Each card: icon container + label + value + action hint (blue-400)
- Ambient center glow in section background

### 12.11 Footer
- `border-t border-white/5 bg-[#080C17]`
- Flex row: Brand (logo + tagline) | Nav links (Products, Designs, Services, Contact) | Social icons (LinkedIn, Upwork, Stack Overflow)
- Social icons: `w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03]`
- Bottom bar: `border-t border-white/5`, copyright text `text-xs text-slate-600`

---

## 13. Tech Stack & Implementation

| Layer | Choice |
|---|---|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 (`@import "tailwindcss"` — no `tailwind.config.js`) |
| **Animation** | Framer Motion (`motion`, `useScroll`, `useTransform`, `useInView`) |
| **Font** | `next/font/google` — Inter, variable `--font-inter` |
| **Images** | `next/image` with `fill`, `object-cover object-top` |
| **Scroll detection** | Custom `useScrollReveal` hook (IntersectionObserver, threshold 0.15, once) |
| **60fps animations** | Direct DOM manipulation via `ref.current.style.transform` — no `setState` |
| **Particle canvas** | HTML5 Canvas via `useRef<HTMLCanvasElement>`, fixed-position in `layout.tsx` |
| **Scroll snap** | Native CSS `scroll-snap-type: x mandatory` / `scroll-snap-align: start` |

### CSS Variable Reference

```css
:root {
  --bg-primary:    #0B0F1A;
  --bg-secondary:  #0F1629;
  --accent:        #3B82F6;
  --accent-bright: #60A5FA;
  --accent-glow:   rgba(59, 130, 246, 0.15);
  --border:        rgba(255, 255, 255, 0.08);
  --border-accent: rgba(59, 130, 246, 0.3);
  --text-primary:  #F8FAFC;
  --text-secondary:#94A3B8;
  --text-muted:    #475569;
  --card-bg:       rgba(255, 255, 255, 0.03);
  --card-hover-bg: rgba(255, 255, 255, 0.06);
}
```

---

## 14. Design Principles Summary

1. **Dark-first, always** — Every surface is dark (`#0B0F1A` base). No light-mode. No switching. The darkness is the brand.
2. **Electric blue on black** — Single accent hue (blue-400 through blue-600) against deep navy creates maximum contrast and premium feel without visual noise.
3. **Glassmorphism as depth** — `backdrop-filter: blur(12px)` on all cards creates layered depth without heavy shadows. The blur is subtle, not frosted.
4. **Motion with restraint** — Entry animations on scroll, orbital tilt on images, particle field in background. Nothing blinks, bounces, or fights for attention. All motion serves the content.
5. **Orbital tilt as signature** — The 3D tilt effect on profile images is the site's most distinctive visual element. Auto-orbits infinitely, responds to mouse, returns smoothly. Zero React state used for performance.
6. **Typography hierarchy through weight** — Single font (Inter) across all type. Size and weight differentiation alone create the hierarchy — no display typeface needed.
7. **Founder-first copy** — Short sentences. Direct calls-to-action. Personal P.S. section proves the methodology. Credibility established through work history and testimonials, not credentials.
8. **Consistent container width** — All sections use `max-w-[1200px] mx-auto px-6`. Visual alignment is absolute across every section.
