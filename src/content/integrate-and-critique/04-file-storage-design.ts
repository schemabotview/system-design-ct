import type { Section } from '../types'

export const fileStorageDesignSection: Section = {
  id: 'file-storage-design',
  title: 'An integrated worked design: file storage',
  scene: 'file-storage-design',
  focus: 'e-cost',
  slide: `## An integrated design: file storage

### Flow
- The API returns signed upload URLs; the client sends chunks **directly** to the object store
- Commit verifies the parts, then writes the metadata row
- Downloads are served through a CDN

### Estimates (assumed)
- 1 M uploads × 5 MB = 5 TB a day, about 58 MB/s, about 1.8 PB a year
- At $0.02 per GB-month: about **$36,500 a month** once a year of data accumulates

### Failure behaviour
- Interrupted upload: resume from the last part
- Write the blob first, then the row; sweep orphans

### Alternatives rejected
- Files in the database; bytes through the API; self-managed disks`,
  narration:
    "Now let us work one design through the whole method, using file storage, with every number assumed. The flow is this. When a client wants to upload, the API does not take the bytes. It returns signed addresses, and the client sends the file in chunks directly to the object store. When all the parts are in, a commit step verifies them and only then writes a metadata row to the database. Downloads are served through a content delivery network, close to the users. Now the estimates. One million uploads of five megabytes each is five terabytes a day, about fifty-eight megabytes a second on average, and about one point eight petabytes a year. At an assumed price of two cents per gigabyte per month, a year of accumulated data costs roughly thirty-six thousand five hundred dollars a month, so cost is a first-class concern. Failure behaviour is explicit. An interrupted upload resumes from the last part. We always write the blob first and the row second, so there is never a row without a file, and a sweeper deletes orphaned blobs. And we rejected three alternatives: storing files in the database, which bloats it, routing bytes through the API, which turns it into a bandwidth bottleneck, and managing our own disks, which makes durability our job.",
}
