# Context About Igor

## How this document is used

This is the authoritative internal source for Igor's professional background, craft evidence, capability levels, process values, outcome values, gaps, current direction, and suitable role labels.

When another project document conflicts with it, use this document unless Igor has given a newer explicit instruction. Update current plans and public content to match, but preserve dated progress entries as history and add a clear correction.

This file is not public copy and is not blanket permission to publish every detail. Employment circumstances, unofficial work, location constraints, personal assessments, and capability gaps may guide honest claim boundaries without appearing verbatim on the website. Public copy should use only relevant, approved, anonymized evidence.

Keep four questions separate when translating this context:

1. What has Igor demonstrably done?
2. At what level does the evidence support the capability?
3. What direction does Igor currently want to deepen?
4. What remains a gap, hypothesis, or unverified claim?

Do not turn the current direction into a permanent identity or imply that every listed role label is equally suitable today.

This document records significant evidence and direction, not an exhaustive inventory of everything Igor has made. Omission here must not be treated as a decision to hide a project. Build the public Work inventory from verified repositories, artifacts, media, and Igor's explicit additions, then use this document to describe each item at the right capability level.

## 1. Core professional background

* Igor began learning programming in 2019, initially through Python, basic programming exercises, C++, memory-management concepts, OpenGL, mobile development, and independent projects.
* His learning was primarily self-directed and project-driven rather than based on a conventional formal software-engineering path.
* He has approximately **11 months of officially documented employment**, with the formal title **Mobile Developer**.
* He also has substantial paid, but unofficial or project-based, backend engineering experience in crypto and fintech companies.
* His experience spans mobile applications, backend services, APIs, databases, event-driven systems, payment systems, product development, game development, and some data-related study.
* His work history is broad, but it has not yet accumulated into one conventionally recognizable technical specialization.

## 2. Current employment situation

* Igor has been unable to find a job despite approximately three months of cold applications. One of the reasons is because of uncertancy in what direction to move and not letting yourself to do what really fits him based on capabilities + process values + outcome values + willingness to endure.
* He does not consider backend work beneath him and would not reject a suitable backend position. The problem is that employers are currently not selecting him.
* His official employment history makes his real capability level difficult for recruiters to interpret:

  * the formal title is Mobile Developer;
  * much of the backend experience was unofficial or project-based;
  * recent independent work has been primarily game development.
* He is looking primarily for:

  * remote work outside Russia;
  * relocation opportunities;
  * suitable work that can create a path out of the Russian market.
* He believes that cold applications alone are not working and is considering a more evidence-driven strategy:

  * strong projects;
  * direct outreach;
  * referrals and personal relationships;
  * technical or product writing;
  * a distinctive personal website and résumé.
* A former colleague has mentioned a possible opportunity to create a new mobile application for couriers and potentially own more of the product.

## 3. Professional framework

Igor does not treat a job title as an identity.

His working model is:

> A role is a market label for a set of capabilities applied to produce an outcome.

He wants to choose a direction based on the intersection of:

1. capabilities he already has;
2. capabilities he is willing to deepen;
3. the process of work he values;
4. the nature of the outcome being produced;
5. the difficulty and unpleasant parts he is genuinely willing to endure.

He rejects choosing a direction merely because it appears socially safer, more respectable, or easier to explain.

His article, *Identity Cage*, reflects this wider rejection of treating professional labels as fixed personal identities. He sees titles as practical communication mechanisms rather than definitions of what a person is allowed to do.

## 4. Significant experience

### Mobile and product development

Igor worked at a food-chain-related company where he proposed replacing separate Android and iOS applications with a cross-platform Flutter application.

He:

* learned Flutter while building the product;
* created the application from the beginning through production readiness;
* maintained parts of the legacy Android application;
* implemented payment integration;
* implemented themes;
* created a custom menu-listing and scrolling solution requested by the marketing team;
* adapted layouts for different devices and aspect ratios;
* improved product design and quality through personal initiative;
* repeatedly fixed usability, layout, performance, and reliability problems;
* responded to changing management requirements;
* delivered under strict presentation deadlines.

