import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/About.css"
const BulbIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2a5.5 5.5 0 0 1 3.5 9.74V14a1 1 0 0 1-1 1H7.5a1 1 0 0 1-1-1v-2.26A5.5 5.5 0 0 1 10 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 17h5M8.5 15v1.5m3-1.5v1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 16s-7-4.35-7-8.5A4.5 4.5 0 0 1 10 5a4.5 4.5 0 0 1 7 2.5C17 11.65 10 16 10 16Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SpeedIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 4.5l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 17c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 5a3 3 0 0 1 0 6M18 17c0-2.5-1.79-4.58-4.25-5.24"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l2.2 6H18l-4.9 3.6 1.9 6-5.2-3.7L4.9 17.6l1.9-6L2 8h5.8L10 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const TwitterX = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M9.45 1.5H11.2L7.43 5.78 11.78 10.5H8.33L5.63 6.97 2.53 10.5H0.77L4.8 5.93.6 1.5H4.13L6.6 4.73 9.45 1.5ZM8.85 9.45H9.75L3.6 2.54H2.63L8.85 9.45Z"
            fill="currentColor" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="10.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1" />
        <path d="M3 5v4M3 3.5v.01M5.25 9V7.25c0-.83.67-1.5 1.5-1.5S8.25 6.42 8.25 7.25V9M5.25 5v4"
            stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const ArrowRight = () => (
    <svg className="pf-about__role-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightBtn = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const HERO_STATS = [
    { val: "2,400+", lbl: "Founders" },
    { val: "2021", lbl: "Founded" },
    { val: "$0", lbl: "To Start" },
    { val: "4 days", lbl: "Avg Validation" },
];

const TIMELINE = [
    {
        year: "Nov 2021",
        title: "The expensive mistake",
        desc: "Co-founders Alex & Sara burn 6 months and $40k building a product nobody wanted. The insight: the idea, not the execution, was wrong.",
    },
    {
        year: "Mar 2022",
        title: "The first prototype",
        desc: "A basic landing-page builder and waitlist tool cobbled together over a weekend. 200 founders signed up in 48 hours.",
    },
    {
        year: "Sep 2022",
        title: "YC S22 & seed round",
        desc: "Proofly joins Y Combinator. Analytics, lead export, and the idea scoring engine ship. 500 paying customers.",
    },
    {
        year: "2023",
        title: "Product-market fit",
        desc: "NPS hits 72. Enterprise tier launches. Team grows to 12. Proofly becomes the default validation layer for 3 startup studios.",
    },
    {
        year: "2024 →",
        title: "The mission scales",
        desc: "2,400+ founders on the platform. Series A closed. Building the analytics and integrations roadmap for 2025.",
    },
];

const VALUES = [
    {
        icon: <BulbIcon />,
        title: "Validate before you build",
        desc: "We practice what we preach. Every new feature at Proofly is validated internally before a single line of product code is written.",
    },
    {
        icon: <SpeedIcon />,
        title: "Speed is a feature",
        desc: "Founders move fast. Our tools match that energy. We obsess over time-to-insight — every second you wait costs you momentum.",
    },
    {
        icon: <HeartIcon />,
        title: "Founder empathy above all",
        desc: "We've been in the trenches. We've felt the pain of building the wrong thing. That experience lives in every design decision we make.",
    },
    {
        icon: <ShieldIcon />,
        title: "Data stays yours",
        desc: "Your leads, your metrics, your ideas. We never sell or share founder data. Export everything, anytime, with zero lock-in.",
    },
    {
        icon: <UsersIcon />,
        title: "Community over competition",
        desc: "The best founders help each other. Proofly's community of 2,400+ is a feature in itself — shared learnings, shared wins.",
    },
    {
        icon: <StarIcon />,
        title: "Craft over hype",
        desc: "We ship slowly and deliberately. A tool that genuinely helps one founder beats a feature that looks good in a demo every time.",
    },
];

