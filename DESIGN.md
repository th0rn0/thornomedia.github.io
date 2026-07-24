# Design System — thorno.media

## Product Context
- **What this is:** A portfolio site for a solo photographer, videographer, and FPV drone pilot, each project mixes photo and video rather than separating them into per-discipline galleries.
- **Who it's for:** Prospective clients (weddings, brand/commercial work, aerial services) and the FPV/filmmaking community assessing craft.
- **Space/industry:** Photography/videography/drone portfolio sites.
- **Project type:** Marketing/portfolio site (Astro, static, GitHub Pages).
- **Reference sites researched:** [Lowry Droneography](https://www.lowrydroneography.com/portfolio), [AlexAndy Productions](https://alexandyproductions.com/en/portfolio/) — both default to generic tabbed-grid page-builder templates; [Alexandros Maragos](https://alexandrosmaragos.com/) — minimal, restrained, cinematic poster aesthetic, the quality bar for this category.
- **Memorable thing:** "Technical precision & control" — a visitor should walk away thinking of the craft and control behind the shot, not just an adrenaline reel.

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian meets Editorial — "flight-test documentation."
- **Decoration level:** Intentional (one real telemetry motif, used consistently, never as costume).
- **Mood:** Matte graphite control room. The site presents work like recovered flight data, not a highlight montage, restrained and quiet, not adrenaline-loud. Nothing tries to excite the visitor; that confidence is the point.

## Structural Principle (the core risk this system is built around)
- **Project-first, not discipline-tabbed.** Every competitor site researched defaults to a Photo/Video/FPV tabbed category grid because page-builder templates make that the easy path. This system rejects that: each project is one dossier that mixes photo and video in capture order. Discipline is a small tag/glyph on the tile, never a separate destination.
- **Content model implication:** every project needs real metadata to populate its spec strip: date, location/coordinates, gear, duration, formats, and a discipline tag list. This should be captured in the Astro Content Collection schema (`src/content/projects/`) from the start, see README.md.
- **Real metadata as a permanent visible element**, not buried in a modal, shutter speed, altitude, GPS, timecode, shown in the caption strip on every tile and detail page. This is what makes "technical precision" a demonstrated fact rather than a style claim.

## Typography
- **Display/Hero:** Archivo, expanded width axis (`font-stretch: 125%`), weight range 500–800 (variable font), engineered/corporate proportions with true tabular figures. Free via Google Fonts.
- **Body:** Instrument Sans, weight range 400–700, quiet precision grotesk, sits beside the louder display face without competing. Free via Google Fonts / Fontshare.
- **UI/Labels:** Same as body (Instrument Sans).
- **Data/Captions:** IBM Plex Mono, weights 400 and 500, designed by IBM's type team for technical contexts, real tabular numerals. Used *only* for metadata (coordinates, shutter speed, altitude, timecode, spec strips), never for decoration.
- **Code:** IBM Plex Mono.
- **Loading:** Self-host all three as woff2 (already downloaded and verified during the design preview), do not link to Google Fonts' CDN at runtime, avoids an external request on a static GitHub Pages site and keeps load fast.
- **Premium upgrade path (optional, not required):** PP Neue Corp (Pangram Pangram) + Suisse Int'l (Swiss Typefaces) + Berkeley Mono (U.S. Graphics Co.) is the paid-license version of this exact same role structure, ~$100–300 total, more bespoke tailoring, swap in later if desired.
- **Scale:**
  - Hero H1: `clamp(2.2rem, 6vw, 4.6rem)`, line-height 0.98, letter-spacing -0.01em
  - H2 (section): `clamp(1.5rem, 3vw, 2.1rem)`
  - H3 (card/detail): `clamp(1.3rem, 3vw, 2rem)`
  - Body: 1rem base, 1.02rem for long-form paragraphs, line-height 1.55–1.65
  - Eyebrow/mono caption: 0.7–0.72rem, letter-spacing 0.08–0.14em, uppercase

## Color
- **Approach:** Restrained, one accent, everything else neutral. Dark-only, by choice, not an omission, the "matte graphite control room" mood is the brand, so there is no light theme or toggle to dilute it.
  - Background `#0B0D0F` (graphite, not true black)
  - Surface `#15181B`, Surface-2 `#1C2024`
  - Text `#ECEEEF`, Muted text `#7C848A`
  - Accent `#E0993D` (brass/instrument amber), Accent-ink `#1A1206`
  - Border `rgba(236,238,239,0.11)`, Border-strong `rgba(236,238,239,0.22)`
- **Semantic:** Success `#5CA974`, Warning `#D1A23A`, Error `#C1503F`, Info `#5B8AA6`.
- **Implementation:** CSS custom properties on `:root`, `color-scheme: dark` set globally (including via `<meta name="color-scheme" content="dark">`) so browser chrome/form controls also render dark, no `prefers-color-scheme` override and no theme toggle.

## Spacing
- **Base unit:** 8px.
- **Density:** Comfortable-to-spacious around imagery (the work needs room), tighter/denser in metadata and caption strips, the contrast in density itself reads as "precision."
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96 (px).

## Layout
- **Approach:** Hybrid.
  - Index pages: grid disciplined by real gear aspect ratios (16:9, 2.39:1 anamorphic, 4:3 analog FPV) rather than uniform squares, tile spans vary (12/8/7/6/5/4 of a 12-col grid) to match each project's native ratio.
  - Project detail pages: creative-editorial, one continuous letterboxed scroll interleaving photo and video in capture order, controlled by a thin scrubber (NLE-timeline style) instead of a thumbnail-grid-plus-lightbox or autoplay carousel.
- **Max content width:** 1180px.
- **Border radius:** Minimal/sharp, 3px (buttons, cards, tiles), 4px (larger panels). No pill/bubble radii, deliberately "engineered," not soft.

## Motion
- **Approach:** Intentional, mostly restrained.
- **Signature moment (the one flourish):** Thin corner brackets on hero imagery animate in like a viewfinder "locking on" on page load (~1.1s, `cubic-bezier(.2,.7,.3,1)`), then go still. This is the only *entrance* animation in the system, everything else is static by default.
- **Reduced motion:** `prefers-reduced-motion: reduce` must skip the lock-on animation and show the end state immediately, and freeze the hero crossfade on its first frame. Verified in the design preview.
- **Hero background exception:** the index hero crossfades slowly between a small set of stills (7.5s/image: 1.5s fade, 6s hold) — see Decisions Log, 2026-07-24. This is a deliberate, explicit-approval exception to "static by default," scoped to the hero only.
- **No autoplay carousels elsewhere.** Project pages use a manual scrubber for playback control; the hero crossfade is not a carousel in that sense (no controls, no discrete "slides" the user steps through) but it is autoplaying motion, worth flagging in QA if it ever reads as busier than intended.
- **Easing:** enter `ease-out`, exit `ease-in`, move `ease-in-out`.
- **Duration:** micro 100ms (hover), short 150–250ms (buttons/links), signature moment ~1100ms (hero lock-on only).

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-16 | Initial design system created | Created by `/design-consultation`. Research: Lowry Droneography, AlexAndy Productions (category baseline, both generic-template), Alexandros Maragos (quality bar). Independent Claude subagent design direction (Codex unavailable on this machine, tagged single-model). |
| 2026-07-16 | Project-first structure over discipline-tabbed grid | Biggest differentiator from category baseline; matches "technical precision & control" memorable-thing. Approved by user. |
| 2026-07-16 | Free font stack (Archivo/Instrument Sans/IBM Plex Mono) over paid (PP Neue Corp/Suisse Int'l/Berkeley Mono) | Zero license cost, same role structure; paid stack documented as an optional upgrade path. |
| 2026-07-16 | Removed decorative grain overlay from design preview | `mix-blend-mode: overlay` on a fixed full-page noise layer crushed contrast badly in dark mode (confirmed via rendered screenshot, not just computed styles). Removed rather than tuned, given the risk of the effect misbehaving in the eventual production build. |
| 2026-07-16 | Design system approved via HTML preview | User reviewed the local preview file and approved the direction as-is. |
| 2026-07-16 | Dropped the light theme and toggle, dark-only | User's call after seeing the live site. The aesthetic is a dark, restrained "control room" mood by design, a light variant diluted that and added UI surface for no real benefit. |
| 2026-07-24 | Hero background crossfades between 3 FPV stills instead of staying static | Explicit user override of the "static by default, lock-on is the only motion" rule in the Motion section. Real footage (FPV car-chase highlights) replaced the synthetic gradient placeholder cover the hero used to pull from the featured project. Slow 7.5s-per-image crossfade (1.5s fade / 6s hold), chosen to stay "quiet" rather than carousel-loud; respects `prefers-reduced-motion` by freezing on the first frame. |
