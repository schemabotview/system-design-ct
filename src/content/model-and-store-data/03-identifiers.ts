import type { Section } from '../types'

export const identifiersSection: Section = {
  id: 'identifiers',
  title: 'Identifiers, uniqueness, collisions and enumeration',
  scene: 'code-collisions',
  focus: 'clash',
  slide: `## Identifiers that stay unique

### Three strategies
- **Sequential** number in base 62: short and clash-free, but guessable
- **Random** code: hard to guess, but can collide
- **Hash** of the URL: same URL, same code, but collisions remain

### Random 6-character codes
- 62⁶ ≈ 56.8 billion possible codes
- At 73 million links, about **0.13 %** of new codes hit an existing one
- That is roughly 257 retries a day at 200,000 creates (assumed)

### Why the constraint still matters
- Low probability is not zero; the primary key turns a clash into a retry, not corrupt data
- A random code is not access control: secrets need more
- Bound the retry loop: three attempts, then fail loudly`,
  narration:
    "Every link needs an identifier, and there are three common strategies. A sequential number encoded in base sixty-two is short and never collides, but anyone can guess the next one and enumerate every link. A random code is hard to guess, but it can collide with one already in use. A hash of the long address gives the same code for the same address, but collisions remain possible. Let us put numbers on random six-character codes. There are about fifty-six point eight billion of them. That sounds enormous, but after a year at our assumed two hundred thousand new links a day, there are seventy-three million links, and about one new code in eight hundred will land on one that already exists. That is roughly two hundred and fifty-seven retries every day. Here is why the uniqueness constraint still matters even when the probability is low: a probability is not a guarantee. With the primary key, a clash becomes a harmless retry. Without it, one unlucky collision would silently overwrite or duplicate a link. And remember that an unguessable code is not access control.",
}
