import type { Section } from '../types'

export const keepOrExtract: Section = {
  id: 'keep-or-extract',
  title: 'Worked comparison: retaining a monolith versus extracting a subsystem',
  scene: 'decision-record',
  focus: 'adr',
  slide: `## Worked comparison: keep or extract?

### The question
- Should analytics become its own service?

### Evidence (assumed)
- One team; 231/s average, 1,157/s at peak
- Click processing is already asynchronous (chapter 6)

### Option A: extract
- Gains independent scaling and releases
- Costs network failures, contract versions, on-call load, split data

### Option B: stay, enforce the module boundary
- Cheap; keeps transactions local

### Decision record
- **B: stay.** Revisit if analytics needs its own scale, owner or release cadence`,
  narration:
    "Let us end with a worked decision, and the right answer here is to keep things as they are. The question is whether analytics should become its own service. The evidence we have, all assumed, is that one team owns the system, the load is two hundred and thirty-one requests a second on average and eleven hundred and fifty-seven at peak, and click processing is already asynchronous, as we designed in chapter six. Option A is to extract an analytics service. That would gain independent scaling and independent releases, but it would cost network failures, contract versions to maintain, on-call load, and data split across two stores with no shared transaction. Option B is to stay inside the modular monolith and enforce the module boundary, which is cheap and keeps transactions local. Nothing in the evidence shows a benefit from extraction, so we choose B, and we write that down in a decision record. The record also says when to revisit: if analytics needs its own scale, its own owner, or its own release cadence. Next, we make the whole system observable, secure, and recoverable.",
}
