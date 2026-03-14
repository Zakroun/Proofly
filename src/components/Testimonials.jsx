import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --color-void:       #0a0812;
    --color-deep:       #110d24;
    --color-plum:       #1e1542;
    --color-violet:     #3d2b8e;
    --color-iris:       #5b3fd4;
    --color-lavender:   #8b6ff5;
    --color-mist:       #c4b5fd;
    --color-frost:      #ede9fe;
    --color-white:      #faf9ff;

    --grad-brand:       linear-gradient(135deg, #5b3fd4 0%, #8b6ff5 60%, #d8b4fe 100%);

    --font-display:     'DM Serif Display', Georgia, serif;
    --font-ui:          'Syne', sans-serif;
    --font-body:        'DM Sans', sans-serif;

    --ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
    --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pf-testi *,
  .pf-testi *::before,
  .pf-testi *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section shell ── */
  .pf-testi {
    position: relative;
    background: var(--color-deep);
    padding: 7rem 1.5rem;
    overflow: hidden;
    font-family: var(--font-body);
  }

  .pf-testi::before,
  .pf-testi::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 140px;
    pointer-events: none;
    z-index: 0;
  }
  .pf-testi::before { top: 0;    background: linear-gradient(to bottom, var(--color-void), transparent); }
  .pf-testi::after  { bottom: 0; background: linear-gradient(to top,   var(--color-void), transparent); }

  /* Noise grain overlay */
  .pf-testi__grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.45;
  }

  .pf-testi__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-testi__orb--a {
    width: 500px; height: 500px;
    top: -80px; left: -100px;
    background: radial-gradient(circle, rgba(61,43,142,0.22) 0%, transparent 70%);
  }
  .pf-testi__orb--b {
    width: 400px; height: 400px;
    bottom: -60px; right: -80px;
    background: radial-gradient(circle, rgba(139,111,245,0.15) 0%, transparent 70%);
  }

  /* ── Inner ── */
  .pf-testi__inner {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4.5rem;
  }

  /* ─────────────────────────────────────────────
     Header
  ───────────────────────────────────────────── */
  .pf-testi__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    max-width: 580px;

    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo);
  }
  .pf-testi__header.is-visible {
    opacity: 1; transform: translateY(0);
  }

  .pf-testi__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.28);
    background: rgba(10,8,18,0.6);
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-lavender);
  }

  .pf-testi__heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }
  .pf-testi__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-testi__sub {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.6);
  }

  /* ─────────────────────────────────────────────
     Marquee tracks
  ───────────────────────────────────────────── */
  .pf-testi__marquee-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    overflow: hidden;
    /* Edge fade masks */
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }

  .pf-testi__track {
    display: flex;
    gap: 1.25rem;
    width: max-content;
    will-change: transform;
  }

  .pf-testi__track--fwd {
    animation: marqueeLeft  42s linear infinite;
  }
  .pf-testi__track--rev {
    animation: marqueeRight 48s linear infinite;
  }

  /* Pause on hover */
  .pf-testi__marquee-wrap:hover .pf-testi__track {
    animation-play-state: paused;
  }

  @keyframes marqueeLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marqueeRight {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }

  /* ─────────────────────────────────────────────
     Testimonial card
  ───────────────────────────────────────────── */
  .pf-testi-card {
    flex-shrink: 0;
    width: 340px;
    padding: 1.75rem;
    border-radius: 20px;
    background: rgba(10,8,18,0.7);
    border: 1px solid rgba(139,111,245,0.12);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    cursor: default;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease-spring);
    position: relative;
    overflow: hidden;
  }

  .pf-testi-card:hover {
    border-color: rgba(139,111,245,0.3);
    box-shadow: 0 12px 40px rgba(0,0,0,0.45), 0 4px 16px rgba(91,63,212,0.2);
    transform: translateY(-4px);
  }

  /* Subtle top gradient line */
  .pf-testi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,111,245,0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .pf-testi-card:hover::before { opacity: 1; }

  /* Quote mark watermark */
  .pf-testi-card::after {
    content: '\u201C';
    position: absolute;
    top: -0.5rem; right: 1.25rem;
    font-family: var(--font-display);
    font-size: 7rem;
    line-height: 1;
    color: rgba(91,63,212,0.12);
    pointer-events: none;
    transition: color 0.3s ease;
  }
  .pf-testi-card:hover::after { color: rgba(91,63,212,0.22); }

  /* ── Stars ── */
  .pf-testi-card__stars {
    display: flex;
    gap: 3px;
    font-size: 0.8rem;
  }
  .pf-testi-card__star {
    color: #f5c542;
  }
  .pf-testi-card__star--empty {
    color: rgba(139,111,245,0.2);
  }

  /* ── Quote text ── */
  .pf-testi-card__quote {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1rem;
    line-height: 1.65;
    color: rgba(237,233,254,0.82);
    position: relative;
    z-index: 1;
    flex: 1;
  }

  /* ── Tag (outcome pill) ── */
  .pf-testi-card__tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    background: rgba(91,63,212,0.15);
    border: 1px solid rgba(91,63,212,0.25);
    color: rgba(139,111,245,0.85);
    width: fit-content;
  }
  .pf-testi-card__tag-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--color-lavender);
  }

  /* ── Author row ── */
  .pf-testi-card__author {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(139,111,245,0.1);
  }

  .pf-testi-card__avatar {
    width: 38px; height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--color-white);
    flex-shrink: 0;
    position: relative;
  }
  /* Ring around avatar */
  .pf-testi-card__avatar::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: var(--grad-brand);
    z-index: -1;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  .pf-testi-card:hover .pf-testi-card__avatar::after { opacity: 1; }

  .pf-testi-card__info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .pf-testi-card__name {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-mist);
    line-height: 1.2;
  }

  .pf-testi-card__role {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
  }

  /* ── Verified badge ── */
  .pf-testi-card__verified {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--font-ui);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(52,211,153,0.7);
  }
  .pf-testi-card__verified svg {
    width: 11px; height: 11px;
  }

  /* ─────────────────────────────────────────────
     Featured spotlight card
  ───────────────────────────────────────────── */
  .pf-testi__spotlight {
    width: 100%;
    max-width: 840px;
    border-radius: 24px;
    border: 1px solid rgba(139,111,245,0.2);
    background: rgba(17,13,36,0.8);
    padding: 3rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2.5rem;
    align-items: center;
    box-shadow: 0 0 0 1px rgba(139,111,245,0.06), 0 24px 64px rgba(0,0,0,0.4);
    position: relative;
    overflow: hidden;

    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.75s var(--ease-out-expo), transform 0.75s var(--ease-out-expo);
  }
  .pf-testi__spotlight.is-visible {
    opacity: 1; transform: translateY(0);
  }

  /* Large decorative quote mark */
  .pf-testi__spotlight::before {
    content: '\u201C';
    position: absolute;
    top: -2rem; left: 2.5rem;
    font-family: var(--font-display);
    font-size: 14rem;
    line-height: 1;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.1;
    pointer-events: none;
  }

  .pf-testi__spotlight-left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .pf-testi__spotlight-stars {
    display: flex;
    gap: 4px;
    font-size: 1rem;
    color: #f5c542;
  }

  .pf-testi__spotlight-quote {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    line-height: 1.6;
    color: rgba(237,233,254,0.88);
  }

  .pf-testi__spotlight-author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pf-testi__spotlight-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--color-white);
    flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(91,63,212,0.3);
  }

  .pf-testi__spotlight-name {
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-mist);
    line-height: 1.2;
  }
  .pf-testi__spotlight-role {
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
  }

  .pf-testi__spotlight-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .pf-testi__spotlight-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.25rem 1.75rem;
    border-radius: 16px;
    background: rgba(30,21,66,0.6);
    border: 1px solid rgba(139,111,245,0.15);
    gap: 0.25rem;
  }

  .pf-testi__spotlight-metric-val {
    font-family: var(--font-display);
    font-size: 2.2rem;
    line-height: 1;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pf-testi__spotlight-metric-lbl {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
    white-space: nowrap;
  }

  /* ─────────────────────────────────────────────
     Trust bar
  ───────────────────────────────────────────── */
  .pf-testi__trust {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    flex-wrap: wrap;
    justify-content: center;

    opacity: 0;
    transition: opacity 0.7s var(--ease-out-expo) 0.2s;
  }
  .pf-testi__trust.is-visible { opacity: 1; }

  .pf-testi__trust-divider {
    width: 1px; height: 32px;
    background: rgba(139,111,245,0.18);
  }

  .pf-testi__trust-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .pf-testi__trust-icon {
    width: 18px; height: 18px;
    color: var(--color-lavender);
    opacity: 0.7;
  }

  .pf-testi__trust-text {
    font-family: var(--font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(196,181,253,0.55);
    letter-spacing: 0.02em;
  }

  .pf-testi__trust-text strong {
    color: var(--color-mist);
    font-weight: 700;
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 720px) {
    .pf-testi { padding: 5rem 1.25rem; }

    .pf-testi__spotlight {
      grid-template-columns: 1fr;
      padding: 2rem;
    }
    .pf-testi__spotlight-right {
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .pf-testi-card { width: 300px; }

    .pf-testi__trust-divider { display: none; }
    .pf-testi__trust { gap: 1.25rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-testi *, .pf-testi *::before, .pf-testi *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .pf-testi__track { animation: none !important; }
    .pf-testi__header,
    .pf-testi__spotlight,
    .pf-testi__trust { opacity: 1 !important; transform: none !important; }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const CheckCircle = () => (
    <svg viewBox="0 0 11 11" fill="none" aria-hidden="true" focusable="false">
        <circle cx="5.5" cy="5.5" r="5" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.6)" strokeWidth="0.8" />
        <path d="M3 5.5l2 2 3-3" stroke="rgba(52,211,153,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StarIcon = ({ empty = false }) => (
    <span className={empty ? "pf-testi-card__star--empty pf-testi-card__star" : "pf-testi-card__star"} aria-hidden="true">★</span>
);

const UsersIcon = () => (
    <svg className="pf-testi__trust-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1 16c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 4a3 3 0 0 1 0 6M17 16c0-2.5-2-4-4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="pf-testi__trust-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5l7 3v5C16 13.5 13 17 9 18c-4-1-7-4.5-7-8.5v-5l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6.5 9.5l2 2 3-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StarBadge = () => (
    <svg className="pf-testi__trust-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5l2 5.5H17l-5 3.5 2 5.5L9 13l-5 3 2-5.5L1 7h6l2-5.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data — expanded testimonials
───────────────────────────────────────────── */
const AVATAR_GRADIENTS = [
    "linear-gradient(135deg,#5b3fd4,#8b6ff5)",
    "linear-gradient(135deg,#7c3aed,#a78bfa)",
    "linear-gradient(135deg,#4338ca,#818cf8)",
    "linear-gradient(135deg,#6d28d9,#c084fc)",
    "linear-gradient(135deg,#3d2b8e,#8b6ff5)",
    "linear-gradient(135deg,#5b21b6,#d8b4fe)",
];

const ROW_ONE = [
    {
        name: "Alice Moreau", role: "Solo Founder, YC W24", initials: "AM", stars: 5,
        quote: "Proofly saved me months of wasted work. Found out nobody wanted my idea in 4 days — best $49 I ever spent.",
        tag: "Saved 3 months", grad: 0,
    },
    {
        name: "Bob Takahashi", role: "Product Manager, Series B", initials: "BT", stars: 5,
        quote: "I now know exactly which ideas are worth building. Our team's decision confidence went through the roof.",
        tag: "4× faster decisions", grad: 1,
    },
    {
        name: "Sara Okonkwo", role: "Indie Hacker", initials: "SO", stars: 5,
        quote: "Easiest landing page builder I've used. Had a live waitlist in under 10 minutes. Zero design skills needed.",
        tag: "Page live in 10 min", grad: 2,
    },
    {
        name: "Dev Patel", role: "CTO, Seed-stage startup", initials: "DP", stars: 5,
        quote: "The analytics are surprisingly deep for a validation tool. We use it before every sprint to prioritise features.",
        tag: "2× sprint velocity", grad: 3,
    },
    {
        name: "Clara Schmidt", role: "Startup Studio, Berlin", initials: "CS", stars: 5,
        quote: "We run 6–8 ideas through Proofly per month. The scoring dashboard alone is worth it — kills bad ideas instantly.",
        tag: "8 ideas/month", grad: 4,
    },
];

const ROW_TWO = [
    {
        name: "Marcus Lee", role: "Angel Investor", initials: "ML", stars: 5,
        quote: "I now require all my portfolio founders to validate with Proofly before seed funding. Data over gut, always.",
        tag: "Portfolio standard", grad: 5,
    },
    {
        name: "Priya Nair", role: "Non-technical Founder", initials: "PN", stars: 5,
        quote: "As someone with zero coding background, Proofly is a superpower. I can test and validate completely on my own.",
        tag: "No code needed", grad: 0,
    },
    {
        name: "Tom Eriksen", role: "Head of Product, SaaS", initials: "TE", stars: 5,
        quote: "Replaced our 3-week 'discovery sprint' with 4 days on Proofly. Same signal quality, 80% less time.",
        tag: "80% time saved", grad: 1,
    },
    {
        name: "Yuki Tanaka", role: "Entrepreneur in Residence", initials: "YT", stars: 4,
        quote: "The lead export to Notion is seamless. Our whole idea pipeline now lives in one place — Proofly to Notion.",
        tag: "Seamless integrations", grad: 2,
    },
    {
        name: "Isabel Cruz", role: "Founder, Bootstrapped", initials: "IC", stars: 5,
        quote: "Killed 2 ideas fast, doubled down on the third. Launched to 800 waitlist subscribers. Proofly made that possible.",
        tag: "800 waitlist sign-ups", grad: 3,
    },
];

/* Spotlight featured testimonial */
const SPOTLIGHT = {
    name: "Rachel Kim",
    role: "Co-Founder & CEO, Fable (Series A)",
    initials: "RK",
    grad: 4,
    stars: 5,
    quote: "Before Proofly, we burned 4 months building a product feature nobody wanted. Now every new idea gets tested in a week. We've cut our build-measure-learn cycle by 80% and our NPS has never been higher — because we only ship things people actually asked for.",
    metric: { val: "80%", lbl: "Faster build-measure-learn" },
    metric2: { val: "4×", lbl: "Increase in feature NPS" },
};

/* ─────────────────────────────────────────────
   Hook
───────────────────────────────────────────── */
function useReveal(ref, opts = {}) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setV(true); obs.disconnect(); }
        }, { threshold: 0.1, ...opts });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return v;
}

/* ─────────────────────────────────────────────
   TestiCard
───────────────────────────────────────────── */
function TestiCard({ t }) {
    return (
        <article className="pf-testi-card" aria-label={`Testimonial from ${t.name}`}>
            <div className="pf-testi-card__stars" aria-label={`${t.stars} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} empty={i >= t.stars} />
                ))}
            </div>

            <blockquote className="pf-testi-card__quote">
                "{t.quote}"
            </blockquote>

            <div className="pf-testi-card__tag">
                <span className="pf-testi-card__tag-dot" aria-hidden="true" />
                {t.tag}
            </div>

            <footer className="pf-testi-card__author">
                <div
                    className="pf-testi-card__avatar"
                    style={{ background: AVATAR_GRADIENTS[t.grad] }}
                    aria-hidden="true"
                >
                    {t.initials}
                </div>
                <div className="pf-testi-card__info">
                    <p className="pf-testi-card__name">{t.name}</p>
                    <p className="pf-testi-card__role">{t.role}</p>
                </div>
                <div className="pf-testi-card__verified" aria-label="Verified user">
                    <CheckCircle />
                    Verified
                </div>
            </footer>
        </article>
    );
}

/* Duplicate cards for seamless loop */
function MarqueeTrack({ cards, reverse = false }) {
    const doubled = [...cards, ...cards];
    return (
        <div className={`pf-testi__track ${reverse ? "pf-testi__track--rev" : "pf-testi__track--fwd"}`}>
            {doubled.map((t, i) => <TestiCard key={`${t.name}-${i}`} t={t} />)}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Testimonials component
───────────────────────────────────────────── */
export default function Testimonials() {
    const headerRef = useRef(null);
    const spotlightRef = useRef(null);
    const trustRef = useRef(null);

    const headerVis = useReveal(headerRef);
    const spotlightVis = useReveal(spotlightRef);
    const trustVis = useReveal(trustRef);

    return (
        <>
            <style>{styles}</style>

            <section className="pf-testi" aria-labelledby="testi-heading">

                <div className="pf-testi__grain" aria-hidden="true" />
                <div className="pf-testi__orb pf-testi__orb--a" aria-hidden="true" />
                <div className="pf-testi__orb pf-testi__orb--b" aria-hidden="true" />

                <div className="pf-testi__inner">

                    {/* Header */}
                    <header
                        ref={headerRef}
                        className={`pf-testi__header ${headerVis ? "is-visible" : ""}`}
                    >
                        <div className="pf-testi__eyebrow" aria-hidden="true">
                            ✦ Social Proof
                        </div>
                        <h2 id="testi-heading" className="pf-testi__heading">
                            Trusted by founders who&nbsp;<em>ship smart</em>
                        </h2>
                        <p className="pf-testi__sub">
                            Over 2,400 founders use Proofly to validate faster, build less,
                            and launch with confidence.
                        </p>
                    </header>

                    {/* Marquee rows */}
                    <div
                        className="pf-testi__marquee-wrap"
                        aria-label="Scrolling testimonials"
                        role="region"
                    >
                        <MarqueeTrack cards={ROW_ONE} />
                        <MarqueeTrack cards={ROW_TWO} reverse />
                    </div>

                    {/* Featured spotlight */}
                    <blockquote
                        ref={spotlightRef}
                        className={`pf-testi__spotlight ${spotlightVis ? "is-visible" : ""}`}
                        aria-label={`Featured testimonial from ${SPOTLIGHT.name}`}
                    >
                        <div className="pf-testi__spotlight-left">
                            <div className="pf-testi__spotlight-stars" aria-label="5 out of 5 stars">
                                {"★★★★★"}
                            </div>
                            <p className="pf-testi__spotlight-quote">"{SPOTLIGHT.quote}"</p>
                            <footer className="pf-testi__spotlight-author">
                                <div
                                    className="pf-testi__spotlight-avatar"
                                    style={{ background: AVATAR_GRADIENTS[SPOTLIGHT.grad] }}
                                    aria-hidden="true"
                                >
                                    {SPOTLIGHT.initials}
                                </div>
                                <div>
                                    <p className="pf-testi__spotlight-name">{SPOTLIGHT.name}</p>
                                    <p className="pf-testi__spotlight-role">{SPOTLIGHT.role}</p>
                                </div>
                            </footer>
                        </div>

                        <div className="pf-testi__spotlight-right" aria-label="Impact metrics">
                            {[SPOTLIGHT.metric, SPOTLIGHT.metric2].map((m) => (
                                <div key={m.val} className="pf-testi__spotlight-metric">
                                    <span className="pf-testi__spotlight-metric-val">{m.val}</span>
                                    <span className="pf-testi__spotlight-metric-lbl">{m.lbl}</span>
                                </div>
                            ))}
                        </div>
                    </blockquote>

                    {/* Trust bar */}
                    <div
                        ref={trustRef}
                        className={`pf-testi__trust ${trustVis ? "is-visible" : ""}`}
                        role="list"
                        aria-label="Trust indicators"
                    >
                        {[
                            { icon: <UsersIcon />, content: <><strong>2,400+</strong> founders</> },
                            { icon: <StarBadge />, content: <><strong>4.9 / 5</strong> avg rating</> },
                            { icon: <ShieldIcon />, content: <><strong>No credit card</strong> required</> },
                        ].map(({ icon, content }, i, arr) => (
                            <>
                                <div key={i} className="pf-testi__trust-item" role="listitem">
                                    {icon}
                                    <span className="pf-testi__trust-text">{content}</span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div key={`div-${i}`} className="pf-testi__trust-divider" aria-hidden="true" />
                                )}
                            </>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}