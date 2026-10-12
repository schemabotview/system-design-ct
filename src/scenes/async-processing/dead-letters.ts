import type { Scene } from '@graphlearning/flow'

// §6 — retry automatically up to a limit (5, ASSUMED), then park the message for a human. Redrive is
// only safe because consumers are idempotent.
export const deadLetters: Scene = {
  id: 'dead-letters',
  title: 'From retry to dead letter and back',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'auto',
      label: 'Automatic',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'au-fail', label: 'Processing fails', sub: 'an exception is thrown', pattern: 'warn', icon: 'bug' },
        { id: 'au-retry', label: 'Retry with backoff', sub: 'jitter, up to 5 tries', pattern: 'network', icon: 'repeat' },
        { id: 'au-ok', label: 'Transient: succeeds', sub: 'the common case', pattern: 'storage', icon: 'circlecheck' },
        { id: 'au-poison', label: 'Poison message', sub: 'fails every time', pattern: 'warn', icon: 'skull' },
      ],
      edges: [
        { source: 'au-fail', target: 'au-retry' },
        { source: 'au-retry', target: 'au-ok', label: 'usually' },
        { source: 'au-retry', target: 'au-poison', label: 'after 5', dashed: true },
      ],
    },
    {
      id: 'human',
      label: 'Recovery',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'hu-dlq', label: 'Dead-letter queue', sub: 'parked, not lost', pattern: 'storage', icon: 'folder' },
        { id: 'hu-alert', label: 'Alert fires', sub: 'on queue depth', pattern: 'network', icon: 'bell' },
        { id: 'hu-fix', label: 'Inspect and fix', sub: 'code or data', pattern: 'service', icon: 'wrench' },
        { id: 'hu-redrive', label: 'Redrive', sub: 'safe: consumers are idempotent', pattern: 'storage', icon: 'swap' },
      ],
      edges: [
        { source: 'hu-dlq', target: 'hu-alert' },
        { source: 'hu-alert', target: 'hu-fix' },
        { source: 'hu-fix', target: 'hu-redrive' },
      ],
    },
  ],
  edges: [{ source: 'auto', target: 'human', label: 'moved aside' }],
}
