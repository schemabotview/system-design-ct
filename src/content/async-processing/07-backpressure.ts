import type { Section } from '../types'

export const backpressureSection: Section = {
  id: 'backpressure',
  title: 'Backpressure, batching and materialised views',
  scene: 'backlog',
  focus: 'queue',
  slide: `## When work arrives faster than it is done

### Backlog arithmetic (assumed)
- Arrival peaks at 1,157/s; consumers handle 1,000/s
- The backlog grows 157/s: after a 10-minute burst, **94,200** messages wait
- Arrival then falls to 231/s, so it drains at 769/s, in about **122 s**

### Responses
- **Backpressure:** slow or reject producers when queues are long
- **Batching:** many messages per call; more throughput, more latency
- **Materialised views:** precompute what readers need
- Add consumers, up to the partition count

### Watch
- Queue depth and the age of the oldest message`,
  narration:
    "Asynchronous systems have a new failure mode: the work arrives faster than it is done. Here is the arithmetic, using assumed rates. At our peak, one thousand one hundred and fifty-seven messages a second arrive, but the consumers can only handle one thousand. The backlog therefore grows by one hundred and fifty-seven a second, and after a ten-minute burst, ninety-four thousand two hundred messages are waiting. That is not a disaster by itself. When the burst ends and arrival falls back to two hundred and thirty-one a second, the consumers have spare capacity of seven hundred and sixty-nine a second, and the backlog drains in about a hundred and twenty-two seconds. But you must watch how old the oldest message is, because that is the delay users feel. There are three standard responses. Backpressure slows or rejects producers when queues grow long. Batching processes many messages per call, which raises throughput at the cost of latency. And materialised views precompute what readers need, so reads do not wait on the backlog. Watch queue depth and the age of the oldest message.",
}
