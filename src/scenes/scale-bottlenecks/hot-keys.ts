import type { Scene, PlotPoint } from '@graphlearning/flow'

// §5 — skewed popularity and the three ways a cache fails. The popularity curve is an ASSUMED Zipf-like
// distribution over 50 links (share of rank r ∝ 1/r; the harmonic sum H₅₀ ≈ 4.499, so rank 1 ≈ 22 %).
const share: PlotPoint[] = Array.from({ length: 50 }, (_, i) => [i + 1, 100 / (i + 1) / 4.499])

export const hotKeys: Scene = {
  id: 'hot-keys',
  title: 'Skew, stampedes and outages',
  flow: 'TB',
  nodes: [
    {
      id: 'zipf',
      kind: 'plot',
      label: 'Share of requests by link popularity rank',
      sub: 'assumed Zipf-like skew over 50 links',
      plot: {
        x: { min: 0, max: 50, step: 10, label: 'link rank (1 = most visited)' },
        y: { min: 0, max: 25, step: 5, label: '% of requests' },
        axes: 'corner',
        series: [
          { kind: 'area', points: share, color: 'warn' },
          { kind: 'line', points: share, color: 'warn' },
          { kind: 'marker', at: [1, 22.2], label: 'rank 1: 22 %', labelAt: [6, 22], color: 'warn' },
        ],
      },
    },
    {
      id: 'modes',
      label: 'Three ways a cache fails',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'm-hot', label: 'Hot key', sub: 'one node overloaded', pattern: 'warn', icon: 'zap' },
        { id: 'm-stamp', label: 'Stampede', sub: 'many misses at once', pattern: 'warn', icon: 'waves' },
        { id: 'm-out', label: 'Cache outage', sub: 'all reads hit the DB', pattern: 'warn', icon: 'power' },
      ],
    },
  ],
  edges: [{ source: 'zipf', target: 'modes', label: 'skew causes' }],
}
