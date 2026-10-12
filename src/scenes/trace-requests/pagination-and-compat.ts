import type { Scene } from '@graphlearning/flow'

// §3 — a cursor-paginated listing, and the line between changes that keep old clients working and
// changes that need a new version. The cursor is the base64 of {"id":102} — opaque to clients.
export const paginationAndCompat: Scene = {
  id: 'pagination-and-compat',
  title: 'Cursors and compatible change',
  flow: 'TB',
  nodes: [
    {
      id: 'page',
      kind: 'code',
      filename: 'list-links.http',
      label: `GET /links?limit=2
→ 200 { "items": [ { "code": "aZ3k9Q" }, { "code": "bY7m2P" } ],
        "next_cursor": "eyJpZCI6MTAyfQ" }

GET /links?limit=2&cursor=eyJpZCI6MTAyfQ
→ 200 { "items": [ … ], "next_cursor": null }`,
    },
    {
      id: 'safe',
      label: 'Compatible change',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'opt', label: 'Add optional field', sub: 'old clients ignore it', pattern: 'storage', icon: 'circlecheck' },
        { id: 'endpoint', label: 'Add an endpoint', sub: 'nothing existing moves', pattern: 'storage', icon: 'circlecheck' },
        { id: 'loosen', label: 'Accept more input', sub: 'old requests still pass', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'breaking',
      label: 'Breaking change',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'remove', label: 'Remove a field', sub: 'clients may read it', pattern: 'warn', icon: 'ban' },
        { id: 'retype', label: 'Change a type', sub: 'string to number', pattern: 'warn', icon: 'ban' },
        { id: 'require', label: 'Require new input', sub: 'old requests now fail', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'page', target: 'safe', label: 'v1 keeps working' },
    { source: 'page', target: 'breaking', label: 'needs /v2' },
  ],
}
