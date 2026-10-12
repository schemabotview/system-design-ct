import type { Scene } from '@graphlearning/flow'

// §8 — three recovery options measured against an ASSUMED requirement of RTO 1 hour and RPO 5 minutes.
// Every figure for the options is an assumption for the exercise, standing in for numbers a real restore
// drill would produce. Node ids are literal so `npm run check` can see them.
export const recoveryOptions: Scene = {
  id: 'recovery-options',
  title: 'Against RTO 1 h and RPO 5 min',
  flow: 'TB',
  cols: 1,
  padding: 0.12,
  nodes: [
    {
      id: 'nightly',
      label: 'Nightly backup',
      pattern: 'external',
      flow: 'LR',
      children: [
        { id: 'nightly-t', label: 'Recovery time', sub: 'about 4 h', pattern: 'service', icon: 'clock' },
        { id: 'nightly-l', label: 'Data loss', sub: 'up to 24 h', pattern: 'service', icon: 'trash' },
        { id: 'nightly-v', label: 'Misses both', sub: 'RTO 1 h, RPO 5 min', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'nightly-t', target: 'nightly-l' },
        { source: 'nightly-l', target: 'nightly-v', label: 'so' },
      ],
    },
    {
      id: 'replica',
      label: 'Replica promotion',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'replica-t', label: 'Recovery time', sub: 'about 15 min', pattern: 'service', icon: 'clock' },
        { id: 'replica-l', label: 'Data loss', sub: 'about 5 s', pattern: 'service', icon: 'trash' },
        { id: 'replica-v', label: 'Meets both', sub: 'but copies a bad delete', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'replica-t', target: 'replica-l' },
        { source: 'replica-l', target: 'replica-v', label: 'so' },
      ],
    },
    {
      id: 'pitr',
      label: 'Point-in-time recovery',
      pattern: 'storage',
      flow: 'LR',
      children: [
        { id: 'pitr-t', label: 'Recovery time', sub: 'about 2 h', pattern: 'service', icon: 'clock' },
        { id: 'pitr-l', label: 'Data loss', sub: 'up to 5 min', pattern: 'service', icon: 'trash' },
        { id: 'pitr-v', label: 'Meets RPO only', sub: 'misses RTO 1 h', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'pitr-t', target: 'pitr-l' },
        { source: 'pitr-l', target: 'pitr-v', label: 'so' },
      ],
    },
    {
      id: 'combo',
      label: 'Replica plus point-in-time recovery',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'combo-t', label: 'Machine loss', sub: 'about 15 min', pattern: 'service', icon: 'clock' },
        { id: 'combo-l', label: 'A mistake', sub: 'about 2 h to recover', pattern: 'service', icon: 'trash' },
        { id: 'combo-v', label: 'Best coverage', sub: 'mistake path misses RTO', pattern: 'warn', icon: 'circleslash' },
      ],
      edges: [
        { source: 'combo-t', target: 'combo-l' },
        { source: 'combo-l', target: 'combo-v', label: 'so' },
      ],
    },
  ],
  edges: [],
}
