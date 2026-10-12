import type { Scene } from '@graphlearning/flow'

// §5 — four distinct controls that are often blurred together.
export const access: Scene = {
  id: 'access',
  title: 'Four controls, four questions',
  flow: 'TB',
  cols: 2,
  nodes: [
    {
      id: 'authn',
      label: 'Authentication',
      pattern: 'user',
      cols: 1,
      children: [
        { id: 'n-q', label: 'Who is calling?', sub: 'prove an identity', pattern: 'user', icon: 'usercheck' },
        { id: 'n-how', label: 'API key or token', sub: 'checked every request', pattern: 'user', icon: 'key' },
        { id: 'n-bad', label: 'Never trust a client', sub: 'claims are not proof', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'authz',
      label: 'Authorisation',
      pattern: 'service',
      cols: 1,
      children: [
        { id: 'z-q', label: 'What may they do?', sub: 'after identity is known', pattern: 'service', icon: 'scale' },
        { id: 'z-own', label: 'Own links only', sub: 'check owner_id on the server', pattern: 'service', icon: 'lock' },
        { id: 'z-least', label: 'Least privilege', sub: 'grant the minimum', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'secrets',
      label: 'Secrets',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 's-code', label: 'Not in source code', sub: 'inject at runtime', pattern: 'warn', icon: 'code' },
        { id: 's-rot', label: 'Rotate them', sub: 'and limit who reads', pattern: 'storage', icon: 'repeat' },
        { id: 's-log', label: 'Never log them', sub: 'logs travel widely', pattern: 'warn', icon: 'scroll' },
      ],
    },
    {
      id: 'crypto',
      label: 'Encryption',
      pattern: 'network',
      cols: 1,
      children: [
        { id: 'e-tran', label: 'In transit', sub: 'TLS on every hop', pattern: 'network', icon: 'lock' },
        { id: 'e-rest', label: 'At rest', sub: 'storage and backups', pattern: 'network', icon: 'harddrive' },
        { id: 'e-not', label: 'Not access control', sub: 'a key still decides', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [],
}
