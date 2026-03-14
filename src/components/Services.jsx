import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Services.css";

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

function ServiceCard({ service, index, sectionVisible }) {
    const isVisible = sectionVisible;
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

export default function Services() {
    const sectionRef = useRef(null);
    const ctaRef = useRef(null);
    const isVisible = useReveal(sectionRef);
    const ctaVisible = useReveal(ctaRef, { threshold: 0.5 });
    return (
        <>
            <section
                className="pf-services"
                aria-labelledby="services-heading"
            >
                <div className="pf-services__bg-line" aria-hidden="true" />
                <div className="pf-services__bg-glow" aria-hidden="true" />
                <div className="pf-services__inner">
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
                    <div
                        ref={ctaRef}
                        className={`pf-services__cta ${ctaVisible ? "is-visible" : ""}`}
                    >
                        <p className="pf-services__cta-label">
                            Ready to stop guessing and start validating?
                        </p>
                        <Link
                            to="/register"
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