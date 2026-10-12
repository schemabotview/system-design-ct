import type { Scene } from '@graphlearning/flow'

// §3 — a quality wish becomes a requirement only when someone could measure it and say "met" or
// "missed". One band per attribute: the vague wish on the left becomes the criterion on the right.
// Every number is an ASSUMED target for the lesson, not a recommendation.
export const qualityCriteria: Scene = {
  id: 'quality-criteria',
  title: 'From wish to acceptance criterion',
  flow: 'TB',
  cols: 1,
  padding: 0.17,
  nodes: [
    {
      id: 'latency',
      label: 'Latency',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'w-latency', label: 'Feels fast', sub: 'a wish', pattern: 'user', icon: 'clock' },
        { id: 'c-latency', label: '99% under 100 ms', sub: 'at the app, per 30 days', pattern: 'service', icon: 'gauge' },
      ],
      edges: [{ source: 'w-latency', target: 'c-latency', label: 'becomes' }],
    },
    {
      id: 'availability',
      label: 'Availability',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'w-avail', label: 'Rarely down', sub: 'a wish', pattern: 'user', icon: 'power' },
        { id: 'c-avail', label: '99.9% succeed', sub: 'redirect requests, 30 days', pattern: 'network', icon: 'circlecheck' },
      ],
      edges: [{ source: 'w-avail', target: 'c-avail', label: 'becomes' }],
    },
    {
      id: 'durability',
      label: 'Durability',
      pattern: 'storage',
      flow: 'LR',
      children: [
        { id: 'w-dur', label: 'Never lost', sub: 'a wish', pattern: 'user', icon: 'database' },
        { id: 'c-dur', label: 'Survives 1 loss', sub: 'confirmed links, one machine', pattern: 'storage', icon: 'harddrive' },
      ],
      edges: [{ source: 'w-dur', target: 'c-dur', label: 'becomes' }],
    },
    {
      id: 'capacity',
      label: 'Capacity',
      pattern: 'warn',
      flow: 'LR',
      children: [
        { id: 'w-cap', label: 'Handles load', sub: 'a wish', pattern: 'user', icon: 'zap' },
        { id: 'c-cap', label: '1,157 / s peak', sub: 'with headroom', pattern: 'warn', icon: 'sigma' },
      ],
      edges: [{ source: 'w-cap', target: 'c-cap', label: 'becomes' }],
    },
    {
      id: 'abuse',
      label: 'Abuse',
      pattern: 'external',
      flow: 'LR',
      children: [
        { id: 'w-abuse', label: 'Not a spam tool', sub: 'a wish', pattern: 'user', icon: 'ban' },
        { id: 'c-abuse', label: '100 links / hour', sub: 'per owner, at most', pattern: 'external', icon: 'lock' },
      ],
      edges: [{ source: 'w-abuse', target: 'c-abuse', label: 'becomes' }],
    },
  ],
  edges: [],
}
