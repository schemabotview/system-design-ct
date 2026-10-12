import type { Section } from '../types'

export const cqrsEventSourcing: Section = {
  id: 'cqrs-event-sourcing',
  title: 'CQRS and event sourcing against concrete requirements',
  scene: 'cqrs-es',
  focus: 'x-crud',
  slide: `## Two ideas, often confused

### CQRS
- Separate the model you **write** to from the model you **read** from
- Example: a stats view built from the links table, for screens

### Event sourcing
- Store changes as **events**; derive current state by replaying them

### They are independent
- CQRS does **not** need event sourcing: a table plus a read view is CQRS
- Event sourcing does not need separate read models, though it often uses them

### Do they earn their place?
- Yes: read and write shapes differ, or history is a requirement
- No: plain create and read, where one table suffices
- Old event shapes must be handled forever`,
  narration:
    "Two patterns are frequently mentioned together and frequently confused. CQRS, command query responsibility segregation, means separating the model you write to from the model you read from. In our system, the links table could be the write model, and a statistics view built from it could be a read model shaped for the screens that need it. Event sourcing is a different idea. Instead of storing the current state, you store the changes as an append-only log of events, and you derive the current state by replaying them. These are independent. You can have CQRS with ordinary tables, and a plain table plus a read view is already CQRS. Event sourcing does not require separate read models, although it often uses them. Do they earn their place? They do when the read and write shapes really differ, or when history is itself a requirement, such as an audit trail or views you must be able to rebuild. They do not when the need is plain create and read, where one table suffices. And remember that an event log keeps old event shapes forever, so you must always be able to read them.",
}
