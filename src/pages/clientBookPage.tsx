import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useClientByEmail } from "../hooks/useClientByEmail";
import { useServices } from "../hooks/useServices";
import { useStaff } from "../hooks/useStaff";
import { useBookings, useCreateBooking } from "../hooks/useBookings";
import { ShopInfoBanner } from "../components/ShopInfoBanner";
import { BarberProfileHeader } from "../components/BarberProfileHeader";
import {
  loadPortfolio,
  savePortfolio,
  DEFAULT_BIO,
} from "../lib/portfolioStorage";
import type { Service, Staff, BookingWithDetails } from "../types/booking";

// ─── types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

// ─── date helpers (no external lib) ──────────────────────────────────────────

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayStr(): string {
  return toDateStr(new Date());
}

/** Shift a YYYY-MM-DD string by ±n days. */
function shiftDate(dateStr: string, days: number): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return toDateStr(new Date(y, mo - 1, d + days));
}

/** "Sat 21 Jun 2025" from a YYYY-MM-DD string. */
function formatDate(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function localMidnight(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0);
}

/** Generate 30-min slots 09:00–18:00, excluding any that overlap existing bookings. */
function getTimeSlots(
  dateStr: string,
  durationMinutes: number,
  existingBookings: BookingWithDetails[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [y, m, d] = dateStr.split("-").map(Number);
  const closeTime = new Date(y, m - 1, d, 18, 0, 0);

  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotStart = new Date(y, m - 1, d, hour, minute, 0);
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60_000);

      if (slotEnd > closeTime) continue;

      const overlaps = existingBookings.some((b) => {
        const bStart = new Date(b.start_time);
        const bEnd = new Date(b.end_time);
        return slotStart < bEnd && slotEnd > bStart;
      });

      if (!overlaps) {
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
        });
      }
    }
  }
  return slots;
}

// ─── component ────────────────────────────────────────────────────────────────

