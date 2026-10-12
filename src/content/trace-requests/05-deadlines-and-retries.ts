import type { Section } from '../types'

export const deadlinesAndRetries: Section = {
  id: 'deadlines-and-retries',
  title: 'Deadlines, timeout budgets, retries, backoff and jitter',
  scene: 'retry-budget',
  focus: 'backoff',
  slide: `## Spend a deadline, not a hope

A **deadline** is the total time the caller will wait. Every step spends part of it.

### Timeout budget (hypothetical)
- Caller deadline **400 ms**; per-attempt timeout **150 ms**
- Three attempts at 150 ms are 450 ms: the caller has already left
- Retry only if the time left covers another attempt
- Pass the remaining deadline downstream so callees can stop early

### Backoff and jitter
- **Backoff:** wait longer after each failure, 100, 200, 400 ms and so on
- **Jitter:** pick a random wait below that limit so clients do not retry in step
- **Cap** the wait and the number of attempts

### Retries multiply load
- Three attempts can mean up to **3×** traffic on a dependency that is already struggling`,
  narration:
    "A deadline is the total time the caller is willing to wait, and every step along the way spends part of it. Suppose, hypothetically, the caller's deadline is four hundred milliseconds and each attempt times out after a hundred and fifty. If we blindly allow three attempts, that is four hundred and fifty milliseconds of waiting, more than the whole deadline, so the caller has already given up before the last attempt finishes. A sensible loop checks the time left and only retries if it covers another attempt. Between attempts we do not retry immediately. Backoff means waiting longer after each failure, here a hundred milliseconds, then two hundred, then four hundred. Jitter means choosing a random wait up to that limit, so that thousands of clients that failed together do not all retry at the same instant. We also cap the wait and the number of attempts. And there is a cost to be honest about: every retry is more traffic. Three attempts can mean up to three times the load on a dependency that is already struggling, which is how retries turn a small problem into an outage.",
}
