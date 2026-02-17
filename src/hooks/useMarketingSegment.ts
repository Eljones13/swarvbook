import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Client } from "./useClients";

async function fetchMarketingSegment() {
  const { data, error, count } = await supabase
    .from("clients")
    .select("*", { count: "exact" })
    .eq("marketing_opt_in", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return {
    clients: (data || []) as Client[],
    total: count || 0,
  };
}

export function useMarketingSegment() {
  return useQuery({
    queryKey: ["clients", "marketing-segment"],
    queryFn: fetchMarketingSegment,
  });
}
