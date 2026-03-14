import { useState, useRef, useEffect } from "react";
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

  .pf-footer *,
  .pf-footer *::before,
  .pf-footer *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Shell ── */
  .pf-footer {
    position: relative;
    background: var(--color-void);
    font-family: var(--font-body);
    overflow: hidden;
  }

  /* ── CTA band ── */
  .pf-footer__cta-band {
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(139,111,245,0.1);
    border-bottom: 1px solid rgba(139,111,245,0.1);
    background: rgba(17,13,36,0.7);
    padding: 5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
    overflow: hidden;
  }

  /* Radial glow behind CTA band */
  .pf-footer__cta-glow {
    position: absolute;
    width: 700px; height: 400px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(ellipse, rgba(61,43,142,0.35) 0%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
    z-index: 0;
  }

  .pf-footer__cta-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: 580px;
  }

  .pf-footer__cta-eyebrow {
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

  .pf-footer__cta-heading {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }

  .pf-footer__cta-heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-footer__cta-sub {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.6);
  }

  /* CTA buttons row */
  .pf-footer__cta-btns {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pf-footer__btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.85rem 2rem;
    border-radius: 999px;
    background: var(--grad-brand);
    background-size: 200% 200%;
    background-position: 0% 50%;
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-white);
    text-decoration: none;
    box-shadow: 0 4px 24px rgba(91,63,212,0.45);
    transition:
      background-position 0.5s var(--ease-out-expo),
      box-shadow 0.3s ease,
      transform 0.25s var(--ease-spring);
  }
  .pf-footer__btn-primary:hover,
  .pf-footer__btn-primary:focus-visible {
    background-position: 100% 50%;
    box-shadow: 0 8px 40px rgba(91,63,212,0.6);
    transform: translateY(-2px) scale(1.02);
    outline: none;
  }

  .pf-footer__btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.85rem 1.75rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.25);
    background: rgba(30,21,66,0.4);
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-mist);
    text-decoration: none;
    transition: background 0.3s ease, border-color 0.3s ease, transform 0.25s var(--ease-spring);
  }
  .pf-footer__btn-ghost:hover,
  .pf-footer__btn-ghost:focus-visible {
    background: rgba(61,43,142,0.4);
    border-color: rgba(139,111,245,0.5);
    color: var(--color-frost);
    transform: translateY(-2px);
    outline: none;
  }

  /* Social proof below CTAs */
  .pf-footer__cta-proof {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pf-footer__cta-proof-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
  }
  .pf-footer__cta-proof-item svg {
    width: 13px; height: 13px;
    color: rgba(139,111,245,0.6);
    flex-shrink: 0;
  }

  /* ── Newsletter strip ── */
  .pf-footer__newsletter {
    position: relative;
    z-index: 1;
    border-bottom: 1px solid rgba(139,111,245,0.08);
    padding: 2.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pf-footer__newsletter-inner {
    max-width: 1100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .pf-footer__newsletter-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pf-footer__newsletter-title {
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-mist);
    letter-spacing: -0.01em;
  }

  .pf-footer__newsletter-sub {
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
  }

  .pf-footer__newsletter-form {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .pf-footer__newsletter-input {
    padding: 0.65rem 1.1rem;
    border-radius: 10px;
    border: 1px solid rgba(139,111,245,0.2);
    background: rgba(30,21,66,0.5);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 300;
    color: var(--color-frost);
    width: 240px;
    outline: none;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .pf-footer__newsletter-input::placeholder {
    color: rgba(139,111,245,0.35);
  }
  .pf-footer__newsletter-input:focus {
    border-color: rgba(139,111,245,0.5);
    background: rgba(30,21,66,0.7);
    box-shadow: 0 0 0 3px rgba(91,63,212,0.15);
  }

  .pf-footer__newsletter-btn {
    padding: 0.65rem 1.25rem;
    border-radius: 10px;
    border: none;
    background: var(--grad-brand);
    font-family: var(--font-ui);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--color-white);
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: opacity 0.2s ease, transform 0.2s var(--ease-spring), box-shadow 0.2s ease;
    box-shadow: 0 2px 12px rgba(91,63,212,0.35);
    white-space: nowrap;
  }
  .pf-footer__newsletter-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(91,63,212,0.5);
  }
  .pf-footer__newsletter-btn:focus-visible {
    outline: 2px solid rgba(139,111,245,0.6);
    outline-offset: 2px;
  }

  /* Success state */
  .pf-footer__newsletter-success {
    font-family: var(--font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(52,211,153,0.8);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.65rem 0;
  }
  .pf-footer__newsletter-success svg {
    width: 14px; height: 14px;
  }

  /* ── Main footer grid ── */
  .pf-footer__main {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 1.5rem 3rem;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
  }

  /* ── Brand column ── */
  .pf-footer__brand {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .pf-footer__logo {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    width: fit-content;
  }

  .pf-footer__logo-mark {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: var(--grad-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgba(139,111,245,0.3), 0 4px 16px rgba(91,63,212,0.35);
    transition: box-shadow 0.3s ease, transform 0.3s var(--ease-spring);
  }
  .pf-footer__logo:hover .pf-footer__logo-mark {
    box-shadow: 0 0 0 1px rgba(196,181,253,0.4), 0 6px 24px rgba(91,63,212,0.55);
    transform: rotate(-4deg) scale(1.08);
  }
  .pf-footer__logo-mark svg {
    width: 16px; height: 16px;
    color: var(--color-white);
  }

  .pf-footer__logo-text {
    font-family: var(--font-ui);
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--color-white);
    transition: color 0.2s ease;
  }
  .pf-footer__logo:hover .pf-footer__logo-text { color: var(--color-mist); }

  .pf-footer__tagline {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.65;
    color: rgba(196,181,253,0.5);
    max-width: 260px;
  }

  /* Social icons */
  .pf-footer__socials {
    display: flex;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  .pf-footer__social-btn {
    width: 36px; height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(30,21,66,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139,111,245,0.55);
    text-decoration: none;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s var(--ease-spring);
  }
  .pf-footer__social-btn:hover,
  .pf-footer__social-btn:focus-visible {
    background: rgba(61,43,142,0.5);
    border-color: rgba(139,111,245,0.4);
    color: var(--color-lavender);
    transform: translateY(-2px);
    outline: none;
  }
  .pf-footer__social-btn svg {
    width: 15px; height: 15px;
  }

  /* Status badge */
  .pf-footer__status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    background: rgba(52,211,153,0.08);
    border: 1px solid rgba(52,211,153,0.18);
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(52,211,153,0.75);
    width: fit-content;
  }

  .pf-footer__status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(52,211,153,0.8);
    box-shadow: 0 0 6px 2px rgba(52,211,153,0.4);
    animation: statusPulse 2.5s ease-in-out infinite;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(1.3); }
  }

  /* ── Link columns ── */
  .pf-footer__col {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .pf-footer__col-title {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.55);
    margin-bottom: 0.25rem;
  }

  .pf-footer__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 300;
    color: rgba(196,181,253,0.5);
    text-decoration: none;
    width: fit-content;
    transition: color 0.2s ease, gap 0.2s var(--ease-spring);
  }
  .pf-footer__link:hover,
  .pf-footer__link:focus-visible {
    color: var(--color-mist);
    gap: 0.6rem;
    outline: none;
  }

  .pf-footer__link-arrow {
    width: 10px; height: 10px;
    opacity: 0;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
  }
  .pf-footer__link:hover .pf-footer__link-arrow,
  .pf-footer__link:focus-visible .pf-footer__link-arrow {
    opacity: 1;
  }

  /* Badge on a link (e.g. "New") */
  .pf-footer__link-badge {
    display: inline-flex;
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: rgba(91,63,212,0.2);
    border: 1px solid rgba(91,63,212,0.3);
    color: var(--color-lavender);
  }

  /* ── Bottom bar ── */
  .pf-footer__bottom {
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(139,111,245,0.08);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
    max-width: 1100px;
    margin: 0 auto;
  }

  .pf-footer__copy {
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 300;
    color: rgba(196,181,253,0.35);
    line-height: 1.5;
  }
  .pf-footer__copy a {
    color: rgba(196,181,253,0.5);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .pf-footer__copy a:hover { color: var(--color-mist); }

  .pf-footer__bottom-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .pf-footer__bottom-link {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(196,181,253,0.35);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .pf-footer__bottom-link:hover,
  .pf-footer__bottom-link:focus-visible {
    color: rgba(196,181,253,0.65);
    outline: none;
  }

  .pf-footer__bottom-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: rgba(139,111,245,0.25);
    flex-shrink: 0;
  }

  /* ── Decorative backdrop wordmark ── */
  .pf-footer__wordmark {
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-display);
    font-size: clamp(5rem, 14vw, 11rem);
    font-weight: 400;
    white-space: nowrap;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.04;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
    z-index: 0;
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 900px) {
    .pf-footer__main {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }
    .pf-footer__brand {
      grid-column: 1 / -1;
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 2rem;
    }
  }

  @media (max-width: 640px) {
    .pf-footer__cta-band { padding: 3.5rem 1.25rem; }
    .pf-footer__cta-btns { flex-direction: column; width: 100%; }
    .pf-footer__btn-primary,
    .pf-footer__btn-ghost  { width: 100%; justify-content: center; }

    .pf-footer__newsletter-inner { flex-direction: column; align-items: flex-start; }
    .pf-footer__newsletter-form  { width: 100%; }
    .pf-footer__newsletter-input { flex: 1; width: auto; }

    .pf-footer__main { grid-template-columns: 1fr; gap: 2rem; }
    .pf-footer__brand { flex-direction: column; }

    .pf-footer__bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-footer *, .pf-footer *::before, .pf-footer *::after {
      transition-duration: 0.01ms !important;
      animation-duration:  0.01ms !important;
    }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const LogoMark = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M3 2h7a3 3 0 0 1 0 6H6v6"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRight = ({ size = 10 }) => (
    <svg className="pf-footer__link-arrow" width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightBtn = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckCircle = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
        <path d="M4 7l2.5 2.5L10 5" stroke="rgba(52,211,153,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Social icons */
const TwitterX = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.6 2H14.9L9.9 7.7 15.7 14H11.1L7.5 9.3 3.4 14H1.1L6.4 7.9.8 2H5.5L8.8 6.3 12.6 2ZM11.8 12.6H13L4.8 3.4H3.5L11.8 12.6Z"
            fill="currentColor" />
    </svg>
);

