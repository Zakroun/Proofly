import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
const LogoMark = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <path d="M3 2h7a3 3 0 0 1 0 6H6v6"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRight = ({ size = 10 }) => (
    <svg className="pf-footer__link-arrow" width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightBtn = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckCircle = () => (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
        <path d="M4 7l2.5 2.5L10 5" stroke="rgba(52,211,153,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Social icons */
const TwitterX = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.6 2H14.9L9.9 7.7 15.7 14H11.1L7.5 9.3 3.4 14H1.1L6.4 7.9.8 2H5.5L8.8 6.3 12.6 2ZM11.8 12.6H13L4.8 3.4H3.5L11.8 12.6Z"
            fill="currentColor" />
    </svg>
);

const LinkedIn = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M4 6.5v5M4 4.5v.01M7 11.5V9c0-1 .5-2 2-2s2 1 2 2v2.5M7 6.5v5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const GitHub = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5a6.5 6.5 0 0 0-2.055 12.67c.325.06.444-.141.444-.313v-1.1c-1.8.39-2.18-.87-2.18-.87-.295-.748-.72-.947-.72-.947-.588-.402.045-.394.045-.394.65.046.992.668.992.668.578.99 1.515.704 1.885.538.058-.418.226-.704.411-.866-1.438-.163-2.95-.719-2.95-3.2 0-.706.252-1.283.666-1.735-.067-.163-.289-.82.063-1.71 0 0 .543-.174 1.78.663A6.19 6.19 0 0 1 8 6.19c.55.003 1.103.074 1.62.217 1.236-.837 1.779-.663 1.779-.663.352.89.13 1.547.063 1.71.415.452.665 1.029.665 1.735 0 2.488-1.515 3.036-2.958 3.195.233.2.44.597.44 1.203v1.782c0 .173.118.376.447.312A6.501 6.501 0 0 0 8 1.5Z"
            fill="currentColor" />
    </svg>
);

