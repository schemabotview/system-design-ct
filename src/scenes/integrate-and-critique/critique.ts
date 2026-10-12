import type { Scene } from '@graphlearning/flow'

// §5 — a critique of the §4 design: each finding becomes a revision, and what the revision cannot fully
// fix is stated rather than hidden. All details are ASSUMED for the exercise. Ids are literal so
// `npm run check` can see them.
export const critique: Scene = {
  id: 'critique',
  title: 'Finding, revision, what remains',
  flow: 'TB',
  cols: 1,
  padding: 0.1,
  nodes: [
    {
      id: 'b1',
      label: 'No malware scanning',
      pattern: 'warn',
      flow: 'LR',
      children: [
        { id: 'b1-f', label: 'Finding', sub: 'files are stored unchecked', pattern: 'warn', icon: 'bug' },
        { id: 'b1-r', label: 'Revision', sub: 'scan after upload, before sharing', pattern: 'storage', icon: 'circlecheck' },
        { id: 'b1-u', label: 'Unresolved', sub: 'scan latency delays sharing', pattern: 'external', icon: 'clock' },
      ],
      edges: [
        { source: 'b1-f', target: 'b1-r', label: 'revised by' },
        { source: 'b1-r', target: 'b1-u', label: 'leaves' },
      ],
    },
    {
      id: 'b2',
      label: 'Deletion and retention',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'b2-f', label: 'Finding', sub: 'no way to erase a file everywhere', pattern: 'warn', icon: 'trash' },
        { id: 'b2-r', label: 'Revision', sub: 'delete row, blob and CDN copy', pattern: 'storage', icon: 'circlecheck' },
        { id: 'b2-u', label: 'Unresolved', sub: 'backups still hold it for 35 days', pattern: 'external', icon: 'calendar' },
      ],
      edges: [
        { source: 'b2-f', target: 'b2-r', label: 'revised by' },
        { source: 'b2-r', target: 'b2-u', label: 'leaves' },
      ],
    },
    {
      id: 'b3',
      label: 'One region only',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'b3-f', label: 'Finding', sub: 'a region outage stops everything', pattern: 'warn', icon: 'globe' },
        { id: 'b3-r', label: 'Revision', sub: 'replicate blobs to a second region', pattern: 'storage', icon: 'copy' },
        { id: 'b3-u', label: 'Unresolved', sub: 'metadata failover is still manual', pattern: 'external', icon: 'wrench' },
      ],
      edges: [
        { source: 'b3-f', target: 'b3-r', label: 'revised by' },
        { source: 'b3-r', target: 'b3-u', label: 'leaves' },
      ],
    },
    {
      id: 'b4',
      label: 'Egress cost unbounded',
      pattern: 'external',
      flow: 'LR',
      children: [
        { id: 'b4-f', label: 'Finding', sub: 'a viral file bills us heavily', pattern: 'warn', icon: 'receipt' },
        { id: 'b4-r', label: 'Revision', sub: 'CDN caching and per-file limits', pattern: 'storage', icon: 'gauge' },
        { id: 'b4-u', label: 'Unresolved', sub: 'limits annoy legitimate users', pattern: 'external', icon: 'users' },
      ],
      edges: [
        { source: 'b4-f', target: 'b4-r', label: 'revised by' },
        { source: 'b4-r', target: 'b4-u', label: 'leaves' },
      ],
    },
  ],
  edges: [],
}
