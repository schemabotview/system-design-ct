import type { Scene } from '@graphlearning/flow'

// §8 — physical clocks disagree, so they cannot order events across machines; logical clocks order
// by causality instead. The ±40 ms skew is ASSUMED.
export const clocks: Scene = {
  id: 'clocks',
  title: 'Time you can and cannot trust',
  flow: 'TB',
  nodes: [
    {
      id: 'lamport',
      kind: 'code',
      filename: 'lamport.txt',
      label: `# Lamport clock: one counter per process
on local event:      c = c + 1
on send(message):    c = c + 1; attach c
on receive(m):       c = max(c, m.c) + 1

# if event e causes event f, then c(e) < c(f)
# the reverse does not hold: c(e) < c(f) proves nothing`,
    },
    {
      id: 'kinds',
      label: 'Two kinds of clock',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'k-phys', label: 'Physical clock', sub: 'skew up to ±40 ms, assumed', pattern: 'warn', icon: 'clock' },
        { id: 'k-lww', label: 'Last write wins', sub: 'can drop the newer write', pattern: 'warn', icon: 'trash' },
        { id: 'k-log', label: 'Logical clock', sub: 'orders by causality', pattern: 'storage', icon: 'sortarrows' },
        { id: 'k-vec', label: 'Vector clock', sub: 'can detect concurrency', pattern: 'storage', icon: 'share' },
      ],
    },
  ],
  edges: [{ source: 'lamport', target: 'kinds', label: 'versus' }],
}