export function ClientBookPage() {
  const { session } = useAuth();
  const { data: clientRow, isLoading: clientLoading } = useClientByEmail();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: staff, isLoading: staffLoading } = useStaff();

  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // Range for the selected day — used to fetch existing bookings for slot exclusion.
  const dayStart = useMemo(() => localMidnight(selectedDate).toISOString(), [selectedDate]);
  const dayEnd = useMemo(() => {
    const d = localMidnight(selectedDate);
    d.setDate(d.getDate() + 1);
    return d.toISOString();
  }, [selectedDate]);

  const { data: dayBookings, isLoading: slotsLoading } = useBookings(
    step >= 3 ? (selectedStaff?.id ?? null) : null,
    dayStart,
    dayEnd
  );

  const timeSlots = useMemo(
    () =>
      selectedService && selectedDate
        ? getTimeSlots(selectedDate, selectedService.duration_minutes, dayBookings ?? [])
        : [],
    [selectedService, selectedDate, dayBookings]
  );

  const createBooking = useCreateBooking();

  // ── Profile (avatar + bio) — persisted to localStorage ─────────────────────

  const [avatarSrc, setAvatarSrc] = useState<string | null>(
    () => loadPortfolio()?.headerImage ?? null
  );
  const [bio, setBio] = useState<string>(
    () => loadPortfolio()?.bio ?? DEFAULT_BIO
  );
  const avatarInputRef = useRef<HTMLInputElement>(null);

  function handleAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarSrc(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  useEffect(() => {
    savePortfolio({ headerImage: avatarSrc, bio });
  }, [avatarSrc, bio]);

  // ── Guards ─────────────────────────────────────────────────────────────────

  if (!session) {
    return (
      <div style={centerStyle}>
        <p>
          Please{" "}
          <Link to="/auth/login" style={{ color: "#60a5fa" }}>
            sign in
          </Link>{" "}
          to book an appointment.
        </p>
      </div>
    );
  }

  if (clientLoading) {
    return (
      <div style={centerStyle}>
        <p style={{ color: "#64748b" }}>Loading your profile…</p>
      </div>
    );
  }

  if (!clientRow) {
    return (
      <div style={centerStyle}>
        <p style={{ color: "#fca5a5" }}>
          Your account isn't linked to a client record yet. Please contact the shop to get
          set up.
        </p>
      </div>
    );
  }

  // ── Success screen ─────────────────────────────────────────────────────────

  if (bookingDone) {
    return (
      <div style={pageStyle}>
        <header style={headerStyle}>
          <div style={headerInnerStyle}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
              <span style={brandStyle}>Swarv Barbershop</span>
              <span style={subPageStyle}>Book an Appointment</span>
            </div>
            <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Link to="/portfolio" style={navLinkStyle}>Portfolio</Link>
              <Link to="/my-bookings" style={navLinkStyle}>My Bookings →</Link>
            </nav>
          </div>
        </header>
        <ShopInfoBanner />
        <main style={mainStyle}>
          <div style={successBoxStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.4rem" }}>✓</span>
              <h2 style={{ margin: 0, fontSize: "1.1rem", color: "#86efac" }}>
                Booking submitted!
              </h2>
            </div>
            <p style={{ margin: "0.25rem 0 1rem", fontSize: "0.88rem", color: "#86efac" }}>
              Your request is <strong>pending confirmation</strong>. We'll be in touch shortly.
            </p>

            {selectedService && selectedStaff && selectedSlot && (
              <div style={successSummaryStyle}>
                <SummaryRow label="Service" value={selectedService.name} />
                <SummaryRow label="Stylist" value={selectedStaff.name} />
                <SummaryRow label="Date" value={formatDate(selectedDate)} />
                <SummaryRow label="Time" value={selectedSlot.label} />
                <SummaryRow
                  label="Duration"
                  value={`${selectedService.duration_minutes} min`}
                />
                <SummaryRow
                  label="Price"
                  value={`£${Number(selectedService.price).toFixed(2)}`}
                />
              </div>
            )}

            <Link to="/my-bookings" style={linkBtnStyle}>
              View my bookings →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ── Confirm handler ────────────────────────────────────────────────────────

  function handleConfirm() {
    if (!clientRow || !selectedStaff || !selectedService || !selectedSlot) return;
    createBooking.mutate(
      {
        client_id: clientRow.id,
        staff_id: selectedStaff.id,
        service_id: selectedService.id,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
        notes: notes.trim() || undefined,
      },
      { onSuccess: () => setBookingDone(true) }
    );
  }

  // ── Wizard ─────────────────────────────────────────────────────────────────

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
            <span style={brandStyle}>Swarv Barbershop</span>
            <span style={subPageStyle}>Book an Appointment</span>
          </div>
          <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link to="/portfolio" style={navLinkStyle}>Portfolio</Link>
            <Link to="/my-bookings" style={navLinkStyle}>My Bookings →</Link>
          </nav>
        </div>
      </header>
      <ShopInfoBanner />

      <main style={mainStyle}>
        <BarberProfileHeader
          name="Errol L. Jones"
          title="Master Barber · Swarv Barbershop, Sheffield"
          bio={bio}
          avatarSrc={avatarSrc}
        />

        {/* ── Profile controls ── */}
        <div style={profileControlsStyle}>
          <button
            onClick={() => avatarInputRef.current?.click()}
            style={profileGhostBtnStyle}
          >
            Change avatar
          </button>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={bioTextareaStyle}
            rows={2}
            placeholder="Write a short bio…"
          />
        </div>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarFile}
        />

        {/* Step indicator */}
        <div style={stepRowStyle}>
          {(["1. Service", "2. Stylist", "3. Date & Time", "4. Confirm"] as const).map(
            (label, i) => (
              <span
                key={label}
                style={{
                  ...pillStyle,
                  backgroundColor:
                    step === i + 1 ? "#2563eb" : step > i + 1 ? "#1e3a5f" : "#1e293b",
                  color:
                    step === i + 1 ? "#fff" : step > i + 1 ? "#93c5fd" : "#475569",
                }}
              >
                {label}
              </span>
            )
          )}
        </div>

        {/* ── Step 1: Service ── */}
        {step === 1 && (
          <section>
            <h2 style={sectionH2}>Select a service</h2>
            {servicesLoading && <p style={mutedText}>Loading…</p>}
            <div style={cardGridStyle}>
              {services?.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedService(s);
                    setStep(2);
                  }}
                  style={cardBtnStyle(selectedService?.id === s.id)}
                >
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{s.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.3rem" }}>
                    {s.duration_minutes} min · £{Number(s.price).toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── Step 2: Stylist ── */}
        {step === 2 && (
          <section>
            <h2 style={sectionH2}>Select a stylist</h2>
            {staffLoading && <p style={mutedText}>Loading…</p>}
            <div style={cardGridStyle}>
              {staff?.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStaff(st);
                    setStep(3);
                  }}
                  style={cardBtnStyle(selectedStaff?.id === st.id)}
                >
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{st.name}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={backBtnStyle}>
              ← Back
            </button>
          </section>
        )}

        {/* ── Step 3: Date & Time ── */}
        {step === 3 && (
          <section>
            <h2 style={sectionH2}>Select a date &amp; time</h2>

            {/* Day navigation — prev / label / next */}
            <div style={dayNavStyle}>
              <button
                onClick={() => {
                  setSelectedDate(shiftDate(selectedDate, -1));
                  setSelectedSlot(null);
                }}
                disabled={selectedDate <= todayStr()}
                style={dayNavBtnStyle(selectedDate <= todayStr())}
              >
                ◀ Prev
              </button>
              <span style={dayNavLabelStyle}>{formatDate(selectedDate)}</span>
              <button
                onClick={() => {
                  setSelectedDate(shiftDate(selectedDate, 1));
                  setSelectedSlot(null);
                }}
                style={dayNavBtnStyle(false)}
              >
                Next ▶
              </button>
            </div>

            {slotsLoading && <p style={mutedText}>Checking availability…</p>}

            {!slotsLoading && timeSlots.length === 0 && (
              <p style={mutedText}>No available slots for this date. Try another day.</p>
            )}

            {!slotsLoading && timeSlots.length > 0 && (
              <div style={slotGridStyle}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot.start}
                    onClick={() => setSelectedSlot(slot)}
                    style={slotBtnStyle(selectedSlot?.start === slot.start)}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(2)} style={backBtnStyle}>
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedSlot}
                style={primaryBtnStyle(!selectedSlot)}
              >
                Continue →
              </button>
            </div>
          </section>
        )}

        {/* ── Step 4: Review & Confirm ── */}
        {step === 4 && selectedService && selectedStaff && selectedSlot && (
          <section>
            <h2 style={sectionH2}>Review &amp; confirm</h2>
            <div style={summaryBoxStyle}>
              <SummaryRow label="Service" value={selectedService.name} />
              <SummaryRow label="Stylist" value={selectedStaff.name} />
              <SummaryRow label="Date" value={formatDate(selectedDate)} />
              <SummaryRow label="Time" value={selectedSlot.label} />
              <SummaryRow
                label="Duration"
                value={`${selectedService.duration_minutes} min`}
              />
              <SummaryRow
                label="Price"
                value={`£${Number(selectedService.price).toFixed(2)}`}
              />
            </div>

            <label style={{ ...labelStyle, marginTop: "1.25rem" }}>
              Notes (optional)
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any requests or information for your stylist…"
                style={{ ...inputStyle, resize: "vertical", marginTop: "0.35rem" }}
              />
            </label>

            {createBooking.isError && (
              <p style={errorStyle}>
                Error: {(createBooking.error as Error).message}
              </p>
            )}

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(3)} style={backBtnStyle}>
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={createBooking.isPending}
                style={primaryBtnStyle(createBooking.isPending)}
              >
                {createBooking.isPending ? "Booking…" : "Confirm Booking"}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ─── sub-component ────────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.45rem 0",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{label}</span>
      <span style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 500 }}>{value}</span>
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

const stepRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginBottom: "1.75rem",
};

const pillStyle: React.CSSProperties = {
  padding: "0.25rem 0.75rem",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 500,
};

const sectionH2: React.CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "1rem",
  color: "#e2e8f0",
};

