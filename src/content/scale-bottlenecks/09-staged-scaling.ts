import type { Section } from '../types'

export const stagedScalingSection: Section = {
  id: 'staged-scaling',
  title: 'Worked evolution: scaling changes from supplied evidence',
  scene: 'staged-scaling',
  focus: 'stage3-c',
  slide: `## Scale in stages, by evidence

All evidence below is supplied and hypothetical.

### Stage 1: the database is hot
- Database CPU is 85 % at the 1,157/s peak, so add a cache at an assumed 80 % hit rate
- Database reads fall to about 231/s; new risks are stale reads and a cold start

### Stage 2: the application tier is hot
- App CPU is 90 % after traffic quadruples, so add replicas
- Watch the database connection budget

### Stage 3: writes outgrow the primary
- Click writes reach 4,000/s against about 1,500/s capacity, so partition by code
- New risks: hot shards and cross-shard queries

### What we did not do
- No sharding at stage 1: the evidence never asked for it`,
  narration:
    "Let us finish by scaling the system in stages, where each change is justified by evidence. All of the evidence here is supplied for the exercise and is hypothetical. In stage one, the database processor is at eighty-five percent at our peak of eleven hundred and fifty-seven reads a second. The evidence names the database, so we add a cache, and assuming an eighty percent hit rate, database reads fall to about two hundred and thirty-one a second. But the change introduces new failure modes: stale reads, and a cold start when the cache is empty. In stage two, traffic has quadrupled and the application servers are at ninety percent. The evidence names the application tier, so we add replicas, and we must watch the database connection budget. In stage three, click writes reach four thousand a second against a primary that handles about fifteen hundred. Now the evidence does justify partitioning, by code. And again there are new risks, hot shards and queries that cross shards. Notice what we did not do: we did not shard at stage one, because the evidence never asked for it. Next, we ask what correctness guarantees survive all these copies.",
}
