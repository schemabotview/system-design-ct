import type { Scene, PlotPoint } from '@graphlearning/flow'

// §6 — a token bucket for link creation. ASSUMED limit: 100 creates per owner per hour, burst of 10.
// Refill = 100 ÷ 3,600 s = one token every 36 s, so an emptied bucket is full again after 360 s.
const refill: PlotPoint[] = [
  [0, 0],
  [360, 10],
]

export const tokenBucket: Scene = {
  id: 'token-bucket',
  title: 'Spend tokens, wait for refill',
  flow: 'TB',
  nodes: [
    {
      id: 'rule',
      kind: 'code',
      filename: 'token-bucket.txt',
      label: `capacity = 10 tokens
refill   = 100 per hour = 1 token every 36 s
on create:
  if tokens >= 1:  tokens -= 1; allow
  else:            reject 429, Retry-After: 36`,
    },
    {
      id: 'level',
      kind: 'plot',
      label: 'Tokens after a burst of 10 creates at t = 0',
      sub: 'assumed: capacity 10, refill 1 token per 36 s',
      plot: {
        x: { min: 0, max: 400, step: 100, label: 'seconds after the burst' },
        y: { min: 0, max: 10, step: 2, label: 'tokens available' },
        axes: 'corner',
        series: [
          { kind: 'area', points: refill, color: 'network' },
          { kind: 'line', points: refill, color: 'network' },
          { kind: 'marker', at: [0, 0], label: '11th create: 429', labelAt: [40, 0.45], color: 'warn' },
          { kind: 'marker', at: [36, 1], label: '1 token at 36 s', labelAt: [120, 1.5], color: 'storage' },
          { kind: 'marker', at: [360, 10], label: 'full at 360 s', labelAt: [225, 9.2], color: 'storage' },
        ],
      },
    },
  ],
  edges: [{ source: 'rule', target: 'level', label: 'behaves like' }],
}
