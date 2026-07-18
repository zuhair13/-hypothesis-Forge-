# Hypothesis Forge Method

## Contents

1. Research object
2. Portable claim provenance and selection history
3. Freeze sheet
4. Blind analysis protocol
5. Evidence ledger
6. Control design
7. Numerical-pattern controls
8. Textual and historical controls
9. Historical backtests
10. Mechanism and prediction
11. Comparative scoring anchors
12. Verdict language

## 1. Research object

Convert the user's idea into a tuple:

`claim = source + mapping + relation + expected outcome + comparison class`

Example:

- Source: a fixed text or dataset
- Mapping: named units assigned to external categories
- Relation: shared order, function, quantity, or transformation
- Expected outcome: unusually coherent matches
- Comparison class: equally plausible alternative assignments

If the claim cannot be expressed this way, it may still be a symbolic reading, but it is not ready for empirical testing.

## 2. Portable claim provenance and selection history

Before scoring prior specificity, record the disclosed history of the claim:

- a stable claim identifier, the canonical claim hash, and any parent claim hashes;
- earlier formulations or mappings;
- failed, abandoned, or inconclusive tests;
- definitions, transformations, datasets, targets, and thresholds already tried;
- the path by which the current version was selected;
- whether the same evidence shaped an earlier version.

Set disclosure status to:

- `supplied` — a history was supplied, including an explicit list of prior attempts when applicable;
- `none_disclosed` — the user reports no prior attempts, without independent verification;
- `unknown` — the history was not obtained or cannot be reconstructed.

Never translate `none_disclosed` into “no prior attempts occurred.” If lineage is unknown, carry that uncertainty into prior specificity, multiplicity, and the verdict. Evidence that shaped any parent version remains discovery evidence for its descendants unless a genuinely independent prediction or holdout was frozen before inspection.

### Portable hash record

Canonicalize only the frozen claim fields under version `hf-claim-v1`: exact empirical claim, source boundary, mapping or mechanism, unit of analysis, allowed transformations, success metric, and comparison class. Normalize Unicode to NFC, convert line endings to LF, trim leading and trailing whitespace in string fields, represent unknown scalar fields as `null` and unknown list fields as `[]`, serialize keys in that documented order as UTF-8 JSON, and compute SHA-256. Record the full digest as `sha256:<64 lowercase hexadecimal characters>` and set `claim_id` to `hf-claim:<the same full digest>`; never use a shortened display value as the portable identifier or hash.

Represent parent provenance as a tagged object, never as a bare or empty array:

| Status | `hashes` value | Meaning |
| --- | --- | --- |
| `supplied` | non-empty array of full hashes | The user supplied one or more parent versions. |
| `none_disclosed` | `null` | The user says there are no parent versions; this is unverified. |
| `unknown` | `null` | The history was not asked, cannot be reconstructed, or an older export is unavailable. |

Reject `supplied` with `null` or an empty array. Reject either other status with a hash array. Preserve `unknown` rather than silently converting missing legacy fields to `none_disclosed`.

The hash establishes content integrity and can support continuity between versions when a parent hash is supplied. It does not verify authorship, timestamps, chronological order, completeness of the disclosed lineage, or the truth of any claim. State those limits in every portable export.

## 3. Freeze sheet

Before inspecting outcomes, record:

- corpus version and boundaries;
- unit of analysis;
- normalization rules;
- inclusion and exclusion rules;
- ordering source;
- permitted synonyms or transformations;
- missing-data treatment;
- primary metric;
- comparison class;
- stopping rule.

Record the number of available values or transformations for each unfrozen choice. A choice among twenty spellings creates more multiplicity than a binary choice; do not count every open choice as merely one degree of freedom. More search space demands stronger controls.

## 4. Blind analysis protocol

### Stage A — source only

Describe the source with no access to the proposed target mapping. Extract entities, actions, relations, sequence, contrasts, quantities, and omissions.

### Stage B — target only

Describe the target system independently using the same feature vocabulary. Do not search for source terms.

### Stage C — locked comparison

Compare the two frozen descriptions. A match that appears only after changing vocabulary or segmentation is post-hoc and must be marked.

### Stage D — holdout

Reserve at least one unit, edge, or prediction that did not shape the mapping. Evaluate it last.

Record blind-pass status:

- `independent` — the source-only analyst or context had no access to the mapping;
- `mapping_exposed` — the analyst had seen it and could only bracket it;
- `not_performed` — no valid source-only pass was completed.

