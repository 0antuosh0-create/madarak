import React, { useState, useEffect } from 'react';
import type { NavTab } from './types';
import { modulesData } from './data/modulesData';
import {
  loadProgress,
  saveProgress,
  toggleLessonCompletion,
} from './utils/storage';
import type { UserProgress } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { QuickCheatsheetModal } from './components/QuickCheatsheetModal';
import { BackupModal } from './components/BackupModal';
import { CatalogView } from './components/catalog/CatalogView';
import { ResourcesView } from './components/resources/ResourcesView';
import {
  Zap,
  Calculator,
  DownloadCloud,
  Sparkles,
  BatteryCharging,
  RefreshCw,
  Heart
} from 'lucide-react';
import { BackgroundCircuitAura } from './components/common/BackgroundCircuitAura';

const circuitJokes = [
  'مقاومت نکن، جریان پیدا می‌کنی! (قانون اهم)',
  'خازن‌ها حافظه دارند؛ پس هرگز به گذشته وابسته نباش!',
  'سلف‌ها با هر تغییری مخالفت می‌کنند، درست مثل گروه آموزشی دانشکده!',
  'اگر احساس تنهایی می‌کنی، یادت باشه در مدار باز هم جریان صفره!',
  'تنها جایی که اتصال کوتاه چیز خوبیه، ورودی آپ‌امپه (اتصال کوتاه مجازی)!',
  'ولتاژ بدون جریان یعنی پتانسیل داری ولی حرکتی نمی‌کنی!',
  'سعی کن مثل شین اسلک باشی: همیشه تعادل شبکه رو حفظ کن و همه تلفات رو به جون بخر!',
  'قضیه تونن ثابت می‌کنه هر مدار پیچیده‌ای رو میشه به یک منبع و یک مقاومت ساده کرد؛ زندگی هم همینه!'
];
export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [currentTab, setCurrentTab] = useState<NavTab>('catalog');
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>();
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [mindCharged, setMindCharged] = useState(false);

  // Sync theme with document element
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCheatsheetOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = progress.theme === 'dark' ? 'light' : 'dark';
    const nextProgress: UserProgress = { ...progress, theme: nextTheme };
    setProgress(nextProgress);
    saveProgress(nextProgress);
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    toggleLessonCompletion(lessonId);
    setProgress(loadProgress());
  };


  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalLessons = modulesData.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#f8f5ee] dark:bg-[#0b1320] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors relative selection:bg-amber-500/20">
      {/* Shabk-style Ambient Topology Canvas with Electrical Circuit Packets */}
      <BackgroundCircuitAura theme={progress.theme} />

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'catalog') {
            setActiveLessonId(undefined);
          }
        }}
        theme={progress.theme}
        onToggleTheme={handleToggleTheme}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        completedLessonsCount={progress.completedLessons.length}
        totalLessonsCount={totalLessons}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* Mobile Drawer */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'catalog') {
            setActiveLessonId(undefined);
          }
        }}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        completedLessonsCount={progress.completedLessons.length}
        totalLessonsCount={totalLessons}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'catalog' && (
          <CatalogView
            modules={modulesData}
            completedLessons={progress.completedLessons}
            onToggleCompleteLesson={handleToggleLessonComplete}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
            onClearActiveLesson={() => setActiveLessonId(undefined)}
          />
        )}
        {currentTab === 'resources' && <ResourcesView />}
      </main>

      {/* Footer */}
      {/* Minimal, Delightful & Witty Engineering Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1320] py-8 px-4 sm:px-6 lg:px-8 mt-14 transition-colors">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Top Row: Clean Brand & Quick Tools */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm shadow-amber-500/20 shrink-0">
                <Zap size={18} className="fill-slate-950" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    مدارک (Madarak)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold border border-amber-300/40">
                    نسخه ۱.۰
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  نظریه اساسی مدارها (دکتر جبه‌دار) و سیستم‌های انرژی ۱ • دانشگاه تهران
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCheatsheetOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#18243c] transition-colors cursor-pointer"
              >
                <Calculator size={13} className="text-amber-500" />
                <span>فرمول‌نامه (Ctrl+K)</span>
              </button>
              <button
                onClick={() => setIsBackupOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#18243c] transition-colors cursor-pointer"
              >
                <DownloadCloud size={13} />
                <span>ذخیره پیشرفت</span>
              </button>
            </div>
          </div>

          {/* Interactive Witty Engineering Strip */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            {/* Clickable Circuit Joke Generator */}
            <button
              onClick={() => setJokeIndex((prev) => (prev + 1) % circuitJokes.length)}
              className="flex items-center gap-2.5 text-start hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer group flex-1 p-2 sm:p-1 rounded-xl"
              title="کلیک کنید برای خواندن شوخی بعدی!"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                <Sparkles size={16} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  <span>طنز مداری</span>
                  <span className="text-amber-500">•</span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold group-hover:underline">
                    <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                    <span>کلیک برای شوخی بعدی</span>
                  </span>
                </div>
                <p className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-snug">
                  «{circuitJokes[jokeIndex]}»
                </p>
              </div>
            </button>

            {/* Interactive Mind Charging & Current Flow Badge */}
            <button
              onClick={() => setMindCharged((prev) => !prev)}
              className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95 ${
                mindCharged
                  ? 'bg-emerald-50 dark:bg-[#0b1f17] border-emerald-400 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-[#1a1710] border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-300'
              }`}
              title="برای شارژ یا دشارژ خازن ذهن کلیک کنید!"
            >
              <div className="relative flex items-center justify-center">
                <BatteryCharging size={16} className={mindCharged ? 'text-emerald-500 animate-pulse' : 'text-amber-500'} />
              </div>
              <span>
                {mindCharged
                  ? 'خازن ذهن: ۱۰۰٪ شارژ شد! • ولتاژ پایدار'
                  : 'خازن ذهن: ۹۸٪ شارژ • جریان ایده: ۲.۴A'}
              </span>
            </button>
          </div>

          {/* Bottom Minimal Copyright & Love */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500 text-center sm:text-start pt-1">
            <p>
              تمامی حقوق محفوظ است • پلتفرم تعاملی مدارک (Madarak)
            </p>
            <div className="flex items-center gap-1">
              <span>طراحی شده با</span>
              <Heart size={11} className="text-rose-500 fill-rose-500" />
              <span>برای دانشجویان مهندسی برق و کامپیوتر</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick Cheatsheet Modal */}
      <QuickCheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />

      {/* Backup & Export Modal */}
      <BackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        onProgressReset={() => setProgress(loadProgress())}
      />
    </div>
  );
};

export default App;
