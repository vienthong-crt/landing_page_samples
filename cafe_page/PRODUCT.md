# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Local specialty coffee drinkers and enthusiasts in Ho Chi Minh City looking to book a 60-minute counter tasting session or check brew-bar hours, location, and daily offerings before visiting.

## Product Purpose

Give prospective visitors a clear, reliable way to check Khe Nâu's opening schedule, browse its espresso, manual-brew, and 250 g roasted-bean offerings, and reserve a seat at the 6-seat tasting counter.

## Positioning

A small-batch craft roastery and hand-brew counter built around Vietnamese single-origin beans (Cầu Đất, Khe Sanh, Đắk Nông), small-batch roasting on Monday and Thursday mornings, and intimate 60-minute guided tastings capped at six guests per slot.

## Operating Context

- **Counter tastings:** 60-minute sessions capped at 6 guests per slot (`09:30–10:30`, `14:00–15:00`, `16:00–17:00`). Bookings require date, slot, guest count (1–6), name, and confirmation email, and take effect once confirmed by email. Rescheduling or cancellation requires at least 4 hours' notice (`terms.html`).
- **Walk-in brew bar & roast cadence:** Walk-in guests are served during open counter hours; Mondays are reserved for roasting new batches (`index.html`, `terms.html`).
- **Privacy commitment:** Booking form data is used strictly to confirm or adjust tasting slots and is never shared with third parties or used for promotional mailings (`privacy.html`).

## Capabilities and Constraints

- **Architecture & language:** Plain static HTML, CSS, and ES modules (`index.html`, `credits.html`, `privacy.html`, `terms.html`, `assets/`), Vietnamese-only (`lang="vi"`).
- **Static booking flow:** The reservation form currently runs without a backend (`mailto:` fallback, `data-endpoint=""`), preserving entered input on connection errors.
- **Confirmed operational caps:** 60-minute tasting duration, maximum 6 guests per session, 4-hour advance notice for changes/cancellations.
- **Explicitly undecided facts (marked `data-assumed` in `index.html`):**
  - Exact street address (currently District 3, TP. Hồ Chí Minh only).
  - Exact opening hours (provisional Tue–Fri `7:30–17:30`, Sat–Sun `8:00–18:00`, Mon closed).
  - Exact VND pricing for drinks, 250 g bags, and the per-guest tasting fee.
  - Production contact email, canonical domain (`khenau.vn` currently commented out; `hello@khenau.example` placeholder), and live booking endpoint (`data-endpoint`).

## Brand Commitments

- **Brand name:** Khe Nâu (`names.json` checked on 2026-11-18; no conflicting Vietnamese coffee business or active `khenau.com` / `khenau.vn` domain found).
- **Voice:** Vietnamese sensory-factual prose in second person and present tense for craft and space descriptions; direct, unadorned copy for prices, hours, policies, and booking controls.
- **Core brand assets:** `favicon.svg`, `share.jpg`, and attributed photo set in `assets/img/` (`credits.html`).

## Evidence on Hand

- **Existing pages:** `index.html`, `credits.html`, `privacy.html`, `terms.html`.
- **Name verification:** `names.json` documenting the 2026-11-18 conflict search for "Khe Nâu" and domains.
- **Photography:** 10 Wikimedia Commons photographs in `assets/img/` with full author and license credits in `credits.html`.
- **Absences not to fabricate:** Do not invent a street address, phone number, social media accounts, customer testimonials, press quotes, verified pricing, or a live backend endpoint; Khe Nâu's own venue/roastery photographs are not yet supplied.

## Product Principles

1. **Preserve confirmed facts and surface uncertainty honestly:** Keep undecided address, hours, prices, and endpoint clearly provisional rather than inventing specifics.
2. **Respect physical counter limits:** Every booking flow and piece of copy must reflect the 60-minute duration and 6-guest counter cap.
3. **Keep core visitor paths effortless:** Location, hours, menu/roast offerings, and tasting booking must work cleanly on a static site with zero backend dependencies.
4. **Honor data minimalism and attribution:** Collect only the fields needed for tasting confirmation (`privacy.html`) and retain photograph credits (`credits.html`).

## Accessibility & Inclusion

- Vietnamese screen-reader landmarks, skip link (`#top`), descriptive image `alt` text, accessible form error associations (`aria-describedby`), live status announcements (`role="status"`), and `48px` minimum interactive form targets.
