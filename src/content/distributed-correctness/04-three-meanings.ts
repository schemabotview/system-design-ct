import type { Section } from '../types'

export const threeMeaningsSection: Section = {
  id: 'three-meanings',
  title: 'Replication consistency, isolation and session guarantees',
  scene: 'three-meanings',
  focus: 'x-1',
  slide: `## One word, three questions

### Replication consistency
- Do the **copies of one object** agree?
- Linearizable: behaves like a single copy; eventual: copies agree once writes stop

### Transaction isolation
- Do **concurrent transactions** interfere?
- Serializable: as if run one after another; snapshot isolation allows write skew

### Session guarantees
- What does **one client** see across its own requests?
- Read your writes; monotonic reads
- Often built with sticky routing or a version the client carries

### Mix-ups to avoid
- Serializable is not linearizable
- Stronger on one axis does not strengthen the others
- Name the axis whenever you say consistent`,
  narration:
    "People say consistency to mean at least three different things, and mixing them up causes real design errors. The first is replication consistency. It asks whether the copies of one object agree. At the strong end, linearizable means the object behaves as though there is a single copy. At the weak end, eventual consistency means the copies will agree once writes stop. The second is transaction isolation, which asks whether concurrent transactions interfere with one another. Serializable isolation means the result is as if the transactions ran one after another. Snapshot isolation is weaker and allows an anomaly called write skew. The third is session guarantees, which ask what a single client sees across its own requests. Read your writes means a client sees its own updates. Monotonic reads means it never sees data go backwards in time. The key point is that these are different axes. A serializable database is not necessarily linearizable, and a replica can still be stale even when transactions are isolated. Improving one axis does not improve the others.",
}
