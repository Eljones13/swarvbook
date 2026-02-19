import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      navigate(mode === "admin" ? "/admin/calendar" : "/book", { replace: true });
    }
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Sign In
        </h1>

        {error && <p style={errorStyle}>{error}</p>}

        <label style={labelStyle}>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#94a3b8" }}>
          New here?{" "}
          <Link
            to={mode ? `/auth/signup?mode=${mode}` : "/auth/signup"}
            style={{ color: "#60a5fa" }}
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#020617",
  color: "#f9fafb",
};

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "380px",
  padding: "2rem",
  borderRadius: "0.5rem",
  border: "1px solid #1e293b",
  backgroundColor: "#0f172a",
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
  backgroundColor: "#020617",
  color: "#f9fafb",
  fontSize: "0.9rem",
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "0.375rem",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
};

const errorStyle: React.CSSProperties = {
  marginBottom: "1rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.375rem",
  backgroundColor: "#450a0a",
  color: "#fca5a5",
  fontSize: "0.85rem",
};
