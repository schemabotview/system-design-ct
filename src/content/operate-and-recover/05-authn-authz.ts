import type { Section } from '../types'

export const authnAuthz: Section = {
  id: 'authn-authz',
  title: 'Authentication, authorisation, secrets and encryption',
  scene: 'access',
  focus: 'z-own',
  slide: `## Four controls, four questions

### Authentication: who is calling?
- An API key or token, verified on every request
- Never trust a claim the client makes about itself
- Short-lived tokens limit the damage if one leaks

### Authorisation: what may they do?
- An owner may change only their own links: check \`owner_id\` on the server
- Grant the least privilege needed

### Secrets
- Not in source code; inject at runtime; rotate; never log them

### Encryption
- In transit: TLS on every hop; at rest: storage and backups
- Encryption does not replace access control
- Check authorisation at the data, every time`,
  narration:
    "Four controls are often blurred together, so let us separate them by the question each answers. Authentication asks who is calling. We verify an API key or token on every request, and we never trust a claim a client makes about itself. Authorisation asks what that caller may do, once we know who they are. For example, an owner may change only their own links, so the server must check the owner identifier on every edit, and it must not rely on the client to send the right one. Grant each caller the least privilege that lets it do its job. Secrets, such as database passwords and signing keys, must not live in source code. Inject them at runtime, rotate them, limit who can read them, and never write them to logs, because logs travel widely. Finally, encryption. In transit, we use TLS on every hop, and at rest we encrypt storage and backups. But encryption is not access control: if a service holds the key, then whoever controls that service can read the data. Each control answers its own question, and none of them substitutes for another.",
}
