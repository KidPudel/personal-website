# Personal Website Design Refinement Brief

Last updated: 2026-07-21

## Purpose

Refine Igor's existing personal website into a more controlled, memorable, and professionally art-directed experience without removing its warmth, handmade character, or personal notebook concept.

This is an editing and content-direction pass, not a request to replace the site with a generic minimalist portfolio.

The intended result should be visually controlled, fully handwritten, and grounded in real content.

The visitor should first encounter Igor as a real and interesting person, then understand his capabilities, and then inspect credible evidence of his work.

`docs/CONTEXT_ABOUT_IGOR.md` is authoritative for the professional and craft substance behind this brief. Visual composition may edit and clarify that evidence, but it must not change the facts, capability levels, gaps, or relationship between product, mobile, backend, and game work.

## Reference quality

The emotional reference includes qualities associated with photographic journals and reflective narrative games such as *Life is Strange*:

- personal;
- intimate;
- observant;
- slightly imperfect;
- photographic;
- youthful without being childish;
- sincere without becoming sentimental;
- calm enough for the contrast between regular handwriting and expressive display lettering to feel meaningful.

Do not copy copyrighted assets, interface elements, typography, icons, compositions, or recognizable visual motifs from *Life is Strange* game or another website.

The useful principle is contrast. The entire notebook may be handwritten, but its regular reading voice must remain calm. A small number of expressive display words, annotations, drawings, tape pieces, rotations, and distressed surfaces create emphasis. The entire interface should not look equally loud.

## Approved foundation and working design hypothesis

`Living blueprint notebook` is a working internal label, not public website copy and not implementation approval. The foundation below records choices Igor has already made. The exact compositions, motion sequences, draggable objects, responsive transformations, and project layouts must be storyboarded and reviewed before site code changes.

The website is one animated notebook that presents Igor's world. It is not a collection of unrelated paper-themed screens, a desk on which content happens to be scattered, or a professional interface decorated with notebook assets.

The hierarchy is fixed:

1. **The notebook is the website and the only primary content surface.**
2. **The desk is quiet environmental space around it.** It may establish depth and make the notebook feel physical, but it must not become a second layout canvas.
3. **Photos, screenshots, sticky notes, drawings, and scraps are attachments inside or partly overlapping the notebook.** They must have a reason to be there.
4. **Blueprint marks reveal how products and games work.** They connect evidence, behavior, state, decisions, and outcomes without turning the site into a literal engineering blueprint.
5. **Low-frame-rate paper motion makes the notebook feel handled, opened, rearranged, and discovered.** Interaction is part of the portfolio piece, not an optional decorative flourish.

All routes remain different spreads of the same notebook:

- Home is personal and portrait-led, with Igor's raw values in the same notebook.
- Work uses blueprint-like construction marks in both Software and Games modes.
- Games uses pixel art printed, drawn, or placed on paper rather than switching into a dark retro interface.
- Blog reads as writing inside the notebook, not as a separate publication template.
- Connect feels like the final useful note in the notebook, not a contact dashboard.

When a design decision is ambiguous, choose the option that makes the notebook feel more coherent, physical, personal, and authored. Do not invent another visual world to solve a local layout problem.

### Pre-implementation review gate

Do not implement this direction directly from prose. Before changing site code, prepare and review:

1. a desktop storyboard showing the closed or wrapped state, opening state, Home resting state, one Software spread, one Games spread, Blog, and Connect;
2. the corresponding mobile storyboard, including how a two-page spread becomes one page;
3. motion frames for unwrapping, one scroll reveal, one text-link state, one mode change, one click mark, and one drag interaction;
4. static final states for reduced motion and JavaScript-free use;
5. an inventory of which real artifact is attached, drawn, movable, or diagrammed in every featured case;
6. an explicit list of decorative items removed from the current implementation.

Implementation begins only after Igor approves the resting compositions and interaction grammar. Approval of the notebook concept does not automatically approve a particular binding, wrapper, page-turn, blueprint density, or project layout.

## Design exploration before implementation

### Physical notebook form

Recommended hypothesis: a soft-bound, stitched notebook that opens into broad cream-paper spreads. It should feel used and personal, but not antique, scrapbook-heavy, or school-themed. The binding and page edges establish the object without becoming decorative protagonists.

Why this is the leading option:

- it keeps the two-page composition without the repeated visual noise of spiral rings;
- it can flatten into one page on mobile naturally;
- it supports inserted tracing sheets, taped media, loose notes, and page turns;
- it feels personal rather than like a designer presentation folio.

Alternatives to storyboard before approval:

1. **Spiral sketchbook:** more obviously handmade and allows pages to feel rearrangeable, but the rings can become repetitive visual clutter and complicate the center of every composition.
2. **Hardbound field notebook:** more intimate and durable, but risks feeling literary, archival, or vintage rather than playful and product-oriented.
3. **Ring binder:** supports blueprint and project-sheet logic, but feels administrative and conflicts with the chosen notebook-first identity.

Do not add fake dates, weekdays, diary-entry timestamps, page numbers, coordinates, or location marks to sell the notebook metaphor. Verified project dates may appear only when useful as real evidence.

### How the notebook is revealed

Three opening concepts should be compared as rough storyboards:

1. **Tracing-paper wrap, recommended.** A translucent sheet with a few blueprint marks partly covers the closed or open notebook. On the first deliberate input, it peels or slides aside in stepped frames and the marks briefly align with the portrait and page composition beneath it. This connects unwrapping, blueprint thinking, and revealing Igor's real work.
2. **Kraft-paper parcel.** A rough paper band or wrapper tears and folds away. It has stronger physical drama, but can read as gift packaging or craft-store styling and may overpower the quiet notebook.
3. **Folded page reveal.** The notebook is already open and one folded sheet unfolds to reveal the introduction. This is clearest and fastest, but expresses “unwrapping my world” less strongly.

