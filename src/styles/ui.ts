import React from "react";

// ─── Colour tokens ─────────────────────────────────────────────────────────────
export const colors = {
  bg: "#020617",
  surface: "#0f172a",
  surfaceHigh: "#1e293b",
  border: "#1e293b",
  borderMid: "#334155",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  accent: "#facc15",
  text: "#e5e7eb",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  white: "#ffffff",
} as const;

// ─── Shared style tokens ───────────────────────────────────────────────────────

export const cardStyle: React.CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "0.75rem",
  padding: "1.5rem",
};

export const primaryButtonStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: colors.primary,
  color: colors.white,
  padding: "0.75rem 1.75rem",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer",
  textDecoration: "none",
  border: "none",
  letterSpacing: "0.02em",
};

export const secondaryButtonStyle: React.CSSProperties = {
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
  letterSpacing: "0.02em",
};

export const sectionTitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  color: colors.text,
  margin: "0 0 0.5rem",
  lineHeight: 1.2,
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: colors.surfaceHigh,
  border: `1px solid ${colors.border}`,
  borderRadius: "0.5rem",
  padding: "0.75rem 1rem",
  color: colors.text,
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

export const pageWrapperStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: colors.bg,
  color: colors.text,
};

export const containerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 1.25rem",
};
