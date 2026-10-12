import type { Section } from '../types'

export const quorumsSection: Section = {
  id: 'quorums',
  title: 'Replication quorums and their limitations',
  scene: 'quorums',
  focus: 'overlap',
  slide: `## Quorums make reads overlap writes

### The idea
- N replicas; a write waits for W acknowledgements; a read asks R
- If **W + R > N**, every read set shares a replica with every write set

### Our example
- N = 3, W = 2, R = 2: 4 > 3
- A read of any two replicas includes at least one with version 2

### Limits
- Overlap is necessary, not sufficient, for linearizable reads
- A write that fails halfway can leave some replicas ahead
- **Sloppy quorums** accept other nodes during failures, weakening the overlap
- Concurrent writes still need a conflict rule`,
  narration:
    "A quorum system tries to get consistent reads from a set of unreliable replicas. Suppose there are N replicas. A write is acknowledged only after W of them have stored it, and a read asks R of them. If W plus R is greater than N, then any set of replicas read must share at least one replica with any set that was written, so the read cannot miss the latest acknowledged write entirely. In our example there are three replicas, and both writes and reads use two. Four is greater than three, so any two replicas you read include at least one that has version two. That is a useful property, but it has limits that are easy to forget. Overlap is necessary, not sufficient, for linearizable reads. A write that fails halfway can leave some replicas ahead of others. Sloppy quorums, which accept other nodes when the usual ones are unreachable, weaken the overlap during failures. And two concurrent writes still need an explicit rule for resolving the conflict. So quorums are a building block, not a full answer.",
}
