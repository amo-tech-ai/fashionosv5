# FashionOS Routing & Structure Rule v1

**STRICT COMPLIANCE REQUIRED.** This document is the supreme architectural law of the FashionOS project.

## A) NON-NEGOTIABLES
- **HashRouter Invariant**: All navigation must use `HashRouter`. Never switch to `BrowserRouter`.
- **Panel Integrity**: All pages must be children of the `Layout` component.
- **Root-Level Sovereignty**: No `src/` directory. All folders (`components/`, `pages/`, `contexts/`) reside in the project root.
- **AI-Human Canvas Split**: Intelligence logic resides in `IntelligencePanel.tsx` (Right). Human working canvas resides in `pages/` (Center). Navigation resides in `Sidebar.tsx` (Left).

## G) LAYOUT STABILITY & CONTAINER SOVEREIGNTY
1. **The Root Law**: The outermost `div` in `Layout.tsx` must be `h-screen w-full flex overflow-hidden`. No exceptions.
2. **The Canvas Law**: The central `<main>` element must have `flex-1 min-w-0 overflow-y-auto`. The `min-w-0` prevents "flex-inflation" where long titles push the Intelligence panel out of the viewport.
3. **The Drawer Law**: On viewports < 1024px, the Intelligence Panel must be `fixed` or `absolute` with a high Z-index (z-50). It must NEVER push the main content on mobile.
4. **Scrolling**: Only the Center Canvas and the internal content of the Intelligence Panel are permitted to have vertical scrollbars. The Sidebar must remain static.

## B) ROUTE TABLE
| Path | Component | Layout Mode | File Location |
| :--- | :--- | :--- | :--- |
| `/` | `Dashboard` | 3-Panel | `pages/Dashboard.tsx` |
| `/brand/intake` | `BrandIntake` | **Full-Width** | `pages/BrandIntake.tsx` |
| `/brand/:id/analysis` | `BrandAnalysis` | 3-Panel | `pages/BrandAnalysis.tsx` |
| `/brand/:id/profile` | `BrandProfile` | 3-Panel | `pages/BrandProfile.tsx` |
| `/brand/:id/calendar` | `ContentCalendar` | 3-Panel | `pages/ContentCalendar.tsx` |
| `/brand/:id/content/:postId` | `ContentEditor` | 3-Panel | `pages/ContentEditor.tsx` |
| `/brand/:id/shoots/recommendation` | `ShootRecommendation` | 3-Panel | `pages/ShootRecommendation.tsx` |
| `/media` | `MediaPage` | 3-Panel | `pages/MediaPage.tsx` |
| `/chat` | `ChatPage` | 3-Panel | `pages/ChatPage.tsx` |
| `/settings` | `SettingsPage` | 3-Panel | `pages/SettingsPage.tsx` |
