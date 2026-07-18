# Replication Note — Cross-Model Protocol Portability

**Status:** Preliminary single-case replication (n = 2 model runs)
**Date:** 2026-07-18
**Protocol version reviewed:** commit `669d55c` (`skill/forge-hypotheses/SKILL.md`)

## Purpose

This note documents a small portability check, not a validation of the
protocol's core empirical claim. It asks one narrow question:

> When the Forge Hypotheses protocol is handed as plain text to two
> unrelated language models from different vendors, do they produce
> *structurally* consistent audits — same exposure tags, same rival
> selection, same non-compensatory gating, same final band — even if the
> raw axis numbers differ?

It does **not** test whether the protocol produces better-calibrated
judgments than unaided analysis. That claim remains `null` / not yet
evaluated (see *Limitations*).

## Method

- **Test case:** Alfred Wegener's continental drift hypothesis, frozen at
  its 1915 published form.
- **Evidence cutoff:** end of 1915. All later evidence
  (paleomagnetism, seafloor spreading, GPS geodesy, plate tectonics)
  withheld by instruction.
- **Instruction:** each model was asked to execute the protocol literally
  and produce the full 12-point required output, including the historical
  backtest, frozen rival selection, five-axis scoring with the four-part
  independence breakdown, and explicit gating check.
- **Runners:**
  - Run A — Claude (Anthropic), executing the protocol in-session.
  - Run B — Gemini 3.1 Pro (Google), executing the same pasted protocol
    text in a separate session with no browsing access.
- **Provenance of Run B:** the Gemini output was supplied by the user as
  pasted text, not captured directly by an automated harness. Per the
  protocol's own provenance discipline, it is recorded as `supplied`, not
  independently verified verbatim.

## Results

| Check | Run A (Claude) | Run B (Gemini 3.1 Pro) | Agreement |
|---|---|---|---|
| Outcome-exposure tag | `likely_exposed` | `likely_exposed` | ✓ |
| Blind-pass independence component | 0 (forced) | 0 (forced) | ✓ |
| Later evidence counted as holdout | No | No | ✓ |
| Frozen rival selected | Sunken land bridges | Sunken land bridges | ✓ |
| Rival scored on same axes | Yes | Yes (40/100) | ✓ |
| Comparative verdict | `unresolved` | `unresolved` | ✓ |
| Mechanism axis | 4/20 | 5/20 | ≈ |
| Evidence-independence axis | 9/20 | 4/20 | ✗ (see note) |
| Non-compensatory gate fired | Yes | Yes ("locked out") | ✓ |
| Final band | 40–59: interesting pattern, weak evidential force | 40–59: interesting pattern, weak evidential force | ✓ |
| Numeric total | 52/100 | 42/100 | differ, same band |

### Interpretation

The two runs disagree on raw numbers but converge on every
**structural** decision: exposure handling, rival identity, gate
activation, and final verdict band. This is the intended signature of a
rule-governed protocol: outcomes are driven by the gates and definitions,
not by the individual model's disposition. Identical totals would have
been more suspicious (coincidence or imitation) than this pattern of
"different arithmetic, same gated verdict."

### Where the runs genuinely differed

On the evidence-independence axis, Run B was **stricter and arguably more
correct**. Run A awarded partial holdout credit (3/5) for later fossil
confirmations; Run B refused it, on the grounds that Wegener consumed his
data in discovery and left nothing held out for testing — a reading
closer to the protocol's "separation of discovery from testing" clause.
Run B also flagged the multiple-comparison burden of a whole-globe search
for coastline matches more explicitly than Run A did.

### Recorded defects (both runs)

- **Run B lineage tag:** Run B tagged lineage `unknown` while itself
  noting earlier Snider-Pellegrini fit maps. A stricter reading would use
  `supplied` (historically) or explicitly state the hash was
  technically unavailable rather than epistemically absent. This suggests
  the lineage field needs a worked historical example in
  `references/method.md`.
- **Run A holdout scoring:** see above; Run A was the more lenient of the
  two on independence.

## Limitations

- **n = 2.** Two runs, one test case. This is an anecdote of consistency,
  not a measured replication rate.
- **Single case type.** The case is `likely_exposed`; the protocol's
  behavior on genuinely blinded or contemporary claims is not tested here.
- **Not blind.** Both runners saw the claim before describing the source;
  both correctly self-reported `mapping_exposed`, but neither was
  independently blinded.
- **Run B not verbatim-verified.** Supplied as pasted text (see Method).
- **Core claim untouched.** This note says nothing about whether the
  protocol improves judgment quality versus unaided analysis. That
  requires the pre-registered blind evaluation described in the project
  roadmap (≈20 mixed claims, dual analysis, external masked raters).

## Next decisive test

Run the pre-registered blind kit: a set of mixed claims — some with known
historical outcomes, some contemporary and unresolved — each analyzed
twice (with protocol vs. unaided), with outputs shown masked to external
raters who judge which analysis better exposed degrees of freedom and
better separated post-hoc pattern from prior prediction. Only that test
can move the core claim off `null`.
