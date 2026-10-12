import type { Section } from '../types'

export const shardKeysSection: Section = {
  id: 'shard-keys',
  title: 'Shard keys and partitioning schemes',
  scene: 'shard-keys',
  focus: 'byowner',
  slide: `## Partition when one machine is not enough

### Choose a shard key
- It should spread data and load evenly
- It should appear in the most frequent queries
- For links: the **code**, because every redirect looks up by code

### Schemes
- **Hash** of the key: even spread, but no range queries
- **Range** of the key: range queries, but hot ranges
- **Directory:** a lookup table decides; flexible, but one more thing that must stay available

### The price
- A query without the key, such as "list by owner", must ask **every** shard
- Transactions across shards are hard
- Resharding later is costly, so choose the key with growth in mind`,
  narration:
    "When one machine can no longer hold the data or take the writes, we partition it across several, which is also called sharding. The most important decision is the shard key. A good key spreads data and load evenly, and it appears in the most frequent queries. For our links the natural choice is the code, because every redirect looks up by code. There are three common schemes. Hashing the key gives an even spread, but you lose efficient range queries. Splitting by ranges of the key allows range queries, but popular ranges become hot. A directory, a lookup table that says where each key lives, is flexible, but it is one more component that must stay available. Now the price. The shard key makes one access pattern cheap and others expensive. Redirects go to exactly one shard. But listing links by owner does not carry the code, so the query must ask every shard and combine the answers. And a transaction that touches two shards is hard to make correct. Choose the key for the access pattern that matters most.",
}
