import React, { useState } from 'react';
import {
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import type { DescriptiveQuestion } from '../../types';
import { renderMarkdownWithMath } from '../../utils/mathRenderer';
import { toPersianDigits } from '../../utils/persian';

interface DescriptiveQuestionsCardProps {
  questions: DescriptiveQuestion[];
}

export const DescriptiveQuestionsCard: React.FC<DescriptiveQuestionsCardProps> = ({
  questions,
}) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    [questions[0]?.id || '']: true, // First question expanded by default
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
      {/* Section Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
            <FileQuestion size={18} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              پرسش‌ها و مسائل تشریحی امتحانی همراه با پاسخ کامل
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              مسائل تحلیلی و امتحانی پایان‌ترم دانشگاهی منطبق بر سرفصل‌های آموزشی درس
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold shrink-0">
          {toPersianDigits(questions.length)} مسئله تشریحی
        </span>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const isExpanded = !!expandedIds[q.id];

          return (
            <div
              key={q.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d31] overflow-hidden transition-all"
            >
              {/* Question Header & Toggle Button */}
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#18243c] transition-colors"
              >
                <div className="space-y-2 text-start">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {toPersianDigits(idx + 1)}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium">
                      {q.sourceFa}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                    {q.questionFa}
                  </p>
                </div>

                <button
                  type="button"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {/* Collapsible Answer Body */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1320] space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <Award size={15} />
                    <span>راه حل تشریحی گام‌به‌گام و تحلیل روابط:</span>
                  </div>

                  <div
                    className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-3"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdownWithMath(q.detailedAnswerMarkdownFa)
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
