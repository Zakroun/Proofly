import { useEffect, useRef, useState, useCallback } from "react";
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

  .pf-feat *,
  .pf-feat *::before,
  .pf-feat *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section shell ── */
  .pf-feat {
    position: relative;
    background: var(--color-void);
    padding: 7rem 1.5rem;
    overflow: hidden;
    font-family: var(--font-body);
  }

  /* Horizontal scan-line texture */
  .pf-feat__scanlines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 3px,
      rgba(139,111,245,0.018) 3px,
      rgba(139,111,245,0.018) 4px
    );
    pointer-events: none;
    z-index: 0;
  }

  .pf-feat__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-feat__orb--a {
    width: 560px; height: 560px;
    top: -100px; left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(61,43,142,0.28) 0%, transparent 70%);
  }
  .pf-feat__orb--b {
    width: 300px; height: 300px;
    bottom: 0; right: -60px;
    background: radial-gradient(circle, rgba(139,111,245,0.14) 0%, transparent 70%);
  }

  /* ── Inner ── */
  .pf-feat__inner {
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
  .pf-feat__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    max-width: 600px;
  }

  .pf-feat__eyebrow {
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

  .pf-feat__heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }

  .pf-feat__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-feat__sub {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.6);
  }

  /* ─────────────────────────────────────────────
     Showcase: sidebar tabs + preview panel
  ───────────────────────────────────────────── */
  .pf-feat__showcase {
    width: 100%;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  /* ── Tab list (left column) ── */
  .pf-feat__tabs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
  }

  .pf-feat__tab {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem 1.25rem 1.25rem 1rem;
    border-radius: 16px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      transform 0.25s var(--ease-spring);
  }

  .pf-feat__tab:hover:not(.is-active) {
    background: rgba(30,21,66,0.4);
    border-color: rgba(139,111,245,0.1);
  }

  .pf-feat__tab:focus-visible {
    outline: 2px solid rgba(139,111,245,0.6);
    outline-offset: 2px;
  }

  .pf-feat__tab.is-active {
    background: rgba(17,13,36,0.85);
    border-color: rgba(139,111,245,0.22);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(139,111,245,0.08) inset;
  }

  /* Active left accent bar */
  .pf-feat__tab.is-active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 3px;
    border-radius: 999px;
    background: var(--grad-brand);
  }

  /* Tab icon */
  .pf-feat__tab-icon {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(30,21,66,0.7);
    border: 1px solid rgba(139,111,245,0.15);
    color: rgba(139,111,245,0.55);
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  .pf-feat__tab.is-active .pf-feat__tab-icon {
    background: rgba(61,43,142,0.5);
    border-color: rgba(139,111,245,0.35);
    color: var(--color-lavender);
  }

  .pf-feat__tab-icon svg {
    width: 16px;
    height: 16px;
  }

  /* Tab text */
  .pf-feat__tab-text {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
  }

  .pf-feat__tab-title {
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(196,181,253,0.6);
    letter-spacing: -0.01em;
    line-height: 1.2;
    transition: color 0.2s ease;
  }

  .pf-feat__tab.is-active .pf-feat__tab-title {
    color: var(--color-frost);
  }

  .pf-feat__tab-desc {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(139,111,245,0.45);
    line-height: 1.5;
    transition: color 0.2s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pf-feat__tab.is-active .pf-feat__tab-desc {
    color: rgba(196,181,253,0.55);
  }

  /* Progress bar under active tab */
  .pf-feat__tab-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    border-radius: 0 0 16px 16px;
    background: rgba(61,43,142,0.3);
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .pf-feat__tab.is-active .pf-feat__tab-progress {
    opacity: 1;
  }

  .pf-feat__tab-progress-fill {
    height: 100%;
    background: var(--grad-brand);
    transform-origin: left;
  }

  /* ── Preview panel (right column) ── */
  .pf-feat__panel {
    position: relative;
    border-radius: 22px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(17,13,36,0.75);
    overflow: hidden;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 4px 16px rgba(91,63,212,0.1);
  }

  /* Fake browser chrome */
  .pf-feat__panel-chrome {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid rgba(139,111,245,0.1);
    background: rgba(10,8,18,0.5);
    flex-shrink: 0;
  }

  .pf-feat__chrome-dots {
    display: flex;
    gap: 5px;
  }

  .pf-feat__chrome-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .pf-feat__chrome-dot:nth-child(1) { background: rgba(255,95,86,0.55);  }
  .pf-feat__chrome-dot:nth-child(2) { background: rgba(255,189,46,0.55); }
  .pf-feat__chrome-dot:nth-child(3) { background: rgba(39,201,63,0.55);  }

  .pf-feat__chrome-bar {
    flex: 1;
    height: 26px;
    border-radius: 6px;
    background: rgba(30,21,66,0.7);
    border: 1px solid rgba(139,111,245,0.12);
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    gap: 0.4rem;
  }

  .pf-feat__chrome-lock {
    width: 8px; height: 8px;
    color: rgba(139,111,245,0.4);
  }

  .pf-feat__chrome-url {
    font-family: var(--font-body);
    font-size: 0.7rem;
    color: rgba(139,111,245,0.4);
    letter-spacing: 0.02em;
  }

  /* Panel content area */
  .pf-feat__panel-content {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  /* Each slide */
  .pf-feat__slide {
    position: absolute;
    inset: 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    opacity: 0;
    transform: translateX(24px);
    transition:
      opacity 0.45s var(--ease-out-expo),
      transform 0.45s var(--ease-out-expo);
    pointer-events: none;
  }

  .pf-feat__slide.is-active {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  .pf-feat__slide.is-exit {
    opacity: 0;
    transform: translateX(-24px);
    pointer-events: none;
  }

  /* Slide title */
  .pf-feat__slide-title {
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-frost);
    letter-spacing: -0.01em;
  }

  /* Generic mock UI elements */
  .pf-mock {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  /* Mock form row */
  .pf-mock__row {
    display: flex;
    gap: 0.65rem;
  }

  .pf-mock__field {
    flex: 1;
    height: 36px;
    border-radius: 8px;
    background: rgba(30,21,66,0.6);
    border: 1px solid rgba(139,111,245,0.15);
  }

  .pf-mock__field--sm { flex: 0 0 80px; }
  .pf-mock__field--lg { height: 80px; }

  .pf-mock__label {
    width: 60px;
    height: 10px;
    border-radius: 4px;
    background: rgba(139,111,245,0.2);
    margin-bottom: 0.25rem;
  }

  .pf-mock__btn {
    height: 36px;
    border-radius: 8px;
    background: var(--grad-brand);
    flex: 0 0 100px;
    opacity: 0.85;
  }

  /* Mock stat cards */
  .pf-mock__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.65rem;
  }

  .pf-mock__stat {
    border-radius: 12px;
    background: rgba(30,21,66,0.5);
    border: 1px solid rgba(139,111,245,0.12);
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .pf-mock__stat-val {
    font-family: var(--font-ui);
    font-size: 1.3rem;
    font-weight: 800;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-mock__stat-lbl {
    font-family: var(--font-body);
    font-size: 0.68rem;
    color: rgba(139,111,245,0.5);
    font-weight: 300;
  }

  /* Mock chart bars */
  .pf-mock__chart {
    flex: 1;
    display: flex;
    align-items: flex-end;
    gap: 6px;
    padding: 0.75rem;
    border-radius: 12px;
    background: rgba(30,21,66,0.4);
    border: 1px solid rgba(139,111,245,0.1);
    min-height: 100px;
  }

  .pf-mock__bar {
    flex: 1;
    border-radius: 4px 4px 0 0;
    background: var(--grad-brand);
    opacity: 0.6;
    transition: opacity 0.2s ease;
    min-height: 8px;
  }
  .pf-mock__bar:nth-child(even) { opacity: 0.35; }

  /* Mock list rows */
  .pf-mock__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pf-mock__list-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    background: rgba(30,21,66,0.4);
    border: 1px solid rgba(139,111,245,0.08);
  }

  .pf-mock__dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .pf-mock__dot--green  { background: rgba(52,211,153,0.7); }
  .pf-mock__dot--yellow { background: rgba(251,191,36,0.7); }
  .pf-mock__dot--purple { background: rgba(139,111,245,0.7); }

  .pf-mock__line {
    height: 9px;
    border-radius: 4px;
    background: rgba(139,111,245,0.18);
  }

  .pf-mock__badge {
    margin-left: auto;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.62rem;
    font-weight: 700;
  }
  .pf-mock__badge--up   { background: rgba(52,211,153,0.15); color: rgba(52,211,153,0.8); }
  .pf-mock__badge--mid  { background: rgba(251,191,36,0.15);  color: rgba(251,191,36,0.8);  }
  .pf-mock__badge--low  { background: rgba(139,111,245,0.15); color: rgba(139,111,245,0.8); }

  /* Mock email rows */
  .pf-mock__email-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.85rem;
    border-radius: 10px;
    background: rgba(30,21,66,0.4);
    border: 1px solid rgba(139,111,245,0.08);
  }

  .pf-mock__avatar-sm {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--grad-brand);
    flex-shrink: 0;
    opacity: 0.7;
  }

  .pf-mock__email-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .pf-mock__email-name {
    height: 9px; width: 80px;
    border-radius: 4px;
    background: rgba(196,181,253,0.25);
  }

  .pf-mock__email-addr {
    height: 8px; width: 130px;
    border-radius: 4px;
    background: rgba(139,111,245,0.15);
  }

  .pf-mock__tag {
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.62rem;
    font-weight: 700;
    background: rgba(91,63,212,0.2);
    color: rgba(139,111,245,0.8);
  }

  /* Mock export panel */
  .pf-mock__export {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .pf-mock__export-row {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    background: rgba(30,21,66,0.45);
    border: 1px solid rgba(139,111,245,0.1);
  }

  .pf-mock__export-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pf-mock__export-icon svg {
    width: 15px; height: 15px;
  }

  .pf-mock__export-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pf-mock__export-title {
    height: 9px; width: 90px;
    border-radius: 4px;
    background: rgba(196,181,253,0.3);
  }

  .pf-mock__export-sub {
    height: 8px; width: 140px;
    border-radius: 4px;
    background: rgba(139,111,245,0.15);
  }

  .pf-mock__export-btn {
    height: 28px;
    width: 70px;
    border-radius: 999px;
    background: var(--grad-brand);
    opacity: 0.8;
    flex-shrink: 0;
  }

  /* ─────────────────────────────────────────────
     Feature highlight strip (below showcase)
  ───────────────────────────────────────────── */
  .pf-feat__strip {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    border-radius: 18px;
    border: 1px solid rgba(139,111,245,0.12);
    overflow: hidden;
    background: rgba(17,13,36,0.6);

    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.65s var(--ease-out-expo), transform 0.65s var(--ease-out-expo);
  }

  .pf-feat__strip.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .pf-feat__strip-item {
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    text-align: center;
    border-right: 1px solid rgba(139,111,245,0.08);
    transition: background 0.25s ease;
    cursor: default;
  }

  .pf-feat__strip-item:last-child { border-right: none; }

  .pf-feat__strip-item:hover {
    background: rgba(30,21,66,0.5);
  }

  .pf-feat__strip-num {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 400;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .pf-feat__strip-lbl {
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: rgba(196,181,253,0.5);
    line-height: 1.3;
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 900px) {
    .pf-feat__showcase {
      grid-template-columns: 1fr;
    }

    .pf-feat__tabs {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .pf-feat__tab {
      flex: 1 1 calc(50% - 0.25rem);
      min-width: 0;
    }

    .pf-feat__panel {
      min-height: 360px;
    }

    .pf-feat__strip {
      grid-template-columns: repeat(3, 1fr);
    }

    .pf-feat__strip-item:nth-child(3) { border-right: none; }
    .pf-feat__strip-item:nth-child(4),
    .pf-feat__strip-item:nth-child(5) {
      border-top: 1px solid rgba(139,111,245,0.08);
    }
    .pf-feat__strip-item:nth-child(5) { border-right: none; }
  }

  @media (max-width: 580px) {
    .pf-feat { padding: 5rem 1.25rem; }

    .pf-feat__tabs { flex-direction: column; }
    .pf-feat__tab  { flex: unset; }

    .pf-feat__strip {
      grid-template-columns: repeat(2, 1fr);
    }
    .pf-feat__strip-item:nth-child(2) { border-right: none; }
    .pf-feat__strip-item:nth-child(3) { border-right: 1px solid rgba(139,111,245,0.08); }
    .pf-feat__strip-item:nth-child(3),
    .pf-feat__strip-item:nth-child(4),
    .pf-feat__strip-item:nth-child(5) {
      border-top: 1px solid rgba(139,111,245,0.08);
    }
    .pf-feat__strip-item:nth-child(4) { border-right: none; }
    .pf-feat__strip-item:nth-child(5) {
      grid-column: 1 / -1;
      border-right: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-feat *, .pf-feat *::before, .pf-feat *::after {
      transition-duration: 0.01ms !important;
      animation-duration:  0.01ms !important;
    }
    .pf-feat__slide      { opacity: 1 !important; transform: none !important; }
    .pf-feat__slide:not(.is-active) { opacity: 0 !important; }
    .pf-feat__strip      { opacity: 1 !important; transform: none !important; }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const PageIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 5.5h8M4 8h5M4 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const EmailIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const ChartIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 12l3.5-4 3 2.5 3-5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 14h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
);

const SortIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ExportIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11v1.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const LockIcon = () => (
    <svg className="pf-feat__chrome-lock" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <rect x="1" y="3.5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M2.5 3.5V2.5a1.5 1.5 0 0 1 3 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Feature data
───────────────────────────────────────────── */
const FEATURES = [
    {
        id: "landing-pages",
        icon: <PageIcon />,
        title: "Create Landing Pages",
        desc: "Build conversion-optimised pages in minutes with no code. Pick a template, customise your copy, go live.",
        url: "proofly.io/idea/my-saas",
        slide: "pages",
    },
    {
        id: "collect-leads",
        icon: <EmailIcon />,
        title: "Collect Emails & Feedback",
        desc: "Capture waitlist sign-ups and structured feedback forms automatically. Every lead flows into your dashboard.",
        url: "proofly.io/leads",
        slide: "leads",
    },
    {
        id: "track-engagement",
        icon: <ChartIcon />,
        title: "Track Idea Engagement",
        desc: "See clicks, scroll depth, CTA conversions, and return visits per idea in real-time. Know what resonates.",
        url: "proofly.io/analytics",
        slide: "analytics",
    },
    {
        id: "prioritise",
        icon: <SortIcon />,
        title: "Prioritise by Demand",
        desc: "Proofly scores each idea automatically based on engagement and sign-up velocity. Know exactly what to build next.",
        url: "proofly.io/ideas",
        slide: "priority",
    },
    {
        id: "export",
        icon: <ExportIcon />,
        title: "Export Leads & Metrics",
        desc: "One-click CSV, JSON, or direct integrations to your CRM and email tool. Your data, your workflow.",
        url: "proofly.io/export",
        slide: "export",
    },
];

const STATS = [
    { num: "10 min", lbl: "Avg. time to first live page" },
    { num: "3.2×", lbl: "More sign-ups vs plain forms" },
    { num: "94%", lbl: "User intent clarity score" },
    { num: "200h", lbl: "Dev hours saved per idea killed" },
    { num: "$0", lbl: "Engineering cost to validate" },
];

/* ─────────────────────────────────────────────
   Slide mock UIs
───────────────────────────────────────────── */
function SlidePages() {
    return (
        <div className="pf-mock">
            <div className="pf-mock__row">
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div className="pf-mock__label" />
                    <div className="pf-mock__field" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div className="pf-mock__label" />
                    <div className="pf-mock__field" />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <div className="pf-mock__label" />
                <div className="pf-mock__field pf-mock__field--lg" />
            </div>
            <div className="pf-mock__row" style={{ alignItems: "center" }}>
                <div className="pf-mock__field" style={{ flex: 1 }} />
                <div className="pf-mock__btn" />
            </div>
            {/* Colour picker row */}
            <div style={{ display: "flex", gap: "6px", marginTop: "0.25rem" }}>
                {["#5b3fd4", "#8b6ff5", "#3d2b8e", "#c4b5fd", "#1e1542"].map(c => (
                    <div key={c} style={{
                        width: 22, height: 22, borderRadius: "50%", background: c, opacity: 0.75,
                        border: c === "#8b6ff5" ? "2px solid white" : "2px solid transparent"
                    }} />
                ))}
            </div>
        </div>
    );
}

function SlideLeads() {
    const rows = [
        { dot: "green", name: true, badge: "up", badgeTxt: "Hot" },
        { dot: "yellow", name: true, badge: "mid", badgeTxt: "Warm" },
        { dot: "purple", name: true, badge: "low", badgeTxt: "New" },
        { dot: "green", name: true, badge: "up", badgeTxt: "Hot" },
    ];
    return (
        <div className="pf-mock">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ height: 10, width: 80, borderRadius: 4, background: "rgba(196,181,253,0.2)" }} />
                <div style={{ height: 26, width: 90, borderRadius: 999, background: "var(--grad-brand)", opacity: 0.75 }} />
            </div>
            {rows.map((r, i) => (
                <div key={i} className="pf-mock__email-row">
                    <div className="pf-mock__avatar-sm" />
                    <div className="pf-mock__email-info">
                        <div className="pf-mock__email-name" />
                        <div className="pf-mock__email-addr" />
                    </div>
                    <span className={`pf-mock__badge pf-mock__badge--${r.badge}`}>{r.badgeTxt}</span>
                </div>
            ))}
        </div>
    );
}

function SlideAnalytics() {
    const heights = [30, 55, 42, 70, 88, 65, 78, 52, 90, 68, 45, 80];
    return (
        <div className="pf-mock">
            <div className="pf-mock__stats">
                <div className="pf-mock__stat">
                    <span className="pf-mock__stat-val">1.4k</span>
                    <span className="pf-mock__stat-lbl">Unique visits</span>
                </div>
                <div className="pf-mock__stat">
                    <span className="pf-mock__stat-val">312</span>
                    <span className="pf-mock__stat-lbl">Sign-ups</span>
                </div>
                <div className="pf-mock__stat">
                    <span className="pf-mock__stat-val">22%</span>
                    <span className="pf-mock__stat-lbl">Conversion</span>
                </div>
            </div>
            <div className="pf-mock__chart">
                {heights.map((h, i) => (
                    <div key={i} className="pf-mock__bar" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

function SlidePriority() {
    const items = [
        { dot: "green", w1: 120, w2: 90, badge: "up", txt: "↑ 94" },
        { dot: "yellow", w1: 100, w2: 70, badge: "mid", txt: "→ 61" },
        { dot: "purple", w1: 140, w2: 110, badge: "up", txt: "↑ 78" },
        { dot: "yellow", w1: 90, w2: 60, badge: "low", txt: "↓ 33" },
    ];
    return (
        <div className="pf-mock">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                {["All", "Hot", "Warm", "Archive"].map((lbl, i) => (
                    <div key={lbl} style={{
                        padding: "0.2rem 0.65rem", borderRadius: 999,
                        background: i === 0 ? "rgba(91,63,212,0.3)" : "transparent",
                        border: "1px solid rgba(139,111,245,0.15)",
                        fontSize: "0.68rem", fontFamily: "var(--font-ui)", fontWeight: 600,
                        color: i === 0 ? "rgba(196,181,253,0.9)" : "rgba(139,111,245,0.4)",
                    }}>{lbl}</div>
                ))}
            </div>
            <div className="pf-mock__list">
                {items.map((r, i) => (
                    <div key={i} className="pf-mock__list-row">
                        <div className={`pf-mock__dot pf-mock__dot--${r.dot}`} />
                        <div className="pf-mock__line" style={{ width: r.w1, flex: "none" }} />
                        <div className="pf-mock__line" style={{ width: r.w2, flex: "none", opacity: 0.5 }} />
                        <span className={`pf-mock__badge pf-mock__badge--${r.badge}`} style={{ marginLeft: "auto" }}>{r.txt}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SlideExport() {
    const integrations = [
        { label: "CSV Download", sub: "All leads + metrics", color: "rgba(52,211,153,0.8)", bg: "rgba(52,211,153,0.1)" },
        { label: "Mailchimp", sub: "Sync waitlist automatically", color: "rgba(255,189,46,0.8)", bg: "rgba(255,189,46,0.1)" },
        { label: "Notion / Airtable", sub: "Export idea scores", color: "rgba(139,111,245,0.8)", bg: "rgba(139,111,245,0.12)" },
    ];
    return (
        <div className="pf-mock">
            <div style={{ height: 10, width: 110, borderRadius: 4, background: "rgba(196,181,253,0.2)", marginBottom: "0.25rem" }} />
            <div className="pf-mock__export">
                {integrations.map((int, i) => (
                    <div key={i} className="pf-mock__export-row">
                        <div className="pf-mock__export-icon" style={{ background: int.bg }}>
                            <ExportIcon />
                        </div>
                        <div className="pf-mock__export-text">
                            <div className="pf-mock__export-title" />
                            <div className="pf-mock__export-sub" />
                        </div>
                        <div className="pf-mock__export-btn" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const SLIDES = {
    pages: <SlidePages />,
    leads: <SlideLeads />,
    analytics: <SlideAnalytics />,
    priority: <SlidePriority />,
    export: <SlideExport />,
};

/* ─────────────────────────────────────────────
   Hook: IntersectionObserver reveal
───────────────────────────────────────────── */
function useReveal(ref, opts = {}) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setV(true); obs.disconnect(); }
        }, { threshold: 0.12, ...opts });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return v;
}

/* ─────────────────────────────────────────────
   Features component
───────────────────────────────────────────── */
const AUTO_INTERVAL = 4500;

export default function Features() {
    const [active, setActive] = useState(0);
    const [exiting, setExiting] = useState(null);
    const timerRef = useRef(null);
    const fillRef = useRef(null);
    const stripRef = useRef(null);
    const stripVis = useReveal(stripRef);

    const switchTo = useCallback((idx) => {
        if (idx === active) return;
        setExiting(active);
        setTimeout(() => setExiting(null), 450);
        setActive(idx);
    }, [active]);

    /* Auto-advance */
    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActive(prev => (prev + 1) % FEATURES.length);
        }, AUTO_INTERVAL);
    }, []);

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [startTimer]);

    /* Restart timer on manual click */
    const handleTabClick = (idx) => {
        switchTo(idx);
        startTimer();
    };

    return (
        <>
            <style>{styles}</style>

            <section className="pf-feat" aria-labelledby="feat-heading">

                <div className="pf-feat__scanlines" aria-hidden="true" />
                <div className="pf-feat__orb pf-feat__orb--a" aria-hidden="true" />
                <div className="pf-feat__orb pf-feat__orb--b" aria-hidden="true" />

                <div className="pf-feat__inner">

                    {/* Header */}
                    <header className="pf-feat__header">
                        <div className="pf-feat__eyebrow" aria-hidden="true">
                            ✦ Platform Features
                        </div>
                        <h2 id="feat-heading" className="pf-feat__heading">
                            Built for founders who&nbsp;
                            <em>move fast</em>
                        </h2>
                        <p className="pf-feat__sub">
                            Five focused tools — designed to work together so you spend
                            less time tooling and more time learning.
                        </p>
                    </header>

                    {/* Showcase */}
                    <div className="pf-feat__showcase">

                        {/* Tab list */}
                        <ul className="pf-feat__tabs" role="tablist" aria-label="Feature tabs">
                            {FEATURES.map((feat, i) => (
                                <li key={feat.id} role="presentation">
                                    <button
                                        role="tab"
                                        id={`tab-${feat.id}`}
                                        aria-selected={active === i}
                                        aria-controls={`panel-${feat.id}`}
                                        className={`pf-feat__tab ${active === i ? "is-active" : ""}`}
                                        onClick={() => handleTabClick(i)}
                                        tabIndex={active === i ? 0 : -1}
                                    >
                                        <div className="pf-feat__tab-icon" aria-hidden="true">
                                            {feat.icon}
                                        </div>
                                        <div className="pf-feat__tab-text">
                                            <span className="pf-feat__tab-title">{feat.title}</span>
                                            <span className="pf-feat__tab-desc">{feat.desc}</span>
                                        </div>

                                        {/* Auto-advance progress bar */}
                                        {active === i && (
                                            <div className="pf-feat__tab-progress" aria-hidden="true">
                                                <div
                                                    ref={fillRef}
                                                    className="pf-feat__tab-progress-fill"
                                                    style={{
                                                        animation: `tabFill ${AUTO_INTERVAL}ms linear forwards`,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Panel */}
                        <div
                            className="pf-feat__panel"
                            role="tabpanel"
                            id={`panel-${FEATURES[active].id}`}
                            aria-labelledby={`tab-${FEATURES[active].id}`}
                        >
                            {/* Browser chrome */}
                            <div className="pf-feat__panel-chrome" aria-hidden="true">
                                <div className="pf-feat__chrome-dots">
                                    <div className="pf-feat__chrome-dot" />
                                    <div className="pf-feat__chrome-dot" />
                                    <div className="pf-feat__chrome-dot" />
                                </div>
                                <div className="pf-feat__chrome-bar">
                                    <LockIcon />
                                    <span className="pf-feat__chrome-url">
                                        {FEATURES[active].url}
                                    </span>
                                </div>
                            </div>

                            {/* Slide content */}
                            <div className="pf-feat__panel-content">
                                {FEATURES.map((feat, i) => (
                                    <div
                                        key={feat.id}
                                        className={[
                                            "pf-feat__slide",
                                            active === i ? "is-active" : "",
                                            exiting === i ? "is-exit" : "",
                                        ].filter(Boolean).join(" ")}
                                        aria-hidden={active !== i}
                                    >
                                        <p className="pf-feat__slide-title">{feat.title}</p>
                                        {SLIDES[feat.slide]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div
                        ref={stripRef}
                        className={`pf-feat__strip ${stripVis ? "is-visible" : ""}`}
                        aria-label="Platform statistics"
                    >
                        {STATS.map((s, i) => (
                            <div key={i} className="pf-feat__strip-item">
                                <span className="pf-feat__strip-num">{s.num}</span>
                                <span className="pf-feat__strip-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Keyframe for tab progress bar — injected separately to avoid re-renders */}
            <style>{`
        @keyframes tabFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
        </>
    );
}