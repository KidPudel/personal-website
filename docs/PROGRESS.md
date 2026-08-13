# Progress

- Split the homepage into OpeningSequence, IdentityIntroduction, ValuesEvidence, and WritingPreview, with copy in `src/content/homepage/` and named motion modules.
- Replaced inverted portfolio tokens with field, ink, copy, muted, and accent.
- Removed WorldField, HomeReturn, paper grain, and the previous hiring landing-page components.
- Rebuilt `/` as one composition: identity without a work CTA, values evidence as objects in the field, and writing as the next passage.
- Rebuilt `/work/` and independent articles onto the same field and type language.
- Replaced the identity `experiences` click colouring with a semantic-text-backed canvas thermal field shaped for Averia Serif. Staggered, domain-warped metaballs grow from each letter center, blend continuously between glyphs, move from pink through dark blue, then reverse and clear back to the untouched text.
- Verified the thermal wave’s ignition, overlapping forward travel, per-letter reverse, clean black resting state, complete glyph coverage including descenders, replay trigger, and 1440, 390, and 320 layouts with no horizontal overflow.
- Aligned the thermal canvas to the DOM text baseline and split its input behavior: touch/click plays the complete traveling wave, while fine-pointer hover continuously moves a local liquid field with the cursor and softly releases on exit.
- Gave every values-evidence screenshot a stable slight random tilt and a rounded white frame.
- Removed the supporting paragraph from each sticky value heading, and replaced each evidence title and body with a short body-font caption, keeping the Observatory case-study link.
- Set `--font-special` to Goudy Mediaeval for the sticky values voice, leaving Averia for headlines and the current sans for body.
- Removed the underline from the cycling value words.
- Set cycling value words to inherit heading color and size to the active word so the line reflows instead of holding a reserved width.
