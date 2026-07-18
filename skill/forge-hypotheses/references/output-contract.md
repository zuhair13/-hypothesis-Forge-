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

### Portable claim provenance and lineage

Record a claim identifier, canonicalization version, the exact fixed-order canonical payload, full SHA-256 claim hash, tagged parent-hash state, prior formulations, failed or inconclusive tests, transformations already tried, selection path, and history limitations. `parent_claim_hashes` must be `supplied` with a non-empty hash array, `none_disclosed` with `hashes: null`, or `unknown` with `hashes: null`. Empty arrays are invalid. Treat `none_disclosed` as an unverified report, not proof that no earlier attempt exists, and preserve `unknown` for missing legacy provenance. State that the hash verifies canonical content integrity only—not authorship, chronology, lineage completeness, or truth.

### Frozen claim

- Exact empirical claim
- Source boundary
- Mapping or mechanism
- Unit of analysis
- Allowed transformations
- Primary success criterion
- Comparison class

### Historical backtest

When applicable, report the evidence cutoff date, allowed contemporaneous corpus, excluded later material, anonymization status, held-out later evidence, and outcome exposure as `blinded`, `likely_exposed`, or `not_applicable`. A likely-exposed reconstruction is not an independent forecast.

### Blind description

Report status as `independent`, `mapping_exposed`, or `not_performed`, then reproduce the frozen source description. Do not describe a mapping-exposed pass as independently blind. Record the resulting blind-independence component explicitly.

### Strongest reconstruction

State the narrowest defensible version, mechanism, and novel prediction.

### Strongest rival

Before comparative scoring, list the serious rival candidates, why each is credible, and the frozen `selection_criterion`. After applying that fixed criterion, record the selection reason and selected rival identifier, reconstruct it charitably, and state its mechanism, explanatory coverage, novel prediction, and failure condition. Score it on the same five axes and evidence boundary as the focal claim. If the criterion leaves a material tie, use `unresolved` and do not invent a tie-break.

### Evidence ledger

Use a table with columns:

`Claim | Claim version | Evidence tier | Relation forms | Construction | Independent? | Flexibility | Rival | Status`

Evidence tiers include `reported_unverified_observation`. Relation forms may contain `direct`, `structural`, both, or `not_applicable`. Construction is `native`, `projected`, `forced`, or `unknown`. Status includes `insufficient_evidence` and `not_evaluated` in addition to support or contradiction.

### Adversarial audit

List at least three serious objections. For each, record the rival model, why it could explain the result, the evidence that discriminates it, the current disposition, and whether it is the strongest rival selected for comparative scoring. Answer without rescue assumptions.

### Controls

Separate completed controls, results, and controls still required. For every control record:

- design;
- dimensions matched;
- whether the original selection/search flexibility was replayed;
- status;
- result or null distribution, when available.

For searched patterns, also report whether the search space was disclosed or bounded, the multiplicity correction used, and whether the full discovery pipeline was replayed on matched null cases. If neither correction nor matched-pipeline evidence exists, control performance and the total remain `null`.

### Disconfirming conditions

State the evidence pattern that would materially lower the score, its decision threshold, and validity assumptions. For probabilistic claims, do not promise that one observation is an absolute falsifier. For symbolic interpretations, `not_empirically_falsifiable` is valid; list textual counterevidence separately.

### Score

Provide parallel score profiles for the focal claim and strongest rival. Name each `score_target`, report all five axes, the four evidence-independence components, total, uncertainty kind, range, main sensitivity, missing inputs, and gating flags. Unknown material axes and the total are `null`; planned controls earn no performance points. State that equal weights are a heuristic diagnostic convention and that score differences are not probabilities. Confidence concerns the assessment, not the probability that a claim is true.

### Symbolic assessment

Report its basis, interpretive value, and the explicit statement that it supplies no empirical support by itself.

### Next decisive test

Name one bounded test, the data it needs, and how each possible result changes the verdict.

## Structured object