The architecture was initially messy due to his inexperience, but he gradually extracted reusable logic, smaller functions, components, and shared visual definitions.

The strongest part of this experience was not mobile-framework specialization. It was owning an incomplete product need and making the complete application work.

The surviving internal source is at `/Users/iggysleepy/dev/mobile/SuperGoodFlutter/super_good_flutter`. A repository inspection on 2026-07-21 confirmed substantial implementation evidence across menu and category behavior, basket and ordering, payment and 3DS, maps and addresses, courier state, promotions, loyalty and bonuses, themes, device adaptation, navigation, performance, and production-oriented fixes. The repository path and raw implementation remain internal evidence, not automatic public content.

### Courier API work

While working on the mobile product, Igor became interested in APIs, databases, SQL, and backend data flow.

He initiated a rewrite of a legacy courier API:

* studied the existing PHP codebase;
* examined its SQL queries;
* tried to reconstruct the service behaviour;
* initially attempted the rewrite in Go;
* accepted Python and FastAPI when they were more practical for the objective.

This reflects curiosity about system behaviour and pragmatic tool selection rather than loyalty to a language.

### Chinese-learning product

Igor independently built a Chinese-learning product for his girlfriend’s diploma project.

It included:

* a Telegram bot;
* a database of Chinese characters and translations;
* search in several languages;
* pronunciation and character information;
* saved vocabulary;
* quizzes;
* a web application embedded in Telegram;
* handwriting input;
* AI-based handwriting accuracy scoring.

This was one of his favorite projects because multiple technical components formed one coherent and useful capability for another person.

It demonstrates product design, backend implementation, data modelling, integration work, web implementation, interaction design, and end-to-end ownership.

The surviving internal implementation is distributed across:

* `/Users/iggysleepy/dev/tools/scripts/bots/chinesebee_bot` for the Telegram interaction;
* `/Users/iggysleepy/dev/web/backend/chinesebee_api` for search, saved vocabulary, word details, training eligibility, handwriting scoring, and persistence;
* `/Users/iggysleepy/dev/web/frontend/chinese-bee-dictation` for the embedded Vue handwriting and scoring experience.

These paths are evidence sources for reconstructing the case accurately. Do not publish local paths, credentials, deployment configuration, relationship context, or implementation details that are not needed for the public story.

### First fintech backend role

Igor joined a crypto and payment company as a Go developer.

He initially struggled to understand the large architecture and service flows but gradually became productive.

He:

* worked with a gateway containing many microservices;
* implemented provider integrations;
* worked on payment aggregation;
* handled service communication;
* contributed to receipt validation and fraud detection;
* performed scraping and data-analysis-related work;
* later onboarded and mentored two new developers;
* explained service responsibilities, communication paths, and edge cases;
* asked more experienced engineers when he was uncertain.

This demonstrates that he can become effective in a complex inherited system, although his initial orientation may be slower when the architecture is opaque.

### Receipt-validator optimization

This is his strongest evidence of independent investigative engineering judgment.

The system relied heavily on OCR and took approximately six to ten seconds to process a receipt.

Igor:

* understood that many inputs were PDFs rather than images;
* hypothesized that direct PDF text extraction could bypass OCR;
* gathered previously classified receipts;
* tested different Go libraries;
* found that they were unreliable for some files;
* evaluated Python libraries;
* selected a more reliable Python solution;
* introduced a separate Python service;
* adjusted downstream regular-expression logic;
* reduced OCR usage substantially;
* reduced processing time to approximately 600 to 650 milliseconds;
* participated in fraud investigation by comparing binary patterns between valid and manipulated receipts.

The work shows hypothesis formation, experimentation, benchmarking, cross-language design, tool selection, and consequential optimization.

### Second fintech backend role

