# Formal Output Contract

Use this contract for reports, app outputs, or machine-readable exports.

## Human-readable report

### Verdict

One paragraph containing the empirical status, confidence in the assessment, largest unresolved risk, and a separate statement of symbolic value. Use **not evaluable from supplied evidence** when material evidence is missing.

### Claim decomposition

Split compound claims into:

- empirical subclaim;
- symbolic or interpretive subclaim, when present.

Only the empirical subclaim receives an empirical score.

### Frozen claim

- Exact empirical claim
- Source boundary
- Mapping or mechanism
- Unit of analysis
- Allowed transformations
- Primary success criterion
- Comparison class

### Blind description

Report status as `independent`, `mapping_exposed`, or `not_performed`, then reproduce the frozen source description. Do not describe a mapping-exposed pass as independently blind.

### Strongest reconstruction

State the narrowest defensible version, mechanism, and novel prediction.

### Evidence ledger

Use a table with columns:

`Claim | Evidence tier | Relation forms | Construction | Independent? | Flexibility | Rival | Status`

Evidence tiers include `reported_unverified_observation`. Relation forms may contain `direct`, `structural`, both, or `not_applicable`. Construction is `native`, `projected`, `forced`, or `unknown`. Status includes `insufficient_evidence` and `not_evaluated` in addition to support or contradiction.

### Adversarial audit

List at least three serious objections. For each, record the rival model, why it could explain the result, the evidence that discriminates it, and the current disposition. Answer without rescue assumptions.

### Controls

Separate completed controls, results, and controls still required. For every control record:

- design;
- dimensions matched;
- whether the original selection/search flexibility was replayed;
- status;
- result or null distribution, when available.

### Disconfirming conditions

State the evidence pattern that would materially lower the score, its decision threshold, and validity assumptions. For probabilistic claims, do not promise that one observation is an absolute falsifier. For symbolic interpretations, `not_empirically_falsifiable` is valid; list textual counterevidence separately.

### Score

Name `score_target` as `frozen_original_claim` or `strongest_reconstruction`. Report all five axes, total, uncertainty kind, range, main sensitivity, and missing inputs. Unknown axes and the total may be `null`; planned controls earn no performance points. Confidence concerns the assessment, not the probability that the claim is true.

### Symbolic assessment

Report its basis, interpretive value, and the explicit statement that it supplies no empirical support by itself.

### Next decisive test

Name one bounded test, the data it needs, and how each possible result changes the verdict.

## Structured object

```json
{
  "verdict": {
    "empirical_status": "not_evaluable_from_supplied_evidence",
    "assessment_confidence": null,
    "confidence_kind": "qualitative_or_null",
    "largest_risk": "post_hoc_mapping_flexibility"
  },
  "claim_decomposition": {
    "empirical_subclaim": "",
    "symbolic_subclaim": null
  },
  "frozen_claim": {
    "claim": "",
    "source_boundary": "",
    "mapping_or_mechanism": "",
    "unit": "",
    "allowed_transformations": [],
    "success_metric": "",
    "comparison_class": ""
  },
  "blind_pass": {
    "status": "mapping_exposed",
    "description": []
  },
  "strongest_reconstruction": {
    "narrow_claim": "",
    "mechanism": "",
    "novel_prediction": ""
  },
  "evidence_ledger": [
    {
      "claim": "",
      "evidence_tier": "reported_unverified_observation",
      "relation_forms": ["structural"],
      "construction": "projected",
      "independent": false,
      "flexibility": "",
      "rival": "",
      "status": "not_evaluated"
    }
  ],
  "adversarial_audit": [
    {
      "objection": "",
      "rival_model": "",
      "discriminating_evidence": "",
      "disposition": "open"
    }
  ],
  "controls": {
    "completed": [
      {
        "design": "",
        "matched_on": [],
        "search_flexibility_replayed": false,
        "status": "not_run",
        "result": null
      }
    ],
    "required": []
  },
  "disconfirming_conditions": [
    {
      "pattern": "",
      "decision_threshold": "",
      "validity_assumptions": []
    }
  ],
  "score": {
    "score_target": "frozen_original_claim",
    "prior_specificity": null,
    "evidence_independence": null,
    "coherence": null,
    "controls": null,
    "falsifiability": null,
    "total": null,
    "uncertainty_kind": "subjective_sensitivity_range",
    "uncertainty_range": null,
    "main_sensitivity": "missing independent evidence",
    "missing_inputs": []
  },
  "symbolic_assessment": {
    "basis": "",
    "value": "",
    "empirical_support_by_itself": false
  },
  "next_test": {
    "name": "",
    "data_needed": "",
    "decision_rule": ""
  }
}
```

Use `null` for unknown values. Do not fabricate precision. Omit empty completed-control objects in actual output; the example shows the required shape only.
