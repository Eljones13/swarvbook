import React from "react";
import { Link } from "react-router-dom";
import { colors, containerStyle } from "../styles/ui";

export function SiteFooter() {
  return (
    <footer style={footerWrapStyle}>
      <div style={{ ...containerStyle, ...footerInnerStyle }}>
        {/* Brand */}
        <div style={colStyle}>
          <p style={brandStyle}>
            <span style={{ color: colors.accent }}>Swarv</span>
            <span style={{ color: colors.text }}>Studio</span>
          </p>
          <p style={taglineStyle}>Premium cuts. Elevated style.</p>
          <p style={addressStyle}>
            📍 123 Barber Lane, Suite 4<br />
            Los Angeles, CA 90001
          </p>
        </div>

        {/* Quick links */}
        <div style={colStyle}>
          <p style={colHeadStyle}>Quick Links</p>
          {[
            { label: "Home", to: "/" },
            { label: "Services", to: "/services" },
            { label: "Gallery", to: "/gallery" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ].map((l) => (
            <Link key={l.to} to={l.to} style={footerLinkStyle}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hours */}
        <div style={colStyle}>
          <p style={colHeadStyle}>Hours</p>
          {[
            { day: "Mon – Fri", hours: "9:00 AM – 7:00 PM" },
            { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
            { day: "Sunday", hours: "Closed" },
          ].map((h) => (
            <div key={h.day} style={hoursRowStyle}>
              <span style={{ color: colors.textMuted, fontSize: "0.85rem" }}>{h.day}</span>
              <span style={{ color: colors.text, fontSize: "0.85rem" }}>{h.hours}</span>
            </div>
          ))}
        </div>

        {/* Book CTA */}
        <div style={colStyle}>
          <p style={colHeadStyle}>Ready for a Fresh Cut?</p>
          <p style={{ color: colors.textMuted, fontSize: "0.85rem", marginBottom: "1rem" }}>
            Book your appointment with Errol Jones online in seconds.
          </p>
          <Link to="/auth/login?mode=client" style={footerBookBtnStyle}>
            Book Now
          </Link>
        </div>
      </div>

      <div style={copyrightStyle}>
        <p style={{ margin: 0, color: colors.textDim, fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} Swarv Studio · All rights reserved
        </p>
      </div>
    </footer>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const footerWrapStyle: React.CSSProperties = {
  backgroundColor: colors.surface,
  borderTop: `1px solid ${colors.border}`,
  paddingTop: "3rem",
};

const footerInnerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "2.5rem",
  paddingBottom: "2.5rem",
};

const colStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const brandStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  fontWeight: 900,
  letterSpacing: "0.03em",
  margin: "0 0 0.25rem",
};

const taglineStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.85rem",
  margin: "0 0 1rem",
};

const addressStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.85rem",
  lineHeight: 1.7,
  margin: 0,
};

const colHeadStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "0.9rem",
  marginBottom: "0.75rem",
  marginTop: 0,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const footerLinkStyle: React.CSSProperties = {
  color: colors.textMuted,
  textDecoration: "none",
  fontSize: "0.875rem",
  marginBottom: "0.4rem",
};

const hoursRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.4rem",
  gap: "0.5rem",
};

const footerBookBtnStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: colors.primary,
  color: colors.white,
  padding: "0.65rem 1.5rem",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: "0.875rem",
  textDecoration: "none",
  alignSelf: "flex-start",
};

const copyrightStyle: React.CSSProperties = {
  borderTop: `1px solid ${colors.border}`,
  padding: "1.25rem 1.25rem",
  textAlign: "center",
};
