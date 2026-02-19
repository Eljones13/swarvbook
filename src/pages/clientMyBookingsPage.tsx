import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useClientByEmail, useReferralInfo } from "../hooks/useClientByEmail";
import { useClientBookings, useCancelBooking, canCancelBooking } from "../hooks/useBookings";
import { ShopInfoBanner } from "../components/ShopInfoBanner";
import { RecommendFriendCard } from "../components/RecommendFriendCard";
import type { BookingWithDetails, BookingStatus } from "../types/booking";

// ─── component ────────────────────────────────────────────────────────────────

export function ClientMyBookingsPage() {
  const { session } = useAuth();
  const { data: clientRow, isLoading: clientLoading } = useClientByEmail();
  const { data: bookings, isLoading: bookingsLoading } = useClientBookings(
    clientRow?.id ?? null
  );
  const cancelBooking = useCancelBooking();
  const { data: referral } = useReferralInfo();

  if (!session) {
    return (
      <div style={centerStyle}>
        <p>
          Please{" "}
          <Link to="/auth/login" style={{ color: "#60a5fa" }}>
            sign in
          </Link>{" "}
          to view your bookings.
        </p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
            <span style={brandStyle}>Swarv Barbershop</span>
            <span style={subPageStyle}>My Bookings</span>
          </div>
          <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link to="/portfolio" style={navLinkStyle}>Portfolio</Link>
            <Link to="/book" style={bookBtnStyle}>+ Book New</Link>
          </nav>
        </div>
      </header>

      <ShopInfoBanner />

      <main style={mainStyle}>
        {(clientLoading || bookingsLoading) && (
          <p style={mutedText}>Loading…</p>
        )}

        {!clientLoading && !clientRow && (
          <p style={{ color: "#fca5a5", fontSize: "0.9rem" }}>
            Your account isn't linked to a client record. Please contact the shop to get set up.
          </p>
        )}

        {clientRow && !bookingsLoading && bookings?.length === 0 && (
          <div style={emptyStyle}>
            <p style={{ margin: 0 }}>You have no upcoming bookings.</p>
            <Link to="/book" style={bookBtnStyle}>
              Book an appointment
            </Link>
          </div>
        )}

        {bookings && bookings.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {bookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                cancelling={cancelBooking.isPending}
                onCancel={() => cancelBooking.mutate(b.id)}
              />
            ))}
          </div>
        )}

        <RecommendFriendCard referral={referral ?? null} />
      </main>
    </div>
  );
}

// ─── booking card ─────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<BookingStatus, { bg: string; fg: string }> = {
  pending: { bg: "#854d0e", fg: "#fef08a" },
  confirmed: { bg: "#1e3a5f", fg: "#93c5fd" },
  completed: { bg: "#052e16", fg: "#86efac" },
  no_show: { bg: "#450a0a", fg: "#fca5a5" },
  cancelled: { bg: "#1f2937", fg: "#6b7280" },
};

const TERMINAL_STATUSES: BookingStatus[] = ["cancelled", "no_show", "completed"];

interface CardProps {
  booking: BookingWithDetails;
  cancelling: boolean;
  onCancel: () => void;
}

function BookingCard({ booking, cancelling, onCancel }: CardProps) {
  const start = new Date(booking.start_time);
  const isTerminal = TERMINAL_STATUSES.includes(booking.status);
  const canCancel = !isTerminal && canCancelBooking(booking.start_time);
  const colors = STATUS_COLORS[booking.status] ?? STATUS_COLORS.pending;

  return (
    <div style={cardStyle}>
      {/* Top row: details + status badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f1f5f9" }}>
            {booking.services?.name ?? "Service"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.15rem" }}>
            with {booking.staff?.name ?? "Stylist"}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#e2e8f0", marginTop: "0.4rem" }}>
            {start.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" · "}
            {start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        <span
          style={{
            padding: "0.2rem 0.6rem",
            borderRadius: "999px",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            backgroundColor: colors.bg,
            color: colors.fg,
          }}
        >
          {booking.status.replace("_", " ")}
        </span>
      </div>

      {/* Cancel row — always rendered for non-terminal bookings */}
      {!isTerminal && (
        <div style={{ marginTop: "0.75rem" }}>
          <button
            onClick={canCancel ? onCancel : undefined}
            disabled={!canCancel || cancelling}
            style={canCancel ? cancelBtnStyle : cancelLateBtnStyle}
          >
            {cancelling
              ? "Cancelling…"
              : canCancel
              ? "Cancel booking"
              : "Cancel late – call the shop"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#020617",
  color: "#e5e7eb",
};

const centerStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#020617",
  color: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
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
  maxWidth: "680px",
  margin: "0 auto",
  padding: "2rem 1.5rem 3rem",
};

const bookBtnStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.4rem 0.85rem",
  borderRadius: "0.375rem",
  backgroundColor: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
};

const emptyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "1rem",
  padding: "1.5rem 0",
  color: "#64748b",
  fontSize: "0.9rem",
};

const cardStyle: React.CSSProperties = {
  padding: "1rem 1.25rem",
  borderRadius: "0.5rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
};

const cancelBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid #7f1d1d",
  backgroundColor: "#1a0505",
  color: "#fca5a5",
  cursor: "pointer",
  fontSize: "0.8rem",
};

const cancelLateBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid #374151",
  backgroundColor: "#1f2937",
  color: "#6b7280",
  cursor: "not-allowed",
  fontSize: "0.8rem",
};

const mutedText: React.CSSProperties = {
  color: "#64748b",
  fontSize: "0.85rem",
};
