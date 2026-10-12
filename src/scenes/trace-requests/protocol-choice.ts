import type { Scene } from '@graphlearning/flow'

// §4 — four interface styles, each with the requirement that favours it and the cost it brings.
export const protocolChoice: Scene = {
  id: 'protocol-choice',
  title: 'Four styles, one trade-off each',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'rest',
      label: 'REST over HTTP',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'rest-fit', label: 'Public, cacheable', sub: 'redirects, link pages', pattern: 'storage', icon: 'circlecheck' },
        { id: 'rest-cost', label: 'Chatty for views', sub: 'many calls per screen', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'rpc',
      label: 'RPC',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'rpc-fit', label: 'Named actions', sub: 'revoke a link', pattern: 'storage', icon: 'circlecheck' },
        { id: 'rpc-cost', label: 'Tighter coupling', sub: 'callers know methods', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'grpc',
      label: 'gRPC',
      pattern: 'storage',
      cols: 1,
      children: [
        { id: 'grpc-fit', label: 'Internal calls', sub: 'typed, can stream', pattern: 'storage', icon: 'circlecheck' },
        { id: 'grpc-cost', label: 'Browser friction', sub: 'needs a proxy layer', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'graphql',
      label: 'GraphQL',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'gql-fit', label: 'Varied screens', sub: 'client picks fields', pattern: 'storage', icon: 'circlecheck' },
        { id: 'gql-cost', label: 'Caching, cost', sub: 'one URL, heavy queries', pattern: 'warn', icon: 'circleslash' },
      ],
    },
  ],
  edges: [],
}
