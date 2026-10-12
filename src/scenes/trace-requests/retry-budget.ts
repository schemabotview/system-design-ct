import type { Scene, PlotPoint } from '@graphlearning/flow'

// §5 — a deadline-aware retry loop and the backoff ceiling it uses. All timings are HYPOTHETICAL:
// deadline 400 ms, per-attempt timeout 150 ms, backoff base 100 ms doubling to a 1,600 ms cap.
// Ceiling for retry n is min(1600, 100 × 2^(n−1)): 100, 200, 400, 800, 1600, 1600 — and with full
// jitter the actual wait is a random value between 0 and that ceiling.
const ceiling: PlotPoint[] = [1, 2, 3, 4, 5, 6].map((n) => [n, Math.min(1600, 100 * 2 ** (n - 1))])

export const retryBudget: Scene = {
  id: 'retry-budget',
  title: 'Retry inside the deadline',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'retry-loop.txt',
      label: `deadline = now + 400 ms
for attempt in 1..3:
    left = deadline - now
    if left <= 0: fail("deadline exceeded")
    result = call(timeout = min(150 ms, left))
    if result.ok or not retryable: return result
    sleep(random(0, min(1600, 100 * 2 ** (attempt - 1))))`,
    },
    {
      id: 'backoff',
      kind: 'plot',
      label: 'Longest possible wait before retry n',
      sub: 'assumed: 100 ms base, doubling, 1,600 ms cap',
      plot: {
        x: { min: 0, max: 7, step: 1, label: 'retry number' },
        y: { min: 0, max: 1800, step: 400, label: 'ceiling (ms)' },
        axes: 'corner',
        series: [
          { kind: 'area', points: ceiling, color: 'network' },
          { kind: 'line', points: ceiling, color: 'network' },
          { kind: 'scatter', points: ceiling, color: 'network' },
          { kind: 'segment', from: [0, 1600], to: [7, 1600], label: 'cap 1,600 ms', labelAt: [0.2, 1690], color: 'warn', dashed: true },
        ],
      },
    },
  ],
  edges: [{ source: 'loop', target: 'backoff', label: 'sleep(random(…))' }],
}
