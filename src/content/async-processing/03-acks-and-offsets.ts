import type { Section } from '../types'

export const acksAndOffsets: Section = {
  id: 'acks-and-offsets',
  title: 'Queue acknowledgement versus stream offsets',
  scene: 'progress',
  focus: 'o-replay',
  slide: `## Acknowledgement or offset

### Queue acknowledgement
- The broker tracks each message; an ack deletes it
- Unacknowledged messages are redelivered
- Once acknowledged, there is no replay

### Stream offsets
- The log stays; the consumer commits an **offset**, its position
- Rewind the offset to replay: a bug fix, or a new view

### Progress is a position
- Commit the offset only **after** the effect, or a crash loses the effect
- The offset is the consumer's record of progress, not the broker's

### Trade-off
- A queue forgets what it delivered; a stream remembers, at the cost of storage`,
  narration:
    "The two shapes record a consumer's progress in different ways, and that difference decides what you can do after something goes wrong. In a queue, the broker tracks each message. It delivers a message, the consumer works on it, and when the consumer sends an acknowledgement the broker deletes it. If the consumer never acknowledges, the broker redelivers it. Once acknowledged, the message is gone, so there is no replay. In a stream, the log is untouched. The consumer reads at an offset, which is simply its position in the log, does its work, and then commits the next offset. Because the log is retained, the consumer can rewind the offset and replay, for example after fixing a bug or to build a new view. Notice one subtle point. The offset must be committed only after the effect has been applied. If we commit first and crash, the effect is lost, because the consumer will resume past it. So progress is a position, owned by the consumer, and the trade-off is simple: a queue forgets what it delivered, while a stream remembers, at the cost of storage.",
}
