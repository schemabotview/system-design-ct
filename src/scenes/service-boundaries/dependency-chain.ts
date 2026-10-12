import type { Scene } from '@graphlearning/flow'

// §3 — a published, versioned event contract owned by one service, and a synchronous chain whose
// availability multiplies. ASSUMED: each service is 99.9 % available; 0.999^4 = 0.996006 ≈ 99.6 %,
// below chapter 1's 99.9 % target.
export const dependencyChain: Scene = {
  id: 'dependency-chain',
  title: 'A contract, and a chain that multiplies',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      kind: 'code',
      filename: 'LinkCreated.v1.json',
      label: `# owned by the Links service; consumers depend on this, not on its tables
{ "event": "LinkCreated", "version": 1,
  "code": "aZ3k9Q", "owner_id": 42, "created_at": "2026-10-12T09:15:02Z" }
# within v1: add optional fields only. A breaking change ships as v2 beside v1.`,
    },
    {
      id: 'chain',
      label: 'One redirect, four synchronous calls',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'ch-api', label: 'Redirect API', sub: '99.9 % available', pattern: 'service', icon: 'server' },
        { id: 'ch-links', label: 'Links service', sub: '99.9 % available', pattern: 'service', icon: 'server' },
        { id: 'ch-acc', label: 'Accounts service', sub: '99.9 % available', pattern: 'service', icon: 'server' },
        { id: 'ch-quota', label: 'Quota service', sub: '99.9 % available', pattern: 'service', icon: 'server' },
      ],
    },
    { id: 'result', label: '0.999⁴ ≈ 99.6 %', sub: 'below the 99.9 % target', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'contract', target: 'chain', label: 'decouples consumers' },
    { source: 'chain', target: 'result', label: 'all must answer' },
  ],
}
