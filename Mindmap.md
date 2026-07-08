AI System (agent, Voice, app)
  ├─ Uses either:
  │    ├─ MCP (Model Context Protocol) to discover & call tools
  │    └─ Direct API calls to USP endpoints
  │
  └─ Calls USP Network (core API)
        ├─ Query Layer
        │    ├─ Search merchants
        │    ├─ Get services
        │    ├─ Get providers
        │    ├─ Get availability
        │    └─ Get policies/pricing, etc.
        │
        └─ Action Layer
             ├─ Create booking
             ├─ Hold slot
             ├─ Confirm booking
             ├─ Cancel booking
             ├─ Reschedule booking
             └─ Get booking status, etc.

USP Network (central platform)
  ├─ Canonical Data Layer
  │    └─ Normalized model: Merchant, Location, Service, Provider,
  │       Resource, Availability slot, Booking policy, etc.
  │
  ├─ Router / Orchestrator
  │    └─ For each merchant:
  │         ├─ Knows: “This merchant is on Platform X”
  │         ├─ Knows: “Platform X is served by Connector X”
  │         └─ Routes API calls through Connector X
  │
  ├─ Connector Layer (per SaaS platform)
  │    ├─ Connector A (e.g., for Salon SaaS A)
  │    ├─ Connector B (e.g., for Dental EMR B)
  │    ├─ Connector C (e.g., for Home Services SaaS C)
  │    └─ Each connector:
  │         ├─ Maps native objects → canonical model
  │         ├─ Syncs availability & booking state
  │         └─ Executes booking actions in the native system
  │
  ├─ Sync Layer
  │    └─ Polling, webhooks, reconciliation → keeps data fresh
  │
  └─ Trust Layer
       ├─ Auth & scopes for AI apps
       ├─ Merchant consent (what data/actions are allowed)
       ├─ Policy enforcement (notice windows, deposits, etc.)
       └─ Audit logs

Merchant’s Scheduling Platform (SaaS)
  ├─ Native data model (different from USP)
  ├─ Native APIs (for auth, data, actions)
  └─ Connected to USP via a Connector

Merchant
  ├─ On a scheduling platform (e.g., Salon SaaS X)
  ├─ Opt-in to USP via that platform
  └─ Controls:
       ├─ What data is exposed
       ├─ Which AI apps can access
       └─ Which actions are allowed
