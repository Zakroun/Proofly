import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/auth.css";

const LogoMark = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 2h7a3 3 0 0 1 0 6H6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EyeOpen = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
);

const EyeClosed = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 2l12 12M6.5 6.5A2 2 0 0 0 9.5 9.5M4 4.7C2.7 5.8 1.5 7.4 1 8c.8 1.3 3.5 5 7 5 1.5 0 2.9-.6 4-1.4M7 3.1C7.3 3 7.7 3 8 3c3.5 0 6.2 3.7 7 5-.4.7-1.1 1.7-2 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
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

function scorePassword(pw) {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#f87171", "#fbbf24", "rgba(52,211,153,.65)", "#8b6ff5"];

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const passwordRef = useRef(null);

    useEffect(() => {
        setTimeout(() => passwordRef.current?.focus(), 80);
    }, []);

    const validate = () => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        if (password !== confirmPassword) return "Passwords do not match";
        return "";
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1600));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
    };

    const pwStrength = scorePassword(password);

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

                <section className="lp-right" aria-label="Set new password">
                    <div className="lp-right__glow" aria-hidden="true" />

                    <div className="lp-card">
                        <header className="lp-card__header">
                            <h1 className="lp-card__title">Set new <em>password</em></h1>
                            <p className="lp-card__sub">Create a strong password for your account.</p>
                        </header>

                        {success ? (
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
                                        Password updated!
                                    </p>
                                    <p style={{ fontSize: ".85rem", fontWeight: 300, color: "rgba(196,181,253,.5)", lineHeight: 1.6 }}>
                                        Redirecting to login...
                                    </p>
                                </div>
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
                                        <label className="lp-label" htmlFor="lp-password">New Password</label>
                                        <div className="lp-input-wrap">
                                            <input
                                                ref={passwordRef}
                                                id="lp-password"
                                                type={showPw ? "text" : "password"}
                                                className={`lp-input lp-input--pass ${error ? "err" : ""}`}
                                                placeholder="Min 8 characters"
                                                value={password}
                                                onChange={e => { setPassword(e.target.value); setError(""); }}
                                                autoComplete="new-password"
                                                aria-required="true"
                                                aria-invalid={!!error}
                                            />
                                            <button
                                                type="button"
                                                className="lp-eye"
                                                onClick={() => setShowPw(s => !s)}
                                                aria-label={showPw ? "Hide password" : "Show password"}
                                                aria-pressed={showPw}
                                            >
                                                {showPw ? <EyeClosed /> : <EyeOpen />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="lp-field">
                                        <label className="lp-label" htmlFor="lp-confirm">Confirm Password</label>
                                        <div className="lp-input-wrap">
                                            <input
                                                id="lp-confirm"
                                                type={showConfirmPw ? "text" : "password"}
                                                className={`lp-input lp-input--pass ${error ? "err" : ""}`}
                                                placeholder="Re-enter password"
                                                value={confirmPassword}
                                                onChange={e => { setConfirmPassword(e.target.value); setError(""); }}
                                                autoComplete="new-password"
                                                aria-required="true"
                                                aria-invalid={!!error}
                                            />
                                            <button
                                                type="button"
                                                className="lp-eye"
                                                onClick={() => setShowConfirmPw(s => !s)}
                                                aria-label={showConfirmPw ? "Hide password" : "Show password"}
                                                aria-pressed={showConfirmPw}
                                            >
                                                {showConfirmPw ? <EyeClosed /> : <EyeOpen />}
                                            </button>
                                        </div>
                                    </div>

                                    {password.length > 0 && (
                                        <div className="lp-strength" aria-live="polite"
                                            aria-label={`Password strength: ${STRENGTH_LABELS[pwStrength] || "too weak"}`}
                                        >
                                            <div className="lp-strength__bars" aria-hidden="true">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div
                                                        key={i}
                                                        className={`lp-strength__bar ${pwStrength >= i ? `lp-strength__bar--${Math.min(pwStrength, 4)}` : ""}`}
                                                    />
                                                ))}
                                            </div>
                                            <span
                                                className="lp-strength__label"
                                                style={{ color: STRENGTH_COLORS[pwStrength] || "rgba(139,111,245,.35)" }}
                                            >
                                                {STRENGTH_LABELS[pwStrength] || "Too short"}
                                            </span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="lp-submit"
                                        disabled={loading}
                                        aria-busy={loading}
                                    >
                                        {loading ? (
                                            <><div className="lp-spinner" aria-hidden="true" /> Updating password…</>
                                        ) : (
                                            <>
                                                Reset Password
                                                <ArrowRight />
                                            </>
                                        )}
                                    </button>
                                </form>
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