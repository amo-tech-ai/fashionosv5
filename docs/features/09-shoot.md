# 📸 FashionOS: The Production Journey (Shoot System)

This document maps the end-to-end user journey for a Fashion Designer utilizing the FashionOS Shoot System to orchestrate professional photography and cinematography productions.

---

## 1. High-Level User Journey (Mermaid)

```mermaid
journey
    title The Designer's Production Journey
    section Neural Intake
      Enter URL/Description: 5: Designer
      Extract DNA Pillars: 4: Gemini 3 Flash
      Market Gap Analysis: 4: Gemini 3 Pro
    section Strategic Proposal
      View Recommended Shoots: 5: Designer
      Select "Desert Noir" Concept: 5: Designer
      Generate Cinematic Pre-Viz: 4: Veo 3.1
    section Operational Handoff
      Review One-Page Shot List: 4: Designer
      Confirm Logistics (Studio/Model): 5: Designer
      Dispatch Neural Brief: 5: Designer
    section On-Set Execution
      Live Voice Compliance: 4: Photographer
      Aesthetic DNA Check: 5: Guardian Agent
    section Post-Production
      Auto-Cull Frames: 4: Gemini 3 Pro Image
      Sync to Content Calendar: 5: FashionOS
```

---

## 2. Technical Sequence Flow (Mermaid)

```mermaid
sequenceDiagram
    participant D as Designer
    participant OS as FashionOS Canvas
    participant G as Gemini 3 (Pro/Flash)
    participant V as Veo 3.1 (Cinematic)
    participant L as Live API (On-Set)
    participant P as Photographer Node

    D->>OS: Input Brand URL & Social Handle
    OS->>G: Grounded Search (Google Search/Maps)
    G-->>OS: DNA Pillars & Market Whitespace
    OS->>G: Generate Shoot Concepts (SS25)
    G-->>OS: Proposal: "Brutalist Silk" in Milan
    D->>OS: Approve & Request Pre-Viz
    OS->>V: Generate 10s Cinematic Vignette
    V-->>OS: .mp4 Mood Film
    OS->>G: Architect One-Page Shot List
    G-->>OS: Technical Checklist (IG, TikTok, Shopify)
    D->>OS: Dispatch Brief
    OS->>P: Handoff Kit (Brief + Shot List + Video)
    Note over P, L: During Production
    P->>L: "Is this shadow ratio DNA compliant?"
    L-->>P: "Optimal. Match is 94%."
```

---

## 3. The 6-Step Production Handshake

### Step 1: Ingestion & DNA Extraction
The system uses `gemini-3-flash-preview` to crawl the designer's provided URL and social feeds. It identifies the "Visual Signature" (e.g., *High-contrast, low-angle, desaturated*).

### Step 2: Strategic Concept Proposal
`gemini-3-pro-preview` compares the brand DNA against live trend signals (e.g., *Rising interest in Neoclassical architecture*). It proposes 3 distinct shoot concepts with projected ROI metrics.

### Step 3: Cinematic Pre-Viz (Veo 3.1)
Once a concept (e.g., *Desert Noir*) is selected, the **Campaigns Engine** triggers `veo-3.1-fast-generate-preview`. This produces a 10s film showing the videographer exactly how the fabric should move and how light should hit the silhouettes.

### Step 4: One-Page Shot List Architect
The system generates a platform-specific instruction set:
*   **Instagram**: Editorial portrait shots focusing on the "Silent Curator" persona.
*   **TikTok**: Vertical movement shots with "Viral Hook" framing.
*   **Shopify**: Technical macros of fabric weave and pure white backgrounds.

### Step 5: Operational Dispatch
The **Production Brief** is sent to the photographer node (Elena) and logistics node (Marcus). This includes:
*   **Grounded Map**: Direct links to sourced studios via `googleMaps`.
*   **Technical PDF**: The One-Page Shot List.
*   **Mood Video**: The Veo-generated pre-viz.

### Step 6: On-Set Compliance (Live API)
During the shoot, the photographer maintains a low-latency voice link.
*   **Photographer**: "Check framing for the Silk Blouse. Is the structural integrity visible?"
*   **FashionOS**: "DNA Match 91%. Suggest lowering camera angle by 5 degrees to emphasize silhouette."

---

## 4. State Transitions: The Production Brief

```mermaid
stateDiagram-v2
    [*] --> Ingestion
    Ingestion --> DNA_Synthesis: Metadata Found
    DNA_Synthesis --> Strategic_Proposal: Pillars Verified
    Strategic_Proposal --> PreViz_Generation: Concept Selected
    PreViz_Generation --> ShotList_Architecture: Video Rendered
    ShotList_Architecture --> Brief_Dispatched: Designer Approved
    Brief_Dispatched --> OnSet_Compliance: Team Accepted
    OnSet_Compliance --> PostProduction: Assets Uploaded
    PostProduction --> [*]: Synced to Calendar
```

---

## 5. Implementation Status

| Stage | status | Primary Neural Engine |
| :--- | :---: | :--- |
| **Intake (URL/Desc)** | 🟢 | Gemini 3 Flash |
| **DNA Reasoning** | 🟢 | Gemini 3 Pro (Thinking) |
| **Concept Gen** | 🟢 | Gemini 3 Pro |
| **Veo 3.1 Pre-Viz** | 🟢 | Veo 3.1 Fast |
| **Grounded Logistics** | 🟢 | Google Maps/Search |
| **Shot List PDF** | 🟡 | Gemini 3 Flash (Structured) |
| **Live API On-Set** | 🟢 | Gemini 2.5 Flash Native Audio |