import React, { useState } from 'react';
import { Activity, RefreshCw, Info } from 'lucide-react';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';

export const TransientSolver: React.FC = () => {
  const [circuitType, setCircuitType] = useState<'rc' | 'rl'>('rc');

  // Parameters
  const [vs, setVs] = useState<number>(12);      // Step voltage (V)
  const [r, setR] = useState<number>(1000);     // Resistor (Ohms)
  const [c, setC] = useState<number>(100);      // Capacitor (uF)
  const [l, setL] = useState<number>(50);       // Inductor (mH)
  const [initialVal, setInitialVal] = useState<number>(0); // v(0) in V or i(0) in mA

  // Time constant calculation:
  // tau_RC = R * C = 1000 * 100e-6 = 0.1 s
  // tau_RL = L / R = (50e-3) / 1000 = 0.00005 s
  const tau = circuitType === 'rc' ? (r * (c * 1e-6)) : ((l * 1e-3) / r);

  // Initial and final values:
  const x0 = initialVal;
  const xInf = circuitType === 'rc' ? vs : (vs / r) * 1000; // in V for RC, in mA for RL
  const unit = circuitType === 'rc' ? 'ولت' : 'میلی‌آمپر';

  // Curve data points for 0 to 5 * tau
  const totalTime = 5 * tau;
  const numSteps = 50;
  const points: { t: number; val: number }[] = [];

  for (let i = 0; i <= numSteps; i++) {
    const curT = (totalTime / numSteps) * i;
    const curVal = xInf + (x0 - xInf) * Math.exp(-curT / tau);
    points.push({ t: curT, val: curVal });
  }

  // SVG Chart layout
  const svgWidth = 460;
  const svgHeight = 190;
  const padding = 35;
  const chartW = svgWidth - padding * 2;
  const chartH = svgHeight - padding * 2;

  const minVal = Math.min(x0, xInf, 0);
  const maxVal = Math.max(x0, xInf) * 1.15 || 1;
  const valRange = maxVal - minVal || 1;

  const getX = (t: number) => padding + (t / totalTime) * chartW;
  const getY = (val: number) => svgHeight - padding - ((val - minVal) / valRange) * chartH;

  const pathD = points.reduce((acc, pt, idx) => {
    const x = getX(pt.t);
    const y = getY(pt.val);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity size={18} className="text-amber-500" />
            <span>تحلیل‌گر پاسخ گذرای مدارهای مرتبه اول (First-Order RC & RL)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            محاسبه دقیق ثابت زمانی (τ)، فرمول همگانی پاسخ پله x(t) = x(∞) + [x(0) - x(∞)]e^-t/τ و رسم منحنی پاسخ زمانی
          </p>
        </div>

        <button
          onClick={() => {
            setVs(12);
            setR(1000);
            setC(100);
            setL(50);
            setInitialVal(0);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw size={13} />
          <span>مقادیر پیش‌فرض</span>
        </button>
      </div>

      {/* Circuit Type Switch */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setCircuitType('rc');
            setInitialVal(0);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            circuitType === 'rc'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          مدار خازنی RC (شارژ و دشارژ ولتاژ خازن)
        </button>
        <button
          onClick={() => {
            setCircuitType('rl');
            setInitialVal(0);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            circuitType === 'rl'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          مدار سلفی RL (پاسخ پله جریان سلف)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              تنظیم مشخصات منبع و عناصر
            </h4>

            {/* Vs */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">دامنه پله ولتاژ (Vs):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(vs)} V</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={vs}
                onChange={(e) => setVs(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* R */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت معادل تونن مدار (R):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(r)} Ω</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {circuitType === 'rc' ? (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">ظرفیت خازن (C):</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(c)} μF</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">اندوکتانس سلف (L):</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(l)} mH</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={l}
                  onChange={(e) => setL(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {/* Initial condition */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {circuitType === 'rc' ? 'ولتاژ اولیه خازن v(0):' : 'جریان اولیه سلف i(0):'}
                </span>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                  {toPersianDigits(initialVal)} {unit}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={circuitType === 'rc' ? 30 : 50}
                step={circuitType === 'rc' ? 1 : 1}
                value={initialVal}
                onChange={(e) => setInitialVal(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">ثابت زمانی مدار (τ)</span>
              <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                {tau >= 0.001 ? `${formatPersianNumber(tau * 1000, 2)} ms` : `${formatPersianNumber(tau * 1e6, 1)} μs`}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">مقدار حالت ماندگار x(∞)</span>
              <div className="text-lg font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
                {formatPersianNumber(xInf, 2)} {unit}
              </div>
            </div>
          </div>
        </div>

        {/* Output Curve & Analytical Formula (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">فرمول پاسخ کامل در حوزه زمان:</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                τ = {tau >= 0.001 ? `${(tau * 1000).toFixed(2)}ms` : `${(tau * 1e6).toFixed(1)}μs`}
              </span>
            </div>

            {/* Formula box */}
            <div dir="ltr" className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-center text-amber-300">
              {circuitType === 'rc' ? 'vC(t)' : 'iL(t)'} = {xInf.toFixed(2)} + ({(x0 - xInf).toFixed(2)}) · e^(-t / {tau >= 0.001 ? `${(tau * 1000).toFixed(2)}ms` : `${(tau * 1e6).toFixed(1)}μs`})
            </div>

            {/* Live Waveform Plot */}
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto bg-slate-950 rounded-xl p-2">
              {/* Axes */}
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - 15} y2={svgHeight - padding} stroke="#64748b" strokeWidth="1.5" />
              <line x1={padding} y1={svgHeight - padding} x2={padding} y2={15} stroke="#64748b" strokeWidth="1.5" />
              <text x={svgWidth - 20} y={svgHeight - padding + 15} fill="#94a3b8" fontSize="9" textAnchor="end">زمان t (5τ)</text>
              <text x={padding - 5} y={15} fill="#94a3b8" fontSize="9" textAnchor="end">{circuitType === 'rc' ? 'vC (V)' : 'iL (mA)'}</text>

              {/* Steady state line */}
              <line x1={padding} y1={getY(xInf)} x2={svgWidth - 15} y2={getY(xInf)} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <text x={svgWidth - 25} y={getY(xInf) - 5} fill="#38bdf8" fontSize="9" textAnchor="end">حالت ماندگار x(∞)</text>

              {/* 1 tau line */}
              <line x1={getX(tau)} y1={svgHeight - padding} x2={getX(tau)} y2={getY(xInf + (x0 - xInf) * Math.exp(-1))} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx={getX(tau)} cy={getY(xInf + (x0 - xInf) * Math.exp(-1))} r="3.5" fill="#10b981" />
              <text x={getX(tau)} y={svgHeight - padding + 12} fill="#10b981" fontSize="9" textAnchor="middle">t = τ (63.2%)</text>

              {/* Curve */}
              <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            </svg>

            {/* Educational takeaway */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex items-center gap-2">
              <Info size={16} className="text-amber-500 shrink-0" />
              <span>
                در زمان <strong>t = 5τ</strong> (معادل {formatPersianNumber(5 * (tau * 1000), 2)} میلی‌ثانیه)، پاسخ به بیش از ۹۹.۳٪ مقدار نهایی خود رسیده و گذرا عملاً به پایان می‌رسد.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
