import type { Scene } from '@graphlearning/flow'

// §4 — where the acknowledgement sits relative to the effect decides what a crash does. Exactly-once
// claims are scoped: they usually cover work inside one system, not an external email or card charge.
export const delivery: Scene = {
  id: 'delivery',
  title: 'Where the crash lands',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'consumer.txt',
      label: `msg = receive()
# crash here: nothing happened yet; redelivery is harmless
apply_effect(msg)        # write to the database, send an email
# crash here: effect done, no ack; redelivery DUPLICATES it
ack(msg)`,
    },
    {
      id: 'guarantees',
      label: 'Three guarantees',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'g-most', label: 'At most once', sub: 'ack first: a crash loses it', pattern: 'warn', icon: 'trash' },
        { id: 'g-least', label: 'At least once', sub: 'ack last: a crash repeats it', pattern: 'service', icon: 'repeat' },
        { id: 'g-exact', label: 'Effectively once', sub: 'at least once plus idempotent', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'loop', target: 'guarantees', label: 'order of steps decides' }],
}
