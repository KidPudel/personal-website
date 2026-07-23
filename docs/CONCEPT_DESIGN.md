# Design concept

## Concept

This is My (Igor's) personal website that is in itself also a product design case.

It shows my soul, personality, values, work as well product design abilities through the design and feel of a website itself.

This website serves two things:
1. conveying to people my soul of an artist and engineer which is for possible like-minded people.
2. as a place that stores my work for me to keep track of like what I do and what do I represent.

This website should help with:

- professional networking;
- job opportunities;
- friendship;
- possible collaborations;

The website should feel like exploring tactile interactive journey experience of mapped out print of a soul in a hand-drawn game without using game-interface chrome


It is not a conventional portfolio, résumé website, corporate landing page, or personal-brand funnel. It is an expression of my soul, the project itself.


## Intended feeling

The site should feel:

- handmade;
- alive;
- youthful;
- thoughtful;
- playful;
- imperfect in an intentional way;
- technically credible;
- professional in an artistic rather than corporate way. (hand-drawn, sketchbook aesthetic elements)


## Art direction and visual language and interaction design

The main style of a website should follow these properties:

- Minimalist graphic design: a nearly empty, often monochromatic background with extensive negative space.
- Analog sketch aesthetic: imperfict pencil lines, borken strokes, slight texture. Wabi Sabi part of the soul. It is present in doodles and all the elements on the website
- Sketchbook-inspired elements as a mix with analog sketch aesthetic to create the feeling of youthful expressivness.
- Restrained print texture: the background is not entirely sterile; subtle grain, faded tonal variation, and imperfect edges keep it from feeling like ordinary digital minimalism.

The feeling of minimalist style with youthful, handmade vitality and adolescent sincerity.

Use actual personal hand-drawn (by Igor) elements to maximum rather than relying only on ai generated as much as possible.

If an hand-drawn artifact is required but missing, insert a clearly labeled development placeholder rather than inventing finished personal material. References for the hand-drawn language are stored in `/Users/iggysleepy/dev/web/frontend/personal-website/handmade-style-reference` and on `/Users/iggysleepy/dev/web/frontend/personal-website/src/assets/art/doodles`. Use reference sites for quality analysis, not copied compositions or assets.


### Details

- A shared background layer of selected personal doodles belongs to the persistent field and remains present on Home and every destination route. Keep this common set and its placements unified in the shell rather than duplicating it inside routes. It stays transparent enough not to compete with content; route-specific drawings are additional authored composition only when explicitly needed.
- elements could be either hand-drawn or pictures
- paper appear as a special spatial element when explicitly said. Do not infer or introduce paper from the type of content, route, interaction, or existing implementation.



## Structure and content

For my vision refer to the `/Users/iggysleepy/dev/web/frontend/personal-website/storyboards` folder, it contains my drawings explaining the structure of the website

Home is minimalistic, nearly empty, with a monochromatic background and extensive negative-space field. This same field continues through every destination route.

Home loads directly with four Igor-drawn, visibly labeled choices:

1. `Who I am`
2. `Work`
3. `Connect`
4. `Blog`

Who I am and Blog open real routes. Each route continues the unchanged Home field and composes its content with hand-drawn boundaries, paths, marks, and artifacts.

Work remains on Home and expands locally to reveal two Igor-drawn icon links for Software and Games.
Connect remains on Home and expands locally to reveal email, LinkedIn, GitHub, itch.io, X, and résumé.


### Navigation model

- `Who I am` and `Blog` are semantic links.
- `Work` and `Connect` are semantic disclosure buttons with `aria-expanded` and `aria-controls`.
- The Work state is directly linkable through `/#work`.
- `/work/` forwards to `/#work`.
- The Connect state is directly linkable through `/#connect`.
- `/connect/` forwards to `/#connect`.
- Work exposes directly linkable `Software` and `Games` modes.
 Games mode.
- Every destination has a hand-drawn Home control in a reserved edge area outside the main content composition.
- The Home drawing is a semantic link to `/`, has an accessible name of `Home`, a visible focus state, and at least a 44 by 44 pixel target. A small visible `Home` label may accompany it when the house drawing is not self-evident.
- The four Home navigation clusters are never draggable.

Every drawing keeps its conventional text label at rest. An annotation may add personality or clarification, but it never replaces the label.

### Home

The feeling of infinite space. with 4 icons in center. minimal space.

The field should feel composed rather than unfinished. Spacing, annotation paths, scale, and the relationship between the four drawings provide the structure.

Reading and keyboard order remains Who I am, Work, Connect, Blog regardless of visual placement.

The homepage is an empty interactive field rather than a notebook page or conventional hero. It loads directly with four Igor-drawn icon clusters labeled Who I am, Work, Connect, and Blog. There is no wrapper, desk scene, route container, or entry animation. Who I am opens a hand-drawn destination composition containing Igor's introduction, portrait, doodles, and values. Work expands two linked icon nodes in place, one labeled Software and one labeled Games, and either opens its hand-drawn destination in the same field. Blog opens a calmer hand-drawn writing composition. Connect expands the external contact links in place.



### Pages and transitions

Every destination route uses the same persistent field as Home. The field is the page itself, not a margin around another surface. A destination should feel drawn into an existing space, not like a new full-screen theme.

Compose destination content through hand-drawn borders, spines, dividers, frames, paths, brackets, arrows, and broken strokes. These marks establish relationships and reading rhythm without turning the route into conventional interface chrome. Borders may be partial, asymmetrical, and open. Do not automatically enclose the whole route or every content block in a rectangle.

Negative space remains functional. It establishes continuity, gives the composition room to breathe, and reserves a stable area for the Home drawing. It may also hold restrained authored doodles when they support the composition, but it should not become a second navigation canvas.

Use the exact same background token throughout Home and destination routes. The latest sketch establishes spatial behavior, not a final black-and-white palette.

For long routes, let the hand-drawn composition continue vertically through recurring lines, marks, and spatial relationships. Place the Home drawing in the upper-left reserved edge area by default and keep it reachable during long reading without allowing it to overlap destination content. On mobile, move it into a reserved field band above the content.

Paper is exceptional rather than structural. Use it only for an exact element that Igor personally specifies. Until that instruction exists, keep the route and its content on the persistent field using the hand-drawn language.

Route transitions should be simple. The unchanged field provides continuity while the destination's hand-drawn composition appears. Do not add a paper-arrival or paper-unwrapping transition unless Igor explicitly assigns paper to that destination element and separately requests the motion.


### Who I am

Who I am is an open hand-drawn composition directly on the persistent field. Incomplete borders, connecting lines, annotations, and spacing organize the introduction, portraits, and values without placing the route inside a separate surface.

It contains:

- Igor's introduction;
- the real and drawn portrait interaction;
- the unified craft-values composition.

Paper element is "id love to chat with you" that appears when all checkboxes are clicked it appears on top of the outlined area (dashed lines) with question marks indicating that a *secret* element should appear there.

#### Craft values

Who I am presents one unified craft-values composition, not separate process and outcome columns:

1. fulfill a real wish for an experience, behaviour, or capability;
2. create an impactful and empowering interaction experience;
3. be clear and honest with users or players.

These are directions for first-person public copy, not mandatory visible headings.

Autonomy, ownership, feedback, learning, teaching, and turning unclear needs into coherent products remain internal context about how Igor works. Do not publish them as a competing values list.


These values should be in a handrawn checklist and also the text itself should be interactable via taping on it they change specific word:
1. fulfill a real wish for (experience, behaviour, capability)
2. create an (impactful, empowering) interaction experience
3. be (clear, honest) with users or players


### Work

Selecting Work on Home expands two Igor-drawn icon nodes with visible names:

1. Software
2. Games

Each icon-and-name pair is one semantic link to the corresponding Software or Games destination. Hand-drawn connector strokes branch from the Work node to both icon links. On wide screens, arrange the two destination nodes vertically with a small authored horizontal offset so the stack feels placed by hand rather than mechanically aligned. Both icons use the same restrained hover and keyboard-focus wobble as the primary Home drawings. After enhancement, clicking anywhere outside the Work cluster closes the choices. Escape also closes them and returns focus to Work.

Work uses a Home disclosure as its index and keeps `Software` and `Games` as directly linkable routes. Both icon links remain visible without JavaScript.

Software and Games are hand-drawn long-form routes on the persistent field. Organize projects through open borders, recurring spines, connecting paths, annotations, and authored artifacts. Do not turn the routes or their project records into sheets or a conventional card grid.

Keep the Work compositions loose rather than dividing them into visible portfolio categories. Lead with the real artifact, its name, and a verified result or destination when one matters. Do not add promotional summaries, marketing introductions, tag rows, badges, or visible group headings that repeat what the artifact already communicates. Present capabilities, tools, engines, and honest status notes as a simple handwritten list titled `Learned along an artifact`.

The content should be simple, project, what I have learned aka end-to-end ownership, interaction design, environment aesthetic & dialogues, rapid development in a game jam environment, player experience, system behaviour modeling, system structuring.

Software has:

1. the complete Flutter product;
2. Chinese Bee;
3. the receipt-processing investigation;

Games has:

1. `Discourses by Campfire`;
2. `Secret Santa Foundation`;
3. Snake with Go and raylib;
4. C++ and OpenGL Tic-Tac-Toe.


Use `docs/CONTEXT_ABOUT_IGOR.md` for all claims and evidence boundaries.

The résumé should be offered in pdf or docx. (the visitior should be able to easility download it in pdf or docx `/Users/iggysleepy/dev/web/frontend/personal-website/CV_Igor_Kupchinenko_EN.docx`) 




### Blog

This is a calm hand-drawn route that lists written articles as links and explains what each is about very concisely. Use drawn lines, spacing, annotations, and incomplete borders to organize the writing without turning the whole route into a sheet or conventional card list.

### Connect

Connect does not create a full-screen page. Ink lines or another drawn connection expand from its Home cluster and reveal visibly labeled links.

- email;
- LinkedIn;
- GitHub;
- itch.io;
- X;
- résumé PDF.



## Typography

Use exactly two handwritten families across Home and destination materials:

1. `Bright Chalk` for regular reading and interface text; 
2. `Cartoon Relief` for a small number of large distinctive moments.



Bright Chalk is used for:

- paragraphs;
- navigation;
- links and controls;
- practical labels;
- captions and annotations;
- lists and contact information;
- technical explanations.

Cartoon Relief is reserved for:

- one dominant statement;
- a major project name;
- an important question;
- a major verified result.

Do not use Cartoon Relief for navigation, paragraphs, buttons, captions, or repeated card titles.

Protect handwritten readability:

- body text starts near 18 to 20 pixels on desktop;
- paragraphs use at least 1.5 line height;
- ordinary text columns remain near 45 to 60 characters;
- dense technical material is edited into short blocks rather than reduced in size.

The font files must be licensed for web embedding, stored locally, and delivered as optimized webfonts. Do not depend on fonts installed on Igor's computer.

Pixel typography is limited to authentic game media or a small project-specific label. It is not a second website type system.


## Composition

Do not build pages around a visible H1, H2, H3 landing-page ladder. Composition should be driven by real artifacts, photographs, diagrams, results, questions, and annotations.

Semantic structure remains required. Use a visually hidden H1 when no natural visible page title exists, and label regions through visible fragments or accessible labels.

Avoid repeating eyebrow, enormous heading, explanatory paragraph, and card grid on every route.

Free-form composition over Structured composition.

## Interaction rules

Scroll should reveal relationships, not fade every block upward. Selected attachments may move by small bounded distances, and blueprint paths may draw in discrete sections.

Click responses should use a short pencil, ink, stamp, graphite, or pressure mark. Do not use generic ripples, glows, bouncing icons, or confetti.

> *LATER/OPTIONAL*: Draggable objects is a cool idea that i dont know where to use for now, so lets not do it until I pick what should be draggable.

Custom interactions should:

- create delight;
- reveal personality;
- reinforce the content;
- make the material world itself credible as an interactive portfolio artifact;
- remain responsive;
- support keyboard and touch interaction.

They should not:

- hide essential information;
- make navigation unpredictable;
- delay access to content;
- depend only on hover;
- interfere with accessibility;

## Responsive and accessible behavior

TODO: understand how to handle mobile widths.

Proposed by AI:

- recompose Home as a readable two-by-two or vertically meandering index;
- do not shrink the desktop free-form composition;
- expand Connect as a wrapped or vertical list rather than a cramped radial constellation;
- preserve generous field space around destination content and a usable field band for the Home control;
- simplify desktop border compositions into one or two strong hand-drawn spines, dividers, or open boundaries rather than shrinking the full desktop drawing;
- keep the Home control outside the main content composition and reachable without horizontal scrolling;
- touch targets remain at least 44 by 44 pixels;
- important drawings never crowd text.


Always preserve:

- one `main` landmark;
- an accessible page name;
- skip link;
- visible focus states;
- descriptive alternative text;
- hidden decorative images;
- keyboard and touch access;
- readable contrast;
- direct linking and browser history;
- JavaScript-free access to every route and essential item.

With reduced motion, skip material travel, parallax, and drag animation. Navigate immediately or use a very short fade and show the completed hand-drawn destination composition in the persistent field.


This document translates that source into website strategy.

## Main objectives

The website should help visitors understand:

- who Igor is;
- what he values;
- how he thinks;
- what he has built;
- what kinds of problems he can solve;
- what he is currently exploring;
- how to contact him.

It should support job searching without feeling as though every element exists only to sell Igor to an employer.

## Professional and craft source of truth

`docs/CONTEXT_ABOUT_IGOR.md` is my professional background, demonstrated evidence, capability levels, unified craft values, working conditions, current gaps, and direction.


## Primary audiences

- Product teams (designers and visioneers), engineering leads, and technical founders
- Game and interactive-product teams
- Potential collaborators and compatible people
