import type { Section } from '../types'

export const messagingModelsSection: Section = {
  id: 'messaging-models',
  title: 'Queues, publish/subscribe and retained event streams',
  scene: 'messaging-models',
  focus: 'choose',
  slide: `## Three ways to move work

Products blur these lines; the questions stay the same.

### Queue
- Each message goes to **one** consumer and is deleted once acknowledged
- Good for tasks, such as sending an email; add workers to scale

### Publish/subscribe
- Every subscriber receives its **own copy**
- Good for fan-out: analytics and notifications both want each click

### Retained event stream
- An append-only log kept for a retention period; readers track their position and can **replay**
- Reading does not remove anything

### Choosing
- Work for one worker: queue; many independent readers: pub/sub; reprocessing needed: stream`,
  narration:
    "So far, our redirect service has answered everything synchronously. But some work does not need to happen while the visitor waits, such as counting clicks or sending notifications. For that we move messages between components, and there are three common shapes. A queue gives each message to exactly one consumer and deletes it once it is acknowledged. That suits tasks, like sending an email. Publish and subscribe gives every subscriber its own copy of each message, which suits fan-out: our analytics and our notifications both want to hear about each click. A retained event stream is an append-only log kept for some retention period. Readers track their own position in it, and can go back and replay. Real products blur these lines, so rather than memorising product names, ask the questions. Who should receive each message? What happens to it afterwards? Do we ever need to read it again? If the work is for one worker, use a queue. If many independent readers need it, use publish and subscribe. If you may need to reprocess, keep a stream.",
}
