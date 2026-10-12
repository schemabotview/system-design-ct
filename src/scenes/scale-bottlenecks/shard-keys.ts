import type { Scene } from '@graphlearning/flow'

// §7 — hash partitioning on the code. Shard assignments are ILLUSTRATIVE (hash(code) mod 4); the
// point is that a query without the shard key has to ask every shard.
export const shardKeys: Scene = {
  id: 'shard-keys',
  title: 'The shard key decides what is cheap',
  flow: 'TB',
  nodes: [
    { id: 'router', label: 'Router', sub: 'shard = hash(code) mod 4', pattern: 'network', icon: 'router' },
    {
      id: 'shards',
      label: 'Four shards',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'sh0', label: 'Shard 0', sub: '~25 % of codes', pattern: 'storage', icon: 'database' },
        { id: 'sh1', label: 'Shard 1', sub: '~25 % of codes', pattern: 'storage', icon: 'database' },
        { id: 'sh2', label: 'Shard 2', sub: '~25 % of codes', pattern: 'storage', icon: 'database' },
        { id: 'sh3', label: 'Shard 3', sub: '~25 % of codes', pattern: 'storage', icon: 'database' },
      ],
    },
    { id: 'byowner', label: 'List by owner', sub: 'asks every shard', pattern: 'warn', icon: 'users' },
    { id: 'bycode', label: 'Redirect by code', sub: 'asks one shard', pattern: 'service', icon: 'key' },
  ],
  edges: [
    { source: 'router', target: 'shards', label: 'by code' },
    { source: 'shards', target: 'bycode', label: 'cheap' },
    { source: 'shards', target: 'byowner', label: 'scatter, gather', dashed: true },
  ],
}
