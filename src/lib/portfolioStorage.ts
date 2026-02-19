// Shared localStorage helpers for the portfolio and booking-page profile.

export const PORTFOLIO_KEY = "swarv_portfolio_v1";

export const DEFAULT_BIO =
  "Specialising in skin fades, textured crops, and classic cuts. " +
  "Bringing precision and style to every appointment. " +
  "Book online to secure your slot.";

// ─── types ────────────────────────────────────────────────────────────────────

export interface StoredImage {
  id: string;
  src: string;
  caption: string;
}

export interface StoredPortfolio {
  headerImage: string | null;
  gallery: StoredImage[]; // only real images; placeholders are never persisted
  bio?: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

export function loadPortfolio(): StoredPortfolio | null {
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("headerImage" in parsed) ||
      !("gallery" in parsed) ||
      !Array.isArray((parsed as StoredPortfolio).gallery)
    ) {
      return null;
    }
    return parsed as StoredPortfolio;
  } catch {
    return null;
  }
}

/**
 * Merges `updates` into the existing stored data and writes back.
 * Pages that only manage a subset of fields (e.g. booking page manages
 * headerImage + bio but not gallery) can call this safely without
 * overwriting fields they don't own.
 */
export function savePortfolio(updates: Partial<StoredPortfolio>): void {
  try {
    const existing: StoredPortfolio = loadPortfolio() ?? {
      headerImage: null,
      gallery: [],
    };
    localStorage.setItem(
      PORTFOLIO_KEY,
      JSON.stringify({ ...existing, ...updates })
    );
  } catch {
    // Quota exceeded or storage unavailable — silently ignore.
  }
}
