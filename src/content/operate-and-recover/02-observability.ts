import type { Section } from '../types'

export const observability: Section = {
  id: 'observability',
  title: 'Logs, metrics, traces and actionable alerts',
  scene: 'signals',
  focus: 'trace',
  slide: `## Observe, then alert on symptoms

### Three signals
- **Metrics:** numbers over time; cheap, ideal for alerts
- **Logs:** discrete events with detail
- **Traces:** one request's path through the system
- Metrics say whether something is wrong; logs and traces say why

### Correlate them
- A shared **trace id** links the alert, the log line and the slow span
- Log structured fields, and sample traces to control cost

### Actionable alerts
- Alert on what users feel: error ratio above 2 % for 3 minutes
- Every page needs an owner, a runbook and an action to take
- Causes, such as high CPU, belong on dashboards or tickets, not pages`,
  narration:
    "When something goes wrong, you can only fix what you can see, and there are three kinds of signal. Metrics are numbers over time, which makes them cheap and ideal for alerting. Logs are discrete events with detail, such as a particular failure and its error message. Traces follow one request through the whole system, showing where its time went. They are most useful when they are joined together. Look at the example. An alert rule watches the error ratio and pages when it stays above two percent for three minutes. That tells us something is wrong. The log lines show database timeouts and carry a trace identifier. And the trace for that identifier shows that almost all of a twelve-hundred-millisecond request was spent in one database query. Following the identifier took us from symptom to cause. A word about alerts. A good alert is actionable: it describes something users feel, it has an owner, it links a runbook, and it asks someone to do something now. Causes like high processor use belong on dashboards or in tickets, because paging people for things that need no action teaches them to ignore pages.",
}
