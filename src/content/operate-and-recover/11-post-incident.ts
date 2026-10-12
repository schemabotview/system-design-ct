import type { Section } from '../types'

export const postIncident: Section = {
  id: 'post-incident',
  title: 'Post-incident reasoning: causes, prevention and residual risk',
  scene: 'post-incident',
  focus: 'r-accept',
  slide: `## Learn about the system, not the person

### Contributing causes, not one root cause
- The config was not validated
- It shipped to every server at once, with no canary
- The alert needed 3 minutes, and no runbook covered the symptom

### Prevention
- Validate config, roll out gradually, tighten the alert and add a runbook

### Residual risk
- Some bad changes will still pass tests
- Accept the risk, keep watching, and write that down

### Writing it up
- Timeline, impact, causes, and actions with owners and dates
- About systems, not blame`,
  narration:
    "After the incident is over, the most valuable work begins: understanding why it happened, so the next one is less likely or less damaging. A good review looks for contributing causes, plural, rather than a single root cause or a single person to blame. In our example, several things combined. The configuration value was not validated, so a bad one was accepted. The change shipped to every server at once, with no canary to catch it on a small slice. And the alert needed three minutes to fire, with no runbook for that symptom, which cost more time. Each cause suggests a preventive action. Validate configuration, roll it out gradually, tighten the alert window, and write the runbook. Then be honest about residual risk. Some bad changes will still pass every test, so we accept that risk, keep watching for it, and say so explicitly. Finally, how to write it up: a timeline, the impact, the causes, and actions with owners and dates, all written about the system and not about people. This course has described operational reasoning only. It is not an assessment of anyone's performance.",
}
