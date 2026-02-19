import React, { useState } from "react";
import {
  colors,
  sectionTitleStyle,
  containerStyle,
} from "../../styles/ui";

// Gallery items – labelled placeholder tiles until real images are loaded.
// Replace `bg` with an actual image URL and set `src` to use <img> instead.
const galleryItems = [
  { id: 1, label: "Low Fade", category: "Fade" },
  { id: 2, label: "High Bald Fade", category: "Fade" },
  { id: 3, label: "Skin Fade + Design", category: "Design" },
  { id: 4, label: "Beard Sculpt", category: "Beard" },
  { id: 5, label: "Textured Crop", category: "Crop" },
  { id: 6, label: "Mid Fade", category: "Fade" },
  { id: 7, label: "Hot Towel Shave", category: "Beard" },
  { id: 8, label: "Custom Line Design", category: "Design" },
  { id: 9, label: "Classic Taper", category: "Fade" },
  { id: 10, label: "Box Fade", category: "Fade" },
  { id: 11, label: "Fade + Full Beard", category: "Beard" },
  { id: 12, label: "Curly Crop + Fade", category: "Crop" },
];

const placeholderGradients: Record<string, string> = {
  Fade: "linear-gradient(135deg, #1e3a6e 0%, #0f172a 100%)",
  Beard: "linear-gradient(135deg, #1a2e1a 0%, #0f172a 100%)",
  Design: "linear-gradient(135deg, #3b2f00 0%, #0f172a 100%)",
  Crop: "linear-gradient(135deg, #2a1a3e 0%, #0f172a 100%)",
};

const categories = ["All", "Fade", "Beard", "Design", "Crop"];

export function GalleryPage() {
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* Page header */}
      <section style={pageHeaderStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <p style={pageTagStyle}>The Work</p>
          <h1 style={{ ...sectionTitleStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Gallery
          </h1>
          <p style={pageSubStyle}>
            A look at what comes out of the chair. Every cut speaks for itself.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ padding: "2.5rem 1.25rem 0" }}>
        <div style={{ ...containerStyle, display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={filterBtnStyle(filter === cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "2rem 1.25rem 5rem" }}>
        <div style={containerStyle}>
          <div style={galleryGridStyle}>
            {visible.map((item) => (
              <div key={item.id} style={{ ...galleryTileStyle, background: placeholderGradients[item.category] }}>
                <div style={tileOverlayStyle}>
                  <span style={tileLabelStyle}>{item.label}</span>
                  <span style={tileCatStyle}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          {visible.length === 0 && (
            <p style={{ textAlign: "center", color: colors.textMuted, padding: "3rem 0" }}>
              No photos in this category yet.
            </p>
          )}

          <p style={noteStyle}>
            More photos updated regularly. Follow{" "}
            <span style={{ color: colors.accent }}>@swarvstudio</span> on Instagram for the latest work.
          </p>
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

const filterBtnStyle = (active: boolean): React.CSSProperties => ({
  padding: "0.5rem 1.25rem",
  borderRadius: "999px",
  border: `1px solid ${active ? colors.primary : colors.border}`,
  backgroundColor: active ? colors.primary : "transparent",
  color: active ? colors.white : colors.textMuted,
  fontWeight: 600,
  fontSize: "0.85rem",
  cursor: "pointer",
});

const galleryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "1rem",
};

const galleryTileStyle: React.CSSProperties = {
  borderRadius: "0.75rem",
  aspectRatio: "1 / 1",
  overflow: "hidden",
  position: "relative",
  border: `1px solid ${colors.border}`,
  display: "flex",
  alignItems: "flex-end",
};

const tileOverlayStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem",
  background: "linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 100%)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const tileLabelStyle: React.CSSProperties = {
  color: colors.text,
  fontWeight: 700,
  fontSize: "0.9rem",
};

const tileCatStyle: React.CSSProperties = {
  color: colors.accent,
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const noteStyle: React.CSSProperties = {
  textAlign: "center",
  color: colors.textDim,
  fontSize: "0.85rem",
  marginTop: "2.5rem",
};
