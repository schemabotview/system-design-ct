import type { Scene } from '@graphlearning/flow'

// §9 — two-phase commit. If the coordinator fails after participants have voted yes and before it
// announces the decision, the participants are "in doubt": they cannot safely commit or abort, so they
// hold their locks and wait.
export const twoPhaseCommit: Scene = {
  id: 'two-phase-commit',
  title: 'Where two-phase commit blocks',
  flow: 'TB',
  nodes: [
    { id: 'prep', label: 'Coordinator: prepare?', sub: 'asks every participant', pattern: 'user', icon: 'bell' },
    { id: 'yes', label: 'All vote yes', sub: 'each promises it can commit', pattern: 'network', icon: 'circlecheck' },
    { id: 'commit', label: 'Coordinator: commit', sub: 'decision is announced', pattern: 'storage', icon: 'lock' },
    { id: 'done', label: 'Everyone commits', sub: 'atomic outcome', pattern: 'storage', icon: 'circlecheck' },
    { id: 'crash', label: 'Coordinator crashes', sub: 'before announcing', pattern: 'warn', icon: 'skull' },
    { id: 'doubt', label: 'Participants in doubt', sub: 'locks held, cannot decide', pattern: 'warn', icon: 'clock' },
  ],
  edges: [
    { source: 'prep', target: 'yes', label: 'phase 1' },
    { source: 'yes', target: 'commit', label: 'phase 2' },
    { source: 'commit', target: 'done' },
    { source: 'yes', target: 'crash', label: 'but if', dashed: true },
    { source: 'crash', target: 'doubt', label: 'blocks', dashed: true },
  ],
}
