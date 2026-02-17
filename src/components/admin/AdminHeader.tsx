import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const NAV_ITEMS = [
  { to: "/admin/clients", label: "Clients" },
  { to: "/admin/calendar", label: "Calendar" },
  { to: "/admin/campaigns", label: "Campaigns" },
] as const;

export function AdminHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/auth/login", { replace: true });
  }

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{title}</h1>
        <nav style={{ display: "flex", gap: "1rem", fontSize: "0.85rem" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                ...navLinkStyle,
                color: pathname === item.to ? "#f9fafb" : "#64748b",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <button onClick={handleLogout} style={logoutBtnStyle}>
        Logout
      </button>
    </header>
  );
}

const headerStyle: React.CSSProperties = {
  padding: "1rem 2rem",
  borderBottom: "1px solid #1e293b",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const navLinkStyle: React.CSSProperties = {
  color: "#64748b",
  textDecoration: "none",
};

const logoutBtnStyle: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
  borderRadius: "0.375rem",
  border: "1px solid #1e293b",
  backgroundColor: "#111827",
  color: "#f9fafb",
  cursor: "pointer",
  fontSize: "0.85rem",
};
