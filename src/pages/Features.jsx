import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/FeaturesPage.css"

const PageIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 7h10M5 10h7M5 13h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);
const EmailIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);
const ChartIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14l4-5 4 3 4-7 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </svg>
);
const SortIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M5 10h10M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const ExportIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3v10M7 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 13v2.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const ABIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 16l4-10 4 10M5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="6" width="4" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);
const ZapIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M11 2L4 11h7l-2 7 7-9h-7l2-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);
const ShieldIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l7 3v5c0 4.5-3.2 7.8-7 9-3.8-1.2-7-4.5-7-9V5l7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2.5 2.5L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const LinkIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8 12a4 4 0 0 0 5.66 0l2-2a4 4 0 0 0-5.66-5.66l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 8a4 4 0 0 0-5.66 0l-2 2a4 4 0 0 0 5.66 5.66l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const StarBadge = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l2.4 6.5H19l-5.5 4 2 6.5L10 15l-5.5 4 2-6.5L1 8.5h6.6L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);
const ArrowRight = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const CheckSm = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5.5" fill="rgba(139,111,245,.15)" stroke="rgba(139,111,245,.35)" strokeWidth=".8" />
        <path d="M3.5 6l2 2 3-3" stroke="#8b6ff5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const CheckLi = () => (
    <svg className="fp-deep__bullet-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="rgba(91,63,212,.18)" stroke="rgba(139,111,245,.3)" strokeWidth="1" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="#8b6ff5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const LockIcon = () => (
    <svg className="fp-chrome__lock" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <rect x="1" y="3.5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M2.5 3.5V2.5a1.5 1.5 0 0 1 3 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
);
const HERO_STATS = [
    { val: "10 min", lbl: "Time to first live page" },
    { val: "3.2×", lbl: "More sign-ups vs forms" },
    { val: "94%", lbl: "User intent clarity" },
    { val: "200h", lbl: "Dev hours saved / idea" },
];

const DEEP_FEATURES = [
    {
        id: "builder",
        num: "01",
        title: <>Create <em>Landing Pages</em> in Minutes</>,
        desc: "Build conversion-optimised landing pages with zero code. Choose from proven templates, customise your headline, add your value prop — go live in 10 minutes.",
        bullets: [
            "Drag-and-drop block builder with real-time preview",
            "SEO-friendly meta titles and descriptions per page",
            "Custom domain mapping on Pro and Enterprise",
            "Mobile-responsive by default — no extra work needed",
        ],
        url: "proofly.io/builder",
        mock: "builder",
        flip: false,
    },
    {
        id: "leads",
        num: "02",
        title: <>Collect Emails &amp; <em>Structured Feedback</em></>,
        desc: "Every sign-up and feedback form response flows automatically into your dashboard. Tag leads by interest, score them by intent, and sync to your CRM in one click.",
        bullets: [
            "Smart forms with conditional logic and validation",
            "Automatic lead scoring based on engagement signals",
            "Segment leads by source, device, and response",
            "Export to CSV, JSON, Mailchimp, or Notion instantly",
        ],
        url: "proofly.io/leads",
        mock: "leads",
        flip: true,
    },
    {
        id: "analytics",
        num: "03",
        title: <>Real-Time <em>Analytics Dashboard</em></>,
        desc: "Track visits, scroll depth, CTA clicks, and conversion rate per idea — all in one place. No third-party setup, no data sampling, no surprises.",
        bullets: [
            "Funnel visualisation from visit to sign-up",
            "Daily, weekly, and monthly trend breakdowns",
            "Referral source tracking and UTM parameter support",
            "Side-by-side idea comparison to spot winners fast",
        ],
        url: "proofly.io/analytics",
        mock: "analytics",
        flip: false,
    },
    {
        id: "ab",
        num: "04",
        title: <>A/B Test Headlines <em>Without Code</em></>,
        desc: "Run split tests on any landing page headline or CTA copy directly in the dashboard. Proofly automatically surfaces the winner when statistical confidence is reached.",
        bullets: [
            "Visual editor — no engineering resources required",
            "Auto-declare winner at 95% statistical confidence",
            "Test up to 4 variants simultaneously on Enterprise",
            "Results feed back into your idea scoring automatically",
        ],
        url: "proofly.io/ab-testing",
        mock: "ab",
        flip: true,
    },
    {
        id: "management",
        num: "05",
        title: <>Organise &amp; <em>Prioritise Ideas</em></>,
        desc: "A kanban-style idea board with automatic demand scoring. Every idea gets a Proofly Score based on engagement, sign-ups, and velocity — so you always know what to build next.",
        bullets: [
            "Drag ideas across Backlog, Testing, and Validated columns",
            "Auto-generated Proofly Score based on real signals",
            "Archive low-performers with a single click",
            "Team comments and notes per idea on Enterprise",
        ],
        url: "proofly.io/ideas",
        mock: "management",
        flip: false,
    },
    {
        id: "export",
        num: "06",
        title: <><em>Export</em> Leads &amp; Metrics Anywhere</>,
        desc: "Your data belongs to you. Export everything in CSV or JSON, pipe leads to Mailchimp or your CRM, or sync your idea scores to Notion or Airtable.",
        bullets: [
            "One-click CSV and JSON export for all data",
            "Zapier-compatible webhook triggers on new sign-ups",
            "Native Mailchimp, Notion, and HubSpot integrations",
            "Full REST API access on Enterprise plans",
        ],
        url: "proofly.io/integrations",
        mock: "export",
        flip: true,
    },
];

