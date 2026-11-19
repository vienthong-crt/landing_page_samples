---
name: Khe Nâu
description: Dual-surface roaster instrument and tasting ledger design system pairing matte slate-iron, unbleached paper, brushed brass hairlines, and isolated roast-ember controls.
colors:
  ember: "#b8431b"
  ember-hover: "#9f3714"
  ember-ink: "#fffdf8"
  iron-brass: "#d4a65a"
  paper-brass: "#8e6220"
  iron-bg: "#181a1d"
  iron-surface: "#202328"
  iron-ink: "#f3ede2"
  iron-muted: "#b6afa3"
  iron-seam: "rgba(243, 237, 226, 0.14)"
  iron-seam-strong: "rgba(243, 237, 226, 0.28)"
  paper-bg: "#f3ede2"
  paper-surface: "#e7dfd0"
  paper-card: "#faf6ee"
  paper-ink: "#181a1d"
  paper-muted: "#5b4a38"
  paper-seam: "rgba(24, 26, 29, 0.14)"
  paper-seam-strong: "rgba(24, 26, 29, 0.28)"
  error-ink: "#b42318"
typography:
  display:
    fontFamily: '"Bricolage Grotesque", "Be Vietnam Pro", system-ui, sans-serif'
    fontSize: "clamp(2.25rem, 4.1vw, 3.65rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: '"Bricolage Grotesque", "Be Vietnam Pro", system-ui, sans-serif'
    fontSize: "clamp(1.875rem, 3vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Bricolage Grotesque", "Be Vietnam Pro", system-ui, sans-serif'
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
  mono:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
    fontFeature: '"tnum"'
rounded:
  card: "0px"
  control: "2px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ember-ink}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.ember-hover}"
  button-primary-sm:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ember-ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "40px"
  slot-pill:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.paper-muted}"
    rounded: "{rounded.control}"
    padding: "8px 6px"
    height: "44px"
  slot-pill-active:
    backgroundColor: "{colors.ember-ink}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.control}"
  filter-tab:
    backgroundColor: "transparent"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  filter-tab-active:
    backgroundColor: "{colors.iron-bg}"
    textColor: "{colors.iron-ink}"
  input-field:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "48px"
  bench-card:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.card}"
  booking-card:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.card}"
    padding: "36px"
---

# Design System: Khe Nâu

## Overview

**Creative North Star: "Roaster Instrument & Brass Scale"**

Khe Nâu's visual system treats the web page as a calibrated roasting bench and unbleached tasting ledger rather than a decorative hospitality brochure. Two contrasting material grounds alternate cleanly across full-width bands: matte anodised slate-iron anchors navigation, primary machinery framing, and closing sections, while warm unbleached ledger paper carries schedules, offerings, and interactive reservation forms.

Structure relies on continuous 1px hairline seams, millimeter ruler ticks, and tonal shifts instead of rounded soft cards or ambient drop shadows. Active controls are disciplined and quiet until touched: brushed brass marks calibration, active states, and structural ticks, while roast-ember terracotta is isolated strictly for primary booking actions and active selection focus.

**Key Characteristics:**
- Dual-world polarity alternating between matte slate-iron (`#181a1d`) and unbleached tasting ledger paper (`#f3ede2`)
- Continuous `1px` architectural hairline seams and sharp `0px` structural framing paired with `2px` micro-control corners
- Ground-calibrated brushed brass accents (`#d4a65a` on dark, `#8e6220` on paper) for scroll calibration, ruler scales, and structural ticks
- Isolated roast-ember terracotta (`#b8431b`) reserved for primary booking calls-to-action, active slot framing, and keyboard focus rings
- Expressive grotesk display headings paired with readable Vietnamese sans-serif prose and tabular monospace numerals

## Colors

A disciplined dual-surface palette pairing dark slate-iron and warm paper neutrals with ground-calibrated brushed brass and a single high-contrast terracotta action signal.

