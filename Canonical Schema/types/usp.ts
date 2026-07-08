// types/usp.ts

// Primitives strictly enforced across the protocol
export type ISO8601Date = string; // Always UTC, e.g., "2026-07-08T14:00:00Z"
export type CurrencyCode = string; // ISO 4217, e.g., "USD"
export type UspID = string; // Prefixed IDs, e.g., "mch_abc123"

export interface Merchant {
  id: UspID;
  external_saas_id: string;
  saas_platform: 'mindbody' | 'square' | 'fresha' | 'custom' | string;
  name: string;
  vertical: 'health_wellness' | 'beauty' | 'home_services' | 'automotive' | string;
  status: 'active' | 'suspended' | 'pending_consent';
  created_at: ISO8601Date;
}

export interface Location {
  id: UspID;
  merchant_id: UspID;
  name: string;
  timezone: string; // IANA string, e.g., "America/Chicago"
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  is_virtual: boolean;
}

export interface Service {
  id: UspID;
  merchant_id: UspID;
  name: string;
  description?: string;
  duration_minutes: number;
  price_type: 'fixed' | 'starting_at' | 'variable' | 'free';
  price_amount: number | null; // Lowest denomination (e.g., cents)
  currency: CurrencyCode;
  policy_id?: UspID;
}

export interface Provider {
  id: UspID;
  merchant_id: UspID;
  name: string;
  supported_services: UspID[]; // Array of Service IDs
  status: 'active' | 'inactive';
}

export interface AvailabilitySlot {
  id: UspID; // Synthetic ID representing this exact time block
  merchant_id: UspID;
  location_id: UspID;
  service_id: UspID;
  provider_id: UspID | null;
  start_time: ISO8601Date;
  end_time: ISO8601Date;
  status: 'available' | 'held' | 'booked';
}

export interface BookingPolicy {
  id: UspID;
  merchant_id: UspID;
  requires_merchant_approval: boolean;
  cancellation_window_hours: number | null;
  deposit_required: boolean;
}

export interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export interface Booking {
  id: UspID;
  external_booking_id: string | null;
  idempotency_key: string;
  merchant_id: UspID;
  slot_id: UspID;
  customer_info: CustomerInfo;
  status: 'pending' | 'held' | 'confirmed' | 'cancelled' | 'failed';
  ai_app_id: string; // Audit trail for the AI agent
  created_at: ISO8601Date;
}
