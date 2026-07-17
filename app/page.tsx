"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "ar";
type Scores = {
  specificity: number;
  independence: number;
  coherence: number;
  controls: number;
  falsifiability: number;
};

const EXAMPLE_CLAIM =
  "Daily 20-minute exposure to natural light within 30 minutes of waking improves sustained attention over four weeks.";

const COPY = {
  en: {
    brand: "Hypothesis Forge",
    brandAr: "مختبر الفرضيات",
    method: "Method",
    example: "Example",
    eyebrow: "A research method, not a verdict machine",
    titleA: "Turn bold claims",
    titleB: "into testable research.",
    intro:
      "Blind analysis, evidence tiers, counter-controls, and falsifiability—inside one rigorous workflow.",
    start: "Start blind analysis",
    viewExample: "View an example",
    inputLabel: "Hypothesis input",
    inputPlaceholder: "State the exact claim you want to test…",
    analyze: "Analyze",
    analyzing: "Freezing claim…",
    map: "Evidence map",
    mapDetail: "Separate observations from interpretation.",
    counter: "Counter-test",
    counterDetail: "Match the control to your search freedom.",
    falsifiability: "Falsifiability",
    falsifiabilityDetail: "Name the result that would lower confidence.",
    high: "High",
    medium: "Medium",
    low: "Low",
    activeControl: "Active control",
    matchedControl: "Matched control",
    negativeControl: "Negative control",
    why: "WHY THIS METHOD",
    methodTitle: "Creativity survives. Hidden flexibility does not.",
    methodBody:
      "The Forge preserves the interesting idea, then makes every assumption, alternative, and possible failure visible.",
    blind: "01 — Blind pass",
    blindBody:
      "Describe the source before revealing the proposed mapping. That description is locked for the rest of the test.",
    tiers: "02 — Evidence tiers",
    tiersBody:
      "Mark each statement as fact, inference, hypothesis, or symbolic interpretation. No category borrowing.",
    controlsTitle: "03 — Counter-controls",
    controlsBody:
      "Test alternatives with the same synonyms, segmentations, and choices that produced the favored match.",
    falsify: "04 — Falsify",
    falsifyBody:
      "Write a risky prediction and the observation that would count against it—before looking at the result.",
    workspaceKicker: "LIVE RESEARCH WORKSPACE",
    workspaceTitle: "Freeze the claim before you defend it.",
    workspaceIntro:
      "This quick audit measures research readiness, not whether the claim is true. Unknowns stay visible instead of being silently invented.",
    exactClaim: "Exact claim",
    boundary: "Source or data boundary",
    boundaryPlaceholder: "e.g. 30 participants, four weeks, fixed protocol",
    unit: "Unit of analysis",
    unitPlaceholder: "e.g. participant-day",
    comparison: "Comparison class",
    comparisonPlaceholder: "e.g. same routine without timed light exposure",
    freeze: "Freeze & audit",
    frozen: "Claim frozen",
    readiness: "Research readiness",
    notTruth: "Method score — not a truth probability",
    scoreLabels: [
      "Prior specificity",
      "Evidence independence",
      "Structural coherence",
      "Performance against controls",
      "Falsifiability & prediction",
    ],
    scoreHint:
      "Adjust only when you can point to evidence. The report records every change.",
    evidenceLedger: "Evidence ledger",
    statement: "Statement",
    tier: "Evidence tier",
    matchType: "Relation / construction",
    status: "Status",
    claimRow: "The submitted claim",
    possible: "Possible hypothesis",
    projected: "Not applicable · unknown",
    untested: "Untested",
    controlPlan: "Control plan",
    permutation: "Permutation or shuffle test",
    matched: "Matched comparison",
    negative: "Negative control",
    holdout: "Prospective holdout",
    required: "Required",
    addEvidence: "Evidence must be added in Codex before any empirical verdict.",
    falsificationPrompt: "Falsification condition",
    falsificationPlaceholder:
      "If the claim is correct, then under frozen rule R… Outcome not-O would count against it.",
    nextTest: "Next decisive test",
    nextTestBody:
      "Freeze one prediction on unseen data, compare it with a matched control, then update the score from the result—not from the story.",
    copyPrompt: "Copy Codex prompt",
    copied: "Prompt copied",
    export: "Export report",
    reset: "Reset workspace",
    reportVerdict: "Readiness verdict",
    verdictStrong: "Research plan ready for independent testing",
    verdictPromising: "Promising plan with material controls still open",
    verdictInteresting: "Testable framing; evidence and controls still missing",
    verdictSymbolic: "Early-stage framing with major open choices",
    verdictUnsupported: "Not ready to evaluate from supplied information",
    exampleKicker: "WORKED EXAMPLE",
    exampleTitle: "A claim becomes useful when it can lose.",
    exampleBody:
      "The light-exposure example looks specific, but it still needs a comparison group, independent measurements, and a preregistered failure threshold. Precision in the sentence is only the beginning.",
    exampleQuote: EXAMPLE_CLAIM,
    fact: "Established fact",
    inference: "Reasonable inference",
    hypothesis: "Possible hypothesis",
    symbolic: "Symbolic interpretation",
    footer:
      "Built for disciplined curiosity. The method keeps empirical force and symbolic value separate.",
    powered: "Method available as a Codex skill",
    emptyError: "Write a claim first, or load the worked example.",
  },
  ar: {
    brand: "مختبر الفرضيات",
    brandAr: "Hypothesis Forge",
    method: "المنهج",
    example: "مثال",
    eyebrow: "منهج بحثي، لا آلة لإصدار الأحكام",
    titleA: "حوّل الادّعاءات الجريئة",
    titleB: "إلى بحث قابل للاختبار.",
    intro:
      "تحليل أعمى، ودرجات للأدلة، واختبارات مضادّة، وشروط واضحة للتفنيد—ضمن مسار بحثي صارم.",
    start: "ابدأ التحليل الأعمى",
    viewExample: "شاهد مثالاً",
    inputLabel: "الفرضية",
    inputPlaceholder: "اكتب الادّعاء الدقيق الذي تريد اختباره…",
    analyze: "حلّل",
    analyzing: "جارٍ تثبيت الادّعاء…",
    map: "خريطة الأدلة",
    mapDetail: "افصل الملاحظة عن التفسير.",
    counter: "الاختبار المضاد",
    counterDetail: "امنح الضابط مرونة البحث نفسها.",
    falsifiability: "قابلية التفنيد",
    falsifiabilityDetail: "حدّد النتيجة التي ستخفّض ثقتك.",
    high: "مرتفع",
    medium: "متوسط",
    low: "منخفض",
    activeControl: "ضابط فعّال",
    matchedControl: "ضابط مماثل",
    negativeControl: "ضابط سلبي",
    why: "لماذا هذا المنهج؟",
    methodTitle: "الإبداع يبقى. المرونة الخفيّة لا تبقى.",
    methodBody:
      "يحافظ المختبر على الفكرة المثيرة، ثم يكشف كل افتراض وبديل وطريقة محتملة لفشلها.",
    blind: "٠١ — التحليل الأعمى",
    blindBody:
      "صِف المصدر قبل كشف المطابقة المقترحة، ثم ثبّت هذا الوصف طوال الاختبار.",
    tiers: "٠٢ — درجات الأدلة",
    tiersBody:
      "صنّف كل عبارة: حقيقة، استنتاج، فرضية، أو تفسير رمزي. لا تخلط بين الدرجات.",
    controlsTitle: "٠٣ — الاختبارات المضادّة",
    controlsBody:
      "اختبر البدائل بالمرونة نفسها في المرادفات والتقسيم والاختيار التي صنعت المطابقة المفضّلة.",
    falsify: "٠٤ — التفنيد",
    falsifyBody:
      "اكتب تنبؤاً مخاطِراً والنتيجة التي ستعارضه، قبل أن ترى النتيجة الفعلية.",
    workspaceKicker: "مساحة البحث التفاعلية",
    workspaceTitle: "ثبّت الادّعاء قبل أن تدافع عنه.",
    workspaceIntro:
      "هذا التدقيق السريع يقيس جاهزية البحث، لا حقيقة الادّعاء. المجهول يبقى ظاهراً ولا نخترعه بصمت.",
    exactClaim: "الادّعاء الدقيق",
    boundary: "حدود المصدر أو البيانات",
    boundaryPlaceholder: "مثال: ٣٠ مشاركاً، أربعة أسابيع، بروتوكول ثابت",
    unit: "وحدة التحليل",
    unitPlaceholder: "مثال: يوم المشارك",
    comparison: "فئة المقارنة",
    comparisonPlaceholder: "مثال: الروتين نفسه بلا تعرّض ضوئي محدد",
    freeze: "ثبّت ودقّق",
    frozen: "تم تثبيت الادّعاء",
    readiness: "جاهزية البحث",
    notTruth: "درجة منهجية — وليست احتمالاً للحقيقة",
    scoreLabels: [
      "التحديد المسبق",
      "استقلال الأدلة",
      "التماسك البنيوي",
      "الأداء أمام الضوابط",
      "قابلية التفنيد والتنبؤ",
    ],
    scoreHint: "عدّل الدرجة فقط إذا كان لديك دليل. التقرير يسجّل كل تغيير.",
    evidenceLedger: "سجلّ الأدلة",
    statement: "العبارة",
    tier: "درجة الدليل",
    matchType: "العلاقة / طريقة البناء",
    status: "الحالة",
    claimRow: "الادّعاء المقدّم",
    possible: "فرضية ممكنة",
    projected: "لا تنطبق · غير معروفة",
    untested: "غير مختبرة",
    controlPlan: "خطة الضوابط",
    permutation: "اختبار التبديل أو الخلط",
    matched: "مقارنة مماثلة",
    negative: "ضابط سلبي",
    holdout: "عينة مستقبلية محجوبة",
    required: "مطلوب",
    addEvidence: "يجب إضافة الأدلة داخل Codex قبل إصدار أي حكم تجريبي.",
    falsificationPrompt: "شرط التفنيد",
    falsificationPlaceholder:
      "إذا صحّ الادّعاء، فعند تطبيق القاعدة المثبّتة… ستكون النتيجة المعاكسة دليلاً ضده.",
    nextTest: "الاختبار الحاسم التالي",
    nextTestBody:
      "ثبّت تنبؤاً على بيانات غير مرئية، قارنه بضابط مماثل، ثم حدّث الدرجة من النتيجة لا من القصة.",
    copyPrompt: "انسخ أمر Codex",
    copied: "تم نسخ الأمر",
    export: "صدّر التقرير",
    reset: "ابدأ من جديد",
    reportVerdict: "حكم الجاهزية",
    verdictStrong: "خطة بحث جاهزة للاختبار المستقل",
    verdictPromising: "خطة واعدة مع ضوابط أساسية ما زالت مفتوحة",
    verdictInteresting: "صياغة قابلة للاختبار، لكن الأدلة والضوابط ما زالت ناقصة",
    verdictSymbolic: "صياغة أولية فيها خيارات كثيرة غير محسومة",
    verdictUnsupported: "المعلومات المتاحة لا تكفي للتقييم بعد",
    exampleKicker: "مثال تطبيقي",
    exampleTitle: "تصبح الفكرة مفيدة عندما يصبح فشلها ممكناً.",
    exampleBody:
      "يبدو مثال التعرّض للضوء محدداً، لكنه لا يزال يحتاج إلى مجموعة مقارنة وقياسات مستقلة وحدّ فشل مسجّل مسبقاً. دقة الجملة ليست سوى البداية.",
    exampleQuote:
      "التعرّض يومياً للضوء الطبيعي لمدة ٢٠ دقيقة خلال ٣٠ دقيقة من الاستيقاظ يحسّن الانتباه المستمر خلال أربعة أسابيع.",
    fact: "حقيقة ثابتة",
    inference: "استنتاج معقول",
    hypothesis: "فرضية ممكنة",
    symbolic: "تفسير رمزي",
    footer: "صُمّم للفضول المنضبط، مع فصل القوة التجريبية عن القيمة الرمزية.",
    powered: "المنهج متاح كمهارة داخل Codex",
    emptyError: "اكتب ادّعاءً أولاً أو حمّل المثال التطبيقي.",
  },
} as const;

