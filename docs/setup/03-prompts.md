# FashionOS V1 Core Setup Guide
**Architectural Blueprint: Manual Execution Baseline.**

---

## 1. EXECUTIVE SUMMARY
FashionOS V1 Core establishes the high-fidelity operational baseline for luxury brands. This phase focuses on **system stability, semantic routing, and manual CRUD capabilities**. It intentionally excludes AI features to ensure a hardened "Triptych" (3-panel) environment that scales.

---

## 2. DIRECTORY STRUCTURE (ROOT SOVEREIGNTY)
```text
/
├── components/             # Reusable UI Architecture
│   ├── ui/                 # Atomic design (stateless)
│   ├── layouts/            # Layout boundaries (Public, App, FullWidth)
│   └── shared/             # SEO, Global Search, Nav
├── contexts/               # Project, Auth, Intelligence state
├── pages/                  # Route Entry Points
│   ├── marketing/          # Public SEO content
│   ├── sponsors/           # Partnership hubs
│   └── app/                # Authenticated Workspace
│       ├── brand/          # Identity nodes (:brandId)
│       ├── crm/            # Relationships (:contactId)
│       ├── events/         # Show orchestration (:eventId)
│       ├── production/     # Shoots & Video (:shootId)
│       └── global/         # Dash, Settings, Chat
├── services/               # Supabase & SDK handshakes
├── utils/                  # Formatting & Constants
└── docs/                   # System Rules & PRD
```

---

## 3. SITEMAP & ROUTES TABLE

| Domain | Route Path | Layout | Auth |
| :--- | :--- | :--- | :--- |
| **Marketing** | `/` | Public | No |
| **Marketing** | `/features` | Public | No |
| **Sponsors** | `/sponsors/:category` | Public | No |
| **Onboarding** | `/brand/intake` | FullWidth | Yes |
| **App Core** | `/dashboard` | App | Yes |
| **Identity** | `/brand/:brandId/profile` | App | Yes |
| **Production** | `/shoots` | App | Yes |
| **Execution** | `/shoots/crew/:shootId` | App | Yes |
| **CRM** | `/crm/contacts/:contactId`| App | Yes |

---

## 4. SUPABASE CORE SCHEMA

| Table | Key Fields | Purpose |
| :--- | :--- | :--- |
| `brands` | `id, owner_id, name, dna_pillars, type` | Identity Root |
| `crm_contacts` | `id, brand_id, name, email, sentiment` | Relationships |
| `events` | `id, brand_id, venue_id, date, status` | Project Node |
| `shoots` | `id, brand_id, title, concept, status` | Production Hub |
| `assets` | `id, shoot_id, storage_url, meta_json` | Digital Assets |

---

## 5. INITIAL SETUP PROMPTS

### Prompt 1 — Repo Bootstrap
> "Act as a Senior Architect. Initialize a React + Vite + TypeScript project in the project root (no /src folder). 
> 1. Setup `package.json` with dependencies: `react-router-dom`, `lucide-react`, `@google/genai`, `clsx`, `tailwind-merge`.
> 2. Setup `vite.config.ts` and `tsconfig.json` with `@/` alias pointing to the root.
> 3. Implement `index.css` with Tailwind directives and the custom luxury Ivory/Charcoal/Sage theme.
> 4. Create `index.tsx` as the entry point and `App.tsx` as the router provider."

### Prompt 2 — Directory + Layout Scaffolding
> "Create the domain-driven directory structure in the project root. 
> 1. Implement `components/layouts/PublicLayout.tsx` (standard nav/footer).
> 2. Implement `components/layouts/AppLayout.tsx` (The 3-Panel Sovereign: Sidebar, Canvas, Intel).
> 3. Implement `components/layouts/FullWidthLayout.tsx` (minimal distraction).
> 4. Create UI primitives in `components/ui/`: `Button`, `Input`, `Card` using the FashionOS Style Guide."

### Prompt 3 — Routing + Sitemap Wiring
> "Setup the HashRouter tree in `App.tsx`. 
> 1. Define Public routes: `/`, `/features`, `/pricing`, `/demo`, `/sponsors/:category`.
> 2. Implement `ProtectedApp` gate that checks for an active brand.
> 3. Define App routes using semantic params: `/dashboard`, `/brand/:brandId/profile`, `/shoots/crew/:shootId`, `/crm/contacts/:contactId`.
> 4. Create `pages/NotFound.tsx` with separate variants for 'public' and 'app' domains."

### Prompt 4 — Core Pages (Empty States)
> "Generate high-fidelity empty state page shells for:
> - `pages/marketing/LandingPage.tsx`
> - `pages/app/global/Dashboard.tsx`
> - `pages/app/brand/BrandProfile.tsx`
> - `pages/app/production/ShootsPage.tsx`
> - `pages/app/crm/CRMHub.tsx`
> Use Lucide icons and luxury typography as defined in `style-guide.md`."

### Prompt 5 — Supabase Core Schema
> "Produce the SQL migration for Supabase. 
> 1. Create tables: `brands`, `crm_contacts`, `events`, `shoots`, `assets`.
> 2. Establish relationships (FKs) between `brands` and all sub-modules.
> 3. Add UUID primary keys and standard `created_at` / `updated_at` timestamps.
> 4. Create indexes on all semantic foreign keys for optimal dashboard query performance."

### Prompt 6 — Auth Gate + Session
> "Implement the `ProtectedApp` component. 
> 1. Use `onAuthStateChange` to track the user session.
> 2. If no brand identity exists in the database for the user, redirect to `/brand/intake`.
> 3. Create a `SessionProvider` to expose auth state globally.
> 4. Add a dummy RLS policy example: 'Owners can only view their own brands'."

---

## 6. PHASE PLAN

### Phase 0: Foundation (Stability Check)
- [ ] Router boots without white-screen errors.
- [ ] `@/` alias resolves correctly in all imports.
- [ ] Public vs App layouts switch correctly via route nesting.

### Phase 1: Core Data + CRUD (Manual)
- [ ] User can manually create a brand.
- [ ] User can manually plan a shoot (Form submission to DB).
- [ ] Dashboard displays live data from Supabase.
- [ ] Mobile navigation (Bottom Bar) is fully responsive.

---

## 7. COMMON ISSUES & FIXES
| Issue | Fix |
| :--- | :--- |
| **White Screen** | Verify `HashRouter` is used; check if root div `id="root"` exists. |
| **Alias Broken** | Ensure `vite.config.ts` and `tsconfig.json` baseUrl match root. |
| **Param Leak** | Check that `:brandId` is never passed to a route expecting `:shootId`. |
| **Auth Loop** | Ensure `ProtectedApp` redirect logic doesn't point to a sub-route of itself. |

---
**Status: Foundation Ready.**