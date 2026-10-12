import React from 'react';
import {
  BookMarked,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers
} from 'lucide-react';
import type { LessonSummarySection } from '../../types';
import { MathFormula } from '../common/MathFormula';

interface LessonSummaryBoxProps {
  summary?: LessonSummarySection;
  lessonSummaryFa: string;
}

export const LessonSummaryBox: React.FC<LessonSummaryBoxProps> = ({
  summary,
  lessonSummaryFa,
}) => {
  return (
    <div className="mt-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <BookMarked size={18} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              جمع‌بندی جامع و مرور سریع درس
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              خلاصه فرمول‌های کلیدی، قواعد بنیادین و نکات پرکاربرد امتحانی دکتر جبه‌دار
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/20 shrink-0">
          مرور سریع آزمون
        </span>
      </div>

      {/* Main Core Idea Callout */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#1a1710] border border-amber-200 dark:border-amber-900/50 space-y-1">
        <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
          <Sparkles size={14} />
          <span>ایده محوری و چکیده درس:</span>
        </span>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {lessonSummaryFa}
        </p>
      </div>

      {/* Main Formulas Section */}
      {summary && summary.mainFormulas && summary.mainFormulas.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers size={15} className="text-amber-500" />
            <span>فرمول‌ها و روابط کلیدی حاکم بر این درس:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {summary.mainFormulas.map((f, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-2"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {f.labelFa}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {f.explanationFa}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-[#0b1320] border border-slate-200 dark:border-slate-700 text-center">
                  <MathFormula formula={f.formulaTex} displayMode={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Golden Rules and Pitfalls Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Rules & Theorems */}
        {summary && summary.rulesAndTheoremsFa && summary.rulesAndTheoremsFa.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 space-y-2.5">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>قواعد طلایی و اصول نظریه مدار:</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {summary.rulesAndTheoremsFa.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exam Pitfalls & Fast Revision */}
        {summary && summary.examPitfallsFa && summary.examPitfallsFa.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-[#1a1420] border border-rose-200 dark:border-rose-900/60 space-y-2.5">
            <h5 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-rose-500" />
              <span>دام‌ها و اشتباهات متداول در امتحانات:</span>
            </h5>
            <ul className="space-y-2 text-xs text-rose-900 dark:text-rose-200">
              {summary.examPitfallsFa.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
