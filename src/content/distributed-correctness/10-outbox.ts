import type { Section } from '../types'

export const outboxSection: Section = {
  id: 'outbox',
  title: 'Local transactions and event publication with a transactional outbox',
  scene: 'outbox',
  focus: 'dupe',
  slide: `## Write the event with the data

### The dual-write problem
- Update the database **and** publish an event: two systems, no shared transaction
- Crash between them, and one happened without the other

### The outbox
- In **one local transaction**, change the data and insert an outbox row
- A **relay** reads unsent rows, publishes them, then marks them sent
- It can poll the table or follow the database's change log

### What it does not fix
- If the relay crashes after publishing but before marking, it publishes **again**
- Delivery is at-least-once, so consumers must handle duplicates
- Chapter 6 shows how`,
  narration:
    "Here is a very common problem. When a business change happens, such as reserving stock, we usually also want to publish an event so other parts of the system can react. But the database and the message broker are two separate systems with no shared transaction. If the service updates the database and then crashes before publishing, the change happened but nobody was told. If it publishes first and then crashes, the event went out for a change that never happened. The transactional outbox solves the dual write by using only one system at first. In a single local database transaction, the service changes the data and also inserts a row into an outbox table describing the event, so both rows commit or neither does. A separate relay process then reads unsent rows, publishes them, and marks them as sent. Be careful about what this does not fix. If the relay crashes after publishing but before marking the row, it will publish that event again. So delivery is at-least-once, and consumers must be able to handle duplicates, which is the subject of the next chapter.",
}
