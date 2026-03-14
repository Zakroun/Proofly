import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/Features.css";

const PageIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 5.5h8M4 8h5M4 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const EmailIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const ChartIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 12l3.5-4 3 2.5 3-5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 14h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
);

const SortIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ExportIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11v1.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const LockIcon = () => (
    <svg className="pf-feat__chrome-lock" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <rect x="1" y="3.5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M2.5 3.5V2.5a1.5 1.5 0 0 1 3 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
);
const FEATURES = [
    {
        id: "landing-pages",
        icon: <PageIcon />,
        title: "Create Landing Pages",
        desc: "Build conversion-optimised pages in minutes with no code. Pick a template, customise your copy, go live.",
        url: "proofly.io/idea/my-saas",
        slide: "pages",
    },
    {
        id: "collect-leads",
        icon: <EmailIcon />,
        title: "Collect Emails & Feedback",
        desc: "Capture waitlist sign-ups and structured feedback forms automatically. Every lead flows into your dashboard.",
        url: "proofly.io/leads",
        slide: "leads",
    },
    {
        id: "track-engagement",
        icon: <ChartIcon />,
        title: "Track Idea Engagement",
        desc: "See clicks, scroll depth, CTA conversions, and return visits per idea in real-time. Know what resonates.",
        url: "proofly.io/analytics",
        slide: "analytics",
    },
    {
        id: "prioritise",
        icon: <SortIcon />,
        title: "Prioritise by Demand",
        desc: "Proofly scores each idea automatically based on engagement and sign-up velocity. Know exactly what to build next.",
        url: "proofly.io/ideas",
        slide: "priority",
    },
    {
        id: "export",
        icon: <ExportIcon />,
        title: "Export Leads & Metrics",
        desc: "One-click CSV, JSON, or direct integrations to your CRM and email tool. Your data, your workflow.",
        url: "proofly.io/export",
        slide: "export",
    },
];

const STATS = [
    { num: "10 min", lbl: "Avg. time to first live page" },
    { num: "3.2×", lbl: "More sign-ups vs plain forms" },
    { num: "94%", lbl: "User intent clarity score" },
    { num: "200h", lbl: "Dev hours saved per idea killed" },
    { num: "$0", lbl: "Engineering cost to validate" },
];

function SlidePages() {
    return (
        <div className="pf-mock">
            <div className="pf-mock__row">
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div className="pf-mock__label" />
                    <div className="pf-mock__field" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div className="pf-mock__label" />
                    <div className="pf-mock__field" />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <div className="pf-mock__label" />
                <div className="pf-mock__field pf-mock__field--lg" />
            </div>
            <div className="pf-mock__row" style={{ alignItems: "center" }}>
                <div className="pf-mock__field" style={{ flex: 1 }} />
                <div className="pf-mock__btn" />
            </div>
            {/* Colour picker row */}
            <div style={{ display: "flex", gap: "6px", marginTop: "0.25rem" }}>
                {["#5b3fd4", "#8b6ff5", "#3d2b8e", "#c4b5fd", "#1e1542"].map(c => (
                    <div key={c} style={{
                        width: 22, height: 22, borderRadius: "50%", background: c, opacity: 0.75,
                        border: c === "#8b6ff5" ? "2px solid white" : "2px solid transparent"
                    }} />
                ))}
            </div>
        </div>
    );
}

function SlideLeads() {
    const rows = [
        { dot: "green", name: true, badge: "up", badgeTxt: "Hot" },
        { dot: "yellow", name: true, badge: "mid", badgeTxt: "Warm" },
        { dot: "purple", name: true, badge: "low", badgeTxt: "New" },
        { dot: "green", name: true, badge: "up", badgeTxt: "Hot" },
    ];
    return (
        <div className="pf-mock">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ height: 10, width: 80, borderRadius: 4, background: "rgba(196,181,253,0.2)" }} />
                <div style={{ height: 26, width: 90, borderRadius: 999, background: "var(--grad-brand)", opacity: 0.75 }} />
            </div>
            {rows.map((r, i) => (
                <div key={i} className="pf-mock__email-row">
                    <div className="pf-mock__avatar-sm" />
                    <div className="pf-mock__email-info">
                        <div className="pf-mock__email-name" />
                        <div className="pf-mock__email-addr" />
                    </div>
                    <span className={`pf-mock__badge pf-mock__badge--${r.badge}`}>{r.badgeTxt}</span>
                </div>
            ))}
        </div>
    );
}

