import type { Scene } from '@graphlearning/flow'

// §11 — a post-incident review lists contributing causes rather than a single culprit, then prevention,
// then what risk remains.
export const postIncident: Scene = {
  id: 'post-incident',
  title: 'Learn about the system, not the person',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'causes',
      label: 'Contributing causes',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'c-valid', label: 'Config not validated', sub: 'bad value accepted', pattern: 'warn', icon: 'bug' },
        { id: 'c-all', label: 'Shipped to everyone', sub: 'no gradual rollout', pattern: 'warn', icon: 'globe' },
        { id: 'c-alert', label: 'Slow alert, no runbook', sub: '3 min plus guessing', pattern: 'warn', icon: 'bell' },
      ],
    },
    {
      id: 'prevent',
      label: 'Prevention',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'p-val', label: 'Validate config', sub: 'reject bad values', pattern: 'storage', icon: 'circlecheck' },
        { id: 'p-canary', label: 'Roll out gradually', sub: 'canary first', pattern: 'storage', icon: 'funnel' },
        { id: 'p-alert', label: 'Faster alert, runbook', sub: 'with a clear action', pattern: 'storage', icon: 'scroll' },
      ],
    },
    {
      id: 'residual',
      label: 'Residual risk',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'r-some', label: 'Some bad changes pass', sub: 'tests cannot see all', pattern: 'external', icon: 'skull' },
        { id: 'r-accept', label: 'Accept and watch', sub: 'say so explicitly', pattern: 'external', icon: 'gauge' },
      ],
    },
    {
      id: 'write',
      label: 'Writing it up',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'w-time', label: 'Timeline and impact', sub: 'facts first', pattern: 'network', icon: 'clock' },
        { id: 'w-act', label: 'Actions with owners', sub: 'and dates', pattern: 'network', icon: 'users' },
        { id: 'w-blame', label: 'No blame', sub: 'systems, not people', pattern: 'network', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [],
}
