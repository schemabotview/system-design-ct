import type { Scene } from '@graphlearning/flow'

// §1 — three ways to move work between components. Real products blur these lines; the point is
// the question each answers: who receives a message, and what happens to it afterwards.
export const messagingModels: Scene = {
  id: 'messaging-models',
  title: 'Queue, pub/sub or stream?',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'queue',
      label: 'Queue',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'q-one', label: 'One consumer each', sub: 'competing workers', pattern: 'service', icon: 'users' },
        { id: 'q-gone', label: 'Deleted after ack', sub: 'no history kept', pattern: 'service', icon: 'trash' },
        { id: 'q-use', label: 'Use: tasks', sub: 'send an email', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'pubsub',
      label: 'Publish / subscribe',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'p-copy', label: 'A copy per subscriber', sub: 'independent readers', pattern: 'network', icon: 'copy' },
        { id: 'p-fan', label: 'Fan-out', sub: 'one event, many uses', pattern: 'network', icon: 'share' },
        { id: 'p-use', label: 'Use: notify many', sub: 'analytics and alerts', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'stream',
      label: 'Retained event stream',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 's-log', label: 'Append-only log', sub: 'kept for a retention period', pattern: 'storage', icon: 'scroll' },
        { id: 's-pos', label: 'Readers track position', sub: 'and can rewind', pattern: 'storage', icon: 'history' },
        { id: 's-use', label: 'Use: replay', sub: 'rebuild a view', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'choose',
      label: 'How to choose',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'c-1', label: 'Work for one worker', sub: 'queue', pattern: 'warn', icon: 'search' },
        { id: 'c-2', label: 'Many readers', sub: 'pub/sub', pattern: 'warn', icon: 'search' },
        { id: 'c-3', label: 'Reprocessing needed', sub: 'stream', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [],
}
