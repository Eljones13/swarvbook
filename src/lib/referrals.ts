// Referral code helpers – purely client-side derivation from the client's UUID.
// No server state is required to generate the code; the Edge Function / RPC
// that actually applies the discount reads the same first-8-chars convention.

export interface ReferralInfo {
  code: string;
  url: string;
}

/**
 * Derives a short, uppercase referral code from the client's UUID.
 * e.g. "a1b2c3d4-…" → "A1B2C3D4"
 */
export function getReferralCode(client: { id: string }): string {
  return client.id.slice(0, 8).toUpperCase();
}

/**
 * Builds the full signup URL that pre-fills the referral code.
 * Uses the current page origin so it works in dev and production.
 */
export function getReferralUrl(code: string): string {
  return `${window.location.origin}/auth/signup?ref=${code}`;
}

/**
 * Convenience: returns both code and URL for a given client.
 */
export function getReferralInfo(client: { id: string }): ReferralInfo {
  const code = getReferralCode(client);
  return { code, url: getReferralUrl(code) };
}
