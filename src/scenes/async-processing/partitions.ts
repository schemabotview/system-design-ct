import type { Scene } from '@graphlearning/flow'

// §2 — a topic of 3 partitions keyed by link code. Same key, same partition, so one link's events stay
// in order; there is no order across partitions. Key-to-partition assignment is ILLUSTRATIVE.
export const partitions: Scene = {
  id: 'partitions',
  title: 'The key decides the lane',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'lane0',
      label: 'Lane 0',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'k0', label: 'Keys hash here', sub: 'for example aZ3k9Q', pattern: 'user', icon: 'key' },
        { id: 'part0', label: 'Partition 0', sub: 'an ordered log', pattern: 'storage', icon: 'scroll' },
        { id: 'con0', label: 'Consumer A', sub: 'the only reader', pattern: 'service', icon: 'server' },
      ],
    },
    {
      id: 'lane1',
      label: 'Lane 1',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'k1', label: 'Keys hash here', sub: 'for example bY7m2P', pattern: 'user', icon: 'key' },
        { id: 'part1', label: 'Partition 1', sub: 'an ordered log', pattern: 'storage', icon: 'scroll' },
        { id: 'con1', label: 'Consumer B', sub: 'the only reader', pattern: 'service', icon: 'server' },
      ],
    },
    {
      id: 'lane2',
      label: 'Lane 2',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'k2', label: 'Keys hash here', sub: 'for example cX1n8R', pattern: 'user', icon: 'key' },
        { id: 'part2', label: 'Partition 2', sub: 'an ordered log', pattern: 'storage', icon: 'scroll' },
        { id: 'con2', label: 'Consumer C', sub: 'the only reader', pattern: 'service', icon: 'server' },
      ],
    },
    {
      id: 'across',
      label: 'Across lanes',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'noorder', label: 'No global order', sub: 'only within a lane', pattern: 'warn', icon: 'ban' },
        { id: 'inter', label: 'Links interleave', sub: 'different keys, any order', pattern: 'warn', icon: 'swap' },
        { id: 'onekey', label: 'Need order? Share a key', sub: 'then share a lane', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [],
}
