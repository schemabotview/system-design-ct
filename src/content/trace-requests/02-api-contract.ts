import type { Section } from '../types'

export const apiContract: Section = {
  id: 'api-contract',
  title: 'API resources, operations, validation and errors',
  scene: 'error-contract',
  focus: 'invalid',
  slide: `## Design the API contract

An API names **resources**, applies **operations**, validates input and reports failure in one predictable shape.

### Resources and operations
- \`POST /links\` creates a link; \`GET /links/{code}\` reads its details
- \`GET /{code}\` is the redirect visitors use
- Nouns name things; the HTTP method says what to do
- A successful create returns **201** and the new link's address

### Validation and errors
- Validate at the boundary: scheme, length, allowed hosts
- **4xx** means the request is wrong; **5xx** means we failed
- One error shape: RFC 9457 problem details plus a \`field\` extension

### Why exact errors matter
- The status tells the client what to do: 422 fix it, 429 wait, 503 retry later`,
  narration:
    "An API contract starts with naming the things. Our resources are links, so creating one is a post to slash links, reading its details is a get on that link's own address, and the redirect that visitors use is a get on the short code itself. The nouns name what exists, and the HTTP method says what to do with it. Next comes validation. We check input at the boundary, before anything reaches the database: is the scheme allowed, is the address too long, is the host permitted. When the check fails, we need to say so in a way a program can act on. The status code tells the client which class of problem it is: four-hundred-series codes mean the request is wrong, five-hundred-series codes mean we failed. And rather than inventing a new error format for every endpoint, we use one consistent body, following the problem details standard, with an extra field naming which input was at fault. Precision matters because clients make decisions from the status. Unprocessable means fix the request, too many requests means wait, and service unavailable means try again later.",
}
