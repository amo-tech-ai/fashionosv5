# FashionOS Mobile Design Decisions

## 1. Interaction Model
- **Bottom Navigation**: Replaces Sidebar on viewports < 768px. Items are spaced for thumb-reachability.
- **Bottom Sheet Intelligence**: Instead of pushing the main canvas, the Intelligence panel overlays it from the bottom on mobile to preserve context while maximizing available screen space.
- **Pull-to-Dismiss**: Intelligence sheet includes a drag handle for intuitive closing gestures.

## 2. Layout & Spacing
- **Compressed Header**: Height reduced from 96px (Desktop) to 80px (Mobile).
- **Safe Area Insets**: Using `env(safe-area-inset-*)` ensures navigation elements don't overlap with system home bars or notches on iOS/Android.
- **Stacking Logic**: Dashboards and grids transition to a single-column flow with increased vertical gaps (gap-12) to prevent accidental taps.

## 3. Typography Adjustments
- **Fluid Type**: Large serif headings (H1) scale down to 40px on mobile to prevent excessive word-breaking.
- **Enhanced Contrast**: UI labels (uppercase) use `tracking-[0.4em]` on mobile to improve legibility on lower-density tablet screens.

## 4. Performance Goals
- **LCP Target**: < 1.5s on 3G/4G connections by prioritizing core canvas assets.
- **CLS Goal**: < 0.1 by reserving space for bottom navigation and headers during hydration.