function SlideAnalytics() {
    const heights = [30, 55, 42, 70, 88, 65, 78, 52, 90, 68, 45, 80];
    return (
        <div className="pf-mock">
            <div className="pf-mock__stats">
                <div className="pf-mock__stat">
                    <span className="pf-mock__stat-val">1.4k</span>
                    <span className="pf-mock__stat-lbl">Unique visits</span>
                </div>
                <div className="pf-mock__stat">
                    <span className="pf-mock__stat-val">312</span>
                    <span className="pf-mock__stat-lbl">Sign-ups</span>
                </div>
                <div className="pf-mock__stat">
                    <span className="pf-mock__stat-val">22%</span>
                    <span className="pf-mock__stat-lbl">Conversion</span>
                </div>
            </div>
            <div className="pf-mock__chart">
                {heights.map((h, i) => (
                    <div key={i} className="pf-mock__bar" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

function SlidePriority() {
    const items = [
        { dot: "green", w1: 120, w2: 90, badge: "up", txt: "↑ 94" },
        { dot: "yellow", w1: 100, w2: 70, badge: "mid", txt: "→ 61" },
        { dot: "purple", w1: 140, w2: 110, badge: "up", txt: "↑ 78" },
        { dot: "yellow", w1: 90, w2: 60, badge: "low", txt: "↓ 33" },
    ];
    return (
        <div className="pf-mock">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                {["All", "Hot", "Warm", "Archive"].map((lbl, i) => (
                    <div key={lbl} style={{
                        padding: "0.2rem 0.65rem", borderRadius: 999,
                        background: i === 0 ? "rgba(91,63,212,0.3)" : "transparent",
                        border: "1px solid rgba(139,111,245,0.15)",
                        fontSize: "0.68rem", fontFamily: "var(--font-ui)", fontWeight: 600,
                        color: i === 0 ? "rgba(196,181,253,0.9)" : "rgba(139,111,245,0.4)",
                    }}>{lbl}</div>
                ))}
            </div>
            <div className="pf-mock__list">
                {items.map((r, i) => (
                    <div key={i} className="pf-mock__list-row">
                        <div className={`pf-mock__dot pf-mock__dot--${r.dot}`} />
                        <div className="pf-mock__line" style={{ width: r.w1, flex: "none" }} />
                        <div className="pf-mock__line" style={{ width: r.w2, flex: "none", opacity: 0.5 }} />
                        <span className={`pf-mock__badge pf-mock__badge--${r.badge}`} style={{ marginLeft: "auto" }}>{r.txt}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SlideExport() {
    const integrations = [
        { label: "CSV Download", sub: "All leads + metrics", color: "rgba(52,211,153,0.8)", bg: "rgba(52,211,153,0.1)" },
        { label: "Mailchimp", sub: "Sync waitlist automatically", color: "rgba(255,189,46,0.8)", bg: "rgba(255,189,46,0.1)" },
        { label: "Notion / Airtable", sub: "Export idea scores", color: "rgba(139,111,245,0.8)", bg: "rgba(139,111,245,0.12)" },
    ];
    return (
        <div className="pf-mock">
            <div style={{ height: 10, width: 110, borderRadius: 4, background: "rgba(196,181,253,0.2)", marginBottom: "0.25rem" }} />
            <div className="pf-mock__export">
                {integrations.map((int, i) => (
                    <div key={i} className="pf-mock__export-row">
                        <div className="pf-mock__export-icon" style={{ background: int.bg }}>
                            <ExportIcon />
                        </div>
                        <div className="pf-mock__export-text">
                            <div className="pf-mock__export-title" />
                            <div className="pf-mock__export-sub" />
                        </div>
                        <div className="pf-mock__export-btn" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const SLIDES = {
    pages: <SlidePages />,
    leads: <SlideLeads />,
    analytics: <SlideAnalytics />,
    priority: <SlidePriority />,
    export: <SlideExport />,
};

function useReveal(ref, opts = {}) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setV(true); obs.disconnect(); }
        }, { threshold: 0.12, ...opts });
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref]);
    return v;
}

const AUTO_INTERVAL = 4500;

export default function Features() {
    const [active, setActive] = useState(0);
    const [exiting, setExiting] = useState(null);
    const timerRef = useRef(null);
    const fillRef = useRef(null);
    const stripRef = useRef(null);
    const stripVis = useReveal(stripRef);
    const switchTo = useCallback((idx) => {
        if (idx === active) return;
        setExiting(active);
        setTimeout(() => setExiting(null), 450);
        setActive(idx);
    }, [active]);
    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActive(prev => (prev + 1) % FEATURES.length);
        }, AUTO_INTERVAL);
    }, []);
    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [startTimer]);
    const handleTabClick = (idx) => {
        switchTo(idx);
        startTimer();
    };

    return (
        <>
            <section className="pf-feat" aria-labelledby="feat-heading">
                <div className="pf-feat__inner">
                    <header className="pf-feat__header">
                        <div className="pf-feat__eyebrow" aria-hidden="true">
                            ✦ Platform Features
                        </div>
                        <h2 id="feat-heading" className="pf-feat__heading">
                            Built for founders who&nbsp;
                            <em>move fast</em>
                        </h2>
                        <p className="pf-feat__sub">
                            Five focused tools — designed to work together so you spend
                            less time tooling and more time learning.
                        </p>
                    </header>
                    <div className="pf-feat__showcase">
                        <ul className="pf-feat__tabs" role="tablist" aria-label="Feature tabs">
                            {FEATURES.map((feat, i) => (
                                <li key={feat.id} role="presentation">
                                    <button
                                        role="tab"
                                        id={`tab-${feat.id}`}
                                        aria-selected={active === i}
                                        aria-controls={`panel-${feat.id}`}
                                        className={`pf-feat__tab ${active === i ? "is-active" : ""}`}
                                        onClick={() => handleTabClick(i)}
                                        tabIndex={active === i ? 0 : -1}
                                    >
                                        <div className="pf-feat__tab-icon" aria-hidden="true">
                                            {feat.icon}
                                        </div>
                                        <div className="pf-feat__tab-text">
                                            <span className="pf-feat__tab-title">{feat.title}</span>
                                            <span className="pf-feat__tab-desc">{feat.desc}</span>
                                        </div>
                                        {active === i && (
                                            <div className="pf-feat__tab-progress" aria-hidden="true">
                                                <div
                                                    ref={fillRef}
                                                    className="pf-feat__tab-progress-fill"
                                                    style={{
                                                        animation: `tabFill ${AUTO_INTERVAL}ms linear forwards`,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div
                            className="pf-feat__panel"
                            role="tabpanel"
                            id={`panel-${FEATURES[active].id}`}
                            aria-labelledby={`tab-${FEATURES[active].id}`}
                        >
                            <div className="pf-feat__panel-chrome" aria-hidden="true">
                                <div className="pf-feat__chrome-dots">
                                    <div className="pf-feat__chrome-dot" />
                                    <div className="pf-feat__chrome-dot" />
                                    <div className="pf-feat__chrome-dot" />
                                </div>
                                <div className="pf-feat__chrome-bar">
                                    <LockIcon />
                                    <span className="pf-feat__chrome-url">
                                        {FEATURES[active].url}
                                    </span>
                                </div>
                            </div>
                            <div className="pf-feat__panel-content">
                                {FEATURES.map((feat, i) => (
                                    <div
                                        key={feat.id}
                                        className={[
                                            "pf-feat__slide",
                                            active === i ? "is-active" : "",
                                            exiting === i ? "is-exit" : "",
                                        ].filter(Boolean).join(" ")}
                                        aria-hidden={active !== i}
                                    >
                                        <p className="pf-feat__slide-title">{feat.title}</p>
                                        {SLIDES[feat.slide]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        ref={stripRef}
                        className={`pf-feat__strip ${stripVis ? "is-visible" : ""}`}
                        aria-label="Platform statistics"
                    >
                        {STATS.map((s, i) => (
                            <div key={i} className="pf-feat__strip-item">
                                <span className="pf-feat__strip-num">{s.num}</span>
                                <span className="pf-feat__strip-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <style>{`
        @keyframes tabFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
        </>
    );
}