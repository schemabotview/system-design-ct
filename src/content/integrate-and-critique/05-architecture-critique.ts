import type { Section } from '../types'

export const architectureCritiqueSection: Section = {
  id: 'architecture-critique',
  title: 'A narrated architecture critique',
  scene: 'critique',
  focus: 'b2',
  slide: `## Critique: revise, and say what remains

### Method
- Check requirements coverage, assumptions, failure modes, cost and simplicity
- For each finding: the **revision**, and what it still leaves open

### Findings on the file design
- No malware scanning: scan before sharing; sharing is delayed
- No deletion path: delete row, blob and CDN copy; backups keep it for an assumed 35 days
- One region: replicate blobs; metadata failover stays manual
- Unbounded egress cost: CDN caching and per-file limits

### Where this leaves you
- Unresolved trade-offs are part of the design, so write them down
- Practical competence needs implementation experience, beyond this course`,
  narration:
    "The last skill is critique: looking at a design, including your own, and saying honestly what is wrong with it. A useful method checks the design against the requirements, then its assumptions, its failure modes, its cost, and its simplicity. For each finding, you state the revision, and, importantly, what the revision still leaves open. Apply that to the file storage design. First, files are stored without any malware scanning. The revision is to scan after upload and before sharing, but that delays sharing. Second, there is no way to delete a file everywhere. The revision removes the row, the blob, and the cached copy, but backups still hold the data for an assumed thirty-five days, which must be disclosed. Third, there is only one region. We can replicate blobs to a second one, but the metadata failover is still manual. Fourth, the cost of downloads is unbounded, so a viral file could be very expensive. Caching and per-file limits help, though limits can annoy legitimate users. Notice that unresolved trade-offs are part of the design, so write them down. To go further, work through unfamiliar designs, read original sources, and study real incident analyses, and remember that practical competence also requires hands-on implementation experience.",
}
