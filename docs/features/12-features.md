# FashionOS Master Feature & Intelligence Matrix v2.0

This document serves as the canonical registry of the FashionOS platform, detailing the intersection of high-fidelity luxury design and neural automation.

---

## 1. System Modules & Interface Architecture

| Module Type | Screen / Page | Primary Purpose | Core Features | Advanced AI Features (Gemini 3.0) |
| :--- | :--- | :--- | :--- | :--- |
| **Website** | `LandingPage` | Immediate conversion & authority | One-shoot → All-channel copy, 3-step value prop. | Performance Simulation logic, Aesthetic compliance preview. |
| **Website** | `PricingPage` | Investment transparency | 3-tier Maison plans, FAQ, Custom diagnostics link. | Strategic "Thinking" for enterprise tier logic. |
| **Dashboard** | `Dashboard` | System command center | Critical path task list, Brand DNA index, Project grid. | **Forecaster Agent**: Grounded Search for SS25 market signals. |
| **Dashboard** | `BrandProfile` | Identity source-of-truth | DNA Pillars, Style Guide, Product Catalog. | **Storyteller Agent**: Narrative synthesis, Moodhallucination (G3 Image). |
| **Dashboard** | `MediaBoard` | Global asset management | Filter by Category/Persona, Batch audit tools. | **Guardian Agent**: Pixel-level DNA compliance audit (Vision). |
| **Wizard** | `BrandIntake` | Neural onboarding | 5-minute brand questionnaire, URL ingestion. | **URL Context Tool**: Scraping website to generate initial DNA pillars. |
| **Wizard** | `ShootWizard` | Production planning | 5-step production flow, Crew/Studio mapping. | **Veo 3.1 Fast**: Cinematic pre-viz mood video generation. |
| **Wizard** | `ProductionBrief` | Operational handoff | Shot List, Technical specs, Pre-Viz video link. | **Structured Output**: JSON-to-PDF platform-mapped shot lists. |
| **Chatbot** | `AI Concierge` | Strategic consultation | Contextual chat, history thread, Summary tool. | **Thinking Budget**: 4,096 tokens for deep strategic reasoning. |
| **Chatbot** | `IntelligencePanel` | Context-aware sidekick | Real-time production pulse, Booking mode. | **Grounded Maps**: Studio/Venue sourcing via Interactions API. |
| **Screen** | `CrewExecution` | On-set Hardware HUD | Camera overlay (ISO/f-stop), Test shot upload. | **Native Audio**: Live low-latency voice link for on-set direction. |

---

## 2. User Journeys & Workflow Logic

### Use Case 1: The Luxury Pivot (SS25 Strategy)
- **Actor**: Creative Director
- **Workflow**: `Grounded Forecast` ➔ `Strategy Chat` ➔ `DNA Update` ➔ `Shoot Wizard`.
- **Logic**: Use **Google Search Grounding** to detect the "Brutalist Silk" trend ➔ Use **Thinking** to evaluate if the trend aligns with heritage pillars ➔ Generate a mood film via **Veo 3.1** ➔ Dispatch a **Production Brief** to the global crew.

### Use Case 2: The Omnichannel Guardian (Brand Safety)
- **Actor**: Social Media Manager
- **Workflow**: `Inventory Sync` ➔ `Storyteller (Copy)` ➔ `Calendar` ➔ `Guardian Audit`.
- **Logic**: Ingest new SKU ➔ Generate heritage-aligned caption via **Gemini 3 Flash** ➔ Upload assets ➔ **Guardian Agent** (Vision) scans for lighting/palette drift ➔ Lock "Post" button if compliance < 85%.

### Use Case 3: On-Set Logistics (High-Velocity Production)
- **Actor**: Production Lead & Photographer
- **Workflow**: `Studio Sourcing` ➔ `Crew HUD` ➔ `Live Voice Link`.
- **Logic**: Use **Google Maps Grounding** to source studios in Milan ➔ Launch **Hardware HUD** ➔ Use **Native Audio** to ask: "Is the shadow ratio matching the Desert Noir brief?" ➔ Receive real-time score.

---

## 3. AI Agent & Automation Registry

| Agent Name | Role | Trigger | Key Gemini Tool | Automation Logic |
| :--- | :--- | :--- | :--- | :--- |
| **The Guardian** | Aesthetic Safety | Media Upload / Post Save | Gemini Vision (Flash) | Pixels are audited vs Style Guide HEX/Ratio; flags "Aesthetic Deviation." |
| **The Forecaster** | Strategic Alpha | Dashboard Refresh / Search | Google Search (Pro) | Scans trend indices; pushes "Strategic Pivot Alerts" to the Intel Panel. |
| **The Storyteller** | Verbal DNA | Product Ingestion / Chat | Structured Output (Flash) | Maps DNA pillars to technical specs to generate premium descriptions. |
| **The Producer** | Logistic Execution | Shoot Wizard / Booking | Google Maps (Flash) | Sourcing studios and rentals; building aspect-ratio-optimized shot lists. |

---

## 4. Technical Intelligence Tool Matrix

| Gemini 3 Feature | Implementation Link | Status | Specific Utility in FashionOS |
| :--- | :--- | :---: | :--- |
| **Text Generation** | `IntelligenceService.ts` | 🟢 | Unified narrative synthesis across all agents. |
| **Thinking** | `ChatPage.tsx` | 🟢 | Recursive reasoning for long-term brand equity forecasting. |
| **Function Calling** | `IntelligenceService.ts` | 🟡 | (Proposed) Direct sync with Shopify/n8n API nodes. |
| **Google Search** | `BrandAnalysis.tsx` | 🟢 | Verifying SS25 trends and competitor pricing data. |
| **Google Maps** | `BookingMode.tsx` | 🟢 | Grounded sourcing for Tier-1 studios and logistics. |
| **Veo 3.1 Fast** | `ShootWizard.tsx` | 🟢 | Generating cinematic mood films for pre-production. |
| **Native Audio** | `ChatPage.tsx` | 🟢 | Low-latency voice link for on-set "Eyes-Up" interaction. |
| **Structured Output** | `ShootWizard.tsx` | 🟢 | Converting concepts into validated JSON technical shot lists. |
| **URL Context** | `BrandIntake.tsx` | 🟢 | Ingesting brand heritage directly from Maison websites. |

---
*Status: Phase 4 Integration Documented.*