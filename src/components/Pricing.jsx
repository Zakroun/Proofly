import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Pricing.css";
const CheckIcon = () => (
    <svg className="pf-plan__feature-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(91,63,212,0.2)" stroke="rgba(139,111,245,0.35)" strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#8b6ff5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckIconFeatured = () => (
    <svg className="pf-plan__feature-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(91,63,212,0.3)" stroke="rgba(139,111,245,0.55)" strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MinusIcon = () => (
    <svg className="pf-plan__feature-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(30,21,66,0.5)" stroke="rgba(139,111,245,0.1)" strokeWidth="1" />
        <path d="M5.5 8h5" stroke="rgba(139,111,245,0.25)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ArrowRight = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDown = () => (
    <svg className="pf-pricing__faq-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TableChevron = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const PLANS = [
    {
        id: "starter",
        name: "Starter",
        desc: "Perfect for testing your first idea. No card needed.",
        monthly: 0,
        annual: 0,
        period: "/mo",
        cta: "Start for Free",
        ctaStyle: "ghost",
        to: "/register",
        badge: null,
        featured: false,
        features: [
            { text: "1 active idea", included: true },
            { text: "Basic landing page builder", included: true },
            { text: "Up to 100 sign-ups", included: true },
            { text: "Basic analytics dashboard", included: true },
            { text: "Email capture", included: true },
            { text: "Advanced analytics", included: false },
            { text: "Lead export (CSV)", included: false },
            { text: "Team seats", included: false },
            { text: "Integrations", included: false },
        ],
    },
    {
        id: "pro",
        name: "Pro",
        desc: "For founders who run multiple ideas in parallel.",
        monthly: 19,
        annual: 14,
        period: "/mo",
        cta: "Start 14-day Trial",
        ctaStyle: "primary",
        to: "/register?plan=pro",
        badge: "Most Popular",
        featured: true,
        features: [
            { text: "10 active ideas", included: true },
            { text: "Custom landing page builder", included: true },
            { text: "Unlimited sign-ups", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Lead export (CSV / JSON)", included: true },
            { text: "A/B headline testing", included: true },
            { text: "1 team seat", included: true },
            { text: "Slack & Notion integrations", included: true },
            { text: "Priority email support", included: true },
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        desc: "For teams validating at scale across portfolios.",
        monthly: 49,
        annual: 37,
        period: "/mo",
        cta: "Contact Sales",
        ctaStyle: "outline",
        to: "/contact",
        badge: null,
        featured: false,
        features: [
            { text: "Unlimited ideas", included: true },
            { text: "White-label pages", included: true },
            { text: "Unlimited sign-ups", included: true },
            { text: "Custom analytics & reports", included: true },
            { text: "Lead export + CRM sync", included: true },
            { text: "Unlimited A/B tests", included: true },
            { text: "Unlimited team seats", included: true },
            { text: "All integrations + API", included: true },
            { text: "Dedicated account manager", included: true },
        ],
    },
];

const TABLE_ROWS = [
    { label: "Active ideas", starter: "1", pro: "10", enterprise: "Unlimited" },
    { label: "Sign-ups per idea", starter: "100", pro: "Unlimited", enterprise: "Unlimited" },
    { label: "Advanced analytics", starter: false, pro: true, enterprise: true },
    { label: "Lead export", starter: false, pro: "CSV/JSON", enterprise: "CSV/JSON/CRM" },
    { label: "A/B testing", starter: false, pro: true, enterprise: "Unlimited" },
    { label: "Team seats", starter: "1", pro: "1", enterprise: "Unlimited" },
    { label: "Integrations", starter: false, pro: "Slack, Notion", enterprise: "All + API" },
    { label: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
];

const FAQS = [
    {
        q: "Can I upgrade or downgrade at any time?",
        a: "Yes — plan changes take effect immediately. If you upgrade mid-cycle, we prorate the charge. Downgrades apply at the next renewal date.",
    },
    {
        q: "Is there a free trial on paid plans?",
        a: "Pro comes with a 14-day free trial, no credit card required. Enterprise includes a 30-day pilot with dedicated onboarding support.",
    },
    {
        q: "What happens to my data if I cancel?",
        a: "Your data is retained for 30 days after cancellation so you can export everything. After 30 days it is permanently deleted from our servers.",
    },
    {
        q: "Do you offer discounts for startups or students?",
        a: "Yes — we have a startup programme (free Pro for 6 months) and a student plan. Reach out via the contact page with proof of eligibility.",
    },
];
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
function CellVal({ val }) {
    if (val === true) return <span className="pf-pricing__table-check" aria-label="Included">✓</span>;
    if (val === false) return <span className="pf-pricing__table-cross" aria-label="Not included">✕</span>;
    return <span>{val}</span>;
}
export default function Pricing() {
    const [annual, setAnnual] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);
    const faqRef = useRef(null);
    const headerVis = useReveal(headerRef);
    const cardsVis = useReveal(cardsRef, { threshold: 0.08 });
    const faqVis = useReveal(faqRef, { threshold: 0.1 });
    const displayPrice = (plan) => {
        if (plan.monthly === 0) return "$0";
        return `$${annual ? plan.annual : plan.monthly}`;
    };
    const annualNote = (plan) => {
        if (!annual || plan.monthly === 0) return null;
        const saved = (plan.monthly - plan.annual) * 12;
        return `Save $${saved}/year`;
    };

    return (
        <>
            <section className="pf-pricing" aria-labelledby="pricing-heading">
                <div className="pf-pricing__inner">
                    <header
                        ref={headerRef}
                        className={`pf-pricing__header ${headerVis ? "is-visible" : ""}`}
                    >
                        <div className="pf-pricing__eyebrow" aria-hidden="true">✦ Simple Pricing</div>
                        <h2 id="pricing-heading" className="pf-pricing__heading">
                            Pay for what you&nbsp;<em>actually need</em>
                        </h2>
                        <p className="pf-pricing__sub">
                            Start free. Upgrade when your ideas need more room to grow.
                            No hidden fees, no lock-in.
                        </p>
                    </header>
                    <div
                        className={`pf-pricing__toggle-wrap ${headerVis ? "is-visible" : ""}`}
                        role="group"
                        aria-label="Billing period"
                    >
                        <span
                            className={`pf-pricing__toggle-label ${!annual ? "is-active" : ""}`}
                            onClick={() => setAnnual(false)}
                            aria-hidden="true"
                        >
                            Monthly
                        </span>
                        <button
                            className={`pf-pricing__toggle ${annual ? "is-annual" : ""}`}
                            role="switch"
                            aria-checked={annual}
                            aria-label="Switch to annual billing"
                            onClick={() => setAnnual(a => !a)}
                        >
                            <div className="pf-pricing__toggle-thumb" />
                        </button>
                        <span
                            className={`pf-pricing__toggle-label ${annual ? "is-active" : ""}`}
                            onClick={() => setAnnual(true)}
                            aria-hidden="true"
                        >
                            Annual
                        </span>
                        <span className="pf-pricing__save-badge" aria-live="polite">
                            Save up to 26%
                        </span>
                    </div>
                    <div
                        ref={cardsRef}
                        className="pf-pricing__cards"
                        role="list"
                    >
                        {PLANS.map((plan, i) => (
                            <article
                                key={plan.id}
                                className={`pf-plan ${plan.featured ? "pf-plan--featured" : ""} ${cardsVis ? "is-visible" : ""}`}
                                style={{ transitionDelay: cardsVis ? `${i * 120}ms` : "0ms" }}
                                role="listitem"
                                aria-labelledby={`plan-name-${plan.id}`}
                            >
                                {plan.featured && (
                                    <div className="pf-plan__glow" aria-hidden="true" />
                                )}
                                {plan.badge && (
                                    <div className="pf-plan__badge" aria-label="Most popular plan">
                                        {plan.badge}
                                    </div>
                                )}
                                <div className="pf-plan__head">
                                    <p id={`plan-name-${plan.id}`} className="pf-plan__name">{plan.name}</p>
                                    <div className="pf-plan__price-row">
                                        <span className="pf-plan__price" aria-label={`${displayPrice(plan)} per month`}>
                                            {displayPrice(plan)}
                                        </span>
                                        {plan.monthly > 0 && (
                                            <span className="pf-plan__period">{plan.period}</span>
                                        )}
                                    </div>
                                    <p className="pf-plan__annual-note" aria-live="polite">
                                        {annualNote(plan) || "\u00A0"}
                                    </p>
                                    <p className="pf-plan__desc">{plan.desc}</p>
                                </div>
                                <div className="pf-plan__divider" aria-hidden="true" />
                                <ul className="pf-plan__features" aria-label={`${plan.name} plan features`}>
                                    {plan.features.map((feat, j) => (
                                        <li
                                            key={j}
                                            className={`pf-plan__feature ${!feat.included ? "pf-plan__feature--disabled" : ""}`}
                                        >
                                            {feat.included
                                                ? (plan.featured ? <CheckIconFeatured /> : <CheckIcon />)
                                                : <MinusIcon />
                                            }
                                            <span>{feat.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to={plan.to}
                                    className={`pf-plan__cta pf-plan__cta--${plan.ctaStyle}`}
                                    aria-label={`${plan.cta} — ${plan.name} plan`}
                                >
                                    {plan.cta}
                                    {plan.featured && <ArrowRight size={13} />}
                                </Link>
                            </article>
                        ))}
                    </div>
                    <button
                        className={`pf-pricing__compare-toggle ${tableOpen ? "is-open" : ""}`}
                        onClick={() => setTableOpen(o => !o)}
                        aria-expanded={tableOpen}
                        aria-controls="compare-table"
                    >
                        {tableOpen ? "Hide" : "Compare"} all features
                        <TableChevron />
                    </button>
                    <div
                        id="compare-table"
                        className={`pf-pricing__table-wrap ${tableOpen ? "is-open" : ""}`}
                        aria-hidden={!tableOpen}
                    >
                        <table className="pf-pricing__table" aria-label="Feature comparison across plans">
                            <thead>
                                <tr>
                                    <th scope="col">Feature</th>
                                    <th scope="col">Starter</th>
                                    <th scope="col">Pro</th>
                                    <th scope="col">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.label}</td>
                                        <td><CellVal val={row.starter} /></td>
                                        <td><CellVal val={row.pro} /></td>
                                        <td><CellVal val={row.enterprise} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div
                        ref={faqRef}
                        className={`pf-pricing__faq ${faqVis ? "is-visible" : ""}`}
                    >
                        <p className="pf-pricing__faq-title">Common questions</p>
                        {FAQS.map((faq, i) => (
                            <div
                                key={i}
                                className={`pf-pricing__faq-item ${openFaq === i ? "is-open" : ""}`}
                            >
                                <button
                                    className="pf-pricing__faq-q"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                    aria-controls={`faq-body-${i}`}
                                    id={`faq-q-${i}`}
                                >
                                    {faq.q}
                                    <ChevronDown />
                                </button>
                                <div
                                    id={`faq-body-${i}`}
                                    className="pf-pricing__faq-body"
                                    role="region"
                                    aria-labelledby={`faq-q-${i}`}
                                >
                                    <p className="pf-pricing__faq-a">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}