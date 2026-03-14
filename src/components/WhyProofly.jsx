import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WhyProofly.css";

const RocketIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 2C12 2 7 6 7 13l2 2c1-4 3-7 3-7s2 3 3 7l2-2c0-7-5-11-5-11z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 15c-1.5 1-2.5 3-2.5 3l2.5.5M15 15c1.5 1 2.5 3 2.5 3l-2.5.5"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
);

const ChartLineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M3 17l4-5 4 3 4-7 4 5" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
        <circle cx="7" cy="12" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="11" cy="15" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="15" cy="8" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="19" cy="13" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 2l8 3.5v6C20 16.5 16.5 21 12 22 7.5 21 4 16.5 4 11.5v-6L12 2z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v1M12 20v1M3 12h1M20 12h1" stroke="currentColor"
            strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
        <circle cx="7" cy="7" r="6" fill="rgba(91,63,212,0.25)" stroke="rgba(139,111,245,0.4)" strokeWidth="1" />
        <path d="M4.5 7l2 2 3-3" stroke="#8b6ff5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CrossIcon = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
        <circle cx="7" cy="7" r="6" fill="rgba(100,100,120,0.15)" stroke="rgba(139,111,245,0.15)" strokeWidth="1" />
        <path d="M5 5l4 4M9 5l-4 4" stroke="rgba(139,111,245,0.3)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);
const CornerLines = () => (
    <svg className="pf-why-card__lines" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <line x1="120" y1="0" x2="0" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="20" x2="20" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="40" x2="40" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="60" x2="60" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
        <line x1="120" y1="80" x2="80" y2="120" stroke="rgba(139,111,245,1)" strokeWidth="0.75" />
    </svg>
);

const CARDS = [
    {
        accent: "rocket",
        icon: <RocketIcon />,
        title: "Launch Faster",
        desc: "Go from raw idea to live landing page in under 10 minutes. Stop waiting months to know if something is worth building.",
        footer: "stat",
        stat: { value: "10×", label: "faster than traditional build-and-test cycles" },
    },
    {
        accent: "chart",
        icon: <ChartLineIcon />,
        title: "Data-Driven Decisions",
        desc: "Replace gut instinct with real signals. Track clicks, scroll depth, and sign-up intent before a single line of product code exists.",
        footer: "bars",
        bars: [
            { label: "Conversion signals", pct: "87%" },
            { label: "User intent clarity", pct: "94%" },
        ],
    },
    {
        accent: "shield",
        icon: <ShieldIcon />,
        title: "Reduce Risk",
        desc: "Only invest engineering time in ideas that show proven demand. Kill bad ideas early — before they drain your runway.",
        footer: "compare",
        compare: [
            { good: true, text: "Validated ideas with real user interest" },
            { good: true, text: "Decisions backed by measurable data" },
            { good: false, text: "Building features nobody asked for" },
            { good: false, text: "Months of work for an unproven idea" },
        ],
    },
    {
        accent: "clock",
        icon: <ClockIcon />,
        title: "Save Dev Time",
        desc: "Proofly lets non-technical founders validate independently — no engineers needed until the idea is confirmed worth building.",
        footer: "stat",
        stat: { value: "~200h", label: "average dev hours saved per invalidated idea" },
    },
];

const TESTIMONIALS = [
    {
        quote: "Proofly saved me from building an entire SaaS nobody wanted. Found out in 4 days with a $0 ad spend.",
        name: "Alex S.",
        role: "Solo Founder, YC applicant",
        initials: "AS",
        stars: 5,
    },
    {
        quote: "The analytics dashboard is insane for a validation tool. I can see exactly which headline converts better in real-time.",
        name: "Maria J.",
        role: "Product Lead, Seed-stage startup",
        initials: "MJ",
        stars: 5,
    },
    {
        quote: "We run every new feature idea through Proofly before putting it in the sprint. Our team's velocity doubled.",
        name: "Rahul K.",
        role: "CTO, Series A company",
        initials: "RK",
        stars: 5,
    },
];

function useReveal(ref, options = {}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold: 0.12, ...options });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return visible;
}

