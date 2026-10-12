import type { Scene } from '@graphlearning/flow'

// §4 — what crosses the trust boundary is untrusted. Three threats specific to a link service, and the
// controls aimed at each.
export const threats: Scene = {
  id: 'threats',
  title: 'What crosses the boundary',
  flow: 'TB',
  nodes: [
    { id: 'net', label: 'Anyone on the internet', sub: 'untrusted input', pattern: 'external', icon: 'globe' },
    {
      id: 'attacks',
      label: 'What can go wrong',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'a-spam', label: 'Spam and phishing', sub: 'links made in bulk', pattern: 'warn', icon: 'bug' },
        { id: 'a-enum', label: 'Guessing codes', sub: 'enumeration', pattern: 'warn', icon: 'search' },
        { id: 'a-mal', label: 'Malicious targets', sub: 'redirect to malware', pattern: 'warn', icon: 'skull' },
      ],
    },
    {
      id: 'boundary',
      label: 'Our trust boundary: controls',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'c-rate', label: 'Rate limits', sub: 'per owner, per key', pattern: 'storage', icon: 'gauge' },
        { id: 'c-code', label: 'Unguessable codes', sub: 'no secrets in them', pattern: 'storage', icon: 'key' },
        { id: 'c-block', label: 'Validate and block', sub: 'schemes, blocklists', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'net', target: 'attacks', label: 'tries' },
    { source: 'attacks', target: 'boundary', label: 'met by' },
  ],
}
