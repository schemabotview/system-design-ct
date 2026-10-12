import type { Section } from '../types'

export const failureDomains: Section = {
  id: 'failure-domains',
  title: 'Failure domains and multi-region recovery choices',
  scene: 'failure-domains',
  focus: 'r-warm',
  slide: `## What fails together?

### Failure domains, small to large
- Process, machine or rack, zone, region
- A domain is whatever fails together
- It is also a rollout boundary: deploy one zone at a time

### Recovery choices (assumed recovery times)
- **Multi-zone** in one region: survives a zone loss, in minutes
- **Warm standby region:** survives a region loss, about an hour
- **Active-active:** near-zero recovery, but the hardest to keep consistent (chapter 5)

### Cost
- Each step up costs money and complexity
- Match the choice to RTO and RPO, not to ambition
- Failover must be rehearsed, and failing back is a second project`,
  narration:
    "Redundancy only helps if the copies do not fail together, so we reason about failure domains: the sets of things that fail at the same time. From small to large, a process can crash, a machine or rack can fail, a whole zone, which is roughly a data-centre building, can lose power or networking, and a whole region can be unavailable. Each recovery choice survives up to a certain size of domain. Running across multiple zones in one region survives the loss of a zone, with recovery in minutes. A warm standby in another region survives losing a whole region, but recovery takes longer, here assumed to be about an hour, because data must be current and traffic must be redirected. An active-active design, serving from several regions at once, gives near-zero recovery but is the hardest to keep consistent, as we saw in chapter five. Each step up costs more money and more complexity. So match the choice to the recovery time and recovery point you actually need, not to ambition.",
}
