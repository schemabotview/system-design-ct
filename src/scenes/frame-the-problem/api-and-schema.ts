import type { Scene } from '@graphlearning/flow'

// §6 — the whole initial design on one board: the interface (code card), the one component that
// implements it, and the one table it persists to. Status codes are a first pass; chapter 2 revisits
// which redirect code to send and what each error should carry.
export const apiAndSchema: Scene = {
  id: 'api-and-schema',
  title: 'The first design, end to end',
  flow: 'TB',
  nodes: [
    {
      id: 'api',
      kind: 'code',
      filename: 'api-sketch.http',
      label: `POST /links
{ "url": "https://example.com/a/very/long/path" }
→ 201  { "code": "aZ3k9Q", "short_url": "https://sho.example/aZ3k9Q" }
→ 422  { "error": "invalid_url" }

GET /aZ3k9Q
→ 302  Location: https://example.com/a/very/long/path
→ 404  (no such code)`,
    },
    { id: 'app', label: 'Application', sub: 'validate, generate, look up', pattern: 'service', icon: 'server' },
    {
      id: 'links',
      kind: 'table',
      label: 'links',
      columns: [
        { name: 'code', type: 'VARCHAR(10)', key: 'PK' },
        { name: 'long_url', type: 'TEXT' },
        { name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
  ],
  edges: [
    { source: 'api', target: 'app', label: 'implemented by' },
    { source: 'app', target: 'links', label: 'INSERT / SELECT' },
  ],
}
