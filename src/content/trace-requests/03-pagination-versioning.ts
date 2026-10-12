import type { Section } from '../types'

export const paginationVersioning: Section = {
  id: 'pagination-versioning',
  title: 'Pagination, versioning and compatibility contracts',
  scene: 'pagination-and-compat',
  focus: 'page',
  slide: `## Contracts that can change safely

### Pagination
- **Offset** (\`?page=3\`) skips or repeats items when rows are added mid-listing
- **Cursor** (\`?cursor=…\`) resumes after a specific item, so inserts do not shift it
- Always cap \`limit\`: an unbounded list is an invitation to overload the service

### Versioning
- Prefer **compatible** changes so old clients keep working
- A breaking change gets a new version, such as \`/v2/links\`, run beside the old one
- Choose where the version lives, in the path or a header, and keep to it

### Be tolerant when reading
- Clients ignore fields they do not recognise
- That tolerance is what makes adding a field safe

A contract is a promise to people you cannot see.`,
  narration:
    "Once other people depend on your API, you cannot change it freely, so three decisions need care. The first is pagination. With offset pagination, the client asks for page three, but if new links are created while they are reading, items shift and some are repeated or skipped. A cursor avoids that by saying resume after this specific item, so inserts elsewhere do not move the place. You should also always cap the page size, because an unbounded list is an easy way to overload the service. The second is versioning. The best approach is to make compatible changes, which keeps old clients working. Adding an optional field, adding a new endpoint, or accepting more input are all compatible. Removing a field, changing a type, or requiring new input will break somebody, and that deserves a new version running beside the old one. The third is how clients read responses. If clients ignore fields they do not recognise, adding a field is safe. A contract is a promise to people you cannot see, so keep it deliberately.",
}
