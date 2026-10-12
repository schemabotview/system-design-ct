import type { Scene } from '@graphlearning/flow'

// §10 — the transactional outbox: the business change and the event to publish are written in ONE local
// transaction, and a relay publishes later. A relay that crashes after publishing but before marking
// the row sent will publish again, so consumers must tolerate duplicates.
export const outbox: Scene = {
  id: 'outbox',
  title: 'Write the event with the data',
  flow: 'TB',
  nodes: [
    {
      id: 'tx',
      kind: 'code',
      filename: 'reserve-stock.sql',
      label: `-- one local transaction (PostgreSQL-style SQL)
BEGIN;
  UPDATE inventory SET stock = stock - 1
   WHERE sku = 'A-17' AND stock > 0;
  INSERT INTO outbox (id, topic, payload)
       VALUES (gen_id(), 'stock.reserved', '{"sku":"A-17"}');
COMMIT;                -- both rows, or neither`,
    },
    {
      id: 'box',
      kind: 'table',
      label: 'outbox',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK' },
        { name: 'topic', type: 'TEXT' },
        { name: 'payload', type: 'TEXT' },
        { name: 'sent_at', type: 'TIMESTAMP' },
      ],
    },
    { id: 'relay', label: 'Relay reads unsent', sub: 'publishes, then marks sent', pattern: 'network', icon: 'share' },
    { id: 'dupe', label: 'Duplicate possible', sub: 'crash before marking sent', pattern: 'warn', icon: 'copy' },
  ],
  edges: [
    { source: 'tx', target: 'box', label: 'same transaction' },
    { source: 'box', target: 'relay', label: 'polled' },
    { source: 'relay', target: 'dupe', label: 'at-least-once', dashed: true },
  ],
}
