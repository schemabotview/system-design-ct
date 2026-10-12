import type { Section } from '../types'

export const workflowsSection: Section = {
  id: 'workflows',
  title: 'State machines, orchestration, choreography and compensation',
  scene: 'workflows',
  focus: 'k-not',
  slide: `## Coordinate steps without one big transaction

### State machine
- An order is in one state at a time: created, paid, shipped, failed
- Only listed transitions are allowed
- Persist the state, so a crash resumes mid-flow

### Two coordination styles
- **Orchestration:** one coordinator tells each service what to do
- **Choreography:** services react to each other's events

### Compensation
- If a later step fails, run **compensating actions**: refund the card, release the stock
- Compensation is a new action, **not** an atomic rollback: the customer may already have seen the charge
- Some actions, such as a sent email, cannot be undone`,
  narration:
    "When a business process spans several services, such as an order that must reserve stock, take payment, and ship, we cannot wrap it all in one transaction. Instead, we model it as a state machine. An order is in exactly one state at a time: created, paid, shipped, or failed, and only the listed transitions are allowed. Then we choose how the steps are coordinated. With orchestration, a single coordinator tells each service what to do next. The whole flow is in one place, so it is easy to follow, but the coordinator becomes a central dependency that must stay available. With choreography, there is no coordinator. Each service reacts to the events of the others. That is loosely coupled, but the overall flow is implicit and harder to see and debug. Failures need a plan too. If shipping fails after payment succeeded, we run compensating actions, refunding the card and releasing the stock. But understand what that is. Compensation is a new action going forward, not an atomic rollback. The charge really happened, and the customer may have seen it.",
}
