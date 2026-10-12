import type { Scene, PlotPoint } from '@graphlearning/flow'

// §1 — latency against utilisation in the simplest queueing model (M/M/1): response time = service
// time ÷ (1 − utilisation), with an ASSUMED 10 ms service time. 50 % → 20 ms, 80 % → 50 ms,
// 90 % → 100 ms, 95 % → 200 ms. A model for intuition, not a prediction for any real server.
const curve: PlotPoint[] = []
for (let pct = 2; pct <= 95; pct += 1) curve.push([pct, 10 / (1 - pct / 100)])

export const saturation: Scene = {
  id: 'saturation',
  title: 'Latency climbs before the resource is full',
  flow: 'TB',
  nodes: [
    {
      id: 'queue',
      kind: 'plot',
      label: 'Response time against utilisation',
      sub: 'simple queueing model, assumed 10 ms service time',
      plot: {
        x: { min: 0, max: 100, step: 20, label: 'utilisation (%)' },
        y: { min: 0, max: 220, step: 50, label: 'response time (ms)' },
        axes: 'corner',
        series: [
          { kind: 'line', points: curve, color: 'warn' },
          { kind: 'marker', at: [50, 20], label: '50 %: 20 ms', labelAt: [30, 40], color: 'storage' },
          { kind: 'marker', at: [80, 50], label: '80 %: 50 ms', labelAt: [52, 80], color: 'network' },
          { kind: 'marker', at: [95, 200], label: '95 %: 200 ms', labelAt: [62, 200], color: 'warn' },
        ],
      },
    },
    {
      id: 'where',
      label: 'Where to look for the full resource',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'w-cpu', label: 'CPU', sub: 'busy near 100%', pattern: 'service', icon: 'cpu' },
        { id: 'w-mem', label: 'Memory', sub: 'swapping, OOM kills', pattern: 'service', icon: 'memory' },
        { id: 'w-disk', label: 'Disk', sub: 'I/O wait, queues', pattern: 'storage', icon: 'harddrive' },
        { id: 'w-net', label: 'Network', sub: 'bandwidth, sockets', pattern: 'network', icon: 'network' },
        { id: 'w-dep', label: 'Dependency', sub: 'slow database or API', pattern: 'warn', icon: 'plug' },
      ],
    },
  ],
  edges: [{ source: 'queue', target: 'where', label: 'then find the cause' }],
}
