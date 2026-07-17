# Hypothesis Forge Method

## Contents

1. Research object
2. Freeze sheet
3. Blind analysis protocol
4. Evidence ledger
5. Control design
6. Numerical-pattern controls
7. Textual and historical controls
8. Mechanism and prediction
9. Scoring anchors
10. Verdict language

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

## 2. Freeze sheet

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

## 3. Blind analysis protocol

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

## 4. Evidence ledger

Create one row per material claim:

| Field | Meaning |
| --- | --- |
| Claim | Exact proposition being evaluated |
| Source | Where the observation comes from |
| Independence | Whether it helped generate the hypothesis |
| Evidence tier | Established fact, reported/unverified observation, inference, hypothesis, or symbolic interpretation |
| Relation forms | Direct, structural, both, or not applicable |
| Construction | Native, projected, forced, or unknown |
| Flexibility used | Choices made to obtain the match |
| Rival explanation | Strongest alternative |
| Status | Supports, weakly supports, neutral, or contradicts |

Evidence used to invent a mapping cannot also be counted as an independent prediction.

## 5. Control design

Use controls that preserve the original search freedom.

### Permutation control

Shuffle assignments while preserving the number of units, group sizes, and scoring procedure. Compare the observed score with the null distribution.

### Matched-corpus control

Apply the same procedure to neighboring or similar sources. Do not choose obviously unrelated material.

### Analyst-flexibility control

Allow the control analyst the same synonym, segmentation, and repair options used for the favored mapping.

### Negative control

Choose a case where the mechanism predicts no effect. A method that finds a strong match there is over-flexible.

### Prospective holdout

Freeze a new prediction and test it on unseen material. This is usually the most decisive control.

For every control, record its design, the dimensions matched, whether the original selection and search flexibility were replayed, its status, and its result. “Random control” without this audit trail is not an adequate result.

## 6. Numerical-pattern controls

For counts, letter values, dates, or element numbers:

1. Define normalization before counting.
2. List every alternate normalization that could have been selected.
3. Estimate the number of tried or available comparisons.
4. Correct for multiple comparisons.
5. Use shuffled mappings and matched texts.
6. Report the full null distribution, not only the best random example.
7. Test whether a nearby number would have been accepted after reinterpretation.

An exact number is weak evidence when many routes could produce an acceptable number.

## 7. Textual and historical controls

Separate:

- wording attested in the source;
- later orthography or vocalization;
- manuscript evidence;
- chronology;
- semantic development;
- interpretive tradition;
- modern scientific vocabulary.

Do not let a modern technical sense silently replace an earlier ordinary sense. When chronology is uncertain, present parallel scenarios rather than a single reconstructed history.

## 8. Mechanism and prediction

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

## 9. Scoring anchors

### Prior specificity — 0 to 20

- 0–4: target chosen after inspecting results
- 5–9: partly specified, many repairs allowed
- 10–14: mostly fixed with limited ambiguity
- 15–17: preregistered or clearly prior
- 18–20: precise prior prediction with narrow outcome space

### Evidence independence — 0 to 20

- 0–4: all evidence reused from discovery
- 5–9: weakly independent support
- 10–14: several independent observations
- 15–17: clear holdout support
- 18–20: replicated prospective evidence

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

## 10. Verdict language

Use calibrated conclusions:

- “Supported under the frozen test” for claims that beat matched controls.
- “Promising but undercontrolled” when the structure is strong and controls are incomplete.
- “Interesting correspondence” when the pattern is real but evidential independence is weak.
- “Symbolically productive” when the interpretation has explanatory or literary value without empirical force.
- “Unsupported as stated” when controls erase the effect or the claim cannot fail.
- “Not evaluable from supplied evidence” when the claim is testable but the evidence needed to score it was not provided.

Always name the next test most likely to change the verdict.

The total-score bands apply only when material evidence and control results exist. A precise, plausible scientific hypothesis with no supplied evidence is untested, not thereby symbolic or false.
