import type { Client } from "../../hooks/useClients";

interface Props {
  client: Client;
  onClose: () => void;
}

export function ClientDetailDrawer({ client, onClose }: Props) {
  const name =
    client.full_name ||
    [client.first_name, client.last_name].filter(Boolean).join(" ") ||
    "Unknown";

  function fmt(date: string | null) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function bool(val: boolean | null) {
    if (val === null) return "-";
    return val ? "Yes" : "No";
  }

  return (
    <>
      {/* backdrop */}
      <div onClick={onClose} style={backdropStyle} />

      {/* drawer */}
      <aside style={drawerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{name}</h2>
          <button onClick={onClose} style={closeBtnStyle}>
            &times;
          </button>
        </div>

        <Section title="Contact">
          <Row label="Email" value={client.email || "-"} />
          <Row label="Phone" value={client.phone || "-"} />
          <Row label="Address" value={client.address_line || "-"} />
          <Row label="Zipcode" value={client.zipcode || "-"} />
        </Section>

        <Section title="Details">
          <Row label="Birthday" value={fmt(client.birthday)} />
          <Row label="Created" value={fmt(client.created_at)} />
          <Row label="Card ID" value={client.customer_card_id?.toString() || "-"} />
          <Row label="Allergens" value={client.allergens || "-"} />
        </Section>

        <Section title="Notes">
          <p style={{ color: "#cbd5e1", fontSize: "0.85rem", whiteSpace: "pre-wrap" }}>
            {client.notes || "No notes."}
          </p>
        </Section>

        <Section title="Flags">
          <Row label="Marketing opt-in" value={bool(client.marketing_opt_in)} />
          <Row label="Processing consent" value={bool(client.processing_consent)} />
          <Row label="Trusted" value={bool(client.trusted)} />
          <Row label="Blacklisted" value={bool(client.blacklisted)} />
        </Section>

        <Section title="Bookings">
          <p style={{ color: "#64748b", fontSize: "0.85rem", fontStyle: "italic" }}>
            Bookings will appear here later.
          </p>
        </Section>
      </aside>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <h3 style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.5rem" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", fontSize: "0.85rem" }}>
      <span style={{ color: "#94a3b8" }}>{label}</span>
      <span style={{ color: "#e2e8f0" }}>{value}</span>
    </div>
  );
}

const backdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 40,
};

const drawerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "400px",
  maxWidth: "100vw",
  height: "100vh",
  overflowY: "auto",
  backgroundColor: "#0f172a",
  borderLeft: "1px solid #1e293b",
  padding: "1.5rem",
  color: "#f9fafb",
  zIndex: 50,
};

const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#94a3b8",
  fontSize: "1.5rem",
  cursor: "pointer",
  lineHeight: 1,
};
