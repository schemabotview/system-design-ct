import type { Section } from '../types'

export const clickAnalyticsCase: Section = {
  id: 'click-analytics-case',
  title: 'Worked case: click analytics, notifications and recovery',
  scene: 'click-pipeline',
  focus: 'dlq',
  slide: `## Worked case: click analytics

### The flow
- The redirect service writes each click event with its **outbox** (chapter 5)
- Topic \`clicks\`, partitioned by link code
- Two consumer groups: rollup counts and milestone notifications

### Failure behaviour
- Consumer crash: resume from the committed offset; duplicates skipped by event id
- Poison event: five tries, then dead-lettered and an alert
- Rollup falls behind: dashboards go stale for minutes, accepted
- Rebuild: replay the retained log into a fresh rollup

### The decision
- The redirect never waits for analytics, so a slow consumer cannot slow a visitor
- Watch consumer lag, dead-letter depth and oldest-message age`,
  narration:
    "Let us finish by assembling the pieces for click analytics and notifications. When a visitor follows a link, the redirect service records a click event, and it writes that event using the transactional outbox from chapter five, so the event cannot be lost between the database and the broker. The event carries a unique identifier. A relay publishes it to a topic called clicks, which has three partitions keyed by link code, so each link's clicks stay in order. Two consumer groups each receive a copy. One builds daily counts per link, and the other sends milestone notifications. Now trace the failures. If a consumer crashes, it resumes from its committed offset, and any duplicate is skipped using the event identifier. If an event is poison, it is retried five times and then dead-lettered, and an alert fires. If the rollup falls behind, dashboards show stale numbers for a few minutes, which we have decided is acceptable. Most importantly, the redirect never waits for analytics, so a slow consumer cannot slow down a visitor. Next, we decide which responsibilities should live together and which should be separate services.",
}
