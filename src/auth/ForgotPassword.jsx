import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

const LogoMark = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 2h7a3 3 0 0 1 0 6H6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRight = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronLeft = () => (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M8 3L4.5 6.5 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AlertIcon = () => (
    <svg viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7.5 4.5v4M7.5 10.5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const ShieldLock = () => (
    <svg viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M5.5 1L9.5 2.5v3C9.5 8 7.5 9.5 5.5 10 3.5 9.5 1.5 8 1.5 5.5v-3L5.5 1Z" stroke="currentColor" strokeWidth=".9" strokeLinejoin="round" />
        <rect x="3.5" y="5" width="4" height="3" rx=".75" stroke="currentColor" strokeWidth=".85" />
        <path d="M4.5 5V4a1 1 0 0 1 2 0v1" stroke="currentColor" strokeWidth=".85" strokeLinecap="round" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 5a3 3 0 0 1 0 6M18 18c0-2.8-2-5-4.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
    </svg>
);

const ChartIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14l4-5 4 3 4-7 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </svg>
);

const RocketIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2C10 2 5.5 6 5.5 12l2.5 2.5c.8-3.5 2-6 2-6s1.2 2.5 2 6L14.5 12c0-6-4.5-10-4.5-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 14.5c-1.2.8-2 2.5-2 2.5l2 .5M12.5 14.5c1.2.8 2 2.5 2 2.5l-2 .5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity=".6" />
    </svg>
);

const PROOFS = [
    { icon: <UsersIcon />, iconBg: "rgba(91,63,212,.15)", iconColor: "rgba(139,111,245,.85)", val: "2,400+", lbl: "founders validated ideas" },
    { icon: <ChartIcon />, iconBg: "rgba(52,211,153,.1)", iconColor: "rgba(52,211,153,.8)", val: "94%", lbl: "user intent clarity score" },
    { icon: <RocketIcon />, iconBg: "rgba(251,191,36,.1)", iconColor: "rgba(251,191,36,.75)", val: "10 min", lbl: "avg. time to first live page" },
];

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);
    const emailRef = useRef(null);

    useEffect(() => {
        setTimeout(() => emailRef.current?.focus(), 80);
    }, []);

    const validate = () => {
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
        return "";
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1600));
        setLoading(false);
        setSent(true);
    };

    return (
        <>
            <div className="lp" role="main">
                <Link to="/" className="lp-back" aria-label="Back to homepage">
                    <ChevronLeft /> Home
                </Link>

                <aside className="lp-left" aria-label="About Proofly">
                    <div className="lp-left__grid" aria-hidden="true" />
                    <div className="lp-left__orb lp-left__orb--a" aria-hidden="true" />
                    <div className="lp-left__orb lp-left__orb--b" aria-hidden="true" />

                    <Link to="/" className="lp-left__logo" aria-label="Proofly homepage">
                        <span className="lp-left__logo-text">Proofly</span>
                    </Link>

                    <div className="lp-left__body">
                        <div>
                            <h2 className="lp-left__headline">
                                Validate before<br />you <em>build anything</em>
                            </h2>
                            <p className="lp-left__desc" style={{ marginTop: "1rem" }}>
                                Join thousands of founders who test demand, collect real sign-ups,
                                and make data-backed decisions — all before writing a line of product code.
                            </p>
                        </div>

                        <div className="lp-left__proofs" role="list" aria-label="Platform statistics">
                            {PROOFS.map(p => (
                                <div key={p.val} className="lp-left__proof" role="listitem">
                                    <div
                                        className="lp-left__proof-icon"
                                        style={{ background: p.iconBg, color: p.iconColor }}
                                        aria-hidden="true"
                                    >
                                        {p.icon}
                                    </div>
                                    <div>
                                        <div className="lp-left__proof-val">{p.val}</div>
                                        <div className="lp-left__proof-lbl">{p.lbl}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="lp-right" aria-label="Reset password">
                    <div className="lp-right__glow" aria-hidden="true" />

                    <div className="lp-card">
                        <header className="lp-card__header">
                            <h1 className="lp-card__title">Reset your <em>password</em></h1>
                            <p className="lp-card__sub">Enter your email and we'll send a reset link.</p>
                        </header>

                        {sent ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", textAlign: "center", padding: "1rem 0" }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: "50%",
                                    background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    animation: "popIn .5s var(--ease-spring) both"
                                }}>
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                                        <path d="M4 13l6 6L22 7" stroke="rgba(52,211,153,.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <p style={{ fontFamily: "var(--font-ui)", fontWeight: 700, color: "var(--color-frost)", marginBottom: ".4rem" }}>
                                        Check your inbox
                                    </p>
                                    <p style={{ fontSize: ".85rem", fontWeight: 300, color: "rgba(196,181,253,.5)", lineHeight: 1.6 }}>
                                        A reset link has been sent to <strong style={{ color: "var(--color-mist)" }}>{email}</strong>
                                    </p>
                                </div>
                                <Link to="/login" style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    fontFamily: "var(--font-ui)", fontSize: ".8rem", fontWeight: 600,
                                    color: "rgba(139,111,245,.6)", letterSpacing: ".04em", textDecoration: "none"
                                }}>
                                    ← Back to sign in
                                </Link>
                            </div>
                        ) : (
                            <>
                                {error && (
                                    <div className="lp-banner" role="alert" aria-live="assertive">
                                        <AlertIcon />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form className="lp-form" onSubmit={handleSubmit} noValidate>
                                    <div className="lp-field">
                                        <label className="lp-label" htmlFor="lp-email">Email</label>
                                        <div className="lp-input-wrap">
                                            <input
                                                ref={emailRef}
                                                id="lp-email"
                                                type="email"
                                                className={`lp-input ${error ? "err" : ""}`}
                                                placeholder="you@startup.io"
                                                value={email}
                                                onChange={e => { setEmail(e.target.value); setError(""); }}
                                                autoComplete="email"
                                                aria-required="true"
                                                aria-invalid={!!error}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="lp-submit"
                                        disabled={loading}
                                        aria-busy={loading}
                                    >
                                        {loading ? (
                                            <><div className="lp-spinner" aria-hidden="true" /> Sending link…</>
                                        ) : (
                                            <>
                                                Send Reset Link
                                                <ArrowRight />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <p className="lp-signup-nudge">
                                    <Link to="/login">← Back to sign in</Link>
                                </p>
                            </>
                        )}

                        <div className="lp-security" aria-label="Secure authentication">
                            <ShieldLock />
                            256-bit SSL encrypted · SOC 2 compliant
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}