import type { Section } from '../types'

export const clocksSection: Section = {
  id: 'clocks',
  title: 'Physical clocks, logical clocks and event ordering',
  scene: 'clocks',
  focus: 'k-lww',
  slide: `## Whose clock decides the order?

### Physical clocks disagree
- Machines drift; assume skew of up to ±40 ms
- **Last write wins** by timestamp can keep the older write and drop the newer one
- Good for logs and expiry times, not for deciding who was first
- Some systems use clocks with a bounded error and wait it out

### Logical clocks
- **Lamport clock:** a counter that respects causality
- If e causes f, then c(e) < c(f); the reverse is not true
- On receive: new clock = max(local, message) + 1
- **Vector clocks** can tell that two events were concurrent
- They grow with the number of writers

### The rule
- Order by causality when correctness depends on order`,
  narration:
    "Ordering events across machines is harder than it sounds, because every machine has its own clock, and the clocks disagree. Machines drift, and for the sake of the example we assume skew of up to forty milliseconds. That is enough to cause real problems. If a system resolves conflicting writes by keeping whichever has the later timestamp, a write that happened second can carry an earlier timestamp and be silently discarded. Physical clocks remain very useful for logs and for expiry times, but not for deciding which event came first. Logical clocks take a different approach and order events by causality instead. A Lamport clock is just a counter at each process. It increases on every event, travels with every message, and on receipt jumps to the larger of the two values plus one. If event e causes event f, the clock value for e is smaller than for f. The reverse is not true: a smaller value proves nothing. Vector clocks go further and can tell that two events were concurrent. So order by causality whenever correctness depends on order.",
}
