import type { Section } from '../types'

export const invariantsSection: Section = {
  id: 'invariants',
  title: 'Invariants, keys, constraints and transaction boundaries',
  scene: 'invariants',
  focus: 'r-tx',
  slide: `## State the rules the data must obey

An **invariant** is a statement that must be true after every committed change.

### Invariants for links
- Every code maps to exactly one long URL
- Every URL is present and at most 2,048 characters (assumed)
- Every link belongs to an existing owner

### Who enforces them
- The **database**: primary key, NOT NULL, CHECK, foreign key
- Application code alone fails when two requests race

### Transaction boundaries
- A transaction makes several changes **all or nothing**
- The link and its idempotency key share one transaction
- Keep transactions short: they hold locks`,
  narration:
    "An invariant is a statement that must be true after every committed change, and good data design starts by writing them down. For our links, every code must map to exactly one long address. Every link must have an address, and we assume a limit of two thousand and forty-eight characters. And every link must belong to an owner who exists. The important question is who enforces these. Application code can check them, but when two requests arrive at the same moment, application checks can both pass and both write, breaking the rule. The database can enforce them reliably, using a primary key for uniqueness, not-null and check constraints for validity, and a foreign key for the owner. We also have to decide the transaction boundary. A transaction makes several changes all-or-nothing, and here the link and its idempotency key from chapter two must share one, so a crash cannot leave one without the other. Keep transactions short, though, because they hold locks that make other requests wait.",
}
