import { Merchant, Service, Provider, AvailabilitySlot, BookingPolicy } from '../../types/usp';

export const mockMerchants: Merchant[] = [
  {
    id: "mch_981",
    external_saas_id: "mb-loc-5512",
    saas_platform: "mindbody",
    name: "Apex Dental & Wellness",
    vertical: "health_wellness",
    status: "active",
    created_at: "2026-01-15T08:00:00Z"
  }
];

export const mockServices: Service[] = [
  {
    id: "srv_301",
    merchant_id: "mch_981",
    name: "Routine Hygiene Cleaning",
    description: "Standard preventive clean and assessment",
    duration_minutes: 45,
    price_type: "fixed",
    price_amount: 14500, // $145.00
    currency: "USD"
  }
];

export const mockProviders: Provider[] = [
  {
    id: "pro_702",
    merchant_id: "mch_981",
    name: "Dr. Sarah Jenkins",
    supported_services: ["srv_301"],
    status: "active"
  }
];

export const mockPolicies: BookingPolicy = {
  id: "plc_101",
  merchant_id: "mch_981",
  requires_merchant_approval: false,
  cancellation_window_hours: 24,
  deposit_required: false
};

export const mockSlots: AvailabilitySlot[] = [
  {
    id: "slt_fff111",
    merchant_id: "mch_981",
    location_id: "loc_001",
    service_id: "srv_301",
    provider_id: "pro_702",
    start_time: "2026-07-10T14:00:00Z",
    end_time: "2026-07-10T14:45:00Z",
    status: "available"
  },
  {
    id: "slt_fff222",
    merchant_id: "mch_981",
    location_id: "loc_001",
    service_id: "srv_301",
    provider_id: "pro_702",
    start_time: "2026-07-10T15:00:00Z",
    end_time: "2026-07-10T15:45:00Z",
    status: "available"
  }
];
