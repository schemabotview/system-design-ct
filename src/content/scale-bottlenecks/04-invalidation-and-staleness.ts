import type { Section } from '../types'

export const invalidationAndStaleness: Section = {
  id: 'invalidation-and-staleness',
  title: 'Invalidation, expiry and stale data',
  scene: 'stale-timeline',
  focus: 's3',
  slide: `## Stale data is a choice

### The timeline
- The cache holds URL A; the owner changes the link to URL B in the database
- Visitors keep receiving A until the cache entry changes

### Two controls
- **Expiry (TTL):** bounds how stale, for example 60 s (assumed)
- **Invalidation:** delete or update the key when the data changes

### Trade-offs
- A short TTL means fresher data but more misses
- Invalidation is fresher, but the delete can fail, or race a read that is refilling with the old value
- Use both: invalidate, and keep a TTL as a safety net

### Ask the requirement
- A redirect may tolerate a minute of staleness; a removed abusive link may not`,
  narration:
    "Every cache can serve data that is out of date, so the real design question is how out of date is acceptable. Follow the timeline. The cache and the database both hold address A. The owner edits the link, and the database now says address B. Until something changes the cache entry, visitors keep receiving A. There are two controls. Expiry, usually called a time to live, bounds the staleness: if entries live for sixty seconds, which we assume here, no one waits longer than that. Invalidation deletes or updates the key when the data changes, so the next read loads the new value. Each has a trade-off. A short expiry gives fresher data but more misses, which means more load on the database. Invalidation gives fresher data, but the delete itself can fail, or it can race with a concurrent read that is just refilling the cache with the old value. A sensible design uses both: invalidate on write, and keep a time to live as a safety net. And always go back to the requirement. A redirect may tolerate a minute of staleness, but a link removed for abuse may not.",
}
