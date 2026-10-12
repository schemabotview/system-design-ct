import type { Section } from '../types'

export const hotKeysAndStampedes: Section = {
  id: 'hot-keys-and-stampedes',
  title: 'Hot keys, cache stampedes and cache failure',
  scene: 'hot-keys',
  focus: 'm-out',
  slide: `## When the cache itself fails

### Three failure modes
- **Hot key:** one popular link overloads one cache node
- **Stampede:** an entry expires and many requests miss at once
- **Outage:** every read falls through to the database

### Defences
- Replicate hot keys, or hold them in a small local cache
- **Coalesce** concurrent misses so one request refills
- **Jitter** expiry times so entries do not die together
- Warm the cache after a restart
- Serve stale or shed load, not melt the database

### Hypothetical numbers
- Rank 1 draws 22 % of requests in the assumed skew
- Averages hide per-key load
- At 1,000 reads/s, an outage sends 1,000/s to a database sized for about 200`,
  narration:
    "A cache improves the average case, but it brings its own failure modes. The first is the hot key. Popularity is skewed, so in the assumed distribution shown here, the single most visited link draws about twenty-two percent of all requests. If that key lives on one cache node, that node takes a fifth of the traffic by itself. The second is the stampede. When a popular entry expires, many requests miss at the same moment, and all of them go to the database to refill it. The third is the outage. If the cache fails or is restarted empty, every read falls through, and a database sized for two hundred reads a second suddenly faces one thousand. The defences follow from the failures. Replicate hot keys, or keep them in a small local cache. Coalesce concurrent misses, so one request refills the entry while the others wait. Add jitter to expiry times, so entries do not all die together. And when the database is at risk, serve slightly stale data or shed load, rather than letting everything fail.",
}
