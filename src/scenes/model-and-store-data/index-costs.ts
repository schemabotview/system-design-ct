import type { Scene } from '@graphlearning/flow'

// §5 — each access pattern earns at most one index, and each index is paid for on every write.
export const indexCosts: Scene = {
  id: 'index-costs',
  title: 'An index per access pattern',
  flow: 'TB',
  nodes: [
    {
      id: 'ddl',
      kind: 'code',
      filename: 'indexes.sql',
      label: `-- the primary key already indexes code
CREATE INDEX links_by_owner ON links (owner_id, created_at DESC);
CREATE INDEX clicks_by_code_day ON clicks (code, clicked_at);

SELECT code, long_url FROM links
 WHERE owner_id = 42 ORDER BY created_at DESC LIMIT 20;`,
    },
    {
      id: 'map',
      kind: 'table',
      label: 'Access pattern, index, and price',
      headers: ['Pattern', 'Index', 'Write cost'],
      values: [
        ['By code', 'primary key', 'none extra'],
        ['By owner', 'owner, created', '1 per create'],
        ['Clicks by day', 'code, clicked', '1 per click'],
      ],
    },
  ],
  edges: [{ source: 'ddl', target: 'map', label: 'each one paid for' }],
}
