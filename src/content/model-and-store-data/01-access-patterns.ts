import type { Section } from '../types'

export const accessPatternsSection: Section = {
  id: 'access-patterns',
  title: 'Derive entities and access patterns from operations',
  scene: 'access-patterns',
  focus: 'follow-ap',
  slide: `## Start from the operations

Storage design begins with what users do, not with tables.

### From operation to access pattern
- Redirect: find one link by **code**
- Owner dashboard: find links by **owner**, newest first
- Click report: count clicks by **code and day**
- Each pattern has a frequency: redirects far outnumber creates

### From access pattern to entity
- A **Link** holds a code, a long URL and an owner
- A **Click** is an event: code, time, referrer
- An **Owner** records who created each link

### Why this order
- The access pattern decides the keys and the indexes
- Reads and writes are counted: we assumed 100 redirects per new link
- An entity nobody queries by needs no index`,
  narration:
    "Storage design should begin with what users do, not with a list of tables. Look at the operations. A visitor follows a link, which means the system must find one link given its code. An owner opens a dashboard, which means finding that owner's links, newest first. And a report shows clicks, which means counting by code and by day. Those are the access patterns, the specific ways the data will be asked for. Only then do we decide what entities exist. A link holds a code, a long address, and an owner. A click is an event with a code, a time, and perhaps a referrer. An owner record says who created each link. This order matters because the access patterns decide the keys and the indexes. It also tells us how often each pattern runs. In chapter one we assumed a hundred redirects for every new link, so the redirect lookup will dominate, and that is where we should be most careful. An entity that nobody queries by does not need an index at all.",
}
