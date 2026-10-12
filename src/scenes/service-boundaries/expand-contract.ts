import type { Scene } from '@graphlearning/flow'

// §5 — expand and contract: at every step both the old and the new version of the code can run
// against the data, so a rolling deploy or a rollback never meets an incompatible schema.
export const expandContract: Scene = {
  id: 'expand-contract',
  title: 'Expand, migrate, contract',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'p1',
      label: '1 · Expand',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'p1-add', label: 'Add the new column', sub: 'nullable, unused', pattern: 'storage', icon: 'table' },
        { id: 'p1-old', label: 'Old code still works', sub: 'it ignores the column', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'p2',
      label: '2 · Dual write',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'p2-both', label: 'Write old and new', sub: 'new code, both fields', pattern: 'network', icon: 'copy' },
        { id: 'p2-fill', label: 'Backfill old rows', sub: 'in small batches', pattern: 'network', icon: 'repeat' },
      ],
    },
    {
      id: 'p3',
      label: '3 · Switch reads',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'p3-read', label: 'Read the new field', sub: 'verify it matches', pattern: 'service', icon: 'search' },
        { id: 'p3-back', label: 'Rollback is easy', sub: 'old field is still there', pattern: 'service', icon: 'history' },
      ],
    },
    {
      id: 'p4',
      label: '4 · Contract',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'p4-stop', label: 'Stop writing the old', sub: 'nothing reads it now', pattern: 'warn', icon: 'ban' },
        { id: 'p4-drop', label: 'Drop the old column', sub: 'only after a quiet period', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [],
}
