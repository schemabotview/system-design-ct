import type { Scene } from '@graphlearning/flow'

// §3 — safety is "nothing bad ever happens"; liveness is "something good eventually happens". Under a
// partition a system may keep safety by giving up progress on the minority side.
export const safetyLiveness: Scene = {
  id: 'safety-liveness',
  title: 'Safe first, then live',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'safety',
      label: 'Safety',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 's-def', label: 'Nothing bad, ever', sub: 'a bad state is never reached', pattern: 'storage', icon: 'lock' },
        { id: 's-ex1', label: 'No two leaders', sub: 'in the same term', pattern: 'storage', icon: 'key' },
        { id: 's-ex2', label: 'No oversell', sub: 'stock never below zero', pattern: 'storage', icon: 'scale' },
      ],
    },
    {
      id: 'liveness',
      label: 'Liveness',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'l-def', label: 'Something good, eventually', sub: 'progress is made', pattern: 'network', icon: 'repeat' },
        { id: 'l-ex1', label: 'A leader appears', sub: 'after a failure', pattern: 'network', icon: 'users' },
        { id: 'l-ex2', label: 'Requests answered', sub: 'sooner or later', pattern: 'network', icon: 'circlecheck' },
      ],
    },
    {
      id: 'partition',
      label: 'During a partition',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'p-minor', label: 'Minority side waits', sub: 'cannot reach a majority', pattern: 'warn', icon: 'clock' },
        { id: 'p-keep', label: 'Safety is kept', sub: 'no conflicting decisions', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'p-cost', label: 'Liveness is paid', sub: 'those requests stall', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [],
}
