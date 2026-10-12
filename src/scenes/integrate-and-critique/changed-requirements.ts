import type { Scene } from '@graphlearning/flow'

// §2 — the URL shortener under CHANGED requirements. ASSUMED: traffic grows 10× to 200 M redirects/day
// (200,000,000 ÷ 86,400 ≈ 2,315/s average, ×5 peak ≈ 11,574/s), and abusive links must stop redirecting
// within 5 s. At an 80 % hit rate the database sees ≈ 11,574 × 0.2 ≈ 2,315 reads/s, ten times chapter 4's 231.
export const changedRequirements: Scene = {
  id: 'changed-requirements',
  title: 'Revisiting a decision',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'before',
      label: 'Before (chapter 4)',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'b-load', label: 'Peak 1,157 / s', sub: '231 / s reach the DB', pattern: 'storage', icon: 'gauge' },
        { id: 'b-cache', label: 'Cache-aside, 60 s TTL', sub: 'staleness up to a minute', pattern: 'storage', icon: 'copy' },
        { id: 'b-db', label: 'One primary', sub: 'plus read replicas', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'change',
      label: 'What changed (assumed)',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'c-load', label: 'Traffic grows 10×', sub: 'peak ≈ 11,574 / s', pattern: 'warn', icon: 'zap' },
        { id: 'c-take', label: 'Takedown in 5 s', sub: 'abusive links must stop', pattern: 'warn', icon: 'ban' },
        { id: 'c-clash', label: 'A 60 s TTL breaks it', sub: 'stale redirects persist', pattern: 'warn', icon: 'clock' },
      ],
    },
    {
      id: 'after',
      label: 'After (revised)',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'a-purge', label: 'Purge on takedown', sub: 'event invalidates caches', pattern: 'service', icon: 'trash' },
        { id: 'a-ttl', label: 'Keep a 60 s TTL', sub: 'safety net, not the rule', pattern: 'service', icon: 'clock' },
        { id: 'a-read', label: '≈ 2,315 DB reads / s', sub: 'more read replicas', pattern: 'service', icon: 'copy' },
      ],
    },
    {
      id: 'later',
      label: 'Still unresolved',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'l-fail', label: 'Purge can fail', sub: 'TTL bounds the damage', pattern: 'external', icon: 'bug' },
        { id: 'l-shard', label: 'No sharding yet', sub: 'revisit if writes grow', pattern: 'external', icon: 'boxes' },
        { id: 'l-cost', label: 'More replicas cost more', sub: 'watch the bill', pattern: 'external', icon: 'receipt' },
      ],
    },
  ],
  edges: [],
}
