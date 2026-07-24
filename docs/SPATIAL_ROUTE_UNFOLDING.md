# Spatial route unfolding redesign

take the existing route full-screen pages; `Who I Am`, `Software`, `Games`, and `Blog` and on repsective icon click make them expand from its `Home` cluster reveal its content.

It means that we need to redesign the structure of these old full-screen pages reusing existing hand-drawn elements, but placing them way in a much free-form way.

The unfolding is actual layout state, like the existing Connect disclosure and the Work disclosure that reveals Software and Games. It is not a transition between otherwise separate desktop page compositions. The selected Home cluster remains in the same field and its destination content expands from it, occupies real document space, and stays open.

The persistent Home document uses fragment identifiers to address its expanded states:

- `/` is collapsed Home;
- `/#who-i-am` expands Who I am;
- `/#work` expands the Work choices;
- `/#work/software` expands Software;
- `/#work/games` expands Games;
- `/#connect` expands Connect;
- `/#blog` expands the Blog index.

Activating a cluster changes only the fragment and expands content in the same document. Loading a fragment URL directly reveals the corresponding state. Existing destination paths remain only as compatibility redirects to these fragments. Individual published Blog articles may keep separate document paths because they are independent long-form reading documents.

JavaScript is a first-class part of the intended interaction. A scoped TypeScript controller should coordinate the unfolding animation, disclosure state, focus, scroll restoration, history response, and lazy media activation. Semantic HTML, fragment links, and CSS `:target` provide a resilient direct-link and no-JavaScript fallback; they are not expected to reproduce the complete expressive experience by themselves.

Milestone 7 prototypes only `/#who-i-am`. Milestone 8 applies the validated model to Software, Games, Blog, and the compatibility paths.

On mobile probably its better to leave them as full-screen pages.


My brainstorm storyboard is living under `/Users/iggysleepy/dev/web/frontend/personal-website/storyboards/spatial_route_unfolding_brainstorming`


When one destination is open. other Home clusters become not fully visible. Leave perhaps a faint spatial trace. Showing the complete navigation beside detailed content would reduce focus and make the spatial field feel cluttered.

The spatial unfolding direction and the long-form reading direction are separate. On suitable wide screens, a destination may initially unfold sideways, upward, downward, or diagonally from its Home cluster. After that opening composition, long content continues downward through ordinary vertical document scrolling. Do not turn Software, Games, Who I am, or Blog into horizontally scrolling routes.

Use hand-drawn paths, spines, and alternating placements to bend the opening composition into the vertical reading flow. Faint traces of the other Home clusters belong only near the opening composition and should recede as the visitor reads deeper. Keep a return or collapse control reachable throughout the route. In Who I am, the selected cluster itself is that control and a separate Home drawing is omitted.
