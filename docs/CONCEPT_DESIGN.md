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

Use actual personal hand-drawn elements to maximum rather than relying only on ai generated as much as possible.

If an Igor-authored artifact is required but missing, insert a clearly labeled development placeholder rather than inventing finished personal material. References for the hand-drawn language are stored in `/Users/iggysleepy/dev/web/frontend/personal-website/handmade-style-reference` and on `/Users/iggysleepy/dev/web/frontend/personal-website/src/assets/art/doodles`. Use reference sites for quality analysis, not copied compositions or assets.


### Details

- selected personal doodles scattered across the pages. On home page it should be transparent so its not very attention grabbing. on the other pages on paper it should be more visible.
- elements could be either hand-drawn or pictures



## Structure and content

For my vision refer to the `/Users/iggysleepy/dev/web/frontend/personal-website/storyboards` folder, it contains my drawings explaining the structure of the website

Home is minimalistic a nearly empty with monochromatic background and extensive negative space field. This field is also the persistent space around every destination page.

Home loads directly with four Igor-drawn, visibly labeled choices:

1. `Who I am`
2. `Work`
3. `Connect`
4. `Blog`

Who I am, Work, and Blog open real routes. Selecting one summons its destination material into the field. The material unfolds from the selected drawing, settles as an inset page, and leaves the unchanged Home field visible around it.

Connect remains on Home and expands locally to reveal email, LinkedIn, GitHub, itch.io, X, and résumé.


### Navigation model

- `Who I am`, `Work`, and `Blog` are semantic links.
- `Connect` is a semantic disclosure button with `aria-expanded` and `aria-controls`.
- The Connect state is directly linkable through `/#connect`.
- `/connect/` forwards to `/#connect`.
- Work exposes directly linkable `Software` and `Games` modes.
 Games mode.
- Every destination has a hand-drawn Home control in the exposed field margin outside the page.
- The Home drawing is a semantic link to `/`, has an accessible name of `Home`, a visible focus state, and at least a 44 by 44 pixel target. A small visible `Home` label may accompany it when the house drawing is not self-evident.
- Do not repeat all four Home choices on destination pages. The single Home control is the stable way back to the index.
- The four Home navigation clusters are never draggable.

Every drawing keeps its conventional text label at rest. An annotation may add personality or clarification, but it never replaces the label.

### Home

The feeling of infinite space. with 4 icons in center. minimal space.

The field should feel composed rather than unfinished. Spacing, annotation paths, scale, and the relationship between the four drawings provide the structure.

Reading and keyboard order remains Who I am, Work, Connect, Blog regardless of visual placement.

The homepage is an empty interactive field rather than a notebook page or conventional hero. It loads directly with four Igor-drawn icon clusters labeled Who I am, Work, Connect, and Blog. There is no wrapper, desk scene, paper container, or entry animation. Who I am opens warm notebook paper containing Igor's introduction, portrait, doodles, and values. Work opens graph paper and tracing layers. Blog opens a calmer writing sheet. Connect alone expands the external contact links in place.



### Pages and transitions

Every destination page sits inside the same persistent field used by Home. On desktop, leave a deliberate band of that field visible around the paper. The page should feel placed or summoned into an existing space, not like a new full-screen theme.

The exposed field is functional negative space. It holds the Home drawing and establishes continuity, but it is not a second canvas for decoration, navigation clusters, or project content.

Use the exact same solid background token on Home and in these margins. The latest sketch establishes spatial behavior, not a final black-and-white palette.

For long pages, the paper may continue vertically while the field remains visible as side rails. Place the Home drawing in the upper-left field margin by default and keep it reachable during long reading without allowing it to overlap the paper. On mobile, move it into the reserved field band above the paper.

For pages use warm, slightly rough notebook paper.

Transition to the page should just simply load a page and since the background on the sides is the same as on home it should feel like the paper appears

> *OPTIONALLY*: If its possible would be cool to make an low-frame-rate animation of the paper appear unwrapping looking like in The Paper Ball Toss gmae to the unwrapped page with content. Maybe it can be made with transitioning to the blank background and then playing the animation. But im not sure.


### Who I am

It contains:

- Igor's introduction;
- the real and drawn portrait interaction;
- the unified craft-values composition.


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

when opening there should be two simple folded papers with words on them:

1. Software
2. Games

When clicking on them user chooses to open either software or games "paper"


Work is one index with `Software` and `Games` modes.

Show every verified artifact Igor chooses to include at an honest level of prominence:

1. featured cases;
2. supporting work;
3. experiments, early work, and unfinished work.

Lead Software with:

1. the complete Flutter product;
2. Chinese Bee;
3. the receipt-processing investigation;

Lead Games with:

1. `Discourses by Campfire`;
2. `Secret Santa Foundation`.

Show Snake with Go and raylib and C++ and OpenGL Tic-Tac-Toe as smaller trajectory artifacts. Keep unfinished work visibly unfinished and practical art or audio as supporting capability.

Use `docs/CONTEXT_ABOUT_IGOR.md` for all claims and evidence boundaries.

The résumé should be offered in pdf or docx. (the visitior should be able to easility download it in pdf or docx `/Users/iggysleepy/dev/web/frontend/personal-website/CV_Igor_Kupchinenko_EN.docx`) 



### Blog

This is a simple paper that lists written articles (links to it) and what are they about very concisely.

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
- preserve a narrow visible field around the destination material and a usable field band for the Home control;
- allow the paper to occupy most of the width, but do not let it become visually indistinguishable from a full-screen page;
- keep the Home control outside the paper and reachable without horizontal scrolling;
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

With reduced motion, skip material travel, parallax, and drag animation. Navigate immediately or use a very short fade and show the completed inset page in the persistent field.


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
