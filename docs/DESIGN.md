---
name: momentrip
verified: 2026-10-16
reference: 8percent (에잇퍼센트) — https://www.8percent.kr/
runtime_deps:
  icons: '@phosphor-icons/react'
  fonts: [Pretendard]
colors:
  primary: '#6e49da'
  on-primary: '#ffffff'
  primary-tint: '#ecebfc'
  blue: '#377dfa'
  blue-tint: '#f1f6fe'
  link-blue: '#3282f0'
  link-violet: '#6741d9'
  ink: '#18181b'
  canvas: '#f4f4f5'
  surface: '#ffffff'
  muted: '#8e8e95'
  faint: '#aaaab1'
  disabled: '#e4e4e7'
  footer-strong: '#5a5a60'
  stat: '#3c3c3c'
  legacy-ink: '#1d2024'
  legacy-label: '#4b525a'
  legacy-canvas: '#f1f3f5'
  legacy-faint: '#9ca5ad'
  tab-hover: '#8e8e8e'
  select-border: '#dee2e5'
typography:
  stat:
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: '-0.9px'
    use: 'One headline figure per screen (e.g. the total in 경비 정리), 44px line, in #3c3c3c'
  section:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: '-0.6px'
    use: 'Section headings (마그넷 보드, 사진 그리드), 36px line, in #18181b'
  nav:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: '-0.32px'
    use: Header menu items (마그넷 보드, 여행 지도), 24.8px line
  card-title:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: '-0.32px'
    use: 'Trip-card city name, 24.8px line, in #18181b'
  tab-active:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.75
    letterSpacing: '-0.3px'
    use: 'Selected section tab (사진 그리드), 28px line, in #1d2024'
  tab:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '-0.4px'
    use: 'Unselected section tabs (지도, 경비), 24px line, in #9ca5ad'
  button:
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: '-0.28px'
    use: Button labels (여행 만들기, 붙여 볼까요?), 21.7px line
  figure:
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: '-0.28px'
    use: 'The one key figure on a trip card (dates or total spent), 21.7px line, in #377dfa'
  link:
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.71
    letterSpacing: '-0.6px'
    use: 'Text links under sections (#3282f0 default, #6741d9 alternate), 24px line'
  body:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.15
    use: 'Document default, 16.1px line, in #18181b'
  footer:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: '-0.28px'
    use: 'Footer contact values, 21.7px line, in #8e8e95'
  meta:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: '-0.12px'
    use: 'Trip-card meta line (dates, places), 19.2px line, in #aaaab1'
  badge:
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: '-0.1px'
    use: Header badge and trip-card chips, 16px line
rounded:
  select: 3px
  control: 8px
  card: 12px
  notice: 16px
  pill: 9999px
spacing:
  control-x: 12
  card: 16
  card-frame: 4
  notice-x: 16
  chip-x: 8
