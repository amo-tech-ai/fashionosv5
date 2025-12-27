# 📝 FashionOS: Implementation Prompt Sequence

### 1 — Foundation & Architecture
**Goal**: Set up the absolute core foundation including project structure, routing, and layout sovereignty.

**Scope**:
- ✅ IN: File structure, HashRouter setup, Triptych Layout (Sidebar/Canvas/Intel), Public/App/FullWidth layouts, simple auth gate logic.
- ❌ OUT: AI agents, data persistence, any module-specific logic.

**What to Create**:
- `index.tsx` (Bootstrapper)
- `App.tsx` (Router setup with `PublicLayout`, `AppLayout`, and `FullWidthLayout`)
- `components/layouts/AppLayout.tsx` (Enforcing 3-panel architecture)
- `components/ui/` (Stateless Button, Card, and Input primitives using the existing Ivory/Charcoal style guide)

**Workflows**:
- User navigates between public marketing routes and the authenticated dashboard.
- System correctly toggles the Intelligence Panel based on route context.

**Validation Checklist**:
- [ ] Application boots without white-screen or console errors.
- [ ] Responsive navigation switches between Sidebar (Desktop) and Bottom-Bar (Mobile).
- [ ] Route nesting correctly applies the intended Layout shell.

**Regression Rules**:
- Triptych layout proportions must remain fixed.
- No `/src` folder; use root-level directories.

---

### 2 — Relational Data Model (Static)
**Goal**: Establish the comprehensive relational data model for the Maison ecosystem.

**Scope**:
- ✅ IN: TypeScript interfaces and Context Providers for Brands, Events, Shoots, CRM (Contacts/Deals), Sponsors, Vendors, and Assets.
- ❌ OUT: AI metadata, vector columns, actual database migrations.

**What to Create**:
- `types.ts` (Unified domain interfaces)
- `contexts/ProjectContext.tsx` (State management for Brands and Shoots)
- `contexts/CRMContext.tsx` (State management for Relationships and Sponsors)

**Workflows**:
- Components can access and update local brand and event state.
- Data structures allow for many-to-one relationships (e.g., multiple Shoots per Brand).

**Validation Checklist**:
- [ ] State persists across route changes.
- [ ] Type safety is maintained across all core modules.

**Regression Rules**:
- Do not add AI-specific fields to the schema yet.

---

### 3 — Core Management Screens (Manual CRUD)
**Goal**: Build the primary read/write interfaces for the human working canvas.

**Scope**:
- ✅ IN: Dashboard, Brand Profile, Events List, Shoots Grid, CRM Hub, Media Library. Manual data entry only.
- ❌ OUT: AI suggestions, automated status updates, pre-viz generation.

**What to Create**:
- `pages/app/global/Dashboard.tsx`
- `pages/app/brand/BrandProfile.tsx` (Tabbed: Overview, Styles, Products)
- `pages/app/crm/CRMHub.tsx` (Searchable Table)
- `pages/app/production/ShootsPage.tsx`

**Workflows**:
- User can manually create a Brand.
- User can manually add a Contact to the CRM.
- User can view a list of planned Shoots.

**Validation Checklist**:
- [ ] CRUD forms correctly update context state.
- [ ] Navigation breadcrumbs correctly map to semantic params (e.g., `:brandId`).

**Regression Rules**:
- UI must strictly follow the existing premium luxury style guide.

---

### 4 — Operational Workflows (Manual)
**Goal**: Implement the operational handshakes required for production and logistics.

**Scope**:
- ✅ IN: Task assignment, status toggles, asset upload placeholders, event cue management.
- ❌ OUT: AI task generation, automated scheduling.

**What to Create**:
- `components/production/TaskBoard.tsx`
- `components/events/RunOfShow.tsx`
- `components/media/MediaGrid.tsx`

**Workflows**:
- Production lead assigns a Photographer to a Shoot.
- Event lead marks an AV task as "Complete."
- User uploads a mock asset to the Media Board.

**Validation Checklist**:
- [ ] State updates reflect across related dashboards (e.g., Shoot progress updates).
- [ ] Mobile interaction (Tap-to-toggle) is ergonomic.

**Regression Rules**:
- Do not refactor the 3-panel layout.

---

### 5 — Analytics & Performance HUD (Static Logic)
**Goal**: Build the diagnostic layer using static mathematical logic.

**Scope**:
- ✅ IN: Performance counters, progress bars, DNA match percentage (manual input), reach totals.
- ❌ OUT: Predictive analytics, ROI forecasting, trend detection.

**What to Create**:
- `components/shared/MetricsGrid.tsx`
- `components/brand/DNAIndex.tsx`
- `components/crm/DealPipeline.tsx`

