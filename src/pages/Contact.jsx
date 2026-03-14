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

  .pf-contact *,
  .pf-contact *::before,
  .pf-contact *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Page shell ── */
  .pf-contact {
    position: relative;
    min-height: 100svh;
    background: var(--color-void);
    font-family: var(--font-body);
    overflow: hidden;
    padding: 7rem 1.5rem 6rem;
  }

  /* Grid texture */
  .pf-contact__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, black 20%, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }

  .pf-contact__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-contact__orb--a {
    width: 600px; height: 600px;
    top: -140px; left: 50%;
    transform: translateX(-60%);
    background: radial-gradient(circle, rgba(61,43,142,0.3) 0%, transparent 70%);
  }
  .pf-contact__orb--b {
    width: 400px; height: 400px;
    bottom: -80px; right: -60px;
    background: radial-gradient(circle, rgba(139,111,245,0.14) 0%, transparent 70%);
  }

  /* ── Inner layout ── */
  .pf-contact__inner {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  /* ─────────────────────────────────────────────
     Left column — info
  ───────────────────────────────────────────── */
  .pf-contact__info {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 0.5rem;

    opacity: 0;
    transform: translateX(-24px);
    animation: slideIn 0.8s var(--ease-out-expo) 0.1s forwards;
  }

  @keyframes slideIn {
    to { opacity: 1; transform: translate(0); }
  }

  .pf-contact__info-header {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .pf-contact__eyebrow {
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
    width: fit-content;
  }

  .pf-contact__heading {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4.5vw, 3.6rem);
    font-weight: 400;
    line-height: 1.08;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }
  .pf-contact__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-contact__sub {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(196,181,253,0.6);
    max-width: 380px;
  }

  /* ── Contact method cards ── */
  .pf-contact__methods {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .pf-contact__method {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    border-radius: 16px;
    border: 1px solid rgba(139,111,245,0.1);
    background: rgba(17,13,36,0.6);
    text-decoration: none;
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s var(--ease-spring);
  }
  .pf-contact__method:hover,
  .pf-contact__method:focus-visible {
    border-color: rgba(139,111,245,0.28);
    background: rgba(30,21,66,0.7);
    transform: translateX(4px);
    outline: none;
  }

  .pf-contact__method-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s var(--ease-spring);
  }
  .pf-contact__method:hover .pf-contact__method-icon {
    transform: scale(1.1) rotate(-4deg);
  }
  .pf-contact__method-icon svg { width: 18px; height: 18px; }

  .pf-contact__method-text { flex: 1; }
  .pf-contact__method-label {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 700;
    color: rgba(139,111,245,0.6);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }
  .pf-contact__method-value {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--color-mist);
  }
  .pf-contact__method-sub {
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(196,181,253,0.4);
    margin-top: 0.1rem;
  }

  .pf-contact__method-arrow {
    width: 16px; height: 16px;
    color: rgba(139,111,245,0.35);
    transition: color 0.2s ease, transform 0.25s var(--ease-spring);
    flex-shrink: 0;
  }
  .pf-contact__method:hover .pf-contact__method-arrow {
    color: var(--color-lavender);
    transform: translateX(3px);
  }

  /* ── Social strip ── */
  .pf-contact__socials {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .pf-contact__socials-label {
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.45);
  }

  .pf-contact__social-row {
    display: flex;
    gap: 0.6rem;
  }

  .pf-contact__social-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.9rem;
    border-radius: 10px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(30,21,66,0.4);
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(196,181,253,0.55);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s var(--ease-spring);
  }
  .pf-contact__social-btn:hover,
  .pf-contact__social-btn:focus-visible {
    background: rgba(61,43,142,0.45);
    border-color: rgba(139,111,245,0.38);
    color: var(--color-mist);
    transform: translateY(-2px);
    outline: none;
  }
  .pf-contact__social-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

  /* Response time badge */
  .pf-contact__response {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(52,211,153,0.2);
    background: rgba(52,211,153,0.07);
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(52,211,153,0.75);
    letter-spacing: 0.04em;
    width: fit-content;
  }
  .pf-contact__response-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(52,211,153,0.8);
    box-shadow: 0 0 8px 2px rgba(52,211,153,0.4);
    animation: resPulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes resPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.35); opacity: 0.6; }
  }

  /* ─────────────────────────────────────────────
     Right column — form
  ───────────────────────────────────────────── */
  .pf-contact__form-wrap {
    position: relative;
    border-radius: 24px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(17,13,36,0.8);
    padding: 2.5rem;
    box-shadow: 0 24px 64px rgba(0,0,0,0.45), 0 4px 16px rgba(91,63,212,0.1);
    overflow: hidden;

    opacity: 0;
    transform: translateX(24px);
    animation: slideIn 0.8s var(--ease-out-expo) 0.2s forwards;
  }

  /* Gradient top border */
  .pf-contact__form-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--grad-brand);
    border-radius: 24px 24px 0 0;
  }

  /* Corner glow */
  .pf-contact__form-glow {
    position: absolute;
    top: -80px; right: -80px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(91,63,212,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .pf-contact__form-header {
    position: relative;
    z-index: 1;
    margin-bottom: 2rem;
  }

  .pf-contact__form-title {
    font-family: var(--font-ui);
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--color-frost);
    letter-spacing: -0.01em;
    margin-bottom: 0.35rem;
  }

  .pf-contact__form-sub {
    font-size: 0.83rem;
    font-weight: 300;
    color: rgba(196,181,253,0.5);
  }

  /* ── Topic tabs ── */
  .pf-contact__topics {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 1.75rem;
    position: relative;
    z-index: 1;
  }

  .pf-contact__topic-btn {
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.18);
    background: transparent;
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(196,181,253,0.5);
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s var(--ease-spring);
  }
  .pf-contact__topic-btn:hover {
    background: rgba(30,21,66,0.6);
    color: var(--color-mist);
    border-color: rgba(139,111,245,0.3);
  }
  .pf-contact__topic-btn.is-active {
    background: rgba(61,43,142,0.45);
    border-color: rgba(139,111,245,0.45);
    color: var(--color-mist);
    transform: scale(1.03);
  }
  .pf-contact__topic-btn:focus-visible { outline: 2px solid rgba(139,111,245,0.5); outline-offset: 2px; }

  /* ── Form fields ── */
  .pf-contact__form {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .pf-contact__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .pf-contact__field {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .pf-contact__label {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.6);
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .pf-contact__required {
    color: rgba(248,113,113,0.7);
    font-size: 0.8rem;
    line-height: 1;
  }

  .pf-contact__input,
  .pf-contact__select,
  .pf-contact__textarea {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(10,8,18,0.6);
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-frost);
    outline: none;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
  }
  .pf-contact__input::placeholder,
  .pf-contact__textarea::placeholder {
    color: rgba(139,111,245,0.3);
  }
  .pf-contact__input:focus,
  .pf-contact__select:focus,
  .pf-contact__textarea:focus {
    border-color: rgba(139,111,245,0.5);
    background: rgba(17,13,36,0.8);
    box-shadow: 0 0 0 3px rgba(91,63,212,0.15);
  }
  .pf-contact__input.has-error,
  .pf-contact__select.has-error,
  .pf-contact__textarea.has-error {
    border-color: rgba(248,113,113,0.45);
    box-shadow: 0 0 0 3px rgba(248,113,113,0.08);
  }

  .pf-contact__select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(139%2C111%2C245%2C0.5)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }
  .pf-contact__select option {
    background: #1e1542;
    color: var(--color-frost);
  }

  .pf-contact__textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.65;
  }

  /* Character counter */
  .pf-contact__char-count {
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 300;
    color: rgba(139,111,245,0.4);
    text-align: right;
    transition: color 0.2s ease;
  }
  .pf-contact__char-count.is-warning { color: rgba(251,191,36,0.65); }
  .pf-contact__char-count.is-limit   { color: rgba(248,113,113,0.65); }

  /* Error message */
  .pf-contact__error {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 300;
    color: rgba(248,113,113,0.75);
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .pf-contact__error svg { width: 12px; height: 12px; flex-shrink: 0; }

  /* File drop zone */
  .pf-contact__dropzone {
    border: 1.5px dashed rgba(139,111,245,0.2);
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    cursor: pointer;
    transition: border-color 0.25s ease, background 0.25s ease;
    background: rgba(10,8,18,0.4);
  }
  .pf-contact__dropzone:hover,
  .pf-contact__dropzone.is-dragging {
    border-color: rgba(139,111,245,0.45);
    background: rgba(30,21,66,0.4);
  }
  .pf-contact__dropzone-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(30,21,66,0.7);
    border: 1px solid rgba(139,111,245,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139,111,245,0.55);
    flex-shrink: 0;
    transition: background 0.2s ease;
  }
  .pf-contact__dropzone:hover .pf-contact__dropzone-icon {
    background: rgba(61,43,142,0.5);
    color: var(--color-lavender);
  }
  .pf-contact__dropzone-icon svg { width: 16px; height: 16px; }
  .pf-contact__dropzone-text {
    flex: 1;
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
    line-height: 1.5;
  }
  .pf-contact__dropzone-text strong {
    color: rgba(139,111,245,0.7);
    font-weight: 600;
  }
  .pf-contact__dropzone input { display: none; }

  /* Privacy consent */
  .pf-contact__consent {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .pf-contact__checkbox-wrap {
    position: relative;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .pf-contact__checkbox {
    width: 18px; height: 18px;
    border-radius: 5px;
    border: 1px solid rgba(139,111,245,0.3);
    background: rgba(10,8,18,0.6);
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .pf-contact__checkbox:checked {
    background: var(--grad-brand);
    border-color: rgba(139,111,245,0.5);
  }
  .pf-contact__checkbox:focus-visible {
    outline: 2px solid rgba(139,111,245,0.5);
    outline-offset: 2px;
  }
  .pf-contact__checkbox-check {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 10px; height: 10px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .pf-contact__checkbox:checked ~ .pf-contact__checkbox-check { opacity: 1; }

  .pf-contact__consent-text {
    font-size: 0.78rem;
    font-weight: 300;
    color: rgba(196,181,253,0.45);
    line-height: 1.6;
  }
  .pf-contact__consent-text a {
    color: rgba(139,111,245,0.7);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .pf-contact__consent-text a:hover { color: var(--color-lavender); }

  /* Submit button */
  .pf-contact__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.9rem 2rem;
    border-radius: 12px;
    border: none;
    background: var(--grad-brand);
    background-size: 200% 200%;
    background-position: 0% 50%;
    font-family: var(--font-ui);
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-white);
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(91,63,212,0.45);
    transition:
      background-position 0.5s var(--ease-out-expo),
      box-shadow 0.3s ease,
      transform 0.25s var(--ease-spring),
      opacity 0.2s ease;
  }
  .pf-contact__submit:hover:not(:disabled) {
    background-position: 100% 50%;
    box-shadow: 0 6px 32px rgba(91,63,212,0.6);
    transform: translateY(-2px) scale(1.01);
  }
  .pf-contact__submit:active:not(:disabled) { transform: scale(0.98); }
  .pf-contact__submit:disabled { opacity: 0.55; cursor: not-allowed; }
  .pf-contact__submit:focus-visible { outline: 2px solid rgba(139,111,245,0.6); outline-offset: 3px; }

  .pf-contact__submit svg { width: 16px; height: 16px; transition: transform 0.3s var(--ease-spring); }
  .pf-contact__submit:hover:not(:disabled) svg { transform: translateX(3px); }

  /* Loading spinner */
  .pf-contact__spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Success state ── */
  .pf-contact__success {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: rgba(17,13,36,0.97);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    text-align: center;
    padding: 3rem;
    z-index: 10;

    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.4s ease, transform 0.4s var(--ease-spring);
    pointer-events: none;
  }
  .pf-contact__success.is-visible {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }

  .pf-contact__success-icon {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: rgba(52,211,153,0.12);
    border: 1px solid rgba(52,211,153,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: popIn 0.5s var(--ease-spring) 0.1s both;
  }
  @keyframes popIn {
    from { transform: scale(0.6); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  .pf-contact__success-icon svg { width: 28px; height: 28px; color: rgba(52,211,153,0.85); }

  .pf-contact__success-title {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--color-white);
    line-height: 1.2;
  }
  .pf-contact__success-sub {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(196,181,253,0.55);
    line-height: 1.7;
    max-width: 300px;
  }
  .pf-contact__success-back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.65rem 1.5rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.25);
    background: rgba(30,21,66,0.5);
    font-family: var(--font-ui);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-mist);
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s var(--ease-spring);
    cursor: pointer;
  }
  .pf-contact__success-back:hover {
    background: rgba(61,43,142,0.45);
    transform: translateY(-2px);
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 860px) {
    .pf-contact__inner {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .pf-contact__info { padding-top: 0; }
    .pf-contact__heading { font-size: clamp(2rem, 8vw, 2.8rem); }
  }

  @media (max-width: 560px) {
    .pf-contact { padding: 6rem 1.25rem 4rem; }
    .pf-contact__row { grid-template-columns: 1fr; }
    .pf-contact__form-wrap { padding: 1.75rem 1.5rem; }
    .pf-contact__social-row { flex-wrap: wrap; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-contact *, .pf-contact *::before, .pf-contact *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .pf-contact__info,
    .pf-contact__form-wrap { opacity: 1 !important; transform: none !important; }
  }

  /* Visually hidden utility */
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0;
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const EmailIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.5 6l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const ChatIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2C5.13 2 2 4.91 2 8.5c0 1.4.46 2.7 1.24 3.76L2 16l3.9-1.22A7.3 7.3 0 0 0 9 15c3.87 0 7-2.91 7-6.5S12.87 2 9 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 8.5h6M6 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="3" width="15" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 1.5v3M12.5 1.5v3M1.5 7h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="6" cy="11" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="9" cy="11" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.6" />
    </svg>
);

const ArrowRight = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14 2L7 9M14 2L9 14l-2-5-5-2 12-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AttachIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13.5 7.5l-5.5 5.5a4 4 0 0 1-5.66-5.66l6-6a2.5 2.5 0 0 1 3.54 3.54l-6 6a1 1 0 0 1-1.42-1.42l5.5-5.5"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const AlertIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="rgba(248,113,113,0.7)" strokeWidth="1.2" />
        <path d="M6 4v3M6 8.5v.01" stroke="rgba(248,113,113,0.8)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const CheckLgIcon = () => (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 14l7 7L23 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TwitterX = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.6 2H14.9L9.9 7.7 15.7 14H11.1L7.5 9.3 3.4 14H1.1L6.4 7.9.8 2H5.5L8.8 6.3 12.6 2ZM11.8 12.6H13L4.8 3.4H3.5L11.8 12.6Z" fill="currentColor" />
    </svg>
);

const LinkedIn = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 6.5v5M4 4.5v.01M7 11.5V9c0-1 .5-2 2-2s2 1 2 2v2.5M7 6.5v5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const TOPICS = ["General Inquiry", "Sales", "Support", "Partnership", "Press", "Bug Report"];

const METHODS = [
    {
        icon: <EmailIcon />,
        iconBg: "rgba(91,63,212,0.15)",
        iconColor: "rgba(139,111,245,0.8)",
        label: "Email us",
        value: "hello@proofly.io",
        sub: "We reply within 4 hours",
        href: "mailto:hello@proofly.io",
    },
    {
        icon: <ChatIcon />,
        iconBg: "rgba(52,211,153,0.1)",
        iconColor: "rgba(52,211,153,0.7)",
        label: "Live chat",
        value: "Chat with support",
        sub: "Mon–Fri, 9am–6pm CET",
        href: "#chat",
    },
    {
        icon: <CalendarIcon />,
        iconBg: "rgba(251,191,36,0.1)",
        iconColor: "rgba(251,191,36,0.65)",
        label: "Book a call",
        value: "Schedule 30 min demo",
        sub: "Talk to a founder advisor",
        href: "#calendar",
    },
];

const SOCIALS = [
    { label: "Twitter", href: "#", Icon: TwitterX },
    { label: "LinkedIn", href: "#", Icon: LinkedIn },
];

const MAX_MSG = 1000;

/* ─────────────────────────────────────────────
   Validation helper
───────────────────────────────────────────── */
function validate(fields) {
    const errs = {};
    if (!fields.firstName.trim()) errs.firstName = "First name is required";
    if (!fields.lastName.trim()) errs.lastName = "Last name is required";
    if (!fields.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email";
    if (!fields.message.trim()) errs.message = "Message is required";
    else if (fields.message.trim().length < 10) errs.message = "Message too short (min 10 chars)";
    if (!fields.consent) errs.consent = "Please accept the privacy policy";
    return errs;
}

/* ─────────────────────────────────────────────
   Contact component
───────────────────────────────────────────── */
export default function Contact() {
    const [topic, setTopic] = useState("General Inquiry");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const fileRef = useRef(null);

    const [fields, setFields] = useState({
        firstName: "", lastName: "", email: "",
        company: "", message: "", consent: false,
    });

    const set = (k) => (e) => {
        const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFields(f => ({ ...f, [k]: val }));
        if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(fields);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        // Simulate network request
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSubmit(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setFileName(file.name);
    };

    const msgLen = fields.message.length;
    const charClass = msgLen > MAX_MSG * 0.9 ? "is-limit" : msgLen > MAX_MSG * 0.75 ? "is-warning" : "";

    return (
        <>
            <style>{styles}</style>

            <main className="pf-contact" aria-labelledby="contact-heading">

                <div className="pf-contact__grid" aria-hidden="true" />
                <div className="pf-contact__orb pf-contact__orb--a" aria-hidden="true" />
                <div className="pf-contact__orb pf-contact__orb--b" aria-hidden="true" />

                <div className="pf-contact__inner">

                    {/* ── Left: info ── */}
                    <div className="pf-contact__info">

                        <div className="pf-contact__info-header">
                            <div className="pf-contact__eyebrow" aria-hidden="true">✦ Get in Touch</div>
                            <h1 id="contact-heading" className="pf-contact__heading">
                                We'd love to&nbsp;<em>hear from you</em>
                            </h1>
                            <p className="pf-contact__sub">
                                Whether you have a question, want a demo, or just want to say hi —
                                we're a small team and we read every message personally.
                            </p>
                        </div>

                        {/* Response time */}
                        <div className="pf-contact__response" aria-label="Typical response time: under 4 hours">
                            <span className="pf-contact__response-dot" aria-hidden="true" />
                            Typical response under 4 hours
                        </div>

                        {/* Contact methods */}
                        <nav className="pf-contact__methods" aria-label="Contact methods">
                            {METHODS.map(m => (
                                <a
                                    key={m.label}
                                    href={m.href}
                                    className="pf-contact__method"
                                    aria-label={`${m.label}: ${m.value}`}
                                >
                                    <div
                                        className="pf-contact__method-icon"
                                        style={{ background: m.iconBg, color: m.iconColor }}
                                        aria-hidden="true"
                                    >
                                        {m.icon}
                                    </div>
                                    <div className="pf-contact__method-text">
                                        <p className="pf-contact__method-label">{m.label}</p>
                                        <p className="pf-contact__method-value">{m.value}</p>
                                        <p className="pf-contact__method-sub">{m.sub}</p>
                                    </div>
                                </a>
                            ))}
                        </nav>

                        {/* Socials */}
                        <div className="pf-contact__socials">
                            <p className="pf-contact__socials-label">Follow along</p>
                            <div className="pf-contact__social-row">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="pf-contact__social-btn"
                                        aria-label={`Follow us on ${label}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon /> {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: form ── */}
                    <div className="pf-contact__form-wrap" role="region" aria-label="Contact form">
                        <div className="pf-contact__form-glow" aria-hidden="true" />

                        {/* Success overlay */}
                        <div
                            className={`pf-contact__success ${submitted ? "is-visible" : ""}`}
                            aria-live="assertive"
                            aria-atomic="true"
                            role="status"
                        >
                            <div className="pf-contact__success-icon">
                                <CheckLgIcon />
                            </div>
                            <h2 className="pf-contact__success-title">Message sent!</h2>
                            <p className="pf-contact__success-sub">
                                Thanks for reaching out. We'll get back to you within 4 hours.
                            </p>
                            <button
                                className="pf-contact__success-back"
                                onClick={() => {
                                    setSubmit(false);
                                    setFields({ firstName: "", lastName: "", email: "", company: "", message: "", consent: false });
                                    setErrors({});
                                    setFileName(null);
                                }}
                                aria-label="Send another message"
                            >
                                Send another message
                            </button>
                        </div>

                        {/* Form header */}
                        <div className="pf-contact__form-header">
                            <h2 className="pf-contact__form-title">Send us a message</h2>
                            <p className="pf-contact__form-sub">Fill in the form and we'll be in touch shortly.</p>
                        </div>

                        {/* Topic selector */}
                        <div
                            className="pf-contact__topics"
                            role="group"
                            aria-label="Select topic"
                        >
                            {TOPICS.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    className={`pf-contact__topic-btn ${topic === t ? "is-active" : ""}`}
                                    onClick={() => setTopic(t)}
                                    aria-pressed={topic === t}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Form */}
                        <form
                            className="pf-contact__form"
                            onSubmit={handleSubmit}
                            noValidate
                            aria-label="Contact form"
                        >
                            {/* Name row */}
                            <div className="pf-contact__row">
                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-first">
                                        First name <span className="pf-contact__required" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="c-first"
                                        type="text"
                                        className={`pf-contact__input ${errors.firstName ? "has-error" : ""}`}
                                        placeholder="Alex"
                                        value={fields.firstName}
                                        onChange={set("firstName")}
                                        autoComplete="given-name"
                                        aria-required="true"
                                        aria-invalid={!!errors.firstName}
                                        aria-describedby={errors.firstName ? "err-first" : undefined}
                                    />
                                    {errors.firstName && (
                                        <span id="err-first" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.firstName}
                                        </span>
                                    )}
                                </div>

                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-last">
                                        Last name <span className="pf-contact__required" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="c-last"
                                        type="text"
                                        className={`pf-contact__input ${errors.lastName ? "has-error" : ""}`}
                                        placeholder="Johnson"
                                        value={fields.lastName}
                                        onChange={set("lastName")}
                                        autoComplete="family-name"
                                        aria-required="true"
                                        aria-invalid={!!errors.lastName}
                                        aria-describedby={errors.lastName ? "err-last" : undefined}
                                    />
                                    {errors.lastName && (
                                        <span id="err-last" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.lastName}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Email + Company */}
                            <div className="pf-contact__row">
                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-email">
                                        Email <span className="pf-contact__required" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="c-email"
                                        type="email"
                                        className={`pf-contact__input ${errors.email ? "has-error" : ""}`}
                                        placeholder="alex@startup.io"
                                        value={fields.email}
                                        onChange={set("email")}
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "err-email" : undefined}
                                    />
                                    {errors.email && (
                                        <span id="err-email" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.email}
                                        </span>
                                    )}
                                </div>

                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-company">
                                        Company <span style={{ color: "rgba(139,111,245,0.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                                    </label>
                                    <input
                                        id="c-company"
                                        type="text"
                                        className="pf-contact__input"
                                        placeholder="Acme Inc."
                                        value={fields.company}
                                        onChange={set("company")}
                                        autoComplete="organization"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="pf-contact__field">
                                <label className="pf-contact__label" htmlFor="c-message">
                                    Message <span className="pf-contact__required" aria-hidden="true">*</span>
                                </label>
                                <textarea
                                    id="c-message"
                                    className={`pf-contact__textarea ${errors.message ? "has-error" : ""}`}
                                    placeholder="Tell us what you're working on, what you need help with, or anything on your mind…"
                                    value={fields.message}
                                    onChange={set("message")}
                                    maxLength={MAX_MSG}
                                    aria-required="true"
                                    aria-invalid={!!errors.message}
                                    aria-describedby={`c-char-count${errors.message ? " err-message" : ""}`}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {errors.message ? (
                                        <span id="err-message" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.message}
                                        </span>
                                    ) : <span />}
                                    <span
                                        id="c-char-count"
                                        className={`pf-contact__char-count ${charClass}`}
                                        aria-live="polite"
                                        aria-label={`${msgLen} of ${MAX_MSG} characters used`}
                                    >
                                        {msgLen}/{MAX_MSG}
                                    </span>
                                </div>
                            </div>

                            {/* File attachment */}
                            <div className="pf-contact__field">
                                <span className="pf-contact__label" id="attach-label">Attachment</span>
                                <div
                                    className={`pf-contact__dropzone ${dragging ? "is-dragging" : ""}`}
                                    role="button"
                                    tabIndex={0}
                                    aria-labelledby="attach-label"
                                    aria-describedby="attach-hint"
                                    onClick={() => fileRef.current?.click()}
                                    onKeyDown={e => e.key === "Enter" && fileRef.current?.click()}
                                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                >
                                    <div className="pf-contact__dropzone-icon" aria-hidden="true">
                                        <AttachIcon />
                                    </div>
                                    <p className="pf-contact__dropzone-text" id="attach-hint">
                                        {fileName
                                            ? <><strong>{fileName}</strong> — click to change</>
                                            : <><strong>Drop a file</strong> or click to browse — PNG, PDF, up to 10MB</>
                                        }
                                    </p>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept=".png,.jpg,.pdf,.docx"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                        onChange={e => setFileName(e.target.files[0]?.name || null)}
                                    />
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="pf-contact__field">
                                <div className="pf-contact__consent">
                                    <div className="pf-contact__checkbox-wrap">
                                        <input
                                            id="c-consent"
                                            type="checkbox"
                                            className="pf-contact__checkbox"
                                            checked={fields.consent}
                                            onChange={set("consent")}
                                            aria-required="true"
                                            aria-invalid={!!errors.consent}
                                            aria-describedby={errors.consent ? "err-consent" : undefined}
                                        />
                                        <svg
                                            className="pf-contact__checkbox-check"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path d="M1.5 5l3 3 4-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <label htmlFor="c-consent" className="pf-contact__consent-text">
                                        I agree to the{" "}
                                        <Link to="/privacy">Privacy Policy</Link>
                                        {" "}and consent to Proofly storing my data to respond to this enquiry.
                                    </label>
                                </div>
                                {errors.consent && (
                                    <span id="err-consent" className="pf-contact__error" role="alert">
                                        <AlertIcon />{errors.consent}
                                    </span>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="pf-contact__submit"
                                disabled={loading || submitted}
                                aria-busy={loading}
                            >
                                {loading ? (
                                    <><div className="pf-contact__spinner" aria-hidden="true" /> Sending…</>
                                ) : (
                                    <>Send Message <SendIcon /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}