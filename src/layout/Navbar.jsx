import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/Navbar.css"

const NAV_LINKS = [
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];
function LogoMark() {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
            <path
                d="M3 2h7a3 3 0 0 1 0 6H6v6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowRight({ size = 14 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
            <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ChevronRight({ size = 14 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function GlidePill({ listRef }) {
    const pillRef = useRef(null);
    const handleMouseEnter = useCallback((e) => {
        const pill = pillRef.current;
        const list = listRef.current;
        if (!pill || !list) return;
        const listRect = list.getBoundingClientRect();
        const itemRect = e.currentTarget.getBoundingClientRect();
        pill.style.width = `${itemRect.width}px`;
        pill.style.height = `${itemRect.height}px`;
        pill.style.transform = `translate(${itemRect.left - listRect.left}px, ${itemRect.top - listRect.top}px)`;
    }, [listRef]);
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const items = list.querySelectorAll("li");
        items.forEach(item => item.addEventListener("mouseenter", handleMouseEnter));
        return () => items.forEach(item => item.removeEventListener("mouseenter", handleMouseEnter));
    }, [listRef, handleMouseEnter]);

    return <div ref={pillRef} className="pf-nav__pill" aria-hidden="true" />;
}
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const listRef = useRef(null);
    const navRef = useRef(null);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);
    const isActive = (path) =>
        path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
    const navClass = [
        "pf-nav",
        scrolled || menuOpen ? "pf-nav--scrolled" : "",
        menuOpen ? "pf-nav--open" : "",
    ].filter(Boolean).join(" ");
    return (
        <>
            <header role="banner">
                <nav
                    ref={navRef}
                    className={navClass}
                    aria-label="Main navigation"
                >
                    <div className="pf-nav__inner">
                        <Link
                            to="/"
                            className="pf-nav__logo"
                            aria-label="Proofly — go to homepage"
                        >
                            <span className="pf-nav__logo-text">Proofly</span>
                        </Link>
                        <ul
                            ref={listRef}
                            className="pf-nav__links"
                            role="list"
                        >
                            <GlidePill listRef={listRef} />
                            {NAV_LINKS.map(({ to, label }) => (
                                <li
                                    key={to}
                                    className={`pf-nav__link ${isActive(to) ? "pf-nav__link--active" : ""}`}
                                >
                                    <Link
                                        to={to}
                                        aria-current={isActive(to) ? "page" : undefined}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pf-nav__actions">
                            <Link
                                to="/login"
                                className="pf-nav__btn-login"
                                aria-label="Log in to your account"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="pf-nav__btn-cta"
                                aria-label="Get started with Proofly for free"
                            >
                                Get Started
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                        <button
                            className="pf-nav__hamburger"
                            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-drawer"
                            onClick={() => setMenuOpen(prev => !prev)}
                        >
                            <span className="pf-nav__bar" />
                            <span className="pf-nav__bar" />
                            <span className="pf-nav__bar" />
                        </button>
                    </div>
                </nav>
                <div
                    id="mobile-drawer"
                    className={`pf-nav__drawer ${menuOpen ? "pf-nav__drawer--open" : ""}`}
                    aria-hidden={!menuOpen}
                    role="dialog"
                    aria-label="Navigation menu"
                >
                    {NAV_LINKS.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`pf-nav__drawer-link ${isActive(to) ? "pf-nav__drawer-link--active" : ""}`}
                            aria-current={isActive(to) ? "page" : undefined}
                            tabIndex={menuOpen ? 0 : -1}
                        >
                            {label}
                            <ChevronRight size={14} />
                        </Link>
                    ))}
                    <div className="pf-nav__drawer-accent" aria-hidden="true" />
                    <div className="pf-nav__drawer-cta">
                        <Link
                            to="/register"
                            className="pf-nav__drawer-btn-primary"
                            tabIndex={menuOpen ? 0 : -1}
                            aria-label="Get started with Proofly for free"
                        >
                            Get Started Free
                            <ArrowRight size={14} />
                        </Link>
                        <Link
                            to="/login"
                            className="pf-nav__drawer-btn-secondary"
                            tabIndex={menuOpen ? 0 : -1}
                            aria-label="Log in to your account"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}