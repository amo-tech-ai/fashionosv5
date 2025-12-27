
# FashionOS: Sitemap & Routing Architecture v2.0.0

This document serves as the canonical map of the FashionOS ecosystem, updated to include Marketplace, Channels, Motion, and Post-Production modules.

## 1. Canonical Route Table

### 1.1 Public / Marketing Domain
Focus: Authority, Conversion, and Network Reach.

| Route Path | Layout | Component | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `Public` | `LandingPage` | Primary Maison landing page. |
| `/services` | `Public` | `ServiceMarketplace`| The Network Hub (directory). |
| `/services/:type` | `Public` | `ServiceMarketplace`| Specialized Node discovery. |
| `/services/:type/:pkgId`| `Public` | `ServiceDetail` | High-fidelity service deep dive. |
| `/studio-hire` | `Public` | `StudioHireLanding`| Venue grid public entry. |
| `/platform-overview` | `Public` | `PlatformSitemap` | Visual system roadmap. |

### 1.2 Authenticated / App Domain
Focus: Operational Momentum and Asset Integrity.

| Category | Route Path | Layout | Purpose |
| :--- | :--- | :--- | :--- |
| **Core** | `/dashboard` | `App` | System command center. |
| **Identity** | `/brand/:brandId/profile` | `App` | Digital DNA Core. |
| **Channels** | `/brand/:brandId/channels` | `App` | Omnichannel Hub. |
| **Channels** | `/brand/:brandId/channels/:id`| `App` | Platform-specific optimization. |
| **Motion** | `/videos` | `App` | Motion Production Hub. |
| **Motion** | `/videos/wizard` | `Overlay` | Cinematic Planning. |
| **Post** | `/retouching` | `App` | Asset Refinement Grid. |
| **Post** | `/retouching/review/:id` | `App` | Guardian Post-Audit. |
| **Venues** | `/studio-hire/availability` | `App` | Real-time space booking. |

## 2. Navigation Architecture

- **Primary Footer**: Global anchor for both domains.
- **Triptych Sidebar**: Reserved for App Domain; provides quick-jump between operations (Shoots, Videos, Channels).
- **Intelligence Panel**: Reacts to the current Canvas. (e.g., In `VideoStudio`, it shows the "Aesthetic Drift" of the rough cut).

---
*Audit Complete. System Status: Enterprise Scaled.*
