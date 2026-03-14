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
    --grad-card-border: linear-gradient(135deg, rgba(139,111,245,0.4), rgba(91,63,212,0.15), transparent 60%);

    --font-display:     'DM Serif Display', Georgia, serif;
    --font-ui:          'Syne', sans-serif;
    --font-body:        'DM Sans', sans-serif;

    --ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
    --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pf-services *,
  .pf-services *::before,
  .pf-services *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section shell ── */
  .pf-services {
    position: relative;
    background: var(--color-void);
    padding: 7rem 1.5rem;
    overflow: hidden;
    font-family: var(--font-body);
  }

  /* Decorative background elements */
  .pf-services__bg-line {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(139,111,245,0.12) 30%, rgba(139,111,245,0.12) 70%, transparent);
    pointer-events: none;
  }

  .pf-services__bg-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(61,43,142,0.2) 0%, transparent 70%);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    filter: blur(60px);
  }

  /* ── Inner container ── */
  .pf-services__inner {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4.5rem;
  }

  /* ── Header block ── */
  .pf-services__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    max-width: 620px;
  }

  .pf-services__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.3);
    background: rgba(30,21,66,0.5);
    font-family: var(--font-ui);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-lavender);
  }

  .pf-services__eyebrow-dash {
    width: 14px;
    height: 1.5px;
    background: var(--color-lavender);
    border-radius: 999px;
  }

  .pf-services__heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }

  .pf-services__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-services__subheading {
    font-size: 1.05rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.65);
    max-width: 480px;
  }

  /* ── Cards grid ── */
  .pf-services__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    width: 100%;
  }

  /* ── Single card ── */
  .pf-card {
    position: relative;
    border-radius: 20px;
    padding: 2.25rem 2rem;
    background: rgba(17,13,36,0.7);
    border: 1px solid rgba(139,111,245,0.12);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    cursor: default;
    overflow: hidden;

    /* Reveal animation — set via inline style */
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity 0.65s var(--ease-out-expo),
      transform 0.65s var(--ease-out-expo),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .pf-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hover lift */
  .pf-card:hover {
    border-color: rgba(139,111,245,0.32);
    box-shadow:
      0 0 0 1px rgba(139,111,245,0.08),
      0 16px 48px rgba(0,0,0,0.4),
      0 4px 16px rgba(91,63,212,0.2);
    transform: translateY(-4px);
  }

  /* Sheen sweep on hover */
  .pf-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      115deg,
      transparent 40%,
      rgba(139,111,245,0.06) 50%,
      transparent 60%
    );
    background-size: 250% 250%;
    background-position: 200% 50%;
    transition: background-position 0.6s var(--ease-out-expo);
    pointer-events: none;
  }

  .pf-card:hover::before {
    background-position: -50% 50%;
  }

  /* Gradient corner accent */
  .pf-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 120px;
    background: var(--grad-card-border);
    border-radius: 20px 0 80px 0;
    opacity: 0.5;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .pf-card:hover::after {
    opacity: 0.9;
  }

  /* ── Card number ── */
  .pf-card__number {
    position: absolute;
    top: 1.5rem;
    right: 1.75rem;
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: rgba(139,111,245,0.3);
    transition: color 0.3s ease;
  }

  .pf-card:hover .pf-card__number {
    color: rgba(139,111,245,0.55);
  }

  /* ── Icon wrapper ── */
  .pf-card__icon-wrap {
    position: relative;
    z-index: 1;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(30,21,66,0.8);
    border: 1px solid rgba(139,111,245,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s var(--ease-spring);
    flex-shrink: 0;
  }

  .pf-card:hover .pf-card__icon-wrap {
    background: rgba(61,43,142,0.5);
    border-color: rgba(139,111,245,0.45);
    transform: scale(1.08) rotate(-3deg);
  }

  .pf-card__icon-wrap svg {
    width: 22px;
    height: 22px;
    color: var(--color-lavender);
    transition: color 0.3s ease;
  }

  .pf-card:hover .pf-card__icon-wrap svg {
    color: var(--color-mist);
  }

  /* ── Card body ── */
  .pf-card__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
  }

  .pf-card__title {
    font-family: var(--font-ui);
    font-size: 1.08rem;
    font-weight: 700;
    color: var(--color-frost);
    letter-spacing: -0.01em;
    line-height: 1.3;
    transition: color 0.2s ease;
  }

  .pf-card:hover .pf-card__title {
    color: var(--color-white);
  }

  .pf-card__desc {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.65;
    color: rgba(196,181,253,0.58);
  }

  /* ── Card tag list ── */
  .pf-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.25rem;
  }

  .pf-card__tag {
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: rgba(139,111,245,0.7);
    background: rgba(91,63,212,0.12);
    border: 1px solid rgba(91,63,212,0.2);
    border-radius: 999px;
    padding: 0.2rem 0.6rem;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .pf-card:hover .pf-card__tag {
    background: rgba(91,63,212,0.22);
    color: var(--color-mist);
  }

  /* ── Card footer link ── */
  .pf-card__link {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.5rem;
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: rgba(139,111,245,0.6);
    text-decoration: none;
    transition: color 0.2s ease, gap 0.2s var(--ease-spring);
    width: fit-content;
  }

  .pf-card__link:hover,
  .pf-card__link:focus-visible {
    color: var(--color-lavender);
    gap: 0.55rem;
    outline: none;
  }

  .pf-card__link:focus-visible {
    text-decoration: underline;
  }

  /* ── Bottom CTA strip ── */
  .pf-services__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;

    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
  }

  .pf-services__cta.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .pf-services__cta-label {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(196,181,253,0.5);
    letter-spacing: 0.01em;
  }

  .pf-services__cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.8rem 2rem;
    border-radius: 999px;
    background: var(--grad-brand);
    background-size: 200% 200%;
    background-position: 0% 50%;
    font-family: var(--font-ui);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-white);
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(91,63,212,0.45);
    transition:
      background-position 0.5s var(--ease-out-expo),
      box-shadow 0.3s ease,
      transform 0.25s var(--ease-spring);
  }

  .pf-services__cta-btn:hover,
  .pf-services__cta-btn:focus-visible {
    background-position: 100% 50%;
    box-shadow: 0 6px 32px rgba(91,63,212,0.6);
    transform: translateY(-2px) scale(1.02);
    outline: none;
  }

  /* ── Responsive ── */
  @media (max-width: 780px) {
    .pf-services {
      padding: 5rem 1.25rem;
    }

    .pf-services__grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .pf-card {
      padding: 1.75rem 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-services *,
    .pf-services *::before,
    .pf-services *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .pf-card,
    .pf-services__cta {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

/* ─────────────────────────────────────────────
   Icons (inline SVG — no react-icons dep)
───────────────────────────────────────────── */
const LightbulbIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 2a7 7 0 0 1 4 12.73V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.27A7 7 0 0 1 12 2z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 21h6M10 18v1m4-1v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 6v2m-3.12.88 1.42 1.42M6 13h2m10 0h-2m-.3-3.7 -1.42 1.42"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75M22 20c0-2.76-2.24-5-5-5"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

const ChartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M3 17l4-5 4 3 4-6 4 4" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        <circle cx="7" cy="12" r="1.2" fill="currentColor" opacity="0.7" />
        <circle cx="11" cy="15" r="1.2" fill="currentColor" opacity="0.7" />
        <circle cx="15" cy="9" r="1.2" fill="currentColor" opacity="0.7" />
        <circle cx="19" cy="13" r="1.2" fill="currentColor" opacity="0.7" />
    </svg>
);

const ClipboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 4a2 2 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <rect x="9" y="8.5" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
    </svg>
);

const ArrowRight = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   Card data
───────────────────────────────────────────── */
const SERVICES = [
    {
        id: "idea-validation",
        icon: <LightbulbIcon />,
        title: "Idea Validation",
        desc: "Launch a no-code landing page in minutes and measure real demand before committing a single engineering hour.",
        tags: ["Landing Pages", "A/B Testing", "Demand Signals"],
        to: "/features/validation",
    },
    {
        id: "audience-feedback",
        icon: <UsersIcon />,
        title: "Audience Feedback",
        desc: "Collect structured responses from real potential users. Understand pain points and willingness to pay before you build.",
        tags: ["Surveys", "Wait-lists", "Early Access"],
        to: "/features/feedback",
    },
    {
        id: "analytics",
        icon: <ChartIcon />,
        title: "Analytics",
        desc: "Track visits, sign-ups, scroll depth, and conversion per idea in a unified dashboard — no third-party setup required.",
        tags: ["Conversion", "Engagement", "Funnels"],
        to: "/features/analytics",
    },
    {
        id: "idea-management",
        icon: <ClipboardIcon />,
        title: "Idea Management",
        desc: "Keep every hypothesis organised with statuses, notes, and comparisons. Know exactly which ideas to kill and which to pursue.",
        tags: ["Kanban Board", "Scoring", "Archives"],
        to: "/features/management",
    },
];

/* ─────────────────────────────────────────────
   Intersection-observer hook
───────────────────────────────────────────── */
function useReveal(ref, options = {}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                obs.disconnect();
            }
        }, { threshold: 0.15, ...options });

        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, options]);

    return visible;
}

