import { useEffect, useRef, useState, useCallback } from "react";
import "../styles/Testimonials.css"

const CheckCircle = () => (
    <svg viewBox="0 0 11 11" fill="none" aria-hidden="true" focusable="false">
        <circle cx="5.5" cy="5.5" r="5" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.6)" strokeWidth="0.8" />
        <path d="M3 5.5l2 2 3-3" stroke="rgba(52,211,153,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StarIcon = ({ empty = false }) => (
    <span className={empty ? "pf-testi-card__star--empty pf-testi-card__star" : "pf-testi-card__star"} aria-hidden="true">★</span>
);

const UsersIcon = () => (
    <svg className="pf-testi__trust-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1 16c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 4a3 3 0 0 1 0 6M17 16c0-2.5-2-4-4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="pf-testi__trust-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5l7 3v5C16 13.5 13 17 9 18c-4-1-7-4.5-7-8.5v-5l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6.5 9.5l2 2 3-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const StarBadge = () => (
    <svg className="pf-testi__trust-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5l2 5.5H17l-5 3.5 2 5.5L9 13l-5 3 2-5.5L1 7h6l2-5.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
);

const AVATAR_GRADIENTS = [
    "linear-gradient(135deg,#5b3fd4,#8b6ff5)",
    "linear-gradient(135deg,#7c3aed,#a78bfa)",
    "linear-gradient(135deg,#4338ca,#818cf8)",
    "linear-gradient(135deg,#6d28d9,#c084fc)",
    "linear-gradient(135deg,#3d2b8e,#8b6ff5)",
    "linear-gradient(135deg,#5b21b6,#d8b4fe)",
];

const ROW_ONE = [
    {
        name: "Alice Moreau", role: "Solo Founder, YC W24", initials: "AM", stars: 5,
        quote: "Proofly saved me months of wasted work. Found out nobody wanted my idea in 4 days — best $49 I ever spent.",
        tag: "Saved 3 months", grad: 0,
    },
    {
        name: "Bob Takahashi", role: "Product Manager, Series B", initials: "BT", stars: 5,
        quote: "I now know exactly which ideas are worth building. Our team's decision confidence went through the roof.",
        tag: "4× faster decisions", grad: 1,
    },
    {
        name: "Sara Okonkwo", role: "Indie Hacker", initials: "SO", stars: 5,
        quote: "Easiest landing page builder I've used. Had a live waitlist in under 10 minutes. Zero design skills needed.",
        tag: "Page live in 10 min", grad: 2,
    },
    {
        name: "Dev Patel", role: "CTO, Seed-stage startup", initials: "DP", stars: 5,
        quote: "The analytics are surprisingly deep for a validation tool. We use it before every sprint to prioritise features.",
        tag: "2× sprint velocity", grad: 3,
    },
    {
        name: "Clara Schmidt", role: "Startup Studio, Berlin", initials: "CS", stars: 5,
        quote: "We run 6–8 ideas through Proofly per month. The scoring dashboard alone is worth it — kills bad ideas instantly.",
        tag: "8 ideas/month", grad: 4,
    },
];

const ROW_TWO = [
    {
        name: "Marcus Lee", role: "Angel Investor", initials: "ML", stars: 5,
        quote: "I now require all my portfolio founders to validate with Proofly before seed funding. Data over gut, always.",
        tag: "Portfolio standard", grad: 5,
    },
    {
        name: "Priya Nair", role: "Non-technical Founder", initials: "PN", stars: 5,
        quote: "As someone with zero coding background, Proofly is a superpower. I can test and validate completely on my own.",
        tag: "No code needed", grad: 0,
    },
    {
        name: "Tom Eriksen", role: "Head of Product, SaaS", initials: "TE", stars: 5,
        quote: "Replaced our 3-week 'discovery sprint' with 4 days on Proofly. Same signal quality, 80% less time.",
        tag: "80% time saved", grad: 1,
    },
    {
        name: "Yuki Tanaka", role: "Entrepreneur in Residence", initials: "YT", stars: 4,
        quote: "The lead export to Notion is seamless. Our whole idea pipeline now lives in one place — Proofly to Notion.",
        tag: "Seamless integrations", grad: 2,
    },
    {
        name: "Isabel Cruz", role: "Founder, Bootstrapped", initials: "IC", stars: 5,
        quote: "Killed 2 ideas fast, doubled down on the third. Launched to 800 waitlist subscribers. Proofly made that possible.",
        tag: "800 waitlist sign-ups", grad: 3,
    },
];
const SPOTLIGHT = {
    name: "Rachel Kim",
    role: "Co-Founder & CEO, Fable (Series A)",
    initials: "RK",
    grad: 4,
    stars: 5,
    quote: "Before Proofly, we burned 4 months building a product feature nobody wanted. Now every new idea gets tested in a week. We've cut our build-measure-learn cycle by 80% and our NPS has never been higher — because we only ship things people actually asked for.",
    metric: { val: "80%", lbl: "Faster build-measure-learn" },
    metric2: { val: "4×", lbl: "Increase in feature NPS" },
};

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

function TestiCard({ t }) {
    return (
        <article className="pf-testi-card" aria-label={`Testimonial from ${t.name}`}>
            <div className="pf-testi-card__stars" aria-label={`${t.stars} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} empty={i >= t.stars} />
                ))}
            </div>
            <blockquote className="pf-testi-card__quote">
                "{t.quote}"
            </blockquote>
            <div className="pf-testi-card__tag">
                <span className="pf-testi-card__tag-dot" aria-hidden="true" />
                {t.tag}
            </div>
            <footer className="pf-testi-card__author">
                <div
                    className="pf-testi-card__avatar"
                    style={{ background: AVATAR_GRADIENTS[t.grad] }}
                    aria-hidden="true"
                >
                    {t.initials}
                </div>
                <div className="pf-testi-card__info">
                    <p className="pf-testi-card__name">{t.name}</p>
                    <p className="pf-testi-card__role">{t.role}</p>
                </div>
                <div className="pf-testi-card__verified" aria-label="Verified user">
                    <CheckCircle />
                    Verified
                </div>
            </footer>
        </article>
    );
}
function MarqueeTrack({ cards, reverse = false }) {
    const doubled = [...cards, ...cards];
    return (
        <div className={`pf-testi__track ${reverse ? "pf-testi__track--rev" : "pf-testi__track--fwd"}`}>
            {doubled.map((t, i) => <TestiCard key={`${t.name}-${i}`} t={t} />)}
        </div>
    );
}

export default function Testimonials() {
    const headerRef = useRef(null);
    const spotlightRef = useRef(null);
    const trustRef = useRef(null);
    const headerVis = useReveal(headerRef);
    const spotlightVis = useReveal(spotlightRef);
    const trustVis = useReveal(trustRef);

    return (
        <>
            <section className="pf-testi" aria-labelledby="testi-heading">
                <div className="pf-testi__grain" aria-hidden="true" />
                <div className="pf-testi__orb pf-testi__orb--a" aria-hidden="true" />
                <div className="pf-testi__orb pf-testi__orb--b" aria-hidden="true" />
                <div className="pf-testi__inner">
                    <header
                        ref={headerRef}
                        className={`pf-testi__header ${headerVis ? "is-visible" : ""}`}
                    >
                        <div className="pf-testi__eyebrow" aria-hidden="true">
                            ✦ Social Proof
                        </div>
                        <h2 id="testi-heading" className="pf-testi__heading">
                            Trusted by founders who&nbsp;<em>ship smart</em>
                        </h2>
                        <p className="pf-testi__sub">
                            Over 2,400 founders use Proofly to validate faster, build less,
                            and launch with confidence.
                        </p>
                    </header>
                    <div
                        className="pf-testi__marquee-wrap"
                        aria-label="Scrolling testimonials"
                        role="region"
                    >
                        <MarqueeTrack cards={ROW_ONE} />
                        <MarqueeTrack cards={ROW_TWO} reverse />
                    </div>
                    <blockquote
                        ref={spotlightRef}
                        className={`pf-testi__spotlight ${spotlightVis ? "is-visible" : ""}`}
                        aria-label={`Featured testimonial from ${SPOTLIGHT.name}`}
                    >
                        <div className="pf-testi__spotlight-left">
                            <div className="pf-testi__spotlight-stars" aria-label="5 out of 5 stars">
                                {"★★★★★"}
                            </div>
                            <p className="pf-testi__spotlight-quote">"{SPOTLIGHT.quote}"</p>
                            <footer className="pf-testi__spotlight-author">
                                <div
                                    className="pf-testi__spotlight-avatar"
                                    style={{ background: AVATAR_GRADIENTS[SPOTLIGHT.grad] }}
                                    aria-hidden="true"
                                >
                                    {SPOTLIGHT.initials}
                                </div>
                                <div>
                                    <p className="pf-testi__spotlight-name">{SPOTLIGHT.name}</p>
                                    <p className="pf-testi__spotlight-role">{SPOTLIGHT.role}</p>
                                </div>
                            </footer>
                        </div>
                        <div className="pf-testi__spotlight-right" aria-label="Impact metrics">
                            {[SPOTLIGHT.metric, SPOTLIGHT.metric2].map((m) => (
                                <div key={m.val} className="pf-testi__spotlight-metric">
                                    <span className="pf-testi__spotlight-metric-val">{m.val}</span>
                                    <span className="pf-testi__spotlight-metric-lbl">{m.lbl}</span>
                                </div>
                            ))}
                        </div>
                    </blockquote>
                    <div
                        ref={trustRef}
                        className={`pf-testi__trust ${trustVis ? "is-visible" : ""}`}
                        role="list"
                        aria-label="Trust indicators"
                    >
                        {[
                            { icon: <UsersIcon />, content: <><strong>2,400+</strong> founders</> },
                            { icon: <StarBadge />, content: <><strong>4.9 / 5</strong> avg rating</> },
                            { icon: <ShieldIcon />, content: <><strong>No credit card</strong> required</> },
                        ].map(({ icon, content }, i, arr) => (
                            <>
                                <div key={i} className="pf-testi__trust-item" role="listitem">
                                    {icon}
                                    <span className="pf-testi__trust-text">{content}</span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div key={`div-${i}`} className="pf-testi__trust-divider" aria-hidden="true" />
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}