# system-design-ct

**System Design — From Foundations to Advanced Design.** A GraphL content repo: one concept, nine
courses (one per chapter), each course a list of sections. The syllabus is
[`SYSTEM-DESIGN-COURSE-PLAN.md`](SYSTEM-DESIGN-COURSE-PLAN.md); this repo renders it as
`(scene, slide, narration)` sections.

Scaffolded from `schemabotview/content-repo-template` — see that repo for the content model,
the layout budgets and the verification bar.

```sh
npm install
npm run dev          # http://localhost:5173
npm run build && npx tsc --noEmit && npm run check
```

Routes are `#/<course>-<section>`, e.g. `#/frame-the-problem-estimate-demand`.

## Status

**All nine chapters are authored (75 of 75 sections).** What remains is review, source verification, audio, and any extensions listed below.

| # | Course id | Sections | State |
| --- | --- | --- | --- |
| 1 | `frame-the-problem` | 6 of 6 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 2 | `trace-requests` | 9 of 9 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 3 | `model-and-store-data` | 9 of 9 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 4 | `scale-bottlenecks` | 9 of 9 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 5 | `distributed-correctness` | 11 of 11 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 6 | `async-processing` | 9 of 9 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 7 | `service-boundaries` | 6 of 6 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 8 | `operate-and-recover` | 11 of 11 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 9 | `integrate-and-critique` | 5 of 5 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |

Section counts follow the plan (6, 9, 9, 9, 11, 9, 6, 11, 5 = 75 sections).

## Authoring conventions for this repo

- **Every number is stated as assumed or supplied.** Workloads, targets and latencies are
  hypothetical, per the plan; nothing is presented as a production measurement. Derivations show
  their units and say what the arithmetic leaves out.
- **Illustrative data is labelled.** The latency curve in chapter 1 is a gamma-shaped teaching
  curve, and its scene caption says so.
- **Narration is spoken text.** Numbers are written the way they are read; symbols and paths are
  spelled out. Audio comes from the Colab + Chatterbox pass, never by hand.
- **The URL shortener is a thread, not a template.** Chapter 9 contrasts chat, feeds, file storage
  and payments precisely so that it does not become the answer to every design.

## Research limits and review tracking

The plan states what is and is not verified. Carried forward here so authoring does not outrun it:

- No single official system-design manual exists. Cited sources establish particular concepts under
  particular assumptions (HTTP semantics RFC 9110, the CAP paper, the Raft project page, AWS Builders'
  Library on idempotent retries, OWASP threat-modelling guidance, selected SRE-book chapters).
- *Designing Data-Intensive Applications* was compared by publisher contents only; full text was not
  accessed. Do not attribute specific claims to it.
- **PACELC and several specialist sections need primary-source verification before their lessons are
  written** (chapter 5, section 5 at minimum). Verify, then record the source here.
- Out of scope: formal proofs, full protocol specifications, platform-specific deployment,
  comprehensive security/compliance, implementation labs.

### Chapter 1 review notes

- Arithmetic checked: 1M × 20 = 20M/day; 20M ÷ 86,400 ≈ 231.5/s; × 5 ≈ 1,157/s; 200,000 links ×
  500 B = 100 MB/day ≈ 36.5 GB/year; 1,157 × 500 B × 8 ≈ 4.6 Mbit/s; Little's law 1,157 × 0.040 ≈ 46.
- The 100:1 read-to-write ratio and 500 B per link are **this repo's additions** to the plan's stated
  workload, flagged as assumed on the slide. Change or remove them if the plan should not carry them.
- Quality targets (99% < 100 ms, 99.9%, 100 links/hour) are invented illustrative targets.
- Status codes in the API sketch (201, 422, 302, 404) are a first pass; chapter 2 revisits them.

### Chapter 2 review notes

