import type { Course } from '../types'
import { systemBoundaries } from './01-system-boundaries'
import { requirementsAndJourneys } from './02-requirements-and-journeys'
import { qualityAttributes } from './03-quality-attributes'
import { estimateDemand } from './04-estimate-demand'
import { latencyAndThroughput } from './05-latency-and-throughput'
import { urlShortenerFirstDesign } from './06-url-shortener-first-design'

// Chapter 1 of the course plan (SYSTEM-DESIGN-COURSE-PLAN.md): an ambiguous request becomes explicit
// requirements, assumptions, estimates and an initial architecture.
export const frameTheProblem: Course = {
  id: 'frame-the-problem',
  title: 'Frame the problem and explain an initial design',
  sections: [
    systemBoundaries,
    requirementsAndJourneys,
    qualityAttributes,
    estimateDemand,
    latencyAndThroughput,
    urlShortenerFirstDesign,
  ],
}
