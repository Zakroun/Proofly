import { useState, useRef, useEffect } from "react";
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

    --grad-brand:     linear-gradient(135deg, #5b3fd4 0%, #8b6ff5 60%, #d8b4fe 100%);

    --font-display:   'DM Serif Display', Georgia, serif;
    --font-ui:        'Syne', sans-serif;
    --font-body:      'DM Sans', sans-serif;

    --ease-expo:      cubic-bezier(0.19, 1, 0.22, 1);
    --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pp *,
  .pp *::before,
  .pp *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Page shell ── */
  .pp {
    background: var(--color-void);
    font-family: var(--font-body);
    color: var(--color-white);
    overflow-x: hidden;
  }

  /* ── Shared section wrapper ── */
  .pp__wrap {
    position: relative;
    z-index: 1;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* ── Eyebrow ── */
  .pp__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: .3rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,.28);
    background: rgba(30,21,66,.5);
    font-family: var(--font-ui);
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--color-lavender);
  }

  /* ── Section heading ── */
  .pp__h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem,4vw,3.2rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -.01em;
    color: var(--color-white);
  }
  .pp__h2 em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Reveal animation utility ── */
  .pp__reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .7s var(--ease-expo), transform .7s var(--ease-expo);
  }
  .pp__reveal.in { opacity: 1; transform: translateY(0); }

  /* ────────────────────────────────────────────
     HERO
  ─────────────────────────────────────────── */
  .pp-hero {
    position: relative;
    overflow: hidden;
    padding: 9rem 1.5rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
  }

  /* Grid bg */
  .pp-hero__grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,.05) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, black 20%, transparent 80%);
    pointer-events: none; z-index: 0;
  }

  .pp-hero__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none; z-index: 0;
  }
  .pp-hero__orb--a {
    width: 700px; height: 500px;
    top: -160px; left: 50%; transform: translateX(-50%);
    background: radial-gradient(ellipse, rgba(61,43,142,.35) 0%, transparent 70%);
  }
  .pp-hero__orb--b {
    width: 300px; height: 300px;
    top: 40%; right: -60px;
    background: radial-gradient(circle, rgba(139,111,245,.14) 0%, transparent 70%);
  }

  .pp-hero__inner {
    position: relative; z-index: 1;
    display: flex; flex-direction: column;
    align-items: center; gap: 1.5rem;
    max-width: 680px;
  }

  .pp-hero__heading {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -.02em;
  }
  .pp-hero__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pp-hero__sub {
    font-size: 1.05rem; font-weight: 300; line-height: 1.75;
    color: rgba(196,181,253,.6); max-width: 500px;
  }

  /* Social proof bar */
  .pp-hero__proof {
    display: flex; align-items: center; gap: 1.25rem;
    flex-wrap: wrap; justify-content: center; margin-top: .5rem;
  }
  .pp-hero__proof-item {
    display: flex; align-items: center; gap: .45rem;
    font-family: var(--font-ui); font-size: .75rem; font-weight: 600;
    color: rgba(196,181,253,.5); letter-spacing: .02em;
  }
  .pp-hero__proof-item svg { width: 14px; height: 14px; color: var(--color-lavender); opacity: .7; }
  .pp-hero__proof-item strong { color: var(--color-mist); font-weight: 700; }
  .pp-hero__proof-sep {
    width: 1px; height: 18px;
    background: rgba(139,111,245,.2);
  }

  /* ── Toggle ── */
  .pp-hero__toggle {
    display: flex; align-items: center; gap: 1rem;
  }

  .pp-toggle-label {
    font-family: var(--font-ui); font-size: .82rem; font-weight: 600;
    color: rgba(196,181,253,.45); cursor: pointer;
    transition: color .2s ease;
  }
  .pp-toggle-label.on { color: var(--color-mist); }

  .pp-toggle {
    position: relative; width: 50px; height: 28px;
    border-radius: 999px;
    background: rgba(30,21,66,.8);
    border: 1px solid rgba(139,111,245,.22);
    cursor: pointer;
    transition: background .3s ease, border-color .3s ease;
  }
  .pp-toggle.on {
    background: rgba(61,43,142,.55);
    border-color: rgba(139,111,245,.45);
  }
  .pp-toggle:focus-visible { outline: 2px solid rgba(139,111,245,.6); outline-offset: 3px; }

  .pp-toggle__thumb {
    position: absolute; top: 4px; left: 4px;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--grad-brand);
    box-shadow: 0 2px 8px rgba(91,63,212,.5);
    transition: transform .35s var(--ease-spring);
  }
  .pp-toggle.on .pp-toggle__thumb { transform: translateX(22px); }

  .pp-toggle-save {
    padding: .2rem .6rem; border-radius: 999px;
    background: rgba(52,211,153,.1);
    border: 1px solid rgba(52,211,153,.22);
    font-family: var(--font-ui); font-size: .65rem; font-weight: 700;
    letter-spacing: .06em; color: rgba(52,211,153,.8);
  }

  /* ────────────────────────────────────────────
     PLANS GRID
  ─────────────────────────────────────────── */
  .pp-plans {
    padding: 3rem 1.5rem 5rem;
  }

  .pp-plans__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    align-items: start;
  }

  /* ── Single card ── */
  .pp-card {
    position: relative;
    border-radius: 24px;
    padding: 2.25rem 2rem 2rem;
    background: rgba(17,13,36,.75);
    border: 1px solid rgba(139,111,245,.1);
    display: flex; flex-direction: column; gap: 1.75rem;
    overflow: hidden;
    transition:
      border-color .3s ease, box-shadow .3s ease,
      transform .3s var(--ease-spring),
      opacity .7s var(--ease-expo);
  }

  .pp-card.pp__reveal { transform: translateY(28px); }
  .pp-card.pp__reveal.in { transform: translateY(0); }

  .pp-card:hover:not(.pp-card--feat) {
    border-color: rgba(139,111,245,.24);
    box-shadow: 0 16px 48px rgba(0,0,0,.4), 0 4px 16px rgba(91,63,212,.15);
    transform: translateY(-4px);
  }

  /* Featured */
  .pp-card--feat {
    background: rgba(30,21,66,.85);
    border-color: rgba(139,111,245,.32);
    box-shadow: 0 0 0 1px rgba(139,111,245,.08),
                0 24px 64px rgba(0,0,0,.5),
                0 8px 32px rgba(91,63,212,.25);
    padding-top: 2.75rem;
    padding-bottom: 2.75rem;
    transform: translateY(-10px) !important;
  }
  .pp-card--feat.pp__reveal.in { transform: translateY(-10px) !important; }
  .pp-card--feat:hover {
    border-color: rgba(196,181,253,.28) !important;
    box-shadow: 0 0 0 1px rgba(196,181,253,.1),
                0 32px 80px rgba(0,0,0,.5),
                0 12px 40px rgba(91,63,212,.35) !important;
    transform: translateY(-14px) !important;
  }

  /* Gradient top line */
  .pp-card--feat::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--grad-brand);
    border-radius: 24px 24px 0 0;
  }

  /* Corner glow */
  .pp-card__glow {
    position: absolute; top: -80px; right: -80px;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(91,63,212,.22) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Badge */
  .pp-card__badge {
    position: absolute; top: -1px; right: 1.75rem;
    padding: .35rem .85rem;
    border-radius: 0 0 10px 10px;
    background: var(--grad-brand);
    font-family: var(--font-ui); font-size: .63rem; font-weight: 800;
    letter-spacing: .1em; text-transform: uppercase;
    color: var(--color-white);
    box-shadow: 0 4px 12px rgba(91,63,212,.4);
  }

  /* Head */
  .pp-card__head { display: flex; flex-direction: column; gap: .5rem; }

  .pp-card__name {
    font-family: var(--font-ui); font-size: .75rem; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    color: rgba(139,111,245,.65);
  }
  .pp-card--feat .pp-card__name { color: var(--color-lavender); }

  .pp-card__price-row {
    display: flex; align-items: baseline; gap: .4rem;
  }

  .pp-card__price {
    font-family: var(--font-display);
    font-size: 3.2rem; font-weight: 400; line-height: 1;
    letter-spacing: -.025em;
    color: var(--color-white);
    transition: all .4s var(--ease-expo);
  }
  .pp-card--feat .pp-card__price {
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pp-card__period {
    font-size: .82rem; font-weight: 300;
    color: rgba(196,181,253,.4); padding-bottom: .15rem;
  }

  .pp-card__save {
    font-family: var(--font-ui); font-size: .68rem; font-weight: 600;
    color: rgba(52,211,153,.7); min-height: 1.1em;
    transition: opacity .3s ease;
  }

  .pp-card__desc {
    font-size: .85rem; font-weight: 300; line-height: 1.6;
    color: rgba(196,181,253,.48); margin-top: .2rem;
  }

  /* Divider */
  .pp-card__div {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,111,245,.15), transparent);
  }
  .pp-card--feat .pp-card__div {
    background: linear-gradient(90deg, transparent, rgba(139,111,245,.32), transparent);
  }

  /* Features */
  .pp-card__features { list-style: none; display: flex; flex-direction: column; gap: .7rem; flex: 1; }

  .pp-card__feat {
    display: flex; align-items: flex-start; gap: .65rem;
    font-size: .875rem; font-weight: 300;
    color: rgba(196,181,253,.6); line-height: 1.4;
  }
  .pp-card--feat .pp-card__feat { color: rgba(237,233,254,.72); }
  .pp-card__feat--off { opacity: .32; }

  .pp-card__feat-icon { flex-shrink: 0; margin-top: 1px; width: 16px; height: 16px; }

  /* CTA */
  .pp-card__cta {
    display: flex; align-items: center; justify-content: center; gap: .4rem;
    padding: .88rem 1.5rem; border-radius: 12px;
    font-family: var(--font-ui); font-size: .88rem; font-weight: 700;
    letter-spacing: .02em; text-decoration: none; border: none; cursor: pointer;
    transition: all .3s var(--ease-spring);
  }
  .pp-card__cta--ghost {
    background: rgba(30,21,66,.6);
    border: 1px solid rgba(139,111,245,.2);
    color: rgba(196,181,253,.65);
  }
  .pp-card__cta--ghost:hover,
  .pp-card__cta--ghost:focus-visible {
    background: rgba(61,43,142,.4);
    border-color: rgba(139,111,245,.42);
    color: var(--color-frost);
    transform: translateY(-2px);
    outline: none;
  }
  .pp-card__cta--primary {
    background: var(--grad-brand); background-size: 200% 200%; background-position: 0% 50%;
    color: var(--color-white);
    box-shadow: 0 4px 20px rgba(91,63,212,.45);
  }
  .pp-card__cta--primary:hover,
  .pp-card__cta--primary:focus-visible {
    background-position: 100% 50%;
    box-shadow: 0 6px 32px rgba(91,63,212,.6);
    transform: translateY(-2px) scale(1.02);
    outline: none;
  }
  .pp-card__cta--outline {
    background: transparent;
    border: 1px solid rgba(139,111,245,.22);
    color: rgba(196,181,253,.55);
  }
  .pp-card__cta--outline:hover,
  .pp-card__cta--outline:focus-visible {
    background: rgba(30,21,66,.5);
    border-color: rgba(139,111,245,.4);
    color: var(--color-mist);
    transform: translateY(-2px);
    outline: none;
  }

  /* ────────────────────────────────────────────
     FEATURE MARQUEE
  ─────────────────────────────────────────── */
  .pp-marquee {
    padding: 0 0 5rem;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }

  .pp-marquee__track {
    display: flex; gap: 1rem; width: max-content;
    animation: mq 30s linear infinite;
  }
  .pp-marquee__track:hover { animation-play-state: paused; }

  @keyframes mq {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .pp-marquee__chip {
    display: inline-flex; align-items: center; gap: .55rem;
    padding: .55rem 1.1rem; white-space: nowrap;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,.15);
    background: rgba(17,13,36,.7);
    font-family: var(--font-ui); font-size: .72rem; font-weight: 600;
    letter-spacing: .04em; color: rgba(196,181,253,.55);
  }
  .pp-marquee__chip svg { width: 13px; height: 13px; color: var(--color-lavender); opacity: .7; }

  /* ────────────────────────────────────────────
     COMPARISON TABLE
  ─────────────────────────────────────────── */
  .pp-table-sec {
    padding: 0 1.5rem 6rem;
  }

  .pp-table-sec__header {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1.1rem; margin-bottom: 3rem;
  }

  .pp-table-wrap {
    overflow-x: auto;
    border-radius: 20px;
    border: 1px solid rgba(139,111,245,.12);
    box-shadow: 0 16px 48px rgba(0,0,0,.35);
  }

  .pp-table {
    width: 100%; border-collapse: collapse; min-width: 640px;
  }

  /* Header row */
  .pp-table thead tr th {
    padding: 1.25rem 1.5rem;
    background: rgba(17,13,36,.9);
    border-bottom: 1px solid rgba(139,111,245,.12);
    font-family: var(--font-ui); font-size: .72rem; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(139,111,245,.55); text-align: left;
  }
  .pp-table thead tr th:nth-child(3) {
    /* Pro column */
    background: rgba(30,21,66,.95);
    border-left:  1px solid rgba(139,111,245,.18);
    border-right: 1px solid rgba(139,111,245,.18);
    color: var(--color-lavender);
  }
  .pp-table thead tr th:nth-child(3) span {
    display: inline-block;
    background: var(--grad-brand); padding: .2rem .6rem; border-radius: 6px;
    font-size: .65rem; margin-left: .4rem; color: var(--color-white);
    -webkit-text-fill-color: initial;
  }

  /* Category rows */
  .pp-table__category td {
    padding: .7rem 1.5rem;
    background: rgba(10,8,18,.6);
    font-family: var(--font-ui); font-size: .68rem; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(139,111,245,.4);
    border-top: 1px solid rgba(139,111,245,.07);
    border-bottom: 1px solid rgba(139,111,245,.07);
  }

  /* Data rows */
  .pp-table tbody tr:not(.pp-table__category) td {
    padding: .9rem 1.5rem;
    border-bottom: 1px solid rgba(139,111,245,.06);
    font-size: .85rem; font-weight: 300;
    color: rgba(196,181,253,.55);
    background: rgba(17,13,36,.55);
  }
  .pp-table tbody tr:not(.pp-table__category):last-child td { border-bottom: none; }

  .pp-table tbody tr:not(.pp-table__category) td:first-child {
    color: rgba(237,233,254,.65); font-weight: 400;
  }

  /* Pro column highlight */
  .pp-table tbody tr:not(.pp-table__category) td:nth-child(3),
  .pp-table tbody tr:not(.pp-table__category) td:nth-child(3) {
    background: rgba(30,21,66,.5);
    border-left:  1px solid rgba(139,111,245,.12);
    border-right: 1px solid rgba(139,111,245,.12);
    color: rgba(196,181,253,.78);
  }

  .pp-table tr:hover:not(.pp-table__category) td { background: rgba(30,21,66,.4); }
  .pp-table tr:hover:not(.pp-table__category) td:nth-child(3) { background: rgba(61,43,142,.35); }

  .pp-check { color: var(--color-lavender); font-size: 1rem; }
  .pp-cross  { color: rgba(139,111,245,.22); font-size: .9rem; }

  /* ────────────────────────────────────────────
     TESTIMONIAL ROW
  ─────────────────────────────────────────── */
  .pp-testi-sec {
    padding: 0 1.5rem 6rem;
  }

  .pp-testi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .pp-testi-card {
    border-radius: 20px;
    padding: 1.75rem;
    border: 1px solid rgba(139,111,245,.1);
    background: rgba(17,13,36,.7);
    display: flex; flex-direction: column; gap: 1.1rem;
    position: relative; overflow: hidden;
    transition: border-color .3s ease, transform .3s var(--ease-spring);
  }
  .pp-testi-card:hover {
    border-color: rgba(139,111,245,.26);
    transform: translateY(-3px);
  }
  .pp-testi-card::after {
    content: '\u201C';
    position: absolute; top: -.5rem; right: 1.25rem;
    font-family: var(--font-display); font-size: 7rem; line-height: 1;
    color: rgba(91,63,212,.1); pointer-events: none;
    transition: color .3s ease;
  }
  .pp-testi-card:hover::after { color: rgba(91,63,212,.2); }

  .pp-testi-stars { display: flex; gap: 3px; font-size: .8rem; color: #f5c542; }

  .pp-testi-quote {
    font-family: var(--font-display); font-style: italic;
    font-size: .95rem; line-height: 1.65;
    color: rgba(237,233,254,.78); flex: 1; position: relative; z-index: 1;
  }

  .pp-testi-author { display: flex; align-items: center; gap: .8rem; }

  .pp-testi-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-ui); font-size: .68rem; font-weight: 800;
    color: var(--color-white); flex-shrink: 0;
    box-shadow: 0 0 0 2px rgba(91,63,212,.3);
  }
  .pp-testi-name {
    font-family: var(--font-ui); font-size: .82rem; font-weight: 700;
    color: var(--color-mist); line-height: 1.2;
  }
  .pp-testi-role {
    font-size: .72rem; font-weight: 300; color: rgba(196,181,253,.42);
  }

  /* ────────────────────────────────────────────
     FAQ
  ─────────────────────────────────────────── */
  .pp-faq {
    padding: 0 1.5rem 6rem;
    display: flex; flex-direction: column; align-items: center; gap: 3rem;
  }

  .pp-faq__header {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1.1rem; max-width: 540px;
  }

  .pp-faq__list {
    width: 100%; max-width: 700px;
    display: flex; flex-direction: column; gap: .75rem;
  }

  .pp-faq__item {
    border-radius: 16px;
    border: 1px solid rgba(139,111,245,.1);
    background: rgba(17,13,36,.6);
    overflow: hidden;
    transition: border-color .25s ease;
  }
  .pp-faq__item:hover,
  .pp-faq__item.open { border-color: rgba(139,111,245,.22); }

  .pp-faq__q {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; gap: 1rem;
    padding: 1.1rem 1.35rem;
    background: none; border: none; cursor: pointer; text-align: left;
    font-family: var(--font-ui); font-size: .875rem; font-weight: 600;
    color: rgba(196,181,253,.65);
    transition: color .2s ease;
  }
  .pp-faq__item.open .pp-faq__q { color: var(--color-frost); }
  .pp-faq__q:focus-visible { outline: 2px solid rgba(139,111,245,.5); outline-offset: -2px; }

  .pp-faq__chevron {
    width: 16px; height: 16px; flex-shrink: 0;
    color: rgba(139,111,245,.45);
    transition: transform .35s var(--ease-spring);
  }
  .pp-faq__item.open .pp-faq__chevron { transform: rotate(180deg); }

  .pp-faq__body {
    max-height: 0; overflow: hidden;
    transition: max-height .45s var(--ease-expo);
  }
  .pp-faq__item.open .pp-faq__body { max-height: 300px; }

  .pp-faq__a {
    padding: 0 1.35rem 1.2rem;
    font-size: .85rem; font-weight: 300; line-height: 1.75;
    color: rgba(196,181,253,.5);
  }

  /* ────────────────────────────────────────────
     CLOSING CTA BAND
  ─────────────────────────────────────────── */
  .pp-cta {
    position: relative; overflow: hidden;
    margin: 0 1.5rem 5rem;
    border-radius: 28px;
    border: 1px solid rgba(139,111,245,.18);
    background: rgba(17,13,36,.8);
    padding: 5rem 2rem;
    display: flex; flex-direction: column;
    align-items: center; text-align: center; gap: 2rem;
    box-shadow: 0 0 0 1px rgba(139,111,245,.06), 0 24px 64px rgba(0,0,0,.4);
  }
  .pp-cta::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--grad-brand); border-radius: 28px 28px 0 0;
  }

  .pp-cta__orb {
    position: absolute; width: 600px; height: 400px;
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: radial-gradient(ellipse, rgba(61,43,142,.28) 0%, transparent 70%);
    filter: blur(60px); pointer-events: none;
  }

  .pp-cta__inner {
    position: relative; z-index: 1;
    display: flex; flex-direction: column;
    align-items: center; gap: 1.5rem; max-width: 580px;
  }

  .pp-cta__heading {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400; line-height: 1.1; letter-spacing: -.01em;
  }
  .pp-cta__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; background-clip: text;
  }

  .pp-cta__sub {
    font-size: 1rem; font-weight: 300; line-height: 1.7;
    color: rgba(196,181,253,.58);
  }

  .pp-cta__btns {
    display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; justify-content: center;
  }

  .pp-btn-primary {
    display: inline-flex; align-items: center; gap: .45rem;
    padding: .88rem 2.2rem; border-radius: 999px;
    background: var(--grad-brand); background-size: 200% 200%; background-position: 0% 50%;
    font-family: var(--font-ui); font-size: .9rem; font-weight: 700;
    letter-spacing: .02em; color: var(--color-white); text-decoration: none;
    box-shadow: 0 4px 24px rgba(91,63,212,.45);
    transition: background-position .5s var(--ease-expo), box-shadow .3s ease, transform .25s var(--ease-spring);
  }
  .pp-btn-primary:hover,
  .pp-btn-primary:focus-visible {
    background-position: 100% 50%;
    box-shadow: 0 8px 40px rgba(91,63,212,.6);
    transform: translateY(-2px) scale(1.02);
    outline: none;
  }

  .pp-btn-ghost {
    display: inline-flex; align-items: center; gap: .45rem;
    padding: .88rem 1.8rem; border-radius: 999px;
    border: 1px solid rgba(139,111,245,.24);
    background: rgba(30,21,66,.4);
    font-family: var(--font-ui); font-size: .9rem; font-weight: 600;
    color: var(--color-mist); text-decoration: none;
    transition: background .3s ease, border-color .3s ease, transform .25s var(--ease-spring);
  }
  .pp-btn-ghost:hover,
  .pp-btn-ghost:focus-visible {
    background: rgba(61,43,142,.4); border-color: rgba(139,111,245,.5);
    color: var(--color-frost); transform: translateY(-2px);
    outline: none;
  }

  .pp-cta__proof {
    display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; justify-content: center;
  }
  .pp-cta__proof-item {
    display: flex; align-items: center; gap: .4rem;
    font-size: .78rem; font-weight: 300; color: rgba(196,181,253,.4);
  }
  .pp-cta__proof-item svg { width: 12px; height: 12px; color: rgba(139,111,245,.55); }

  /* ────────────────────────────────────────────
     RESPONSIVE
  ─────────────────────────────────────────── */
  @media (max-width: 900px) {
    .pp-plans__grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
    .pp-card--feat  { transform: none !important; }
    .pp-card--feat.pp__reveal.in { transform: none !important; }
    .pp-card--feat:hover { transform: translateY(-4px) !important; }
    .pp-testi-grid  { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .pp-hero { padding: 7rem 1.25rem 4rem; }
    .pp-cta  { margin: 0 1rem 4rem; padding: 3.5rem 1.25rem; }
    .pp-cta__btns { flex-direction: column; width: 100%; }
    .pp-btn-primary, .pp-btn-ghost { width: 100%; justify-content: center; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pp *, .pp *::before, .pp *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
    .pp__reveal { opacity: 1 !important; transform: none !important; }
    .pp-card--feat { transform: translateY(-10px) !important; }
  }

  .pp-sr { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0; }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const CheckFill = ({ feat }) => (
    <svg className="pp-card__feat-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7"
            fill={feat ? "rgba(91,63,212,.28)" : "rgba(91,63,212,.18)"}
            stroke={feat ? "rgba(139,111,245,.5)" : "rgba(139,111,245,.3)"}
            strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5"
            stroke={feat ? "#c4b5fd" : "#8b6ff5"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MinusFill = () => (
    <svg className="pp-card__feat-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(30,21,66,.5)" stroke="rgba(139,111,245,.1)" strokeWidth="1" />
        <path d="M5.5 8h5" stroke="rgba(139,111,245,.25)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ArrowRight = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDown = () => (
    <svg className="pp-faq__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StarIcon = () => <span style={{ color: "#f5c542" }} aria-hidden="true">★</span>;

const CheckSmall = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5.5" fill="rgba(139,111,245,.18)" stroke="rgba(139,111,245,.35)" strokeWidth=".8" />
        <path d="M3.5 6l2 2 3-3" stroke="#8b6ff5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Feature icon chips */
const ZapIcon = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M7.5 1.5L2 7.5h5l-1 4 5.5-6H6.5l1-4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
);
const LayersIcon = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M1.5 5L6.5 2l5 3-5 3-5-3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M1.5 8l5 3 5-3M1.5 11l5 3 5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </svg>
);
const ShieldIcon = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.5 1.5l5 2v4c0 3-2.5 4.5-5 5-2.5-.5-5-2-5-5v-4l5-2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 6.5l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const ChartIcon = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M1.5 10l3-3.5 3 2 3-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const UsersIcon = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10 5.5a2 2 0 0 1 0 4M11.5 11c0-1.5-1.2-2.8-2.5-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity=".6" />
    </svg>
);
const ExportIcon = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.5 1.5v7M4 5l2.5-3.5L9 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 9v1.5A1.5 1.5 0 0 0 3.5 12h6a1.5 1.5 0 0 0 1.5-1.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const PLANS = [
    {
        id: "starter", name: "Starter", badge: null, featured: false,
        monthly: 0, annual: 0,
        desc: "Test your first idea. No card needed, no time limit.",
        cta: "Start for Free", ctaStyle: "ghost", to: "/signup",
        features: [
            { text: "1 active idea", on: true },
            { text: "Basic landing page builder", on: true },
            { text: "Up to 100 sign-ups", on: true },
            { text: "Basic analytics", on: true },
            { text: "Email capture", on: true },
            { text: "Advanced analytics", on: false },
            { text: "Lead export (CSV)", on: false },
            { text: "A/B testing", on: false },
            { text: "Team seats", on: false },
        ],
    },
    {
        id: "pro", name: "Pro", badge: "Most Popular", featured: true,
        monthly: 19, annual: 14,
        desc: "For founders running multiple validation experiments in parallel.",
        cta: "Start 14-day Trial", ctaStyle: "primary", to: "/signup?plan=pro",
        features: [
            { text: "10 active ideas", on: true },
            { text: "Custom landing page builder", on: true },
            { text: "Unlimited sign-ups", on: true },
            { text: "Advanced analytics dashboard", on: true },
            { text: "Lead export (CSV / JSON)", on: true },
            { text: "A/B headline testing", on: true },
            { text: "Slack & Notion integration", on: true },
            { text: "1 team seat", on: true },
            { text: "Priority email support", on: true },
        ],
    },
    {
        id: "enterprise", name: "Enterprise", badge: null, featured: false,
        monthly: 49, annual: 37,
        desc: "For teams and studios validating ideas at portfolio scale.",
        cta: "Contact Sales", ctaStyle: "outline", to: "/contact",
        features: [
            { text: "Unlimited ideas", on: true },
            { text: "White-label pages", on: true },
            { text: "Unlimited sign-ups", on: true },
            { text: "Custom reports & exports", on: true },
            { text: "Lead export + CRM sync", on: true },
            { text: "Unlimited A/B tests", on: true },
            { text: "All integrations + API", on: true },
            { text: "Unlimited team seats", on: true },
            { text: "Dedicated account manager", on: true },
        ],
    },
];

const MARQUEE_CHIPS = [
    { icon: <ZapIcon />, text: "10-minute setup" },
    { icon: <LayersIcon />, text: "No-code builder" },
    { icon: <ChartIcon />, text: "Real-time analytics" },
    { icon: <UsersIcon />, text: "Team collaboration" },
    { icon: <ExportIcon />, text: "One-click CSV export" },
    { icon: <ShieldIcon />, text: "SOC 2 compliant" },
    { icon: <ZapIcon />, text: "A/B headline testing" },
    { icon: <LayersIcon />, text: "Unlimited landing pages" },
    { icon: <ChartIcon />, text: "Funnel analytics" },
    { icon: <UsersIcon />, text: "CRM integrations" },
    { icon: <ExportIcon />, text: "Notion sync" },
    { icon: <ShieldIcon />, text: "GDPR ready" },
];

const TABLE_SECTIONS = [
    {
        category: "Core",
        rows: [
            { label: "Active ideas", s: "1", p: "10", e: "Unlimited" },
            { label: "Sign-ups / idea", s: "100", p: "Unlimited", e: "Unlimited" },
            { label: "Landing pages", s: true, p: true, e: true },
            { label: "Custom domain", s: false, p: true, e: true },
        ],
    },
    {
        category: "Analytics",
        rows: [
            { label: "Basic dashboard", s: true, p: true, e: true },
            { label: "Advanced metrics", s: false, p: true, e: true },
            { label: "A/B testing", s: false, p: "1 per idea", e: "Unlimited" },
            { label: "Funnel tracking", s: false, p: true, e: true },
        ],
    },
    {
        category: "Exports & Integrations",
        rows: [
            { label: "CSV export", s: false, p: true, e: true },
            { label: "JSON export", s: false, p: true, e: true },
            { label: "CRM sync", s: false, p: false, e: true },
            { label: "Slack / Notion", s: false, p: true, e: true },
            { label: "Full API", s: false, p: false, e: true },
        ],
    },
    {
        category: "Team & Support",
        rows: [
            { label: "Team seats", s: "1", p: "1", e: "Unlimited" },
            { label: "White-label", s: false, p: false, e: true },
            { label: "Support", s: "Email", p: "Priority", e: "Dedicated" },
            { label: "SLA", s: false, p: false, e: true },
        ],
    },
];

const TESTIMONIALS = [
    {
        stars: 5,
        quote: "Switched from Pro to Enterprise after our studio grew to 8 ideas a month. The unlimited seats alone paid for itself.",
        name: "Sara O.", role: "Studio Director", initials: "SO",
        grad: "linear-gradient(135deg,#5b3fd4,#8b6ff5)",
    },
    {
        stars: 5,
        quote: "The 14-day Pro trial was enough to validate two ideas and kill one. I upgraded immediately. Worth every penny.",
        name: "Dev P.", role: "Indie Hacker", initials: "DP",
        grad: "linear-gradient(135deg,#7c3aed,#a78bfa)",
    },
    {
        stars: 5,
        quote: "Starter plan is genuinely useful — not a crippled free tier. It was all I needed to get my first waitlist to 400 people.",
        name: "Clara S.", role: "Solo Founder", initials: "CS",
        grad: "linear-gradient(135deg,#4338ca,#818cf8)",
    },
];

const FAQS = [
    {
        q: "Can I upgrade or downgrade at any time?",
        a: "Yes. Upgrades apply immediately with prorated charges. Downgrades take effect at the next billing cycle. No lock-in, ever."
    },
    {
        q: "Does the 14-day trial require a credit card?",
        a: "No — the Pro trial is completely card-free. We'll remind you before it ends and only charge if you choose to continue."
    },
    {
        q: "What happens to my data if I cancel?",
        a: "Your data stays accessible for 30 days post-cancellation so you can export everything. After 30 days it is permanently deleted."
    },
    {
        q: "Do you offer discounts for startups or students?",
        a: "Yes — we run a startup programme (free Pro for 6 months) and a student plan. Reach out on the contact page with proof of eligibility."
    },
    {
        q: "Is there a limit on how many landing pages I can create?",
        a: "Starter is limited to 1 active idea (page). Pro unlocks 10, and Enterprise is fully unlimited — including archived ideas."
    },
    {
        q: "How does the annual discount work?",
        a: "Annual billing gives you 2 months free (~26% off). You're billed once per year as a lump sum and can cancel before the next renewal."
    },
];

const PROOF = ["No credit card required", "Cancel anytime", "SOC 2 compliant"];

/* ─────────────────────────────────────────────
   Hooks
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

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function CellVal({ v }) {
    if (v === true) return <span className="pp-check" aria-label="Included">✓</span>;
    if (v === false) return <span className="pp-cross" aria-label="Not included">✕</span>;
    return <span>{v}</span>;
}

function PlanCard({ plan, annual, visible, delay }) {
    const price = plan.monthly === 0 ? "$0" : `$${annual ? plan.annual : plan.monthly}`;
    const saving = annual && plan.monthly > 0
        ? `Save $${(plan.monthly - plan.annual) * 12}/yr billed annually`
        : null;

    return (
        <article
            className={`pp-card pp__reveal ${plan.featured ? "pp-card--feat" : ""} ${visible ? "in" : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
            aria-labelledby={`plan-${plan.id}`}
        >
            {plan.featured && <div className="pp-card__glow" aria-hidden="true" />}
            {plan.badge && <div className="pp-card__badge">{plan.badge}</div>}

            <div className="pp-card__head">
                <p id={`plan-${plan.id}`} className="pp-card__name">{plan.name}</p>
                <div className="pp-card__price-row">
                    <span className="pp-card__price" aria-label={`${price} per month`}>{price}</span>
                    {plan.monthly > 0 && <span className="pp-card__period">/mo</span>}
                </div>
                <p className="pp-card__save" aria-live="polite">{saving || "\u00a0"}</p>
                <p className="pp-card__desc">{plan.desc}</p>
            </div>

            <div className="pp-card__div" aria-hidden="true" />

            <ul className="pp-card__features" aria-label={`${plan.name} features`}>
                {plan.features.map((f, i) => (
                    <li key={i} className={`pp-card__feat ${f.on ? "" : "pp-card__feat--off"}`}>
                        {f.on ? <CheckFill feat={plan.featured} /> : <MinusFill />}
                        <span>{f.text}</span>
                    </li>
                ))}
            </ul>

            <Link
                to={plan.to}
                className={`pp-card__cta pp-card__cta--${plan.ctaStyle}`}
                aria-label={`${plan.cta} — ${plan.name} plan`}
            >
                {plan.cta}
                {plan.featured && <ArrowRight size={13} />}
            </Link>
        </article>
    );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Pricing() {
    const [annual, setAnnual] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const plansRef = useRef(null);
    const tableRef = useRef(null);
    const testiRef = useRef(null);
    const faqRef = useRef(null);
    const ctaRef = useRef(null);

    const plansVis = useReveal(plansRef);
    const tableVis = useReveal(tableRef);
    const testiVis = useReveal(testiRef);
    const faqVis = useReveal(faqRef);
    const ctaVis = useReveal(ctaRef);

    const doubled = [...MARQUEE_CHIPS, ...MARQUEE_CHIPS];

    return (
        <>
            <style>{styles}</style>

            <div className="pp">

                {/* ── HERO ── */}
                <section className="pp-hero" aria-labelledby="pp-page-title">
                    <div className="pp-hero__grid" aria-hidden="true" />
                    <div className="pp-hero__orb pp-hero__orb--a" aria-hidden="true" />
                    <div className="pp-hero__orb pp-hero__orb--b" aria-hidden="true" />

                    <div className="pp-hero__inner">
                        <div className="pp__eyebrow" aria-hidden="true">✦ Transparent Pricing</div>

                        <h1 id="pp-page-title" className="pp-hero__heading">
                            One price.<br />
                            <em>Zero surprises.</em>
                        </h1>

                        <p className="pp-hero__sub">
                            Start free, upgrade when your ideas outgrow the basics.
                            No hidden fees, no lock-in, no sales calls required.
                        </p>

                        {/* Billing toggle */}
                        <div className="pp-hero__toggle" role="group" aria-label="Billing period selector">
                            <span
                                className={`pp-toggle-label ${!annual ? "on" : ""}`}
                                onClick={() => setAnnual(false)}
                                aria-hidden="true"
                            >
                                Monthly
                            </span>
                            <button
                                className={`pp-toggle ${annual ? "on" : ""}`}
                                role="switch"
                                aria-checked={annual}
                                aria-label="Toggle annual billing"
                                onClick={() => setAnnual(a => !a)}
                            >
                                <div className="pp-toggle__thumb" />
                            </button>
                            <span
                                className={`pp-toggle-label ${annual ? "on" : ""}`}
                                onClick={() => setAnnual(true)}
                                aria-hidden="true"
                            >
                                Annual
                            </span>
                            <span className="pp-toggle-save">Save 26%</span>
                        </div>

                        {/* Social proof row */}
                        <div className="pp-hero__proof" role="list" aria-label="Trust signals">
                            {[
                                { icon: <UsersIcon />, content: <><strong>2,400+</strong> founders</> },
                                { icon: <StarIcon />, content: <><strong>4.9/5</strong> avg rating</> },
                                { icon: <ShieldIcon />, content: <>SOC 2 compliant</> },
                            ].map((item, i, arr) => (
                                <span key={i} style={{ display: "contents" }}>
                                    <span className="pp-hero__proof-item" role="listitem">
                                        {item.icon}
                                        <span>{item.content}</span>
                                    </span>
                                    {i < arr.length - 1 && <span className="pp-hero__proof-sep" aria-hidden="true" />}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PLANS ── */}
                <section className="pp-plans" aria-labelledby="pp-plans-title">
                    <span className="pp-sr" id="pp-plans-title">Pricing plans</span>
                    <div ref={plansRef} className="pp__wrap">
                        <div className="pp-plans__grid" role="list">
                            {PLANS.map((plan, i) => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    annual={annual}
                                    visible={plansVis}
                                    delay={i * 120}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FEATURE MARQUEE ── */}
                <div className="pp-marquee" aria-hidden="true">
                    <div className="pp-marquee__track">
                        {doubled.map((chip, i) => (
                            <div key={i} className="pp-marquee__chip">
                                {chip.icon} {chip.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── COMPARISON TABLE ── */}
                <section className="pp-table-sec" aria-labelledby="pp-table-title">
                    <div className="pp__wrap">
                        <div
                            className={`pp-table-sec__header pp__reveal ${tableVis ? "in" : ""}`}
                            ref={tableRef}
                        >
                            <div className="pp__eyebrow" aria-hidden="true">✦ Compare Plans</div>
                            <h2 id="pp-table-title" className="pp__h2">
                                Everything side <em>by side</em>
                            </h2>
                        </div>

                        <div
                            className={`pp-table-wrap pp__reveal ${tableVis ? "in" : ""}`}
                            style={{ transitionDelay: "120ms" }}
                        >
                            <table className="pp-table" aria-label="Feature comparison across Starter, Pro, and Enterprise plans">
                                <thead>
                                    <tr>
                                        <th scope="col">Feature</th>
                                        <th scope="col">Starter</th>
                                        <th scope="col">Pro <span>Popular</span></th>
                                        <th scope="col">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TABLE_SECTIONS.map(sec => (
                                        <>
                                            <tr key={sec.category} className="pp-table__category">
                                                <td colSpan={4}>{sec.category}</td>
                                            </tr>
                                            {sec.rows.map((row, i) => (
                                                <tr key={i}>
                                                    <td>{row.label}</td>
                                                    <td><CellVal v={row.s} /></td>
                                                    <td><CellVal v={row.p} /></td>
                                                    <td><CellVal v={row.e} /></td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ── */}
                <section className="pp-testi-sec" aria-labelledby="pp-testi-title">
                    <div className="pp__wrap" ref={testiRef}>
                        <div className={`pp-table-sec__header pp__reveal ${testiVis ? "in" : ""}`} style={{ marginBottom: "2.5rem" }}>
                            <div className="pp__eyebrow" aria-hidden="true">✦ From Our Customers</div>
                            <h2 id="pp-testi-title" className="pp__h2">
                                What paying customers <em>actually say</em>
                            </h2>
                        </div>
                        <div className="pp-testi-grid" role="list">
                            {TESTIMONIALS.map((t, i) => (
                                <blockquote
                                    key={i}
                                    className={`pp-testi-card pp__reveal ${testiVis ? "in" : ""}`}
                                    style={{ transitionDelay: `${i * 110}ms` }}
                                    role="listitem"
                                    aria-label={`Testimonial from ${t.name}`}
                                >
                                    <div className="pp-testi-stars" aria-label={`${t.stars} out of 5 stars`}>
                                        {[...Array(t.stars)].map((_, j) => <StarIcon key={j} />)}
                                    </div>
                                    <p className="pp-testi-quote">"{t.quote}"</p>
                                    <footer className="pp-testi-author">
                                        <div className="pp-testi-avatar" style={{ background: t.grad }} aria-hidden="true">
                                            {t.initials}
                                        </div>
                                        <div>
                                            <p className="pp-testi-name">{t.name}</p>
                                            <p className="pp-testi-role">{t.role}</p>
                                        </div>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="pp-faq" aria-labelledby="pp-faq-title" ref={faqRef}>
                    <div className={`pp-faq__header pp__reveal ${faqVis ? "in" : ""}`}>
                        <div className="pp__eyebrow" aria-hidden="true">✦ FAQ</div>
                        <h2 id="pp-faq-title" className="pp__h2">
                            Questions <em>answered</em>
                        </h2>
                    </div>

                    <div
                        className={`pp-faq__list pp__reveal ${faqVis ? "in" : ""}`}
                        style={{ transitionDelay: "120ms" }}
                    >
                        {FAQS.map((f, i) => (
                            <div
                                key={i}
                                className={`pp-faq__item ${openFaq === i ? "open" : ""}`}
                            >
                                <button
                                    className="pp-faq__q"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                    aria-controls={`faq-${i}`}
                                    id={`faq-q-${i}`}
                                >
                                    {f.q}
                                    <ChevronDown />
                                </button>
                                <div
                                    id={`faq-${i}`}
                                    className="pp-faq__body"
                                    role="region"
                                    aria-labelledby={`faq-q-${i}`}
                                >
                                    <p className="pp-faq__a">{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}