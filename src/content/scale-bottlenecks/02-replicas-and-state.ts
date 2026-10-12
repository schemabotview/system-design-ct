import type { Section } from '../types'

export const replicasAndState: Section = {
  id: 'replicas-and-state',
  title: 'Application replicas, session state and connection pools',
  scene: 'replicas-and-pools',
  focus: 'six',
  slide: `## Add replicas, then handle state

### Replicas
- Run several identical application copies behind a load balancer
- This works when no per-user state lives in one copy's memory

### Session state
- Keep sessions in a shared store, or in signed tokens the client carries
- Otherwise the next request may reach a replica that has never seen the user

### Connection pools
- Each replica holds a pool: 3 replicas × 20 = **60** connections
- If the database allows 100 (assumed), 6 replicas would want 120, and fail
- A pool is a capacity budget, not a detail

### The pattern
- Scaling one tier moves the pressure to what it depends on`,
  narration:
    "The simplest way to add capacity to the application tier is to run several identical copies behind a load balancer. That works when no copy holds something the others need. The first thing that breaks it is session state. If a user's session lives in the memory of one replica, their next request may land on another replica that has never heard of them. So sessions move to a shared store, or into signed tokens that the client carries with each request. The second thing is less obvious: connection pools. Each replica keeps a pool of connections to the database, say twenty. Three replicas hold sixty connections. If the database allows a hundred, which we assume here, that is fine. But growing to six replicas would want a hundred and twenty connections, and some of them would simply fail. So the pool is a capacity budget that has to be planned across all replicas, not a configuration detail. The general pattern is worth remembering: scaling one tier moves the pressure onto whatever that tier depends on.",
}
