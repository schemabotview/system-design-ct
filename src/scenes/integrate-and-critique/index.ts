import type { Scene } from '@graphlearning/flow'
import { designMethod } from './design-method'
import { changedRequirements } from './changed-requirements'
import { fourDesigns } from './four-designs'
import { fileStorageDesign } from './file-storage-design'
import { critique } from './critique'

// Chapter 9 — Integrate and critique complete designs.
export const integrateAndCritiqueScenes: Scene[] = [
  designMethod,
  changedRequirements,
  fourDesigns,
  fileStorageDesign,
  critique,
]
