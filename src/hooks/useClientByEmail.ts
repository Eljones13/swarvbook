import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import type { Client } from "./useClients";
import { getReferralInfo } from "../lib/referrals";
import type { ReferralInfo } from "../lib/referrals";

// TODO (Supabase RLS): clients must be able to SELECT their own row:
//   CREATE POLICY "client_read_own_profile" ON clients
//   FOR SELECT USING (email = auth.email());

async function fetchClientByEmail(email: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  return data as Client | null;
}

/**
 * Resolves the signed-in user's email to a row in the `clients` table.
 * Returns `data: null` if no matching client record exists.
 */
export function useClientByEmail() {
  const { session } = useAuth();
  const email = session?.user?.email ?? null;

  return useQuery({
    queryKey: ["client-by-email", email],
    queryFn: () => fetchClientByEmail(email!),
    enabled: !!email,
  });
}

/**
 * Derives the signed-in client's referral code and shareable URL.
 * Returns `data: null` while the client row is loading or not found.
 */
export function useReferralInfo(): { data: ReferralInfo | null; isLoading: boolean } {
  const { data: client, isLoading } = useClientByEmail();
  return {
    data: client ? getReferralInfo(client) : null,
    isLoading,
  };
}
