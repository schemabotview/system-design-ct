import type { Scene } from '@graphlearning/flow'

// §2 — each invariant is enforced by a database mechanism, not by hoping the application is careful.
// The 2,048-character limit is an ASSUMED rule for the lesson.
export const invariants: Scene = {
  id: 'invariants',
  title: 'Rules the database enforces',
  flow: 'TB',
  nodes: [
    {
      id: 'ddl',
      kind: 'code',
      filename: 'links.sql',
      label: `-- PostgreSQL-style SQL (dialect assumed)
CREATE TABLE links (
  code       VARCHAR(10) PRIMARY KEY,
  long_url   TEXT        NOT NULL CHECK (length(long_url) <= 2048),
  owner_id   BIGINT      NOT NULL REFERENCES owners (owner_id),
  created_at TIMESTAMP   NOT NULL DEFAULT now()
);`,
    },
    {
      id: 'rules',
      label: 'Invariant and what enforces it',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'r-unique', label: 'One code, one URL', sub: 'PRIMARY KEY on code', pattern: 'storage', icon: 'key' },
        { id: 'r-url', label: 'Every link has a URL', sub: 'NOT NULL, length CHECK', pattern: 'storage', icon: 'circlecheck' },
        { id: 'r-owner', label: 'Owner must exist', sub: 'FOREIGN KEY', pattern: 'storage', icon: 'link' },
        { id: 'r-tx', label: 'Link plus key together', sub: 'one transaction', pattern: 'warn', icon: 'merge' },
      ],
    },
  ],
  edges: [{ source: 'ddl', target: 'rules', label: 'declares' }],
}
