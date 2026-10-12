import type { Section } from '../types'

export const workedHistoriesSection: Section = {
  id: 'worked-histories',
  title: 'Worked histories: stale reads, concurrent updates and failover',
  scene: 'inventory-histories',
  focus: 'fail4',
  slide: `## One invariant, three failures

Invariant: **never sell more than we have**. Stock is 1.

### Concurrent updates (isolation)
- Both read 1, both write 0: two sales of one item
- Fix: an atomic conditional update, \`stock = stock - 1 WHERE stock > 0\`
- A \`CHECK (stock >= 0)\` is a backstop

### Stale read (replication)
- The sale is done, but a lagging replica still shows 1
- The transaction was fine; the **copy** was behind

### Failover (acknowledged write lost)
- The primary acknowledged a sale, crashed before copying it, and a replica was promoted
- Fix: wait for a quorum before acknowledging

### The lesson
- Name which axis failed: isolation, replication or durability`,
  narration:
    "Let us end with three histories of one inventory item, where the rule is that we must never sell more than we have, and stock is one. In the first history, two buyers read a stock of one at the same moment. Each decides to sell, each writes zero, and the item has been sold twice. That is a failure of transaction isolation, and the fix is an atomic conditional update that only decrements when the stock is still above zero, so the database decides which buyer wins. In the second history, the sale has completed on the primary, but the product page reads from a replica that is still behind, so it keeps offering the item. The transactions were fine here. What failed was replication consistency. In the third history, the primary acknowledges a sale and then crashes before copying it to anyone, and a replica that never saw the sale is promoted. An acknowledged write has been lost, which is a failure of durability. The fix is to wait for a quorum before acknowledging. The lesson is to name which axis failed, because the fixes are completely different. Next, we apply these guarantees to asynchronous work.",
}
