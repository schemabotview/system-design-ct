import type { Scene } from '@graphlearning/flow'

// §9 — three traces on the chapter's HYPOTHETICAL timings: warm connection 40 ms; per-attempt
// timeout 150 ms; jittered wait 60 ms (a draw from 0–100 ms); retry carries the same key, so the
// server replays the stored 201 instead of creating a second link.
export const threeTraces: Scene = {
  id: 'three-traces',
  title: 'Success, timeout and repeat',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'ok',
      label: 'Create: success',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'ok0', label: 'Warm connection', sub: 'no handshakes needed', pattern: 'network', icon: 'plug' },
        { id: 'ok1', label: 'Send with key', sub: 'POST at t = 0 ms', pattern: 'user', icon: 'pencil' },
        { id: 'ok2', label: 'Store one row', sub: 'code aZ3k9Q', pattern: 'storage', icon: 'database' },
        { id: 'ok2b', label: 'Record the key', sub: 'same transaction', pattern: 'storage', icon: 'key' },
        { id: 'ok3', label: '201 returned', sub: 't = 40 ms, warm', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'ok0', target: 'ok1' },
        { source: 'ok1', target: 'ok2' },
        { source: 'ok2', target: 'ok2b' },
        { source: 'ok2b', target: 'ok3' },
      ],
    },
    {
      id: 'late',
      label: 'Create: timeout, retry',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'late0', label: 'Send with key', sub: 'POST at t = 0 ms', pattern: 'user', icon: 'pencil' },
        { id: 'late1', label: 'No answer', sub: 'timeout at 150 ms', pattern: 'warn', icon: 'clock' },
        { id: 'late2', label: 'Wait 60 ms', sub: 'jitter, then t = 210', pattern: 'network', icon: 'repeat' },
        { id: 'late3', label: 'Retry, same key', sub: 'server finds the key', pattern: 'user', icon: 'key' },
        { id: 'late4', label: 'Stored 201 replayed', sub: 'one link, t = 250 ms', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'late0', target: 'late1' },
        { source: 'late1', target: 'late2' },
        { source: 'late2', target: 'late3' },
        { source: 'late3', target: 'late4' },
      ],
    },
    {
      id: 'again',
      label: 'Redirect: repeated',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'again1', label: 'GET /aZ3k9Q', sub: 'first visit', pattern: 'user', icon: 'search' },
        { id: 'again1b', label: 'Look up code', sub: 'edge cache or app', pattern: 'storage', icon: 'database' },
        { id: 'again2', label: '302 Found', sub: 'Location: long URL', pattern: 'network', icon: 'share' },
        { id: 'again3', label: 'GET again', sub: 'repeat or retry', pattern: 'user', icon: 'repeat' },
        { id: 'again4', label: 'Same 302', sub: 'reads change nothing', pattern: 'network', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'again1', target: 'again1b' },
        { source: 'again1b', target: 'again2' },
        { source: 'again2', target: 'again3' },
        { source: 'again3', target: 'again4' },
      ],
    },
  ],
  edges: [],
}
