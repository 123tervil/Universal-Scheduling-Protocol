# USP Mindmap

```text
Universal Scheduling Protocol (USP)
├─ 1. AI Systems
│  ├─ AI apps / agents
│  ├─ Consumer assistants
│  ├─ Voice agents
│  ├─ Chatbots
│  └─ Internal enterprise agents
│
├─ 2. Access Layer
│  ├─ Direct API integration
│  └─ MCP wrapper / tool layer
│     └─ Lets models call USP tools in a more agent-friendly way
│
├─ 3. USP Network
│  ├─ Query Layer
│  │  ├─ Search merchants
│  │  ├─ Get services
│  │  ├─ Get providers
│  │  ├─ Get pricing / duration
│  │  ├─ Get booking policies
│  │  └─ Get real-time availability
│  │
│  ├─ Action Layer
│  │  ├─ Create booking
│  │  ├─ Hold slot
│  │  ├─ Confirm booking
│  │  ├─ Cancel booking
│  │  ├─ Reschedule booking
│  │  └─ Retrieve booking status
│  │
│  ├─ Canonical Data Layer
│  │  ├─ Merchant
│  │  ├─ Location
│  │  ├─ Service
│  │  ├─ Provider
│  │  ├─ Resource
│  │  ├─ Availability slot
│  │  ├─ Booking policy
│  │  ├─ Permission grant
│  │  └─ Integration credential
│  │
│  ├─ Routing / Orchestration Layer
│  │  ├─ Looks up which platform a merchant uses
│  │  ├─ Selects the right connector
│  │  ├─ Translates USP request → native platform request
│  │  └─ Translates native response → USP response
│  │
│  ├─ Sync Layer
│  │  ├─ Polling
│  │  ├─ Webhooks
│  │  ├─ Change events
│  │  └─ Reconciliation jobs
│  │
│  └─ Trust Layer
│     ├─ App authentication
│     ├─ Authorization / scopes
│     ├─ Merchant consent
│     ├─ Partner visibility controls
│     ├─ Usage policies
│     ├─ Audit logs
│     └─ Revocation
│
├─ 4. Connector Layer
│  ├─ Connector for Platform A
│  ├─ Connector for Platform B
│  ├─ Connector for Platform C
│  └─ Each connector does:
│     ├─ Auth with native platform
│     ├─ Data mapping to USP schema
│     ├─ Availability sync
│     ├─ Booking state sync
│     └─ Booking / cancel / reschedule execution
│
├─ 5. Scheduling Platforms (Vertical SaaS)
│  ├─ Salon software
│  ├─ Dental / healthcare scheduling systems
│  ├─ Home services platforms
│  ├─ Automotive service systems
│  ├─ Pet services software
│  ├─ Professional services schedulers
│  └─ Other appointment-based SaaS systems
│
├─ 6. Merchants
│  ├─ A merchant lives on one scheduling platform
│  ├─ Merchant opts into USP through that platform
│  ├─ Merchant controls what data is exposed
│  ├─ Merchant controls which AI apps can act
│  └─ Merchant remains source-authorized, but source-of-truth data lives in the platform
│
├─ 7. Routing Logic
│  ├─ AI asks USP for merchant or availability
│  ├─ USP identifies merchant's platform
│  ├─ USP routes through that platform's connector
│  ├─ Connector talks to native scheduling system
│  └─ USP returns a normalized response to the AI
│
└─ 8. Simplest Flow
   ├─ User asks AI to book something
   ├─ AI uses MCP or direct API to call USP
   ├─ USP searches normalized merchant data
   ├─ USP checks live availability via connector
   ├─ User picks a slot
   ├─ AI sends booking request to USP
   ├─ USP routes action to merchant's scheduling platform
   └─ Booking is created in the native system and returned to the AI
```

## One-line model

**AI system → MCP or API → USP network → connector → merchant's scheduling platform → booking result back through USP**

## Short interpretation

USP is the common interface in the middle, while connectors are the adapters that let USP talk to whichever scheduling system a merchant already uses.

The merchant is not the routing engine; the USP network is the routing engine, and it chooses the right connector based on where the merchant is hosted.