The opening storyboard should test the recommended tracing-paper option first. A narrow kraft band may be combined with it only if the result remains simple. Do not stack string, stamps, seals, tape, torn wrapper, and translucent paper in the same opening.

### How scrolling moves through the notebook

Recommended hypothesis: each route is a continuous sequence of notebook spreads. Scrolling does not literally turn a new page for every viewport. Instead, one dominant spread settles, its attachments respond, and the next spread is uncovered beneath it. Primary route navigation changes to another group of pages with one short stepped page-riffle or sheet-lift transition.

This creates two levels of movement:

- **within a route:** scroll reveals, tracing-sheet alignment, attached-object shifts, diagram strokes, and paper layers;
- **between routes:** one brief notebook page exchange, then immediate access to the next route's resting composition.

Avoid both extremes: a standard long webpage with paper backgrounds would underuse the concept, while forcing a literal page turn for every content block would be slow, theatrical, and difficult to navigate.

### Blueprint concepts

Compare these three treatments using the same Software case and the same Games case:

1. **Tracing overlays, recommended:** faded construction marks live on a translucent sheet above real screenshots or media. Moving or scrolling the overlay shows the relationship between intended behavior and completed artifact.
2. **Local graph-paper zones:** a small part of the cream page becomes graph paper behind a mechanic or system diagram. This is useful for dense explanations but should not become the entire Work background.
3. **Margin schematics:** arrows, measurements, and state notes remain outside the media. This is quieter and highly readable, but may not make the site feel interactive or distinctive enough by itself.

The likely final system combines tracing overlays for featured cases, local graph areas for complex diagrams, and margin schematics for supporting work. It must never resemble a dark architectural blueprint or a generic “technical” grid laid over everything.

### Page-by-page storyboard hypothesis

#### Home opening

- The notebook arrives partly covered by the chosen wrapper.
- The reveal exposes a real portrait as the main physical object and the drawn portrait as a secondary layer, not two equal cards fighting for attention.
- One plain statement identifies that Igor builds software and makes games.
- Navigation appears as handwritten words on the page edge or upper margin, with the current route underlined or circled.
- No generic `Welcome`, `About me`, date, location, role stack, CTA button, or decorative technology list appears.

#### Home values

- The three raw values remain part of Home and occupy their own spread.
- Test two compositions before deciding:
  1. three loose notes that can be moved or lifted to reveal a specific explanation beneath each;
  2. one working page with three handwritten observations connected to a central artifact or drawing.
- The current checklist can remain only if checking something has an honest meaning. Do not use checkboxes merely because they already exist or because interactivity is desired.
- One campfire or personal drawing may anchor the composition. Avoid turning all three ideas into equal cards.

#### Work entry

- `Software` and `Games` appear as written index words. The selected word is circled, underlined, or marked in the margin.
- The first view behaves like a visual contents page, showing all work at its honest prominence without a `Selected work` heading or card grid.
- Featured cases receive full spreads. Supporting and early artifacts appear as a compact handwritten index near the end rather than mini versions of the same card.

#### Software spread

- A real product screen, interaction sequence, or result is the protagonist.
- A tracing overlay shows the behavior, state, boundary, or decision structure.
- Scrolling or dragging the overlay reveals the finished evidence beneath it.
- Explanatory text stays short and sits beside the relevant part of the artifact rather than under repeated `Problem`, `Process`, and `Outcome` headings.
- Detail pages may become deeper notebook sequences with explicit reading landmarks available to assistive technology.

#### Games spread

- The warm notebook remains visible.
- A real game frame or playable artifact is the protagonist and provides most of the color.
- Sprites may appear as a small strip, stamp, or frame sequence on graph paper.
- Blueprint marks explain one mechanic, visibility change, player-feedback loop, environmental behavior, or state system.
- A small in-paper stepped animation may show an authentic sprite or mechanic. Do not animate unrelated retro decoration.
- Project-specific colors may lightly stain annotations, but the page never turns into a CRT or arcade interface.

#### Blog

- `Identity Cage` appears as a real written object inside the notebook, not below a Blog hero and article card.
- The opening may show the title, one actual excerpt, and a marked passage or margin note based on the essay itself.
- Longer reading should settle into a quieter page with fewer moving objects and a stable text column.

#### Connect

- The final spread contains a direct handwritten contact note and the visible email address.
- LinkedIn, GitHub, itch.io, X, and résumé appear as a plain written index.
- The links use drawn states but no contact cards, social icon grid, large `Say hello` heading, or filled CTA.
- One loose social drawing may move or reveal a small approved detail, but the email remains immediately usable.

### Interaction inventory hypothesis

Use a small family of repeatable interactions rather than inventing a unique effect for every object:

1. **Unwrap:** reserved for the first encounter and rare major reveals.
2. **Lift or slide:** used for tracing sheets, attached evidence, and folded notes.
3. **Draw:** used for link states, blueprint paths, checkbox marks, and focus indication.
4. **Rearrange:** used only for selected loose objects that are safe to drag.
5. **Riffle or settle:** used for route changes and mode changes.

Each spread may have one primary interaction and at most one secondary response. High interactivity should come from consistent physical behavior across the whole site, not from every object moving simultaneously.

### Decisions still requiring Igor's review

Before implementation, choose or revise:

- soft-bound stitched notebook versus another binding;
- tracing-paper wrap, kraft wrapper, or folded-page opening;
- how literal the first unwrapping should feel;
- continuous spreads with page-layer reveals versus more literal page turns;
- tracing overlays versus quieter margin schematics as the dominant blueprint device;
- loose movable notes versus one connected composition for Home values;
- how much of the drawn portrait remains visible before interaction;
- which specific real artifacts become draggable or layered in each featured case;
- whether route changes riffle pages, lift a sheet, or use another low-frame-rate paper action;
- whether any optional sound study should be explored later. The initial implementation should remain silent unless Igor explicitly approves sound.

