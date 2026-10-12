import type { Section } from '../types'

export const partitionsAndGroups: Section = {
  id: 'partitions-and-groups',
  title: 'Partitions, consumer groups, ordering scope and retention',
  scene: 'partitions',
  focus: 'noorder',
  slide: `## Partitions give order and parallelism

### Partitions and keys
- A topic is split into partitions; each is an **ordered** log
- Messages with the same **key**, here the link code, go to the same partition

### Consumer groups
- Each partition is read by one consumer in a group
- Add consumers, up to the number of partitions, to scale
- When one joins or leaves, partitions are reassigned

### Ordering scope
- Order holds **within** a partition, not across partitions
- One link's clicks stay in order; there is no global order

### Retention
- Retention, assumed 7 days, bounds how far back anyone can replay`,
  narration:
    "A single log can only be read so fast, so streams are split into partitions. A topic of clicks, for example, might have three partitions, and each partition is an ordered log. When the producer publishes an event, it chooses a key, and here the key is the link code. Messages with the same key always go to the same partition. That is how we keep one link's events in order. A consumer group then reads the topic together. Each partition is read by exactly one consumer in the group, so adding consumers scales the work, up to the number of partitions. Notice the ordering scope. Order holds within a partition, not across them, so one link's clicks stay in order, but there is no global order across all links. That is usually all we need, but you must decide it deliberately. Finally, retention bounds how far back anyone can replay. We assume seven days. And remember skew from chapter four: one very popular link means one very busy partition, however many partitions we add.",
}
