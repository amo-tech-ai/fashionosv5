# Brand Profile: Mega-Prompt Implementation Plan

This document provides a structured blueprint for the AI agents and workflows that power the **Brand Profile** intelligence layers. These prompts are designed to be used with the Gemini 2.0/3.0 series to generate consistent, high-fidelity luxury brand data.

## 1. The Persona Architect (Overview Tab)
**Purpose:** Transform dry demographic data into cinematic, actionable "Life-Archetypes" for creative direction.

### Prompt Logic:
> "Act as a Luxury Brand Strategist. Based on the brand manifesto [INSERT MANIFESTO], generate 3 detailed Audience Personas. For each, provide:
> 1. **The Archetype Name:** (e.g., 'The Silent Curator').
> 2. **Psychographics:** Deep-seated values, fears, and aesthetic non-negotiables.
> 3. **Digital Footprint:** Where they spend time and how they consume luxury content.
> 4. **Aesthetic Reference:** A visual description of their ideal environment."

**Real-World Example:** 
A brand focusing on 'Radical Transparency' targets "The Ethical Architect"—someone who values the structural integrity of a garment as much as the carbon footprint of the silk mill.

---

## 2. The Commercial Strategist (Products Tab)
**Purpose:** Provide real-time pricing intelligence and market positioning vs. benchmarks.

### Prompt Logic:
> "Analyze this product: [PRODUCT_SPECS]. Compare against current market benchmarks for [CATEGORY] (e.g., LVMH, Kering groups). 
> Calculate:
> 1. **Value-to-Price Ratio:** Is it priced for 'Quiet Luxury' or 'Entry-Level Premium'?
> 2. **Margin Optimization:** Suggest pricing adjustments based on artisanal scarcity.
> 3. **Market Benchmark:** Provide a range based on similar 'Precision Silk' items globally."

**Data Sample:**
```json
{
  "product": "Heritage Silk Blouse",
  "current_price": 840,
  "market_benchmark": {
    "competitor_avg": 790,
    "upper_tier": 1250,
    "positioning": "+6% vs Market Average"
  }
}
```

---

## 3. The Aesthetic Validator (Products Tab)
**Purpose:** Break down the "Visual Match Score" into granular design elements.

### Prompt Logic:
> "Compare the image [IMAGE_DATA] against the Brand Style Guide [STYLE_GUIDE_RULES].
> Provide a percentage match for:
> 1. **Color Palette Alignment:** (Hex-to-Hex similarity).
> 2. **Silhouette Precision:** (Clarity of lines and form).
> 3. **Atmospheric Lighting:** (Contrast ratios and diffusion levels).
> 4. **Storytelling Narrative:** (Does it feel like the 'Heritage Manifesto'?)."

---

## 4. Multi-Step Workflow: "DNA to Production"
1.  **Ingest DNA:** User inputs 3 words. AI expands into a 500-word Manifesto.
2.  **Generate Persona:** AI uses the Manifesto to build 3 Target Personas.
3.  **Audit Catalog:** AI scans current products to see if they fit the new Personas.
4.  **Recommend Shoot:** AI suggests a shoot location and lighting style that specifically appeals to 'The Silent Curator'.

## 5. Logic Implementation Rules
- **Consistency Invariant:** AI must never suggest a "Streetwear" shoot for a "Heritage Luxury" persona.
- **Data Integrity:** Pricing benchmarks must be updated via Google Search grounding every 30 days.
- **Visual Feedback:** All Match Scores < 80% must trigger an "AI Refinement Suggestion".
