import type { Course } from '../types'
import { accessPatternsSection } from './01-access-patterns'
import { invariantsSection } from './02-invariants'
import { identifiersSection } from './03-identifiers'
import { normalisationSection } from './04-normalisation'
import { indexesSection } from './05-indexes'
import { storageModelsSection } from './06-storage-models'
import { specialisedStoresSection } from './07-specialised-stores'
import { durabilityRetentionSection } from './08-durability-retention'
import { clickModelComparison } from './09-click-model-comparison'

// Chapter 3 of the course plan: justify storage choices and integrity rules from operations and
// access patterns.
export const modelAndStoreData: Course = {
  id: 'model-and-store-data',
  title: 'Model and store data correctly',
  sections: [
    accessPatternsSection,
    invariantsSection,
    identifiersSection,
    normalisationSection,
    indexesSection,
    storageModelsSection,
    specialisedStoresSection,
    durabilityRetentionSection,
    clickModelComparison,
  ],
}
