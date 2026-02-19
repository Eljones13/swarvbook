import React from "react";
import { Link } from "react-router-dom";
import {
  colors,
  cardStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  sectionTitleStyle,
  containerStyle,
} from "../../styles/ui";

// ─── Real hours ───────────────────────────────────────────────────────────────
const HOURS = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "Closed" },
  { day: "Wednesday", hours: "10:00 am – 8:00 pm" },
  { day: "Thursday", hours: "10:00 am – 8:00 pm" },
  { day: "Friday", hours: "9:00 am – 8:00 pm" },
  { day: "Saturday", hours: "9:00 am – 6:00 pm" },
  { day: "Sunday", hours: "Closed" },
];

// ─── Services preview ─────────────────────────────────────────────────────────
const services = [
  {
    icon: "✂️",
    name: "Adult Haircut",
    desc: "Modern haircut with attention to detail. One of Sheffield's top contemporary barbershops.",
    price: "From £20",
    duration: "20 min",
  },
  {
    icon: "🪒",
    name: "Adult Haircut with Beard",
    desc: "Haircut and beard trim in one visit. Precision and contemporary styling.",
    price: "£23",
    duration: "25 min",
  },
  {
    icon: "👦",
    name: "Child Trim (Under 12)",
    desc: "A welcoming atmosphere where your child can get their trim.",
    price: "From £16",
    duration: "20 min",
  },
  {
    icon: "🎓",
    name: "Child Haircut (12–16)",
    desc: "Stylish cuts for teenagers in a professional, relaxed setting.",
    price: "£18",
    duration: "",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Marcus Thompson",
    service: "Adult Haircut with Beard",
    date: "15 January 2024",
    text: "Great experience. Errol is a master of his craft and really knows how to work with different hair types.",
    stars: 5,
  },
  {
    name: "James W.",
    service: "Adult Haircut",
    date: "Regular Client",
    text: "Errol has been cutting my hair for years. Always precise, always on time. Couldn't recommend more highly.",
    stars: 5,
  },
  {
    name: "David K.",
    service: "Child Trim",
    date: "February 2024",
    text: "Took my son here for his first proper haircut. Errol was patient and professional. Great experience.",
    stars: 5,
  },
];

