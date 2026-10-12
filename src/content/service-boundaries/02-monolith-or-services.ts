import type { Section } from '../types'

export const monolithOrServices: Section = {
  id: 'monolith-or-services',
  title: 'A modular monolith or independently deployed services',
  scene: 'monolith-vs-services',
  focus: 's-net',
  slide: `## Same subsystem, two shapes

### Modular monolith
- One deployable, with modules that expose only a public interface
- A call between modules is a function call
- One database, each module owning its own schema

### Independent services
- Separate release, scaling and failure
- A call crosses a network, so it can be slow, lost or mismatched in version
- Each service owns its data

### The trade-off
- Services buy independent change and scale, and cost network failure modes, contract versioning and operations
- Split for a need, not for fashion

### Our case
- One team and a modest load: a modular monolith fits`,
  narration:
    "Once we know the responsibilities, we can choose how to package them. Here is the same subsystem drawn two ways. In a modular monolith, the links and analytics modules live in a single deployable. Each module exposes only a public interface and keeps its internals private, so a call between them is just a function call. There is one database, but each module owns its own schema. As independent services, the same two parts are released and scaled separately, and they fail separately. A call between them now crosses a network, which means it can be slow, can be lost, and can meet a version of the other side it does not expect. And each service must own its own data, so there are no shared tables. This is the trade-off. Services buy independent change and independent scaling, but they cost network failure modes, versioned contracts, and a great deal more operational work. A monolith is not a failure to modernise. For our case, one team and a modest load, a modular monolith fits well, and we should split only for a real need, not for fashion.",
}
