import React from 'react';
import {
  BookOpen,
  FileText,
  FileCheck,
  Sun,
  Moon,
  DownloadCloud,
  Calculator,
  Menu,
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import type { NavTab } from '../types';
import { toPersianDigits } from '../utils/persian';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCheatsheet: () => void;
  onOpenBackup: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenCheatsheet,
  onOpenBackup,
  completedLessonsCount,
  totalLessonsCount,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
    : 0;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'catalog', label: 'سرفصل‌ها و درس‌نامه', icon: <BookOpen size={17} /> },
    { id: 'assignments', label: 'حل تمرین و مسائل', icon: <FileCheck size={17} /> },
    { id: 'resources', label: 'فرمول‌نامه و مراجع', icon: <FileText size={17} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1320] transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Right section: Logo & App Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('catalog')}
              className="flex items-center gap-2.5 text-start group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Zap size={22} className="fill-slate-950" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                    مدارک
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 font-semibold border border-amber-300/40 dark:border-amber-700/50">
                    نسخه ۱.۰
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  مهندسی مدار و سیستم‌های انرژی ۱
                </span>
              </div>
            </button>
          </div>

          {/* Center section: Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Left section: Progress, Action Buttons, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Cheatsheet Button */}
            <button
              onClick={onOpenCheatsheet}
              title="فرمول‌نامه سریع (Ctrl+K)"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Calculator size={15} className="text-amber-500" />
              <span>فرمول‌نامه</span>
              <kbd className="hidden xl:inline-block px-1 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-slate-500">
                K
              </kbd>
            </button>

            {/* Overall Progress Indicator (Visible on tablet and desktop) */}
            <div
              title={`${toPersianDigits(completedLessonsCount)} از ${toPersianDigits(totalLessonsCount)} درس تکمیل شده`}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            >
              <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-amber-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {toPersianDigits(progressPercent)}٪
              </span>
              {progressPercent === 100 && (
                <CheckCircle2 size={13} className="text-emerald-500" />
              )}
            </div>

            {/* Backup / Export Button (Visible on tablet and desktop) */}
            <button
              onClick={onOpenBackup}
              title="پشتیبان‌گیری و ذخیره پیشرفت"
              className="hidden sm:flex p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <DownloadCloud size={18} />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تیره'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
