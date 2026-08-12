# Hiring-first website redesign plan

Last updated: 2026-08-11

## Objective

Redesign Igor's personal website to maximize his ability to get hired as a product designer while preserving the website as an authored artistic work.

The redesign must make the following clear without requiring exploration:

1. This is Igor, introduced conversationally rather than as a formal nameplate.
2. Igor is a product designer.
3. Igor's strongest relevant product work is available immediately.
4. Igor can frame problems, make defensible design decisions, produce strong interaction and visual work, and carry products into working artifacts.
5. A hiring visitor can reach a case study, résumé, or contact path without decoding the site.

## Authorities

Use the smallest relevant source and do not duplicate it into implementation code:

1. Igor's latest explicit instruction.
2. `docs/CONCEPT_DESIGN.md` and `storyboards/` for approved experience and art direction.
3. Verified public evidence already present in the repository. The files named `docs/CONTEXT_ABOUT_IGOR.md` and `docs/PERSONAL_CONTEXT.md` are currently absent and must not be assumed.
4. `docs/ARCHITECTURE.md` for technical boundaries after milestone 0 reconciles it with this redesign.
5. This file for execution order.
6. `docs/PROGRESS.md` for current status and verification records.

## Approved decisions

- Goal number one is hiring Igor as a product designer.
- Remove the separate `/secret-box/` route.
- Make the box animation the opening section of `/`, in the same document as the continuous homepage.
- Drive the authored frames in `src/assets/art/Doodles-box-opening/` from ordinary scroll progress.
- Test a compact saturated palette as part of the frame sequence. Keep each moment flat and legible, cut colors with frame changes, and avoid decorative spheres or a separate ambient background animation.
- Keep the verified frame-color changes and the approved frame-6 pigment handoff. The color field must originate inside the opened box, illuminate the field and drawing before crossing in front, grow past full coverage, and clear through a brief distorted echo of the same field. Use the approved Imperial Blue, Cloudy Sky, Alice Blue, Mustard, Tiger Flame, Cinnabar, and Magenta swatches as one layered gradient; magenta is only a thin outer accent and purple is excluded. Shape it as one connected, asymmetric energy field whose calm center accelerates into fan-like directional reaches, then bend those reaches through restrained fluid folds and eddies. Do not turn it into straight stripes, repeated color wedges, dense turbulence, glossy liquid imitation, neon-dominant color, separate droplets, geometric afterimages, or an unrelated full-screen graphic.
- Treat the transparent frames as color-flexible assets that may be inverted or recolored for the chosen surfaces.
- Replace the empty four-direction Home with a continuous homepage.
- Make the box reveal Igor, not merely navigation.
- Keep the unopened box free of name-and-role labels. Reveal `Hello, I’m Igor.`, `Product designer.`, the positioning statement, and direct work access through the pigment field as the box opens.
- Make product work one direct action from the first revealed viewport.
- Keep deep case studies as separate documents.
- Present all verified work on a dedicated `/work/` document. Product design leads; games and technical experiments follow with their authored media and honest prominence.
- Remove the graphite field, persistent grain system, and complex shared-world treatment.
- Use a #F8F8F8 portfolio field with black ink and controlled joyful color. Keep dark treatments local to media that needs them.
- Render personal doodles only as simple CSS background images that scroll normally with the page.
- Preserve authentic drawings, portrait interaction, craft values, purposeful imperfections, and the approved paper invitation.
- Remove hub-and-spoke compositions, long dotted connectors, repeated route labels, and excess background doodles.
- Prefer proximity, alignment, hierarchy, and negative space over explanatory lines.
- Do not turn the redesign into a corporate portfolio template, card grid, or generic personal-brand landing page.
- Replace the rigid full-width navigation bar with a side-mounted Work and contact control that arrives with the opened box. The contact action uses the existing Connect drawing and expands the contact links. Writing remains discoverable in the main document rather than duplicated in global navigation.
- Use the existing hand-drawn destination icons as section indicators on both the homepage and work page. They retain hover character but no longer gate content.
- Use Averia Serif Libre for portfolio headings and Delius for explanatory copy, personal labels, and controls.
- Align the homepage to one centered content spine. Reserve the side gutters for sparse background doodles and tighten the hero-to-values handoff so negative space frames the content rather than separating related sections.

