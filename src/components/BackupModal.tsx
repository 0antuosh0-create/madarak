import React, { useState, useRef } from 'react';
import { X, Download, Upload, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { exportProgressBackup, importProgressBackup, saveProgress } from '../utils/storage';
import type { UserProgress } from '../utils/storage';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProgressReset: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onProgressReset,
}) => {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportProgressBackup();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = importProgressBackup(text);
      if (success) {
        setImportStatus('success');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setImportStatus('error');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    const emptyProgress: UserProgress = {
      completedLessons: [],
      quizScores: {},
      completedLabs: [],
      bookmarkedLessons: [],
      terminalHistory: [],
      theme: 'dark',
    };
    saveProgress(emptyProgress);
    setShowConfirmReset(false);
    onProgressReset();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              پشتیبان‌گیری و انتقال پیشرفت
            </h3>
            <p className="text-xs text-slate-500">
              ذخیره اطلاعات درس‌ها، کوییزها و چالش‌ها در فایل یا بازیابی آن
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Export */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d31] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                خروجی گرفتن از فایل پشتیبان
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                دانلود یک فایل JSON شامل تمام درس‌های خوانده‌شده و نمرات شما
              </div>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              <Download size={15} />
              <span>دانلود فایل</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d31] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                بارگذاری و بازیابی فایل پشتیبان
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                انتخاب فایل JSON قبلی برای بازگردانی پیشرفت در این دستگاه
              </div>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors cursor-pointer shrink-0"
              >
                <Upload size={15} />
                <span>انتخاب فایل</span>
              </button>
            </div>
          </div>

          {importStatus === 'success' && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>پیشرفت شما با موفقیت بازیابی شد! صفحه در حال بارگذاری مجدد است...</span>
            </div>
          )}

          {importStatus === 'error' && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>فایل نامعتبر است یا ساختار داده‌های پشتیبان مدارک را ندارد.</span>
            </div>
          )}

          {/* Reset All */}
          <div className="pt-2">
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>صفر کردن و پاک‌سازی تمام پیشرفت‌ها</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-300">
                  <AlertTriangle size={16} />
                  <span>آیا مطمئن هستید؟ تمام درس‌ها و نمرات پاک خواهند شد.</span>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1 rounded text-xs bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3 py-1 rounded text-xs bg-red-600 text-white font-bold"
                  >
                    بله، پاک شود
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
