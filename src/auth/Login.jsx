import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const LogoMark = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 2h7a3 3 0 0 1 0 6H6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const GoogleIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5A7.5 7.5 0 0 0 1.5 9c0 3.314 2.15 6.124 5.136 7.115.375.069.512-.163.512-.362 0-.178-.007-.65-.01-1.275-2.088.454-2.529-.9-2.529-.9a1.99 1.99 0 0 0-.833-1.1c-.681-.466.051-.456.051-.456.753.053 1.15.774 1.15.774.67 1.147 1.757.816 2.185.624.068-.485.262-.817.476-1.004-1.666-.19-3.419-.833-3.419-3.708 0-.819.293-1.49.773-2.015-.077-.19-.335-.953.074-1.988 0 0 .63-.202 2.065.77a7.19 7.19 0 0 1 1.88-.253c.638.003 1.28.086 1.88.253 1.433-.972 2.062-.77 2.062-.77.41 1.035.152 1.798.075 1.988.482.525.772 1.196.772 2.015 0 2.883-1.756 3.516-3.428 3.702.27.232.51.69.51 1.39 0 1.004-.009 1.813-.009 2.06 0 .2.135.435.515.36A7.502 7.502 0 0 0 16.5 9 7.5 7.5 0 0 0 9 1.5Z" fill="currentColor" />
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

const OAUTH_BTNS = [
    { id: "google", label: "Continue with Google", Icon: GoogleIcon },
    { id: "github", label: "Continue with GitHub", Icon: GitHubIcon },
];

const PROOFS = [
    { icon: <UsersIcon />, iconBg: "rgba(91,63,212,.15)", iconColor: "rgba(139,111,245,.85)", val: "2,400+", lbl: "founders validated ideas" },
    { icon: <ChartIcon />, iconBg: "rgba(52,211,153,.1)", iconColor: "rgba(52,211,153,.8)", val: "94%", lbl: "user intent clarity score" },
    { icon: <RocketIcon />, iconBg: "rgba(251,191,36,.1)", iconColor: "rgba(251,191,36,.75)", val: "10 min", lbl: "avg. time to first live page" },
];

export default function Login() {
    const navigate = useNavigate();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [banner, setBanner] = useState("");
    const emailRef = useRef(null);

    useEffect(() => {
        setTimeout(() => emailRef.current?.focus(), 80);
    }, []);

    const set = k => e => {
        const v = e.target.value;
        setFields(f => ({ ...f, [k]: v }));
        if (errors[k]) setErrors(err => { const n = { ...err }; delete n[k]; return n; });
        if (banner) setBanner("");
    };

    const validate = () => {
        const errs = {};
        if (!fields.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email";
        if (!fields.password) errs.password = "Password is required";
        return errs;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1600));
        setLoading(false);
        if (fields.password !== "demo1234") {
            setBanner("Incorrect email or password. Try demo1234 for the demo.");
            return;
        }
        navigate("/dashboard");
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

                <section className="lp-right" aria-label="Sign in">
                    <div className="lp-right__glow" aria-hidden="true" />

                    <div className="lp-card">
                        <header className="lp-card__header">
                            <h1 className="lp-card__title">Welcome <em>back</em></h1>
                            <p className="lp-card__sub">Sign in to your Proofly account to continue validating.</p>
                        </header>

                        <div className="lp-oauth" role="group" aria-label="Sign in with a provider">
                            {OAUTH_BTNS.map(btn => (
                                <button
                                    key={btn.id}
                                    type="button"
                                    className="lp-oauth__btn"
                                    aria-label={btn.label}
                                    onClick={() => setBanner("")}
                                >
                                    <btn.Icon />
                                    {btn.label}
                                </button>
                            ))}
                        </div>

                        <div className="lp-divider" aria-hidden="true">
                            <div className="lp-divider__line" />
                            <span className="lp-divider__text">or continue with email</span>
                            <div className="lp-divider__line" />
                        </div>

                        {banner && (
                            <div className="lp-banner" role="alert" aria-live="assertive">
                                <AlertIcon />
                                <span>{banner}</span>
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
                                        className={`lp-input ${errors.email ? "err" : ""}`}
                                        placeholder="you@startup.io"
                                        value={fields.email}
                                        onChange={set("email")}
                                        autoComplete="username"
                                        aria-required="true"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "err-email" : undefined}
                                    />
                                </div>
                                {errors.email && (
                                    <span id="err-email" className="lp-err" role="alert">
                                        <AlertIcon />{errors.email}
                                    </span>
                                )}
                            </div>

                            <div className="lp-field">
                                <label className="lp-label" htmlFor="lp-password">
                                    Password
                                    <Link to="/forgot-password" className="lp-forgot">
                                        Forgot password?
                                    </Link>
                                </label>
                                <div className="lp-input-wrap">
                                    <input
                                        id="lp-password"
                                        type={showPw ? "text" : "password"}
                                        className={`lp-input lp-input--pass ${errors.password ? "err" : ""}`}
                                        placeholder="••••••••"
                                        value={fields.password}
                                        onChange={set("password")}
                                        autoComplete="current-password"
                                        aria-required="true"
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? "err-pw" : undefined}
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
                                {errors.password && (
                                    <span id="err-pw" className="lp-err" role="alert">
                                        <AlertIcon />{errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="lp-extras">
                                <label className="lp-remember" htmlFor="lp-remember">
                                    <div className="lp-remember-wrap">
                                        <input
                                            id="lp-remember"
                                            type="checkbox"
                                            className="lp-remember__box"
                                            checked={remember}
                                            onChange={e => setRemember(e.target.checked)}
                                            aria-label="Remember me for 30 days"
                                        />
                                        <svg className="lp-remember__check" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                                            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                                            <path d="M1.5 5l3 3 4-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="lp-remember__label">Remember me for 30 days</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="lp-submit"
                                disabled={loading}
                                aria-busy={loading}
                            >
                                {loading ? (
                                    <><div className="lp-spinner" aria-hidden="true" /> Signing in…</>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="lp-signup-nudge">
                            Don't have an account?{" "}
                            <Link to="/register">Sign up free</Link>
                        </p>

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