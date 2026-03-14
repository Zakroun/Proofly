import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --color-void:     #0a0812;
    --color-deep:     #110d24;
    --color-plum:     #1e1542;
    --color-violet:   #3d2b8e;
    --color-iris:     #5b3fd4;
    --color-lavender: #8b6ff5;
    --color-mist:     #c4b5fd;
    --color-frost:    #ede9fe;
    --color-white:    #faf9ff;

    --grad-brand:     linear-gradient(135deg,#5b3fd4 0%,#8b6ff5 60%,#d8b4fe 100%);

    --font-display:   'DM Serif Display', Georgia, serif;
    --font-ui:        'Syne', sans-serif;
    --font-body:      'DM Sans', sans-serif;

    --ease-expo:      cubic-bezier(0.19,1,0.22,1);
    --ease-spring:    cubic-bezier(0.34,1.56,0.64,1);
  }

  .fp *, .fp *::before, .fp *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }

  /* ── shell ── */
  .fp {
    background: var(--color-void);
    font-family: var(--font-body);
    color: var(--color-white);
    overflow-x: hidden;
  }

  /* ── shared utils ── */
  .fp__wrap {
    max-width: 1120px; margin: 0 auto; padding: 0 1.5rem;
    position: relative; z-index: 1;
  }

  .fp__eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .3rem 1rem; border-radius: 999px;
    border: 1px solid rgba(139,111,245,.28);
    background: rgba(30,21,66,.5);
    font-family: var(--font-ui); font-size: .7rem; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: var(--color-lavender);
  }

  .fp__h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem,4vw,3.2rem); font-weight: 400;
    line-height: 1.1; letter-spacing: -.01em; color: var(--color-white);
  }
  .fp__h2 em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .fp__sub {
    font-size: 1.05rem; font-weight: 300; line-height: 1.75; color: rgba(196,181,253,.6);
  }

  /* ── reveal ── */
  .fp__rev {
    opacity: 0; transform: translateY(28px);
    transition: opacity .75s var(--ease-expo), transform .75s var(--ease-expo);
  }
  .fp__rev.in { opacity: 1; transform: translateY(0); }

  /* ── sr-only ── */
  .fp-sr { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0; }

  /* ════════════════════════════════════════════
     HERO
  ════════════════════════════════════════════ */
  .fp-hero {
    position: relative; overflow: hidden;
    padding: 9rem 1.5rem 6rem;
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2rem;
  }

  .fp-hero__grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,.05) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 70% at 50% 25%, black 20%, transparent 80%);
    pointer-events: none; z-index: 0;
  }

  .fp-hero__orb {
    position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; z-index: 0;
  }
  .fp-hero__orb--a {
    width: 680px; height: 520px; top: -140px; left: 50%; transform: translateX(-50%);
    background: radial-gradient(ellipse, rgba(61,43,142,.35) 0%, transparent 70%);
  }
  .fp-hero__orb--b {
    width: 340px; height: 340px; top: 30%; right: -80px;
    background: radial-gradient(circle, rgba(139,111,245,.14) 0%, transparent 70%);
  }

  .fp-hero__content {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
    max-width: 700px;
  }

  .fp-hero__heading {
    font-family: var(--font-display);
    font-size: clamp(2.8rem,6vw,5rem); font-weight: 400;
    line-height: 1.05; letter-spacing: -.02em;
  }
  .fp-hero__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .fp-hero__sub {
    font-size: 1.1rem; font-weight: 300; line-height: 1.75;
    color: rgba(196,181,253,.62); max-width: 520px;
  }

  /* CTA row */
  .fp-hero__ctas {
    display: flex; align-items: center; gap: .75rem;
    flex-wrap: wrap; justify-content: center; margin-top: .5rem;
  }

  .fp-btn-primary {
    display: inline-flex; align-items: center; gap: .4rem;
    padding: .88rem 2.1rem; border-radius: 999px;
    background: var(--grad-brand); background-size: 200% 200%; background-position: 0% 50%;
    font-family: var(--font-ui); font-size: .9rem; font-weight: 700;
    letter-spacing: .02em; color: var(--color-white); text-decoration: none;
    box-shadow: 0 4px 24px rgba(91,63,212,.45);
    transition: background-position .5s var(--ease-expo), box-shadow .3s ease, transform .25s var(--ease-spring);
  }
  .fp-btn-primary:hover, .fp-btn-primary:focus-visible {
    background-position: 100% 50%;
    box-shadow: 0 8px 40px rgba(91,63,212,.6);
    transform: translateY(-2px) scale(1.02); outline: none;
  }

  .fp-btn-ghost {
    display: inline-flex; align-items: center; gap: .4rem;
    padding: .88rem 1.8rem; border-radius: 999px;
    border: 1px solid rgba(139,111,245,.24); background: rgba(30,21,66,.4);
    font-family: var(--font-ui); font-size: .9rem; font-weight: 600;
    color: var(--color-mist); text-decoration: none;
    transition: background .3s ease, border-color .3s ease, transform .25s var(--ease-spring);
  }
  .fp-btn-ghost:hover, .fp-btn-ghost:focus-visible {
    background: rgba(61,43,142,.4); border-color: rgba(139,111,245,.5);
    color: var(--color-frost); transform: translateY(-2px); outline: none;
  }

  /* Stat bar */
  .fp-hero__stats {
    display: flex; align-items: center; gap: 2rem;
    flex-wrap: wrap; justify-content: center;
    padding: 1.5rem 2.5rem; border-radius: 18px;
    border: 1px solid rgba(139,111,245,.12);
    background: rgba(17,13,36,.7);
    backdrop-filter: blur(12px);
  }

  .fp-hero__stat { display: flex; flex-direction: column; align-items: center; gap: .15rem; }
  .fp-hero__stat-val {
    font-family: var(--font-display); font-size: 1.9rem; line-height: 1;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .fp-hero__stat-lbl {
    font-family: var(--font-ui); font-size: .68rem; font-weight: 600;
    letter-spacing: .06em; color: rgba(196,181,253,.45);
  }
  .fp-hero__stat-sep { width: 1px; height: 36px; background: rgba(139,111,245,.15); }

  /* ════════════════════════════════════════════
     FEATURE DEEP-DIVES — alternating layout
  ════════════════════════════════════════════ */
  .fp-deep { padding: 5rem 0; }

  .fp-deep__feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    padding: 4.5rem 1.5rem;
    max-width: 1120px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(139,111,245,.07);
  }
  .fp-deep__feature:last-child { border-bottom: none; }
  .fp-deep__feature--flip { direction: rtl; }
  .fp-deep__feature--flip > * { direction: ltr; }

  /* Text side */
  .fp-deep__text {
    display: flex; flex-direction: column; gap: 1.5rem;
  }

  .fp-deep__num {
    font-family: var(--font-display); font-size: .85rem; font-style: italic;
    color: rgba(139,111,245,.3); letter-spacing: .06em;
  }

  .fp-deep__title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem,3vw,2.6rem); font-weight: 400;
    line-height: 1.12; letter-spacing: -.01em; color: var(--color-white);
  }
  .fp-deep__title em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .fp-deep__desc {
    font-size: .95rem; font-weight: 300; line-height: 1.8;
    color: rgba(196,181,253,.58); max-width: 420px;
  }

  /* Bullet list */
  .fp-deep__bullets { list-style: none; display: flex; flex-direction: column; gap: .7rem; }

  .fp-deep__bullet {
    display: flex; align-items: flex-start; gap: .65rem;
    font-size: .875rem; font-weight: 300; line-height: 1.5;
    color: rgba(196,181,253,.65);
  }
  .fp-deep__bullet-icon {
    flex-shrink: 0; margin-top: 2px; width: 16px; height: 16px;
    color: var(--color-lavender);
  }

  .fp-deep__link {
    display: inline-flex; align-items: center; gap: .4rem;
    font-family: var(--font-ui); font-size: .8rem; font-weight: 600;
    color: rgba(139,111,245,.65); text-decoration: none;
    transition: color .2s ease, gap .2s var(--ease-spring);
    width: fit-content;
  }
  .fp-deep__link:hover, .fp-deep__link:focus-visible {
    color: var(--color-lavender); gap: .6rem; outline: none;
  }
  .fp-deep__link svg { width: 12px; height: 12px; }

  /* Preview pane */
  .fp-deep__preview {
    border-radius: 22px;
    border: 1px solid rgba(139,111,245,.15);
    background: rgba(17,13,36,.8);
    overflow: hidden;
    box-shadow: 0 20px 56px rgba(0,0,0,.45), 0 4px 16px rgba(91,63,212,.1);
    min-height: 320px;
    display: flex; flex-direction: column;
    transition: box-shadow .3s ease;
  }
  .fp-deep__feature:hover .fp-deep__preview {
    box-shadow: 0 24px 64px rgba(0,0,0,.5), 0 8px 24px rgba(91,63,212,.2);
  }

  /* Browser chrome */
  .fp-chrome {
    display: flex; align-items: center; gap: .65rem;
    padding: .75rem 1.1rem;
    background: rgba(10,8,18,.6);
    border-bottom: 1px solid rgba(139,111,245,.1);
    flex-shrink: 0;
  }
  .fp-chrome__dots { display: flex; gap: 5px; }
  .fp-chrome__dot { width: 9px; height: 9px; border-radius: 50%; }
  .fp-chrome__dot:nth-child(1) { background: rgba(255,95,86,.5); }
  .fp-chrome__dot:nth-child(2) { background: rgba(255,189,46,.5); }
  .fp-chrome__dot:nth-child(3) { background: rgba(39,201,63,.5); }
  .fp-chrome__bar {
    flex: 1; height: 24px; border-radius: 6px;
    background: rgba(30,21,66,.7);
    border: 1px solid rgba(139,111,245,.1);
    display: flex; align-items: center;
    padding: 0 .7rem; gap: .35rem;
  }
  .fp-chrome__lock { width: 8px; height: 8px; color: rgba(139,111,245,.4); }
  .fp-chrome__url { font-family: var(--font-body); font-size: .68rem; color: rgba(139,111,245,.4); }

  .fp-deep__preview-body { flex: 1; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

  /* ── mock UI atoms ── */
  .fp-mock-field {
    height: 34px; border-radius: 8px;
    background: rgba(30,21,66,.5);
    border: 1px solid rgba(139,111,245,.1);
  }
  .fp-mock-field--sm { width: 60%; }
  .fp-mock-field--lg { height: 72px; }
  .fp-mock-field--xs { width: 40%; }

  .fp-mock-label { height: 9px; border-radius: 4px; background: rgba(139,111,245,.2); margin-bottom: .3rem; }
  .fp-mock-label--sm { width: 55px; }
  .fp-mock-label--md { width: 90px; }

  .fp-mock-btn {
    height: 36px; border-radius: 8px;
    background: var(--grad-brand); opacity: .8;
  }
  .fp-mock-btn--pill { border-radius: 999px; }
  .fp-mock-btn--sm { height: 28px; }

  .fp-mock-row { display: flex; gap: .65rem; align-items: flex-end; }

  .fp-mock-stat {
    flex: 1; border-radius: 12px; padding: 1rem;
    background: rgba(30,21,66,.5); border: 1px solid rgba(139,111,245,.1);
    display: flex; flex-direction: column; gap: .35rem;
  }
  .fp-mock-stat__val {
    font-family: var(--font-ui); font-size: 1.25rem; font-weight: 800;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .fp-mock-stat__lbl { font-size: .68rem; color: rgba(139,111,245,.45); font-family: var(--font-body); font-weight: 300; }

  .fp-mock-bar-wrap {
    border-radius: 12px; padding: 1rem;
    background: rgba(30,21,66,.4); border: 1px solid rgba(139,111,245,.08);
    display: flex; align-items: flex-end; gap: 5px; min-height: 80px;
  }
  .fp-mock-bar {
    flex: 1; border-radius: 4px 4px 0 0;
    background: var(--grad-brand); opacity: .55;
    min-height: 6px;
  }
  .fp-mock-bar:nth-child(even) { opacity: .3; }

  .fp-mock-list-row {
    display: flex; align-items: center; gap: .75rem;
    padding: .65rem .9rem; border-radius: 10px;
    background: rgba(30,21,66,.4); border: 1px solid rgba(139,111,245,.08);
  }
  .fp-mock-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .fp-mock-dot--g { background: rgba(52,211,153,.7); }
  .fp-mock-dot--y { background: rgba(251,191,36,.7); }
  .fp-mock-dot--v { background: rgba(139,111,245,.7); }
  .fp-mock-line { height: 9px; border-radius: 4px; background: rgba(139,111,245,.18); }
  .fp-mock-chip {
    margin-left: auto; padding: .15rem .55rem; border-radius: 999px;
    font-family: var(--font-ui); font-size: .6rem; font-weight: 700;
  }
  .fp-mock-chip--g { background: rgba(52,211,153,.15); color: rgba(52,211,153,.8); }
  .fp-mock-chip--y { background: rgba(251,191,36,.15);  color: rgba(251,191,36,.8); }
  .fp-mock-chip--v { background: rgba(139,111,245,.15); color: rgba(139,111,245,.8); }

  .fp-mock-ab {
    display: grid; grid-template-columns: 1fr 1fr; gap: .65rem;
  }
  .fp-mock-ab-card {
    border-radius: 10px; padding: .9rem;
    background: rgba(30,21,66,.5); border: 1px solid rgba(139,111,245,.1);
    display: flex; flex-direction: column; gap: .5rem;
  }
  .fp-mock-ab-card--win { border-color: rgba(52,211,153,.25); background: rgba(52,211,153,.05); }
  .fp-mock-ab-label {
    font-family: var(--font-ui); font-size: .62rem; font-weight: 700;
    letter-spacing: .08em; color: rgba(139,111,245,.5);
  }
  .fp-mock-ab-card--win .fp-mock-ab-label { color: rgba(52,211,153,.7); }
  .fp-mock-ab-bar-track { height: 5px; border-radius: 999px; background: rgba(61,43,142,.3); overflow: hidden; }
  .fp-mock-ab-bar-fill  { height: 100%; background: var(--grad-brand); border-radius: 999px; }
  .fp-mock-ab-card--win .fp-mock-ab-bar-fill { background: linear-gradient(90deg,rgba(52,211,153,.5),rgba(52,211,153,.8)); }
  .fp-mock-ab-pct {
    font-family: var(--font-ui); font-size: .9rem; font-weight: 800;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .fp-mock-ab-card--win .fp-mock-ab-pct { -webkit-text-fill-color: rgba(52,211,153,.9); background: none; }

  .fp-mock-kanban { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .55rem; }
  .fp-mock-col {
    border-radius: 10px; padding: .75rem;
    background: rgba(30,21,66,.4); border: 1px solid rgba(139,111,245,.08);
    display: flex; flex-direction: column; gap: .5rem;
  }
  .fp-mock-col__head {
    font-family: var(--font-ui); font-size: .6rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase; color: rgba(139,111,245,.45);
    margin-bottom: .15rem;
  }
  .fp-mock-idea {
    border-radius: 7px; padding: .6rem .7rem;
    background: rgba(17,13,36,.7); border: 1px solid rgba(139,111,245,.1);
    font-size: .7rem; font-weight: 300; color: rgba(196,181,253,.55);
    line-height: 1.4;
  }
  .fp-mock-idea--highlight { border-color: rgba(139,111,245,.3); color: rgba(196,181,253,.8); }

  .fp-mock-export-row {
    display: flex; align-items: center; gap: .75rem;
    padding: .75rem 1rem; border-radius: 10px;
    background: rgba(30,21,66,.45); border: 1px solid rgba(139,111,245,.1);
  }
  .fp-mock-export-icon {
    width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .fp-mock-export-icon svg { width: 15px; height: 15px; }
  .fp-mock-export-lines { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .fp-mock-export-btn { height: 26px; width: 60px; border-radius: 999px; background: var(--grad-brand); opacity: .75; flex-shrink: 0; }

  /* ════════════════════════════════════════════
     CAPABILITY GRID — 6-cell bento
  ════════════════════════════════════════════ */
  .fp-bento { padding: 5rem 1.5rem; }

  .fp-bento__header {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1.1rem; margin-bottom: 3.5rem;
    max-width: 580px; margin-left: auto; margin-right: auto;
  }

  .fp-bento__grid {
    display: grid;
    grid-template-columns: repeat(12,1fr);
    gap: 1.25rem;
  }

  /* Slot assignments */
  .fp-bcell:nth-child(1) { grid-column: 1/6; }
  .fp-bcell:nth-child(2) { grid-column: 6/13; }
  .fp-bcell:nth-child(3) { grid-column: 1/5; }
  .fp-bcell:nth-child(4) { grid-column: 5/9; }
  .fp-bcell:nth-child(5) { grid-column: 9/13; }
  .fp-bcell:nth-child(6) { grid-column: 1/13; }

  .fp-bcell {
    border-radius: 22px;
    border: 1px solid rgba(139,111,245,.1);
    background: rgba(17,13,36,.7);
    padding: 2rem;
    display: flex; flex-direction: column; gap: 1.1rem;
    position: relative; overflow: hidden;
    transition: border-color .3s ease, box-shadow .3s ease, transform .3s var(--ease-spring);
  }
  .fp-bcell:hover {
    border-color: rgba(139,111,245,.25);
    box-shadow: 0 12px 40px rgba(0,0,0,.4), 0 4px 16px rgba(91,63,212,.15);
    transform: translateY(-3px);
  }

  /* Corner stripe */
  .fp-bcell::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,111,245,.25), transparent);
    opacity: 0; transition: opacity .3s ease;
  }
  .fp-bcell:hover::before { opacity: 1; }

  .fp-bcell__icon {
    width: 46px; height: 46px; border-radius: 13px;
    border: 1px solid rgba(139,111,245,.18);
    background: rgba(30,21,66,.7);
    display: flex; align-items: center; justify-content: center;
    color: var(--color-lavender);
    transition: background .3s ease, border-color .3s ease, transform .3s var(--ease-spring);
  }
  .fp-bcell:hover .fp-bcell__icon {
    background: rgba(61,43,142,.5); border-color: rgba(139,111,245,.4);
    transform: scale(1.1) rotate(-4deg);
  }
  .fp-bcell__icon svg { width: 20px; height: 20px; }

  .fp-bcell__title {
    font-family: var(--font-ui); font-size: 1rem; font-weight: 700;
    color: var(--color-frost); letter-spacing: -.01em;
    transition: color .2s ease;
  }
  .fp-bcell:hover .fp-bcell__title { color: var(--color-white); }

  .fp-bcell__desc {
    font-size: .875rem; font-weight: 300; line-height: 1.7;
    color: rgba(196,181,253,.55);
  }

  /* Wide cell (6th) — horizontal layout */
  .fp-bcell--wide {
    flex-direction: row; align-items: center; gap: 2.5rem;
  }
  .fp-bcell--wide .fp-bcell__info { display: flex; flex-direction: column; gap: .75rem; flex: 1; }
  .fp-bcell--wide .fp-bcell__visual { flex: 1; }

  /* Mini metric row inside bento */
  .fp-bcell__metrics {
    display: flex; gap: 1.25rem; margin-top: .25rem; flex-wrap: wrap;
  }
  .fp-bcell__metric { display: flex; flex-direction: column; gap: .1rem; }
  .fp-bcell__metric-val {
    font-family: var(--font-display); font-size: 1.5rem;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    line-height: 1;
  }
  .fp-bcell__metric-lbl {
    font-family: var(--font-ui); font-size: .65rem; font-weight: 600;
    letter-spacing: .06em; color: rgba(196,181,253,.4);
  }

  /* ════════════════════════════════════════════
     INTEGRATIONS BAND
  ════════════════════════════════════════════ */
  .fp-integ { padding: 5rem 1.5rem; }

  .fp-integ__header {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1.1rem; margin-bottom: 3rem;
  }

  .fp-integ__grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 1rem;
  }

  .fp-integ-card {
    border-radius: 18px; padding: 1.75rem 1.5rem;
    border: 1px solid rgba(139,111,245,.1);
    background: rgba(17,13,36,.65);
    display: flex; flex-direction: column; gap: 1rem;
    align-items: flex-start;
    transition: border-color .3s ease, transform .3s var(--ease-spring), box-shadow .3s ease;
    cursor: default;
  }
  .fp-integ-card:hover {
    border-color: rgba(139,111,245,.25);
    transform: translateY(-3px);
    box-shadow: 0 12px 36px rgba(0,0,0,.4), 0 4px 16px rgba(91,63,212,.12);
  }

  .fp-integ-card__logo {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-ui); font-size: .75rem; font-weight: 800;
    color: var(--color-white); flex-shrink: 0;
  }

  .fp-integ-card__name {
    font-family: var(--font-ui); font-size: .88rem; font-weight: 700;
    color: var(--color-mist);
  }

  .fp-integ-card__desc {
    font-size: .8rem; font-weight: 300; line-height: 1.6;
    color: rgba(196,181,253,.48); flex: 1;
  }

  .fp-integ-card__tag {
    display: inline-flex; align-items: center; gap: .3rem;
    padding: .2rem .6rem; border-radius: 999px;
    font-family: var(--font-ui); font-size: .62rem; font-weight: 700;
    letter-spacing: .06em;
    background: rgba(91,63,212,.14); border: 1px solid rgba(91,63,212,.22);
    color: rgba(139,111,245,.8);
  }
  .fp-integ-card__tag--live { background: rgba(52,211,153,.1); border-color: rgba(52,211,153,.2); color: rgba(52,211,153,.8); }

  /* ════════════════════════════════════════════
     WORKFLOW TIMELINE
  ════════════════════════════════════════════ */
  .fp-flow { padding: 5rem 1.5rem; }

  .fp-flow__header {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1.1rem; margin-bottom: 4rem;
    max-width: 560px; margin-left: auto; margin-right: auto;
  }

  .fp-flow__steps {
    position: relative; display: flex; flex-direction: column; gap: 0;
    max-width: 680px; margin: 0 auto;
  }

  /* Vertical line */
  .fp-flow__line {
    position: absolute; left: 23px; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, rgba(139,111,245,.35) 0%, rgba(139,111,245,.08) 100%);
    pointer-events: none;
  }

  .fp-flow__step {
    display: flex; gap: 1.5rem; padding: 1.75rem 0;
    border-bottom: 1px solid rgba(139,111,245,.06);
    position: relative;

    opacity: 0; transform: translateX(-16px);
    transition: opacity .65s var(--ease-expo), transform .65s var(--ease-expo);
  }
  .fp-flow__step:last-child { border-bottom: none; }
  .fp-flow__step.in { opacity: 1; transform: translateX(0); }

  .fp-flow__node {
    width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
    border: 1px solid rgba(139,111,245,.25);
    background: rgba(30,21,66,.8);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-ui); font-size: .7rem; font-weight: 800;
    color: rgba(139,111,245,.6); z-index: 1;
    transition: background .3s ease, border-color .3s ease;
  }
  .fp-flow__step:hover .fp-flow__node {
    background: rgba(61,43,142,.6); border-color: rgba(139,111,245,.5);
    color: var(--color-mist);
  }
  .fp-flow__node--active {
    background: rgba(61,43,142,.5) !important;
    border-color: rgba(139,111,245,.5) !important;
    box-shadow: 0 0 0 3px rgba(91,63,212,.15);
  }

  .fp-flow__body { flex: 1; padding-top: .35rem; }

  .fp-flow__step-title {
    font-family: var(--font-ui); font-size: .95rem; font-weight: 700;
    color: var(--color-frost); letter-spacing: -.01em; margin-bottom: .45rem;
  }
  .fp-flow__step-desc {
    font-size: .875rem; font-weight: 300; line-height: 1.7;
    color: rgba(196,181,253,.55);
  }
  .fp-flow__step-time {
    font-family: var(--font-ui); font-size: .68rem; font-weight: 600;
    letter-spacing: .08em; color: rgba(139,111,245,.4);
    margin-top: .6rem; text-transform: uppercase;
  }

  /* ════════════════════════════════════════════
     CTA BAND
  ════════════════════════════════════════════ */
  .fp-cta {
    position: relative; overflow: hidden;
    margin: 0 1.5rem 5rem;
    border-radius: 28px;
    border: 1px solid rgba(139,111,245,.18);
    background: rgba(17,13,36,.8);
    padding: 5rem 2rem;
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 2rem;
    box-shadow: 0 0 0 1px rgba(139,111,245,.05), 0 24px 64px rgba(0,0,0,.4);
  }
  .fp-cta::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--grad-brand); border-radius: 28px 28px 0 0;
  }
  .fp-cta__orb {
    position: absolute; width: 600px; height: 400px;
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: radial-gradient(ellipse, rgba(61,43,142,.28) 0%, transparent 70%);
    filter: blur(60px); pointer-events: none;
  }
  .fp-cta__inner {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
    max-width: 560px;
  }
  .fp-cta__heading {
    font-family: var(--font-display);
    font-size: clamp(2rem,4vw,3rem); font-weight: 400;
    line-height: 1.1; letter-spacing: -.01em;
  }
  .fp-cta__heading em {
    font-style: italic; background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .fp-cta__sub {
    font-size: 1rem; font-weight: 300; line-height: 1.7; color: rgba(196,181,253,.58);
  }
  .fp-cta__btns {
    display: flex; gap: .75rem; flex-wrap: wrap; justify-content: center;
  }
  .fp-cta__proof {
    display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; justify-content: center;
  }
  .fp-cta__proof-item {
    display: flex; align-items: center; gap: .4rem;
    font-size: .78rem; font-weight: 300; color: rgba(196,181,253,.4);
  }
  .fp-cta__proof-item svg { width: 12px; height: 12px; color: rgba(139,111,245,.55); }

  /* ════════════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════════════ */
  @media (max-width: 900px) {
    .fp-deep__feature, .fp-deep__feature--flip { grid-template-columns: 1fr; direction: ltr; gap: 2.5rem; padding: 3rem 1.25rem; }
    .fp-bento__grid { grid-template-columns: 1fr 1fr; }
    .fp-bcell:nth-child(n) { grid-column: auto; }
    .fp-bcell--wide { flex-direction: column; align-items: flex-start; }
    .fp-integ__grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 580px) {
    .fp-hero { padding: 7rem 1.25rem 4rem; }
    .fp-hero__stats { gap: 1.25rem; padding: 1.25rem 1.5rem; }
    .fp-hero__stat-sep { display: none; }
    .fp-bento__grid { grid-template-columns: 1fr; }
    .fp-integ__grid { grid-template-columns: 1fr; }
    .fp-cta { margin: 0 1rem 4rem; padding: 3.5rem 1.25rem; }
    .fp-cta__btns { flex-direction: column; width: 100%; }
    .fp-btn-primary, .fp-btn-ghost { width: 100%; justify-content: center; }
  }

  @media (prefers-reduced-motion: reduce) {
    .fp *, .fp *::before, .fp *::after {
      animation-duration: .01ms !important; transition-duration: .01ms !important;
    }
    .fp__rev, .fp-flow__step { opacity: 1 !important; transform: none !important; }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const PageIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 7h10M5 10h7M5 13h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);
const EmailIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);
const ChartIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14l4-5 4 3 4-7 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </svg>
);
const SortIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M5 10h10M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const ExportIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3v10M7 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 13v2.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const ABIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 16l4-10 4 10M5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="6" width="4" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);
const ZapIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M11 2L4 11h7l-2 7 7-9h-7l2-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);
const ShieldIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l7 3v5c0 4.5-3.2 7.8-7 9-3.8-1.2-7-4.5-7-9V5l7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2.5 2.5L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const LinkIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8 12a4 4 0 0 0 5.66 0l2-2a4 4 0 0 0-5.66-5.66l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 8a4 4 0 0 0-5.66 0l-2 2a4 4 0 0 0 5.66 5.66l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const StarBadge = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l2.4 6.5H19l-5.5 4 2 6.5L10 15l-5.5 4 2-6.5L1 8.5h6.6L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);
const ArrowRight = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const CheckSm = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5.5" fill="rgba(139,111,245,.15)" stroke="rgba(139,111,245,.35)" strokeWidth=".8" />
        <path d="M3.5 6l2 2 3-3" stroke="#8b6ff5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const CheckLi = () => (
    <svg className="fp-deep__bullet-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(91,63,212,.18)" stroke="rgba(139,111,245,.3)" strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#8b6ff5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const LockIcon = () => (
    <svg className="fp-chrome__lock" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <rect x="1" y="3.5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M2.5 3.5V2.5a1.5 1.5 0 0 1 3 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const HERO_STATS = [
    { val: "10 min", lbl: "Time to first live page" },
    { val: "3.2×", lbl: "More sign-ups vs forms" },
    { val: "94%", lbl: "User intent clarity" },
    { val: "200h", lbl: "Dev hours saved / idea" },
];

