import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Sparkles,
  Zap,
  Sliders,
  Cpu,
  Layers,
  Terminal,
  Radio,
  FileText,
  Award,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import type { Module, Lesson } from '../../types';
import { toPersianDigits } from '../../utils/persian';
import { LessonView } from './LessonView';

interface CatalogViewProps {
  modules: Module[];
  completedLessons: string[];
  onToggleCompleteLesson: (lessonId: string) => void;
  activeLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  onClearActiveLesson: () => void;
}

const moduleIconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={20} />,
  Cpu: <Cpu size={20} />,
  Sliders: <Sliders size={20} />,
  FileText: <FileText size={20} />,
  Radio: <Radio size={20} />,
  Terminal: <Terminal size={20} />,
};

export const CatalogView: React.FC<CatalogViewProps> = ({
  modules,
  completedLessons,
  onToggleCompleteLesson,
  activeLessonId,
  onSelectLesson,
  onClearActiveLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'remaining'>('all');

  // If a lesson is currently active, render the LessonView
  if (activeLessonId) {
    let foundLesson: Lesson | undefined;
    let foundModule: Module | undefined;

    for (const mod of modules) {
      const match = mod.lessons.find((l) => l.id === activeLessonId);
      if (match) {
        foundLesson = match;
        foundModule = mod;
        break;
      }
    }

    if (foundLesson && foundModule) {
      // Find all lessons flattened for prev/next
      const allLessons = modules.flatMap((m) => m.lessons);
      const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
      const hasPrev = currentIndex > 0;
      const hasNext = currentIndex < allLessons.length - 1;

      const handleNavigate = (direction: 'next' | 'prev') => {
        if (direction === 'next' && hasNext) {
          onSelectLesson(allLessons[currentIndex + 1].id);
        } else if (direction === 'prev' && hasPrev) {
          onSelectLesson(allLessons[currentIndex - 1].id);
        }
      };

      return (
        <LessonView
          lesson={foundLesson}
          currentModule={foundModule}
          isCompleted={completedLessons.includes(foundLesson.id)}
          onToggleComplete={() => onToggleCompleteLesson(foundLesson!.id)}
          onBackToCatalog={onClearActiveLesson}
          onNavigateLesson={handleNavigate}
          hasPrevLesson={hasPrev}
          hasNextLesson={hasNext}
        />
      );
    }
  }

  // Calculate totals
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalMinutes = modules.reduce((acc, m) => acc + m.estimatedMinutes, 0);
  const overallPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  // Filter modules and lessons
  const filteredModules = modules.map((mod) => {
    const matchedLessons = mod.lessons.filter((lesson) => {
      const matchesSearch =
        lesson.titleFa.includes(searchQuery) ||
        lesson.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.summaryFa.includes(searchQuery);

      const isCompleted = completedLessons.includes(lesson.id);
      const matchesFilter =
        filterMode === 'all' ||
        (filterMode === 'completed' && isCompleted) ||
        (filterMode === 'remaining' && !isCompleted);

      return matchesSearch && matchesFilter;
    });

    return {
      ...mod,
      lessons: matchedLessons,
    };
  }).filter((mod) => mod.lessons.length > 0);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Banner (Solid 100% Opaque Container) */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-md transition-colors">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Right Column: Title & Overview (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-500 shrink-0" />
              <span>دوره جامع و یکپارچه مهندسی مدار و سیستم‌های انرژی الکتریکی ۱</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug text-slate-900 dark:text-white">
              آموزش یکپارچه{' '}
              <span className="text-amber-600 dark:text-amber-400">نظریه مدار و سیستم‌های انرژی ۱</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              مسیر پیوسته و یکپارچه آموزشی از مبانی فیزیکی مدارهای فشرده و قوانین کیرشف (دکتر جبه‌دار) تا رفتار متناوب توان مختلط، سیستم پریونیت، پارامترها و مدل‌های خطوط انتقال، تشکیل ماتریس Y_bus و الگوریتم‌های پخش بار شبکه قدرت (گلاور، سعادت، عابدی).
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>۴۱ درس تحلیلی پیوسته</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs">
                <BookOpen size={14} className="text-amber-500 shrink-0" />
                <span>۸ فصل تخصصی مداری و قدرت</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs">
                <GraduationCap size={14} className="text-sky-500 shrink-0" />
                <span>مسائل تشریحی و فرمول‌های KaTeX</span>
              </span>
            </div>
          </div>

          {/* Left Column: Learning Progress Card & Metrics (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              {/* Progress Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">وضعیت یادگیری دوره</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {toPersianDigits(completedLessons.length)} از {toPersianDigits(totalLessons)} درس تکمیل شده
                    </span>
                  </div>
                </div>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                  {toPersianDigits(overallPercent)}٪
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-amber-500 to-amber-400 transition-all duration-500 rounded-full"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>

              {/* 2x2 High-Contrast Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-white dark:bg-[#162036] border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">فصول آموزشی</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {toPersianDigits(modules.length)} فصل
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#162036] border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 shrink-0">
                    <Layers size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">کل مباحث</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {toPersianDigits(totalLessons)} درس
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#162036] border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">زمان کل</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ~{toPersianDigits(Math.round(totalMinutes / 60))} ساعت
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#162036] border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">وضعیت</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {overallPercent === 100 ? 'تکمیل شد' : overallPercent > 0 ? 'در حال مطالعه' : 'شروع یادگیری'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Jabehdar golden quote footer */}
              <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-400 text-center border-t border-slate-100 dark:border-slate-800 italic">
                «قوانین کیرشف و قضیه تلگان ستون‌های بنیادین تئوری مدارها هستند.»
              </div>
            </div>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute end-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در درس‌ها (مثلاً: تلگان، تونن، آپ‌امپ، KCL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            همه مباحث ({toPersianDigits(totalLessons)})
          </button>
          <button
            onClick={() => setFilterMode('completed')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterMode === 'completed'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            خوانده‌شده ({toPersianDigits(completedLessons.length)})
          </button>
          <button
            onClick={() => setFilterMode('remaining')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterMode === 'remaining'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            باقیمانده ({toPersianDigits(totalLessons - completedLessons.length)})
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {filteredModules.map((mod) => {
          const modCompletedCount = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;
          const modPercent = mod.lessons.length > 0 ? Math.round((modCompletedCount / mod.lessons.length) * 100) : 0;

          return (
            <div
              key={mod.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-5"
            >
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    {moduleIconMap[mod.icon] || <Zap size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        فصل {toPersianDigits(mod.order)}
                      </span>
                      <span className="text-xs text-slate-400">• {mod.titleEn}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {mod.titleFa}
                    </h2>
                  </div>
                </div>

                {/* Module Stats & Progress */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex flex-col items-end text-xs">
                    <span className="text-slate-500">
                      {toPersianDigits(modCompletedCount)} از {toPersianDigits(mod.lessons.length)} درس
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {toPersianDigits(modPercent)}٪ تکمیل شده
                    </span>
                  </div>
                  <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${modPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {mod.descriptionFa}
              </p>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {mod.lessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-emerald-50 dark:bg-[#0d2218] border-emerald-300 dark:border-emerald-800 hover:border-emerald-500'
                          : 'bg-slate-50 dark:bg-[#131d31] border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-white dark:hover:bg-[#18243c] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors'
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={16} /> : toPersianDigits(lesson.order)}
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {lesson.titleFa}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{toPersianDigits(lesson.durationMinutes)} دقیقه</span>
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px]">
                              شکل کتاب مرجع
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronLeft
                        size={18}
                        className="text-slate-400 group-hover:text-amber-500 group-hover:-translate-x-1 transition-all shrink-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredModules.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <BookOpen size={36} className="mx-auto mb-3 text-slate-400 opacity-60" />
            <p className="text-base font-bold">هیچ درسی با این مشخصات یافت نشد.</p>
            <p className="text-xs mt-1">لطفاً عبارت جستجو یا فیلتر را تغییر دهید.</p>
          </div>
        )}
      </div>
    </div>
  );
};
