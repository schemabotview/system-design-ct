import type { Section } from '../types'

export const estimateDemand: Section = {
  id: 'estimate-demand',
  title: 'Estimating traffic, storage, bandwidth and peak demand',
  scene: 'demand-estimate',
  focus: 'peak',
  slide: `## Estimate in small steps

Start from a stated workload and convert one unit at a time.

### Traffic
- 1 million users × 20 redirects = **20 million per day**
- 20,000,000 ÷ 86,400 s ≈ **231 requests/s** on average
- At an assumed 5× peak: ≈ **1,157 requests/s**

### Storage and bandwidth
- Assume 100 redirects per new link: 200,000 links/day
- At 500 bytes each: 100 MB/day, about **36.5 GB/year**
- Peak responses: 1,157 × 500 B × 8 bits ≈ **4.6 Mbit/s**

### What the arithmetic leaves out
- Real traffic is bursty and uneven across the day
- The 5× and 500 B figures are guesses until measured`,
  narration:
    "Capacity estimates look intimidating until you notice they are just a chain of small unit conversions, each with an assumption you can name. We start from a workload we simply declare: one million daily users, each following twenty links. That gives twenty million redirects a day. A day has eighty-six thousand four hundred seconds, so the average works out to about two hundred and thirty-one requests every second. But systems are sized for the busy moments, not the average, so we assume a peak of five times that, roughly one thousand one hundred and fifty-seven requests per second. The same style works for storage. If we assume one new link for every hundred redirects, that is two hundred thousand new links a day, and at an assumed five hundred bytes each, about a hundred megabytes a day, or thirty-six and a half gigabytes a year. Peak response traffic comes to under five megabits a second. Now the important part: an average hides how uneven real traffic is, and the five times and five hundred bytes are guesses until someone measures them. The estimate tells you the size of the problem, not the answer.",
}
