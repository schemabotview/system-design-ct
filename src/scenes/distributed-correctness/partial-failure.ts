import type { Scene } from '@graphlearning/flow'

// §1 — from the caller's side, three different failures produce the same observation: silence. A
// timeout is therefore a guess, and any guess can be wrong in either direction.
export const partialFailure: Scene = {
  id: 'partial-failure',
  title: 'Three failures, one symptom',
  flow: 'TB',
  nodes: [
    { id: 'ask', label: 'Caller asks node B', sub: 'and waits for an answer', pattern: 'user', icon: 'pencil' },
    {
      id: 'causes',
      label: 'What silence might mean',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'c-crash', label: 'B has crashed', sub: 'it will never answer', pattern: 'warn', icon: 'skull' },
        { id: 'c-slow', label: 'B is slow', sub: 'busy, paused, or swapping', pattern: 'warn', icon: 'clock' },
        { id: 'c-net', label: 'Network cut', sub: 'B is fine, we cannot reach it', pattern: 'warn', icon: 'ban' },
      ],
    },
    { id: 'detect', label: 'Failure detector', sub: 'a timeout, so a guess', pattern: 'network', icon: 'bell' },
    { id: 'early', label: 'Too short', sub: 'declares a live node dead', pattern: 'warn', icon: 'zap' },
    { id: 'late', label: 'Too long', sub: 'slow to notice a real crash', pattern: 'warn', icon: 'history' },
  ],
  edges: [
    { source: 'ask', target: 'causes', label: 'no reply' },
    { source: 'causes', target: 'detect', label: 'looks identical' },
    { source: 'detect', target: 'early', label: 'if' },
    { source: 'detect', target: 'late', label: 'or if' },
  ],
}
