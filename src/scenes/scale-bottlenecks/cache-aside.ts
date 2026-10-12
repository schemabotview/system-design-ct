import type { Scene } from '@graphlearning/flow'

// §3 — the cache-aside read path. With an ASSUMED 80 % hit rate, 1,000 reads/s leaves 200 database
// reads/s; our chapter-1 peak of 1,157/s would leave about 231.
export const cacheAside: Scene = {
  id: 'cache-aside',
  title: 'Cache-aside: check, miss, fill',
  flow: 'TB',
  nodes: [
    { id: 'read', label: 'Redirect lookup', sub: 'GET /aZ3k9Q', pattern: 'user', icon: 'search' },
    { id: 'check', label: 'Check cache', sub: 'key is the code', pattern: 'network', icon: 'zap' },
    { id: 'hit', label: 'Hit: return', sub: '80 % of reads, assumed', pattern: 'storage', icon: 'circlecheck' },
    { id: 'miss', label: 'Miss: read database', sub: '20 % of reads', pattern: 'warn', icon: 'database' },
    { id: 'fill', label: 'Fill the cache', sub: 'with an expiry time', pattern: 'network', icon: 'copy' },
    { id: 'load', label: '1,000 reads/s in', sub: '200 reach the database', pattern: 'service', icon: 'gauge' },
  ],
  edges: [
    { source: 'read', target: 'check' },
    { source: 'check', target: 'hit', label: 'found' },
    { source: 'check', target: 'miss', label: 'not found', dashed: true },
    { source: 'miss', target: 'fill', label: 'then' },
    { source: 'hit', target: 'load', label: 'the model', dashed: true },
  ],
}
