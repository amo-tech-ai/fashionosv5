# FashionOS: User Flows & Neural Journeys

This document outlines the systematic paths users take through the FashionOS ecosystem, mapping human creative intent to neural execution nodes.

---

## 1. The Identity Loop (Onboarding & DNA Synthesis)
**Goal:** Establish a high-fidelity digital twin of a luxury brand.

1.  **Brand Ingestion**: User enters brand name and a raw mission statement in `BrandIntake`.
2.  **DNA Synthesis**: `gemini-3-flash` extracts 3 core DNA Pillars (e.g., "Structural Integrity").
3.  **Strategic Analysis**: `gemini-3-pro` scans the global landscape to generate a `Market Positioning Map`.
4.  **Persona Architecture**: The system generates 2-3 "Synthetic Personas" (e.g., *The Silent Curator*) based on the DNA pillars.
5.  **Single Source of Truth**: The `Brand Profile` is populated, acting as the anchor for all future AI generations.

---

## 2. The Creative Loop (Strategy to Production)
**Goal:** Transform market signals into high-impact cinematic campaigns.

1.  **Trend Detection**: `The Forecaster` detects a market shift (e.g., "Brutalist Silk") via `googleSearch`.
2.  **Strategic Handshake**: The user receives a `Strategic Pivot Alert` on the Dashboard or Intelligence Panel.
3.  **Shoot Recommendation**: AI suggests 3 concept concepts (e.g., *Desert Noir*) in `ShootRecommendation`.
4.  **Cinematic Pre-Viz**: User triggers `Veo 3.1` to generate a 10s mood video for stakeholder approval.
5.  **Intelligence Booking**: User clicks "Brief Team," opening the `BookingMode` in the Intelligence Panel to sync with global production nodes (Elena, Marcus).

---

## 3. The Distribution Loop (Content & Compliance)
**Goal:** Maintain 100% aesthetic integrity across global social channels.

1.  **Inventory Sync**: New product SKUs are ingested via `Shopify Handshake` into the `Products` tab.
2.  **Narrative Synthesis**: `The Storyteller` generates a heritage-aligned product description.
3.  **Campaign Alignment**: User moves the product into the `Content Calendar`.
4.  **Visual Audit**: User uploads an asset to the `Content Editor`. `The Guardian` (Vision) scans pixels for DNA compliance.
5.  **Neural Deployment**: Once the compliance score is > 85%, the user approves the post, triggering the `n8n/Postiz` handshake for "Golden Hour" deployment.

---

## 4. The Intelligence Handshake States
Every automated transition in FashionOS follows a "Neural Handshake" pattern to ensure transparency.

| Step | State | UI Representation |
| :--- | :--- | :--- |
| **1. Trigger** | Intent Detected | Sparkle icon pulse in the Intelligence Panel. |
| **2. Reasoning** | Thinking | A terminal-style log shows "Recursive DNA Audit in progress...". |
| **3. Grounding** | Fact-Checking | `googleSearch` or `googleMaps` icon appears with "Verifying Market Data". |
| **4. Proposal** | Resolution | Content appears in an Ivory "Neural Suggestion" box with "Approve" action. |
| **5. Sync** | Commitment | Activity stream updates: "Guardian: Asset verified and queued." |

---

## 5. Mobile Ergonomics Flow
On mobile viewports, the journey is compressed for high-velocity on-set use.

1.  **Thumb-Tap**: User opens the bottom nav to access the `Concierge`.
2.  **Voice Link**: User triggers `Live API` via voice to ask: "Is the lighting in the current frame matching the Desert Noir brief?"
3.  **Bottom Sheet Reveal**: The Intelligence Panel slides up (85vh) to show the `Aesthetic Metrics` comparison.
4.  **Action Handshake**: User taps the primary floating action button (FAB) to "Confirm Frame" and sync to the global `Media Board`.