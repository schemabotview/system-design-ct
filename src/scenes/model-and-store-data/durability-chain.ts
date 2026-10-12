import type { Scene } from '@graphlearning/flow'

// §8 — each failure is answered by a different copy or policy; no single copy covers them all.
// The 13-month click retention is an ASSUMED policy.
export const durabilityChain: Scene = {
  id: 'durability-chain',
  title: 'Each failure needs a different answer',
  flow: 'TB',
  cols: 1,
  padding: 0.12,
  nodes: [
    {
      id: 'crash',
      label: 'Process crash',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'crash-threat', label: 'Process dies', sub: 'mid-write', pattern: 'warn', icon: 'bug' },
        { id: 'crash-fix', label: 'Flushed to disk', sub: 'write survives restart', pattern: 'service', icon: 'harddrive' },
      ],
      edges: [{ source: 'crash-threat', target: 'crash-fix', label: 'covered by' }],
    },
    {
      id: 'machine',
      label: 'Machine loss',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'machine-threat', label: 'Machine lost', sub: 'disk and all', pattern: 'warn', icon: 'skull' },
        { id: 'machine-fix', label: 'Replica copy', sub: 'a second machine', pattern: 'network', icon: 'copy' },
      ],
      edges: [{ source: 'machine-threat', target: 'machine-fix', label: 'covered by' }],
    },
    {
      id: 'mistake',
      label: 'Bad delete or bug',
      pattern: 'storage',
      flow: 'LR',
      children: [
        { id: 'mistake-threat', label: 'Wrong rows gone', sub: 'replicas copy it too', pattern: 'warn', icon: 'trash' },
        { id: 'mistake-fix', label: 'Backup, restored', sub: 'tested by a drill', pattern: 'storage', icon: 'history' },
      ],
      edges: [{ source: 'mistake-threat', target: 'mistake-fix', label: 'covered by' }],
    },
    {
      id: 'age',
      label: 'Data grows old',
      pattern: 'external',
      flow: 'LR',
      children: [
        { id: 'age-threat', label: 'Kept forever', sub: 'cost and risk grow', pattern: 'warn', icon: 'calendar' },
        { id: 'age-fix', label: 'Retention policy', sub: 'clicks deleted at 13 months', pattern: 'external', icon: 'scale' },
      ],
      edges: [{ source: 'age-threat', target: 'age-fix', label: 'covered by' }],
    },
  ],
  edges: [],
}
