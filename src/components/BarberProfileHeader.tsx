import React from "react";

// ─── props ────────────────────────────────────────────────────────────────────

interface BarberProfileHeaderProps {
  name: string;
  title?: string;
  bio?: string;
  avatarSrc?: string | null;
  /** Extra content rendered inside the text block (e.g. action buttons). */
  children?: React.ReactNode;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

// ─── component ────────────────────────────────────────────────────────────────

export function BarberProfileHeader({
  name,
  title,
  bio,
  avatarSrc,
  children,
}: BarberProfileHeaderProps) {
  return (
    <section style={heroSectionStyle}>
      {/* Avatar */}
      <div
        style={{
          ...avatarStyle,
          ...(avatarSrc
            ? {
                backgroundImage: `url(${avatarSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}),
        }}
      >
        {!avatarSrc && <span style={initialsStyle}>{getInitials(name)}</span>}
      </div>

      {/* Text block */}
      <div style={heroTextStyle}>
        <div style={heroNameStyle}>{name}</div>
        {title && <div style={heroTitleStyle}>{title}</div>}
        {bio && <p style={heroBioStyle}>{bio}</p>}
        {children}
      </div>
    </section>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const heroSectionStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  alignItems: "flex-start",
  marginBottom: "3rem",
  flexWrap: "wrap",
};

const avatarStyle: React.CSSProperties = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  flexShrink: 0,
  backgroundColor: "#1e3a5f",
  border: "2px solid #1e293b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const initialsStyle: React.CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 700,
  color: "#93c5fd",
  userSelect: "none",
};

const heroTextStyle: React.CSSProperties = {
  flex: 1,
  minWidth: "220px",
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
};

const heroNameStyle: React.CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: 700,
  color: "#f1f5f9",
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#60a5fa",
  fontWeight: 500,
};

const heroBioStyle: React.CSSProperties = {
  fontSize: "0.88rem",
  color: "#94a3b8",
  lineHeight: 1.55,
  margin: "0.4rem 0 0.75rem",
};