## Information architecture

### Continuous personal homepage

`/`

The homepage is one document. It begins with the scroll-controlled box opening, then continues in ordinary vertical document flow. Its content appears in this order:

1. Box opening and centered homepage reveal.
2. Identity and professional proposition.
3. Three craft values directly beneath the introduction, without a separate About section or label.
4. Writing.

The side-mounted Work and contact control remains available after the box opens; contact is not repeated as a fifth content section.

The first revealed viewport must provide a direct work action. The homepage must not repeat the complete portfolio beneath the introduction.

The opening must use normal page scrolling. It must not intercept wheel or touch input, force smooth scrolling, use mandatory scroll snapping, or require the visitor to wait for a timed sequence. A fast scroll may complete the decorative sequence immediately.

The unopened box is deliberately quiet. It must not carry floating identity labels. The revealed hero opens with `Hello, I’m Igor.` and keeps `Product designer.` next to that greeting.

### Separate documents

- `/case-studies/observatory/` remains a separate editorial case study.
- `/work/` is the complete authored work presentation.
- A second case study is added only after an evidence audit identifies a project that can honestly support one.
- Individual approved Blog articles may remain separate documents.
- Existing public and compatibility URLs must continue to reach an appropriate destination.

### Homepage anchors

Use simple semantic anchors rather than destination disclosures:

- `/#values`
- `/#writing`
- `/#contact`

Work uses `/work/#product-design` and `/work/#games`.

Old fragments and compatibility paths should forward or resolve to the closest new section without trapping visitors in obsolete states.

## Opening composition requirements

The resting composition revealed by the box must answer four questions immediately:

- Who: Igor, introduced warmly as `Hello, I’m Igor.`
- What: Product designer, stated beside the greeting.
- Value: one concise, evidence-compatible positioning statement approved by Igor.
- Next: selected product work.

The composition should include:

- A warm first-person introduction with the role visible beside it.
- The existing authored headline `I build experiences, then the systems that make them real.` if Igor retains it.
- One authored portrait or self-drawing.
- At most one short, direct supporting sentence. Do not repeat the complete About section in the opening.
- A semantic link to selected work.
- Reachable résumé and contact paths.
- A direct semantic link to the dedicated work page.

The identity information must remain available in the resting homepage. It must not disappear after an introductory animation.

## Work-page content model

### Selected product work on `/work/`

Observatory leads the section and receives the greatest visual weight.

Its work-page record must show:

- A strong final-product image or restrained motion artifact.
- The product problem in concise language.
- Igor's verified role and contribution.
- The working outcome.
- A primary case-study link.
- Launch film, source, and download only as secondary destinations.

### Second case study

Do not choose the second case by visual polish alone. Audit existing projects for:

- A real problem and audience.
- Clear individual contribution.
- Research, constraints, or feedback that affected decisions.
- Meaningful iteration.
- A final artifact.
- An honest outcome or learning boundary.
- Collaboration evidence where available.

If no current project meets that threshold, keep the slot unfilled and record the evidence gap. Do not manufacture a case study.

### Supporting work

Each supporting artifact should communicate, concisely:

- What problem or opportunity it addressed.
- What Igor owned.
- One consequential decision.
- The result or honest status.

Replace junior or ambiguous framing such as `Learned along an artifact` with approved ownership-oriented language such as `What I owned`, `My contribution`, or another accurate title.

### Play and experiments

Use this section to show interaction craft, systems thinking, atmosphere, motion, and technical curiosity. Keep it visually lively but clearly secondary to selected product work.

### Personal context

Reuse the strongest approved material from the current Who I am experience:

- Real and drawn portrait interaction.
- The authored introduction.
- Craft values.
- Changing-word interactions where they remain legible and purposeful.
- The paper invitation revealed after completing the values.

