import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
    --grad-brand-r:     linear-gradient(135deg, #d8b4fe 0%, #8b6ff5 40%, #5b3fd4 100%);

    --font-display:     'DM Serif Display', Georgia, serif;
    --font-ui:          'Syne', sans-serif;
    --font-body:        'DM Sans', sans-serif;

    --ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
    --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pf-pricing *,
  .pf-pricing *::before,
  .pf-pricing *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section shell ── */
  .pf-pricing {
    position: relative;
    background: var(--color-void);
    padding: 7rem 1.5rem;
    overflow: hidden;
    font-family: var(--font-body);
  }

  .pf-pricing::before,
  .pf-pricing::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 140px;
    pointer-events: none;
    z-index: 0;
  }
  .pf-pricing::before { top: 0;    background: linear-gradient(to bottom, var(--color-deep), transparent); }
  .pf-pricing::after  { bottom: 0; background: linear-gradient(to top,   var(--color-deep), transparent); }

  /* Grid texture */
  .pf-pricing__grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,0.05) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }

  .pf-pricing__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(110px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-pricing__orb--a {
    width: 600px; height: 600px;
    top: -120px; left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(61,43,142,0.25) 0%, transparent 70%);
  }
  .pf-pricing__orb--b {
    width: 320px; height: 320px;
    bottom: 60px; right: -60px;
    background: radial-gradient(circle, rgba(139,111,245,0.12) 0%, transparent 70%);
  }

  /* ── Inner ── */
  .pf-pricing__inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

  /* ─────────────────────────────────────────────
     Header
  ───────────────────────────────────────────── */
  .pf-pricing__header {
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
  .pf-pricing__header.is-visible { opacity: 1; transform: translateY(0); }

  .pf-pricing__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.28);
    background: rgba(30,21,66,0.5);
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-lavender);
  }

  .pf-pricing__heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }
  .pf-pricing__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-pricing__sub {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.6);
  }

  /* ─────────────────────────────────────────────
     Toggle: Monthly / Annual
  ───────────────────────────────────────────── */
  .pf-pricing__toggle-wrap {
    display: flex;
    align-items: center;
    gap: 1rem;
    opacity: 0;
    transition: opacity 0.6s var(--ease-out-expo) 0.15s;
  }
  .pf-pricing__toggle-wrap.is-visible { opacity: 1; }

  .pf-pricing__toggle-label {
    font-family: var(--font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(196,181,253,0.55);
    letter-spacing: 0.02em;
    transition: color 0.2s ease;
    cursor: pointer;
  }
  .pf-pricing__toggle-label.is-active {
    color: var(--color-mist);
  }

  .pf-pricing__toggle {
    position: relative;
    width: 48px;
    height: 26px;
    border-radius: 999px;
    background: rgba(30,21,66,0.8);
    border: 1px solid rgba(139,111,245,0.25);
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease;
    flex-shrink: 0;
  }
  .pf-pricing__toggle:focus-visible {
    outline: 2px solid rgba(139,111,245,0.6);
    outline-offset: 3px;
  }
  .pf-pricing__toggle.is-annual {
    background: rgba(61,43,142,0.5);
    border-color: rgba(139,111,245,0.4);
  }

  .pf-pricing__toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--grad-brand);
    box-shadow: 0 2px 6px rgba(91,63,212,0.5);
    transition: transform 0.35s var(--ease-spring);
  }
  .pf-pricing__toggle.is-annual .pf-pricing__toggle-thumb {
    transform: translateX(22px);
  }

  .pf-pricing__save-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: rgba(52,211,153,0.12);
    border: 1px solid rgba(52,211,153,0.25);
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(52,211,153,0.8);
  }

  /* ─────────────────────────────────────────────
     Cards grid
  ───────────────────────────────────────────── */
  .pf-pricing__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    width: 100%;
    align-items: start;
  }

  /* ─────────────────────────────────────────────
     Single pricing card
  ───────────────────────────────────────────── */
  .pf-plan {
    position: relative;
    border-radius: 24px;
    padding: 2.25rem 2rem;
    background: rgba(17,13,36,0.7);
    border: 1px solid rgba(139,111,245,0.1);
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease-spring);
    overflow: hidden;

    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.65s var(--ease-out-expo),
      transform 0.65s var(--ease-out-expo),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }
  .pf-plan.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hover */
  .pf-plan:hover:not(.pf-plan--featured) {
    border-color: rgba(139,111,245,0.22);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 4px 16px rgba(91,63,212,0.15);
    transform: translateY(-4px);
  }

  /* ── Featured (Pro) card ── */
  .pf-plan--featured {
    background: rgba(30,21,66,0.85);
    border-color: rgba(139,111,245,0.35);
    box-shadow:
      0 0 0 1px rgba(139,111,245,0.1),
      0 24px 64px rgba(0,0,0,0.5),
      0 8px 32px rgba(91,63,212,0.25);
    /* Slightly taller */
    padding-top: 2.75rem;
    padding-bottom: 2.75rem;
    transform: translateY(-8px);
  }
  .pf-plan--featured.is-visible {
    transform: translateY(-8px);
  }
  .pf-plan--featured:hover {
    transform: translateY(-12px) !important;
    box-shadow:
      0 0 0 1px rgba(196,181,253,0.2),
      0 32px 80px rgba(0,0,0,0.5),
      0 12px 40px rgba(91,63,212,0.35) !important;
  }

  /* Gradient top border on featured */
  .pf-plan--featured::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--grad-brand);
    border-radius: 24px 24px 0 0;
  }

  /* Corner glow */
  .pf-plan__glow {
    position: absolute;
    top: -80px; right: -80px;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(91,63,212,0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Popular badge ── */
  .pf-plan__badge {
    position: absolute;
    top: -1px;
    right: 1.75rem;
    padding: 0.35rem 0.85rem;
    border-radius: 0 0 10px 10px;
    background: var(--grad-brand);
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-white);
    box-shadow: 0 4px 12px rgba(91,63,212,0.4);
  }

  /* ── Plan header ── */
  .pf-plan__head {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pf-plan__name {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.7);
  }
  .pf-plan--featured .pf-plan__name {
    color: var(--color-lavender);
  }

  .pf-plan__price-row {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
  }

  .pf-plan__price {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 400;
    line-height: 1;
    color: var(--color-white);
    letter-spacing: -0.02em;
    transition: all 0.3s var(--ease-out-expo);
  }
  .pf-plan--featured .pf-plan__price {
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-plan__period {
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
    padding-bottom: 0.2rem;
  }

  .pf-plan__annual-note {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(52,211,153,0.65);
    min-height: 1.1em;
    transition: opacity 0.3s ease;
  }

  .pf-plan__desc {
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.6;
    color: rgba(196,181,253,0.5);
    margin-top: 0.25rem;
  }

  /* ── Divider ── */
  .pf-plan__divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,111,245,0.15), transparent);
  }
  .pf-plan--featured .pf-plan__divider {
    background: linear-gradient(90deg, transparent, rgba(139,111,245,0.3), transparent);
  }

  /* ── Feature list ── */
  .pf-plan__features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .pf-plan__feature {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 300;
    color: rgba(196,181,253,0.65);
    line-height: 1.4;
  }
  .pf-plan--featured .pf-plan__feature {
    color: rgba(237,233,254,0.75);
  }

  .pf-plan__feature-icon {
    flex-shrink: 0;
    margin-top: 1px;
    width: 16px; height: 16px;
  }

  .pf-plan__feature--disabled {
    opacity: 0.35;
  }

  /* ── CTA button ── */
  .pf-plan__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-family: var(--font-ui);
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    transition: all 0.3s var(--ease-spring);
    border: none;
    cursor: pointer;
  }

  .pf-plan__cta--ghost {
    background: rgba(30,21,66,0.6);
    border: 1px solid rgba(139,111,245,0.2);
    color: rgba(196,181,253,0.7);
  }
  .pf-plan__cta--ghost:hover,
  .pf-plan__cta--ghost:focus-visible {
    background: rgba(61,43,142,0.4);
    border-color: rgba(139,111,245,0.4);
    color: var(--color-frost);
    transform: translateY(-2px);
    outline: none;
  }

  .pf-plan__cta--primary {
    background: var(--grad-brand);
    background-size: 200% 200%;
    background-position: 0% 50%;
    color: var(--color-white);
    box-shadow: 0 4px 20px rgba(91,63,212,0.45);
  }
  .pf-plan__cta--primary:hover,
  .pf-plan__cta--primary:focus-visible {
    background-position: 100% 50%;
    box-shadow: 0 6px 32px rgba(91,63,212,0.6);
    transform: translateY(-2px) scale(1.02);
    outline: none;
  }
  .pf-plan__cta--primary:active { transform: scale(0.97); }

  .pf-plan__cta--outline {
    background: transparent;
    border: 1px solid rgba(139,111,245,0.25);
    color: rgba(196,181,253,0.6);
  }
  .pf-plan__cta--outline:hover,
  .pf-plan__cta--outline:focus-visible {
    background: rgba(30,21,66,0.5);
    border-color: rgba(139,111,245,0.45);
    color: var(--color-mist);
    transform: translateY(-2px);
    outline: none;
  }

  /* ─────────────────────────────────────────────
     Comparison toggle row
  ───────────────────────────────────────────── */
  .pf-pricing__compare-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1.25rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.2);
    background: transparent;
    font-family: var(--font-ui);
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(196,181,253,0.55);
    cursor: pointer;
    transition: all 0.25s ease;
    letter-spacing: 0.02em;
  }
  .pf-pricing__compare-toggle:hover,
  .pf-pricing__compare-toggle:focus-visible {
    border-color: rgba(139,111,245,0.4);
    color: var(--color-mist);
    background: rgba(30,21,66,0.4);
    outline: none;
  }
  .pf-pricing__compare-toggle svg {
    width: 14px; height: 14px;
    transition: transform 0.3s var(--ease-spring);
  }
  .pf-pricing__compare-toggle.is-open svg {
    transform: rotate(180deg);
  }

  /* ─────────────────────────────────────────────
     Comparison table
  ───────────────────────────────────────────── */
  .pf-pricing__table-wrap {
    width: 100%;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.65s var(--ease-out-expo), opacity 0.4s ease;
    opacity: 0;
  }
  .pf-pricing__table-wrap.is-open {
    max-height: 1000px;
    opacity: 1;
  }

  .pf-pricing__table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(139,111,245,0.12);
  }

  .pf-pricing__table th,
  .pf-pricing__table td {
    padding: 0.9rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid rgba(139,111,245,0.07);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 300;
    color: rgba(196,181,253,0.55);
  }

  .pf-pricing__table th {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.6);
    background: rgba(17,13,36,0.8);
  }

  .pf-pricing__table tr:last-child td { border-bottom: none; }

  .pf-pricing__table td:first-child {
    color: rgba(237,233,254,0.65);
    font-weight: 400;
  }

  .pf-pricing__table td:nth-child(3) {
    /* Pro column highlight */
    background: rgba(61,43,142,0.08);
    color: rgba(196,181,253,0.8);
  }

  .pf-pricing__table tr:nth-child(even) td {
    background: rgba(17,13,36,0.4);
  }
  .pf-pricing__table tr:nth-child(even) td:nth-child(3) {
    background: rgba(61,43,142,0.12);
  }

  .pf-pricing__table-check { color: var(--color-lavender); font-size: 1rem; }
  .pf-pricing__table-cross { color: rgba(139,111,245,0.2); font-size: 0.9rem; }

  /* ─────────────────────────────────────────────
     FAQ strip
  ───────────────────────────────────────────── */
  .pf-pricing__faq {
    width: 100%;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s var(--ease-out-expo), transform 0.65s var(--ease-out-expo);
  }
  .pf-pricing__faq.is-visible { opacity: 1; transform: translateY(0); }

  .pf-pricing__faq-title {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.5);
    text-align: center;
    margin-bottom: 0.25rem;
  }

  .pf-pricing__faq-item {
    border-radius: 14px;
    border: 1px solid rgba(139,111,245,0.1);
    background: rgba(17,13,36,0.5);
    overflow: hidden;
    transition: border-color 0.25s ease;
  }
  .pf-pricing__faq-item:hover { border-color: rgba(139,111,245,0.2); }
  .pf-pricing__faq-item.is-open { border-color: rgba(139,111,245,0.22); }

  .pf-pricing__faq-q {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-ui);
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(196,181,253,0.7);
    text-align: left;
    gap: 1rem;
    transition: color 0.2s ease;
  }
  .pf-pricing__faq-item.is-open .pf-pricing__faq-q { color: var(--color-frost); }
  .pf-pricing__faq-q:focus-visible { outline: 2px solid rgba(139,111,245,0.5); outline-offset: -2px; }

  .pf-pricing__faq-chevron {
    width: 16px; height: 16px;
    flex-shrink: 0;
    color: rgba(139,111,245,0.5);
    transition: transform 0.35s var(--ease-spring);
  }
  .pf-pricing__faq-item.is-open .pf-pricing__faq-chevron { transform: rotate(180deg); }

  .pf-pricing__faq-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s var(--ease-out-expo);
  }
  .pf-pricing__faq-item.is-open .pf-pricing__faq-body { max-height: 200px; }

  .pf-pricing__faq-a {
    padding: 0 1.25rem 1.1rem;
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.5);
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 860px) {
    .pf-pricing__cards {
      grid-template-columns: 1fr;
      max-width: 440px;
      margin: 0 auto;
    }
    .pf-plan--featured { transform: translateY(0); }
    .pf-plan--featured.is-visible { transform: translateY(0); }
    .pf-plan--featured:hover { transform: translateY(-4px) !important; }

    .pf-pricing__table { font-size: 0.78rem; }
    .pf-pricing__table th, .pf-pricing__table td { padding: 0.7rem 0.85rem; }
  }

  @media (max-width: 560px) {
    .pf-pricing { padding: 5rem 1.25rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-pricing *, .pf-pricing *::before, .pf-pricing *::after {
      transition-duration: 0.01ms !important;
      animation-duration:  0.01ms !important;
    }
    .pf-pricing__header,
    .pf-plan,
    .pf-pricing__faq { opacity: 1 !important; transform: none !important; }
    .pf-plan--featured { transform: translateY(-8px) !important; }
    .pf-pricing__table-wrap { transition: none !important; }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const CheckIcon = () => (
    <svg className="pf-plan__feature-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(91,63,212,0.2)" stroke="rgba(139,111,245,0.35)" strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#8b6ff5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckIconFeatured = () => (
    <svg className="pf-plan__feature-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(91,63,212,0.3)" stroke="rgba(139,111,245,0.55)" strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MinusIcon = () => (
    <svg className="pf-plan__feature-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(30,21,66,0.5)" stroke="rgba(139,111,245,0.1)" strokeWidth="1" />
        <path d="M5.5 8h5" stroke="rgba(139,111,245,0.25)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ArrowRight = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDown = () => (
    <svg className="pf-pricing__faq-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TableChevron = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Pricing data
───────────────────────────────────────────── */
const PLANS = [
    {
        id: "starter",
        name: "Starter",
        desc: "Perfect for testing your first idea. No card needed.",
        monthly: 0,
        annual: 0,
        period: "/mo",
        cta: "Start for Free",
        ctaStyle: "ghost",
        to: "/signup",
        badge: null,
        featured: false,
        features: [
            { text: "1 active idea", included: true },
            { text: "Basic landing page builder", included: true },
            { text: "Up to 100 sign-ups", included: true },
            { text: "Basic analytics dashboard", included: true },
            { text: "Email capture", included: true },
            { text: "Advanced analytics", included: false },
            { text: "Lead export (CSV)", included: false },
            { text: "Team seats", included: false },
            { text: "Integrations", included: false },
        ],
    },
    {
        id: "pro",
        name: "Pro",
        desc: "For founders who run multiple ideas in parallel.",
        monthly: 19,
        annual: 14,
        period: "/mo",
        cta: "Start 14-day Trial",
        ctaStyle: "primary",
        to: "/signup?plan=pro",
        badge: "Most Popular",
        featured: true,
        features: [
            { text: "10 active ideas", included: true },
            { text: "Custom landing page builder", included: true },
            { text: "Unlimited sign-ups", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Lead export (CSV / JSON)", included: true },
            { text: "A/B headline testing", included: true },
            { text: "1 team seat", included: true },
            { text: "Slack & Notion integrations", included: true },
            { text: "Priority email support", included: true },
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        desc: "For teams validating at scale across portfolios.",
        monthly: 49,
        annual: 37,
        period: "/mo",
        cta: "Contact Sales",
        ctaStyle: "outline",
        to: "/contact",
        badge: null,
        featured: false,
        features: [
            { text: "Unlimited ideas", included: true },
            { text: "White-label pages", included: true },
            { text: "Unlimited sign-ups", included: true },
            { text: "Custom analytics & reports", included: true },
            { text: "Lead export + CRM sync", included: true },
            { text: "Unlimited A/B tests", included: true },
            { text: "Unlimited team seats", included: true },
            { text: "All integrations + API", included: true },
            { text: "Dedicated account manager", included: true },
        ],
    },
];

const TABLE_ROWS = [
    { label: "Active ideas", starter: "1", pro: "10", enterprise: "Unlimited" },
    { label: "Sign-ups per idea", starter: "100", pro: "Unlimited", enterprise: "Unlimited" },
    { label: "Advanced analytics", starter: false, pro: true, enterprise: true },
    { label: "Lead export", starter: false, pro: "CSV/JSON", enterprise: "CSV/JSON/CRM" },
    { label: "A/B testing", starter: false, pro: true, enterprise: "Unlimited" },
    { label: "Team seats", starter: "1", pro: "1", enterprise: "Unlimited" },
    { label: "Integrations", starter: false, pro: "Slack, Notion", enterprise: "All + API" },
    { label: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
];

const FAQS = [
    {
        q: "Can I upgrade or downgrade at any time?",
        a: "Yes — plan changes take effect immediately. If you upgrade mid-cycle, we prorate the charge. Downgrades apply at the next renewal date.",
    },
    {
        q: "Is there a free trial on paid plans?",
        a: "Pro comes with a 14-day free trial, no credit card required. Enterprise includes a 30-day pilot with dedicated onboarding support.",
    },
    {
        q: "What happens to my data if I cancel?",
        a: "Your data is retained for 30 days after cancellation so you can export everything. After 30 days it is permanently deleted from our servers.",
    },
    {
        q: "Do you offer discounts for startups or students?",
        a: "Yes — we have a startup programme (free Pro for 6 months) and a student plan. Reach out via the contact page with proof of eligibility.",
    },
];

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
   CellValue helper
───────────────────────────────────────────── */
function CellVal({ val }) {
    if (val === true) return <span className="pf-pricing__table-check" aria-label="Included">✓</span>;
    if (val === false) return <span className="pf-pricing__table-cross" aria-label="Not included">✕</span>;
    return <span>{val}</span>;
}

/* ─────────────────────────────────────────────
   Pricing component
───────────────────────────────────────────── */
export default function Pricing() {
    const [annual, setAnnual] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const headerRef = useRef(null);
    const cardsRef = useRef(null);
    const faqRef = useRef(null);

    const headerVis = useReveal(headerRef);
    const cardsVis = useReveal(cardsRef, { threshold: 0.08 });
    const faqVis = useReveal(faqRef, { threshold: 0.1 });

    const displayPrice = (plan) => {
        if (plan.monthly === 0) return "$0";
        return `$${annual ? plan.annual : plan.monthly}`;
    };

    const annualNote = (plan) => {
        if (!annual || plan.monthly === 0) return null;
        const saved = (plan.monthly - plan.annual) * 12;
        return `Save $${saved}/year`;
    };

    return (
        <>
            <style>{styles}</style>

            <section className="pf-pricing" aria-labelledby="pricing-heading">

                <div className="pf-pricing__grid-bg" aria-hidden="true" />
                <div className="pf-pricing__orb pf-pricing__orb--a" aria-hidden="true" />
                <div className="pf-pricing__orb pf-pricing__orb--b" aria-hidden="true" />

                <div className="pf-pricing__inner">

                    {/* Header */}
                    <header
                        ref={headerRef}
                        className={`pf-pricing__header ${headerVis ? "is-visible" : ""}`}
                    >
                        <div className="pf-pricing__eyebrow" aria-hidden="true">✦ Simple Pricing</div>
                        <h2 id="pricing-heading" className="pf-pricing__heading">
                            Pay for what you&nbsp;<em>actually need</em>
                        </h2>
                        <p className="pf-pricing__sub">
                            Start free. Upgrade when your ideas need more room to grow.
                            No hidden fees, no lock-in.
                        </p>
                    </header>

                    {/* Billing toggle */}
                    <div
                        className={`pf-pricing__toggle-wrap ${headerVis ? "is-visible" : ""}`}
                        role="group"
                        aria-label="Billing period"
                    >
                        <span
                            className={`pf-pricing__toggle-label ${!annual ? "is-active" : ""}`}
                            onClick={() => setAnnual(false)}
                            aria-hidden="true"
                        >
                            Monthly
                        </span>

                        <button
                            className={`pf-pricing__toggle ${annual ? "is-annual" : ""}`}
                            role="switch"
                            aria-checked={annual}
                            aria-label="Switch to annual billing"
                            onClick={() => setAnnual(a => !a)}
                        >
                            <div className="pf-pricing__toggle-thumb" />
                        </button>

                        <span
                            className={`pf-pricing__toggle-label ${annual ? "is-active" : ""}`}
                            onClick={() => setAnnual(true)}
                            aria-hidden="true"
                        >
                            Annual
                        </span>

                        <span className="pf-pricing__save-badge" aria-live="polite">
                            Save up to 26%
                        </span>
                    </div>

                    {/* Cards */}
                    <div
                        ref={cardsRef}
                        className="pf-pricing__cards"
                        role="list"
                    >
                        {PLANS.map((plan, i) => (
                            <article
                                key={plan.id}
                                className={`pf-plan ${plan.featured ? "pf-plan--featured" : ""} ${cardsVis ? "is-visible" : ""}`}
                                style={{ transitionDelay: cardsVis ? `${i * 120}ms` : "0ms" }}
                                role="listitem"
                                aria-labelledby={`plan-name-${plan.id}`}
                            >
                                {plan.featured && (
                                    <div className="pf-plan__glow" aria-hidden="true" />
                                )}
                                {plan.badge && (
                                    <div className="pf-plan__badge" aria-label="Most popular plan">
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Head */}
                                <div className="pf-plan__head">
                                    <p id={`plan-name-${plan.id}`} className="pf-plan__name">{plan.name}</p>
                                    <div className="pf-plan__price-row">
                                        <span className="pf-plan__price" aria-label={`${displayPrice(plan)} per month`}>
                                            {displayPrice(plan)}
                                        </span>
                                        {plan.monthly > 0 && (
                                            <span className="pf-plan__period">{plan.period}</span>
                                        )}
                                    </div>
                                    <p className="pf-plan__annual-note" aria-live="polite">
                                        {annualNote(plan) || "\u00A0"}
                                    </p>
                                    <p className="pf-plan__desc">{plan.desc}</p>
                                </div>

                                <div className="pf-plan__divider" aria-hidden="true" />

                                {/* Features */}
                                <ul className="pf-plan__features" aria-label={`${plan.name} plan features`}>
                                    {plan.features.map((feat, j) => (
                                        <li
                                            key={j}
                                            className={`pf-plan__feature ${!feat.included ? "pf-plan__feature--disabled" : ""}`}
                                        >
                                            {feat.included
                                                ? (plan.featured ? <CheckIconFeatured /> : <CheckIcon />)
                                                : <MinusIcon />
                                            }
                                            <span>{feat.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    to={plan.to}
                                    className={`pf-plan__cta pf-plan__cta--${plan.ctaStyle}`}
                                    aria-label={`${plan.cta} — ${plan.name} plan`}
                                >
                                    {plan.cta}
                                    {plan.featured && <ArrowRight size={13} />}
                                </Link>
                            </article>
                        ))}
                    </div>

                    {/* Compare all features toggle */}
                    <button
                        className={`pf-pricing__compare-toggle ${tableOpen ? "is-open" : ""}`}
                        onClick={() => setTableOpen(o => !o)}
                        aria-expanded={tableOpen}
                        aria-controls="compare-table"
                    >
                        {tableOpen ? "Hide" : "Compare"} all features
                        <TableChevron />
                    </button>

                    {/* Comparison table */}
                    <div
                        id="compare-table"
                        className={`pf-pricing__table-wrap ${tableOpen ? "is-open" : ""}`}
                        aria-hidden={!tableOpen}
                    >
                        <table className="pf-pricing__table" aria-label="Feature comparison across plans">
                            <thead>
                                <tr>
                                    <th scope="col">Feature</th>
                                    <th scope="col">Starter</th>
                                    <th scope="col">Pro</th>
                                    <th scope="col">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.label}</td>
                                        <td><CellVal val={row.starter} /></td>
                                        <td><CellVal val={row.pro} /></td>
                                        <td><CellVal val={row.enterprise} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* FAQ */}
                    <div
                        ref={faqRef}
                        className={`pf-pricing__faq ${faqVis ? "is-visible" : ""}`}
                    >
                        <p className="pf-pricing__faq-title">Common questions</p>

                        {FAQS.map((faq, i) => (
                            <div
                                key={i}
                                className={`pf-pricing__faq-item ${openFaq === i ? "is-open" : ""}`}
                            >
                                <button
                                    className="pf-pricing__faq-q"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                    aria-controls={`faq-body-${i}`}
                                    id={`faq-q-${i}`}
                                >
                                    {faq.q}
                                    <ChevronDown />
                                </button>
                                <div
                                    id={`faq-body-${i}`}
                                    className="pf-pricing__faq-body"
                                    role="region"
                                    aria-labelledby={`faq-q-${i}`}
                                >
                                    <p className="pf-pricing__faq-a">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}