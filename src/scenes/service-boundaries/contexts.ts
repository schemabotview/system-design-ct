import type { Scene } from '@graphlearning/flow'

// §1 — three bounded contexts, each a cohesive set of responsibilities, and the tests used to decide
// where a boundary belongs. "Link" means a short code in one context and a counting label in another.
export const contexts: Scene = {
  id: 'contexts',
  title: 'Boundaries follow responsibilities',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'links',
      label: 'Links context',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'l-create', label: 'Create a link', sub: 'validate, mint a code', pattern: 'service', icon: 'pencil' },
        { id: 'l-resolve', label: 'Resolve a code', sub: 'the redirect lookup', pattern: 'service', icon: 'search' },
        { id: 'l-table', label: 'Owns the links data', sub: 'code to long URL', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics context',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'a-ingest', label: 'Ingest clicks', sub: 'from the event stream', pattern: 'network', icon: 'waves' },
        { id: 'a-roll', label: 'Roll up counts', sub: 'per code and day', pattern: 'network', icon: 'sigma' },
        { id: 'a-data', label: 'Owns click history', sub: 'events and rollups', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'accounts',
      label: 'Accounts context',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'o-owners', label: 'Owners', sub: 'who may create links', pattern: 'user', icon: 'usercheck' },
        { id: 'o-keys', label: 'API keys', sub: 'who is calling', pattern: 'user', icon: 'key' },
        { id: 'o-limits', label: 'Quotas', sub: '100 creates an hour', pattern: 'user', icon: 'gauge' },
      ],
    },
    {
      id: 'test',
      label: 'Is this a good boundary?',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 't-change', label: 'Change together?', sub: 'high cohesion inside', pattern: 'warn', icon: 'merge' },
        { id: 't-own', label: 'One owner?', sub: 'a single team decides', pattern: 'warn', icon: 'users' },
        { id: 't-fail', label: 'Fail alone?', sub: 'small blast radius', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [],
}