const DEEP_FEATURES = [
    {
        id: "builder",
        num: "01",
        title: <>Create <em>Landing Pages</em> in Minutes</>,
        desc: "Build conversion-optimised landing pages with zero code. Choose from proven templates, customise your headline, add your value prop — go live in 10 minutes.",
        bullets: [
            "Drag-and-drop block builder with real-time preview",
            "SEO-friendly meta titles and descriptions per page",
            "Custom domain mapping on Pro and Enterprise",
            "Mobile-responsive by default — no extra work needed",
        ],
        url: "proofly.io/builder",
        mock: "builder",
        flip: false,
    },
    {
        id: "leads",
        num: "02",
        title: <>Collect Emails &amp; <em>Structured Feedback</em></>,
        desc: "Every sign-up and feedback form response flows automatically into your dashboard. Tag leads by interest, score them by intent, and sync to your CRM in one click.",
        bullets: [
            "Smart forms with conditional logic and validation",
            "Automatic lead scoring based on engagement signals",
            "Segment leads by source, device, and response",
            "Export to CSV, JSON, Mailchimp, or Notion instantly",
        ],
        url: "proofly.io/leads",
        mock: "leads",
        flip: true,
    },
    {
        id: "analytics",
        num: "03",
        title: <>Real-Time <em>Analytics Dashboard</em></>,
        desc: "Track visits, scroll depth, CTA clicks, and conversion rate per idea — all in one place. No third-party setup, no data sampling, no surprises.",
        bullets: [
            "Funnel visualisation from visit to sign-up",
            "Daily, weekly, and monthly trend breakdowns",
            "Referral source tracking and UTM parameter support",
            "Side-by-side idea comparison to spot winners fast",
        ],
        url: "proofly.io/analytics",
        mock: "analytics",
        flip: false,
    },
    {
        id: "ab",
        num: "04",
        title: <>A/B Test Headlines <em>Without Code</em></>,
        desc: "Run split tests on any landing page headline or CTA copy directly in the dashboard. Proofly automatically surfaces the winner when statistical confidence is reached.",
        bullets: [
            "Visual editor — no engineering resources required",
            "Auto-declare winner at 95% statistical confidence",
            "Test up to 4 variants simultaneously on Enterprise",
            "Results feed back into your idea scoring automatically",
        ],
        url: "proofly.io/ab-testing",
        mock: "ab",
        flip: true,
    },
    {
        id: "management",
        num: "05",
        title: <>Organise &amp; <em>Prioritise Ideas</em></>,
        desc: "A kanban-style idea board with automatic demand scoring. Every idea gets a Proofly Score based on engagement, sign-ups, and velocity — so you always know what to build next.",
        bullets: [
            "Drag ideas across Backlog, Testing, and Validated columns",
            "Auto-generated Proofly Score based on real signals",
            "Archive low-performers with a single click",
            "Team comments and notes per idea on Enterprise",
        ],
        url: "proofly.io/ideas",
        mock: "management",
        flip: false,
    },
    {
        id: "export",
        num: "06",
        title: <><em>Export</em> Leads &amp; Metrics Anywhere</>,
        desc: "Your data belongs to you. Export everything in CSV or JSON, pipe leads to Mailchimp or your CRM, or sync your idea scores to Notion or Airtable.",
        bullets: [
            "One-click CSV and JSON export for all data",
            "Zapier-compatible webhook triggers on new sign-ups",
            "Native Mailchimp, Notion, and HubSpot integrations",
            "Full REST API access on Enterprise plans",
        ],
        url: "proofly.io/integrations",
        mock: "export",
        flip: true,
    },
];

