import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   Design tokens — shared with Hero palette
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --color-void:        #0a0812;
    --color-deep:        #110d24;
    --color-plum:        #1e1542;
    --color-violet:      #3d2b8e;
    --color-iris:        #5b3fd4;
    --color-lavender:    #8b6ff5;
    --color-mist:        #c4b5fd;
    --color-frost:       #ede9fe;
    --color-white:       #faf9ff;

    --grad-brand:        linear-gradient(135deg, #5b3fd4 0%, #8b6ff5 60%, #d8b4fe 100%);

    --font-display:      'DM Serif Display', Georgia, serif;
    --font-ui:           'Syne', sans-serif;
    --font-body:         'DM Sans', sans-serif;

    --nav-height:        68px;
    --nav-height-mobile: 60px;

    --ease-out-expo:     cubic-bezier(0.19, 1, 0.22, 1);
    --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Reset ── */
  .pf-nav *,
  .pf-nav *::before,
  .pf-nav *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ─────────────────────────────────────────────
     Navbar shell
  ───────────────────────────────────────────── */
  .pf-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9000;
    height: var(--nav-height);
    display: flex;
    align-items: center;

    /* Transparent on mount; fills in on scroll via JS class */
    background: transparent;
    transition:
      background 0.45s var(--ease-out-expo),
      box-shadow 0.45s var(--ease-out-expo),
      border-color 0.45s var(--ease-out-expo);
    border-bottom: 1px solid transparent;
  }

  /* Scrolled state */
  .pf-nav--scrolled {
    background: rgba(10, 8, 18, 0.72);
    backdrop-filter: blur(18px) saturate(1.4);
    -webkit-backdrop-filter: blur(18px) saturate(1.4);
    box-shadow: 0 1px 0 rgba(139,111,245,0.12), 0 4px 24px rgba(0,0,0,0.4);
    border-bottom-color: rgba(139,111,245,0.1);
  }

  /* Mobile menu open */
  .pf-nav--open {
    background: rgba(10, 8, 18, 0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom-color: rgba(139,111,245,0.15);
  }

  /* ── Inner layout ── */
  .pf-nav__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  /* ─────────────────────────────────────────────
     Logo
  ───────────────────────────────────────────── */
  .pf-nav__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    flex-shrink: 0;

    /* Entrance */
    opacity: 0;
    transform: translateX(-10px);
    animation: navFadeIn 0.6s var(--ease-out-expo) 0.05s forwards;
  }

  .pf-nav__logo-mark {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: var(--grad-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 1px rgba(139,111,245,0.3), 0 4px 16px rgba(91,63,212,0.4);
    transition: box-shadow 0.3s ease, transform 0.3s var(--ease-spring);
  }

  .pf-nav__logo:hover .pf-nav__logo-mark {
    box-shadow: 0 0 0 1px rgba(196,181,253,0.4), 0 6px 24px rgba(91,63,212,0.6);
    transform: rotate(-4deg) scale(1.08);
  }

  .pf-nav__logo-mark svg {
    width: 16px;
    height: 16px;
    color: var(--color-white);
  }

  .pf-nav__logo-text {
    font-family: var(--font-ui);
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--color-white);
    transition: color 0.2s ease;
  }

  .pf-nav__logo:hover .pf-nav__logo-text {
    color: var(--color-mist);
  }

  /* ─────────────────────────────────────────────
     Desktop nav links
  ───────────────────────────────────────────── */
  .pf-nav__links {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 0.25rem;

    opacity: 0;
    animation: navFadeIn 0.6s var(--ease-out-expo) 0.15s forwards;
  }

  .pf-nav__link {
    position: relative;
    display: inline-block;
  }

  .pf-nav__link a {
    display: block;
    padding: 0.45rem 0.9rem;
    font-family: var(--font-ui);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: rgba(196,181,253,0.65);
    text-decoration: none;
    border-radius: 8px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .pf-nav__link a:hover {
    color: var(--color-frost);
    background: rgba(139,111,245,0.08);
  }

  .pf-nav__link a:focus-visible {
    outline: 2px solid rgba(139,111,245,0.6);
    outline-offset: 2px;
  }

  /* Active state */
  .pf-nav__link--active a {
    color: var(--color-mist);
  }

  /* Animated underline indicator */
  .pf-nav__link--active a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 2px;
    border-radius: 999px;
    background: var(--grad-brand);
  }

  /* ── Pill indicator that glides between items ── */
  .pf-nav__pill {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    background: rgba(139,111,245,0.1);
    pointer-events: none;
    z-index: -1;
    transition: transform 0.35s var(--ease-out-expo), width 0.35s var(--ease-out-expo), opacity 0.2s ease;
    opacity: 0;
  }

  .pf-nav__links:hover .pf-nav__pill {
    opacity: 1;
  }

  /* ─────────────────────────────────────────────
     Right-side actions
  ───────────────────────────────────────────── */
  .pf-nav__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    opacity: 0;
    animation: navFadeIn 0.6s var(--ease-out-expo) 0.25s forwards;
  }

  /* Login — ghost link */
  .pf-nav__btn-login {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 1rem;
    border-radius: 8px;
    font-family: var(--font-ui);
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(196,181,253,0.7);
    text-decoration: none;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .pf-nav__btn-login:hover,
  .pf-nav__btn-login:focus-visible {
    color: var(--color-frost);
    background: rgba(139,111,245,0.08);
    outline: none;
  }

  /* CTA — gradient pill */
  .pf-nav__btn-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    background: var(--grad-brand);
    background-size: 200% 200%;
    background-position: 0% 50%;
    font-family: var(--font-ui);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--color-white);
    text-decoration: none;
    box-shadow:
      0 0 0 1px rgba(139,111,245,0.3),
      0 2px 12px rgba(91,63,212,0.4);
    transition:
      background-position 0.5s var(--ease-out-expo),
      box-shadow 0.3s ease,
      transform 0.25s var(--ease-spring);
  }

  .pf-nav__btn-cta:hover,
  .pf-nav__btn-cta:focus-visible {
    background-position: 100% 50%;
    box-shadow:
      0 0 0 1px rgba(196,181,253,0.35),
      0 4px 24px rgba(91,63,212,0.55);
    transform: translateY(-1px) scale(1.03);
    outline: none;
  }

  .pf-nav__btn-cta:active {
    transform: scale(0.97);
  }

  /* ─────────────────────────────────────────────
     Hamburger button (mobile)
  ───────────────────────────────────────────── */
  .pf-nav__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(139,111,245,0.2);
    background: rgba(30,21,66,0.3);
    backdrop-filter: blur(8px);
    cursor: pointer;
    gap: 5px;
    padding: 0;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .pf-nav__hamburger:hover {
    background: rgba(61,43,142,0.4);
    border-color: rgba(139,111,245,0.4);
  }

  .pf-nav__hamburger:focus-visible {
    outline: 2px solid rgba(139,111,245,0.6);
    outline-offset: 2px;
  }

  .pf-nav__bar {
    display: block;
    width: 18px;
    height: 1.5px;
    border-radius: 999px;
    background: var(--color-mist);
    transition: transform 0.35s var(--ease-out-expo), opacity 0.25s ease, width 0.3s ease;
    transform-origin: center;
  }

  /* Hamburger → X morphing */
  .pf-nav__hamburger[aria-expanded="true"] .pf-nav__bar:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  .pf-nav__hamburger[aria-expanded="true"] .pf-nav__bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .pf-nav__hamburger[aria-expanded="true"] .pf-nav__bar:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* ─────────────────────────────────────────────
     Mobile drawer
  ───────────────────────────────────────────── */
  .pf-nav__drawer {
    position: fixed;
    top: var(--nav-height-mobile);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10,8,18,0.97);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem 3rem;
    gap: 0.25rem;
    z-index: 8999;

    /* Hidden by default */
    opacity: 0;
    transform: translateY(-12px);
    pointer-events: none;
    transition:
      opacity 0.35s var(--ease-out-expo),
      transform 0.35s var(--ease-out-expo);
    border-top: 1px solid rgba(139,111,245,0.12);
  }

  .pf-nav__drawer--open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .pf-nav__drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.75rem;
    font-family: var(--font-ui);
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(196,181,253,0.7);
    text-decoration: none;
    border-radius: 10px;
    border-bottom: 1px solid rgba(139,111,245,0.07);
    transition: color 0.2s ease, background 0.2s ease, padding-left 0.2s ease;
  }

  .pf-nav__drawer-link:hover,
  .pf-nav__drawer-link:focus-visible {
    color: var(--color-frost);
    background: rgba(139,111,245,0.08);
    padding-left: 1.25rem;
    outline: none;
  }

  .pf-nav__drawer-link--active {
    color: var(--color-mist);
  }

  .pf-nav__drawer-link svg {
    opacity: 0.4;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .pf-nav__drawer-link:hover svg {
    opacity: 0.8;
    transform: translateX(3px);
  }

  /* Drawer CTA */
  .pf-nav__drawer-cta {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 2rem;
  }

  .pf-nav__drawer-btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.9rem 1.5rem;
    border-radius: 999px;
    background: var(--grad-brand);
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-white);
    text-decoration: none;
    box-shadow: 0 4px 24px rgba(91,63,212,0.45);
    transition: transform 0.2s var(--ease-spring), box-shadow 0.2s ease;
  }

  .pf-nav__drawer-btn-primary:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 32px rgba(91,63,212,0.6);
  }

  .pf-nav__drawer-btn-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    border: 1px solid rgba(139,111,245,0.25);
    background: rgba(30,21,66,0.3);
    font-family: var(--font-ui);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-mist);
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .pf-nav__drawer-btn-secondary:hover {
    background: rgba(61,43,142,0.35);
    border-color: rgba(139,111,245,0.45);
  }

  /* Drawer border accent line */
  .pf-nav__drawer-accent {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,111,245,0.3), transparent);
    margin: 0 -0.75rem;
  }

  /* ─────────────────────────────────────────────
     Animations
  ───────────────────────────────────────────── */
  @keyframes navFadeIn {
    to { opacity: 1; transform: translateX(0) translateY(0); }
  }

  /* ─────────────────────────────────────────────
     Responsive breakpoints
  ───────────────────────────────────────────── */
  @media (max-width: 768px) {
    .pf-nav {
      height: var(--nav-height-mobile);
    }

    .pf-nav__inner {
      padding: 0 1.25rem;
    }

    .pf-nav__links,
    .pf-nav__btn-login,
    .pf-nav__btn-cta {
      display: none;
    }

    .pf-nav__hamburger {
      display: flex;
    }
  }

  /* ─────────────────────────────────────────────
     Accessibility
  ───────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .pf-nav,
    .pf-nav *,
    .pf-nav *::before,
    .pf-nav *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ─────────────────────────────────────────────
   Nav link config
───────────────────────────────────────────── */
const NAV_LINKS = [
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

/* ─────────────────────────────────────────────
   Small icon components (no external dep)
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Gliding pill — tracks hovered nav item
───────────────────────────────────────────── */
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

    // Attach listeners to <li> elements
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const items = list.querySelectorAll("li");
        items.forEach(item => item.addEventListener("mouseenter", handleMouseEnter));
        return () => items.forEach(item => item.removeEventListener("mouseenter", handleMouseEnter));
    }, [listRef, handleMouseEnter]);

    return <div ref={pillRef} className="pf-nav__pill" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   Navbar component
