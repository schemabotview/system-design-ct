import type { Scene } from '@graphlearning/flow'

// §1 — the system boundary. The container is what we build and operate; everything outside it is a
// dependency we do not control. The dashed edge is the point: the service redirects the visitor,
// but the destination site is reached by the visitor's browser, not by us.
export const contextDiagram: Scene = {
  id: 'context-diagram',
  title: 'Inside and outside the boundary',
  flow: 'LR',
  nodes: [
    { id: 'owner', label: 'Link owner', sub: 'creates short links', pattern: 'user', icon: 'usercheck' },
    { id: 'visitor', label: 'Visitor', sub: 'follows a short link', pattern: 'user', icon: 'users' },
    {
      id: 'service',
      label: 'Short-link service',
      sub: 'the boundary we own',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'app', label: 'Application', sub: 'API and redirect logic', pattern: 'service', icon: 'server' },
        { id: 'db', label: 'Database', sub: 'codes and long URLs', pattern: 'storage', icon: 'database' },
      ],
      edges: [{ source: 'app', target: 'db', label: 'reads, writes' }],
    },
    { id: 'dest', label: 'Destination site', sub: 'owns the long URL', pattern: 'external', icon: 'globe' },
  ],
  edges: [
    { source: 'owner', target: 'service', label: 'create link' },
    { source: 'visitor', target: 'service', label: 'open code' },
    { source: 'visitor', target: 'dest', label: 'follows redirect', dashed: true },
  ],
}
