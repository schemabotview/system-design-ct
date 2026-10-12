import type { Section } from '../types'

export const slisSlos: Section = {
  id: 'slis-slos',
  title: 'SLIs, SLOs, SLAs, error budgets and capacity margins',
  scene: 'error-budget',
  focus: 't-slo',
  slide: `## Turn "reliable" into numbers

### SLI, SLO, SLA
- **SLI:** a measured ratio, good events ÷ valid events, over a stated window
- **SLO:** the internal target for that ratio
- **SLA:** a contract with consequences, usually looser than the SLO

### Worked example (assumed)
- 600 million redirects in 30 days; SLO 99.9 %
- Error budget: 0.1 % = **600,000** failed requests
- This month 150,000 failed: SLI 99.975 %, **25 %** of the budget spent

### Using the budget
- Budget left: ship changes; budget gone: slow down and fix reliability

### Capacity margin
- Keep peak utilisation under about 70 %: 1,157 ÷ 0.7 ≈ 1,653 req/s`,
  narration:
    "Reliability is only useful once it is a number that someone can check. A service level indicator, or SLI, is a measured ratio: good events divided by valid events, over a stated window. The definition must say exactly what counts, and our assumed one counts redirect requests at the load balancer, with server errors as the failures. A service level objective, or SLO, is the target for that ratio. A service level agreement, or SLA, is a contract with consequences, and it is usually looser than the internal objective so that you have room before you owe anyone anything. Here is a worked example with assumed numbers. Six hundred million redirects in thirty days, and an objective of ninety-nine point nine percent. The error budget is the point one percent that is left, which is six hundred thousand failed requests. If one hundred and fifty thousand have failed this month, the indicator is ninety-nine point nine seven five percent and a quarter of the budget is spent. The budget guides decisions: while some remains, ship changes; when it is gone, slow down and fix reliability. Finally, keep a capacity margin. Using the queueing intuition from chapter four, we plan to stay under about seventy percent utilisation at peak.",
}
