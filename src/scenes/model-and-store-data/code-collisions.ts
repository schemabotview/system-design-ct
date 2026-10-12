import type { Scene } from '@graphlearning/flow'

// §3 — random codes collide rarely but not never; the primary key turns a clash into a retry.
// 62^6 = 56,800,235,584 codes. Chance a NEW code is taken ≈ links stored ÷ 62^6. The 73 million figure
// is chapter 1's ASSUMED 200,000 new links a day for a year.
export const codeCollisions: Scene = {
  id: 'code-collisions',
  title: 'A clash becomes a retry',
  flow: 'TB',
  nodes: [
    { id: 'gen', label: 'Generate code', sub: 'random, 6 base-62 chars', pattern: 'user', icon: 'hash' },
    { id: 'insert', label: 'INSERT the row', sub: 'primary key checks it', pattern: 'storage', icon: 'database' },
    { id: 'stored', label: 'Stored', sub: 'return 201', pattern: 'storage', icon: 'circlecheck' },
    { id: 'clash', label: 'Unique violation', sub: 'code already taken', pattern: 'warn', icon: 'ban' },
    { id: 'again', label: 'Generate again', sub: 'attempt 2 of 3', pattern: 'user', icon: 'repeat' },
    { id: 'giveup', label: 'Give up', sub: 'return 503, log it', pattern: 'warn', icon: 'bell' },
    {
      id: 'odds',
      kind: 'table',
      label: 'Chance a new code is already taken',
      headers: ['Links stored', 'Clash chance'],
      values: [
        ['1 million', '0.0018 %'],
        ['10 million', '0.018 %'],
        ['73 million', '0.13 %'],
      ],
    },
  ],
  edges: [
    { source: 'gen', target: 'insert' },
    { source: 'insert', target: 'stored', label: 'no clash' },
    { source: 'insert', target: 'clash', label: 'clash', dashed: true },
    { source: 'clash', target: 'again', label: 'retry' },
    { source: 'again', target: 'giveup', label: 'after 3 clashes', dashed: true },
    { source: 'clash', target: 'odds', label: 'how often?', dashed: true },
  ],
}
