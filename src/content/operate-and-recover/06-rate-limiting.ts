import type { Section } from '../types'

export const rateLimiting: Section = {
  id: 'rate-limiting',
  title: 'Rate limits, quotas and abuse controls',
  scene: 'token-bucket',
  focus: 'level',
  slide: `## Limit before it hurts

### Token bucket (assumed limits)
- The bucket holds 10 tokens; each create spends one
- It refills at 100 per hour: one token every **36 s**

### Behaviour
- A burst of 10 is allowed; the 11th gets **429** with \`Retry-After: 36\`
- The steady rate can never exceed the refill rate
- An emptied bucket is full again after 360 s

### Quotas and abuse
- A **quota** caps a longer period, such as a day
- Abuse controls look at patterns, not only counts
- Different tiers, such as anonymous and paid, can get different buckets

### Where
- Limit per key, at the edge, before work is done
- Tell clients their limit in headers so they can slow themselves`,
  narration:
    "Limits protect the system from overload and from abuse, and a token bucket is a simple, widely used way to enforce them. Here is our assumed rule: no more than one hundred link creations per owner per hour, with bursts allowed. The bucket holds ten tokens, and every create spends one. Tokens refill at one hundred an hour, which works out to one token every thirty-six seconds. Suppose an owner makes ten creates at once. All ten succeed and the bucket is empty. The eleventh is rejected with a too-many-requests response, and a retry-after header says to wait thirty-six seconds. The plot shows the bucket refilling steadily, and it is full again after three hundred and sixty seconds. That means the long-run rate can never exceed the refill rate, while short bursts are still allowed, which is friendlier to legitimate users. A quota is a separate idea: a cap over a longer period, such as a day. And abuse controls look for patterns, like thousands of near-identical links, not just counts. Apply limits per key, at the edge, before expensive work is done.",
}
