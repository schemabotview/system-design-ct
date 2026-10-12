import type { Section } from '../types'

export const cachePlacement: Section = {
  id: 'cache-placement',
  title: 'Cache placement and read/write patterns',
  scene: 'cache-aside',
  focus: 'load',
  slide: `## Place a cache where it helps

### Where to cache
- **Browser or edge:** closest to the user, least control
- **In-process:** fastest, but one copy per replica
- **Shared cache:** one copy, but an extra network hop

### Cache-aside reads
- Check the cache; on a miss, read the database and fill it
- It pays off for data read often and changed rarely

### Hypothetical numbers
- 1,000 reads/s at an 80 % hit rate leave 200 database reads/s; our 1,157/s peak leaves about 231

### Write patterns
- **Write-through:** update the cache and database together
- **Invalidate on write:** delete the key; the next read refills it
- **Write-back:** fast, but acknowledged data can vanish`,
  narration:
    "A cache stores copies of data closer to where it is needed, and the first decision is where. A browser or edge cache is closest to the user but gives us the least control. An in-process cache is the fastest, but every application replica holds its own copy. A shared cache holds one copy for everyone, at the cost of an extra network hop. The most common read pattern is cache-aside. The application checks the cache first. On a miss, it reads from the database and then fills the cache for next time. Here is the arithmetic, using hypothetical numbers. If one thousand reads per second arrive and eighty percent of them hit the cache, then only two hundred reads per second reach the database. Our own peak of eleven hundred and fifty-seven reads a second would leave about two hundred and thirty-one. Writes need a policy as well. Write-through updates the cache and the database together. Invalidating on write simply deletes the cache key and lets the next read refill it. Write-back is fast, but data acknowledged to the client can be lost if the cache fails before it reaches the database.",
}
