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

  .pf-faq *,
  .pf-faq *::before,
  .pf-faq *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Section ── */
  .pf-faq {
    position: relative;
    background: var(--color-deep);
    padding: 7rem 1.5rem;
    overflow: hidden;
    font-family: var(--font-body);
  }

  .pf-faq::before,
  .pf-faq::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 140px;
    pointer-events: none;
    z-index: 0;
  }
  .pf-faq::before { top: 0;    background: linear-gradient(to bottom, var(--color-void), transparent); }
  .pf-faq::after  { bottom: 0; background: linear-gradient(to top,   var(--color-void), transparent); }

  /* Diagonal hatching bg */
  .pf-faq__hatch {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 28px,
      rgba(139,111,245,0.025) 28px,
      rgba(139,111,245,0.025) 29px
    );
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%);
  }

  .pf-faq__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .pf-faq__orb--a {
    width: 500px; height: 500px;
    top: -80px; right: -100px;
    background: radial-gradient(circle, rgba(61,43,142,0.22) 0%, transparent 70%);
  }
  .pf-faq__orb--b {
    width: 380px; height: 380px;
    bottom: -40px; left: -80px;
    background: radial-gradient(circle, rgba(91,63,212,0.15) 0%, transparent 70%);
  }

  /* ── Inner ── */
  .pf-faq__inner {
    position: relative;
    z-index: 1;
    max-width: 1060px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 5rem;
    align-items: start;
  }

  /* ─────────────────────────────────────────────
     Left column — sticky header
  ───────────────────────────────────────────── */
  .pf-faq__sidebar {
    position: sticky;
    top: 7rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;

    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo);
  }
  .pf-faq__sidebar.is-visible { opacity: 1; transform: translateX(0); }

  .pf-faq__eyebrow {
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
    width: fit-content;
  }

  .pf-faq__heading {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 400;
    line-height: 1.12;
    color: var(--color-white);
    letter-spacing: -0.01em;
  }
  .pf-faq__heading em {
    font-style: italic;
    background: var(--grad-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .pf-faq__sidebar-sub {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(196,181,253,0.55);
  }

  /* Category pills */
  .pf-faq__cats {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .pf-faq__cat {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.6rem 0.9rem;
    border-radius: 10px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(196,181,253,0.45);
    text-align: left;
    width: 100%;
    transition: all 0.25s ease;
    letter-spacing: 0.01em;
  }
  .pf-faq__cat:hover {
    background: rgba(30,21,66,0.5);
    color: rgba(196,181,253,0.75);
    border-color: rgba(139,111,245,0.12);
  }
  .pf-faq__cat.is-active {
    background: rgba(61,43,142,0.35);
    border-color: rgba(139,111,245,0.25);
    color: var(--color-mist);
  }
  .pf-faq__cat:focus-visible {
    outline: 2px solid rgba(139,111,245,0.5);
    outline-offset: 2px;
  }

  .pf-faq__cat-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: transform 0.25s var(--ease-spring);
  }
  .pf-faq__cat.is-active .pf-faq__cat-dot {
    transform: scale(1.3);
  }

  .pf-faq__cat-count {
    margin-left: auto;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    background: rgba(30,21,66,0.8);
    color: rgba(139,111,245,0.5);
    border: 1px solid rgba(139,111,245,0.12);
    transition: all 0.25s ease;
  }
  .pf-faq__cat.is-active .pf-faq__cat-count {
    background: rgba(91,63,212,0.25);
    color: var(--color-lavender);
    border-color: rgba(139,111,245,0.3);
  }

  /* CTA card in sidebar */
  .pf-faq__sidebar-cta {
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(10,8,18,0.6);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .pf-faq__sidebar-cta-title {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-frost);
    line-height: 1.3;
  }

  .pf-faq__sidebar-cta-text {
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(196,181,253,0.5);
    line-height: 1.6;
  }

  .pf-faq__sidebar-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    background: var(--grad-brand);
    font-family: var(--font-ui);
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-white);
    text-decoration: none;
    box-shadow: 0 4px 16px rgba(91,63,212,0.4);
    transition: transform 0.25s var(--ease-spring), box-shadow 0.25s ease;
    width: fit-content;
  }
  .pf-faq__sidebar-cta-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 24px rgba(91,63,212,0.55);
  }
  .pf-faq__sidebar-cta-btn:focus-visible {
    outline: 2px solid rgba(196,181,253,0.5);
    outline-offset: 3px;
  }

  /* ─────────────────────────────────────────────
     Right column — accordion list
  ───────────────────────────────────────────── */
  .pf-faq__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* ── Individual FAQ item ── */
  .pf-faq-item {
    border-radius: 16px;
    border: 1px solid rgba(139,111,245,0.1);
    background: rgba(10,8,18,0.55);
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity  0.55s var(--ease-out-expo),
      transform 0.55s var(--ease-out-expo),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }
  .pf-faq-item.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .pf-faq-item:hover {
    border-color: rgba(139,111,245,0.2);
  }
  .pf-faq-item.is-open {
    border-color: rgba(139,111,245,0.28);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(91,63,212,0.12);
  }

  /* ── Question button ── */
  .pf-faq-item__q {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .pf-faq-item__q:focus-visible {
    outline: 2px solid rgba(139,111,245,0.5);
    outline-offset: -2px;
    border-radius: 16px 16px 0 0;
  }

  /* Number badge */
  .pf-faq-item__num {
    flex-shrink: 0;
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-ui);
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    background: rgba(30,21,66,0.8);
    border: 1px solid rgba(139,111,245,0.15);
    color: rgba(139,111,245,0.5);
    transition: all 0.25s ease;
  }
  .pf-faq-item.is-open .pf-faq-item__num {
    background: rgba(61,43,142,0.45);
    border-color: rgba(139,111,245,0.4);
    color: var(--color-lavender);
  }

  /* Question text */
  .pf-faq-item__text {
    flex: 1;
    font-family: var(--font-ui);
    font-size: 0.925rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.35;
    color: rgba(196,181,253,0.65);
    transition: color 0.2s ease;
  }
  .pf-faq-item.is-open .pf-faq-item__text,
  .pf-faq-item:hover .pf-faq-item__text {
    color: var(--color-frost);
  }

  /* Category mini-tag on each item */
  .pf-faq-item__cat-tag {
    flex-shrink: 0;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-family: var(--font-ui);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    border: 1px solid;
    display: none; /* shown on wider viewports */
  }

  @media (min-width: 900px) {
    .pf-faq-item__cat-tag { display: inline-flex; }
  }

  /* Icon toggle */
  .pf-faq-item__icon {
    flex-shrink: 0;
    width: 28px; height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(139,111,245,0.15);
    background: rgba(30,21,66,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139,111,245,0.5);
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.35s var(--ease-spring);
  }
  .pf-faq-item.is-open .pf-faq-item__icon {
    background: rgba(61,43,142,0.45);
    border-color: rgba(139,111,245,0.4);
    color: var(--color-lavender);
    transform: rotate(45deg);
  }
  .pf-faq-item__icon svg { width: 12px; height: 12px; }

  /* ── Answer panel ── */
  .pf-faq-item__body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.42s var(--ease-out-expo);
  }
  .pf-faq-item.is-open .pf-faq-item__body {
    grid-template-rows: 1fr;
  }

  .pf-faq-item__body-inner {
    overflow: hidden;
  }

  .pf-faq-item__answer {
    padding: 0 1.5rem 1.5rem 4rem; /* indent to align with question text */
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(196,181,253,0.58);
    border-top: 1px solid rgba(139,111,245,0.08);
    padding-top: 1rem;
    margin-top: 0;
  }

  /* Link inside answers */
  .pf-faq-item__answer a {
    color: var(--color-lavender);
    text-decoration: underline;
    text-decoration-color: rgba(139,111,245,0.3);
    text-underline-offset: 3px;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
  }
  .pf-faq-item__answer a:hover {
    color: var(--color-mist);
    text-decoration-color: rgba(196,181,253,0.5);
  }

  /* ── Empty state when filtered ── */
  .pf-faq__empty {
    padding: 3rem 2rem;
    text-align: center;
    border-radius: 16px;
    border: 1px dashed rgba(139,111,245,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    opacity: 0;
    animation: fadeIn 0.4s ease 0.1s forwards;
  }
  .pf-faq__empty-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: rgba(30,21,66,0.6);
    border: 1px solid rgba(139,111,245,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(139,111,245,0.4);
  }
  .pf-faq__empty-text {
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(196,181,253,0.4);
  }

  /* ─────────────────────────────────────────────
     Animations
  ───────────────────────────────────────────── */
  @keyframes fadeIn {
    to { opacity: 1; }
  }

  /* ─────────────────────────────────────────────
     Responsive
  ───────────────────────────────────────────── */
  @media (max-width: 820px) {
    .pf-faq__inner {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .pf-faq__sidebar {
      position: static;
      transform: none;
    }
    .pf-faq__cats {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .pf-faq__cat { width: auto; }
  }

  @media (max-width: 520px) {
    .pf-faq { padding: 5rem 1.25rem; }
    .pf-faq-item__answer { padding-left: 1.5rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pf-faq *, .pf-faq *::before, .pf-faq *::after {
      transition-duration: 0.01ms !important;
      animation-duration:  0.01ms !important;
    }
    .pf-faq__sidebar, .pf-faq-item {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const PlusIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const ArrowRight = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

/* ─────────────────────────────────────────────
   FAQ Data
───────────────────────────────────────────── */
const CATEGORIES = [
    { id: "all", label: "All Questions", dot: "#8b6ff5", dotBg: "rgba(139,111,245,0.15)" },
    { id: "product", label: "Product", dot: "#a78bfa", dotBg: "rgba(167,139,250,0.15)" },
    { id: "pricing", label: "Pricing", dot: "#34d399", dotBg: "rgba(52,211,153,0.12)" },
    { id: "account", label: "Account", dot: "#f5c542", dotBg: "rgba(245,197,66,0.12)" },
    { id: "technical", label: "Technical", dot: "#818cf8", dotBg: "rgba(129,140,248,0.15)" },
];

const FAQS = [
    {
        cat: "product",
        q: "How does Proofly work?",
        a: "You create a landing page for your startup idea in minutes using our no-code builder. Proofly then collects visitor sign-ups, scroll depth, CTA clicks, and other engagement signals. You review the analytics dashboard to decide whether to build, pivot, or kill the idea — all before writing a single line of product code.",
    },
    {
        cat: "product",
        q: "Can I test multiple ideas at the same time?",
        a: "Yes. On the Starter plan you can have 1 active idea at a time. The Pro plan supports up to 10 simultaneous ideas, and Enterprise gives you unlimited ideas. You can archive old ideas at any time and reactivate them later.",
    },
    {
        cat: "product",
        q: "Do I need any coding or design skills?",
        a: "None at all. Proofly is completely no-code. You pick a template, customise your headline, add your description and a CTA — and your landing page is live. Our templates are conversion-optimised out of the box.",
    },
    {
        cat: "product",
        q: "What kind of analytics does Proofly provide?",
        a: "The dashboard shows unique visitors, scroll depth, CTA click rate, sign-up conversion, referral sources, and session length per idea. Pro and Enterprise plans also include A/B testing for headlines and CTA copy, plus exportable reports.",
    },
    {
        cat: "pricing",
        q: "Is there a free plan? Do I need a credit card?",
        a: "Yes — the Starter plan is free forever, no credit card required. You get 1 active idea, basic analytics, and up to 100 sign-ups. Upgrade to Pro or Enterprise when you need more. We also offer a 14-day free trial on Pro.",
    },
    {
        cat: "pricing",
        q: "Can I cancel or change plans anytime?",
        a: "Absolutely. You can upgrade, downgrade, or cancel at any time from your account settings. Upgrades take effect immediately and are prorated. Downgrades apply at the next billing cycle. No lock-in contracts.",
    },
    {
        cat: "pricing",
        q: "Do you offer discounts for startups or non-profits?",
        a: "We have a startup programme that offers 6 months of Pro for free for pre-revenue companies. We also offer discounts for students, non-profits, and accelerator cohorts. Reach out via our contact page with your details.",
    },
    {
        cat: "account",
        q: "Can I invite my team to Proofly?",
        a: "Pro includes 1 additional team seat and Enterprise includes unlimited seats. Team members can view dashboards and analytics. Account owners can manage billing and delete ideas. Role-based permissions are coming in Q3.",
    },
    {
        cat: "account",
        q: "What happens to my data if I cancel?",
        a: "Your data is retained for 30 days after cancellation so you have time to export everything via CSV or JSON. After 30 days, all data is permanently deleted from our servers in line with our privacy policy.",
    },
    {
        cat: "technical",
        q: "Can I use a custom domain for my landing pages?",
        a: "Yes. Pro and Enterprise plans support custom domains. Add a CNAME record pointing to our servers and your page will be live on your domain within minutes. SSL certificates are provisioned automatically.",
    },
    {
        cat: "technical",
        q: "Which tools does Proofly integrate with?",
        a: "Currently we support Notion, Mailchimp, Slack (notifications), and Zapier (which opens connections to 5,000+ apps). Direct Airtable and HubSpot integrations are on the roadmap for Q4. Enterprise customers can also use the REST API.",
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
        }, { threshold: 0.08, ...opts });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return v;
}

/* ─────────────────────────────────────────────
   FAQ component
───────────────────────────────────────────── */
export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [openItem, setOpenItem] = useState(null);
    const sidebarRef = useRef(null);
    const listRef = useRef(null);
    const sidebarVis = useReveal(sidebarRef);
    const listVis = useReveal(listRef, { threshold: 0.05 });

    /* Filtered list */
    const visible = FAQS.filter(f =>
        activeCategory === "all" || f.cat === activeCategory
    );

    /* Count per category */
    const countFor = (id) =>
        id === "all" ? FAQS.length : FAQS.filter(f => f.cat === id).length;

    /* Category style helpers */
    const catMeta = (id) =>
        CATEGORIES.find(c => c.id === id) || CATEGORIES[0];

    /* Close open item when category changes */
    const handleCatChange = (id) => {
        setActiveCategory(id);
        setOpenItem(null);
    };

    const toggleItem = (idx) =>
        setOpenItem(prev => (prev === idx ? null : idx));

    return (
        <>
            <style>{styles}</style>

            <section className="pf-faq" aria-labelledby="faq-heading">

                <div className="pf-faq__hatch" aria-hidden="true" />
                <div className="pf-faq__orb pf-faq__orb--a" aria-hidden="true" />
                <div className="pf-faq__orb pf-faq__orb--b" aria-hidden="true" />

                <div className="pf-faq__inner">

                    {/* ── Left sidebar ── */}
                    <aside
                        ref={sidebarRef}
                        className={`pf-faq__sidebar ${sidebarVis ? "is-visible" : ""}`}
                        aria-label="FAQ navigation"
                    >
                        <div className="pf-faq__eyebrow" aria-hidden="true">✦ FAQ</div>

                        <h2 id="faq-heading" className="pf-faq__heading">
                            Got&nbsp;<em>questions?</em><br />
                            We've got answers.
                        </h2>

                        <p className="pf-faq__sidebar-sub">
                            Everything you need to know about Proofly. Can't find what
                            you're looking for? Reach out to our team.
                        </p>

                        {/* Category filter */}
                        <nav
                            className="pf-faq__cats"
                            role="tablist"
                            aria-label="Filter by category"
                        >
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    role="tab"
                                    aria-selected={activeCategory === cat.id}
                                    className={`pf-faq__cat ${activeCategory === cat.id ? "is-active" : ""}`}
                                    onClick={() => handleCatChange(cat.id)}
                                >
                                    <span
                                        className="pf-faq__cat-dot"
                                        style={{ background: cat.dot }}
                                        aria-hidden="true"
                                    />
                                    {cat.label}
                                    <span className="pf-faq__cat-count">{countFor(cat.id)}</span>
                                </button>
                            ))}
                        </nav>

                        {/* Mini CTA card */}
                        <div className="pf-faq__sidebar-cta" role="complementary" aria-label="Support contact">
                            <p className="pf-faq__sidebar-cta-title">Still have questions?</p>
                            <p className="pf-faq__sidebar-cta-text">
                                Our team typically replies within 2 hours on weekdays.
                            </p>
                            <Link
                                to="/contact"
                                className="pf-faq__sidebar-cta-btn"
                                aria-label="Contact our support team"
                            >
                                Contact Support
                                <ArrowRight size={11} />
                            </Link>
                        </div>
                    </aside>

                    {/* ── Right accordion list ── */}
                    <div
                        ref={listRef}
                        role="tabpanel"
                        aria-label={`${CATEGORIES.find(c => c.id === activeCategory)?.label} questions`}
                    >
                        <div className="pf-faq__list">
                            {visible.length === 0 && (
                                <div className="pf-faq__empty" role="status">
                                    <div className="pf-faq__empty-icon"><SearchIcon /></div>
                                    <p className="pf-faq__empty-text">No questions in this category yet.</p>
                                </div>
                            )}

                            {visible.map((faq, i) => {
                                const meta = catMeta(faq.cat);
                                const isOpen = openItem === i;
                                const globalIdx = FAQS.indexOf(faq);

                                return (
                                    <div
                                        key={globalIdx}
                                        className={`pf-faq-item ${listVis ? "is-visible" : ""} ${isOpen ? "is-open" : ""}`}
                                        style={{ transitionDelay: listVis ? `${i * 60}ms` : "0ms" }}
                                    >
                                        <button
                                            className="pf-faq-item__q"
                                            onClick={() => toggleItem(i)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-${globalIdx}`}
                                            id={`faq-q-${globalIdx}`}
                                        >
                                            {/* Number badge */}
                                            <span className="pf-faq-item__num" aria-hidden="true">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            {/* Question text */}
                                            <span className="pf-faq-item__text">{faq.q}</span>

                                            {/* Category tag */}
                                            <span
                                                className="pf-faq-item__cat-tag"
                                                style={{
                                                    color: meta.dot,
                                                    borderColor: `${meta.dot}40`,
                                                    background: meta.dotBg,
                                                }}
                                                aria-hidden="true"
                                            >
                                                {meta.label}
                                            </span>

                                            {/* Plus / X icon */}
                                            <span
                                                className="pf-faq-item__icon"
                                                aria-hidden="true"
                                            >
                                                <PlusIcon />
                                            </span>
                                        </button>

                                        {/* Answer — uses CSS grid trick for smooth height transition */}
                                        <div
                                            className="pf-faq-item__body"
                                            id={`faq-answer-${globalIdx}`}
                                            role="region"
                                            aria-labelledby={`faq-q-${globalIdx}`}
                                        >
                                            <div className="pf-faq-item__body-inner">
                                                <div className="pf-faq-item__answer">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}