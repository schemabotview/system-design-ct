import type { Section } from '../types'

export const normalisationSection: Section = {
  id: 'normalisation',
  title: 'Normalisation or deliberate denormalisation',
  scene: 'normalisation',
  focus: 'rename',
  slide: `## Normalise first, copy on purpose

### Normalised
- Each fact is stored **once**: the owner's name lives only in \`owners\`
- Changes are simple and consistent
- Reads that need both must **join**

### Denormalised
- The owner's name is copied into the listing row
- A listing is one lookup
- A rename must update **every copy**
- Each copy costs extra storage

### How to choose
- Normalise by default
- Denormalise for a **measured** read cost, and name who keeps the copy correct
- Try a cache (chapter 4) before a permanent copy when only reads are slow
- A stale copy is a bug unless the requirement tolerates it`,
  narration:
    "There are two ways to store the same listing. In the normalised design, every fact lives in exactly one place. The owner's display name is stored once, in the owners table, and the links table only holds the owner's identifier. That makes changes simple and consistent: rename an owner in one row and every view of that owner is correct. The price is that a listing which needs both the link and the owner's name must join the two tables. In the denormalised design, we copy the owner's name into each listing row, so showing a listing is a single lookup. The price moves to writes: renaming an owner now means finding and updating every copy, and if one update is missed, the data disagrees with itself. So how should you choose? Normalise by default, because correctness is easier to keep. Denormalise only for a read cost you have actually measured, and when you do, name who is responsible for keeping the copies correct. A stale copy is a bug, unless the requirement explicitly tolerates it.",
}
