// types/usp.ts

// Primitives strictly enforced across the protocol
export type ISO8601Date = string; // Always UTC, e.g., "2026-07-08T14:00:00Z"
export type CurrencyCode = string; // ISO 4217, e.g., "USD"
export type UspID = string; // Prefixed IDs, e.g., "mch_abc123"

export interface Merchant {
  id: UspID;
  external_saas_id: string;
  saas_platform: 'mindbody' | 'square' | 'boulevard' | 'custom' | string;
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
  price_amount: number | null; // Lowest denomination (e.g., cents: 5000 = $50.00)
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

/**
 * NEW PHASE 0.1 ENTITIES
 * Objects required for deep platform synchronization & foundational architecture
 */

export interface Resource {
  id: UspID; // e.g., "rsc_123"
  merchant_id: UspID;
  location_id: UspID;
  name: string; // e.g., "Dental Chair A", "Massage Room 3"
  type: 'room' | 'chair' | 'bay' | 'equipment' | string;
  capacity: number; // Max concurrent services it can hold
  status: 'active' | 'maintenance' | 'inactive';
}

export interface PermissionGrant {
  id: UspID; // e.g., "prm_999"
  merchant_id: UspID;
  ai_app_id: string; // The consumer-facing AI agent platform identifier
  scopes: ('read:merchants' | 'read:availability' | 'write:bookings' | 'manage:bookings')[];
  granted_at: ISO8601Date;
  expires_at: ISO8601Date | null;
}

export interface IntegrationCredential {
  id: UspID; // e.g., "crd_888"
  merchant_id: UspID;
  saas_platform: string; // e.g., "mindbody"
  encrypted_credentials: {
    api_key?: string;
    oauth_access_token?: string;
    oauth_refresh_token?: string;
    api_base_url?: string;
    meta_json?: string; // Flexible SaaS metadata storage (e.g., salonId, locationMappings)
  };
  last_sync_status: 'success' | 'failed';
  last_sync_at: ISO8601Date;
}
