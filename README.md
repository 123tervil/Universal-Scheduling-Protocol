# Universal Scheduling Protocol (USP)

Today, service businesses are fragmented across many vertical SaaS platforms. These platforms are important because they store merchant data, provider data, services, scheduling logic, and availability, but AI systems have no standard way to access that information or safely act on it on behalf of users. USP exists to solve that interoperability gap.

USP is designed to unify fragmented scheduling infrastructure across categories such as health and wellness, healthcare, beauty, home services, business services, automotive, pet services, professional services, construction and trades, real estate, events and entertainment, education, and public sector services.

## The Problem

Across the services economy, merchants and providers are distributed across many different software systems. Each platform has its own data model, APIs, authentication, availability logic, and booking rules. Some software systems have public api's, some softwares do not, some softwares have public marketplaces, some do not.

That fragmentation creates several problems:

- AI agents cannot reliably discover real-world merchants across systems.
- AI agents cannot query normalized real-time availability across platforms.
- AI agents cannot safely execute scheduling actions across systems with consistent permissions and controls.
- Merchants are difficult to surface across AI channels unless they are already part of a closed marketplace.
- SaaS platforms must build custom integrations for each new partner, marketplace, or AI company.

USP solves this by creating a shared protocol layer that standardizes how merchant scheduling data is exposed and how actions are executed.

## What USP Does

USP creates a common standard so that:

- Vertical SaaS platforms can expose merchant scheduling data in a normalized format.
- AI companies can integrate once into a unified interface instead of dozens of fragmented systems.
- Merchants can control how their services, providers, and availability are shared and used.
- End users can use AI agents to interact with real-world merchants more reliably.

At a high level, USP standardizes three things:

1. **Discovery** — finding merchants, providers, services, and service metadata.
2. **Real-time state** — retrieving structured availability, pricing, duration, constraints, and booking policies.
3. **Actionability** — executing booking, cancellation, and rescheduling in a secure, auditable way.

## Who USP Is For

### Vertical SaaS Platforms

USP gives vertical SaaS platforms a standardized way to extend their reach beyond their own ecosystem or marketplace.

Benefits include:

- Reduced integration complexity: instead of building separate integrations for every AI company, marketplace, or downstream partner, platforms can expose one canonical model.
- New distribution opportunities: merchants on a platform become discoverable across many AI-driven channels through a single integration.
- Operational efficiency: platforms can stay focused on their core product while the network handles normalization, discovery, and orchestration.
- Expanded merchant value: platforms can offer their customers broader distribution and more booking opportunities without requiring each merchant to adopt a new system.

### AI Companies

USP gives AI companies a single, reliable integration layer for merchant discovery and scheduling actions.

Benefits include:

- One unified access model across many SaaS systems.
- Structured merchant, service, provider, and availability data.
- Standardized booking, cancellation, and rescheduling operations.
- Lower integration cost and faster expansion across service categories.
- A safer execution layer with permissioning, policy boundaries, and auditability.

### Merchants

USP gives merchants a transparent way to participate in AI-driven discovery and booking without losing control over their operations.

Benefits include:

- Broader discovery across AI systems and partner channels.
- Better booking access without needing to integrate separately into every external platform.
- More accurate, real-time availability exposure based on the merchant's source system.
- Greater control over what data is shared, which actions are allowed, and which partners can access the business.
- Reduced risk of inconsistent listings, stale availability, or disconnected booking experiences.

## Core Protocol Layers

USP is best understood as six connected layers.

### 1. Connector Layer

The connector layer allows each SaaS platform to map its native objects into the USP standard. This is the translation layer between fragmented scheduling systems and the unified network.

### 2. Canonical Data Layer

The canonical data layer defines the shared entities and relationships that all integrations map into.

Core entities include but are not limited to:

- Merchant
- Location
- Service
- Provider
- Resource
- Availability slot
- Booking policy
- Integration credential
- Permission grant

For additional entity definitions, field requirements, and relationship details, read [document] for more.

### 3. Sync Layer

The sync layer keeps network data current through polling, webhooks, reconciliation jobs, and change events. This is what allows real-time or near-real-time availability and booking state to remain trustworthy.

For sync architecture, change events, freshness expectations, and reconciliation logic, read [document] for more.

### 4. Query Layer

The query layer enables AI systems and partner applications to discover merchants and retrieve structured data.

Typical query capabilities include:

- Merchant search
- Service catalog retrieval
- Provider lookup
- Real-time availability search
- Policy and constraint retrieval
- Pricing and duration lookup

