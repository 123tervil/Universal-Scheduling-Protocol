import express, { Request, Response } from 'express';
import { mockMerchants, mockServices, mockProviders, mockPolicies, mockSlots } from './mockData';
import { Booking } from '../../types/usp';

const app = express();
app.use(express.json());

// In-Memory state management to track side-effects
const localBookings: Map<string, Booking> = new Map();
const seenIdempotencyKeys: Set<string> = new Set();

// Basic Authorization Stub Hook
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing protocol Bearer scope authentication credential token." });
  }
  next();
});

// GET /merchants
app.get('/v1/merchants', (req: Request, res: Response) => {
  res.json(mockMerchants);
});

// GET /services
app.get('/v1/services', (req: Request, res: Response) => {
  const { merchant_id } = req.query;
  if (!merchant_id) return res.status(400).json({ error: "Missing required query context: merchant_id" });
  res.json(mockServices.filter(s => s.merchant_id === merchant_id));
});

// GET /providers
app.get('/v1/providers', (req: Request, res: Response) => {
  const { merchant_id } = req.query;
  if (!merchant_id) return res.status(400).json({ error: "Missing required query context: merchant_id" });
  res.json(mockProviders.filter(p => p.merchant_id === merchant_id));
});

// GET /booking-policies
app.get('/v1/booking-policies', (req: Request, res: Response) => {
  const { merchant_id } = req.query;
  if (!merchant_id) return res.status(400).json({ error: "Missing required query context: merchant_id" });
  res.json(mockPolicies);
});

// GET /availability
app.get('/v1/availability', (req: Request, res: Response) => {
  const { merchant_id, service_id } = req.query;
  if (!merchant_id || !service_id) {
    return res.status(400).json({ error: "Missing query parameter keys." });
  }
  res.json(mockSlots.filter(s => s.merchant_id === merchant_id && s.service_id === service_id));
});

// POST /bookings
app.post('/v1/bookings', (req: Request, res: Response) => {
  const idempotencyKey = req.headers['idempotency-key'] as string;
  const { slot_id, customer_info } = req.body;

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Idempotency-Key header is strictly mandatory." });
  }
  if (!slot_id || !customer_info) {
    return res.status(422).json({ error: "Unprocessable booking structure payload parameters." });
  }

  // Check for duplicate processing requests
  if (seenIdempotencyKeys.has(idempotencyKey)) {
    return res.status(409).json({ error: "Conflict payload trace. Transaction block matching execution key is already registered." });
  }

  // Check if requested mock slot is real and open
  const targetedSlot = mockSlots.find(s => s.id === slot_id);
  if (!targetedSlot || targetedSlot.status !== 'available') {
    return res.status(409).json({ error: "Target appointment window is no longer bookable." });
  }

  // Mutate mock record status
  targetedSlot.status = 'booked';
  seenIdempotencyKeys.add(idempotencyKey);

  const newBooking: Booking = {
    id: `bk_${Math.random().toString(36).substr(2, 9)}`,
    external_booking_id: `ext_mock_${Date.now()}`,
    idempotency_key: idempotencyKey,
    merchant_id: targetedSlot.merchant_id,
    slot_id: slot_id,
    customer_info: customer_info,
    status: 'confirmed',
    ai_app_id: "agent_pilot_test_runner",
    created_at: new Date().toISOString()
  };

  localBookings.set(newBooking.id, newBooking);
  return res.status(201).json(newBooking);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[USP PROTOCOL FOUNDATION SERVER] Active & Mocking Contracts at http://localhost:${PORT}`);
});