/* ─────────────────────────────────────────────
   ServiceCard
───────────────────────────────────────────── */
function ServiceCard({ service, index, sectionVisible }) {
    const isVisible = sectionVisible; // driven by section observer

    return (
        <article
            className={`pf-card ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: isVisible ? `${index * 110}ms` : "0ms" }}
            aria-labelledby={`card-title-${service.id}`}
        >
            <span className="pf-card__number" aria-hidden="true">
                0{index + 1}
            </span>

            <div className="pf-card__icon-wrap" aria-hidden="true">
                {service.icon}
            </div>

            <div className="pf-card__body">
                <h3 id={`card-title-${service.id}`} className="pf-card__title">
                    {service.title}
                </h3>
                <p className="pf-card__desc">{service.desc}</p>

                <div className="pf-card__tags" aria-label="Feature tags">
                    {service.tags.map(tag => (
                        <span key={tag} className="pf-card__tag">{tag}</span>
                    ))}
                </div>

                <Link
                    to={service.to}
                    className="pf-card__link"
                    aria-label={`Learn more about ${service.title}`}
                >
                    Learn more <ArrowRight />
                </Link>
            </div>
        </article>
    );
}

/* ─────────────────────────────────────────────
   Services section
───────────────────────────────────────────── */
export default function Services() {
    const sectionRef = useRef(null);
    const ctaRef = useRef(null);
    const isVisible = useReveal(sectionRef);
    const ctaVisible = useReveal(ctaRef, { threshold: 0.5 });

    return (
        <>
            <style>{styles}</style>

            <section
                className="pf-services"
                aria-labelledby="services-heading"
            >
                {/* Decorative bg */}
                <div className="pf-services__bg-line" aria-hidden="true" />
                <div className="pf-services__bg-glow" aria-hidden="true" />

                <div className="pf-services__inner">

                    {/* Header */}
                    <header className="pf-services__header">
                        <div className="pf-services__eyebrow" aria-hidden="true">
                            <span className="pf-services__eyebrow-dash" />
                            What We Offer
                            <span className="pf-services__eyebrow-dash" />
                        </div>

                        <h2 id="services-heading" className="pf-services__heading">
                            Everything you need to&nbsp;
                            <em>validate faster</em>
                        </h2>

                        <p className="pf-services__subheading">
                            Four focused tools that take you from raw idea to data-backed
                            decision — without the overhead of building a full product first.
                        </p>
                    </header>

                    {/* Cards grid */}
                    <div
                        ref={sectionRef}
                        className="pf-services__grid"
                        role="list"
                    >
                        {SERVICES.map((service, i) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={i}
                                sectionVisible={isVisible}
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div
                        ref={ctaRef}
                        className={`pf-services__cta ${ctaVisible ? "is-visible" : ""}`}
                    >
                        <p className="pf-services__cta-label">
                            Ready to stop guessing and start validating?
                        </p>
                        <Link
                            to="/signup"
                            className="pf-services__cta-btn"
                            aria-label="Start validating your startup ideas for free"
                        >
                            Start for Free
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
}