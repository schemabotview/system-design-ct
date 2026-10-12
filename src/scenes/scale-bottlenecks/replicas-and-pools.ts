import type { Scene } from '@graphlearning/flow'

// §2 — adding application replicas moves pressure to shared dependencies. Pool sizes and the
// database's connection limit are ASSUMED: 3 replicas × 20 = 60 of 100 allowed; 6 replicas would
// need 120.
export const replicasAndPools: Scene = {
  id: 'replicas-and-pools',
  title: 'More replicas, more pressure behind them',
  flow: 'TB',
  nodes: [
    { id: 'lb', label: 'Load balancer', sub: 'spreads requests', pattern: 'network', icon: 'router' },
    {
      id: 'apps',
      label: 'Application replicas',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'a1', label: 'Replica A', sub: 'pool of 20', pattern: 'service', icon: 'server' },
        { id: 'a2', label: 'Replica B', sub: 'pool of 20', pattern: 'service', icon: 'server' },
        { id: 'a3', label: 'Replica C', sub: 'pool of 20', pattern: 'service', icon: 'server' },
      ],
    },
    { id: 'sessions', label: 'Shared session store', sub: 'no per-replica state', pattern: 'network', icon: 'key' },
    { id: 'db', label: 'Database', sub: '60 of 100 connections', pattern: 'storage', icon: 'database' },
    { id: 'six', label: 'Six replicas?', sub: '120 wanted, 100 allowed', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'lb', target: 'apps', label: 'any replica' },
    { source: 'apps', target: 'sessions', label: 'who is this user?' },
    { source: 'apps', target: 'db', label: '3 × 20 = 60' },
    { source: 'db', target: 'six', label: 'limit', dashed: true },
  ],
}
