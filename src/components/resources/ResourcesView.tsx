import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  BookOpen,
  Terminal,
  Calculator,
  Layers
} from 'lucide-react';
import {
  theoremsList,
  formulasHandbook,
  resistorColorCodes,
  spiceSyntaxGuide
} from '../../data/cheatsheetData';
import { toPersianDigits, formatPersianNumber } from '../../utils/persian';
import { MathFormula } from '../common/MathFormula';

export const ResourcesView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'theorems' | 'calculator' | 'spice' | 'formulas'>('theorems');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Resistor color code state (4-band: band1, band2, multiplier, tolerance)
  const [band1, setBand1] = useState<number>(1); // Brown (1)
  const [band2, setBand2] = useState<number>(0); // Black (0)
  const [multiplierIdx, setMultiplierIdx] = useState<number>(2); // Red (x100) -> 10 * 100 = 1000 = 1k
  const [toleranceIdx, setToleranceIdx] = useState<number>(10); // Gold (+-5%)

  const b1Item = resistorColorCodes.find((c) => c.digit === band1) || resistorColorCodes[1];
  const b2Item = resistorColorCodes.find((c) => c.digit === band2) || resistorColorCodes[0];
  const multItem = resistorColorCodes[multiplierIdx] || resistorColorCodes[2];
  const tolItem = resistorColorCodes[toleranceIdx] || resistorColorCodes[10];

  const nominalResistance = (b1Item.digit! * 10 + b2Item.digit!) * (multItem.multiplier || 1);
  const tolerancePercent = tolItem.tolerance || 5;
  const minResistance = nominalResistance * (1 - tolerancePercent / 100);
  const maxResistance = nominalResistance * (1 + tolerancePercent / 100);

  const formatResistance = (ohms: number) => {
    if (ohms >= 1e6) {
      return `${formatPersianNumber(ohms / 1e6, 2)} مگااهم (MΩ)`;
    }
    if (ohms >= 1e3) {
      return `${formatPersianNumber(ohms / 1e3, 2)} کیلو‌اهم (kΩ)`;
    }
    return `${formatPersianNumber(ohms, 1)} اهم (Ω)`;
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-bold mb-1">
          <FileText size={14} />
          <span>فرمول‌نامه جامع، قضایا و مراجع استاندارد</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          منابع، فرمول‌نامه و مراجع تخصصی مدار ۱
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          کامل‌ترین مخزن قضایای اساسی شبکه، روابط عناصر در حوزه زمان، کد رنگی مقاومت‌ها و راهنمای اسپایس
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {([
          { id: 'theorems', label: 'قضایای اساسی مدار', icon: <BookOpen size={16} /> },
          { id: 'calculator', label: 'کد رنگی مقاومت‌ها', icon: <Calculator size={16} /> },
          { id: 'formulas', label: 'روابط عناصر و فرمول‌ها', icon: <Layers size={16} /> },
          { id: 'spice', label: 'راهنمای گرامر SPICE', icon: <Terminal size={16} /> },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Section 1: Theorems */}
      {activeSection === 'theorems' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {theoremsList.map((th) => (
              <div
                key={th.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {th.titleFa}
                      </h3>
                      <span className="text-xs text-slate-400">{th.titleEn}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(th.id, `${th.titleFa}\n${th.formulaTex}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                      title="کپی متن و فرمول"
                    >
                      {copiedKey === th.id ? (
                        <Check size={16} className="text-emerald-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {th.statementFa}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300 mb-4">
                    <MathFormula formula={th.formulaTex} />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      شرایط اعمال قضیه:
                    </div>
                    <ul className="list-disc list-inside text-slate-500 space-y-1">
                      {th.conditionsFa.map((cond, idx) => (
                        <li key={idx}>{cond}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-500/5 p-3 rounded-xl">
                  <strong>نکته کلیدی و کنکوری قضیه: </strong>
                  {th.examTipsFa[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Resistor Color Code Calculator */}
      {activeSection === 'calculator' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                محاسبه‌گر تعاملی کدهای رنگی مقاومت‌های ۴ نواره (۴-Band Resistor)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                رنگ هر یک از نوارهای مقاومت را انتخاب کنید تا مقدار دقیق مقاومت و بازه تلرانس به صورت زنده محاسبه گردد.
              </p>
            </div>

            {/* Visual Resistor Body (SVG) */}
            <div className="py-6 px-4 bg-slate-950 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 500 120" className="w-full max-w-md h-auto">
                {/* Leads (metal wire) */}
                <line x1="20" y1="60" x2="100" y2="60" stroke="#94a3b8" strokeWidth="4" />
                <line x1="400" y1="60" x2="480" y2="60" stroke="#94a3b8" strokeWidth="4" />

                {/* Resistor Beige Body */}
                <path
                  d="M 100 35 C 100 25, 130 25, 140 35 L 360 35 C 370 25, 400 25, 400 35 L 400 85 C 400 95, 370 95, 360 85 L 140 85 C 130 95, 100 95, 100 85 Z"
                  fill="#d4b996"
                  stroke="#a38258"
                  strokeWidth="2"
                />

                {/* Band 1 */}
                <rect x="145" y="27" width="16" height="66" fill={b1Item.hex} rx="2" />
                {/* Band 2 */}
                <rect x="195" y="35" width="16" height="50" fill={b2Item.hex} rx="2" />
                {/* Band 3 (Multiplier) */}
                <rect x="250" y="35" width="16" height="50" fill={multItem.hex} rx="2" />
                {/* Band 4 (Tolerance) */}
                <rect x="335" y="27" width="16" height="66" fill={tolItem.hex} rx="2" />
              </svg>
            </div>

            {/* Live Calculation Output Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
              <div>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold block">
                  مقدار نامی مقاومت (Nominal Value):
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {formatResistance(nominalResistance)} ±{toPersianDigits(tolerancePercent)}٪
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>حداقل مقدار: {formatResistance(minResistance)}</div>
                <div>حداکثر مقدار: {formatResistance(maxResistance)}</div>
              </div>
            </div>

            {/* Bands Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Band 1 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  نوار اول (رقم اول):
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pe-1">
                  {resistorColorCodes.filter((c) => c.digit !== undefined && c.digit > 0).map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setBand1(c.digit!)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all cursor-pointer ${
                        band1 === c.digit
                          ? 'ring-2 ring-amber-500 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" style={{ backgroundColor: c.hex }} />
                        <span>{c.nameFa}</span>
                      </div>
                      <span>{toPersianDigits(c.digit)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Band 2 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  نوار دوم (رقم دوم):
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pe-1">
                  {resistorColorCodes.filter((c) => c.digit !== undefined).map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setBand2(c.digit!)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all cursor-pointer ${
                        band2 === c.digit
                          ? 'ring-2 ring-amber-500 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" style={{ backgroundColor: c.hex }} />
                        <span>{c.nameFa}</span>
                      </div>
                      <span>{toPersianDigits(c.digit)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Band 3 (Multiplier) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  نوار سوم (ضریب ضرب):
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pe-1">
                  {resistorColorCodes.map((c, idx) => (
                    <button
                      key={c.color}
                      onClick={() => setMultiplierIdx(idx)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all cursor-pointer ${
                        multiplierIdx === idx
                          ? 'ring-2 ring-amber-500 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" style={{ backgroundColor: c.hex }} />
                        <span>{c.nameFa}</span>
                      </div>
                      <span dir="ltr" className="font-mono text-[10px]">×{c.multiplier}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Band 4 (Tolerance) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  نوار چهارم (تلرانس خطا):
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pe-1">
                  {resistorColorCodes.filter((c) => c.tolerance !== undefined).map((c) => {
                    const idx = resistorColorCodes.findIndex((x) => x.color === c.color);
                    return (
                      <button
                        key={c.color}
                        onClick={() => setToleranceIdx(idx)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all cursor-pointer ${
                          toleranceIdx === idx
                            ? 'ring-2 ring-amber-500 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" style={{ backgroundColor: c.hex }} />
                          <span>{c.nameFa}</span>
                        </div>
                        <span>±{toPersianDigits(c.tolerance)}٪</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Formulas */}
      {activeSection === 'formulas' && (
        <div className="space-y-6">
          {formulasHandbook.map((group) => (
            <div
              key={group.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers size={18} className="text-amber-500" />
                <span>{group.titleFa}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {item.titleFa}
                        </h4>
                        <button
                          onClick={() => handleCopy(`${group.id}-${idx}`, item.formula)}
                          className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                        >
                          {copiedKey === `${group.id}-${idx}` ? (
                            <Check size={14} className="text-emerald-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                        {item.descriptionFa}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-center text-slate-900 dark:text-slate-100">
                      <MathFormula formula={item.formula} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 4: SPICE Syntax Guide */}
      {activeSection === 'spice' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                راهنمای جامع گرامر و کدهای عناصر نرم‌افزار SPICE
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                برگرفته از صفحات ۱۲۵ تا ۱۳۰ کتاب دکتر جبه‌دار مارالانی برای مدل‌سازی قطعات در شبیه‌ساز مدار
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold text-start">
                    <th className="py-2.5 px-3 text-start">عنصر مداری</th>
                    <th className="py-2.5 px-3 text-start">پیشوند</th>
                    <th className="py-2.5 px-3 text-start">نحو استاندارد (Syntax)</th>
                    <th className="py-2.5 px-3 text-start">نمونه کد</th>
                    <th className="py-2.5 px-3 text-start">توضیح عملکرد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {spiceSyntaxGuide.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#131d31]">
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                        {item.element}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                        {item.prefix}
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 font-mono text-sky-600 dark:text-sky-400">
                        {item.syntax}
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400">
                        <button
                          onClick={() => handleCopy(`spice-${idx}`, item.example)}
                          className="hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{item.example}</span>
                          <Copy size={11} className="text-slate-400" />
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {item.descriptionFa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
