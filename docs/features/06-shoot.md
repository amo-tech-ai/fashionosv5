# 📸 FashionOS: Photo Shoot System (The Handoff)

FashionOS bridges the gap between high-level brand identity and ground-level execution. This system transforms the **Identity Core** (URL/Description) into a professional production pipeline for photographers and videographers.

---

## 1. System Logic: From URL to Call Sheet

The handoff follows a 4-step neural sequence:
1.  **Ingestion**: `gemini-3-flash` crawls the brand URL/Desc to extract visual DNA (lighting, contrast, silhouette).
2.  **Strategic Translation**: `gemini-3-pro` maps DNA to a **Shot List** (e.g., "30% Heritage Detail, 70% Urban Minimal").
3.  **Cinematic Pre-Viz**: `veo-3.1` generates a mood film to align the photographer's vision before the first flash.
4.  **Operational Handoff**: The **Production Brief** is dispatched to the team nodes (Elena/Marcus).

---

## 2. Core vs. Advanced Feature Matrix

| Feature | Category | Primary Gemini Tool | Real-World Use Case | OS Score |
| :--- | :--- | :--- | :--- | :---: |
| **Neural Briefing** | Core | `gemini-3-flash` | Convert 3 keywords into a 10-page technical shoot brief with lighting specs. | 92 |
| **Grounded Venue Scan** | Core | `googleMaps` | Automatically source 3 brutalist studios within 5km of the Milan HQ. | 88 |
| **Shot List Architect** | Core | `gemini-3-flash` | Generate a 40-item CSV list covering e-com, social, and billboard requirements. | 94 |
| **Cinematic Storyboard** | Advanced | `veo-3.1-fast` | Show the videographer exactly how the fabric should move in the wind via AI-video. | 98 |
| **Live Set Direction** | Advanced | `native-audio-live` | Photographer asks: "Is this shadow depth compliant?" and gets instant DNA feedback. | 95 |
| **ROI Reach Simulator** | Advanced | `gemini-3-flash` | Predict which 5 shots from the list will drive the most engagement on TikTok. | 90 |

---

## 3. Gemini 3 Tool Implementation

### 3.1 Shot List Generation (`gemini-3-flash-preview`)
**Use Case:** Automatically creating the "Technical Checklist."
*   **Prompt Logic:** "Based on the SS25 'Brutalist Silk' brief, generate a shot list. Requirements: 5x Hero shots (Low angle), 10x Macro texture shots (Highlighting weave), 15x Lifestyle (Urban movement)."
*   **Result:** A structured JSON object that feeds directly into the **Shoots Page** task tracker.

### 3.2 Logistic Handoff (`googleMaps` + `googleSearch`)
**Use Case:** Handling the "Where" and "How."
*   **Prompt Logic:** "Find equipment rental shops in Paris that carry Profoto B10X units and have a delivery radius covering the 1er Arrondissement."
*   **Result:** A grounded logistics map in the **Intelligence Panel** for the Production Lead.

### 3.3 Cinematic Pre-Viz (`veo-3.1-generate-preview`)
**Use Case:** Aligning the "Aesthetic Vibe."
*   **Prompt Logic:** "Generate a 10-second cinematic vignette of a model in a silk gown walking through a grey concrete corridor with harsh sunlight."
*   **Result:** A high-fidelity video file attached to the **Production Brief**, ensuring the videographer understands the "Noir" mood.

---

## 4. The "Handoff" Package (The Deliverable)

When a creative lead clicks "Dispatch Brief," the photographer receives a **Neural Production Kit**:
1.  **Technical Moodboard**: Colors, fonts, and lighting ratios.
2.  **Live Call Sheet**: Integrated with `googleMaps` for location sync.
3.  **Grounded Shot List**: Checked against current market trends for SS25.
4.  **Guardian Token**: Access to the `Aesthetic Compliance Scan` for real-time asset validation on-set.

---

## 5. Proposed Additional Features (Roadmap)

| Feature | Capability | Tech Link |
| :--- | :--- | :--- |
| **Auto-Cull Assist** | Automatically flag the top 10% of RAW files based on DNA match. | `gemini-3-pro-image-preview` |
| **Talent Affinity** | Match models to the "Silent Curator" persona based on their social sentiment. | `googleSearch` |
| **Dynamic Call Sheet** | Real-time weather/lighting adjustments via live web grounding. | `gemini-3-flash` |