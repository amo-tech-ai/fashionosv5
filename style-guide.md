# FashionOS Production Style Guide v1.0

This document serves as the single source of truth for the FashionOS design system. It codifies the visual language, interactive patterns, and architectural invariants required to maintain a luxury fashion-tech aesthetic across all modules.

## 1. DESIGN PHILOSOPHY

### 1.1 Brand Personality
FashionOS is the "Silent Partner" to the world's most prestigious Maisons. It is Sophisticated, Architectural, and Neural. It balances heritage craftsmanship with cutting-edge intelligence.

### 1.2 UI Principles
- **Quiet Luxury**: Use whitespace as a luxury commodity. Avoid clutter; every element must justify its existence.
- **Neural Precision**: Data visualizations and AI insights should feel like a high-end medical or architectural tool—precise, clean, and clinical but warm.
- **The 3-Panel Invariant**: The interface is a "triptych"—Navigation (Left), Canvas (Center), Intelligence (Right).
- **Cinematic Transitions**: Motion is never abrupt; it is a "glide" (500ms–700ms easings).

### 1.3 Anti-Patterns (Never Do)
- Never use saturated "tech" blues or neon colors.
- Never use sharp corners (minimum 12px, preferred 24px+).
- Never use generic system fonts for brand-level headings.

## 2. COLOR SYSTEM

| Name | HEX | Usage | Mobile Validation |
| :--- | :--- | :--- | :--- |
| Ivory | #FAFAF7 | Primary Background / Paper | Pass (AA on Charcoal) |
| Charcoal | #1E1E1E | Primary Text / Dark Mode UI | Pass (AAA on Ivory) |
| Sage | #8FAE9E | Primary AI Action / Success | Pass (AA on White/Ivory) |
| Champagne | #C9A86A | Secondary Accents / Premium Data | Pass (AA on Charcoal) |
| Blush | #E8D6D1 | Warning / Low Compliance Background | Pass (Decorative only) |
| Warm Gray | #8B8B8B | Meta Info / Secondary Labels | Pass (AA on White) |

