import type { Scene } from '@graphlearning/flow'

// §1 — the whole course as a repeatable method: understand, shape, stress, decide. Each design in this
// chapter is worked in this order.
export const designMethod: Scene = {
  id: 'design-method',
  title: 'A repeatable design method',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'understand',
      label: '1 · Understand',
      pattern: 'user',
      cols: 1,
      children: [
        { id: 'u-req', label: 'Requirements', sub: 'functional and quality', pattern: 'user', icon: 'scroll' },
        { id: 'u-est', label: 'Estimates', sub: 'traffic, data, peak', pattern: 'user', icon: 'sigma' },
      ],
    },
    {
      id: 'shape',
      label: '2 · Shape',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 's-api', label: 'API and data', sub: 'operations, records', pattern: 'service', icon: 'braces' },
        { id: 's-arch', label: 'Architecture', sub: 'simplest that fits', pattern: 'service', icon: 'boxes' },
      ],
    },
    {
      id: 'stress',
      label: '3 · Stress',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'x-bottle', label: 'Dominant bottleneck', sub: 'what saturates first', pattern: 'warn', icon: 'gauge' },
        { id: 'x-fail', label: 'Failure behaviour', sub: 'what breaks, how', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'decide',
      label: '4 · Decide',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'd-alt', label: 'Alternatives and cost', sub: 'why not the others', pattern: 'storage', icon: 'scale' },
        { id: 'd-rec', label: 'Decision record', sub: 'and when to revisit', pattern: 'storage', icon: 'receipt' },
      ],
    },
  ],
  edges: [],
}
