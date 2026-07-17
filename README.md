# Hypothesis Forge / مختبر الفرضيات

**Turn bold claims into testable research.**

Hypothesis Forge is a bilingual research workspace and Codex skill for stress-testing speculative, interdisciplinary, symbolic, numerical, historical, scientific, and textual claims. It preserves the creative insight while exposing assumptions, researcher degrees of freedom, rival explanations, controls, and possible failure.

**Live app:** https://hypothesis-forge.z13.chatgpt.site

The project is designed for the **Education** track of [OpenAI Build Week](https://openai.com/build-week/).

## What it does

1. **Freeze the claim** — state the exact claim, source boundary, unit of analysis, permitted transformations, and comparison class.
2. **Run a blind pass** — describe the source before revealing the proposed correspondence.
3. **Tier the evidence** — keep established facts, reasonable inferences, possible hypotheses, and symbolic interpretations separate.
4. **Match the controls** — give permutations, neighboring corpora, and negative controls the same search flexibility used by the favored claim.
5. **Make it lose** — define a risky prediction and the observation that would count against it.
6. **Issue a calibrated verdict** — score research readiness without presenting it as a probability that the claim is true.

## Product surfaces

- **Interactive bilingual site:** English and Arabic, full RTL support, responsive layout, keyboard focus states, and reduced-motion support.
- **Research-readiness audit:** a deterministic intake audit that never fabricates sources or pretends to decide whether a claim is true.
- **Codex handoff:** one click copies a complete `$forge-hypotheses` prompt with all frozen fields.
- **Portable report:** export the current claim, score, controls, falsification condition, and next test as Markdown.
- **Codex skill:** the full methodology and structured output contract live in `skill/forge-hypotheses/`.

## Why the split architecture matters

The browser app handles structured intake, transparency, and report portability. It deliberately does **not** fake semantic analysis or invent evidence. The Codex skill handles the reasoning-intensive blind analysis, strongest reconstruction, adversarial audit, and formal verdict with GPT‑5.6.

That separation is a safety feature: the lightweight interface can be inspected deterministically, while every model-generated conclusion must follow a visible research protocol.

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
```

The skill returns a human-readable report plus a stable JSON object suitable for later export or evaluation.

## Method safeguards

- Evidence used to invent a mapping cannot be counted again as an independent prediction.
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
