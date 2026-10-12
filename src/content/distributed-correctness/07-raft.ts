import type { Section } from '../types'

export const raftSection: Section = {
  id: 'raft',
  title: 'Leader election, consensus and a conceptual Raft walkthrough',
  scene: 'raft-walkthrough',
  focus: 'n-commit',
  slide: `## Agree on one log

**Consensus** lets a group agree on a sequence of decisions despite failures. Raft is one design.

### Normal operation (3 servers)
- A leader is elected in **term 2** with votes from 2 of 3
- It appends a command, replicates it, and commits once a **majority** stores it

### When the leader fails
- A follower times out and starts **term 3**
- It needs votes from a majority, and its log must be at least as up to date as the voter's
- Committed entries survive; uncommitted ones may be lost
- Terms act like a clock: a stale leader sees a higher term and steps down

### Cost
- Progress needs a majority: with 3 servers, 1 failure is tolerated`,
  narration:
    "Consensus is the problem of getting a group of servers to agree on a sequence of decisions even though some of them may fail. Raft is one well-known design, and here is a conceptual walkthrough with three servers. This is simplified and is not a specification. In normal operation, the servers first elect a leader. Time is divided into terms, and in term two a candidate wins with votes from two of the three servers, a majority. A client command goes to the leader, which appends it to its log and sends it to the followers. Once the entry is stored on a majority, it is committed and can be applied. Now suppose the leader crashes. The followers hear nothing, and after a timeout one of them starts a new election in term three. It needs votes from a majority, and a server only votes for a candidate whose log is at least as up to date as its own, which is what ensures committed entries survive. Entries that never reached a majority may be lost. The cost is that progress needs a majority: with three servers, one failure is tolerated.",
}
