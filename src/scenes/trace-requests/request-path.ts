import type { Scene } from '@graphlearning/flow'

// §1 — one request's journey, cold versus warm. Timings are HYPOTHETICAL and chosen to add up:
// cold = 20 (DNS) + 30 (TCP) + 30 (TLS 1.3) + 30 + 10 (HTTP trip + server work) = 120 ms;
// warm = 30 + 10 = 40 ms, because the name and both handshakes are already done.
export const requestPath: Scene = {
  id: 'request-path',
  title: 'Cold request versus warm request',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'cold',
      label: 'First request (cold)',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'dns', label: 'Resolve name', sub: 'DNS, about 20 ms', pattern: 'network', icon: 'search' },
        { id: 'tcp', label: 'Open TCP', sub: '1 round trip, 30 ms', pattern: 'network', icon: 'plug' },
        { id: 'tls', label: 'TLS handshake', sub: '1 round trip, 30 ms', pattern: 'network', icon: 'lock' },
        { id: 'http', label: 'HTTP request', sub: '30 ms trip, 10 ms work', pattern: 'service', icon: 'server' },
        { id: 'cold-total', label: 'Total ≈ 120 ms', sub: 'summed, assumed timings', pattern: 'warn', icon: 'clock' },
      ],
      edges: [
        { source: 'dns', target: 'tcp', label: 'IP address' },
        { source: 'tcp', target: 'tls', label: 'connected' },
        { source: 'tls', target: 'http', label: 'encrypted' },
        { source: 'http', target: 'cold-total' },
      ],
    },
    {
      id: 'warm',
      label: 'Next request (warm)',
      pattern: 'storage',
      flow: 'TB',
      children: [
        { id: 'reuse', label: 'Reuse connection', sub: 'name and handshakes done', pattern: 'storage', icon: 'repeat' },
        { id: 'http2', label: 'HTTP request', sub: '30 ms trip, 10 ms work', pattern: 'service', icon: 'server' },
        { id: 'warm-total', label: 'Total ≈ 40 ms', sub: 'three steps skipped', pattern: 'storage', icon: 'clock' },
      ],
      edges: [
        { source: 'reuse', target: 'http2', label: 'send now' },
        { source: 'http2', target: 'warm-total' },
      ],
    },
  ],
  edges: [],
}
