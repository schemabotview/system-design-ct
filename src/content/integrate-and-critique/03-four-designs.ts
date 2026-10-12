import type { Section } from '../types'

export const fourDesignsSection: Section = {
  id: 'four-designs',
  title: 'Contrasting designs: chat, news feed, file storage and payments',
  scene: 'four-designs',
  focus: 'pay',
  slide: `## Four systems, four different answers

All figures are assumed.

### Chat
- 400 M messages a day, about 4,630/s; order within a conversation
- Persistent connections, keyed by conversation

### News feed
- 200 M feed loads a day, about 2,315/s; fast personal reads
- Hybrid fan-out: on write for most, on read for very popular accounts

### File storage
- 5 TB a day, about 58 MB/s; durability and cost
- Object store for bytes, a database for metadata

### Payments
- 100,000 a day, only about 1.2/s: correctness is the problem
- Idempotency keys, a ledger, reconciliation, fail closed`,
  narration:
    "The URL shortener has been our running example, but it is not a template. Different systems are dominated by different concerns, and a good designer changes the answer to match. Take chat. Suppose ten million daily users send forty messages each. That is four hundred million messages a day, about four thousand six hundred and thirty a second on average. The challenge is delivering quickly with order preserved within a conversation, so we use persistent connections and key messages by conversation. A news feed is read-heavy: two hundred million feed loads a day. The bottleneck is fan-out, so a hybrid approach writes into followers' feeds for most accounts, and reads on demand for very popular ones. File storage is about volume. One million uploads of five megabytes is five terabytes a day. Bandwidth and cost dominate, so bytes go to an object store and only metadata goes in a database. And payments are the surprise: only about one a second, yet the hardest, because correctness is everything. They need idempotency keys, a ledger, reconciliation, and a policy of failing closed. Same method, four very different architectures.",
}
