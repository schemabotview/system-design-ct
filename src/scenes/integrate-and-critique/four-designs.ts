import type { Scene } from '@graphlearning/flow'

// §3 — four systems with four different dominant concerns. All estimates are ASSUMED:
// chat 10 M users × 40 msgs = 400 M/day ≈ 4,630/s; feed 20 M users × 10 loads = 200 M/day ≈ 2,315/s;
// files 1 M uploads × 5 MB = 5 TB/day (≈ 58 MB/s, ≈ 1.8 PB/year); payments 100,000/day ≈ 1.2/s.
export const fourDesigns: Scene = {
  id: 'four-designs',
  title: 'Four systems, four different answers',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'chat',
      label: 'Chat',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'ch-need', label: 'Needs: delivery fast', sub: 'order within a chat', pattern: 'network', icon: 'zap' },
        { id: 'ch-bott', label: 'Bottleneck', sub: 'open connections, fan-out', pattern: 'warn', icon: 'gauge' },
        { id: 'ch-dec', label: 'Persistent connections', sub: 'key by conversation', pattern: 'storage', icon: 'link' },
      ],
    },
    {
      id: 'feed',
      label: 'News feed',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'fe-need', label: 'Needs: fast reads', sub: 'a personal list', pattern: 'service', icon: 'scroll' },
        { id: 'fe-bott', label: 'Bottleneck', sub: 'read and write fan-out', pattern: 'warn', icon: 'gauge' },
        { id: 'fe-dec', label: 'Hybrid fan-out', sub: 'write for most, read for stars', pattern: 'storage', icon: 'share' },
      ],
    },
    {
      id: 'files',
      label: 'File storage',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'fi-need', label: 'Needs: durability', sub: 'big objects, resumable', pattern: 'storage', icon: 'harddrive' },
        { id: 'fi-bott', label: 'Bottleneck', sub: 'bandwidth and cost', pattern: 'warn', icon: 'gauge' },
        { id: 'fi-dec', label: 'Object store', sub: 'metadata in a database', pattern: 'storage', icon: 'folder' },
      ],
    },
    {
      id: 'pay',
      label: 'Payments',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'pa-need', label: 'Needs: correctness', sub: 'never charge twice', pattern: 'external', icon: 'receipt' },
        { id: 'pa-bott', label: 'Bottleneck', sub: 'not speed: errors cost', pattern: 'warn', icon: 'scale' },
        { id: 'pa-dec', label: 'Ledger, idempotency', sub: 'reconcile, fail closed', pattern: 'storage', icon: 'lock' },
      ],
    },
  ],
  edges: [],
}