Blind status must affect scoring. A `mapping_exposed` or `not_performed` pass receives no blind-independence component points even when its description is useful.

## 5. Evidence ledger

Create one row per material claim:

| Field | Meaning |
| --- | --- |
| Claim | Exact proposition being evaluated |
| Claim version | The lineage identifier for the version this evidence bears on |
| Source | Where the observation comes from |
| Independence | Whether it helped generate the hypothesis |
| Evidence tier | Established fact, reported/unverified observation, inference, hypothesis, or symbolic interpretation |
| Relation forms | Direct, structural, both, or not applicable |
| Construction | Native, projected, forced, or unknown |
| Flexibility used | Choices made to obtain the match |
| Rival explanation | Strongest alternative |
| Status | Supports, weakly supports, neutral, or contradicts |

Evidence used to invent a mapping cannot also be counted as an independent prediction.

## 6. Control design

Use controls that preserve the original search freedom.

### Permutation control

Shuffle assignments while preserving the number of units, group sizes, and scoring procedure. Compare the observed score with the null distribution.

### Matched-corpus control

Apply the same procedure to neighboring or similar sources. Do not choose obviously unrelated material.

### Analyst-flexibility control

Allow the control analyst the same synonym, segmentation, and repair options used for the favored mapping.

### Discovery-pipeline control

Replay the complete discovery procedure against matched null cases, including target selection, alternate definitions, transformations, stopping behavior, and the freedom to keep the best result. A null control that receives less search freedom than the favored claim is not matched.

### Negative control

Choose a case where the mechanism predicts no effect. A method that finds a strong match there is over-flexible.

### Prospective holdout

Freeze a new prediction and test it on unseen material. This is usually the most decisive control.

For every control, record its design, the dimensions matched, whether the original selection and search flexibility were replayed, its status, and its result. “Random control” without this audit trail is not an adequate result.

## 7. Numerical-pattern controls

For counts, letter values, dates, or element numbers:

1. Define normalization before counting.
2. List every alternate normalization that could have been selected.
3. Estimate the number of tried or available comparisons.
4. Correct for multiple comparisons.
5. Use shuffled mappings and matched texts.
6. Report the full null distribution, not only the best random example.
7. Test whether a nearby number would have been accepted after reinterpretation.

An exact number is weak evidence when many routes could produce an acceptable number.

If the tried or available comparison space cannot be disclosed or credibly bounded, require a matched discovery-pipeline control. If neither multiplicity correction nor matched-pipeline evidence is available, set control performance and the total to `null`; do not issue a numerical empirical verdict from the selected pattern alone.

## 8. Textual and historical controls

Separate:

- wording attested in the source;
- later orthography or vocalization;
- manuscript evidence;
- chronology;
- semantic development;
- interpretive tradition;
- modern scientific vocabulary.

Do not let a modern technical sense silently replace an earlier ordinary sense. When chronology is uncertain, present parallel scenarios rather than a single reconstructed history.

## 9. Historical backtests

A historical reconstruction is vulnerable to outcome leakage because the analyst or model may already know which theory later succeeded. Before analysis, record:

- the evidence cutoff date;
- the allowed contemporaneous corpus and any excluded later material;
- whether names, dates, distinctive wording, and outcome-revealing details were anonymized;
- whether later confirming and disconfirming evidence was held out;
- outcome exposure as `blinded`, `likely_exposed`, or `not_applicable`.

Use `blinded` only when the case is anonymized enough that its identity and eventual outcome are not reasonably inferable. Otherwise use `likely_exposed`, even if the analyst promises to ignore later knowledge. A likely-exposed reconstruction may assess coherence but cannot count as an independent historical forecast: assign 0 blind-pass independence points and do not count later evidence as a prospective holdout for that run.

Evaluate the frozen report against later evidence only after its predictions and failure conditions are recorded. Benchmark both later-supported and later-rejected hypotheses from comparable periods to reduce survivorship bias. Score whether the protocol discriminated among contemporaneous rivals, not whether it merely retold the winning theory.

## 10. Mechanism and prediction

A strong mechanism:

- explains why the mapping should exist;
- limits what can match;
- produces risky predictions;
- survives plausible alternative definitions;
- connects independent observations.

A weak mechanism restates the observed similarity in new words.

Write at least one prediction in this form:

