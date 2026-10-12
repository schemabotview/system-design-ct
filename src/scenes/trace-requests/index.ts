import type { Scene } from '@graphlearning/flow'
import { requestPath } from './request-path'
import { errorContract } from './error-contract'
import { paginationAndCompat } from './pagination-and-compat'
import { protocolChoice } from './protocol-choice'
import { retryBudget } from './retry-budget'
import { lostResponse } from './lost-response'
import { idempotencyKey } from './idempotency-key'
import { edgePath } from './edge-path'
import { threeTraces } from './three-traces'

// Chapter 2 — Trace requests and design communication.
export const traceRequestsScenes: Scene[] = [
  requestPath,
  errorContract,
  paginationAndCompat,
  protocolChoice,
  retryBudget,
  lostResponse,
  idempotencyKey,
  edgePath,
  threeTraces,
]
