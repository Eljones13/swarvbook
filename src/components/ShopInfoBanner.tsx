import React from "react";

export function ShopInfoBanner() {
  return (
    <div style={bannerStyle}>
      <div style={contentStyle}>
        <div style={textBlockStyle}>
          <div style={line1Style}>Swarv Barbershop – Sheffield, UK</div>
          <div style={lineStyle}>
            <strong>Parking:</strong> Do not park in the private car park unless you use the
            PayByPhone app. Parking is 89p for one hour. Location code:{" "}
            <strong>804596</strong>.
          </div>
          <div style={lineStyle}>
            <strong>Deposits:</strong> A non‑refundable deposit is taken when you book.
            Cancellations within 24 hours or no‑shows will result in the deposit being kept.
          </div>
        </div>
        <a
          href="https://maps.google.com/?q=Swarv+Barbershop+Sheffield"
          target="_blank"
          rel="noopener noreferrer"
          style={mapLinkStyle}
        >
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
}

const bannerStyle: React.CSSProperties = {
  backgroundColor: "#020617",
  borderTop: "1px solid #1e293b",
  borderBottom: "1px solid #1e293b",
  padding: "0.75rem 1.5rem",
};

const contentStyle: React.CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.75rem",
};

const textBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
};

const line1Style: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 700,
  color: "#e5e7eb",
};

const lineStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  color: "#94a3b8",
  lineHeight: 1.45,
};

const mapLinkStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  color: "#60a5fa",
  textDecoration: "none",
  whiteSpace: "nowrap",
  flexShrink: 0,
  padding: "0.35rem 0.7rem",
  borderRadius: "0.25rem",
  border: "1px solid #1e3a5f",
};
