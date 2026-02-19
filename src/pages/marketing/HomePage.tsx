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

// ─── Services preview data ────────────────────────────────────────────────────
const services = [
  { icon: "✂️", name: "Classic Fade", desc: "Clean tapered fade with precision lining.", price: "From $35" },
  { icon: "🪒", name: "Beard Trim & Shape", desc: "Sculpted beard styling and hot towel finish.", price: "From $25" },
  { icon: "💈", name: "Full Service Cut", desc: "Haircut + beard combo with premium styling.", price: "From $55" },
  { icon: "✨", name: "Hair Design", desc: "Custom designs and patterns cut into your style.", price: "From $45" },
];

// ─── Testimonials data ────────────────────────────────────────────────────────
const testimonials = [
  { name: "Marcus T.", text: "Errol is the best barber I've ever had. My fade is always crisp and clean. Wouldn't go anywhere else.", stars: 5 },
  { name: "Jordan R.", text: "Swarv Studio is the real deal. Professional atmosphere, great vibes, and immaculate work every time.", stars: 5 },
  { name: "Damon W.", text: "Booked online in 30 seconds, walked in and was seated on time. The cut was fire. 10/10.", stars: 5 },
];

export function HomePage() {
  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={heroSection}>
        <div style={heroOverlay} />
        <div style={{ ...containerStyle, position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={heroTagStyle}>Premier Barbershop · Los Angeles</p>
          <h1 style={heroTitleStyle}>
            Where Every Cut Is<br />
            <span style={{ color: colors.accent }}>A Masterpiece</span>
          </h1>
          <p style={heroSubStyle}>
            Precision cuts, clean fades, and sharp styles by Errol Jones at Swarv Studio.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link to="/auth/login?mode=client" style={primaryButtonStyle}>
              Book Your Appointment
            </Link>
            <Link to="/services" style={secondaryButtonStyle}>
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section style={statsBgStyle}>
        <div style={{ ...containerStyle, ...statsInnerStyle }}>
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "8+", label: "Years Experience" },
            { value: "5★", label: "Average Rating" },
            { value: "100%", label: "Satisfaction Guaranteed" },
          ].map((s) => (
            <div key={s.label} style={statItemStyle}>
              <span style={statValueStyle}>{s.value}</span>
              <span style={statLabelStyle}>{s.label}</span>
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
              Premium barbering services tailored to your look.
            </p>
          </div>
          <div style={servicesGridStyle}>
            {services.map((s) => (
              <div key={s.name} style={{ ...cardStyle, ...serviceCardStyle }}>
                <span style={serviceIconStyle}>{s.icon}</span>
                <h3 style={serviceNameStyle}>{s.name}</h3>
                <p style={serviceDescStyle}>{s.desc}</p>
                <p style={servicePriceStyle}>{s.price}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/services" style={secondaryButtonStyle}>
              See Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section style={{ ...sectionStyle, backgroundColor: colors.surface }}>
        <div style={containerStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>What Clients Say</h2>
            <p style={sectionSubStyle}>Real talk from real regulars.</p>
          </div>
          <div style={testimonialsGridStyle}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ ...cardStyle, ...testimonialCardStyle }}>
                <p style={starsStyle}>{"★".repeat(t.stars)}</p>
                <p style={testimonialTextStyle}>"{t.text}"</p>
                <p style={testimonialNameStyle}>— {t.name}</p>
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
                <p style={infoValueStyle}>123 Barber Lane, Suite 4<br />Los Angeles, CA 90001</p>
              </div>
              <div style={cardStyle}>
                <p style={infoLabelStyle}>📞 Phone</p>
                <p style={infoValueStyle}>(310) 555-0182</p>
                <p style={{ ...infoLabelStyle, marginTop: "0.75rem" }}>✉️ Email</p>
                <p style={infoValueStyle}>errol@swarvstudio.com</p>
              </div>
            </div>
            <div>
              <h2 style={{ ...sectionTitleStyle, marginBottom: "1.5rem" }}>Hours</h2>
              <div style={cardStyle}>
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((h) => (
                  <div key={h.day} style={hoursRowStyle}>
                    <span style={{ color: colors.textMuted, fontSize: "0.9rem" }}>{h.day}</span>
                    <span style={{ color: h.hours === "Closed" ? colors.textDim : colors.text, fontWeight: 600, fontSize: "0.9rem" }}>
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
          <p style={{ color: colors.textMuted, fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
            Book your appointment with Errol Jones in seconds. Walk in ready.
          </p>
          <Link to="/auth/login?mode=client" style={{ ...primaryButtonStyle, fontSize: "1.1rem", padding: "0.9rem 2.5rem" }}>
            Book Now — It's Free
          </Link>
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
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
  maxWidth: "520px",
  margin: "0 auto",
  lineHeight: 1.65,
};

const statsBgStyle: React.CSSProperties = {
  backgroundColor: colors.surface,
  borderTop: `1px solid ${colors.border}`,
  borderBottom: `1px solid ${colors.border}`,
  padding: "2rem 1.25rem",
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
  gap: "0.25rem",
};

const statValueStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 900,
  color: colors.accent,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: colors.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
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
  transition: "border-color 0.2s",
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
  margin: "0 0 0.75rem",
  lineHeight: 1.6,
};

const servicePriceStyle: React.CSSProperties = {
  color: colors.accent,
  fontWeight: 700,
  fontSize: "0.9rem",
  margin: 0,
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

const testimonialNameStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "0.85rem",
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
  padding: "0.6rem 0",
  borderBottom: `1px solid ${colors.border}`,
};

const ctaSectionStyle: React.CSSProperties = {
  padding: "6rem 1.25rem",
  background: `linear-gradient(135deg, #0f1f3d 0%, ${colors.bg} 100%)`,
  borderTop: `1px solid ${colors.border}`,
};

