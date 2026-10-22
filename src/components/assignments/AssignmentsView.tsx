import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Award,
  GraduationCap
} from 'lucide-react';
import { assignmentsData } from '../../data/assignmentsData';
import { renderMarkdownWithMath } from '../../utils/mathRenderer';
import { toPersianDigits } from '../../utils/persian';

export const AssignmentsView: React.FC = () => {
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProblemIds, setExpandedProblemIds] = useState<Record<string, boolean>>({
    's1-p1': true,
    's1-p2': true,
    's2-p1': true,
    's3-p1': true,
    's4-p1': true,
    's5-p1': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedProblemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = {};
    assignmentsData.forEach((s) => {
      s.problems.forEach((p) => {
        allIds[p.id] = true;
      });
    });
    setExpandedProblemIds(allIds);
  };

  const collapseAll = () => {
    setExpandedProblemIds({});
  };

  // Filter series and problems
  const filteredSeries = assignmentsData
    .filter((s) => selectedSeriesId === 'all' || s.id === selectedSeriesId)
    .map((s) => {
      const matchedProblems = s.problems.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return true;
        return (
          p.titleFa.toLowerCase().includes(q) ||
          p.problemStatementFa.toLowerCase().includes(q) ||
          p.conceptFa.toLowerCase().includes(q) ||
          p.handwrittenVerification.finalResultVerifiedFa.toLowerCase().includes(q)
        );
      });
      return {
        ...s,
        problems: matchedProblems,
      };
    })
    .filter((s) => s.problems.length > 0);

  const totalFilteredProblems = filteredSeries.reduce((acc, s) => acc + s.problems.length, 0);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 text-start transition-colors">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <GraduationCap size={15} className="text-amber-500 shrink-0" />
          <span>آرشیو مسائل دانشگاه شهید بهشتی • دانشکده مهندسی برق</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            بانک مسائل، تمرین‌ها و حل‌های تشریحی راستی‌آزمایی‌شده
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            مجموعه کامل تمرین‌های کلاسی، امتحانات و تکالیف تحلیلی درس سیستم‌های انرژی و مدارهای ۱ (دکتر مهران حاجی‌آقاپور) همراه با تطبیق گام‌به‌گام با برگه‌های دست‌نویس دانشجویان، تصحیح اشتباهات محاسباتی و تکمیل بخش‌های ناتمام مسائل.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
            <span>۷ سری تمرین دانشگاهی کامل</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Award size={14} className="text-amber-500 shrink-0" />
            <span>راستی‌آزمایی صحت ریاضی ۱۰۰٪</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Sparkles size={14} className="text-sky-500 shrink-0" />
            <span>رندر فرمول‌ها با KaTeX</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو در مسائل (مثلاً: نورتن، میرایی، ابرمش، هاولند)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              باز کردن همه
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              بستن همه
            </button>
          </div>
        </div>

        {/* Series Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSeriesId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              selectedSeriesId === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#131d31]'
            }`}
          >
            همه تمرین‌ها ({totalFilteredProblems})
          </button>
          {assignmentsData.map((s) => {
            const isSelected = selectedSeriesId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSeriesId(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#131d31]'
                }`}
              >
                سری {toPersianDigits(s.seriesNumber)}: {s.topicFa.split('،')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Series and Problems List */}
      <div className="space-y-8">
        {filteredSeries.map((series) => (
          <div key={series.id} className="space-y-4 text-start">
            {/* Series Header Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    سری {toPersianDigits(series.seriesNumber)}
                  </span>
                  <span className="text-xs text-slate-400">• {series.universityFa}</span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {series.titleFa}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {series.descriptionFa}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-xs shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">مدرس: {series.instructorFa}</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {toPersianDigits(series.problems.length)} مسئله راستی‌آزمایی‌شده
                </span>
              </div>
            </div>

            {/* Problems in this Series */}
            <div className="space-y-4">
              {series.problems.map((problem) => {
                const isExpanded = expandedProblemIds[problem.id];

                return (
                  <div
                    key={problem.id}
                    className="rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                  >
                    {/* Problem Header Bar */}
                    <div
                      onClick={() => toggleExpand(problem.id)}
                      className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-[#131d31]/60 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">
                            {toPersianDigits(problem.order)}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                            {problem.conceptFa}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/20">
                            {problem.handwrittenVerification.statusLabelFa}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {problem.titleFa}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {problem.problemStatementFa}
                        </p>
                      </div>

                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors shrink-0 mt-1"
                        aria-label="تغییر وضعیت نمایش حل مسئله"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {/* Problem Expanded Solution & Verification Body */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0b1320] space-y-5 animate-in fade-in duration-200">
                        {/* 1. Verification of Correctness & Handwritten Notes Banner */}
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-[#0b1f17] border border-emerald-300 dark:border-emerald-800 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                            <span>نتیجه راستی‌آزمایی ریاضی و تطبیق با برگه دست‌نویس:</span>
                          </div>
                          <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                            {problem.handwrittenVerification.handwrittenNotesComparisonFa}
                          </p>
                          {problem.handwrittenVerification.correctionDetailsFa && (
                            <div className="text-[11px] text-amber-800 dark:text-amber-300 font-medium pt-1 border-t border-emerald-200 dark:border-emerald-900/60">
                              <strong>تصحیح انجام‌شده: </strong>
                              {problem.handwrittenVerification.correctionDetailsFa}
                            </div>
                          )}
                          <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 border-t border-emerald-200 dark:border-emerald-900/60">
                            <span>پاسخ قطعی مورد تأیید:</span>
                            <span dir="ltr" className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-emerald-400 dark:border-emerald-800">
                              {problem.handwrittenVerification.finalResultVerifiedFa}
                            </span>
                          </div>
                        </div>

                        {/* 2. Full Step-by-Step Analytical Solution */}
                        <div className="p-5 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
                          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white">
                            <BookOpen size={15} className="text-amber-500" />
                            <span>تشریح گام‌به‌گام و حل دقیق تحلیلی:</span>
                          </div>

                          <div
                            className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-3"
                            dangerouslySetInnerHTML={{
                              __html: renderMarkdownWithMath(problem.stepByStepSolutionMarkdownFa),
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredSeries.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <FileCheck size={36} className="mx-auto mb-3 text-slate-400 opacity-60" />
            <p className="text-base font-bold">هیچ مسئله‌ای با این عبارت یافت نشد.</p>
            <p className="text-xs mt-1">لطفاً عبارت دیگری را جستجو کنید یا فیلتر سری تمرین را تغییر دهید.</p>
          </div>
        )}
      </div>
    </div>
  );
};
