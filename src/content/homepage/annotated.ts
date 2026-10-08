// A sentence written as parts: plain text, a door (a phrase whose note opens
// under the sentence), or the circled "joyful" link. Rendered by
// AnnotatedText.astro.

/** The colour a door and its note take when it opens. */
export type Tone = 'green' | 'blue' | 'lavender' | 'orange' | 'pink';

export type AnnotatedPart =
  | string
  | { text: string; note: string; tone: Tone }
  | { joyful: string; href: string };
