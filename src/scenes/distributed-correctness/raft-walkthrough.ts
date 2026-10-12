import type { Scene } from '@graphlearning/flow'

// §7 — a conceptual Raft run on three servers. Leader elected by a majority (2 of 3) in term 2; an
// entry is committed once stored on a majority; when the leader fails, a new election in term 3
// requires a candidate whose log is at least as up to date as the voters'. Simplified, not a spec.
export const raftWalkthrough: Scene = {
  id: 'raft-walkthrough',
  title: 'A conceptual Raft run',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'normal',
      label: 'Normal operation',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'n-elect', label: 'Elect a leader', sub: 'term 2, votes from 2 of 3', pattern: 'network', icon: 'users' },
        { id: 'n-append', label: 'Append to log', sub: 'leader stores the command', pattern: 'service', icon: 'pencil' },
        { id: 'n-repl', label: 'Replicate', sub: 'sent to the followers', pattern: 'network', icon: 'copy' },
        { id: 'n-commit', label: 'Commit', sub: 'stored on a majority', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'n-elect', target: 'n-append' },
        { source: 'n-append', target: 'n-repl' },
        { source: 'n-repl', target: 'n-commit', label: '2 of 3' },
      ],
    },
    {
      id: 'failure',
      label: 'The leader fails',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'f-crash', label: 'Leader crashes', sub: 'followers hear nothing', pattern: 'warn', icon: 'skull' },
        { id: 'f-timeout', label: 'A follower times out', sub: 'starts term 3', pattern: 'network', icon: 'clock' },
        { id: 'f-vote', label: 'Needs a majority', sub: 'log must be up to date', pattern: 'network', icon: 'scale' },
        { id: 'f-new', label: 'New leader', sub: 'committed entries survive', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'f-crash', target: 'f-timeout' },
        { source: 'f-timeout', target: 'f-vote' },
        { source: 'f-vote', target: 'f-new', label: 'wins' },
      ],
    },
  ],
  edges: [],
}
