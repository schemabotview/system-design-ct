import type { Section } from '../types'

export const threatModel: Section = {
  id: 'threat-model',
  title: 'Threat modelling and trust boundaries',
  scene: 'threats',
  focus: 'boundary',
  slide: `## Ask what can go wrong

### Four questions
- What are we building? What can go wrong?
- What will we do about it? Did we do enough?
- STRIDE is one checklist of threat types to prompt ideas

### Trust boundaries
- Everything that crosses from the internet into our system is **untrusted input**

### Threats for a link service
- **Abuse:** spam and phishing links created in bulk
- **Enumeration:** guessing codes to find destinations
- **Malicious targets:** redirects that lead to malware

### Responses
- Rate limits, validation and blocklists, and unguessable codes, which are not secrets
- Rank threats by likelihood and impact, and revisit when the design changes`,
  narration:
    "Security starts with a habit of asking questions, and a common framing uses four. What are we building? What can go wrong? What are we going to do about it? And did we do a good enough job? To answer them, draw the system and mark the trust boundaries, which are the places where data crosses from something we do not control into something we do. For us, everything arriving from the internet is untrusted input. Now ask what can go wrong for a link service in particular. People can abuse it to create spam and phishing links in bulk. They can enumerate it, guessing codes to discover destinations that were meant to be quiet. And they can create links whose targets lead to malware, using our domain's good name. Each threat gets a response. Rate limits slow bulk creation. Validation and blocklists reject dangerous targets. And codes that are hard to guess make enumeration expensive, though remember from chapter three that an unguessable code is not a secret, so it must never be the only thing protecting something private.",
}
