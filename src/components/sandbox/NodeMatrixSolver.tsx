import React, { useState } from 'react';
import { Layers, RefreshCw, CheckCircle2 } from 'lucide-react';
import { formatPersianNumber } from '../../utils/persian';

export const NodeMatrixSolver: React.FC = () => {
  // Mode: 2-node or 3-node
  const [nodeCount, setNodeCount] = useState<2 | 3>(2);

  // 2-node parameters (Resistances in Ohms, Currents in Amps)
  const [r1, setR1] = useState<number>(2);  // G1 = 1/2 = 0.5 S
  const [r2, setR2] = useState<number>(4);  // G2 = 1/4 = 0.25 S
  const [r12, setR12] = useState<number>(5);// G12 = 1/5 = 0.2 S (resistor between nodes 1 and 2)
  const [is1, setIs1] = useState<number>(8); // Injected to node 1
  const [is2, setIs2] = useState<number>(-2); // Injected to node 2

  // 3-node parameters (Resistances to ground: R1, R2, R3; Between: R12, R23, R13; Injected: I1, I2, I3)
  const [r3, setR3] = useState<number>(6);
  const [r23, setR23] = useState<number>(3);
  const [r13, setR13] = useState<number>(10);
  const [is3, setIs3] = useState<number>(4);

  // Calculations for 2-node:
  const g1 = 1 / r1;
  const g2 = 1 / r2;
  const g12 = 1 / r12;

  const G11 = g1 + g12;
  const G12 = -g12;
  const G21 = -g12;
  const G22 = g2 + g12;

  const det2 = G11 * G22 - G12 * G21;
  const v1_2node = det2 !== 0 ? (is1 * G22 - is2 * G12) / det2 : 0;
  const v2_2node = det2 !== 0 ? (G11 * is2 - G21 * is1) / det2 : 0;

  // Calculations for 3-node:
  const g3 = 1 / r3;
  const g23 = 1 / r23;
  const g13 = 1 / r13;

  const M11 = g1 + g12 + g13;
  const M12 = -g12;
  const M13 = -g13;

  const M21 = -g12;
  const M22 = g2 + g12 + g23;
  const M23 = -g23;

  const M31 = -g13;
  const M32 = -g23;
  const M33 = g3 + g23 + g13;

  // 3x3 Determinant
  const det3 =
    M11 * (M22 * M33 - M23 * M32) -
    M12 * (M21 * M33 - M23 * M31) +
    M13 * (M21 * M32 - M22 * M31);

  // Cramer's rule for V1, V2, V3
  const detV1 =
    is1 * (M22 * M33 - M23 * M32) -
    M12 * (is2 * M33 - M23 * is3) +
    M13 * (is2 * M32 - M22 * is3);

  const detV2 =
    M11 * (is2 * M33 - M23 * is3) -
    is1 * (M21 * M33 - M23 * M31) +
    M13 * (M21 * is3 - is2 * M31);

  const detV3 =
    M11 * (M22 * is3 - is2 * M32) -
    M12 * (M21 * is3 - is2 * M31) +
    is1 * (M21 * M32 - M22 * M31);

  const v1_3node = det3 !== 0 ? detV1 / det3 : 0;
  const v2_3node = det3 !== 0 ? detV2 / det3 : 0;
  const v3_3node = det3 !== 0 ? detV3 / det3 : 0;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers size={18} className="text-amber-500" />
            <span>حل‌کننده ماتریسی سیستماتیک تحلیل گره (Node Voltage Solver)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            تشکیل خودکار ماتریس رسانایی [G][V] = [I] و حل گام‌به‌گام پتانسیل گره‌های مدار با دترمینان و قاعده کرامر
          </p>
        </div>

        {/* Node count selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setNodeCount(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              nodeCount === 2
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            مدار ۲ گره‌ای
          </button>
          <button
            onClick={() => setNodeCount(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              nodeCount === 3
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            مدار ۳ گره‌ای
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                مقادیر مقاومت‌ها و منابع جریان
              </h4>
              <button
                onClick={() => {
                  setR1(2);
                  setR2(4);
                  setR12(5);
                  setIs1(8);
                  setIs2(-2);
                  setR3(6);
                  setR23(3);
                  setR13(10);
                  setIs3(4);
                }}
                className="text-[11px] text-amber-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>بازنشانی</span>
              </button>
            </div>

            {/* Injected Currents */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                  جریان گره ۱ (Is1):
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={is1}
                    onChange={(e) => setIs1(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                  <span className="text-xs text-slate-500">A</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                  جریان گره ۲ (Is2):
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={is2}
                    onChange={(e) => setIs2(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                  <span className="text-xs text-slate-500">A</span>
                </div>
              </div>

              {nodeCount === 3 && (
                <div className="col-span-2">
                  <label className="text-xs text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                    جریان گره ۳ (Is3):
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={is3}
                      onChange={(e) => setIs3(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                    />
                    <span className="text-xs text-slate-500">A</span>
                  </div>
                </div>
              )}
            </div>

            {/* Ground Resistances */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                مقاومت‌های متصل به زمین (GND):
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">R1 (گره ۱ به زمین):</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={r1}
                    onChange={(e) => setR1(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">R2 (گره ۲ به زمین):</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={r2}
                    onChange={(e) => setR2(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>
                {nodeCount === 3 && (
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">R3 (گره ۳ به زمین):</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.5"
                      value={r3}
                      onChange={(e) => setR3(Math.max(0.1, Number(e.target.value)))}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Inter-node Resistances */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                مقاومت‌های بین گره‌ها:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">R12 (بین ۱ و ۲):</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={r12}
                    onChange={(e) => setR12(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                  />
                </div>
                {nodeCount === 3 && (
                  <>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">R23 (بین ۲ و ۳):</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={r23}
                        onChange={(e) => setR23(Math.max(0.1, Number(e.target.value)))}
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">R13 (بین ۱ و ۳):</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={r13}
                        onChange={(e) => setR13(Math.max(0.1, Number(e.target.value)))}
                        className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Equation & Solution (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Results Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">ولتاژ گره ۱ (V1)</span>
              <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                {formatPersianNumber(nodeCount === 2 ? v1_2node : v1_3node, 2)} V
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center">
              <span className="text-[11px] text-sky-700 dark:text-sky-300 font-semibold">ولتاژ گره ۲ (V2)</span>
              <div className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
                {formatPersianNumber(nodeCount === 2 ? v2_2node : v2_3node, 2)} V
              </div>
            </div>

            {nodeCount === 3 && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center col-span-2 sm:col-span-1">
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">ولتاژ گره ۳ (V3)</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatPersianNumber(v3_3node, 2)} V
                </div>
              </div>
            )}
          </div>

          {/* Formatted Matrix Display */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>دستگاه معادلات ماتریسی گره [G] [V] = [I]</span>
              <span className="text-[11px] font-mono text-emerald-500">
                Δ = {(nodeCount === 2 ? det2 : det3).toFixed(4)}
              </span>
            </h4>

            {nodeCount === 2 ? (
              <div dir="ltr" className="p-4 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-100 flex items-center justify-center gap-3">
                {/* [G] Matrix */}
                <div className="flex items-center">
                  <span className="text-2xl text-slate-500 font-thin">[</span>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-center py-1">
                    <span className="text-amber-400">{G11.toFixed(3)}</span>
                    <span className="text-slate-400">{G12.toFixed(3)}</span>
                    <span className="text-slate-400">{G21.toFixed(3)}</span>
                    <span className="text-amber-400">{G22.toFixed(3)}</span>
                  </div>
                  <span className="text-2xl text-slate-500 font-thin">]</span>
                </div>

                <span className="text-slate-500">×</span>

                {/* [V] Vector */}
                <div className="flex items-center">
                  <span className="text-2xl text-slate-500 font-thin">[</span>
                  <div className="flex flex-col text-center py-1">
                    <span className="text-sky-400 font-bold">V1</span>
                    <span className="text-sky-400 font-bold">V2</span>
                  </div>
                  <span className="text-2xl text-slate-500 font-thin">]</span>
                </div>

                <span className="text-slate-500">=</span>

                {/* [I] Vector */}
                <div className="flex items-center">
                  <span className="text-2xl text-slate-500 font-thin">[</span>
                  <div className="flex flex-col text-center py-1">
                    <span className="text-emerald-400">{is1.toFixed(1)}</span>
                    <span className="text-emerald-400">{is2.toFixed(1)}</span>
                  </div>
                  <span className="text-2xl text-slate-500 font-thin">]</span>
                </div>
              </div>
            ) : (
              <div dir="ltr" className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-100 flex items-center justify-center gap-2 overflow-x-auto">
                {/* 3x3 [G] Matrix */}
                <div className="flex items-center">
                  <span className="text-3xl text-slate-500 font-thin">[</span>
                  <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-center py-1">
                    <span className="text-amber-400">{M11.toFixed(2)}</span>
                    <span className="text-slate-400">{M12.toFixed(2)}</span>
                    <span className="text-slate-400">{M13.toFixed(2)}</span>
                    <span className="text-slate-400">{M21.toFixed(2)}</span>
                    <span className="text-amber-400">{M22.toFixed(2)}</span>
                    <span className="text-slate-400">{M23.toFixed(2)}</span>
                    <span className="text-slate-400">{M31.toFixed(2)}</span>
                    <span className="text-slate-400">{M32.toFixed(2)}</span>
                    <span className="text-amber-400">{M33.toFixed(2)}</span>
                  </div>
                  <span className="text-3xl text-slate-500 font-thin">]</span>
                </div>

                <span className="text-slate-500">×</span>

                {/* [V] Vector */}
                <div className="flex items-center">
                  <span className="text-3xl text-slate-500 font-thin">[</span>
                  <div className="flex flex-col text-center py-1">
                    <span className="text-sky-400 font-bold">V1</span>
                    <span className="text-sky-400 font-bold">V2</span>
                    <span className="text-sky-400 font-bold">V3</span>
                  </div>
                  <span className="text-3xl text-slate-500 font-thin">]</span>
                </div>

                <span className="text-slate-500">=</span>

                {/* [I] Vector */}
                <div className="flex items-center">
                  <span className="text-3xl text-slate-500 font-thin">[</span>
                  <div className="flex flex-col text-center py-1">
                    <span className="text-emerald-400">{is1.toFixed(1)}</span>
                    <span className="text-emerald-400">{is2.toFixed(1)}</span>
                    <span className="text-emerald-400">{is3.toFixed(1)}</span>
                  </div>
                  <span className="text-3xl text-slate-500 font-thin">]</span>
                </div>
              </div>
            )}

            {/* Step-by-Step Educational Solution */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>مراحل حل سیستماتیک با روش ماتریس هدایت گره‌ها:</span>
              </div>
              <p>
                ۱. <strong>تشکیل درایه‌های ماتریس رسانایی:</strong> درایه‌های قطر اصلی برابر مجموع رسانایی‌های متصل به هر گره هستند ({nodeCount === 2 ? `G11 = 1/${r1} + 1/${r12} = ${G11.toFixed(3)} S` : `M11 = ${M11.toFixed(2)} S`}).
              </p>
              <p>
                ۲. <strong>درایه‌های غیرقطری:</strong> قرینه رسانایی مشترک میان دو گره هستند ({nodeCount === 2 ? `G12 = -1/${r12} = ${G12.toFixed(3)} S` : `M12 = -1/${r12} = ${M12.toFixed(2)} S`}).
              </p>
              <p>
                ۳. <strong>حل دستگاه خطی:</strong> با محاسبه دترمینان Δ = {formatPersianNumber(nodeCount === 2 ? det2 : det3, 4)} و معکوس ماتریس رسانایی، ولتاژهای نهایی گره‌ها به دقت استخراج گردید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
