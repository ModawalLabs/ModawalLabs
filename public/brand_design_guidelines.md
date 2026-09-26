# ModawalLabs Design System

> The design file behind the ModawalLabs website. Give this to Claude (or any AI builder) with “Build me a site using this design system”, then swap in your own content.
> Stack it was built with: Next.js (App Router), Tailwind CSS v4, `next/font`, `framer-motion`, `lucide-react` icons.

---

## 1. Principles

1. **Trust over flash.** No custom cursors or gimmicks. Atmosphere comes from slow, soft colour fields and a fine film grain, never from loud effects. Surfaces stay calm, hierarchy stays clear, content stays real.
2. **Show, don’t claim.** Real product pages, real screenshots, real videos. No invented stats, ratings or testimonials.
3. **Professional, not techy.** One clean grotesque family on warm paper, set with confident weight and tight tracking, reads like a firm you can trust.
4. **One accent.** Colour comes from the products themselves (covers, screenshots). The interface stays ink-on-paper with a single blue accent.
5. **Accessible by default.** 4.5:1 text contrast, visible focus rings, keyboard-friendly components, motion that respects “reduce motion”.

---

## 2. Colour tokens

Defined once in `globals.css` with Tailwind v4 `@theme`, used as utilities (`bg-paper`, `text-ink-2`, `border-line` …).

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAF9F6` | Page background (warm off-white) |
| `paper-2` | `#F3F1EC` | Alternate bands, cover “plates” |
| `surface` | `#FFFFFF` | Cards, panels, browser frames |
| `ink` | `#141416` | Headlines, primary buttons |
| `ink-2` | `#45454D` | Body copy (≈9:1 on paper) |
| `ink-3` | `#6C6C75` | Labels, captions (≈4.9:1 on paper) |
| `line` | `#E6E3DC` | Hairlines, card borders |
| `line-2` | `#D6D2C9` | Stronger borders, input rings |
| `accent` | `#2B50D8` | Links, eyebrows, emphasis (≈6:1 on paper) |
| `accent-ink` | `#1F3FB3` | Accent hover |
| `accent-soft` | `#EEF1FD` | Icon tiles, subtle highlights |
| `success` | `#1B7F4B` | Check marks, “save” badges |
| `night` | `#121211` | Dark bands (work showcase, contact, footer) |

On `night` surfaces: text `white`, secondary `white/70`, labels `white/55`, accent tint `#AEBCFF`, success tint `#9BE7B4`.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display & headings | **Hanken Grotesk** (variable, 100–900, true italics) | Weight 600, tracking −0.02 to −0.03em. Italic for emphasis words. |
| UI & body | **Hanken Grotesk** | 16–18px body, weight 400–500, line-height 1.6. |

One family everywhere. Load it with `next/font/google` as a CSS variable (`--font-hanken`) and map it in `@theme inline` to both `--font-sans` and `--font-display`.

**Scale**

| Element | Size |
|---|---|
| Hero H1 | `clamp(2.8rem, 7vw, 6rem)`, leading 1.0, centred |
| Section H2 | `clamp(1.9rem, 3.8vw, 3rem)`, leading 1.08 |
| Card title | 20–21px, semibold |
| Body | 16–18px, `ink-2` |
| Eyebrow | 13px, uppercase, tracking 0.16em, `accent` |
| Meta labels | 11.5–13px, uppercase, tracking 0.14em, `ink-3` |

Use `text-balance` on headlines and `text-pretty` on paragraphs. Prices use `tabular-nums`.

---

## 4. Layout & spacing

- Container: `max-w-[74rem]`, side padding 20px (mobile) / 32px (≥640px).
- Section rhythm: `py-24` mobile → `py-32` desktop. Alternate paper, `paper-2` bands and one or two `night` bands for pace.
- Grids: 12 columns on desktop for split layouts (5/7 or 4/8); product grid 2 → 3 → 4 columns.
- Radius: buttons fully rounded; cards 16px; large panels 24px; covers 10px.
- Shadows (soft, warm-neutral):
  - `card`: `0 1px 2px rgb(20 20 22/.04), 0 10px 30px -14px rgb(20 20 22/.16)`
  - `lift`: `0 2px 6px rgb(20 20 22/.06), 0 24px 48px -18px rgb(20 20 22/.3)`
  - `cover`: `0 1px 2px rgb(20 20 22/.12), 0 18px 40px -14px rgb(20 20 22/.5)`

