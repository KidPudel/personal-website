# Project instructions

This repository contains Igor's personal website.

The website is a personal place first and a professional portfolio second. It should feel like a quick glimpse into Igor's notebook while remaining clear, credible, accessible, and useful for networking and job opportunities.

## Delivery mandate

This repository is the production website project, not a disposable prototype, design exercise, or isolated visual demo.

- Work toward a complete, deployable, publicly useful website.
- Treat visual reviews as iterative feedback, not as a terminal state or permission to leave the rest of the project unfinished.
- Do not stop after an initial section when safe, in-scope work remains.
- Keep `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md` synchronized with the actual repository state.
- Record completed work, remaining work, decisions, and genuine blockers accurately.
- Prefer finishing required content, routes, accessibility, metadata, verification, and deployment over adding optional spectacle.

## Read before working

Use the following documents when relevant:

- `docs/CONTEXT_ABOUT_IGOR.md`
  - authoritative professional and craft context;
  - demonstrated experience and evidence;
  - capability levels and current gaps;
  - process and outcome values;
  - current direction and suitable role labels;
  - boundaries on claims that the evidence does not support.

- `docs/WEBSITE_CONTEXT.md`
  - product purpose;
  - information architecture;
  - visual direction;
  - interaction principles;
  - content priorities;
  - scope constraints.

- `docs/PERSONAL_CONTEXT.md`
  - Igor's personality;
  - cultural influences;
  - personal interests;
  - private context that may guide tone but must not be published automatically.

### Context authority

Use this precedence when documents overlap:

1. Igor's latest explicit instruction.
2. `docs/CONTEXT_ABOUT_IGOR.md` for professional background, craft, evidence, capability levels, values related to work and outcomes, gaps, direction, and role fit.
3. `docs/WEBSITE_CONTEXT.md` for the website's purpose, audience, information architecture, public-content strategy, and interaction principles.
4. `docs/DESIGN_REFINEMENT_BRIEF.md` for the current approved visual refinement direction.
5. `docs/PERSONAL_CONTEXT.md` for personality, culture, interests, private emotional context, and tone.
6. `docs/IMPLEMENTATION_PLAN.md` for current delivery sequencing.
7. `docs/PROGRESS.md` as a historical implementation record.

The progress log records what was believed or implemented at a point in time. It is not an authority when newer context corrects an earlier interpretation. Preserve historical entries, add an explicit correction, and update current plans and public content.

Read `docs/CONTEXT_ABOUT_IGOR.md` completely before changing:

- professional positioning or biography;
- Work Software mode, Work Games mode, About, or My Story content;
- case studies, capability labels, role labels, or résumé framing;
- process values, outcome values, or explanations of what Igor likes making;
- claims about expertise, seniority, specialization, ownership, production experience, or game-development depth;
- the relationship between backend, product, mobile, and game experience.

Do not load or apply every personal detail mechanically. `docs/CONTEXT_ABOUT_IGOR.md` contains internal assessment and employment context, not blanket approval to publish every fact. `docs/PERSONAL_CONTEXT.md` contains private and emotionally sensitive material. Use the public-use rules and ask Igor before publishing details that are personal, sensitive, employer-confidential, or not already approved.

## Core principles

- Personal website first, portfolio second.
- Personality should be visible without obscuring professional evidence.
- Use a clean, readable foundation with a handmade layer.
- Prefer real content over generic placeholders.
- Preserve Igor's voice.
- Do not invent facts, responsibilities, results, or metrics.
- Mark uncertain information instead of presenting it as verified.
- Do not position Igor as a mature specialist in backend, distributed systems, data engineering, mobile architecture, product design, or professional game development.
- Do not minimize the real evidence in mobile product ownership, paid fintech backend work, receipt-processing investigation, end-to-end product construction, and independent game development.
- Distinguish approximately 11 months of officially documented employment from substantial paid but unofficial or project-based backend experience.
- Describe games as serious independent multidisciplinary work with some external player feedback, not as established commercial game-development specialization.
- Present `Experience-driven product systems design and engineering` as the current coherent direction, not a permanent identity or a conventional title Igor has already held.
- When a conventional label is necessary, choose it for the audience and evidence. Relevant labels include Product Engineer, Product-oriented Software Engineer, Interactive Product Engineer, Mobile Product Engineer, Gameplay Systems Engineer, Gameplay Programmer, and Technical Game Designer. Do not imply equal readiness for all of them.
- Keep demonstrated capability, current level, desired direction, and capability gaps separate.
- Keep Igor and his values together on Home. Values is a composition within Home, not a separate primary route.
- When Igor describes a value as “raw,” interpret that as personally meaningful and emotionally close to what matters to him, not careless, maximally confessional, or merely factually accurate.
- Do not over-correct Igor's story toward only engineering or only design. His strongest direction combines product design, interaction and behavior design, game design, and implementation across technical boundaries.
- Use one Work index with directly linkable Software and Games modes. Keep `Home`, `Work`, `Blog`, and `Connect` as the primary navigation labels.
- Inventory all verified work Igor chooses to include. Use featured, supporting, experiment, early-work, and unfinished levels instead of giving every artifact equal prominence or hiding less polished work.
- Lead professional evidence with the complete Flutter application and Chinese Bee. Use receipt processing as the strongest focused investigation and fintech services as supporting technical breadth.
- Keep `Discourses by Campfire` and `Secret Santa Foundation` as the primary game cases. Snake with Go and raylib and C++ and OpenGL Tic-Tac-Toe are smaller supporting artifacts in the longer game-making trajectory.
- Do not use em dashes in public copy.
- Avoid generic corporate language.
- Avoid identity-based positioning such as "I am a creator who can do anything."

