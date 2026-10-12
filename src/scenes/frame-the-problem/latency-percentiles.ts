import type { Scene, PlotPoint } from '@graphlearning/flow'

// §5 — why a mean hides the slow requests. The curve is a gamma(2, 20 ms) density chosen so the
// quantiles are easy to state: median ≈ 34 ms, mean 40 ms, 99th percentile ≈ 133 ms. It is an
// ILLUSTRATION of a right-skewed latency distribution, not a measurement of any service.
const density: PlotPoint[] = Array.from({ length: 61 }, (_, i) => {
  const x = i * 5
  return [x, (x * Math.exp(-x / 20)) / 4] // % of requests per millisecond: f(x)·100 with f = x·e^(−x/20)/400
})

export const latencyPercentiles: Scene = {
  id: 'latency-percentiles',
  title: 'The mean is not the experience',
  flow: 'TB',
  nodes: [
    {
      id: 'dist',
      kind: 'plot',
      label: 'Redirect latency, illustrative',
      sub: 'a skewed shape, not a measurement',
      plot: {
        x: { min: 0, max: 300, step: 50, label: 'latency (ms)' },
        y: { min: 0, max: 2, step: 0.5, label: '% of requests per ms' },
        axes: 'corner',
        series: [
          { kind: 'area', points: density, color: 'service' },
          { kind: 'segment', from: [34, 0], to: [34, 1.9], label: 'p50 ≈ 34 ms', labelAt: [46, 1.85], color: 'storage' },
          { kind: 'segment', from: [40, 0], to: [40, 1.5], label: 'mean 40 ms', labelAt: [46, 1.6], color: 'network', dashed: true },
          { kind: 'segment', from: [133, 0], to: [133, 0.9], label: 'p99 ≈ 133 ms', labelAt: [140, 0.85], color: 'warn' },
        ],
      },
    },
    {
      id: 'little',
      kind: 'code',
      filename: 'concurrency.txt',
      label: `# Little's law, long-run averages
in_flight = arrival_rate × mean_latency
          = 1,157 req/s × 0.040 s
          ≈ 46 requests in flight at peak`,
    },
  ],
  edges: [{ source: 'dist', target: 'little', label: 'mean 40 ms' }],
}
