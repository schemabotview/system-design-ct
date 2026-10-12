import type { Scene } from '@graphlearning/flow'

// §2 — one error shape, four classes of outcome. The body follows the RFC 9457 "problem details"
// members (type, title, status, detail); `field` is an extension member this API adds.
export const errorContract: Scene = {
  id: 'error-contract',
  title: 'One error shape, four outcomes',
  flow: 'TB',
  nodes: [
    {
      id: 'problem',
      kind: 'code',
      filename: 'error-response.http',
      label: `POST /links
{ "url": "ftp://example.com/file" }

→ 422 Unprocessable Content
{ "type": "https://sho.example/errors/invalid-url",
  "title": "URL scheme not allowed",
  "status": 422,
  "detail": "Only http and https are accepted.",
  "field": "url" }`,
    },
    {
      id: 'classes',
      label: 'What the client does next',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'invalid', label: 'Invalid input', sub: '422: fix the request', pattern: 'warn', icon: 'ban' },
        { id: 'unknown', label: 'Unknown code', sub: '404: nothing here', pattern: 'external', icon: 'search' },
        { id: 'slow', label: 'Too many requests', sub: '429: wait, then retry', pattern: 'network', icon: 'gauge' },
        { id: 'ours', label: 'Our failure', sub: '5xx: retry with care', pattern: 'service', icon: 'bug' },
      ],
    },
  ],
  edges: [{ source: 'problem', target: 'classes', label: 'status decides' }],
}
