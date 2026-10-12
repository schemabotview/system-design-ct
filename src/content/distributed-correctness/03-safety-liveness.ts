import type { Section } from '../types'

export const safetyLivenessSection: Section = {
  id: 'safety-liveness',
  title: 'Safety and liveness',
  scene: 'safety-liveness',
  focus: 'p-keep',
  slide: `## Distinguish "right" from "moving"

### Safety
- **Nothing bad ever happens**
- No two leaders in one term; stock never below zero
- A violation can be pointed to at a specific moment

### Liveness
- **Something good eventually happens**
- A leader is eventually elected; requests are eventually answered
- Only a never-ending absence violates it

### Under a partition
- The side that cannot reach a majority **waits**
- That keeps safety: no conflicting decisions
- It costs liveness: those requests stall

### The habit
- Protect safety first; liveness can usually recover later`,
  narration:
    "Two kinds of property matter in distributed systems, and it helps to keep them apart. A safety property says that nothing bad ever happens. Two examples are that there are never two leaders in the same term, and that stock never drops below zero. You can point at a safety violation: there is a specific moment where the bad thing happened. A liveness property says that something good eventually happens, such as a leader eventually being elected, or every request eventually being answered. You cannot point at a single moment of violation, because it is only violated by a never-ending absence of progress. The distinction matters most during a partition. A server that cannot reach a majority of its peers can refuse to decide anything. That preserves safety, because no conflicting decisions are made, but it costs liveness, because requests on that side stall until the partition heals. The usual habit is to protect safety first. A system that is briefly stuck can recover, but a system that has made two conflicting decisions may not be able to.",
}
