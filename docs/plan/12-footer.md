# FashionOS Footer Architecture & UX Plan

## 1. UX Strategy
The FashionOS Footer is designed as a **System Anchor**. It provides a consistent navigation foundation while respecting the "Neural Operating System" aesthetic. It behaves as a "Hybrid Anchor," adapting its density and visibility based on whether the user is viewing public marketing content or navigating the authenticated dashboard.

### 1.1 Hierarchical Structure
- **Global Breadcrumb Utility**: Allows quick jumping between major strategy nodes (Shoots, Events, Campaigns).
- **Maison Continuity**: Reinforces the brand name and copyright at every touchpoint.
- **Action-Oriented Workflows**: Prioritizes "Starting a Shoot" or "Opening Concierge" for logged-in users.

## 2. Footer Link Map

| Section | Link | Type | Auth Rule |
| :--- | :--- | :--- | :--- |
| **Product** | Features, Solutions, Pricing, Demo | Public | Always Visible |
| **Product** | Dashboard, Intake, Shoots, Campaigns | App | Auth-Only |
| **Workflows** | Plan a Shoot, Production Hub, Briefs, Concierge | Action | Auth-Only |
| **Resources** | Blog, Case Studies, Help, Security, Integrations | Support | Always Visible |
| **Company** | About, Careers, Contact | Corporate | Always Visible |
| **Social** | IG, LinkedIn, X, YouTube | External | Always Visible |

## 3. Implementation Details

### 3.1 Adaptive Rendering
- **State Check**: Uses `brands.length > 0` (via `ProjectContext`) as a reliable proxy for an initialized session/auth state.
- **Dynamic Route Masking**: Links to dynamic paths (like `/shoots/brief/:id`) are masked with generic entry points (e.g., the last active shoot ID or a generic list view) to prevent link breakage.

### 3.2 Visual Language
- **Colors**: Deep Charcoal (#1E1E1E) for high-contrast luxury positioning.
- **Typography**: Labeling in Bold Uppercase (10px) with `tracking-[0.3em]` to match Maison standards.
- **Responsive**: 4-column grid on Desktop/Tablet, stacking to 2x2 or 1x1 on Mobile.

## 4. Layout Integration
- **PublicLayout**: Replaces the hardcoded placeholder footer with the global `Footer` component.
- **AppLayout (Layout.tsx)**: Injected at the bottom of the central canvas `<main>` element to ensure it is visible after vertical scrolling of long dashboards.