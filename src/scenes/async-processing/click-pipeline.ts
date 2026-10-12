import type { Scene } from '@graphlearning/flow'

// §9 — the click-analytics pipeline end to end. The redirect never waits for analytics; the broker
// decouples them, and every failure point has a stated behaviour.
export const clickPipeline: Scene = {
  id: 'click-pipeline',
  title: 'Click analytics, end to end',
  flow: 'TB',
  nodes: [
    {
      id: 'event',
      kind: 'code',
      filename: 'click-event.json',
      label: `{ "event_id": "e7c1f2a9-3b4d-4c1e-9a10-5d2f8b6c0a77",
  "code": "aZ3k9Q",
  "ts": "2026-10-12T09:15:02Z",
  "referrer": "example.com" }`,
    },
    { id: 'redirect', label: 'Redirect service', sub: 'writes event with outbox', pattern: 'service', icon: 'server' },
    { id: 'broker', label: 'Topic clicks', sub: '3 partitions, key = code', pattern: 'storage', icon: 'scroll' },
    {
      id: 'groups',
      label: 'Consumer groups',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'g-roll', label: 'Rollup', sub: 'daily counts per code', pattern: 'service', icon: 'barchart' },
        { id: 'g-note', label: 'Notifications', sub: 'milestone emails', pattern: 'service', icon: 'bell' },
      ],
    },
    { id: 'dlq', label: 'Dead-letter queue', sub: 'after 5 failed tries', pattern: 'warn', icon: 'folder' },
  ],
  edges: [
    { source: 'event', target: 'redirect', label: 'produced by' },
    { source: 'redirect', target: 'broker', label: 'publish' },
    { source: 'broker', target: 'groups', label: 'each gets a copy' },
    { source: 'groups', target: 'dlq', label: 'poison', dashed: true },
  ],
}
