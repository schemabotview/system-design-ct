import type { Scene } from '@graphlearning/flow'

// §4 — CQRS and event sourcing are separate ideas. The top row shows each; the bottom row says when the
// extra machinery earns its place and when it is just cost.
export const cqrsEs: Scene = {
  id: 'cqrs-es',
  title: 'Two ideas that are often confused',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'cqrs',
      label: 'CQRS',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'c-cmd', label: 'Command side', sub: 'validate, change links', pattern: 'service', icon: 'pencil' },
        { id: 'c-write', label: 'Write model', sub: 'the links table', pattern: 'storage', icon: 'database' },
        { id: 'c-read', label: 'Read model', sub: 'a stats view for screens', pattern: 'network', icon: 'table' },
      ],
      edges: [
        { source: 'c-cmd', target: 'c-write' },
        { source: 'c-write', target: 'c-read', label: 'updates' },
      ],
    },
    {
      id: 'es',
      label: 'Event sourcing',
      pattern: 'network',
      flow: 'TB',
      children: [
        { id: 'e-cmd', label: 'Command', sub: 'decides what happened', pattern: 'service', icon: 'pencil' },
        { id: 'e-log', label: 'Event log', sub: 'append-only, the truth', pattern: 'storage', icon: 'scroll' },
        { id: 'e-state', label: 'Current state', sub: 'derived by replaying', pattern: 'network', icon: 'repeat' },
      ],
      edges: [
        { source: 'e-cmd', target: 'e-log' },
        { source: 'e-log', target: 'e-state', label: 'replay' },
      ],
    },
    {
      id: 'earns',
      label: 'Earns its place when',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'w-shape', label: 'Read and write differ', sub: 'in shape or load', pattern: 'storage', icon: 'circlecheck' },
        { id: 'w-audit', label: 'History is a requirement', sub: 'audit, rebuildable views', pattern: 'storage', icon: 'history' },
      ],
    },
    {
      id: 'cost',
      label: 'Is only cost when',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'x-crud', label: 'Plain create and read', sub: 'one table does it', pattern: 'warn', icon: 'ban' },
        { id: 'x-forever', label: 'Old event shapes stay', sub: 'forever, in the log', pattern: 'warn', icon: 'calendar' },
      ],
    },
  ],
  edges: [],
}
