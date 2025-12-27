# FashionOS: Sitemap & Routing Architecture v2.1.0

## 1. Executive Summary
- **Public Domain**: Marketing nodes handled via `PublicLayout`.
- **App Domain**: Authenticated nodes gated by `ProtectedApp` and handled via `Layout` (Triptych).
- **Safety Invariant**: Separate `NotFound` experiences for Marketing vs. Workspace.
- **Param Strategy**: `:brandId` used exclusively for all Maison-scoped context.

## 2. Canonical Route Table

### 2.1 Public / Marketing Domain
*Gated: Public | Layout: PublicLayout*

| Route Path | Component | Purpose |
| :--- | :--- | :--- |
| `/` | `LandingPage` | Maison Hero entry. |
| `/features` | `LandingPage` | System capability index. |
| `/pricing` | `PricingPage` | Maison access tiers. |
| `/sponsors` | `SponsorCategoryPage` | Partnership vertical hub. |
| `/services` | `ServiceMarketplace` | Talent & Studio directory. |
| `/studio-hire` | `StudioHireLanding` | Physical node network. |
| `*` | `NotFound(public)` | Marketing fallback. |

### 2.2 App / Workspace Domain
*Gated: Auth (ProtectedApp) | Layout: App Layout (Triptych)*

| Category | Route Path | Layout | Purpose |
| :--- | :--- | :--- | :--- |
| **Onboarding** | `/brand/intake` | Full-Width | Neural Brand Setup. |
| **Core** | `/dashboard` | App | System Command Center. |
| **Identity** | `/brand/:brandId/analysis` | App | Strategy & Gap Analysis. |
| **Identity** | `/brand/:brandId/profile` | App | Digital DNA Core. |
| **Marketing** | `/brand/:brandId/calendar` | App | Omnichannel Grid. |
| **Marketing** | `/brand/:brandId/content/:postId`| App | Post Integrity Audit. |
| **Production** | `/brand/:brandId/shoots/recommendation`| App | AI Creative Direction. |
| **Production** | `/brand/:brandId/shoots/wizard`| Overlay | Strategic Planning. |
| **Execution** | `/shoots` | App | Active Shoots Grid. |
| **Execution** | `/shoots/brief/:shootId`| App | Technical Shot Brief. |
| **Execution** | `/shoots/crew/:shootId`| App | On-Set Hardware HUD. |
| **Context** | `*` | App | Workspace Fallback. |

## 3. Interaction Logic
- **Auth Gate**: If `brands.length === 0`, all App Domain routes redirect to `/`.
- **Panel Invariant**: Intelligence Panel is suppressed on all `PublicLayout` and `Full-Width` routes.

---
*Audit Complete. System Integrity: Operational.*