### 2.1 Functional Colors
- **Success/Verified**: Sage (#8FAE9E)
- **Warning/Review**: Champagne (#C9A86A)
- **Error/Friction**: Blush (#E8D6D1) or Rose-500
- **Borders**: #E5E1D8 (Low contrast for elegance)

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Families
- **Display/Headings**: Playfair Display (Serif). Used for brand names, manifestos, and primary page titles.
- **UI/Body**: Inter (Sans-Serif). Used for functional labels, data points, and long-form copy.

### 3.2 Type Scale
| Level | Size | Weight | Tracking | Case |
| :--- | :--- | :--- | :--- | :--- |
| H1 (Hero) | 72px / 4.5rem | 500 (Med) | -0.05em | Sentence |
| H2 (Page) | 48px / 3rem | 500 (Med) | -0.02em | Sentence |
| H3 (Section) | 30px / 1.8rem | 400 (Reg) | 0 | Sentence |
| Label (UI) | 10px / 0.625rem | 700 (Bold) | 0.3em | UPPERCASE |
| Body (Main) | 14px / 0.875rem | 400 (Reg) | 0 | Sentence |
| Caption | 12px / 0.75rem | 400 (Reg) | 0 | Sentence |

### 3.3 Typography Rules
- **Line Height**: Body text should always use leading-relaxed (1.625).
- **Truncation**: Use `truncate` or `line-clamp-2` for all card titles.
- **Serif vs Sans**: Use Serif for emotion and heritage; Sans for utility and data.

## 4. LAYOUT SYSTEM

### 4.1 The 3-Panel OS
- **Sidebar (Left)**: Fixed 72px (Collapsed) or 288px (Expanded).
- **Canvas (Center)**: Fluid width. The human workspace.
- **Intelligence (Right)**: 320px fixed width. Context-aware AI assistant.

### 4.2 Spacing Scale
FashionOS uses a strict 4px grid.
- **Page Padding**: p-8 (32px) for mobile, p-12 (48px) for desktop.
- **Card Gaps**: gap-8 (32px) or gap-10 (40px).
- **Internal Padding**: p-6 (24px) or p-8 (32px).

### 4.3 Mobile Breakpoints
- **Desktop**: 1280px+ (3 Panels fully visible)
- **Tablet**: 1024px (Intelligence Panel becomes a toggleable drawer)
- **Mobile**: < 768px (Sidebar collapses to bottom or top-bar; Canvas becomes full width).

## 5. COMPONENT LIBRARY

### 5.1 Buttons
- **Primary**: Charcoal background, white text, 32px-48px height. rounded-full.
- **Secondary**: Ivory background, Charcoal border, Charcoal text.
- **AI Action**: Sage background or border, white/sage text. shadow-sage/20.

### 5.2 Cards (Strategic)
- **Radius**: `rounded-[48px]` for large containers; `rounded-[32px]` for child cards.
- **Border**: 1px solid #E5E1D8.
- **Shadow**: `shadow-sm` on rest, `shadow-2xl` on hover/active.

### 5.3 Tabs
- **Style**: Bottom-border only, 2px thickness.
- **Text**: `text-[10px] font-bold uppercase tracking-[0.2em]`.

### 5.4 AI Modals
- **Glassmorphism**: `bg-white/70 backdrop-blur-xl border-white/30`.
- **Handshake Pattern**: Use a "Log Terminal" feel (Courier/Mono font) for AI processing steps.

## 6. INTERACTION & MOTION

### 6.1 Transitions
- **Hover**: `hover:scale-[1.02] + transition-all duration-500`.
- **Page Entry**: `animate-in fade-in slide-in-from-bottom-4 duration-1000`.
- **Panel Slide**: `ease-[cubic-bezier(0.4,0,0.2,1)]` for sidebar/intelligence drawer.

### 6.2 Micro-interactions
- **Presence**: Pulsing dots (`animate-pulse`) for "Live" or "Synchronized" statuses.
- **Handshake**: Step-by-step logic logs reveal sequentially (600ms delay).

## 7. AI-SPECIFIC UI PATTERNS

### 7.1 Insight Appearance
AI-generated content must always be prefaced by a specific metadata tag:
- **[FORECASTER]**: Grounded market signals.
- **[GUARDIAN]**: Aesthetic/DNA compliance audits.
- **[STORYTELLER]**: Copy/narrative generation.

### 7.2 Approval Flow
- **AI Proposal**: Presented in an ivory box with a "Sparkle" icon.
- **Human Decision**: "Approve & Schedule" button (Primary action).
- **Refinement**: "Request Neural Edit" (Ghost button).

## 8. ACCESSIBILITY & MOBILE FIXES

### 8.1 Critical Tap Targets
- All buttons must be minimum 44px height.
- Card hover actions (like "Neural Scan") must be mapped to a permanent "Meatball" menu (...) on touch devices.

### 8.2 Scroll Traps
- The Center Canvas must be the only primary scroll container.
- Intelligence Panel should have an internal custom-scrollbar to prevent global window jumping.

## 9. DO / DON’T RULES

| DO | DON’T |
| :--- | :--- |
| Use `tracking-[0.3em]` on all uppercase labels. | Use standard tracking on small labels (illegible). |
| Use Serif for the brand name "Maison de Silk". | Use Serif for the pricing table data. |
| Use Sage for "DNA Verified" checkmarks. | Use standard green (#00FF00) for success. |
| Ensure the "Handshake" animation is clear. | Let AI content appear instantly without context. |

## 10. RECOMMENDATIONS
- **Standardize Spacing**: Refactor all random mt-2/mt-4 to use a consistent space-y-6 or space-y-8 in layout wrappers.
- **Mobile-First Refactor**: Intelligence Panel should shift to a Bottom Sheet on mobile instead of a side drawer to improve reachability.
- **DNA Tokenization**: Move the DNA Pillar styles into a global `.dna-chip` class to ensure consistent padding and radius (currently varied across pages).
- **Neural Pulse**: Document the `animate-pulse` timing (2s) as a system-wide invariant for "System Units."