## Design principles

- Expressive surface, disciplined structure.
- Treat one persistent physical notebook as the website and the only primary content surface. The desk is quiet environmental space, not a second canvas.
- On notebook routes, use Bright Chalk for regular prose and interface text and Cartoon Relief only for larger distinctive elements, subject to webfont files and embedding rights being available.
- Use blueprint-like construction marks inside the notebook to explain real product behavior, system flow, mechanics, state, and decisions in both Work modes. Do not add fake technical notation.
- Present Games as minimal pixel art integrated into warm notebook paper. Do not preserve or recreate the current dark CRT, phosphor, console, arcade-menu, or generic retro-interface treatment.
- Pixel typography may appear inside authentic game media or a small project-specific label, but it must not become a second site interface type system.
- Do not force a visible H1/H2/H3 landing-page ladder. Preserve accessible page and region names without making semantic support dictate the composition.
- Intentional imperfection must not create actual confusion.
- Navigation and primary actions must remain conventional and understandable.
- Render links, mode choices, and action controls visually as clear written text with underlines, circles, strokes, or margin marks. Preserve semantic links and buttons, visible focus, and 44-pixel hit areas without generic boxed buttons, pills, CTA cards, or application-style tabs.
- Do not invent additional visual systems without a clear reason.
- Treat high interactivity as an approved part of the website's portfolio value. Use one physical grammar based on unwrapping, lifting, sliding, drawing, rearranging, riffling, and settling paper.
- Favor deliberately low-frame-rate, stepped paper motion over smooth generic application animation.
- Allow selected loose artifacts to move on scroll or be draggable when the resting layout remains complete, bounds are safe, and equivalent content is available through keyboard and touch.
- Do not begin implementation from prose alone. Storyboard desktop, mobile, motion, reduced-motion, and JavaScript-free states and obtain Igor's approval first.
- Do not invent dates, days, timestamps, locations, coordinates, measurements, or notebook notes for atmosphere. Use them only when verified and useful.
- Respect reduced-motion preferences.
- Ensure important interactions also work with touch and keyboard input.

## Technical principles

- Keep the implementation simple.
- Prefer static rendering where practical.
- Prefer Markdown or MDX for long-form content.
- Use semantic HTML.
- Preserve accessibility and responsive behaviour.
- Optimize images, videos, fonts, and animations.
- Avoid unnecessary dependencies.
- Do not add a database, authentication, custom CMS, or heavy client-side state without an actual requirement.
- Keep visual experiments isolated and reversible.
- Use progressive enhancement.
- Do not let decorative features block page access or direct linking.

## Scope control

This website can easily become a long-running meta-project.

The approved interactive notebook is required launch work, not optional spectacle. Keep its implementation bounded by the reviewed storyboard and finish publication, content, accessibility, metadata, verification, and deployment alongside it.

Before adding complexity, ask:

1. Does it improve the visitor's understanding?
2. Does it reveal something meaningful about Igor?
3. Does it support a real content requirement?
4. Is the complexity justified?
5. Can the same result be achieved more simply?
6. Is this helping publication or delaying it?

## Completion target

The completed launch version should include:

- homepage;
- personal introduction;
- raw personal values within Home;
- one Work index with Software and Games modes;
- a complete, honestly tiered inventory of verified software and game work;
- writing section;
- short story or About section;
- contact details;
- LinkedIn, GitHub, itch.io, email, and résumé links;
- responsive and accessible layout;
- the approved living-notebook visual and interaction system.

Completion does not require every possible animation or movable object. It does require the approved signature unwrapping, shared low-frame-rate paper grammar, and reviewed interactions to be implemented, accessible, performant, and deployable.

## Working process

For substantial visual changes:

1. read the relevant context document;
2. implement the change first in one real section with real content;
3. review it with real content;
4. refine the direction;
5. apply the validated direction across every affected route;
6. continue through verification and release work.

The first affected section is a risk-reduction step inside the project, not the final deliverable.

When a request conflicts with these instructions, follow the user's most recent explicit request.
