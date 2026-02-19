import React from "react";
import { Link } from "react-router-dom";
import {
  colors,
  cardStyle,
  primaryButtonStyle,
  sectionTitleStyle,
  containerStyle,
} from "../../styles/ui";

// ─── Highlight cards – from Swarv Studio ──────────────────────────────────────
const highlights = [
  {
    icon: "✂️",
    title: "Precision Cuts",
    desc: "Tailored to your hair type",
  },
  {
    icon: "🕐",
    title: "Punctual Service",
    desc: "We respect your time",
  },
  {
    icon: "🎓",
    title: "Expert Knowledge",
    desc: "34 years of experience",
  },
  {
    icon: "🤝",
    title: "Personal Attention",
    desc: "Appointment-only setting",
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
          <p style={pageSubStyle}>
            Sheffield's most trusted choice for specialised hair cutting expertise.
          </p>
        </div>
      </section>

      {/* Bio section */}
      <section style={bioSectionStyle}>
        <div style={containerStyle}>
          <div style={bioGridStyle}>

            {/* Avatar + card */}
            <div style={avatarBlockStyle}>
              <div style={avatarStyle}>
                <span style={avatarInitialsStyle}>EJ</span>
              </div>
              <div style={{ ...cardStyle, marginTop: "1rem", textAlign: "center" }}>
                <p style={barberNameStyle}>Errol Jones</p>
                <p style={barberTitleStyle}>Owner & Master Barber</p>
                <p style={barberTagStyle}>Swarv Studio · Sheffield</p>
              </div>

              {/* Highlight cards */}
              <div style={highlightGridStyle}>
                {highlights.map((h) => (
                  <div key={h.title} style={{ ...cardStyle, ...highlightCardStyle }}>
                    <span style={highlightIconStyle}>{h.icon}</span>
                    <div>
                      <p style={highlightTitleStyle}>{h.title}</p>
                      <p style={highlightDescStyle}>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio text */}
            <div>
              <h2 style={{ ...sectionTitleStyle, marginBottom: "1.5rem" }}>
                30+ Years of Craft,{" "}
                <span style={{ color: colors.accent }}>One Chair at a Time</span>
              </h2>

              <p style={bioParaStyle}>
                Hi! I'm Errol Jones, and I've been working as a barber for over 34 years, gathering
                extensive skills and knowledge about male grooming. Swarv Studio has been running for
                over 10 years and has built a reputation for high-quality haircuts, a friendly
                atmosphere, and exceptional attention to detail.
              </p>

              <p style={bioParaStyle}>
                As an expert barber specialising in precision cuts for Afro, Asian, and European hair
                types, I provide professional haircuts and beard grooming services in an
                appointment-only setting, ensuring personalised attention for every client.
              </p>

              <p style={bioParaStyle}>
                Each cut is tailored to your unique hair texture and style preferences. I respect your
                time with punctual service and guarantee exceptional grooming that boosts confidence
                and showcases your individual style perfectly.
              </p>

              <p style={bioDetailStyle}>
                📍 92 Harwood Street, Unit 8, Sheffield S2 4SE<br />
                Opposite Sheffield United Stadium
              </p>

              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/auth/login?mode=client" style={primaryButtonStyle}>
                  Book with Errol
                </Link>
                <a href="tel:07577378237" style={outlineBtn}>
                  Call 07577 378237
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "4rem 1.25rem", backgroundColor: colors.surface }}>
        <div style={containerStyle}>
          <div style={credsGridStyle}>
            {[
              { stat: "34+", label: "Years Experience", sub: "Since ~1990" },
              { stat: "10+", label: "Years in Studio", sub: "Swarv Studio" },
              { stat: "5.0★", label: "Star Rating", sub: "Customer satisfaction" },
              { stat: "446+", label: "Reviews", sub: "On Booksy" },
            ].map((c) => (
              <div key={c.label} style={credItemStyle}>
                <span style={credStatStyle}>{c.stat}</span>
                <span style={credLabelStyle}>{c.label}</span>
                <span style={credSubStyle}>{c.sub}</span>
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

const pageSubStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "1rem",
  maxWidth: "480px",
  margin: "0.75rem auto 0",
  lineHeight: 1.65,
};

const bioSectionStyle: React.CSSProperties = {
  padding: "5rem 1.25rem",
};

const bioGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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

const highlightGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.75rem",
  marginTop: "1.25rem",
  width: "100%",
};

const highlightCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.6rem",
  padding: "0.875rem",
};

const highlightIconStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  flexShrink: 0,
};

const highlightTitleStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "0.8rem",
  margin: "0 0 0.1rem",
};

const highlightDescStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.75rem",
  margin: 0,
};

const bioParaStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.975rem",
  lineHeight: 1.75,
  marginBottom: "1.1rem",
};

const bioDetailStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.875rem",
  lineHeight: 1.7,
  borderLeft: `3px solid ${colors.accent}`,
  paddingLeft: "0.875rem",
  marginTop: "1.5rem",
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
  gap: "0.15rem",
};

const credStatStyle: React.CSSProperties = {
  fontSize: "2.25rem",
  fontWeight: 900,
  color: colors.accent,
  lineHeight: 1,
};

const credLabelStyle: React.CSSProperties = {
  color: colors.text,
  fontSize: "0.8rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginTop: "0.25rem",
};

const credSubStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "0.72rem",
};
