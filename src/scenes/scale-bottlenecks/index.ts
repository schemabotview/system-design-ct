import type { Scene } from '@graphlearning/flow'
import { saturation } from './saturation'
import { replicasAndPools } from './replicas-and-pools'
import { cacheAside } from './cache-aside'
import { staleTimeline } from './stale-timeline'
import { hotKeys } from './hot-keys'
import { readReplicas } from './read-replicas'
import { shardKeys } from './shard-keys'
import { rebalancing } from './rebalancing'
import { stagedScaling } from './staged-scaling'

// Chapter 4 — Scale measured bottlenecks.
export const scaleBottlenecksScenes: Scene[] = [
  saturation,
  replicasAndPools,
  cacheAside,
  staleTimeline,
  hotKeys,
  readReplicas,
  shardKeys,
  rebalancing,
  stagedScaling,
]
