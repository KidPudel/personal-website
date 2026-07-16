# Personal Website Context

## Purpose of this document

This document provides the product, content, and personal context required to help build my personal website and portfolio.

Use it to guide:

- information architecture;
- page structure;
- visual hierarchy;
- writing and editing;
- project case studies;
- technical decisions;
- implementation priorities;
- decisions about what to include or exclude.

Do not treat every sentence here as text that must appear publicly. This is internal context for understanding what the website needs to accomplish.

---

# 1. Main objective

The website should help me find professional opportunities.

The primary objective is to make it easier for hiring managers, engineering leads, technical founders, recruiters, potential collaborators, and possible clients to understand:

1. what I can do;
2. what kinds of problems I have solved;
3. how I think about engineering;
4. what I have built;
5. why my combination of experience may be useful to them;
6. how to contact me.

The website must not merely be a personal archive or an artistic self-expression project.

It should create professional clarity and trust.

The desired result is that a relevant visitor can quickly conclude:

> Igor is an experienced software engineer with backend and data-system depth who can also independently build complete, interactive products and game systems.

---

# 2. Current situation

I started learning programming from scratch in 2019.

I have approximately five years of software-development experience in total, including more than three years of professional Go/backend experience.

I have been without a job for approximately nine months.

During most of those nine months, I worked seriously on game development. I completed four games and developed practical experience with:

- Godot;
- Unity;
- gameplay programming;
- game systems;
- game design;
- data-driven design;
- 2D and 3D workflows;
- pixel art;
- Blender;
- sound and music;
- effects;
- complete solo project delivery.

My strongest paid professional experience is in backend and product engineering.

My strongest visible and recently documented work is in game development.

The website must use both without creating the impression that I am confused, unfocused, or pretending that they are the same thing.

---

# 3. Career model

Do not frame my career through identity.

Avoid presenting me as if I must permanently be one of these:

- backend developer;
- game developer;
- data engineer;
- creator;
- generalist;
- specialist.

I think of titles as market labels for capability packages.

A capability is something I can reliably do to make a result possible.

A project combines capabilities to provide a capability, behaviour, artifact, or experience to someone else.

A professional vertical emerges when several things converge:

- recurring interest in the underlying problems;
- accumulated experience;
- increasing depth;
- tolerance for the difficult parts;
- trade-off reasoning;
- external trust;
- financial usefulness;
- sustainable long-term practice.

The website should communicate capabilities and evidence first. Titles should only be used when they help visitors understand where I fit professionally.

---

# 4. Recommended professional positioning

My strongest current commercial positioning is:

> Product-oriented software engineer with backend and data-system depth.

A more specific variation is:

> Software engineer focused on stateful, data-intensive, and event-driven systems.

A broader portfolio-level formulation may be:

> I build stateful, data-driven, and interactive systems.

This broader statement can connect my backend and game work, but it must not become vague or grandiose.

The website should make clear that:

- backend engineering is my strongest proven professional anchor;
- game and interactive-system development is serious recent work, not a random weekend experiment;
- my breadth supports complete product ownership;
- I am not claiming senior commercial game-industry experience;
- I am not claiming to be an architect;
- I am not claiming to be able to build literally anything.

---

# 5. Target audiences

The website should work for several related audiences.

## Primary audience

### Backend and product-engineering hiring managers

They need to see:

- professional backend experience;
- Go experience;
- event-driven services;
- system and data modelling;
- integrations;
- databases;
- performance investigation;
- production problem-solving;
- ownership;
- evidence of measurable results.

### Engineering managers and technical founders

They should see that I can:

- understand a real problem;
- move across technical boundaries;
- make pragmatic trade-offs;
- build complete product capabilities;
- investigate unclear technical failures;
- work independently;
- communicate technical reasoning.

## Secondary audience

### Indie game studios and interactive-product teams

They need to see:

- completed games;
- gameplay and systems programming;
- Godot experience;
- data-driven architecture;
- rapid prototyping;
- understanding of player behaviour;
- ability to work across implementation and design;
- awareness of scope and production constraints.

### Possible clients and collaborators

They should understand that I may be useful for:

