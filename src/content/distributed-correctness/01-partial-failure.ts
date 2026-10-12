import type { Section } from '../types'

export const partialFailureSection: Section = {
  id: 'partial-failure',
  title: 'Partial failure, partitions and imperfect failure detection',
  scene: 'partial-failure',
  focus: 'detect',
  slide: `## Some parts fail, others do not

On one machine, a program mostly works or crashes. A distributed system can be **partly** broken.

### Silence has several causes
- The node **crashed** and will never answer
- The node is **slow**: overloaded, paused or swapping
- The **network** between us is cut, though the node is fine

### Detection is a guess
- A **timeout** cannot tell these apart
- Too short: a live node is declared dead
- Too long: a real crash goes unnoticed
- A paused process can wake up still believing it is the leader

### What follows
- Design for being wrong in both directions
- Wrongly declaring a node dead can lead to two nodes acting as the leader`,
  narration:
    "On a single machine, a program mostly either works or crashes. A distributed system has a nastier property: parts of it can fail while other parts carry on. Suppose a caller asks node B something and hears nothing back. What does that silence mean? The node may have crashed and will never answer. It may be alive but slow, perhaps overloaded, paused for housekeeping, or swapping memory. Or the node may be perfectly healthy and the network between you and it may be cut. From the caller's side, all three look exactly the same. So a failure detector, usually just a timeout, is only a guess. If the timeout is too short, you declare a live node dead. If it is too long, you take ages to notice a real crash. Neither mistake can be eliminated, only traded off. That has a serious consequence. If a node is wrongly declared dead, and another is promoted to replace it, you can end up with two nodes both acting as the leader. The rest of this chapter is about designing so that such mistakes do not corrupt data.",
}
