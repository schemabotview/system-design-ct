import type { Scene } from '@graphlearning/flow'

// §8 — what sits between the visitor and the application. The edge cache answers repeats itself;
// only misses reach the load balancer, which spreads them across replicas and stops sending to one
// that fails its health check.
export const edgePath: Scene = {
  id: 'edge-path',
  title: 'The layers in front of the app',
  flow: 'TB',
  nodes: [
    { id: 'visitor', label: 'Visitor', sub: 'GET /aZ3k9Q', pattern: 'user', icon: 'users' },
    { id: 'edge', label: 'Edge cache', sub: 'answers repeats', pattern: 'network', icon: 'cloud' },
    { id: 'lb', label: 'Load balancer', sub: 'spreads, checks health', pattern: 'network', icon: 'router' },
    {
      id: 'replicas',
      label: 'Application replicas',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'app1', label: 'Replica A', sub: 'healthy', pattern: 'service', icon: 'server' },
        { id: 'app2', label: 'Replica B', sub: 'failing its check', pattern: 'warn', icon: 'server' },
      ],
    },
    { id: 'db', label: 'Database', sub: 'code to long URL', pattern: 'storage', icon: 'database' },
  ],
  edges: [
    { source: 'visitor', target: 'edge', label: 'request' },
    { source: 'edge', target: 'lb', label: 'cache miss only' },
    { source: 'lb', target: 'replicas', label: 'skips unhealthy' },
    { source: 'replicas', target: 'db', label: 'lookup' },
  ],
}
