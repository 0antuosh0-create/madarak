import React, { useState } from 'react';
import { Sliders, Zap, Layers, Radio, Activity, ArrowLeftRight } from 'lucide-react';
import { TheveninSolver } from './TheveninSolver';
import { NodeMatrixSolver } from './NodeMatrixSolver';
import { OpAmpSimulator } from './OpAmpSimulator';
import { TransientSolver } from './TransientSolver';
import { DeltaWyeSolver } from './DeltaWyeSolver';

type SolverTab = 'thevenin' | 'node-matrix' | 'opamp' | 'transient' | 'delta-wye';

export const SandboxView: React.FC = () => {
  const [activeSolver, setActiveSolver] = useState<SolverTab>('thevenin');

  const tabs: { id: SolverTab; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'thevenin',
      label: 'معادل تونن و نورتن',
      icon: <Zap size={16} />,
      desc: 'محاسبه Voc, Isc, Rth و منحنی ماکسیمم توان',
    },
    {
      id: 'node-matrix',
      label: 'تحلیل ماتریسی گره',
      icon: <Layers size={16} />,
      desc: 'تشکیل [G][V] = [I] و حل معادلات خطی',
    },
    {
      id: 'opamp',
      label: 'شبیه‌ساز آپ‌امپ',
      icon: <Radio size={16} />,
      desc: 'تحلیل وارون‌گر، ناوارون‌گر، تفاضلی و اشباع',
    },
    {
      id: 'transient',
      label: 'پاسخ گذرای RC و RL',
      icon: <Activity size={16} />,
      desc: 'ثابت زمانی τ و رسم شکل موج حوزه زمان',
    },
    {
      id: 'delta-wye',
      label: 'تبدیل ستاره به مثلث',
      icon: <ArrowLeftRight size={16} />,
      desc: 'معادل‌سازی شبکه‌های پل و تبدیل Y ↔ Δ',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold mb-1">
          <Sliders size={14} />
          <span>آزمایشگاه مجازی و سندباکس تعاملی مدار ۱</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          سندباکس محاسباتی و شبیه‌سازهای تعاملی
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          ابزارهای قدرتمند حل تحلیلی، بصری‌سازی گرافیکی و راستی‌آزمایی محاسبات مدارهای الکتریکی
        </p>
      </div>

      {/* Solver Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const isActive = activeSolver === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSolver(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={isActive ? 'text-slate-950' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Solver Content */}
      <div className="pt-2">
        {activeSolver === 'thevenin' && <TheveninSolver />}
        {activeSolver === 'node-matrix' && <NodeMatrixSolver />}
        {activeSolver === 'opamp' && <OpAmpSimulator />}
        {activeSolver === 'transient' && <TransientSolver />}
        {activeSolver === 'delta-wye' && <DeltaWyeSolver />}
      </div>
    </div>
  );
};
