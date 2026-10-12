import type { Scene } from '@graphlearning/flow'

// §2 — the same failure seen through three signals, joined by a trace id. All values are illustrative.
export const signals: Scene = {
  id: 'signals',
  title: 'One trace id, three views',
  flow: 'TB',
  nodes: [
    {
      id: 'alert',
      kind: 'code',
      filename: 'alert-rule.txt',
      label: `ALERT RedirectErrorRatio
  if  error_ratio > 0.02  for 3m      # a symptom users feel
  do  page on-call, link runbook`,
    },
    {
      id: 'log',
      kind: 'code',
      filename: 'app.log',
      label: `09:04:12 ERROR trace=9f3c code=aZ3k9Q db timeout after 1000 ms
09:04:12 ERROR trace=a41b code=bY7m2P db timeout after 1000 ms`,
    },
    {
      id: 'trace',
      kind: 'code',
      filename: 'trace-9f3c.txt',
      label: `GET /aZ3k9Q                      1,204 ms
  edge                               3 ms
  app                            1,198 ms
    database query               1,150 ms   timeout`,
    },
  ],
  edges: [
    { source: 'alert', target: 'log', label: 'metric says: look here' },
    { source: 'log', target: 'trace', label: 'trace id 9f3c' },
  ],
}