Igor later worked on another early-stage crypto fintech system.

He implemented:

* order-processing services;
* payment-gateway logic;
* expiration services;
* PostgreSQL queries;
* Kafka event flows;
* Redis communication;
* migration from JSON messages to Protobuf;
* gRPC authorization middleware using JWT;
* webhook and callback delivery.

This demonstrates independent backend service implementation and experience with event-driven systems.

It does not yet demonstrate deep expertise in distributed correctness, operational reliability, or long-term production ownership.

## 5. Game-development experience

During approximately nine months without employment, Igor created four games and started several others.

His work included:

* 2D and 3D games;
* Godot and a smaller Unity experiment;
* data-driven architecture;
* layered system structure;
* weather-dependent plant behaviour;
* day and night cycles;
* terrain and environmental changes;
* state machines;
* resource collection and object placement;
* spatial generation;
* foliage batching and occlusion-related optimization;
* card mechanics based on chains, tags, mutation, resources, catalysts, and inhibitors;
* player psychology;
* difficulty and balancing;
* pixel art;
* Blender modelling;
* animation;
* music;
* sound effects.

He repeatedly returned to game development over several years, including early C++, OpenGL, framework experiments, game jams, Godot, Unity, mechanic design, and written game-design analysis.

### Smaller public game artifacts

