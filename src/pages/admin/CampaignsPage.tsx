import React, { useState } from "react";
import { useMarketingSegment } from "../../hooks/useMarketingSegment";
import { AdminHeader } from "../../components/admin/AdminHeader";
import {
  sendTestEmail,
  sendBulkEmail,
  renderBody,
} from "../../services/email";

const TEST_EMAIL = "test@swarvbook.dev";

export function CampaignsPage() {
  const { data, isLoading, isError, error } = useMarketingSegment();

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState<
    { email: string; rendered: string }[] | null
  >(null);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  const segment = data?.clients || [];
  const segmentTotal = data?.total || 0;

  function handlePreview() {
    const first5 = segment.slice(0, 5);
    setPreview(
      first5.map((c) => ({
        email: c.email || "(no email)",
        rendered: renderBody(body, c.first_name),
      }))
    );
    setStatus(null);
  }

  async function handleTestSend() {
    setBusy(true);
    setStatus(null);
    setPreview(null);
    const result = await sendTestEmail({
      to: TEST_EMAIL,
      subject,
      body,
    });
    setStatus({
      type: result.ok ? "success" : "error",
      text: result.message,
    });
    setBusy(false);
  }

  async function handleBulkSend() {
    setBusy(true);
    setStatus(null);
    setPreview(null);
    const recipients = segment
      .filter((c) => c.email)
      .map((c) => ({ email: c.email!, first_name: c.first_name }));

    const result = await sendBulkEmail({ recipients, subject, body });
    setStatus({
      type: result.ok ? "success" : "error",
      text: result.message,
    });
    setBusy(false);
  }

  const formReady = subject.trim() !== "" && body.trim() !== "";

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f9fafb" }}
    >
      <AdminHeader title="Admin – Campaigns" />

      <main style={{ padding: "1.5rem 2rem", maxWidth: "720px" }}>
        {/* Segment count */}
        {isLoading && <p>Loading marketing segment...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}
        {!isLoading && !isError && (
          <p style={segmentBadgeStyle}>
            <strong>{segmentTotal}</strong> clients opted in to marketing
          </p>
        )}

        {/* Compose form */}
        <section style={{ marginTop: "1.5rem" }}>
          <label style={labelStyle}>
            Subject
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Summer offer just for you!"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Message body{" "}
            <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
              (use {"{{first_name}}"} for personalisation)
            </span>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Hi {{first_name}},\n\nWe have exciting news...`}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </label>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={handlePreview}
              disabled={!formReady || busy}
              style={actionBtnStyle(!formReady || busy)}
            >
              Preview first 5 recipients
            </button>
            <button
              onClick={handleTestSend}
              disabled={!formReady || busy}
              style={actionBtnStyle(!formReady || busy)}
            >
              {busy ? "Sending..." : `Send test to ${TEST_EMAIL}`}
            </button>
            <button
              onClick={handleBulkSend}
              disabled={!formReady || busy || segmentTotal === 0}
              style={primaryBtnStyle(!formReady || busy || segmentTotal === 0)}
            >
              {busy ? "Sending..." : "Send campaign to all opted-in clients"}
            </button>
          </div>
        </section>

        {/* Status message */}
        {status && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.6rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor:
                status.type === "success" ? "#052e16" : "#450a0a",
              color: status.type === "success" ? "#86efac" : "#fca5a5",
              fontSize: "0.85rem",
            }}
          >
            {status.text}
          </div>
        )}

        {/* Preview panel */}
        {preview && (
          <section style={{ marginTop: "1.5rem" }}>
            <h2
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#64748b",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Preview – first {preview.length} recipients
            </h2>
            {preview.map((p, i) => (
              <div key={i} style={previewCardStyle}>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.25rem" }}>
                  To: {p.email}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#e2e8f0", whiteSpace: "pre-wrap" }}>
                  {p.rendered}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

/* ─── styles ─── */

const segmentBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.4rem 0.75rem",
  borderRadius: "0.375rem",
  backgroundColor: "#0f172a",
  border: "1px solid #1e293b",
  fontSize: "0.85rem",
  color: "#94a3b8",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "1rem",
  fontSize: "0.85rem",
  color: "#94a3b8",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: "0.25rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
  color: "#f9fafb",
  fontSize: "0.9rem",
  fontFamily: "inherit",
};

function actionBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "0.5rem 0.9rem",
    borderRadius: "0.375rem",
    border: "1px solid #1e293b",
    backgroundColor: disabled ? "#1f2937" : "#111827",
    color: disabled ? "#6b7280" : "#f9fafb",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "0.85rem",
  };
}

function primaryBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "0.5rem 0.9rem",
    borderRadius: "0.375rem",
    border: "none",
    backgroundColor: disabled ? "#1e3a5f" : "#2563eb",
    color: disabled ? "#6b7280" : "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
  };
}

const previewCardStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
  marginBottom: "0.5rem",
};
