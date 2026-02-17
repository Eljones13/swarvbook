import React, { useState } from "react";
import { useClients } from "../../hooks/useClients";
import type { Client } from "../../hooks/useClients";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { ClientDetailDrawer } from "../../components/admin/ClientDetailDrawer";

const PAGE_SIZE = 25;

export function ClientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { data, isLoading, isError, error } = useClients(search, page);

  const total = data?.total || 0;
  const clients = data?.clients || [];
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f9fafb" }}>
      <AdminHeader title="Admin – Clients" />

      <main style={{ padding: "1rem 2rem" }}>
        <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Search name, email, or phone..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #1e293b",
              backgroundColor: "#0f172a",
              color: "#f9fafb",
            }}
          />
          <button
            onClick={() => setSearch("")}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #1e293b",
              backgroundColor: "#111827",
              color: "#f9fafb",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>

        {isLoading && <p>Loading clients...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}

        {!isLoading && !isError && (
          <>
            <p style={{ marginBottom: "0.5rem" }}>
              Showing {clients.length} of {total} clients
            </p>
            <div style={{ overflowX: "auto", borderRadius: "0.5rem", border: "1px solid #1e293b" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead style={{ backgroundColor: "#020617" }}>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Marketing</th>
                    <th style={thStyle}>Blacklisted</th>
                    <th style={thStyle}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedClient(c)}
                      style={{
                        borderTop: "1px solid #1e293b",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#1e293b";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "";
                      }}
                    >
                      <td style={tdStyle}>
                        {c.full_name || [c.first_name, c.last_name].filter(Boolean).join(" ") || "Unknown"}
                      </td>
                      <td style={tdStyle}>{c.email || "-"}</td>
                      <td style={tdStyle}>{c.phone || "-"}</td>
                      <td style={tdStyle}>{c.marketing_opt_in ? "Yes" : "No"}</td>
                      <td style={tdStyle}>{c.blacklisted ? "Yes" : "No"}</td>
                      <td style={tdStyle}>
                        {c.created_at
                          ? new Date(c.created_at).toLocaleDateString("en-GB")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                  {clients.length === 0 && (
                    <tr>
                      <td colSpan={6} style={tdStyle}>
                        No clients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={buttonStyle(page === 1)}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={buttonStyle(page === totalPages)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      {selectedClient && (
        <ClientDetailDrawer
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.5rem 0.75rem",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "#e5e7eb",
  borderBottom: "1px solid #1e293b",
};

const tdStyle: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  color: "#e5e7eb",
};

function buttonStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "0.4rem 0.9rem",
    borderRadius: "0.375rem",
    border: "1px solid #1f2937",
    backgroundColor: disabled ? "#1f2937" : "#111827",
    color: disabled ? "#6b7280" : "#f9fafb",
    cursor: disabled ? "not-allowed" : "pointer",
  };
}

