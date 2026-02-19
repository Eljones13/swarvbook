import React, { useState, useEffect } from "react";
import { BOOKING_STATUSES } from "../../types/booking";
import type { BookingStatus, BookingWithDetails } from "../../types/booking";
import { useUpdateBooking } from "../../hooks/useBookings";

// ─── props ────────────────────────────────────────────────────────────────────

interface Props {
  booking: BookingWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function resolveClientName(b: BookingWithDetails): string {
  if (!b.clients) return "Unknown";
  return (
    b.clients.full_name ||
    [b.clients.first_name, b.clients.last_name].filter(Boolean).join(" ") ||
    "Unknown"
  );
}

// ─── component ────────────────────────────────────────────────────────────────

export function BookingDetailDrawer({ booking, isOpen, onClose }: Props) {
  const [status, setStatus] = useState<BookingStatus>("pending");
  const [notes, setNotes] = useState("");
  const update = useUpdateBooking();

  // Sync form state only when the selected booking ID changes.
  useEffect(() => {
    if (booking) {
      setStatus(booking.status);
      setNotes(booking.notes ?? "");
    }
  }, [booking?.id]);

  if (!isOpen || !booking) return null;

  const clientName = resolveClientName(booking);
  const start = new Date(booking.start_time);
  const end = new Date(booking.end_time);

  function handleSave() {
    if (!booking) return;
    update.mutate(
      { id: booking.id, status, notes: notes.trim() || null },
      { onSuccess: onClose }
    );
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={drawerStyle} onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div style={drawerHeaderStyle}>
          <span style={drawerTitleStyle}>Booking details</span>
          <button onClick={onClose} style={closeBtnStyle} aria-label="Close">
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div style={drawerBodyStyle}>

          {/* Client */}
          <DrawerSection label="Client">
            <DrawerField label="Name" value={clientName} />
            {booking.clients?.email && (
              <DrawerField label="Email" value={booking.clients.email} />
            )}
            {booking.clients?.phone && (
              <DrawerField label="Phone" value={booking.clients.phone} />
            )}
          </DrawerSection>

          {/* Service */}
          <DrawerSection label="Service">
            <DrawerField label="Name" value={booking.services?.name ?? "—"} />
            {booking.services?.price != null && (
              <DrawerField
                label="Price"
                value={`£${Number(booking.services.price).toFixed(2)}`}
              />
            )}
            {booking.services?.duration_minutes != null && (
              <DrawerField
                label="Duration"
                value={`${booking.services.duration_minutes} min`}
              />
            )}
          </DrawerSection>

          {/* Time */}
          <DrawerSection label="Time">
            <DrawerField
              label="Date"
              value={start.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <DrawerField
              label="Start"
              value={start.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <DrawerField
              label="End"
              value={end.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </DrawerSection>

          {/* Status */}
          <DrawerSection label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              style={selectStyle}
            >
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </DrawerSection>

          {/* Notes */}
          <DrawerSection label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={textareaStyle}
              rows={3}
              placeholder="Add notes…"
            />
          </DrawerSection>

        </div>

        {/* ── Footer ── */}
        <div style={footerStyle}>
          <button onClick={onClose} style={cancelBtnStyle}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={update.isPending}
            style={saveBtnStyle}
          >
            {update.isPending ? "Saving…" : "Save changes"}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── sub-components ───────────────────────────────────────────────────────────

function DrawerSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={sectionStyle}>
      <div style={sectionLabelStyle}>{label}</div>
      {children}
    </div>
  );
}

function DrawerField({ label, value }: { label: string; value: string }) {
  return (
    <div style={fieldRowStyle}>
      <span style={fieldLabelStyle}>{label}</span>
      <span style={fieldValueStyle}>{value}</span>
    </div>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  zIndex: 100,
};

const drawerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "380px",
  maxWidth: "100vw",
  backgroundColor: "#0f172a",
  borderLeft: "1px solid #1e293b",
  display: "flex",
  flexDirection: "column",
  zIndex: 101,
};

const drawerHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 1.25rem",
  borderBottom: "1px solid #1e293b",
  flexShrink: 0,
};

const drawerTitleStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#f1f5f9",
};

const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#64748b",
  cursor: "pointer",
  fontSize: "1rem",
  lineHeight: 1,
  padding: "0.25rem",
};

const drawerBodyStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "1rem 1.25rem",
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.6rem",
  padding: "0.9rem 1.25rem",
  borderTop: "1px solid #1e293b",
  flexShrink: 0,
};

const cancelBtnStyle: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "transparent",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: "0.82rem",
};

const saveBtnStyle: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: "0.375rem",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.82rem",
  fontWeight: 600,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "1.25rem",
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "#475569",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "0.4rem",
};

const fieldRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: "0.25rem 0",
  fontSize: "0.85rem",
};

const fieldLabelStyle: React.CSSProperties = {
  color: "#64748b",
};

const fieldValueStyle: React.CSSProperties = {
  color: "#e2e8f0",
  textAlign: "right",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.4rem 0.6rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#020617",
  color: "#f1f5f9",
  fontSize: "0.85rem",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.6rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#020617",
  color: "#f1f5f9",
  fontSize: "0.85rem",
  resize: "vertical",
  fontFamily: "inherit",
  boxSizing: "border-box",
};
