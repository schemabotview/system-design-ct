import type { Section } from '../types'

export const readReplicasSection: Section = {
  id: 'read-replicas',
  title: 'Replication for read capacity: lag and failover',
  scene: 'read-replicas',
  focus: 'lag',
  slide: `## Replicas for read capacity

### The pattern
- Writes go to one **primary**; replicas copy its changes and serve reads
- Read capacity grows with replicas; write capacity does not

### Lag
- Asynchronous replicas trail the primary, here by an assumed 0.2 to 2 s
- An owner creates a link, then reads from a lagging replica and sees a 404
- Fix: read from the primary just after a write, or track what the replica has applied

### Failover
- If the primary fails, promote a replica
- Someone must decide the primary is dead, and be right (chapter 5)
- Writes acknowledged but not yet copied can be lost or conflict (chapter 5)`,
  narration:
    "When the database's read load is the problem, replication is the next tool. Writes go to one primary, and replicas copy its changes and serve reads. Adding replicas adds read capacity, but it does nothing for write capacity, because every write still goes to the primary. The price is lag. With asynchronous replication, a replica trails the primary by some amount, which we assume here is between two tenths of a second and two seconds. That creates a surprising bug: an owner creates a link, the write lands on the primary, and when they immediately follow it, the read goes to a replica that has not yet received the row, so they see a not-found. The fix is to read from the primary just after a write, or to track what the replica has applied before trusting it. Replicas also support failover. If the primary fails, a replica can be promoted. But writes that the primary acknowledged and had not yet copied may be lost, or may conflict later, and in the next chapter we examine exactly what that means.",
}