components:
  primary-button:
    type: button
    backgroundColor: '#6e49da'
    textColor: '#ffffff'
    rounded: 8px
    padding: 1px 12px
    height: 40px
    typography: 14px / 700 / 21.7px Pretendard, letter-spacing -0.28px
    hover: white overlay rgba(255, 255, 255, 0.08) laid over the fill as a background-image
    pressed: white overlay rgba(255, 255, 255, 0.16)
    focus: '2px solid #6e49da outline at 2px offset'
    states: 'hover and pressed add a white overlay layer (the fill itself stays #6e49da), focus draws the violet ring; transition all 0s'
    use: The one filled action on a screen (e.g. 여행 만들기 on 마그넷 보드), 40px tall
  gnb-menu:
    type: tab
    textColor: '#18181b'
    typography: 16px / 700 / 24.8px Pretendard, letter-spacing -0.32px
    selected: 'fg #6e49da on the current section (마그넷 보드)'
    hover: the caret beside the label turns 180 degrees
    pressed: the caret turns 180 degrees
    focus: '2px solid #6e49da outline at 2px offset'
    states: 'hover and pressed flip the caret over a 150ms transition, the label colour does not change; focus draws the violet ring'
    use: Header menu items (마그넷 보드, 여행 지도); secondary items follow in lighter 14px
  tonal-button:
    type: button
    backgroundColor: '#ecebfc'
    textColor: '#6e49da'
    rounded: 8px
    padding: 1px 12px
    height: 40px
    typography: 14px / 700 / 21.7px Pretendard, letter-spacing -0.28px
    hover: black overlay rgba(0, 0, 0, 0.04)
    pressed: black overlay rgba(0, 0, 0, 0.08)
    focus: '2px solid #6e49da outline at 2px offset'
    disabled: 'bg #e4e4e7, fg #aaaab1 when the action is not available yet'
    states: 'hover and pressed add a black overlay layer, focus draws the violet ring'
    use: Per-card action at the foot of each trip card (e.g. 다시 꺼내 볼까요?), 261 x 40
  icon-button:
    type: button
    backgroundColor: '#f4f4f5'
    rounded: 8px
    size: 40px x 40px
    hover: black overlay rgba(0, 0, 0, 0.04)
    pressed: black overlay rgba(0, 0, 0, 0.08)
    focus: '2px solid #6e49da outline at -2px offset (inset)'
    states: 'same overlay steps as tonal-button; the focus ring sits inside the square'
    use: Square icon button beside the tonal action on each trip card (e.g. 골라서 링크 공유)
  soft-button:
    type: button
    backgroundColor: '#f1f6fe'
    textColor: '#18181b'
    rounded: 8px
    padding: 6px 16px 6px 12px
    height: 40px
    typography: 14px / 400 / 16.1px Pretendard
    hover: opacity 0.8
    pressed: opacity 0.6
    focus: '2px solid #6e49da outline at 2px offset'
    states: 'opacity steps over a 0.2s ease transition; focus draws the violet ring'
    use: Soft invitation above a list (e.g. 첫 여행을 붙여 볼까요? on an empty 마그넷 보드), 40px tall, with a small image before the label
  notice-row:
    type: button
    backgroundColor: '#f1f3f5'
    textColor: '#4b525a'
    rounded: 16px
    padding: 0px 16px
    height: 56px
    typography: 14px / 400 / 16.1px Pretendard
    focus: '2px solid #6e49da outline at 2px offset'
    states: 'hover and pressed show no change; focus draws the violet ring'
    use: 'Full-width message row at the top of 마그넷 보드 (e.g. 오사카 여행 잘 다녀왔어요?), 56px tall'
  section-tab:
    type: tab
    textColor: '#9ca5ad'
    typography: 16px / 400 / 24px Pretendard, letter-spacing -0.4px
    selected: 'fg #1d2024, 16px / 700 / 28px, letter-spacing -0.3px'
    hover: 'fg #8e8e8e'
    pressed: 'fg #8e8e8e'
    focus: '2px solid #6e49da outline at 2px offset'
    states: 'hover and pressed turn the label and its selected bar #8e8e8e; the selected tab does not change; focus draws the violet ring'
    use: Section tabs inside a trip (사진 그리드, 지도, 경비)
  select:
    type: input
    backgroundColor: '#ffffff'
    textColor: '#3c3c3c'
    border: '1px solid #dee2e5'
    rounded: 3px
    padding: 0px 28px 0px 10px
    height: 40px
    typography: 14px / 400 / 16.1px Pretendard
    focus: '2px solid #6e49da outline at 2px offset'
    states: 'hover draws nothing, pressed unmeasured, focus draws the violet ring'
    use: Select fields in 여행 만들기 (dates, city), 40px tall
  trip-card:
    type: card
    backgroundColor: '#f4f4f5'
    rounded: 12px
    padding: 4px 4px 8px
    size: 349px x 285px
    use: Outer frame of each trip card on 마그넷 보드; the whole card is clickable (role=button) and a white panel sits inside it, with the meta line on the grey frame below
  trip-card-panel:
    type: card
    backgroundColor: '#ffffff'
    rounded: 12px
    padding: 16px
    use: White panel inside the trip card holding the cover photo, city name, key figure, dates and the two buttons
  gnb-badge:
    type: badge
    backgroundColor: '#377dfa'
    textColor: '#ffffff'
    rounded: 9999px
    padding: 2px 6px
    typography: 10px / 700 / 16px Pretendard, letter-spacing -0.1px
    use: Small blue pill beside a header menu item, 29 x 20
  chip:
    type: badge
    backgroundColor: '#f4f4f5'
    textColor: '#18181b'
    rounded: 8px
    padding: 0px 8px
    height: 24px
    typography: 10px / 700 / 16px Pretendard, letter-spacing -0.1px
    use: Chip on trip cards (국내, 해외), 42 x 24
fonts:
  roles:
    body: Pretendard
---

# Momentrip (모먼트립) Design System

