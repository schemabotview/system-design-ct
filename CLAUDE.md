# CLAUDE.md — system-design-ct

A GraphL concept app: **System Design — From Foundations to Advanced Design.** One concept, nine
courses (one per chapter of `SYSTEM-DESIGN-COURSE-PLAN.md`), each course a list of sections. A
**section** is `(scene, slide, narration)` and is one segment of the course video.

The render engine is `@graphlearning/flow`, the shell is `@graphlearning/shell`; both are published
packages pinned by version. This repo's own surface is `src/content/`, `src/scenes/`, `src/main.tsx`
and `src/theme.css`. The scaffold's invariants and layout budgets are in
`schemabotview/content-repo-template/CLAUDE.md` and are not repeated here — read them before
authoring: never write `x`/`y`, never reimplement the shell, never commit a `file:../` pin, never
hand-produce narration.

## Route contract

`#/` is the catalog; a section is `#/<courseId>-<sectionId>`; `?capture=1` for frames. Dev serves at
`/`; the production build's `base` is `/system-design-ct/` (so `vite preview` 404s its assets — use
`npm run dev` to review).

## Course arc

| # | Course id | Plan chapter | Sections |
| --- | --- | --- | --- |
| 1 | `frame-the-problem` | Frame the Problem and Explain an Initial Design | 6 — authored |
| 2 | `trace-requests` | Trace Requests and Design Communication | 9 — authored |
| 3 | `model-and-store-data` | Model and Store Data Correctly | 9 — authored |
| 4 | `scale-bottlenecks` | Scale Measured Bottlenecks | 9 — authored |
| 5 | `distributed-correctness` | Reason About Distributed Correctness | 11 — authored |
| 6 | `async-processing` | Design Asynchronous Processing | 9 — authored |
| 7 | `service-boundaries` | Define Service Boundaries and Evolve Architecture | 6 — authored |
| 8 | `operate-and-recover` | Operate, Secure, and Recover Systems | 11 — authored |
| 9 | `integrate-and-critique` | Integrate and Critique Complete Designs | 5 — authored |

Teaching method per section (from the plan): objective → mental model → worked diagram, calculation,
API example or timeline → alternative/failure contrast → summary → bridge.

## Authoring rules for this repo

- **One scene per file**, and the scene's own `id: '…',` must be the first line-anchored `id:` in the
  file — `check` finds scene ids that way, so a second scene in a file would not be seen.
- **Section files** are `src/content/<course>/NN-<section-id>.ts`; the slide template literal must be
  followed by `,\n  narration` or `check` skips the file.
- **State assumptions.** Any workload, latency or target is labelled assumed/illustrative on the
  slide or the scene caption. Never present a hypothetical as a measurement.
- **Narration is spoken**: spell out numbers, paths and symbols; no markdown.
- **A scene that is a table or a long row does not fill the pane.** Restack with `flow: 'TB'`, one
  container per row, or `cols`; the pane is ~1:1. A wide `table` node rendered tiny in chapter 1 and
  was replaced by one container per attribute.
- **Sequence diagrams and timelines are not native.** Draw them as `LR`/`TB` flows with edge labels,
  plus `table`, `list` and `code` nodes for histories. Look at the route — edge labels can land on
  cards and `check` cannot see it.
- **`plot` series `labelAt` is an absolute data coordinate, not an offset.**
- **Write node ids as literals** (`id: 'x',`). `check`'s focus guard reads them with a regex, so ids
  built by a helper or template string are invisible to it and any `focus:` on them is rejected.
- **`badge` is not rendered** by the installed `@graphlearning/flow` (1.3.0) — it belongs to the
  unreleased look. Put ordinals in labels instead.
- **Wide rows shrink the type.** A container with many `cols` (e.g. 5 or 4 across) or a wide `LR` row
  binds the scene on width and renders it small; restack to 2–3 columns or `TB` before adding content.
- **Two-up grids:** a scene with `cols: 2` and no top-level edges lays containers out as a grid,
  which fills the pane far better than a wide `LR` row of the same containers.
- **`icon:` names** — the 75 valid lucide keys (copy from here, not from lucide's catalogue):
  `monitor terminal code filecode cloud building braces cpu layers globe database network wrench
  receipt tag gauge bell key shieldcheck usercheck scanface scroll gitbranch ban circlecheck
  circleslash router dooropen server boxes clock repeat lock scale workflow box gears memory zap
  brain waves share funnel copy table harddrive folder file users power plug scissors link skull
  search pencil sigma hash sortarrows regex bug barchart chartpie star snowflake calendar ruler
  history merge warehouse package swap trash tree fingerprint`

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

A floor, not proof. Review each route in the browser, and **measure** — do not eyeball — both
density targets: slide height 80–95 % of the 1080px pane (read it in a 1920×1080 render as the
distance from the first to the last child of `.slide-panel__scaler`; `check` models it and caps at
1000px, which is stricter than the render) and scene fill. Chapter 1's first pass shipped four slides
at 70–78 % because this was only eyeballed; add real teaching content, not padding, to raise one. `check` only requires wavs for a course once that
course has its first wav, so an unrecorded course does not fail it.

## Working agreement

- Author the whole unit — scenes, slides and narration — then hand over the route.
- No ASCII sketches of scenes.
- No silent scaffolding or out-of-scope work. Say what was built, verified and left out.
