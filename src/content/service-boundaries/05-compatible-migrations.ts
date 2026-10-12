import type { Section } from '../types'

export const compatibleMigrations: Section = {
  id: 'compatible-migrations',
  title: 'Evolving schemas, APIs and boundaries through compatible migrations',
  scene: 'expand-contract',
  focus: 'p4',
  slide: `## Change a live system in compatible steps

### Expand and contract
- **Expand:** add the new column or field, optional; old code still works
- **Dual write:** write old and new; backfill old rows in small batches
- **Switch reads:** read the new field, and verify it matches
- **Contract:** stop writing the old, then drop it after a quiet period

### Why steps
- Deploys are not instant: old and new code run side by side
- Every step can be rolled back until the contract step

### The same shape elsewhere
- APIs: add a new version, run both, retire the old
- Boundaries: route a slice of calls to the new service first, then grow it`,
  narration:
    "A live system cannot be paused while we change it, so every change has to be made in steps that are compatible with what is already running. The standard approach for a schema is called expand and contract. First, expand: add the new column or field, optional and unused, so old code keeps working because it ignores it. Second, dual write: have the new code write both the old and the new, and backfill old rows in small batches. Third, switch reads: move readers to the new field, and verify that it matches the old. Fourth, contract: stop writing the old field and, only after a quiet period, drop it. Why so many steps? Because deploys are not instant. For a while, old and new versions of the code run side by side, and each must work against the same data. It also means every step can be rolled back until the final contract step. The same shape appears elsewhere. For an API, add a new version, run both, and retire the old. For a boundary, route a small slice of calls to the new service first, and grow it as confidence builds.",
}
