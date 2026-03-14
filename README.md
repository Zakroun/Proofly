# Proofly — Validate Your Startup Ideas Before Building

> A production-grade SaaS platform that helps founders test ideas with landing pages, audience feedback, and analytics — before writing a single line of product code.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + React Router DOM |
| Styling | Component-scoped CSS via template literals (`const styles = \`...\``) |
| Fonts | DM Serif Display · Syne · DM Sans (Google Fonts) |
| Icons | Inline SVG components (zero external icon dependencies) |
| Animations | CSS keyframes + IntersectionObserver scroll-reveals |
| Auth Pages | React state-driven multi-mode forms (login / signup / forgot) |

---

## Project Structure

```
src/
├── auth/                        # Authentication pages
│   ├── ForgotPassword.jsx
│   ├── Login.jsx                # Multi-mode: login · signup · forgot password
│   ├── Register.jsx
│   └── ResetPassword.jsx
│
├── components/                  # Reusable landing page sections
│   ├── FAQ.jsx                  # Accordion FAQ section
│   ├── Features.jsx             # Tabbed feature showcase with mock UIs
│   ├── Hero.jsx                 # Full-viewport hero with parallax blobs
│   ├── Pricing.jsx              # 3-plan pricing cards with billing toggle
│   ├── Services.jsx             # 4-card services grid
│   ├── Testimonials.jsx         # Dual-row infinite marquee + spotlight card
│   └── WhyProofly.jsx           # Asymmetric bento grid with proof stats
│
├── layout/                      # Persistent layout wrappers
│   ├── Footer.jsx               # 4-tier footer: CTA band · newsletter · links · bottom bar
│   └── Navbar.jsx               # Fixed navbar with scroll-aware frosted glass
│
├── pages/                       # Full standalone pages
│   ├── Contact.jsx              # Split-panel contact form with drag-and-drop attachment
│   ├── Features.jsx             # Full features page: deep-dives · bento · integrations · timeline
│   └── Pricing.jsx              # Full pricing page: hero · plans · table · FAQ · testimonials
│
├── styles/                      # Per-component CSS files (mirrors component structure)
│   ├── About.css
│   ├── auth.css
│   ├── Contact.css
│   ├── FAQ.css
│   ├── Features.css
│   ├── FeaturesPage.css
│   ├── Footer.css
│   ├── Hero.css
│   ├── Navbar.css
│   ├── Pricing.css
│   ├── PricingPage.css
│   ├── Services.css
│   ├── Testimonials.css
│   └── WhyProofly.css
│
├── data/                        # Static data / content constants
├── App.jsx                      # Root component + route definitions
└── index.css                    # Global resets and CSS variables
```

---

## Components

Every component is **fully self-contained** — all CSS is injected via an inline `<style>{styles}</style>` tag inside the component, meaning components are portable and require no external stylesheet imports to render correctly.

### `components/Hero.jsx`
The page opener. Full-viewport dark section with:
- Mouse-tracking parallax ambient blobs via `mousemove`
- Staggered entrance animations (badge → headline → sub → CTAs → proof strip)
- Gradient `DM Serif Display` italic headline word
- Avatar stack + star rating social proof
- Animated scroll-hint line

### `components/Navbar.jsx`
Fixed top navigation bar with:
- Transparent-to-frosted-glass scroll transition
- Gliding hover pill indicator (tracks cursor across nav links via `getBoundingClientRect`)
- Hamburger → X morph animation for mobile
- Full-height mobile drawer with body scroll lock and Escape key dismiss
- `aria-current="page"` active link detection via `useLocation`

### `components/Services.jsx`
Four-card services grid with:
- IntersectionObserver scroll-reveal with staggered delays
- Hover sheen sweep (`::before` gradient transition)
- Gradient corner accent (`::after`)
- Feature tag pills and inline "Learn more" arrow links

### `components/WhyProofly.jsx`
Asymmetric 12-column bento grid with:
- Four cards each with a unique footer variant: stat callout, animated progress bars, comparison checklist
- Per-card accent colour system via `data-accent` CSS custom properties
- Decorative diagonal corner lines (inline SVG)
- Radial glow per card that intensifies on hover
- Three-card testimonial strip with independent scroll observer

### `components/Features.jsx`
Interactive tabbed showcase with:
- Five feature tabs auto-advancing every 4.5 seconds
- CSS `@keyframes tabFill` progress bar in sync with the timer
- Five unique mock UI slide components (form builder, lead list, analytics chart, priority board, export panel)
- Fake browser chrome (traffic-light dots + URL bar) for product realism
- Stats strip revealed by its own IntersectionObserver

### `components/Testimonials.jsx`
Three-tier social proof section with:
- Dual infinite marquee rows running in opposite directions (10 cards each, pauses on hover)
- Edge fade masks via CSS `mask-image`
- Featured spotlight `<blockquote>` with two impact metric cards
- Trust bar (founder count · avg rating · no credit card)
- Grain texture overlay using inline SVG `feTurbulence` filter

### `components/Pricing.jsx`
Three-plan pricing section with:
- Monthly / Annual billing toggle (`role="switch"`, spring-animated thumb)
- Pro card elevated with gradient top border, corner glow, and "Most Popular" badge
- Expandable comparison table via `max-height` CSS transition
- Accordion FAQ (4 items) with full ARIA wiring
- `aria-live="polite"` on saving note for screen-reader announcements

---

## Layout

