import type { Scene } from '@graphlearning/flow'

// §7 — four specialised roles; for each, what it is for and whether this system needs it.
export const specialisedStores: Scene = {
  id: 'specialised-stores',
  title: 'Specialised jobs, specialised stores',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'graph',
      label: 'Graph',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'graph-job', label: 'Relationships', sub: 'paths, who follows whom', pattern: 'network', icon: 'share' },
        { id: 'graph-us', label: 'Not needed here', sub: 'no relationship queries', pattern: 'external', icon: 'ban' },
      ],
    },
    {
      id: 'ts',
      label: 'Time-series',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'ts-job', label: 'Values over time', sub: 'metrics, trends', pattern: 'service', icon: 'barchart' },
        { id: 'ts-us', label: 'Maybe: click trends', sub: 'clicks per minute', pattern: 'warn', icon: 'clock' },
      ],
    },
    {
      id: 'search',
      label: 'Search',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'search-job', label: 'Text relevance', sub: 'match, rank, filter', pattern: 'storage', icon: 'search' },
        { id: 'search-us', label: 'Maybe: link titles', sub: 'only if owners search', pattern: 'warn', icon: 'scroll' },
      ],
    },
    {
      id: 'object',
      label: 'Object storage',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'obj-job', label: 'Large files', sub: 'cheap, durable blobs', pattern: 'external', icon: 'folder' },
        { id: 'obj-us', label: 'Maybe: previews', sub: 'link preview images', pattern: 'warn', icon: 'harddrive' },
      ],
    },
  ],
  edges: [],
}
