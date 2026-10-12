import type { Section } from '../types'

export const poisonMessages: Section = {
  id: 'poison-messages',
  title: 'Retries, poison messages and dead-letter recovery',
  scene: 'dead-letters',
  focus: 'hu-redrive',
  slide: `## Failures that never succeed

### Retry with care
- Retry transient failures with backoff and jitter (chapter 2), up to a limit such as 5

### Poison messages
- A message that always fails can block a partition or loop forever
- After the limit, move it to a **dead-letter queue**

### Recovery
- Alert on dead-letter depth
- Keep the failure reason with each dead letter
- Inspect, fix the code or the data, then **redrive**
- Redrive is safe only because consumers are idempotent

### Order
- Moving a message aside breaks strict order for that key; decide if that is acceptable
- Dead letters need their own retention`,
  narration:
    "Not every failure is temporary. Most are, so the first response is to retry with backoff and jitter, as we saw in chapter two, up to a limit, which we assume is five attempts. Usually a retry succeeds. But some messages fail every single time, perhaps because their content is malformed or triggers a bug. These are poison messages. If we retry them forever, they loop endlessly, and in an ordered partition they can block everything behind them. So after the limit, we move the message aside into a dead-letter queue. It is parked, not lost. Then the recovery is a human process. An alert fires when the dead-letter queue has messages in it. Someone inspects them, fixes the code or the data, and then redrives the messages back into the main flow. That redrive is only safe because our consumers are idempotent, so reprocessing a message that was partly handled does no harm. One more consequence: moving a message aside breaks strict ordering for that key, so you need to decide whether that is acceptable for your data.",
}
