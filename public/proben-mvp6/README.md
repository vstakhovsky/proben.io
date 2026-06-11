# Proben MVP 6 — prototype source

Clickable React prototype (landing + full readiness flow) for Proben
"Meeting Readiness". This folder is self-contained — everything the MVP 6
prototype needs, nothing from the other MVPs.

## Run
Open `index.html` in a browser, or serve the folder:

    npx serve .        # or: python3 -m http.server

(Opening via `file://` works too, but a local server avoids any browser
restrictions on loading the `.jsx` files.)

No build step. React 18, ReactDOM and Babel-standalone load from a CDN and
transpile the `.jsx` files in the browser. Fonts (Hanken Grotesk, IBM Plex
Mono) load from Google Fonts — an internet connection is required on first load.

## What's included (full feature set)
- Landing: hero with readiness-report preview, how-it-works, five-checks
  diagnostic table, context gaps, use cases, FAQ, pricing
- Readiness flow: context input (with "Use sample"), context gaps with
  "why it matters", analyzing screen, readiness report, "copy readiness brief"
- Practice: chat practice, voice practice, dialogue map
- Optional "Stacky" mascot (toggle in Settings)
- Light / dark theme (toggle in Settings)

## Files
- `index.html` ............ entry point; mounts `#root`, loads the scripts in order
- `radar.css` ............. design tokens + base styles ("Context Radar" system, light default / `data-theme="dark"`)
- `favicon.svg`

Scripts (loaded in this order — later files depend on earlier ones):
1. `shared.jsx` .......... icons, primitives (Btn, Pill, ScoreRing…), sample data, `tcol`, SIG5/CHECKS5
2. `Mascot.jsx` .......... optional "Stacky" mascot + `MascotProvider` / `useMascot`
3. `Mvp5Screens.jsx` ..... readiness flow screens (context input, gaps, analyzing, updated report)
4. `Report.jsx` .......... readiness report view
5. `PracticeModes.jsx` ... practice-mode UI
6. `VoicePractice.jsx` ... voice practice screen
7. `DialogueMap.jsx` ..... dialogue/branch map
8. `LandingMvp5.jsx` ..... landing page (hero, how-it-works, five checks, use cases…)
9. `Mvp6Pages.jsx` ....... secondary pages (FAQ, etc.)
10. `Mvp6Site.jsx` ....... app shell + router; renders `<MascotProvider><AppMvp6/></MascotProvider>`

## Notes
- Each `<script type="text/babel">` has its own scope. Components shared across
  files are exported via `Object.assign(window, {…})` at the end of each file.
- Theme + "Show mascot" preferences persist in `localStorage`
  (`proben:theme`, `proben:mascot`).
