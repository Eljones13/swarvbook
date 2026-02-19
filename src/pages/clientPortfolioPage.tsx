import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarberProfileHeader } from "../components/BarberProfileHeader";
import {
  loadPortfolio,
  savePortfolio,
  DEFAULT_BIO,
} from "../lib/portfolioStorage";
import type { StoredImage } from "../lib/portfolioStorage";

// ─── types ────────────────────────────────────────────────────────────────────

interface GalleryImage extends StoredImage {
  isPlaceholder?: boolean;
}

// ─── initial placeholder cards ────────────────────────────────────────────────

const PLACEHOLDERS: GalleryImage[] = [
  { id: "ph-1", src: "", caption: "Fresh fade",     isPlaceholder: true },
  { id: "ph-2", src: "", caption: "Skin fade",      isPlaceholder: true },
  { id: "ph-3", src: "", caption: "Crop top",       isPlaceholder: true },
  { id: "ph-4", src: "", caption: "Textured quiff", isPlaceholder: true },
  { id: "ph-5", src: "", caption: "Bald fade",      isPlaceholder: true },
  { id: "ph-6", src: "", caption: "Classic cut",    isPlaceholder: true },
];

// ─── component ────────────────────────────────────────────────────────────────

export function ClientPortfolioPage() {
  const [headerImage, setHeaderImage] = useState<string | null>(
    () => loadPortfolio()?.headerImage ?? null
  );
  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = loadPortfolio();
    const realImages = (saved?.gallery ?? []) as GalleryImage[];
    return realImages.length > 0 ? realImages : PLACEHOLDERS;
  });

  // Bio is display-only on this page; editing happens on the booking page.
  const bio = loadPortfolio()?.bio ?? DEFAULT_BIO;

  const headerInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Persist to localStorage whenever headerImage or gallery changes.
  useEffect(() => {
    const realImages = gallery.filter((g) => !g.isPlaceholder);
    savePortfolio({ headerImage, gallery: realImages, bio });
  }, [headerImage, gallery]); // bio is a derived constant on this page

  function handleHeaderFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setHeaderImage(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = () => {
        const caption = file.name.replace(/\.[^.]+$/, "");
        setGallery((prev) => [
          ...prev,
          { id: `upload-${Date.now()}-${i}`, src: reader.result as string, caption, isPlaceholder: false },
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  const hasRealImages = gallery.some((g) => !g.isPlaceholder);
  const visibleGallery = hasRealImages
    ? gallery.filter((g) => !g.isPlaceholder)
    : gallery;

  function removeCard(id: string) {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div style={pageStyle}>
      {/* ── Header ── */}
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
            <span style={brandStyle}>Swarv Barbershop</span>
            <span style={subPageStyle}>Portfolio</span>
          </div>
          <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link to="/book" style={navLinkStyle}>Book</Link>
            <Link to="/my-bookings" style={navLinkStyle}>My Bookings</Link>
          </nav>
        </div>
      </header>

      <main style={mainStyle}>
        {/* ── Hero ── */}
        <BarberProfileHeader
          name="Errol L. Jones"
          title="Master Barber · Swarv Barbershop, Sheffield"
          bio={bio}
          avatarSrc={headerImage}
        >
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button onClick={() => headerInputRef.current?.click()} style={ghostBtnStyle}>
              Change avatar
            </button>
            <button style={ghostBtnStyle} disabled>
              Edit bio
            </button>
          </div>
        </BarberProfileHeader>

        {/* ── Gallery ── */}
        <section>
          <div style={gallerySectionHeaderStyle}>
            <h2 style={galleryTitleStyle}>Portfolio</h2>
            <button onClick={() => galleryInputRef.current?.click()} style={uploadBtnStyle}>
              + Upload photos
            </button>
          </div>

          <div style={galleryGridStyle}>
            {visibleGallery.map((img) => (
              <div key={img.id} style={galleryCardStyle}>
                <button
                  onClick={() => removeCard(img.id)}
                  style={removeBtnStyle}
                  aria-label="Remove"
                >
                  ✕
                </button>
                {img.src ? (
                  <div
                    style={{
                      ...galleryImgAreaStyle,
                      backgroundImage: `url(${img.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                ) : (
                  <div style={galleryPlaceholderStyle} />
                )}
                <div style={captionStyle}>{img.caption}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Hidden file inputs ── */}
      <input
        ref={headerInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleHeaderFile}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleGalleryFiles}
      />
    </div>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#020617",
  color: "#e5e7eb",
};

const headerStyle: React.CSSProperties = {
  padding: "0.85rem 1.5rem",
  borderBottom: "1px solid #1e293b",
};

const headerInnerStyle: React.CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const brandStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#f1f5f9",
};

const subPageStyle: React.CSSProperties = {
  fontSize: "0.82rem",
  color: "#475569",
};

const navLinkStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#60a5fa",
  textDecoration: "none",
};

const mainStyle: React.CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "2.5rem 1.5rem 4rem",
};

const ghostBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.8rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "transparent",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: "0.8rem",
};

/* ── Gallery ── */

const gallerySectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.25rem",
};

const galleryTitleStyle: React.CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#e2e8f0",
  margin: 0,
};

const uploadBtnStyle: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: "0.375rem",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.82rem",
  fontWeight: 600,
};

const galleryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1rem",
};

const galleryCardStyle: React.CSSProperties = {
  position: "relative",
  borderRadius: "0.5rem",
  overflow: "hidden",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
};

const removeBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "0.4rem",
  right: "0.4rem",
  width: "1.4rem",
  height: "1.4rem",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.7rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  lineHeight: 1,
};

const galleryImgAreaStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
};

const galleryPlaceholderStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
  backgroundColor: "#1e293b",
};

const captionStyle: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  fontSize: "0.78rem",
  color: "#64748b",
};