const BENTO_CAPS = [
    { icon: <ZapIcon />, title: "10-Minute Setup", desc: "From signup to a live, public landing page in under 10 minutes. No installs, no config, no DNS headaches." },
    { icon: <ShieldIcon />, title: "SOC 2 Compliant", desc: "Your data and your leads' data are protected with enterprise-grade security, at every plan level." },
    { icon: <ABIcon />, title: "Smart A/B Engine", desc: "Statistical winner detection at 95% confidence. Test headlines, CTAs, and layouts without a data scientist." },
    { icon: <ChartIcon />, title: "Funnel Analytics", desc: "See exactly where visitors drop off in your funnel so you can iterate on the right piece." },
    { icon: <LinkIcon />, title: "Custom Domains", desc: "Map your own domain to every landing page on Pro and Enterprise for a fully branded experience." },
    {
        icon: <StarBadge />,
        title: "Proofly Score",
        desc: "An automatic demand signal score — combining sign-up velocity, scroll depth, and CTA conversion — for every idea you're testing.",
        wide: true,
        metrics: [
            { val: "4.9/5", lbl: "Avg. user rating" },
            { val: "2,400+", lbl: "Founders using it" },
            { val: "87%", lbl: "Decision accuracy" },
        ],
    },
];

const INTEGRATIONS = [
    { name: "Mailchimp", desc: "Auto-sync waitlist leads directly into your Mailchimp audience segments.", tag: "Live", tagLive: true, logoText: "MC", logoBg: "linear-gradient(135deg,#FFE01B,#FFB703)" },
    { name: "Notion", desc: "Push idea scores and lead counts to a Notion database in real time.", tag: "Live", tagLive: true, logoText: "N", logoBg: "linear-gradient(135deg,#333,#555)" },
    { name: "HubSpot", desc: "Sync leads directly into HubSpot contacts with source tagging.", tag: "Live", tagLive: true, logoText: "HS", logoBg: "linear-gradient(135deg,#ff7a59,#ff4a17)" },
    { name: "Zapier", desc: "Connect Proofly to 6,000+ apps. Trigger on new sign-up, export, and more.", tag: "Live", tagLive: true, logoText: "Z", logoBg: "linear-gradient(135deg,#ff4a00,#ff7452)" },
    { name: "Airtable", desc: "Route leads and idea scores into any Airtable base with one-click setup.", tag: "Soon", tagLive: false, logoText: "AT", logoBg: "linear-gradient(135deg,#1283da,#0f6fba)" },
    { name: "Slack", desc: "Get instant Slack notifications on new sign-ups, milestones, and winners.", tag: "Soon", tagLive: false, logoText: "S", logoBg: "linear-gradient(135deg,#4a154b,#611f69)" },
    { name: "HubSpot API", desc: "Full REST API with webhooks, rate-limit controls, and OpenAPI documentation.", tag: "Enterprise", tagLive: false, logoText: "API", logoBg: "linear-gradient(135deg,#3d2b8e,#5b3fd4)" },
    { name: "Webhooks", desc: "Fire custom HTTP webhooks on any event. Integrate with any internal system.", tag: "Pro+", tagLive: true, logoText: "WH", logoBg: "linear-gradient(135deg,#5b3fd4,#8b6ff5)" },
];

