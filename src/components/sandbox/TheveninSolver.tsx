import React, { useState } from 'react';
import { Sliders, Zap, Info, RefreshCw } from 'lucide-react';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';

export const TheveninSolver: React.FC = () => {
  // Circuit parameters
  const [vs, setVs] = useState<number>(24); // Voltage source (V)
  const [r1, setR1] = useState<number>(4);  // R1 (ohms)
  const [r2, setR2] = useState<number>(12); // R2 (ohms)
  const [r3, setR3] = useState<number>(3);  // R3 (ohms)
  const [rl, setRl] = useState<number>(6);  // Load resistance (ohms)

  // Circuit analysis:
  // Node analysis for standard bridge/divider:
  // Vs connected in series with R1, connected to parallel branch R2, then R3 in series to output terminal a. Terminal b is ground.
  // Voc (Open circuit voltage):
  // Voc = Vs * (R2 / (R1 + R2)) (since no current flows through R3 in open circuit)
  const vth = vs * (r2 / (r1 + r2));

  // Rth (Thevenin resistance):
  // Turn off Vs (short): R1 is in parallel with R2, then in series with R3.
  const rth = (r1 * r2) / (r1 + r2) + r3;

  // Short circuit current (In):
  const inorton = vth / rth;

  // Load calculations:
  const il = vth / (rth + rl);
  const vl = il * rl;
  const pl = rl * Math.pow(il, 2);

  // Maximum power transfer (at RL = Rth):
  const pmax = Math.pow(vth, 2) / (4 * rth);

  // Generate data points for PL vs RL plot (from RL = 0.5 to RL = 3 * Rth)
  const maxPlotRl = Math.max(30, rth * 2.5);
  const plotPoints: { rlVal: number; pVal: number }[] = [];
  const steps = 40;
  for (let i = 1; i <= steps; i++) {
    const rVal = (maxPlotRl / steps) * i;
    const curP = Math.pow(vth, 2) * rVal / Math.pow(rth + rVal, 2);
    plotPoints.push({ rlVal: rVal, pVal: curP });
  }

  // SVG dimensions for chart
  const svgWidth = 460;
  const svgHeight = 180;
  const padding = 35;
  const chartW = svgWidth - padding * 2;
  const chartH = svgHeight - padding * 2;

  const maxPVal = pmax * 1.15 || 1;
  const getX = (val: number) => padding + (val / maxPlotRl) * chartW;
  const getY = (val: number) => svgHeight - padding - (val / maxPVal) * chartH;

  const pathD = plotPoints.reduce((acc, pt, idx) => {
    const x = getX(pt.rlVal);
    const y = getY(pt.pVal);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap size={18} className="text-amber-500" />
            <span>شبیه‌ساز و تحلیل‌گر مدار معادل تونن و نورتن (Thevenin & Norton)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            تنظیم پارامترهای مدار اصلی، استخراج خودکار Vth و Rth و رسم زنده منحنی انتقال حداکثر توان به بار RL
          </p>
        </div>
        <button
          onClick={() => {
            setVs(24);
            setR1(4);
            setR2(12);
            setR3(3);
            setRl(6);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw size={13} />
          <span>مقادیر پیش‌فرض</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders size={15} className="text-amber-500" />
              <span>تنظیم پارامترهای مدار منبع</span>
            </h4>

            {/* Vs slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">منبع ولتاژ مستقل (Vs):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(vs)} ولت</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={vs}
                onChange={(e) => setVs(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* R1 slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت اول (R1):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(r1)} اهم</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={r1}
                onChange={(e) => setR1(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* R2 slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت موازی (R2):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(r2)} اهم</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={r2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* R3 slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت خروجی (R3):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(r3)} اهم</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={r3}
                onChange={(e) => setR3(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-amber-600 dark:text-amber-400">مقاومت بار متغیر (RL):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(rl)} اهم</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="0.5"
                value={rl}
                onChange={(e) => setRl(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Quick Result Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">ولتاژ معادل تونن (Vth)</span>
              <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                {formatPersianNumber(vth, 2)} V
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">مقاومت معادل تونن (Rth)</span>
              <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                {formatPersianNumber(rth, 2)} Ω
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">جریان معادل نورتن (IN)</span>
              <div className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
                {formatPersianNumber(inorton, 2)} A
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">حداکثر توان قابل انتقال (Pmax)</span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {formatPersianNumber(pmax, 2)} W
              </div>
            </div>
          </div>
        </div>

        {/* Output & Chart Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Circuit Schematics Representation */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
              <span>مدار معادل استخراج‌شده (Thevenin Equivalent Circuit)</span>
              <span className="text-[11px] font-mono text-amber-500">
                RL = {toPersianDigits(rl)} Ω {rl === rth ? '(تطبیق توان ماکسیمم!)' : ''}
              </span>
            </h4>

            {/* SVG Equivalent Schematic */}
            <svg viewBox="0 0 500 130" className="w-full h-auto bg-slate-950 rounded-xl p-2">
              {/* Loop wires */}
              <line x1="60" y1="90" x2="60" y2="35" stroke="#94a3b8" strokeWidth="2" />
              <line x1="60" y1="35" x2="150" y2="35" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Vth circle */}
              <circle cx="60" cy="62" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="60" y="66" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                {vth.toFixed(1)}V
              </text>
              <text x="60" y="42" fill="#38bdf8" fontSize="10" textAnchor="middle">+</text>
              <text x="60" y="88" fill="#38bdf8" fontSize="10" textAnchor="middle">-</text>

              {/* Rth resistor */}
              <rect x="150" y="27" width="55" height="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="177" y="20" fill="#f59e0b" fontSize="10" textAnchor="middle">
                Rth = {rth.toFixed(1)}Ω
              </text>
              
              <line x1="205" y1="35" x2="310" y2="35" stroke="#94a3b8" strokeWidth="2" />
              <line x1="60" y1="90" x2="310" y2="90" stroke="#94a3b8" strokeWidth="2" />

              {/* Terminals a-b */}
              <circle cx="310" cy="35" r="4" fill="#10b981" />
              <circle cx="310" cy="90" r="4" fill="#10b981" />
              <text x="310" y="22" fill="#10b981" fontSize="10" textAnchor="middle">a</text>
              <text x="310" y="108" fill="#10b981" fontSize="10" textAnchor="middle">b</text>

              {/* RL Load */}
              <line x1="310" y1="35" x2="390" y2="35" stroke="#a855f7" strokeWidth="2" />
              <line x1="310" y1="90" x2="390" y2="90" stroke="#a855f7" strokeWidth="2" />
              <rect x="382" y="45" width="16" height="35" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <line x1="390" y1="35" x2="390" y2="45" stroke="#a855f7" strokeWidth="2" />
              <line x1="390" y1="80" x2="390" y2="90" stroke="#a855f7" strokeWidth="2" />
              
              <text x="425" y="65" fill="#a855f7" fontSize="11" fontWeight="bold">
                RL = {rl}Ω (VL = {vl.toFixed(1)}V)
              </text>

              {/* Current Arrow */}
              <path d="M 230 48 L 260 48 M 255 45 L 260 48 L 255 51" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <text x="245" y="62" fill="#38bdf8" fontSize="10" textAnchor="middle">
                IL = {il.toFixed(2)}A
              </text>
            </svg>
          </div>

          {/* Live Power vs RL Curve */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400">
                منحنی توان بار بر حسب مقاومت بار (PL vs RL)
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                توان فعلی بار: {formatPersianNumber(pl, 2)} W
              </span>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto bg-slate-950 rounded-xl p-2">
              {/* Axes */}
              <line x1={padding} y1={svgHeight - padding} x2={svgWidth - 15} y2={svgHeight - padding} stroke="#64748b" strokeWidth="1.5" />
              <line x1={padding} y1={svgHeight - padding} x2={padding} y2={15} stroke="#64748b" strokeWidth="1.5" />
              <text x={svgWidth - 20} y={svgHeight - padding + 15} fill="#94a3b8" fontSize="9" textAnchor="end">RL (Ω)</text>
              <text x={padding - 5} y={15} fill="#94a3b8" fontSize="9" textAnchor="end">PL (W)</text>

              {/* Grid lines */}
              <line x1={padding} y1={getY(pmax)} x2={svgWidth - 15} y2={getY(pmax)} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <line x1={getX(rth)} y1={svgHeight - padding} x2={getX(rth)} y2={getY(pmax)} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

              {/* Curve */}
              <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

              {/* Max point */}
              <circle cx={getX(rth)} cy={getY(pmax)} r="4" fill="#10b981" />
              <text x={getX(rth)} y={getY(pmax) - 8} fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">
                Pmax = {pmax.toFixed(1)}W
              </text>
              <text x={getX(rth)} y={svgHeight - padding + 12} fill="#10b981" fontSize="9" textAnchor="middle">
                RL = Rth
              </text>

              {/* Current operating point */}
              <circle cx={getX(rl)} cy={getY(pl)} r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
              <text x={getX(rl)} y={getY(pl) - 10} fill="#a855f7" fontSize="9" textAnchor="middle" fontWeight="bold">
                نقطه کار ({pl.toFixed(1)}W)
              </text>
            </svg>

            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed flex items-center gap-2">
              <Info size={16} className="text-amber-500 shrink-0" />
              <span>
                طبق قضیه انتقال حداکثر توان دکتر جبه‌دار، بیشترین توان زمانی تحویل می‌شود که مقاومت بار با مقاومت درونی تونن مدار برابر باشد: <strong className="text-amber-600 dark:text-amber-400">RL = Rth = {formatPersianNumber(rth, 1)} Ω</strong>. در این حالت بازدهی انتقال توان ۵۰٪ است.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
