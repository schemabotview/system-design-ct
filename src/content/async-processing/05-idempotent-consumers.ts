import type { Section } from '../types'

export const idempotentConsumers: Section = {
  id: 'idempotent-consumers',
  title: 'Idempotent consumers, deduplication keys and retention limits',
  scene: 'dedup',
  focus: 'late',
  slide: `## Make duplicates harmless

### Deduplication key
- Each event carries a unique \`event_id\`
- The consumer records processed ids **in the same transaction** as the effect

### Natural idempotence
- "Set status to shipped" can safely repeat
- "Add 1 to the count" cannot, without a key
- Or apply an update only if its version is newer

### Limits
- The processed table cannot grow forever: assumed 7 days
- A duplicate arriving later slips through
- So retention must exceed the longest possible redelivery delay
- Test it: deliver the same event twice and compare results`,
  narration:
    "If delivery is at least once, then duplicates will happen, and the consumer must make them harmless. The standard technique is a deduplication key. Every event carries a unique identifier. When the consumer processes an event, it records that identifier in a processed table, and it does so in the same transaction as the effect. Then either both happen or neither does. When a duplicate arrives, the insert into the processed table finds the identifier already there, inserts nothing, and the consumer skips the effect and acknowledges. Some operations are naturally idempotent. Setting a status to shipped can safely repeat, but adding one to a counter cannot, unless it is protected by a key. There is a limit you must plan for. The processed table cannot grow forever, so we prune it, and here we assume seven days. A duplicate that arrives after that would be applied again. So the retention period of the identifiers must be longer than the longest possible redelivery delay, and that is a requirement to state and to test.",
}
