# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: design leads hiring interns and junior product designers. They skim a case study for judgment in about 30 seconds (what was the outcome, what was Igor's role, does the work look good), then read the decisions in depth if hooked. Secondary: recruiters skimming for role, outcome, and polish. The site is bilingual (English at `/`, Russian under `/ru/`).

## Product Purpose

Igor Kupchinenko's personal website and portfolio. It earns an internship or junior product design role by showing real shipped and concept work, Igor's design judgment, and his craft. Success: a design lead understands each case study's outcome and Igor's part in it at a glance, and wants to keep reading.

## Positioning

A junior designer who also builds what he designs: he was the only designer and mobile engineer on SuperGood, designed and launched Observatory, and built Two Sticks end to end. The case studies show decisions backed by research and measured results, at junior/internship level and without inflated seniority.

## Operating Context

Read in a desktop browser after a portfolio link from a résumé or application, sometimes on a phone. Four case studies, ranked: SuperGood (food delivery app, 2024), Observatory (macOS developer tool, 2026), Instagram Saves (social app concept, 2026), Two Sticks (Chinese learning Telegram bot, 2024). A case-studies listing and the homepage work cards link into them.

## Capabilities and Constraints

- Astro static site, semantic HTML, component-scoped CSS, small progressive TypeScript enhancements. No client framework. Content must read without JavaScript.
- Case-study content that must survive any redesign: the information, the STAR summary (Situation, Task, Action, Result), the decisions, the metrics, and Igor's plain first-person writing style. Wording changes are proposed to Igor, not made silently.
- Every public fact, metric, and responsibility is verified; nothing may be invented. No em dashes in public copy.
- Media follows the contract in `docs/MEDIA_PERFORMANCE.md`.

## Brand Commitments

- Igor's own world: the dithered-sky opening, his real handwriting and doodles, soft pigment-blur textures behind the work cards, a light field.
- Hand-drawn marks are Igor's real drawings only (`src/assets/art/`), used rarely and where they mean something. Never generated imitations.
- Fonts by role on case studies: Crimson Text 400 for headings, Instrument Sans for everything else, Instrument Sans Semibold for emphasis. Observatory keeps its Averia wordmark.

## Evidence on Hand

Product screens for every study in `src/assets/case_study_images/`, homepage card textures in `src/assets/showcase-cards/`, Instagram walkthrough films and wireframes, Observatory's launch film and archive footage, research figures written into each case-study page. Old-version screenshots exist only where pages already use them; do not fabricate before states.

## Product Principles

- The work leads; words explain the decision behind it.
- Outcome first, then the reasons. Understandable in 30 seconds, richer for anyone who keeps reading.
- Honest numbers: say where each result comes from and how far it can be trusted.
- One memorable thing per section, nothing decorative that carries no meaning.

## Accessibility & Inclusion

Visible keyboard focus, 44px touch targets, reduced-motion alternatives that keep meaning, essential meaning never dependent on color, motion, hover, or JavaScript.