Igor built a Snake experiment with Go and raylib and shared it on [X](https://x.com/kidpudel/status/1781656147990020293?s=20). The public post showed six likes and 351 views when verified on 2026-07-21. The useful evidence is that a small technical artifact reached people and received visible engagement, not that the numbers are large or stable.

He also built a C++ and OpenGL [Tic-Tac-Toe project](https://github.com/KidPudel/TicTacToe) earlier in his self-directed learning. Its public repository describes a C++14 build using GLFW, GLAD, and GLM. It is evidence of the longer path through graphics and game experiments, not evidence of current engine or graphics-programming specialization.

### Secret Santa Foundation

This game was created for a game jam and received external player feedback.

Players liked:

* the visual aesthetic;
* the cuteness;
* the overall presentation.

Problems identified through play included:

* missiles entering from outside the visible screen;
* excessive difficulty in the first stage;
* players failing to complete the section within the expected time.

Igor responded by:

* changing missile update behaviour;
* adjusting movement and spawn rates;
* rebalancing difficulty;
* making the experience more understandable and manageable.

This demonstrates real, though still limited, experience with player feedback and gameplay iteration.

### Discourses by the Campfire

This was a 3D winter forest game with environmental changes connected to a day and night cycle.

Igor:

* created much of the art;
* learned Blender;
* produced music and effects;
* implemented the systems and architecture;
* used a data-driven layered structure;
* fixed a broken Windows export immediately after receiving feedback that the game would not launch.

The project demonstrates substantial multidisciplinary creation, but constant switching between programming, art, music, design, and effects was mentally demanding.

### Card-game work

Igor spent substantial time designing a card system around:

* chain ordering;
* card mutation;
* input tags;
* catalysts and inhibitors;
* health, mana, and sanity combined into one resource;
* exhaustion through loss of cards;
* strategic, emotional, and psychological player effects.

The design remains unfinished.

An earlier implementation became cluttered because logic and signals communicated in many directions. This experience contributed to his later interest in clearer system boundaries and data-driven structures.

## 6. Demonstrated capability bundle

### Product shaping

Igor can take an incomplete or ambiguous need and determine:

* what should be built;
* what should be left out;
* what shortcut is acceptable;
* what technology is appropriate;
* what can realistically be delivered under a deadline.

Evidence includes proposing Flutter, choosing a WebView-based payment shortcut for a presentation deadline, reducing game scope, and removing mechanics that appeared too complicated or insufficiently enjoyable.

Current level: **working to independent**, depending on context.

### End-to-end product construction

Igor can work across:

* interface;
* application logic;
* state;
* backend;
* storage;
* external integrations;
* deployment and delivery.

This is one of his strongest demonstrated capabilities.

Current level: **independent**, with stronger evidence in small or moderately scoped products than in large long-lived systems.

### Cross-boundary implementation

Igor is comfortable moving between technologies when required by the product:

* Flutter;
* Android;
* Go;
* Python;
* FastAPI;
* PostgreSQL;
* Kafka;
* Redis;
* gRPC;
* Protobuf;
* Godot;
* Unity;
* Telegram integrations;
* AI services.

He does not appear primarily motivated by becoming loyal to one tool or stack.

Current level: **independent**.

### Experience and interaction design

Igor pays attention to:

* what the user or player understands;
* what actions are available;
* how feedback is presented;
* whether difficulty is appropriate;
* whether the workflow feels clear;
* whether the result creates usefulness, engagement, agency, or learning.

Evidence includes adaptive mobile UI, custom menu navigation, user hints, game difficulty rebalancing, missile visibility, mechanic design, and feedback from players and close users.

Current level: **working**, with stronger intuition than formalized research or evaluation practice.

### Behaviour-system modelling

By this, Igor means modelling the behaviour the product or game must produce, then creating the state, rules, transitions, data, and system boundaries that support that behaviour.

Evidence includes:

* weather-dependent plants;
* day and night environment changes;
* card mutation chains;
* resource and damage relationships;
* gameplay state machines;
* campfire placement modes;
* save and loading systems;
* layered data, logic, and view separation;
* product workflows and stateful interfaces.

Current level: **working to independent**, but uneven.

His current strength is creating useful behavioural structures. His weakness is expressing invariants, state ownership, event ordering, and system contracts precisely.

### System structuring

Igor deliberately structures systems into areas such as:

* data;
* domain or gameplay systems;
* presentation;
* persistence;
* bootstrap and management;
* communication between systems and views.

He has also recognized mistakes such as placing temporary visual state inside persistent domain systems.

Current level: **working to independent**, with developing architectural judgment.

The structures are sometimes effective, but sometimes introduced because they appear conceptually clean rather than because repeated change has proven them necessary.

### Investigative debugging and optimization

Igor can:

* identify a practical problem;
* examine the existing flow;
* form a hypothesis;
* gather test data;
* compare technical alternatives;
* instrument through logs;
* change architecture when necessary;
* verify performance improvements.

The receipt-validator work is the strongest evidence.

Current level: **independent**, and potentially deeper in bounded investigative problems.

### Gameplay mechanic design

Igor has designed:

* player-resource systems;
* chained card effects;
* difficulty curves;
* hazards;
* weather systems;
* state-dependent environmental behaviour;
* progression and failure conditions;
* mechanics intended to produce strategy, pressure, fear, engagement, or discovery.

Current level: **working**.

He has genuine design capability, but not yet enough repeated external playtesting and balancing evidence to claim deep technical game-design specialization.

### Practical visual and audio creation

Igor can create enough:

* pixel art;
* 3D art;
* animation;
* music;
* effects;
* visual atmosphere;

to independently realize and test an experience.

Current level: **supporting capability**, not a demonstrated specialist depth.

### Teaching and explanation

Igor enjoys explaining:

* technical systems;
* learning methods;
* cognitive concepts (cognitive science of learning);
* philosophy and psychology (not professionally)

He has onboarded developers and taught people close to him.

Current level: **working**, with stronger informal teaching ability than formal technical leadership evidence.

## 7. Process values

Igor is most engaged when the work includes:

* autonomy;
* ownership;
* understanding clearly the meaning behind the work;
* transforming an unclear need into something coherent;
* visible behaviour;
* direct user or player impact via feedback;
* learning through building;
* teaching or explaining what he understands.

He is not motivated merely by producing a high volume of output.

He needs to respect what is being produced and why it exists.

## 8. Outcome values


* Wish fulfillment of experience, behaviour, or capability for the user/player.
* Empowering, Electrifying the life interactions that leave a mark of what is possible to feel.

The common pattern is that the result must be directly experienced by a person.

In terms of engineering specifically He is more interested in it as a means to deliver the design of an interaction, capability, behaviour, or experience to the world than in solving technical problems purely for their own sake.

## 9. What drains him

Igor is repeatedly drained by:

* repetitive low-quality production;
* products whose purpose he does not respect;
* dependency and version conflicts that produce little learning;
* long build cycles;
* application-store publishing;
* arbitrary framework friction;
* maintaining systems without understanding or ownership;
* periods where meaningful work disappears;
* excessive context switching across every discipline for long periods;
* passive tutorial consumption without construction;
* abstract study without producing something real;
* work that is disconnected from users or visible outcomes.

This does not mean he dislikes difficult engineering or multidisciplinary work.

He is willing to endure difficulty when it is connected to a result he values.

## 10. Willingness to endure

Evidence suggests that Igor is willing to endure:

* difficult system design;
* repeated iteration;
* unfamiliar tools;
* debugging;
* learning new frameworks or languages;
* art and music learning;
* game-mechanic redesign;
* architectural mistakes and rework;
* incomplete requirements;
* complex cross-boundary implementation;
* criticism and external feedback.

He is less willing to spend years on:

* infrastructure for its own sake;
* repetitive integrations with no meaningful outcome;
* framework expertise as an end in itself;
* technical specialization disconnected from experience or product value;
* low-quality commercial output.

## 11. Current engineering depth

Igor has real engineering capability, but not yet a mature, narrowly recognizable technical specialization.

His strongest demonstrated depth is:

> Taking a desired product or system behaviour, understanding enough of the complete problem, and implementing the mechanism that makes it work.

His depth is distributed across:

* product ownership;
* system behaviour;
* interaction design;
* cross-boundary implementation;
* investigation;
* gameplay systems;
* pragmatic technical decisions.

This makes him stronger than a beginner generalist, but not yet equivalent to a specialist with many years of repeated production problems in one field.

## 12. Areas that are not currently established specializations

There is insufficient evidence to describe Igor as deeply specialized in:

* distributed-system design;
* event-driven correctness;
* database engineering;
* data-platform engineering;
* production observability;
* infrastructure engineering;
* mobile architecture;
* graphics or engine programming;
* game-engine internals;
* multiplayer networking;
* large-scale frontend architecture;
* commercial gameplay programming;
* formal user research;
* professional product design.

Some of these areas have working experience or conceptual exposure, but not established depth.

## 13. Role-defining capabilities that need strengthening

These are capabilities directly connected to the direction, not merely general professional habits.

### Precise behaviour modelling

Strengthen:

* explicit state ownership;
* valid and invalid transitions;
* invariants;
* event ordering;
* interruption and recovery;
* persistent versus temporary state;
* separation between domain and presentation behaviour.

### Experience evaluation

Strengthen:

* defining the intended user or player behaviour before testing;
* observing behaviour rather than relying only on comments;
* identifying hesitation, confusion, failure, and unintended strategies;
* separating interaction problems, mechanic problems, and difficulty problems;
* comparing behaviour before and after a change;
* testing with a wider range of people.

### Mechanics iteration and balancing

For games, strengthen:

* meaningful player choices;
* resource relationships;
* dominant strategies;
* exploitable interactions;
* difficulty curves;
* numerical tuning;
* structural redesign;
* repeated playtesting;
* balancing instrumentation.

### Product workflow modelling

For broader products, strengthen:

* user goals;
* workflows;
* decision points;
* failure paths;
* interrupted operations;
* permissions;
* recovery;
* confirmation;
* offline or unreliable-network behaviour;
* exceptional cases.

### Systems designed for repeated change

Strengthen:

* identifying actual axes of change;
* keeping related behaviour together;
* removing artificial managers and boundaries;
* avoiding premature abstraction;
* evaluating architecture through the cost of the next modification;
* building extension points only when repeated changes justify them.

### Testable simulation and domain logic

Strengthen:

* running behaviour without the visual layer;
* deterministic execution;
* seeded randomness;
* scenario-based tests;
* state-transition tests;
* serialization and replay of failures;
* headless game simulation;
* product-domain tests independent of UI.

### Runtime and performance reasoning

Strengthen:

* profiler use;
* frame-time analysis;
* CPU and GPU understanding;
* memory and allocation behaviour;
* rendering and batching costs;
* update-loop selection;
* asset-loading behaviour;
* measurement before optimization.

### Persistence and operational state

Strengthen:

* operational data modelling;
* mutable state versus historical events;
* data invariants;
* schema changes;
* synchronization;
* client-server compatibility;
* concurrency;
* save-state compatibility.

## 14. General professional maturity gaps

These are important but should not be confused with the specialization itself.

* systematic automated testing;
* observability and production monitoring;
* release and build validation;
* documentation of decisions and trade-offs;
* long-term ownership through many releases;
* designing code for multiple contributors;
* communicating technical investigations precisely;
* production failure handling;
* compatibility and migrations;
* reconstructing past work clearly enough for interviews.

## 15. Current direction

The most accurate current umbrella is:

> **Experience-driven product systems design and engineering**

A more explicit description is:

> Designing the interaction or experience, modelling the behaviour required to create it, structuring the supporting system, and implementing the product across technical boundaries.

The core capability bundle is:

1. product shaping;
2. experience and interaction design;
3. behaviour-system modelling;
4. system structuring;
5. cross-boundary implementation;
6. evidence-driven iteration.

## 16. Game-specific direction

In games, the bundle becomes:

* player-experience design;
* mechanic design;
* behaviour and state modelling;
* gameplay-system architecture;
* simulation;
* balancing;
* feedback and game feel;
* persistence;
* tools for changing and testing mechanics.

The most relevant role labels are:

* Gameplay Systems Engineer;
* Gameplay Programmer;
* Technical Game Designer;
* Systems-focused Game Designer.

The strongest current candidate is **Gameplay Systems Engineer**, with a possible movement toward **Technical Game Designer** if systematic mechanic design, balancing, and player-behaviour analysis become equally developed.

## 17. Broader product direction

The broader category should not be “any product.”

The strongest fit is:

> **Stateful, interaction-heavy products whose value is directly experienced by the user.**

Potential categories include:

* learning products;
* creative tools;
* productivity tools;
* workflow products;
* consumer applications;
* collaborative products;
* simulations;
* products with progression, feedback, configuration, or rich user state;
* operational mobile products such as courier applications, when the work includes workflow and product ownership.

Relevant role labels include:

* Product Engineer;
* Product Design Engineer;
* Interactive Product Engineer;
* Mobile Product Engineer;
* Product-oriented Software Engineer.

## 18. Less aligned primary directions

Based on the available evidence, the following are less suitable as the central long-term depth direction:

* distributed infrastructure as an end in itself;
* generic backend service implementation;
* pure database or data-platform engineering;
* low-level graphics or engine development;
* pure visual interface implementation;
* generic CRUD administration products;
* technical work disconnected from a user or player outcome.

These capabilities may still support the primary direction and may still provide employment.

They simply do not appear to represent the strongest combination of demonstrated capability, process value, outcome value, and willingness to endure.

## 19. Current concise capability statement

> Igor designs and builds interactive products and gameplay systems. His strongest capability is taking a desired user or player experience, modelling the behaviour and state required to create it, structuring the supporting system, and implementing the product across technical boundaries. His current depth is strongest in end-to-end product construction, cross-boundary implementation, investigative problem-solving, and emerging behavioural and gameplay-system design. He is not yet a mature specialist in one engineering field, but the most coherent specialization to deepen is experience-driven interactive product systems.