### Primary
- **Roast Ember** (`#b8431b`): Primary action accent used exclusively for primary booking buttons, active slot borders, keyboard focus outlines (`2px` solid), active selection highlights, text caret, and highlighted category borders. Pairs with **Ember Ink** (`#fffdf8`) for high-contrast button text.
- **Roast Ember Hover** (`#9f3714`): Darkened terracotta state reserved for primary button hover transitions.
- **Ember Ink** (`#fffdf8`): Warm off-white foreground used for text inside Roast Ember buttons, text selections, and the active illuminated fill on selected time-slot pills.

### Secondary
- **Iron Brass** (`#d4a65a`): Bright brushed brass calibrated for dark slate-iron surfaces—used on the brand mark outline, scroll-progress hairline, nav hover underlines, photo corner registration ticks, footer column headings, and scrollbar hover states.
- **Paper Brass** (`#8e6220`): Deep tarnished brass calibrated for light paper surfaces—used on the millimeter ruler SVG pattern, underlined text links, and hover borders on form inputs.

### Neutral
- **Iron Ground** (`#181a1d`): Deep matte anodised slate-iron background for the fixed header, opening hero canvas, media frame backdrops, active filter tabs, and footer. Also serves as **Paper Ink** (`#181a1d`) for primary typography and high-contrast rule lines on light paper bands.
- **Iron Surface** (`#202328`): Recessed dark slate-iron used inside image frame backdrops and the mobile menu toggle button.
- **Iron Ink** (`#f3ede2`): Warm cream foreground text on dark slate-iron bands. Identical in value to **Paper Ground** (`#f3ede2`) so dark text on light bands and light text on dark bands share one tonal anchor.
- **Iron Muted** (`#b6afa3`): Secondary muted ink on dark slate-iron surfaces for subheadlines, fact labels, and footer metadata.
- **Paper Ground** (`#f3ede2`): Primary unbleached ledger paper ground for light content bands, the hero tasting bench panel, and default form fields.
- **Paper Surface** (`#e7dfd0`): Recessed warm stone-paper used for alternating ledger bands, ruler headers, inactive slot pills, and guest-stepper hover backgrounds.
- **Paper Card** (`#faf6ee`): Crisp elevated cream-paper sheet reserved for structured form and legal ledger containers and the skip-to-content link.
- **Paper Muted** (`#5b4a38`): Warm umber-brown secondary ink on paper grounds for notes, price numerals, inactive slot text, and placeholder copy.
- **Iron Seam / Iron Seam Strong** (`rgba(243, 237, 226, 0.14)` / `rgba(243, 237, 226, 0.28)`): Translucent hairline borders dividing dark slate-iron grids, navigation seams, and footer bands.
- **Paper Seam / Paper Seam Strong** (`rgba(24, 26, 29, 0.14)` / `rgba(24, 26, 29, 0.28)`): Translucent hairline borders dividing ledger rows, panel edges, form inputs, and band transitions on paper surfaces.
- **Error Ink** (`#b42318`): Semantic crimson reserved solely for invalid input borders (`2px` solid) and inline field error messages.

### Named Rules
**The Ember Isolation Rule.** Roast Ember (`#b8431b`) is strictly an active interaction and focus signal—never use it as a background band, decorative badge fill, or passive heading color.
**The Dual-Ground Brass Rule.** Never cross-wire brass tokens across grounds: use Iron Brass (`#d4a65a`) exclusively on dark `#181a1d` / `#202328` surfaces and Paper Brass (`#8e6220`) exclusively on `#f3ede2` / `#e7dfd0` / `#faf6ee` paper surfaces.

## Typography

