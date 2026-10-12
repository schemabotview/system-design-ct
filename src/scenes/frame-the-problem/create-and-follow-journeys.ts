import type { Scene } from '@graphlearning/flow'

// §2 — the two user journeys that generate every functional requirement. Each step is a
// requirement waiting to be written down; the failure branch ("not found") is one the journey
// does not mention until somebody asks what happens when the code is wrong.
export const createAndFollowJourneys: Scene = {
  id: 'create-and-follow-journeys',
  title: 'Two journeys, six requirements',
  flow: 'LR',
  nodes: [
    {
      id: 'create',
      label: 'Journey 1 — create a link',
      pattern: 'user',
      flow: 'TB',
      children: [
        { id: 'submit', label: 'Submit URL', sub: 'owner sends a long URL', pattern: 'user', icon: 'link' },
        { id: 'validate', label: 'Validate', sub: 'well formed, allowed', pattern: 'service', icon: 'circlecheck' },
        { id: 'store', label: 'Store mapping', sub: 'code to long URL', pattern: 'storage', icon: 'database' },
        { id: 'reply', label: 'Return code', sub: 'short URL to share', pattern: 'user', icon: 'tag' },
      ],
      edges: [
        { source: 'submit', target: 'validate' },
        { source: 'validate', target: 'store' },
        { source: 'store', target: 'reply' },
      ],
    },
    {
      id: 'follow',
      label: 'Journey 2 — follow a link',
      pattern: 'network',
      flow: 'TB',
      children: [
        { id: 'open', label: 'Open short URL', sub: 'visitor sends a code', pattern: 'user', icon: 'search' },
        { id: 'lookup', label: 'Look up code', sub: 'find the long URL', pattern: 'storage', icon: 'database' },
        { id: 'redirect', label: 'Redirect', sub: 'send visitor onward', pattern: 'network', icon: 'share' },
        { id: 'missing', label: 'Unknown code', sub: 'must answer clearly', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'open', target: 'lookup' },
        { source: 'lookup', target: 'redirect', label: 'found' },
        { source: 'lookup', target: 'missing', label: 'not found', dashed: true },
      ],
    },
  ],
  edges: [{ source: 'create', target: 'follow', label: 'same mapping', dashed: true }],
}
