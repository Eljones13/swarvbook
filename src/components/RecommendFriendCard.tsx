import React, { useState } from "react";
import type { ReferralInfo } from "../lib/referrals";

// ─── props ────────────────────────────────────────────────────────────────────

interface Props {
  referral: ReferralInfo | null;
}

// ─── component ────────────────────────────────────────────────────────────────

export function RecommendFriendCard({ referral }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!referral) return;
    try {
      await navigator.clipboard.writeText(referral.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable – silently ignore
    }
  }

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <span style={cardTitleStyle}>Recommend a friend</span>
        <span style={badgeStyle}>10% off each</span>
      </div>

      <p style={descStyle}>
        Share your unique link. When a friend signs up and books their first
        appointment, you both receive 10% off your next haircut.
      </p>

      {referral ? (
        <>
          {/* Code display */}
          <div style={codeRowStyle}>
            <span style={codeLabelStyle}>Your code</span>
            <span style={codeValueStyle}>{referral.code}</span>
          </div>

          {/* URL + copy button */}
          <div style={urlRowStyle}>
            <span style={urlTextStyle}>{referral.url}</span>
            <button onClick={handleCopy} style={copyBtnStyle}>
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>

          {/* QR placeholder — TODO: replace with a real QR library */}
          <div style={qrPlaceholderStyle}>
            <span style={qrLabelStyle}>QR code coming soon</span>
          </div>
        </>
      ) : (
        <p style={mutedStyle}>Loading your referral details…</p>
      )}
    </div>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1.25rem 1.5rem",
  borderRadius: "0.5rem",
  border: "1px solid #1e3a5f",
  backgroundColor: "#0a1628",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "0.6rem",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#f1f5f9",
};

const badgeStyle: React.CSSProperties = {
  fontSize: "0.68rem",
  fontWeight: 600,
  color: "#93c5fd",
  backgroundColor: "#1e3a5f",
  padding: "0.15rem 0.5rem",
  borderRadius: "999px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const descStyle: React.CSSProperties = {
  fontSize: "0.83rem",
  color: "#94a3b8",
  lineHeight: 1.55,
  margin: "0 0 1rem",
};

const codeRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "0.6rem",
};

const codeLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: 600,
  flexShrink: 0,
};

const codeValueStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "1.05rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  color: "#93c5fd",
};

const urlRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.45rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#020617",
  marginBottom: "1rem",
};

const urlTextStyle: React.CSSProperties = {
  flex: 1,
  fontSize: "0.75rem",
  color: "#64748b",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const copyBtnStyle: React.CSSProperties = {
  flexShrink: 0,
  padding: "0.3rem 0.7rem",
  borderRadius: "0.3rem",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontSize: "0.75rem",
  fontWeight: 600,
  cursor: "pointer",
};

const qrPlaceholderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "80px",
  borderRadius: "0.375rem",
  border: "1px dashed #1e293b",
  backgroundColor: "#0f172a",
};

const qrLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#334155",
};

const mutedStyle: React.CSSProperties = {
  fontSize: "0.83rem",
  color: "#475569",
};
