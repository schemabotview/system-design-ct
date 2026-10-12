import type { Section } from '../types'

export const workedIncident: Section = {
  id: 'worked-incident',
  title: 'Worked incident: reading an outage timeline',
  scene: 'incident-timeline',
  focus: 'a-fail',
  slide: `## Worked incident: a bad config

All times and rates are assumed.

### Timeline
- 09:00 a config change ships to every server at once
- 09:04 redirects begin to fail; 09:07 the alert pages
- 09:20 cause found; 09:25 rollback starts; 09:31 recovered

### Impact
- 27 minutes at 231 requests/s: about 375,000 failures
- That is **62.5 %** of the monthly error budget
- Of the 27 minutes: 3 to detect, 13 to find the cause, 11 to recover
- Recovery speed depends on what was prepared in advance

### Alternatives compared
- **Roll back:** known good, fastest (chosen)
- **Fix forward:** unknown time, adds risk
- **Fail over to region B:** no help, the same config is there`,
  narration:
    "Let us read an outage timeline, using assumed times. At nine o'clock a configuration change ships to every server at once. At four minutes past, redirects begin to fail. The alert fires at seven minutes past, because the rule needed three minutes above two percent. The on-call engineer finds the cause, a bad connection limit in the configuration, at twenty past. Rollback begins at twenty-five past, and service is restored at thirty-one minutes past. So the impact lasted twenty-seven minutes. At our average rate of two hundred and thirty-one requests a second, that is about three hundred and seventy-five thousand failed requests, which uses sixty-two and a half percent of the monthly error budget in a single morning. Now compare the recovery alternatives. Rolling back returns us to a known good state and is the fastest, so it was chosen. Fixing forward means writing and testing a new change under pressure, with unknown time and new risk. And failing over to a second region would not help at all, because the same bad configuration is deployed there too. Failover protects against failed infrastructure, not against a faulty change.",
}