- **Standards claims were written from knowledge, not re-read against the source text this session.**
  Verify before publishing: RFC 9110 on idempotent/safe methods (GET safe; PUT, DELETE idempotent;
  POST not), on 301 being cacheable by default and 302 only with explicit freshness, and on the
  name "422 Unprocessable Content"; RFC 9457 problem-details members (`type`, `title`, `status`,
  `detail`; `field` is this API's own extension); TLS 1.3 needing one handshake round trip against
  two for TLS 1.2; gRPC running over HTTP/2.
- `Idempotency-Key` is presented as a widely used convention, not core HTTP. That is deliberate.
- All timings (20/30/30/10 ms, 400 ms deadline, 150 ms timeout, 100 ms backoff base, 1,600 ms cap,
  60 ms jitter draw, 24 h key expiry) are **hypothetical** and chosen to be internally consistent:
  cold 120 ms, warm 40 ms; retry at t = 210 leaves 190 ms of a 400 ms deadline; replay at t = 250.
- The 3× retry-amplification figure is the worst case for three attempts, not an expected value.
- The AWS Builders' Library idempotency article and the AWS backoff-and-jitter guidance cited by the
  plan were not fetched; the lesson states the ideas, not their wording.

### Chapter 3 review notes

- SQL is PostgreSQL-style and labelled as an assumed dialect on the scene. No query-plan output is
  claimed as measured: the 8 s per-day click query and its sequential scan are explicitly *supplied*
  hypothetical evidence for the exercise.
- Collision arithmetic: 62⁶ = 56,800,235,584 codes; the chance a new random code is taken ≈ links
  stored ÷ 62⁶ (1 M → 0.0018 %, 10 M → 0.018 %, 73 M → 0.13 %); 200,000 creates × 0.13 % ≈ 257 retries
  a day. 73 M is chapter 1's assumed 200,000 links a day for a year.
- Storage: 20 M redirects/day × an assumed 100 B per click row = 2 GB/day ≈ 730 GB/year.
- The 2,048-character URL limit, 13-month click retention and the three-attempt retry cap are
  assumptions of the lesson, not recommendations.
- Storage-model comparisons describe typical tendencies; individual products differ, and the slide
  says so. Not checked against any product documentation.
- Treatment of IP addresses as possibly personal data is deliberately jurisdiction-neutral; it is not
  legal guidance.

### Chapter 4 review notes

- **All load, hit-rate, lag, pool and capacity figures are assumed or supplied**: 10 ms service time,
  80 % hit rate, 60 s TTL, 0.2–2 s replica lag, pool of 20 against a 100-connection limit, 4× traffic
  growth, 4,000 click writes/s against ~1,500/s primary capacity. Stage 3 of the staged case is
  supplied evidence, not a derivation from chapter 1's write rate (which is only ~2.3 creates/s).
- Latency-vs-utilisation curve is the textbook M/M/1 response time, service time ÷ (1 − utilisation):
  20 ms at 50 %, 50 ms at 80 %, 100 ms at 90 %, 200 ms at 95 %. A model for intuition, not a claim
  about any real server.
- Popularity skew is an assumed Zipf-like distribution over 50 links (share ∝ 1/rank, H₅₀ ≈ 4.499),
  giving rank 1 ≈ 22.2 %. Illustrative.
- Rebalancing arithmetic: a key keeps its shard under hash mod 4 → mod 5 only when the residues agree,
  4 of every 20 hash values, so 20 % stay and 80 % move; 64 fixed partitions ÷ 5 nodes ≈ 13 partitions
  ≈ 20 % move.
- Write-through / write-around-style invalidation / write-back and cache-aside are described at the
  conceptual level; product behaviour varies and was not checked against any cache's documentation.
- **Density exceptions:** `cache-placement` slide renders at 79 % (one point under the 80 % target; the
  check model's 1000 px cap prevented adding another line) and the `rebalancing` scene fills 0.53 of
  its pane (target ≥ 0.55).

### Chapter 5 review notes

- **Source verification was attempted and mostly blocked.** WebFetch could not reach `raft.github.io`,
  the Gilbert–Lynch PDF or Abadi's PACELC paper (DNS denied by the environment's network policy).
  One web search returned secondary summaries agreeing with the PACELC statement used here
  (partition → availability or consistency; else → latency or consistency, Abadi, 2012). **CAP, Raft,
  quorum, Lamport-clock, isolation-level and two-phase-commit statements were written from general
  knowledge and not re-read against primary text.** The plan's open item "PACELC … need further
  primary-source verification" is therefore *not* closed; the lesson presents PACELC as a lens, names
  Abadi, and does not label real products.
- CAP is stated in the Gilbert–Lynch model (linearizable consistency, availability of every request to a
  non-failing node, partition tolerance) and the lesson avoids "pick two of three" except to criticise it.
- Raft is a *conceptual* sketch on three servers (terms, majority votes, commit on majority, vote only
  for an up-to-date log); it is explicitly not a specification.
- The ±40 ms clock skew is an assumption. The 2PC "in doubt" blocking, outbox at-least-once duplicate
  and the three inventory histories (lost update, stale replica read, failover lost write) are standard
  textbook scenarios, each labelled by the axis that fails (isolation, replication, durability).
- Section 2 table columns render right-aligned for text; readable but not pretty.

### Chapter 6 review notes

- Backlog arithmetic (all rates assumed): 1,157/s arriving against 1,000/s service for 600 s leaves
  157 × 600 = 94,200 queued; after arrival falls to 231/s the surplus is 769/s, so it drains in
  94,200 ÷ 769 ≈ 122.5 s (empty at ≈ 722.5 s).
- Retry limit (5), processed-id retention (7 days) and topic retention (7 days) are assumptions of the
  lesson. Partition assignment of example codes is illustrative.
- "Exactly-once" is deliberately scoped: the lesson says claims usually cover work inside one system
  and do not extend to external effects. No specific broker's guarantees are described or checked.
- The three-partition, consumer-group and offset model is generic; product terminology (e.g. which
  systems delete on ack versus retain a log) was not verified against any product's documentation.
- Saga/compensation content is conceptual; the payment example distinguishes compensation from
  atomic rollback but is not a complete payment design (Chapter 9 revisits payments).
- **Density exceptions:** `partitions-and-groups` slide renders at 79 % and `poison-messages` scene
  fills 0.54 (targets 80 % / 0.55).

### Chapter 7 review notes

- Availability of a synchronous chain is the product of the parts: 0.999⁴ = 0.996006 ≈ 99.6 %, which
  misses chapter 1's assumed 99.9 % target. The per-service 99.9 % is an assumption, and the product
  assumes independent failures.
- The lesson retains the modular monolith on assumed evidence (one team, 231/s average, 1,157/s peak,
  asynchronous click processing). It deliberately does not argue that services are never right; the
  decision record names the triggers for revisiting.
- Bounded context, cohesion/coupling, CQRS and event sourcing are explained at an introductory level
  in plain terms (not tied to a specific book's wording). The Lewis/Fowler microservices article cited
  by the plan was not fetched this session (web fetches were blocked), so no claim is attributed to it.
- Expand-and-contract and the strangler-style "route a slice first" idea are described conceptually.

### Chapter 8 review notes

- **All operational figures are assumed or illustrative.** Error-budget arithmetic: 20 M redirects/day
  × 30 days = 600 M valid requests; a 99.9 % SLO leaves 0.1 % = 600,000 failures; 150,000 failures →
  SLI 99.975 %, 25 % of budget spent. Capacity margin: 1,157 ÷ 0.70 ≈ 1,653 req/s (the 70 % target
  utilisation is an assumption informed by chapter 4's queueing intuition).
- Token bucket: 100 creates/hour ÷ 3,600 s = one token per 36 s; capacity 10 → empty-to-full in 360 s.
- Recovery options' RTO/RPO values (nightly backup 4 h / 24 h; replica 15 min / ~5 s; point-in-time
  2 h / 5 min) are **assumptions standing in for drill results**, measured against an assumed
  requirement of RTO 1 h and RPO 5 min. The combined option is shown as *still missing the RTO for the
  mistake path*, deliberately.
- Worked incident: 09:04–09:31 = 27 min = 1,620 s at the 231/s average ≈ 375,000 failed requests =
  62.5 % of the 600,000 monthly budget (this uses the *average* rate; a busier hour would burn more).
  Phases: 3 min to detect, 13 to find the cause, 11 to recover. Failover-does-not-help is the point
  being made about faulty changes versus failed infrastructure.
- The four threat-model questions and a STRIDE mention are standard framings; the OWASP Threat
  Modeling Cheat Sheet cited by the plan was **not fetched** (web fetches blocked), so wording is the
  course's own and not attributed to it. The SRE-book chapters were likewise not fetched; terms (SLI,
  SLO, SLA, error budget) follow common usage.
- Section 11 closes with the plan's requirement that operational examples stay distinct from learner
  assessment.
- **Density note:** `threat-model` scene fills 0.50 and `worked-incident` 0.52 of their panes (target
  ≥ 0.55); `slis-slos` is 0.62.

### Chapter 9 review notes

- **Plan compression to confirm.** The plan asks for end-to-end narrated designs of chat, feeds, file
  storage and payments, *each* stating requirements, API/data examples, estimates, architecture,
  bottleneck, failure behaviour, alternatives and cost — inside a 5-section chapter. One slide plus one
  scene per section cannot hold four full designs, so section 3 gives a contrasting comparison
  (dominant need, bottleneck, key decision, per case with estimates) and section 4 works **one** design,
  file storage, through the whole method. If the full four-design treatment is wanted, the clean fix is
  to split section 3 into four sections (chat, feed, file storage, payments) and let section 4 become
  an integrated design of a *different* system; that changes the plan's section count for this chapter.
- Estimates, all assumed: chat 10 M users × 40 messages = 400 M/day ≈ 4,630/s; feed 20 M users × 10 loads
  = 200 M/day ≈ 2,315/s; files 1 M uploads × 5 MB = 5 TB/day ≈ 58 MB/s ≈ 1.8 PB/year (5 TB × 365 =
  1,825 TB); storage at an assumed $0.02 per GB-month → 1,825,000 GB × $0.02 ≈ $36,500/month; payments
  100,000/day ≈ 1.2/s. The price is a placeholder, not a quote from any provider.
- Changed-requirements case: 200 M redirects/day ÷ 86,400 ≈ 2,315/s average, × 5 ≈ 11,574/s peak; at an
  80 % hit rate ≈ 2,315 database reads/s (ten times chapter 4's 231). The 5-second takedown and 10×
  growth are assumed.
- The 35-day backup-retention figure in the critique is an assumption.
- The closing bridge repeats the plan's caution: practical competence needs implementation experience
  beyond this course.

