import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div style={containerStyle}>
        <div style={formStyle}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
            Check your email
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5 }}>
            We sent a confirmation link to <strong>{email}</strong>. Click the
            link to activate your account, then{" "}
            <Link to="/auth/login" style={{ color: "#60a5fa" }}>
              sign in
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Create Account
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#94a3b8" }}>
          Already have an account?{" "}
          <Link to="/auth/login" style={{ color: "#60a5fa" }}>
            Sign in
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
