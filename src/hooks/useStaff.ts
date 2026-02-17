import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Staff } from "../types/booking";

async function fetchActiveStaff() {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error) throw error;
  return (data || []) as Staff[];
}

export function useStaff() {
  return useQuery({
    queryKey: ["staff", "active"],
    queryFn: fetchActiveStaff,
  });
}