<!--
Conversion note — design-brandfit, 2026-10-16
- Reference: 8percent (에잇퍼센트) public website — https://www.8percent.kr/ , /disclosures/management/ , /deals/real-estate-special/ (reference capture verified 2026-09-30; collector at 1440x900, logged out, plus keyboard state probe).
- Visual tokens (every colour value, type size/weight/line-height/tracking, radius, spacing, component measurements, overlay steps, motion timings) are kept unchanged from the reference.
- Meta, naming, rationale, voice and UI copy are rewritten for Momentrip from docs/VOICE.md and docs/PRODUCT.md.
- Removed as duplicates of VOICE.md / PRODUCT.md: Brand Narrative, Personas, and the reference company's history and figures.
- Renamed reference-specific components: login-button → primary-button, invest-button → tonal-button, cart-button → icon-button, invest-all-button → soft-button, notice-link → notice-row, disclosure-tab → section-tab, year-select → select, deal-card(-panel) → trip-card(-panel), deal-chip → chip; typography rate → figure.
- Colour decision: values are kept for now. The calm violet-and-grey palette is in tension with Momentrip's bright, playful mood; a brand-colour revision is planned as a separate step (see docs/DECISIONS.md). Until then the accent is kept deliberately scarce and brightness comes from the user's photos and magnets.
- Font: Pretendard is kept (open source, SIL OFL 1.1, full Korean coverage); no substitution needed.
- Icons: the reference specifies no icon library or style; Phosphor is added for its rounded joins and friendly character.
- Voice samples are unvalidated planning copy for a new service, taken verbatim from docs/VOICE.md.
- Known inconsistencies: none found between the reference's descriptions and its token values.
-->

## Overview

### Visual Theme & Atmosphere

Momentrip (모먼트립) is a personal travel-memory collection: trips become magnets on a board, and each trip holds the user's own best photos, one-line notes, a route on a map, a memory video and a plain expense summary. The interface is the quiet frame around those memories. The user's photos and magnets are meant to be the brightest, most colourful things on the screen, so the chrome stays calm and steps back — like a friend who is excited about your trip but lets you tell it.

The system is built from a `#18181b` ink on a `#f4f4f5` canvas, white panels, 8px and 12px corners and one violet, `#6e49da`, for the action that matters on each screen. A second, older set of neutrals (`#1d2024`, `#9ca5ad`, `#3c3c3c`, `#f1f3f5`) is kept for section tabs, the headline figure and the notice row.

Everything is set in Pretendard, and no element carries a drop shadow. Interaction is uniform. Filled buttons get a white overlay on hover and pressed, tonal and grey ones a black overlay, and every control draws the same 2px violet focus ring.

**Key Characteristics:**
- One violet `#6e49da` for the one primary action (e.g. 여행 만들기), the selected header section, the tonal button label and the focus ring; its pale partner `#ecebfc` fills the tonal per-card button
- A second brand colour, blue `#377dfa`, for the one key figure on a trip card and the header badge; its tint `#f1f6fe` fills the soft invitation button
- Main neutrals: `#18181b` ink, `#f4f4f5` canvas, `#ffffff` panels, `#8e8e95` and `#aaaab1` secondary text, `#e4e4e7` disabled fill
- Secondary neutrals for tabs, the headline figure and the notice row: `#1d2024`, `#9ca5ad`, `#3c3c3c`, `#4b525a`, `#f1f3f5`, `#dee2e5`
- Pretendard only, 400 and 700, with negative tracking on nearly every role
- State by overlay, not by new fills: white 8% and 16% on violet, black 4% and 8% on tonal and grey; focus is always a 2px `#6e49da` ring
- Flat: no element draws a `box-shadow`

### Primary tasks

- 마그넷 보드 & 여행 지도 — see every trip as a magnet, on a board or on a map
- 여행 만들기 — start a trip with dates, city, places to go and a budget
- 여행 중 퀵 기록 — leave a one-line note, a photo or two and what was spent
- 베스트 사진 고르기 — upload photos, see similar ones grouped, choose the best yourself
- 사진 그리드 — browse a trip's best photos, or all trips' best photos, in a grid
- 추억 영상 — turn the chosen photos into a vertical memory video or a route-following video
- 골라서 링크 공유 — share only the video, notes or expenses you pick

### Principles

1. **Moments first.** *UI implication:* the cover photo and city name lead each trip card; one key figure (dates or total spent) sits beside them, everything else is ink or grey.
2. **One action colour.** *UI implication:* `#6e49da` marks the one primary action, the selected section and focus; per-card actions use its tint `#ecebfc`.
3. **Plain facts for money.** *UI implication:* 경비 정리 shows figures as they are, in tabbed plain pages, with no warning colours or judgement for overspending.
4. **Consistent feedback.** *UI implication:* every button answers hover and press with the same overlay steps, and every control shows the same focus ring.
5. **Flat and calm, so the memories can be bright.** *UI implication:* no shadows; white panels on a grey canvas; colour on the screen comes mostly from the user's photos and magnets.

