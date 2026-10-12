import React, { useState } from 'react';
import {
  Zap,
  Activity,
  Layers,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';

interface CircuitDiagramProps {
  type?: string;
  className?: string;
}

export const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ type, className = '' }) => {
  // State for KCL/KVL
  const [kclMode, setKclMode] = useState<'kcl' | 'kvl'>('kcl');
  const [i1, setI1] = useState<number>(6); // Amps
  const [splitRatio, setSplitRatio] = useState<number>(0.6); // 60% / 40%
  const [vsKvl, setVsKvl] = useState<number>(24); // Volts
  const [r1Kvl, setR1Kvl] = useState<number>(4); // Ohms
  const [r2Kvl, setR2Kvl] = useState<number>(8); // Ohms

  // State for Lumped
  const [freqIdx, setFreqIdx] = useState<number>(2); // Frequency preset
  const freqPresets = [
    { label: '۵۰ هرتز (برق شهری)', f: 50, unit: 'Hz' },
    { label: '۱ مگاهرتز (رادیو AM)', f: 1e6, unit: 'MHz' },
    { label: '۱۰۰ مگاهرتز (رادیو FM)', f: 1e8, unit: 'MHz' },
    { label: '۲.۴ گیگاهرتز (وای‌فای)', f: 2.4e9, unit: 'GHz' },
  ];

  // State for Elements
  const [elementTab, setElementTab] = useState<'r' | 'c' | 'l' | 'sources'>('r');
  const [elemR, setElemR] = useState<number>(5);
  const [elemI, setElemI] = useState<number>(2);
  const [elemC, setElemC] = useState<number>(100); // uF
  const [elemV, setElemV] = useState<number>(12); // V
  const [elemL, setElemL] = useState<number>(50); // mH

  // State for Coupled Inductors
  const [dotMode, setDotMode] = useState<'same' | 'opposite'>('same');
  // State for Op-Amp
  const [vinOpamp, setVinOpamp] = useState<number>(1.5);
  const [rfOpamp, setRfOpamp] = useState<number>(30); // k
  const [r1Opamp, setR1Opamp] = useState<number>(10); // k

  // State for RC Transient
  const rcRes = 1000;
  const rcCap = 100;

  if (!type) return null;

  // KCL calculations
  const i2 = i1 * splitRatio;
  const i3 = i1 * (1 - splitRatio);

  // KVL calculations
  const totalR = r1Kvl + r2Kvl;
  const loopCurrent = vsKvl / totalR;
  const v1Kvl = loopCurrent * r1Kvl;
  const v2Kvl = loopCurrent * r2Kvl;

  // Lumped calculations
  const activeFreq = freqPresets[freqIdx];
  const cSpeed = 3e8; // m/s
  const wavelength = cSpeed / activeFreq.f;
  const circuitD = 0.1; // 10 cm
  const isLumped = circuitD < 0.01 * wavelength;

  return (
    <div className={`rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 shadow-xl overflow-hidden transition-all ${className}`}>
      {/* Grid Pattern Definition */}
      <svg className="hidden">
        <defs>
          <pattern id="workbench-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.8" fill="rgba(148, 163, 184, 0.25)" />
          </pattern>
        </defs>
      </svg>

      {/* 1. KCL & KVL Interactive Workbench */}
      {type === 'kcl-kvl' && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Zap size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  شبیه‌ساز و آزمایشگاه تعاملی قوانین کیرشف
                </h3>
                <p className="text-[11px] text-slate-400">
                  تنظیم مقادیر و مشاهده زنده جریان‌ها و افت پتانسیل‌ها در مدار
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setKclMode('kcl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  kclMode === 'kcl'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                قانون جریان (KCL در گره)
              </button>
              <button
                onClick={() => setKclMode('kvl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  kclMode === 'kvl'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                قانون ولتاژ (KVL در حلقه)
              </button>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          {kclMode === 'kcl' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">جریان ورودی به گره (i₁):</span>
                  <span className="font-bold text-amber-400">{formatPersianNumber(i1, 1)} آمپر</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={i1}
                  onChange={(e) => setI1(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">نسبت تقسیم شاخه‌ها:</span>
                  <span className="font-bold text-sky-400">
                    شاخه بالا: {toPersianDigits(Math.round(splitRatio * 100))}٪ | شاخه پایین: {toPersianDigits(Math.round((1 - splitRatio) * 100))}٪
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={splitRatio}
                  onChange={(e) => setSplitRatio(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">منبع ولتاژ (Vs):</span>
                  <span className="font-bold text-sky-400">{formatPersianNumber(vsKvl, 0)} ولت</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="48"
                  step="2"
                  value={vsKvl}
                  onChange={(e) => setVsKvl(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">مقاومت اول (R1):</span>
                  <span className="font-bold text-amber-400">{formatPersianNumber(r1Kvl, 0)} اهم</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={r1Kvl}
                  onChange={(e) => setR1Kvl(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">مقاومت دوم (R2):</span>
                  <span className="font-bold text-amber-400">{formatPersianNumber(r2Kvl, 0)} اهم</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={r2Kvl}
                  onChange={(e) => setR2Kvl(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* SVG Animated Circuit Canvas */}
          <div className="relative rounded-xl border border-slate-800 bg-[#070b14] p-3 overflow-hidden">
            <svg viewBox="0 0 700 240" className="w-full h-auto">
              {/* Millimeter Grid */}
              <rect width="700" height="240" fill="url(#workbench-grid)" />

              {kclMode === 'kcl' ? (
                /* KCL Visualization */
                <g transform="translate(50, 10)">
                  {/* Central Node with Glowing Aura */}
                  <circle cx="300" cy="110" r="24" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" />
                  <circle cx="300" cy="110" r="8" fill="#f59e0b" className="animate-pulse" />
                  <text x="300" y="145" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
                    گره اصلی A
                  </text>

                  {/* Wire 1: Input from left */}
                  <line x1="80" y1="110" x2="300" y2="110" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  {/* Animated Current dashes */}
                  <line
                    x1="80"
                    y1="110"
                    x2="300"
                    y2="110"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeDasharray="6 12"
                    strokeLinecap="round"
                  >
                    <animate attributeName="stroke-dashoffset" from="36" to="0" dur="0.8s" repeatCount="indefinite" />
                  </line>

                  {/* Current 1 Label Box */}
                  <rect x="110" y="70" width="120" height="30" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="170" y="90" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    i₁ = {formatPersianNumber(i1, 1)} A (ورودی)
                  </text>

                  {/* Wire 2: Output Top-Right */}
                  <line x1="300" y1="110" x2="520" y2="40" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
                  <line
                    x1="300"
                    y1="110"
                    x2="520"
                    y2="40"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="6 12"
                    strokeLinecap="round"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="0.9s" repeatCount="indefinite" />
                  </line>

                  {/* Current 2 Label Box */}
                  <rect x="420" y="15" width="130" height="30" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="485" y="35" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                    i₂ = {formatPersianNumber(i2, 2)} A (خروجی)
                  </text>

                  {/* Wire 3: Output Bottom-Right */}
                  <line x1="300" y1="110" x2="520" y2="180" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                  <line
                    x1="300"
                    y1="110"
                    x2="520"
                    y2="180"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="6 12"
                    strokeLinecap="round"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="0.9s" repeatCount="indefinite" />
                  </line>

                  {/* Current 3 Label Box */}
                  <rect x="420" y="165" width="130" height="30" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="485" y="185" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                    i₃ = {formatPersianNumber(i3, 2)} A (خروجی)
                  </text>
                </g>
              ) : (
                /* KVL Visualization */
                <g transform="translate(60, 20)">
                  {/* Closed Loop Rectangular Wire */}
                  <rect x="60" y="30" width="460" height="150" rx="12" fill="none" stroke="#475569" strokeWidth="3" />
                  {/* Animated Current Path */}
                  <rect
                    x="60"
                    y="30"
                    width="460"
                    height="150"
                    rx="12"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="8 14"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-44" dur="1.2s" repeatCount="indefinite" />
                  </rect>

                  {/* Voltage Source Vs (Left side) */}
                  <circle cx="60" cy="105" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="60" y="102" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Vs</text>
                  <text x="60" y="117" fill="#38bdf8" fontSize="10" textAnchor="middle">{vsKvl}V</text>
                  <text x="60" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                  <text x="60" y="138" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">-</text>

                  {/* Resistor R1 (Top side) - IEEE Zigzag path */}
                  <g transform="translate(240, 30)">
                    <rect x="-60" y="-18" width="120" height="36" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    <text x="0" y="-2" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                      R₁ = {r1Kvl}Ω
                    </text>
                    <text x="0" y="13" fill="#fbbf24" fontSize="10" textAnchor="middle">
                      افت ولتاژ: v₁ = {formatPersianNumber(v1Kvl, 2)}V
                    </text>
                    <text x="-48" y="5" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
                    <text x="44" y="5" fill="#3b82f6" fontSize="12" fontWeight="bold">-</text>
                  </g>

                  {/* Resistor R2 (Right side) */}
                  <g transform="translate(520, 105)">
                    <rect x="-20" y="-50" width="40" height="100" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    <text x="0" y="-10" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                      R₂={r2Kvl}Ω
                    </text>
                    <text x="0" y="15" fill="#fbbf24" fontSize="10" textAnchor="middle">
                      v₂={formatPersianNumber(v2Kvl, 2)}V
                    </text>
                    <text x="0" y="-35" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                    <text x="0" y="42" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">-</text>
                  </g>

                  {/* Center KVL Direction Loop & Current Meter */}
                  <circle cx="280" cy="120" r="28" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="5 3" />
                  <path d="M 298 96 L 308 96 L 308 106" stroke="#10b981" strokeWidth="2" fill="none" />
                  <text x="280" y="118" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ↻ KVL
                  </text>
                  <text x="280" y="133" fill="#34d399" fontSize="10" textAnchor="middle">
                    i = {formatPersianNumber(loopCurrent, 2)} A
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Live Verified Formula Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                {kclMode === 'kcl'
                  ? 'برقراری قطعی قانون جریان کیرشف (KCL):'
                  : 'برقراری قطعی قانون ولتاژ کیرشف (KVL):'}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              {kclMode === 'kcl' ? (
                <span>
                  i₁ = i₂ + i₃ ⟸ {formatPersianNumber(i1, 1)}A = {formatPersianNumber(i2, 2)}A + {formatPersianNumber(i3, 2)}A
                </span>
              ) : (
                <span>
                  Vs - v₁ - v₂ = 0 ⟸ {formatPersianNumber(vsKvl, 1)}V - {formatPersianNumber(v1Kvl, 2)}V - {formatPersianNumber(v2Kvl, 2)}V = ۰.۰۰V
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Lumped Circuit Assumption & Wave Propagation */}
      {type === 'lumped' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <Activity size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  شبیه‌ساز شرط مدارهای فشرده (d ≪ λ) در برابر خطوط انتقال
                </h3>
                <p className="text-[11px] text-slate-400">
                  مقایسه ابعاد فیزیکی مدار با طول موج الکترومغناطیسی بر اساس فرکانس کاری
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto">
              {freqPresets.map((pr, idx) => (
                <button
                  key={idx}
                  onClick={() => setFreqIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    freqIdx === idx
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {pr.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Wave vs Circuit */}
          <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
            <svg viewBox="0 0 700 210" className="w-full h-auto">
              <rect width="700" height="210" fill="url(#workbench-grid)" />

              {/* Electromagnetic Sine Wave */}
              <path
                d="M 30 100 Q 110 20 190 100 T 350 100 T 510 100 T 670 100"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="8 4"
              />
              <path
                d="M 30 100 Q 110 20 190 100 T 350 100 T 510 100 T 670 100"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="1.5s" repeatCount="indefinite" />
              </path>

              {/* Wavelength Arrow */}
              <line x1="30" y1="35" x2="350" y2="35" stroke="#38bdf8" strokeWidth="1.5" />
              <polygon points="30,35 40,31 40,39" fill="#38bdf8" />
              <polygon points="350,35 340,31 340,39" fill="#38bdf8" />
              <text x="190" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                طول موج سیگنال: λ = {wavelength >= 1000 ? `${(wavelength / 1000).toFixed(0)} کیلومتر` : wavelength >= 1 ? `${wavelength.toFixed(1)} متر` : `${(wavelength * 100).toFixed(1)} سانتی‌متر`}
              </text>

              {/* Physical Circuit Box */}
              <rect x="290" y="70" width="120" height="65" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="350" y="100" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
                مدار فیزیکی
              </text>
              <text x="350" y="120" fill="#fbbf24" fontSize="11" textAnchor="middle">
                ابعاد d = ۱۰ سانتی‌متر
              </text>
            </svg>
          </div>

          {/* Condition Verdict Banner */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
            isLumped
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>
                {isLumped
                  ? `شرط مدار فشرده کاملاً برقرار است (d ≪ λ). سرعت انتشار آنی فرض شده و قوانین KCL و KVL معتبر هستند.`
                  : `فرکانس بالا: ابعاد مدار با طول موج قابل قیاس است (d ≈ λ). سیستم دیگر فشرده نیست و نیازمند معادلات خطوط انتقال است!`}
              </span>
            </div>
            <span className="font-bold shrink-0">
              {isLumped ? 'مدل مداری فشرده تأیید شد' : 'مدل موجی و خط انتقال توزیع‌شده'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Fundamental Circuit Elements Workbench */}
      {type === 'elements' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  آزمایشگاه المان‌های اساسی مدار (R, L, C و منابع)
                </h3>
                <p className="text-[11px] text-slate-400">
                  بررسی فیزیک حاکم بر عناصر ذخیره‌کننده انرژی و تلفاتی
                </p>
              </div>
            </div>

            {/* Element Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              {([
                { id: 'r', label: 'مقاومت (R)' },
                { id: 'c', label: 'خازن (C)' },
                { id: 'l', label: 'سلف (L)' },
                { id: 'sources', label: 'منابع وابسته' },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setElementTab(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    elementTab === t.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive controls and visualizer based on active element */}
          {elementTab === 'r' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">مقاومت (R):</span>
                    <span className="font-bold text-amber-400">{formatPersianNumber(elemR, 0)} اهم</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={elemR}
                    onChange={(e) => setElemR(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">جریان (i):</span>
                    <span className="font-bold text-sky-400">{formatPersianNumber(elemI, 1)} آمپر</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={elemI}
                    onChange={(e) => setElemI(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* SVG Resistor */}
              <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
                <svg viewBox="0 0 600 160" className="w-full h-auto">
                  <rect width="600" height="160" fill="url(#workbench-grid)" />
                  {/* Wires */}
                  <line x1="80" y1="80" x2="220" y2="80" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="380" y1="80" x2="520" y2="80" stroke="#94a3b8" strokeWidth="3" />

                  {/* Resistor IEEE Zigzag */}
                  <path
                    d="M 220 80 L 235 60 L 260 100 L 285 60 L 310 100 L 335 60 L 360 100 L 380 80"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                  />

                  {/* Labels */}
                  <text x="300" y="45" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
                    v(t) = R · i(t) = {(elemR * elemI).toFixed(1)}V
                  </text>
                  <text x="300" y="130" fill="#ef4444" fontSize="12" textAnchor="middle">
                    توان تلفاتی گرما: p = R · i² = {(elemR * Math.pow(elemI, 2)).toFixed(1)}W
                  </text>
                </svg>
              </div>
            </div>
          )}

          {elementTab === 'c' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">ظرفیت خازن (C):</span>
                    <span className="font-bold text-sky-400">{toPersianDigits(elemC)} میکروفاراد</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={elemC}
                    onChange={(e) => setElemC(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">ولتاژ دو سر خازن (v):</span>
                    <span className="font-bold text-amber-400">{toPersianDigits(elemV)} ولت</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={elemV}
                    onChange={(e) => setElemV(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* SVG Capacitor with Electric Field Lines */}
              <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
                <svg viewBox="0 0 600 160" className="w-full h-auto">
                  <rect width="600" height="160" fill="url(#workbench-grid)" />
                  <line x1="80" y1="80" x2="270" y2="80" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="330" y1="80" x2="520" y2="80" stroke="#94a3b8" strokeWidth="3" />

                  {/* Left Plate (+) */}
                  <rect x="270" y="30" width="8" height="100" rx="2" fill="#ef4444" />
                  <text x="260" y="45" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
                  <text x="260" y="85" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
                  <text x="260" y="125" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>

                  {/* Right Plate (-) */}
                  <rect x="322" y="30" width="8" height="100" rx="2" fill="#3b82f6" />
                  <text x="340" y="45" fill="#3b82f6" fontSize="12" fontWeight="bold">-</text>
                  <text x="340" y="85" fill="#3b82f6" fontSize="12" fontWeight="bold">-</text>
                  <text x="340" y="125" fill="#3b82f6" fontSize="12" fontWeight="bold">-</text>

                  {/* Electric field lines E */}
                  <line x1="282" y1="50" x2="318" y2="50" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="282" y1="80" x2="318" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="282" y1="110" x2="318" y2="110" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <text x="300" y="40" fill="#38bdf8" fontSize="10" textAnchor="middle">میدان E</text>

                  <text x="300" y="145" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
                    انرژی ذخیره‌شده: w = ۰.۵ C v² = {(0.5 * elemC * 1e-6 * Math.pow(elemV, 2) * 1000).toFixed(2)} میلی‌ژول
                  </text>
                </svg>
              </div>
            </div>
          )}

          {elementTab === 'l' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">اندوکتانس سلف (L):</span>
                    <span className="font-bold text-amber-400">{toPersianDigits(elemL)} میلی‌هانری</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={elemL}
                    onChange={(e) => setElemL(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">جریان عبوری (i):</span>
                    <span className="font-bold text-sky-400">{toPersianDigits(elemI)} آمپر</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={elemI}
                    onChange={(e) => setElemI(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* SVG Inductor with Magnetic Loops */}
              <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
                <svg viewBox="0 0 600 160" className="w-full h-auto">
                  <rect width="600" height="160" fill="url(#workbench-grid)" />
                  <line x1="80" y1="80" x2="220" y2="80" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="380" y1="80" x2="520" y2="80" stroke="#94a3b8" strokeWidth="3" />

                  {/* Inductor Coils */}
                  <path
                    d="M 220 80 A 20 20 0 0 1 260 80 A 20 20 0 0 1 300 80 A 20 20 0 0 1 340 80 A 20 20 0 0 1 380 80"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                  />

                  {/* Magnetic flux lines loops */}
                  <ellipse cx="300" cy="80" rx="100" ry="40" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="300" y="32" fill="#38bdf8" fontSize="11" textAnchor="middle">
                    شار مغناطیسی: φ = L · i = {(elemL * 1e-3 * elemI * 1000).toFixed(1)} میلی‌وبر
                  </text>
                  <text x="300" y="145" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
                    انرژی ذخیره‌شده در میدان: w = ۰.۵ L i² = {(0.5 * elemL * 1e-3 * Math.pow(elemI, 2) * 1000).toFixed(2)} میلی‌ژول
                  </text>
                </svg>
              </div>
            </div>
          )}

          {elementTab === 'sources' && (
            <div className="p-4 rounded-xl border border-slate-800 bg-[#070b14] space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="font-bold text-amber-400 block mb-1">VCVS</span>
                  <span className="text-[10px] text-slate-400">ولتاژ با کنترل ولتاژ</span>
                  <div className="font-mono text-sky-400 mt-1">v = μ · vx</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="font-bold text-amber-400 block mb-1">VCCS</span>
                  <span className="text-[10px] text-slate-400">جریان با کنترل ولتاژ</span>
                  <div className="font-mono text-sky-400 mt-1">i = gm · vx</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="font-bold text-amber-400 block mb-1">CCVS</span>
                  <span className="text-[10px] text-slate-400">ولتاژ با کنترل جریان</span>
                  <div className="font-mono text-sky-400 mt-1">v = rm · ix</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="font-bold text-amber-400 block mb-1">CCCS</span>
                  <span className="text-[10px] text-slate-400">جریان با کنترل جریان</span>
                  <div className="font-mono text-sky-400 mt-1">i = β · ix</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Coupled Inductors & Dot Convention */}
      {type === 'coupled' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Activity size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  شبیه‌ساز قرارداد نقطه (Dot Convention) در سلف‌های تزویج‌شده
                </h3>
                <p className="text-[11px] text-slate-400">
                  تغییر جهت ورود جریان به نقطه‌ها و تأثیر مستقیم بر علامت ضریب القای متقابل M
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setDotMode('same')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  dotMode === 'same'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ورود هر دو جریان به نقطه (+M)
              </button>
              <button
                onClick={() => setDotMode('opposite')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  dotMode === 'opposite'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                یکی ورودی، یکی خروجی (-M)
              </button>
            </div>
          </div>

          {/* SVG Coupled Coils */}
          <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
            <svg viewBox="0 0 600 180" className="w-full h-auto">
              <rect width="600" height="180" fill="url(#workbench-grid)" />

              {/* Coil 1 (Left) */}
              <g transform="translate(180, 50)">
                <path d="M 0 0 A 15 15 0 0 1 0 30 A 15 15 0 0 1 0 60 A 15 15 0 0 1 0 90" fill="none" stroke="#f59e0b" strokeWidth="3" />
                {/* Dot 1 */}
                <circle cx="-10" cy="-5" r="4.5" fill="#38bdf8" />
                <text x="-25" y="-2" fill="#38bdf8" fontSize="10">نقطه</text>
                <text x="-40" y="45" fill="#f59e0b" fontSize="12" fontWeight="bold">L₁</text>
              </g>

              {/* Coil 2 (Right) */}
              <g transform="translate(380, 50)">
                <path d="M 0 0 A 15 15 0 0 0 0 30 A 15 15 0 0 0 0 60 A 15 15 0 0 0 0 90" fill="none" stroke="#f59e0b" strokeWidth="3" />
                {/* Dot 2 (top if same, bottom if opposite) */}
                <circle cx="10" cy={dotMode === 'same' ? -5 : 95} r="4.5" fill="#38bdf8" />
                <text x="25" y={dotMode === 'same' ? -2 : 98} fill="#38bdf8" fontSize="10">نقطه</text>
                <text x="35" y="45" fill="#f59e0b" fontSize="12" fontWeight="bold">L₂</text>
              </g>

              {/* Mutual Coupling Arc & Symbol M */}
              <path d="M 190 40 Q 280 -10 370 40" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
              <text x="280" y="25" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                تزویج M {dotMode === 'same' ? '(علامت: +M)' : '(علامت: -M)'}
              </text>
            </svg>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong>قاعده طلایی دکتر جبه‌دار:</strong> هرگاه هر دو جریان به پایانه‌های نقطه‌دار <strong>وارد</strong> شوند، اثر القای متقابل افزایشی (<span className="text-emerald-400 font-bold">+M</span>) است. هرگاه یکی وارد و دیگری خارج شود، علامت ترم تزویج کاهشی (<span className="text-rose-400 font-bold">-M</span>) خواهد بود.
          </div>
        </div>
      )}

      {/* 5. Inverting & Non-Inverting Op-Amp */}
      {type === 'opamp-inv' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Radio size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  شبیه‌ساز تقویت‌کننده وارون‌گر آپ‌امپ (Inverting Amplifier)
                </h3>
                <p className="text-[11px] text-slate-400">
                  اتصال کوتاه مجازی در گره وارون‌گر و وارونگی فاز ۱۸۰ درجه سیگنال
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">بهره ولتاژ:</span>
              <span className="font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded">
                Av = -{(rfOpamp / r1Opamp).toFixed(1)}
              </span>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">ولتاژ ورودی (Vin):</span>
                <span className="font-bold text-sky-400">{vinOpamp}V</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={vinOpamp}
                onChange={(e) => setVinOpamp(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">مقاومت ورودی R1:</span>
                <span className="font-bold text-amber-400">{r1Opamp}kΩ</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={r1Opamp}
                onChange={(e) => setR1Opamp(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">مقاومت فیدبک Rf:</span>
                <span className="font-bold text-amber-400">{rfOpamp}kΩ</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={rfOpamp}
                onChange={(e) => setRfOpamp(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* SVG Op-Amp Schematic */}
          <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
            <svg viewBox="0 0 650 200" className="w-full h-auto">
              <rect width="650" height="200" fill="url(#workbench-grid)" />

              {/* Op-Amp Triangle */}
              <polygon points="260,40 380,100 260,160" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="275" y="75" fill="#f8fafc" fontSize="16" fontWeight="bold">-</text>
              <text x="275" y="135" fill="#f8fafc" fontSize="16" fontWeight="bold">+</text>

              {/* Inverting input line & R1 */}
              <line x1="80" y1="70" x2="150" y2="70" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="150" y="61" width="55" height="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="177" y="52" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">R₁={r1Opamp}k</text>
              <line x1="205" y1="70" x2="260" y2="70" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Virtual Ground Node Badge */}
              <circle cx="235" cy="70" r="5" fill="#ef4444" />
              <text x="235" y="95" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">
                v⁻ ≈ ۰.۰۰V (زمین مجازی)
              </text>

              {/* Non-inverting input to ground */}
              <line x1="260" y1="130" x2="200" y2="130" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="200" y1="130" x2="200" y2="155" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="188" y1="155" x2="212" y2="155" stroke="#94a3b8" strokeWidth="2" />
              <line x1="192" y1="160" x2="208" y2="160" stroke="#94a3b8" strokeWidth="2" />

              {/* Feedback Loop Rf */}
              <line x1="235" y1="70" x2="235" y2="20" stroke="#94a3b8" strokeWidth="2" />
              <line x1="235" y1="20" x2="280" y2="20" stroke="#94a3b8" strokeWidth="2" />
              <rect x="280" y="11" width="55" height="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="307" y="6" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Rf={rfOpamp}k</text>
              <line x1="335" y1="20" x2="430" y2="20" stroke="#94a3b8" strokeWidth="2" />
              <line x1="430" y1="20" x2="430" y2="100" stroke="#94a3b8" strokeWidth="2" />

              {/* Output Wire & Value */}
              <line x1="380" y1="100" x2="520" y2="100" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="520" cy="100" r="5" fill="#10b981" />
              <rect x="530" y="80" width="100" height="40" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              <text x="580" y="98" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
                Vout = {(-vinOpamp * (rfOpamp / r1Opamp)).toFixed(2)}V
              </text>
              <text x="580" y="114" fill="#94a3b8" fontSize="9" textAnchor="middle">
                ۱۸۰° معکوس
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* 6. RC & RL First-Order Transient Response */}
      {type === 'rc-circuit' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <Activity size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  شبیه‌ساز پاسخ زمانی مدار مرتبه اول RC
                </h3>
                <p className="text-[11px] text-slate-400">
                  مشاهده شارژ خازن و تعیین زمان نشست مدار در t = 5τ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">ثابت زمانی (τ = R·C):</span>
              <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                {(rcRes * rcCap * 1e-3).toFixed(1)} میلی‌ثانیه
              </span>
            </div>
          </div>

          {/* SVG RC Circuit */}
          <div className="rounded-xl border border-slate-800 bg-[#070b14] p-3">
            <svg viewBox="0 0 650 180" className="w-full h-auto">
              <rect width="650" height="180" fill="url(#workbench-grid)" />

              {/* Loop wires */}
              <line x1="80" y1="130" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="80" y1="40" x2="160" y2="40" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Source Vs */}
              <circle cx="80" cy="85" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="80" y="89" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Vs</text>

              {/* Switch t=0 */}
              <circle cx="160" cy="40" r="3.5" fill="#10b981" />
              <line x1="160" y1="40" x2="200" y2="25" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="205" cy="40" r="3.5" fill="#10b981" />
              <text x="180" y="15" fill="#10b981" fontSize="10" textAnchor="middle">کلید t = 0</text>

              {/* Resistor R */}
              <line x1="205" y1="40" x2="260" y2="40" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="260" y="32" width="55" height="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="287" y="24" fill="#f59e0b" fontSize="10" textAnchor="middle">R = ۱kΩ</text>
              <line x1="315" y1="40" x2="380" y2="40" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Capacitor C */}
              <line x1="380" y1="40" x2="380" y2="68" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="365" y1="68" x2="395" y2="68" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="365" y1="78" x2="395" y2="78" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="380" y1="78" x2="380" y2="130" stroke="#94a3b8" strokeWidth="2.5" />
              <text x="410" y="76" fill="#38bdf8" fontSize="10">C = ۱۰۰μF</text>

              {/* Bottom Ground Wire */}
              <line x1="80" y1="130" x2="380" y2="130" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Oscilloscope Mini Waveform (Right) */}
              <g transform="translate(460, 25)">
                <rect x="0" y="0" width="160" height="110" rx="8" fill="#070b14" stroke="#475569" strokeWidth="1" />
                <path d="M 10 95 Q 40 25 150 20" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <line x1="10" y1="20" x2="150" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
                <text x="80" y="10" fill="#f59e0b" fontSize="9" textAnchor="middle">پاسخ vC(t)</text>
                <text x="45" y="60" fill="#10b981" fontSize="8">t = τ (۶۳.۲٪)</text>
                <circle cx="40" cy="50" r="3" fill="#10b981" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Fallback for other diagram types: clean technical schematic */}
      {type !== 'kcl-kvl' && type !== 'lumped' && type !== 'elements' && type !== 'coupled' && type !== 'opamp-inv' && type !== 'rc-circuit' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Zap size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              دیاگرام تحلیلی و شماتیک مداری استاندارد IEEE
            </h3>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#070b14] p-4 text-center">
            <svg viewBox="0 0 500 120" className="w-full max-w-md mx-auto h-auto">
              <rect width="500" height="120" fill="url(#workbench-grid)" />
              <line x1="40" y1="60" x2="180" y2="60" stroke="#38bdf8" strokeWidth="2.5" />
              <circle cx="180" cy="60" r="5" fill="#f59e0b" />
              <rect x="200" y="45" width="80" height="30" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="240" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">شبکه مدار</text>
              <line x1="300" y1="60" x2="440" y2="60" stroke="#38bdf8" strokeWidth="2.5" />
              <circle cx="300" cy="60" r="5" fill="#f59e0b" />
            </svg>
            <p className="text-xs text-slate-400 mt-2">
              طراحی شده بر مبنای استانداردهای بین‌المللی ترسیم دیاگرام‌ها و شبکه‌های الکتریکی
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
