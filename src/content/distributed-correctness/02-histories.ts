import type { Section } from '../types'

export const historiesSection: Section = {
  id: 'histories',
  title: 'Correctness through invariants and concurrent histories',
  scene: 'history',
  focus: 'v-after',
  slide: `## Judge a history, not a feeling

A **history** records what each client did and saw, with start and end times.

### Reading the example
- A's write of 1 runs from t1 to t3
- B reads during the write: **0 or 1** are both legal
- C starts reading after the write returned: it must see **1**

### The rule behind it
- **Linearizable:** every operation seems to take effect at one instant between its start and end
- A read that begins after a write ended must not see an older value

### Why use histories
- They state correctness without describing the implementation
- A single bad history is a counterexample
- Tests can record histories and check them against the rule`,
  narration:
    "To say whether a distributed system is correct, we need something more precise than a feeling. A history records what each client did and what it saw, along with when each operation started and ended. Look at this small example, on a single register that starts at zero. Client A starts writing the value one at time one, and its write returns at time three. Client B reads in the middle, while the write is still in progress. Because the operations overlap, B may see zero or one, and both answers are legal. Now client C starts a read at time four, after A's write has completely finished, and gets zero. That is a violation. The rule, called linearizability, says each operation must appear to take effect at a single instant somewhere between its start and its end, so a read that begins after a write has finished must not see an older value. The attraction of histories is that they describe correctness without describing the implementation, and a single bad history is a counterexample that proves a system does not meet the guarantee.",
}
