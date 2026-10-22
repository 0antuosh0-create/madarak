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
  GraduationCap,
  Printer,
  Eye,
  EyeOff,
  Calculator
} from 'lucide-react';
import { assignmentsData } from '../../data/assignmentsData';
import { renderMarkdownWithMath } from '../../utils/mathRenderer';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';

export const AssignmentsView: React.FC = () => {
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified_exact' | 'completed_and_corrected' | 'simplified_technique'>('all');
  const [worksheetMode, setWorksheetMode] = useState<'study' | 'selftest'>('study');
  
  // Track open/collapsed solutions
  const [expandedProblemIds, setExpandedProblemIds] = useState<Record<string, boolean>>({
    's1-p1': true,
    's1-p2': true,
    's2-p1': true,
    's3-p1': true,
    's4-p1': true,
    's5-p1': true,
  });

  // Interactive Quick Calculator state inside the Studio
  const [calcVs, setCalcVs] = useState<number>(12);
  const [calcRth, setCalcRth] = useState<number>(10);
  const [calcC, setCalcC] = useState<number>(100); // uF
  const [calcL, setCalcL] = useState<number>(2); // H

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

  const handlePrint = () => {
    window.print();
  };

  // Filter series and problems
  const filteredSeries = assignmentsData
    .filter((s) => selectedSeriesId === 'all' || s.id === selectedSeriesId)
    .map((s) => {
      const matchedProblems = s.problems.filter((p) => {
        const matchesStatus =
          statusFilter === 'all' || p.handwrittenVerification.status === statusFilter;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          p.titleFa.toLowerCase().includes(q) ||
          p.problemStatementFa.toLowerCase().includes(q) ||
          p.conceptFa.toLowerCase().includes(q) ||
          p.handwrittenVerification.finalResultVerifiedFa.toLowerCase().includes(q);

        return matchesStatus && matchesSearch;
      });

      return {
        ...s,
        problems: matchedProblems,
      };
    })
    .filter((s) => s.problems.length > 0);

  const totalFilteredProblems = filteredSeries.reduce((acc, s) => acc + s.problems.length, 0);

  // Dynamic calculations for the Studio calculator
  const calcPmax = (calcVs * calcVs) / (4 * calcRth);
  const calcTauRL = calcL / calcRth;
  const calcTauRC = (calcRth * calcC) / 1000; // ms

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 print:py-2 print:px-2">
      {/* SceneAI-Inspired Hero Header Banner (Print: Hidden) */}
      <div className="print:hidden relative overflow-hidden rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5 text-start transition-colors">
        {/* Glow ambient background aura */}
        <div className="absolute end-0 top-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute start-10 bottom-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold">
              <GraduationCap size={15} className="text-amber-500 shrink-0" />
              <span>استودیوی کارگاه و حل مسئله دانشگاه شهید بهشتی • دانشکده مهندسی برق</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              کارگاه کاربرگه و استودیوی حل مسئله (Worksheet Studio)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              بخش اختصاصی و مستقل دوره سیستم‌های انرژی و مدارهای ۱ (دکتر مهران حاجی‌آقاپور) شامل مجموعه کامل تکالیف، مسائل دست‌نویس کلاسی و امتحانات دانشگاهی همراه با راستی‌آزمایی ریاضی، تصحیح اشتباهات محاسباتی و تکمیل پاسخ‌های ناتمام.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-col items-stretch gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="چاپ کاربرگه یا ذخیره به عنوان PDF"
            >
              <Printer size={15} className="text-amber-400" />
              <span>چاپ کاربرگه (PDF)</span>
            </button>

            <button
              onClick={() => setWorksheetMode((prev) => (prev === 'study' ? 'selftest' : 'study'))}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                worksheetMode === 'selftest'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                  : 'bg-white dark:bg-[#131d31] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-500'
              }`}
            >
              {worksheetMode === 'selftest' ? <EyeOff size={15} /> : <Eye size={15} />}
              <span>{worksheetMode === 'selftest' ? 'حالت خودآزمایی (پنهان)' : 'حالت حل کامل'}</span>
            </button>
          </div>
        </div>

        {/* Feature & Studio Stats Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
            <span>۷ سری تمرین دانشگاهی کامل</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Award size={14} className="text-amber-500 shrink-0" />
            <span>راستی‌آزمایی ریاضی و تصحیح دست‌نویس‌ها</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Sparkles size={14} className="text-sky-500 shrink-0" />
            <span>فرمول‌های تحلیلی KaTeX</span>
          </span>
        </div>
      </div>

      {/* Interactive Studio Parameter Sandbox (Print: Hidden) */}
      <div className="print:hidden rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 text-start">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Calculator size={17} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                ماشین‌حساب و سندباکس پارامتری کارگاه مدار
              </h3>
              <p className="text-[11px] text-slate-500">
                تغییر مقادیر ولتاژ، مقاومت تونن، سلف و خازن جهت اعتبارسنجی مقادیر عددی مسائل
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
            LIVE SOLVER
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] text-slate-500 block">ولتاژ تونن (Vth):</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={calcVs}
                onChange={(e) => setCalcVs(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-center font-bold"
              />
              <span className="text-slate-400 text-[10px]">V</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] text-slate-500 block">مقاومت تونن (Rth):</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={calcRth}
                onChange={(e) => setCalcRth(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-center font-bold"
              />
              <span className="text-slate-400 text-[10px]">Ω</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] text-slate-500 block">اندوکتانس سلف (L):</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={calcL}
                onChange={(e) => setCalcL(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-center font-bold"
              />
              <span className="text-slate-400 text-[10px]">H</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] text-slate-500 block">ظرفیت خازن (C):</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={calcC}
                onChange={(e) => setCalcC(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-center font-bold"
              />
              <span className="text-slate-400 text-[10px]">μF</span>
            </div>
          </div>
        </div>

        {/* Real-time calculated results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">توان ماکزیمم (Pmax):</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {formatPersianNumber(calcPmax, 2)} W
            </span>
          </div>

          <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">ثابت زمانی RL (τ = L/R):</span>
            <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
              {formatPersianNumber(calcTauRL, 3)} s
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">ثابت زمانی RC (τ = RC):</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {formatPersianNumber(calcTauRC, 2)} ms
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar (Print: Hidden) */}
      <div className="print:hidden space-y-4">
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

        {/* Verification Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] text-slate-400 shrink-0">وضعیت راستی‌آزمایی:</span>
          {([
            { id: 'all', label: 'همه وضعیت‌ها' },
            { id: 'completed_and_corrected', label: 'تکمیل و تصحیح‌شده' },
            { id: 'verified_exact', label: 'راستی‌آزمایی دقیق' },
            { id: 'simplified_technique', label: 'روش ساده‌تر تحلیلی' },
          ] as const).map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                statusFilter === st.id
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
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
