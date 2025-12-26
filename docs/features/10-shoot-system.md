# 📸 FashionOS: Neural Shoot & Production System (Master Plan)

This document outlines the end-to-end architecture, logic, and implementation strategy for the FashionOS Shoot System—transforming brand DNA into a high-conversion production pipeline.

---

## 1. System Implementation Audit (Status Tracker)

| Component | Status | Tech / Tooling |
| :--- | :---: | :--- |
| **Brand Identity Intake** | 🟢 | `BrandIntake.tsx` |
| **Grounded DNA Analysis** | 🟢 | `IntelligenceService.ts` |
| **Neural Performance Scoring** | 🟢 | `ScoresSection.tsx` |
| **Scenario Mapping (Beach/City/Vogue)** | 🟢 | `ShootRecommendation.tsx` |
| **Manual Multi-Step Shoot Wizard** | 🟡 | `ShootWizard.tsx` (In Dev) |
| **One-Page Shot List Architect** | 🟡 | `gemini-3-flash-preview` |
| **Live On-Set Compliance** | 🟢 | `gemini-2.5-flash-native-audio` |
| **Deep Channel Scan (Amazon/Shopify)** | 🟡 | `DeepGroundingAgent` |
| **Visual RAG System (PgVector)** | 🔴 | `Supabase Vector` |
| **AI Content Deployment (n8n/Postiz)** | 🔴 | `Supabase Edge Functions` |

---

## 2. Neural Screen Architecture & Routing

The Shoot System is distributed across four core routes to ensure a logical transition from "Strategy" to "Execution."

| Route | UI Module | AI Logic / Agent | Data Context |
| :--- | :--- | :--- | :--- |
| `/brand/:id/shoots/recommendation` | **Concept Gallery** | **The Forecaster**: Scans trends vs. DNA. | Global Trends, Persona Alignment. |
| `/brand/:id/shoots/wizard` | **Multi-Step Creator** | **The Creative Director**: Interactive planning. | Budget, Timing, Channel Selection. |
| `/brand/:id/shoots/brief/:briefId` | **Production Brief** | **The Storyteller**: Technical Copywriting. | Lighting Specs, Poses, Narrative. |
| `/shoots` | **Production OS** | **The Guardian**: Asset Compliance Audit. | RAW Frames, Metadata, DNA Scores. |

---

## 3. The Manual Multi-Step Shoot Wizard (Workflow)

Designed for designers who need granular control over the AI's creative output.

### Step 1: Concept & Narrative Ingestion
*   **User Action**: Select an AI concept (e.g., "Desert Noir") or enter custom prompt.
*   **AI Logic**: `gemini-3-pro-preview` (Thinking 32k) expands the prompt into a cinematic narrative aligned with the Brand DNA.

### Step 2: Visual Moodhallucination
*   **User Action**: Trigger "Generate Pre-Viz."
*   **AI Logic**: `gemini-3-pro-image-preview` generates 4 high-fidelity mood images. `veo-3.1-fast` generates a 10s movement vignette.

### Step 3: Channel Strategy & Ratio Mapping
*   **User Action**: Select target platforms (IG, TikTok, Amazon, Shopify).
*   **AI Logic**: System calculates the "Golden Ratio Mix" (e.g., 70% Vertical, 30% Landscape) to maximize cross-platform ROI.

### Step 4: Grounded Logistics Sourcing
*   **User Action**: "Find Studio & Models."
*   **AI Logic**: `googleMaps` sources studios within 50km. `googleSearch` identifies models whose recent campaigns match the "Silent Curator" persona.

### Step 5: Shot List Synthesis
*   **User Action**: "Generate One-Page Brief."
*   **AI Logic**: `gemini-3-flash-preview` outputs a structured JSON list of 40 checklist items (Macro textures, Hero silhouettes, Lifestyle movement).

---

## 4. AI Agents & Automations

### 4.1 The Reach Assistant (Growth Agent)
*   **Function**: Increase likes, followers, and reposts.
*   **Logic**: Scans TikTok/IG trend hooks (e.g., "The Fast Transition") and injects "Transition Instructions" into the shot list.

### 4.2 The Guardian Agent (Compliance)
*   **Function**: Ensure 100% Brand Consistency.
*   **Logic**: Real-time pixel scan of on-set photos. If the color palette shifts > 15%, it triggers a "Lighting Alert" on the photographer's mobile UI.

### 4.3 n8n / Postiz Handshake (Automation)
*   **Flow**: `Shoot Finish` ➔ `Guardian Approved` ➔ `Supabase Edge Function` ➔ `Postiz Scheduling`.
*   **Result**: Zero-latency publishing to global commerce and social channels.

---

## 5. Channel-Specific Instruction Set (Data Content)

| Channel | AI Instructions (Shot List) | Logic Engine |
| :--- | :--- | :--- |
| **Instagram** | 4:5 Aspect, Desaturated tones, Persona focus. | The Curator Agent |
| **TikTok** | 9:16 Aspect, 3s Hook transitions, Natural motion. | The Viral Agent |
| **Amazon** | 1:1 Aspect, #FFFFFF Background, Macro detail. | The Technical Agent |
| **Vogue** | Narrative flow, High-contrast, Grainy texture. | The Heritage Agent |

---

## 6. Strategic Optimization Logic (Sales Engine)

1.  **Gaps Identified**: `The Forecaster` notes a drop in Shopify sales for "Silk Dresses."
2.  **Strategic Pivot**: AI suggests a "Tactile Macro" shoot to rebuild quality trust.
3.  **Wizard Deployment**: Designer uses the **Wizard** to plan a 1-day studio shoot.
4.  **On-Set Audit**: `The Guardian` verifies the frames match the high-trust DNA.
5.  **Auto-Post**: `n8n` publishes to Shopify and IG Ads, closing the sales loop.

---
*Plan Status: Phase 2 In-Progress. Manual Wizard UI integration starting next session.*