**Display Font:** `Bricolage Grotesque` (fallback: `"Be Vietnam Pro", system-ui, sans-serif`)
**Body Font:** `Be Vietnam Pro` (fallback: `system-ui, -apple-system, sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (fallback: `ui-monospace, monospace`)

**Character:** Compact, slightly quirky grotesk display proportions establish mechanical warmth and character, while geometric Vietnamese-first sans-serif body copy ensures crisp diacritic legibility and tabular monospace locks numeric schedules and ledger prices into vertical alignment.

### Hierarchy
- **Display** (`600`, `clamp(2.25rem, 4.1vw, 3.65rem)`, `line-height: 1.05`, `letter-spacing: -0.03em`): Primary page `h1` hero headline with `text-wrap: balance` and tight `16ch` max measure.
- **Headline** (`600`, `clamp(1.875rem, 3vw, 2.75rem)`, `line-height: 1.14`, `letter-spacing: -0.025em`): Section `h2` headers paired beside right-aligned explanatory notes, and closing footer headline (`clamp(2rem, 3.6vw, 3.25rem)`).
- **Title** (`600`, `1.25rem`–`1.375rem`, `line-height: 1.2`, `letter-spacing: -0.02em`): Instrument bench headline (`1.375rem`) and ledger column group titles (`1.25rem`).
- **Body** (`400`, `1rem`, `line-height: 1.6`): General prose with `text-wrap: pretty` and a `66ch` maximum measure; hero subcopy scales subtly (`clamp(1rem, 1.15vw, 1.125rem)`, `line-height: 1.55`).
- **Label** (`500`, `0.8125rem`–`0.9375rem`, `line-height: 1.4`): Form labels (`0.875rem`), control captions (`0.8125rem`), navigation links (`0.9375rem`), and buttons (`0.9375rem`, `0.875rem` small).
- **Mono / Tabular** (`500`, `0.8125rem`–`0.9375rem`, `font-variant-numeric: tabular-nums`): Slot pill times (`0.875rem`), guest counter readout (`0.9375rem`), schedule hours, durations, and ledger prices (`0.875rem`).

### Named Rules
**The Tabular Ledger Rule.** Apply `JetBrains Mono` with `font-variant-numeric: tabular-nums` to all clock times, counts, durations, and currency values so right-aligned ledger columns never jitter or misalign.

## Layout

Content spans full-bleed alternating dark and light bands centered within a `1240px` (`--wrap-max`) maximum container. Horizontal page gutters scale in three steps: `24px` below `768px`, `48px` from `768px` to `1199px`, and `64px` from `1200px` upward. Section vertical padding scales identically (`64px` mobile, `84px` tablet, `96px` desktop).

A fixed header sits `72px` tall (`64px` below `768px`), and `html` offsets anchor scrolling by `calc(var(--nav-h) + 20px)`. Multi-column compositions follow asymmetric, instrument-grid proportions on desktop (`1.38fr` hero lead / `0.92fr` bench panel; `1fr` / `1.05fr` visit split; `3` equal menu ledger columns; `4` square craft tiles; `2` equal booking columns; `1.4fr` + `4` equal footer columns) and collapse cleanly to `2`-column and `1`-column stacks at `<= 1023px` and `<= 767px`.

## Elevation & Depth

This system uses a **hybrid flat-by-default hairline architecture**. Structural panels, ledger columns, cards, and media frames carry zero ambient drop shadows; depth and visual separation come from alternating ground polarity (`#181a1d` vs `#f3ede2`), recessed surface steps (`#e7dfd0` vs `#faf6ee`), and `1px` hairline seam contrast (`0.14` standard dividers, `0.28` perimeter and group boundaries).

Elevation shadows appear strictly on interactive ember triggers and the active illuminated time-slot control to give tactile affordance without floating static layout surfaces.

### Shadow Vocabulary
- **Ember Resting** (`box-shadow: 0 2px 6px rgba(24, 26, 29, 0.22)`): Subtle grounding lift on primary Roast Ember CTA buttons at rest.
- **Ember Hover** (`box-shadow: 0 6px 14px rgba(24, 26, 29, 0.28)`): Directional lift paired with `translateY(-1px)` on Roast Ember button hover.
- **Active Slot Illumination** (`box-shadow: 0 2px 6px rgba(142, 98, 32, 0.2)`): Warm brass glow cast beneath the currently pressed time-slot pill (`aria-pressed="true"`).

### Named Rules
**The Flush Seam Rule.** Static cards, ledger sheets, and photographic frames sit flush at `0px` elevation with `1px` borders—never add drop shadows to structural containers.

## Shapes

Form language is crisp and architectural, distinguishing large structural geometry from small tactile controls:
- **Sharp Structural Corners (`0px`):** All outer grids, flush bench cards, booking cards, legal cards, and photographic frames use `0px` corners with continuous `1px` perimeter strokes.
- **Machined Micro-Control Corners (`2px`):** Buttons, slot pills, guest stepper frame and buttons, filter tabs, inputs, selects, skip links, and keyboard focus outlines share a tight `2px` (`--r-control`) radius.
- **Status Indicator Dots (`999px`):** Full-round geometry is restricted strictly to `7px` active indicator dots (inside slot pills and current-day schedule markers) and the browser scrollbar thumb.
- **Calibration Accents:** The hero media frame carries `12px × 12px` `1.5px` Iron Brass corner registration ticks inset `10px` from each corner, while the bench panel is crowned by a `12px`-tall repeating SVG millimeter brass scale.

## Components

Interactive controls pair crisp `2px` machining and `140ms` `cubic-bezier(0.16, 1, 0.3, 1)` transitions with unambiguous active and focus states (`2px` solid Roast Ember outline, `3px` offset).

### Buttons
Tactile, flat-machined controls with subtle lift and directional arrow extension on hover.
- **Shape:** Tight `2px` radius (`--r-control`), `46px` minimum height (`40px` compact navigation size), `0 22px` horizontal padding (`0 18px` small).
- **Primary:** Roast Ember fill (`#b8431b`), Ember Ink text (`#fffdf8`), `500` weight, `0.9375rem` size (`0.875rem` small), and Ember Resting shadow.
- **Hover / Focus:** Transitions over `140ms` (`cubic-bezier(0.16, 1, 0.3, 1)`) to Roast Ember Hover (`#9f3714`), `translateY(-1px)`, and Ember Hover shadow; active press compresses to `scale(0.985)`. Inline arrow SVG stems scale horizontally from `0.35` to `1` while arrowheads translate `+3px`.
- **Inline Text Link:** Transparent text button (`500` weight, `0.9375rem`) with a `1.5px` brass underline offset by `5px` that shifts to Roast Ember and slides its trailing arrow `+3px` on hover.

### Chips
Compact toggleable pills and category tabs with stark contrast between quiet rest and active selection.
- **Time-Slot Pill:** `2px` radius, `44px` minimum height, tabular monospace `0.875rem` text, `1px` strong paper seam border on `#e7dfd0` surface with a `7px` muted dot. Hover darkens border and ink to `#181a1d`. Selected (`aria-pressed="true"`) illuminates with `#fffdf8` fill, `#181a1d` ink, `#b8431b` border, active ember dot, and Active Slot Illumination shadow.
- **Category Filter Tab:** `2px` radius, `40px` minimum height, `0 16px` padding, transparent background with `1px` strong seam border on paper. Selected (`aria-selected="true"`) inverts cleanly to `#181a1d` fill and `#f3ede2` ink.

### Cards / Containers
Flush architectural containers separated by `1px` seams rather than elevated boxes.
- **Corner Style:** Sharp `0px` corners across all containers.
- **Background:** `#f3ede2` on the flush hero instrument bench; `#faf6ee` on standalone booking and legal ledger sheets; transparent directly on `#e7dfd0` / `#f3ede2` for hairline ledger columns.
- **Shadow Strategy:** Zero shadows (per The Flush Seam Rule).
- **Border:** `1px` solid `--paper-seam-strong` perimeter (`1px` solid `#181a1d` top rule on ledger columns and visit panels).
- **Internal Padding:** `18px 24px` per stacked bench unit (`16px 20px` mobile); `28px` mobile / `36px`–`40px` tablet+ on booking and legal cards.

### Inputs / Fields
Accessible, high-contrast `48px`-tall fields designed for immediate legibility on warm paper.
- **Style:** `2px` radius, `1px` solid `--paper-seam-strong` stroke, `#f3ede2` fill, `#181a1d` text (`1rem`), `0 14px` horizontal padding; select fields use native appearance reset with an inline dark chevron SVG. Numeric guest stepper wraps two `40px` buttons and a tabular value readout inside a `6px`-padded `#faf6ee` frame.
- **Focus / Synced:** `2px` solid `#b8431b` outline with `2px` offset and pure `#ffffff` background. Programmatic sync from the hero bench flashes a `#b8431b` border and `#ffffff` fill for `650ms`. Hover shifts border to Paper Brass (`#8e6220`).
- **Error / Disabled:** Invalid fields (`aria-invalid="true"`) switch to a `2px` solid `#b42318` border paired with `0.875rem` `#b42318` helper text; disabled stepper buttons drop to `0.45` opacity.

### Navigation
Matte, scroll-calibrated top bar anchored across every page, collapsing to a full-screen mobile drawer and contextual bottom action bar.
- **Desktop Bar:** Fixed `72px` `#181a1d` bar with `1px` bottom `--iron-seam` border, left brass-and-cream brand mark (`24px` SVG + `1.375rem` `Bricolage Grotesque`), center `0.9375rem` links with `1.5px` Iron Brass center-left growing underlines on hover/active section, right compact Ember CTA, and a full-bleed `2px` bottom scroll-progress line (`scaleX` driven by `--scroll-progress`).
- **Mobile Treatment:** Below `768px`, bar shrinks to `64px` with a `44px × 44px` `#202328` hamburger toggle opening a full-viewport `#181a1d` link sheet (`56px` row height) and pinned full-width Ember CTA. A separate `mobile-bar` slides up from the bottom (`240ms`) only when the hero, booking section, and footer are all out of view.

### Signature Component: Calibrated Media Frames & Aperture Reveal
Sharp `0px` `#181a1d`/`#202328` image frames (`1px` strong seam border) with subtle `550ms`–`700ms` hover zoom (`scale(1.025)`–`1.05`) and intersection-triggered shutter reveals (`clip-path: inset(0 0 12% 0)` -> `inset(0 0 0 0)` over `680ms`). The primary hero frame adds `12px` Iron Brass corner registration ticks; interactive `1:1` craft tiles dim to `0.48` opacity and highlight with `#b8431b` borders in sync with menu category filters. All motion collapses to `0.001ms` under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

### Do:
- **Do** alternate `#181a1d` slate-iron and `#f3ede2` / `#e7dfd0` paper bands with `1px` hairline seams to establish section boundaries.
- **Do** match brass tones to their host ground: Iron Brass (`#d4a65a`) on dark grounds and Paper Brass (`#8e6220`) on light paper grounds.
- **Do** keep structural cards, panels, and photographic frames at `0px` border radius and `0px` box-shadow elevation.
- **Do** apply `JetBrains Mono` with `tabular-nums` on every time slot, guest count, opening hour, and numeric price column.
- **Do** preserve `44px`–`48px` minimum heights and `2px` solid `#b8431b` keyboard focus rings across all interactive controls.

### Don't:
- **Don't** use Roast Ember (`#b8431b`) for section backgrounds, decorative pills, badges, or passive headings—reserve it strictly for booking actions, active selection state, and focus rings.
- **Don't** round cards, photo frames, or ledger panels beyond `0px`, and don't round small controls beyond `2px`.
- **Don't** add ambient drop shadows to static cards or containers; reserve shadows strictly for Roast Ember buttons and the pressed slot pill.
- **Don't** exceed `66ch` on paragraph line lengths or bypass `prefers-reduced-motion` safeguards on scroll and shutter animations.
