import React from "react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>SwarvBook</h1>
        <p style={subtitleStyle}>Barber bookings for Swarv Barbershop</p>

        <div style={btnGroupStyle}>
          <Link to="/auth/login?mode=client" style={clientBtnStyle}>
            Client booking
          </Link>
          <Link to="/auth/login?mode=admin" style={adminBtnStyle}>
            Admin dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const wrapperStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#020617",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1rem",
};

const cardStyle: React.CSSProperties = {
  maxWidth: "480px",
  width: "100%",
  padding: "2rem 1.5rem",
  borderRadius: "0.75rem",
  backgroundColor: "#0f172a",
  border: "1px solid #1e293b",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  color: "#f1f5f9",
  margin: "0 0 0.4rem",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#64748b",
  margin: "0 0 2rem",
};

const btnGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const baseBtnStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  margin: "0.5rem 0",
  padding: "0.85rem 1rem",
  borderRadius: "999px",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  textDecoration: "none",
};

const clientBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  backgroundColor: "#2563eb",
  color: "#ffffff",
};

const adminBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  backgroundColor: "transparent",
  color: "#e5e7eb",
  border: "1px solid #475569",
};
