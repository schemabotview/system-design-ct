import type { Scene } from '@graphlearning/flow'

// §3 — four patterns that stop one failing dependency from taking everything down. The 30-second open
// period is ASSUMED.
export const resilience: Scene = {
  id: 'resilience',
  title: 'Contain the failure',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'breaker',
      label: 'Circuit breaker',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'cb-closed', label: 'Closed', sub: 'calls flow normally', pattern: 'storage', icon: 'circlecheck' },
        { id: 'cb-open', label: 'Open', sub: 'fail fast for 30 s', pattern: 'warn', icon: 'ban' },
        { id: 'cb-half', label: 'Half-open', sub: 'one trial call', pattern: 'network', icon: 'repeat' },
      ],
      edges: [
        { source: 'cb-closed', target: 'cb-open', label: 'repeated failures' },
        { source: 'cb-open', target: 'cb-half', label: 'after the pause' },
      ],
    },
    {
      id: 'bulkhead',
      label: 'Bulkheads',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'b-pool', label: 'Separate pools', sub: 'one per dependency', pattern: 'service', icon: 'boxes' },
        { id: 'b-slow', label: 'A slow one is contained', sub: 'others keep threads', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'shed',
      label: 'Load shedding',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 's-early', label: 'Reject early', sub: 'before queues build', pattern: 'network', icon: 'funnel' },
        { id: 's-low', label: 'Low priority first', sub: 'protect redirects', pattern: 'network', icon: 'scale' },
      ],
    },
    {
      id: 'degrade',
      label: 'Graceful degradation',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'd-core', label: 'Keep the core', sub: 'redirects must work', pattern: 'storage', icon: 'lock' },
        { id: 'd-opt', label: 'Drop the optional', sub: 'stats can wait', pattern: 'storage', icon: 'trash' },
      ],
    },
  ],
  edges: [],
}
