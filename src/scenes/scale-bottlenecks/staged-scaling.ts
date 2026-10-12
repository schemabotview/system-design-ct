import type { Scene } from '@graphlearning/flow'

// §9 — a staged scaling case. Every stage is: supplied evidence → the one change it justifies → the
// new failure mode that change introduces. All evidence is SUPPLIED HYPOTHETICAL data for the
// exercise. Node ids are written out literally so `npm run check` can see them.
export const stagedScaling: Scene = {
  id: 'staged-scaling',
  title: 'Evidence, change, new failure mode',
  flow: 'TB',
  cols: 1,
  padding: 0.12,
  nodes: [
    {
      id: 'stage0',
      label: 'Stage 0: the baseline',
      pattern: 'external',
      flow: 'LR',
      children: [
        { id: 'stage0-e', label: 'Peak 1,157 reads/s', sub: 'targets met (supplied)', pattern: 'user', icon: 'sigma' },
        { id: 'stage0-c', label: 'Change nothing', sub: 'one app, one database', pattern: 'service', icon: 'circlecheck' },
        { id: 'stage0-f', label: 'Keep measuring', sub: 'watch utilisation', pattern: 'warn', icon: 'gauge' },
      ],
      edges: [
        { source: 'stage0-e', target: 'stage0-c', label: 'justifies' },
        { source: 'stage0-c', target: 'stage0-f', label: 'so' },
      ],
    },
    {
      id: 'stage1',
      label: 'Stage 1: database is hot',
      pattern: 'storage',
      flow: 'LR',
      children: [
        { id: 'stage1-e', label: 'DB CPU 85 % at peak', sub: 'supplied, hypothetical', pattern: 'user', icon: 'gauge' },
        { id: 'stage1-c', label: 'Add a cache', sub: 'assumed 80 % hit rate', pattern: 'service', icon: 'copy' },
        { id: 'stage1-f', label: 'DB reads ≈ 231 / s', sub: 'new risk: stale, cold start', pattern: 'warn', icon: 'bug' },
      ],
      edges: [
        { source: 'stage1-e', target: 'stage1-c', label: 'justifies' },
        { source: 'stage1-c', target: 'stage1-f', label: 'introduces' },
      ],
    },
    {
      id: 'stage2',
      label: 'Stage 2: app tier is hot',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'stage2-e', label: 'App CPU 90 %', sub: 'traffic is 4× larger (supplied)', pattern: 'user', icon: 'cpu' },
        { id: 'stage2-c', label: 'Add replicas', sub: 'behind the balancer', pattern: 'service', icon: 'server' },
        { id: 'stage2-f', label: 'Pool budget', sub: 'replicas × pool ≤ DB limit', pattern: 'warn', icon: 'bug' },
      ],
      edges: [
        { source: 'stage2-e', target: 'stage2-c', label: 'justifies' },
        { source: 'stage2-c', target: 'stage2-f', label: 'introduces' },
      ],
    },
    {
      id: 'stage3',
      label: 'Stage 3: writes outgrow one primary',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'stage3-e', label: 'Writes 4,000 / s', sub: 'primary handles ~1,500 (supplied)', pattern: 'user', icon: 'pencil' },
        { id: 'stage3-c', label: 'Partition by code', sub: 'hash into shards', pattern: 'service', icon: 'boxes' },
        { id: 'stage3-f', label: 'New failure modes', sub: 'hot shards, cross-shard queries', pattern: 'warn', icon: 'bug' },
      ],
      edges: [
        { source: 'stage3-e', target: 'stage3-c', label: 'justifies' },
        { source: 'stage3-c', target: 'stage3-f', label: 'introduces' },
      ],
    },
  ],
  edges: [],
}
