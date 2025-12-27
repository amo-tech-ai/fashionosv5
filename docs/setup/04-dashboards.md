# FashionOS V1 Core Dashboard Implementation Guide
**Status: Blueprint | Phase: Manual Core (V1)**

## DASHBOARD PROGRESS TRACKER

| Module | Route | Status | Components Built | Data Sync |
| :--- | :--- | :--- | :--- | :--- |
| **Global Dash** | `/dashboard` | ⚪ Pending | - | - |
| **CRM** | `/crm` | ⚪ Pending | - | - |
| **Events** | `/events` | ⚪ Pending | - | - |
| **Shoots** | `/shoots` | ⚪ Pending | - | - |
| **Sponsors** | `/sponsors` | ⚪ Pending | - | - |
| **Media/DAM** | `/media` | ⚪ Pending | - | - |
| **Campaigns** | `/campaigns` | ⚪ Pending | - | - |
| **Settings** | `/settings` | ⚪ Pending | - | - |

---

## IMPLEMENTATION STEPS (PROMPT SEQUENCING)

Execute these prompts one-by-one to build the manual foundation.

### PROMPT 1 — Global Command Center
> "Act as a Senior Frontend Architect. Implement the **Global Dashboard** (`pages/app/global/Dashboard.tsx`). 
> 1. Create 5 KPI cards for: Active Brands, Upcoming Events, Active Shoots, Open Campaigns, and Pending Tasks.
> 2. Implement a 'Recent Activity' list component showing manual logs (e.g., 'Elena uploaded assets', 'New venue secured').
> 3. Add a 'Critical Path' section with a manual task list and checkboxes.
> 4. Use high-fidelity Tailwind styles with the Ivory/Charcoal/Sage luxury theme.
> 5. Include empty states for when no data exists. No AI logic yet."

### PROMPT 2 — CRM Relationship Hub
> "Act as a CRM Architect. Implement the **CRM Dashboard** (`pages/app/crm/CRMHub.tsx`).
> 1. Create a searchable data table for Contacts with columns: Name, Type (Sponsor/Media/Vendor), Brand, and Status.
> 2. Implement a slide-over Detail Panel that appears when a row is clicked, showing contact info and manual notes.
> 3. Add filtering logic for 'Relationship Type' (Sponsor, Media, Vendor, Venue).
> 4. Create an 'Add Contact' modal with basic form validation.
> 5. Ensure the UI feels premium with ample whitespace and editorial typography."

### PROMPT 3 — Events Orchestration
> "Act as an Event Operations Lead. Implement the **Events Dashboard** (`pages/app/global/EventsPage.tsx`).
> 1. Create an Event Grid using cards. Each card shows: Cover Image, Event Name, Status Badge (Draft/Planning/Live), and Date.
> 2. Add an 'Event Timeline' static view that visualizes a 12-week countdown to show-day.
> 3. Implement a sub-task list component scoped to the selected event.
> 4. Link vendors and venues as static tags on the event card.
> 5. Handle loading states with a custom luxury shimmer effect."

### PROMPT 4 — Shoots Production Grid
> "Act as a Production Manager. Implement the **Shoots Dashboard** (`pages/app/production/ShootsPage.tsx`).
> 1. Create a 3-column grid of Shoot Cards. Fields: Production Title, Brand, Crew Lead, Status (Planned/In Production/Delivered).
> 2. Add a progress bar on each card representing 'Shots Captured' vs 'Total Shot List'.
> 3. Implement an 'Open Brief' button that links to the (currently empty) Production Brief page.
> 4. Create an empty state using a Lucide 'Camera' icon with a high-end call to action.
> 5. Ensure all status badges use the system-defined luxury palette (Sage for active, Champagne for delivered)."

### PROMPT 5 — Sponsors & ROI Tracker
> "Act as a Sponsorship Director. Implement the **Sponsors Dashboard** (`pages/app/global/SponsorsPage.tsx`).
> 1. Create a 'Sponsorship Deals' table showing: Sponsor Name, Value (€), Activation Phase, and Deliverables Status.
> 2. Implement a 'Manual ROI' section with input fields for Impressions, Leads, and Sales to be filled by the manager.
> 3. Add a 'Deliverables Checklist' for active partnerships (e.g., 'Logo on Step-and-Repeat', 'Social Tagging').
> 4. Leave a commented-out section for 'AI Performance Insights' to be implemented in V2.
> 5. Use the charcoal/ivory contrast to emphasize financial data."

### PROMPT 6 — Media Board (DAM-lite)
> "Act as a Digital Asset Manager. Implement the **Media Board** (`pages/app/global/MediaPage.tsx`).
> 1. Create an Asset Grid supporting both Photo and Video types with hover-play previews.
> 2. Implement a Filter Sidebar by: Brand, Event, Shoot, and Usage Rights.
> 3. Add an 'Asset Metadata' side panel showing technical specs (Resolution, Format, Color Profile).
> 4. Create a multi-select mode for batch actions (Download, Archive).
> 5. Note: Do NOT implement AI tagging yet; use manual tags for V1."

### PROMPT 7 — Campaigns & Channels
> "Act as a Marketing Ops Manager. Implement the **Campaigns Dashboard** (`pages/app/global/CampaignsPage.tsx`).
> 1. Create a 'Campaign Stack' view showing active omnichannel initiatives.
> 2. Link each campaign to its parent Shoots and Events via ID chips.
> 3. Visualize channel distribution using a horizontal percentage bar (e.g., '40% Instagram, 30% TikTok').
> 4. Add manual performance entry cards for weekly reporting.
> 5. Ensure the layout handles 1 to 20 active campaigns gracefully with vertical scrolling."

### PROMPT 8 — Governance & System Control
> "Act as a System Administrator. Implement the **Settings Dashboard** (`pages/app/global/SettingsPage.tsx`).
> 1. Create a 'Maison Control' section to manage Brand access and Ownership.
> 2. Implement a 'Users & Roles' table (Admin, Producer, Crew, Client).
> 3. Add a 'System Integrity' log (manual audit trail of data changes).
> 4. Create placeholders for Integrations (Shopify, Postiz, n8n) with 'Coming Soon' badges.
> 5. Ensure all 'Delete' actions are gated by a high-fidelity confirmation modal."

---

## DASHBOARD RULES (NON-NEGOTIABLE)

1. **Manual Invariant**: Every data point must be editable by a human first. AI will augment later.
2. **Context Integrity**: A dashboard in the CRM domain should never import components from the Shoots domain directly. Use shared UI primitives.
3. **Empty State Law**: Every list, table, or grid MUST have a designed empty state (Icon + Heading + Action).
4. **Safety Gating**: Use standard React Error Boundaries around each major dashboard widget.

---

## VALIDATION CHECKLIST
- [ ] Every route in the Sitemap resolves to a rendered page.
- [ ] No generic `div` styling; all components use Tailwind utility classes or custom theme.
- [ ] Direct browser refresh on any dashboard route does not crash the app.
- [ ] Mobile navigation (Bottom Bar) correctly navigates between all built domains.

---

## NEXT PHASE: INTELLIGENCE LAYER
*Once these shells are validated, we will implement:*
- **RAG Grounding**: Connecting SOPs to the Event/Shoot task lists.
- **Guardian Vision**: Enabling the 'Neural Scan' button on the Media Board.
- **Forecaster**: Dynamic trend injection into the Campaigns Dashboard.

---
**Blueprint Finalized.**