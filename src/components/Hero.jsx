import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../styles/Hero.css";
function ArrowRight({ size = 16, ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PlayIcon({ size = 14 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 4.5l4 2.5-4 2.5V4.5z" fill="currentColor" />
        </svg>
    );
}

const AVATARS = [
    { initials: "AS", hue: "135deg,#4f46e5,#7c3aed" },
    { initials: "MJ", hue: "135deg,#7c3aed,#a855f7" },
    { initials: "RK", hue: "135deg,#a855f7,#c084fc" },
    { initials: "TL", hue: "135deg,#6d28d9,#8b5cf6" },
];

function AvatarStack() {
    return (
        <div className="proofly-hero__avatars" aria-hidden="true">
            {AVATARS.map(({ initials, hue }) => (
                <div
                    key={initials}
                    className="proofly-hero__avatar"
                    style={{ background: `linear-gradient(${hue})` }}
                    title={initials}
                >
                    {initials}
                </div>
            ))}
        </div>
    );
}

function StarRating({ rating = 5 }) {
    return (
        <div className="proofly-hero__stars" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} aria-hidden="true">{i < rating ? "★" : "☆"}</span>
            ))}
        </div>
    );
}

export default function Hero() {
    const sectionRef = useRef(null);
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const blobs = section.querySelectorAll(".proofly-hero__blob");
        const handleMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xRatio = (clientX / innerWidth - 0.5) * 2;
            const yRatio = (clientY / innerHeight - 0.5) * 2;
            blobs.forEach((blob, i) => {
                const depth = (i + 1) * 14;
                blob.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
            });
        };
        const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
        if (mq.matches) {
            window.addEventListener("mousemove", handleMove, { passive: true });
        }
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
                className="proofly-hero"
                aria-labelledby="hero-headline"
            >
                <div className="proofly-hero__content">
                    <div className="proofly-hero__badge" aria-label="Now available">
                        <span className="proofly-hero__badge-dot" aria-hidden="true" />
                        Now in Early Access
                    </div>
                    <h1 id="hero-headline" className="proofly-hero__headline">
                        Validate Your Startup&nbsp;Ideas{" "}
                        <em>Before&nbsp;You&nbsp;Build</em>
                    </h1>
                    <p className="proofly-hero__sub">
                        Proofly gives founders the tools to test demand, collect real feedback,
                        and make confident decisions — all before writing a single line of code.
                    </p>
                    <div className="proofly-hero__cta-group">
                        <Link
                            to="/register"
                            className="proofly-hero__btn-primary"
                            aria-label="Get started with Proofly for free"
                        >
                            Get Started Free
                            <ArrowRight size={15} />
                        </Link>
                        <Link
                            to="/demo"
                            className="proofly-hero__btn-ghost"
                            aria-label="Watch a product demo"
                        >
                            <PlayIcon size={14} />
                            Watch Demo
                        </Link>
                    </div>
                    <div className="proofly-hero__proof" role="complementary" aria-label="Social proof">
                        <AvatarStack />
                        <p className="proofly-hero__proof-text">
                            Trusted by <strong>2,400+</strong> founders
                        </p>
                        <div className="proofly-hero__proof-divider" aria-hidden="true" />
                        <StarRating rating={5} />
                        <p className="proofly-hero__proof-text">
                            <strong>4.9 / 5</strong> avg. rating
                        </p>
                    </div>
                </div>
                {/* <div className="proofly-hero__scroll-hint" aria-hidden="true">
                    <span className="proofly-hero__scroll-label">Scroll</span>
                    <div className="proofly-hero__scroll-line" />
                </div> */}
            </section>
        </>
    );
}