const LinkedIn = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M4 6.5v5M4 4.5v.01M7 11.5V9c0-1 .5-2 2-2s2 1 2 2v2.5M7 6.5v5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const GitHub = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5a6.5 6.5 0 0 0-2.055 12.67c.325.06.444-.141.444-.313v-1.1c-1.8.39-2.18-.87-2.18-.87-.295-.748-.72-.947-.72-.947-.588-.402.045-.394.045-.394.65.046.992.668.992.668.578.99 1.515.704 1.885.538.058-.418.226-.704.411-.866-1.438-.163-2.95-.719-2.95-3.2 0-.706.252-1.283.666-1.735-.067-.163-.289-.82.063-1.71 0 0 .543-.174 1.78.663A6.19 6.19 0 0 1 8 6.19c.55.003 1.103.074 1.62.217 1.236-.837 1.779-.663 1.779-.663.352.89.13 1.547.063 1.71.415.452.665 1.029.665 1.735 0 2.488-1.515 3.036-2.958 3.195.233.2.44.597.44 1.203v1.782c0 .173.118.376.447.312A6.501 6.501 0 0 0 8 1.5Z"
            fill="currentColor" />
    </svg>
);

const ProductHunt = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.5 5H9a2 2 0 0 1 0 4H6.5V5ZM6.5 9v2.5"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ProofIcon = ({ children }) => children;

