import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Info,
  CheckCircle2,
  Cpu,
  Wrench,
  Tag
} from 'lucide-react';
import { lessonFiguresData } from '../../data/lessonFiguresData';
import type { LessonFigureMeta } from '../../data/lessonFiguresData';
import { lessonHardwareData } from '../../data/lessonHardwareData';
import type { LessonHardwareData } from '../../data/lessonHardwareData';
import { HardwareCardVisualizer } from './HardwareCardVisualizer';
import { toPersianDigits } from '../../utils/persian';

interface LessonFigureShowcaseProps {
  lessonId: string;
  className?: string;
}

export const LessonFigureShowcase: React.FC<LessonFigureShowcaseProps> = ({
  lessonId,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'textbook' | 'hardware'>('textbook');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageBg = 'white';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const figureMeta: LessonFigureMeta | undefined = lessonFiguresData[lessonId];
  const hardwareMeta: LessonHardwareData | undefined = lessonHardwareData[lessonId];


  const resolveAssetUrl = (src: string) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    const clean = src.replace(/^(\.\/|\/)+/, '');
    const base = import.meta.env.BASE_URL || './';
    return `${base}${clean}`;
  };
  if (!figureMeta) return null;

  return (
    <div className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            {activeTab === 'textbook' ? <BookOpen size={17} /> : <Cpu size={17} />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {activeTab === 'textbook'
                  ? 'شکل و دیاگرام کتاب مرجع دکتر جبه‌دار'
                  : 'تطبیق با سخت‌افزار و آزمایشگاه واقعی در صنعت'}
              </span>
              {activeTab === 'textbook' ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold border border-amber-300/40 dark:border-amber-700/40">
                  {figureMeta.figureNumberFa} • صفحه {toPersianDigits(figureMeta.bookPage)} کتاب جبه‌دار
                </span>
              ) : hardwareMeta ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 font-semibold border border-sky-300/40 dark:border-sky-700/40">
                  {hardwareMeta.categoryFa}
                </span>
              ) : null}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {activeTab === 'textbook'
                ? 'مرجع نظریه اساسی مدارها و شبکه‌ها (تألیف چارلز دسور و ارنست کوه / ترجمه دکتر جبه‌دار)'
                : 'بررسی قطعات فیزیکی، نحوه بستن مدار در آزمایشگاه و استانداردهای صنعتی'}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto w-full sm:w-auto justify-between sm:justify-start">
          {/* Tab buttons */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('textbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'textbook'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen size={13} />
              <span>شکل کتاب جبه‌دار</span>
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'hardware'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu size={13} />
              <span>سخت‌افزار و قطعات واقعی</span>
            </button>
          </div>

          {/* Fullscreen / Lightbox button */}
          {activeTab === 'textbook' && (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setZoomLevel(1);
              }}
              className="flex items-center gap-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
              title="مشاهده در اندازه بزرگ"
            >
              <Maximize2 size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Main Display Container */}
      {activeTab === 'textbook' ? (
        /* Textbook Scanned Figure View */
        <div
          onClick={() => setIsModalOpen(true)}
          className={`relative p-4 sm:p-6 flex items-center justify-center cursor-zoom-in transition-colors ${
            imageBg === 'white'
              ? 'bg-slate-100/70 dark:bg-slate-950/70'
              : 'bg-slate-950'
          }`}
        >
          <div className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-md border border-slate-200/80 dark:border-slate-800 bg-white">
            <img
              src={resolveAssetUrl(figureMeta.figureSrc)}
              alt={figureMeta.captionFa}
              className="w-full h-auto object-contain max-h-[420px] p-2"
              loading="lazy"
            />
            <div className="absolute end-2 bottom-2 px-2 py-1 rounded-lg bg-slate-950/75 text-white text-[10px] backdrop-blur-xs flex items-center gap-1 pointer-events-none">
              <ZoomIn size={12} />
              <span>کلیک برای بزرگ‌نمایی</span>
            </div>
          </div>
        </div>
      ) : hardwareMeta ? (
        /* Real-World Hardware & Component Inspector View */
        <div className="p-4 sm:p-6 bg-slate-950 space-y-4">
          {/* Header of Hardware Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Wrench size={15} className="text-amber-400" />
                <span>{hardwareMeta.titleFa}</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {hardwareMeta.subtitleFa}
              </p>
            </div>

            {/* Industrial Part Number Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {hardwareMeta.partNumbers.map((pn, pIdx) => (
                <span
                  key={pIdx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-amber-400"
                >
                  <Tag size={10} />
                  <span>{pn}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Dedicated Hardware Visualization */}
          <HardwareCardVisualizer visualKind={hardwareMeta.visualKind} />

          {/* Description & University Lab Tips */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs pt-1">
            <div className="md:col-span-7 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed space-y-1">
              <span className="font-bold text-amber-400 block mb-1">تطبیق تئوری جبه‌دار با واقعیت صنعتی:</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">{hardwareMeta.descriptionFa}</p>
            </div>

            <div className="md:col-span-5 p-3 rounded-xl bg-amber-950/40 border border-amber-900/50 text-slate-300 space-y-1.5">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                <span>نکات عملیاتی در آزمایشگاه دانشگاه:</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                {hardwareMeta.labTipsFa.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {/* Caption & Key Insights for Textbook */}
      {activeTab === 'textbook' && (
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#131d31] border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                {figureMeta.captionFa}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                برگرفته از صفحه {toPersianDigits(figureMeta.bookPage)} کتاب نظریه اساسی مدارها و شبکه‌ها (دکتر جبه‌دار مارالانی)
              </p>
            </div>
          </div>

          {/* Analytical Key Insights */}
          {figureMeta.keyInsightsFa.length > 0 && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>نکات کلیدی و آموزه‌های تحلیلی این شکل:</span>
              </span>
              <ul className="space-y-1">
                {figureMeta.keyInsightsFa.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-1 shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Lightbox Modal for Textbook Figure */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {figureMeta.figureNumberFa}: {figureMeta.captionFa}
                </h3>
                <span className="text-xs text-slate-500">
                  صفحه {toPersianDigits(figureMeta.bookPage)} کتاب دکتر جبه‌دار مارالانی
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.2))}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                  title="کوچک‌نمایی"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.2))}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                  title="بزرگ‌نمایی"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Zoom */}
            <div className="flex-1 p-6 overflow-auto bg-slate-950 flex items-center justify-center">
              <img
                src={resolveAssetUrl(figureMeta.figureSrc)}
                alt={figureMeta.captionFa}
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease' }}
                className="max-w-full max-h-[70vh] object-contain rounded-lg bg-white p-2 shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
