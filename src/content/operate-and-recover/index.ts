import type { Course } from '../types'
import { slisSlos } from './01-slis-slos'
import { observability } from './02-observability'
import { resiliencePatterns } from './03-resilience-patterns'
import { threatModel } from './04-threat-model'
import { authnAuthz } from './05-authn-authz'
import { rateLimiting } from './06-rate-limiting'
import { safeDeployments } from './07-safe-deployments'
import { backupRestore } from './08-backup-restore'
import { failureDomains } from './09-failure-domains'
import { workedIncident } from './10-worked-incident'
import { postIncident } from './11-post-incident'

// Chapter 8 of the course plan: quality requirements turned into operational objectives, security
// boundaries and recovery choices.
export const operateAndRecover: Course = {
  id: 'operate-and-recover',
  title: 'Operate, secure and recover systems',
  sections: [
    slisSlos,
    observability,
    resiliencePatterns,
    threatModel,
    authnAuthz,
    rateLimiting,
    safeDeployments,
    backupRestore,
    failureDomains,
    workedIncident,
    postIncident,
  ],
}