───────────────────────────────────────────── */
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const listRef = useRef(null);
    const navRef = useRef(null);

    /* Scroll listener → scrolled state */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Close drawer on route change */
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    /* Lock body scroll when drawer is open */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    /* Close drawer on Escape */
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
            <style>{styles}</style>

            <header role="banner">
                <nav
                    ref={navRef}
                    className={navClass}
                    aria-label="Main navigation"
                >
                    <div className="pf-nav__inner">

                        {/* ── Logo ── */}
                        <Link
                            to="/"
                            className="pf-nav__logo"
                            aria-label="Proofly — go to homepage"
                        >
                            {/* <div className="pf-nav__logo-mark" aria-hidden="true">
                                <LogoMark />
                            </div> */}
                            <span className="pf-nav__logo-text">Proofly</span>
                        </Link>

                        {/* ── Desktop links ── */}
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

                        {/* ── Desktop actions ── */}
                        <div className="pf-nav__actions">
                            <Link
                                to="/login"
                                className="pf-nav__btn-login"
                                aria-label="Log in to your account"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="pf-nav__btn-cta"
                                aria-label="Get started with Proofly for free"
                            >
                                Get Started
                                <ArrowRight size={13} />
                            </Link>
                        </div>

                        {/* ── Hamburger (mobile) ── */}
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

                {/* ── Mobile drawer ── */}
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
                            to="/signup"
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