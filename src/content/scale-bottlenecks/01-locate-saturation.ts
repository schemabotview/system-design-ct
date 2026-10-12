import type { Section } from '../types'

export const locateSaturation: Section = {
  id: 'locate-saturation',
  title: 'Locate saturation across CPU, memory, disk, network and dependencies',
  scene: 'saturation',
  focus: 'queue',
  slide: `## Find the full resource first

Scaling starts with evidence: which resource is saturated?

### Look at each resource
- **CPU:** busy near 100 % on the application servers
- **Memory:** swapping, or out-of-memory kills
- **Disk:** I/O wait and long queues
- **Network:** bandwidth or connection limits
- **Dependencies:** a database or API that slows every caller

### Why utilisation matters
- In a simple queueing model with a 10 ms service time, a request takes 20 ms at 50 % busy, 50 ms at 80 % and 200 ms at 95 %
- Latency climbs steeply well before 100 %
- So a target can be missed while headroom still looks ample

### The rule
- Change what the evidence names, then measure again`,
  narration:
    "Scaling a system should start with evidence, and the first question is always which resource is full. There are five places to look. CPU is saturated when the application servers are busy close to all the time. Memory is saturated when the machine starts swapping or the operating system kills processes. Disk shows up as time spent waiting for input and output and as long queues. Network shows up as bandwidth or connection limits. And a dependency, like a database or another service, can be the real bottleneck while every caller above it looks slow. There is a reason to act before a resource reaches one hundred percent. Take a simple queueing model with a service time of ten milliseconds. At fifty percent utilisation a request takes about twenty milliseconds. At eighty percent it takes fifty. At ninety-five percent it takes two hundred. Latency climbs steeply well before the resource is full, which is why a latency target can be missed with plenty of apparent headroom. The rule that follows is simple: change what the evidence names, and then measure again.",
}
