import type { Scene } from '@graphlearning/flow'
import { contexts } from './contexts'
import { monolithVsServices } from './monolith-vs-services'
import { dependencyChain } from './dependency-chain'
import { cqrsEs } from './cqrs-es'
import { expandContract } from './expand-contract'
import { decisionRecord } from './decision-record'

// Chapter 7 — Define service boundaries and evolve architecture.
export const serviceBoundariesScenes: Scene[] = [
  contexts,
  monolithVsServices,
  dependencyChain,
  cqrsEs,
  expandContract,
  decisionRecord,
]
