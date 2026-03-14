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

  .pf-about *,
  .pf-about *::before,
  .pf-about *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .pf-about {
    background: var(--color-void);
    font-family: var(--font-body);
    color: var(--color-white);
  }

  /* ── Shared reveal animation ── */
  .pf-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.75s var(--ease-out-expo), transform 0.75s var(--ease-out-expo);
  }
  .pf-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Shared eyebrow ── */
  .pf-eyebrow {
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

  /* ── Shared section heading ── */
  .pf-section-heading {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: var(--color-white);
  }
  .pf-section-heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ─────────────────────────────────────────────
     HERO
  ───────────────────────────────────────────── */
  .pf-about__hero {
    position: relative;
    min-height: 92vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 10rem 1.5rem 7rem;
  }

  /* Grid lines */
  .pf-about__hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,0.05) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 75%);
    pointer-events: none;
    z-index: 0;
  }

  /* Orbs */
  .pf-about__hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-about__hero-orb--a {
    width: 600px; height: 600px;
    top: -150px; left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(61,43,142,0.4) 0%, transparent 70%);
  }
  .pf-about__hero-orb--b {
    width: 350px; height: 350px;
    bottom: 0; right: 0;
    background: radial-gradient(circle, rgba(139,111,245,0.15) 0%, transparent 70%);
  }

  /* Drifting particles */
  .pf-about__particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .pf-about__particle {
    position: absolute;
    border-radius: 50%;
    background: var(--grad-brand);
    opacity: 0;
    animation: particleDrift var(--dur, 8s) ease-in-out var(--delay, 0s) infinite;
  }
  @keyframes particleDrift {
    0%   { opacity: 0;    transform: translateY(0) scale(1); }
    20%  { opacity: 0.35; }
    80%  { opacity: 0.15; }
    100% { opacity: 0;    transform: translateY(-180px) scale(0.5); }
  }

  .pf-about__hero-content {
    position: relative;
    z-index: 1;
    max-width: 820px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
  }

  .pf-about__hero-headline {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: var(--color-white);

    opacity: 0;
    transform: translateY(24px);
    animation: heroReveal 0.9s var(--ease-out-expo) 0.2s forwards;
  }
  .pf-about__hero-headline em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-about__hero-sub {
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 300;
    line-height: 1.75;
    color: rgba(196,181,253,0.65);
    max-width: 560px;

    opacity: 0;
    animation: heroReveal 0.9s var(--ease-out-expo) 0.4s forwards;
  }

  .pf-about__hero-stats {
    display: flex;
    align-items: center;
    gap: 0;
    border-radius: 18px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(17,13,36,0.7);
    overflow: hidden;
    backdrop-filter: blur(10px);

    opacity: 0;
    animation: heroReveal 0.9s var(--ease-out-expo) 0.6s forwards;
  }

  .pf-about__hero-stat {
    padding: 1.25rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    border-right: 1px solid rgba(139,111,245,0.1);
  }
  .pf-about__hero-stat:last-child { border-right: none; }

  .pf-about__hero-stat-val {
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pf-about__hero-stat-lbl {
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.5);
  }

  @keyframes heroReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Scroll indicator */
  .pf-about__scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: heroReveal 0.9s var(--ease-out-expo) 1s forwards;
  }
  .pf-about__scroll-label {
    font-family: var(--font-ui);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.4);
  }
  .pf-about__scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, rgba(139,111,245,0.5), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
    40%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
    80%  { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  }

  /* ─────────────────────────────────────────────
     ORIGIN STORY
  ───────────────────────────────────────────── */
  .pf-about__story {
    position: relative;
    padding: 7rem 1.5rem;
    background: var(--color-deep);
    overflow: hidden;
  }
  .pf-about__story::before,
  .pf-about__story::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 120px;
    pointer-events: none;
    z-index: 0;
  }
  .pf-about__story::before { top: 0;    background: linear-gradient(to bottom, var(--color-void), transparent); }
  .pf-about__story::after  { bottom: 0; background: linear-gradient(to top,   var(--color-void), transparent); }

  .pf-about__story-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }

  .pf-about__story-left {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .pf-about__story-body {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .pf-about__story-para {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(196,181,253,0.62);
  }
  .pf-about__story-para strong {
    color: var(--color-mist);
    font-weight: 500;
  }

  /* Pull quote */
  .pf-about__story-pullquote {
    position: relative;
    padding: 1.5rem 1.75rem;
    border-left: 2px solid transparent;
    border-image: var(--grad-brand) 1;
    background: rgba(30,21,66,0.4);
    border-radius: 0 12px 12px 0;
  }
  .pf-about__story-pullquote p {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(237,233,254,0.8);
  }
  .pf-about__story-pullquote cite {
    display: block;
    margin-top: 0.65rem;
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.55);
    font-style: normal;
  }

  /* Right: timeline */
  .pf-about__timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  /* Vertical connecting line */
  .pf-about__timeline::before {
    content: '';
    position: absolute;
    left: 18px;
    top: 24px;
    bottom: 24px;
    width: 1px;
    background: linear-gradient(to bottom, rgba(139,111,245,0.4), rgba(139,111,245,0.1));
  }

  .pf-about__tl-item {
    display: flex;
    gap: 1.5rem;
    padding-bottom: 2.25rem;
    position: relative;
  }
  .pf-about__tl-item:last-child { padding-bottom: 0; }

  .pf-about__tl-dot {
    flex-shrink: 0;
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(17,13,36,0.9);
    border: 1px solid rgba(139,111,245,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--color-lavender);
    position: relative;
    z-index: 1;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .pf-about__tl-item:hover .pf-about__tl-dot {
    background: rgba(61,43,142,0.5);
    border-color: rgba(139,111,245,0.5);
  }

  .pf-about__tl-content {
    padding-top: 0.35rem;
  }
  .pf-about__tl-year {
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: rgba(139,111,245,0.55);
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }
  .pf-about__tl-title {
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-frost);
    margin-bottom: 0.35rem;
    line-height: 1.3;
  }
  .pf-about__tl-desc {
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.6;
    color: rgba(196,181,253,0.5);
  }

  /* ─────────────────────────────────────────────
     VALUES
  ───────────────────────────────────────────── */
  .pf-about__values {
    padding: 7rem 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .pf-about__values-orb {
    position: absolute;
    width: 500px; height: 500px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(61,43,142,0.2) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }

  .pf-about__values-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  .pf-about__values-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
  }

  .pf-about__values-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .pf-about__value-card {
    padding: 2rem 1.75rem;
    border-radius: 20px;
    background: rgba(17,13,36,0.65);
    border: 1px solid rgba(139,111,245,0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease-spring);
    cursor: default;
    overflow: hidden;
    position: relative;
  }
  .pf-about__value-card:hover {
    border-color: rgba(139,111,245,0.28);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 4px 16px rgba(91,63,212,0.18);
    transform: translateY(-4px);
  }

  /* Accent top line per card */
  .pf-about__value-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--grad-brand);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out-expo);
    border-radius: 20px 20px 0 0;
  }
  .pf-about__value-card:hover::before { transform: scaleX(1); }

  .pf-about__value-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    background: rgba(30,21,66,0.8);
    border: 1px solid rgba(139,111,245,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-lavender);
    transition: background 0.3s ease, transform 0.3s var(--ease-spring);
  }
  .pf-about__value-card:hover .pf-about__value-icon {
    background: rgba(61,43,142,0.5);
    transform: scale(1.08) rotate(-4deg);
  }
  .pf-about__value-icon svg {
    width: 20px; height: 20px;
  }

  .pf-about__value-title {
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-frost);
    letter-spacing: -0.01em;
  }

  .pf-about__value-desc {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.55);
  }

  /* ─────────────────────────────────────────────
     TEAM
  ───────────────────────────────────────────── */
  .pf-about__team {
    padding: 7rem 1.5rem;
    background: var(--color-deep);
    position: relative;
    overflow: hidden;
  }
  .pf-about__team::before,
  .pf-about__team::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 100px;
    pointer-events: none;
    z-index: 0;
  }
  .pf-about__team::before { top: 0;    background: linear-gradient(to bottom, var(--color-void), transparent); }
  .pf-about__team::after  { bottom: 0; background: linear-gradient(to top,   var(--color-void), transparent); }

  .pf-about__team-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  .pf-about__team-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    max-width: 540px;
  }

  .pf-about__team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    width: 100%;
  }

  .pf-about__member {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1.25rem;
    border-radius: 20px;
    border: 1px solid rgba(139,111,245,0.08);
    background: rgba(10,8,18,0.5);
    text-align: center;
    cursor: default;
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s var(--ease-spring);
  }
  .pf-about__member:hover {
    border-color: rgba(139,111,245,0.22);
    background: rgba(17,13,36,0.8);
    transform: translateY(-4px);
  }

  /* Avatar */
  .pf-about__member-avatar-wrap {
    position: relative;
    width: 72px; height: 72px;
  }

  .pf-about__member-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-white);
    background: var(--grad-brand);
    box-shadow: 0 0 0 3px rgba(10,8,18,1), 0 0 0 4px rgba(139,111,245,0.25);
    transition: box-shadow 0.3s ease;
    position: relative;
    z-index: 1;
  }
  .pf-about__member:hover .pf-about__member-avatar {
    box-shadow: 0 0 0 3px rgba(10,8,18,1), 0 0 0 5px rgba(139,111,245,0.5);
  }

  /* Emoji status bubble */
  .pf-about__member-emoji {
    position: absolute;
    bottom: -2px; right: -2px;
    width: 24px; height: 24px;
    border-radius: 50%;
    background: rgba(17,13,36,0.95);
    border: 1px solid rgba(139,111,245,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    z-index: 2;
  }

  .pf-about__member-name {
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-mist);
    line-height: 1.2;
  }

  .pf-about__member-role {
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.5);
  }

  .pf-about__member-bio {
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1.6;
    color: rgba(196,181,253,0.45);
    text-align: center;
  }

  /* Social links on member */
  .pf-about__member-links {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }
  .pf-about__member-link {
    width: 28px; height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(30,21,66,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139,111,245,0.5);
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s var(--ease-spring);
  }
  .pf-about__member-link:hover,
  .pf-about__member-link:focus-visible {
    background: rgba(61,43,142,0.5);
    border-color: rgba(139,111,245,0.4);
    color: var(--color-lavender);
    transform: scale(1.1);
    outline: none;
  }
  .pf-about__member-link svg { width: 12px; height: 12px; }

  /* Hiring card */
  .pf-about__member--hiring {
    border-style: dashed;
    border-color: rgba(139,111,245,0.18);
    background: transparent;
  }
  .pf-about__member--hiring:hover {
    border-color: rgba(139,111,245,0.35);
    background: rgba(30,21,66,0.25);
  }
  .pf-about__hiring-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    border: 2px dashed rgba(139,111,245,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139,111,245,0.4);
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .pf-about__member--hiring:hover .pf-about__hiring-icon {
    border-color: rgba(139,111,245,0.6);
    color: var(--color-lavender);
  }
  .pf-about__hiring-icon svg { width: 24px; height: 24px; }

  /* ─────────────────────────────────────────────
     INVESTORS / BACKERS
  ───────────────────────────────────────────── */
  .pf-about__backers {
    padding: 5rem 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .pf-about__backers-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }

  .pf-about__backers-label {
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.4);
    text-align: center;
  }

  .pf-about__backers-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    width: 100%;
  }

  .pf-about__backer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    opacity: 0.4;
    transition: opacity 0.3s ease;
    cursor: default;
  }
  .pf-about__backer:hover { opacity: 0.75; }

  .pf-about__backer-logo {
    width: 80px; height: 32px;
    border-radius: 6px;
    background: rgba(139,111,245,0.12);
    border: 1px solid rgba(139,111,245,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: rgba(196,181,253,0.6);
  }

  /* ─────────────────────────────────────────────
     OPEN ROLES
  ───────────────────────────────────────────── */
  .pf-about__roles {
    padding: 7rem 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .pf-about__roles-inner {
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }

  .pf-about__roles-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
  }

  .pf-about__roles-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .pf-about__role {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.25rem 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(139,111,245,0.1);
    background: rgba(17,13,36,0.5);
    text-decoration: none;
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.25s var(--ease-spring);
  }
  .pf-about__role:hover,
  .pf-about__role:focus-visible {
    border-color: rgba(139,111,245,0.28);
    background: rgba(30,21,66,0.6);
    transform: translateX(4px);
    outline: none;
  }

  .pf-about__role-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;
  }

  .pf-about__role-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(52,211,153,0.7);
    box-shadow: 0 0 6px 2px rgba(52,211,153,0.3);
    flex-shrink: 0;
    animation: statusPulse 2.5s ease-in-out infinite;
  }
  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }

  .pf-about__role-title {
    font-family: var(--font-ui);
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-frost);
    line-height: 1.2;
  }

  .pf-about__role-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .pf-about__role-tag {
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .pf-about__role-tag--type {
    background: rgba(91,63,212,0.15);
    border: 1px solid rgba(91,63,212,0.25);
    color: var(--color-lavender);
  }
  .pf-about__role-tag--loc {
    background: rgba(30,21,66,0.5);
    border: 1px solid rgba(139,111,245,0.12);
    color: rgba(196,181,253,0.5);
  }

  .pf-about__role-arrow {
    width: 16px; height: 16px;
    color: rgba(139,111,245,0.4);
    transition: color 0.2s ease, transform 0.2s var(--ease-spring);
  }
  .pf-about__role:hover .pf-about__role-arrow {
    color: var(--color-lavender);
    transform: translateX(3px);
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 900px) {
    .pf-about__story-inner { grid-template-columns: 1fr; gap: 3rem; }
    .pf-about__values-grid { grid-template-columns: 1fr 1fr; }
    .pf-about__team-grid   { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 580px) {
    .pf-about__hero-stats {
      flex-direction: column;
      width: 100%;
    }
    .pf-about__hero-stat { border-right: none; border-bottom: 1px solid rgba(139,111,245,0.1); }
    .pf-about__hero-stat:last-child { border-bottom: none; }
    .pf-about__values-grid { grid-template-columns: 1fr; }
    .pf-about__team-grid   { grid-template-columns: 1fr 1fr; }
    .pf-about__role { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-about *, .pf-about *::before, .pf-about *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .pf-about__hero-headline,
    .pf-about__hero-sub,
    .pf-about__hero-stats,
    .pf-about__scroll-hint { opacity: 1 !important; transform: none !important; }
    .pf-reveal { opacity: 1 !important; transform: none !important; }
    .pf-about__particle { display: none; }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const BulbIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2a5.5 5.5 0 0 1 3.5 9.74V14a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1v-2.26A5.5 5.5 0 0 1 10 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 17h5M8.5 15v1.5m3-1.5v1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 16s-7-4.35-7-8.5A4.5 4.5 0 0 1 10 5a4.5 4.5 0 0 1 7 2.5C17 11.65 10 16 10 16Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SpeedIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 4.5l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 17c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 5a3 3 0 0 1 0 6M18 17c0-2.5-1.79-4.58-4.25-5.24"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l2.2 6H18l-4.9 3.6 1.9 6-5.2-3.7L4.9 17.6l1.9-6L2 8h5.8L10 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const TwitterX = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M9.45 1.5H11.2L7.43 5.78 11.78 10.5H8.33L5.63 6.97 2.53 10.5H0.77L4.8 5.93.6 1.5H4.13L6.6 4.73 9.45 1.5ZM8.85 9.45H9.75L3.6 2.54H2.63L8.85 9.45Z"
            fill="currentColor" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="10.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1" />
        <path d="M3 5v4M3 3.5v.01M5.25 9V7.25c0-.83.67-1.5 1.5-1.5S8.25 6.42 8.25 7.25V9M5.25 5v4"
            stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const ArrowRight = () => (
    <svg className="pf-about__role-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightBtn = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const HERO_STATS = [
    { val: "2,400+", lbl: "Founders" },
    { val: "2021", lbl: "Founded" },
    { val: "$0", lbl: "To Start" },
    { val: "4 days", lbl: "Avg Validation" },
];

const TIMELINE = [
    {
        year: "Nov 2021",
        title: "The expensive mistake",
        desc: "Co-founders Alex & Sara burn 6 months and $40k building a product nobody wanted. The insight: the idea, not the execution, was wrong.",
    },
    {
        year: "Mar 2022",
        title: "The first prototype",
        desc: "A basic landing-page builder and waitlist tool cobbled together over a weekend. 200 founders signed up in 48 hours.",
    },
    {
        year: "Sep 2022",
        title: "YC S22 & seed round",
        desc: "Proofly joins Y Combinator. Analytics, lead export, and the idea scoring engine ship. 500 paying customers.",
    },
    {
        year: "2023",
        title: "Product-market fit",
        desc: "NPS hits 72. Enterprise tier launches. Team grows to 12. Proofly becomes the default validation layer for 3 startup studios.",
    },
    {
        year: "2024 →",
        title: "The mission scales",
        desc: "2,400+ founders on the platform. Series A closed. Building the analytics and integrations roadmap for 2025.",
    },
];

const VALUES = [
    {
        icon: <BulbIcon />,
        title: "Validate before you build",
        desc: "We practice what we preach. Every new feature at Proofly is validated internally before a single line of product code is written.",
    },
    {
        icon: <SpeedIcon />,
        title: "Speed is a feature",
        desc: "Founders move fast. Our tools match that energy. We obsess over time-to-insight — every second you wait costs you momentum.",
    },
    {
        icon: <HeartIcon />,
        title: "Founder empathy above all",
        desc: "We've been in the trenches. We've felt the pain of building the wrong thing. That experience lives in every design decision we make.",
    },
    {
        icon: <ShieldIcon />,
        title: "Data stays yours",
        desc: "Your leads, your metrics, your ideas. We never sell or share founder data. Export everything, anytime, with zero lock-in.",
    },
    {
        icon: <UsersIcon />,
        title: "Community over competition",
        desc: "The best founders help each other. Proofly's community of 2,400+ is a feature in itself — shared learnings, shared wins.",
    },
    {
        icon: <StarIcon />,
        title: "Craft over hype",
        desc: "We ship slowly and deliberately. A tool that genuinely helps one founder beats a feature that looks good in a demo every time.",
    },
];

const TEAM = [
    {
        initials: "AS",
        name: "Alex Santos",
        role: "CEO & Co-founder",
        bio: "2× founder. Previously PM at Stripe. Burned $40k on the wrong idea — Proofly is his revenge.",
        emoji: "🚀",
        grad: "linear-gradient(135deg,#5b3fd4,#8b6ff5)",
        twitter: "#",
        linkedin: "#",
    },
    {
        initials: "SR",
        name: "Sara Rowe",
        role: "CTO & Co-founder",
        bio: "Ex-Vercel engineer. Built the original prototype in 48h. Believes speed is a design principle, not just a metric.",
        emoji: "⚡",
        grad: "linear-gradient(135deg,#7c3aed,#a78bfa)",
        twitter: "#",
        linkedin: "#",
    },
    {
        initials: "DK",
        name: "Dev Kumar",
        role: "Head of Design",
        bio: "Former lead designer at Linear. Obsessed with turning complex data into interfaces that feel obvious.",
        emoji: "✦",
        grad: "linear-gradient(135deg,#4338ca,#818cf8)",
        twitter: "#",
        linkedin: "#",
    },
    {
        initials: "MO",
        name: "Maria Osei",
        role: "Head of Growth",
        bio: "Scaled two B2B SaaS products from $0 to $2M ARR. Joined Proofly to help founders skip the part she learned the hard way.",
        emoji: "📈",
        grad: "linear-gradient(135deg,#6d28d9,#c084fc)",
        twitter: "#",
        linkedin: "#",
    },
];

const BACKERS = ["YC", "a16z", "Sequoia", "Notion", "First Round", "Calm Fund"];

const ROLES = [
    { title: "Senior Full-Stack Engineer", type: "Full-time", loc: "Remote" },
    { title: "Product Designer", type: "Full-time", loc: "Remote / SF" },
    { title: "Founder Success Manager", type: "Full-time", loc: "Remote" },
    { title: "Developer Advocate", type: "Contract", loc: "Remote" },
];

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
        }, { threshold: 0.1, ...opts });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return v;
}

/* ─────────────────────────────────────────────
   Particle layer
───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 90 + 5,
    top: Math.random() * 80 + 10,
    dur: Math.random() * 6 + 6,
    delay: Math.random() * 8,
}));

/* ─────────────────────────────────────────────
   About page
───────────────────────────────────────────── */
export default function About() {
    const storyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const backersRef = useRef(null);
    const rolesRef = useRef(null);

    const storyVis = useReveal(storyRef);
    const valuesVis = useReveal(valuesRef);
    const teamVis = useReveal(teamRef);
    const backersVis = useReveal(backersRef);
    const rolesVis = useReveal(rolesRef);

    return (
        <>
            <style>{styles}</style>

            <main className="pf-about" aria-label="About Proofly">

                {/* ────────────────── HERO ────────────────── */}
                <section className="pf-about__hero" aria-labelledby="about-hero-heading">

                    <div className="pf-about__hero-grid" aria-hidden="true" />
                    <div className="pf-about__hero-orb pf-about__hero-orb--a" aria-hidden="true" />
                    <div className="pf-about__hero-orb pf-about__hero-orb--b" aria-hidden="true" />

                    {/* Particles */}
                    <div className="pf-about__particles" aria-hidden="true">
                        {PARTICLES.map(p => (
                            <div
                                key={p.id}
                                className="pf-about__particle"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    "--dur": `${p.dur}s`,
                                    "--delay": `${p.delay}s`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="pf-about__hero-content">
                        <div className="pf-eyebrow" aria-hidden="true">✦ Our Story</div>

                        <h1 id="about-hero-heading" className="pf-about__hero-headline">
                            Built by founders,<br />
                            <em>for founders</em>
                        </h1>

                        <p className="pf-about__hero-sub">
                            We burned $40,000 and six months building a product nobody wanted.
                            Proofly exists so you never have to make that mistake.
                        </p>

                        <div
                            className="pf-about__hero-stats"
                            role="list"
                            aria-label="Company stats"
                        >
                            {HERO_STATS.map(({ val, lbl }) => (
                                <div key={lbl} className="pf-about__hero-stat" role="listitem">
                                    <span className="pf-about__hero-stat-val">{val}</span>
                                    <span className="pf-about__hero-stat-lbl">{lbl}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pf-about__scroll-hint" aria-hidden="true">
                        <span className="pf-about__scroll-label">Scroll</span>
                        <div className="pf-about__scroll-line" />
                    </div>
                </section>

                {/* ────────────────── STORY ────────────────── */}
                <section className="pf-about__story" aria-labelledby="story-heading">
                    <div className="pf-about__story-inner">

                        <div
                            ref={storyRef}
                            className={`pf-about__story-left pf-reveal ${storyVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ Origin</div>
                            <h2 id="story-heading" className="pf-section-heading">
                                The story behind<br /><em>the tool</em>
                            </h2>

                            <div className="pf-about__story-body">
                                <p className="pf-about__story-para">
                                    In 2021, <strong>Alex Santos</strong> and <strong>Sara Rowe</strong> spent six months
                                    building a B2B analytics platform. They had a great team, solid engineering,
                                    and a polished product. They had everything — except customers.
                                </p>
                                <p className="pf-about__story-para">
                                    After a painful post-mortem, the truth was simple: <strong>nobody had ever asked
                                        for what they built</strong>. They'd optimised execution on a fundamentally
                                    unvalidated idea.
                                </p>
                                <p className="pf-about__story-para">
                                    So they built Proofly in a weekend to test their next idea. 200 founders
                                    signed up in 48 hours — and the tool became the product.
                                </p>
                            </div>

                            <blockquote className="pf-about__story-pullquote">
                                <p>"The biggest startup mistake isn't bad code. It's building the right thing wrong, when you should've validated the idea first."</p>
                                <cite>— Alex Santos, CEO & Co-founder</cite>
                            </blockquote>
                        </div>

                        {/* Timeline */}
                        <div
                            className={`pf-about__timeline pf-reveal ${storyVis ? "is-visible" : ""}`}
                            style={{ transitionDelay: "120ms" }}
                            aria-label="Company timeline"
                        >
                            {TIMELINE.map((item, i) => (
                                <div key={i} className="pf-about__tl-item">
                                    <div className="pf-about__tl-dot" aria-hidden="true">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="pf-about__tl-content">
                                        <p className="pf-about__tl-year">{item.year}</p>
                                        <p className="pf-about__tl-title">{item.title}</p>
                                        <p className="pf-about__tl-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ────────────────── VALUES ────────────────── */}
                <section className="pf-about__values" aria-labelledby="values-heading">
                    <div className="pf-about__values-orb" aria-hidden="true" />
                    <div className="pf-about__values-inner">

                        <header
                            className={`pf-about__values-header pf-reveal ${valuesVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ What We Stand For</div>
                            <h2 id="values-heading" className="pf-section-heading">
                                Six principles that<br /><em>drive everything</em>
                            </h2>
                        </header>

                        <div
                            ref={valuesRef}
                            className="pf-about__values-grid"
                            role="list"
                            aria-label="Company values"
                        >
                            {VALUES.map((v, i) => (
                                <article
                                    key={v.title}
                                    className={`pf-about__value-card pf-reveal ${valuesVis ? "is-visible" : ""}`}
                                    style={{ transitionDelay: valuesVis ? `${i * 80}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`value-${i}`}
                                >
                                    <div className="pf-about__value-icon" aria-hidden="true">{v.icon}</div>
                                    <h3 id={`value-${i}`} className="pf-about__value-title">{v.title}</h3>
                                    <p className="pf-about__value-desc">{v.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ────────────────── TEAM ────────────────── */}
                <section className="pf-about__team" aria-labelledby="team-heading">
                    <div className="pf-about__team-inner">

                        <header
                            className={`pf-about__team-header pf-reveal ${teamVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ The Team</div>
                            <h2 id="team-heading" className="pf-section-heading">
                                The humans<br /><em>behind Proofly</em>
                            </h2>
                            <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(196,181,253,0.6)", fontFamily: "var(--font-body)" }}>
                                A small, focused team of ex-founders and product builders who've lived the problem firsthand.
                            </p>
                        </header>

                        <div
                            ref={teamRef}
                            className="pf-about__team-grid"
                            role="list"
                            aria-label="Team members"
                        >
                            {TEAM.map((member, i) => (
                                <article
                                    key={member.name}
                                    className={`pf-about__member pf-reveal ${teamVis ? "is-visible" : ""}`}
                                    style={{ transitionDelay: teamVis ? `${i * 100}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`member-${i}`}
                                >
                                    <div className="pf-about__member-avatar-wrap">
                                        <div
                                            className="pf-about__member-avatar"
                                            style={{ background: member.grad }}
                                            aria-hidden="true"
                                        >
                                            {member.initials}
                                        </div>
                                        <div className="pf-about__member-emoji" aria-hidden="true">
                                            {member.emoji}
                                        </div>
                                    </div>
                                    <p id={`member-${i}`} className="pf-about__member-name">{member.name}</p>
                                    <p className="pf-about__member-role">{member.role}</p>
                                    <p className="pf-about__member-bio">{member.bio}</p>
                                    <nav className="pf-about__member-links" aria-label={`${member.name} social links`}>
                                        <a href={member.twitter} className="pf-about__member-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                            <TwitterX />
                                        </a>
                                        <a href={member.linkedin} className="pf-about__member-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon />
                                        </a>
                                    </nav>
                                </article>
                            ))}

                            {/* Hiring card */}
                            <Link
                                to="/careers"
                                className={`pf-about__member pf-about__member--hiring pf-reveal ${teamVis ? "is-visible" : ""}`}
                                style={{ transitionDelay: teamVis ? `${TEAM.length * 100}ms` : "0ms" }}
                                aria-label="View open roles at Proofly"
                            >
                                <div className="pf-about__hiring-icon" aria-hidden="true">
                                    <PlusIcon />
                                </div>
                                <p className="pf-about__member-name">You?</p>
                                <p className="pf-about__member-role">Open Roles</p>
                                <p className="pf-about__member-bio">We're hiring across engineering, design, and growth. Come build with us.</p>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ────────────────── BACKERS ────────────────── */}
                <div
                    ref={backersRef}
                    className={`pf-about__backers pf-reveal ${backersVis ? "is-visible" : ""}`}
                >
                    <div className="pf-about__backers-inner">
                        <p className="pf-about__backers-label">Backed by world-class investors</p>
                        <div className="pf-about__backers-row" role="list" aria-label="Investors">
                            {BACKERS.map(b => (
                                <div key={b} className="pf-about__backer" role="listitem">
                                    <div className="pf-about__backer-logo">{b}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ────────────────── OPEN ROLES ────────────────── */}
                <section className="pf-about__roles" aria-labelledby="roles-heading">
                    <div className="pf-about__roles-inner">

                        <header
                            ref={rolesRef}
                            className={`pf-about__roles-header pf-reveal ${rolesVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ Join the Team</div>
                            <h2 id="roles-heading" className="pf-section-heading">
                                Open roles at<br /><em>Proofly</em>
                            </h2>
                            <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(196,181,253,0.55)", fontFamily: "var(--font-body)", textAlign: "center" }}>
                                Remote-first. Async-friendly. Equity from day one.
                            </p>
                        </header>

                        <div
                            className="pf-about__roles-list"
                            role="list"
                            aria-label="Open job roles"
                        >
                            {ROLES.map((role, i) => (
                                <Link
                                    key={role.title}
                                    to={`/careers/${role.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={`pf-about__role pf-reveal ${rolesVis ? "is-visible" : ""}`}
                                    style={{ transitionDelay: rolesVis ? `${i * 80}ms` : "0ms" }}
                                    role="listitem"
                                    aria-label={`${role.title} — ${role.type}, ${role.loc}`}
                                >
                                    <div className="pf-about__role-left">
                                        <div className="pf-about__role-dot" aria-hidden="true" />
                                        <span className="pf-about__role-title">{role.title}</span>
                                    </div>
                                    <div className="pf-about__role-right">
                                        <span className="pf-about__role-tag pf-about__role-tag--type">{role.type}</span>
                                        <span className="pf-about__role-tag pf-about__role-tag--loc">{role.loc}</span>
                                        <ArrowRight />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Link
                            to="/signup"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.9rem 2.2rem",
                                borderRadius: "999px",
                                background: "var(--grad-brand)",
                                backgroundSize: "200% 200%",
                                backgroundPosition: "0% 50%",
                                fontFamily: "var(--font-ui)",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                color: "var(--color-white)",
                                textDecoration: "none",
                                boxShadow: "0 4px 24px rgba(91,63,212,0.4)",
                                marginTop: "1rem",
                                transition: "transform 0.25s var(--ease-spring), box-shadow 0.3s ease",
                            }}
                            aria-label="Get started with Proofly for free"
                        >
                            Start Validating Free <ArrowRightBtn />
                        </Link>

                    </div>
                </section>

            </main>
        </>
    );
}