const mutedText: React.CSSProperties = {
  color: "#64748b",
  fontSize: "0.85rem",
};

const cardGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "0.75rem",
  marginBottom: "1rem",
};

function cardBtnStyle(selected: boolean): React.CSSProperties {
  return {
    padding: "1rem",
    borderRadius: "0.5rem",
    border: `1px solid ${selected ? "#2563eb" : "#1e293b"}`,
    backgroundColor: selected ? "#1e3a5f" : "#0f172a",
    color: "#e5e7eb",
    cursor: "pointer",
    textAlign: "left",
  };
}

/* ── Day navigation ── */

const dayNavStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  marginBottom: "1.25rem",
  padding: "0.6rem 0.85rem",
  borderRadius: "0.5rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
};

const dayNavLabelStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#e2e8f0",
};

function dayNavBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "0.35rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #1e293b",
    backgroundColor: disabled ? "#111827" : "#1e293b",
    color: disabled ? "#374151" : "#e2e8f0",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "0.82rem",
    fontWeight: 500,
  };
}

/* ── Time slots ── */

const slotGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "0.5rem",
};

function slotBtnStyle(selected: boolean): React.CSSProperties {
  return {
    padding: "0.5rem 0",
    borderRadius: "0.375rem",
    border: `1px solid ${selected ? "#2563eb" : "#1e293b"}`,
    backgroundColor: selected ? "#2563eb" : "#0f172a",
    color: selected ? "#fff" : "#e5e7eb",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: selected ? 600 : 400,
    textAlign: "center",
  };
}

