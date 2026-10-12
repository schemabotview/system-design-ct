import type { Scene } from '@graphlearning/flow'

// §1 — an SLI is a measured ratio with an explicit denominator and window; the SLO is the target; the
// error budget is what the target leaves. ASSUMED: 20 M redirects/day × 30 days = 600 M valid requests;
// 150,000 failed. 0.1 % of 600 M = 600,000. SLA is a separate, looser, contractual promise.
export const errorBudget: Scene = {
  id: 'error-budget',
  title: 'From a ratio to a budget',
  flow: 'TB',
  nodes: [
    {
      id: 'calc',
      kind: 'code',
      filename: 'availability-sli.txt',
      label: `window  = 30 days
valid   = 600,000,000 redirects
          (counted at the load balancer)
failed  = 150,000 (server errors only)
SLI     = (600,000,000 - 150,000)
          / 600,000,000 = 99.975 %
SLO     = 99.9 %, so budget = 0.1 %
        = 600,000 failed requests
spent   = 150,000 / 600,000 = 25 %`,
    },
    {
      id: 'terms',
      label: 'Three terms, three jobs',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 't-sli', label: 'SLI', sub: 'what we measure', pattern: 'service', icon: 'gauge' },
        { id: 't-slo', label: 'SLO', sub: 'the target we hold', pattern: 'storage', icon: 'circlecheck' },
        { id: 't-sla', label: 'SLA', sub: 'a contract, looser', pattern: 'warn', icon: 'receipt' },
      ],
    },
    {
      id: 'margin',
      kind: 'code',
      filename: 'capacity-margin.txt',
      label: `peak load      = 1,157 req/s   (chapter 1)
target busy    = 70 %          (assumed)
capacity needed
  = 1,157 / 0.70
  = 1,653 req/s`,
    },
  ],
  edges: [
    { source: 'calc', target: 'terms', label: 'defines' },
    { source: 'terms', target: 'margin', label: 'plus headroom' },
  ],
}
