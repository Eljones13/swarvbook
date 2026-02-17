import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { BookingWithDetails } from "../types/booking";

/**
 * Fetch bookings for a given staff member within a week range.
 * Joins service name and client name via foreign keys.
 */
async function fetchBookings(
  staffId: string,
  weekStart: string,
  weekEnd: string
) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, services(name), clients(full_name, first_name, last_name)"
    )
    .eq("staff_id", staffId)
    .gte("start_time", weekStart)
    .lt("start_time", weekEnd)
    .order("start_time");

  if (error) throw error;
  return (data || []) as BookingWithDetails[];
}

export function useBookings(
  staffId: string | null,
  weekStart: string,
  weekEnd: string
) {
  return useQuery({
    queryKey: ["bookings", staffId, weekStart, weekEnd],
    queryFn: () => fetchBookings(staffId!, weekStart, weekEnd),
    enabled: !!staffId,
  });
}
