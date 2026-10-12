import type { Section } from '../types'

export const backupRestore: Section = {
  id: 'backup-restore',
  title: 'Backup, restore testing, RTO and RPO',
  scene: 'recovery-options',
  focus: 'replica',
  slide: `## Backups are proven by restoring

### Terms
- **RTO:** how long recovery may take
- **RPO:** how much recent data may be lost
- Assumed requirement: RTO 1 h, RPO 5 min

### Three options (assumed figures)
- Nightly backup: RTO 4 h, RPO 24 h, misses both
- Replica promotion: 15 min, about 5 s, but it copies a bad delete
- Point-in-time recovery: 2 h, 5 min, meets RPO but misses RTO

### Combine
- A replica for machine loss, point-in-time recovery for mistakes
- The mistake path still misses the 1 h RTO: speed it up, or revisit the requirement

### Drill
- A restore never rehearsed is a hope, not a plan
- Time each drill: it produces the real RTO`,
  narration:
    "A backup is only useful if you can restore from it fast enough, and without losing too much. Two numbers capture the requirement. The recovery time objective, or RTO, is how long recovery may take. The recovery point objective, or RPO, is how much recent data we may lose. Suppose our assumed requirement is an RTO of one hour and an RPO of five minutes. Now compare three options, using figures we also assume, which in real life would come from restore drills. A nightly backup might take four hours to restore and lose up to twenty-four hours of data, so it misses both. Promoting a replica takes about fifteen minutes and loses only a few seconds, so it meets both, but it copies a bad delete as faithfully as any other change. Point-in-time recovery, which replays archived logs, loses at most five minutes but might take two hours, so it meets the data target and misses the time target. No single option covers everything. A replica handles machine loss, and point-in-time recovery handles mistakes. And whichever you choose, rehearse the restore, because an untested restore is a hope, not a plan.",
}
