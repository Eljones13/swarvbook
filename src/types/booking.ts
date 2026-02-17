export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "no_show"
  | "cancelled";

export interface Service {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
  active: boolean;
  created_at: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  staff_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
}

/**
 * Booking row joined with service and client names.
 * Matches the shape returned by our Supabase select with
 * `services(name)` and `clients(full_name,first_name,last_name)`.
 */
export interface BookingWithDetails extends Booking {
  services: { name: string } | null;
  clients: {
    full_name: string | null;
    first_name: string | null;
    last_name: string | null;
  } | null;
}