`If the claim is correct, then under frozen rule R, unseen case H should produce outcome O; outcome not-O would count against the claim.`

For probabilistic claims, replace a single absolute falsifier with a preregistered disconfirming pattern, decision threshold, and validity assumptions. For symbolic interpretations, it is valid to state `not empirically falsifiable`; list textual or interpretive counterevidence separately.

## 11. Comparative scoring anchors

Before scoring candidates, list the serious rivals considered and freeze a `selection_criterion` that identifies what “strongest” means for this audit, such as maximum explanatory coverage under the same evidence boundary with the fewest rescue assumptions. Record why each candidate qualifies as serious. Do not edit the criterion after seeing comparative axis scores.

Apply the frozen criterion, record the selection reason, then score the focal empirical claim and the selected strongest serious rival on the same five axes, against the same evidence cutoff and comparison boundary. If the rival lacks information needed for an axis, use `null`; do not penalize it for missing inputs that were never sought. Report explanatory coverage, novel predictions, and failure conditions alongside both profiles.

If the frozen criterion leaves two or more candidates materially tied, record all tied candidate identifiers, set `selection_status` and the comparative verdict to `unresolved`, and either score every tied rival under the same boundary or state what missing evidence prevents selection. Never create a post-hoc tie-break from the observed scores.

Use `selection_status: selected` only with exactly one selected rival identifier. Use `selection_status: unresolved` with every materially tied candidate identifier, or with an empty identifier list when the evidence cannot identify even a tied set.

The five equal 20-point axes are a heuristic diagnostic convention. They are not calibrated probabilities, likelihood ratios, or validated measurements. The score difference between models is descriptive only.

### Prior specificity — 0 to 20

- 0–4: target chosen after inspecting results
- 5–9: partly specified, many repairs allowed
- 10–14: mostly fixed with limited ambiguity
- 15–17: preregistered or clearly prior
- 18–20: precise prior prediction with narrow outcome space

Scores of 15 or more require dated or otherwise frozen evidence of prior specification, or a sufficiently documented lineage. `none_disclosed` by itself does not establish prior specification.

### Evidence independence — 0 to 20

Sum four 0–5 components:

1. source-provenance independence;
2. separation of discovery from testing;
3. blind-pass independence;
4. holdout or prospective-prediction independence.

For each component, use 0 when independence is absent or contaminated, 1–2 when it is weak or unclear, 3–4 when it is substantial with a named limitation, and 5 only when it is clearly documented. A `mapping_exposed` or `not_performed` pass receives 0 for component 3. No genuinely independent holdout or prospective prediction receives 0 for component 4.

### Coherence — 0 to 20

- 0–4: isolated resemblance
- 5–9: loose thematic cluster
- 10–14: consistent structural relation
- 15–17: constrained mechanism
- 18–20: mechanism unifies and predicts multiple observations

### Controls — 0 to 20

- 0–4: no meaningful control
- 5–9: weak or unmatched controls
- 10–14: credible matched comparisons
- 15–17: strong permutation or negative controls
- 18–20: preregistered, replicated control performance

### Falsifiability — 0 to 20

- 0–4: compatible with every outcome
- 5–9: failure conditions vague
- 10–14: explicit but untested failure conditions
- 15–17: risky tested prediction
- 18–20: repeated successful predictions with clear failure boundaries

### Non-compensatory rules

- If a material axis is unknown, set that axis and the total to `null`.
- If evidence independence or control performance is below 10 or `null`, the verdict cannot use the **strong research claim** band even if the arithmetic total reaches 80.
- High coherence, specificity, or symbolic value cannot erase weak independence, failed controls, or outcome leakage.
- Report every triggered constraint as a gating flag rather than silently lowering another axis.

## 12. Verdict language

Use calibrated conclusions:

- “Supported under the frozen test” for claims that beat matched controls.
- “Promising but undercontrolled” when the structure is strong and controls are incomplete.
- “Interesting correspondence” when the pattern is real but evidential independence is weak.
- “Symbolically productive” when the interpretation has explanatory or literary value without empirical force.
- “Unsupported as stated” when controls erase the effect or the claim cannot fail.
- “Not evaluable from supplied evidence” when the claim is testable but the evidence needed to score it was not provided.

Always name the next test most likely to change the verdict.

The total-score bands apply only when material evidence and control results exist. A precise, plausible scientific hypothesis with no supplied evidence is untested, not thereby symbolic or false.
