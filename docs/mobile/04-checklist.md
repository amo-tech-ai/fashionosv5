# Production Ready Checklist (Mobile)

## 1. Ergonomics & Accessibility
- [ ] Tap targets are 44px minimum.
- [ ] Color contrast meets WCAG AA for mobile sunlight viewing.
- [ ] Bottom Nav is within the "Natural Thumb Zone".
- [ ] No "Hover-only" interactions (all have tap/long-press equivalents).

## 2. Performance
- [ ] Images are lazy-loaded.
- [ ] CSS animations use `will-change` where appropriate.
- [ ] Font loading uses `font-display: swap`.

## 3. Responsive Logic
- [ ] `Layout.tsx` correctly switches between Sidebar and BottomBar.
- [ ] Intelligence Panel behaves as a Bottom Sheet on <768px.
- [ ] Modals use full-screen overlays on mobile.

## 4. UI Polish
- [ ] Safe area insets respected (iPhone Notch/Home indicator).
- [ ] Loading states include cinematic shimmer effects.