For request shapes, filters, query semantics, and response patterns, read [document] for more.

### 5. Action Layer

The action layer allows approved systems to perform booking-related operations.

Typical actions include:

- Create booking
- Hold slot
- Confirm booking
- Cancel booking
- Reschedule booking
- Retrieve booking status

For action contracts, idempotency behavior, booking states, and failure handling, read [document] for more.

### 6. Trust Layer

The trust layer governs security, permissions, merchant consent, usage policies, logging, and auditability. This layer is essential because USP is not only a data-sharing protocol, but an action-execution protocol.

For access control, consent, partner visibility, revocation, compliance, and governance details, read [document] for more.

## What SaaS Platforms Need To Integrate

To support USP, a SaaS platform must expose the merchant graph and real-time scheduling state needed for safe discovery and action execution.

At a minimum, platform integrations should support:

- Merchant account linking and authentication
- Stable merchant and object identifiers
- Access to merchant, location, service, provider, resource, schedule, and policy data
- Real-time availability or near-real-time availability synchronization
- Change events through webhooks or equivalent feeds
- Action support where available, such as booking creation, cancellation, and rescheduling
- Timestamps, status values, and source-of-truth markers

For integration requirements, adapter standards, and minimum connector expectations, read [document] for more.

## What AI Companies Need To Integrate

AI companies should be able to integrate once into USP and then interact with many merchants across many SaaS platforms through one interface.

At a minimum, AI-side integrations should support:

- Application registration and authentication
- Scoped access to query and action endpoints
- Merchant discovery and search workflows
- Availability retrieval and interpretation
- Booking action requests with proper permissions
- Audit and attribution support where required
- Policy-aware execution, including eligibility, notice windows, deposits, and other constraints

For SDK patterns, app registration, policy enforcement, and usage expectations, read [document] for more.

## What Merchants Need To Know

Merchants do not need to understand every technical detail of USP, but they do need clear control over participation.

Merchants should be able to understand:

- What data is shared
- Which AI systems or partners can access it
- What actions are enabled
- How to change permissions
- How to revoke access
- How booking activity is logged and attributed

For merchant onboarding, consent UX, visibility controls, and trust settings, read [document] for more.

## Why This Matters

AI agents are increasingly capable of understanding intent, but they still struggle to interact with real-world service infrastructure because the systems that hold merchant and scheduling data are fragmented.

USP aims to become a common protocol layer that makes those systems interoperable. Rather than requiring every AI company to integrate separately into every scheduling platform, and every SaaS platform to build custom downstream connectors, USP creates a standardized network where merchant data, availability, and booking actions become accessible in a secure and structured way.

In practical terms, USP reduces fragmentation and increases actionability across the services economy.

## Design Principles

USP should be designed around the following principles:

- **Interoperability first** — the protocol should make fragmented systems work together.
- **Merchant control** — merchants must retain visibility and control over their participation.
- **Real-time trust** — availability and booking state must be fresh enough to act on safely.
- **Secure actionability** — booking actions should be permissioned, auditable, and reversible where appropriate.
- **Developer simplicity** — both SaaS platforms and AI companies should be able to implement USP without excessive complexity.
- **Vertical flexibility** — the model should work across many service categories while preserving vertical-specific metadata.

## Initial Scope

The initial scope of USP is appointment-based service interactions where an AI system needs to:

- Discover a merchant
- Understand services and providers
- Retrieve real-time availability
- Execute booking, cancellation, or rescheduling

Over time, the protocol may expand into adjacent capabilities such as waitlists, quotes, deposits, intake flows, messaging, reminders, eligibility validation, and payment-linked scheduling.

For future expansion areas and versioning strategy, read [document] for more.

## Network Value

USP is valuable because it combines three things in one standard:

- Normalized merchant data
- Real-time scheduling state
- Secure action execution

That combination is what allows AI systems to move from informing users to acting for them in the real world.

## Status

USP is a developing protocol and network standard. The initial focus is on defining the canonical merchant graph, integration requirements for SaaS platforms, the API surface for AI companies, and the trust model required for secure merchant participation.

## Contributing

Contributions should focus on:

- Canonical schema design
- Connector specifications
- Availability and booking state models
- Authentication and permissions
- Merchant consent and trust controls
- API and SDK design
- Vertical-specific metadata extensions

For contribution guidelines, governance, protocol versioning, and implementation roadmap details, read [document] for more.