### Usage Boundaries

| Element | Use for | Never use for |
|---|---|---|
| primary (`#6e49da`) | One filled primary action per screen; the selected header section; every focus ring | Background fills, large areas, body text, magnet decoration |
| primary-tint (`#ecebfc`) | Tonal per-card action buttons (with a `#6e49da` label) | Page or section backgrounds |
| blue (`#377dfa`) | The one key figure on a trip card; the header badge | Buttons, links, or colouring expense figures to judge spending (no "over budget" signal) |
| stat type (40px / 400) | One headline figure per screen (e.g. the total in 경비 정리) | Titles or headings |
| Elevation: flat | Every surface, magnets included; depth comes from `#ffffff` panels on the `#f4f4f5` canvas | Drop shadows to lift magnets, cards or modals |
| legacy-* neutrals (`#1d2024`, `#9ca5ad`, `#4b525a`, `#f1f3f5`) | Section tabs and the notice row only | New surfaces or general text |

## Colors

Every value below is kept unchanged from the 8percent reference capture (2026-09-30); the names and uses are Momentrip's. The values are interim: a brand-colour revision is planned as a separate step.

### Primary
- **Moment Violet** (`#6e49da`): The fill of the one primary action on a screen (40px tall, 8px radius, `#ffffff` label). It also marks the label of the current header section, the label of each tonal per-card button, and the 2px focus ring on every control. Used sparingly so the user's photos stay the brightest thing on screen.
- **On Primary** (`#ffffff`): The primary-button label, the header badge label and the trip-card panels.
- **Violet Tint** (`#ecebfc`): The fill of the tonal per-card button, with a `#6e49da` label.

### Accent
- **Figure Blue** (`#377dfa`): The one key figure on each trip card and the fill of the small header badge. It marks figures and news, not actions.
- **Blue Tint** (`#f1f6fe`): The fill of the soft invitation button (e.g. 첫 여행을 붙여 볼까요?).
- **Link Blue** (`#3282f0`): Text links. Never a button fill.
- **Link Violet** (`#6741d9`): The alternate text-link colour.

### Neutral & Surface
- **Canvas** (`#f4f4f5`): The body background, the trip-card frame, the icon button and the chips.
- **Surface** (`#ffffff`): The trip-card panels and the selects.
- **Disabled** (`#e4e4e7`): The fill of a tonal button whose action is not available yet, with a `#aaaab1` label.
- **Select Border** (`#dee2e5`): The 1px border of the selects.
- **Legacy Canvas** (`#f1f3f5`): The fill of the notice row.

### Text
- **Ink** (`#18181b`): The document default text colour, section headings and trip-card city names.
- **Muted** (`#8e8e95`): Footer values and links, and secondary figures on trip cards.
- **Faint** (`#aaaab1`): The trip-card meta line and disabled labels.
- **Footer Strong** (`#5a5a60`): Bold footer lines.
- **Stat** (`#3c3c3c`): The 40px headline figure and the select labels.
- **Legacy Ink** (`#1d2024`): The selected section tab.
- **Legacy Label** (`#4b525a`): The text of the notice row.
- **Legacy Faint** (`#9ca5ad`): Unselected section tabs; they turn **Tab Hover** `#8e8e8e` on hover and pressed.

### Brand assets, not tokens
- Banner campaign fills from the reference (`#3282f0`, `#68be66`, `#6741d9`, `#fd7470`, `#414a5c`, `#6da5ff`) and a `#18181b` counter badge belonged to the reference's banner artwork *(unused — reference-specific)*. They are not colour tokens.
- The Momentrip logo is not designed yet; no logo colour is claimed.

## Typography

