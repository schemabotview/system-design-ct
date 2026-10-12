import type { Section } from '../types'

export const clickModelComparison: Section = {
  id: 'click-model-comparison',
  title: 'Worked comparison: link and click-event models',
  scene: 'click-models',
  focus: 'hybrid',
  slide: `## Recording clicks: three models

### Assumed workload (chapter 1)
- 20 million redirects a day: 231/s average, 1,157/s at peak

### Three models
- **A, row per click:** about 730 GB a year at an assumed 100 bytes a row
- **B, counter on the link:** tiny, but hot rows and no history
- **C, events plus daily rollup:** raw for 13 months, dashboards read the rollup

### Supplied bottleneck
- A per-day click query takes 8 s; the plan shows a full scan (supplied, hypothetical)
- Fixes: index \`(code, clicked_at)\`, or read the rollup

### Decision
- **C**, if dashboards matter; revisit with measurements
- Rollup lag and the 13-month retention become requirements to test`,
  narration:
    "Let us finish by comparing three ways to record clicks, using the workload we assumed in chapter one: twenty million redirects a day, which is about two hundred and thirty-one writes a second on average and over eleven hundred at peak. In model A, every click is a row. At an assumed hundred bytes a row, that is about seven hundred and thirty gigabytes a year, but we keep the raw history and can answer any question later, provided we index it. In model B, we keep a single counter on each link. Storage is tiny and reads are cheap, but a popular link becomes a hot row that every click must update, and we lose all history, so we cannot answer how many clicks per day. Model C keeps raw events for thirteen months and also maintains a daily rollup per code, so dashboards read the small table. The cost is another moving part that can lag. Now suppose we are supplied this evidence: a per-day click query takes eight seconds and the plan shows a full scan. An index on code and click time fixes that query, and the rollup avoids it entirely. We choose C if dashboards matter, and we revisit the decision once we have real measurements. Next, we make the system scale where the evidence says it must.",
}
