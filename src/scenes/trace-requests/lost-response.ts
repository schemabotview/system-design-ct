import type { Scene } from '@graphlearning/flow'

// §6 — the same request applied twice, as four phases read left to right, top to bottom (the numbers
// are in the container labels; `badge` is not rendered by the installed engine). The lost reply is the whole problem: the client's only evidence
// is silence, which looks the same as a request that was never delivered.
export const lostResponse: Scene = {
  id: 'lost-response',
  title: 'When the answer never arrives',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'first',
      label: '1 · Attempt one',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'send', label: 'Client sends', sub: 'POST /links', pattern: 'user', icon: 'pencil' },
        { id: 'store1', label: 'Server stores', sub: 'row for aZ3k9Q', pattern: 'storage', icon: 'database' },
      ],
      edges: [{ source: 'send', target: 'store1', label: 'request' }],
    },
    {
      id: 'silence',
      label: '2 · Silence',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'lost', label: 'Reply lost', sub: 'network drops it', pattern: 'warn', icon: 'ban' },
        { id: 'timeout', label: 'Client gives up', sub: 'no answer at 150 ms', pattern: 'warn', icon: 'clock' },
      ],
      edges: [{ source: 'lost', target: 'timeout', label: 'nothing arrives' }],
    },
    {
      id: 'second',
      label: '3 · Attempt two',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'retry', label: 'Client retries', sub: 'same request again', pattern: 'user', icon: 'repeat' },
        { id: 'store2', label: 'Server stores', sub: 'second row, new code', pattern: 'warn', icon: 'database' },
      ],
      edges: [{ source: 'retry', target: 'store2', label: 'request' }],
    },
    {
      id: 'outcome',
      label: '4 · Outcome',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'dup', label: 'Two links', sub: 'one intent, two effects', pattern: 'warn', icon: 'copy' },
        { id: 'orphan', label: 'One is orphaned', sub: 'owner never got its code', pattern: 'warn', icon: 'skull' },
      ],
      edges: [{ source: 'dup', target: 'orphan', label: 'consequence' }],
    },
  ],
  edges: [],
}
