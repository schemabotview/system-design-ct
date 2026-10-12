import type { Course } from '../types'
import { traceARequest } from './01-trace-a-request'
import { apiContract } from './02-api-contract'
import { paginationVersioning } from './03-pagination-versioning'
import { chooseInterfaceStyle } from './04-choose-interface-style'
import { deadlinesAndRetries } from './05-deadlines-and-retries'
import { ambiguousOutcomes } from './06-ambiguous-outcomes'
import { idempotentOperations } from './07-idempotent-operations'
import { proxiesAndCaching } from './08-proxies-and-caching'
import { workedTraces } from './09-worked-traces'

// Chapter 2 of the course plan: interfaces and request behaviour under success, delay, failure and
// retries.
export const traceRequests: Course = {
  id: 'trace-requests',
  title: 'Trace requests and design communication',
  sections: [
    traceARequest,
    apiContract,
    paginationVersioning,
    chooseInterfaceStyle,
    deadlinesAndRetries,
    ambiguousOutcomes,
    idempotentOperations,
    proxiesAndCaching,
    workedTraces,
  ],
}