- backend systems;
- integrations;
- workflow automation;
- data-heavy tools;
- gameplay systems;
- Godot prototypes;
- interactive products;
- developer or game-production tools.

The website should not try to give every audience equal prominence in every section.

---

# 6. Core capability groups

## A. Backend and product systems

Capabilities include:

- Go backend development;
- Python backend development;
- API design and implementation;
- domain and state modelling;
- service integration;
- PostgreSQL;
- Redis;
- Kafka;
- gRPC;
- Protobuf;
- JWT-based authorization;
- asynchronous workflows;
- webhook and callback delivery;
- payment and order processing;
- document-processing workflows;
- production debugging;
- performance optimization;
- mentoring and onboarding.

## B. Data and system reasoning

Capabilities and interests include:

- relational modelling;
- SQL;
- joins and set operations;
- window functions;
- aggregations;
- CTEs and subqueries;
- indexes;
- execution plans;
- transactions and data correctness;
- analytical use of data;
- event modelling;
- data flow;
- pipeline reasoning;
- data warehouses;
- Kimball modelling;
- Data Vault concepts.

Do not overstate commercial data-engineering experience.

It is more accurate to describe this as an area of growing depth supported by backend experience.

## C. Game and interactive systems

Capabilities include:

- Godot development;
- gameplay programming;
- gameplay systems;
- technical game design;
- state machines;
- data-driven mechanics;
- separation of data, logic, and presentation;
- player feedback;
- prototyping;
- 2D game development;
- 3D game development;
- Unity familiarity;
- pixel art;
- Blender;
- basic animation;
- effects;
- music and sound;
- solo game production.

## D. Cross-cutting capabilities

These are important because they connect the different areas:

- learning unfamiliar tools in response to a concrete problem;
- understanding complete workflows;
- modelling system behaviour;
- translating an intended experience into technical systems;
- investigative debugging;
- performance reasoning;
- choosing tools pragmatically;
- working across layers;
- end-to-end ownership;
- explaining systems;
- mentoring;
- thinking in trade-offs rather than following dogma;
- completing projects under constraints.

---

# 7. Important professional evidence

Do not hide my paid backend experience simply because its source code is private.

Use anonymized case studies where necessary.

All metrics must be presented as approximate unless verified.

## Receipt-processing optimization

Situation:

- A receipt-validation workflow processed images and PDFs.
- It relied heavily on OCR.
- Processing took approximately 6 to 7 seconds or longer.
- OCR was expensive and unnecessary for some documents.

My contribution:

- investigated direct PDF content extraction;
- tested multiple Go libraries;
- created a test collection of previously classified receipts;
- compared recognition results;
- identified that the Go approach was unreliable for some files;
- pragmatically moved the extraction path to Python and a more mature library;
- reduced unnecessary OCR usage;
- helped investigate fraudulent document patterns at the binary level.

Approximate outcome:

- processing time reduced from around 6 to 7 seconds to approximately 600 milliseconds;
- lower OCR usage;
- lower processing cost;
- improved extraction reliability.

What this demonstrates:

- investigation;
- measurement;
- changing tools when evidence justifies it;
- performance optimization;
- document processing;
- practical problem-solving;
- cost awareness.

## Event-driven backend systems

Professional experience included:

- Go microservices;
- Kafka;
- Redis events;
- gRPC;
- Protobuf;
- PostgreSQL;
- payment and order workflows;
- expiration processing;
- callback and webhook delivery;
- authentication and authorization.

Possible case-study examples:

### Callback service

- consumed Kafka events;
- delivered real-time webhook notifications;
- handled communication between internal events and external consumers.

### JSON to Protobuf migration

- replaced JSON payloads in service communication with Protobuf;
- approximate reported performance improvement was significant, possibly around 20 times;
- this metric must be verified before publication.

### gRPC authorization middleware

- implemented JWT-based authorization middleware using go-jwx.

### Expiration workflow

- queried stored expiration dates;
- identified expired orders;
- emitted cancellation events through Kafka.

## Flutter product ownership

Situation:

- company maintained separate Android and iOS products;
- I proposed a cross-platform Flutter replacement.

My contribution:

- created an initial prototype while learning Flutter;
- gained management approval;
- built the application largely independently;
- implemented payments;
- implemented themes;
- maintained parts of the legacy Android application;
- proposed and implemented design and quality improvements;
- handled cross-platform delivery.

What this demonstrates:

- initiative;
- fast learning;
- product ownership;
- cross-platform development;
- working across product and engineering concerns.

Avoid pretending the architecture was perfect. I consider parts of the project messy in retrospect.

## Chinese-learning application

This was one of my favourite projects.

It included:

- a Telegram bot;
- Chinese to Russian and English dictionary data;
- database storage;
- search;
- pronunciation;
- saved vocabulary;
- quizzes;
- a Telegram-integrated web application;
- handwritten glyph input;
- AI-based similarity scoring.

What this demonstrates:

- meaningful product purpose;
- backend;
- data;
- interaction design;
- integration;
- complete product delivery;
- combining multiple capabilities around one useful outcome.

---

# 8. Game-development evidence

I completed four games during the recent nine-month period.

Each selected game should become a case study, not merely a screenshot gallery.

For each game, explain:

1. the intended player experience;
2. the mechanics and systems;
3. my responsibilities;
4. important technical decisions;
5. scope constraints;
6. trade-offs;
7. what worked;
8. what did not work;
9. what I learned;
10. where the game can be played or watched.

## Farming simulation game

Relevant points:

- top-down game;
- weather effects;
- farming-related mechanics;
- data-driven design;
- layered architecture;
- separation between data, logic, systems, and view;
- major growth in understanding game-system design.

Potential central case-study question:

> How can changing weather and system state create meaningful player decisions?

## Secret Santa game-jam project

Relevant points:

- cute elf character;
- pixel-art 2D platformer;
- falling and movement sections;
- sneaking through a room and obstacles;
- restart-based or roguelike structure;
- all pixel art created by me;
- all programming completed by me;
- players responded positively.

This project should demonstrate:

- finishing under constraints;
- game-jam delivery;
- mechanic transitions;
- player-facing feedback;
- visual and technical ownership.

## 3D Godot game

Relevant points:

- 3D game;
- programming;
- game design;
- Blender models;
- art;
- effects;
- music;
- broad solo production;
- pragmatic data-driven architecture;
- conscious avoidance of treating architecture as dogma.

Important context:

The project became exhausting because:

- I was performing several disciplines simultaneously;
- I had already been unemployed for several months;
- my projects and personal life lacked healthy boundaries.

Do not present this as evidence that I dislike 3D, art, low-level work, or multidisciplinary creation.

Present it as evidence of:

- broad execution;
- ambition;
- production experience;
- the importance of scope and boundaries.

## Unity cooking or kiosk game

Relevant points:

- 3D;
- inspired by kiosk or cooking-order games;
- assembly and order fulfilment;
- used to compare Unity and Godot;
- I found Godot more comfortable and suitable for my workflow.

Do not turn this into an engine-war argument.

It demonstrates:

- engine adaptability;
- willingness to test assumptions;
- understanding of interactive product flow.

---

# 9. What the website should communicate about my values

I care about work where:

- the purpose is understandable;
- the artifact provides a real capability;
- the result can provide joy, usefulness, behaviour, or experience;
- the work has a mechanism or system feel;
- state and data flow meaningfully;
- technical decisions connect to a visible result;
- I understand what I am making and why;
- I can reason about trade-offs;
- I can own a meaningful part of the outcome.

I do not require every task to be exciting.

I understand that professional work includes:

- maintenance;
- debugging;
- deployment;
- repetitive testing;
- dependency upgrades;
- operational work.

The problem is not the existence of friction.

The problem is work dominated by low-information busywork that is disconnected from understanding, learning, useful system behaviour, or product progress.

---

# 10. Important nuances

## I do not dislike building systems

Do not infer that I dislike systems engineering.

I disliked situations such as spending four hours resolving dependency-version conflicts where the effort produced little learning or meaningful product progress.

## I do not dislike low-level programming

I have enjoyed:

- C++;
- memory management;
- pointers and references;
- OpenGL;
- lower-level game frameworks;
- graphics and engine concepts.

