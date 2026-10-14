---
target: homepage intro sentence
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/iggysleepy/dev/web/frontend/personal-website/src/components/homepage/identity/IdentityIntroduction.astro"
target_fingerprint: "sha256:6f9e159e98f8ea69ce032891f6fe01f5efc94a714be66f407893b2db4bff28d2"
target_path: /Users/iggysleepy/dev/web/frontend/personal-website/src/components/homepage/identity/IdentityIntroduction.astro
timestamp: 2026-10-14T07-41-17Z
slug: epage-identity-identityintroduction-astro-deb06e4e
---
Method: dual-agent (A: design review, B: detector + measurements)

Heuristics: 3,3,3,2,4,2,n/a,2,4,n/a = 23/32 (Good).

Priority issues:
- [P1] Ink carries two meanings: anchor "product design" (ink 400) vs doors (ink 600); 31% of sentence in ink, four near-equal ink islands, field ranks lowest. Fix: weight = read (field only), mark = open (doors only).
- [P1] Doors not discoverable at rest, no hover on touch. Fix: tone-coloured asterisk on every door site-wide (rest-mark wash rejected earlier by Igor over the sky). aria-hidden.
- [P2] Grey hero reads as secondary text; grey-sentence grammar is a body-text treatment. Fix: hero in ink regular; field semibold; beliefs keeps grey + ink doors + asterisk.
- [P2] "my work" title 34.6px outranks hero 32.6px. Fix: hero ~36px desktop.
- [P3] Mobile door hit areas ~32px; RU widow "у / них".

Detector: CLI 0 findings; browser tight-leading x2 in intro (1 false positive on <style>, 1 display-size 1.24 leading acceptable).
Contrast on sky: grey 4.44-5.08:1, ink ~12-13.7:1; tone text colours equal lightness to grey (1.01:1).