/* ── Buttons ── */

const backBtnStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#111827",
  color: "#e5e7eb",
  cursor: "pointer",
  fontSize: "0.85rem",
};

function primaryBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "0.5rem 1.25rem",
    borderRadius: "0.375rem",
    border: "none",
    backgroundColor: disabled ? "#1e3a5f" : "#2563eb",
    color: disabled ? "#64748b" : "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
  };
}

/* ── Form ── */

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  color: "#94a3b8",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
  color: "#e5e7eb",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

/* ── Summary / Success ── */

const summaryBoxStyle: React.CSSProperties = {
  padding: "0.25rem 1rem",
  borderRadius: "0.5rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
};

const successBoxStyle: React.CSSProperties = {
  padding: "1.5rem",
  borderRadius: "0.5rem",
  border: "1px solid #166534",
  backgroundColor: "#052e16",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const successSummaryStyle: React.CSSProperties = {
  padding: "0.25rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid #166534",
  backgroundColor: "#071f0f",
  marginBottom: "0.5rem",
};

const linkBtnStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "0.75rem",
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  backgroundColor: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: 600,
  alignSelf: "flex-start",
};

const errorStyle: React.CSSProperties = {
  marginTop: "0.75rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.375rem",
  backgroundColor: "#450a0a",
  color: "#fca5a5",
  fontSize: "0.85rem",
};

/* ── Profile controls (avatar + bio edit) ── */

const profileControlsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
  marginTop: "-1.75rem",   // pull up under the hero section's 3rem gap
  marginBottom: "1.75rem",
};

const profileGhostBtnStyle: React.CSSProperties = {
  alignSelf: "flex-start",
  padding: "0.35rem 0.8rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "transparent",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: "0.8rem",
};

const bioTextareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.6rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
  color: "#e2e8f0",
  fontSize: "0.85rem",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.5,
  boxSizing: "border-box",
};
