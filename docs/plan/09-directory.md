# FashionOS: Enterprise Directory & Routing Architecture Plan

**Version:** 2.0  
**Status:** Canonical Reference  
**Scope:** Marketing, Sponsors, App Workspace, and AI Integration  

---

## 1. Directory Structure (The Foundation)

To scale to 100+ routes without entropy, FashionOS utilizes a **Domain-Driven Directory Pattern**. This separates public SEO concerns from authenticated workspace logic.

### 1.1 Root-Level Organization
```text
/ (Project Root)
├── components/             # Domain-Agnostic UI & Shared Layouts
│   ├── ui/                 # Atomic design (Buttons, Inputs, Modals)
│   ├── layouts/            # PublicLayout, AppLayout, FullWidthLayout
│   └── shared/             # SEO, Navigation, Notification components
├── contexts/               # Global State (Isolation required)
│   ├── ProjectContext.tsx  # Brand/Data persistence
│   └── IntelligenceContext.tsx # Panel & AI state
├── pages/                  # Route Entry Points (Domain Grouped)
│   ├── marketing/          # Public-facing SEO content
│   ├── sponsors/           # Partner verticals (Beauty, Auto, etc.)
│   ├── services/           # Marketplace & Talent nodes
│   └── app/                # Authenticated Workspace
│       ├── brand/          # Workspace scoped to :brandId
│       ├── production/     # Shoot & Video execution
│       └── global/         # Dashboard, Settings, Chat
├── services/               # API & Intelligence Handshakes
│   ├── ai/                 # Gemini, Veo, Native Audio logic
│   └── data/               # Persistence & External Sync
├── utils/                  # Pure logic, formatting, and constants
└── docs/                   # Architectural Governance
```

### 1.2 Domain Expansion: `app/brand`
```text
pages/app/brand/
├── intake/                 # Onboarding flow
├── analysis/               # Strategy & Scoring
├── profile/                # Identity & DNA Core
│   ├── components/         # Profile-specific sub-components
│   └── views/              # Overview, Scores, StyleGuide, Products
└── content/                # Calendar & Post Editor
```

### 1.3 Why it scales
- **Ownership Clarity**: Front-end engineers know exactly where "Pricing" logic lives (Marketing) vs "Shoot" logic (App Production).
- **Reduced Bundle Weight**: Clear boundaries allow for more efficient code splitting in future optimization phases.
- **Context Isolation**: Public pages are prevented from importing heavy App-only contexts, avoiding cold-start crashes.

---

## 2. Sitemap Architecture (What Exists)

FashionOS operates across three distinct domains. Navigation flows are strictly gated.

### 2.1 Visual Hierarchy
```mermaid
graph TD
    Root[/] --> Public[Public Marketing]
    Root --> Sponsors[Sponsor Verticals]
    Root --> Workspace[Auth Workspace]

    subgraph Public_Domain
        Public --> Home[/]
        Public --> Features[/features]
        Public --> Pricing[/pricing]
        Public --> Demo[/demo]
    end

    subgraph Partner_Domain
        Sponsors --> SpHub[/sponsors]
        Sponsors --> SpCat[/sponsors/:category]
    end

    subgraph Auth_Workspace
        Workspace --> Dash[/dashboard]
        Workspace --> Brand[/brand/:brandId/*]
        Workspace --> Shoots[/shoots/*]
        Workspace --> Concierge[/chat]
    end
```

### 2.2 Canonical Route Table
| Domain | Route | Purpose | Access |
| :--- | :--- | :--- | :--- |
| **Marketing** | `/` | Hero conversion. | Public |
| **Marketing** | `/features` | AI capability index. | Public |
| **Sponsors** | `/sponsors/:category` | Vertical-specific SEO. | Public |
| **Marketplace**| `/services/:type` | Talent & Studio booking. | Public |
| **Onboarding** | `/brand/intake` | Neural brand setup. | Auth |
| **App Core** | `/dashboard` | System command center. | Auth |
| **Identity** | `/brand/:brandId/profile` | DNA Single-Source-of-Truth. | Auth |
| **Production** | `/shoots` | Active production hub. | Auth |
| **Execution** | `/shoots/crew/:id` | Hardware HUD for on-set. | Auth |

---

## 3. Routing Structure (How it wires)

### 3.1 Layout Boundaries
- **PublicLayout**: Contains SEO-optimized header and footer. Focuses on content readability.
- **AppLayout**: The "Triptych" (Sidebar + Canvas + Intelligence). Focuses on utility.
- **FullWidthLayout**: Used for Onboarding (`/brand/intake`) to remove navigation distractions.

### 3.2 Routing Non-Negotiables
1. **Explicit Params**: Use `:brandId` and `:shootId` instead of generic `:id`.
2. **Context-Aware 404s**:
   - `marketing/*` ➔ Renders Public 404.
   - `dashboard/*` ➔ Renders App 404 (keeping sidebar visible).
3. **Trailing Slashes**: Use consistent trailing slash handling to prevent duplicate content SEO penalties.

---

## 4. Common Failure Points at Scale

| Risk | Description | Impact |
| :--- | :--- | :--- |
| **Context Leaking** | Public pages importing `ProjectContext` before initialization. | 💥 App crashes for new guests. |
| **Param Collisions** | Using `:id` for both brands and shoots in the same route tree. | ❌ Wrong data fetched on refresh. |
| **Layout Bloat** | Putting complex AI panel logic inside the root `App.tsx`. | 🐢 Slow navigation performance. |
| **SEO Poisoning** | Dynamically generated sponsor pages missing unique `<title>` tags. | 📉 Dropped search rankings. |

---

## 5. Ruleset (The Architectural Law)

- **Rule 1**: One domain (e.g. Sponsors) equals one folder in `pages/`.
- **Rule 2**: Public pages MUST NOT import App contexts (`ProjectContext`, etc).
- **Rule 3**: All workspace routes MUST be nested under a `ProtectedRoute` or gated wrapper.
- **Rule 4**: Dynamic params MUST be semantic (e.g. `:brandId`).
- **Rule 5**: Components with business logic belong in their domain folder, not the global `components/ui/`.

---

## 6. Migration & Adoption Plan

### Phase 1: Immediate Stabilization
- Implement semantic params (`:brandId`).
- Separate `PublicLayout` from `AppLayout`.
- Establish the `pages/marketing` and `pages/app` hierarchy.

### Phase 2: Gradual Refactor
- Extract domain-specific components from `components/` into their respective `pages/domain/components/` folders.
- Implement the smart 404 routing system.

### Phase 3: Developer Onboarding
- Developers must run the "Preflight Checklist" defined in the System Rules before committing new routes.
- New features require a defined "Domain Parent" before file creation.

---
*End of Plan. System Integrity: Operational.*
