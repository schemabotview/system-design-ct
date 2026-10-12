import type { Section } from '../types'

export const traceARequest: Section = {
  id: 'trace-a-request',
  title: 'Trace a request through DNS, TCP, TLS and HTTP',
  scene: 'request-path',
  focus: 'cold-total',
  slide: `## Follow one request

Before our application runs, the client must find it, reach it and trust it. Every step costs time.

### The steps on a cold connection
- **DNS:** turn the name into an IP address
- **TCP:** open a connection, one round trip
- **TLS:** agree encryption keys, one round trip in TLS 1.3
- **HTTP:** send the request and wait for the response

### Hypothetical timings
- 20 + 30 + 30 + (30 + 10) = **120 ms** when cold
- A reused connection skips three steps: **40 ms**
- DNS answers are cached for a time the record sets, so many requests skip the lookup

### Why it matters
- A target measured at the application leaves this time out; the user still waits for it
- Reuse is why connections are kept open`,
  narration:
    "Before a single line of our application runs, the client has to find the server, reach it, and trust it, and every one of those steps costs time. First, DNS turns the name into an IP address. Then the client opens a TCP connection, which costs one round trip. Then it negotiates encryption with TLS, which costs another round trip in version one point three. Only then can it send the actual HTTP request and wait for the answer. Let us put some hypothetical timings on that. Twenty milliseconds for the name lookup, thirty for each handshake, and thirty for the request to travel plus ten for the server's work. Together that is one hundred and twenty milliseconds on a cold connection. But the next request can reuse the open connection, skipping three of those steps, and costs only about forty. This matters for the targets we set in the last chapter. A latency target measured at the application leaves all of this out, yet the visitor still waits for every millisecond of it. It is also the reason connections are kept open and reused.",
}