export function HomePage() {
  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={heroSection}>
        <div style={heroOverlay} />
        <div style={{ ...containerStyle, position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={heroTagStyle}>Expert Barbershop · Sheffield</p>
          <h1 style={heroTitleStyle}>
            Expert Precision<br />
            <span style={{ color: colors.accent }}>Every Cut</span>
          </h1>
          <p style={heroSubStyle}>
            30+ years of experience specializing in Afro, Asian, and European hair types.
            Located opposite Sheffield United stadium.
          </p>
          <div style={heroBtnRowStyle}>
            <Link to="/auth/login?mode=client" style={primaryButtonStyle}>
              Book Appointment
            </Link>
            <a href="tel:07577378237" style={secondaryButtonStyle}>
              Call Now
            </a>
          </div>
          <p style={heroSmallPrintStyle}>
            No walk-ins&nbsp;&nbsp;•&nbsp;&nbsp;Appointment only&nbsp;&nbsp;•&nbsp;&nbsp;Same-day appointments available
          </p>
          <p style={heroAddressStyle}>
            📍 92 Harwood Street S2 4SE · Opposite Sheffield United Stadium
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section style={statsBgStyle}>
        <div style={{ ...containerStyle, ...statsInnerStyle }}>
          {[
            { value: "34+", label: "Years Experience", sub: "Since 1990" },
            { value: "446+", label: "Reviews", sub: "On Booksy" },
            { value: "5.0★", label: "Star Rating", sub: "Customer satisfaction" },
            { value: "10+", label: "Years in Studio", sub: "Serving Sheffield" },
          ].map((s) => (
            <div key={s.label} style={statItemStyle}>
              <span style={statValueStyle}>{s.value}</span>
              <span style={statLabelStyle}>{s.label}</span>
              <span style={statSubStyle}>{s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services preview ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Our Services</h2>
            <p style={sectionSubStyle}>
              Professional haircuts and grooming services tailored to your style preferences.
            </p>
          </div>
          <div style={servicesGridStyle}>
            {services.map((s) => (
              <div key={s.name} style={{ ...cardStyle, ...serviceCardStyle }}>
                <span style={serviceIconStyle}>{s.icon}</span>
                <h3 style={serviceNameStyle}>{s.name}</h3>
                <p style={serviceDescStyle}>{s.desc}</p>
                <div style={serviceFooterStyle}>
                  <span style={servicePriceStyle}>{s.price}</span>
                  {s.duration && (
                    <span style={serviceDurationStyle}>{s.duration}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/services" style={secondaryButtonStyle}>
              View Full Service List
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section style={{ ...sectionStyle, backgroundColor: colors.surface }}>
        <div style={containerStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>What Clients Say</h2>
            <p style={sectionSubStyle}>
              5.0 stars across 446+ reviews on Booksy.
            </p>
          </div>
          <div style={testimonialsGridStyle}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ ...cardStyle, ...testimonialCardStyle }}>
                <p style={starsStyle}>{"★".repeat(t.stars)}</p>
                <p style={testimonialTextStyle}>"{t.text}"</p>
                <div style={testimonialFooterStyle}>
                  <p style={testimonialNameStyle}>{t.name}</p>
                  <p style={testimonialMetaStyle}>{t.service} · {t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location & Hours ─────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={locationGridStyle}>
            <div>
              <h2 style={{ ...sectionTitleStyle, marginBottom: "1.5rem" }}>Find Us</h2>
              <div style={{ ...cardStyle, marginBottom: "1rem" }}>
                <p style={infoLabelStyle}>📍 Address</p>
                <p style={infoValueStyle}>
                  92 Harwood Street, Unit 8<br />
                  Sheffield S2 4SE
                </p>
                <p style={{ ...infoValueStyle, color: colors.textMuted, fontSize: "0.825rem", marginTop: "0.4rem" }}>
                  Opposite Sheffield United Stadium
                </p>
              </div>
              <div style={cardStyle}>
                <p style={infoLabelStyle}>📞 Phone</p>
                <p style={infoValueStyle}>
                  <a href="tel:07577378237" style={{ color: colors.accent, textDecoration: "none", fontWeight: 600 }}>
                    07577 378237
                  </a>
                </p>
                <p style={{ ...infoLabelStyle, marginTop: "0.75rem" }}>🗓️ Booking</p>
                <p style={infoValueStyle}>Appointment only · No walk-ins<br />Same-day appointments available</p>
              </div>
            </div>

            <div>
              <h2 style={{ ...sectionTitleStyle, marginBottom: "1.5rem" }}>Opening Hours</h2>
              <div style={cardStyle}>
                {HOURS.map((h) => (
                  <div key={h.day} style={hoursRowStyle}>
                    <span style={{ color: colors.textMuted, fontSize: "0.9rem" }}>{h.day}</span>
                    <span style={{
                      color: h.hours === "Closed" ? colors.textDim : colors.text,
                      fontWeight: h.hours === "Closed" ? 500 : 600,
                      fontSize: "0.9rem",
                    }}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Book CTA ─────────────────────────────────────────────────────── */}
      <section style={ctaSectionStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <h2 style={{ ...sectionTitleStyle, fontSize: "2.5rem", marginBottom: "1rem" }}>
            Ready for a Fresh Look?
          </h2>
          <p style={ctaSubStyle}>
            Book your appointment with Errol Jones. No walk-ins — secure your slot online in seconds.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/auth/login?mode=client"
              style={{ ...primaryButtonStyle, fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
            >
              Book Appointment
            </Link>
            <a
              href="tel:07577378237"
              style={{ ...secondaryButtonStyle, fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
            >
              Call 07577 378237
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const heroSection: React.CSSProperties = {
  position: "relative",
  minHeight: "88vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `radial-gradient(ellipse at 60% 40%, #1e3a6e 0%, ${colors.bg} 65%)`,
  padding: "6rem 1.25rem",
  overflow: "hidden",
};

const heroOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: `linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 60%)`,
  pointerEvents: "none",
};

const heroTagStyle: React.CSSProperties = {
  color: colors.accent,
  fontWeight: 700,
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  margin: "0 0 1.25rem",
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
  fontWeight: 900,
  color: colors.text,
  lineHeight: 1.1,
  margin: "0 0 1.25rem",
};

const heroSubStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "clamp(1rem, 2vw, 1.15rem)",
  maxWidth: "520px",
  margin: "0 auto 0",
  lineHeight: 1.65,
};

const heroBtnRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "2rem",
};

const heroSmallPrintStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "0.78rem",
  marginTop: "1.5rem",
  letterSpacing: "0.03em",
};

const heroAddressStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.82rem",
  margin: "0.4rem 0 0",
};

const statsBgStyle: React.CSSProperties = {
  backgroundColor: colors.surface,
  borderTop: `1px solid ${colors.border}`,
  borderBottom: `1px solid ${colors.border}`,
  padding: "2.5rem 1.25rem",
};

const statsInnerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "1.5rem",
  textAlign: "center",
};

const statItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.15rem",
};

const statValueStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 900,
  color: colors.accent,
  lineHeight: 1,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: colors.text,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginTop: "0.25rem",
};

const statSubStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  color: colors.textDim,
};

const sectionStyle: React.CSSProperties = {
  padding: "5rem 1.25rem",
};

const sectionHeaderStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "3rem",
};

const sectionSubStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "1rem",
  margin: "0.5rem 0 0",
};

const servicesGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1.25rem",
};

const serviceCardStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
};

const serviceIconStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  display: "block",
  marginBottom: "0.75rem",
};

const serviceNameStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "1.05rem",
  margin: "0 0 0.5rem",
};

const serviceDescStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.875rem",
  margin: "0 0 1rem",
  lineHeight: 1.6,
  flex: 1,
};

const serviceFooterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
};

const servicePriceStyle: React.CSSProperties = {
  color: colors.accent,
  fontWeight: 800,
  fontSize: "1rem",
};

const serviceDurationStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "0.78rem",
};

const testimonialsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "1.25rem",
};

const testimonialCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const starsStyle: React.CSSProperties = {
  color: colors.accent,
  fontSize: "1rem",
  margin: "0 0 0.75rem",
  letterSpacing: "0.1em",
};

const testimonialTextStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.9rem",
  lineHeight: 1.7,
  margin: "0 0 1rem",
  flex: 1,
};

const testimonialFooterStyle: React.CSSProperties = {
  borderTop: `1px solid ${colors.border}`,
  paddingTop: "0.75rem",
};

const testimonialNameStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "0.85rem",
  margin: "0 0 0.15rem",
};

const testimonialMetaStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: "0.75rem",
  margin: 0,
};

const locationGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "2.5rem",
};

const infoLabelStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: "0 0 0.25rem",
};

const infoValueStyle: React.CSSProperties = {
  color: colors.text,
  fontSize: "0.95rem",
  margin: 0,
  lineHeight: 1.6,
};

const hoursRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0.55rem 0",
  borderBottom: `1px solid ${colors.border}`,
};

const ctaSectionStyle: React.CSSProperties = {
  padding: "6rem 1.25rem",
  background: `linear-gradient(135deg, #0f1f3d 0%, ${colors.bg} 100%)`,
  borderTop: `1px solid ${colors.border}`,
};

const ctaSubStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "1.05rem",
  maxWidth: "500px",
  margin: "0 auto 2rem",
  lineHeight: 1.65,
};
