import type { Section } from '../types'

export const urlShortenerFirstDesign: Section = {
  id: 'url-shortener-first-design',
  title: 'Worked design: a single-service URL shortener',
  scene: 'api-and-schema',
  focus: 'links',
  slide: `## A first design

One application, one database, one table.

### What it does
- \`POST /links\` validates the URL, creates a code and stores a row
- \`GET /{code}\` looks the code up and redirects, or answers 404
- The table maps a unique \`code\` to its \`long_url\`

### Why start this small
- At the assumed 231 requests/s, start with one application and one database
- Easy to explain, test and change

### What would change it
- p99 over 100 ms in measurements → add caching
- Availability below 99.9% → add replicas
- Peak demand outgrown → partition the data

Each change must be justified by a requirement, not by habit.`,
  narration:
    "Now we put the pieces together. The interface on top is what the outside world sees: one call to create a link, which returns a short code, or a clear error if the address is not valid; and one call to follow a code, which redirects the visitor, or answers not found. Those two calls are implemented by a single application, and the application persists everything in a single table. Each row maps a code, which is the primary key and therefore unique, to the long address it stands for, plus the time it was created. Why such a small design? Because our assumed workload, a couple of hundred requests a second on average, is a reasonable place to begin and to measure, and a small design is easy to explain, to test, and to change. The more interesting question is what would make us change it. If measured ninety-ninth percentile latency misses the hundred millisecond target, we would consider caching. If availability falls short of the target, we would consider replicas. If demand outgrows one database, we would consider partitioning. Notice that every one of those changes is tied to a requirement we wrote down. That is the habit this chapter is for. Next, we follow a request across the interfaces and see how communication can fail.",
}
