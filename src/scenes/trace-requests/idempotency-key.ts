import type { Scene } from '@graphlearning/flow'

// §7 — the idempotency-key contract as SQL-style pseudocode (dialect-neutral) and the table that
// makes it enforceable. The key's primary-key constraint is what lets exactly one of two
// simultaneous duplicates win.
export const idempotencyKey: Scene = {
  id: 'idempotency-key',
  title: 'Make the repeat harmless',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      kind: 'code',
      filename: 'create-link.sql',
      label: `-- POST /links   Idempotency-Key: 7b1c9e52
BEGIN;
  SELECT response FROM idempotency_keys
   WHERE key = '7b1c9e52';       -- found: return it, stop
  INSERT INTO links (code, long_url) VALUES (...);
  INSERT INTO idempotency_keys (key, request_hash, response)
       VALUES ('7b1c9e52', :hash, :response);
COMMIT;                          -- both rows, or neither`,
    },
    {
      id: 'keys',
      kind: 'table',
      label: 'idempotency_keys',
      columns: [
        { name: 'key', type: 'TEXT', key: 'PK' },
        { name: 'request_hash', type: 'TEXT' },
        { name: 'response', type: 'TEXT' },
        { name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
  ],
  edges: [{ source: 'contract', target: 'keys', label: 'same transaction' }],
}