const FLOW_STEPS = [
    { num: "01", title: "Create your idea", desc: "Name your idea, write a one-line description, and choose a template. Takes 2 minutes.", time: "~2 min", active: false },
    { num: "02", title: "Build your page", desc: "Customise the headline, body copy, and CTA using the visual editor. No code required.", time: "~8 min", active: true },
    { num: "03", title: "Share & collect", desc: "Share your link on social, via email, or run a small paid ad. Collect real sign-ups.", time: "Day 1", active: false },
    { num: "04", title: "Read the signals", desc: "Watch your analytics dashboard fill up. Proofly flags intent patterns automatically.", time: "Day 2–7", active: false },
    { num: "05", title: "Decision time", desc: "Your Proofly Score tells you: build it, iterate, or kill it. Data over gut, always.", time: "Day 7", active: false },
];

const CTA_PROOF = ["No credit card required", "Free plan forever", "Setup in 10 minutes"];

function MockBuilder() {
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-row">
                <div style={{ flex: 1 }}>
                    <div className="fp-mock-label fp-mock-label--sm" />
                    <div className="fp-mock-field" />
                </div>
                <div style={{ flex: 1 }}>
                    <div className="fp-mock-label fp-mock-label--sm" />
                    <div className="fp-mock-field" />
                </div>
            </div>
            <div>
                <div className="fp-mock-label fp-mock-label--md" />
                <div className="fp-mock-field fp-mock-field--lg" />
            </div>
            <div className="fp-mock-row" style={{ alignItems: "center" }}>
                <div className="fp-mock-field" style={{ flex: 1 }} />
                <div className="fp-mock-btn fp-mock-btn--pill" style={{ width: 90 }} />
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 4 }}>
                {["#5b3fd4", "#8b6ff5", "#3d2b8e", "#c4b5fd", "#1e1542"].map(c => (
                    <div key={c} style={{
                        width: 22, height: 22, borderRadius: "50%", background: c, opacity: .75,
                        border: c === "#8b6ff5" ? "2px solid white" : "2px solid transparent"
                    }} />
                ))}
            </div>
        </div>
    );
}

