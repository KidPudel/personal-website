# Progress

Last updated: 2026-08-20

## Current state

- The homepage uses the current box-opening hypothesis: seven lossless frames, native scroll, a complete identity reveal, an introduction exit, a sticky values voice, and one opened box that remains present through the closing passage.
- The introduction reveal and exit now derive from scroll position only. The exit uses transform and opacity and keeps its layout footprint, so “Three things important to me.” does not jump when the preceding copy leaves.
- Timer-gated identity beats, animated `max-height` collapse, and manual session-based scroll restoration have been removed.
- Value evidence now rises from the open box as one calm deck, settles, unfolds into a readable fan, holds, and dissolves in place. Reverse scrolling reconstructs the fan before returning the deck to the box.
- All evidence cards are visible in the stacked-deck beat before the fan opens. The deck settles with a restrained back-out overshoot, holds briefly, then spreads in three spatial layers: lead card, inner pair, and outer pair.
- Evidence opacity remains monotonic while the compositor-only position, scale, and rotation overshoot and settle. Reduced motion continues to use the static readable grid.
- The first value keeps all five authored evidence objects, including both games. Desktop and narrow layouts use separate fan compositions rather than scaling one arrangement.
- On narrow screens, the compact fan sits closer to the value phrase and its smaller bottom pair opens a clear center channel so the source box remains visible.
- The personal heading and notes use the same reversible source logic: the centered box settles upward, the heading rises from it, and the notes unfold into their constellation.
- The redundant “See more work” transition has been removed. The introduction keeps its immediate Work and Let’s talk navigation.
- Closing Work and Let’s talk actions emerge last from inside the box and settle above it using the same centered spacing and sizing as the introduction navigation.
- A balloon-and-person doodle appears only at the bottom edge. Activating it loops ascent frames while native scrolling returns to the revealed introduction, plays the authored pop, loops the falling poses out of view, and resets while hidden.
- Personal notes wait until they have spread clear of the heading before fading in.
- The personal heading and closing navigation stay hidden while crossing the box drawing, then settle with explicit breathing space above it.
- Full-height value timing chapters no longer intercept the clickable value words; active evidence cards retain their own link interaction.
- The evidence fan now measures the visible value phrase and maintains a viewport-appropriate gap below it, so wrapped word variants cannot be covered by the lead card.
- The previous one-shot personal constellation bounce, `scale(0.16)` entrance, and intersection trigger have been removed.
- On narrow screens, opening or closing the couple portrait now bridges the resulting note reflow with a 280ms compositor-only FLIP transition. Reduced motion uses a short opacity bridge instead of positional movement.
- Contact disclosures now remain mounted through an interruptible 180ms exit and return through the same edge as their entrance. Reduced motion keeps a 120ms opacity-only transition.
- Draggable personal doodles now resist beyond their 24px field boundary and settle back over 280ms after release. Reduced motion retains the hard boundary with a brief opacity pulse.
- The top and bottom elastic page edges now share one interruptible controller. Their pigment uses a continuous palette and transparent irregular tips, a narrow masked backdrop feather blends the moving page boundary into the field, and active frames update transforms rather than layout dimensions or inherited motion variables.
- Elastic pulls use progressive boundary resistance and no longer reinterpret a large top pull as a hidden page reload.
- Inactive value-voice layers are hidden from the current accessibility state.
- The work, writing, personal-note interactions, contact disclosure, and verified homepage content remain intact.
- The approved case-study visual designs are preserved. Observatory remains unchanged as the current editorial baseline.
- SuperGood now uses six evidence-led chapters that expose Igor's progression from mobile engineer to product owner, connect observations to product responses, show four working-product screens, and separate shipped scope from unavailable outcome metrics. Reconstructed personas, empathy maps, and generic journey artifacts have been removed.
- Two Sticks now uses six evidence-led chapters that distinguish the MPGU diploma team's pedagogical research from Igor's product and engineering work, follow one saved character through the working loop, and separate shipped scope from unbuilt teaching features. Chinese Bee remains only as the historical implementation name. Reconstructed personas and empathy maps have been removed.
- Historical evidence boundaries are stated without asking for artifacts that no longer exist. SuperGood uses surviving production screens and public feedback; Two Sticks uses surviving screens and public source code and states that the paid backend is no longer hosted.
- Two Sticks is the public project name and canonical case-study route. The former Chinese Bee route remains available for old links, while repository identifiers retain their historical names.
- Project guidance now treats exact visual choreography as replaceable and keeps architecture limited to durable technical boundaries.

## Verification

- Inspected the persistent box, value phrase handoffs, deck rise, deck unfold, deck dissolve, personal emergence, and closing navigation at 943 by 999 and 390 by 844.
- Feel-checked the distinct stacked-deck and spreading beats at 1280 by 720 and 390 by 844. Confirmed all five cards remain present, the fan settles without horizontal overflow, and card links only become interactive after settling.
- Verified the balloon return at 1280 by 720 and 390 by 844, including bottom-only visibility, scroll-linked ascent, arrival frames, falling loop, focus transfer, interruption, no horizontal overflow, and a flash-free hidden reset.
- Confirmed that the box stays centered, all five first-value evidence objects remain present, closing actions visibly rise from the box before settling around it, motion reverses cleanly with scroll, and neither viewport has horizontal overflow.
- Verified top and bottom elastic pulls at 1280 by 720 and the top pull at 390 by 844, including the softened sky seam, release settle, reverse-scroll interruption, and zero horizontal overflow.
- Verified the personal portrait disclosure at 390 by 844, including its 8.5rem layout bridge, final accessibility state, and zero horizontal overflow. Verified the shared contact disclosure open and close behavior in the introduction at 1280 by 800.
- `astro check` reports zero diagnostics.
- Production builds complete for `/` and `/personal-website/`.
- Browser diagnostics contain no new relevant warnings or errors after the rebuild.
- Rechecked all three case studies at 390 by 844. Each has one `main`, one `h1`, no horizontal overflow, and no browser warnings or errors.

## Known workflow issue

Two Astro development servers may be running for this workspace. The browser tab at port 4321 and `website.sh --status` must refer to the same server before visual review, otherwise the user and agent may inspect different instances.
