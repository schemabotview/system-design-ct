import type { Scene } from '@graphlearning/flow'

// §11 — three histories of one inventory item (stock = 1) that break the invariant "never sell more than
// we have" for three DIFFERENT reasons: concurrent transactions, a lagging replica, and a failover that
// loses an acknowledged write. Ids are literal so `npm run check` can see them.
export const inventoryHistories: Scene = {
  id: 'inventory-histories',
  title: 'One invariant, three ways to break it',
  flow: 'LR',
  align: 'start',
  nodes: [
    {
      id: 'lost',
      label: 'Lost update',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'lost1', label: 'Both read stock 1', sub: 'A and B, same moment', pattern: 'service', icon: 'search' },
        { id: 'lost2', label: 'A writes stock 0', sub: 'sold the last one', pattern: 'service', icon: 'pencil' },
        { id: 'lost3', label: 'B writes stock 0', sub: 'also sold the last one', pattern: 'service', icon: 'pencil' },
        { id: 'lost4', label: 'Oversold', sub: 'invariant broken', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'lost1', target: 'lost2' },
        { source: 'lost2', target: 'lost3' },
        { source: 'lost3', target: 'lost4' },
      ],
    },
    {
      id: 'stale',
      label: 'Stale replica read',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'stale1', label: 'Primary: stock 0', sub: 'after the last sale', pattern: 'service', icon: 'database' },
        { id: 'stale2', label: 'Replica lags', sub: 'still shows stock 1', pattern: 'service', icon: 'clock' },
        { id: 'stale3', label: 'Buyer reads 1', sub: 'page offers the item', pattern: 'service', icon: 'search' },
        { id: 'stale4', label: 'Isolation was fine', sub: 'replication was not', pattern: 'warn', icon: 'bug' },
      ],
      edges: [
        { source: 'stale1', target: 'stale2' },
        { source: 'stale2', target: 'stale3' },
        { source: 'stale3', target: 'stale4' },
      ],
    },
    {
      id: 'fail',
      label: 'Failover loses a write',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'fail1', label: 'Primary acks sale', sub: 'stock 1 becomes 0', pattern: 'service', icon: 'circlecheck' },
        { id: 'fail2', label: 'Primary crashes', sub: 'before copying it', pattern: 'service', icon: 'skull' },
        { id: 'fail3', label: 'Replica promoted', sub: 'still shows stock 1', pattern: 'service', icon: 'server' },
        { id: 'fail4', label: 'Sold twice', sub: 'acknowledged write lost', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'fail1', target: 'fail2' },
        { source: 'fail2', target: 'fail3' },
        { source: 'fail3', target: 'fail4' },
      ],
    },
  ],
  edges: [],
}
