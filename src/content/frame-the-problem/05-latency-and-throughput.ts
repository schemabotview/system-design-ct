import type { Section } from '../types'

export const latencyAndThroughput: Section = {
  id: 'latency-and-throughput',
  title: 'Latency, throughput, percentiles and capacity',
  scene: 'latency-percentiles',
  focus: 'dist',
  slide: `## Latency is not throughput

**Latency** is how long one request takes. **Throughput** is how many requests finish per second.

### Why percentiles
- The **mean** averages the slow requests away
- **p50** — half of requests are faster than this
- **p99** — 1 in 100 requests is slower than this

### Latency and load interact
- Throughput is completed requests ÷ time, such as 1,157 per second
- As a server nears its limit, requests queue and latency rises

### Introductory capacity reasoning
- Requests in flight ≈ arrival rate × mean latency
- 1,157 requests/s × 0.040 s ≈ **46 at once**
- This uses averages; it does not say how many one server can handle

The curve is illustrative, not measured.`,
  narration:
    "Latency and throughput are easy to confuse, so let us separate them. Latency is how long a single request takes. Throughput is how many requests complete every second. A system can have good throughput and still make some users wait. This is why we look at percentiles rather than the mean. The curve you see is an illustration, deliberately skewed to the right the way real latency tends to be, with a long tail of slow requests. Its median, the fiftieth percentile, is about thirty-four milliseconds, so half of requests are faster than that. The mean is forty milliseconds and looks respectable. But the ninety-ninth percentile is about a hundred and thirty-three milliseconds, which means one request in a hundred is more than three times slower than the mean suggests. If you only watch the average, you never see those users. The two are linked, too. As a server approaches its limit, requests start to queue and latency rises, so a latency target only holds up to some level of throughput. For a first capacity idea we can use Little's law: the number of requests in flight is roughly the arrival rate times the mean latency. At the peak estimate that is about forty-six requests at the same moment. Be careful with this, though. It is an average-based relationship, and it does not tell you how many requests one server can actually handle.",
}
