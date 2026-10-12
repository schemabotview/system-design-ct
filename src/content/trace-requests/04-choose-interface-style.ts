import type { Section } from '../types'

export const chooseInterfaceStyle: Section = {
  id: 'choose-interface-style',
  title: 'Choose REST, RPC, gRPC or GraphQL for a requirement',
  scene: 'protocol-choice',
  slide: `## Choose by requirement

No style wins everywhere. Each fits some requirements and costs something else.

### Four options
- **REST over HTTP:** resources and standard methods; browsers and caches understand it
- **RPC:** call a named action, such as revoking a link
- **gRPC:** typed RPC over HTTP/2; strong internally, awkward from browsers
- **GraphQL:** the client names the fields it wants from one endpoint

### Apply it to our service
- Public redirect: **HTTP GET**, because caches understand it
- Link service to analytics service: **gRPC** is plausible
- A dashboard with shifting field needs: **GraphQL**, at a caching and query-cost price

Pick the simplest option that meets the requirement, not the newest.`,
  narration:
    "There is no best interface style, only styles that fit particular requirements. REST over HTTP models resources and uses the standard methods, which means browsers, proxies and caches already understand it. RPC is a different idea: you call a named action, like revoke this link. gRPC is RPC carried over HTTP version two with typed schemas, which works well between internal services but is awkward to call directly from a browser. GraphQL lets the client name exactly the fields it wants from a single endpoint. Let us apply that to our service. The public redirect should be a plain HTTP get, because caches understand it and visitors are anonymous. A call from the link service to an internal analytics service could reasonably use gRPC, although plain HTTP would also work. A dashboard whose field needs keep changing might benefit from GraphQL, but you pay for it in harder caching and the need to limit expensive queries. The rule is to pick the simplest option that meets the requirement, not the newest.",
}
