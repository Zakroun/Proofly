import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  .lp *, .lp *::before, .lp *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }

  /* ── Page shell — full split ── */
  .lp {
    min-height: 100svh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--color-void);
    font-family: var(--font-body);
  }

  /* ════════════════════════════════════════════
     LEFT PANEL — brand story
  ════════════════════════════════════════════ */
  .lp-left {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem 3rem;
    background: var(--color-deep);
    border-right: 1px solid rgba(139,111,245,.1);
  }

  /* Decorative grid */
  .lp-left__grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,.055) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: radial-gradient(ellipse 90% 90% at 30% 50%, black 25%, transparent 78%);
    pointer-events: none; z-index: 0;
  }

  /* Orbs */
  .lp-left__orb {
    position: absolute; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
  }
  .lp-left__orb--a {
    width: 420px; height: 420px;
    top: -80px; left: -100px;
    background: radial-gradient(circle, rgba(61,43,142,.35) 0%, transparent 70%);
  }
  .lp-left__orb--b {
    width: 320px; height: 320px;
    bottom: -60px; right: -80px;
    background: radial-gradient(circle, rgba(139,111,245,.18) 0%, transparent 70%);
  }

  /* ── Logo row ── */
  .lp-left__logo {
    position: relative; z-index: 1;
    margin-top:40px;
    display: inline-flex; align-items: center; gap: .6rem;
    text-decoration: none; width: fit-content;
  }
  .lp-left__logo-mark {
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--grad-brand);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 0 1px rgba(139,111,245,.3), 0 4px 16px rgba(91,63,212,.35);
    transition: box-shadow .3s ease, transform .3s var(--ease-spring);
  }
  .lp-left__logo:hover .lp-left__logo-mark {
    box-shadow: 0 0 0 1px rgba(196,181,253,.4), 0 6px 24px rgba(91,63,212,.55);
    transform: rotate(-4deg) scale(1.08);
  }
  .lp-left__logo-mark svg { width: 16px; height: 16px; color: var(--color-white); }
  .lp-left__logo-text {
    font-family: var(--font-ui); font-size: 1.1rem; font-weight: 800;
    letter-spacing: -.02em; color: var(--color-white);
    transition: color .2s ease;
  }
  .lp-left__logo:hover .lp-left__logo-text { color: var(--color-mist); }

  /* ── Hero copy ── */
  .lp-left__body {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; gap: 2rem;
  }

  .lp-left__headline {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.2vw, 3rem);
    font-weight: 400; line-height: 1.1; letter-spacing: -.015em;
    color: var(--color-white);
  }
  .lp-left__headline em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .lp-left__desc {
    font-size: .95rem; font-weight: 300; line-height: 1.75;
    color: rgba(196,181,253,.58); max-width: 360px;
  }

  /* ── Proof cards ── */
  .lp-left__proofs {
    display: flex; flex-direction: column; gap: .75rem;
  }

  .lp-left__proof {
    display: flex; align-items: center; gap: .9rem;
    padding: 1rem 1.25rem;
    border-radius: 16px;
    border: 1px solid rgba(139,111,245,.1);
    background: rgba(10,8,18,.5);
    backdrop-filter: blur(8px);
    transition: border-color .25s ease, background .25s ease;
    cursor: default;
  }
  .lp-left__proof:hover {
    border-color: rgba(139,111,245,.22);
    background: rgba(17,13,36,.7);
  }

  .lp-left__proof-icon {
    width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: transform .3s var(--ease-spring);
  }
  .lp-left__proof:hover .lp-left__proof-icon { transform: scale(1.1) rotate(-4deg); }
  .lp-left__proof-icon svg { width: 17px; height: 17px; }

  .lp-left__proof-val {
    font-family: var(--font-display); font-size: 1.25rem; font-weight: 400;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    line-height: 1;
  }
  .lp-left__proof-lbl {
    font-family: var(--font-body); font-size: .78rem; font-weight: 300;
    color: rgba(196,181,253,.45); line-height: 1.3; margin-top: .15rem;
  }

  /* ── Testimonial pull-quote ── */
  .lp-left__quote {
    position: relative; z-index: 1;
    padding: 1.5rem;
    border-radius: 18px;
    border: 1px solid rgba(139,111,245,.12);
    background: rgba(10,8,18,.5);
    backdrop-filter: blur(10px);
  }
  .lp-left__quote::before {
    content: '\u201C';
    position: absolute; top: -.4rem; left: 1.25rem;
    font-family: var(--font-display); font-size: 5rem; line-height: 1;
    color: rgba(91,63,212,.12); pointer-events: none;
  }

  .lp-left__quote-text {
    font-family: var(--font-display); font-style: italic;
    font-size: .95rem; line-height: 1.65;
    color: rgba(237,233,254,.72); position: relative; z-index: 1;
    margin-bottom: 1rem;
  }

  .lp-left__quote-author {
    display: flex; align-items: center; gap: .75rem;
  }
  .lp-left__quote-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--grad-brand); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-ui); font-size: .65rem; font-weight: 800;
    color: var(--color-white);
    box-shadow: 0 0 0 2px rgba(91,63,212,.3);
  }
  .lp-left__quote-name {
    font-family: var(--font-ui); font-size: .8rem; font-weight: 700; color: var(--color-mist);
  }
  .lp-left__quote-role {
    font-size: .72rem; font-weight: 300; color: rgba(196,181,253,.42);
  }

  /* Stars */
  .lp-left__stars { display: flex; gap: 2px; margin-bottom: .75rem; }
  .lp-left__star  { color: #f5c542; font-size: .78rem; }

  /* ════════════════════════════════════════════
     RIGHT PANEL — auth form
  ════════════════════════════════════════════ */
  .lp-right {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 2rem;
    position: relative; overflow: hidden;
  }

  /* Subtle bg glow */
  .lp-right__glow {
    position: absolute; width: 500px; height: 500px;
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: radial-gradient(circle, rgba(61,43,142,.15) 0%, transparent 70%);
    filter: blur(80px); pointer-events: none; z-index: 0;
  }

  /* ── Card ── */
  .lp-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 420px;
    display: flex; flex-direction: column; gap: 0;

    opacity: 0; transform: translateY(20px);
    animation: cardIn .7s var(--ease-expo) .1s forwards;
  }

  @keyframes cardIn {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Card header ── */
  .lp-card__header {
    margin-bottom: 2rem;
    display: flex; flex-direction: column; gap: .5rem;
  }

  .lp-card__title {
    font-family: var(--font-display);
    font-size: 2rem; font-weight: 400;
    line-height: 1.1; letter-spacing: -.015em; color: var(--color-white);
  }
  .lp-card__title em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .lp-card__sub {
    font-size: .875rem; font-weight: 300; line-height: 1.6;
    color: rgba(196,181,253,.5);
  }

  /* ── Social OAuth buttons ── */
  .lp-oauth {
    display: flex; flex-direction: column; gap: .65rem; margin-bottom: 1.5rem;
  }

  .lp-oauth__btn {
    display: flex; align-items: center; justify-content: center; gap: .65rem;
    padding: .8rem 1.5rem; border-radius: 12px;
    border: 1px solid rgba(139,111,245,.18);
    background: rgba(17,13,36,.7);
    font-family: var(--font-ui); font-size: .85rem; font-weight: 600;
    color: rgba(196,181,253,.7); cursor: pointer;
    transition: background .25s ease, border-color .25s ease, color .25s ease, transform .2s var(--ease-spring);
    width: 100%;
  }
  .lp-oauth__btn:hover, .lp-oauth__btn:focus-visible {
    background: rgba(30,21,66,.8);
    border-color: rgba(139,111,245,.32);
    color: var(--color-frost);
    transform: translateY(-1px);
    outline: none;
  }
  .lp-oauth__btn svg { width: 18px; height: 18px; flex-shrink: 0; }

  /* ── Divider ── */
  .lp-divider {
    display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
  }
  .lp-divider__line {
    flex: 1; height: 1px;
    background: linear-gradient(to right, transparent, rgba(139,111,245,.15), transparent);
  }
  .lp-divider__text {
    font-family: var(--font-ui); font-size: .68rem; font-weight: 600;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(139,111,245,.35); white-space: nowrap;
  }

  /* ── Form ── */
  .lp-form { display: flex; flex-direction: column; gap: 1.1rem; }

  .lp-field { display: flex; flex-direction: column; gap: .45rem; }

  .lp-label {
    display: flex; align-items: center; justify-content: space-between;
    font-family: var(--font-ui); font-size: .72rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    color: rgba(139,111,245,.6);
  }

  .lp-forgot {
    background-color:transparent;
    border:none;
    font-family: var(--font-body); font-size: .75rem; font-weight: 300;
    color: rgba(139,111,245,.55); text-decoration: none;
    letter-spacing: 0; text-transform: none;
    transition: color .2s ease;
  }
  .lp-forgot:hover { color: var(--color-lavender); }

  /* Input wrapper — holds input + eye icon */
  .lp-input-wrap {
    position: relative; display: flex; align-items: center;
  }

  .lp-input {
    width: 100%; padding: .78rem 1rem; border-radius: 12px;
    border: 1px solid rgba(139,111,245,.15);
    background: rgba(10,8,18,.65);
    font-family: var(--font-body); font-size: .9rem; font-weight: 300;
    color: var(--color-frost); outline: none;
    transition: border-color .25s ease, background .25s ease, box-shadow .25s ease;
    -webkit-appearance: none;
  }
  .lp-input::placeholder { color: rgba(139,111,245,.3); }
  .lp-input:focus {
    border-color: rgba(139,111,245,.5);
    background: rgba(17,13,36,.85);
    box-shadow: 0 0 0 3px rgba(91,63,212,.15);
  }
  .lp-input.err {
    border-color: rgba(248,113,113,.45);
    box-shadow: 0 0 0 3px rgba(248,113,113,.08);
  }
  .lp-input--pass { padding-right: 3rem; }

  /* Eye toggle */
  .lp-eye {
    position: absolute; right: .9rem; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: .2rem;
    color: rgba(139,111,245,.4); transition: color .2s ease;
    display: flex; align-items: center;
  }
  .lp-eye:hover { color: var(--color-lavender); }
  .lp-eye:focus-visible { outline: 2px solid rgba(139,111,245,.5); border-radius: 4px; }
  .lp-eye svg { width: 16px; height: 16px; pointer-events: none; }

  /* Error message */
  .lp-err {
    display: flex; align-items: center; gap: .35rem;
    font-family: var(--font-body); font-size: .73rem; font-weight: 300;
    color: rgba(248,113,113,.75);
  }
  .lp-err svg { width: 12px; height: 12px; flex-shrink: 0; }

  /* ── Remember me row ── */
  .lp-extras {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  }

  .lp-remember {
    display: flex; align-items: center; gap: .55rem; cursor: pointer;
  }
  .lp-remember__box {
    width: 17px; height: 17px; border-radius: 5px;
    border: 1px solid rgba(139,111,245,.28);
    background: rgba(10,8,18,.6);
    cursor: pointer; appearance: none; -webkit-appearance: none;
    transition: background .2s ease, border-color .2s ease;
    flex-shrink: 0;
  }
  .lp-remember__box:checked {
    background: var(--grad-brand); border-color: rgba(139,111,245,.5);
  }
  .lp-remember__box:focus-visible { outline: 2px solid rgba(139,111,245,.5); outline-offset: 2px; }

  .lp-remember__check {
    position: absolute; opacity: 0; pointer-events: none; transition: opacity .15s ease;
  }
  .lp-remember-wrap { position: relative; }
  .lp-remember__box:checked + .lp-remember__check { opacity: 1; }

  .lp-remember__label {
    font-family: var(--font-body); font-size: .8rem; font-weight: 300;
    color: rgba(196,181,253,.5); user-select: none; cursor: pointer;
  }

  /* ── Submit button ── */
  .lp-submit {
    display: flex; align-items: center; justify-content: center; gap: .5rem;
    padding: .9rem 2rem; border-radius: 12px; border: none;
    background: var(--grad-brand); background-size: 200% 200%; background-position: 0% 50%;
    font-family: var(--font-ui); font-size: .92rem; font-weight: 700;
    letter-spacing: .02em; color: var(--color-white); cursor: pointer;
    box-shadow: 0 4px 20px rgba(91,63,212,.45);
    transition:
      background-position .5s var(--ease-expo),
      box-shadow .3s ease, transform .25s var(--ease-spring), opacity .2s ease;
    width: 100%; margin-top: .25rem;
  }
  .lp-submit:hover:not(:disabled) {
    background-position: 100% 50%;
    box-shadow: 0 6px 32px rgba(91,63,212,.6);
    transform: translateY(-2px) scale(1.01);
  }
  .lp-submit:active:not(:disabled) { transform: scale(.97); }
  .lp-submit:disabled { opacity: .55; cursor: not-allowed; }
  .lp-submit:focus-visible { outline: 2px solid rgba(139,111,245,.6); outline-offset: 3px; }
  .lp-submit svg { width: 16px; height: 16px; transition: transform .3s var(--ease-spring); }
  .lp-submit:hover:not(:disabled) svg { transform: translateX(3px); }

  /* Spinner */
  .lp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.25);
    border-top-color: #fff; border-radius: 50%;
    animation: spin .7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Global error banner ── */
  .lp-banner {
    display: flex; align-items: flex-start; gap: .65rem;
    padding: .9rem 1rem; border-radius: 12px;
    border: 1px solid rgba(248,113,113,.25);
    background: rgba(248,113,113,.07);
    font-size: .82rem; font-weight: 300; line-height: 1.5;
    color: rgba(248,113,113,.85);
    margin-bottom: .5rem;
  }
  .lp-banner svg { width: 15px; height: 15px; flex-shrink: 0; margin-top: 1px; color: rgba(248,113,113,.7); }

  /* ── Sign-up nudge ── */
  .lp-signup-nudge {
    margin-top: 1.75rem; text-align: center;
    font-size: .82rem; font-weight: 300;
    color: rgba(196,181,253,.4);
  }
  .lp-signup-nudge a {
    color: var(--color-lavender); text-decoration: none; font-weight: 500;
    transition: color .2s ease;
  }
  .lp-signup-nudge a:hover { color: var(--color-mist); }

  /* ── Security note ── */
  .lp-security {
    display: flex; align-items: center; justify-content: center; gap: .4rem;
    margin-top: 1.25rem;
    font-family: var(--font-ui); font-size: .65rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
    color: rgba(139,111,245,.3);
  }
  .lp-security svg { width: 11px; height: 11px; }

  /* ── Back to home ── */
  .lp-back {
    position: absolute; top: 2rem; left: 2rem; z-index: 10;
    display: inline-flex; align-items: center; gap: .4rem;
    font-family: var(--font-ui); font-size: .75rem; font-weight: 600;
    letter-spacing: .04em; color: rgba(196,181,253,.45); text-decoration: none;
    padding: .4rem .8rem; border-radius: 8px;
    border: 1px solid rgba(139,111,245,.1);
    background: rgba(17,13,36,.5); backdrop-filter: blur(8px);
    transition: color .2s ease, border-color .2s ease, background .2s ease, transform .2s var(--ease-spring);
  }
  .lp-back:hover, .lp-back:focus-visible {
    color: var(--color-mist); border-color: rgba(139,111,245,.3);
    background: rgba(30,21,66,.5); transform: translateX(-2px);
    outline: none;
  }
  .lp-back svg { width: 13px; height: 13px; }

  /* ── Password strength bar ── */
  .lp-strength { display: flex; flex-direction: column; gap: .35rem; }
  .lp-strength__bars { display: flex; gap: 4px; }
  .lp-strength__bar {
    flex: 1; height: 3px; border-radius: 999px;
    background: rgba(30,21,66,.7);
    transition: background .35s ease;
  }
  .lp-strength__bar--1 { background: rgba(248,113,113,.7); }
  .lp-strength__bar--2 { background: rgba(251,191,36,.65); }
  .lp-strength__bar--3 { background: rgba(52,211,153,.65); }
  .lp-strength__bar--4 { background: linear-gradient(90deg,#5b3fd4,#8b6ff5); }

  .lp-strength__label {
    font-family: var(--font-ui); font-size: .65rem; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
  }

  /* ════════════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════════════ */
  @media (max-width: 860px) {
    .lp { grid-template-columns: 1fr; }
    .lp-left { display: none; }
    .lp-right { padding: 5rem 1.5rem 3rem; min-height: 100svh; }
    .lp-back  { top: 1.25rem; left: 1.25rem; }
  }

  @media (max-width: 420px) {
    .lp-right { padding: 5rem 1.25rem 3rem; }
    .lp-card  { max-width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lp *, .lp *::before, .lp *::after {
      animation-duration: .01ms !important; transition-duration: .01ms !important;
    }
    .lp-card { opacity: 1 !important; transform: none !important; }
  }

  .lp-sr { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0; }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const LogoMark = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 2h7a3 3 0 0 1 0 6H6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const GoogleIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5A7.5 7.5 0 0 0 1.5 9c0 3.314 2.15 6.124 5.136 7.115.375.069.512-.163.512-.362 0-.178-.007-.65-.01-1.275-2.088.454-2.529-.9-2.529-.9a1.99 1.99 0 0 0-.833-1.1c-.681-.466.051-.456.051-.456.753.053 1.15.774 1.15.774.67 1.147 1.757.816 2.185.624.068-.485.262-.817.476-1.004-1.666-.19-3.419-.833-3.419-3.708 0-.819.293-1.49.773-2.015-.077-.19-.335-.953.074-1.988 0 0 .63-.202 2.065.77a7.19 7.19 0 0 1 1.88-.253c.638.003 1.28.086 1.88.253 1.433-.972 2.062-.77 2.062-.77.41 1.035.152 1.798.075 1.988.482.525.772 1.196.772 2.015 0 2.883-1.756 3.516-3.428 3.702.27.232.51.69.51 1.39 0 1.004-.009 1.813-.009 2.06 0 .2.135.435.515.36A7.502 7.502 0 0 0 16.5 9 7.5 7.5 0 0 0 9 1.5Z" fill="currentColor" />
    </svg>
);

const EyeOpen = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
);

const EyeClosed = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 2l12 12M6.5 6.5A2 2 0 0 0 9.5 9.5M4 4.7C2.7 5.8 1.5 7.4 1 8c.8 1.3 3.5 5 7 5 1.5 0 2.9-.6 4-1.4M7 3.1C7.3 3 7.7 3 8 3c3.5 0 6.2 3.7 7 5-.4.7-1.1 1.7-2 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const ArrowRight = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronLeft = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M8 3L4.5 6.5 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AlertIcon = () => (
    <svg viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7.5 4.5v4M7.5 10.5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const ShieldLock = () => (
    <svg viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M5.5 1L9.5 2.5v3C9.5 8 7.5 9.5 5.5 10 3.5 9.5 1.5 8 1.5 5.5v-3L5.5 1Z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
        <rect x="3.5" y="5" width="4" height="3" rx=".75" stroke="currentColor" strokeWidth=".85" />
        <path d="M4.5 5V4a1 1 0 0 1 2 0v1" stroke="currentColor" strokeWidth=".85" strokeLinecap="round" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 5a3 3 0 0 1 0 6M18 18c0-2.8-2-5-4.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
    </svg>
);

const ChartIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14l4-5 4 3 4-7 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </svg>
);

const RocketIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2C10 2 5.5 6 5.5 12l2.5 2.5c.8-3.5 2-6 2-6s1.2 2.5 2 6L14.5 12c0-6-4.5-10-4.5-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 14.5c-1.2.8-2 2.5-2 2.5l2 .5M12.5 14.5c1.2.8 2 2.5 2 2.5l-2 .5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity=".6" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const OAUTH_BTNS = [
    { id: "google", label: "Continue with Google", Icon: GoogleIcon },
    { id: "github", label: "Continue with GitHub", Icon: GitHubIcon },
];

const PROOFS = [
    { icon: <UsersIcon />, iconBg: "rgba(91,63,212,.15)", iconColor: "rgba(139,111,245,.85)", val: "2,400+", lbl: "founders validated ideas" },
    { icon: <ChartIcon />, iconBg: "rgba(52,211,153,.1)", iconColor: "rgba(52,211,153,.8)", val: "94%", lbl: "user intent clarity score" },
    { icon: <RocketIcon />, iconBg: "rgba(251,191,36,.1)", iconColor: "rgba(251,191,36,.75)", val: "10 min", lbl: "avg. time to first live page" },
];

/* Password strength scorer */
function scorePassword(pw) {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
}
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#f87171", "#fbbf24", "rgba(52,211,153,.65)", "#8b6ff5"];

/* ─────────────────────────────────────────────
   Login component
───────────────────────────────────────────── */
export default function Login() {
    const navigate = useNavigate();

    /* Mode: "login" | "signup" | "forgot" */
    const [mode, setMode] = useState("login");

    const [fields, setFields] = useState({ email: "", password: "", name: "" });
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [banner, setBanner] = useState("");
    const [forgotSent, setForgotSent] = useState(false);

    const emailRef = useRef(null);

    /* Focus email on mode switch */
    useEffect(() => {
        setBanner(""); setErrors({}); setForgotSent(false);
        setTimeout(() => emailRef.current?.focus(), 80);
    }, [mode]);

    const set = k => e => {
        const v = e.target.value;
        setFields(f => ({ ...f, [k]: v }));
        if (errors[k]) setErrors(err => { const n = { ...err }; delete n[k]; return n; });
        if (banner) setBanner("");
    };

    /* Validate */
    const validate = () => {
        const errs = {};
        if (!fields.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email";
        if (mode !== "forgot") {
            if (!fields.password) errs.password = "Password is required";
            else if (mode === "signup" && fields.password.length < 8) errs.password = "Min 8 characters";
        }
        if (mode === "signup" && !fields.name.trim()) errs.name = "Your name is required";
        return errs;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        await new Promise(r => setTimeout(r, 1600));
        setLoading(false);

        if (mode === "forgot") {
            setForgotSent(true);
            return;
        }
        /* Simulate wrong credentials on login for demo */
        if (mode === "login" && fields.password !== "demo1234") {
            setBanner("Incorrect email or password. Try demo1234 for the demo.");
            return;
        }
        navigate("/dashboard");
    };

    const pwStrength = mode === "signup" ? scorePassword(fields.password) : 0;

    const TITLES = {
        login: { title: <>Welcome <em>back</em></>, sub: "Sign in to your Proofly account to continue validating." },
        signup: { title: <>Start <em>validating</em></>, sub: "Create your free account. No card required." },
        forgot: { title: <>Reset your <em>password</em></>, sub: "Enter your email and we'll send a reset link." },
    };

    return (
        <>
            <style>{styles}</style>

            <div className="lp" role="main">

                {/* ── Back to home ── */}
                <Link to="/" className="lp-back" aria-label="Back to homepage">
                    <ChevronLeft /> Home
                </Link>

                {/* ════════════════════════════════════════
            LEFT — brand panel
        ════════════════════════════════════════ */}
                <aside className="lp-left" aria-label="About Proofly">
                    <div className="lp-left__grid" aria-hidden="true" />
                    <div className="lp-left__orb lp-left__orb--a" aria-hidden="true" />
                    <div className="lp-left__orb lp-left__orb--b" aria-hidden="true" />

                    {/* Logo */}
                    <Link to="/" className="lp-left__logo" aria-label="Proofly homepage">
                        {/* <div className="lp-left__logo-mark" aria-hidden="true"><LogoMark /></div> */}
                        <span className="lp-left__logo-text">Proofly</span>
                    </Link>

                    {/* Hero copy + proof cards */}
                    <div className="lp-left__body">
                        <div>
                            <h2 className="lp-left__headline">
                                Validate before<br />you <em>build anything</em>
                            </h2>
                            <p className="lp-left__desc" style={{ marginTop: "1rem" }}>
                                Join thousands of founders who test demand, collect real sign-ups,
                                and make data-backed decisions — all before writing a line of product code.
                            </p>
                        </div>

                        <div className="lp-left__proofs" role="list" aria-label="Platform statistics">
                            {PROOFS.map(p => (
                                <div key={p.val} className="lp-left__proof" role="listitem">
                                    <div
                                        className="lp-left__proof-icon"
                                        style={{ background: p.iconBg, color: p.iconColor }}
                                        aria-hidden="true"
                                    >
                                        {p.icon}
                                    </div>
                                    <div>
                                        <div className="lp-left__proof-val">{p.val}</div>
                                        <div className="lp-left__proof-lbl">{p.lbl}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    {/* <blockquote className="lp-left__quote" aria-label="Customer testimonial">
            <div className="lp-left__stars" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => <span key={i} className="lp-left__star" aria-hidden="true">★</span>)}
            </div>
            <p className="lp-left__quote-text">
              "Proofly paid for itself in the first week. Killed a bad idea before we hired a developer."
            </p>
            <footer className="lp-left__quote-author">
              <div className="lp-left__quote-avatar" aria-hidden="true">RK</div>
              <div>
                <p className="lp-left__quote-name">Rachel Kim</p>
                <p className="lp-left__quote-role">Co-Founder, Fable · Series A</p>
              </div>
            </footer>
          </blockquote> */}
                </aside>

                {/* ════════════════════════════════════════
            RIGHT — auth form
        ════════════════════════════════════════ */}
                <section className="lp-right" aria-label={
                    mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Reset password"
                }>
                    <div className="lp-right__glow" aria-hidden="true" />

                    <div className="lp-card">

                        {/* Header */}
                        <header className="lp-card__header">
                            <h1 className="lp-card__title">{TITLES[mode].title}</h1>
                            <p className="lp-card__sub">{TITLES[mode].sub}</p>
                        </header>

                        {/* OAuth — only on login/signup */}
                        {mode !== "forgot" && (
                            <>
                                <div className="lp-oauth" role="group" aria-label="Sign in with a provider">
                                    {OAUTH_BTNS.map(btn => (
                                        <button
                                            key={btn.id}
                                            type="button"
                                            className="lp-oauth__btn"
                                            aria-label={btn.label}
                                            onClick={() => setBanner("")}
                                        >
                                            <btn.Icon />
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="lp-divider" aria-hidden="true">
                                    <div className="lp-divider__line" />
                                    <span className="lp-divider__text">or continue with email</span>
                                    <div className="lp-divider__line" />
                                </div>
                            </>
                        )}

                        {/* Global error banner */}
                        {banner && (
                            <div className="lp-banner" role="alert" aria-live="assertive">
                                <AlertIcon />
                                <span>{banner}</span>
                            </div>
                        )}

                        {/* Forgot password sent */}
                        {forgotSent ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", textAlign: "center", padding: "1rem 0" }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: "50%",
                                    background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    animation: "popIn .5s var(--ease-spring) both"
                                }}>
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                                        <path d="M4 13l6 6L22 7" stroke="rgba(52,211,153,.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p style={{ fontFamily: "var(--font-ui)", fontWeight: 700, color: "var(--color-frost)", marginBottom: ".4rem" }}>
                                        Check your inbox
                                    </p>
                                    <p style={{ fontSize: ".85rem", fontWeight: 300, color: "rgba(196,181,253,.5)", lineHeight: 1.6 }}>
                                        A reset link has been sent to <strong style={{ color: "var(--color-mist)" }}>{fields.email}</strong>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setMode("login"); setForgotSent(false); }}
                                    style={{
                                        background: "none", border: "none", cursor: "pointer",
                                        fontFamily: "var(--font-ui)", fontSize: ".8rem", fontWeight: 600,
                                        color: "rgba(139,111,245,.6)", letterSpacing: ".04em"
                                    }}
                                >
                                    ← Back to sign in
                                </button>
                            </div>
                        ) : (
                            /* ── Main form ── */
                            <form className="lp-form" onSubmit={handleSubmit} noValidate aria-label={TITLES[mode].sub}>

                                {/* Name — signup only */}
                                {mode === "signup" && (
                                    <div className="lp-field">
                                        <label className="lp-label" htmlFor="lp-name">Full Name</label>
                                        <div className="lp-input-wrap">
                                            <input
                                                id="lp-name"
                                                type="text"
                                                className={`lp-input ${errors.name ? "err" : ""}`}
                                                placeholder="Alex Johnson"
                                                value={fields.name}
                                                onChange={set("name")}
                                                autoComplete="name"
                                                aria-required="true"
                                                aria-invalid={!!errors.name}
                                                aria-describedby={errors.name ? "err-name" : undefined}
                                            />
                                        </div>
                                        {errors.name && (
                                            <span id="err-name" className="lp-err" role="alert">
                                                <AlertIcon />{errors.name}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Email */}
                                <div className="lp-field">
                                    <label className="lp-label" htmlFor="lp-email">Email</label>
                                    <div className="lp-input-wrap">
                                        <input
                                            ref={emailRef}
                                            id="lp-email"
                                            type="email"
                                            className={`lp-input ${errors.email ? "err" : ""}`}
                                            placeholder="you@startup.io"
                                            value={fields.email}
                                            onChange={set("email")}
                                            autoComplete={mode === "signup" ? "email" : "username"}
                                            aria-required="true"
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? "err-email" : undefined}
                                        />
                                    </div>
                                    {errors.email && (
                                        <span id="err-email" className="lp-err" role="alert">
                                            <AlertIcon />{errors.email}
                                        </span>
                                    )}
                                </div>

                                {/* Password */}
                                {mode !== "forgot" && (
                                    <div className="lp-field">
                                        <label className="lp-label" htmlFor="lp-password">
                                            Password
                                            {mode === "login" && (
                                                <button
                                                    type="button"
                                                    className="lp-forgot"
                                                    onClick={() => setMode("forgot")}
                                                    aria-label="Forgot your password?"
                                                >
                                                    Forgot password?
                                                </button>
                                            )}
                                        </label>
                                        <div className="lp-input-wrap">
                                            <input
                                                id="lp-password"
                                                type={showPw ? "text" : "password"}
                                                className={`lp-input lp-input--pass ${errors.password ? "err" : ""}`}
                                                placeholder={mode === "signup" ? "Min 8 characters" : "••••••••"}
                                                value={fields.password}
                                                onChange={set("password")}
                                                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                                                aria-required="true"
                                                aria-invalid={!!errors.password}
                                                aria-describedby={`${errors.password ? "err-pw" : ""} ${mode === "signup" ? "pw-strength" : ""}`.trim() || undefined}
                                            />
                                            <button
                                                type="button"
                                                className="lp-eye"
                                                onClick={() => setShowPw(s => !s)}
                                                aria-label={showPw ? "Hide password" : "Show password"}
                                                aria-pressed={showPw}
                                            >
                                                {showPw ? <EyeClosed /> : <EyeOpen />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <span id="err-pw" className="lp-err" role="alert">
                                                <AlertIcon />{errors.password}
                                            </span>
                                        )}

                                        {/* Password strength — signup only */}
                                        {mode === "signup" && fields.password.length > 0 && (
                                            <div className="lp-strength" id="pw-strength" aria-live="polite"
                                                aria-label={`Password strength: ${STRENGTH_LABELS[pwStrength] || "too weak"}`}
                                            >
                                                <div className="lp-strength__bars" aria-hidden="true">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div
                                                            key={i}
                                                            className={`lp-strength__bar ${pwStrength >= i ? `lp-strength__bar--${Math.min(pwStrength, 4)}` : ""}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span
                                                    className="lp-strength__label"
                                                    style={{ color: STRENGTH_COLORS[pwStrength] || "rgba(139,111,245,.35)" }}
                                                >
                                                    {STRENGTH_LABELS[pwStrength] || "Too short"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Remember me — login only */}
                                {mode === "login" && (
                                    <div className="lp-extras">
                                        <label className="lp-remember" htmlFor="lp-remember">
                                            <div className="lp-remember-wrap">
                                                <input
                                                    id="lp-remember"
                                                    type="checkbox"
                                                    className="lp-remember__box"
                                                    checked={remember}
                                                    onChange={e => setRemember(e.target.checked)}
                                                    aria-label="Remember me for 30 days"
                                                />
                                                <svg className="lp-remember__check" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                                                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                                                    <path d="M1.5 5l3 3 4-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span className="lp-remember__label">Remember me for 30 days</span>
                                        </label>
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="lp-submit"
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {loading ? (
                                        <><div className="lp-spinner" aria-hidden="true" /> {
                                            mode === "login" ? "Signing in…" : mode === "signup" ? "Creating account…" : "Sending link…"
                                        }</>
                                    ) : (
                                        <>
                                            {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
                                            <ArrowRight />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Mode switcher */}
                        {!forgotSent && (
                            <p className="lp-signup-nudge">
                                {mode === "login" ? (
                                    <>Don't have an account?{" "}
                                        <button type="button" onClick={() => setMode("signup")}
                                            style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit", textDecoration: "underline" }}>
                                            Sign up free
                                        </button>
                                    </>
                                ) : mode === "signup" ? (
                                    <>Already have an account?{" "}
                                        <button type="button" onClick={() => setMode("login")}
                                            style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit", textDecoration: "underline" }}>
                                            Sign in
                                        </button>
                                    </>
                                ) : (
                                    <button type="button" onClick={() => setMode("login")}
                                        style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "inherit" }}>
                                        ← Back to sign in
                                    </button>
                                )}
                            </p>
                        )}

                        {/* Security note */}
                        <div className="lp-security" aria-label="Secure authentication">
                            <ShieldLock />
                            256-bit SSL encrypted · SOC 2 compliant
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}