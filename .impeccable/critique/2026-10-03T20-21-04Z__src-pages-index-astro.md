---
target: homepage
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/iggysleepy/dev/web/frontend/personal-website/src/pages/index.astro"
target_fingerprint: "sha256:5e8a18c20e19ee9e5b82571495418dd0015f2c19dae282dba22a4777c5016ce7"
target_path: /Users/iggysleepy/dev/web/frontend/personal-website/src/pages/index.astro
timestamp: 2026-10-03T20-21-04Z
slug: src-pages-index-astro
---
# Homepage critique (src/pages/index.astro)

Method: dual-agent (A design review, B detector + browser).

## Design health: 22/32 (7 and 10 n/a)
1 Status 3 · 2 Real world 2 (résumé under "Get in touch"; RU greeting in English) · 3 Control 3 · 4 Consistency 3 (heading case mixed) · 5 Error prevention 3 (card image plays prototype, only caption opens study) · 6 Recognition 2 (project names sr-only, roles not shown, résumé hidden) · 8 Minimalism 3 (7 side projects 2127px vs 4 studies 1483px) · 9 Recovery 3.

## Specificity
Visual layer authored (handwritten hello, dithered sky, pigment cards, playable screens). Copy layer interchangeable: value statements, no facts (sole designer/engineer, 60→5 s, 3.1→3.7, 22bytes) on the homepage. Detector: 8 warnings, all false positives or deliberate (stop-motion wobbles flagged as bounce; Instrument Serif; Arial inside simulated Instagram UI).

## Priority issues
- [P1] No professional proof in first 30 s: add one factual line from the résumé under "Product designer." plus a 3-line experience strip (PizzaSushiWok/SuperGood 2023–24, 22bytes 2023, Paycos 2024–25).
- [P1] Résumé hidden: link 7/7 in the contact disclosure and last footer link. Give it its own header link and repeat it by the experience strip.
- [P1] Work captions hide project name and role (WorkCaption.astro renders pitch/tag/year only; `responsibility` unused). Show name · role · status, lead with outcome.
- [P2] Side projects outweigh case studies: keep 3 design-minded ones.
- [P2] About is a 195/180-word origin story: ~70 words starting with engineer → game design → product design; personal parts behind a reveal or the blog. Wording to Igor for approval.

## Personas
Design lead: no names/roles/numbers, résumé invisible, image click plays prototype. Recruiter: no "junior", location, keywords. Mobile: 6100px, résumé last, "try clicking around" on touch, 18 targets < 44px.

## Minor
RU handwritten greeting in English; page ends on "proud boyfriend"; profile-music-today.webp fetched 3×; .docx résumés published unlinked.

## Lead's feedback
Glavred: partly (softeners «во многом», «по-настоящему», «что-то»×3). Life story: agree. Reference experience: partly (3-line strip). Skills list: mostly disagree (cards prove it; make the résumé one click away).

## Cursor idea
Use for explaining interactions (play vs read, side-project labels); never as the only carrier of facts (touch/keyboard).

## Questions
Joyful or 60→5 s as the remembered line? Personal paragraphs behind a fold? Which 3 side projects show design thinking?