## Desired visitor impression

Within the first ten seconds, the visitor should be able to understand:

1. This is Igor's personal place.
2. Igor builds production software and makes games.
3. Igor is thoughtful, playful, and capable of completing real work.
4. The visual style is authored and deliberate.
5. There is a clear path to Work, its Software and Games modes, Blog, and contact.

After exploring the site, the visitor should have several conversational hooks about Igor rather than only knowing his professional values.

## Current diagnosis

The current website has a strong concept and sound implementation, but the notebook routes use too many expressive devices at the same visual volume:

- desk texture;
- crumpled paper;
- ruled lines;
- red notebook margin;
- center gutter;
- layered cover and page edges;
- several shadows;
- serif display headings;
- handwritten body copy;
- monospace labels;
- sticky notes;
- polaroid stack;
- tape;
- scattered doodles;
- rotations;
- borders;
- multiple accent colors;
- interaction cues.

Each device is defensible in isolation. Together they reduce hierarchy and make the site feel less edited than intended.

The current content also reveals Igor's values and capabilities more strongly than it reveals Igor's lived story, tastes, curiosity, humor, and progression.

The current Games page has useful content strengths: restricted emphasis, dominant real media, clear hierarchy, and immediate evidence. Its visual language is rejected. The dark CRT, generic retro-game interface, and separate game-world feeling must not be carried into the new Games mode.

## Non-negotiable constraints

- Preserve the website as a personal place first and a portfolio second.
- Preserve semantic HTML, accessible page and region names, landmarks, labels, and keyboard support without forcing a conventional visible heading ladder.
- Preserve responsive behavior and reduced-motion support.
- Preserve conventional primary navigation names: Home, Work, Blog, Connect.
- Make Work contain two plainly named, directly linkable modes: Software and Games.
- Preserve the existing verified professional facts and metrics.
- Do not invent personal or professional information.
- Use `docs/CONTEXT_ABOUT_IGOR.md` as the source of truth for professional evidence, craft values, capability levels, gaps, and direction.
- Do not publish details from `docs/PERSONAL_CONTEXT.md` without explicit approval.
- Do not publish sensitive employment context from `docs/CONTEXT_ABOUT_IGOR.md` automatically.
- Do not use em dashes in public copy.
- Treat the interactive notebook as a required portfolio artifact. Motion must follow the defined physical paper grammar, reveal real content, and never become generic effects for their own sake.
- Do not introduce a new framework or unnecessary dependency.
- Do not stop after refining only the homepage if safe, in-scope work remains on affected routes.
- Keep `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md` synchronized with implementation work.

## Primary design principle

Use an approximate visual balance of:

- 70 percent quiet paper, readable text, and negative space;
- 20 percent photographs, screenshots, diagrams, or meaningful artifacts;
- 10 percent expressive display lettering, doodles, tape, arrows, and intentional imperfection.

In any viewport, one element should clearly be the protagonist. Decorative elements must support it.

Examples:

- Home opening: Igor and the portrait.
- Home values: one raw, personally meaningful principle at a time.
- Work, Software mode: one complete product case, interaction flow, or focused result.
- Work, Games mode: one playable artifact.
- Blog: one real piece of writing.
- Connect: one clear contact action.

## Typography system

### Approved direction

The notebook website should use handwritten typography throughout. Do not introduce an editorial serif, neutral sans-serif, or unrelated monospace voice into the notebook routes.

Use exactly two approved handwritten families with strict roles:

1. `Bright Chalk` from `bright-chalk.regular.ttf` is the regular reading voice.
2. `Cartoon Relief` from `Cartoon Relief.ttf` is the distinctive display voice for larger elements.

The contrast between these two families replaces the earlier proposal to contrast editorial type with occasional handwriting.

The font files are not currently stored in the repository. Before implementation:

- confirm that web embedding is permitted by their licenses;
- obtain the actual font files from an approved source;
- convert or subset them into optimized WOFF2 files when permitted;
- store the webfont files locally with the website;
- preload only the font required above the fold;
- use deliberate handwritten fallbacks rather than silently changing to a generic serif or sans-serif.

Do not implement this by only naming locally installed macOS fonts in CSS. Visitors will not reliably have them. If the files or web licenses cannot be obtained, stop and ask Igor for the files or an approved alternative.

### Bright Chalk

Use `Bright Chalk` for regular website text:

- paragraphs;
- navigation;
- buttons and links;
- case-study explanations;
- lists;
- contact information;
- captions;
- annotations;
- practical labels;
- most small and medium text.

Because the entire reading experience is handwritten, protect readability through layout:

- start around 18 to 20 pixels for desktop paragraph text;
- use at least `1.5` line height for paragraphs;
- keep ordinary text columns near 45 to 60 characters;
- avoid dense walls of text;
- split technical explanations into short paragraphs and lists;
- avoid long uppercase passages;
- verify actual rendering in Chromium, Firefox, and Safari.

### Cartoon Relief

Use `Cartoon Relief` for large, distinctive elements:

- major page statements;
- large project names;
- important questions;
- major numbers such as `6–10s → 600–650ms` when the surrounding copy makes clear that the range is approximate;
- one short callout that must dominate a composition.

Do not use `Cartoon Relief` for paragraphs, navigation, small buttons, captions, technical explanations, or dense lists. Its purpose is impact, not ordinary reading.

Limit each viewport to one dominant Cartoon Relief statement where practical. If every card and label uses it, the font will lose its role and recreate the clutter problem.

### Games-mode exception

The shared site header, navigation, Work-mode control, and route framing use the approved handwritten system. Pixel typography may appear only inside authentic game media or a deliberately small project-specific label. Do not let it become a second interface type system.