### `layout/Navbar.jsx`
See [Navbar component](#componentsnavbarjsx) above. Used as a persistent wrapper in `App.jsx`.

### `layout/Footer.jsx`
Four-tier footer with:
- **CTA band** — gradient glow, contrarian headline, proof chips
- **Newsletter strip** — controlled form with email validation + success state
- **Link grid** — 4-column layout (Brand · Product · Company · Resources)
- **Bottom bar** — legal links, copyright, SOC 2 indicators
- Decorative oversized watermark wordmark in brand gradient at `opacity: 0.04`
- Animated status dot ("All systems operational")
- Social icon buttons (Twitter/X, LinkedIn, GitHub, Product Hunt)

---

## Pages

### `pages/Contact.jsx`
Full contact page with a two-column split layout:
- **Left panel** — heading, response-time badge, three contact method cards (Email · Live Chat · Book a Call), social buttons
- **Right panel** — branded form card with:
  - Topic selector (6 pill buttons with `aria-pressed`)
  - Full validation with per-field error messages (`role="alert"`)
  - Character counter with three colour states (default → warning → limit)
  - Drag-and-drop file attachment zone
  - Custom-styled checkbox consent with CSS-only check mark
  - Loading spinner → success overlay with spring animation
  - "Send another message" reset button

### `pages/Features.jsx` (`FeaturesPage.jsx`)
Full features page with six zones:
1. **Hero** — stat bar (4 metrics), dual CTA buttons
2. **Six alternating deep-dives** — each with text + mock UI preview, bullets, and a "Learn more" link. Layout alternates sides via CSS `direction: rtl`
3. **Bento capabilities** — 12-column asymmetric grid with 6 capability cards; the 6th spans full width with metrics
4. **Integrations** — 4×2 grid of 8 integrations with Live / Soon / Pro+ / Enterprise tags
5. **Workflow timeline** — vertical `position: absolute` line, 5 numbered steps with `translateX` scroll reveals
6. **CTA band** — gradient-bordered card with proof chips

### `pages/Pricing.jsx` (`PricingPage.jsx`)
Full pricing page with six zones:
1. **Hero** — billing toggle, social proof row
2. **Plans grid** — 3 cards with staggered reveal, the Pro card lifted `translateY(-10px)`
3. **Feature marquee** — 12-chip infinite scroll strip (hidden from screen readers)
4. **Comparison table** — grouped by category (Core · Analytics · Exports · Team), Pro column persistently highlighted
5. **Testimonials** — 3 plan-specific quotes with spring reveal
6. **FAQ** — 6 questions with accordion pattern and ARIA roles

---

## Auth Pages

### `auth/Login.jsx`
Multi-mode auth page (login · signup · forgot password) in a full-viewport split layout:
- **Left panel** — brand headline, 3 proof stat cards, pull-quote testimonial
- **Right panel** — auth card with:
  - Google + GitHub OAuth buttons (inline SVG brand icons)
  - Mode switching with field clear + email auto-focus
  - Show/hide password toggle (`aria-pressed`)
  - Password strength meter (4-level: Weak → Fair → Good → Strong) with `aria-live`
  - "Remember me" checkbox with CSS-only check mark
  - Global error banner (`role="alert"`, `aria-live="assertive"`)
  - Forgot password flow with animated success confirmation
  - Security note (256-bit SSL + SOC 2)
  - Demo credential hint in error state

### `auth/Register.jsx`
Dedicated registration page.

### `auth/ForgotPassword.jsx`
Standalone forgot-password page.

### `auth/ResetPassword.jsx`
Password reset page (token-based).

---

## Styling Architecture

Each component keeps its CSS inside a `const styles = \`...\`` template literal, injected via `<style>{styles}</style>`. This means:

- **No CSS import required** — components are self-contained and portable
- **No class name collisions** — all classes are prefixed per component (e.g. `.pf-hero__`, `.pf-nav__`, `.pf-pricing__`)
- **Design tokens** — all colours, gradients, and fonts are defined as CSS custom properties in `:root` inside each component, following the shared Proofly palette

The `styles/` directory contains the equivalent per-component `.css` files if you prefer to split styles out.

### Design Token Reference

```css
--color-void:     #0a0812   /* Page background          */
--color-deep:     #110d24   /* Section background        */
--color-plum:     #1e1542   /* Card background           */
--color-violet:   #3d2b8e   /* Mid-tone purple           */
--color-iris:     #5b3fd4   /* Primary brand             */
--color-lavender: #8b6ff5   /* Accent / icon colour      */
--color-mist:     #c4b5fd   /* Text on dark              */
--color-frost:    #ede9fe   /* Light text / headings     */
--color-white:    #faf9ff   /* Near-white                */

--grad-brand:     linear-gradient(135deg, #5b3fd4 0%, #8b6ff5 60%, #d8b4fe 100%)

--font-display:   'DM Serif Display'   /* Editorial headings   */
--font-ui:        'Syne'               /* Buttons, labels, nav */
--font-body:      'DM Sans'            /* Body copy, inputs    */
```

---

## Accessibility

All components are built to WCAG 2.1 AA standards:

- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>`, `<blockquote>`)
- `aria-label` / `aria-labelledby` on every interactive region
- `aria-current="page"` on active nav links
- `role="alert"` + `aria-live="assertive"` on error messages
- `role="status"` + `aria-live="polite"` on success states and dynamic counters
- `aria-expanded` + `aria-controls` on all accordion / drawer toggles
- `role="switch"` + `aria-checked` on billing and toggle inputs
- `aria-hidden="true"` on all decorative SVGs and visual-only elements
- `:focus-visible` rings on every interactive element (keyboard navigable)
- `prefers-reduced-motion` media query guard on all animations

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Required Dependencies

```bash
npm install react-router-dom
```

Google Fonts are loaded via `@import` inside each component's style block — no additional font setup required.

---

## Colour & Font Imports

Fonts are loaded automatically when any component mounts via:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
```

For production, move this import to `index.css` to prevent duplicate font requests.

---

## License

MIT © 2026 Proofly, Inc.