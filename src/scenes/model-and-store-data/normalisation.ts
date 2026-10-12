import type { Scene } from '@graphlearning/flow'

// §4 — the same listing data stored two ways: one fact once, versus a copy that makes reads cheaper
// and updates costlier.
export const normalisation: Scene = {
  id: 'normalisation',
  title: 'One fact once, or a copy on purpose',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'norm',
      label: 'Normalised',
      pattern: 'storage',
      flow: 'TB',
      children: [
        {
          id: 't-links',
          kind: 'table',
          label: 'links',
          columns: [
            { name: 'code', type: 'VARCHAR', key: 'PK' },
            { name: 'long_url', type: 'TEXT' },
            { name: 'owner_id', type: 'BIGINT', key: 'FK' },
          ],
        },
        {
          id: 't-owners',
          kind: 'table',
          label: 'owners',
          columns: [
            { name: 'owner_id', type: 'BIGINT', key: 'PK' },
            { name: 'display_name', type: 'TEXT' },
          ],
        },
        { id: 'one-row', label: 'Rename = one row', sub: 'one place to change', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 't-links', target: 't-owners', label: 'join on owner_id' },
        { source: 't-owners', target: 'one-row', label: 'benefit' },
      ],
    },
    {
      id: 'denorm',
      label: 'Denormalised',
      pattern: 'warn',
      flow: 'TB',
      children: [
        {
          id: 't-listing',
          kind: 'table',
          label: 'link_listing',
          columns: [
            { name: 'code', type: 'VARCHAR', key: 'PK' },
            { name: 'long_url', type: 'TEXT' },
            { name: 'owner_id', type: 'BIGINT' },
            { name: 'owner_name', type: 'TEXT' },
          ],
        },
        { id: 'rename', label: 'Rename = many rows', sub: 'every copy must change', pattern: 'warn', icon: 'pencil' },
      ],
      edges: [{ source: 't-listing', target: 'rename', label: 'cost' }],
    },
  ],
  edges: [],
}
