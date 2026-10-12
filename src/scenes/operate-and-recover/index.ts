import type { Scene } from '@graphlearning/flow'
import { errorBudget } from './error-budget'
import { signals } from './signals'
import { resilience } from './resilience'
import { threats } from './threats'
import { access } from './access'
import { tokenBucket } from './token-bucket'
import { canary } from './canary'
import { recoveryOptions } from './recovery-options'
import { failureDomains } from './failure-domains'
import { incidentTimeline } from './incident-timeline'
import { postIncident } from './post-incident'

// Chapter 8 — Operate, secure and recover systems.
export const operateAndRecoverScenes: Scene[] = [
  errorBudget,
  signals,
  resilience,
  threats,
  access,
  tokenBucket,
  canary,
  recoveryOptions,
  failureDomains,
  incidentTimeline,
  postIncident,
]
