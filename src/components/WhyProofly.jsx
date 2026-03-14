import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

  .pf-why *,
  .pf-why *::before,
  .pf-why *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section shell ── */
  .pf-why {
    position: relative;
    background: var(--color-deep);
    padding: 7rem 1.5rem;
    overflow: hidden;
    font-family: var(--font-body);
  }

  /* Top / bottom edge fades to blend with adjacent sections */
  .pf-why::before,
  .pf-why::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 120px;
    pointer-events: none;
    z-index: 0;
  }
  .pf-why::before {
    top: 0;
    background: linear-gradient(to bottom, var(--color-void), transparent);
  }
  .pf-why::after {
    bottom: 0;
    background: linear-gradient(to top, var(--color-void), transparent);
  }

  /* ── Dot-grid texture ── */
  .pf-why__dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(139,111,245,0.12) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Ambient orbs ── */
  .pf-why__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-why__orb--a {
    width: 480px; height: 480px;
    top: -120px; right: -80px;
    background: radial-gradient(circle, rgba(91,63,212,0.22) 0%, transparent 70%);
  }
  .pf-why__orb--b {
    width: 360px; height: 360px;
    bottom: -60px; left: -60px;
    background: radial-gradient(circle, rgba(139,111,245,0.15) 0%, transparent 70%);
  }

  /* ── Inner container ── */
  .pf-why__inner {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }

  /* ─────────────────────────────────────────────
     Header
  ───────────────────────────────────────────── */
  .pf-why__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    max-width: 600px;
  }

  .pf-why__eyebrow {
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

  .pf-why__eyebrow-icon {
    width: 14px;
    height: 14px;
    color: var(--color-lavender);
    opacity: 0.7;
  }

  .pf-why__heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }

  .pf-why__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-why__sub {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.6);
  }

  /* ─────────────────────────────────────────────
     Bento layout
  ───────────────────────────────────────────── */
  .pf-why__bento {
    display: grid;
    width: 100%;
    gap: 1.25rem;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto;
  }

  /* Card slot positions */
  .pf-why-card:nth-child(1) { grid-column: 1 / 6;  grid-row: 1; }
  .pf-why-card:nth-child(2) { grid-column: 6 / 13; grid-row: 1; }
  .pf-why-card:nth-child(3) { grid-column: 1 / 8;  grid-row: 2; }
  .pf-why-card:nth-child(4) { grid-column: 8 / 13; grid-row: 2; }

  /* ─────────────────────────────────────────────
     Individual card
  ───────────────────────────────────────────── */
  .pf-why-card {
    position: relative;
    border-radius: 22px;
    padding: 2.5rem 2.25rem 2rem;
    background: rgba(10,8,18,0.6);
    border: 1px solid rgba(139,111,245,0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: 280px;

    /* Reveal */
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity  0.7s var(--ease-out-expo),
      transform 0.7s var(--ease-out-expo),
      border-color 0.35s ease,
      box-shadow 0.35s ease;
  }

  .pf-why-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .pf-why-card:hover {
    border-color: rgba(139,111,245,0.28);
    box-shadow:
      0 0 0 1px rgba(139,111,245,0.06),
      0 20px 60px rgba(0,0,0,0.5),
      0 4px 20px rgba(91,63,212,0.18);
  }

  /* Per-card accent color via CSS custom property */
  .pf-why-card[data-accent="rocket"] {
    --card-accent: #7c6af5;
    --card-glow:   rgba(124,106,245,0.22);
  }
  .pf-why-card[data-accent="chart"] {
    --card-accent: #a78bfa;
    --card-glow:   rgba(167,139,250,0.18);
  }
  .pf-why-card[data-accent="shield"] {
    --card-accent: #818cf8;
    --card-glow:   rgba(129,140,248,0.2);
  }
  .pf-why-card[data-accent="clock"] {
    --card-accent: #c084fc;
    --card-glow:   rgba(192,132,252,0.18);
  }

  /* Radial glow that follows the card accent */
  .pf-why-card__glow {
    position: absolute;
    top: -60px;
    left: -60px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--card-glow, rgba(91,63,212,0.18)) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transition: opacity 0.4s ease;
    opacity: 0.7;
  }
  .pf-why-card:hover .pf-why-card__glow {
    opacity: 1;
  }

  /* Top-right decorative lines */
  .pf-why-card__lines {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 120px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.18;
    transition: opacity 0.3s ease;
  }
  .pf-why-card:hover .pf-why-card__lines {
    opacity: 0.32;
  }

  /* ── Icon ── */
  .pf-why-card__icon-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pf-why-card__icon-wrap {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: rgba(30,21,66,0.9);
    border: 1px solid rgba(139,111,245,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--card-accent, var(--color-lavender));
    transition: background 0.3s ease, border-color 0.3s ease, transform 0.35s var(--ease-spring);
    flex-shrink: 0;
  }
  .pf-why-card__icon-wrap svg {
    width: 22px;
    height: 22px;
  }
  .pf-why-card:hover .pf-why-card__icon-wrap {
    background: rgba(61,43,142,0.6);
    border-color: rgba(139,111,245,0.4);
    transform: scale(1.1) rotate(-5deg);
  }

  /* Index badge */
  .pf-why-card__index {
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: rgba(139,111,245,0.28);
    transition: color 0.3s ease;
  }
  .pf-why-card:hover .pf-why-card__index {
    color: rgba(139,111,245,0.5);
  }

  /* ── Body ── */
  .pf-why-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    flex: 1;
  }

  .pf-why-card__title {
    font-family: var(--font-ui);
    font-size: 1.12rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-frost);
    line-height: 1.25;
    transition: color 0.2s ease;
  }
  .pf-why-card:hover .pf-why-card__title {
    color: var(--color-white);
  }

  .pf-why-card__desc {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.55);
  }

  /* ── Stat callout (optional per card) ── */
  .pf-why-card__stat {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(139,111,245,0.1);
  }

  .pf-why-card__stat-value {
    font-family: var(--font-display);
    font-size: 2.4rem;
    line-height: 1;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-why-card__stat-label {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(196,181,253,0.5);
    line-height: 1.4;
    max-width: 140px;
  }

  /* ── Progress bar ── */
  .pf-why-card__bar-wrap {
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(139,111,245,0.1);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pf-why-card__bar-label {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: rgba(139,111,245,0.55);
    text-transform: uppercase;
  }

  .pf-why-card__bar-track {
    height: 4px;
    border-radius: 999px;
    background: rgba(61,43,142,0.3);
    overflow: hidden;
  }

  .pf-why-card__bar-fill {
    height: 100%;
    border-radius: 999px;
    background: var(--grad-brand);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1.1s var(--ease-out-expo);
  }

  .pf-why-card.is-visible .pf-why-card__bar-fill {
    transform: scaleX(1);
  }

  /* ── Comparison list ── */
  .pf-why-card__compare {
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(139,111,245,0.1);
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .pf-why-card__compare-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(196,181,253,0.55);
  }

  .pf-why-card__compare-row svg {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
  }

  .pf-why-card__compare-row--good {
    color: rgba(196,181,253,0.75);
  }

  .pf-why-card__compare-row--bad {
    color: rgba(196,181,253,0.32);
    text-decoration: line-through;
    text-decoration-color: rgba(139,111,245,0.25);
  }

  /* ─────────────────────────────────────────────
     Divider between sections
  ───────────────────────────────────────────── */
  .pf-why__divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,111,245,0.2) 30%, rgba(139,111,245,0.2) 70%, transparent);
  }

  /* ─────────────────────────────────────────────
     Testimonial strip
  ───────────────────────────────────────────── */
  .pf-why__testimonials {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .pf-why__testimonial {
    padding: 1.75rem;
    border-radius: 18px;
    border: 1px solid rgba(139,111,245,0.1);
    background: rgba(10,8,18,0.5);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s var(--ease-out-expo), transform 0.65s var(--ease-out-expo);
  }

  .pf-why__testimonial.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .pf-why__testimonial-stars {
    display: flex;
    gap: 3px;
    color: #f5c542;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
  }

  .pf-why__testimonial-quote {
    font-family: var(--font-display);
    font-size: 1rem;
    font-style: italic;
    line-height: 1.6;
    color: rgba(237,233,254,0.8);
    flex: 1;
  }

  .pf-why__testimonial-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pf-why__testimonial-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--grad-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--color-white);
    flex-shrink: 0;
  }

  .pf-why__testimonial-name {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-mist);
    line-height: 1.2;
  }

  .pf-why__testimonial-role {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 900px) {
    .pf-why__bento {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
    .pf-why-card:nth-child(1),
    .pf-why-card:nth-child(2),
    .pf-why-card:nth-child(3),
    .pf-why-card:nth-child(4) {
      grid-column: span 1;
      grid-row: auto;
    }
    .pf-why__testimonials {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 580px) {
    .pf-why {
      padding: 5rem 1.25rem;
    }
    .pf-why__bento {
      grid-template-columns: 1fr;
    }
    .pf-why-card:nth-child(n) {
      grid-column: 1 / -1;
      grid-row: auto;
      min-height: unset;
    }
    .pf-why-card {
      padding: 1.75rem 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-why *, .pf-why *::before, .pf-why *::after {
      transition-duration: 0.01ms !important;
    }
    .pf-why-card,
    .pf-why__testimonial {
      opacity: 1 !important;
      transform: none !important;
    }
    .pf-why-card__bar-fill {
      transform: scaleX(1) !important;
    }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const RocketIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 2C12 2 7 6 7 13l2 2c1-4 3-7 3-7s2 3 3 7l2-2c0-7-5-11-5-11z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 15c-1.5 1-2.5 3-2.5 3l2.5.5M15 15c1.5 1 2.5 3 2.5 3l-2.5.5"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
);

const ChartLineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M3 17l4-5 4 3 4-7 4 5" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
        <circle cx="7" cy="12" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="11" cy="15" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="15" cy="8" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="19" cy="13" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 2l8 3.5v6C20 16.5 16.5 21 12 22 7.5 21 4 16.5 4 11.5v-6L12 2z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v1M12 20v1M3 12h1M20 12h1" stroke="currentColor"
            strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
        <circle cx="7" cy="7" r="6" fill="rgba(91,63,212,0.25)" stroke="rgba(139,111,245,0.4)" strokeWidth="1" />
        <path d="M4.5 7l2 2 3-3" stroke="#8b6ff5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CrossIcon = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
        <circle cx="7" cy="7" r="6" fill="rgba(100,100,120,0.15)" stroke="rgba(139,111,245,0.15)" strokeWidth="1" />
        <path d="M5 5l4 4M9 5l-4 4" stroke="rgba(139,111,245,0.3)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

/* Decorative corner lines SVG */
const CornerLines = () => (
    <svg className="pf-why-card__lines" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <line x1="120" y1="0" x2="0" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="20" x2="20" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="40" x2="40" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="60" x2="60" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="80" x2="80" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const CARDS = [
    {
        accent: "rocket",
        icon: <RocketIcon />,
        title: "Launch Faster",
        desc: "Go from raw idea to live landing page in under 10 minutes. Stop waiting months to know if something is worth building.",
        footer: "stat",
        stat: { value: "10×", label: "faster than traditional build-and-test cycles" },
    },
    {
        accent: "chart",
        icon: <ChartLineIcon />,
        title: "Data-Driven Decisions",
        desc: "Replace gut instinct with real signals. Track clicks, scroll depth, and sign-up intent before a single line of product code exists.",
        footer: "bars",
        bars: [
            { label: "Conversion signals", pct: "87%" },
            { label: "User intent clarity", pct: "94%" },
        ],
    },
    {
        accent: "shield",
        icon: <ShieldIcon />,
        title: "Reduce Risk",
        desc: "Only invest engineering time in ideas that show proven demand. Kill bad ideas early — before they drain your runway.",
        footer: "compare",
        compare: [
            { good: true, text: "Validated ideas with real user interest" },
            { good: true, text: "Decisions backed by measurable data" },
            { good: false, text: "Building features nobody asked for" },
            { good: false, text: "Months of work for an unproven idea" },
        ],
    },
    {
        accent: "clock",
        icon: <ClockIcon />,
        title: "Save Dev Time",
        desc: "Proofly lets non-technical founders validate independently — no engineers needed until the idea is confirmed worth building.",
        footer: "stat",
        stat: { value: "~200h", label: "average dev hours saved per invalidated idea" },
    },
];

const TESTIMONIALS = [
    {
        quote: "Proofly saved me from building an entire SaaS nobody wanted. Found out in 4 days with a $0 ad spend.",
        name: "Alex S.",
        role: "Solo Founder, YC applicant",
        initials: "AS",
        stars: 5,
    },
    {
        quote: "The analytics dashboard is insane for a validation tool. I can see exactly which headline converts better in real-time.",
        name: "Maria J.",
        role: "Product Lead, Seed-stage startup",
        initials: "MJ",
        stars: 5,
    },
    {
        quote: "We run every new feature idea through Proofly before putting it in the sprint. Our team's velocity doubled.",
        name: "Rahul K.",
        role: "CTO, Series A company",
        initials: "RK",
        stars: 5,
    },
];

/* ─────────────────────────────────────────────
   Hook: IntersectionObserver reveal
───────────────────────────────────────────── */
function useReveal(ref, options = {}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold: 0.12, ...options });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return visible;
}

/* ─────────────────────────────────────────────
   WhyProofly
───────────────────────────────────────────── */
export default function WhyProofly() {
    const bentoRef = useRef(null);
    const tRef = useRef(null);
    const bentoVis = useReveal(bentoRef);
    const tVis = useReveal(tRef);

    return (
        <>
            <style>{styles}</style>

            <section className="pf-why" aria-labelledby="why-heading">

                {/* Decorative bg */}
                <div className="pf-why__dots" aria-hidden="true" />
                <div className="pf-why__orb pf-why__orb--a" aria-hidden="true" />
                <div className="pf-why__orb pf-why__orb--b" aria-hidden="true" />

                <div className="pf-why__inner">

                    {/* ── Header ── */}
                    <header className="pf-why__header">
                        <div className="pf-why__eyebrow" aria-hidden="true">
                            <svg className="pf-why__eyebrow-icon" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1l1.5 3.5L12 5.5l-2.5 2.5.5 3.5L7 10l-3 1.5.5-3.5L2 5.5l3.5-1L7 1z"
                                    stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                            The Proofly Advantage
                        </div>
                        <h2 id="why-heading" className="pf-why__heading">
                            Why smart founders&nbsp;
                            <em>choose Proofly</em>
                        </h2>
                        <p className="pf-why__sub">
                            The fastest way to go from "what if" to "here's the data" —
                            without burning budget or engineering time on unproven ideas.
                        </p>
                    </header>

                    {/* ── Bento grid ── */}
                    <div ref={bentoRef} className="pf-why__bento">
                        {CARDS.map((card, i) => (
                            <article
                                key={card.title}
                                className={`pf-why-card ${bentoVis ? "is-visible" : ""}`}
                                data-accent={card.accent}
                                style={{ transitionDelay: bentoVis ? `${i * 100}ms` : "0ms" }}
                                aria-labelledby={`why-card-${i}`}
                            >
                                <div className="pf-why-card__glow" aria-hidden="true" />
                                <CornerLines />

                                {/* Icon row */}
                                <div className="pf-why-card__icon-row">
                                    <div className="pf-why-card__icon-wrap" aria-hidden="true">
                                        {card.icon}
                                    </div>
                                    <span className="pf-why-card__index" aria-hidden="true">0{i + 1}</span>
                                </div>

                                {/* Body */}
                                <div className="pf-why-card__body">
                                    <h3 id={`why-card-${i}`} className="pf-why-card__title">{card.title}</h3>
                                    <p className="pf-why-card__desc">{card.desc}</p>

                                    {/* Footer variants */}
                                    {card.footer === "stat" && (
                                        <div className="pf-why-card__stat">
                                            <span className="pf-why-card__stat-value">{card.stat.value}</span>
                                            <span className="pf-why-card__stat-label">{card.stat.label}</span>
                                        </div>
                                    )}

                                    {card.footer === "bars" && (
                                        <div className="pf-why-card__bar-wrap">
                                            {card.bars.map(bar => (
                                                <div key={bar.label}>
                                                    <div className="pf-why-card__bar-label">
                                                        <span>{bar.label}</span>
                                                        <span>{bar.pct}</span>
                                                    </div>
                                                    <div className="pf-why-card__bar-track">
                                                        <div
                                                            className="pf-why-card__bar-fill"
                                                            style={{ width: bar.pct }}
                                                            role="progressbar"
                                                            aria-valuenow={parseInt(bar.pct)}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                            aria-label={bar.label}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {card.footer === "compare" && (
                                        <ul className="pf-why-card__compare" role="list" aria-label="Comparison">
                                            {card.compare.map((row, j) => (
                                                <li
                                                    key={j}
                                                    className={`pf-why-card__compare-row ${row.good ? "pf-why-card__compare-row--good" : "pf-why-card__compare-row--bad"}`}
                                                >
                                                    {row.good ? <CheckIcon /> : <CrossIcon />}
                                                    {row.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* ── Divider ── */}
                    <div className="pf-why__divider" aria-hidden="true" />

                    {/* ── Testimonials ── */}
                    <div ref={tRef} className="pf-why__testimonials" role="list" aria-label="Customer testimonials">
                        {TESTIMONIALS.map((t, i) => (
                            <blockquote
                                key={t.name}
                                className={`pf-why__testimonial ${tVis ? "is-visible" : ""}`}
                                style={{ transitionDelay: tVis ? `${i * 120}ms` : "0ms" }}
                                role="listitem"
                            >
                                <div className="pf-why__testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                                    {"★".repeat(t.stars)}
                                </div>
                                <p className="pf-why__testimonial-quote">"{t.quote}"</p>
                                <footer className="pf-why__testimonial-author">
                                    <div className="pf-why__testimonial-avatar" aria-hidden="true">{t.initials}</div>
                                    <div>
                                        <p className="pf-why__testimonial-name">{t.name}</p>
                                        <p className="pf-why__testimonial-role">{t.role}</p>
                                    </div>
                                </footer>
                            </blockquote>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}