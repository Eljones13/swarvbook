import React, { useState, useMemo } from "react";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { useStaff } from "../../hooks/useStaff";
import { useBookings } from "../../hooks/useBookings";
import { BookingDetailDrawer } from "../../components/admin/BookingDetailDrawer";
import type { BookingWithDetails, BookingStatus } from "../../types/booking";

/* ─── constants ─── */

const HOURS = Array.from({ length: 10 }, (_, i) => 9 + i); // 09–18
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/* ─── helpers ─── */

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function clientName(b: BookingWithDetails): string {
  if (!b.clients) return "Unknown";
  return (
    b.clients.full_name ||
    [b.clients.first_name, b.clients.last_name].filter(Boolean).join(" ") ||
    "Unknown"
  );
}

function serviceName(b: BookingWithDetails): string {
  return b.services?.name || "Service";
}

/* ─── component ─── */

export function CalendarPage() {
  const { data: staff, isLoading: staffLoading } = useStaff();

  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithDetails | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Compute the Monday of the target week
  const weekStart = useMemo(() => {
    const today = new Date();
    const monday = startOfWeek(today);
    return addDays(monday, weekOffset * 7);
  }, [weekOffset]);

  const weekEnd = addDays(weekStart, 7);

  // Auto-select first staff member once loaded
  const activeStaffId =
    selectedStaffId ?? (staff && staff.length > 0 ? staff[0].id : null);

  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError,
    error,
  } = useBookings(
    activeStaffId,
    weekStart.toISOString(),
    weekEnd.toISOString()
  );

  // Group bookings by day index (0=Mon) and hour
  const grid = useMemo(() => {
    const map = new Map<string, BookingWithDetails[]>();
    if (!bookings) return map;

    for (const b of bookings) {
      const d = new Date(b.start_time);
      const dayOfWeek = d.getDay(); // 0=Sun
      const dayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Mon=0
      const hour = d.getHours();
      const key = `${dayIdx}-${hour}`;
      const arr = map.get(key) || [];
      arr.push(b);
      map.set(key, arr);
    }
    return map;
  }, [bookings]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f9fafb" }}>
      <AdminHeader title="Admin – Calendar" />

      <main style={{ padding: "1rem 2rem" }}>
        {/* Controls row */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
          {/* Staff picker */}
          <label style={{ fontSize: "0.85rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Staff:
            {staffLoading ? (
              <span style={{ color: "#64748b" }}>Loading...</span>
            ) : (
              <select
                value={activeStaffId || ""}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                style={selectStyle}
              >
                {staff?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
                {(!staff || staff.length === 0) && (
                  <option value="">No staff found</option>
                )}
              </select>
            )}
          </label>

          {/* Week navigation */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button onClick={() => setWeekOffset((w) => w - 1)} style={navBtnStyle}>
              ← Prev
            </button>
            <button onClick={() => setWeekOffset(0)} style={navBtnStyle}>
              Today
            </button>
            <button onClick={() => setWeekOffset((w) => w + 1)} style={navBtnStyle}>
              Next →
            </button>
          </div>

          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
            {formatShortDate(weekStart)} – {formatShortDate(addDays(weekStart, 6))}
          </span>
        </div>

        {isError && (
          <p style={{ color: "#fca5a5" }}>Error: {(error as Error).message}</p>
        )}

        {/* Calendar grid */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: "800px" }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: "60px" }}>Time</th>
                {DAY_LABELS.map((label, i) => {
                  const dayDate = addDays(weekStart, i);
                  const isToday = toISODate(dayDate) === toISODate(new Date());
                  return (
                    <th
                      key={label}
                      style={{
                        ...thStyle,
                        backgroundColor: isToday ? "#1e293b" : undefined,
                      }}
                    >
                      {label}
                      <br />
                      <span style={{ fontWeight: 400, fontSize: "0.7rem", color: "#64748b" }}>
                        {formatShortDate(dayDate)}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td style={timeCellStyle}>
                    {String(hour).padStart(2, "0")}:00
                  </td>
                  {DAY_LABELS.map((_, dayIdx) => {
                    const key = `${dayIdx}-${hour}`;
                    const items = grid.get(key) || [];
                    const dayDate = addDays(weekStart, dayIdx);
                    const isToday = toISODate(dayDate) === toISODate(new Date());
                    return (
                      <td
                        key={key}
                        style={{
                          ...cellStyle,
                          backgroundColor: isToday ? "#0f172a" : undefined,
                        }}
                      >
                        {items.map((b) => (
                          <BookingChip
                            key={b.id}
                            booking={b}
                            onClick={() => {
                              setSelectedBooking(b);
                              setDrawerOpen(true);
                            }}
                          />
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookingsLoading && (
          <p style={{ marginTop: "1rem", color: "#64748b" }}>Loading bookings...</p>
        )}

        {!bookingsLoading && bookings && bookings.length === 0 && (
          <p style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.85rem" }}>
            No bookings this week. Once you create the tables and seed data in
            Supabase, bookings will appear here.
          </p>
        )}
      </main>

      <BookingDetailDrawer
        booking={selectedBooking}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

/* ─── BookingChip sub-component ─── */

const STATUS_COLORS: Record<BookingStatus, { bg: string; fg: string }> = {
  pending: { bg: "#854d0e", fg: "#fef08a" },
  confirmed: { bg: "#1e3a5f", fg: "#93c5fd" },
  completed: { bg: "#052e16", fg: "#86efac" },
  no_show: { bg: "#450a0a", fg: "#fca5a5" },
  cancelled: { bg: "#1f2937", fg: "#6b7280" },
};

function BookingChip({
  booking,
  onClick,
}: {
  booking: BookingWithDetails;
  onClick: () => void;
}) {
  const colors = STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
  const time = new Date(booking.start_time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={onClick}
      style={{
        padding: "0.25rem 0.4rem",
        borderRadius: "0.25rem",
        backgroundColor: colors.bg,
        marginBottom: "0.2rem",
        fontSize: "0.7rem",
        lineHeight: 1.3,
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: 600, color: colors.fg }}>
        {time} · {serviceName(booking)}
      </div>
      <div style={{ color: "#cbd5e1" }}>{clientName(booking)}</div>
      <span
        style={{
          display: "inline-block",
          marginTop: "0.1rem",
          fontSize: "0.6rem",
          padding: "0.05rem 0.3rem",
          borderRadius: "0.2rem",
          backgroundColor: colors.bg,
          color: colors.fg,
          border: `1px solid ${colors.fg}33`,
          textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}
      >
        {booking.status}
      </span>
    </div>
  );
}

/* ─── styles ─── */

const thStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "0.5rem 0.25rem",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "#e5e7eb",
  borderBottom: "1px solid #1e293b",
};

const timeCellStyle: React.CSSProperties = {
  padding: "0.4rem 0.5rem",
  fontSize: "0.75rem",
  color: "#64748b",
  borderBottom: "1px solid #0f172a",
  verticalAlign: "top",
  textAlign: "right",
};

const cellStyle: React.CSSProperties = {
  padding: "0.25rem",
  borderBottom: "1px solid #0f172a",
  borderLeft: "1px solid #0f172a",
  verticalAlign: "top",
  height: "60px",
};

const selectStyle: React.CSSProperties = {
  padding: "0.35rem 0.5rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
  color: "#f9fafb",
  fontSize: "0.85rem",
};

const navBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.7rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#111827",
  color: "#f9fafb",
  cursor: "pointer",
  fontSize: "0.8rem",
};
