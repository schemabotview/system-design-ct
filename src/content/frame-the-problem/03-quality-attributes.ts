import type { Section } from '../types'

export const qualityAttributes: Section = {
  id: 'quality-attributes',
  title: 'Quality attributes and acceptance criteria',
  scene: 'quality-criteria',
  slide: `## Make quality measurable

A quality attribute describes **how well** the system must behave, not what it does.

### A criterion needs four things
- **What** is measured: redirect latency
- **Where** it is measured: at the application
- **How much** is acceptable: 99% under 100 ms
- **Over what window:** each 30 days

### Why the wish is not enough
- "Fast" cannot be met or missed — "99% under 100 ms" can
- Every number here is an **assumed target**, not a recommendation
- Targets conflict: stronger durability usually costs latency or money

Write the criterion before choosing the architecture that must satisfy it.`,
  narration:
    "Functional requirements say what the system does. Quality attributes say how well it has to do it, and they are where most architecture decisions actually come from. The trouble is that wishes like fast, reliable, or safe cannot be met or missed. So each one gets turned into an acceptance criterion with four parts: what is measured, where it is measured, how much is acceptable, and over what window of time. Ninety-nine percent of redirects answered in under one hundred milliseconds, measured at the application over thirty days, is a sentence you can check against real data. Every figure in this table is an assumed target for the lesson, not advice about what any real service should promise. Notice also that the targets pull against each other. Making sure a confirmed link survives the loss of a machine usually costs some latency or some money, so we will have to choose. The habit to build is simple: write the criterion first, then judge any architecture by whether it can satisfy it.",
}
