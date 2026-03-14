import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Design tokens & global styles
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    /* Brand palette – dark-to-light purple gradient arc */
    --color-void:        #0a0812;
    --color-deep:        #110d24;
    --color-plum:        #1e1542;
    --color-violet:      #3d2b8e;
    --color-iris:        #5b3fd4;
    --color-lavender:    #8b6ff5;
    --color-mist:        #c4b5fd;
    --color-frost:       #ede9fe;
    --color-white:       #faf9ff;

    /* Gradient presets */
    --grad-brand:        linear-gradient(135deg, var(--color-iris) 0%, var(--color-lavender) 60%, #d8b4fe 100%);
    --grad-glow:         radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,63,212,0.45) 0%, transparent 70%);
    --grad-mesh:         radial-gradient(ellipse 55% 45% at 80% 20%, rgba(139,111,245,0.18) 0%, transparent 60%),
                         radial-gradient(ellipse 40% 55% at 10% 80%, rgba(61,43,142,0.25) 0%, transparent 65%);

    /* Typography */
    --font-display:      'DM Serif Display', Georgia, serif;
    --font-ui:           'Syne', sans-serif;
    --font-body:         'DM Sans', sans-serif;

    /* Spacing scale (8-pt grid) */
    --sp-1: 0.25rem;
    --sp-2: 0.5rem;
    --sp-3: 0.75rem;
    --sp-4: 1rem;
    --sp-6: 1.5rem;
    --sp-8: 2rem;
    --sp-12: 3rem;
    --sp-16: 4rem;
    --sp-24: 6rem;

    /* Radius */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-pill: 999px;

    /* Transitions */
    --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
    --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Reset scoped to hero ── */
  .proofly-hero *,
  .proofly-hero *::before,
  .proofly-hero *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section shell ── */
  .proofly-hero {
    position: relative;
    min-height: 100svh;
    background-color: var(--color-void);
    background-image: var(--grad-mesh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: var(--font-body);
    color: var(--color-white);
    padding: var(--sp-24) var(--sp-6) var(--sp-16);
  }

  /* ── Ambient glow layer ── */
  .proofly-hero__glow {
    position: absolute;
    inset: 0;
    background: var(--grad-glow);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Decorative grid lines ── */
  .proofly-hero__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139,111,245,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,111,245,0.06) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Orbiting blobs ── */
  .proofly-hero__blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    animation: blobFadeIn 1.2s var(--ease-out-expo) forwards;
  }

  .proofly-hero__blob--a {
    width: 520px;
    height: 520px;
    top: -120px;
    right: -80px;
    background: radial-gradient(circle, rgba(91,63,212,0.5) 0%, rgba(61,43,142,0.1) 70%);
    animation-delay: 0.2s;
  }

  .proofly-hero__blob--b {
    width: 380px;
    height: 380px;
    bottom: 40px;
    left: -60px;
    background: radial-gradient(circle, rgba(139,111,245,0.3) 0%, transparent 70%);
    animation-delay: 0.5s;
  }

  @keyframes blobFadeIn {
    to { opacity: 1; }
  }

  /* ── Content wrapper ── */
  .proofly-hero__content {
    position: relative;
    z-index: 1;
    max-width: 860px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--sp-8);
  }

  /* ── Eyebrow badge ── */
  .proofly-hero__badge {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-4);
    border-radius: var(--radius-pill);
    border: 1px solid rgba(139,111,245,0.35);
    background: rgba(61,43,142,0.25);
    backdrop-filter: blur(8px);
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-mist);

    opacity: 0;
    transform: translateY(12px);
    animation: slideUp 0.7s var(--ease-out-expo) 0.1s forwards;
  }

  .proofly-hero__badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-lavender);
    box-shadow: 0 0 8px 2px rgba(139,111,245,0.7);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.6; }
  }

  /* ── Headline ── */
  .proofly-hero__headline {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 6.5vw, 5rem);
    font-weight: 400; /* DM Serif Display looks best at 400 */
    line-height: 1.08;
    letter-spacing: -0.01em;
    color: var(--color-white);

    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.85s var(--ease-out-expo) 0.25s forwards;
  }

  .proofly-hero__headline em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Sub-headline ── */
  .proofly-hero__sub {
    max-width: 560px;
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.75);

    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.85s var(--ease-out-expo) 0.4s forwards;
  }

  /* ── CTA group ── */
  .proofly-hero__cta-group {
    display: flex;
    align-items: center;
    gap: var(--sp-4);
    flex-wrap: wrap;
    justify-content: center;

    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.85s var(--ease-out-expo) 0.55s forwards;
  }

  /* Primary button */
  .proofly-hero__btn-primary {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    padding: 0.85rem 2.2rem;
    border-radius: var(--radius-pill);
    background: var(--grad-brand);
    background-size: 200% 200%;
    background-position: 0% 50%;
    color: var(--color-white);
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    box-shadow:
      0 0 0 1px rgba(139,111,245,0.3),
      0 4px 24px rgba(91,63,212,0.5),
      0 1px 2px rgba(0,0,0,0.3);
    transition:
      background-position 0.5s var(--ease-out-expo),
      box-shadow 0.3s ease,
      transform 0.25s var(--ease-spring);
  }

  .proofly-hero__btn-primary:hover,
  .proofly-hero__btn-primary:focus-visible {
    background-position: 100% 50%;
    box-shadow:
      0 0 0 1px rgba(196,181,253,0.4),
      0 8px 40px rgba(91,63,212,0.65),
      0 2px 4px rgba(0,0,0,0.3);
    transform: translateY(-2px) scale(1.02);
    outline: none;
  }

  .proofly-hero__btn-primary:active {
    transform: translateY(0) scale(0.98);
  }

  .proofly-hero__btn-primary svg {
    transition: transform 0.3s var(--ease-spring);
  }
  .proofly-hero__btn-primary:hover svg {
    transform: translateX(3px);
  }

  /* Ghost button */
  .proofly-hero__btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2);
    padding: 0.85rem 1.8rem;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(139,111,245,0.3);
    background: rgba(30,21,66,0.4);
    backdrop-filter: blur(10px);
    color: var(--color-mist);
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease,
      transform 0.25s var(--ease-spring);
  }

  .proofly-hero__btn-ghost:hover,
  .proofly-hero__btn-ghost:focus-visible {
    background: rgba(61,43,142,0.4);
    border-color: rgba(139,111,245,0.6);
    color: var(--color-frost);
    transform: translateY(-2px);
    outline: none;
  }

  /* ── Social proof strip ── */
  .proofly-hero__proof {
    display: flex;
    align-items: center;
    gap: var(--sp-4);
    flex-wrap: wrap;
    justify-content: center;

    opacity: 0;
    animation: fadeIn 0.9s ease 0.75s forwards;
  }

  .proofly-hero__avatars {
    display: flex;
    align-items: center;
  }

  .proofly-hero__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--color-deep);
    margin-left: -10px;
    overflow: hidden;
    background: var(--grad-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--color-white);
  }

  .proofly-hero__avatars .proofly-hero__avatar:first-child {
    margin-left: 0;
  }

  .proofly-hero__proof-text {
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(196,181,253,0.6);
    line-height: 1.4;
  }

  .proofly-hero__proof-text strong {
    color: var(--color-mist);
    font-weight: 500;
  }

  .proofly-hero__proof-divider {
    width: 1px;
    height: 24px;
    background: rgba(139,111,245,0.2);
  }

  .proofly-hero__stars {
    display: flex;
    gap: 2px;
    color: #f5c542;
    font-size: 0.85rem;
  }

  /* ── Scroll hint ── */
  .proofly-hero__scroll-hint {
    position: absolute;
    bottom: var(--sp-8);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2);
    opacity: 0;
    animation: fadeIn 1s ease 1.2s forwards;
    cursor: default;
    user-select: none;
  }

  .proofly-hero__scroll-label {
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(139,111,245,0.5);
  }

  .proofly-hero__scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(139,111,245,0.5), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
    40%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    80%  { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  }

  /* ── Shared animations ── */
  @keyframes slideUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .proofly-hero {
      padding: var(--sp-16) var(--sp-4) var(--sp-16);
      min-height: 100dvh;
    }

    .proofly-hero__headline {
      font-size: clamp(2.2rem, 10vw, 3rem);
    }

    .proofly-hero__cta-group {
      flex-direction: column;
      width: 100%;
    }

    .proofly-hero__btn-primary,
    .proofly-hero__btn-ghost {
      width: 100%;
      justify-content: center;
    }

    .proofly-hero__proof-divider {
      display: none;
    }

    .proofly-hero__blob--a {
      width: 300px;
      height: 300px;
      top: -60px;
      right: -80px;
    }

    .proofly-hero__blob--b {
      width: 220px;
      height: 220px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .proofly-hero *,
    .proofly-hero *::before,
    .proofly-hero *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Animated arrow icon – no external dep */
function ArrowRight({ size = 16, ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/** Play icon for ghost CTA */
function PlayIcon({ size = 14 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 4.5l4 2.5-4 2.5V4.5z" fill="currentColor" />
        </svg>
    );
}

/** Minimal avatar placeholder rendered as styled initials */
const AVATARS = [
    { initials: "AS", hue: "135deg,#4f46e5,#7c3aed" },
    { initials: "MJ", hue: "135deg,#7c3aed,#a855f7" },
    { initials: "RK", hue: "135deg,#a855f7,#c084fc" },
    { initials: "TL", hue: "135deg,#6d28d9,#8b5cf6" },
];

function AvatarStack() {
    return (
        <div className="proofly-hero__avatars" aria-hidden="true">
            {AVATARS.map(({ initials, hue }) => (
                <div
                    key={initials}
                    className="proofly-hero__avatar"
                    style={{ background: `linear-gradient(${hue})` }}
                    title={initials}
                >
                    {initials}
                </div>
            ))}
        </div>
    );
}

function StarRating({ rating = 5 }) {
    return (
        <div className="proofly-hero__stars" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} aria-hidden="true">{i < rating ? "★" : "☆"}</span>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Hero component
───────────────────────────────────────────── */
export default function Hero() {
    const sectionRef = useRef(null);

    /* Parallax blob effect on mouse move */
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const blobs = section.querySelectorAll(".proofly-hero__blob");

        const handleMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xRatio = (clientX / innerWidth - 0.5) * 2;   // -1 → 1
            const yRatio = (clientY / innerHeight - 0.5) * 2;  // -1 → 1

            blobs.forEach((blob, i) => {
                const depth = (i + 1) * 14;
                blob.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
            });
        };

        const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
        if (mq.matches) {
            window.addEventListener("mousemove", handleMove, { passive: true });
        }

        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <>
            <style>{styles}</style>

            <section
                ref={sectionRef}
                className="proofly-hero"
                aria-labelledby="hero-headline"
            >
                {/* Decorative layers */}
                <div className="proofly-hero__glow" aria-hidden="true" />
                <div className="proofly-hero__grid" aria-hidden="true" />
                <div className="proofly-hero__blob proofly-hero__blob--a" aria-hidden="true" />
                <div className="proofly-hero__blob proofly-hero__blob--b" aria-hidden="true" />

                {/* Main content */}
                <div className="proofly-hero__content">

                    {/* Eyebrow */}
                    <div className="proofly-hero__badge" aria-label="Now available">
                        <span className="proofly-hero__badge-dot" aria-hidden="true" />
                        Now in Early Access
                    </div>

                    {/* Headline */}
                    <h1 id="hero-headline" className="proofly-hero__headline">
                        Validate Your Startup&nbsp;Ideas{" "}
                        <em>Before&nbsp;You&nbsp;Build</em>
                    </h1>

                    {/* Sub-headline */}
                    <p className="proofly-hero__sub">
                        Proofly gives founders the tools to test demand, collect real feedback,
                        and make confident decisions — all before writing a single line of code.
                    </p>

                    {/* CTAs */}
                    <div className="proofly-hero__cta-group">
                        <Link
                            to="/signup"
                            className="proofly-hero__btn-primary"
                            aria-label="Get started with Proofly for free"
                        >
                            Get Started Free
                            <ArrowRight size={15} />
                        </Link>

                        <Link
                            to="/demo"
                            className="proofly-hero__btn-ghost"
                            aria-label="Watch a product demo"
                        >
                            <PlayIcon size={14} />
                            Watch Demo
                        </Link>
                    </div>

                    {/* Social proof */}
                    <div className="proofly-hero__proof" role="complementary" aria-label="Social proof">
                        <AvatarStack />
                        <p className="proofly-hero__proof-text">
                            Trusted by <strong>2,400+</strong> founders
                        </p>
                        <div className="proofly-hero__proof-divider" aria-hidden="true" />
                        <StarRating rating={5} />
                        <p className="proofly-hero__proof-text">
                            <strong>4.9 / 5</strong> avg. rating
                        </p>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="proofly-hero__scroll-hint" aria-hidden="true">
                    <span className="proofly-hero__scroll-label">Scroll</span>
                    <div className="proofly-hero__scroll-line" />
                </div>
            </section>
        </>
    );
}