import type { Scene } from '@graphlearning/flow'
import { contextDiagram } from './context-diagram'
import { createAndFollowJourneys } from './create-and-follow-journeys'
import { qualityCriteria } from './quality-criteria'
import { demandEstimate } from './demand-estimate'
import { latencyPercentiles } from './latency-percentiles'
import { apiAndSchema } from './api-and-schema'

// Chapter 1 — Frame the problem and explain an initial design.
export const frameTheProblemScenes: Scene[] = [
  contextDiagram,
  createAndFollowJourneys,
  qualityCriteria,
  demandEstimate,
  latencyPercentiles,
  apiAndSchema,
]
