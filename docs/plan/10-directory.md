# FashionOS: Enterprise Directory & Routing Architecture Plan

**Version:** 2.1 (Production Baseline)  
**Status:** Canonical Reference  
**Owner:** Principal Frontend Architect  

---

## 1. Directory Structure (The Foundation)

FashionOS utilizes a **Domain-Driven Module Pattern**. This ensures that as the platform grows to 100+ routes, ownership remains clear and bundle sizes stay optimized.

### 1.1 Root-Level Organization (Project Root)
```text
/ (Project Root - No /src folder)
├── components/             # Atomic UI & Shared Layouts
│   ├── ui/                 # Stateless primitives (Buttons, Inputs)
│   ├── layouts/            # PublicLayout, AppLayout, FullWidthLayout
│   ├── shared/             # SEO, Global Search, Footer
│   └── brand-profile/      # Domain-specific components (Legacy grouping)
├── contexts/               # Global State (Auth, Projects, Intelligence)
├── pages/                  # Route Entry Points (Domain Grouped)
│   ├── marketing/          # Public-facing SEO content (Landing, About, Pricing)
│   ├── sponsors/           # Partner verticals (Beauty, Auto, etc.)
│   ├── services/           # Marketplace & Talent nodes
│   └── app/                # Authenticated Workspace
│       ├── brand/          # Workspace scoped to :brandId
│       ├── production/     # Shoot execution & Video ( :shootId )
│       └── global/         # Dashboard, Settings, Concierge
├── services/               # Logic, API, and Intelligence Handshakes
│   ├── ai/                 # Gemini, Veo, Native Audio logic
│   └── data/               # Persistence & External Sync
├── utils/                  # Pure logic, formatting, and constants
└── docs/                   # Architectural Governance
```

### 1.2 Domain Expansion: `pages/app/brand`
```text
pages/app/brand/
├── analysis/               # Strategy & Gap Scoring
├── profile/                # Identity & DNA Core (Overview, Styles, Products)
└── content/                # Calendar & Omnichannel Editor
```

---

## 2. Sitemap Architecture (What Exists)

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
        Workspace --> Production[/shoots/*]
        Workspace --> Concierge[/chat]
    end
```

### 2.2 Canonical Route Table
| Domain | Route | Purpose | Access | Layout |
| :--- | :--- | :--- | :--- | :--- |
| **Marketing** | `/` | Hero conversion. | Public | `PublicLayout` |
| **Sponsors** | `/sponsors/:category` | Vertical-specific SEO. | Public | `PublicLayout` |
| **Onboarding** | `/brand/intake` | Neural brand setup. | Auth | `FullWidth` |
| **App Core** | `/dashboard` | Command center. | Auth | `AppLayout` |
| **Identity** | `/brand/:brandId/profile` | DNA Single-Source. | Auth | `AppLayout` |
| **Production** | `/shoots` | Active production hub. | Auth | `AppLayout` |
| **Execution** | `/shoots/crew/:shootId` | On-set Hardware HUD. | Auth | `AppLayout` |
| **System** | `*` | Catch-all fallback. | Global | `Context-Aware` |

---

## 3. Routing Structure (How it wires)

### 3.1 Layout Boundaries
- **PublicLayout**: Contains SEO-optimized header/footer. No Intelligence Panel.
- **AppLayout**: The "Triptych" (Sidebar + Canvas + Intelligence).
- **FullWidthLayout**: Distraction-free (Onboarding/Intake).

### 3.2 Semantic Parameter Law
Dynamic parameters must be explicit to avoid collisions in the data-fetching layer:
- ✅ `/brand/:brandId/analysis`
- ✅ `/shoots/crew/:shootId`
- ✅ `/brand/:brandId/content/:postId`
- ❌ `/brand/:id` (Generic `:id` is forbidden)

---

## 4. Common Failure Points at Scale

| Risk | Description | Impact |
| :--- | :--- | :--- |
| **Context Leaking** | Public pages importing `ProjectContext` before initialization. | 💥 App crashes for guest users. |
| **Param Collisions** | Using `:id` for both brands and shoots. | ❌ Router ambiguity; wrong data fetched. |
| **Layout Bloat** | Heavy AI logic inside the root `App.tsx` or `Layout.tsx`. | 🐢 Slow navigation & hydration. |
| **SEO Decay** | Missing unique `<title>` or `meta` tags on dynamic sponsor pages. | 📉 Dropped search rankings. |

---

## 5. Best-Practices Ruleset (Architectural Law)

1.  **Rule of Isolation**: Public pages must NEVER import App-only contexts or heavy AI components.
2.  **Rule of Parameters**: All dynamic route segments MUST be semantic (e.g., `:brandId`).
3.  **Rule of One**: One domain (e.g., Sponsors) equals exactly one folder in `pages/`.
4.  **Rule of SEO**: Every public route MUST render the `<SEO />` component with unique metadata.
5.  **Rule of Catch-All**: The system must provide separate `NotFound` experiences for the Public domain vs. the App workspace.

---

## 6. Migration & Adoption Plan

### Phase 1: Immediate Stabilization
- [ ] Standardize all route params to `:brandId` and `:shootId`.
- [ ] Enforce `ProtectedRoute` wrapper for the `/dashboard` and `/brand` tree.
- [ ] Move any leaked logic from `App.tsx` into domain-specific page shells.

### Phase 2: Structural Refactor
- [ ] Move Layout files to `components/layouts/`.
- [ ] Extract domain UI from `components/` into `pages/app/domain/components/`.

### Phase 3: SEO Hardening
- [ ] Audit every public route in the `Sitemap` for unique meta tags.
- [ ] Implement the `Context-Aware NotFound` system with Public/App variants.

---
*End of Plan. System Integrity: Operational.*
