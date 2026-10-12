import type { Section } from '../types'

export const proxiesAndCaching: Section = {
  id: 'proxies-and-caching',
  title: 'Reverse proxies, load balancing, health checks and edge caching',
  scene: 'edge-path',
  focus: 'edge',
  slide: `## What sits in front of the app

### Proxy, balancer and health checks
- A **reverse proxy** receives requests on behalf of the servers behind it
- A **load balancer** spreads requests across replicas
- **Health checks** stop sending traffic to a replica that fails them
- A good check tests what users need, not just that the process runs

### Caching the redirect
- \`301\` means permanent: browsers and caches may keep it for a long time
- \`302\` is temporary: cached only if \`Cache-Control\` allows it
- A long cache saves load but delays a changed or removed link

### The cost of each layer
- Every hop adds latency and one more place to fail
- Add a layer for a requirement, not by habit`,
  narration:
    "Between the visitor and our application there are usually several layers. A reverse proxy receives requests on behalf of the servers behind it. A load balancer spreads those requests across several identical replicas. And health checks let the balancer notice that a replica has stopped answering and quietly stop sending traffic to it, so one failure does not become a visible outage. An edge cache sits even further out and can answer repeat requests without bothering our servers at all, which is attractive for redirects because the same code is requested many times. Here the choice of status code matters. A three-oh-one says the move is permanent, so browsers and caches may keep it for a long time. A three-oh-two is temporary, and is only cached if we explicitly allow it with a cache control header. The trade-off is real: a long cache saves load, but it also delays any change or removal of the link. Finally, remember that every layer adds latency and another thing that can fail, so add each one for a requirement, not by habit.",
}