const INITIAL_SCORES: Scores = {
  specificity: 6,
  independence: 2,
  coherence: 5,
  controls: 1,
  falsifiability: 4,
};

function Icon({ name }: { name: "blind" | "layers" | "scale" | "target" | "network" | "flask" | "arrow" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === "blind" && (
        <>
          <path {...common} d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A11.8 11.8 0 0112 4c5.2 0 8.6 5 8.6 5a15 15 0 01-2.3 2.8M6.1 6.1C4.3 7.3 3.4 9 3.4 9S6.8 14 12 14c1 0 2-.2 2.8-.5" />
        </>
      )}
      {name === "layers" && (
        <>
          <path {...common} d="M12 3l8 4-8 4-8-4 8-4z" />
          <path {...common} d="M4 11l8 4 8-4M4 15l8 4 8-4" />
        </>
      )}
      {name === "scale" && (
        <>
          <path {...common} d="M12 4v16M5 7h14M7 7l-3 6h6L7 7zm10 0l-3 6h6l-3-6zM8 20h8" />
        </>
      )}
      {name === "target" && (
        <>
          <circle {...common} cx="12" cy="12" r="8" />
          <circle {...common} cx="12" cy="12" r="3" />
          <path {...common} d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </>
      )}
      {name === "network" && (
        <>
          <circle {...common} cx="5" cy="12" r="2" />
          <circle {...common} cx="12" cy="5" r="2" />
          <circle {...common} cx="19" cy="9" r="2" />
          <circle {...common} cx="16" cy="18" r="2" />
          <path {...common} d="M6.5 10.6l4-4M13.9 5.9l3.2 2M18.3 10.9l-1.6 5.2M7 13l7.2 4.1" />
        </>
      )}
      {name === "flask" && (
        <>
          <path {...common} d="M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4A2 2 0 0019 18l-5-9V3" />
          <path {...common} d="M8 14h8M9.5 17h.01M14 18h.01" />
        </>
      )}
      {name === "arrow" && <path {...common} d="M5 12h14M14 7l5 5-5 5" />}
    </svg>
  );
}

