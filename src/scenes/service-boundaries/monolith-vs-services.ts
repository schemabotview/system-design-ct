import type { Scene } from '@graphlearning/flow'

// §2 — the same subsystem drawn twice. In the modular monolith a call between modules is a function call
// inside one process; as separate services it is a network call that can be slow or fail.
export const monolithVsServices: Scene = {
  id: 'monolith-vs-services',
  title: 'One subsystem, two shapes',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'mono',
      label: 'Modular monolith',
      pattern: 'storage',
      flow: 'TB',
      children: [
        { id: 'm-links', label: 'Links module', sub: 'public interface only', pattern: 'service', icon: 'link' },
        { id: 'm-an', label: 'Analytics module', sub: 'public interface only', pattern: 'service', icon: 'barchart' },
        { id: 'm-deploy', label: 'One deployable', sub: 'one release, one process', pattern: 'storage', icon: 'box' },
        { id: 'm-db', label: 'One database', sub: 'a schema per module', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'm-links', target: 'm-an', label: 'function call' },
        { source: 'm-an', target: 'm-deploy' },
        { source: 'm-deploy', target: 'm-db' },
      ],
    },
    {
      id: 'svc',
      label: 'Independent services',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 's-links', label: 'Links service', sub: 'own release and scaling', pattern: 'service', icon: 'server' },
        { id: 's-an', label: 'Analytics service', sub: 'own release and scaling', pattern: 'service', icon: 'server' },
        { id: 's-net', label: 'A network between', sub: 'slow, lossy, versioned', pattern: 'warn', icon: 'network' },
        { id: 's-db', label: 'A database each', sub: 'no shared tables', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 's-links', target: 's-an', label: 'network call' },
        { source: 's-an', target: 's-net' },
        { source: 's-net', target: 's-db' },
      ],
    },
  ],
  edges: [],
}
