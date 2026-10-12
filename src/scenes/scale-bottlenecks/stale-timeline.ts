import type { Scene } from '@graphlearning/flow'

// §4 — how a cached value becomes wrong, and the two controls on it. The 60-second TTL is ASSUMED.
export const staleTimeline: Scene = {
  id: 'stale-timeline',
  title: 'How a cached value goes stale',
  flow: 'TB',
  nodes: [
    { id: 's1', label: 'Cache and database agree', sub: 'both say URL A', pattern: 'storage', icon: 'circlecheck' },
    { id: 's2', label: 'Owner edits the link', sub: 'database now says URL B', pattern: 'user', icon: 'pencil' },
    { id: 's3', label: 'Visitor still gets A', sub: 'the cache is stale', pattern: 'warn', icon: 'ban' },
    { id: 'ttl', label: 'Expiry (TTL)', sub: 'entry dies after 60 s', pattern: 'network', icon: 'clock' },
    { id: 'inval', label: 'Invalidate on write', sub: 'delete the key at once', pattern: 'network', icon: 'trash' },
    { id: 's4', label: 'Next read misses', sub: 'loads B, fills the cache', pattern: 'storage', icon: 'repeat' },
  ],
  edges: [
    { source: 's1', target: 's2', label: 'update' },
    { source: 's2', target: 's3', label: 'reads continue' },
    { source: 's3', target: 'ttl', label: 'bounded by' },
    { source: 's3', target: 'inval', label: 'or fixed by' },
    { source: 'ttl', target: 's4' },
    { source: 'inval', target: 's4' },
  ],
}
