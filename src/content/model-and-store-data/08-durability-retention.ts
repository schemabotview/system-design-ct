import type { Section } from '../types'

export const durabilityRetentionSection: Section = {
  id: 'durability-retention',
  title: 'Durability, retention, backup and data access',
  scene: 'durability-chain',
  focus: 'mistake-fix',
  slide: `## Durability, retention and backup

### What each copy protects against
- **Flush to disk:** survives a process crash
- **Replica:** survives losing one machine, but may lag behind
- **Backup:** survives a bad delete or a bug, which replicas copy faithfully

### Retention
- Click events kept 13 months, then deleted (assumed policy)
- Retention is a requirement: who decides, and what must be deleted?

### Data-access requirements
- Who may read raw clicks? IP addresses may count as personal data, depending on where you operate
- A backup is only proven by a **restore test**
- How much loss is acceptable? That is the RPO (chapter 8)`,
  narration:
    "When the system tells a client that a write succeeded, what exactly have we promised? Each copy of the data protects against a different failure. Flushing the write to disk means it survives a crash of the process. A replica on another machine means it survives losing that machine. But a replica faithfully copies mistakes too, so if someone deletes the wrong rows, the replica deletes them as well. Only a backup, kept separately and from an earlier time, protects against a bad delete or a software bug. And a backup is only real if you have tested restoring from it. Then there is retention. Our assumed policy keeps click events for thirteen months and then deletes them. Retention is a requirement, not an afterthought: someone has to decide how long data is kept and what must be deleted. Finally, think about who may read the data. Raw click records may include IP addresses, which can count as personal data depending on where you operate, so even access to the data is a design decision.",
}
