# FashionOS Canonical Sitemap & Routing Map v2.0

## 1. Executive Summary
- **Unified Domain**: Merged 17 core app routes with 16 marketing pages and 13 sponsor verticals.
- **Root Sovereignty**: Reassigned `/` to the public Landing Page; shifted Dashboard to `/dashboard`.
- **Vertical Strategy**: Implemented categorical routing for Sponsors to maximize SEO footprint.
- **Guardrails**: All non-app routes are flagged as `PUBLIC`; all dashboard-related segments are `AUTH`.

## 2. Canonical Route Table

| Domain | Path | Layout | Auth | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Marketing** | `/` | Public | Public | Maison Landing Page |
| **Marketing** | `/features` | Public | Public | AI Capabilities & Agents |
| **Marketing** | `/pricing` | Public | Public | Pricing & Enterprise |
| **Marketing** | `/solutions` | Public | Public | Strategy Verticals |
| **Marketing** | `/solutions/events` | Public | Public | Event Management |
| **Marketing** | `/solutions/fashion-shows` | Public | Public | Show Orchestration |
| **Marketing** | `/solutions/brand-shoots` | Public | Public | Production Solutions |
| **Marketing** | `/case-studies` | Public | Public | Client Success Stories |
| **Marketing** | `/about` | Public | Public | Our Heritage |
| **Marketing** | `/careers` | Public | Public | Join the Grid |
| **Marketing** | `/contact` | Public | Public | Concierge Outreach |
| **Marketing** | `/demo` | Public | Public | High-Fidelity Demo |
| **Marketing** | `/integrations` | Public | Public | n8n, Postiz, Shopify |
| **Marketing** | `/security` | Public | Public | DNA Security & Privacy |
| **Marketing** | `/blog` | Public | Public | Strategic Intelligence |
| **Marketing** | `/help` | Public | Public | Knowledge Base |
| **Sponsors** | `/sponsors` | Public | Public | Partnership Hub |
| **Sponsors** | `/sponsors/beauty` | Public | Public | Beauty Sector |
| **Sponsors** | `/sponsors/automotive` | Public | Public | Automotive Sector |
| **Sponsors** | `/sponsors/real-estate` | Public | Public | Real Estate Sector |
| **Sponsors** | `/sponsors/jewelry` | Public | Public | Fine Jewelry Sector |
| **Sponsors** | `/sponsors/spirits` | Public | Public | Luxury Spirits Sector |
| **Sponsors** | `/sponsors/technology` | Public | Public | Technology Sector |
| **Sponsors** | `/sponsors/finance` | Public | Public | Private Finance Sector |
| **Sponsors** | `/sponsors/travel` | Public | Public | Bespoke Travel Sector |
| **Sponsors** | `/sponsors/wellness` | Public | Public | Wellness Sector |
| **Sponsors** | `/sponsors/food-beverage` | Public | Public | Gastronomy Sector |
| **Sponsors** | `/sponsors/media` | Public | Public | Media Sector |
| **Sponsors** | `/sponsors/retail` | Public | Public | Premium Retail Sector |
| **App** | `/dashboard` | App | Auth | System Command Center |
| **App** | `/brand/intake` | Full-Width | Auth | AI Brand Onboarding |
| **App** | `/brand/:brandId/analysis` | App | Auth | Strategy & Scoring |
| **App** | `/brand/:brandId/profile` | App | Auth | Digital DNA Core |
| **App** | `/brand/:brandId/calendar` | App | Auth | visual grid |
| **App** | `/brand/:brandId/content/:postId` | App | Auth | Asset Audit |
| **App** | `/brand/:brandId/shoots/recommendation` | App | Auth | Creative Concepts |
| **App** | `/brand/:brandId/shoots/wizard` | Overlay | Auth | Production Planning |
| **App** | `/shoots` | App | Auth | Production Hub |
| **App** | `/shoots/brief/:shootId` | App | Auth | Technical Brief |
| **App** | `/shoots/crew/:shootId` | App | Auth | Hardware HUD |
| **App** | `/events` | App | Auth | Events Tracker |
| **App** | `/campaigns` | App | Auth | Strategy Moods |
| **App** | `/media` | App | Auth | Global Asset Board |
| **App** | `/chat` | App | Auth | Strategic Concierge |
| **App** | `/settings` | App | Auth | System Control |
| **System** | `*` | App | Public | NotFound (Graceful) |

## 3. Implementation Red Flags
- **Root Collision**: Existing app used `/` for Dashboard. Moved to `/dashboard`.
- **Dynamic Param Collision**: Ensure `sponsors/:category` does not catch `sponsors/partners` if we add that later; use specific ordering in router.
- **Layout Integrity**: Ensure `IntelligencePanel` is never rendered on Public/Marketing routes to avoid leaking internal system state.

## 4. Implementation Checklist
- [ ] Refactor `App.tsx` with `PublicLayout` and `AppLayout` wrappers.
- [ ] Migrate Dashboard component to `/dashboard`.
- [ ] Create `SeoProvider` component to manage titles/descriptions for the 16 marketing pages.
- [ ] Update `Sidebar.tsx` and `Header.tsx` to reflect the new sitemap.
