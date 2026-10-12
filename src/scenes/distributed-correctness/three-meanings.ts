import type { Scene } from '@graphlearning/flow'

// §4 — three words for "consistency" that answer three different questions. The fourth cell is the
// mix-up that causes the most design errors.
export const threeMeanings: Scene = {
  id: 'three-meanings',
  title: 'Three questions, three vocabularies',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'repl',
      label: 'Replication consistency',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'r-q', label: 'Do copies agree?', sub: 'one object, many replicas', pattern: 'network', icon: 'copy' },
        { id: 'r-strong', label: 'Linearizable', sub: 'acts like one copy', pattern: 'storage', icon: 'circlecheck' },
        { id: 'r-event', label: 'Eventual', sub: 'agree if writes stop', pattern: 'warn', icon: 'clock' },
      ],
    },
    {
      id: 'iso',
      label: 'Transaction isolation',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'i-q', label: 'Do they interfere?', sub: 'concurrent transactions', pattern: 'service', icon: 'merge' },
        { id: 'i-ser', label: 'Serializable', sub: 'as if one after another', pattern: 'storage', icon: 'circlecheck' },
        { id: 'i-snap', label: 'Snapshot', sub: 'allows write skew', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'sess',
      label: 'Session guarantees',
      pattern: 'user',
      cols: 1,
      children: [
        { id: 's-q', label: 'One client\'s view', sub: 'across its own requests', pattern: 'user', icon: 'users' },
        { id: 's-ryw', label: 'Read your writes', sub: 'sees its own updates', pattern: 'storage', icon: 'circlecheck' },
        { id: 's-mono', label: 'Monotonic reads', sub: 'never goes backwards', pattern: 'storage', icon: 'repeat' },
      ],
    },
    {
      id: 'mix',
      label: 'Common mix-ups',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'x-1', label: 'Serializable is not linearizable', sub: 'different questions', pattern: 'warn', icon: 'ban' },
        { id: 'x-2', label: 'A replica can be stale', sub: 'even under serializable', pattern: 'warn', icon: 'clock' },
        { id: 'x-3', label: 'Both needed? Ask for both', sub: 'strict serializability', pattern: 'service', icon: 'scale' },
      ],
    },
  ],
  edges: [],
}
