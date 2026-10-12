import type { Scene } from '@graphlearning/flow'
import { messagingModels } from './messaging-models'
import { partitions } from './partitions'
import { progress } from './progress'
import { delivery } from './delivery'
import { dedup } from './dedup'
import { deadLetters } from './dead-letters'
import { backlogScene } from './backlog'
import { workflows } from './workflows'
import { clickPipeline } from './click-pipeline'

// Chapter 6 — Design asynchronous processing.
export const asyncProcessingScenes: Scene[] = [
  messagingModels,
  partitions,
  progress,
  delivery,
  dedup,
  deadLetters,
  backlogScene,
  workflows,
  clickPipeline,
]