```json
{
  "contract_version": "1.2",
  "verdict": {
    "empirical_status": "not_evaluable_from_supplied_evidence",
    "assessment_confidence": null,
    "confidence_kind": "qualitative_or_null",
    "largest_risk": "post_hoc_mapping_flexibility",
    "gating_flags": []
  },
  "claim_decomposition": {
    "empirical_subclaim": "",
    "symbolic_subclaim": null
  },
  "claim_lineage": {
    "claim_id": "hf-claim:sha256:<64-lowercase-hex>",
    "canonicalization_version": "hf-claim-v1",
    "hash_algorithm": "SHA-256",
    "canonical_claim_payload": {
      "claim": "",
      "source_boundary": null,
      "mapping_or_mechanism": null,
      "unit_of_analysis": null,
      "allowed_transformations": [],
      "success_metric": null,
      "comparison_class": null
    },
    "canonical_claim_hash": "sha256:<64-lowercase-hex>",
    "parent_claim_hashes": {
      "status": "unknown",
      "hashes": null
    },
    "integrity_scope": "frozen_claim_fields_only",
    "hash_proves": ["canonical_content_integrity"],
    "hash_does_not_prove": [
      "authorship",
      "chronology",
      "lineage_completeness",
      "claim_truth"
    ],
    "prior_versions": [],
    "failed_tests": [],
    "transformations_tried": [],
    "selection_path": "",
    "history_limitations": []
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
  "historical_backtest": {
    "applicable": false,
    "evidence_cutoff_date": null,
    "allowed_corpus": [],
    "excluded_later_material": [],
    "claim_anonymized": null,
    "later_evidence_held_out": [],
    "outcome_exposure": "not_applicable"
  },
  "blind_pass": {
    "status": "mapping_exposed",
    "description": [],
    "blind_independence_points": 0
  },
  "strongest_reconstruction": {
    "narrow_claim": "",
    "mechanism": "",
    "novel_prediction": ""
  },
  "rival_selection": {
    "criterion_frozen_before_scoring": true,
    "selection_criterion": "",
    "candidates": [
      {
        "rival_id": "",
        "claim": "",
        "why_serious": ""
      }
    ],
    "selection_status": "unresolved",
    "selected_rival_ids": [],
    "selection_reason": ""
  },
  "strongest_rival": {
    "claim": "",
    "mechanism": "",
    "evidence_explained": [],
    "novel_prediction": "",
    "failure_condition": ""
  },
  "evidence_ledger": [
    {
      "claim": "",
      "claim_version": "",
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
      "disposition": "open",
      "is_strongest_rival": false
    }
  ],
  "controls": {
    "multiplicity": {
      "search_space_disclosed": null,
      "search_space_bound": null,
      "correction_method": null,
      "discovery_pipeline_replayed": null
    },
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
    "convention": {
      "type": "heuristic_diagnostic",
      "axis_weights": "equal_20_point_axes",
      "empirically_calibrated": false,
      "probabilistic": false
    },
    "focal": {
      "score_target": "frozen_original_claim",
      "prior_specificity": null,
      "evidence_independence": {
        "source_provenance": null,
        "discovery_test_separation": null,
        "blind_pass": 0,
        "holdout_or_prospective_prediction": 0,
        "total": null
      },
      "coherence": null,
      "controls": null,
      "falsifiability": null,
      "total": null,
      "uncertainty_kind": "subjective_sensitivity_range",
      "uncertainty_range": null,
      "main_sensitivity": "missing independent evidence",
      "missing_inputs": [],
      "gating_flags": []
    },
    "strongest_rival": {
      "score_target": "strongest_rival",
      "prior_specificity": null,
      "evidence_independence": {
        "source_provenance": null,
        "discovery_test_separation": null,
        "blind_pass": null,
        "holdout_or_prospective_prediction": null,
        "total": null
      },
      "coherence": null,
      "controls": null,
      "falsifiability": null,
      "total": null,
      "uncertainty_kind": "subjective_sensitivity_range",
      "uncertainty_range": null,
      "main_sensitivity": "missing rival evidence",
      "missing_inputs": [],
      "gating_flags": []
    },
    "comparative_verdict": {
      "preferred_model": "unresolved",
      "reason": "",
      "score_difference": null,
      "difference_is_probability": false
    }
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

Use `null` for unknown values. Do not fabricate precision. `none_disclosed` is never proof of no prior attempts, `unknown` must survive missing legacy provenance, and `likely_exposed` is never an independent historical forecast. A `supplied` parent-hash state requires a non-empty array; `none_disclosed` and `unknown` require `hashes: null`; empty arrays are invalid. Freeze rival selection criteria before comparative scoring and preserve `unresolved` when the criterion does not break a material tie. Omit empty completed-control objects in actual output; the example shows the required shape only.
