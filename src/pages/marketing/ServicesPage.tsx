import React from "react";
import { Link } from "react-router-dom";
import {
  colors,
  cardStyle,
  primaryButtonStyle,
  sectionTitleStyle,
  containerStyle,
} from "../../styles/ui";

const categories = [
  {
    title: "Haircuts",
    items: [
      { name: "Classic Fade", desc: "Low, mid, or high taper fade with clean lineup.", price: "$35" },
      { name: "Bald Fade", desc: "Skin-tight fade blended to perfection.", price: "$40" },
      { name: "Scissor Cut", desc: "Textured scissor-over-comb cut for any hair type.", price: "$38" },
      { name: "Kids Cut (Under 12)", desc: "Patient, precise cuts for the little ones.", price: "$25" },
    ],
  },
  {
    title: "Beard Services",
    items: [
      { name: "Beard Trim", desc: "Shape and trim to maintain your current style.", price: "$20" },
      { name: "Beard Design", desc: "Full sculpt and shape for beard styling.", price: "$30" },
      { name: "Hot Towel Shave", desc: "Classic straight-razor shave with hot towel.", price: "$35" },
      { name: "Beard Colour", desc: "Touch up greys or try a new shade.", price: "$45" },
    ],
  },
  {
    title: "Combos",
    items: [
      { name: "Cut + Beard Trim", desc: "Haircut and beard trim in one session.", price: "$55" },
      { name: "Cut + Hot Towel Shave", desc: "Full service premium experience.", price: "$65" },
      { name: "Full Luxury Package", desc: "Cut, beard design, hot towel, and scalp massage.", price: "$80" },
    ],
  },
  {
    title: "Add-Ons",
    items: [
      { name: "Hair Design", desc: "Custom lines or patterns cut into your style.", price: "+$15" },
      { name: "Scalp Massage", desc: "Relaxing scalp treatment with essential oils.", price: "+$10" },
      { name: "Eyebrow Trim", desc: "Clean up and shape your brows.", price: "+$10" },
      { name: "Edge Up / Lineup", desc: "Clean sharp hairline and edges.", price: "+$10" },
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
            Every service is delivered with precision, care, and the Swarv standard.
          </p>
        </div>
      </section>

      {/* Services grid by category */}
      <section style={bodySectionStyle}>
        <div style={containerStyle}>
          {categories.map((cat) => (
            <div key={cat.title} style={categoryBlockStyle}>
              <h2 style={categoryTitleStyle}>{cat.title}</h2>
              <div style={servicesGridStyle}>
                {cat.items.map((item) => (
                  <div key={item.name} style={{ ...cardStyle, ...itemCardStyle }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={itemNameStyle}>{item.name}</h3>
                      <p style={itemDescStyle}>{item.desc}</p>
                    </div>
                    <p style={itemPriceStyle}>{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Note */}
          <div style={{ ...cardStyle, textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: colors.textMuted, fontSize: "0.875rem", margin: 0 }}>
              Prices are starting rates. Final pricing may vary based on hair length, texture, or complexity.
              Walk-ins welcome — online booking guarantees your slot.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/auth/login?mode=client" style={{ ...primaryButtonStyle, fontSize: "1.05rem", padding: "0.85rem 2.25rem" }}>
              Book Your Service
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
  maxWidth: "480px",
  margin: "0.75rem auto 0",
  lineHeight: 1.65,
};

const bodySectionStyle: React.CSSProperties = {
  padding: "4rem 1.25rem 5rem",
};

const categoryBlockStyle: React.CSSProperties = {
  marginBottom: "3rem",
};

const categoryTitleStyle: React.CSSProperties = {
  color: colors.accent,
  fontSize: "0.78rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: `1px solid ${colors.border}`,
};

const servicesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1rem",
};

const itemCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const itemNameStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "1rem",
  margin: "0 0 0.3rem",
};

const itemDescStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.85rem",
  margin: 0,
  lineHeight: 1.6,
};

const itemPriceStyle: React.CSSProperties = {
  color: colors.accent,
  fontWeight: 800,
  fontSize: "1.1rem",
  margin: 0,
};
