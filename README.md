# Hypothesis Forge / مختبر الفرضيات

**Turn bold claims into testable research.**

Hypothesis Forge is a bilingual research workspace and Codex skill for stress-testing speculative, interdisciplinary, symbolic, numerical, historical, scientific, and textual claims. It preserves the creative insight while exposing assumptions, researcher degrees of freedom, rival explanations, controls, and possible failure.

The project is designed for the **Education** track of [OpenAI Build Week](https://openai.com/build-week/).

**Live app:** https://hypothesis-forge.z13.chatgpt.site

## What it does

1. **Freeze the claim and its lineage** — state the exact claim, source boundary, unit of analysis, permitted transformations, comparison class, and one of three explicit parent-history states.
2. **Run a blind pass** — describe the source before revealing the proposed correspondence.
3. **Tier the evidence** — keep established facts, reasonable inferences, possible hypotheses, and symbolic interpretations separate.
4. **Freeze the rival rule and match the controls** — choose the strongest-rival criterion before comparative scoring, preserve unresolved ties, and give controls the same search flexibility used by the favored claim.
5. **Make it lose** — define a risky prediction and the observation that would count against it.
6. **Issue a calibrated verdict** — score research readiness without presenting it as a probability that the claim is true.

## Product surfaces

- **Interactive bilingual site:** English and Arabic, full RTL support, responsive layout, keyboard focus states, and reduced-motion support.
- **Research-readiness audit:** a deterministic intake audit that never fabricates sources or pretends to decide whether a claim is true.
- **Codex handoff:** one click copies a complete `$forge-hypotheses` prompt with all frozen fields.
- **Portable provenance:** every frozen claim can carry a canonical SHA-256 record and tagged parent hashes (`supplied`, `none_disclosed`, or `unknown`) without pretending that a hash proves authorship or historical truth.
- **Portable report:** export the claim lineage, frozen rival rule, score, controls, falsification condition, and next test as Markdown.
- **Codex skill:** the full methodology and structured output contract live in `skill/forge-hypotheses/`.

## Why the split architecture matters

The browser app handles structured intake, transparency, and report portability. It deliberately does **not** fake semantic analysis or invent evidence. The Codex skill handles the reasoning-intensive blind analysis, strongest reconstruction, adversarial audit, and formal verdict with GPT‑5.6.

That separation is a safety feature: the lightweight interface can be inspected deterministically, while every model-generated conclusion must follow a visible research protocol.

## Built with Codex and GPT‑5.6

**Demo video:** https://www.youtube.com/watch?v=KztBHm9FPBc

Codex was the primary implementation workspace for this Build Week project. Working with GPT‑5.6 accelerated:

- translating the research protocol into a bilingual Vinext/React interface with full Arabic RTL support;
- turning the methodology into a reusable `$forge-hypotheses` Codex skill with a stable report contract;
- implementing the deterministic intake audit, Markdown export, accessibility states, and responsive layout;
- refining the product copy, documentation, build validation, and test coverage.

The key decisions made during the Codex workflow were:

1. **Separate interface from inference.** The browser performs transparent, deterministic intake; GPT‑5.6 reasoning is handled by the explicit Codex skill.
2. **Never fabricate evidence.** The interface does not invent sources or pretend to decide whether a claim is true.
3. **Make falsification first-class.** Evidence tiers, matched controls, rival explanations, and risky predictions remain visible throughout the workflow.
4. **Protect user claims.** The quick audit stays client-side, and content leaves the page only when the user deliberately copies it to Codex.

GPT‑5.6 was used through Codex to reason about the architecture, pressure-test the methodology, refine bilingual copy, and implement and validate the working product. At runtime, deeper model-assisted analysis is intentionally handed off to the included skill so that every conclusion follows the visible research protocol.


## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm run install:ci
npm run dev
```

Open the local URL printed by the development server.

## Validate

```bash
npm run lint
npm run test
```

The build pipeline verifies that the output includes a deployable ESM Worker and a valid Sites hosting manifest.

## Use the Codex skill

The repository includes the complete skill bundle at `skill/forge-hypotheses/`. Once the skill is available in Codex, invoke it explicitly:

```text
$forge-hypotheses

Stress-test this claim with a blind pass, evidence tiers, matched controls,
explicit falsification, and a five-axis score. Do not invent evidence.

Exact claim: …
Source/data boundary: …
Unit of analysis: …
Comparison class: …
Proposed falsification condition: …
Parent claim hashes status: unknown
Rival selection criterion (frozen before scoring): …
Serious rival candidates: …
```

The skill returns a human-readable report plus a stable JSON object suitable for later export or evaluation.

## Method safeguards

- Evidence used to invent a mapping cannot be counted again as an independent prediction.
- Parent lineage is never represented by an ambiguous empty array: supplied ancestry requires full hashes, while `none_disclosed` and `unknown` stay distinct.
- SHA-256 establishes canonical content integrity only; it does not verify authorship, chronology, lineage completeness, or truth.
- The strongest-rival selection criterion is frozen before comparative scoring, and a material tie remains `unresolved`.
- An absence of disproof is never presented as proof.
- Numerical coincidences require frozen normalization, multiple-comparison correction, and matched null controls.
- Symbolic or literary value is reported separately from empirical force.
- Medical, legal, financial, and safety-critical claims require current authoritative sources.

## Repository map

```text
app/
  page.tsx          Interactive product and bilingual copy
  globals.css       Editorial visual system and responsive states
skill/
  forge-hypotheses/
    SKILL.md        Agent workflow and guardrails
    references/     Method and output contract
public/
  favicon.svg       Product mark
```

## Build Week judging path

- **Technological implementation:** a working Vinext/React interface plus a reusable Codex skill and structured report contract.
- **Design:** a coherent bilingual editorial system with accessible interaction states.
- **Impact:** helps learners and independent researchers preserve curiosity without confusing resonance for evidence.
- **Idea quality:** treats falsifiability and counter-models as first-class creative tools, not as an afterthought.

## Privacy

Hypothesis Forge stores no user claims on a server. The quick audit runs in the browser. A claim leaves the page only when the user deliberately copies it into Codex.

## License

MIT
