import type { Scene } from '@graphlearning/flow'

// §2 — a three-client history on ONE register x (initially 0). The write overlaps B's read, so B may
// legally see 0 or 1. C's read starts after the write has returned, so under linearizability it must
// see 1; seeing 0 is a violation.
export const history: Scene = {
  id: 'history',
  title: 'Judging a history',
  flow: 'TB',
  nodes: [
    {
      id: 'ops',
      kind: 'table',
      label: 'History of register x, initially 0',
      headers: ['Time', 'Client', 'Operation', 'Result'],
      values: [
        ['t1', 'A', 'write x = 1 starts', ''],
        ['t2', 'B', 'read x', '1'],
        ['t3', 'A', 'write returns', 'ok'],
        ['t4', 'C', 'read x', '0'],
      ],
    },
    {
      id: 'verdict',
      label: 'Verdict under linearizability',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'v-overlap', label: 'B overlaps the write', sub: '0 or 1 are both legal', pattern: 'storage', icon: 'circlecheck' },
        { id: 'v-after', label: 'C starts after it ended', sub: 'must read 1, got 0', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'ops', target: 'verdict', label: 'check each read' }],
}
