import type { Section } from '../types'

export const systemBoundaries: Section = {
  id: 'system-boundaries',
  title: 'Boundaries, components and levels of design',
  scene: 'context-diagram',
  focus: 'service',
  slide: `## Draw the boundary first

A **system** is the part you build and operate. Everything it talks to sits outside that line.

### Inside and outside
- **Inside:** the application and the database — we deploy, monitor and fix them
- **Outside:** link owners, visitors and destination sites — we depend on them but cannot change them
- **Interface:** any place a request crosses the line, such as an HTTP call

### Four levels of design
- **Context** — the system among its users and neighbours
- **Deployable parts** — the application and the database
- **Modules** — the pieces inside one part
- **Code** — classes and functions

Begin at context. Go one level deeper only when a decision needs it.`,
  narration:
    "Every design starts with a line. On one side of the line is the system you are going to build and run: here, a short-link service made of an application and a database. On the other side are the people and systems you merely deal with. Link owners create short links, visitors follow them, and destination sites hold the real pages. You depend on all of them, but you cannot change how any of them behave, and that difference decides what you are responsible for. Notice the dashed arrow. The service tells the visitor's browser where to go, but the browser, not the service, then travels to the destination. Any place where a request crosses the line is an interface, and interfaces are what the rest of this course keeps returning to. A design can also be described at four levels: the context, the deployable parts, the modules inside a part, and the code. Start at the context, and only drop a level when the decision in front of you cannot be made without it.",
}
