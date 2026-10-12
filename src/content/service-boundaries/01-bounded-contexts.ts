import type { Section } from '../types'

export const boundedContexts: Section = {
  id: 'bounded-contexts',
  title: 'Responsibilities, bounded contexts, coupling and cohesion',
  scene: 'contexts',
  focus: 'test',
  slide: `## Draw boundaries around responsibilities

### Bounded context
- A part of the system where terms have **one meaning**
- A "link" in Links is a short code; in Analytics it is a label to count against

### Cohesion and coupling
- **Cohesion:** things that change together live together
- **Coupling:** how much one part must know about another
- Aim for high cohesion inside, low coupling between

### Three tests for a boundary
- Do these things change together?
- Does one team own them?
- Can one fail without the others?

### A warning
- Boundaries cut by technology layer, such as "all databases", split responsibilities apart`,
  narration:
    "Before deciding how to deploy anything, we have to decide where one responsibility ends and another begins. In our system there are at least three: creating and resolving links, counting clicks, and managing owners with their keys and quotas. Each is a bounded context, a part of the system within which terms have one meaning. The word link, for example, means a short code that redirects in the links context, but in analytics it is just a label to count against. Two ideas help us judge a boundary. Cohesion is how strongly the things inside belong together, meaning they change together. Coupling is how much one part has to know about another. We want high cohesion inside a boundary and low coupling across it. There are three practical tests. Do these things change together? Does a single team own them? And can one fail without taking the others down? A warning to finish: boundaries drawn by technology layer, like putting all the databases in one place, cut straight through responsibilities and make every change touch everything.",
}
