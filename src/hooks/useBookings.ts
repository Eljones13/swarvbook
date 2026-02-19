import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Booking, BookingStatus, BookingWithDetails } from "../types/booking";

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns true if the booking can still be cancelled (> 24 h before start).
 */
export function canCancelBooking(startTime: string, now: Date = new Date()): boolean {
  const diffMs = new Date(startTime).getTime() - now.getTime();
  return diffMs > 24 * 60 * 60 * 1000;
}

// ─── shared select (admin calendar) ──────────────────────────────────────────

const BOOKING_SELECT =
  "id, client_id, staff_id, service_id, start_time, end_time, status, notes, " +
  "services(name, price, duration_minutes), clients(full_name, first_name, last_name, email, phone)";

// ─── staff / week bookings (admin calendar) ───────────────────────────────────

async function fetchBookings(staffId: string, rangeStart: string, rangeEnd: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select(BOOKING_SELECT)
    .eq("staff_id", staffId)
    .gte("start_time", rangeStart)
    .lt("start_time", rangeEnd)
    .order("start_time");

  if (error) throw error;
  return (data || []) as unknown as BookingWithDetails[];
}

export function useBookings(
  staffId: string | null,
  rangeStart: string,
  rangeEnd: string
) {
  return useQuery({
    queryKey: ["bookings", staffId, rangeStart, rangeEnd],
    queryFn: () => fetchBookings(staffId!, rangeStart, rangeEnd),
    enabled: !!staffId,
  });
}

/** Alias kept for any code that imports useBookingsForStaffWeek */
export const useBookingsForStaffWeek = useBookings;

// ─── client bookings ──────────────────────────────────────────────────────────
// TODO (Supabase RLS): clients must be able to SELECT their own rows:
//   CREATE POLICY "client_read_own_bookings" ON bookings
//   FOR SELECT USING (client_id = (SELECT id FROM clients WHERE email = auth.email()));

async function fetchClientBookings(clientId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(name), staff(name)")
    .eq("client_id", clientId)
    .gte("start_time", new Date().toISOString())
    .order("start_time");

  if (error) throw error;
  return (data || []) as BookingWithDetails[];
}

export function useClientBookings(clientId: string | null) {
  return useQuery({
    queryKey: ["bookings", "client", clientId],
    queryFn: () => fetchClientBookings(clientId!),
    enabled: !!clientId,
  });
}

// ─── create booking ───────────────────────────────────────────────────────────
// TODO (Supabase RLS): clients must be able to INSERT for their own client_id:
//   CREATE POLICY "client_insert_own_booking" ON bookings
//   FOR INSERT WITH CHECK (client_id = (SELECT id FROM clients WHERE email = auth.email()));

export interface CreateBookingInput {
  client_id: string;
  staff_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  notes?: string;
}

async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...input, status: "pending" as BookingStatus })
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// ─── cancel booking ───────────────────────────────────────────────────────────
// TODO (Supabase RLS): clients must be able to UPDATE only their own booking status:
//   CREATE POLICY "client_cancel_own_booking" ON bookings
//   FOR UPDATE USING (client_id = (SELECT id FROM clients WHERE email = auth.email()))
//   WITH CHECK (status = 'cancelled');

async function cancelBooking(bookingId: string): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" as BookingStatus })
    .eq("id", bookingId);

  if (error) throw error;
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// ─── update booking (admin) ───────────────────────────────────────────────────

interface UpdateBookingInput {
  id: string;
  status: BookingStatus;
  notes: string | null;
}

async function updateBooking(input: UpdateBookingInput): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .update({ status: input.status, notes: input.notes })
    .eq("id", input.id);

  if (error) throw error;
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
