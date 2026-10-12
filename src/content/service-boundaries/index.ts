import type { Course } from '../types'
import { boundedContexts } from './01-bounded-contexts'
import { monolithOrServices } from './02-monolith-or-services'
import { contractsAndChains } from './03-contracts-and-chains'
import { cqrsEventSourcing } from './04-cqrs-event-sourcing'
import { compatibleMigrations } from './05-compatible-migrations'
import { keepOrExtract } from './06-keep-or-extract'

// Chapter 7 of the course plan: responsibility boundaries and evolution choices, without assuming
// service decomposition is always beneficial.
export const serviceBoundaries: Course = {
  id: 'service-boundaries',
  title: 'Define service boundaries and evolve architecture',
  sections: [
    boundedContexts,
    monolithOrServices,
    contractsAndChains,
    cqrsEventSourcing,
    compatibleMigrations,
    keepOrExtract,
  ],
}
