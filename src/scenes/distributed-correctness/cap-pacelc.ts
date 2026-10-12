import type { Scene } from '@graphlearning/flow'

// §5 — CAP's choice exists only while a partition does; PACELC adds the choice made the rest of the
// time (latency versus consistency). A lens for reasoning, not a classification of products.
export const capPacelc: Scene = {
  id: 'cap-pacelc',
  title: 'Two choices, at two times',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'during',
      label: 'If partitioned (CAP)',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'd-q', label: 'Replicas cannot talk', sub: 'what do you keep?', pattern: 'network', icon: 'network' },
        { id: 'd-c', label: 'Keep consistency', sub: 'refuse or wait', pattern: 'storage', icon: 'lock' },
        { id: 'd-a', label: 'Keep availability', sub: 'answer, maybe stale', pattern: 'warn', icon: 'zap' },
        { id: 'd-ex', label: 'Example', sub: 'minority rejects writes', pattern: 'service', icon: 'users' },
      ],
    },
    {
      id: 'else',
      label: 'Else, normally (PACELC)',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'e-q', label: 'All replicas reachable', sub: 'what do you keep?', pattern: 'network', icon: 'network' },
        { id: 'e-c', label: 'Keep consistency', sub: 'wait for replicas', pattern: 'storage', icon: 'clock' },
        { id: 'e-l', label: 'Keep low latency', sub: 'answer locally', pattern: 'warn', icon: 'gauge' },
        { id: 'e-ex', label: 'Example', sub: 'nearest vs quorum read', pattern: 'service', icon: 'search' },
      ],
    },
  ],
  edges: [],
}
