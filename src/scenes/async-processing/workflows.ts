import type { Scene } from '@graphlearning/flow'

// §8 — coordinating several services without one big transaction. Compensation is a NEW forward action
// (refund, release), not an atomic rollback: the charge was real and may have been seen by the customer.
export const workflows: Scene = {
  id: 'workflows',
  title: 'Coordinate, then compensate',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'machine',
      label: 'State machine',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'm-created', label: 'Created', sub: 'order accepted', pattern: 'storage', icon: 'pencil' },
        { id: 'm-paid', label: 'Paid', sub: 'card charged', pattern: 'storage', icon: 'receipt' },
        { id: 'm-ship', label: 'Shipped or failed', sub: 'only listed moves allowed', pattern: 'storage', icon: 'package' },
      ],
    },
    {
      id: 'orch',
      label: 'Orchestration',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'o-boss', label: 'One coordinator', sub: 'tells each service', pattern: 'service', icon: 'workflow' },
        { id: 'o-view', label: 'Whole flow in one place', sub: 'easy to follow', pattern: 'storage', icon: 'circlecheck' },
        { id: 'o-risk', label: 'Central dependency', sub: 'must stay available', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'choreo',
      label: 'Choreography',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'c-react', label: 'Services react', sub: 'to other services events', pattern: 'network', icon: 'share' },
        { id: 'c-loose', label: 'Loose coupling', sub: 'no central owner', pattern: 'storage', icon: 'circlecheck' },
        { id: 'c-hard', label: 'Flow is implicit', sub: 'hard to see or debug', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'comp',
      label: 'Compensation',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'k-fail', label: 'Shipping fails', sub: 'after payment succeeded', pattern: 'warn', icon: 'ban' },
        { id: 'k-refund', label: 'Refund the card', sub: 'a new, visible action', pattern: 'warn', icon: 'receipt' },
        { id: 'k-not', label: 'Not a rollback', sub: 'the charge was real', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [],
}