### Composition instead of a heading ladder

Do not design pages around a conventional `h1`, then `h2`, then `h3` visual hierarchy.

The composition should be driven by artifacts, notes, photographs, diagrams, project results, questions, and spatial relationships. Text elements may be visually organized as:

- a sentence written across the page;
- a note attached to a photograph;
- a circled result;
- a label beside a diagram;
- a verified project date or location when that fact genuinely helps the visitor;
- a short letter to the visitor;
- a project title embedded into its artifact;
- a margin question;
- a sequence of notebook fragments.

Accessibility must not force a visible landing-page layout:

- give each route an accessible page name, using a visually hidden `h1` when no natural visible page title exists;
- use `aria-labelledby` when a visible fragment naturally labels a region;
- use `aria-label` when a region has no useful visible title;
- add visible headings only where the content genuinely benefits from them;
- long-form essays may use ordinary headings when they improve reading and navigation;
- do not add visible H2 or H3 text merely to satisfy an assumed hierarchy.

Avoid repeating the pattern of eyebrow, enormous heading, explanatory paragraph, and cards on every route.

## Paper and environmental surface

### One notebook

Every primary route and both Work modes occupy the same physical notebook system. Do not alternate between notebook, folio, manuscript, loose project sheet, terminal, game console, or full-page blueprint as competing page shells.

On wide screens, the notebook should occupy roughly 80 to 90 percent of the useful viewport width and leave only enough desk around it to establish the object. On narrow screens, it may become one full-width page and the center gutter may disappear. This responsive change is still the same notebook, not a mobile card layout.

The notebook may change its internal drawing treatment by purpose. Home may be quieter and more personal. Work may introduce graph lines, construction marks, flow arrows, and measured callouts. Blog may use a calmer reading arrangement. The paper character, handwriting, depth logic, and interaction language keep them visibly related.

### Desk

Simplify the desk to one quiet warm color or one very soft gradient. Remove competing grain and repeated linear marks unless they are nearly imperceptible.

The desk is environmental context, not a content surface.

### Paper texture

Reduce the current crumpled-paper overlay from approximately `0.23` opacity to an initial target near `0.08`.

Adjust after real screenshots. The crumpling should be discovered on inspection rather than reducing text clarity.

### Ruled lines

Reduce the current rule opacity from approximately 15 percent to an initial target between 6 and 8 percent.

Consider fading or masking rules behind important text blocks. Lines may be more visible in margins and quieter under paragraphs.

### Notebook frame

Reduce the physical frame to:

- one thin page edge;
- one dark cover edge;
- one soft cast shadow.

Avoid stacking several outlines, inset highlights, page rings, and large shadows at the same time.

### Center gutter

Make the center gutter narrower and quieter. It should be visible on large desktop layouts when the spread composition benefits from it.

Reduce or remove it at smaller widths. Do not allow the gutter to divide content that should read as one composition.

### Blueprint layer

Blueprint is a drawing method inside the notebook, not a blue background and not a separate visual theme.

Use a limited set of faded blue or blue-green construction marks:

- graph or measurement lines where they clarify scale or structure;
- arrows that follow a real state, data, player, or interaction flow;
- component outlines around screenshots or mechanic fragments;
- numbered callouts tied to actual decisions;
- before-and-after paths;
- state transitions, timing marks, and behavior diagrams;
- light erasures, revisions, or crossed alternatives when grounded in a real design decision.

Keep these marks subordinate to the evidence. A visitor should see the product, game, result, or behavior first and use the blueprint layer to understand how it works.

Software and Games share this drawing language. Software may emphasize interaction flows, product states, boundaries, and system behavior. Games may emphasize mechanics, player feedback, state, difficulty, visibility, level structure, and sprite behavior.

Do not fill every page with graph lines, fake technical notation, invented measurements, decorative pseudo-diagrams, or illegible scribbles. A blueprint mark must explain something true.

## Decorative budget

Each major section may use one primary handmade device:

- one polaroid stack;
- one sticky note;
- one torn sheet;
- one taped photograph;
- one handwritten diagram;
- or one doodle cluster.

Do not use all of these in the same section.

Additional rules:

- Show no more than three prominent doodles in one viewport.
- Use no more than one noticeably rotated object per section.
- Keep most rotations below one degree.
- Use either a border or a heavy shadow on a component, not both.
- Use tape only where an image or physical artifact is conceptually attached.
- Important text must remain level and easy to read.
- Intentional offsets must sit on top of a disciplined spacing grid.

Interactivity does not remove this budget. Objects may move, unfold, or become draggable, but the resting composition must remain clear before anything moves.

## Controls should look like writing

Links, mode switches, disclosure controls, filters, and primary actions should visually look like text written in the notebook. Keep the correct semantic element underneath, including real `<button>` elements where an action changes state, but do not present generic interface chrome.

Use states such as:

- a hand-drawn underline;
- a pencil circle;
- a small margin arrow;
- a crossed-out previous state with the new word beside it;
- a slight ink-weight or color change;
- a short animated stroke drawn behind or beneath the text.

Avoid filled rectangles, bordered CTA boxes, rounded pills, dashboard tabs, generic card buttons, large button shadows, and icons inside boxes when a direct text label is clearer.

The visible text may remain visually compact while the semantic hit area reaches at least 44 by 44 pixels through invisible padding. Focus indication must be obvious and must not depend only on color or hover. `Software` and `Games` should read like two written index words or restrained notebook tabs, not a segmented application control.

## Doodle strategy

Preserve Igor's drawings, but distribute them across the website instead of presenting nearly all of them in the homepage values section.

Suggested distribution:

