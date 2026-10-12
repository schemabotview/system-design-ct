import type { Scene } from '@graphlearning/flow'

// §9 — three ways to record clicks, on chapter 1's ASSUMED workload (20 M redirects/day: 231/s average,
// 1,157/s peak). 20 M × 100 B = 2 GB/day ≈ 730 GB/year at an ASSUMED 100 bytes per row.
export const clickModels: Scene = {
  id: 'click-models',
  title: 'Three ways to record a click',
  flow: 'TB',
  nodes: [
    {
      id: 'models',
      label: 'Recording one click, three ways',
      pattern: 'group',
      flow: 'LR',
      children: [
    {
      id: 'rows',
      label: 'A · Row per click',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'a-write', label: 'Write 231 / s', sub: '1,157 / s at peak', pattern: 'service', icon: 'pencil' },
        { id: 'a-size', label: '730 GB a year', sub: 'at 100 B per row', pattern: 'storage', icon: 'harddrive' },
        { id: 'a-ask', label: 'Any question later', sub: 'raw history is kept', pattern: 'storage', icon: 'circlecheck' },
        { id: 'a-idx', label: 'Needs an index', sub: 'else full scans', pattern: 'warn', icon: 'sortarrows' },
      ],
    },
    {
      id: 'counter',
      label: 'B · Counter on link',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'b-tiny', label: 'One number', sub: 'tiny storage', pattern: 'storage', icon: 'hash' },
        { id: 'b-read', label: 'Cheap reads', sub: 'one lookup', pattern: 'storage', icon: 'circlecheck' },
        { id: 'b-hot', label: 'Hot row', sub: 'popular links queue up', pattern: 'warn', icon: 'zap' },
        { id: 'b-lost', label: 'History is lost', sub: 'no per-day answer', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'hybrid',
      label: 'C · Events + rollup',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'c-events', label: 'Raw events', sub: 'kept 13 months', pattern: 'storage', icon: 'database' },
        { id: 'c-roll', label: 'Daily rollup', sub: 'per code and day', pattern: 'storage', icon: 'calendar' },
        { id: 'c-fast', label: 'Dashboards fast', sub: 'read the small table', pattern: 'storage', icon: 'gauge' },
        { id: 'c-job', label: 'A moving part', sub: 'the job can lag', pattern: 'warn', icon: 'gears' },
      ],
    },
      ],
    },
    {
      id: 'bottleneck',
      kind: 'code',
      filename: 'supplied-evidence.sql',
      label: `-- supplied for the exercise (hypothetical)
SELECT date(clicked_at), count(*) FROM clicks
 WHERE code = 'aZ3k9Q' GROUP BY 1;
-- plan: sequential scan on clicks    (8 s)

CREATE INDEX clicks_by_code_day
    ON clicks (code, clicked_at);     -- or read the rollup`,
    },
  ],
  edges: [{ source: 'models', target: 'bottleneck', label: 'supplied evidence' }],
}

