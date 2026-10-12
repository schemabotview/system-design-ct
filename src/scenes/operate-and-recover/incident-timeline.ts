import type { Scene } from '@graphlearning/flow'

// §10 — a worked incident on ASSUMED timings. Impact 09:04–09:31 = 27 min = 1,620 s; at the 231/s average
// rate that is ≈ 375,000 failed requests, 62.5 % of the 600,000 monthly budget.
export const incidentTimeline: Scene = {
  id: 'incident-timeline',
  title: 'A bad config, minute by minute',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'tl',
      label: 'Timeline',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'i-ship', label: '09:00 config ships', sub: 'to every server at once', pattern: 'service', icon: 'package' },
        { id: 'i-err', label: '09:04 errors begin', sub: 'redirects fail', pattern: 'warn', icon: 'bug' },
        { id: 'i-page', label: '09:07 alert pages', sub: '3 min above 2 %', pattern: 'network', icon: 'bell' },
        { id: 'i-find', label: '09:20 cause found', sub: 'bad connection limit', pattern: 'service', icon: 'search' },
        { id: 'i-back', label: '09:25 rollback starts', sub: 'previous config', pattern: 'storage', icon: 'history' },
        { id: 'i-ok', label: '09:31 recovered', sub: '27 min of impact', pattern: 'storage', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'i-ship', target: 'i-err' },
        { source: 'i-err', target: 'i-page' },
        { source: 'i-page', target: 'i-find' },
        { source: 'i-find', target: 'i-back' },
        { source: 'i-back', target: 'i-ok' },
      ],
    },
    {
      id: 'alts',
      label: 'Recovery alternatives',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'a-roll', label: 'Roll back the config', sub: 'known good, chosen', pattern: 'storage', icon: 'circlecheck' },
        { id: 'a-fwd', label: 'Fix forward', sub: 'unknown time, new risk', pattern: 'warn', icon: 'wrench' },
        { id: 'a-fail', label: 'Fail over to region B', sub: 'no help: same config', pattern: 'warn', icon: 'ban' },
        { id: 'a-cost', label: 'Budget cost: 62.5 %', sub: '375,000 of 600,000', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [],
}
