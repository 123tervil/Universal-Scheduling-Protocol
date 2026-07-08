# USP Core v1 - Unified Protocol Interface

This document serves as the implementation-agnostic overview for the initial pilot launch of the Universal Scheduling Protocol (USP). 

## 1. What the Protocol Does
USP provides a high-reliability gateway layer that bridges downstream consumer AI Agents (Large Language Models, voice assistants, autonomous task planners) with upstream business-side SaaS booking systems (e.g., Mindbody, Boulevard, Square Appointment). 

It standardizes asynchronous, highly non-uniform appointment data structures into clean, transaction-safe, synchronous APIs.

## 2. API Endpoints Available (Minimal v1 Feature Set)

| Route | Method | Purpose | Who Uses It |
| :--- | :--- | :--- | :--- |
| `/merchants` | `GET` | Look up registered businesses by vertical or name. | Discovery Agents |
| `/services` | `GET` | Read consumer-facing service options, duration, and retail costs. | Query Agents |
| `/providers` | `GET` | Discover human staff configurations linked to services. | Query Agents |
| `/booking-policies`| `GET` | Audit platform requirements (e.g., if a slot requires manual approval).| Pre-flight Engine|
| `/availability` | `GET` | Poll fully flattened real-time available transactional time windows. | Evaluation Engine|
| `/bookings` | `POST` | Atomically trigger a reservation flow. Requires an execution key. | Transaction Agent|

## 3. Core Entities Fully Enforced in API Models
* **Merchant:** The primary parent business profile containing native system identifiers.
* **Service:** Individual booking items. Prices are handled exclusively in minimum integer units (e.g., US cents) to dodge floating-point representation drift.
* **Provider:** Human assets mapping service compatibility tokens.
* **AvailabilitySlot:** Purely synthesized, linear time ranges representation (`start_time` and `end_time` strictly in standard ISO 8601 UTC).
* **Booking:** The transaction record. Enforces a structural UUID mapping string parameter (`idempotency_key`) to safely insulate native SaaS targets from accidental double-booking attempts over dropped network paths.
* **CustomerInfo:** Basic standard customer identity fields (`first_name`, `last_name`, `email`, optional `phone`).

## 4. Intentionally Excluded from Core v1 Api
To streamline implementation velocity during early field tests, the following mechanisms are omitted from the protocol-level interface:
* **Inline Payments / Deposits:** Deep checking constraints flag if deposits are needed, but actual processing happens in parent wrapper context, not this pipeline.
* **Resource Optimization Engine:** Rooms, tables, and tool assignment definitions exist strictly on internal database schemas (`usp.ts`); they do not present directly to runtime external API clients yet.
* **Complex/Recursive Availability Rules:** No structural support for multi-part treatments or parallel package combinations. Everything maps downstream to atomic standalone chunks.
