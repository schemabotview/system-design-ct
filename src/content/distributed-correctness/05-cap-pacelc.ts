import type { Section } from '../types'

export const capPacelcSection: Section = {
  id: 'cap-pacelc',
  title: 'CAP assumptions and misconceptions; PACELC as a lens',
  scene: 'cap-pacelc',
  focus: 'd-c',
  slide: `## Two choices at two times

### What CAP says
- In the Gilbert-Lynch model, a service cannot be **linearizable**, **always available** and **tolerate partitions** together
- Partitions are not optional, so the choice arises **during** one: C or A

### Common misconceptions
- "Pick any two of three" hides that P is not a choice
- CAP says nothing about normal operation
- Its terms are narrow; real systems are not simply CP or AP
- Availability here means every request to a live node gets a response

### PACELC, as a lens
- **If partitioned:** availability or consistency
- **Else:** latency or consistency: waiting for distant replicas costs time
- A way to ask questions, not a label for products`,
  narration:
    "CAP is often quoted and often misunderstood, so let us state it carefully. In the model used by Gilbert and Lynch, a service cannot simultaneously guarantee linearizable consistency, availability of every request, and tolerance of network partitions. Since networks do partition, partition tolerance is not really optional, and so the real choice arises only while a partition is happening: refuse or wait to stay consistent, or answer anyway and risk stale or diverging data. Several misconceptions follow from the slogan pick any two of three. It hides that partition tolerance is not a choice. It suggests that CAP describes normal operation, when it says nothing about it. And its terms are narrow, so real systems cannot be sorted neatly into CP or AP. A useful extension is the PACELC framing, associated with Daniel Abadi. It says: if there is a partition, choose between availability and consistency; else, in normal operation, choose between latency and consistency. Treat it as a lens for asking questions about a design, not as a label to stick on products.",
}
