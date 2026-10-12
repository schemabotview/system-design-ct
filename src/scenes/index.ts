import type { Scene } from '@graphlearning/flow'
import { frameTheProblemScenes } from './frame-the-problem'
import { traceRequestsScenes } from './trace-requests'
import { modelAndStoreDataScenes } from './model-and-store-data'
import { scaleBottlenecksScenes } from './scale-bottlenecks'
import { distributedCorrectnessScenes } from './distributed-correctness'
import { asyncProcessingScenes } from './async-processing'
import { serviceBoundariesScenes } from './service-boundaries'
import { operateAndRecoverScenes } from './operate-and-recover'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...frameTheProblemScenes, ...traceRequestsScenes, ...modelAndStoreDataScenes, ...scaleBottlenecksScenes, ...distributedCorrectnessScenes, ...asyncProcessingScenes, ...serviceBoundariesScenes, ...operateAndRecoverScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
