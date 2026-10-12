import type { Scene } from '@graphlearning/flow'

// §6 — N = 3 replicas, write quorum W = 2, read quorum R = 2. Because W + R > N (4 > 3) every read
// quorum overlaps every write quorum in at least one replica.
export const quorums: Scene = {
  id: 'quorums',
  title: 'Quorums overlap',
  flow: 'TB',
  nodes: [
    {
      id: 'copies',
      label: 'Three replicas after a write to two',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'qa', label: 'Replica A', sub: 'has version 2', pattern: 'storage', icon: 'database' },
        { id: 'qb', label: 'Replica B', sub: 'has version 2', pattern: 'storage', icon: 'database' },
        { id: 'qc', label: 'Replica C', sub: 'still version 1', pattern: 'warn', icon: 'database' },
      ],
    },
    { id: 'write', label: 'Write waits for 2', sub: 'W = 2 of N = 3', pattern: 'user', icon: 'pencil' },
    { id: 'read', label: 'Read asks 2', sub: 'R = 2 of N = 3', pattern: 'user', icon: 'search' },
    { id: 'overlap', label: 'W + R > N', sub: '4 > 3: at least one is fresh', pattern: 'storage', icon: 'circlecheck' },
    { id: 'limits', label: 'Not a full guarantee', sub: 'failed writes, sloppy quorums', pattern: 'warn', icon: 'bug' },
  ],
  edges: [
    { source: 'write', target: 'copies', label: 'acknowledged by A, B' },
    { source: 'read', target: 'copies', label: 'any two, e.g. B, C' },
    { source: 'copies', target: 'overlap', label: 'B is in both' },
    { source: 'overlap', target: 'limits', label: 'but', dashed: true },
  ],
}
