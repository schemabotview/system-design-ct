import type { Section } from '../types'

export const idempotentOperations: Section = {
  id: 'idempotent-operations',
  title: 'Design idempotent operations and safe retries',
  scene: 'idempotency-key',
  focus: 'keys',
  slide: `## Same request, same effect

An operation is **idempotent** if repeating it leaves the system as if it ran once.

### The idempotency-key contract
- The client sends a unique \`Idempotency-Key\` with each create
- The server stores the key and response **in the same transaction** as the link
- A repeat returns the stored response; no second link

### Edge cases
- Same key, different body: reject it with an error
- Two copies at once: the primary key lets only one win
- Keys expire after an assumed 24 hours
- The header is a convention, not core HTTP

### Alternative design
- \`PUT /links/{code}\` with a client-chosen code is idempotent by definition, but collisions become the client's problem`,
  narration:
    "The standard fix is an idempotency key. The client generates a unique value and sends it with each create request. On the server, inside a single database transaction, we look the key up. If it is already there, we return the stored response and do nothing else. If it is not, we create the link and record the key and the response, all in the same transaction, so that either both rows exist or neither does. That atomicity matters: without it, a crash between the two writes would leave a link with no key. A few edge cases need decisions. If the same key arrives with a different request body, that is a client bug, so we reject it. If two copies arrive at the same moment, the primary key constraint on the key lets only one insert succeed. Keys cannot be kept forever, so they expire after a stated period, which here we assume is twenty-four hours. And be aware that the header is a widely used convention rather than part of core HTTP. There is an alternative design: let the client choose the code and use put, which is idempotent by definition, though then the client must avoid collisions.",
}