/* ─────────────────────────────────────────────
   Nav data
───────────────────────────────────────────── */
const NAV_COLS = [
    {
        title: "Product",
        links: [
            { label: "Features", to: "/features" },
            { label: "Pricing", to: "/pricing" },
            { label: "Changelog", to: "/changelog", badge: "New" },
            { label: "Roadmap", to: "/roadmap" },
            { label: "Integrations", to: "/integrations" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", to: "/about" },
            { label: "Blog", to: "/blog" },
            { label: "Careers", to: "/careers" },
            { label: "Press Kit", to: "/press" },
            { label: "Contact", to: "/contact" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", to: "/docs" },
            { label: "Founder Guides", to: "/guides" },
            { label: "API Reference", to: "/api" },
            { label: "Community", to: "/community" },
            { label: "Status", to: "/status" },
        ],
    },
];

const SOCIALS = [
    { label: "Twitter / X", href: "https://twitter.com/proofly", Icon: TwitterX },
    { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedIn },
    { label: "GitHub", href: "https://github.com", Icon: GitHub },
    { label: "Product Hunt", href: "https://producthunt.com", Icon: ProductHunt },
];

const BOTTOM_LINKS = [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Cookie Policy", to: "/cookies" },
    { label: "GDPR", to: "/gdpr" },
];

const PROOF_ITEMS = [
    { text: "No credit card required" },
    { text: "Cancel anytime" },
    { text: "SOC 2 compliant" },
];

/* ─────────────────────────────────────────────
   Footer component
───────────────────────────────────────────── */
export default function Footer() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setSubmitted(true);
    };

    return (
        <>
            <style>{styles}</style>

            <footer className="pf-footer" role="contentinfo">

                {/* ── CTA band ── */}
                <div className="pf-footer__cta-band">
                    <div className="pf-footer__cta-glow" aria-hidden="true" />
                    <div className="pf-footer__cta-content">
                        <div className="pf-footer__cta-eyebrow" aria-hidden="true">
                            ✦ Start Validating Today
                        </div>
                        <h2 className="pf-footer__cta-heading">
                            Stop building things&nbsp;<em>nobody wants</em>
                        </h2>
                        <p className="pf-footer__cta-sub">
                            Join 2,400+ founders who validate first and build second.
                            Your first idea is free — no card required.
                        </p>
                        <div className="pf-footer__cta-btns">
                            <Link
                                to="/signup"
                                className="pf-footer__btn-primary"
                                aria-label="Get started with Proofly for free"
                            >
                                Get Started Free <ArrowRightBtn />
                            </Link>
                            <Link
                                to="/demo"
                                className="pf-footer__btn-ghost"
                                aria-label="See how Proofly works in a demo"
                            >
                                See How It Works
                            </Link>
                        </div>
                        <div className="pf-footer__cta-proof" role="list" aria-label="Guarantees">
                            {PROOF_ITEMS.map(({ text }) => (
                                <div key={text} className="pf-footer__cta-proof-item" role="listitem">
                                    <CheckCircle />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Newsletter strip ── */}
                <div className="pf-footer__newsletter">
                    <div className="pf-footer__newsletter-inner">
                        <div className="pf-footer__newsletter-text">
                            <p className="pf-footer__newsletter-title">Founder insights, weekly.</p>
                            <p className="pf-footer__newsletter-sub">
                                Validation tips, teardowns & early-stage playbooks. No spam.
                            </p>
                        </div>

                        {submitted ? (
                            <div className="pf-footer__newsletter-success" role="status" aria-live="polite">
                                <CheckCircle /> You're in — check your inbox!
                            </div>
                        ) : (
                            <form
                                className="pf-footer__newsletter-form"
                                onSubmit={handleSubscribe}
                                aria-label="Newsletter subscription"
                                noValidate
                            >
                                <label htmlFor="footer-email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="footer-email"
                                    type="email"
                                    className="pf-footer__newsletter-input"
                                    placeholder="you@startup.com"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setError(""); }}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "footer-email-error" : undefined}
                                    autoComplete="email"
                                />
                                <button
                                    type="submit"
                                    className="pf-footer__newsletter-btn"
                                >
                                    Subscribe
                                </button>
                                {error && (
                                    <span
                                        id="footer-email-error"
                                        role="alert"
                                        style={{
                                            position: "absolute",
                                            fontSize: "0.72rem",
                                            color: "rgba(248,113,113,0.8)",
                                            marginTop: "0.25rem",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        {error}
                                    </span>
                                )}
                            </form>
                        )}
                    </div>
                </div>

                {/* ── Main link grid ── */}
                <div className="pf-footer__main">

                    {/* Brand column */}
                    <div className="pf-footer__brand">
                        <Link to="/" className="pf-footer__logo" aria-label="Proofly homepage">
                            {/* <div className="pf-footer__logo-mark" aria-hidden="true">
                                <LogoMark />
                            </div> */}
                            <span className="pf-footer__logo-text">Proofly</span>
                        </Link>

                        <p className="pf-footer__tagline">
                            Validate startup ideas before you build. Trusted by 2,400+ founders worldwide.
                        </p>

                        {/* Socials */}
                        <nav aria-label="Social media links">
                            <div className="pf-footer__socials">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="pf-footer__social-btn"
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>

                    {/* Link columns */}
                    {NAV_COLS.map(col => (
                        <nav key={col.title} aria-label={`${col.title} links`} className="pf-footer__col">
                            <p className="pf-footer__col-title">{col.title}</p>
                            {col.links.map(({ label, to, badge }) => (
                                <Link key={label} to={to} className="pf-footer__link">
                                    {label}
                                    {badge && (
                                        <span className="pf-footer__link-badge" aria-label={`(${badge})`}>
                                            {badge}
                                        </span>
                                    )}
                                    <ArrowRight />
                                </Link>
                            ))}
                        </nav>
                    ))}
                </div>

                {/* ── Bottom bar ── */}
                <div className="pf-footer__bottom">
                    <p className="pf-footer__copy">
                        © {new Date().getFullYear()} Proofly, Inc. All rights reserved.
                        {" "}Built with ♥ for founders who ship smart.
                    </p>

                    <nav aria-label="Legal links" className="pf-footer__bottom-links">
                        {BOTTOM_LINKS.map(({ label, to }, i) => (
                            <>
                                <Link
                                    key={label}
                                    to={to}
                                    className="pf-footer__bottom-link"
                                >
                                    {label}
                                </Link>
                                {i < BOTTOM_LINKS.length - 1 && (
                                    <span key={`dot-${i}`} className="pf-footer__bottom-dot" aria-hidden="true" />
                                )}
                            </>
                        ))}
                    </nav>
                </div>

                {/* Decorative backdrop wordmark */}
                <div className="pf-footer__wordmark" aria-hidden="true">Proofly</div>

            </footer>
        </>
    );
}