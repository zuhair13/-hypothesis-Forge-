# Known Limitations & Post-Competition Roadmap
# القيود المعروفة وخارطة الإصلاح

**Status:** Documented 2026-07-20, before judging, following three independent
adversarial reviews (Claude / Gemini 3.1 Pro / a third independent model run).
**Principle:** A measurement tool must state what it cannot measure. These
limitations were found by turning the project's own audit method on itself.

---

## 1. The automated score measures framing, not evidential support
**الدرجة الآلية تقيس جودة الصياغة لا الدعم التجريبي**

The intake score is deterministic and rule-based: it rewards frozen claims,
declared boundaries, serious rivals, and explicit falsification conditions.
It does **not** read sources, verify citations, or weigh evidence. The UI
already labels it "Readiness verdict — a method score, not a truth
probability," but reviewers still read the number as hypothesis strength.

*Post-competition fix:* rename the number explicitly to **Research framing
readiness**; add a second, separate track for evidential support that only
the deep-audit stage (Codex skill) can fill.

## 2. Missing evidence is currently scored low instead of `null`
**غياب الدليل يُترجم درجات منخفضة بدل `null` — مخالفة لعقدنا نفسه**

Our own SKILL.md mandates: "If evidence needed for an axis was not supplied,
use `null`; do not turn missing evidence into a low empirical score." The
web intake currently assigns low numbers (e.g., controls 1/20) where the
contract requires `null` / "not evaluable." This is an internal
inconsistency between the interface and its own protocol — the most
important defect on this list.

*Post-competition fix:* axes without supplied evidence display **"غير قابل
للتقييم / not evaluable"** and are excluded from any total, exactly as the
skill contract specifies.

## 3. The score is deterministic but phrasing-sensitive
**الدرجة حتمية لكنها حساسة للصياغة**

Identical input always yields the identical score (verified: an
Arabic/English translation pair scored 21 = 21). But semantically
equivalent *re-phrasings* can shift the score (observed: 26 vs 21 on a
meaning-equivalent pair). Determinism ≠ robustness.

*Post-competition fix:* a **stability test** — translation and paraphrase
suites with a declared tolerance band; score components displayed per rule
so no point looks "magic."

## 4. Manual axis adjustment logs the change but not the reason
**التعديل اليدوي يُسجَّل بلا سبب ملزم**

The UI warns "adjust only when you can point to evidence; the report records
every change" — but it does not *require* an evidence note per adjustment.

*Post-competition fix:* mandatory reason-and-source field attached to every
manual slider change, exported with the report.

## 5. The site alone cannot judge a hypothesis — by design
**الموقع وحده لا يحكم على صحة فرضية — وهذا مقصود**

The architecture splits deterministic intake (browser) from evidential
deep audit (model + skill). The site's banner states: "Evidence must be
added in Codex before any empirical verdict." This is a feature, not a
gap — but it must stay impossible to miss.

---

### Why we publish this before judging
Three model-reviewers audited this project adversarially. Every defect
above was found by the same discipline the tool imposes on hypotheses:
frozen claims, rival explanations, and refusal to let coherent framing
substitute for evidence. A scoring tool that hid its own unvalidated
number would fail its own audit. This document is the tool passing it.
