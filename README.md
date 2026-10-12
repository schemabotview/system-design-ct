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

| # | Course id | Sections | State |
| --- | --- | --- | --- |
| 1 | `frame-the-problem` | 6 of 6 | Authored — slides, scenes and narration text. **Narration wavs not generated.** |
| 2–9 | — | 0 of 9, 9, 9, 11, 9, 6, 11, 5 | Not started |

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
