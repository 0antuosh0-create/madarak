import React, { useState } from 'react';
import { ArrowLeftRight, RefreshCw, Info } from 'lucide-react';
import { formatPersianNumber } from '../../utils/persian';

export const DeltaWyeSolver: React.FC = () => {
  const [direction, setDirection] = useState<'delta2wye' | 'wye2delta'>('delta2wye');

  // Delta inputs (Ra, Rb, Rc)
  const [ra, setRa] = useState<number>(12);
  const [rb, setRb] = useState<number>(18);
  const [rc, setRc] = useState<number>(30);

  // Wye inputs (R1, R2, R3)
  const [r1, setR1] = useState<number>(6);
  const [r2, setR2] = useState<number>(9);
  const [r3, setR3] = useState<number>(15);

  // Delta to Wye calculations:
  const sumDelta = ra + rb + rc;
  const calcR1 = sumDelta > 0 ? (rb * rc) / sumDelta : 0;
  const calcR2 = sumDelta > 0 ? (ra * rc) / sumDelta : 0;
  const calcR3 = sumDelta > 0 ? (ra * rb) / sumDelta : 0;

  // Wye to Delta calculations:
  const numeratorWye = r1 * r2 + r2 * r3 + r3 * r1;
  const calcRa = r1 > 0 ? numeratorWye / r1 : 0;
  const calcRb = r2 > 0 ? numeratorWye / r2 : 0;
  const calcRc = r3 > 0 ? numeratorWye / r3 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight size={18} className="text-amber-500" />
            <span>ماشین‌حساب و شبیه‌ساز تبدیل ستاره به مثلث (Y ↔ Δ)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            ساده‌سازی شبکه‌های پل و محاسبه مقاومت‌های معادل ستاره و مثلث طبق روابط فصل سوم دکتر جبه‌دار
          </p>
        </div>

        <button
          onClick={() => {
            setRa(12);
            setRb(18);
            setRc(30);
            setR1(6);
            setR2(9);
            setR3(15);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw size={13} />
          <span>مقادیر پیش‌فرض</span>
        </button>
      </div>

      {/* Direction selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDirection('delta2wye')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            direction === 'delta2wye'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          تبدیل مثلث به ستاره (Δ ← Y)
        </button>
        <button
          onClick={() => setDirection('wye2delta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            direction === 'wye2delta'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          تبدیل ستاره به مثلث (Y ← Δ)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {direction === 'delta2wye' ? 'مقاومت‌های اولیه مثلث (Δ)' : 'مقاومت‌های اولیه ستاره (Y)'}
            </h4>

            {direction === 'delta2wye' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                    مقاومت ضلع Ra (روبروی گره ۱):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={ra}
                    onChange={(e) => setRa(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                    مقاومت ضلع Rb (روبروی گره ۲):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={rb}
                    onChange={(e) => setRb(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                    مقاومت ضلع Rc (روبروی گره ۳):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={rc}
                    onChange={(e) => setRc(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                    مقاومت شاخه R1 (متصل به گره ۱):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={r1}
                    onChange={(e) => setR1(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                    مقاومت شاخه R2 (متصل به گره ۲):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={r2}
                    onChange={(e) => setR2(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">
                    مقاومت شاخه R3 (متصل به گره ۳):
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="1"
                    value={r3}
                    onChange={(e) => setR3(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick results */}
          <div className="grid grid-cols-3 gap-2">
            {direction === 'delta2wye' ? (
              <>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <span className="text-[10px] text-amber-700 dark:text-amber-300">R1 ستاره</span>
                  <div className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                    {formatPersianNumber(calcR1, 2)} Ω
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
                  <span className="text-[10px] text-sky-700 dark:text-sky-300">R2 ستاره</span>
                  <div className="text-base font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
                    {formatPersianNumber(calcR2, 2)} Ω
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300">R3 ستاره</span>
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    {formatPersianNumber(calcR3, 2)} Ω
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <span className="text-[10px] text-amber-700 dark:text-amber-300">Ra مثلث</span>
                  <div className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                    {formatPersianNumber(calcRa, 2)} Ω
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
                  <span className="text-[10px] text-sky-700 dark:text-sky-300">Rb مثلث</span>
                  <div className="text-base font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
                    {formatPersianNumber(calcRb, 2)} Ω
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300">Rc مثلث</span>
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    {formatPersianNumber(calcRc, 2)} Ω
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Visual Schematic & Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              نمایش هندسی شبکه‌های ستاره و مثلث هم‌مرکز:
            </div>

            <svg viewBox="0 0 460 220" className="w-full h-auto bg-slate-950 rounded-xl p-2">
              {/* Outer Delta Triangle */}
              <polygon points="230,25 70,185 390,185" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              
              {/* Nodes 1, 2, 3 */}
              <circle cx="230" cy="25" r="5" fill="#38bdf8" />
              <text x="230" y="15" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">گره ۱</text>

              <circle cx="70" cy="185" r="5" fill="#38bdf8" />
              <text x="50" y="195" fill="#38bdf8" fontSize="11" fontWeight="bold">گره ۲</text>

              <circle cx="390" cy="185" r="5" fill="#38bdf8" />
              <text x="405" y="195" fill="#38bdf8" fontSize="11" fontWeight="bold">گره ۳</text>

              {/* Delta Labels */}
              <text x="135" y="95" fill="#f59e0b" fontSize="11" fontWeight="bold">
                Rc = {direction === 'delta2wye' ? `${rc}Ω` : `${calcRc.toFixed(1)}Ω`}
              </text>
              <text x="325" y="95" fill="#f59e0b" fontSize="11" fontWeight="bold">
                Rb = {direction === 'delta2wye' ? `${rb}Ω` : `${calcRb.toFixed(1)}Ω`}
              </text>
              <text x="230" y="205" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                Ra = {direction === 'delta2wye' ? `${ra}Ω` : `${calcRa.toFixed(1)}Ω`}
              </text>

              {/* Inner Wye Star (center N at 230, 125) */}
              <circle cx="230" cy="125" r="4" fill="#a855f7" />
              <text x="245" y="130" fill="#a855f7" fontSize="10">مرکز N</text>

              <line x1="230" y1="25" x2="230" y2="125" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="70" y1="185" x2="230" y2="125" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="390" y1="185" x2="230" y2="125" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />

              {/* Wye labels */}
              <text x="215" y="75" fill="#a855f7" fontSize="10" textAnchor="end">
                R1 = {direction === 'delta2wye' ? `${calcR1.toFixed(1)}Ω` : `${r1}Ω`}
              </text>
              <text x="160" y="150" fill="#a855f7" fontSize="10">
                R2 = {direction === 'delta2wye' ? `${calcR2.toFixed(1)}Ω` : `${r2}Ω`}
              </text>
              <text x="300" y="150" fill="#a855f7" fontSize="10">
                R3 = {direction === 'delta2wye' ? `${calcR3.toFixed(1)}Ω` : `${r3}Ω`}
              </text>
            </svg>

            {/* Formula box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex items-center gap-2">
              <Info size={16} className="text-amber-500 shrink-0" />
              <span>
                {direction === 'delta2wye' ? (
                  <>
                    فرمول تبدیل مثلث به ستاره: مقاومت هر شاخه ستاره = ضرب دو مقاومت مجاور در مثلث تقسیم بر جمع هر سه مقاومت: <code>R1 = (Rb · Rc) / (Ra + Rb + Rc)</code>.
                  </>
                ) : (
                  <>
                    فرمول تبدیل ستاره به مثلث: مقاومت هر ضلع مثلث = مجموع ضرب‌های دوتایی مقاومت‌های ستاره تقسیم بر مقاومت روبه‌رو: <code>Ra = (R1·R2 + R2·R3 + R3·R1) / R1</code>.
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
