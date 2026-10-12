import type { Scene } from '@graphlearning/flow'
import { partialFailure } from './partial-failure'
import { history } from './history'
import { safetyLiveness } from './safety-liveness'
import { threeMeanings } from './three-meanings'
import { capPacelc } from './cap-pacelc'
import { quorums } from './quorums'
import { raftWalkthrough } from './raft-walkthrough'
import { clocks } from './clocks'
import { twoPhaseCommit } from './two-phase-commit'
import { outbox } from './outbox'
import { inventoryHistories } from './inventory-histories'

// Chapter 5 — Reason about distributed correctness.
export const distributedCorrectnessScenes: Scene[] = [
  partialFailure,
  history,
  safetyLiveness,
  threeMeanings,
  capPacelc,
  quorums,
  raftWalkthrough,
  clocks,
  twoPhaseCommit,
  outbox,
  inventoryHistories,
]