const TEAM = [
    {
        initials: "AS",
        name: "Alex Santos",
        role: "CEO & Co-founder",
        bio: "2× founder. Previously PM at Stripe. Burned $40k on the wrong idea — Proofly is his revenge.",
        emoji: "🚀",
        grad: "linear-gradient(135deg,#5b3fd4,#8b6ff5)",
        twitter: "#",
        linkedin: "#",
    },
    {
        initials: "SR",
        name: "Sara Rowe",
        role: "CTO & Co-founder",
        bio: "Ex-Vercel engineer. Built the original prototype in 48h. Believes speed is a design principle, not just a metric.",
        emoji: "⚡",
        grad: "linear-gradient(135deg,#7c3aed,#a78bfa)",
        twitter: "#",
        linkedin: "#",
    },
    {
        initials: "DK",
        name: "Dev Kumar",
        role: "Head of Design",
        bio: "Former lead designer at Linear. Obsessed with turning complex data into interfaces that feel obvious.",
        emoji: "✦",
        grad: "linear-gradient(135deg,#4338ca,#818cf8)",
        twitter: "#",
        linkedin: "#",
    },
    {
        initials: "MO",
        name: "Maria Osei",
        role: "Head of Growth",
        bio: "Scaled two B2B SaaS products from $0 to $2M ARR. Joined Proofly to help founders skip the part she learned the hard way.",
        emoji: "📈",
        grad: "linear-gradient(135deg,#6d28d9,#c084fc)",
        twitter: "#",
        linkedin: "#",
    },
];

const BACKERS = ["YC", "a16z", "Sequoia", "Notion", "First Round", "Calm Fund"];

