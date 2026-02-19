import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { colors, containerStyle } from "../styles/ui";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav style={navWrapStyle}>
      <div
        style={{
          ...containerStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={logoStyle} onClick={() => setOpen(false)}>
          <span style={{ color: colors.accent }}>Swarv</span>
          <span style={{ color: colors.text }}>Studio</span>
        </Link>

        {/* Desktop links – hidden on mobile via injected CSS class */}
        <div className="site-nav-desktop" style={desktopLinksStyle}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} style={linkStyle(pathname === l.to)}>
              {l.label}
            </Link>
          ))}
          <Link to="/auth/login?mode=client" style={bookBtnStyle}>
            Book Now
          </Link>
        </div>

        {/* Hamburger – shown only on mobile via injected CSS class */}
        <button
          className="site-nav-hamburger"
          style={hamburgerStyle}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span style={barStyle} />
          <span style={barStyle} />
          <span style={barStyle} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={drawerStyle}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={mobileLinkStyle(pathname === l.to)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/auth/login?mode=client"
            style={mobileBookBtnStyle}
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const navWrapStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  backgroundColor: colors.surface,
  borderBottom: `1px solid ${colors.border}`,
};

const logoStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  fontWeight: 900,
  textDecoration: "none",
  letterSpacing: "0.03em",
};

const desktopLinksStyle: React.CSSProperties = {
  alignItems: "center",
  gap: "0.25rem",
};

const linkStyle = (active: boolean): React.CSSProperties => ({
  color: active ? colors.accent : colors.textMuted,
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.9rem",
  padding: "0.4rem 0.75rem",
  borderRadius: "0.375rem",
});

const bookBtnStyle: React.CSSProperties = {
  marginLeft: "0.5rem",
  backgroundColor: colors.primary,
  color: colors.white,
  padding: "0.5rem 1.25rem",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: "0.875rem",
  textDecoration: "none",
};

const hamburgerStyle: React.CSSProperties = {
  flexDirection: "column",
  gap: "5px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0.25rem",
};

const barStyle: React.CSSProperties = {
  display: "block",
  width: "22px",
  height: "2px",
  backgroundColor: colors.text,
  borderRadius: "2px",
};

const drawerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "1rem 1.25rem 1.5rem",
  backgroundColor: colors.surface,
  borderBottom: `1px solid ${colors.border}`,
};

const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
  color: active ? colors.accent : colors.text,
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1rem",
  padding: "0.75rem 0",
  borderBottom: `1px solid ${colors.border}`,
});

const mobileBookBtnStyle: React.CSSProperties = {
  marginTop: "1rem",
  backgroundColor: colors.primary,
  color: colors.white,
  padding: "0.75rem 1.25rem",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: "1rem",
  textDecoration: "none",
  textAlign: "center",
};
