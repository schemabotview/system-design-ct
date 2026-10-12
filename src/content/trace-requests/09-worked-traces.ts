import type { Section } from '../types'

export const workedTraces: Section = {
  id: 'worked-traces',
  title: 'Worked traces: success, timeout and repetition',
  scene: 'three-traces',
  focus: 'late4',
  slide: `## Three traces

On this chapter's hypothetical timings.

### Create succeeds
- POST with a key: one row stored, **201** at t = 40 ms on a warm connection

### Create times out, then retries
- t = 0 send, t = 150 timeout, wait 60 ms of jitter
- t = 210 retry with the **same key**; t = 250 the stored 201 is replayed
- One link exists, and the client holds its code
- Deadline check: 400 − 210 = 190 ms left, enough for a 150 ms attempt

### Redirect repeated
- \`GET /aZ3k9Q\` again returns the same 302; repeating a read changes nothing

### What the chapter built
- Deadlines, jittered retries and an idempotency key only work **together**`,
  narration:
    "Let us finish by running three traces through everything in this chapter, on our hypothetical timings. In the first, the create request goes out with an idempotency key, the server stores one row, and a two-hundred-and-one comes back at forty milliseconds on a warm connection. Nothing surprising. In the second, the same request is sent at time zero, but no answer arrives, so the client gives up at a hundred and fifty milliseconds. It waits a jittered sixty milliseconds, then retries at two hundred and ten with the same key. The server finds the key already stored and replays the saved response, so at two hundred and fifty milliseconds the client holds the code, and exactly one link exists. In the third trace, a visitor repeats a get for the short code, and every time they receive the same redirect, because repeating a read changes nothing. Notice that none of the three mechanisms is enough alone. A deadline with no idempotency would create duplicates, and an idempotency key with no deadline would wait forever. The interfaces we have traced all operate on persistent information, so next we turn to how that state should be modelled and stored.",
}
