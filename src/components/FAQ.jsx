import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/FAQ.css"

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

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [openItem, setOpenItem] = useState(null);
    const sidebarRef = useRef(null);
    const listRef = useRef(null);
    const sidebarVis = useReveal(sidebarRef);
    const listVis = useReveal(listRef, { threshold: 0.05 });
    const visible = FAQS.filter(f =>
        activeCategory === "all" || f.cat === activeCategory
    );
    const countFor = (id) =>
        id === "all" ? FAQS.length : FAQS.filter(f => f.cat === id).length;
    const catMeta = (id) =>
        CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
    const handleCatChange = (id) => {
        setActiveCategory(id);
        setOpenItem(null);
    };
    const toggleItem = (idx) =>
        setOpenItem(prev => (prev === idx ? null : idx));
    return (
        <>
            <section className="pf-faq" aria-labelledby="faq-heading">
                <div className="pf-faq__inner">
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
                                            <span className="pf-faq-item__num" aria-hidden="true">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="pf-faq-item__text">{faq.q}</span>
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
                                            <span
                                                className="pf-faq-item__icon"
                                                aria-hidden="true"
                                            >
                                                <PlusIcon />
                                            </span>
                                        </button>
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