import type { Section } from '../types'

export const safeDeployments: Section = {
  id: 'safe-deployments',
  title: 'Safe deployments, configuration changes and rollback',
  scene: 'canary',
  focus: 'back',
  slide: `## Ship in small, reversible steps

### Canary release (assumed figures)
- Send 1 % of traffic to the new version and watch for 10 minutes
- Compare error ratio and latency with the baseline

### Promote or roll back
- Healthy: 10 %, then 50 %, then 100 %
- Unhealthy: roll back automatically to the previous version

### Configuration is code
- Config changes get review, validation, staging and gradual rollout
- Feature flags separate deploying code from enabling it

### Make rollback boring
- Keep the previous version deployable
- Keep schema changes compatible (chapter 7)
- A burned error budget pauses risky releases`,
  narration:
    "Most outages follow a change, so how we ship changes matters as much as the code. The safest approach is a canary release. We deploy the new version to a small slice of traffic, say one percent, and watch it for a fixed time, assumed here to be ten minutes. We compare its error ratio and latency against the baseline running the old version. If it looks healthy, we promote it gradually: ten percent, then fifty, then everything, watching at each step. If it looks worse, we roll back automatically to the previous version, and only a small number of users ever saw the problem. Two things make this work. First, configuration changes are code. A configuration value can break a system as surely as a bug can, so it deserves the same review, validation, staging, and gradual rollout. Second, rollback must be boring. That means the previous version is still deployable, and schema changes were made in the compatible steps we saw in chapter seven, so the old code can still run against the new data.",
}
