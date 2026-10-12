import type { Section } from '../types'

export const requirementsAndJourneys: Section = {
  id: 'requirements-and-journeys',
  title: 'Requirements, journeys, constraints and assumptions',
  scene: 'create-and-follow-journeys',
  focus: 'missing',
  slide: `## From a request to requirements

"Build a URL shortener" is ambiguous. Walk each user through their journey, and every step becomes a testable statement.

### Functional requirements
- An owner submits a long URL and receives a short code
- A visitor opens the code and is redirected to the long URL
- An unknown code gets a clear "not found" answer

### Constraints and assumptions
- **Constraint:** a fixed fact we must respect, such as a launch date
- **Assumption:** a guess we state out loud, such as 1 million daily users
- Write assumptions down: each one can later be checked and changed

### Out of scope for now
- Accounts, analytics, custom codes and link expiry`,
  narration:
    "The request we were given is four words long: build a URL shortener. That is not a design problem yet, because nobody can say whether a particular system meets it. So we walk each kind of user through what they actually do. The link owner submits a long address, the service checks it is well formed and allowed, stores the pairing of code and address, and hands back a short link. The visitor opens the short link, the service looks the code up, and either redirects them or has to say it does not know that code. That second path is easy to forget, and it is exactly why we draw journeys: every box is a statement we can later test, and every missing branch is a question to ask. Alongside the requirements, we separate two things that are often mixed up. A constraint is a fixed fact we must respect. An assumption is a guess we are choosing to make, like a million daily users. Assumptions are fine, as long as they are written down, because a written assumption can be challenged and changed. We also say plainly what is out of scope for now, so the design stays small.",
}
