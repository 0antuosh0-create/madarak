import React, { useState } from 'react';
import { Radio, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';

type OpAmpMode = 'inverting' | 'non-inverting' | 'buffer' | 'summing' | 'differential';

export const OpAmpSimulator: React.FC = () => {
  const [mode, setMode] = useState<OpAmpMode>('inverting');

  // Parameters
  const [r1, setR1] = useState<number>(10); // kΩ
  const [rf, setRf] = useState<number>(50); // kΩ
  const [r2, setR2] = useState<number>(20); // kΩ (for summing)
  const [vin1, setVin1] = useState<number>(1.2); // V
  const [vin2, setVin2] = useState<number>(2.5); // V
  const [vcc, setVcc] = useState<number>(15);   // +Vcc rail
  const [vee, setVee] = useState<number>(-15);  // -Vee rail

  // Calculations based on mode:
  let theoreticalVout = 0;
  let gainAv = 0;
  let circuitFormula = '';

  if (mode === 'inverting') {
    gainAv = -rf / r1;
    theoreticalVout = gainAv * vin1;
    circuitFormula = 'Vout = -(Rf / R1) · Vin';
  } else if (mode === 'non-inverting') {
    gainAv = 1 + rf / r1;
    theoreticalVout = gainAv * vin1;
    circuitFormula = 'Vout = (1 + Rf / R1) · Vin';
  } else if (mode === 'buffer') {
    gainAv = 1;
    theoreticalVout = vin1;
    circuitFormula = 'Vout = Vin';
  } else if (mode === 'summing') {
    theoreticalVout = -rf * (vin1 / r1 + vin2 / r2);
    circuitFormula = 'Vout = -Rf · (V1/R1 + V2/R2)';
  } else if (mode === 'differential') {
    gainAv = rf / r1;
    theoreticalVout = gainAv * (vin2 - vin1);
    circuitFormula = 'Vout = (Rf / R1) · (V2 - V1)';
  }

  // Check saturation:
  const isPosSaturated = theoreticalVout > vcc;
  const isNegSaturated = theoreticalVout < vee;
  const isSaturated = isPosSaturated || isNegSaturated;
  const actualVout = isPosSaturated ? vcc : isNegSaturated ? vee : theoreticalVout;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Radio size={18} className="text-amber-500" />
            <span>شبیه‌ساز جامع مدارهای تقویت‌کننده عملیاتی (OP-AMP)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            بررسی مشخصه انتقال، بهره ولتاژ، شرایط اتصال کوتاه مجازی و پدیده اشباع در توپولوژی‌های مختلف آپ‌امپ (فصل ۳* جبه‌دار)
          </p>
        </div>

        <button
          onClick={() => {
            setR1(10);
            setRf(50);
            setR2(20);
            setVin1(1.2);
            setVin2(2.5);
            setVcc(15);
            setVee(-15);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw size={13} />
          <span>مقادیر پیش‌فرض</span>
        </button>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'inverting', label: 'تقویت‌کننده وارون‌گر' },
          { id: 'non-inverting', label: 'ناوارون‌گر' },
          { id: 'buffer', label: 'پیرو ولتاژ (بافر)' },
          { id: 'summing', label: 'جمع‌کننده' },
          { id: 'differential', label: 'تفاضلی' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as OpAmpMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === item.id
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              تنظیم مقاومت‌ها و ولتاژهای ورودی
            </h4>

            {/* Inputs based on mode */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {mode === 'differential' ? 'ولتاژ ورودی اول (V1 به منفی):' : 'ولتاژ ورودی (Vin):'}
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(vin1)} V</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={vin1}
                onChange={(e) => setVin1(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {(mode === 'summing' || mode === 'differential') && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {mode === 'differential' ? 'ولتاژ ورودی دوم (V2 به مثبت):' : 'ولتاژ ورودی دوم (V2):'}
                  </span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(vin2)} V</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={vin2}
                  onChange={(e) => setVin2(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {mode !== 'buffer' && (
              <>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت ورودی R1:</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(r1)} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={r1}
                    onChange={(e) => setR1(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت فیدبک Rf:</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(rf)} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    step="1"
                    value={rf}
                    onChange={(e) => setRf(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </>
            )}

            {mode === 'summing' && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">مقاومت ورودی R2:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{toPersianDigits(r2)} kΩ</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {/* Power Rails Vcc and Vee */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">تغذیه مثبت (+Vcc):</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="3"
                    max="30"
                    value={vcc}
                    onChange={(e) => setVcc(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-center"
                  />
                  <span className="text-xs text-slate-400">V</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">تغذیه منفی (-Vee):</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="-30"
                    max="-3"
                    value={vee}
                    onChange={(e) => setVee(Math.min(-1, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-center"
                  />
                  <span className="text-xs text-slate-400">V</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output & Schematics Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">بهره ولتاژ تئوری (Av)</span>
              <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                {formatPersianNumber(gainAv, 2)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <span className="text-[11px] text-slate-500">خروجی تئوری (Vout_ideal)</span>
              <div className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
                {formatPersianNumber(theoreticalVout, 2)} V
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center shadow-xs col-span-2 sm:col-span-1 ${
              isSaturated
                ? 'bg-rose-500/10 border-rose-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            }`}>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">ولتاژ خروجی واقعی</span>
              <div className={`text-xl font-bold font-mono mt-1 ${isSaturated ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {formatPersianNumber(actualVout, 2)} V
              </div>
            </div>
          </div>

          {/* Saturation Status Alert */}
          {isSaturated ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-800 dark:text-rose-200 text-xs">
              <AlertTriangle size={20} className="text-rose-500 shrink-0" />
              <div>
                <strong className="block font-bold">هشدار اشباع آپ‌امپ (Saturation Alert):</strong>
                ولتاژ خروجی تئوری ({formatPersianNumber(theoreticalVout, 2)} V) از حدود منبع تغذیه ({toPersianDigits(vee)}V تا +{toPersianDigits(vcc)}V) فراتر رفته است. خروجی در مقدار {formatPersianNumber(actualVout, 2)} ولت بریده شده و مدار دیگر رفتار خطی ندارد.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 text-xs">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span>
                <strong>ناحیه کار خطی:</strong> آپ‌امپ در محدوده مجاز خطی فعالیت می‌کند و اتصال کوتاه مجازی v+ ≈ v- به طور کامل برقرار است.
              </span>
            </div>
          )}

          {/* SVG Schematic for Op-Amp Topology */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">شماتیک مدار و توزیع پتانسیل‌ها:</span>
              <code dir="ltr" className="font-mono text-amber-600 dark:text-amber-400 text-[11px]">
                {circuitFormula}
              </code>
            </div>

            <svg viewBox="0 0 500 160" className="w-full h-auto bg-slate-950 rounded-xl p-2">
              {/* Op-amp symbol */}
              <polygon points="200,30 300,80 200,130" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="215" y="60" fill="#f8fafc" fontSize="13" fontWeight="bold">-</text>
              <text x="215" y="110" fill="#f8fafc" fontSize="13" fontWeight="bold">+</text>

              {/* Power rails */}
              <line x1="250" y1="55" x2="250" y2="20" stroke="#ef4444" strokeWidth="1.5" />
              <text x="250" y="15" fill="#ef4444" fontSize="9" textAnchor="middle">+{vcc}V</text>
              <line x1="250" y1="105" x2="250" y2="140" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="250" y="152" fill="#3b82f6" fontSize="9" textAnchor="middle">{vee}V</text>

              {/* Output wire */}
              <line x1="300" y1="80" x2="410" y2="80" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="410" cy="80" r="4" fill="#10b981" />
              <text x="425" y="84" fill="#10b981" fontSize="11" fontWeight="bold">
                Vo = {actualVout.toFixed(2)}V
              </text>

              {/* Input wires according to mode */}
              {mode === 'inverting' && (
                <>
                  <line x1="60" y1="55" x2="110" y2="55" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="60" cy="55" r="4" fill="#38bdf8" />
                  <text x="50" y="45" fill="#38bdf8" fontSize="10">Vin={vin1}V</text>

                  {/* R1 */}
                  <rect x="110" y="48" width="40" height="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="130" y="42" fill="#f59e0b" fontSize="9" textAnchor="middle">R1={r1}k</text>
                  <line x1="150" y1="55" x2="200" y2="55" stroke="#94a3b8" strokeWidth="2" />

                  {/* Feedback Rf */}
                  <line x1="180" y1="55" x2="180" y2="20" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="180" y1="20" x2="210" y2="20" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="210" y="13" width="45" height="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="232" y="10" fill="#f59e0b" fontSize="9" textAnchor="middle">Rf={rf}k</text>
                  <line x1="255" y1="20" x2="350" y2="20" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="350" y1="20" x2="350" y2="80" stroke="#94a3b8" strokeWidth="2" />

                  {/* Non-inverting to GND */}
                  <line x1="200" y1="105" x2="170" y2="105" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="170" y1="105" x2="170" y2="125" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="160" y1="125" x2="180" y2="125" stroke="#94a3b8" strokeWidth="2" />
                  <text x="170" y="140" fill="#64748b" fontSize="8" textAnchor="middle">GND</text>
                </>
              )}

              {mode === 'non-inverting' && (
                <>
                  {/* Non-inverting Vin */}
                  <line x1="80" y1="105" x2="200" y2="105" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="80" cy="105" r="4" fill="#38bdf8" />
                  <text x="70" y="95" fill="#38bdf8" fontSize="10">Vin={vin1}V</text>

                  {/* Inverting feedback divider */}
                  <line x1="180" y1="55" x2="200" y2="55" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="180" y1="55" x2="180" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="210" y="18" width="45" height="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="180" y1="25" x2="210" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="255" y1="25" x2="350" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="350" y1="25" x2="350" y2="80" stroke="#94a3b8" strokeWidth="2" />
                  <text x="232" y="14" fill="#f59e0b" fontSize="9" textAnchor="middle">Rf={rf}k</text>

                  {/* R1 to ground */}
                  <line x1="180" y1="55" x2="140" y2="55" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="100" y="48" width="40" height="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="120" y="42" fill="#f59e0b" fontSize="9" textAnchor="middle">R1={r1}k</text>
                  <line x1="100" y1="55" x2="70" y2="55" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="70" y1="55" x2="70" y2="70" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="62" y1="70" x2="78" y2="70" stroke="#94a3b8" strokeWidth="2" />
                  <text x="70" y="85" fill="#64748b" fontSize="8" textAnchor="middle">GND</text>
                </>
              )}

              {mode === 'buffer' && (
                <>
                  {/* Non-inverting Vin */}
                  <line x1="80" y1="105" x2="200" y2="105" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="80" cy="105" r="4" fill="#38bdf8" />
                  <text x="70" y="95" fill="#38bdf8" fontSize="10">Vin={vin1}V</text>

                  {/* Direct feedback wire to inverting */}
                  <line x1="180" y1="55" x2="200" y2="55" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="180" y1="55" x2="180" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="180" y1="25" x2="350" y2="25" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="350" y1="25" x2="350" y2="80" stroke="#94a3b8" strokeWidth="2" />
                  <text x="260" y="20" fill="#10b981" fontSize="9" textAnchor="middle">فیدبک مستقیم (Rf = 0)</text>
                </>
              )}

              {(mode === 'summing' || mode === 'differential') && (
                <>
                  <text x="100" y="30" fill="#38bdf8" fontSize="10">V1 = {vin1}V</text>
                  <text x="100" y="130" fill="#38bdf8" fontSize="10">V2 = {vin2}V</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
