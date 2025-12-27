# GEMINI PROMPTS — FashionOS AI CHATBOT / ADVISOR / ASSISTANT (SYSTEM PLAN) v1.1

Use the prompts below to design an **AI Advisor Chatbot** that works across the **entire FashionOS system**:
- **Shoots (Photography + Video)**
- **Ecommerce (Shopify/Amazon)**
- **Social Channels + Content**
- **Campaigns**
- **Events + Fashion Shows**
- **Sponsors**
- **Venues + Vendors**
- **Media / Press**
- **Playbooks + RAG**
- **CRM**

The goal is **NOT a generic chatbot**. It’s a **context-aware operating advisor** with safety, approvals, and measurable outcomes.

---

## PROMPT 1 — AI Advisor System Blueprint (Foundation)

### ROLE
You are a **Principal AI Systems Architect + Product Designer**.

### TASK
Design an **AI Advisor / Assistant** for FashionOS that:
- Understands current context: brand, shoot, campaign, event, sponsor, venue, vendor, media, CRM
- Suggests actions, improvements, risks, and optimizations
- NEVER commits actions without approval
- Uses Playbooks + RAG + Agents (Orchestrator-based)

### REQUIRED MODULE COVERAGE (MUST SUPPORT ALL)
- Shoots (photo/video)
- Ecommerce (products, links, attribution, conversions)
- Social channels (IG/TikTok/YouTube/Pinterest/email/site)
- Campaigns (launches, schedules, KPIs)
- Events + fashion shows (run-of-show, staffing, checklists)
- Sponsors (packages, deliverables, ROI)
- Venues + vendors (selection, logistics, contracts)
- Media/press (lists, outreach, press kits)
- CRM (contacts, accounts, deals)

### CORE REQUIREMENTS
1. Exists as:
   - Right-side **Advisor Panel** (persistent)
   - Optional **Chat Overlay** (expanded mode)
2. Must be **context-aware** (minimum context keys):
   - brandId
   - shootId
   - campaignId
   - eventId
   - sponsorId
   - venueId
   - vendorId
   - contactId
   - mediaOutletId
   - current route + screen name
3. Operates in modes:
   - Explain (read-only)
   - Recommend (options + tradeoffs)
   - Draft (content/tasks/messages as drafts)
   - Analyze (scores/risks/diagnostics)
4. Must NEVER write directly to DB (draft → approval → execution only)

### PROGRESS TRACKER (TOP OF PANEL)
Include a small tracker showing:
- Context loaded ✅
- Playbooks matched ✅
- Risks detected ⚠️
- Suggestions pending 🧠
- Approvals required ⛔
- Ecommerce tracking OK ✅ (if campaign/ecom context)
- Live ops readiness ✅ (if event/shoot live mode)

### OUTPUT
- Advisor architecture
- UI layout
- Context injection model
- Safety rules
- File structure
- How modules share one Advisor without becoming messy

---

## PROMPT 2 — Advisor Capabilities (Core vs Advanced) Across All Modules

### ROLE
You are a **Product Manager + AI Strategist**.

### TASK
List and design **Core (V1)** and **Advanced (V2+)** capabilities of the FashionOS AI Advisor across:
Shoots, Video, Ecommerce, Social, Campaigns, Events, Sponsors, Venues/Vendors, Media, CRM.

### CORE CAPABILITIES (NO AI WRITES)
- Explain status for each module (what’s happening + what’s blocked)
- Detect missing fields (e.g., vendor insurance missing, sponsor deliverable unassigned)
- Risk alerts (deadlines, conflicts, low coverage, inventory issues)
- Next-step recommendations (text only)
- “What changed since last week?” summaries

### ADVANCED CAPABILITIES
- Generate drafts:
  - Tasks + dependencies (events/shoots)
  - Run-of-show + call sheets (events/shows)
  - Shot lists + scene plans (photo/video)
  - Sponsor activation plans + deliverables (sponsors)
  - Press pitches + press kit outlines (media)
  - Social captions + campaign variants (channels)
  - Product copy + SEO blocks (ecommerce)
- Optimization:
  - Timeline + resource optimization
  - Budget allocation suggestions
  - Channel mix recommendations
  - Sponsor ROI improvements
  - Vendor/venue shortlists (maps + constraints)