---

## 5. Components

**Atmosphere.** Sections that need depth get an `Aurora` (three blurred colour fields in blue, peach and violet that drift over 20–30 seconds) plus a `.grain` overlay at 4–6% opacity. On dark bands the aurora is dimmer and the grain uses screen blending.

**Header.** A slim glass capsule (44px tall, 48px on phones) floating 12px from the top, centred and only as wide as its content: the wordmark, four section links in 13.5px medium, and a compact black “View products” button inset 6px from the edge. It is lightly frosted at the top of a page and turns more solid after 24px of scroll; while a dark band (marked `data-header-tone="dark"`) passes beneath it, it switches to dark glass with light text and a white button. Hovering the links slides a soft highlight between them. On the home page the button stays hidden while the hero’s own button is on screen, then slides in (the capsule widens with it); both open the catalog, and on the catalog itself the button is left out. On phones the menu opens as a rounded sheet under the capsule, over a dimmed, softly blurred page. Links to sections of the page you are on are plain anchors, so they scroll every time they are clicked.

**Hero stage.** Five covers fanned in an arc, mirrored on a floor lit from below, with three glass chips floating around them. The whole stage tilts a few degrees toward the cursor.

**Section index.** Every home section eyebrow starts with its number in italics, a small dot, then the label.

**Bento tiles.** Feature cards on a 6-column grid (4+2, then 2+4) over a soft aurora. Tiles fade from white to paper with a one-pixel highlight, carry a faint index numeral, and lift with an accent ring on hover (`Spotlight` adds the cursor highlight). Each holds a small living illustration: process windows that rise on hover, a checklist that ticks itself off on scroll, a jargon-to-plain-English card that cycles examples, and a trade-off marker that slides into place.

**Buttons.** Pill shaped, 44–52px tall, pressing down to 97% when clicked.
- Primary: `ink` background, white text, soft shadow.
- Secondary: white with a `line-2` ring.
- On dark: white button, or outline with `white/25` ring.
- The disabled “Coming soon” state uses the secondary style with muted text. Never show a fake buy button.

**Section heading.** Eyebrow (accent, uppercase) → semibold H2 → one-paragraph intro in `ink-2`.

**Product cover.** A portrait 3:4 “book” with hairline ring, cover shadow and a faint sheen, plus a light sweep on hover. It sits on a plate that fades from white to `paper-2` with a one-pixel white highlight on top. Each product keeps its own palette; the site stays neutral around it.

**Product card.** Cover plate → “Part 01” label + price pill on one line → semibold title → one-line subtitle. The whole card is one link, and the plate tilts in 3D toward the cursor with a soft glare (`Tilt`).

**Bundle card.** A dark tile with a violet glow in one corner and a one-pixel border that a soft light travels around (`.glow-border`).

**Browser frame.** Screenshots of real pages inside a minimal window (three grey dots, hairline top bar) so they read as websites.

**Video facade.** Poster image + large white play button; the video only loads on click. Native controls once playing.

**Look inside (showcase).** On the complete-series page: a dark band with aurora and grain. Tabs on the left carry a cover thumbnail, part label and title; the active one is a frosted pill that springs between tabs. The preview sits in a dark device frame that tilts a few degrees toward the cursor, with the product's own accent colour glowing behind it, and cross-fades with a focus pull inside a fixed 8:5 frame. Three dark glass chips (near-black at 85%, hairline ring, a dot in the product's accent) float around the frame with that playbook's stats; dark so they stay legible over the light kit pages. It tours the playbooks every 7 seconds (a hairline progress bar on the active tab) until the visitor clicks or hovers.

