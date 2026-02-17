import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Service } from "../types/booking";

async function fetchActiveServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error) throw error;
  return (data || []) as Service[];
}

export function useServices() {
  return useQuery({
    queryKey: ["services", "active"],
    queryFn: fetchActiveServices,
  });
}
