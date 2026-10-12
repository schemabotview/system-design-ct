import type { Scene } from '@graphlearning/flow'

// §4 — the estimate as a chain of single-step multiplications, so every edge label is a unit
// conversion or an assumption a reader can challenge. Top row is traffic; the lower row is storage
// and bandwidth derived from it. All inputs are ASSUMED; nothing here is a measurement.
export const demandEstimate: Scene = {
  id: 'demand-estimate',
  title: 'From users to requests per second',
  flow: 'TB',
  nodes: [
    { id: 'users', label: '1 million', sub: 'daily users, assumed', pattern: 'user', icon: 'users' },
    { id: 'perday', label: '20 million', sub: 'redirects per day', pattern: 'service', icon: 'sigma' },
    { id: 'avg', label: '≈ 231 / s', sub: 'average request rate', pattern: 'service', icon: 'gauge' },
    { id: 'peak', label: '≈ 1,157 / s', sub: 'at an assumed 5× peak', pattern: 'warn', icon: 'zap' },
    { id: 'bw', label: '≈ 4.6 Mbit/s', sub: 'peak response traffic', pattern: 'network', icon: 'waves' },
    { id: 'writes', label: '200,000', sub: 'new links per day', pattern: 'storage', icon: 'pencil' },
    { id: 'perdaygb', label: '100 MB / day', sub: 'at 500 B per link', pattern: 'storage', icon: 'harddrive' },
    { id: 'year', label: '≈ 36.5 GB', sub: 'of links per year', pattern: 'storage', icon: 'calendar' },
  ],
  edges: [
    { source: 'users', target: 'perday', label: '× 20 each' },
    { source: 'perday', target: 'avg', label: '÷ 86,400 s' },
    { source: 'avg', target: 'peak', label: '× 5' },
    { source: 'peak', target: 'bw', label: '× 500 B × 8' },
    { source: 'perday', target: 'writes', label: '÷ 100 reads/write' },
    { source: 'writes', target: 'perdaygb', label: '× 500 B' },
    { source: 'perdaygb', target: 'year', label: '× 365' },
  ],
}