Do not recreate the current central Who I am hub or its connector spokes. Place the invitation area locally beside or beneath the values it depends on.

### Writing and contact

- Show only approved writing, with product-relevant writing prioritized when available.
- Keep email, LinkedIn, and résumé immediately usable in the persistent contact disclosure. Do not repeat them in a final homepage contact section.
- Add availability, location, or working-arrangement information only after Igor explicitly verifies the facts.
- Verify contact layout at common laptop heights so the primary email cannot be clipped.

## Visual composition rules

The visual direction is handmade minimalism on a clean, high-contrast surface system.

- One primary message per viewport.
- Product evidence has more visual weight than decoration.
- No central navigation hub.
- No hub-and-spoke connector system.
- No long decorative connector crossing the viewport.
- Use at most one short connector when it explains a real local sequence.
- Do not use a line when proximity can communicate the relationship.
- Use personal doodles only as sparse CSS background images with ordinary `background-attachment: scroll` behavior.
- Do not render background doodles as individual interactive or stateful DOM elements.
- Do not use parallax, independent doodle animation, pointer behavior, or route-aware doodle placement.
- Keep background images away from important text and product imagery.
- Use negative space to separate groups, not to create unexplained distance.
- Keep authentic imperfections in drawings and edges without making alignment or reading order ambiguous.
- Use Delius for authored character, explanatory copy, labels, and controls. Use Averia Serif Libre for headings so the reading hierarchy does not depend on outlined display lettering.
- Keep one controlled accent treatment at a time.
- Do not enclose every item or section in a card.
- Motion must reveal hierarchy or state. It must not delay access to evidence.

## Observatory case-study corrections

Before treating Observatory as final hiring evidence:

- Add a finished-product visual to the opening.
- Preserve the clear role, interview count, working outcome, and transparent AI-directed build description.
- Add duration, team context, constraints, or success criteria only where verified.
- Correct the current `Validation` evidence boundary.
- Do not say users disliked something or that a change drastically improved it unless documented testing supports that statement.
- Label design critique, task analysis, exploratory research, usability testing, and product outcome accurately and separately.
- Identify synthesized statements as synthesized rather than presenting them as verbatim participant quotes.
- Evaluate the outcome against honest success criteria without inventing business metrics.
- Share and promote the case-study root URL, not a fragment that skips its summary.

## Milestones

Complete and verify one milestone before beginning the next.

### 0. Reconcile documentation and evidence

- Update `docs/CONCEPT_DESIGN.md` with the approved hiring-first direction.
- Update `docs/ARCHITECTURE.md` to replace the fragment-disclosure model with the continuous homepage model.
- Inventory current public claims and record missing evidence sources.
- Mark the existing four-direction and spatial-disclosure presentation as legacy.
- Preserve the current implementation as a working reference while the new static structure is built.

Exit condition: concept, architecture, plan, and progress documents describe the same redesign and do not direct implementation toward the rejected Home model.

### 1. Static continuous homepage foundation

- Build the new semantic homepage structure from scratch.
- Replace the persistent `WorldField` and DOM-managed doodle layer with ordinary document and section backgrounds.
- Establish section anchors and compatibility behavior.
- Add the static identity, values, and writing sequence with the persistent Work and contact control.
- Keep all essential content available without JavaScript.
- Do not add final motion during this milestone.

Exit condition: the complete homepage is readable in correct order, buildable, and navigable without the old fragment shell.

### 2. Scroll-controlled box opening and identity reveal

- Compose the first viewport around name, role, positioning, portrait, selected-work access, résumé, and contact.
- Make Observatory visible in or at the first-viewport edge.
- Replace the deleted legacy frames with `src/assets/art/Doodles-box-opening/`.
- Map the eight box frames to a short sticky section driven by ordinary scroll progress.
- Use the verified frame-6 pigment field as the production handoff. Keep its irregular low-resolution contour, short coverage overshoot, and fragmented radial echo connected to ordinary scroll progress.
- Keep the scroll-controlled interval short enough to complete within less than one additional viewport of scrolling.
- Allow fast forward and backward scrolling to advance or reverse the decorative sequence naturally.
- Support skip, keyboard, touch, no-JavaScript, and reduced-motion behavior.
- Remove the obsolete `/secret-box/` page and its legacy timed component after the new root opening is verified.

