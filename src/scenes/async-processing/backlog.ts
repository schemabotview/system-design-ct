import type { Scene, PlotPoint } from '@graphlearning/flow'

// §7 — a burst the consumers cannot keep up with. ASSUMED rates: arrival 1,157/s for 600 s, service
// 1,000/s. Backlog grows 157/s to 94,200; afterwards arrival falls to 231/s, so it drains at
// 1,000 − 231 = 769/s, taking 94,200 ÷ 769 ≈ 122.5 s (empty at ≈ 722.5 s).
const backlog: PlotPoint[] = [
  [0, 0],
  [600, 94200],
  [722.5, 0],
]

export const backlogScene: Scene = {
  id: 'backlog',
  title: 'A burst, a backlog, a drain',
  flow: 'TB',
  nodes: [
    {
      id: 'queue',
      kind: 'plot',
      label: 'Messages waiting over time',
      sub: 'assumed: 1,157/s in for 10 minutes, 1,000/s out',
      plot: {
        x: { min: 0, max: 800, step: 200, label: 'seconds' },
        y: { min: 0, max: 100000, step: 25000, label: 'messages waiting' },
        axes: 'corner',
        series: [
          { kind: 'area', points: backlog, color: 'warn' },
          { kind: 'line', points: backlog, color: 'warn' },
          { kind: 'marker', at: [600, 94200], label: '94,200 at 10 min', labelAt: [250, 97000], color: 'warn' },
          { kind: 'marker', at: [722.5, 0], label: 'empty at ≈ 722 s', labelAt: [520, 8000], color: 'storage' },
        ],
      },
    },
    {
      id: 'responses',
      label: 'Responses to a growing backlog',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'r-back', label: 'Backpressure', sub: 'slow or reject producers', pattern: 'warn', icon: 'gauge' },
        { id: 'r-batch', label: 'Batching', sub: 'throughput up, latency up', pattern: 'service', icon: 'boxes' },
        { id: 'r-view', label: 'Materialised view', sub: 'precompute for readers', pattern: 'storage', icon: 'table' },
      ],
    },
  ],
  edges: [{ source: 'queue', target: 'responses', label: 'what to do' }],
}
