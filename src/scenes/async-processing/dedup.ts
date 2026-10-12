import type { Scene } from '@graphlearning/flow'

// §5 — a consumer that records each event id in the SAME transaction as the effect. The 7-day
// retention of processed ids is ASSUMED; a duplicate arriving after that window would be applied again.
export const dedup: Scene = {
  id: 'dedup',
  title: 'Skip what was already done',
  flow: 'TB',
  nodes: [
    {
      id: 'consumer',
      kind: 'code',
      filename: 'consume-click.sql',
      label: `-- PostgreSQL-style SQL; run once per delivered event
BEGIN;
  INSERT INTO processed (event_id) VALUES (:event_id)
  ON CONFLICT DO NOTHING;       -- 0 rows inserted: duplicate, skip
  UPDATE click_counts SET n = n + 1
   WHERE code = :code AND day = :day;
COMMIT;
-- only now: ack(msg)`,
    },
    {
      id: 'processed',
      kind: 'table',
      label: 'processed',
      columns: [
        { name: 'event_id', type: 'UUID', key: 'PK' },
        { name: 'processed_at', type: 'TIMESTAMP' },
      ],
    },
    { id: 'prune', label: 'Pruned after 7 days', sub: 'assumed retention', pattern: 'network', icon: 'calendar' },
    { id: 'late', label: 'Later duplicate', sub: 'would be applied again', pattern: 'warn', icon: 'bug' },
  ],
  edges: [
    { source: 'consumer', target: 'processed', label: 'same transaction' },
    { source: 'processed', target: 'prune', label: 'cannot grow forever' },
    { source: 'prune', target: 'late', label: 'so', dashed: true },
  ],
}
