import React from "react";
import { Link } from "react-router-dom";
import {
  colors,
  cardStyle,
  primaryButtonStyle,
  sectionTitleStyle,
  containerStyle,
} from "../../styles/ui";

// ─── Service data – source of truth from Swarv Studio ─────────────────────────
const categories = [
  {
    tag: "Popular Services",
    items: [
      {
        name: "Adult Haircut",
        desc: "Modern haircut with attention to detail. Get your modern haircut done at one of the top contemporary barber shops in Sheffield.",
        price: "£20.00+",
        duration: "20 min",
      },
      {
        name: "Adult Haircut with Beard",
        desc: "Haircut and beard trim in one visit. A paragon of precision and contemporary styles for the best grooming experience in Sheffield.",
        price: "£23.00",
        duration: "25 min",
      },
    ],
  },
  {
    tag: "Children & Teens",
    items: [
      {
        name: "Child Trim (Under 12)",
        desc: "A welcoming atmosphere where your child can get their trim. Friendly environment tailored for younger clients.",
        price: "£16.00+",
        duration: "20 min",
      },
      {
        name: "Child Haircut (12–16)",
        desc: "Perfect for teenagers looking for stylish cuts in a professional, relaxed setting.",
        price: "£18.00",
        duration: "",
      },
    ],
  },
];

export function ServicesPage() {
  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>

      {/* Page header */}
      <section style={pageHeaderStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <p style={pageTagStyle}>What We Offer</p>
          <h1 style={{ ...sectionTitleStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Our Services
          </h1>
          <p style={pageSubStyle}>
            Professional haircuts and grooming services tailored to your style preferences.
          </p>
        </div>
      </section>

      {/* Appointment-only notice */}
      <div style={noticeBarStyle}>
        <div style={containerStyle}>
          <p style={noticeTextStyle}>
            🗓️ <strong>Appointment only</strong> — No walk-ins. Same-day appointments available.
            &nbsp;&nbsp;
            <a href="tel:07577378237" style={noticeLinkStyle}>Call 07577 378237</a>
            &nbsp;or&nbsp;
            <Link to="/auth/login?mode=client" style={noticeLinkStyle}>Book online</Link>
          </p>
        </div>
      </div>

      {/* Services */}
      <section style={bodySectionStyle}>
        <div style={containerStyle}>
          {categories.map((cat) => (
            <div key={cat.tag} style={categoryBlockStyle}>
              <h2 style={categoryTagStyle}>{cat.tag}</h2>
              <div style={servicesGridStyle}>
                {cat.items.map((item) => (
                  <div key={item.name} style={{ ...cardStyle, ...itemCardStyle }}>
                    <div style={{ flex: 1 }}>
                      <div style={itemHeaderStyle}>
                        <h3 style={itemNameStyle}>{item.name}</h3>
                        <span style={itemPriceStyle}>{item.price}</span>
                      </div>
                      {item.duration && (
                        <p style={itemDurationStyle}>⏱ {item.duration}</p>
                      )}
                      <p style={itemDescStyle}>{item.desc}</p>
                    </div>
                    <Link to="/auth/login?mode=client" style={bookServiceBtnStyle}>
                      Book this service
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Teen callout banner */}
          <div style={teenBannerStyle}>
            <div>
              <p style={teenBannerHeadStyle}>Special Teen Services Available</p>
              <p style={teenBannerBodyStyle}>
                Child Haircuts (12–16) · £18.00 · Perfect for teenagers looking for stylish cuts.
              </p>
            </div>
            <Link to="/auth/login?mode=client" style={{ ...primaryButtonStyle, whiteSpace: "nowrap" }}>
              Book Now
            </Link>
          </div>

          {/* Pricing note */}
          <div style={{ ...cardStyle, textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: colors.textMuted, fontSize: "0.875rem", margin: 0 }}>
              Prices marked with <strong style={{ color: colors.text }}>+</strong> are starting rates.
              Final pricing may vary based on hair length, texture, or complexity.
              No walk-ins — book your slot online or call <a href="tel:07577378237" style={{ color: colors.accent }}>07577 378237</a>.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              to="/auth/login?mode=client"
              style={{ ...primaryButtonStyle, fontSize: "1.05rem", padding: "0.85rem 2.25rem" }}
            >
              Book Your Appointment
            </Link>
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
  maxWidth: "500px",
  margin: "0.75rem auto 0",
  lineHeight: 1.65,
};

const noticeBarStyle: React.CSSProperties = {
  backgroundColor: colors.surfaceHigh,
  borderBottom: `1px solid ${colors.border}`,
  padding: "0.75rem 1.25rem",
};

const noticeTextStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.85rem",
  margin: 0,
  textAlign: "center",
};

const noticeLinkStyle: React.CSSProperties = {
  color: colors.accent,
  textDecoration: "none",
  fontWeight: 600,
};

const bodySectionStyle: React.CSSProperties = {
  padding: "4rem 1.25rem 5rem",
};

const categoryBlockStyle: React.CSSProperties = {
  marginBottom: "3.5rem",
};

const categoryTagStyle: React.CSSProperties = {
  color: colors.accent,
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: `1px solid ${colors.border}`,
  marginTop: 0,
};

const servicesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "1.25rem",
};

const itemCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const itemHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "0.5rem",
  marginBottom: "0.25rem",
};

const itemNameStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "1rem",
  margin: 0,
};

const itemPriceStyle: React.CSSProperties = {
  color: colors.accent,
  fontWeight: 800,
  fontSize: "1.05rem",
  whiteSpace: "nowrap",
};

const itemDurationStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "0.78rem",
  margin: "0 0 0.5rem",
};

const itemDescStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.875rem",
  margin: 0,
  lineHeight: 1.6,
};

const bookServiceBtnStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  backgroundColor: "transparent",
  border: `1px solid ${colors.borderMid}`,
  borderRadius: "999px",
  color: colors.text,
  padding: "0.55rem 1rem",
  fontSize: "0.825rem",
  fontWeight: 600,
  textDecoration: "none",
  marginTop: "auto",
};

const teenBannerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "1rem",
  backgroundColor: colors.surface,
  border: `1px solid ${colors.primary}`,
  borderRadius: "0.75rem",
  padding: "1.25rem 1.5rem",
  marginTop: "1rem",
};

const teenBannerHeadStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "1rem",
  margin: "0 0 0.25rem",
};

const teenBannerBodyStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.875rem",
  margin: 0,
};
