# ModawalLabs — Brand Design & Visual Guidelines
> **Purpose:** A concise reference for reproducing the current ModawalLabs visual identity. This guide reflects the live homepage style, excluding the products section and products page.

---

## 1. Brand Identity

| Attribute | Value |
|---|---|
| **Brand Name** | ModawalLabs |
| **Tagline** | Stop Overthinking. Start Building Your SaaS. |
| **Sub-tagline** | I help non-tech founders go from idea to live product — without needing technical skills or a big team. |
| **Logo Structure** | Two-part wordmark: "Modawal" in gradient + "Labs" in near-white |
| **Logo — "Modawal"** | `gradient-text` (blue → indigo), `font-bold` |
| **Logo — "Labs"** | near-white, `font-semibold` |
| **Logo Font** | Inter, 700 weight |
| **Voice & Tone** | Direct, confident, builder-focused. Clear, efficient, and approachable for non-technical founders. |

---

## 2. Color Palette

### 2.1 Core Backgrounds

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#0B0F1A` | Page background, hero backdrop |
| `--bg-secondary` | `#0F1629` | Card surfaces, overlays, muted containers |
| `--card-bg` | `rgba(255,255,255,0.03)` | Glassy card fill |
| `--card-hover-bg` | `rgba(255,255,255,0.06)` | Hovered card surface |
| `--border` | `rgba(255,255,255,0.08)` | Cards, panels, subtle dividers |

### 2.2 Primary Accent Scale

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#3B82F6` | Primary buttons, gradients, highlights |
| `--accent-bright` | `#60A5FA` | Secondary accents, gradient midpoints, glow |
| `--accent-glow` | `rgba(59,130,246,0.15)` | Ambient light, shadow layers |
| `--border-accent` | `rgba(59,130,246,0.30)` | Hover borders, outline emphasis |
| `#2563EB` | `blue-600` | Strong button end, emphasis |
| `#818CF8` | `indigo-400` | Gradient endpoint, softer highlights |

### 2.3 Violet / Indigo Additions

| Token | Value | Usage |
|---|---|---|
| `--accent-violet` | `#9F7AEA` | Soft secondary accent |
| `--accent-violet-muted` | `rgba(159,122,234,0.08)` | Light glow, background texture |
| `rgba(159,122,234,0.10)` | `violet-500/10` | Gradient overlays, card accents |
| `rgba(159,122,234,0.20)` | `violet-500/20` | Subtle depth layers |

### 2.4 Text Colors

| Role | Color | Notes |
|---|---|---|
| Primary heading | `#F8FAFC` | Main titles and hero copy |
| Body copy | `#94A3B8` | Paragraphs and descriptive text |
| Muted text | `#475569` | Secondary labels, captions |
| Accent text | `#60A5FA` | Links, badges, emphasis |
| Subtle text | `#CBD5E1` | Secondary UI copy |

---

## 3. Gradients & Light Effects

| Element | CSS | Usage |
|---|---|---|
| Gradient text | `linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #818CF8 100%)` | Headline accents, logo emphasis |
| Primary button | `linear-gradient(135deg, #3B82F6, #2563EB)` | `btn-primary` background |
| Hover overlay | `linear-gradient(135deg, #60A5FA, #3B82F6)` | Hover state overlay |
| Ambient orb | `bg-blue-600/8` | Hero blue glow |
| Violet orb | `bg-violet-600/9` | Soft mid-layer glow |
| Accent orb | `bg-indigo-500/5` | Front glow accent |
| Text overlay blur | `backdrop-blur-md` | Hero copy background |
| Soft vignette | `radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.08), transparent 70%)` | Hero text zone |

---

## 4. Typography

### 4.1 Font Families

| Role | Font | Source | Variable |
|---|---|---|
| Primary UI | Inter | Google Fonts | `--font-inter` |
| Hero display | Playfair Display | Google Fonts | `--font-playfair` |