- Home introduction: no additional doodles beyond the portrait.
- Home values: campfire plus two selected drawings.
- Work, Software mode: computer and one systems-related drawing.
- Work, Games mode: rely on game media and the pixel-art visual system rather than notebook doodles.
- Blog: tangled thoughts, fishbone, or another reflective drawing.
- Connect: bird, burger, or another warm and social drawing.

Doodles remain decorative and pointer-transparent. They must not carry required information.

## Color system

Restrict the notebook routes to:

- warm paper;
- dark ink;
- faded red;
- muted blue-green.

Use roles consistently:

- faded red for active states and emotional emphasis;
- blue-green for secondary annotations;
- yellow for one rare sticky note or moment of attention;
- dark ink and paper for most content.

Do not use every available accent color on the same route. Remove unused or redundant color tokens after the refined direction is validated.

Games may borrow one or two muted colors from each game's real art inside screenshots, sprite samples, or small annotations. It must not introduce a site-wide charcoal, phosphor, neon, or CRT palette.

## Content direction

Text beside an artifact should add real information:

- a photograph;
- a game screenshot;
- a system diagram;
- a timestamp;
- a result;
- a scanned sketch;
- an actual quote from an essay;
- a small project memory.

Do not invent reflective annotations, emotional reactions, slogans, or memories to make a composition feel personal. Use only Igor's actual words, known facts, or approved project context. If no real annotation exists, leave the space empty.

Specific personal details create curiosity. Abstract values alone do not.

Add a short approved personal story that communicates progression rather than autobiography. Candidate subjects already supported by repository context include:

- starting programming from scratch in 2019;
- moving beyond tutorials into building complete systems;
- discovering the relationship between backend systems and game mechanics;
- why complete artifacts matter to Igor;
- what Igor is currently trying to understand.

Any additional personal detail requires explicit approval before publication.

## Route-specific direction

### Home

#### Purpose

Introduce Igor as a person with recognizable activities, interests, and raw personal values. Home owns both the portrait-led introduction and the values composition. Values is not a separate route or peer destination.

#### Change

- Make Igor and one portrait the clear protagonist.
- Consider showing the real photograph first, with the drawing partially visible behind it as the playful reveal.
- Reduce the initial hero height where possible.
- Remove decorative elements that compete with the portrait and opening statement.
- Present the notebook concept as a marginal annotation rather than making the website metaphor the only primary message.

#### Copy direction

- State clearly that Igor builds software and makes games.
- Do not use writing as part of the primary identity statement. Writing remains a real part of the site through Blog.
- Keep the opening plain and specific. Do not add a slogan about creativity, changing the world, curiosity, or writing things down.
- The notebook concept should come through the interface itself rather than requiring a poetic explanation.

#### Values within Home

##### Purpose

Focus on what makes a product or game worth working on to Igor: what stands behind it, how it relates to the people using it, and what it contributes to their lives. Avoid framing the section as a declaration of what Igor “wants to bring into the world.” That wording is too self-conscious and puts Igor at the center instead of the product and its relationship with people.

Here, “raw” means personally meaningful and close to Igor's actual feelings, even when the idea is less neat or professionally marketable. It does not mean unedited, careless, maximally confessional, or merely factually accurate.

##### Change

- Do not expose the complete internal process-and-outcome framework on the homepage. It is context for making decisions, not a checklist that visitors must read.
- Select no more than three principles that feel the most raw and personally meaningful to Igor.
- Keep one sticky-note checklist as the primary object.
- Reduce the doodle count to the campfire and two supporting drawings.
- Preserve native checkbox behavior and the completion link.
- Use Bright Chalk for explanations and revealed notes. Use Cartoon Relief only for one short dominant statement if needed.

##### Copy direction

Organize the public-facing content around these three ideas:

1. **A clear reason behind the work.** Igor should understand what the product is for, who it serves, and why its behavior matters.
2. **A close relationship with the people using it.** Communication, feedback, iteration, mutual respect, and appreciation should shape the product instead of arriving only after it is finished.
3. **Capability and understanding that can travel.** The product should give someone a real capability or experience. Building it should also produce learning that can be explained, taught, or shared.

These are content directions, not approved headings or finished public copy. Rewrite them in Igor's first-person voice and keep them specific. The final section should feel like three notebook observations, not a philosophy manifesto or a corporate values list.

The fuller internal context still includes autonomy, ownership, turning unclear needs into coherent products, directly experienced behavior, learning through building, teaching, and completing real mechanisms. Use those ideas to judge projects and supporting copy, but do not put all of them on the homepage.

### Work

#### Purpose

Create one complete index of Igor's work across software products and games. Show product design, interaction and behavior design, game design, end-to-end construction, and engineering without over-correcting toward either pure engineering or pure design.

The page should show all verified work Igor chooses to count as part of his practice. “Show all” does not mean give every artifact equal size. Use three levels:

1. featured cases with enough evidence to reveal a strong capability bundle;
2. supporting work that adds distinct professional or craft evidence;
3. experiments, early work, and unfinished projects shown compactly with honest status.

Do not hide a weaker, older, or unfinished artifact merely because it is less polished. Put it in the appropriate level and present the strongest truthful reason it matters. If an exercise adds no distinct evidence, keep it in a compact archive line rather than inflating it into a case study.

#### Work modes

- Use one Work route with two public modes named `Software` and `Games`.
- Do not use `Non-game` as a public label. It defines software as a leftover category.
- Make both modes directly linkable, preferably through stable fragments such as `/work/#software` and `/work/#games`.
- Preserve the existing `/games/` URL as a compatibility redirect or lightweight forwarding page to `/work/#games` so published links do not break.
- Default to Software for general professional visitors, while links from game media and outreach may open Games directly.
- Present the mode choices as written text or restrained notebook index tabs with a clear selected mark, keyboard support, and 44-pixel touch targets. Do not use a pill, switch, or application-style segmented control.
- Render both collections in the HTML. Progressive enhancement may present one panel at a time, but content must remain accessible and navigable without JavaScript.
- Keep detail pages directly addressable regardless of the selected index mode.