**Workflows**:
- Dashboard calculates "Total Maison Reach" based on manual input data.
- Shoot card shows "Completion %" based on shot-list status.

**Validation Checklist**:
- [ ] Calculations are accurate and update in real-time with state changes.
- [ ] Visualizations use the Sage/Champagne accent palette.

---

### 6 — Operational Wizards (Multi-Step)
**Goal**: Implement guided data entry for complex Maison tasks.

**Scope**:
- ✅ IN: Brand Intake, Event Creator, Shoot Planner, Sponsor Setup. Draft-to-Commit logic.
- ❌ OUT: AI auto-filling fields, pre-viz video generation.

**What to Create**:
- `pages/app/brand/BrandIntake.tsx`
- `pages/app/production/ShootWizard.tsx`
- `components/ui/WizardShell.tsx`

**Workflows**:
- User completes a 5-step form to plan a new runway show.
- Data is stored as a "Draft" until the final "Commit" step.

**Validation Checklist**:
- [ ] Forward/Backward navigation works without state loss.
- [ ] Final "Commit" writes to the correct primary state node.

---

### 7 — AI Advisor: Context-Aware Intelligence (Read-Only)
**Goal**: Introduce the first layer of Gemini-powered intelligence for situational awareness.

**Scope**:
- ✅ IN: Gemini 3 Flash, `IntelligencePanel.tsx` integration, "Explain this Screen" logic.
- ❌ OUT: AI drafting content, AI modifying database records.

**What to Create**:
- `services/ai/IntelligenceService.ts` (Base Gemini integration)
- Context matching logic for the Right Panel.

**Workflows**:
- User opens the Intel Panel on the Shoots page; AI explains the "Readiness Score."
- AI highlights missing vendor contracts in the Events context.

**Validation Checklist**:
- [ ] AI responses are scoped strictly to the current page context.
- [ ] No leakage of app data into public marketing pages.

**Gemini Details**:
- Tool: `Gemini 3 Flash` for low-latency status reading.
- Why: Speed and cost-efficiency for simple data summarization.

---

### 8 — AI Narrative & Draft Engine (Safe Mode)
**Goal**: Automate the creation of premium brand copy and technical lists.

**Scope**:
- ✅ IN: Gemini 3 Pro, Structured Output (JSON), Draft Proposals for Tasks, Captions, and Briefs.
- ❌ OUT: Direct DB writes.

**What to Create**:
- `components/intelligence/ProposalOverlay.tsx`
- Draft-to-Human Handshake logic.

**Workflows**:
- User clicks "Synthesize Shot List" in the Wizard.
- AI proposes 40 technical items.
- Human edits items 3 and 12, then clicks "Approve."

**Validation Checklist**:
- [ ] AI-generated drafts are editable by humans.
- [ ] Approvals correctly commit to the primary DB.

**Gemini Details**:
- Tool: `Gemini 3 Pro` + `Structured Output`.
- Why: Precise JSON formatting for technical production lists.

---

### 9 — Grounded Automations & Approval Gates
**Goal**: Connect the Maison to live market data and physical logistics.

**Scope**:
- ✅ IN: Search Grounding, Maps Grounding, n8n/Postiz webhooks (mocked), Automated recovery proposals.
- ❌ OUT: Autonomous spending or contract signing.

**What to Create**:
- `services/ai/GroundingNode.ts`
- `components/intelligence/RiskSentinel.tsx`

**Workflows**:
- Event delay is detected; AI uses `googleMaps` to find the nearest AV rental store.
- AI uses `googleSearch` to verify a sponsor's latest brand safety news.

**Validation Checklist**:
- [ ] All AI proposals include grounded citations/links.
- [ ] System prevents "Commits" without explicit human handshake.

**Gemini Details**:
- Tool: `Search Grounding` + `Maps Grounding`.
- Why: Prevents hallucination of venues, vendors, or market trends.

---

### 10 — Learning Loop & Maison Optimization
**Goal**: Implement the closed-loop system where actual outcomes improve future planning.

**Scope**:
- ✅ IN: Planned vs. Actual comparison, SOP updates, RAG (pgvector) re-embedding of successful projects.
- ❌ OUT: Changing the 3-panel architectural invariant.

**What to Create**:
- `components/analytics/OutcomeAnalysis.tsx`
- `services/data/RAGService.ts`

**Workflows**:
- User completes an event; AI analyzes "Actual vs. Planned" timing.
- AI suggests an update to the "Runway SOP" based on load-in friction.

**Validation Checklist**:
- [ ] New SOP versions are stored and retrieved for the next event.
- [ ] DNA Index correctly reflects "Learning Momentum."

**Gemini Details**:
- Tool: `Gemini 3 Pro` + `Thinking`.
- Why: Recursive reasoning for long-term strategic improvements.

---
**END OF PROMPT SEQUENCE**