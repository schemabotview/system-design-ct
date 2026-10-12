import type { Section } from '../types'

export const specialisedStoresSection: Section = {
  id: 'specialised-stores',
  title: 'Graph, time-series, search and object storage',
  scene: 'specialised-stores',
  slide: `## Specialised stores for specialised jobs

### Four roles
- **Graph:** relationships and paths, such as who follows whom
- **Time-series:** values over time, such as clicks per minute
- **Search:** text relevance and filtering, such as finding links by title
- **Object storage:** large files, such as link preview images

### In our system
- Redirects need none of them
- Click trends might justify time-series; title search might justify search

### The warning
- Each store is another system to run, secure, back up and keep in sync
- Add one only when a requirement the main database cannot meet appears`,
  narration:
    "Beyond the general-purpose models, there are stores built for specialised jobs. A graph database is built for relationships and paths, such as who follows whom. A time-series store is built for values over time, like clicks per minute. A search engine is built for text relevance, ranking and filtering, such as finding links by title. And object storage holds large files cheaply and durably, such as preview images for links. Now ask honestly whether our system needs any of them. The redirect itself needs none of them. Click trends over time might justify a time-series store, and if owners wanted to search their links by title, a search engine might earn its place. But here is the warning. Every additional store is another system to run, to secure, to back up, and to keep in sync with the main database. So add one only when a real requirement appears that the main database cannot meet. The default answer to a new store is not yet.",
}