const BENTO_CAPS = [
    { icon: <ZapIcon />, title: "10-Minute Setup", desc: "From signup to a live, public landing page in under 10 minutes. No installs, no config, no DNS headaches." },
    { icon: <ShieldIcon />, title: "SOC 2 Compliant", desc: "Your data and your leads' data are protected with enterprise-grade security, at every plan level." },
    { icon: <ABIcon />, title: "Smart A/B Engine", desc: "Statistical winner detection at 95% confidence. Test headlines, CTAs, and layouts without a data scientist." },
    { icon: <ChartIcon />, title: "Funnel Analytics", desc: "See exactly where visitors drop off in your funnel so you can iterate on the right piece." },
    { icon: <LinkIcon />, title: "Custom Domains", desc: "Map your own domain to every landing page on Pro and Enterprise for a fully branded experience." },
    {
        icon: <StarBadge />,
        title: "Proofly Score",
        desc: "An automatic demand signal score — combining sign-up velocity, scroll depth, and CTA conversion — for every idea you're testing.",
        wide: true,
        metrics: [
            { val: "4.9/5", lbl: "Avg. user rating" },
            { val: "2,400+", lbl: "Founders using it" },
            { val: "87%", lbl: "Decision accuracy" },
        ],
    },
];

const INTEGRATIONS = [
    { name: "Mailchimp", desc: "Auto-sync waitlist leads directly into your Mailchimp audience segments.", tag: "Live", tagLive: true, logoText: "MC", logoBg: "linear-gradient(135deg,#FFE01B,#FFB703)" },
    { name: "Notion", desc: "Push idea scores and lead counts to a Notion database in real time.", tag: "Live", tagLive: true, logoText: "N", logoBg: "linear-gradient(135deg,#333,#555)" },
    { name: "HubSpot", desc: "Sync leads directly into HubSpot contacts with source tagging.", tag: "Live", tagLive: true, logoText: "HS", logoBg: "linear-gradient(135deg,#ff7a59,#ff4a17)" },
    { name: "Zapier", desc: "Connect Proofly to 6,000+ apps. Trigger on new sign-up, export, and more.", tag: "Live", tagLive: true, logoText: "Z", logoBg: "linear-gradient(135deg,#ff4a00,#ff7452)" },
    { name: "Airtable", desc: "Route leads and idea scores into any Airtable base with one-click setup.", tag: "Soon", tagLive: false, logoText: "AT", logoBg: "linear-gradient(135deg,#1283da,#0f6fba)" },
    { name: "Slack", desc: "Get instant Slack notifications on new sign-ups, milestones, and winners.", tag: "Soon", tagLive: false, logoText: "S", logoBg: "linear-gradient(135deg,#4a154b,#611f69)" },
    { name: "HubSpot API", desc: "Full REST API with webhooks, rate-limit controls, and OpenAPI documentation.", tag: "Enterprise", tagLive: false, logoText: "API", logoBg: "linear-gradient(135deg,#3d2b8e,#5b3fd4)" },
    { name: "Webhooks", desc: "Fire custom HTTP webhooks on any event. Integrate with any internal system.", tag: "Pro+", tagLive: true, logoText: "WH", logoBg: "linear-gradient(135deg,#5b3fd4,#8b6ff5)" },
];

