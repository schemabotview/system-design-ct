import type { Scene } from '@graphlearning/flow'

// §6 — four storage models, each with the access pattern that favours it and the price it carries.
// These are TYPICAL tendencies; individual products differ.
export const storeModels: Scene = {
  id: 'store-models',
  title: 'Four models, one trade-off each',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'relational',
      label: 'Relational',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'rel-fit', label: 'Rules and joins', sub: 'constraints, transactions', pattern: 'storage', icon: 'circlecheck' },
        { id: 'rel-cost', label: 'Write scaling', sub: 'sharding is manual work', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'kv',
      label: 'Key-value',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'kv-fit', label: 'Lookup by key', sub: 'code to long URL', pattern: 'storage', icon: 'circlecheck' },
        { id: 'kv-cost', label: 'Little querying', sub: 'few joins or ranges', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'doc',
      label: 'Document',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'doc-fit', label: 'Nested records', sub: 'read and write as one', pattern: 'storage', icon: 'circlecheck' },
        { id: 'doc-cost', label: 'Cross-record rules', sub: 'often weaker guarantees', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'wide',
      label: 'Wide-column',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'wide-fit', label: 'Heavy writes', sub: 'events grouped by key', pattern: 'storage', icon: 'circlecheck' },
        { id: 'wide-cost', label: 'Query by key only', sub: 'design per question', pattern: 'warn', icon: 'circleslash' },
      ],
    },
  ],
  edges: [],
}
