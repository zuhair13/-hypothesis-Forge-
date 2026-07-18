---
name: forge-hypotheses
description: Stress-test speculative, interdisciplinary, symbolic, numerical, historical, scientific, or textual hypotheses with blind analysis, evidence tiers, counter-models, controls, and explicit falsification criteria. Use when a user asks whether an unusual pattern is meaningful, wants the strongest version of a claim followed by an adversarial audit, needs to separate fact from inference and interpretation, or wants a research-ready verdict without mistaking symbolic resonance for scientific proof.
---

# Forge Hypotheses

Turn an interesting claim into a testable research object. Preserve creativity while making every assumption, degree of freedom, and possible failure visible.

## Core rule

Run the analysis in this order:

1. Freeze the claim, portable provenance record, disclosed lineage, permitted transformations, and rival-selection criterion.
2. Perform a blind pass without the proposed mapping.
3. Reconstruct the strongest defensible version.
4. Attack it with alternatives and controls.
5. State what would falsify it.
6. Issue a calibrated verdict.

Do not begin by defending the proposed correspondence. Do not collapse symbolic coherence into empirical evidence.

The six-step sequence governs the analysis. Complete it before rendering the final report; only the finished report leads with the verdict.

## Intake

Extract or ask only for information that changes the test:

- the exact claim;
- the source corpus or observations;
- the proposed mapping or mechanism;
- the unit of analysis;
- allowed transformations and exclusions;
- the comparison class;
- what outcome would count as success or failure;
- prior versions, failed tests, transformations already tried, and how this version was selected.

If any item is unknown, mark it as an open degree of freedom instead of silently choosing it.

Record claim lineage with a portable claim identifier, a canonical SHA-256 hash of the frozen claim fields, and a tagged `parent_claim_hashes` value. It must distinguish exactly three states:

- `supplied` with one or more parent hashes;
- `none_disclosed` with no hash list, meaning the user reports no parent claim without independent verification;
- `unknown` with no hash list, meaning lineage was not asked, cannot be reconstructed, or an earlier export was lost.

Never represent `none_disclosed` or `unknown` as an empty array, and reject `supplied` with an empty array. A hash demonstrates only that the same canonical content is being referenced; it does not establish authorship, chronology, completeness of lineage, or truth. Treat undisclosed or unknown search history as unresolved researcher freedom, not as prior specificity.

If a claim mixes an empirical assertion with a symbolic or interpretive assertion, split it into explicit subclaims. Score only the empirical subclaim. Assess interpretive value separately.

## Evidence labels

Label every material statement:

- **Established fact** — independently documented observation or accepted domain fact.
- **Reported/unverified observation** — a measurement, feature, or quotation supplied by the user but not independently checked.
- **Reasonable inference** — follows from the evidence but is not directly observed.
- **Possible hypothesis** — plausible, testable explanation with unresolved alternatives.
- **Symbolic interpretation** — meaningful reading whose force is semantic or aesthetic rather than empirical.

For a proposed correspondence, use two separate fields:

- **Relation form:** `direct`, `structural`, or both. Use `not_applicable` for an ordinary causal claim with no correspondence.
- **Construction:** `native` when the relation is present under frozen ordinary definitions; `projected` when it requires an imported model; `forced` when it depends on selective counting, unstable definitions, or post-hoc repair; `unknown` when construction cannot be assessed.

## Blind pass

Hide the target mapping from an independent source-only context or analyst whenever possible. If the same model or analyst has already seen it, bracket the mapping and label the pass **mapping-exposed**, never independently blind. If no source-only pass is possible, label it **not performed**.

Describe the source independently:

- dominant entities and actions;
- sequence and causal structure;
- repeated contrasts;
- measurable quantities;
- natural comparison classes;
- features that are absent but would be expected under the claim.

Record the blind description and status (`independent`, `mapping_exposed`, or `not_performed`) before comparing mappings. Reuse the description unchanged in the final report.

For a historical backtest, freeze an evidence cutoff date and allowed corpus, hold later evidence out, and record whether the claim identity and eventual outcome were hidden. Because a model may already know a famous case, label outcome exposure `blinded` only when the case is sufficiently anonymized and the outcome is not inferable; otherwise use `likely_exposed`. Never present a likely-exposed historical reconstruction as an independent forecast; give it 0 blind-pass independence points and do not count later evidence as a prospective holdout for that run.

## Strongest version

Apply the principle of charity without adding rescue assumptions. State:

- the smallest claim that retains the interesting insight;
- the mechanism or structural bridge;
- predictions that were not used to construct the mapping;
- why the claim is better than the nearest alternative.

