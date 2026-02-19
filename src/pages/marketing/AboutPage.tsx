import React from "react";
import { Link } from "react-router-dom";
import {
  colors,
  cardStyle,
  primaryButtonStyle,
  sectionTitleStyle,
  containerStyle,
} from "../../styles/ui";

const values = [
  {
    icon: "✂️",
    title: "Precision First",
    desc: "Every fade, line, and detail is approached with surgical care. Good is never good enough.",
  },
  {
    icon: "🤝",
    title: "Respect & Relationship",
    desc: "Clients aren't transactions. We learn your preferences and take time to know you.",
  },
  {
    icon: "🕐",
    title: "Your Time Matters",
    desc: "We run on schedule. Online booking keeps things smooth and stress-free.",
  },
  {
    icon: "🏆",
    title: "Consistency",
    desc: "Walk in expecting greatness every single time — that's the Swarv promise.",
  },
];

export function AboutPage() {
  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* Page header */}
      <section style={pageHeaderStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <p style={pageTagStyle}>The Story</p>
          <h1 style={{ ...sectionTitleStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            About Swarv Studio
          </h1>
        </div>
      </section>

      {/* Bio section */}
      <section style={bioSectionStyle}>
        <div style={containerStyle}>
          <div style={bioGridStyle}>
            {/* Avatar placeholder */}
            <div style={avatarBlockStyle}>
              <div style={avatarStyle}>
                <span style={avatarInitialsStyle}>EJ</span>
              </div>
              <div style={{ ...cardStyle, marginTop: "1rem", textAlign: "center" }}>
                <p style={barberNameStyle}>Errol Jones</p>
                <p style={barberTitleStyle}>Owner & Master Barber</p>
                <p style={barberTagStyle}>Swarv Studio</p>
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 style={{ ...sectionTitleStyle, marginBottom: "1.25rem" }}>
                Crafting Confidence,<br />
                <span style={{ color: colors.accent }}>One Cut at a Time</span>
              </h2>
              <p style={bioParaStyle}>
                Errol Jones has spent over 8 years mastering the art of barbering, building a reputation
                across Los Angeles for clean fades, precise lineups, and an unmatched eye for detail.
                What started as a passion became a profession — and that passion shows in every cut.
              </p>
              <p style={bioParaStyle}>
                Swarv Studio isn't just a barbershop. It's a space where clients feel comfortable,
                respected, and leave looking and feeling their best. The vibe is professional but
                welcoming, and the standard is always high.
              </p>
              <p style={bioParaStyle}>
                Whether you're coming in for a clean shape-up before a big event or a regular maintenance
                fade, Errol brings the same dedication every single time. No rushing, no shortcuts.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/auth/login?mode=client" style={primaryButtonStyle}>
                  Book with Errol
                </Link>
                <Link to="/services" style={outlineBtn}>
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={valuesSectionStyle}>
        <div style={containerStyle}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={sectionTitleStyle}>The Swarv Standard</h2>
            <p style={{ color: colors.textMuted, fontSize: "1rem", marginTop: "0.5rem" }}>
              What you can always expect when you sit in the chair.
            </p>
          </div>
          <div style={valuesGridStyle}>
            {values.map((v) => (
              <div key={v.title} style={{ ...cardStyle, ...valueCardStyle }}>
                <span style={valueIconStyle}>{v.icon}</span>
                <h3 style={valueTitleStyle}>{v.title}</h3>
                <p style={valueDescStyle}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: "4rem 1.25rem", backgroundColor: colors.surface }}>
        <div style={containerStyle}>
          <div style={credsGridStyle}>
            {[
              { stat: "8+", label: "Years of Experience" },
              { stat: "500+", label: "Happy Clients" },
              { stat: "100%", label: "Satisfaction Guaranteed" },
              { stat: "5★", label: "Google Rating" },
            ].map((c) => (
              <div key={c.label} style={credItemStyle}>
                <span style={credStatStyle}>{c.stat}</span>
                <span style={{ color: colors.textMuted, fontSize: "0.85rem", textAlign: "center" }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const pageHeaderStyle: React.CSSProperties = {
  padding: "5rem 1.25rem 3rem",
  background: `linear-gradient(135deg, #0f1f3d 0%, ${colors.bg} 100%)`,
  borderBottom: `1px solid ${colors.border}`,
};

const pageTagStyle: React.CSSProperties = {
  color: colors.accent,
  fontWeight: 700,
  fontSize: "0.78rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  margin: "0 0 0.75rem",
};

const bioSectionStyle: React.CSSProperties = {
  padding: "5rem 1.25rem",
};

const bioGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "300px 1fr",
  gap: "4rem",
  alignItems: "start",
};

const avatarBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const avatarStyle: React.CSSProperties = {
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.primary} 0%, #1e3a6e 100%)`,
  border: `3px solid ${colors.accent}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const avatarInitialsStyle: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: 900,
  color: colors.white,
  letterSpacing: "0.05em",
};

const barberNameStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 800,
  fontSize: "1.1rem",
  margin: "0 0 0.2rem",
};

const barberTitleStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.85rem",
  margin: "0 0 0.2rem",
};

const barberTagStyle: React.CSSProperties = {
  color: colors.accent,
  fontSize: "0.8rem",
  fontWeight: 700,
  margin: 0,
};

const bioParaStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.975rem",
  lineHeight: 1.75,
  marginBottom: "1rem",
};

const outlineBtn: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "transparent",
  color: colors.text,
  padding: "0.75rem 1.75rem",
  borderRadius: "999px",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  textDecoration: "none",
  border: `1px solid ${colors.borderMid}`,
};

const valuesSectionStyle: React.CSSProperties = {
  padding: "5rem 1.25rem",
  backgroundColor: colors.bg,
};

const valuesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1.25rem",
};

const valueCardStyle: React.CSSProperties = {
  textAlign: "center",
};

const valueIconStyle: React.CSSProperties = {
  fontSize: "2rem",
  display: "block",
  marginBottom: "0.75rem",
};

const valueTitleStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "1rem",
  margin: "0 0 0.5rem",
};

const valueDescStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.875rem",
  margin: 0,
  lineHeight: 1.6,
};

const credsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "2rem",
  textAlign: "center",
};

const credItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
};

const credStatStyle: React.CSSProperties = {
  fontSize: "2.25rem",
  fontWeight: 900,
  color: colors.accent,
};
