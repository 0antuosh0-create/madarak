import React from 'react';
import {
  BookOpen,
  FileText,
  FileCheck,
  Calculator,
  DownloadCloud,
  X,
  Zap,
  Award
} from 'lucide-react';
import type { NavTab } from '../types';
import { toPersianDigits } from '../utils/persian';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCheatsheet: () => void;
  onOpenBackup: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenCheatsheet,
  onOpenBackup,
  completedLessonsCount,
  totalLessonsCount,
}) => {
  if (!isOpen) return null;

  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
    : 0;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'catalog', label: 'سرفصل‌ها و درس‌نامه', icon: <BookOpen size={18} />, desc: 'آموزش یکپارچه مدار و سیستم‌های انرژی ۱' },
    { id: 'assignments', label: 'حل تمرین و مسائل', icon: <FileCheck size={18} />, desc: 'آرشیو تمرین‌های حل‌شده دانشگاه شهید بهشتی با راستی‌آزمایی ریاضی' },
    { id: 'resources', label: 'فرمول‌نامه و مراجع', icon: <FileText size={18} />, desc: 'قضایا، کدهای رنگی و مراجع قدرت' },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#0f172a] border-s border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Zap size={20} className="fill-slate-950" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">منوی مدارک</h2>
                <p className="text-xs text-slate-500">مهندسی مدار و سیستم‌های انرژی ۱</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="بستن منو"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Card */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium mb-2">
              <span className="flex items-center gap-1.5">
                <Award size={15} className="text-amber-500" />
                <span>میزان یادگیری کل دوره</span>
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {toPersianDigits(progressPercent)}٪
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              <span>{toPersianDigits(completedLessonsCount)} از {toPersianDigits(totalLessonsCount)} درس خوانده شده</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-start transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`mt-0.5 ${isActive ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenCheatsheet();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Calculator size={15} className="text-amber-500" />
            <span>فرمول‌نامه سریع</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBackup();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <DownloadCloud size={15} />
            <span>پشتیبان‌گیری از پیشرفت</span>
          </button>
        </div>
      </div>
    </div>
  );
};