- Scoring:
  - Event readiness score
  - Shoot readiness score
  - Campaign health score
  - Sponsor ROI confidence score
  - CRM pipeline health score

### FOR EACH CAPABILITY
Provide:
- Description
- Screens used
- Agents involved
- Gemini tools used
- Real-world example

### OUTPUT
- Comparison table (Core vs Advanced)
- Capability → module mapping table

---

## PROMPT 3 — Advisor Use Cases (Real World) — Expanded Scenarios

### ROLE
You are an **Operations Director for Fashion + Production + Commerce**.

### TASK
Design **real-world scenarios** where the AI Advisor adds value across modules.

### REQUIRED SCENARIOS (MUST INCLUDE)
1. Fashion Week event producer (run-of-show + vendors + staffing)
2. Sponsorship manager negotiating (beauty/auto/tech) + deliverables + ROI
3. Creative director planning a **photo + video shoot** (shot list + crew + gear)
4. Ecommerce lead launching collection (Shopify products + conversion + attribution)
5. Social lead planning channel calendar (IG/TikTok/email/site) + variants
6. CRM manager handling VIP buyer relationships + follow-ups
7. Ops manager recovering from delays (event or shoot)
8. Media/PR lead building press list + outreach + press kit
9. Venue selection for a show (maps grounding + constraints)

### FOR EACH SCENARIO
Describe:
- User question
- Advisor response
- Agents used
- Outcome
- What is NOT allowed without approval

---

## PROMPT 4 — Advisor Screens & Placement (All Modules)

### ROLE
You are a **UX Architect**.

### TASK
Design where the AI Advisor appears across FashionOS, including shoots, video, ecommerce, campaigns, events, sponsors, venues, vendors, media, CRM.

### REQUIRED SCREENS
- Overview Dashboard
- CRM: Contacts / Accounts / Deals
- Events Dashboard
- Fashion Show Planner (run-of-show)
- Run-of-Show Live mode
- Shoots Dashboard
- Shoot Planning (scene builder + shot list)
- Video Production Hub (edits, deliverables, cut list)
- Ecommerce Hub (products, collections, conversion)
- Social Channels Hub (calendar + content variants)
- Campaign Analytics (KPI + attribution)
- Sponsors Dashboard (packages, placements, ROI)
- Venues/Vendors Hub (shortlists, contracts, tasks)
- Media Hub (press list, outreach, press kits)

### FOR EACH SCREEN
Define:
- Context loaded (IDs + objects)
- Suggested questions chips (5–10)
- Proposable actions (draft-only)
- Read-only vs draft-only vs approval-required
- What citations/evidence UI looks like

### OUTPUT
- Screen table
- UI behavior rules
- Consistent “Advisor card” format

---

## PROMPT 5 — AI Agents Used by the Advisor (Module-Aware)

### ROLE
You are an **AI Platform Engineer**.

### TASK
Define how the AI Advisor uses **multi-agent orchestration** with module routing.

### REQUIRED AGENTS
- Orchestrator
- Planner
- Analyst
- Retriever (RAG)
- Extractor
- Optimizer
- Scorer
- Content/Comms
- Ops Automation
- Controller (Approval Gate)

### ADD: MODULE ROUTING RULES
- If screen is **Shoots/Video** → Planner + Ops + Optimizer
- If screen is **Ecommerce/Campaigns** → Analyst + Optimizer + Scorer
- If screen is **Sponsors/CRM** → Analyst + Content/Comms + Scorer
- If screen is **Events/Venues/Vendors** → Planner + Ops + Retriever + Controller
- If “Generate draft” intent → Structured output + approval gating

### OUTPUT
- Agent responsibility matrix (by module)
- Orchestrator decision flow

---

## PROMPT 6 — Advisor Workflows & Automations (Shoots + Ecommerce + Channels + Events)

### ROLE
You are a **Systems Architect**.

### TASK
Design workflows where the AI Advisor:
- Detects issues
- Proposes actions
- Routes for approval
- Executes via automations

