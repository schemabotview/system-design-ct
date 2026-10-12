import type { Scene } from '@graphlearning/flow'

// §1 — each user operation implies an access pattern, and the pattern decides which entity is read
// or written and by what key. Ids are written out literally so `npm run check` can see them.
export const accessPatterns: Scene = {
  id: 'access-patterns',
  title: 'From operations to entities',
  flow: 'TB',
  cols: 1,
  padding: 0.12,
  nodes: [
    {
      id: 'follow',
      label: 'Follow a link',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'follow-op', label: 'Visitor opens code', sub: 'every redirect', pattern: 'user', icon: 'users' },
        { id: 'follow-ap', label: 'By code', sub: 'exact match, 1 row', pattern: 'service', icon: 'key' },
        { id: 'follow-en', label: 'Link', sub: 'code to long URL', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'follow-op', target: 'follow-ap', label: 'implies' },
        { source: 'follow-ap', target: 'follow-en', label: 'touches' },
      ],
    },
    {
      id: 'create',
      label: 'Create a link',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'create-op', label: 'Owner submits URL', sub: 'about 1 per 100', pattern: 'user', icon: 'users' },
        { id: 'create-ap', label: 'Insert one row', sub: 'code must be unique', pattern: 'service', icon: 'key' },
        { id: 'create-en', label: 'Link', sub: 'plus its owner', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'create-op', target: 'create-ap', label: 'implies' },
        { source: 'create-ap', target: 'create-en', label: 'touches' },
      ],
    },
    {
      id: 'list',
      label: 'List my links',
      pattern: 'storage',
      flow: 'LR',
      children: [
        { id: 'list-op', label: 'Owner opens dashboard', sub: 'a page at a time', pattern: 'user', icon: 'users' },
        { id: 'list-ap', label: 'By owner', sub: 'newest first', pattern: 'service', icon: 'key' },
        { id: 'list-en', label: 'Link, Owner', sub: 'read together', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'list-op', target: 'list-ap', label: 'implies' },
        { source: 'list-ap', target: 'list-en', label: 'touches' },
      ],
    },
    {
      id: 'report',
      label: 'See click counts',
      pattern: 'external',
      flow: 'LR',
      children: [
        { id: 'report-op', label: 'Owner views a report', sub: 'per link, per day', pattern: 'user', icon: 'users' },
        { id: 'report-ap', label: 'Code and day', sub: 'a range, counted', pattern: 'service', icon: 'key' },
        { id: 'report-en', label: 'Click', sub: 'one row per event', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'report-op', target: 'report-ap', label: 'implies' },
        { source: 'report-ap', target: 'report-en', label: 'touches' },
      ],
    },
  ],
  edges: [],
}
