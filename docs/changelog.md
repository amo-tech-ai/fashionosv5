# FashionOS Changelog

## [1.4.0] - 2024-10-16
### Added
- **System Memory (Persistence)**: Implemented `localStorage` serialization for `ProjectContext`, ensuring brand DNA and production data survive session restarts.
- **Neural Diagnostics**: New "Handshake" protocol in `IntelligenceService` to verify API health and latency from the Settings page.
- **Deep-Link Handshake**: Omnichannel Calendar entries now deep-link directly to the Content Editor for DNA compliance audits.
- **Premium 404 Experience**: Dedicated `NotFound` module that preserves the 3-panel layout and brand context.
- **Enhanced Empty States**: High-fidelity onboarding UI for `ShootsPage` to guide new users during the cold-start phase.

### Fixed
- **Param Collision**: Global refactor of generic `:id` routes to specific `:brandId` to prevent data-fetching collisions.
- **Layout Logic**: Refined `Layout.tsx` to handle window resizing more gracefully on low-density tablet displays.
- **Context Integrity**: Fixed a race condition where `IntelligencePanel` payloads were cleared before multi-step transitions completed.

### Optimized
- **Routing Invariant**: Standardized all internal links to follow the new `:brandId` convention for absolute stability.
- **Diagnostic Latency**: Optimized the "Neural Pulse" connectivity check to use `gemini-3-flash-preview` with 0 thinking budget for speed.

## [1.3.0] - 2024-10-15
### Added
- **Neural Shoot System**: Complete end-to-end pipeline from Wizard to Set Execution.
- **Cinematic Pre-Viz**: Veo 3.1 Fast integration for generating mood films during planning.
- **Hardware HUD**: Professional camera overlay for crew view utilizing browser camera APIs.
- **Guardian Neural Audit**: Vision-based compliance scoring for on-set captured assets.
- **One-Page Architect**: Automated generation of technical shot lists mapped to commerce channels.

### Fixed
- **Layout Sovereignty**: Resolved center-canvas flex inflation issues; implemented strict `min-w-0` laws.
- **Mobile Drawer Transitions**: Smoothed 85vh transition for the Intelligence Panel on touch devices.

## [1.2.0] - 2024-10-15
### Added
- Supply Chain Transparency Engine.
- Collaborative Activity Stream.
- Inventory Handshake 2.0.