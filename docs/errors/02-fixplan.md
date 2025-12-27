# 🎨 Fix Plan: Styling & Preview Restoration

## 1) Executive Summary
- **Symptom:** Blank screen in Google Studio preview or unstyled "raw HTML" document (blue links, default fonts).
- **Root Cause:** 
    1. **CORS Blockage:** `index.html` was requesting `/main.tsx` from an absolute root path, which in certain preview environments resolved to the host origin (e.g., `https://ai.studio/main.tsx`) rather than the local project origin, triggering browser CORS blocks.
    2. **Bundler Bypass:** The presence of a native `<script type="importmap">` caused the browser to attempt native module resolution, bypassing the Vite bundler. This resulted in failures to resolve aliases (like `@/`) and uncompiled Tailwind CSS.
- **Fix Path chosen:** Path A (Proper Vite Build).
- **Current status:** Operational.

## 2) Repro Steps
1. Load the application in a restricted origin sandbox (Google AI Studio).
2. Observe Console for "CORS policy" errors on `main.tsx`.
3. Observe Network tab showing `index.css` with raw `@tailwind` directives.

## 3) Fix Plan Checklist
- [x] Remove `<script type="importmap">` from `index.html`.
- [x] Update `index.html` script source to `./main.tsx` (Relative).
- [x] Consolidate entry point logic into `main.tsx`.
- [x] Verify all internal imports use relative paths (e.g., `../../../` vs `@/`).
- [x] Ensure `tailwind.config.js` and `postcss.config.js` are present to trigger the build pipeline.

## 4) Patch Notes
- **index.html:** Removed `importmap` to restore Vite sovereignty. Changed script path to `./main.tsx`.
- **main.tsx:** Verified import of `index.css`.
- **App.tsx:** Verified relative pathing for all page and layout imports.
- **Project Structure:** Standardized on root-level source files to match Vite + React rules while satisfying user's "no-src-dir" constraint.

## 5) Validation Tests
- **Network Check:** `main.tsx` loads with status `200` from the correct origin. [PASS]
- **Alias Check:** No `404/400` errors for `@/` resolution; all modules resolved locally. [PASS]
- **Visual Check:** Typography correctly utilizes Playfair Display (Serif) and Inter (Sans). Background is Ivory. [PASS]
- **Route Check:** 
    - `/` (Landing): Renders correctly with Hero. [PASS]
    - `/dashboard`: Gated logic successfully redirects to landing if no brand exists. [PASS]

## 6) "Definition of Done"
- No "CORS" errors in console.
- No "failed to resolve module specifier" errors.
- Tailwind CSS is compiled and utility classes (e.g., `bg-ivory`, `text-charcoal`) are visible in Inspect Element.
- Application renders fully with the "Quiet Luxury" aesthetic.