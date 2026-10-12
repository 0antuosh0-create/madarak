import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { QuizQuestion } from '../../types';
import { saveQuizScore } from '../../utils/storage';

interface QuizCardProps {
  lessonId: string;
  quiz: QuizQuestion;
  onQuizCompleted?: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ lessonId, quiz, onQuizCompleted }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);

    const isCorrect = index === quiz.correctIndex;
    if (isCorrect) {
      saveQuizScore(lessonId, 1, 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      if (onQuizCompleted) {
        onQuizCompleted();
      }
    } else {
      saveQuizScore(lessonId, 0, 1);
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
  };

  const isCorrect = selectedIndex === quiz.correctIndex;

  return (
    <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <HelpCircle size={18} />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            آزمونک ارزیابی آموخته‌های این درس
          </h4>
        </div>
        {isAnswered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw size={14} />
            <span>پاسخ مجدد</span>
          </button>
        )}
      </div>

      {/* Question */}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-4 leading-relaxed">
        {quiz.questionFa}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {quiz.optionsFa.map((option, idx) => {
          let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#18243c]';
          let icon = null;

          if (isAnswered) {
            if (idx === quiz.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-[#0b1f17] text-emerald-900 dark:text-emerald-200 font-semibold';
              icon = <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />;
            } else if (idx === selectedIndex) {
              btnStyle = 'border-rose-500 bg-rose-50 dark:bg-[#201015] text-rose-900 dark:text-rose-200';
              icon = <XCircle size={18} className="text-red-500 shrink-0" />;
            } else {
              btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-start transition-all cursor-pointer ${btnStyle}`}
            >
              <span>{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation */}
      {isAnswered && (
        <div
          className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-[#0b1f17] border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
              : 'bg-amber-50 dark:bg-[#1a1710] border-amber-400 dark:border-amber-800 text-amber-900 dark:text-amber-300'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Award size={16} />
            <span>{isCorrect ? 'آفرین! پاسخ شما کاملاً درست است.' : 'تحلیل و تشریح پاسخ تشریحی:'}</span>
          </div>
          <p>{quiz.explanationFa}</p>
        </div>
      )}
    </div>
  );
};
