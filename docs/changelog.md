# FashionOS Changelog

## [1.2.0] - 2024-10-15
### Added
- **Supply Chain Transparency Engine**: New tab in Brand Profile for auditing ethical certifications via Gemini.
- **Collaborative Activity Stream**: Real-time (simulated) feedback from production nodes (Elena, Marcus) in the Intelligence Panel.
- **Inventory Handshake 2.0**: Enhanced registration flow that immediately triggers a strategic audit.
- **Multilingual Narrative Support**: AI Storyteller now defaults to a more sophisticated, globally-aware luxury tone.

### Fixed
- **Mobile Sidebar Clipping**: Refined CSS transitions for the 3-panel layout on small viewports.
- **Intelligence Panel Race Conditions**: Improved payload handling in `IntelligenceContext` to prevent stale data on mode switches.
- **Image Generation Reliability**: Added robust error handling and fallback logic for `gemini-3-pro-image-preview` requests.

### Optimized
- **Neural Pulse Latency**: Optimized background notification checks in `Sidebar.tsx`.
- **Strategic Radar Animation**: Smoothed SVG path transitions in `Dashboard.tsx` for better performance.

## [1.1.0] - 2024-10-14
### Added
- Core 3-Panel Architecture.
- Gemini 3.0 Pro & Flash integration.
- Brand Intake & Analysis modules.
- Omnichannel Content Calendar.