### Font Family
- **Family**: `Pretendard` for every role. Stack: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`.
- **Licence**: open-source Korean typeface by Kil Hyung-jin (orioncactus), SIL Open Font License 1.1. Full Hangul coverage, so Korean UI copy renders without substitution.
- **Loading**: self-host or load the web font from the Pretendard distribution (e.g. jsDelivr); use the Regular (400) and Bold (700) weights.
- **Kept from the reference**: the reference already used Pretendard, so no family substitution was made.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Tracking | Used for |
|------|------|------|--------|-------------|----------|-------------|
| Stat | Pretendard | 40px | 400 | 44px (1.1) | -0.9px | Headline figure (e.g. the total in 경비 정리), `#3c3c3c` |
| Section | Pretendard | 24px | 700 | 36px (1.5) | -0.6px | 마그넷 보드, 사진 그리드 |
| Tab Active | Pretendard | 16px | 700 | 28px (1.75) | -0.3px | Selected section tab, `#1d2024` |
| Nav | Pretendard | 16px | 700 | 24.8px (1.55) | -0.32px | Header menu items |
| Card Title | Pretendard | 16px | 700 | 24.8px (1.55) | -0.32px | Trip-card city name |
| Tab | Pretendard | 16px | 400 | 24px (1.5) | -0.4px | Unselected section tabs, `#9ca5ad` |
| Link | Pretendard | 14px | 700 | 24px (1.71) | -0.6px | Text links |
| Button | Pretendard | 14px | 700 | 21.7px (1.55) | -0.28px | 여행 만들기, 붙여 볼까요? |
| Figure | Pretendard | 14px | 700 | 21.7px (1.55) | -0.28px | Trip-card key figure, `#377dfa` |
| Footer | Pretendard | 14px | 400 | 21.7px (1.55) | -0.28px | Footer values, `#8e8e95` |
| Body | Pretendard | 14px | 400 | 16.1px (1.15) | normal | Document default |
| Meta | Pretendard | 12px | 400 | 19.2px (1.6) | -0.12px | Trip-card meta, `#aaaab1` |
| Badge | Pretendard | 10px | 700 | 16px (1.6) | -0.1px | Header badge, chips |

### Principles
- **One family, two main weights**: 400 for reading and 700 for anything that names or acts; the only 40px figure stays at 400.
- **Tight by default**: most roles track about -2% of their size (-0.28px at 14px, -0.32px at 16px); headings go further (-0.6px at 24px, -0.9px at 40px).
- **Numbers carry colour sparingly**: the key figure on a trip card is the only figure in blue; everything else on a card is ink or grey.

## Iconography

- **Library**: Phosphor (`@phosphor-icons/react`, MIT). Its rounded joins and soft shapes suit Momentrip's warm, playful voice while staying light enough for a calm, flat interface.
- **Style rules**: the reference specifies none (no stroke, size or fill rule). Use a single Phosphor weight across the product until one is chosen; see Known Gaps.

## Layout

### Spacing System
- Buttons: 12px horizontal padding at 40px height; the soft button uses 6px 16px 6px 12px
- Trip cards: a 4px grey frame (8px at the foot) around a white panel with 16px padding
- Notice row: 16px horizontal padding at 56px height
- Chips: 8px horizontal padding at 24px height
- Frequent spacing values: 8, 4, 12, 20 and 2px

### Grid & Container
- The reference layout (a fixed header over a 1080px column holding a grid of 349px cards) was captured at desktop width only.
- Momentrip is mobile-first; its screen layouts are defined in docs/FLOWS.md.

### Whitespace Philosophy
- **Grey canvas, white panels**: grouping comes from the `#f4f4f5` canvas against `#ffffff` panels, not from borders or shadows.
- **Dense cards, calm chrome**: each trip card packs the cover photo, city, key figure and dates in 12–16px type while the page around it stays open.

### Border Radius Scale
- 0px: the default
- 3px: selects
- 8px: buttons, icon buttons, chips
- 12px: trip-card frame and panel
- 16px: notice row
- 9999px: header badge

### Responsive Behavior

#### Breakpoints
Only a 1440 × 900 desktop viewport was captured in the reference. Momentrip is mobile-first, but no breakpoint value exists yet (see Known Gaps).

#### Touch Targets
- Notice row: 56px
- Primary, tonal, icon and soft buttons: 40px
- Selects: 40px
- Chips: 24px

#### Collapsing Strategy
Not captured.

#### Image Behavior
- The reference's full-width hero banner carousel with 240px-wide previous and next hit areas *(unused — reference-specific)*.

## Elevation & Depth

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Every element, magnets included |
| Canvas | `#f4f4f5` | Page background, card frames, icon buttons |
| Panel | `#ffffff` | Trip-card panels, selects |
| Overlay | white 8% / 16%, black 4% / 8% layers | Hover and pressed on buttons |

