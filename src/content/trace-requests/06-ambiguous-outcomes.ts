import type { Section } from '../types'

export const ambiguousOutcomes: Section = {
  id: 'ambiguous-outcomes',
  title: 'Ambiguous outcomes: the response can be lost',
  scene: 'lost-response',
  focus: 'dup',
  slide: `## Success you never saw

A timeout means "no answer", **not** "it failed".

### What really happened
- The server stored the link, then the response was lost
- The client cannot tell this from "the request never arrived"

### The dilemma
- **Do not retry:** the owner may never receive a link
- **Retry:** if the operation is not idempotent, a second link appears
- Guessing is not a design: the protocol must make either choice safe

### Which operations are safe to repeat
- \`GET\` is safe; \`PUT\` and \`DELETE\` are defined as idempotent
- \`POST\` is not, so \`POST /links\` needs extra help

The failure is not in either machine. It is in the gap between them.`,
  narration:
    "Here is the uncomfortable fact behind every retry. A timeout does not mean the operation failed. It only means no answer arrived. Follow the timeline. The client sends a request to create a link. The server receives it, stores the link, and sends back the response, but somewhere on the way the response is lost. From the client's side, this looks exactly the same as the request never arriving at all. So the client faces a dilemma. If it does not retry, the owner may never receive a link, even though one exists. If it does retry and the operation is not idempotent, the server stores a second link, and now one intention has produced two effects. HTTP gives us some guidance. Reading with get is safe, and put and delete are defined as idempotent, meaning repeating them has the same effect as doing them once. Post is not, so our create operation needs extra help. Notice that nothing is broken in either machine. The problem lives in the gap between them.",
}
