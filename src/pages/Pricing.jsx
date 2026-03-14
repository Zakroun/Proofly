import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/PricingPage.css"
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

const PLANS = [
    {
        id: "starter", name: "Starter", badge: null, featured: false,
        monthly: 0, annual: 0,
        desc: "Test your first idea. No card needed, no time limit.",
        cta: "Start for Free", ctaStyle: "ghost", to: "/register",
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
        cta: "Start 14-day Trial", ctaStyle: "primary", to: "/register?plan=pro",
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
            <div className="pp">
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
                <div className="pp-marquee" aria-hidden="true">
                    <div className="pp-marquee__track">
                        {doubled.map((chip, i) => (
                            <div key={i} className="pp-marquee__chip">
                                {chip.icon} {chip.text}
                            </div>
                        ))}
                    </div>
                </div>
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