function MockLeads() {
    const rows = [
        { dot: "g", line1: 120, line2: 90, chip: "g", chipTxt: "Hot" },
        { dot: "y", line1: 100, line2: 70, chip: "y", chipTxt: "Warm" },
        { dot: "v", line1: 140, line2: 110, chip: "v", chipTxt: "New" },
        { dot: "g", line1: 95, line2: 65, chip: "g", chipTxt: "Hot" },
    ];
    return (
        <div className="fp-deep__preview-body" style={{ gap: ".6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".25rem" }}>
                <div className="fp-mock-label fp-mock-label--md" />
                <div className="fp-mock-btn fp-mock-btn--pill fp-mock-btn--sm" style={{ width: 80 }} />
            </div>
            {rows.map((r, i) => (
                <div key={i} className="fp-mock-list-row">
                    <div className={`fp-mock-dot fp-mock-dot--${r.dot}`} />
                    <div className="fp-mock-line" style={{ width: r.line1 }} />
                    <div className="fp-mock-line" style={{ width: r.line2, opacity: .5 }} />
                    <span className={`fp-mock-chip fp-mock-chip--${r.chip}`}>{r.chipTxt}</span>
                </div>
            ))}
        </div>
    );
}

function MockAnalytics() {
    const bars = [28, 55, 42, 70, 88, 65, 78, 52, 90, 68, 45, 82];
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-row">
                {[{ v: "1.4k", l: "Visits" }, { v: "312", l: "Sign-ups" }, { v: "22%", l: "Conv." }].map(s => (
                    <div key={s.l} className="fp-mock-stat">
                        <span className="fp-mock-stat__val">{s.v}</span>
                        <span className="fp-mock-stat__lbl">{s.l}</span>
                    </div>
                ))}
            </div>
            <div className="fp-mock-bar-wrap">
                {bars.map((h, i) => <div key={i} className="fp-mock-bar" style={{ height: `${h}%` }} />)}
            </div>
        </div>
    );
}

function MockAB() {
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-ab">
                {[
                    { label: "Variant A", pct: "22%", fill: "22%", win: false },
                    { label: "Variant B ✓", pct: "38%", fill: "38%", win: true },
                ].map(v => (
                    <div key={v.label} className={`fp-mock-ab-card ${v.win ? "fp-mock-ab-card--win" : ""}`}>
                        <span className="fp-mock-ab-label">{v.label}</span>
                        <span className="fp-mock-ab-pct">{v.pct}</span>
                        <div className="fp-mock-ab-bar-track">
                            <div className="fp-mock-ab-bar-fill" style={{ width: v.fill }} />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: ".25rem" }}>
                <div className="fp-mock-label fp-mock-label--md" style={{ marginBottom: ".35rem" }} />
                <div className="fp-mock-kanban" style={{ gridTemplateColumns: "1fr" }}>
                    {["CTA text A vs B", "Headline variants", "Subhead test"].map((t, i) => (
                        <div key={t} className={`fp-mock-idea ${i === 0 ? "fp-mock-idea--highlight" : ""}`}>{t}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MockManagement() {
    return (
        <div className="fp-deep__preview-body">
            <div className="fp-mock-kanban">
                {[
                    { head: "Backlog", ideas: ["AI resume tool", "CRM for solos"] },
                    { head: "Testing", ideas: ["Micro-SaaS idea", "Newsletter tool"], highlight: [0] },
                    { head: "Validated", ideas: ["Proofly itself!"] },
                ].map(col => (
                    <div key={col.head} className="fp-mock-col">
                        <div className="fp-mock-col__head">{col.head}</div>
                        {col.ideas.map((idea, i) => (
                            <div key={idea} className={`fp-mock-idea ${col.highlight?.includes(i) ? "fp-mock-idea--highlight" : ""}`}>
                                {idea}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function MockExport() {
    const rows = [
        { label: "CSV Download", sub: "All leads + metrics", bg: "rgba(52,211,153,.12)", color: "rgba(52,211,153,.8)" },
        { label: "Mailchimp", sub: "Sync waitlist auto", bg: "rgba(255,183,3,.12)", color: "rgba(255,183,3,.8)" },
        { label: "Notion", sub: "Export idea scores", bg: "rgba(139,111,245,.12)", color: "rgba(139,111,245,.8)" },
    ];
    return (
        <div className="fp-deep__preview-body" style={{ gap: ".65rem" }}>
            <div className="fp-mock-label fp-mock-label--md" style={{ marginBottom: ".1rem" }} />
            {rows.map(r => (
                <div key={r.label} className="fp-mock-export-row">
                    <div className="fp-mock-export-icon" style={{ background: r.bg, color: r.color }}>
                        <ExportIcon />
                    </div>
                    <div className="fp-mock-export-lines">
                        <div className="fp-mock-label fp-mock-label--md" />
                        <div className="fp-mock-label fp-mock-label--sm" style={{ opacity: .6 }} />
                    </div>
                    <div className="fp-mock-export-btn" />
                </div>
            ))}
        </div>
    );
}

const MOCKS = { builder: MockBuilder, leads: MockLeads, analytics: MockAnalytics, ab: MockAB, management: MockManagement, export: MockExport };

const FEAT_URLS = {
    builder: "proofly.io/builder", leads: "proofly.io/leads",
    analytics: "proofly.io/analytics", ab: "proofly.io/ab-testing",
    management: "proofly.io/ideas", export: "proofly.io/integrations",
};

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

function useRevealList(refs) {
    const [visible, setVisible] = useState([]);
    useEffect(() => {
        refs.forEach((ref, i) => {
            const el = ref.current;
            if (!el) return;
            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => setVisible(prev => prev.includes(i) ? prev : [...prev, i]), i * 120);
                    obs.disconnect();
                }
            }, { threshold: 0.15 });
            obs.observe(el);
        });
    }, []);
    return visible;
}

export default function Features() {
    const bentoRef = useRef(null);
    const integRef = useRef(null);
    const flowRef = useRef(null);
    const ctaRef = useRef(null);
    const flowStepRefs = useRef(FLOW_STEPS.map(() => ({ current: null })));

    const bentoVis = useReveal(bentoRef);
    const integVis = useReveal(integRef);
    const ctaVis = useReveal(ctaRef);
    const flowStepsVis = useRevealList(flowStepRefs.current);
    const deepRefs = useRef(DEEP_FEATURES.map(() => ({ current: null })));
    const deepVis = useRevealList(deepRefs.current);

    return (
        <>
            <div className="fp" role="main">
                <section className="fp-hero" aria-labelledby="fp-page-title">
                    <div className="fp-hero__grid" aria-hidden="true" />
                    <div className="fp-hero__orb fp-hero__orb--a" aria-hidden="true" />
                    <div className="fp-hero__orb fp-hero__orb--b" aria-hidden="true" />
                    <div className="fp-hero__content">
                        <div className="fp__eyebrow" aria-hidden="true">✦ Platform Features</div>
                        <h1 id="fp-page-title" className="fp-hero__heading">
                            Every tool you need to<br /><em>validate smarter</em>
                        </h1>
                        <p className="fp-hero__sub">
                            Six focused features that work together — taking you from raw idea to
                            data-backed decision without touching a line of product code.
                        </p>
                        <div className="fp-hero__ctas">
                            <Link to="/register" className="fp-btn-primary" aria-label="Get started with Proofly for free">
                                Get Started Free <ArrowRight size={14} />
                            </Link>
                            <Link to="/pricing" className="fp-btn-ghost" aria-label="See pricing plans">
                                See Pricing
                            </Link>
                        </div>
                        <div className="fp-hero__stats" role="list" aria-label="Platform statistics">
                            {HERO_STATS.map((s, i) => (
                                <span key={s.lbl} style={{ display: "contents" }}>
                                    <div className="fp-hero__stat" role="listitem">
                                        <span className="fp-hero__stat-val">{s.val}</span>
                                        <span className="fp-hero__stat-lbl">{s.lbl}</span>
                                    </div>
                                    {i < HERO_STATS.length - 1 && <div className="fp-hero__stat-sep" aria-hidden="true" />}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="fp-deep" aria-label="Feature deep-dives">
                    {DEEP_FEATURES.map((feat, i) => {
                        const MockComp = MOCKS[feat.mock];
                        return (
                            <div
                                key={feat.id}
                                ref={el => deepRefs.current[i] = { current: el }}
                                className={`fp-deep__feature fp__rev ${feat.flip ? "fp-deep__feature--flip" : ""} ${deepVis.includes(i) ? "in" : ""}`}
                                style={{ transitionDelay: "0ms" }}
                            >
                                <div className="fp-deep__text">
                                    <span className="fp-deep__num" aria-hidden="true">{feat.num}</span>
                                    <h2 className="fp-deep__title">{feat.title}</h2>
                                    <p className="fp-deep__desc">{feat.desc}</p>
                                    <ul className="fp-deep__bullets" aria-label="Key capabilities">
                                        {feat.bullets.map(b => (
                                            <li key={b} className="fp-deep__bullet">
                                                <CheckLi />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={`/${feat.id}`} className="fp-deep__link" aria-label={`Learn more about ${feat.id}`}>
                                        Learn more <ArrowRight size={12} />
                                    </Link>
                                </div>
                                <div className="fp-deep__preview" aria-hidden="true">
                                    <div className="fp-chrome">
                                        <div className="fp-chrome__dots">
                                            <div className="fp-chrome__dot" /><div className="fp-chrome__dot" /><div className="fp-chrome__dot" />
                                        </div>
                                        <div className="fp-chrome__bar">
                                            <LockIcon />
                                            <span className="fp-chrome__url">{FEAT_URLS[feat.mock]}</span>
                                        </div>
                                    </div>
                                    <MockComp />
                                </div>
                            </div>
                        );
                    })}
                </section>
                <section className="fp-bento" aria-labelledby="fp-bento-title" ref={bentoRef}>
                    <div className="fp__wrap">
                        <div className={`fp-bento__header fp__rev ${bentoVis ? "in" : ""}`}>
                            <div className="fp__eyebrow" aria-hidden="true">✦ Built-In Capabilities</div>
                            <h2 id="fp-bento-title" className="fp__h2">
                                More than you'd <em>expect</em>
                            </h2>
                            <p className="fp__sub">
                                Platform-wide capabilities baked into every plan — not bolted on as expensive add-ons.
                            </p>
                        </div>
                        <div className="fp-bento__grid" role="list">
                            {BENTO_CAPS.map((cap, i) => (
                                <article
                                    key={cap.title}
                                    className={`fp-bcell fp__rev ${cap.wide ? "fp-bcell--wide" : ""} ${bentoVis ? "in" : ""}`}
                                    style={{ transitionDelay: bentoVis ? `${i * 80}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`cap-${i}`}
                                >
                                    {cap.wide ? (
                                        <>
                                            <div className="fp-bcell__info">
                                                <div className="fp-bcell__icon" aria-hidden="true">{cap.icon}</div>
                                                <h3 id={`cap-${i}`} className="fp-bcell__title">{cap.title}</h3>
                                                <p className="fp-bcell__desc">{cap.desc}</p>
                                                <div className="fp-bcell__metrics" role="list" aria-label="Metrics">
                                                    {cap.metrics.map(m => (
                                                        <div key={m.lbl} className="fp-bcell__metric" role="listitem">
                                                            <span className="fp-bcell__metric-val">{m.val}</span>
                                                            <span className="fp-bcell__metric-lbl">{m.lbl}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="fp-bcell__visual" aria-hidden="true">
                                                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                                                    {[{ v: "94", l: "Idea score" }, { v: "↑ 38%", l: "Conv. rate" }, { v: "✓ Win", l: "A/B result" }].map(m => (
                                                        <div key={m.l} className="fp-mock-list-row">
                                                            <div className="fp-mock-dot fp-mock-dot--g" />
                                                            <div className="fp-mock-line" style={{ flex: 1 }} />
                                                            <span className="fp-mock-chip fp-mock-chip--g">{m.v}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="fp-bcell__icon" aria-hidden="true">{cap.icon}</div>
                                            <h3 id={`cap-${i}`} className="fp-bcell__title">{cap.title}</h3>
                                            <p className="fp-bcell__desc">{cap.desc}</p>
                                        </>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="fp-integ" aria-labelledby="fp-integ-title" ref={integRef}>
                    <div className="fp__wrap">
                        <div className={`fp-integ__header fp__rev ${integVis ? "in" : ""}`}>
                            <div className="fp__eyebrow" aria-hidden="true">✦ Integrations</div>
                            <h2 id="fp-integ-title" className="fp__h2">
                                Connect your <em>whole stack</em>
                            </h2>
                            <p className="fp__sub" style={{ maxWidth: 480 }}>
                                Proofly slots into the tools you already use — no custom engineering required.
                            </p>
                        </div>
                        <div className="fp-integ__grid" role="list">
                            {INTEGRATIONS.map((intg, i) => (
                                <article
                                    key={intg.name}
                                    className={`fp-integ-card fp__rev ${integVis ? "in" : ""}`}
                                    style={{ transitionDelay: integVis ? `${i * 70}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`intg-${i}`}
                                >
                                    <div
                                        className="fp-integ-card__logo"
                                        style={{ background: intg.logoBg }}
                                        aria-hidden="true"
                                    >
                                        {intg.logoText}
                                    </div>
                                    <h3 id={`intg-${i}`} className="fp-integ-card__name">{intg.name}</h3>
                                    <p className="fp-integ-card__desc">{intg.desc}</p>
                                    <span className={`fp-integ-card__tag ${intg.tagLive ? "fp-integ-card__tag--live" : ""}`}>
                                        {intg.tag}
                                    </span>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="fp-flow" aria-labelledby="fp-flow-title">
                    <div className="fp__wrap">
                        <div ref={flowRef} className="fp-flow__header">
                            <div className="fp__eyebrow" aria-hidden="true">✦ How It Works</div>
                            <h2 id="fp-flow-title" className="fp__h2">
                                From idea to decision <em>in days</em>
                            </h2>
                            <p className="fp__sub">
                                A repeatable validation loop you can run on any idea, in any market, at any stage.
                            </p>
                        </div>
                        <div className="fp-flow__steps" role="list">
                            <div className="fp-flow__line" aria-hidden="true" />
                            {FLOW_STEPS.map((step, i) => (
                                <div
                                    key={step.num}
                                    ref={el => flowStepRefs.current[i] = { current: el }}
                                    className={`fp-flow__step ${flowStepsVis.includes(i) ? "in" : ""}`}
                                    role="listitem"
                                    aria-label={`Step ${step.num}: ${step.title}`}
                                >
                                    <div className={`fp-flow__node ${step.active ? "fp-flow__node--active" : ""}`} aria-hidden="true">
                                        {step.num}
                                    </div>
                                    <div className="fp-flow__body">
                                        <h3 className="fp-flow__step-title">{step.title}</h3>
                                        <p className="fp-flow__step-desc">{step.desc}</p>
                                        <p className="fp-flow__step-time">{step.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}