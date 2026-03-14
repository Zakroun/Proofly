import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Contact.css"

const EmailIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.5 6l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const ChatIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2C5.13 2 2 4.91 2 8.5c0 1.4.46 2.7 1.24 3.76L2 16l3.9-1.22A7.3 7.3 0 0 0 9 15c3.87 0 7-2.91 7-6.5S12.87 2 9 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 8.5h6M6 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="3" width="15" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 1.5v3M12.5 1.5v3M1.5 7h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="6" cy="11" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="9" cy="11" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.6" />
    </svg>
);

const ArrowRight = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14 2L7 9M14 2L9 14l-2-5-5-2 12-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AttachIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13.5 7.5l-5.5 5.5a4 4 0 0 1-5.66-5.66l6-6a2.5 2.5 0 0 1 3.54 3.54l-6 6a1 1 0 0 1-1.42-1.42l5.5-5.5"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const AlertIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="rgba(248,113,113,0.7)" strokeWidth="1.2" />
        <path d="M6 4v3M6 8.5v.01" stroke="rgba(248,113,113,0.8)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const CheckLgIcon = () => (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 14l7 7L23 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TwitterX = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.6 2H14.9L9.9 7.7 15.7 14H11.1L7.5 9.3 3.4 14H1.1L6.4 7.9.8 2H5.5L8.8 6.3 12.6 2ZM11.8 12.6H13L4.8 3.4H3.5L11.8 12.6Z" fill="currentColor" />
    </svg>
);

const LinkedIn = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 6.5v5M4 4.5v.01M7 11.5V9c0-1 .5-2 2-2s2 1 2 2v2.5M7 6.5v5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const TOPICS = ["General Inquiry", "Sales", "Support", "Partnership", "Press", "Bug Report"];

const METHODS = [
    {
        icon: <EmailIcon />,
        iconBg: "rgba(91,63,212,0.15)",
        iconColor: "rgba(139,111,245,0.8)",
        label: "Email us",
        value: "hello@proofly.io",
        sub: "We reply within 4 hours",
        href: "mailto:hello@proofly.io",
    },
    {
        icon: <ChatIcon />,
        iconBg: "rgba(52,211,153,0.1)",
        iconColor: "rgba(52,211,153,0.7)",
        label: "Live chat",
        value: "Chat with support",
        sub: "Mon–Fri, 9am–6pm CET",
        href: "#chat",
    },
    {
        icon: <CalendarIcon />,
        iconBg: "rgba(251,191,36,0.1)",
        iconColor: "rgba(251,191,36,0.65)",
        label: "Book a call",
        value: "Schedule 30 min demo",
        sub: "Talk to a founder advisor",
        href: "#calendar",
    },
];

const SOCIALS = [
    { label: "Twitter", href: "#", Icon: TwitterX },
    { label: "LinkedIn", href: "#", Icon: LinkedIn },
];

