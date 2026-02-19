import React, { useState } from "react";
import {
  colors,
  cardStyle,
  primaryButtonStyle,
  sectionTitleStyle,
  inputStyle,
  containerStyle,
} from "../../styles/ui";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to actual email / Supabase function
    setSent(true);
  }

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* Page header */}
      <section style={pageHeaderStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <p style={pageTagStyle}>Get in Touch</p>
          <h1 style={{ ...sectionTitleStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Contact Us
          </h1>
          <p style={pageSubStyle}>
            Questions, inquiries, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "5rem 1.25rem" }}>
        <div style={containerStyle}>
          <div style={contactGridStyle}>
            {/* Contact info */}
            <div>
              <h2 style={{ ...sectionTitleStyle, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                Studio Info
              </h2>

              {[
                {
                  icon: "📍",
                  label: "Address",
                  value: "123 Barber Lane, Suite 4\nLos Angeles, CA 90001",
                },
                { icon: "📞", label: "Phone", value: "(310) 555-0182" },
                { icon: "✉️", label: "Email", value: "errol@swarvstudio.com" },
                { icon: "📸", label: "Instagram", value: "@swarvstudio" },
              ].map((info) => (
                <div key={info.label} style={{ ...cardStyle, marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem" }}>{info.icon}</span>
                  <div>
                    <p style={infoLabelStyle}>{info.label}</p>
                    <p style={infoValueStyle}>{info.value}</p>
                  </div>
                </div>
              ))}

              <div style={{ ...cardStyle, marginTop: "1.5rem" }}>
                <p style={infoLabelStyle}>Hours</p>
                {[
                  { day: "Mon – Fri", hours: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((h) => (
                  <div key={h.day} style={hoursRowStyle}>
                    <span style={{ color: colors.textMuted, fontSize: "0.875rem" }}>{h.day}</span>
                    <span style={{ color: colors.text, fontWeight: 600, fontSize: "0.875rem" }}>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 style={{ ...sectionTitleStyle, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                Send a Message
              </h2>

              {sent ? (
                <div style={{ ...cardStyle, textAlign: "center", padding: "3rem 2rem" }}>
                  <span style={{ fontSize: "3rem" }}>✅</span>
                  <h3 style={{ color: colors.text, fontWeight: 700, margin: "1rem 0 0.5rem" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: colors.textMuted, fontSize: "0.9rem", margin: 0 }}>
                    Thanks for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm(initialForm); }}
                    style={{ ...primaryButtonStyle, marginTop: "1.5rem" }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={fieldRowStyle}>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        style={inputStyle}
                      />
                    </div>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@email.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={fieldRowStyle}>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(310) 555-0000"
                        style={inputStyle}
                      />
                    </div>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none" }}
                      >
                        <option value="">Select a subject…</option>
                        <option value="booking">Booking Enquiry</option>
                        <option value="pricing">Pricing Question</option>
                        <option value="event">Private Event / Group</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      rows={5}
                      style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                    />
                  </div>

                  <button type="submit" style={{ ...primaryButtonStyle, alignSelf: "flex-start" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
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

const contactGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "3rem",
  alignItems: "start",
};

const infoLabelStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin: "0 0 0.2rem",
};

const infoValueStyle: React.CSSProperties = {
  color: colors.text,
  fontSize: "0.9rem",
  margin: 0,
  whiteSpace: "pre-line",
  lineHeight: 1.6,
};

const hoursRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 0",
  borderBottom: `1px solid ${colors.border}`,
};

const fieldRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const fieldGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
};

const labelStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
};
