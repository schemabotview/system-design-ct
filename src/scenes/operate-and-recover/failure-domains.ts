import type { Scene } from '@graphlearning/flow'

// §9 — failure domains from small to large, and the recovery choice that survives each. Recovery times
// are ASSUMED orders of magnitude, not measurements.
export const failureDomains: Scene = {
  id: 'failure-domains',
  title: 'What fails together, and what survives it',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'domains',
      label: 'Failure domains',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'f-proc', label: 'Process', sub: 'restart it', pattern: 'service', icon: 'terminal' },
        { id: 'f-mach', label: 'Machine or rack', sub: 'replace it', pattern: 'service', icon: 'server' },
        { id: 'f-zone', label: 'Zone', sub: 'a data-centre building', pattern: 'network', icon: 'building' },
        { id: 'f-region', label: 'Region', sub: 'a whole geography', pattern: 'warn', icon: 'globe' },
      ],
      edges: [
        { source: 'f-proc', target: 'f-mach', label: 'larger' },
        { source: 'f-mach', target: 'f-zone', label: 'larger' },
        { source: 'f-zone', target: 'f-region', label: 'larger' },
      ],
    },
    {
      id: 'choices',
      label: 'Recovery choices',
      pattern: 'storage',
      flow: 'TB',
      children: [
        { id: 'r-zone', label: 'Multi-zone', sub: 'survives a zone, minutes', pattern: 'storage', icon: 'copy' },
        { id: 'r-warm', label: 'Warm standby region', sub: 'survives a region, ~1 h', pattern: 'network', icon: 'cloud' },
        { id: 'r-active', label: 'Active-active', sub: 'near-zero, hardest to keep right', pattern: 'warn', icon: 'merge' },
      ],
      edges: [
        { source: 'r-zone', target: 'r-warm', label: 'more cost' },
        { source: 'r-warm', target: 'r-active', label: 'more cost' },
      ],
    },
  ],
  edges: [],
}