**Shadow Philosophy**: no element draws a box-shadow (the select's hover adds an inset shadow of zero size, which draws nothing). Emphasis comes from the violet and blue, from white panels on grey, and from the state overlays. Magnets stay flat too; their charm comes from the photo and the city name, not from lift.

## Motion & Easing

The primary, tonal and icon buttons, the notice row and the section tabs compute `transition: all 0s`, so their state changes are instant. The soft button transitions opacity over 0.2s ease. The header menu's caret turns over a 150ms transition. The select transitions background colour, colour and border colour over 0.3s with `cubic-bezier(0.17, 0.67, 0.83, 0.67)`. Nothing else about motion (carousels, magnet or video transitions) is specified; treat it as unspecified and honour `prefers-reduced-motion` in any build.

## Components

### Buttons

**Primary**
- Background: `#6e49da`
- Text: `#ffffff`
- Radius: 8px
- Padding: 1px 12px
- Height: 40px (59.5px wide in the reference, for a short label)
- Font: 14px / 700 / 21.7px Pretendard, letter-spacing -0.28px
- Hover: white overlay `rgba(255, 255, 255, 0.08)` over the fill
- Pressed: white overlay `rgba(255, 255, 255, 0.16)`
- Focus: 2px solid `#6e49da` outline at 2px offset
- Use: the one filled action on a screen, e.g. 여행 만들기

**Tonal**
- Background: `#ecebfc`
- Text: `#6e49da`
- Radius: 8px
- Padding: 1px 12px
- Height: 40px
- Font: 14px / 700 / 21.7px Pretendard, letter-spacing -0.28px
- Hover: black overlay `rgba(0, 0, 0, 0.04)`
- Pressed: black overlay `rgba(0, 0, 0, 0.08)`
- Focus: 2px solid `#6e49da` outline at 2px offset
- Disabled: background `#e4e4e7`, text `#aaaab1` (action not available yet)
- Use: per-card action on each trip card, e.g. 다시 꺼내 볼까요?

**Icon**
- Background: `#f4f4f5`
- Radius: 8px
- Size: 40 × 40
- Hover / pressed: black overlay 4% / 8%
- Focus: 2px solid `#6e49da` outline at -2px offset
- Use: beside the tonal action, e.g. 골라서 링크 공유

**Soft**
- Background: `#f1f6fe`
- Text: `#18181b`
- Radius: 8px
- Padding: 6px 16px 6px 12px
- Height: 40px
- Font: 14px / 400 / 16.1px Pretendard
- Hover: opacity 0.8
- Pressed: opacity 0.6
- Focus: 2px solid `#6e49da` outline at 2px offset
- Use: a soft invitation above a list, e.g. 첫 여행을 붙여 볼까요?

**Notice row**
- Background: `#f1f3f5`
- Text: `#4b525a`
- Radius: 16px
- Padding: 0px 16px
- Height: 56px
- Font: 14px / 400 / 16.1px Pretendard
- States: no hover or pressed change; focus draws the violet ring
- Use: a full-width message row at the top of 마그넷 보드, e.g. 오사카 여행 잘 다녀왔어요?

### Tabs & Navigation

**Header menu**
- Text: `#18181b`; the current section `#6e49da`
- Font: 16px / 700 / 24.8px Pretendard, letter-spacing -0.32px
- Hover / pressed: the caret beside the label turns 180 degrees; the colour does not change
- Focus: 2px solid `#6e49da` outline at 2px offset
- Use: 마그넷 보드 and 여행 지도, followed by lighter 14px secondary items

**Section tabs**
- Text: `#9ca5ad`, 16px / 400 / 24px, letter-spacing -0.4px
- Selected: `#1d2024`, 16px / 700 / 28px, letter-spacing -0.3px
- Hover / pressed: `#8e8e8e` (label and its bar)
- Focus: 2px solid `#6e49da` outline at 2px offset
- Use: 사진 그리드, 지도, 경비 inside a trip

### Inputs

**Select**
- Background: `#ffffff`
- Text: `#3c3c3c`
- Border: 1px solid `#dee2e5`
- Radius: 3px
- Padding: 0px 28px 0px 10px
- Height: 40px
- Font: 14px / 400 / 16.1px Pretendard
- Focus: 2px solid `#6e49da` outline at 2px offset
- Use: select fields in 여행 만들기 (dates, city)

### Cards & Badges

**Trip card**
- Frame: `#f4f4f5`, 12px radius, 4px 4px 8px padding, 349 × 285
- Panel: `#ffffff`, 12px radius, 16px padding
- Key figure `#377dfa` 14px / 700; city name `#18181b` 16px / 700; meta `#aaaab1` 12px; secondary figures `#8e8e95` 12px
- Use: every trip on 마그넷 보드; the whole card is clickable (role=button)

**Header badge**
- Background: `#377dfa`
- Text: `#ffffff`
- Radius: 9999px
- Padding: 2px 6px
- Font: 10px / 700 / 16px Pretendard

**Chip**
- Background: `#f4f4f5`
- Text: `#18181b`
- Radius: 8px
- Padding: 0px 8px
- Height: 24px
- Font: 10px / 700 / 16px Pretendard
- Use: 국내, 해외 and similar chips on trip cards

### States

Only these states are specified; nothing else is defined here.

| State | Treatment |
|---|---|
| **Hover / pressed (filled)** | The primary button keeps `#6e49da` and gains a white overlay, 8% on hover and 16% pressed. |
| **Hover / pressed (tonal, grey)** | The tonal and icon buttons gain a black overlay, 4% and 8%. |
| **Hover / pressed (soft)** | The soft button: opacity 0.8 and 0.6. |
| **Hover / pressed (tabs)** | Unselected section tabs turn `#8e8e8e`; the header menu flips its caret. |
| **No change** | The notice row and the selected section tab show no hover or pressed change. |
| **Focus** | Every control draws a 2px solid `#6e49da` outline at 2px offset (the icon button at -2px). |
| **Selected** | Header section `#6e49da`; section tab `#1d2024` at weight 700. |
| **Disabled** | Tonal button not available yet: `#e4e4e7` fill, `#aaaab1` label. |

Error, empty, loading and success states have no visual treatment yet (see Known Gaps). Their copy comes from docs/VOICE.md:

| State | Copy |
|---|---|
| Empty | "아직 마그넷이 없네요. 첫 여행을 붙여 볼까요? 지난 여행도 좋아요 🧳" |
| Success | "완성! 그때 그 장면들, 노래랑 같이 다시 떠나 볼까요? ✨" |
| Error | "사진을 불러오지 못했어요. 잠시 후 다시 올려 볼까요?" (no emoji) |

The select's pressed state is unmeasured.

## Do's and Don'ts

### Do
- Use `#6e49da` for the one primary action, the selected section and every focus ring
- Pair `#ecebfc` with a `#6e49da` label for per-card actions such as 다시 꺼내 볼까요?
- Show state with overlays: white 8% / 16% on filled buttons, black 4% / 8% on tonal and grey ones
- Put the one key figure on a card in `#377dfa` and everything else in ink or grey
- Set everything in Pretendard with tight negative tracking
- Keep surfaces flat: `#ffffff` panels on a `#f4f4f5` canvas, and let photos and magnets carry the colour

### Don't
- Don't make `#3282f0` the action colour; it is a text link, not a button fill
- Don't add drop shadows, not even to magnets
- Don't invent new state colours; the system darkens or lightens with overlays and a violet ring
- Don't use the reference banner campaign colours as interface colours
- Don't colour expense figures to judge spending (no red "over budget", no green "saved")
- Don't rely on colour alone; pair each figure with its label

## Voice & Tone

Momentrip's voice is an **excited, warm travel mate**: glad about your trip, quick to welcome you back, but always leaving the choosing and the writing to you. Polite `~해요` register, suggestions instead of commands (`~해 볼까요?`), short and bright sentences. At most one emoji and one exclamation mark per line; none in error or expense copy. Full guide: docs/VOICE.md.

| Context | Tone |
|---|---|
| Onboarding / first screen | Medium excitement, high warmth; easy to start. ("다녀온 여행의 순간들, 여기에 하나씩 모아 볼까요?") |
| Empty state | High warmth; past trips are welcome too. ("아직 마그넷이 없네요. 첫 여행을 붙여 볼까요? 지난 여행도 좋아요 🧳") |
| Success | Highest excitement; a short celebration plus an invitation. ("완성! 그때 그 장면들, 노래랑 같이 다시 떠나 볼까요? ✨") |
| Error | Low excitement, high warmth, no emoji; solution first. ("사진을 불러오지 못했어요. 잠시 후 다시 올려 볼까요?") |
| Expenses | Plain facts, no judgement, no emoji. ("이번 여행엔 이렇게 썼어요. 숙소가 가장 컸네요.") |
| Push notification | Medium excitement; welcome plus a light suggestion, never pressure. ("오사카 여행 잘 다녀왔어요? 🎉 그 순간들, 사진으로 다시 꺼내 볼까요?") |
| Landing | High excitement; past memories and the next trip together. ("다녀와서 사진만 올리면, 여행의 순간들이 영상이 돼요. 다음엔 어디 갈까요?") |

**Voice samples (unvalidated planning copy, from docs/VOICE.md):**
- "오사카 여행 잘 다녀왔어요? 🎉 그 순간들, 사진으로 다시 꺼내 볼까요?"
- "같은 곳에서 찍은 사진끼리 모아 뒀어요. 제일 마음에 드는 한 장을 골라 주세요."
- "남겨 둔 한 줄이 이 사진이랑 같이 보여요."
- "이번 여행엔 이렇게 썼어요. 숙소가 가장 컸네요."

**CTA labels:** `여행 만들기` · `붙여 볼까요?` · `다시 꺼내 볼까요?` · `다시 떠나 볼까요?` · `골라 주세요` · `올리기`

**Forbidden phrases:**
- Pressure to record: "지금 정리하세요", "미루면 영영 못 해요", "아직 정리 안 한 사진 N장"
- Guilt about money: "예산 초과", "절약하세요", "텅장", "돈 엄청 썼네요"
- Judging taste or rewriting the user's notes: "빼 드렸어요", "이게 더 낫죠?", "이렇게 바꿔 쓰면 더 감성적", "AI가 알아서 골라 드려요"
- Borrowed registers (sales, influencer, guidebook, pro adventurer, budgeting tool, heavy essay): "특가", "마감 임박", "지금 떠나세요", "인생샷", "감성 미쳤다", "추천 코스 TOP 10", "N개국 정복", "그날의 빛"
- Comparison and system-speak: "다른 사용자들은 평균…", "업로드해 주세요", "완료되지 않았습니다"

## Agent Prompt Guide

### Quick Color Reference
- Primary action, selection, focus: `#6e49da` with `#ffffff`; tonal `#ecebfc`
- Key figures: `#377dfa`; soft button `#f1f6fe`
- Text: `#18181b` default, `#8e8e95` secondary, `#aaaab1` meta
- Canvas `#f4f4f5`, panels `#ffffff`, disabled `#e4e4e7`
- Tabs and notice row: `#1d2024` selected tab, `#9ca5ad` tabs, `#3c3c3c` headline figure, `#dee2e5` select border

### Example Component Prompts
- "Create a primary button labelled 여행 만들기: `#6e49da` background, `#ffffff` 14px Pretendard label at weight 700 with -0.28px tracking, 8px radius, 1px 12px padding, 40px tall; on hover lay a white 8% overlay over it, 16% when pressed; focus is a 2px solid `#6e49da` outline at 2px offset."
- "Create a trip card: a `#f4f4f5` frame with 12px radius and 4px padding around a white panel with 16px padding; cover photo, city name 16px/700 `#18181b`, key figure 14px/700 `#377dfa`, meta 12px `#aaaab1`; at the foot a 40px `#ecebfc` button labelled 다시 꺼내 볼까요? in `#6e49da` (black 4% overlay on hover) beside a 40 × 40 `#f4f4f5` share icon button. No shadow."
- "Build section tabs 사진 그리드 / 지도 / 경비: unselected 16px/400 `#9ca5ad`, hover `#8e8e8e`; selected 16px/700 `#1d2024`."

### Iteration Guide
1. One violet (`#6e49da`) for action, selection and focus — one primary action per screen
2. Blue (`#377dfa`) only for the key figure and badges, never to judge spending
3. Overlays for hover and pressed, never new fills
4. Pretendard everywhere, tight tracking; Phosphor icons
5. Flat grey canvas and white panels; colour comes from photos and magnets

---

**Verified:** 2026-10-16 (design-brandfit conversion for Momentrip)
**Visual tokens:** unchanged from the 8percent reference capture of 2026-09-30 — https://www.8percent.kr/ ; https://www.8percent.kr/disclosures/management/ ; https://www.8percent.kr/deals/real-estate-special/
**Meta, voice and copy:** rewritten from docs/VOICE.md and docs/PRODUCT.md; voice samples are unvalidated planning copy

## Governance

### Known Gaps

- **Contrast, `gnb-badge`.** Text `#ffffff` on `#377dfa` measures 3.83:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Brand colour.** The violet-and-grey values are interim; a revision toward Momentrip's brighter mood is planned as a separate step.
- **Error and success colours.** The reference defines none; error, empty, loading and success states have copy but no visual treatment yet.
- **Mobile breakpoints.** The reference was captured at desktop width only; Momentrip is mobile-first and has no breakpoint values yet.
- **Icon style.** No stroke weight, size or fill rule is defined for Phosphor yet.