const FLOW_STEPS = [
    { num: "01", title: "Create your idea", desc: "Name your idea, write a one-line description, and choose a template. Takes 2 minutes.", time: "~2 min", active: false },
    { num: "02", title: "Build your page", desc: "Customise the headline, body copy, and CTA using the visual editor. No code required.", time: "~8 min", active: true },
    { num: "03", title: "Share & collect", desc: "Share your link on social, via email, or run a small paid ad. Collect real sign-ups.", time: "Day 1", active: false },
    { num: "04", title: "Read the signals", desc: "Watch your analytics dashboard fill up. Proofly flags intent patterns automatically.", time: "Day 2–7", active: false },
    { num: "05", title: "Decision time", desc: "Your Proofly Score tells you: build it, iterate, or kill it. Data over gut, always.", time: "Day 7", active: false },
];

const CTA_PROOF = ["No credit card required", "Free plan forever", "Setup in 10 minutes"];

/* ─────────────────────────────────────────────
   Mock UI components
───────────────────────────────────────────── */
function MockBuilder() {
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-row">
                <div style={{ flex: 1 }}>
                    <div className="fp-mock-label fp-mock-label--sm" />
                    <div className="fp-mock-field" />
                </div>
                <div style={{ flex: 1 }}>
                    <div className="fp-mock-label fp-mock-label--sm" />
                    <div className="fp-mock-field" />
                </div>
            </div>
            <div>
                <div className="fp-mock-label fp-mock-label--md" />
                <div className="fp-mock-field fp-mock-field--lg" />
            </div>
            <div className="fp-mock-row" style={{ alignItems: "center" }}>
                <div className="fp-mock-field" style={{ flex: 1 }} />
                <div className="fp-mock-btn fp-mock-btn--pill" style={{ width: 90 }} />
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 4 }}>
                {["#5b3fd4", "#8b6ff5", "#3d2b8e", "#c4b5fd", "#1e1542"].map(c => (
                    <div key={c} style={{
                        width: 22, height: 22, borderRadius: "50%", background: c, opacity: .75,
                        border: c === "#8b6ff5" ? "2px solid white" : "2px solid transparent"
                    }} />
                ))}
            </div>
        </div>
    );
}