**FAQ.** A one-open-at-a-time accordion. Answers expand with a smooth height animation and the “+” rotates into a filled “×”.

**Timeline.** Left hairline with small ink dots, role in semibold, company in `ink-3`.

---

## 6. Motion

Built with `framer-motion`, using one easing curve everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`, a long and confident settle.

- **First paint:** anything on screen at load (the hero, the top of every product and download page) animates in with CSS keyframes that start with the first paint, so it never waits for JavaScript and simply appears without it. Fades start at opacity 0.01 rather than 0, because browsers leave fully transparent content out of paint timing.
- **Hero:** each headline line slides up from behind a mask, then the paragraph, button and byline follow in sequence. The five covers rise into their fan one at a time, and the stage tilts gently toward the cursor in 3D.
- **On scroll:** blocks further down rise about 24px with a slight blur-to-sharp focus pull the first time they enter the viewport. Grids and lists cascade item by item, 60–90ms apart. Without JavaScript they are simply shown.
- **Depth:** media drifts slowly against the scroll (about 20px of parallax), smoothed by a spring.
- **Micro-interactions:** buttons press in on click, arrows nudge on hover, covers lift 6px and catch a light sweep.
- **Ambient:** aurora fields drift on 22–28s loops, chips bob on 6–8s loops, the contact glow breathes over 9s, and the bundle border light completes a lap every 7s.
- **Ticker:** a slow marquee of the playbook titles (70s per loop) that pauses on hover, with its edges masked to transparent.
- **Pointer:** product plates and the hero stage tilt toward the cursor on springs; bento tiles show a radial highlight under it.
- **Numbers:** stats always show their real value on first paint; ones that start below the fold count up from zero over 1.1s when they scroll into view.
- **Page changes:** a quick 0.4s fade and rise between routes, in CSS, replayed on every navigation.
- **Reduced motion:** a global `MotionConfig reducedMotion="user"` switches movement off for visitors who ask for it, and smooth scrolling only applies when motion is allowed.

---

## 7. Imagery

- Product covers and inside pages are rendered from the real product, at 2× resolution, as WebP.
- Portfolio screenshots are captured at 1440×900 (2×) and shown in browser frames.
- Videos are H.264 MP4 with `faststart`, ~4–5 MB for 30 seconds at 1080p, with a WebP poster.
- One human photo in the About section; a small circular avatar in the hero byline.

---

## 8. Voice

- Plain English, second person, short sentences. Confident, never hypey.
- Specific over superlative: “10 interview questions with the red-flag answer” beats “the ultimate hiring guide”.
- No exclamation marks, no fake urgency, no invented numbers.
- No em dashes. Use a comma, colon, full stop or parentheses instead.

---

## 9. Page structure (home)

1. Header: a slim floating glass capsule with the wordmark, section links (Work, About, FAQ, Contact) and “View products” once the hero’s button has scrolled away; it turns dark over dark bands.
2. Hero: aurora and grain, giant two-line headline, one paragraph, **one** CTA, author byline; then the cover stage.
3. Ticker: the seven titles as small letter-spaced uppercase labels with their part numbers in the accent colour, scrolling slowly with faded edges.
4. Products: the first four playbooks as tilting covers with prices, then a “See all playbooks” button to the catalog (which has all seven and the glowing bundle tile); the intro links to the complete series.
5. Principles: four reasons as a bento grid with small animated illustrations.
6. Work: dark band with aurora and grain; each project gets glowing media (video or screenshots) and a short case.
7. About: photo on a stack of prints, story, a pull quote, career timeline, profile links.
8. FAQ: two columns, heading on the left and the accordion on the right.
9. P.S.: a small note offering one tool free, the SaaS Type Classifier from Part 01, which opens in a new tab with a banner leading back to the full playbook.
10. Contact: dark band with aurora; LinkedIn + email, copy-to-clipboard.
11. Footer: dark, link columns, copyright, and the wordmark set huge and faint across the bottom.