> Inter is the workhorse across the site. Playfair Display is used selectively for the lead hero heading to add a premium, editorial tone.

### 4.2 Font Weights

| Weight | Usage |
|---|---|
| 400 | Body copy, labels, links |
| 500 | Eyebrow labels, medium emphasis |
| 600 | Button copy, badges, subheads |
| 700 | Section titles, hero headline, card titles |
| 800 | Strong emphasis if needed |

### 4.3 Scale

| Element | Size | Color |
|---|---|---|
| Hero headline | `text-5xl` → `sm:text-6xl` → `md:text-7xl` | white / gradient span |
| Section titles | `text-4xl` → `md:text-5xl` | white |
| Body text | `text-lg` → `text-xl` | `slate-400` |
| Card titles | `text-xl` | white |
| Eyebrow labels | `text-xs` | `blue-400` |
| Footer copy | `text-sm` / `text-xs` | `slate-500` / `slate-600` |

### 4.4 Text Effects

| Style | Notes |
|---|---|
| `.gradient-text` | Gradient text fill for accents |
| `.text-glow` | Soft blue glow for hero accent span |
| `font-playfair` | Use on hero headline only |

---

## 5. Layout & Spacing

### 5.1 Section Structure

| Section | Layout |
|---|---|
| Hero / Playground | Full-viewport shader background with centered copy |
| What I Do | 3-column grid for process pillars |
| Credibility strip | Split content with data, timeline style |
| Designs | Image grid layout |
| Testimonials | 2-column grid with cards |
| Services | 3-column offering cards |
| PSNote | Centered highlight card |
| Contact | 3-column info layout |
| Footer | Responsive row/stack layout |

### 5.2 Spacing

| Token | Value |
|---|---|
| `.section-padding` | `125px 0` |
| Mobile section padding | `89px 0` |
| Container width | `max-w-[1200px]` |
| Side padding | `px-6` |
| Card padding | `p-8` |
| Hero CTA padding | `px-8 py-4` |

### 5.3 Radii

| Radius | Usage |
|---|---|
| `rounded-lg` | Buttons, pills |
| `rounded-xl` | Smaller cards and panels |
| `rounded-2xl` | Primary cards |
| `rounded-3xl` | Hero blur overlay |
| `rounded-full` | Pills, small indicators |

---

## 6. Component Guidelines

### 6.1 Buttons

| Style | Use |
|---|---|
| `.btn-primary` | Main CTA buttons |
| `.btn-outline` | Secondary actions |

### 6.2 Cards

- Use glassy backgrounds with soft blur.
- Keep borders subtle and use hover lift for interactivity.
- Overlay subtle gradients or color washes behind content for depth.

### 6.3 Hero Overlay

- Place hero copy over a full-screen animated shader background.
- Add a very subtle blurred, semi-transparent panel behind the text area.
- Use radial fade edges so the overlay blends into the animated background.

---

## 7. Motion & Interaction

| Pattern | Notes |
|---|---|
| Shader animation | Slow, smooth blue/violet motion |
| Fade in | `fadeInUp` reveal for content |
| Pulse glow | Soft breathing orbs behind hero |
| Hover lift | Subtle elevation on cards/buttons |

---

## 8. Testimonials

- Keep testimonial cards clean and readable.
- Use white heading text and `slate-400` body copy.
- Maintain breathing room around each card.

**Sample testimonial text:**

> “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”

---

## 9. Voice & Messaging

- Speak directly to founders who value speed, clarity, and confidence.
- Use concise, energetic sentences.
- Emphasize outcomes, speed, and simplicity.
- Keep the tone premium but approachable.

---

## 10. Implementation Notes

- Anchor the palette in dark navy with bright blue and violet accents.
- Use gradients and blur subtly, not aggressively.
- Prioritize legibility: strong white headings, soft body tones, subtle overlays.
- Avoid busy textures; keep the system modern and refined.
