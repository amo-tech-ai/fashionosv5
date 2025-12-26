# FashionOS: Sitemap & Routing Architecture v1.4.0

This document serves as the canonical map of the FashionOS ecosystem, verified against the actual implementation in `App.tsx`, `Sidebar.tsx`, and the filesystem.

## 1. Canonical Route Table

| Route Path | Type | Parent Layout | Component Name | Purpose | Access | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `/` | Static | `Layout` | `Dashboard` | System command center & critical path tracking. | Auth | 🟢 Active |
| `/brand/intake` | Static | Full-Width | `BrandIntake` | AI-assisted brand onboarding (Focus Mode). | Auth | 🟢 Active |
| `/brand/:brandId/analysis` | Dynamic | `Layout` | `BrandAnalysis` | Strategic scoring & trend simulations. | Auth | 🟢 Active |
| `/brand/:brandId/profile` | Dynamic | `Layout` | `BrandProfile` | Central DNA repository (Personas, Style Guide). | Auth | 🟢 Active |
| `/brand/:brandId/calendar` | Dynamic | `Layout` | `ContentCalendar` | Omnichannel content scheduling. | Auth | 🟢 Active |
| `/brand/:brandId/content/:postId` | Dynamic | `Layout` | `ContentEditor` | Compliance audit and dispatch. | Auth | 🟢 Active |
| `/brand/:brandId/shoots/recommendation` | Dynamic | `Layout` | `ShootRecommendation` | AI-suggested creative concepts. | Auth | 🟢 Active |
| `/brand/:brandId/shoots/wizard` | Dynamic | Overlay | `ShootWizard` | Step-by-step production planning (Focus Mode). | Auth | 🟢 Active |
| `/shoots` | Static | `Layout` | `ShootsPage` | Global production hub. | Auth | 🟢 Active |
| `/shoots/brief/:shootId` | Dynamic | `Layout` | `ProductionBrief` | Technical technical brief for crew nodes. | Auth | 🟢 Active |
| `/shoots/crew/:shootId` | Dynamic | `Layout` | `CrewExecution` | On-set Hardware HUD view. | Auth | 🟢 Active |
| `/events` | Static | `Layout` | `EventsPage` | Logistics tracker for fashion events. | Auth | 🟢 Active |
| `/campaigns` | Static | `Layout` | `CampaignsPage` | Global campaign mood tracker. | Auth | 🟢 Active |
| `/media` | Static | `Layout` | `MediaPage` | Global asset repository. | Auth | 🟢 Active |
| `/chat` | Static | `Layout` | `ChatPage` | AI Concierge. | Auth | 🟢 Active |
| `/settings` | Static | `Layout` | `SettingsPage` | Workspace control. | Auth | 🟢 Active |
| `*` | Catch-all | `Layout` | `NotFound` | Graceful error handling for broken links. | Auth | 🟢 Active |

## 2. Sitemap Tree (Hierarchy)

```mermaid
graph TD
    Root[/] --> Dash[Dashboard]
    Dash --> Intake[/brand/intake]
    
    subgraph Brand_Identity [Strategy Domain]
        Dash --> Analysis[/brand/:brandId/analysis]
        Dash --> Profile[/brand/:brandId/profile]
        Dash --> Calendar[/brand/:brandId/calendar]
        Calendar --> Editor[/brand/:brandId/content/:postId]
        Dash --> Recs[/brand/:brandId/shoots/recommendation]
        Recs --> Wizard[/brand/:brandId/shoots/wizard]
    end

    subgraph Production_Hub [Execution Domain]
        Root --> Shoots[/shoots]
        Shoots --> Brief[/shoots/brief/:shootId]
        Shoots --> Crew[/shoots/crew/:shootId]
    end

    subgraph Global_Modules [Global Utilities]
        Root --> Events[/events]
        Root --> Campaigns[/campaigns]
        Root --> Media[/media]
        Root --> Chat[/chat]
        Root --> Settings[/settings]
    end
```

## 3. Layout Logic: "Focus Mode" Invariant

Standard screens use the **Triptych Layout** (Sidebar + Canvas + Intelligence). Certain high-concentration workflows use **Focus Mode**:

1.  **Brand Intake (`/brand/intake`)**: Full-width canvas to remove navigation distractions during DNA synthesis.
2.  **Shoot Wizard (`/brand/:brandId/shoots/wizard`)**: Fixed overlay that preserves global state (Cmd+K, Auth) while focusing on the production sequence.

## 4. Param Naming Convention

- **`:brandId`**: Used for all brand-contextual strategy routes.
- **`:shootId`**: Used for execution-context production routes.
- **`:postId`**: Specific content node identifier.

## 5. Architectural Correctives

- **Param Standardization**: All generic `:id` params have been refactored to `:brandId` to prevent link collision and data fetching bugs.
- **Catch-all Logic**: `*` now routes to a dedicated `NotFound` component within the `Layout` to preserve system navigation instead of silent redirection.
- **Legacy Purge**: `components/Wizard.tsx` is marked as legacy and scheduled for removal (confirmed no active imports).

---
*Audit Complete. System Status: Optimal.*