#### Software mode

##### Change

- Do not begin with a generic professional landing-page hero.
- Lead with the complete Flutter product. It is the strongest professional example of shaping an incomplete need, making product and interaction decisions, implementing across the application, and carrying the result to production readiness.
- Give the Chinese Bee learning product comparable prominence. It is the clearest independent example of several technical components becoming one coherent capability for another person.
- Use the receipt-processing result as a focused investigation case rather than the page's entire professional identity.
- Pair each story with one meaningful technical artifact.
- Use a clean diagram beneath sparse personal annotations.
- Reduce card borders, shadows, ruled backgrounds, and rotations.
- Expand stories to explain constraints, decisions, results, and reflection when verified content is available.

Possible artifacts:

- request-path diagram;
- profiler investigation timeline;
- before-and-after latency visualization;
- event-delivery sequence;
- state transition;
- responsibility boundary;
- constraints and trade-off diagram.

Do not add a dramatic sentence above the result. Let the verified result, constraints, decisions, and diagram provide the interest.

Case order and emphasis:

1. **Flutter food-ordering application:** proposal of the cross-platform direction, product and usability decisions, custom menu behavior, basket and ordering flows, payment and 3DS, maps and addresses, courier state, promotions, loyalty, themes, device adaptation, performance work, and production readiness. The internal source lives at `/Users/iggysleepy/dev/mobile/SuperGoodFlutter/super_good_flutter`. Inspect it for accurate artifacts, but do not publish the local path or confidential implementation details.
2. **Chinese Bee learning product:** Telegram bot, multilingual character search, saved vocabulary, flashcards, database-backed API, embedded Vue handwriting interface, and recognition scoring. It demonstrates product design, learning interaction, data modeling, backend and web implementation, and end-to-end ownership.
3. **Receipt-processing investigation:** approximately 6 to 10 seconds reduced to approximately 600 to 650 milliseconds through PDF detection, direct text extraction, cross-language library evaluation, a separate Python service, downstream parsing changes, and reduced OCR use.
4. **Fintech service work:** provider and payment integrations, receipt validation, fraud investigation, service flows, Kafka, Redis, PostgreSQL, gRPC, Protobuf, webhooks, and callbacks as supporting technical breadth.

Do not describe the receipt result as a generic high-load Go optimization involving goroutines, pooling, or SQL. Do not claim two-person ordering-platform ownership unless Igor separately verifies it. Do not let the supporting fintech case overwhelm the stronger product stories or imply mature distributed-systems and long-term operational specialization.

#### Games mode

##### Purpose

Present real playable work and show how Igor thinks about mechanics, systems, atmosphere, and production scope.

##### Change

