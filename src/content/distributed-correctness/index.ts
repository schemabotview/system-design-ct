import type { Course } from '../types'
import { partialFailureSection } from './01-partial-failure'
import { historiesSection } from './02-histories'
import { safetyLivenessSection } from './03-safety-liveness'
import { threeMeaningsSection } from './04-three-meanings'
import { capPacelcSection } from './05-cap-pacelc'
import { quorumsSection } from './06-quorums'
import { raftSection } from './07-raft'
import { clocksSection } from './08-clocks'
import { twoPhaseCommitSection } from './09-two-phase-commit'
import { outboxSection } from './10-outbox'
import { workedHistoriesSection } from './11-worked-histories'

// Chapter 5 of the course plan: correctness reasoned from invariants, histories and failure
// assumptions.
export const distributedCorrectness: Course = {
  id: 'distributed-correctness',
  title: 'Reason about distributed correctness',
  sections: [
    partialFailureSection,
    historiesSection,
    safetyLivenessSection,
    threeMeaningsSection,
    capPacelcSection,
    quorumsSection,
    raftSection,
    clocksSection,
    twoPhaseCommitSection,
    outboxSection,
    workedHistoriesSection,
  ],
}
