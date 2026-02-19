export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "no_show"
  | "cancelled";

export const BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "no_show",
  "cancelled",
];

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
 * Booking row joined with service, client, and optional staff.
 * `staff` is populated when the query includes `staff(name)`.
 */
export interface BookingWithDetails extends Booking {
  services: {
    name: string;
    price: number | null;
    duration_minutes: number | null;
  } | null;
  clients: {
    full_name: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
  staff?: { name: string } | null;
}
