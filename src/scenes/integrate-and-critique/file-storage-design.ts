import type { Scene } from '@graphlearning/flow'

// §4 — an integrated design of file upload and download. All numbers are ASSUMED: 1 M uploads/day × 5 MB
// = 5 TB/day ≈ 58 MB/s average, ≈ 1.8 PB/year; storage priced at an assumed $0.02 per GB-month, so the
// first year's data costs 1,825,000 GB × $0.02 ≈ $36,500 a month once it has all accumulated.
export const fileStorageDesign: Scene = {
  id: 'file-storage-design',
  title: 'An integrated design: file storage',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'flow',
      label: 'Request flow',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'f-start', label: 'Start upload', sub: 'API returns signed URLs', pattern: 'service', icon: 'key' },
        { id: 'f-send', label: 'Send chunks direct', sub: 'client to object store', pattern: 'network', icon: 'cloud' },
        { id: 'f-commit', label: 'Commit', sub: 'verify, then write metadata', pattern: 'storage', icon: 'database' },
        { id: 'f-get', label: 'Download via CDN', sub: 'cached close to users', pattern: 'network', icon: 'globe' },
      ],
      edges: [
        { source: 'f-start', target: 'f-send' },
        { source: 'f-send', target: 'f-commit', label: 'all parts in' },
        { source: 'f-commit', target: 'f-get' },
      ],
    },
    {
      id: 'est',
      label: 'Estimates (assumed)',
      pattern: 'user',
      cols: 1,
      children: [
        { id: 'e-day', label: '5 TB a day', sub: '1 M uploads × 5 MB', pattern: 'user', icon: 'sigma' },
        { id: 'e-bw', label: '≈ 58 MB / s', sub: 'average upload rate', pattern: 'user', icon: 'waves' },
        { id: 'e-yr', label: '≈ 1.8 PB a year', sub: 'before any deletion', pattern: 'user', icon: 'harddrive' },
        { id: 'e-cost', label: '≈ $36,500 / month', sub: 'at $0.02 per GB-month', pattern: 'warn', icon: 'receipt' },
      ],
    },
    {
      id: 'fail',
      label: 'Failure behaviour',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'x-cut', label: 'Upload interrupted', sub: 'resume from the last part', pattern: 'warn', icon: 'repeat' },
        { id: 'x-order', label: 'Blob first, then row', sub: 'no row without a file', pattern: 'warn', icon: 'merge' },
        { id: 'x-orph', label: 'Orphans swept', sub: 'unreferenced blobs deleted', pattern: 'warn', icon: 'trash' },
      ],
    },
    {
      id: 'alt',
      label: 'Alternatives rejected',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'a-db', label: 'Files in the database', sub: 'bloats and slows it', pattern: 'external', icon: 'ban' },
        { id: 'a-proxy', label: 'Proxy the bytes', sub: 'API becomes the pipe', pattern: 'external', icon: 'ban' },
        { id: 'a-disk', label: 'Self-managed disks', sub: 'durability is our job', pattern: 'external', icon: 'ban' },
      ],
    },
  ],
  edges: [],
}
