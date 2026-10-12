import type { Section } from '../types'

export const changedRequirementsSection: Section = {
  id: 'changed-requirements',
  title: 'Evolving the recurring system under changed requirements',
  scene: 'changed-requirements',
  focus: 'c-clash',
  slide: `## Revisit a decision when the facts change

### What changed (assumed)
- Traffic grows 10×: 200 million redirects a day, about 2,315/s average and **11,574/s** at a 5× peak
- Abusive links must stop redirecting within **5 seconds**

### Why the old design breaks
- A 60 s TTL can keep serving a taken-down link for a minute
- At an 80 % hit rate the database now sees about **2,315 reads/s**, ten times before

### The revision
- **Purge** caches on takedown with an event; keep the 60 s TTL as a safety net
- Add read replicas; no sharding yet

### Still unresolved
- A purge can fail; the TTL bounds the damage`,
  narration:
    "A design is never finished, because the requirements change. Let us revisit the URL shortener under two assumed changes. First, traffic grows tenfold, to two hundred million redirects a day. That is about two thousand three hundred and fifteen requests a second on average, and eleven thousand five hundred and seventy-four at a five times peak. Second, there is a new correctness requirement: abusive links must stop redirecting within five seconds. Look at what breaks. Our cache has a sixty-second time to live, so a link taken down for abuse could keep redirecting visitors for up to a minute. That violates the new requirement. And the load has changed too. At an eighty percent hit rate, the database now sees about two thousand three hundred reads a second, ten times what it did in chapter four. The revision keeps the cache but changes how it is kept correct. On takedown, an event purges the caches, and we keep the sixty-second expiry only as a safety net. We add read replicas for the extra load, and we still do not shard, because nothing yet requires it. And we state what is unresolved: a purge can fail, and the expiry limits how long the damage lasts.",
}