const ROLES = [
    { title: "Senior Full-Stack Engineer", type: "Full-time", loc: "Remote" },
    { title: "Product Designer", type: "Full-time", loc: "Remote / SF" },
    { title: "Founder Success Manager", type: "Full-time", loc: "Remote" },
    { title: "Developer Advocate", type: "Contract", loc: "Remote" },
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
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 90 + 5,
    top: Math.random() * 80 + 10,
    dur: Math.random() * 6 + 6,
    delay: Math.random() * 8,
}));
export default function About() {
    const storyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const backersRef = useRef(null);
    const rolesRef = useRef(null);
    const storyVis = useReveal(storyRef);
    const valuesVis = useReveal(valuesRef);
    const teamVis = useReveal(teamRef);
    const backersVis = useReveal(backersRef);
    const rolesVis = useReveal(rolesRef);
    return (
        <>
            <main className="pf-about" aria-label="About Proofly">
                <section className="pf-about__hero" aria-labelledby="about-hero-heading">
                    <div className="pf-about__hero-grid" aria-hidden="true" />
                    <div className="pf-about__hero-orb pf-about__hero-orb--a" aria-hidden="true" />
                    <div className="pf-about__hero-orb pf-about__hero-orb--b" aria-hidden="true" />
                    <div className="pf-about__particles" aria-hidden="true">
                        {PARTICLES.map(p => (
                            <div
                                key={p.id}
                                className="pf-about__particle"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    "--dur": `${p.dur}s`,
                                    "--delay": `${p.delay}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="pf-about__hero-content">
                        <div className="pf-eyebrow" aria-hidden="true">✦ Our Story</div>
                        <h1 id="about-hero-heading" className="pf-about__hero-headline">
                            Built by founders,<br />
                            <em>for founders</em>
                        </h1>
                        <p className="pf-about__hero-sub">
                            We burned $40,000 and six months building a product nobody wanted.
                            Proofly exists so you never have to make that mistake.
                        </p>
                        <div
                            className="pf-about__hero-stats"
                            role="list"
                            aria-label="Company stats"
                        >
                            {HERO_STATS.map(({ val, lbl }) => (
                                <div key={lbl} className="pf-about__hero-stat" role="listitem">
                                    <span className="pf-about__hero-stat-val">{val}</span>
                                    <span className="pf-about__hero-stat-lbl">{lbl}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pf-about__scroll-hint" aria-hidden="true">
                        <span className="pf-about__scroll-label">Scroll</span>
                        <div className="pf-about__scroll-line" />
                    </div>
                </section>
                <section className="pf-about__story" aria-labelledby="story-heading">
                    <div className="pf-about__story-inner">
                        <div
                            ref={storyRef}
                            className={`pf-about__story-left pf-reveal ${storyVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ Origin</div>
                            <h2 id="story-heading" className="pf-section-heading">
                                The story behind<br /><em>the tool</em>
                            </h2>
                            <div className="pf-about__story-body">
                                <p className="pf-about__story-para">
                                    In 2021, <strong>Alex Santos</strong> and <strong>Sara Rowe</strong> spent six months
                                    building a B2B analytics platform. They had a great team, solid engineering,
                                    and a polished product. They had everything — except customers.
                                </p>
                                <p className="pf-about__story-para">
                                    After a painful post-mortem, the truth was simple: <strong>nobody had ever asked
                                        for what they built</strong>. They'd optimised execution on a fundamentally
                                    unvalidated idea.
                                </p>
                                <p className="pf-about__story-para">
                                    So they built Proofly in a weekend to test their next idea. 200 founders
                                    signed up in 48 hours — and the tool became the product.
                                </p>
                            </div>
                            <blockquote className="pf-about__story-pullquote">
                                <p>"The biggest startup mistake isn't bad code. It's building the right thing wrong, when you should've validated the idea first."</p>
                                <cite>— Alex Santos, CEO & Co-founder</cite>
                            </blockquote>
                        </div>
                        <div
                            className={`pf-about__timeline pf-reveal ${storyVis ? "is-visible" : ""}`}
                            style={{ transitionDelay: "120ms" }}
                            aria-label="Company timeline"
                        >
                            {TIMELINE.map((item, i) => (
                                <div key={i} className="pf-about__tl-item">
                                    <div className="pf-about__tl-dot" aria-hidden="true">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="pf-about__tl-content">
                                        <p className="pf-about__tl-year">{item.year}</p>
                                        <p className="pf-about__tl-title">{item.title}</p>
                                        <p className="pf-about__tl-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="pf-about__values" aria-labelledby="values-heading">
                    <div className="pf-about__values-orb" aria-hidden="true" />
                    <div className="pf-about__values-inner">
                        <header
                            className={`pf-about__values-header pf-reveal ${valuesVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ What We Stand For</div>
                            <h2 id="values-heading" className="pf-section-heading">
                                Six principles that<br /><em>drive everything</em>
                            </h2>
                        </header>
                        <div
                            ref={valuesRef}
                            className="pf-about__values-grid"
                            role="list"
                            aria-label="Company values"
                        >
                            {VALUES.map((v, i) => (
                                <article
                                    key={v.title}
                                    className={`pf-about__value-card pf-reveal ${valuesVis ? "is-visible" : ""}`}
                                    style={{ transitionDelay: valuesVis ? `${i * 80}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`value-${i}`}
                                >
                                    <div className="pf-about__value-icon" aria-hidden="true">{v.icon}</div>
                                    <h3 id={`value-${i}`} className="pf-about__value-title">{v.title}</h3>
                                    <p className="pf-about__value-desc">{v.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="pf-about__team" aria-labelledby="team-heading">
                    <div className="pf-about__team-inner">
                        <header
                            className={`pf-about__team-header pf-reveal ${teamVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ The Team</div>
                            <h2 id="team-heading" className="pf-section-heading">
                                The humans<br /><em>behind Proofly</em>
                            </h2>
                            <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(196,181,253,0.6)", fontFamily: "var(--font-body)" }}>
                                A small, focused team of ex-founders and product builders who've lived the problem firsthand.
                            </p>
                        </header>
                        <div
                            ref={teamRef}
                            className="pf-about__team-grid"
                            role="list"
                            aria-label="Team members"
                        >
                            {TEAM.map((member, i) => (
                                <article
                                    key={member.name}
                                    className={`pf-about__member pf-reveal ${teamVis ? "is-visible" : ""}`}
                                    style={{ transitionDelay: teamVis ? `${i * 100}ms` : "0ms" }}
                                    role="listitem"
                                    aria-labelledby={`member-${i}`}
                                >
                                    <div className="pf-about__member-avatar-wrap">
                                        <div
                                            className="pf-about__member-avatar"
                                            style={{ background: member.grad }}
                                            aria-hidden="true"
                                        >
                                            {member.initials}
                                        </div>
                                        <div className="pf-about__member-emoji" aria-hidden="true">
                                            {member.emoji}
                                        </div>
                                    </div>
                                    <p id={`member-${i}`} className="pf-about__member-name">{member.name}</p>
                                    <p className="pf-about__member-role">{member.role}</p>
                                    <p className="pf-about__member-bio">{member.bio}</p>
                                    <nav className="pf-about__member-links" aria-label={`${member.name} social links`}>
                                        <a href={member.twitter} className="pf-about__member-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                            <TwitterX />
                                        </a>
                                        <a href={member.linkedin} className="pf-about__member-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon />
                                        </a>
                                    </nav>
                                </article>
                            ))}
                            <Link
                                to="/careers"
                                className={`pf-about__member pf-about__member--hiring pf-reveal ${teamVis ? "is-visible" : ""}`}
                                style={{ transitionDelay: teamVis ? `${TEAM.length * 100}ms` : "0ms" }}
                                aria-label="View open roles at Proofly"
                            >
                                <div className="pf-about__hiring-icon" aria-hidden="true">
                                    <PlusIcon />
                                </div>
                                <p className="pf-about__member-name">You?</p>
                                <p className="pf-about__member-role">Open Roles</p>
                                <p className="pf-about__member-bio">We're hiring across engineering, design, and growth. Come build with us.</p>
                            </Link>
                        </div>
                    </div>
                </section>
                <div
                    ref={backersRef}
                    className={`pf-about__backers pf-reveal ${backersVis ? "is-visible" : ""}`}
                >
                    <div className="pf-about__backers-inner">
                        <p className="pf-about__backers-label">Backed by world-class investors</p>
                        <div className="pf-about__backers-row" role="list" aria-label="Investors">
                            {BACKERS.map(b => (
                                <div key={b} className="pf-about__backer" role="listitem">
                                    <div className="pf-about__backer-logo">{b}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <section className="pf-about__roles" aria-labelledby="roles-heading">
                    <div className="pf-about__roles-inner">
                        <header
                            ref={rolesRef}
                            className={`pf-about__roles-header pf-reveal ${rolesVis ? "is-visible" : ""}`}
                        >
                            <div className="pf-eyebrow" aria-hidden="true">✦ Join the Team</div>
                            <h2 id="roles-heading" className="pf-section-heading">
                                Open roles at<br /><em>Proofly</em>
                            </h2>
                            <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(196,181,253,0.55)", fontFamily: "var(--font-body)", textAlign: "center" }}>
                                Remote-first. Async-friendly. Equity from day one.
                            </p>
                        </header>
                        <div
                            className="pf-about__roles-list"
                            role="list"
                            aria-label="Open job roles"
                        >
                            {ROLES.map((role, i) => (
                                <Link
                                    key={role.title}
                                    to={`/careers/${role.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={`pf-about__role pf-reveal ${rolesVis ? "is-visible" : ""}`}
                                    style={{ transitionDelay: rolesVis ? `${i * 80}ms` : "0ms" }}
                                    role="listitem"
                                    aria-label={`${role.title} — ${role.type}, ${role.loc}`}
                                >
                                    <div className="pf-about__role-left">
                                        <div className="pf-about__role-dot" aria-hidden="true" />
                                        <span className="pf-about__role-title">{role.title}</span>
                                    </div>
                                    <div className="pf-about__role-right">
                                        <span className="pf-about__role-tag pf-about__role-tag--type">{role.type}</span>
                                        <span className="pf-about__role-tag pf-about__role-tag--loc">{role.loc}</span>
                                        <ArrowRight />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.9rem 2.2rem",
                                borderRadius: "999px",
                                background: "var(--grad-brand)",
                                backgroundSize: "200% 200%",
                                backgroundPosition: "0% 50%",
                                fontFamily: "var(--font-ui)",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                color: "var(--color-white)",
                                textDecoration: "none",
                                boxShadow: "0 4px 24px rgba(91,63,212,0.4)",
                                marginTop: "1rem",
                                transition: "transform 0.25s var(--ease-spring), box-shadow 0.3s ease",
                            }}
                            aria-label="Get started with Proofly for free"
                        >
                            Start Validating Free <ArrowRightBtn />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}