const MAX_MSG = 1000;
function validate(fields) {
    const errs = {};
    if (!fields.firstName.trim()) errs.firstName = "First name is required";
    if (!fields.lastName.trim()) errs.lastName = "Last name is required";
    if (!fields.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email";
    if (!fields.message.trim()) errs.message = "Message is required";
    else if (fields.message.trim().length < 10) errs.message = "Message too short (min 10 chars)";
    if (!fields.consent) errs.consent = "Please accept the privacy policy";
    return errs;
}
export default function Contact() {
    const [topic, setTopic] = useState("General Inquiry");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const fileRef = useRef(null);

    const [fields, setFields] = useState({
        firstName: "", lastName: "", email: "",
        company: "", message: "", consent: false,
    });

    const set = (k) => (e) => {
        const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFields(f => ({ ...f, [k]: val }));
        if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(fields);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSubmit(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setFileName(file.name);
    };

    const msgLen = fields.message.length;
    const charClass = msgLen > MAX_MSG * 0.9 ? "is-limit" : msgLen > MAX_MSG * 0.75 ? "is-warning" : "";

    return (
        <>
            <main className="pf-contact" aria-labelledby="contact-heading">
                <div className="pf-contact__grid" aria-hidden="true" />
                <div className="pf-contact__orb pf-contact__orb--a" aria-hidden="true" />
                <div className="pf-contact__orb pf-contact__orb--b" aria-hidden="true" />
                <div className="pf-contact__inner">
                    <div className="pf-contact__info">
                        <div className="pf-contact__info-header">
                            <div className="pf-contact__eyebrow" aria-hidden="true">✦ Get in Touch</div>
                            <h1 id="contact-heading" className="pf-contact__heading">
                                We'd love to&nbsp;<em>hear from you</em>
                            </h1>
                            <p className="pf-contact__sub">
                                Whether you have a question, want a demo, or just want to say hi —
                                we're a small team and we read every message personally.
                            </p>
                        </div>
                        <div className="pf-contact__response" aria-label="Typical response time: under 4 hours">
                            <span className="pf-contact__response-dot" aria-hidden="true" />
                            Typical response under 4 hours
                        </div>
                        <nav className="pf-contact__methods" aria-label="Contact methods">
                            {METHODS.map(m => (
                                <a
                                    key={m.label}
                                    href={m.href}
                                    className="pf-contact__method"
                                    aria-label={`${m.label}: ${m.value}`}
                                >
                                    <div
                                        className="pf-contact__method-icon"
                                        style={{ background: m.iconBg, color: m.iconColor }}
                                        aria-hidden="true"
                                    >
                                        {m.icon}
                                    </div>
                                    <div className="pf-contact__method-text">
                                        <p className="pf-contact__method-label">{m.label}</p>
                                        <p className="pf-contact__method-value">{m.value}</p>
                                        <p className="pf-contact__method-sub">{m.sub}</p>
                                    </div>
                                </a>
                            ))}
                        </nav>
                        <div className="pf-contact__socials">
                            <p className="pf-contact__socials-label">Follow along</p>
                            <div className="pf-contact__social-row">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="pf-contact__social-btn"
                                        aria-label={`Follow us on ${label}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon /> {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pf-contact__form-wrap" role="region" aria-label="Contact form">
                        <div className="pf-contact__form-glow" aria-hidden="true" />                        <div
                            className={`pf-contact__success ${submitted ? "is-visible" : ""}`}
                            aria-live="assertive"
                            aria-atomic="true"
                            role="status"
                        >
                            <div className="pf-contact__success-icon">
                                <CheckLgIcon />
                            </div>
                            <h2 className="pf-contact__success-title">Message sent!</h2>
                            <p className="pf-contact__success-sub">
                                Thanks for reaching out. We'll get back to you within 4 hours.
                            </p>
                            <button
                                className="pf-contact__success-back"
                                onClick={() => {
                                    setSubmit(false);
                                    setFields({ firstName: "", lastName: "", email: "", company: "", message: "", consent: false });
                                    setErrors({});
                                    setFileName(null);
                                }}
                                aria-label="Send another message"
                            >
                                Send another message
                            </button>
                        </div>
                        <div className="pf-contact__form-header">
                            <h2 className="pf-contact__form-title">Send us a message</h2>
                            <p className="pf-contact__form-sub">Fill in the form and we'll be in touch shortly.</p>
                        </div>
                        <div
                            className="pf-contact__topics"
                            role="group"
                            aria-label="Select topic"
                        >
                            {TOPICS.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    className={`pf-contact__topic-btn ${topic === t ? "is-active" : ""}`}
                                    onClick={() => setTopic(t)}
                                    aria-pressed={topic === t}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <form
                            className="pf-contact__form"
                            onSubmit={handleSubmit}
                            noValidate
                            aria-label="Contact form"
                        >
                            <div className="pf-contact__row">
                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-first">
                                        First name <span className="pf-contact__required" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="c-first"
                                        type="text"
                                        className={`pf-contact__input ${errors.firstName ? "has-error" : ""}`}
                                        placeholder="Alex"
                                        value={fields.firstName}
                                        onChange={set("firstName")}
                                        autoComplete="given-name"
                                        aria-required="true"
                                        aria-invalid={!!errors.firstName}
                                        aria-describedby={errors.firstName ? "err-first" : undefined}
                                    />
                                    {errors.firstName && (
                                        <span id="err-first" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.firstName}
                                        </span>
                                    )}
                                </div>
                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-last">
                                        Last name <span className="pf-contact__required" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="c-last"
                                        type="text"
                                        className={`pf-contact__input ${errors.lastName ? "has-error" : ""}`}
                                        placeholder="Johnson"
                                        value={fields.lastName}
                                        onChange={set("lastName")}
                                        autoComplete="family-name"
                                        aria-required="true"
                                        aria-invalid={!!errors.lastName}
                                        aria-describedby={errors.lastName ? "err-last" : undefined}
                                    />
                                    {errors.lastName && (
                                        <span id="err-last" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.lastName}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="pf-contact__row">
                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-email">
                                        Email <span className="pf-contact__required" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="c-email"
                                        type="email"
                                        className={`pf-contact__input ${errors.email ? "has-error" : ""}`}
                                        placeholder="alex@startup.io"
                                        value={fields.email}
                                        onChange={set("email")}
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "err-email" : undefined}
                                    />
                                    {errors.email && (
                                        <span id="err-email" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.email}
                                        </span>
                                    )}
                                </div>
                                <div className="pf-contact__field">
                                    <label className="pf-contact__label" htmlFor="c-company">
                                        Company <span style={{ color: "rgba(139,111,245,0.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                                    </label>
                                    <input
                                        id="c-company"
                                        type="text"
                                        className="pf-contact__input"
                                        placeholder="Acme Inc."
                                        value={fields.company}
                                        onChange={set("company")}
                                        autoComplete="organization"
                                    />
                                </div>
                            </div>
                            <div className="pf-contact__field">
                                <label className="pf-contact__label" htmlFor="c-message">
                                    Message <span className="pf-contact__required" aria-hidden="true">*</span>
                                </label>
                                <textarea
                                    id="c-message"
                                    className={`pf-contact__textarea ${errors.message ? "has-error" : ""}`}
                                    placeholder="Tell us what you're working on, what you need help with, or anything on your mind…"
                                    value={fields.message}
                                    onChange={set("message")}
                                    maxLength={MAX_MSG}
                                    aria-required="true"
                                    aria-invalid={!!errors.message}
                                    aria-describedby={`c-char-count${errors.message ? " err-message" : ""}`}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {errors.message ? (
                                        <span id="err-message" className="pf-contact__error" role="alert">
                                            <AlertIcon />{errors.message}
                                        </span>
                                    ) : <span />}
                                    <span
                                        id="c-char-count"
                                        className={`pf-contact__char-count ${charClass}`}
                                        aria-live="polite"
                                        aria-label={`${msgLen} of ${MAX_MSG} characters used`}
                                    >
                                        {msgLen}/{MAX_MSG}
                                    </span>
                                </div>
                            </div>
                            <div className="pf-contact__field">
                                <span className="pf-contact__label" id="attach-label">Attachment</span>
                                <div
                                    className={`pf-contact__dropzone ${dragging ? "is-dragging" : ""}`}
                                    role="button"
                                    tabIndex={0}
                                    aria-labelledby="attach-label"
                                    aria-describedby="attach-hint"
                                    onClick={() => fileRef.current?.click()}
                                    onKeyDown={e => e.key === "Enter" && fileRef.current?.click()}
                                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                >
                                    <div className="pf-contact__dropzone-icon" aria-hidden="true">
                                        <AttachIcon />
                                    </div>
                                    <p className="pf-contact__dropzone-text" id="attach-hint">
                                        {fileName
                                            ? <><strong>{fileName}</strong> — click to change</>
                                            : <><strong>Drop a file</strong> or click to browse — PNG, PDF, up to 10MB</>
                                        }
                                    </p>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept=".png,.jpg,.pdf,.docx"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                        onChange={e => setFileName(e.target.files[0]?.name || null)}
                                    />
                                </div>
                            </div>
                            <div className="pf-contact__field">
                                <div className="pf-contact__consent">
                                    <div className="pf-contact__checkbox-wrap">
                                        <input
                                            id="c-consent"
                                            type="checkbox"
                                            className="pf-contact__checkbox"
                                            checked={fields.consent}
                                            onChange={set("consent")}
                                            aria-required="true"
                                            aria-invalid={!!errors.consent}
                                            aria-describedby={errors.consent ? "err-consent" : undefined}
                                        />
                                        <svg
                                            className="pf-contact__checkbox-check"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path d="M1.5 5l3 3 4-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <label htmlFor="c-consent" className="pf-contact__consent-text">
                                        I agree to the{" "}
                                        <Link to="/privacy">Privacy Policy</Link>
                                        {" "}and consent to Proofly storing my data to respond to this enquiry.
                                    </label>
                                </div>
                                {errors.consent && (
                                    <span id="err-consent" className="pf-contact__error" role="alert">
                                        <AlertIcon />{errors.consent}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="pf-contact__submit"
                                disabled={loading || submitted}
                                aria-busy={loading}
                            >
                                {loading ? (
                                    <><div className="pf-contact__spinner" aria-hidden="true" /> Sending…</>
                                ) : (
                                    <>Send Message <SendIcon /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}