function MockLeads() {
    const rows = [
        { dot: "g", line1: 120, line2: 90, chip: "g", chipTxt: "Hot" },
        { dot: "y", line1: 100, line2: 70, chip: "y", chipTxt: "Warm" },
        { dot: "v", line1: 140, line2: 110, chip: "v", chipTxt: "New" },
        { dot: "g", line1: 95, line2: 65, chip: "g", chipTxt: "Hot" },
    ];
    return (
        <div className="fp-deep__preview-body" style={{ gap: ".6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".25rem" }}>
                <div className="fp-mock-label fp-mock-label--md" />
                <div className="fp-mock-btn fp-mock-btn--pill fp-mock-btn--sm" style={{ width: 80 }} />
            </div>
            {rows.map((r, i) => (
                <div key={i} className="fp-mock-list-row">
                    <div className={`fp-mock-dot fp-mock-dot--${r.dot}`} />
                    <div className="fp-mock-line" style={{ width: r.line1 }} />
                    <div className="fp-mock-line" style={{ width: r.line2, opacity: .5 }} />
                    <span className={`fp-mock-chip fp-mock-chip--${r.chip}`}>{r.chipTxt}</span>
                </div>
            ))}
        </div>
    );
}

function MockAnalytics() {
    const bars = [28, 55, 42, 70, 88, 65, 78, 52, 90, 68, 45, 82];
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-row">
                {[{ v: "1.4k", l: "Visits" }, { v: "312", l: "Sign-ups" }, { v: "22%", l: "Conv." }].map(s => (
                    <div key={s.l} className="fp-mock-stat">
                        <span className="fp-mock-stat__val">{s.v}</span>
                        <span className="fp-mock-stat__lbl">{s.l}</span>
                    </div>
                ))}
            </div>
            <div className="fp-mock-bar-wrap">
                {bars.map((h, i) => <div key={i} className="fp-mock-bar" style={{ height: `${h}%` }} />)}
            </div>
        </div>
    );
}

function MockAB() {
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-ab">
                {[
                    { label: "Variant A", pct: "22%", fill: "22%", win: false },
                    { label: "Variant B ✓", pct: "38%", fill: "38%", win: true },
                ].map(v => (
                    <div key={v.label} className={`fp-mock-ab-card ${v.win ? "fp-mock-ab-card--win" : ""}`}>
                        <span className="fp-mock-ab-label">{v.label}</span>
                        <span className="fp-mock-ab-pct">{v.pct}</span>
                        <div className="fp-mock-ab-bar-track">
                            <div className="fp-mock-ab-bar-fill" style={{ width: v.fill }} />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: ".25rem" }}>
                <div className="fp-mock-label fp-mock-label--md" style={{ marginBottom: ".35rem" }} />
                <div className="fp-mock-kanban" style={{ gridTemplateColumns: "1fr" }}>
                    {["CTA text A vs B", "Headline variants", "Subhead test"].map((t, i) => (
                        <div key={t} className={`fp-mock-idea ${i === 0 ? "fp-mock-idea--highlight" : ""}`}>{t}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MockManagement() {
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-kanban">
                {[
                    { head: "Backlog", ideas: ["AI resume tool", "CRM for solos"] },
                    { head: "Testing", ideas: ["Micro-SaaS idea", "Newsletter tool"], highlight: [0] },
                    { head: "Validated", ideas: ["Proofly itself!"] },
                ].map(col => (
                    <div key={col.head} className="fp-mock-col">
                        <div className="fp-mock-col__head">{col.head}</div>
                        {col.ideas.map((idea, i) => (
                            <div key={idea} className={`fp-mock-idea ${col.highlight?.includes(i) ? "fp-mock-idea--highlight" : ""}`}>
                                {idea}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function MockExport() {
    const rows = [
        { label: "CSV Download", sub: "All leads + metrics", bg: "rgba(52,211,153,.12)", color: "rgba(52,211,153,.8)" },
        { label: "Mailchimp", sub: "Sync waitlist auto", bg: "rgba(255,183,3,.12)", color: "rgba(255,183,3,.8)" },
        { label: "Notion", sub: "Export idea scores", bg: "rgba(139,111,245,.12)", color: "rgba(139,111,245,.8)" },
    ];
    return (
        <div className="fp-deep__preview-body" style={{ gap: ".65rem" }}>
            <div className="fp-mock-label fp-mock-label--md" style={{ marginBottom: ".1rem" }} />
            {rows.map(r => (
                <div key={r.label} className="fp-mock-export-row">
                    <div className="fp-mock-export-icon" style={{ background: r.bg, color: r.color }}>
                        <ExportIcon />
                    </div>
                    <div className="fp-mock-export-lines">
                        <div className="fp-mock-label fp-mock-label--md" />
                        <div className="fp-mock-label fp-mock-label--sm" style={{ opacity: .6 }} />
                    </div>
                    <div className="fp-mock-export-btn" />
                </div>
            ))}
        </div>
    );
}

const MOCKS = { builder: MockBuilder, leads: MockLeads, analytics: MockAnalytics, ab: MockAB, management: MockManagement, export: MockExport };

const FEAT_URLS = {
    builder: "proofly.io/builder", leads: "proofly.io/leads",
    analytics: "proofly.io/analytics", ab: "proofly.io/ab-testing",
    management: "proofly.io/ideas", export: "proofly.io/integrations",
};

/* ─────────────────────────────────────────────
   Hook: intersection reveal
───────────────────────────────────────────── */
function useReveal(ref, delay = 0) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setTimeout(() => setV(true), delay);
                obs.disconnect();
            }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, delay]);
    return v;
}

function useRevealList(refs) {
    const [visible, setVisible] = useState([]);
    useEffect(() => {
        refs.forEach((ref, i) => {
            const el = ref.current;
            if (!el) return;
            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => setVisible(prev => prev.includes(i) ? prev : [...prev, i]), i * 120);
                    obs.disconnect();
                }
            }, { threshold: 0.15 });
            obs.observe(el);
        });
    }, []);
    return visible;
}

/* ─────────────────────────────────────────────
   Features page
───────────────────────────────────────────── */
export default function Features() {
    const bentoRef = useRef(null);
    const integRef = useRef(null);
    const flowRef = useRef(null);
    const ctaRef = useRef(null);
    const flowStepRefs = useRef(FLOW_STEPS.map(() => ({ current: null })));

    const bentoVis = useReveal(bentoRef);
    const integVis = useReveal(integRef);
    const ctaVis = useReveal(ctaRef);
    const flowStepsVis = useRevealList(flowStepRefs.current);

    // Deep feature section refs
    const deepRefs = useRef(DEEP_FEATURES.map(() => ({ current: null })));
    const deepVis = useRevealList(deepRefs.current);

    return (
        <>
            <style>{styles}</style>

            <div className="fp" role="main">

                {/* ── HERO ── */}
                <section className="fp-hero" aria-labelledby="fp-page-title">
                    <div className="fp-hero__grid" aria-hidden="true" />
                    <div className="fp-hero__orb fp-hero__orb--a" aria-hidden="true" />
                    <div className="fp-hero__orb fp-hero__orb--b" aria-hidden="true" />

                    <div className="fp-hero__content">
                        <div className="fp__eyebrow" aria-hidden="true">✦ Platform Features</div>

                        <h1 id="fp-page-title" className="fp-hero__heading">
                            Every tool you need to<br /><em>validate smarter</em>
                        </h1>

                        <p className="fp-hero__sub">
                            Six focused features that work together — taking you from raw idea to
                            data-backed decision without touching a line of product code.
                        </p>

                        <div className="fp-hero__ctas">
                            <Link to="/signup" className="fp-btn-primary" aria-label="Get started with Proofly for free">
                                Get Started Free <ArrowRight size={14} />
                            </Link>
                            <Link to="/pricing" className="fp-btn-ghost" aria-label="See pricing plans">
                                See Pricing
                            </Link>
                        </div>

                        <div className="fp-hero__stats" role="list" aria-label="Platform statistics">
                            {HERO_STATS.map((s, i) => (
                                <span key={s.lbl} style={{ display: "contents" }}>
                                    <div className="fp-hero__stat" role="listitem">
                                        <span className="fp-hero__stat-val">{s.val}</span>
                                        <span className="fp-hero__stat-lbl">{s.lbl}</span>
                                    </div>
                                    {i < HERO_STATS.length - 1 && <div className="fp-hero__stat-sep" aria-hidden="true" />}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DEEP DIVES ── */}
                <section className="fp-deep" aria-label="Feature deep-dives">
                    {DEEP_FEATURES.map((feat, i) => {
                        const MockComp = MOCKS[feat.mock];
                        return (
                            <div
                                key={feat.id}
                                ref={el => deepRefs.current[i] = { current: el }}
                                className={`fp-deep__feature fp__rev ${feat.flip ? "fp-deep__feature--flip" : ""} ${deepVis.includes(i) ? "in" : ""}`}
                                style={{ transitionDelay: "0ms" }}
                            >
                                {/* Text */}
                                <div className="fp-deep__text">
                                    <span className="fp-deep__num" aria-hidden="true">{feat.num}</span>
                                    <h2 className="fp-deep__title">{feat.title}</h2>
                                    <p className="fp-deep__desc">{feat.desc}</p>
                                    <ul className="fp-deep__bullets" aria-label="Key capabilities">
                                        {feat.bullets.map(b => (
                                            <li key={b} className="fp-deep__bullet">
                                                <CheckLi />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={`/${feat.id}`} className="fp-deep__link" aria-label={`Learn more about ${feat.id}`}>
                                        Learn more <ArrowRight size={12} />
                                    </Link>
                                </div>

                                {/* Preview */}
                                <div className="fp-deep__preview" aria-hidden="true">
                                    <div className="fp-chrome">
                                        <div className="fp-chrome__dots">
                                            <div className="fp-chrome__dot" /><div className="fp-chrome__dot" /><div className="fp-chrome__dot" />
                                        </div>
                                        <div className="fp-chrome__bar">
                                            <LockIcon />
                                            <span className="fp-chrome__url">{FEAT_URLS[feat.mock]}</span>
                                        </div>
                                    </div>
                                    <MockComp />
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* ── BENTO CAPABILITIES ── */}
                <section className="fp-bento" aria-labelledby="fp-bento-title" ref={bentoRef}>
                    <div className="fp__wrap">
                        <div className={`fp-bento__header fp__rev ${bentoVis ? "in" : ""}`}>
                            <div className="fp__eyebrow" aria-hidden="true">✦ Built-In Capabilities</div>
                            <h2 id="fp-bento-title" className="fp__h2">
                                More than you'd <em>expect</em>
                            </h2>
                            <p className="fp__sub">
                                Platform-wide capabilities baked into every plan — not bolted on as expensive add-ons.
                            </p>
                        </div>

                        <div className="fp-bento__grid" role="list">
                            {BENTO_CAPS.map((cap, i) => (
                                <article
                                    key={cap.title}
                                    className={`fp-bcell fp__rev ${cap.wide ? "fp-bcell--wide" : ""} ${bentoVis ? "in" : ""}`}
                                    style={{ transitionDelay: bentoVis ? `${i * 80}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`cap-${i}`}
                                >
                                    {cap.wide ? (
                                        <>
                                            <div className="fp-bcell__info">
                                                <div className="fp-bcell__icon" aria-hidden="true">{cap.icon}</div>
                                                <h3 id={`cap-${i}`} className="fp-bcell__title">{cap.title}</h3>
                                                <p className="fp-bcell__desc">{cap.desc}</p>
                                                <div className="fp-bcell__metrics" role="list" aria-label="Metrics">
                                                    {cap.metrics.map(m => (
                                                        <div key={m.lbl} className="fp-bcell__metric" role="listitem">
                                                            <span className="fp-bcell__metric-val">{m.val}</span>
                                                            <span className="fp-bcell__metric-lbl">{m.lbl}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="fp-bcell__visual" aria-hidden="true">
                                                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                                                    {[{ v: "94", l: "Idea score" }, { v: "↑ 38%", l: "Conv. rate" }, { v: "✓ Win", l: "A/B result" }].map(m => (
                                                        <div key={m.l} className="fp-mock-list-row">
                                                            <div className="fp-mock-dot fp-mock-dot--g" />
                                                            <div className="fp-mock-line" style={{ flex: 1 }} />
                                                            <span className="fp-mock-chip fp-mock-chip--g">{m.v}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="fp-bcell__icon" aria-hidden="true">{cap.icon}</div>
                                            <h3 id={`cap-${i}`} className="fp-bcell__title">{cap.title}</h3>
                                            <p className="fp-bcell__desc">{cap.desc}</p>
                                        </>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── INTEGRATIONS ── */}
                <section className="fp-integ" aria-labelledby="fp-integ-title" ref={integRef}>
                    <div className="fp__wrap">
                        <div className={`fp-integ__header fp__rev ${integVis ? "in" : ""}`}>
                            <div className="fp__eyebrow" aria-hidden="true">✦ Integrations</div>
                            <h2 id="fp-integ-title" className="fp__h2">
                                Connect your <em>whole stack</em>
                            </h2>
                            <p className="fp__sub" style={{ maxWidth: 480 }}>
                                Proofly slots into the tools you already use — no custom engineering required.
                            </p>
                        </div>

                        <div className="fp-integ__grid" role="list">
                            {INTEGRATIONS.map((intg, i) => (
                                <article
                                    key={intg.name}
                                    className={`fp-integ-card fp__rev ${integVis ? "in" : ""}`}
                                    style={{ transitionDelay: integVis ? `${i * 70}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`intg-${i}`}
                                >
                                    <div
                                        className="fp-integ-card__logo"
                                        style={{ background: intg.logoBg }}
                                        aria-hidden="true"
                                    >
                                        {intg.logoText}
                                    </div>
                                    <h3 id={`intg-${i}`} className="fp-integ-card__name">{intg.name}</h3>
                                    <p className="fp-integ-card__desc">{intg.desc}</p>
                                    <span className={`fp-integ-card__tag ${intg.tagLive ? "fp-integ-card__tag--live" : ""}`}>
                                        {intg.tag}
                                    </span>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WORKFLOW TIMELINE ── */}
                <section className="fp-flow" aria-labelledby="fp-flow-title">
                    <div className="fp__wrap">
                        <div ref={flowRef} className="fp-flow__header">
                            <div className="fp__eyebrow" aria-hidden="true">✦ How It Works</div>
                            <h2 id="fp-flow-title" className="fp__h2">
                                From idea to decision <em>in days</em>
                            </h2>
                            <p className="fp__sub">
                                A repeatable validation loop you can run on any idea, in any market, at any stage.
                            </p>
                        </div>

                        <div className="fp-flow__steps" role="list">
                            <div className="fp-flow__line" aria-hidden="true" />
                            {FLOW_STEPS.map((step, i) => (
                                <div
                                    key={step.num}
                                    ref={el => flowStepRefs.current[i] = { current: el }}
                                    className={`fp-flow__step ${flowStepsVis.includes(i) ? "in" : ""}`}
                                    role="listitem"
                                    aria-label={`Step ${step.num}: ${step.title}`}
                                >
                                    <div className={`fp-flow__node ${step.active ? "fp-flow__node--active" : ""}`} aria-hidden="true">
                                        {step.num}
                                    </div>
                                    <div className="fp-flow__body">
                                        <h3 className="fp-flow__step-title">{step.title}</h3>
                                        <p className="fp-flow__step-desc">{step.desc}</p>
                                        <p className="fp-flow__step-time">{step.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}