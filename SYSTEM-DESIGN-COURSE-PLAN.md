# System Design — From Foundations to Advanced Design

## Audience and prerequisites

For learners new to system design who understand what a small application, an API, and a database table are. Networking, distributed-state reasoning, and operational concepts are introduced progressively. Examples include API requests, schemas, pseudocode, architecture diagrams, calculations, and operational traces. Learners may follow along; submitted exercises, assessments, and learner monitoring are not required.

Scope: requirements, quantitative reasoning, communication, storage, scaling, distributed correctness, asynchronous workflows, architectural boundaries, and operational trade-offs. Detailed algorithms, full networking protocols, database administration, platform deployment, and formal proofs are separate specialisations.

Target: understand how to develop an architecture from requirements, express interfaces and data models, estimate capacity, explain failure behaviour, compare alternatives, and justify design decisions. Work through concrete designs and annotated technical examples; individual learner performance is not assessed.

Structure: **9 chapters**, with section counts of **6, 9, 9, 9, 11, 9, 6, 11, and 5**. Sections follow conceptual scope and may require different amounts of explanation.

## Learning spine

Frame requirements → trace communication → model state → scale bottlenecks → establish distributed guarantees → coordinate work → define boundaries → reason about operations → explain and critique complete designs.

Recurring example: a lecturer evolves a URL-shortening service from one application and database to caching, replication, partitioning, and asynchronous click analytics only when requirements justify them. Inventory/payment cases illustrate stronger invariants; chat, feeds, and file storage reveal different access patterns. The URL shortener provides continuity without becoming a template for every system.

Teaching method: objective → mental model → worked architecture diagram, calculation, API example, or timeline → alternative/failure contrast → explanation summary → bridge. Begin with small concrete cases before introducing abstract guarantees. Security, measurement, cost, and failure awareness recur throughout; dedicated chapters deepen the reasoning. Explain each example step by step, including its assumptions, expected behaviour, and limitations. Include code or configuration snippets where they clarify a design decision; do not reduce the course to abstract descriptions or lists of components.

## Chapter 1 — Frame the Problem and Explain an Initial Design

Objective: Explain how an ambiguous request becomes explicit requirements, assumptions, and an initial architecture.

1. System boundaries, components, interfaces, and levels of design
2. Functional requirements, user journeys, constraints, and assumptions
3. Quality attributes and measurable acceptance criteria
4. Estimate traffic, storage, bandwidth, and peak demand
5. Latency, throughput, percentiles, and introductory capacity reasoning
6. Worked design: a single-service URL shortener with an initial API and data model

Worked illustrations: An annotated context diagram and initial application/database diagram; a requirements table; create-link and redirect API sketches; a worked capacity calculation. For an explicitly assumed workload of 1 million daily users making 20 redirects each, derive 20 million redirects/day, about 231 requests/second on average, and about 1,157 at an assumed 5× peak. Explain what those averages omit before using them to choose capacity.

Outcome: Interpret an initial design and its estimates, explain units and assumptions, and identify which requirement would justify changing it.

Bridge: We have an initial design; next we trace the requests that cross its interfaces and examine communication failures.

## Chapter 2 — Trace Requests and Design Communication

Objective: Explain interfaces and request behaviour under success, delay, failure, and retries.

1. Trace a request through DNS, transport connections, TLS, and HTTP
2. Define API resources, operations, validation, and errors
3. Design pagination, versioning, and compatibility contracts
4. Select REST, RPC, gRPC, or GraphQL for a requirement
5. End-to-end deadlines, timeout budgets, retries, backoff, and jitter
6. Ambiguous outcomes: an operation can succeed even when its response is lost
7. Design idempotent operations and safe retry behaviour
8. Explain reverse proxies, load balancing, health checks, and edge caching
9. Worked traces: successful, timed-out, and repeated create-link and redirect requests

Worked illustrations: Concrete POST /links and GET /{code} request/response examples, including validation failures and redirect/cache choices; a sequence diagram across DNS, TLS, edge, application, and database; pseudocode for an idempotency-key contract; a lost-response timeline showing why a retry can duplicate an effect. Compare deadline budgets using stated hypothetical timings.

Outcome: Trace a request and its failure paths, compare interface choices, and explain deadline, retry, and idempotency decisions.

Bridge: The interfaces express operations on persistent information; next we model that state and choose how to store it.

## Chapter 3 — Model and Store Data Correctly

Objective: Justify storage choices and integrity rules from operations and access patterns.

1. Derive entities and access patterns from user operations
2. Define invariants, keys, constraints, and transaction boundaries
3. Identifier generation, uniqueness, collisions, and enumeration trade-offs
4. Choose normalisation or deliberate denormalisation
5. Reason about indexes, query plans, and read/write costs
6. Compare relational, key-value, document, and wide-column storage
7. Recognise specialised roles for graph, time-series, search, and object storage
8. Define durability, retention, backup, and data-access requirements
9. Worked comparison: link and click-event models and a supplied lookup bottleneck

