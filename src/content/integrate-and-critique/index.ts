import type { Course } from '../types'
import { designMethodSection } from './01-design-method'
import { changedRequirementsSection } from './02-changed-requirements'
import { fourDesignsSection } from './03-four-designs'
import { fileStorageDesignSection } from './04-file-storage-design'
import { architectureCritiqueSection } from './05-architecture-critique'

// Chapter 9 of the course plan: architectural reasoning integrated through narrated designs, changed
// requirements and critique.
export const integrateAndCritique: Course = {
  id: 'integrate-and-critique',
  title: 'Integrate and critique complete designs',
  sections: [
    designMethodSection,
    changedRequirementsSection,
    fourDesignsSection,
    fileStorageDesignSection,
    architectureCritiqueSection,
  ],
}