For game creation, I prefer Godot because my desired focus is usually:

- mechanics;
- game systems;
- game design;
- player experience;
- flow.

This is a choice of abstraction for the goal, not a rejection of technical depth.

## I do not dislike multidisciplinary creation

I enjoyed and felt proud of doing:

- programming;
- art;
- 3D modelling;
- effects;
- animation;
- music;
- design.

It became exhausting because of scope, unemployment pressure, and unhealthy boundaries.

Do not describe multidisciplinary work itself as a negative signal.

---

# 11. Website narrative

The website should not present my history as random technology switching.

A better narrative is:

1. I started learning programming from scratch.
2. I struggled for a long time to move beyond tutorials.
3. I gradually learned to use programming as a way to express and implement my own reasoning.
4. I entered professional software development through mobile applications.
5. I progressed into complete product ownership.
6. I became increasingly interested in backend behaviour, APIs, databases, and data flow.
7. I developed several years of Go and backend experience in payment and event-driven systems.
8. During unemployment, I used game development as a serious practical laboratory for system design, interaction, scope, architecture, and complete creation.
9. I am now looking for work where I can apply my production backend experience while continuing to develop as a product- and systems-oriented engineer.

The narrative should emphasize progression, not apology.

---

# 12. Recommended site structure

The exact structure may change, but a useful default is:

## Home

Purpose:

- communicate the professional thesis quickly;
- show strongest evidence;
- make the next action obvious.

Possible content:

- concise headline;
- one-paragraph positioning;
- selected backend case studies;
- selected games;
- capability overview;
- current availability;
- CV and contact links.

## Work or Case Studies

Separate the content visually into:

### Production engineering

- receipt-processing optimization;
- callback/event workflow;
- Flutter product;
- other anonymized backend cases.

### Games and interactive systems

- two or three strongest game case studies;
- playable links;
- videos;
- technical reasoning.

Do not hide either group, but make the distinction clear.

## Projects

For smaller tools, experiments, open-source work, or unfinished but useful artifacts.

Only include projects that demonstrate something specific.

Do not create a graveyard of abandoned repositories.

## Writing

Include the “Identity Cage” post and future writing about:

- software engineering;
- game design;
- learning;
- systems;
- tools;
- reasoning.

Writing can demonstrate communication and thought process, but it should not dominate the hiring experience.

## About

Explain the path concisely.

Avoid writing a full autobiography.

Focus on:

- how I approach problems;
- what I value;
- what I am currently looking for;
- the relationship between backend, data, games, and product thinking.

## Contact

Make it easy to:

- email me;
- view LinkedIn;
- view GitHub;
- download CV;
- view game profiles or playable projects.

---

# 13. Homepage positioning ideas

These are directional examples, not finalized copy.

## Option A

### I build stateful, data-driven, and interactive systems.

Software engineer with professional experience in Go backend systems, event-driven services, integrations, and performance-sensitive data processing. I also design and build complete game and interactive systems in Godot.

## Option B

### Product-oriented software engineer with backend and systems depth.

I have worked on payment services, Kafka and gRPC workflows, integrations, document processing, and complete applications. My recent work explores game systems, data-driven design, and interactive products.

## Option C

### Backend systems, interactive products, and the space between them.

I build software where state, data, and behaviour form a complete capability for the user.

Avoid overly abstract copy that makes it difficult to understand what role I can perform.

---

# 14. Writing style

The website should sound:

- direct;
- clear;
- thoughtful;
- technically credible;
- personal without oversharing;
- reflective without becoming philosophical everywhere;
- confident without pretending certainty;
- pragmatic;
- honest about trade-offs.

Avoid:

- generic startup language;
- inflated claims;
- “passionate developer”;
- “crafting seamless experiences”;
- “innovative solutions”;
- “rockstar”;
- “ninja”;
- “10x engineer”;
- forced inspirational language;
- excessive jokes in professional case studies;
- describing me as able to do anything;
- presenting breadth as automatic mastery;
- identity-based statements such as “I am a creator”;
- em dashes.

Use concrete evidence instead of adjectives.

Bad:

> I am a highly passionate and versatile engineer who creates innovative, scalable solutions.

