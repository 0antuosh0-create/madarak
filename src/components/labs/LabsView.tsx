import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { labsData } from '../../data/labsData';
import { toPersianDigits } from '../../utils/persian';
interface LabsViewProps {
  completedLabs: string[];
  onToggleCompleteLab: (labId: string) => void;
}

export const LabsView: React.FC<LabsViewProps> = ({
  completedLabs,
  onToggleCompleteLab,
}) => {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(labsData[0].id);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [stepResults, setStepResults] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const selectedLab = labsData.find((l) => l.id === selectedLabId) || labsData[0];
  const isSelectedCompleted = completedLabs.includes(selectedLab.id);

  const handleInputChange = (stepId: string, val: string) => {
    setUserInputs((prev) => ({ ...prev, [stepId]: val }));
  };

  const handleVerifyStep = (stepId: string) => {
    const step = selectedLab.steps.find((s) => s.id === stepId);
    if (!step) return;

    const valStr = userInputs[stepId];
    if (!valStr) return;

    const num = parseFloat(valStr.replace(/[^\d.-]/g, ''));
    if (isNaN(num)) return;

    // Check with tolerance
    const diff = Math.abs(num - step.expectedValue);
    const maxAllowed = Math.abs(step.expectedValue * step.tolerance);
    const isValid = diff <= Math.max(0.01, maxAllowed);

    const nextResults = { ...stepResults, [stepId]: isValid };
    setStepResults(nextResults);

    // Check if all steps of the lab are completed
    const allDone = selectedLab.steps.every((s) =>
      s.id === stepId ? isValid : nextResults[s.id]
    );

    if (allDone) {
      if (!isSelectedCompleted) {
        onToggleCompleteLab(selectedLab.id);
      }
      setShowFullSolution(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
      });
    }
  };

  const handleResetChallenge = () => {
    setUserInputs({});
    setStepResults({});
    setRevealedHints(0);
    setShowFullSolution(false);
  };

  const filteredLabs = labsData.filter(
    (lab) => difficultyFilter === 'all' || lab.difficultyFa === difficultyFilter
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold mb-1">
          <FlaskConical size={14} />
          <span>سناریوهای حل مسئله و چالش‌های تحلیلی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          آزمایشگاه حل چالش‌های مدار دکتر جبه‌دار
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          مسائل برگزیده امتحانات و کنکور ارشد مدارهای الکتریکی با هدایت گام‌به‌گام، ورودی‌های تعاملی و بررسی تلرانس
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                فهرست سناریوها ({toPersianDigits(completedLabs.length)} از {toPersianDigits(labsData.length)} حل شده)
              </span>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              {['all', 'مقدماتی', 'متوسط', 'پیشرفته'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    difficultyFilter === diff
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff === 'all' ? 'همه' : diff}
                </button>
              ))}
            </div>

            {/* Labs List */}
            <div className="space-y-2 pt-1 max-h-[580px] overflow-y-auto">
              {filteredLabs.map((lab) => {
                const isSelected = selectedLab.id === lab.id;
                const isDone = completedLabs.includes(lab.id);

                return (
                  <div
                    key={lab.id}
                    onClick={() => {
                      setSelectedLabId(lab.id);
                      handleResetChallenge();
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-start ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 shadow-xs'
                        : isDone
                        ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        چالش {toPersianDigits(lab.order)}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          lab.difficultyFa === 'مقدماتی'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : lab.difficultyFa === 'متوسط'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {lab.difficultyFa}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {lab.titleFa}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span className="truncate max-w-[180px]">{lab.chapterRefFa}</span>
                      {isDone && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Challenge Detail & Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Challenge Header Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  <span>{selectedLab.chapterRefFa}</span>
                  <span>•</span>
                  <span>سطح: {selectedLab.difficultyFa}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {selectedLab.titleFa}
                </h2>
              </div>

              <button
                onClick={handleResetChallenge}
                title="شروع مجدد این چالش"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>شروع مجدد</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {selectedLab.descriptionFa}
            </p>

            {/* Circuit Diagram Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                <span>مدار الکتریکی چالش:</span>
                <span className="text-amber-400">{selectedLab.circuitSummaryFa}</span>
              </div>

              {/* Schematic render based on circuitSvgType */}
              <div className="py-2 flex justify-center">
                <svg viewBox="0 0 520 150" className="w-full max-w-lg h-auto">
                  {/* Schematic outline */}
                  <rect x="20" y="20" width="480" height="110" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Nodes & elements mock visualization */}
                  <circle cx="80" cy="75" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="80" y="79" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Vs</text>
                  
                  <line x1="96" y1="75" x2="160" y2="75" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="160" y="67" width="50" height="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="185" y="60" fill="#f59e0b" fontSize="10" textAnchor="middle">R1</text>
                  
                  <line x1="210" y1="75" x2="280" y2="75" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="280" y="67" width="50" height="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="305" y="60" fill="#f59e0b" fontSize="10" textAnchor="middle">R2</text>
                  
                  <line x1="330" y1="75" x2="420" y2="75" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="420" cy="75" r="5" fill="#10b981" />
                  <text x="435" y="79" fill="#10b981" fontSize="11" fontWeight="bold">Out</text>

                  {/* Bridge / dependent branch */}
                  <line x1="245" y1="75" x2="245" y2="120" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="245" cy="75" r="4" fill="#a855f7" />
                  <text x="245" y="90" fill="#a855f7" fontSize="9" textAnchor="middle">گره میانی</text>
                </svg>
              </div>
            </div>

            {/* Hints Box */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <HelpCircle size={15} className="text-amber-500" />
                  <span>راهنمایی‌های گام‌به‌گام ({toPersianDigits(revealedHints)} از {toPersianDigits(selectedLab.hintsFa.length)} افشا شده):</span>
                </span>
                {revealedHints < selectedLab.hintsFa.length && (
                  <button
                    onClick={() => setRevealedHints((prev) => prev + 1)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    افشای راهنمایی بعدی +
                  </button>
                )}
              </div>

              {revealedHints > 0 && (
                <div className="space-y-1.5 p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
                  {selectedLab.hintsFa.slice(0, revealedHints).map((hint, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                        {toPersianDigits(hIdx + 1)}.
                      </span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Guided Step Inputs */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award size={16} className="text-amber-500" />
              <span>مراحل حل و وارد کردن پاسخ‌های محاسباتی:</span>
            </h3>

            <div className="space-y-3.5">
              {selectedLab.steps.map((step, idx) => {
                const currentVal = userInputs[step.id] || '';
                const isVerified = stepResults[step.id];
                const hasTried = step.id in stepResults;

                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isVerified
                        ? 'bg-emerald-500/5 border-emerald-500/30'
                        : hasTried
                        ? 'bg-rose-500/5 border-rose-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold flex items-center justify-center">
                            {toPersianDigits(idx + 1)}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                            {step.labelFa}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 ms-7">
                          {step.hintFa}
                        </p>
                      </div>

                      {/* Input & Check button */}
                      <div className="flex items-center gap-2 ms-7 sm:ms-0 shrink-0">
                        <div className="relative w-32">
                          <input
                            type="text"
                            placeholder="عدد..."
                            value={currentVal}
                            onChange={(e) => handleInputChange(step.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleVerifyStep(step.id);
                            }}
                            disabled={isVerified}
                            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-center text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                          />
                          <span className="absolute end-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none">
                            {step.unitFa}
                          </span>
                        </div>

                        <button
                          onClick={() => handleVerifyStep(step.id)}
                          disabled={isVerified || !currentVal.trim()}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isVerified
                              ? 'bg-emerald-500 text-slate-950 cursor-default'
                              : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                          }`}
                        >
                          {isVerified ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={13} />
                              <span>صحیح</span>
                            </span>
                          ) : (
                            <span>بررسی</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {hasTried && !isVerified && (
                      <div className="mt-2 text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1.5 ms-7">
                        <AlertCircle size={13} />
                        <span>پاسخ شما با مقدار دقیق همخوانی ندارد. مجدداً محاسبه و بررسی کنید.</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Analytical Solution Box */}
          {showFullSolution && (
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm sm:text-base">
                <Sparkles size={18} />
                <span>تبریک! این چالش با موفقیت حل و در سوابق شما ثبت شد.</span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-slate-500 text-xs font-bold">
                  <BookOpen size={15} className="text-amber-500" />
                  <span>راه حل تشریحی کامل به سبک کتاب دکتر جبه‌دار:</span>
                </div>
                <div
                  className="prose dark:prose-invert max-w-none text-xs sm:text-sm"
                  dangerouslySetInnerHTML={{
                    __html: selectedLab.solutionExplanationFa
                      .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-amber-600 dark:text-amber-400 mt-3 mb-1">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
