import React from "react";
import { Link } from "react-router-dom";
import { colors, containerStyle } from "../styles/ui";

// ─── Real hours ───────────────────────────────────────────────────────────────
const HOURS = [
  { day: "Mon / Tue", hours: "Closed" },
  { day: "Wed / Thu", hours: "10am – 8pm" },
  { day: "Friday", hours: "9am – 8pm" },
  { day: "Saturday", hours: "9am – 6pm" },
  { day: "Sunday", hours: "Closed" },
];

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
          <p style={taglineStyle}>Professional grooming services · Appointment-only setting</p>
          <p style={addressStyle}>
            📍 92 Harwood Street, Unit 8<br />
            Sheffield S2 4SE<br />
            <span style={{ color: colors.textDim, fontSize: "0.8rem" }}>
              Opposite Sheffield United Stadium
            </span>
          </p>
          <a href="tel:07577378237" style={phoneStyle}>
            📞 07577 378237
          </a>
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
          <Link to="/auth/login?mode=client" style={{ ...footerLinkStyle, color: colors.accent, fontWeight: 600 }}>
            Book Appointment
          </Link>
        </div>

        {/* Hours */}
        <div style={colStyle}>
          <p style={colHeadStyle}>Opening Hours</p>
          {HOURS.map((h) => (
            <div key={h.day} style={hoursRowStyle}>
              <span style={{ color: colors.textMuted, fontSize: "0.82rem" }}>{h.day}</span>
              <span style={{
                color: h.hours === "Closed" ? colors.textDim : colors.text,
                fontSize: "0.82rem",
                fontWeight: h.hours === "Closed" ? 400 : 600,
              }}>
                {h.hours}
              </span>
            </div>
          ))}
          <p style={apptNoteStyle}>Appointment only · No walk-ins</p>
        </div>

        {/* Book CTA */}
        <div style={colStyle}>
          <p style={colHeadStyle}>Book a Haircut</p>
          <p style={{ color: colors.textMuted, fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
            34+ years of expert barbering for Afro, Asian, and European hair types.
            Secure your slot online in seconds.
          </p>
          <Link to="/auth/login?mode=client" style={footerBookBtnStyle}>
            Book Appointment
          </Link>
          <a href="tel:07577378237" style={footerCallBtnStyle}>
            Call Now
          </a>
        </div>
      </div>

      <div style={copyrightStyle}>
        <p style={{ margin: 0, color: colors.textDim, fontSize: "0.8rem" }}>
          © 2025 Swarv Studio. All rights reserved. Expert barbershop serving Sheffield since 1991.
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
  margin: "0 0 0.3rem",
};

const taglineStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.8rem",
  margin: "0 0 0.85rem",
  lineHeight: 1.5,
};

const addressStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.85rem",
  lineHeight: 1.7,
  margin: "0 0 0.6rem",
};

const phoneStyle: React.CSSProperties = {
  color: colors.accent,
  fontSize: "0.875rem",
  fontWeight: 600,
  textDecoration: "none",
};

const colHeadStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "0.85rem",
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
  marginBottom: "0.35rem",
  gap: "0.5rem",
};

const apptNoteStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "0.75rem",
  marginTop: "0.6rem",
  borderTop: `1px solid ${colors.border}`,
  paddingTop: "0.6rem",
};

const footerBookBtnStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: colors.primary,
  color: colors.white,
  padding: "0.6rem 1.25rem",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: "0.85rem",
  textDecoration: "none",
  alignSelf: "flex-start",
  marginBottom: "0.5rem",
};

const footerCallBtnStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "transparent",
  color: colors.text,
  padding: "0.6rem 1.25rem",
  borderRadius: "999px",
  fontWeight: 600,
  fontSize: "0.85rem",
  textDecoration: "none",
  alignSelf: "flex-start",
  border: `1px solid ${colors.borderMid}`,
};

const copyrightStyle: React.CSSProperties = {
  borderTop: `1px solid ${colors.border}`,
  padding: "1.25rem",
  textAlign: "center",
};
