import React from 'react';
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import type { Lesson, Module } from '../../types';
import { toPersianDigits } from '../../utils/persian';
import { LessonFigureShowcase } from './LessonFigureShowcase';
import { LessonSummaryBox } from './LessonSummaryBox';
import { DescriptiveQuestionsCard } from './DescriptiveQuestionsCard';
import { QuizCard } from './QuizCard';
import { renderMarkdownWithMath } from '../../utils/mathRenderer';
import {
  lessonComprehensiveSummaries,
  lessonDescriptiveQuestions,
} from '../../data/lessonEnrichmentData';
interface LessonViewProps {
  lesson: Lesson;
  currentModule: Module;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onBackToCatalog: () => void;
  onNavigateLesson: (direction: 'next' | 'prev') => void;
  hasPrevLesson: boolean;
  hasNextLesson: boolean;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  currentModule,
  isCompleted,
  onToggleComplete,
  onBackToCatalog,
  onNavigateLesson,
  hasPrevLesson,
  hasNextLesson,
}) => {
  const comprehensiveSummary = lesson.comprehensiveSummary || lessonComprehensiveSummaries[lesson.id];
  const descriptiveQuestions = lesson.descriptiveQuestions || lessonDescriptiveQuestions[lesson.id] || [];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top breadcrumb & back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors cursor-pointer self-start py-1"
        >
          <ArrowRight size={16} />
          <span>بازگشت به فهرست سرفصل‌ها</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            {currentModule.titleFa}
          </span>
          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-700 dark:text-slate-300'
            }`}
          >
            <CheckCircle2 size={15} className={isCompleted ? 'text-emerald-500' : 'text-slate-400'} />
            <span>{isCompleted ? 'خوانده شده' : 'علامت به عنوان خوانده شده'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
          <span>درس {toPersianDigits(lesson.order)} از {toPersianDigits(currentModule.lessons.length)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            <span>{toPersianDigits(lesson.durationMinutes)} دقیقه مطالعه</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
          {lesson.titleFa}
        </h1>
        <div className="text-xs text-slate-400">
          {lesson.titleEn}
        </div>
      </div>


      {/* Authentic Textbook Figure & Diagram Showcase */}
      <div className="mb-8">
        <LessonFigureShowcase lessonId={lesson.id} />
      </div>

      {/* Lesson Content Body */}
      <div className="space-y-6 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans mb-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold">
            <BookOpen size={16} className="text-amber-500" />
            <span>متن آموزشی مرجع دکتر جبه‌دار مارالانی</span>
          </div>

          <div
            className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4"
            dangerouslySetInnerHTML={{
              __html: renderMarkdownWithMath(lesson.contentMarkdownFa)
            }}
          />
        </div>
      </div>

      {/* Key Takeaways */}
      {lesson.keyPointsFa.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 mb-6">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-amber-500" />
            <span>نکات طلایی و آموزه‌های کلیدی دکتر جبه‌دار:</span>
          </h4>
          <ul className="space-y-2">
            {lesson.keyPointsFa.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pitfalls & Exam Traps */}
      {lesson.pitfallsFa && lesson.pitfallsFa.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-50 dark:bg-[#1a1420] border border-rose-200 dark:border-rose-900/60 mb-8">
          <h4 className="text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300 mb-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-500" />
            <span>دام‌ها و اشتباهات رایج امتحانی:</span>
          </h4>
          <ul className="space-y-2">
            {lesson.pitfallsFa.map((trap, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>{trap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Comprehensive Lesson Summary */}
      <LessonSummaryBox
        summary={comprehensiveSummary}
        lessonSummaryFa={lesson.summaryFa}
      />

      {/* Descriptive Exam Questions with Full Step-by-Step Solutions */}
      {descriptiveQuestions.length > 0 && (
        <DescriptiveQuestionsCard questions={descriptiveQuestions} />
      )}

      {/* End-of-lesson Quiz */}
      <QuizCard
        lessonId={lesson.id}
        quiz={lesson.quiz}
        onQuizCompleted={() => {
          if (!isCompleted) {
            onToggleComplete();
          }
        }}
      />

      {/* Bottom navigation: Prev / Next */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateLesson('prev')}
          disabled={!hasPrevLesson}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            hasPrevLesson
              ? 'border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-800 dark:text-slate-200 cursor-pointer'
              : 'opacity-40 cursor-not-allowed border border-transparent text-slate-400'
          }`}
        >
          <ChevronRight size={18} />
          <span>درس قبلی</span>
        </button>

        <button
          onClick={() => onNavigateLesson('next')}
          disabled={!hasNextLesson}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            hasNextLesson
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 cursor-pointer'
              : 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-500'
          }`}
        >
          <span>درس بعدی</span>
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
};
