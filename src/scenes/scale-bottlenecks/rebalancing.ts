import type { Scene } from '@graphlearning/flow'

// §8 — adding a fifth shard. With hash mod N, a key stays put only if h mod 4 = h mod 5, which holds
// for 4 of every 20 hash residues: 20 % stay, 80 % move. With 64 fixed partitions, a new node takes
// about 64 ÷ 5 ≈ 13 whole partitions, roughly 20 % of the data.
export const rebalancing: Scene = {
  id: 'rebalancing',
  title: 'Adding a shard: how much moves?',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'naive',
      label: 'hash mod N',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'n-simple', label: 'Simple formula', sub: 'no table to maintain', pattern: 'storage', icon: 'circlecheck' },
        { id: 'n-before', label: '4 shards', sub: 'key goes to h mod 4', pattern: 'storage', icon: 'database' },
        { id: 'n-after', label: '5 shards', sub: 'key goes to h mod 5', pattern: 'storage', icon: 'database' },
        { id: 'n-move', label: '≈ 80 % move', sub: 'only 20 % stay put', pattern: 'warn', icon: 'swap' },
      ],
      edges: [
        { source: 'n-simple', target: 'n-before', label: 'start' },
        { source: 'n-before', target: 'n-after', label: 'add one' },
        { source: 'n-after', target: 'n-move' },
      ],
    },
    {
      id: 'fixed',
      label: 'Fixed partitions',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'f-why', label: 'Decide early', sub: 'partitions outnumber nodes', pattern: 'storage', icon: 'circlecheck' },
        { id: 'f-map', label: '64 partitions', sub: 'key to partition, forever', pattern: 'storage', icon: 'boxes' },
        { id: 'f-nodes', label: 'Map to nodes', sub: 'a table, not a formula', pattern: 'network', icon: 'table' },
        { id: 'f-move', label: '≈ 13 partitions', sub: 'about 20 % move', pattern: 'storage', icon: 'swap' },
      ],
      edges: [
        { source: 'f-why', target: 'f-map', label: 'start' },
        { source: 'f-map', target: 'f-nodes', label: 'then' },
        { source: 'f-nodes', target: 'f-move', label: 'add a node' },
      ],
    },
    {
      id: 'hotp',
      label: 'Hot partition',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'h-watch', label: 'Watch per-key load', sub: 'spread is not load', pattern: 'service', icon: 'gauge' },
        { id: 'h-viral', label: 'One viral link', sub: 'all load, one shard', pattern: 'warn', icon: 'zap' },
        { id: 'h-fix', label: 'Cache or split it', sub: 'or dedicated replicas', pattern: 'service', icon: 'copy' },
        { id: 'h-route', label: 'Router tracks it', sub: 'key to partition to node', pattern: 'network', icon: 'router' },
      ],
      edges: [
        { source: 'h-watch', target: 'h-viral', label: 'finds' },
        { source: 'h-viral', target: 'h-fix', label: 'mitigate' },
        { source: 'h-fix', target: 'h-route' },
      ],
    },
  ],
  edges: [],
}
