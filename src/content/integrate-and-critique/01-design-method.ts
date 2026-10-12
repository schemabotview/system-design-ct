import type { Section } from '../types'

export const designMethodSection: Section = {
  id: 'design-method',
  title: 'The complete design method and the decision record',
  scene: 'design-method',
  focus: 'd-rec',
  slide: `## One method for every design

### Four stages
- **Understand:** requirements, then estimates
- **Shape:** API and data, then the simplest architecture that fits
- **Stress:** find the dominant bottleneck, then trace failures
- **Decide:** compare alternatives and cost, and record the decision

### The decision record
- The question and the context, with assumptions
- The options considered, and the choice
- **Why**, in terms of requirements and evidence
- When to **revisit**

### Habits that carry through
- State every assumption and label every estimate
- Start simple; add a mechanism only for a named requirement
- Say what the design does when each part fails`,
  narration:
    "Over eight chapters we have built up a set of ideas. Now we put them into a single repeatable method with four stages. First, understand the problem: write down the requirements, functional and quality, and then estimate traffic, data, and peak demand. Second, shape the solution: define the operations and the data, and choose the simplest architecture that fits. Third, stress it: find the dominant bottleneck, the thing that saturates first, and trace what happens when each part fails. Fourth, decide: compare the alternatives, including their cost, and record the decision. A decision record is short. It states the question and the context along with the assumptions, the options that were considered, the choice, why it was chosen in terms of requirements and evidence, and when to revisit it. That last part matters, because the right answer today may not be the right answer when the workload or the requirements change. A few habits carry through every stage. State your assumptions and label your estimates. Start simple, and add a mechanism only for a named requirement. And always say what the design does when each part fails.",
}
