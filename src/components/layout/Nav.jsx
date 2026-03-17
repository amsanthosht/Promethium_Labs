import { NavLink, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const serviceSubLinks = [
  { to: "/services", label: "Software / Web Dev" },
  { to: "/services/digital-marketing", label: "Digital Marketing" },
];

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", hasDropdown: true },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const DARK_BG_ROUTES = ["/services", "/careers", "/projects"];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();

  const isDarkPage = DARK_BG_ROUTES.some((r) => location.pathname.startsWith(r));

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navBg = isDarkPage
    ? scrolled ? "rgba(13,13,8,0.95)" : "transparent"
    : scrolled ? "#f4efe6" : "transparent";

  const textColor = isDarkPage ? "#f4efe6" : "#0d0d08";
  const burgerColor = menuOpen ? "#f4efe6" : textColor;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 w-full pointer-events-none transition-all duration-300"
        style={{
          background: menuOpen ? "#0d0d08" : navBg,
          backdropFilter: (!menuOpen && scrolled) ? "blur(12px)" : "none",
          borderBottom: scrolled && !menuOpen
            ? isDarkPage
              ? "1px solid rgba(244,239,230,0.08)"
              : "1px solid rgba(13,13,8,0.1)"
            : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 pointer-events-auto max-md:px-5">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-sans font-black text-lg tracking-[-0.03em] transition-colors duration-200 relative z-[60]"
            style={{ color: menuOpen ? "#f4efe6" : textColor }}
          >
            Promethium<span style={{ color: "#10b981" }}>.</span>Labs
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden gap-10 md:flex items-center">
            {links.map((link) =>
              link.hasDropdown ? (
                <div key={link.to} className="relative" ref={servicesRef}>
                  <button
                    className={[
                      "nav-link text-[0.78rem] font-sans font-medium tracking-[0.02em] transition-colors duration-200 flex items-center gap-1",
                      location.pathname.startsWith("/services") ? "active" : "",
                    ].join(" ")}
                    style={{
                      color: location.pathname.startsWith("/services")
                        ? isDarkPage ? "#f4efe6" : "#0d0d08"
                        : isDarkPage ? "rgba(244,239,230,0.55)" : "#7a7468",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => setServicesOpen((o) => !o)}
                    aria-expanded={servicesOpen}
                  >
                    {link.label}
                    <span
                      style={{
                        display: "inline-block",
                        transition: "transform 0.2s ease",
                        transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                        fontSize: "0.6rem",
                        opacity: 0.6,
                        marginLeft: "2px",
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Dropdown */}
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: servicesOpen
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-8px)",
                      background: "#111109",
                      border: "1px solid rgba(244,239,230,0.1)",
                      borderTop: "2px solid #10b981",
                      minWidth: "200px",
                      opacity: servicesOpen ? 1 : 0,
                      pointerEvents: servicesOpen ? "auto" : "none",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                      zIndex: 100,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                    }}
                  >
                    {serviceSubLinks.map((sub, idx) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        onClick={() => setServicesOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "11px 18px",
                          fontSize: "0.78rem",
                          fontFamily: "inherit",
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                          color: location.pathname === sub.to ? "#10b981" : "rgba(244,239,230,0.65)",
                          borderBottom: idx < serviceSubLinks.length - 1 ? "1px solid rgba(244,239,230,0.06)" : "none",
                          transition: "color 0.15s ease, background 0.15s ease",
                          textDecoration: "none",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#10b981";
                          e.currentTarget.style.background = "rgba(16,185,129,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = location.pathname === sub.to ? "#10b981" : "rgba(244,239,230,0.65)";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    ["nav-link text-[0.78rem] font-sans font-medium tracking-[0.02em] transition-colors duration-200", isActive ? "active" : ""].join(" ")
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? isDarkPage ? "#f4efe6" : "#0d0d08"
                      : isDarkPage ? "rgba(244,239,230,0.55)" : "#7a7468",
                  })}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <NavLink
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 text-[0.72rem] font-sans font-bold tracking-[0.1em] uppercase px-5 py-[0.65rem] transition-all duration-300"
            style={{ background: "#10b981", color: "#0d0d08" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
          >
            Work With Us →
          </NavLink>

          {/* Mobile Hamburger */}
          <button
            className="relative z-[60] flex md:hidden flex-col justify-center items-center w-10 h-10 gap-0 pointer-events-auto"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block h-[1.5px] w-6 transition-all duration-300 origin-center"
              style={{
                background: burgerColor,
                transform: menuOpen ? "translateY(3px) rotate(45deg)" : "translateY(-3px)",
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                background: burgerColor,
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all duration-300 origin-center"
              style={{
                background: burgerColor,
                transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "translateY(3px)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile Fullscreen Menu Overlay ──────────────── */}
      <div
        className="fixed inset-0 z-40 flex flex-col md:hidden"
        style={{
          background: "#0d0d08",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Nav links — large and centered */}
        <div className="flex flex-col justify-center flex-1 px-8 pt-24 pb-12 gap-0">
          {links.map((link, i) =>
            link.hasDropdown ? (
              <div key={link.to}>
                <NavLink
                  to={link.to}
                  className="group flex items-baseline justify-between py-5"
                  style={{
                    borderBottom: "1px solid rgba(244,239,230,0.06)",
                    transitionDelay: menuOpen ? `${i * 0.06 + 0.1}s` : "0s",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="font-sans font-black tracking-[-0.03em] transition-colors duration-200"
                        style={{
                          fontSize: "clamp(2rem, 8vw, 3.5rem)",
                          color: isActive ? "#10b981" : "#f4efe6",
                        }}
                      >
                        {link.label}
                      </span>
                      <span
                        className="text-xl transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{ color: "rgba(244,239,230,0.2)" }}
                      >
                        ↗
                      </span>
                    </>
                  )}
                </NavLink>
                {/* Sub-links */}
                <div style={{ paddingLeft: "1rem", borderBottom: "1px solid rgba(244,239,230,0.04)" }}>
                  {serviceSubLinks.slice(1).map((sub, si) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 0",
                        fontSize: "0.85rem",
                        fontFamily: "sans-serif",
                        color: location.pathname === sub.to ? "#10b981" : "rgba(244,239,230,0.45)",
                        textDecoration: "none",
                        transitionDelay: menuOpen ? `${(i + si + 1) * 0.06 + 0.1}s` : "0s",
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                      }}
                    >
                      ↳ {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="group flex items-baseline justify-between py-5"
                style={{
                  borderBottom: "1px solid rgba(244,239,230,0.06)",
                  transitionDelay: menuOpen ? `${i * 0.06 + 0.1}s` : "0s",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="font-sans font-black tracking-[-0.03em] transition-colors duration-200"
                      style={{
                        fontSize: "clamp(2rem, 8vw, 3.5rem)",
                        color: isActive ? "#10b981" : "#f4efe6",
                      }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="text-xl transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: "rgba(244,239,230,0.2)" }}
                    >
                      ↗
                    </span>
                  </>
                )}
              </NavLink>
            )
          )}
        </div>

        {/* CTA footer inside menu */}
        <div className="px-8 pb-10" style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }}>
          <NavLink
            to="/contact"
            className="mt-8 flex items-center justify-center gap-3 font-sans font-bold text-[0.8rem] tracking-[0.12em] uppercase py-4 w-full transition-all duration-300"
            style={{
              background: "#10b981",
              color: "#0d0d08",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease 0.4s, transform 0.4s ease 0.4s, background 0.2s ease",
            }}
            onClick={() => setMenuOpen(false)}
            onTouchStart={(e) => (e.currentTarget.style.background = "#059669")}
            onTouchEnd={(e) => (e.currentTarget.style.background = "#10b981")}
          >
            Work With Us →
          </NavLink>
          <p
            className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.2em]"
            style={{ color: "rgba(244,239,230,0.2)" }}
          >
            © 2025 Promethium Labs
          </p>
        </div>
      </div>
    </>
  );
};

export default Nav;
