import type { Scene } from '@graphlearning/flow'

// §6 — one primary takes writes, replicas serve reads, and asynchronous replication means a replica
// can answer with older data. The 0.2-2 s lag range is ASSUMED.
export const readReplicas: Scene = {
  id: 'read-replicas',
  title: 'Read capacity, and the lag it brings',
  flow: 'TB',
  nodes: [
    { id: 'writes', label: 'Writes', sub: 'creates, edits', pattern: 'user', icon: 'pencil' },
    { id: 'primary', label: 'Primary', sub: 'the only writer', pattern: 'storage', icon: 'database' },
    {
      id: 'replicas',
      label: 'Read replicas',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'r1', label: 'Replica 1', sub: 'serves reads', pattern: 'network', icon: 'copy' },
        { id: 'r2', label: 'Replica 2', sub: 'serves reads', pattern: 'network', icon: 'copy' },
      ],
    },
    { id: 'reads', label: 'Reads', sub: 'redirects, listings', pattern: 'user', icon: 'search' },
    { id: 'lag', label: 'Lag: 0.2 to 2 s', sub: 'a new link may be a 404', pattern: 'warn', icon: 'clock' },
  ],
  edges: [
    { source: 'writes', target: 'primary' },
    { source: 'primary', target: 'replicas', label: 'async copy' },
    { source: 'replicas', target: 'reads', label: 'serve' },
    { source: 'primary', target: 'lag', label: 'trails behind', dashed: true },
  ],
}
