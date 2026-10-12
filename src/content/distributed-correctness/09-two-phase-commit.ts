import type { Section } from '../types'

export const twoPhaseCommitSection: Section = {
  id: 'two-phase-commit',
  title: 'Atomic commit and two-phase commit',
  scene: 'two-phase-commit',
  focus: 'doubt',
  slide: `## All commit, or none

An **atomic commit** protocol makes several participants reach the same decision.

### Two-phase commit
- **Phase 1:** the coordinator asks each participant to prepare; each votes yes or no
- **Phase 2:** if all voted yes, it announces commit; otherwise abort

### Where it blocks
- A yes vote is a promise: the participant can no longer decide alone
- It must log the vote durably before replying
- If the coordinator crashes after the votes and before the decision, participants are **in doubt**
- They hold locks and wait for it to recover

### Consequence
- It gives atomicity, at the price of blocking
- One remedy: replicate the coordinator with consensus
- Hence the pull towards designs that avoid it`,
  narration:
    "Sometimes one operation must change data held by several participants, and either all of them must commit or none. An atomic commit protocol exists for this, and the best known is two-phase commit. In the first phase, a coordinator asks every participant to prepare, and each replies yes or no. A yes vote is a promise: the participant has made its changes durable and can no longer decide on its own. In the second phase, if every vote was yes the coordinator announces commit, and otherwise it announces abort. This gives a clean all-or-nothing outcome when everything works. The weakness is in the gap between the phases. If the coordinator crashes after the votes are in and before the decision is announced, the participants are in doubt. They cannot safely commit, because the decision might have been abort, and they cannot safely abort, because it might have been commit. So they hold their locks and wait for the coordinator to recover, and other requests queue behind them. Two-phase commit buys atomicity at the price of blocking, which is why many designs try to avoid it.",
}
