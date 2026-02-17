// src/hooks/useClients.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export interface Client {
  id: string;
  customer_card_id: number | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address_line: string | null;
  zipcode: string | null;
  birthday: string | null;
  notes: string | null;
  marketing_opt_in: boolean | null;
  processing_consent: boolean | null;
  trusted: boolean | null;
  blacklisted: boolean | null;
  allergens: string | null;
  created_at: string;
}

const PAGE_SIZE = 25;

async function fetchClients(search: string, page: number) {
  let query = supabase
    .from("clients")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(
      `full_name.ilike.${term},first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term},phone.ilike.${term}`
    );
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    clients: (data || []) as Client[],
    total: count || 0,
  };
}

export function useClients(search: string, page: number) {
  return useQuery({
    queryKey: ["clients", search, page],
    queryFn: () => fetchClients(search, page),
    placeholderData: keepPreviousData,
  });
}
