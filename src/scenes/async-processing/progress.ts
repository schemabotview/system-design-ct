import type { Scene } from '@graphlearning/flow'

// §3 — two ways a consumer records progress. A queue broker tracks each message and deletes it on
// ack; a stream keeps the log and the consumer remembers an offset, which is what makes replay possible.
export const progress: Scene = {
  id: 'progress',
  title: 'Acknowledgement versus offset',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'ackq',
      label: 'Queue acknowledgement',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'a-deliver', label: 'Broker delivers', sub: 'message is in flight', pattern: 'network', icon: 'share' },
        { id: 'a-work', label: 'Consumer works', sub: 'applies the effect', pattern: 'service', icon: 'gears' },
        { id: 'a-ack', label: 'Ack sent', sub: 'broker deletes it', pattern: 'storage', icon: 'trash' },
        { id: 'a-noreplay', label: 'No replay', sub: 'it is gone', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'a-deliver', target: 'a-work' },
        { source: 'a-work', target: 'a-ack', label: 'success' },
        { source: 'a-ack', target: 'a-noreplay' },
      ],
    },
    {
      id: 'offs',
      label: 'Stream offset',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'o-read', label: 'Read at offset 41', sub: 'log is untouched', pattern: 'network', icon: 'search' },
        { id: 'o-work', label: 'Consumer works', sub: 'applies the effect', pattern: 'service', icon: 'gears' },
        { id: 'o-commit', label: 'Commit offset 42', sub: 'its own progress', pattern: 'storage', icon: 'key' },
        { id: 'o-replay', label: 'Rewind to replay', sub: 'fix a bug, new view', pattern: 'storage', icon: 'history' },
      ],
      edges: [
        { source: 'o-read', target: 'o-work' },
        { source: 'o-work', target: 'o-commit', label: 'success' },
        { source: 'o-commit', target: 'o-replay', label: 'any time' },
      ],
    },
  ],
  edges: [],
}