export default function WhyProofly() {
    const bentoRef = useRef(null);
    const tRef = useRef(null);
    const bentoVis = useReveal(bentoRef);
    const tVis = useReveal(tRef);

    return (
        <>
            <section className="pf-why" aria-labelledby="why-heading">
                <div className="pf-why__inner">
                    <header className="pf-why__header">
                        <div className="pf-why__eyebrow" aria-hidden="true">
                            <svg className="pf-why__eyebrow-icon" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1l1.5 3.5L12 5.5l-2.5 2.5.5 3.5L7 10l-3 1.5.5-3.5L2 5.5l3.5-1L7 1z"
                                    stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                            The Proofly Advantage
                        </div>
                        <h2 id="why-heading" className="pf-why__heading">
                            Why smart founders&nbsp;
                            <em>choose Proofly</em>
                        </h2>
                        <p className="pf-why__sub">
                            The fastest way to go from "what if" to "here's the data" —
                            without burning budget or engineering time on unproven ideas.
                        </p>
                    </header>
                    <div ref={bentoRef} className="pf-why__bento">
                        {CARDS.map((card, i) => (
                            <article
                                key={card.title}
                                className={`pf-why-card ${bentoVis ? "is-visible" : ""}`}
                                data-accent={card.accent}
                                style={{ transitionDelay: bentoVis ? `${i * 100}ms` : "0ms" }}
                                aria-labelledby={`why-card-${i}`}
                            >
                                <div className="pf-why-card__glow" aria-hidden="true" />
                                <CornerLines />
                                <div className="pf-why-card__icon-row">
                                    <div className="pf-why-card__icon-wrap" aria-hidden="true">
                                        {card.icon}
                                    </div>
                                    <span className="pf-why-card__index" aria-hidden="true">0{i + 1}</span>
                                </div>
                                <div className="pf-why-card__body">
                                    <h3 id={`why-card-${i}`} className="pf-why-card__title">{card.title}</h3>
                                    <p className="pf-why-card__desc">{card.desc}</p>
                                    {card.footer === "stat" && (
                                        <div className="pf-why-card__stat">
                                            <span className="pf-why-card__stat-value">{card.stat.value}</span>
                                            <span className="pf-why-card__stat-label">{card.stat.label}</span>
                                        </div>
                                    )}
                                    {card.footer === "bars" && (
                                        <div className="pf-why-card__bar-wrap">
                                            {card.bars.map(bar => (
                                                <div key={bar.label}>
                                                    <div className="pf-why-card__bar-label">
                                                        <span>{bar.label}</span>
                                                        <span>{bar.pct}</span>
                                                    </div>
                                                    <div className="pf-why-card__bar-track">
                                                        <div
                                                            className="pf-why-card__bar-fill"
                                                            style={{ width: bar.pct }}
                                                            role="progressbar"
                                                            aria-valuenow={parseInt(bar.pct)}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                            aria-label={bar.label}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {card.footer === "compare" && (
                                        <ul className="pf-why-card__compare" role="list" aria-label="Comparison">
                                            {card.compare.map((row, j) => (
                                                <li
                                                    key={j}
                                                    className={`pf-why-card__compare-row ${row.good ? "pf-why-card__compare-row--good" : "pf-why-card__compare-row--bad"}`}
                                                >
                                                    {row.good ? <CheckIcon /> : <CrossIcon />}
                                                    {row.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="pf-why__divider" aria-hidden="true" />
                    <div ref={tRef} className="pf-why__testimonials" role="list" aria-label="Customer testimonials">
                        {TESTIMONIALS.map((t, i) => (
                            <blockquote
                                key={t.name}
                                className={`pf-why__testimonial ${tVis ? "is-visible" : ""}`}
                                style={{ transitionDelay: tVis ? `${i * 120}ms` : "0ms" }}
                                role="listitem"
                            >
                                <div className="pf-why__testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                                    {"★".repeat(t.stars)}
                                </div>
                                <p className="pf-why__testimonial-quote">"{t.quote}"</p>
                                <footer className="pf-why__testimonial-author">
                                    <div className="pf-why__testimonial-avatar" aria-hidden="true">{t.initials}</div>
                                    <div>
                                        <p className="pf-why__testimonial-name">{t.name}</p>
                                        <p className="pf-why__testimonial-role">{t.role}</p>
                                    </div>
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}