Prefer a narrow, testable claim over a sweeping claim that survives only by metaphor.

## Adversarial audit

Generate at least three serious alternatives. Test, where applicable:

- shuffled or permuted mappings;
- matched random controls;
- neighboring texts, datasets, dates, or categories;
- alternative spellings, segmentations, orderings, and counting rules;
- base rates and multiple-comparison burden;
- researcher degrees of freedom;
- holdout material not used during discovery;
- negative evidence and failed correspondences.

Do not call a control adequate merely because it is random. Match it to the same flexibility and selection process used by the original claim.

List the serious rival candidates and why each is credible. Freeze `selection_criterion` before scoring any rival on the comparative axes. Then apply that fixed criterion to identify the strongest serious rival, reconstruct it charitably, and score it on the same five axes using the same evidence boundary. Record the candidates considered, frozen criterion, selection reason, and selected rival identifier. If the fixed criterion leaves a material tie, set selection status and comparative verdict to `unresolved`; do not invent a post-hoc tie-break. Do not treat the score difference as a probability, Bayes factor, or proof that one model is true.

For a pattern discovered after searching many definitions, transformations, dates, texts, or targets, disclose or bound the search space and either apply an appropriate multiple-comparison correction or replay the full discovery procedure on matched null controls. If neither is possible, set control performance to `null`, keep the total `null`, and report that the empirical claim is not evaluable from the supplied evidence.

Read [references/method.md](references/method.md) when designing controls, scoring a complex claim, or handling numerical patterns. Read [references/output-contract.md](references/output-contract.md) when producing a formal report or structured data.

## Scoring

Name the score target: the frozen original empirical claim or the strongest reconstruction. Score five axes from 0–20, then total them without hiding uncertainty:

1. Prior specificity
2. Evidence independence
3. Mechanistic or structural coherence
4. Performance against controls
5. Falsifiability and predictive yield

If evidence needed for an axis was not supplied, use `null`; do not turn missing evidence into a low empirical score. Planned controls earn no control-performance points. If material axes are unknown, set the total to `null`, report **not evaluable from supplied evidence**, and do not apply the bands below.

Build **Evidence independence** from four explicit 0–5 components: source provenance independence, separation of discovery from testing, blind-pass independence, and holdout or prospective-prediction independence. A `mapping_exposed` pass receives 0 for the blind-pass component. If no genuinely independent holdout or prospective prediction exists, the holdout component is 0. Other independent evidence may still earn its own component points.

The five equal 20-point axes are a transparent diagnostic convention, not an empirically calibrated measurement or probability model. Interpret the axis profile before the total. A high coherence score cannot compensate for failed or unknown evidence independence or control performance. Never use the strong-research band when either of those axes is below 10 or `null`, regardless of the arithmetic total.

Use score ranges only as summaries when the evidence is sufficient:

- **80–100:** strong research claim, pending replication where relevant
- **60–79:** promising but materially undercontrolled
- **40–59:** interesting pattern with weak evidential force
- **20–39:** mostly post-hoc or symbolic
- **0–19:** unsupported or non-testable as stated

A symbolic interpretation may be rich even when its empirical score is low. Report those judgments separately.

Treat the uncertainty range as a subjective sensitivity range unless a statistical model supplies a defined interval. Name its main driver. Any confidence value is confidence in the assessment, not the probability that the claim is true; use qualitative confidence or `null` rather than fabricated precision.

## Required output

Lead with the verdict, then provide:

1. Portable claim provenance, lineage, and selection history
2. Claim frozen for testing
3. Blind description and, when applicable, historical outcome-exposure status
4. Strongest defensible reconstruction
5. Evidence ledger with both label systems
6. Best objections and alternative explanations
7. Frozen rival-selection record, strongest rival scored on the same axes, and a comparative verdict that may remain `unresolved`
8. Controls run or still required, including multiplicity handling
9. Disconfirming conditions, thresholds, and validity assumptions
10. Five-axis score profile with uncertainty and gating flags
11. Symbolic value, stated separately
12. Next decisive test

Use direct language. Say when a match is impressive, and say when it is manufactured by flexibility. Never present an absence of disproof as proof.

## Boundaries

- Do not manufacture citations or measurements.
- Do not use numerology as scientific evidence without a preregistered rule and matched controls.
- Do not turn theological, literary, or philosophical meaning into a laboratory claim by wording alone.
- Do not dismiss symbolic interpretation merely because it is not empirical; classify it correctly.
- For medical, legal, financial, or safety-critical claims, use current authoritative sources and state the limits of the analysis.
