import React from 'react';

interface HardwareCardVisualizerProps {
  visualKind: string;
  className?: string;
}

export const HardwareCardVisualizer: React.FC<HardwareCardVisualizerProps> = ({
  visualKind,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 p-4 ${className}`}>
      {/* 1. Fluke-style Digital Multimeter */}
      {visualKind === 'multimeter' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* Multimeter body */}
          <div className="w-48 h-64 rounded-2xl bg-amber-500 p-2.5 shadow-xl flex flex-col justify-between border-2 border-amber-600">
            {/* Screen */}
            <div className="h-20 rounded-xl bg-[#c5d3c1] border-2 border-slate-700 p-2 font-mono flex flex-col justify-between text-slate-900 shadow-inner">
              <div className="flex justify-between text-[10px] text-slate-700">
                <span>DC AUTO</span>
                <span>CAT IV 600V</span>
              </div>
              <div className="text-2xl font-black text-end tracking-wider">
                +12.00 V
              </div>
            </div>

            {/* Rotary Knob */}
            <div className="flex justify-center my-1">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center shadow-md relative">
                <div className="w-2 h-7 bg-amber-400 rounded-full -translate-y-2" />
                <div className="w-5 h-5 rounded-full bg-slate-800 absolute" />
              </div>
            </div>

            {/* Input Jacks */}
            <div className="flex justify-around pt-1">
              <div className="text-center">
                <div className="w-5 h-5 rounded-full bg-red-600 border border-red-800 mx-auto" />
                <span className="text-[8px] font-bold text-slate-900">V/Ω</span>
              </div>
              <div className="text-center">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 mx-auto" />
                <span className="text-[8px] font-bold text-slate-900">COM</span>
              </div>
              <div className="text-center">
                <div className="w-5 h-5 rounded-full bg-red-700 border border-red-900 mx-auto" />
                <span className="text-[8px] font-bold text-slate-900">10A</span>
              </div>
            </div>
          </div>

          {/* Measurement context text */}
          <div className="text-xs text-slate-300 space-y-2 max-w-xs text-start">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
              <span><strong>پراب قرمز (+):</strong> متصل به پایانه با پتانسیل مثبت‌تر</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-600 shrink-0" />
              <span><strong>پراب مشکی (COM):</strong> متصل به زمین مرجع مدار</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
              نمایش عدد مثبت نشانه مطابقت جهت جریان با قرارداد غیرفعال (مصرف توان) است.
            </p>
          </div>
        </div>
      )}

      {/* 2. DIP-8 LM741 / TL081 Op-Amp IC */}
      {visualKind === 'ic-opamp-741' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* IC Chip Graphic */}
          <div className="relative w-44 h-56 rounded-xl bg-slate-900 border-2 border-slate-700 p-3 shadow-2xl flex flex-col justify-between">
            {/* Top Notch (Pin 1 orientation) */}
            <div className="w-6 h-3 rounded-b-full bg-slate-950 border-b border-x border-slate-700 mx-auto -mt-3" />

            {/* IC Markings */}
            <div className="text-center font-mono my-auto">
              <div className="text-xs font-bold text-slate-300">TI μA741CP</div>
              <div className="text-[9px] text-slate-500">OPERATIONAL AMP</div>
              <div className="text-[8px] text-slate-600 mt-1">MALAYSIA 2340</div>
            </div>

            {/* Metal Pins (Left 1..4, Right 5..8) */}
            <div className="absolute -start-3 top-8 bottom-8 flex flex-col justify-between">
              {[1, 2, 3, 4].map((pin) => (
                <div key={pin} className="w-3.5 h-3 bg-slate-400 rounded-s-xs border border-slate-600" />
              ))}
            </div>
            <div className="absolute -end-3 top-8 bottom-8 flex flex-col justify-between">
              {[8, 7, 6, 5].map((pin) => (
                <div key={pin} className="w-3.5 h-3 bg-slate-400 rounded-e-xs border border-slate-600" />
              ))}
            </div>
          </div>

          {/* Pinout Guide Table */}
          <div className="text-xs space-y-1.5 text-start font-mono max-w-xs">
            <div className="text-[11px] font-sans font-bold text-amber-400 mb-1">
              پایه‌بندی چیپ استاندارد DIP-8:
            </div>
            <div className="text-slate-300"><strong className="text-amber-400">Pin 2:</strong> Inverting Input (-) ورودی وارون‌گر</div>
            <div className="text-slate-300"><strong className="text-amber-400">Pin 3:</strong> Non-Inverting (+) ورودی ناوارون‌گر</div>
            <div className="text-slate-300"><strong className="text-sky-400">Pin 4:</strong> V- منفی تغذیه متقارن (مثلاً -15V)</div>
            <div className="text-slate-300"><strong className="text-emerald-400">Pin 6:</strong> Output ولتاژ خروجی</div>
            <div className="text-slate-300"><strong className="text-rose-400">Pin 7:</strong> V+ مثبت تغذیه متقارن (مثلاً +15V)</div>
            <div className="text-slate-500 text-[10px]">Pins 1, 5: Offset Null | Pin 8: NC</div>
          </div>
        </div>
      )}

      {/* 3. Physical Resistor Packages */}
      {visualKind === 'component-resistor' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs">
          {/* Carbon 1/4W */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-10 flex items-center justify-center">
              <div className="w-20 h-4 bg-[#d4b996] rounded-full border border-amber-800 flex items-center justify-around px-2">
                <span className="w-1.5 h-full bg-amber-900" />
                <span className="w-1.5 h-full bg-black" />
                <span className="w-1.5 h-full bg-red-600" />
                <span className="w-1.5 h-full bg-yellow-500" />
              </div>
            </div>
            <div className="font-bold text-slate-200">کربنی ۱/۴ وات</div>
            <span className="text-[10px] text-slate-400 block">دقت ۵٪ • مصارف عمومی</span>
          </div>

          {/* Metal Film 1% */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-10 flex items-center justify-center">
              <div className="w-20 h-4 bg-[#38bdf8] rounded-full border border-sky-800 flex items-center justify-around px-2">
                <span className="w-1.5 h-full bg-amber-900" />
                <span className="w-1.5 h-full bg-black" />
                <span className="w-1.5 h-full bg-black" />
                <span className="w-1.5 h-full bg-amber-700" />
              </div>
            </div>
            <div className="font-bold text-sky-400">فیلم فلزی ۱/۴ وات</div>
            <span className="text-[10px] text-slate-400 block">دقت ۱٪ • مدار دقیق و صوت</span>
          </div>

          {/* Cement Power Resistor */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-10 flex items-center justify-center">
              <div className="w-20 h-6 bg-slate-100 rounded-sm border border-slate-400 font-mono text-[9px] text-slate-900 font-bold flex items-center justify-center">
                5W 10Ω J
              </div>
            </div>
            <div className="font-bold text-amber-400">آجری توان بالا (۵W)</div>
            <span className="text-[10px] text-slate-400 block">هسته سرامیکی نسوز</span>
          </div>

          {/* SMD 0805 */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-10 flex items-center justify-center">
              <div className="w-10 h-5 bg-slate-900 border-x-4 border-slate-300 font-mono text-[9px] text-white flex items-center justify-center">
                103
              </div>
            </div>
            <div className="font-bold text-emerald-400">نصب سطحی SMD</div>
            <span className="text-[10px] text-slate-400 block">سایز 0805 • بردهای صنعتی</span>
          </div>
        </div>
      )}

      {/* 4. Physical Capacitors */}
      {visualKind === 'component-capacitor' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 text-xs">
          {/* Electrolytic */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-16 flex items-center justify-center">
              <div className="w-8 h-14 rounded-md bg-blue-700 border border-blue-900 relative flex flex-col justify-between p-1">
                <div className="w-1.5 h-full bg-slate-300 absolute start-1 top-0 bottom-0 text-[6px] text-slate-900 font-bold flex items-center justify-center">
                  -
                </div>
                <span className="font-mono text-[8px] text-white text-end">100μF 50V</span>
              </div>
            </div>
            <div className="font-bold text-sky-400">الکترولیتی بشکه‌ای</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              دارای پلاریته قطعی! خط خاکستری قطب منفی را مشخص می‌کند. ظرفیت‌های بالا (۱ تا ۱۰۰۰μF).
            </p>
          </div>

          {/* Ceramic Disc */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-16 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-amber-600 border border-amber-800 font-mono text-[9px] text-slate-900 font-bold flex items-center justify-center">
                104
              </div>
            </div>
            <div className="font-bold text-amber-400">سرامیکی دیسکی (عدسی)</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              بدون قطب، ولتاژ شکست بالا (۱۰۰V)، کد ۱۰۴ یعنی ۱۰۰ نانوفاراد (۰.۱μF) برای فیلتر نویز فرکانس بالا.
            </p>
          </div>

          {/* Polyester MKT */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-16 flex items-center justify-center">
              <div className="w-12 h-9 rounded-xs bg-rose-700 border border-rose-900 font-mono text-[8px] text-white flex items-center justify-center">
                .22K 250V
              </div>
            </div>
            <div className="font-bold text-rose-400">متالیزه پلی‌استر (MKT)</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              تلفات دی‌الکتریک بسیار پایین، پایداری حرارتی عالی برای مدارهای صوتی و فیلترهای مخابراتی.
            </p>
          </div>
        </div>
      )}

      {/* 5. Physical Inductor Coils */}
      {visualKind === 'component-inductor' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 text-xs">
          {/* Toroidal Choke */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-16 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-slate-700 bg-amber-700 relative flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-950" />
              </div>
            </div>
            <div className="font-bold text-amber-400">چوک توروئیدی حلقوی</div>
            <p className="text-[10px] text-slate-400">
              هسته فریت حلقوی که تمام شار مغناطیسی را درون خود نگه داشته و نویز تشعشع نمی‌کند.
            </p>
          </div>

          {/* Drum Choke */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-16 flex items-center justify-center">
              <div className="w-8 h-12 rounded-xs bg-slate-800 border-2 border-slate-600 flex flex-col justify-between p-1">
                <div className="h-2 bg-amber-800 rounded-xs" />
                <div className="h-2 bg-amber-800 rounded-xs" />
              </div>
            </div>
            <div className="font-bold text-sky-400">سلف بشکه‌ای با روکش حرارتی</div>
            <p className="text-[10px] text-slate-400">
              دارای هسته فریت استوانه‌ای، مناسب برای مدارهای منبع تغذیه سوئیچینگ و جریان‌های تا ۲ آمپر.
            </p>
          </div>

          {/* Air Core Coil */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <div className="h-16 flex items-center justify-center">
              <div className="w-12 h-6 border-2 border-amber-500 rounded-full flex items-center justify-center font-mono text-[9px] text-amber-300">
                AIR-CORE
              </div>
            </div>
            <div className="font-bold text-emerald-400">سیم‌پیچ بوبین بدون هسته (هوایی)</div>
            <p className="text-[10px] text-slate-400">
              بدون پدیده اشباع مغناطیسی! خطی کامل در فرکانس‌های رادیویی بسیار بالا (VHF/UHF).
            </p>
          </div>
        </div>
      )}

      {/* 6. Transformer & Dot Pin */}
      {visualKind === 'component-transformer' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2 text-xs">
          <div className="w-40 h-32 rounded-xl bg-slate-900 border-2 border-slate-700 p-2.5 flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-center">
              {/* Dot on Pin 1 */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white border border-slate-400 animate-pulse" />
                <span className="text-[9px] font-bold text-amber-400 font-mono">DOT PIN 1</span>
              </div>
              <span className="font-mono text-[9px] text-slate-500">EE-19</span>
            </div>
            <div className="text-center font-mono text-slate-300 font-bold my-auto">
              FERRITE CORE
              <div className="text-[9px] text-slate-500 font-normal">TFR 220V:12V 100kHz</div>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              <span>PRI: 1-2</span>
              <span>SEC: 3-4</span>
            </div>
          </div>

          <div className="space-y-1.5 text-start max-w-sm">
            <div className="text-xs font-bold text-amber-400">اهمیت فیزیکی علامت نقطه روی بدنه ترانس:</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              نقطه سفید حک‌شده روی بدنه پایه شماره ۱ را نشان می‌دهد. هرگاه جریان ورودی اولیه به پایه ۱ وارد شود، ولتاژ پایه خروجی ثانویه نقطه‌دار در همان لحظه مثبت می‌شود (هم‌فاز). این همان قرارداد نقطه کتاب جبه‌دار است!
            </p>
          </div>
        </div>
      )}

      {/* 7. Laboratory Benchtop Power Supply */}
      {visualKind === 'power-supply' && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2 text-xs">
          {/* Benchtop PSU Panel */}
          <div className="w-56 h-40 rounded-xl bg-slate-900 border-2 border-slate-700 p-3 flex flex-col justify-between shadow-2xl">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-1.5 rounded-lg bg-black border border-slate-800 font-mono text-center">
                <span className="text-[8px] text-slate-500 block">VOLTAGE</span>
                <span className="text-sm font-bold text-red-500">24.0 V</span>
              </div>
              <div className="p-1.5 rounded-lg bg-black border border-slate-800 font-mono text-center">
                <span className="text-[8px] text-slate-500 block">CURRENT</span>
                <span className="text-sm font-bold text-green-400">1.50 A</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono px-1">
              <span className="px-1.5 py-0.5 rounded bg-green-950 text-green-400 font-bold">CV (ثابت)</span>
              <span className="text-slate-500">CC (سقف جریان)</span>
            </div>

            {/* Binding posts */}
            <div className="flex justify-around pt-2 border-t border-slate-800">
              <div className="w-4 h-4 rounded-full bg-red-600 border border-red-800" title="خروجی مثبت" />
              <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700" title="خروجی منفی" />
              <div className="w-4 h-4 rounded-full bg-green-600 border border-green-800" title="زمین Earth" />
            </div>
          </div>

          <div className="space-y-1.5 text-start max-w-sm">
            <div className="text-xs font-bold text-amber-400">مدل‌سازی منبع مستقل در آزمایشگاه:</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              منبع تغذیه آزمایشگاهی دارای مقاومت داخلی نزدیک به صفر است (منبع ولتاژ ایده‌آل). با استفاده از دو کانال مجزا می‌توان تغذیه متقارن ±15V برای مدارهای آپ‌امپ ایجاد کرد.
            </p>
          </div>
        </div>
      )}

      {/* 8. Breadboard MB-102 Wiring */}
      {(visualKind === 'breadboard' || visualKind === 'opamp-breadboard') && (
        <div className="py-2 text-xs text-center space-y-3">
          <div className="max-w-lg mx-auto p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-md">
            <div className="grid grid-cols-12 gap-1 mb-2">
              {Array.from({ length: 24 }).map((_, idx) => (
                <div key={idx} className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700 mx-auto" />
              ))}
            </div>
            <div className="h-4 border-y border-dashed border-slate-400 dark:border-slate-700 my-2 flex items-center justify-center font-mono text-[9px] text-slate-500">
              --- شیار مرکزی ایزولاسیون آی‌سی (DIP IC Channel) ---
            </div>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 24 }).map((_, idx) => (
                <div key={idx} className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700 mx-auto" />
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 max-w-md mx-auto leading-relaxed">
            هر ستون ۵ سوراخه به صورت پیوسته متصل است و یک گره مداری را تشکیل می‌دهد. قطعات آی‌سی روی شیار مرکزی سوار می‌شوند تا پایه‌های دو طرف به هم اتصال کوتاه نشوند.
          </p>
        </div>
      )}

      {/* Fallback for other kinds */}
      {visualKind !== 'multimeter' &&
        visualKind !== 'ic-opamp-741' &&
        visualKind !== 'component-resistor' &&
        visualKind !== 'component-capacitor' &&
        visualKind !== 'component-inductor' &&
        visualKind !== 'component-transformer' &&
        visualKind !== 'power-supply' &&
        visualKind !== 'breadboard' &&
        visualKind !== 'opamp-breadboard' && (
          <div className="p-4 text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-amber-500/10 text-amber-400">
              <span className="font-mono text-xs font-bold uppercase">{visualKind}</span>
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              نمایش سخت‌افزاری و قطعه صنعتی متناظر با مفاهیم نظریه اساسی مدارها در آزمایشگاه مهندسی برق
            </p>
          </div>
        )}
    </div>
  );
};