Better:

> I have built Go services using Kafka, gRPC, PostgreSQL, and Redis, improved a document-processing path from roughly seven seconds to around 600 milliseconds, and independently shipped mobile and game projects.

---

# 15. Case-study format

Use a consistent structure.

## Summary

One or two sentences explaining what was built or changed.

## Intended capability

What became possible for the user, business, player, or team?

## Context

What system or problem existed?

## Constraints

What made the work difficult?

## My contribution

What did I personally do?

## Reasoning

What alternatives were considered?

Why was the selected approach appropriate?

## Result

What changed?

Use measurements where verified.

## Reflection

What would I improve now?

What did this teach me?

For game projects, also include:

- player experience;
- mechanics;
- feedback;
- design iteration;
- scope decisions.

---

# 16. Visual priorities

The design should support evidence, not compete with it.

Prioritize:

- legibility;
- fast navigation;
- strong typography;
- clear hierarchy;
- good code and diagram presentation;
- high-quality game screenshots or short videos;
- simple project cards;
- readable case-study pages;
- responsive mobile layout;
- fast loading;
- accessibility.

Avoid:

- excessive animation;
- effects that interfere with reading;
- generic terminal aesthetics solely because I am an engineer;
- complicated navigation;
- hiding information behind interactions;
- spending weeks perfecting decorative details;
- visual design that resembles a game studio if backend employment remains the primary objective.

The website can have personality, but it must remain professionally usable.

---

# 17. Technical priorities

Do not overengineer the website.

The implementation should favour:

- static generation where practical;
- good performance;
- simple content management;
- Markdown or MDX for case studies and writing;
- reusable project components;
- easy image and video embedding;
- good SEO metadata;
- sitemap and social previews;
- accessible HTML;
- simple deployment;
- low maintenance.

Do not introduce:

- microservices;
- a database;
- complex authentication;
- unnecessary client-side state;
- a custom CMS;
- heavy animation libraries;
- infrastructure that does not support an actual requirement.

The website itself should demonstrate judgment through simplicity.

Ask before making major stack choices if the stack has not already been selected.

---

# 18. Current priorities

The website should be built incrementally.

## First useful version

The first version only needs:

1. homepage;
2. concise professional positioning;
3. CV link;
4. contact information;
5. two strong backend case studies;
6. two or three game projects;
7. one short about section;
8. responsive and accessible layout.

## Later improvements

After the first version is published:

- improve screenshots and recordings;
- add architecture diagrams;
- publish more writing;
- add technical project details;
- add testimonials or references;
- add new commercial work;
- improve SEO;
- add focused landing pages for specific opportunities if evidence supports them.

Do not block publication on perfect completeness.

---

# 19. Important instructions when assisting

When editing or generating content:

- preserve factual accuracy;
- do not invent responsibilities;
- do not invent metrics;
- flag uncertain numbers;
- ask for missing information when it materially changes the result;
- keep backend and game experience clearly differentiated;
- do not apologize for the breadth of my experience;
- do not overstate commercial game experience;
- do not minimize my production backend experience;
- prefer outcomes and decisions over technology lists;
- connect technical work to the capability or behaviour it provided;
- explain trade-offs where useful;
- avoid turning every project into proof of every capability;
- keep scope controlled;
- prevent portfolio work from becoming another form of procrastination.

When implementation work risks becoming unnecessary meta-work, prioritize publishing the simplest useful version.

---

# 20. Decision rule

When uncertain about whether something belongs on the site, ask:

1. Does it help a relevant visitor understand what I can do?
2. Does it provide credible evidence?
3. Does it clarify how I think or work?
4. Does it support a concrete professional opportunity?
5. Is it stronger than the content it would displace?
6. Can it be presented honestly and concisely?

If not, omit it.

---

# 21. Final intended impression

After viewing the website, a relevant visitor should understand:

> Igor is a software engineer with real production backend experience, strong system and data reasoning, and unusual breadth across complete applications and interactive game systems. He is capable of understanding a problem, modelling its behaviour, investigating technical constraints, and delivering a working result.

The website should make this impression through evidence, not through self-description alone.