Worked illustrations: A small links table definition with a unique short-code constraint and a sample lookup query; representative link and click-event records; an access-pattern-to-index table; contrasting normalised and denormalised schemas; a collision-handling flow for random identifiers. Label SQL dialect assumptions and explain why a uniqueness constraint still matters when collision probability is low.

Outcome: Compare storage models and identifier strategies using access patterns and invariants, and explain durability and retention requirements.

Bridge: The initial storage and application design has finite capacity; next we scale the bottlenecks supported by evidence.

## Chapter 4 — Scale Measured Bottlenecks

Objective: Explain scaling mechanisms in response to supplied workload evidence and capacity constraints.

1. Locate saturation across CPU, memory, disk, network, and dependencies
2. Add application replicas and manage session state and connection pools
3. Select cache placement and read/write patterns
4. Reason about invalidation, expiry, and stale data
5. Handle hot keys, cache stampedes, and cache failure
6. Use replication for read capacity and examine lag and failover
7. Select shard keys and partitioning schemes
8. Handle hot partitions, routing, and rebalancing
9. Worked evolution: explain scaling changes using supplied workload evidence

Worked illustrations: Before/after diagrams for replicas, cache placement, and sharding; a cache-aside read sequence; a stale-cache update timeline; hypothetical cache-hit calculations and a hot-key traffic distribution. Given an assumed 1,000 reads/second and 80% hit rate, derive 200 database reads/second under that simplified model, then explain cache outages, misses, writes, and skew that the model leaves out.

Outcome: Interpret a staged scaling case and explain the constraint, expected effect, and new failure modes introduced by each change.

Bridge: Replication and partitioning distribute state; next we examine the correctness guarantees that survive delays, concurrency, and failures.

## Chapter 5 — Reason About Distributed Correctness

Objective: Reason about correctness using explicit invariants, histories, and failure assumptions.

1. Partial failure, network partitions, and imperfect failure detection
2. Define correctness through invariants and concurrent histories
3. Safety and liveness: distinguish correct decisions from continued progress
4. Replication consistency, transaction isolation, and session guarantees: distinct meanings
5. CAP assumptions and misconceptions; contrast PACELC as a latency/consistency lens
6. Understand replication quorums and their limitations
7. Explain leader election, consensus, and a conceptual Raft walkthrough
8. Reason about physical clocks, logical clocks, and event ordering
9. Understand atomic commit and two-phase commit
10. Coordinate local transactions and event publication with a transactional outbox
11. Worked histories: stale reads, concurrent updates, failover, and inventory invariants

Worked illustrations: Two-client read/write histories showing stale reads and stronger guarantees; an inventory example separating transaction isolation from replication consistency; a partition diagram identifying which requests must wait or fail; a small replicated-log walkthrough; a two-phase-commit failure timeline; annotated SQL/pseudocode connecting a business update and an outbox row in one local transaction. Explain the relay/consumer duplicate problem rather than implying that the outbox removes it.

Outcome: Analyse a concurrent or failed history, distinguish consistency from isolation and safety from progress, and justify a guarantee under stated assumptions.

Bridge: We can reason about distributed state and event publication; next we apply those guarantees to asynchronous processing and business workflows.

## Chapter 6 — Design Asynchronous Processing

Objective: Explain asynchronous work under delivery, ordering, overload, and recovery constraints.

1. Choose queues, publish/subscribe, or retained event streams
2. Partitions, consumer groups, ordering scope, and retention
3. Queue acknowledgement versus stream offsets: replay and processing progress
4. State delivery guarantees and the scope of exactly-once claims
5. Explain idempotent consumers, deduplication keys, and retention limits
6. Handle retries, poison messages, and dead-letter recovery
7. Manage backpressure, batching, and materialised views
8. Model workflows with state machines, orchestration, choreography, and compensation
9. Worked case: asynchronous click analytics, notifications, and failure recovery

Worked illustrations: A click-event JSON example and producer/broker/consumer sequence; annotated consumer pseudocode showing processing and acknowledgement boundaries; crash timelines before and after an effect; an order-preserving partition-key example; a backlog calculation under assumed arrival/service rates; a dead-letter recovery flow; a compensating payment workflow that distinguishes compensation from atomic rollback.

Outcome: Trace duplicated, delayed, or rejected events; explain ordering, replay, compensation, and the limits of delivery claims.

Bridge: The flow of work is explicit; next we decide which responsibilities should share a module, process, or independently deployed service.

## Chapter 7 — Define Service Boundaries and Evolve Architecture

Objective: Compare responsibility boundaries and evolution choices without assuming service decomposition is always beneficial.

