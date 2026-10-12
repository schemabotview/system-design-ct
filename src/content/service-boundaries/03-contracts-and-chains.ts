import type { Section } from '../types'

export const contractsAndChains: Section = {
  id: 'contracts-and-chains',
  title: 'Service contracts, ownership and dependency chains',
  scene: 'dependency-chain',
  focus: 'result',
  slide: `## Contracts, ownership and chains

### Contracts
- The owner publishes and **versions** the contract; consumers depend on it, not on internals
- Within a version, add optional fields only
- Tests from the consumer's side catch breaking changes early

### Ownership
- One team owns each service and its data
- Shared ownership usually means nobody's

### Dependency chains
- Four synchronous services at 99.9 % each: 0.999⁴ ≈ **99.6 %**
- That misses the 99.9 % target from chapter 1
- Latency adds; failures multiply

### Shorten the chain
- Cache the answer, make the call asynchronous, or remove a hop`,
  narration:
    "When parts of a system talk to each other, the agreement between them is a contract, and contracts need owners. The owner of a service publishes the contract and versions it, and consumers depend on the contract, never on the service's internal tables. Within a version, changes are additive only: new optional fields are fine, and a breaking change ships as a new version running alongside the old. Each service, and its data, should have one team that owns it. Shared ownership usually means nobody's. Now look at what happens when services call each other in a chain. Suppose a single redirect depends synchronously on four services, and each is ninety-nine point nine percent available, which is an assumption for this example. The chance that all four answer is point nine nine nine to the fourth power, about ninety-nine point six percent. That is already below the ninety-nine point nine percent target we set in chapter one, and we have not added a single bug. Latency adds up along the chain and failures multiply. The remedies are to shorten the chain: cache an answer, make a call asynchronous, or remove a hop.",
}
