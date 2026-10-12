import type { Section } from '../types'

export const indexesSection: Section = {
  id: 'indexes',
  title: 'Indexes, query plans and read/write costs',
  scene: 'index-costs',
  focus: 'map',
  slide: `## Index for the access pattern

An index is a sorted copy of some columns that lets the database find rows without scanning them all.

### Match indexes to access patterns
- By code: the primary key already is an index
- By owner, newest first: \`(owner_id, created_at DESC)\`
- Clicks by code and day: \`(code, clicked_at)\`

### Reading a query plan
- A **sequential scan** reads every row; an **index scan** jumps to matches
- Column order matters: \`(owner_id, created_at)\` serves "by owner" but not "by date alone"

### The price
- Every insert must also update each index
- Extra indexes cost storage and slow writes

### Check, do not assume
- Read the **query plan** to see whether an index is used
- Add one per measured need`,
  narration:
    "An index is a sorted copy of some columns that lets the database find rows without reading every one. Without a usable index, a lookup has to scan the whole table, and that cost grows with the table. So we choose indexes by looking at the access patterns from the start of this chapter. Lookup by code is already covered, because the primary key is an index. Listing an owner's links, newest first, wants an index on the owner and the creation time, in that order, so the database can read the first twenty entries and stop. Counting clicks by code and day wants an index on the code and the click time. But indexes are not free. Every insert must also update every index on the table, so each one adds write cost and storage. That is why the table shows a write cost beside every pattern: one extra write per link created, and one per click, which at our peak is over a thousand a second. Finally, check rather than assume. The query plan tells you whether the database actually uses the index. Add an index for a measured need, not for every column.",
}
