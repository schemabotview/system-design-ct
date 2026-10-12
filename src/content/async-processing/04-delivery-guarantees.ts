import type { Section } from '../types'

export const deliveryGuarantees: Section = {
  id: 'delivery-guarantees',
  title: 'Delivery guarantees and the scope of exactly-once claims',
  scene: 'delivery',
  focus: 'g-exact',
  slide: `## What a delivery guarantee promises

### Where the acknowledgement sits
- **At most once:** ack first; a crash loses the message
- **At least once:** ack last; a crash causes a duplicate
- **Exactly once:** usually means *effectively* once
- A crash before the effect is harmless; one after it, before the ack, duplicates

### Scope of exactly-once claims
- Often limited to work inside one system, such as read-process-write within a single store
- An outside effect, like an email or a card charge, is beyond it
- Do not assume it holds across two systems

### What to do
- Choose **at least once**, and make the consumer **idempotent**`,
  narration:
    "A delivery guarantee describes what happens when something crashes, and the answer depends on where the acknowledgement sits relative to the work. Look at the consumer. It receives a message, applies the effect, and acknowledges. If it crashes before the effect, nothing happened and redelivery is harmless. If it crashes after the effect but before the acknowledgement, the broker will deliver the message again, and the effect is duplicated. Now compare the three guarantees. At most once acknowledges first, so a crash loses the message. At least once acknowledges last, so a crash repeats it. Exactly once sounds ideal, but treat the phrase with suspicion. It usually means effectively once, and its scope is often limited to work inside one system, such as reading from a log and writing back to the same store. An outside effect, like sending an email or charging a card, is beyond that boundary. So the practical choice is to use at least once delivery, and make the consumer idempotent so that a duplicate does no harm.",
}
