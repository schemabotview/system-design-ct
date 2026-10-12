import type { Course } from '../types'
import { locateSaturation } from './01-locate-saturation'
import { replicasAndState } from './02-replicas-and-state'
import { cachePlacement } from './03-cache-placement'
import { invalidationAndStaleness } from './04-invalidation-and-staleness'
import { hotKeysAndStampedes } from './05-hot-keys-and-stampedes'
import { readReplicasSection } from './06-read-replicas'
import { shardKeysSection } from './07-shard-keys'
import { rebalancingSection } from './08-rebalancing'
import { stagedScalingSection } from './09-staged-scaling'

// Chapter 4 of the course plan: scaling mechanisms in response to supplied workload evidence.
export const scaleBottlenecks: Course = {
  id: 'scale-bottlenecks',
  title: 'Scale measured bottlenecks',
  sections: [
    locateSaturation,
    replicasAndState,
    cachePlacement,
    invalidationAndStaleness,
    hotKeysAndStampedes,
    readReplicasSection,
    shardKeysSection,
    rebalancingSection,
    stagedScalingSection,
  ],
}