const ProductHunt = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.5 5H9a2 2 0 0 1 0 4H6.5V5ZM6.5 9v2.5"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ProofIcon = ({ children }) => children;
const NAV_COLS = [
    {
        title: "Product",
        links: [
            { label: "Features", to: "/features" },
            { label: "Pricing", to: "/pricing" },
            { label: "Changelog", to: "/changelog", badge: "New" },
            { label: "Roadmap", to: "/roadmap" },
            { label: "Integrations", to: "/integrations" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", to: "/about" },
            { label: "Blog", to: "/blog" },
            { label: "Careers", to: "/careers" },
            { label: "Press Kit", to: "/press" },
            { label: "Contact", to: "/contact" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", to: "/docs" },
            { label: "Founder Guides", to: "/guides" },
            { label: "API Reference", to: "/api" },
            { label: "Community", to: "/community" },
            { label: "Status", to: "/status" },
        ],
    },
];

const SOCIALS = [
    { label: "Twitter / X", href: "https://twitter.com/proofly", Icon: TwitterX },
    { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedIn },
    { label: "GitHub", href: "https://github.com", Icon: GitHub },
    { label: "Product Hunt", href: "https://producthunt.com", Icon: ProductHunt },
];

const BOTTOM_LINKS = [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Cookie Policy", to: "/cookies" },
    { label: "GDPR", to: "/gdpr" },
];

const PROOF_ITEMS = [
    { text: "No credit card required" },
    { text: "Cancel anytime" },
    { text: "SOC 2 compliant" },
];
export default function Footer() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.includes("@") || !email.includes(".")) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setSubmitted(true);
    };
    return (
        <>
            <footer className="pf-footer" role="contentinfo">
                <div className="pf-footer__cta-band">
                    <div className="pf-footer__cta-glow" aria-hidden="true" />
                    <div className="pf-footer__cta-content">
                        <div className="pf-footer__cta-eyebrow" aria-hidden="true">
                            ✦ Start Validating Today
                        </div>
                        <h2 className="pf-footer__cta-heading">
                            Stop building things&nbsp;<em>nobody wants</em>
                        </h2>
                        <p className="pf-footer__cta-sub">
                            Join 2,400+ founders who validate first and build second.
                            Your first idea is free — no card required.
                        </p>
                        <div className="pf-footer__cta-btns">
                            <Link
                                to="/register"
                                className="pf-footer__btn-primary"
                                aria-label="Get started with Proofly for free"
                            >
                                Get Started Free <ArrowRightBtn />
                            </Link>
                            <Link
                                to="/demo"
                                className="pf-footer__btn-ghost"
                                aria-label="See how Proofly works in a demo"
                            >
                                See How It Works
                            </Link>
                        </div>
                        <div className="pf-footer__cta-proof" role="list" aria-label="Guarantees">
                            {PROOF_ITEMS.map(({ text }) => (
                                <div key={text} className="pf-footer__cta-proof-item" role="listitem">
                                    <CheckCircle />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pf-footer__newsletter">
                    <div className="pf-footer__newsletter-inner">
                        <div className="pf-footer__newsletter-text">
                            <p className="pf-footer__newsletter-title">Founder insights, weekly.</p>
                            <p className="pf-footer__newsletter-sub">
                                Validation tips, teardowns & early-stage playbooks. No spam.
                            </p>
                        </div>
                        {submitted ? (
                            <div className="pf-footer__newsletter-success" role="status" aria-live="polite">
                                <CheckCircle /> You're in — check your inbox!
                            </div>
                        ) : (
                            <form
                                className="pf-footer__newsletter-form"
                                onSubmit={handleSubscribe}
                                aria-label="Newsletter subscription"
                                noValidate
                            >
                                <label htmlFor="footer-email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="footer-email"
                                    type="email"
                                    className="pf-footer__newsletter-input"
                                    placeholder="you@startup.com"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setError(""); }}
                                    aria-invalid={!!error}
                                    aria-describedby={error ? "footer-email-error" : undefined}
                                    autoComplete="email"
                                />
                                <button
                                    type="submit"
                                    className="pf-footer__newsletter-btn"
                                >
                                    Subscribe
                                </button>
                                {error && (
                                    <span
                                        id="footer-email-error"
                                        role="alert"
                                        style={{
                                            position: "absolute",
                                            fontSize: "0.72rem",
                                            color: "rgba(248,113,113,0.8)",
                                            marginTop: "0.25rem",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        {error}
                                    </span>
                                )}
                            </form>
                        )}
                    </div>
                </div>
                <div className="pf-footer__main">
                    <div className="pf-footer__brand">
                        <Link to="/" className="pf-footer__logo" aria-label="Proofly homepage">
                            <span className="pf-footer__logo-text">Proofly</span>
                        </Link>
                        <p className="pf-footer__tagline">
                            Validate startup ideas before you build. Trusted by 2,400+ founders worldwide.
                        </p>
                        <nav aria-label="Social media links">
                            <div className="pf-footer__socials">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="pf-footer__social-btn"
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                    {NAV_COLS.map(col => (
                        <nav key={col.title} aria-label={`${col.title} links`} className="pf-footer__col">
                            <p className="pf-footer__col-title">{col.title}</p>
                            {col.links.map(({ label, to, badge }) => (
                                <Link key={label} to={to} className="pf-footer__link">
                                    {label}
                                    {badge && (
                                        <span className="pf-footer__link-badge" aria-label={`(${badge})`}>
                                            {badge}
                                        </span>
                                    )}
                                    <ArrowRight />
                                </Link>
                            ))}
                        </nav>
                    ))}
                </div>
                <div className="pf-footer__bottom">
                    <p className="pf-footer__copy">
                        © {new Date().getFullYear()} Proofly, Inc. All rights reserved.
                        {" "}Built with ♥ for founders who ship smart.
                    </p>
                    <nav aria-label="Legal links" className="pf-footer__bottom-links">
                        {BOTTOM_LINKS.map(({ label, to }, i) => (
                            <>
                                <Link
                                    key={label}
                                    to={to}
                                    className="pf-footer__bottom-link"
                                >
                                    {label}
                                </Link>
                                {i < BOTTOM_LINKS.length - 1 && (
                                    <span key={`dot-${i}`} className="pf-footer__bottom-dot" aria-hidden="true" />
                                )}
                            </>
                        ))}
                    </nav>
                </div>
                <div className="pf-footer__wordmark" aria-hidden="true">Proofly</div>
            </footer>
        </>
    );
}