### REQUIRED WORKFLOWS (MUST INCLUDE ALL)
1. Event delay detected → recovery plan proposed
2. Sponsor deliverable overdue → reminder drafted + escalation path
3. Weak campaign performance → creative refresh + budget reallocation suggested
4. CRM contact inactive → follow-up drafted + meeting suggestion
5. High-performing asset → repurpose plan + channel redistribution
6. Shoot missing coverage → “shot list gap” + reshoot proposal
7. Video edit late → delivery risk + vendor replan
8. Ecommerce conversion drop → product page fixes + A/B test plan
9. Venue shortlisting → maps grounding + constraints + shortlist
10. Media outreach → press list + pitch drafts + send-plan (approval)

### OUTPUT
- Trigger → AI → Approval → Action flow
- Automation table
- Safety constraints (what can auto-run vs needs approval)

---

## PROMPT 7 — Gemini 3 Tools Mapping (MANDATORY, Module-Specific)

### ROLE
You are a **Gemini Integration Specialist**.

### TASK
Map each Advisor capability (by module) to Gemini tools.

### MUST INCLUDE
- Gemini 3 Pro (reasoning)
- Gemini 3 Flash (fast UI responses)
- Gemini Thinking
- Function Calling
- Structured Outputs
- URL Context Tool (e.g., competitor site, sponsor site, venue site)
- Google Search Grounding (vendors, press outlets, trends)
- Google Maps Grounding (venues, logistics, travel time)
- Code Execution (calculations, scoring, timeline logic)
- Interactions API (live voice advisor / real-time critique)
- Deep Research (industry benchmarking)
- RAG (pgvector SOPs / playbooks)
- Image Generation (Nano Banana / Pro) for:
  - moodboards
  - campaign concepts
  - poster/key visual drafts
  - social variants (draft-only)

### OUTPUT
- Table: Capability → Module → Gemini Tool → Why → Output type (text/JSON/image)

---

## PROMPT 8 — Data Model for Advisor (Including Shoots/Ecom/Channels)

### ROLE
You are a **Backend Architect**.

### TASK
Design the data model supporting the AI Advisor across all modules.

### REQUIRED TABLES
- ai_runs
- ai_messages
- ai_suggestions
- ai_approvals
- ai_citations
- ai_context_snapshots

### ALSO INCLUDE MODULE TABLE LINKS (RELATIONSHIPS)
- brands
- shoots, shoot_scenes, shot_list, deliverables
- videos, edits, cuts, delivery_milestones
- campaigns, campaign_assets, channel_posts, performance_metrics
- ecommerce_products, collections, orders, attribution_links
- events, run_of_show, event_tasks, vendors, venues
- sponsors, sponsor_packages, placements, roi_reports
- crm_contacts, crm_accounts, crm_deals
- media_outlets, press_contacts, press_kits, outreach_threads
- sop_docs, sop_chunks (RAG)

### INCLUDE
- fields
- relationships
- audit requirements
- multi-tenant safety (org_id/brand_id scoping)
- approval gate enforcement

---

## PROMPT 9 — Mermaid Diagrams (MANDATORY)

### TASK
Create Mermaid diagrams for the Advisor covering:
Shoots, campaigns, ecommerce, events, sponsors, venues/vendors, media.

### REQUIRED
1. Flowchart — Advisor decision logic + module routing
2. Sequence diagram — User → Advisor → Agents → Approval → Execution
3. Journey diagram — From brand intake → campaign → show → post-event learning loop

### OUTPUT
Valid Mermaid syntax only.

---

## PROMPT 10 — Phased Implementation Plan + Checkpoints (Zero Breakage)

### ROLE
You are a **Delivery Lead**.

### TASK
Create a phased plan to build the Advisor safely and incrementally.

### PHASES
- Phase 1: Read-only Advisor (Explain + Status) for ALL modules
- Phase 2: Draft + Recommend (tasks/messages/shot lists) — no execution
- Phase 3: Automations with approval gates (reminders, scheduling, updates)
- Phase 4: Learning loop + personalization (RAG + outcomes feedback)

### FOR EACH PHASE
Include:
- Features included (by module)
- Features excluded (explicitly)
- Checkpoints:
  - Verify context scoping
  - Verify citations
  - Verify no public-page leakage
  - Verify approval gate works
- Validation checklist
- Regression safeguards (what must NOT break)

---

## FINAL CONSTRAINTS
- AI proposes, humans approve
- Every suggestion must cite data or SOPs (or explicitly label as assumption)
- No hallucinated actions
- Full audit trail required
- Public marketing pages cannot load app contexts/AI state
