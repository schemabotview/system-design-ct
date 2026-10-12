import type { Section } from '../types'

export const rebalancingSection: Section = {
  id: 'rebalancing',
  title: 'Hot partitions, routing and rebalancing',
  scene: 'rebalancing',
  focus: 'n-move',
  slide: `## Rebalance without moving everything

### Hot partitions
- Even key spread is not even load: one viral link sends all its traffic to one shard
- Cache that key, split it, or give it dedicated replicas

### Naive hash mod N
- Going from 4 to 5 shards moves about **80 %** of keys

### Fixed partitions
- Hash to many small partitions, such as 64, and map partitions to nodes
- Adding a node moves about 13 of 64 partitions, roughly **20 %**

### Routing
- A router or client library maps key, to partition, to node
- That mapping must itself be kept available and consistent`,
  narration:
    "Partitioning raises three practical problems. The first is the hot partition. Spreading keys evenly does not spread load evenly, because one viral link sends all of its traffic to a single shard. The answer is to cache that key, split it across several, or give it dedicated replicas. The second is rebalancing. Suppose we assign each key to a shard by taking its hash modulo the number of shards, and we go from four shards to five. A key stays where it was only if its hash gives the same remainder both ways, which happens for just one key in five. So about eighty percent of all keys must move. That is a very expensive way to add capacity. The better design hashes keys into many small fixed partitions, say sixty-four, and keeps a table mapping partitions to nodes. Adding a node moves only about thirteen of the sixty-four partitions, roughly twenty percent. The third problem is routing. Something, a router or a client library, must map key to partition to node, and that mapping must itself be kept available and consistent.",
}
