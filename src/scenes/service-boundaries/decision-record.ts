import type { Scene } from '@graphlearning/flow'

// §6 — a decision record in which retaining the monolith is the justified answer. Workload numbers are
// those assumed in chapter 1.
export const decisionRecord: Scene = {
  id: 'decision-record',
  title: 'Keep, or extract?',
  flow: 'TB',
  nodes: [
    {
      id: 'adr',
      kind: 'code',
      filename: 'decision-record.txt',
      label: `Question: should analytics become
          its own service?
Context:  one team; 231 req/s average,
          1,157 at peak (assumed);
          clicks already asynchronous
Options:  A  extract an analytics service
          B  stay in the modular monolith
Decision: B
Because:  extraction adds network failures,
          contract versions and on-call load
          with no measured benefit
Revisit:  own scale, owner or release cadence`,
    },
    {
      id: 'costs',
      label: 'What extraction would cost',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'k-net', label: 'Network failures', sub: 'slow, lossy calls', pattern: 'warn', icon: 'network' },
        { id: 'k-ops', label: 'Operations', sub: 'deploy, monitor, on-call', pattern: 'warn', icon: 'wrench' },
        { id: 'k-data', label: 'Split data', sub: 'no shared transaction', pattern: 'warn', icon: 'merge' },
      ],
    },
    {
      id: 'triggers',
      label: 'Triggers to revisit',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'r-scale', label: 'Different scale', sub: 'needs its own capacity', pattern: 'storage', icon: 'gauge' },
        { id: 'r-owner', label: 'Different owner', sub: 'a second team', pattern: 'storage', icon: 'users' },
        { id: 'r-cadence', label: 'Different cadence', sub: 'ships on its own', pattern: 'storage', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'adr', target: 'costs', label: 'why not A' },
    { source: 'adr', target: 'triggers', label: 'when to reconsider' },
  ],
}
