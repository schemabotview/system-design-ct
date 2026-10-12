import type { Scene } from '@graphlearning/flow'

// §7 — a canary release: expose a small slice, compare with the baseline, then promote or roll back.
// The 1 % slice and 10-minute watch are ASSUMED.
export const canary: Scene = {
  id: 'canary',
  title: 'Promote slowly, roll back quickly',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'release',
      label: '1 · Release a slice',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'build', label: 'Build and test', sub: 'the new version', pattern: 'service', icon: 'gears' },
        { id: 'slice', label: 'Canary: 1 % of traffic', sub: 'watch for 10 minutes', pattern: 'network', icon: 'funnel' },
      ],
      edges: [{ source: 'build', target: 'slice', label: 'deploy' }],
    },
    {
      id: 'decide',
      label: '2 · Decide',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'compare', label: 'Compare to baseline', sub: 'error ratio, latency', pattern: 'service', icon: 'scale' },
        { id: 'within', label: 'Within budget?', sub: 'a clear, written test', pattern: 'network', icon: 'gauge' },
      ],
    },
    {
      id: 'promote',
      label: '3 · Healthy: promote',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'p10', label: '10 %', sub: 'then watch again', pattern: 'storage', icon: 'circlecheck' },
        { id: 'p50', label: '50 %', sub: 'then watch again', pattern: 'storage', icon: 'circlecheck' },
        { id: 'p100', label: '100 %', sub: 'release complete', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'rollback',
      label: '3 · Unhealthy: roll back',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'back', label: 'Automatic rollback', sub: 'to the previous version', pattern: 'warn', icon: 'history' },
        { id: 'few', label: 'Few users affected', sub: 'only the 1 % slice', pattern: 'warn', icon: 'users' },
        { id: 'learn', label: 'Investigate later', sub: 'service is already safe', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [],
}
