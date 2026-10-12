import type { Course } from '../types'
import { messagingModelsSection } from './01-messaging-models'
import { partitionsAndGroups } from './02-partitions-and-groups'
import { acksAndOffsets } from './03-acks-and-offsets'
import { deliveryGuarantees } from './04-delivery-guarantees'
import { idempotentConsumers } from './05-idempotent-consumers'
import { poisonMessages } from './06-poison-messages'
import { backpressureSection } from './07-backpressure'
import { workflowsSection } from './08-workflows'
import { clickAnalyticsCase } from './09-click-analytics-case'

// Chapter 6 of the course plan: asynchronous work under delivery, ordering, overload and recovery
// constraints.
export const asyncProcessing: Course = {
  id: 'async-processing',
  title: 'Design asynchronous processing',
  sections: [
    messagingModelsSection,
    partitionsAndGroups,
    acksAndOffsets,
    deliveryGuarantees,
    idempotentConsumers,
    poisonMessages,
    backpressureSection,
    workflowsSection,
    clickAnalyticsCase,
  ],
}
