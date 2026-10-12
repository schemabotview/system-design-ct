import type { Scene } from '@graphlearning/flow'
import { accessPatterns } from './access-patterns'
import { invariants } from './invariants'
import { codeCollisions } from './code-collisions'
import { normalisation } from './normalisation'
import { indexCosts } from './index-costs'
import { storeModels } from './store-models'
import { specialisedStores } from './specialised-stores'
import { durabilityChain } from './durability-chain'
import { clickModels } from './click-models'

// Chapter 3 — Model and store data correctly.
export const modelAndStoreDataScenes: Scene[] = [
  accessPatterns,
  invariants,
  codeCollisions,
  normalisation,
  indexCosts,
  storeModels,
  specialisedStores,
  durabilityChain,
  clickModels,
]
