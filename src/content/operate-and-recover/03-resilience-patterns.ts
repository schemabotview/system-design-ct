import type { Section } from '../types'

export const resiliencePatterns: Section = {
  id: 'resilience-patterns',
  title: 'Circuit breakers, bulkheads, load shedding and graceful degradation',
  scene: 'resilience',
  focus: 'cb-open',
  slide: `## Stop one failure becoming all failures

### Circuit breaker
- **Closed:** calls flow; **open:** fail fast after repeated errors
- **Half-open:** after a pause (30 s, assumed), try one call

### Bulkheads
- Separate pools per dependency, so a slow one cannot use every thread
- Timeouts underneath: a call that never returns never fails

### Load shedding
- Reject low-priority work early, before queues build
- Redirects come before dashboards

### Graceful degradation
- Keep redirects working when analytics is down
- Decide in advance what is optional
- Test it: switch the dependency off on purpose`,
  narration:
    "A failing dependency is dangerous mainly because of what it does to everything that calls it. Callers wait, threads pile up, and soon the healthy parts are stuck too. Four patterns contain the damage. A circuit breaker watches calls to a dependency. While things work, it is closed and calls flow. After repeated failures it opens, and calls fail immediately instead of waiting, giving the dependency room to recover. After a pause, which we assume is thirty seconds, it goes half-open and lets one trial call through. If that succeeds, it closes again. Bulkheads give each dependency its own pool of threads or connections, so a slow dependency can exhaust only its own pool, not everyone's. Load shedding rejects low-priority work early, when the system is overloaded, so the important work still completes. And graceful degradation means deciding in advance what is optional. Our redirect must keep working even if analytics is down, and a stale cached redirect is better than none. The key is deciding which functions are essential before the failure arrives.",
}