- Preserve the current Games page's evidence strengths while replacing its visual system completely.
- Keep Games on the same warm notebook paper as the rest of Work.
- Present pixel art as something physically integrated into the notebook: a printed screenshot, taped frame, sprite strip, graph-paper study, stamped pixel mark, or small in-paper animation.
- Use the shared blueprint language to explain mechanics, feedback, state, difficulty, visibility, environmental behavior, data structure, and production decisions.
- Keep the composition more minimal than the current Games route. Real media should provide most of the color and visual energy.
- Remove CRT scanlines, phosphor colors, dark full-page surfaces, game-menu framing, controller or console motifs, neon accents, generic `PLAYER 1` language, pixel borders around every element, and any retro treatment that is not supported by the actual project.
- Do not make Games feel like a second website or a generated retro portfolio template.
- Keep real media dominant.
- Add planned detail routes with mechanics, technical decisions, intended player behavior, and reflection.
- Use `Secret Santa Foundation` to show external feedback and a specific difficulty and missile-visibility iteration.
- Use `Discourses by Campfire` to show multidisciplinary production, layered data-driven structure, environmental behavior, and the response to a broken Windows export.
- Mention the Go and raylib Snake experiment as a smaller artifact that received public engagement on [X](https://x.com/kidpudel/status/1781656147990020293?s=20). The post showed six likes and 351 views when verified on 2026-07-21. Treat the engagement as evidence that the artifact reached people, not as an impressive vanity metric.
- Mention the earlier C++ and OpenGL [Tic-Tac-Toe project](https://github.com/KidPudel/TicTacToe) as evidence of Igor's longer game and graphics-learning trajectory. It uses GLFW, GLAD, and GLM and should remain a small historical artifact rather than compete with the primary games.
- Keep unfinished game work clearly unfinished and practical art or audio work clearly supporting rather than specialist capabilities.
- Preserve the shared written Work-mode control and conventional global navigation.

### Blog

#### Purpose

Present ideas Igor has actually pursued rather than simulate a large publication.

#### Change

- While only one article exists, lead directly with `Identity Cage`.
- Remove excessive empty hero space.
- Present the article as a real piece of writing laid out within the notebook. It may resemble a draft page or attached printout, but the notebook remains the primary surface.
- Use one reflective doodle. Add an annotation only when it comes from the actual essay or Igor's approved words.
- Complete the planned locally hosted article.

### Connect

#### Purpose

Make contacting Igor feel personal, direct, and low friction.

#### Change

- Replace the repeated large contact-card grid with one primary contact method.
- Make email the most prominent action.
- Present LinkedIn, GitHub, itch.io, X, and résumé as a quieter list or compact index.
- Remove the generic large `Say hello.` hero.
- Show the email address and a plain instruction for contacting Igor without an invented warm slogan.

Keep the actual email address visible.

## Page-opening policy

Do not treat visible headings as mandatory page furniture. Remove the generic template and let each route begin with a different kind of artifact or statement.

Avoid large title text that merely repeats:

- Work;
- Blog;
- Contact;
- About;
- Selected projects;
- My values.

When a large text element is useful, it should contain a point of view, a result, a question, or a fragment of story.

Keep navigation conventional. Visitors should not need to decode playful labels to find a route.

Different routes should use different opening compositions inside the same notebook:

- portrait-led opening;
- artifact-led Work opening whose selected mode determines whether product evidence or playable media dominates;
- writing-led opening;
- contact-note opening.

## Interaction and motion

The site should feel like paper being unwrapped, opened, moved, marked, and used to reveal Igor's world. This is a core design and engineering requirement. The goal is authored physicality, not smooth application motion or a collection of unrelated effects.

### Motion character

- Use deliberately stepped, low-frame-rate movement, approximately the visual rhythm of 8 to 12 frames per second where appropriate.
- Prefer CSS `steps()` or a small number of authored transform states over continuous glossy easing.
- Let paper settle imperfectly: a short lift, small rotation, shifted shadow, and final rest can feel more physical than a long smooth animation.
- Keep text readable during motion and stop movement quickly. Continuous floating, bobbing, flickering, or ambient parallax is not the target.
- Use transforms and opacity for most motion. Avoid expensive paint-heavy effects and large scroll-bound layout changes.

### Signature unwrapping sequence

The opening experience should present the notebook as something being unwrapped and opened:

1. A partly wrapped or covered notebook is visible on the desk.
2. The first deliberate visitor input pulls, folds, tears, or slides the paper covering away in a few stepped states.
3. The notebook opens or settles and reveals Igor, the portrait, and the first clear statement.
4. Later spreads reuse smaller versions of the same grammar: a screenshot slides from beneath a page, a folded corner opens, a project sheet lifts, or a diagram is drawn into place.

This must be a short reveal, not a splash screen. A direct link to a route or project must open with the content available immediately, and repeat visitors must not be forced through a long intro. The server-rendered and reduced-motion states show the final open notebook without waiting.

### Scroll behavior

- Use scroll to reveal relationships, not simply to fade every block upward.
- Allow selected attached objects to move by small bounded amounts, generally around 12 to 32 pixels, with occasional sub-degree rotation changes.
- A blueprint path may draw in discrete sections as its corresponding evidence enters view.
- Paper layers may separate, uncover, or re-stack as the visitor progresses.
- Do not tie essential reading to exact scroll progress or require scrubbing to understand a case.

### Click, hover, and focus behavior

- Clicking may leave a brief pencil tick, ink mark, stamp, graphite burst, or page-pressure response.
- Hover and keyboard focus should draw the same kind of underline, circle, or annotation state around text controls.
- Effects must describe the object's material or purpose. Do not add generic glow, scale-up card hover, bouncing icons, confetti, or ripple effects.
- Preserve the portrait switcher if both states remain clearly discoverable.
- Preserve native value checkboxes and allow their marks to feel hand-drawn.

### Draggable objects

Selected loose artifacts may be draggable: a photograph, sticky note, screenshot print, doodle sheet, or small project fragment.

- Limit dragging to objects that plausibly lie loose on the notebook.
- Keep movement bounded to the relevant spread and prevent objects from covering navigation or required text.
- Do not make body copy, primary navigation, the Work mode choices, contact details, or essential diagrams draggable.
- Dragging may reveal a secondary note or hidden detail, but the hidden item must also be reachable by keyboard and touch through an explicit text control.
- The initial layout must already communicate the content. Dragging is exploration, not a prerequisite.
- Support pointer and touch input, provide keyboard-equivalent access to any revealed information, and include a plain text reset when rearrangement can meaningfully obscure the composition.
- Session-only positions are sufficient. Do not add storage or a backend merely to remember object placement.

### Accessibility and fallback

- With JavaScript unavailable, show the notebook open and all essential content readable.
- With reduced motion enabled, skip unwrapping, parallax, object travel, stepped transitions, and drag animation. Show final states immediately while retaining clear control feedback.
- Keyboard and touch visitors must reach the same content and actions as pointer visitors.
- Direct links, browser history, and route navigation must never depend on completing an animation.
- Avoid scroll jacking, cursor replacement, required hover, autoplay sound, and interactions that trap the pointer.

## Responsive behavior

The current responsive discipline is a strength and must not regress.

At 390 pixels:

- navigation remains understandable;
- touch targets remain at least 44 by 44 pixels;
- no horizontal overflow exists;
- the hero does not require several screens before reaching meaningful content;
- decorative drawings do not crowd headings;
- Bright Chalk remains large enough, well spaced, and readable;
- Cartoon Relief does not crowd small screens or appear in dense copy;
- the portrait remains fully understandable;
- the résumé control has an accessible name even if its visible label is shortened.
- the notebook becomes a composed single-page view when a two-page spread would be cramped;
- draggable objects begin inside safe bounds and never cause document overflow;
- text-only controls retain 44 by 44 pixel hit areas without turning into boxed mobile buttons.

Do not adopt a desktop-only composition.

## Accessibility and document quality

Preserve or improve:

- one `main` landmark;
- one accessible page name, which may be a visually hidden `h1`;
- labeled regions without unnecessary visible heading furniture;
- skip link;
- visible focus states;
- named navigation landmarks;
- descriptive image alternative text;
- decorative image hiding where appropriate;
- reduced-motion behavior;
- readable color contrast;
- keyboard and touch access;
- direct linking to every route and detail page.

Visual experimentation must not reduce document semantics, but semantic support must not dictate a conventional visible heading ladder.

## Social and discovery polish

- Add a custom Open Graph image that reflects the refined notebook identity.
- Complete canonical metadata across routes.
- Add the planned RSS feed.
- Add the planned useful `404.html`.
- Verify shared previews after deployment.

## Implementation sequence

### Phase 1: reduce noise

1. Complete and approve the pre-implementation storyboards and motion frames.
2. Obtain, license-check, bundle, and apply Bright Chalk and Cartoon Relief.
3. Apply Bright Chalk to regular text and restrict Cartoon Relief to large distinctive elements.
4. Reduce paper texture and ruled-line opacity.
5. Simplify the desk, notebook frame, shadows, and gutter.
6. Restrict the notebook palette.
7. Remove the dark CRT and generic retro-game visual system.
8. Distribute doodles across routes.

### Phase 2: validate one real section

1. Build the approved persistent notebook surface and homepage introduction with real content.
2. Prototype the approved short unwrapping sequence and one bounded draggable artifact.
3. Review resting, mid-motion, reduced-motion, JavaScript-free, desktop, and mobile states.
4. Confirm that Igor and the portrait dominate.
5. Confirm that motion feels like handled paper rather than application animation.
6. Confirm that the result feels authored, clear, and unmistakably notebook-based.

The homepage validation is a risk-reduction step, not the final deliverable.

### Phase 3: apply the direction across routes

1. Refine the values composition within Home.
2. Merge the current Work and Games indexes into one Work route with Software and Games modes.
3. Recompose Software around a complete inventory with featured cases, supporting evidence, compact experiments, and truthful blueprint diagrams.
4. Rebuild Games as minimal pixel art on notebook paper, retain dominant real media, and add the smaller verified artifacts.
5. Recompose Blog around the actual essay.
6. Recompose Connect around one direct contact section.
7. Add approved personal-story content.

### Phase 4: complete launch content

1. Complete professional detail pages.
2. Complete game detail pages.
3. Host `Identity Cage` locally.
4. Complete metadata, RSS, Open Graph image, and `404.html`.

### Phase 5: verify

1. Run type and production builds.
2. Verify the GitHub Pages base path.
3. Inspect all routes at desktop and mobile widths.
4. Test keyboard, touch, focus, and reduced motion.
5. Check accessible page names, labeled regions, landmarks, alternative text, and contrast.
6. Inspect public deployment in current Chromium, Firefox, and Safari.
7. Fix deployment-only issues.
8. Test the unwrapping sequence, scroll reveals, click marks, draggable bounds, keyboard equivalents, JavaScript-free state, and reduced-motion final state.

## Visual acceptance criteria

The refinement is successful when:

- Igor, not the paper effect, is the first thing visitors remember.
- A screenshot has one obvious focal point.
- Large areas of paper are allowed to remain quiet.
- Bright Chalk gives the notebook one consistent handwritten reading voice.
- Cartoon Relief feels distinctive because it is reserved for large moments.
- Body text remains comfortable to read.
- Doodles feel selected rather than accumulated.
- Every decorative object has a reason to exist.
- Work results can be understood before reading every paragraph.
- Work evidence shows a capability bundle rather than forcing Igor into a backend-specialist identity.
- Work contains Software and Games modes without splitting Igor into two professional identities.
- The Work index includes all verified work at an honest level of prominence and makes the strongest cases immediately obvious.
- Games mode shows serious independent craft without implying established commercial specialization.
- Every route remains visibly inside one persistent notebook.
- Work uses a coherent blueprint drawing language in both modes without fake technical decoration.
- Games looks like pixel art integrated into paper, not a CRT, console, game menu, or separate retro website.
- Controls look like clear written text rather than generic buttons, pills, tabs, or CTA cards.
- The opening feels like paper being unwrapped to present Igor's world, and its low-frame-rate character feels deliberate.
- Scroll, click, and drag interactions follow one physical paper grammar and reveal real content.
- The resting layout works before interaction, and reduced-motion and JavaScript-free visitors receive the complete readable state.
- Each route has a distinct entrance without confusing navigation.
- No route looks like a conventional sequence of page title, section title, subsection title, and repeated cards.
- The site remains visually warm, playful, and handmade.
- The site does not resemble a generic corporate portfolio.
- The site does not reproduce another artist's or game's visual system.
- Mobile feels intentionally composed rather than reduced from desktop.
- Accessibility and performance do not regress.

## Avoid

- Adding effects that do not follow the paper, ink, graphite, notebook, or blueprint grammar.
- Adding more texture to create “depth.”
- Replacing the notebook with a generic minimal white portfolio.
- Applying the same card component to every type of content.
- Replacing every conventional heading with vague poetic language that does not help the visitor.
- Inventing warm, inspirational, quirky, or reflective slogans to make the site sound personal.
- Hiding essential navigation behind playful labels.
- Making every object rotated, taped, or torn.
- Using fake dates, day labels, timestamps, coordinates, measurements, or project notes as atmospheric decoration. Show them only when they are verified and useful.
- Turning Games into a dark CRT, terminal, arcade menu, console interface, neon retro page, or generic pixel portfolio.
- Making semantic buttons look like boxed application controls when a written text treatment can communicate the action.
- Making essential content depend on scrolling to an exact position, dragging an object, or completing the opening animation.
- Shrinking Bright Chalk to fit dense technical or professional text instead of editing the content and layout.
- Using Cartoon Relief for paragraphs, navigation, or repeated card titles.
- Publishing unapproved personal details.
- Inventing project metrics, responsibilities, or outcomes.

## Codex completion instruction

Before implementation, read:

- `Agents.md`;
- `docs/CONTEXT_ABOUT_IGOR.md`;
- `docs/WEBSITE_CONTEXT.md`;
- `docs/PERSONAL_CONTEXT.md`;
- `docs/IMPLEMENTATION_PLAN.md`;
- `docs/PROGRESS.md`;
- this brief.

Inspect the current public site and repository before editing. Preserve unrelated user changes.

Implement the refinement through the full affected project rather than stopping after a visual experiment. Use real content, verify responsive and accessible behavior, update the implementation plan and progress log, and continue through build and deployment readiness while safe in-scope work remains.