function evaluateClaim(claim: string): Scores {
  const hasNumber = /\d|[٠-٩]/.test(claim);
  const hasTime = /(day|week|month|year|minute|hour|daily|weekly|يوم|أسبوع|شهر|سنة|دقيقة|ساعة)/i.test(claim);
  const hasRelation = /(improve|reduce|increase|predict|cause|associated|leads? to|يحس|يخف|يزيد|يتنبأ|يؤدي|مرتبط)/i.test(claim);
  const wordCount = claim.trim().split(/\s+/).length;

  return {
    specificity: Math.min(14, 5 + (hasNumber ? 3 : 0) + (hasTime ? 2 : 0) + (wordCount > 10 ? 2 : 0)),
    independence: 2,
    coherence: Math.min(12, 5 + (hasRelation ? 3 : 0) + (wordCount > 8 ? 2 : 0)),
    controls: 1,
    falsifiability: Math.min(13, 4 + (hasNumber ? 3 : 0) + (hasTime ? 3 : 0) + (hasRelation ? 2 : 0)),
  };
}

function getVerdict(total: number, t: (typeof COPY)[Language]) {
  if (total >= 80) return t.verdictStrong;
  if (total >= 60) return t.verdictPromising;
  if (total >= 40) return t.verdictInteresting;
  if (total >= 20) return t.verdictSymbolic;
  return t.verdictUnsupported;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [claim, setClaim] = useState(EXAMPLE_CLAIM);
  const [boundary, setBoundary] = useState("");
  const [unit, setUnit] = useState("");
  const [comparison, setComparison] = useState("");
  const [falsification, setFalsification] = useState("");
  const [scores, setScores] = useState<Scores>(() => evaluateClaim(EXAMPLE_CLAIM));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [error, setError] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const workspaceRef = useRef<HTMLElement>(null);
  const t = COPY[language];
  const isArabic = language === "ar";

  const total = useMemo(
    () => Object.values(scores).reduce((sum, value) => sum + value, 0),
    [scores],
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const switchLanguage = (nextLanguage: Language) => {
    if (claim === EXAMPLE_CLAIM || claim === COPY.ar.exampleQuote) {
      setClaim(COPY[nextLanguage].exampleQuote);
      setScores(evaluateClaim(COPY[nextLanguage].exampleQuote));
    }
    setLanguage(nextLanguage);
  };

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const loadExample = () => {
    setClaim(isArabic ? t.exampleQuote : EXAMPLE_CLAIM);
    setBoundary(isArabic ? "٣٠ مشاركاً، أربعة أسابيع، بروتوكول ثابت" : "30 participants, four weeks, fixed protocol");
    setUnit(isArabic ? "المشارك-اليوم" : "participant-day");
    setComparison(
      isArabic
        ? "الروتين نفسه بلا تعرّض ضوئي محدد"
        : "the same routine without timed light exposure",
    );
    setScores(evaluateClaim(isArabic ? t.exampleQuote : EXAMPLE_CLAIM));
    setError("");
    scrollToWorkspace();
  };

  const runAudit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!claim.trim()) {
      setError(t.emptyError);
      return;
    }
    setError("");
    setIsAnalyzing(true);
    setScores(evaluateClaim(claim));
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setHasRun(true);
      scrollToWorkspace();
    }, 720);
  };

  const updateScore = (key: keyof Scores, value: number) => {
    setScores((current) => ({ ...current, [key]: value }));
  };

  const buildPrompt = () =>
    `$forge-hypotheses\n\nStress-test this claim with a blind pass, evidence tiers, matched controls, explicit falsification, and a five-axis score. Do not invent evidence.\n\nExact claim: ${claim || "[unknown]"}\nSource/data boundary: ${boundary || "[unknown]"}\nUnit of analysis: ${unit || "[unknown]"}\nComparison class: ${comparison || "[unknown]"}\nProposed falsification condition: ${falsification || "[unknown]"}`;

  const copyPrompt = async () => {
    const prompt = buildPrompt();
    let copied = false;

    try {
      await navigator.clipboard.writeText(prompt);
      copied = true;
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = prompt;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      copied = true;
      fallback.remove();
    }

    if (copied) {
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    }
  };

  const exportReport = () => {
    const scoreLines = (Object.entries(scores) as [keyof Scores, number][])
      .map(([, value], index) => `- ${t.scoreLabels[index]}: ${value}/20`)
      .join("\n");
    const report = `# Hypothesis Forge report\n\n## ${t.reportVerdict}\n${getVerdict(total, t)} (${total}/100)\n\n> ${t.notTruth}\n\n## ${t.exactClaim}\n${claim || "Unknown"}\n\n## Freeze sheet\n- ${t.boundary}: ${boundary || "Unknown"}\n- ${t.unit}: ${unit || "Unknown"}\n- ${t.comparison}: ${comparison || "Unknown"}\n\n## ${t.readiness}\n${scoreLines}\n\n## ${t.falsificationPrompt}\n${falsification || "Not yet defined"}\n\n## ${t.controlPlan}\n- ${t.permutation}: ${t.required}\n- ${t.matched}: ${t.required}\n- ${t.negative}: ${t.required}\n- ${t.holdout}: ${t.required}\n\n## ${t.nextTest}\n${t.nextTestBody}\n\n---\n${t.addEvidence}\n`;
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "hypothesis-forge-report.md";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const resetWorkspace = () => {
    setClaim("");
    setBoundary("");
    setUnit("");
    setComparison("");
    setFalsification("");
    setScores(INITIAL_SCORES);
    setHasRun(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-shell" dir={isArabic ? "rtl" : "ltr"}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.brand}>
          <span>{t.brand}</span>
          <span className="brand-divider">/</span>
          <span className="brand-alt" lang={isArabic ? "en" : "ar"}>{t.brandAr}</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#method">{t.method}</a>
          <button type="button" className="nav-link" onClick={loadExample}>{t.example}</button>
          <span className="nav-divider" aria-hidden="true" />
          <div className="language-switch" aria-label="Language">
            <button className={language === "en" ? "active" : ""} type="button" onClick={() => switchLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <span aria-hidden="true">|</span>
            <button className={language === "ar" ? "active" : ""} type="button" onClick={() => switchLanguage("ar")} aria-pressed={language === "ar"}>AR</button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1><span>{t.titleA}</span><span>{t.titleB}</span></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={scrollToWorkspace}>{t.start}</button>
              <button className="button button-secondary" type="button" onClick={loadExample}>{t.viewExample}</button>
            </div>

            <form className="quick-input" onSubmit={runAudit}>
              <label htmlFor="hero-claim">{t.inputLabel}</label>
              <div className="quick-input-rule" />
              <textarea id="hero-claim" dir="auto" value={claim} onChange={(event) => setClaim(event.target.value)} placeholder={t.inputPlaceholder} rows={3} />
              <div className="quick-input-footer">
                <span className="input-note">{claim.trim().split(/\s+/).filter(Boolean).length} {isArabic ? "كلمة" : "words"}</span>
                <button className="button button-small" type="submit" disabled={isAnalyzing}>
                  {isAnalyzing ? t.analyzing : t.analyze}<Icon name="arrow" />
                </button>
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
            </form>
          </div>

          <div className="pipeline" aria-label="Hypothesis testing workflow">
            <div className="confidence-key key-top">
              <span className="key-dot dot-high" /><span>{t.high}</span>
              <span className="key-dot dot-medium" /><span>{t.medium}</span>
              <span className="key-dot dot-low" /><span>{t.low}</span>
            </div>

            <div className="pipeline-line line-a" /><div className="pipeline-line line-b" /><div className="pipeline-line line-c" />
            <div className="pipeline-line dotted line-d" /><div className="pipeline-line dotted coral line-e" /><div className="pipeline-line dotted indigo line-f" />

            <article className="process-node node-blind">
              <span className="node-icon indigo"><Icon name="blind" /></span>
              <strong>{t.blind.split("—").pop()}</strong>
            </article>
            <article className="process-node node-evidence">
              <span className="node-icon blue"><Icon name="layers" /></span>
              <strong>{t.tiers.split("—").pop()}</strong>
            </article>
            <article className="process-node node-controls">
              <span className="node-icon coral"><Icon name="scale" /></span>
              <strong>{t.controlsTitle.split("—").pop()}</strong>
            </article>
            <article className="process-node node-falsify">
              <span className="node-icon indigo"><Icon name="target" /></span>
              <strong>{t.falsifiability}</strong>
            </article>

            <span className="route-dot route-1" /><span className="route-dot route-2" /><span className="route-dot coral route-3" /><span className="route-dot indigo route-4" />

            <article className="signal-card signal-map">
              <div className="signal-title"><span className="signal-icon blue"><Icon name="network" /></span><strong>{t.map}</strong></div>
              <div className="mini-network" aria-hidden="true">
                <span className="n n1" /><span className="n n2" /><span className="n n3" /><span className="n n4" /><span className="n n5" /><span className="n n6" /><span className="edge e1" /><span className="edge e2" /><span className="edge e3" /><span className="edge e4" /><span className="edge e5" />
              </div>
              <p>{t.mapDetail}</p>
            </article>

            <article className="signal-card signal-counter">
              <div className="signal-title"><span className="signal-icon coral"><Icon name="flask" /></span><strong>{t.counter}</strong></div>
              <div className="control-matrix" aria-hidden="true">
                {["●", "✓", "✓", "—", "●", "✓", "—", "✓", "●", "×", "✓", "×"].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
              </div>
              <p>{t.counterDetail}</p>
            </article>

            <article className="signal-card signal-falsify">
              <div className="signal-title"><span className="signal-icon indigo"><Icon name="target" /></span><strong>{t.falsifiability}</strong></div>
              <div className="gauge" aria-hidden="true"><span /><span /><span /><span /><i /></div>
              <p>{t.falsifiabilityDetail}</p>
            </article>

            <div className="confidence-key key-bottom">
              <span className="key-dot control-active" /><span>{t.activeControl}</span>
              <span className="key-dot control-matched" /><span>{t.matchedControl}</span>
              <span className="key-dot control-negative" /><span>{t.negativeControl}</span>
            </div>
          </div>
        </section>

        <section className="method-section" id="method">
          <div className="section-lead">
            <p className="section-kicker">{t.why}</p>
            <h2>{t.methodTitle}</h2>
            <p>{t.methodBody}</p>
          </div>
          <div className="method-grid">
            {[
              [t.blind, t.blindBody, "blind"],
              [t.tiers, t.tiersBody, "layers"],
              [t.controlsTitle, t.controlsBody, "scale"],
              [t.falsify, t.falsifyBody, "target"],
            ].map(([title, body, icon], index) => (
              <article className={`method-card method-${index + 1}`} key={title}>
                <span className="method-icon"><Icon name={icon as "blind" | "layers" | "scale" | "target"} /></span>
                <h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workspace-section" ref={workspaceRef} id="workspace">
          <div className="workspace-heading">
            <div><p className="section-kicker">{t.workspaceKicker}</p><h2>{t.workspaceTitle}</h2></div>
            <p>{t.workspaceIntro}</p>
          </div>

          <div className="workspace-grid">
            <form className="freeze-sheet" onSubmit={runAudit}>
              <div className="sheet-header"><span className="sheet-number">01</span><div><p>{t.blind}</p><h3>{t.exactClaim}</h3></div>{hasRun && <span className="frozen-badge">✓ {t.frozen}</span>}</div>
              <label htmlFor="claim">{t.exactClaim}</label>
              <textarea id="claim" dir="auto" value={claim} onChange={(event) => setClaim(event.target.value)} placeholder={t.inputPlaceholder} rows={4} />
              <div className="field-pair">
                <div><label htmlFor="boundary">{t.boundary}</label><input id="boundary" dir="auto" value={boundary} onChange={(event) => setBoundary(event.target.value)} placeholder={t.boundaryPlaceholder} /></div>
                <div><label htmlFor="unit">{t.unit}</label><input id="unit" dir="auto" value={unit} onChange={(event) => setUnit(event.target.value)} placeholder={t.unitPlaceholder} /></div>
              </div>
              <label htmlFor="comparison">{t.comparison}</label>
              <input id="comparison" dir="auto" value={comparison} onChange={(event) => setComparison(event.target.value)} placeholder={t.comparisonPlaceholder} />
              <button className="button button-primary sheet-action" type="submit" disabled={isAnalyzing}>{isAnalyzing ? t.analyzing : t.freeze}<Icon name="arrow" /></button>
              {error && <p className="form-error" role="alert">{error}</p>}
            </form>

            <aside className="score-card" aria-live="polite">
              <div className="score-top"><div><p>{t.reportVerdict}</p><h3>{getVerdict(total, t)}</h3></div><div className="score-ring" style={{ "--score": `${total * 3.6}deg` } as React.CSSProperties}><strong>{total}</strong><span>/100</span></div></div>
              <p className="score-disclaimer">{t.notTruth}</p>
              <div className="score-controls">
                {(Object.keys(scores) as (keyof Scores)[]).map((key, index) => (
                  <label key={key}><span><b>{t.scoreLabels[index]}</b><output>{scores[key]}/20</output></span><input type="range" min="0" max="20" value={scores[key]} onChange={(event) => updateScore(key, Number(event.target.value))} aria-label={t.scoreLabels[index]} /></label>
                ))}
              </div>
              <p className="score-hint">{t.scoreHint}</p>
            </aside>
          </div>

          <div className="audit-grid">
            <article className="audit-card ledger-card">
              <div className="audit-heading"><span className="audit-number blue">02</span><div><p>{t.tiers}</p><h3>{t.evidenceLedger}</h3></div></div>
              <div className="ledger-table" role="table" aria-label={t.evidenceLedger}>
                <div className="ledger-row ledger-head" role="row"><span>{t.statement}</span><span>{t.tier}</span><span>{t.matchType}</span><span>{t.status}</span></div>
                <div className="ledger-row" role="row"><span>{t.claimRow}</span><span><em className="chip lavender">{t.possible}</em></span><span><em className="chip pale">{t.projected}</em></span><span><em className="chip coral-chip">{t.untested}</em></span></div>
              </div>
              <p className="audit-note">{t.addEvidence}</p>
            </article>

            <article className="audit-card controls-card">
              <div className="audit-heading"><span className="audit-number coral">03</span><div><p>{t.controlsTitle}</p><h3>{t.controlPlan}</h3></div></div>
              <ul className="control-list">
                {[t.permutation, t.matched, t.negative, t.holdout].map((control) => <li key={control}><span className="empty-check" aria-hidden="true" /><span>{control}</span><em>{t.required}</em></li>)}
              </ul>
            </article>

            <article className="audit-card falsification-card">
              <div className="audit-heading"><span className="audit-number indigo">04</span><div><p>{t.falsify}</p><h3>{t.falsificationPrompt}</h3></div></div>
              <textarea dir="auto" value={falsification} onChange={(event) => setFalsification(event.target.value)} placeholder={t.falsificationPlaceholder} rows={5} aria-label={t.falsificationPrompt} />
              <div className="next-test"><span><Icon name="target" /></span><div><strong>{t.nextTest}</strong><p>{t.nextTestBody}</p></div></div>
            </article>
          </div>

          <div className="workspace-actions">
            <button className="button button-primary" type="button" onClick={copyPrompt}>{copyState === "copied" ? `✓ ${t.copied}` : t.copyPrompt}</button>
            <button className="button button-secondary" type="button" onClick={exportReport}>{t.export}</button>
            <button className="text-button" type="button" onClick={resetWorkspace}>{t.reset}</button>
          </div>
        </section>

        <section className="example-section" id="example">
          <div className="example-copy"><p className="section-kicker">{t.exampleKicker}</p><h2>{t.exampleTitle}</h2><p>{t.exampleBody}</p><button className="button button-secondary" type="button" onClick={loadExample}>{t.viewExample}</button></div>
          <blockquote><span>“</span>{t.exampleQuote}<footer>— {t.possible}</footer></blockquote>
        </section>
      </main>

      <footer className="site-footer"><div className="brand footer-brand"><span>{t.brand}</span><span className="brand-divider">/</span><span className="brand-alt">{t.brandAr}</span></div><p>{t.footer}</p><span className="skill-note"><i />{t.powered}</span></footer>
    </div>
  );
}