1. Identify responsibilities, bounded contexts, coupling, and cohesion
2. Choose a modular monolith or independently deployed services
3. Manage service contracts, ownership, and dependency chains
4. Evaluate CQRS and event sourcing against concrete requirements
5. Evolve schemas, APIs, and service boundaries through compatible migrations
6. Worked comparison: retaining a modular monolith versus extracting a subsystem

Worked illustrations: Two diagrams of the same subsystem inside a modular monolith and as a service; an API/event contract with ownership boundaries; a dependency-chain failure trace; an expand-and-contract schema/API migration sequence; side-by-side read-model and event-log examples explaining why CQRS does not require event sourcing. Include a worked decision record where retaining the monolith is justified.

Outcome: Compare monolithic and service-based alternatives and explain compatible migrations, ownership, and optional pattern trade-offs.

Bridge: The system has explicit responsibilities and evolution paths; next we make it observable, secure, and recoverable in production.

## Chapter 8 — Operate, Secure, and Recover Systems

Objective: Explain how quality requirements translate into operational objectives, security boundaries, and recovery choices.

1. Distinguish SLIs, SLOs, and SLAs; error budgets and capacity margins
2. Connect logs, metrics, traces, and actionable alerts
3. Apply circuit breakers, bulkheads, load shedding, and graceful degradation
4. Threat-model the system and identify trust boundaries
5. Design authentication, authorisation, secrets, and encryption
6. Enforce rate limits, quotas, and abuse controls
7. Plan safe deployments, configuration changes, and rollback
8. Define backup, restore testing, RTO, and RPO
9. Evaluate failure domains and multi-region recovery choices
10. Worked incident: interpret an outage timeline and compare recovery alternatives
11. Post-incident reasoning: contributing causes, prevention, and residual risk

Worked illustrations: An illustrative request-success SLI and SLO calculation with an explicit denominator and time window; correlated log, metric, and trace excerpts; a circuit-breaker state diagram; a token-bucket example; a threat-boundary diagram for link creation and redirect abuse; a canary/rollback sequence; a restore timeline comparing assumed recovery time and data loss with stated RTO/RPO targets. Keep operational examples distinct from learner assessment.

Outcome: Interpret operational targets, threat boundaries, and an incident timeline; explain recovery choices against RTO/RPO and cost assumptions.

Bridge: The system now has explicit operational trade-offs; next we compare complete designs and explain how decisions change across workloads.

## Chapter 9 — Integrate and Critique Complete Designs

Objective: Integrate architectural reasoning through narrated designs, changed requirements, and critique.

1. Apply the complete design method and maintain a decision record
2. Evolve the recurring system under changed workload and correctness requirements
3. Contrasting narrated designs: chat, news feed, file storage, and payment workflows
4. Integrated worked design with estimates, alternatives, failure analysis, and cost reasoning
5. Narrated architecture critique: explain revisions and unresolved trade-offs

Worked illustrations: End-to-end narrated designs for chat, feeds, file storage, and payments, with each case stating requirements, API/data examples, estimates, architecture, dominant bottleneck, failure behaviour, alternatives, and cost assumptions. Explain different decisions across cases instead of reusing the URL-shortener architecture. Revisit one decision under changed load or correctness requirements and show the revised diagram and rationale.

Outcome: Explain and critique complete designs using estimates, alternatives, correctness, failure, and cost reasoning; trace how changed requirements alter decisions.

Bridge: Continue with unfamiliar designs, original sources, and incident analyses to deepen architectural reasoning; practical competence requires separate implementation experience.

## Sources and scope

System design has no single official manual. The course combines [HTTP semantics (RFC 9110)](https://www.rfc-editor.org/rfc/rfc9110.html), [Gilbert and Lynch’s CAP paper](https://www.comp.nus.edu.sg/~gilbert/pubs/BrewersConjecture-SigAct.pdf), the [Raft project explanation](https://raft.github.io/), first-party [retry/idempotency reasoning](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/), and [OWASP threat-model guidance](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). Sources establish particular concepts under particular assumptions, not a universal architecture.

Selected full online chapters from Google’s [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/) inform operational reasoning. Publisher contents for [Designing Data-Intensive Applications, first edition](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/) inform the storage/distributed-systems scope comparison; full text was not accessed. The [Lewis/Fowler microservices article](https://martinfowler.com/articles/microservices.html) provides an architectural comparison. Detailed research limits and review tracking are in [README.md](../README.md).

Formal proofs, full protocol specifications, platform-specific deployment, comprehensive security/compliance, and implementation labs are outside scope. CAP, quorums, consensus, isolation, and delivery guarantees require stated definitions and assumptions. PACELC and several specialist sections need further primary-source verification before detailed lessons are authored. Architectural estimates are explicitly assumed or supplied; they are not asserted as production measurements.
