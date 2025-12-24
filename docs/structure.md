# FashionOS System Architecture & Sitemap

This document outlines the structural hierarchy, directory organization, and routing logic of the FashionOS platform.

## 1. System Sitemap (Mermaid)

```mermaid
graph TD
    Root[/] --> Dash[Dashboard]
    Root --> Intake[Brand Intake Wizard]
    
    subgraph Brand_Intelligence [Brand Intelligence]
        Intake --> Analysis[AI Strategy Analysis]
        Analysis --> Profile[Brand Profile]
        Profile --> P_Overview[DNA & Personas]
        Profile --> P_Scores[Intelligence Audit]
        Profile --> P_Style[Style Guide]
        Profile --> P_Products[Catalog & AI Storyteller]
    end

    subgraph Content_Production [Production Workflow]
        Dash --> Calendar[Omnichannel Calendar]
        Calendar --> Editor[Content Editor & Preview]
        Dash --> Shoots[Shoot Recommendations]
        Shoots --> Intel_Booking[Intelligence Booking Panel]
    end

    subgraph Global_Modules [Global Modules]
        Sidebar --> Media[Media Board]
        Sidebar --> Chat[AI Concierge]
        Sidebar --> Settings[System Control]
    end

    Dash --> Intel[Intelligence Side-Panel]
```

## 2. Directory Structure

The project follows a modular React/TypeScript architecture. Note: There is **NO** `src/` directory.

```text
/ (Project Root)
├── index.html              # Entry HTML with Tailwind & Google Fonts
├── index.tsx               # React Bootstrapper
├── App.tsx                 # Main Router & 3-Panel Layout Controller
├── types.ts                # Global TypeScript Interfaces (Brand, Product, Persona)
├── metadata.json           # App permissions and descriptions
│
├── components/             # Reusable UI Architecture
│   ├── Header.tsx          # Search & Intelligence triggers
│   ├── Sidebar.tsx         # Navigation & Presence tracking
│   ├── IntelligencePanel.tsx # Context-aware AI side-panel (Right)
│   ├── brand-profile/      # Domain-specific components
│   └── Wizard.tsx          # Step-based production tools (Redundant)
│
├── contexts/               # Global State Management
│   ├── ProjectContext.tsx  # Brand and Project persistence
│   └── IntelligenceContext.tsx # Panel visibility and AI modes
│
├── pages/                  # View Modules (Human Working Canvas)
│   ├── Dashboard.tsx       # System overview & critical path
│   ├── BrandIntake.tsx     # AI brand onboarding (Full-Width)
│   ├── BrandAnalysis.tsx   # Scoring & Gap analysis
│   ├── BrandProfile.tsx    # DNA Single-Source-of-Truth
│   ├── ContentCalendar.tsx # Omnichannel scheduling
│   ├── ContentEditor.tsx   # Platform preview & AI captioning
│   ├── ShootRecommendation.tsx # AI Creative Direction
│   ├── MediaPage.tsx       # Global asset repository
│   ├── ChatPage.tsx        # Direct Gemini API Concierge
│   └── SettingsPage.tsx    # System diagnostics & Link control
│
└── docs/                   # System Documentation
    ├── SYSTEM_RULES.md     # [PRIMARY] Single Source of Truth for Architecture
    ├── structure.md        # [CURRENT] Sitemap & Routing
    └── plan/               # Development manifests
```

## 3. Routing Map

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Dashboard` | The command center showing active momentum. |
| `/brand/intake` | `BrandIntake` | Full-width onboarding experience. |
| `/brand/:id/analysis` | `BrandAnalysis` | AI score visualization after intake. |
| `/brand/:id/profile` | `BrandProfile` | Central brand DNA management (Tabbed). |
| `/brand/:id/calendar` | `ContentCalendar` | Visual production grid. |
| `/brand/:id/content/:postId` | `ContentEditor` | Deep-dive post optimization. |
| `/brand/:id/shoots/recommendation` | `ShootRecommendation` | AI-suggested creative productions. |
| `/media` | `MediaPage` | Global asset board. |
| `/chat` | `ChatPage` | Unstructured AI interaction. |
| `/settings` | `SettingsPage` | Workspace and Neural Link config. |

## 4. Layout Logic Invariants

1. **The 3-Panel OS**: Left=Sidebar, Center=Canvas, Right=Intelligence.
2. **Full-Width Onboarding**: `/brand/intake` suppresses Sidebar and Right Panel to focus user flow.
3. **Intelligence Panel**: Not just a sidebar, but a context-aware assistant governed by `IntelligenceContext`.