Exit condition: a five-second test identifies Igor, Product Designer, selected work, and the next action without explanation.

### 3. Selected product-work presentation

- Rebuild Observatory's homepage presentation around final product, problem, contribution, and outcome.
- Audit and choose the second case-study candidate.
- Reframe supporting artifacts around ownership and decisions.
- Keep games and experiments outside the primary product sequence.

Exit condition: a hiring visitor can understand Igor's strongest product-design evidence in a 30-second scan.

### 4. Personal, writing, and persistent contact

- Recompose approved Who I am content without hubs or long connectors.
- Preserve the portrait and craft-value interactions.
- Place the secret invitation locally with its triggering values.
- Build the supporting play and experiments sequence.
- Add approved writing and keep contact clear through the persistent disclosure without a redundant footer invitation.
- Verify résumé and external destinations.

Exit condition: personality and breadth enrich the professional story without competing with it.

### Compact work archive

Keep earlier, unfinished, and trajectory work visible in a compact labeled list after the featured evidence. This archive demonstrates sustained output and breadth without giving every artifact the visual weight or implied rigor of a full product-design case study.

### 5. Observatory hiring-evidence pass

- Correct validation and outcome language.
- Add the finished-product opening visual.
- Clarify verified scope, constraints, research, decisions, and results.
- Tighten scanning without flattening the editorial design.
- Verify root case-study sharing metadata and preview artwork.

Exit condition: every consequential claim is supported, clearly bounded, and understandable without Igor presenting it live.

### 6. Visual restraint and motion pass

- Remove obsolete hubs, spokes, long paths, repeated route labels, and excess doodles.
- Remove graphite and grain presentation tokens from the new homepage.
- Flatten selected personal doodles into simple, scrollable background-image compositions.
- Refine hierarchy, spacing, typography, and product-image prominence.
- Add only motion that improves reveal, orientation, feedback, or continuity.
- Use authored drawings rather than invented personal artwork.

Exit condition: every decorative element has a clear compositional purpose and the site still feels unmistakably Igor.

### 7. Responsive, accessibility, performance, and release

- Inspect at 1440 by 900, 1280 by 720, 390 by 844, and 320 by 800.
- Verify keyboard, touch, focus, reduced motion, contrast, landmarks, headings, anchor navigation, and no-JavaScript access.
- Verify no horizontal overflow and no clipped primary contact action.
- Optimize images, fonts, motion, and inactive media.
- Complete title, description, Open Graph image, canonical metadata, sitemap, RSS where useful, and `404.html`.
- Run Astro checks, production builds for both base paths, public-copy checks, and console inspection.

Exit condition: the redesigned site is deployable from a clean checkout and passes the hiring comprehension tests below.

## Final comprehension tests

### Five seconds

A new visitor can identify:

- Igor Kupchinenko.
- Product Designer.
- The nature of his strongest work.
- Where to continue.

### Thirty seconds

A hiring visitor can find:

- Observatory.
- Igor's role and contribution.
- A real outcome.
- The case study.
- Résumé and contact.

### Five minutes

A design reviewer can understand:

- The problem Igor chose or received.
- How evidence changed his framing.
- The major design decisions and tradeoffs.
- What he personally owned.
- What was built or delivered.
- What was validated, what remains uncertain, and what he would do next.

## Change control

- Do not invent facts, metrics, roles, collaborators, research, availability, or outcomes.
- Do not publish private context without explicit approval.
- Do not use em dashes in public copy.
- Preserve unrelated user work.
- Keep `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md` synchronized with implementation.
- Record completed verification in `docs/PROGRESS.md`, not in this plan.
- If a design choice changes the approved direction, update `docs/CONCEPT_DESIGN.md` before implementing it.
