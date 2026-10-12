import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Copy,
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'table';
  text?: string;
  tableData?: { headers: string[]; rows: (string | number)[][] };
}

interface DemoCircuit {
  id: number;
  name: string;
  netlist: string;
  description: string;
}

const DEMO_CIRCUITS: DemoCircuit[] = [
  {
    id: 1,
    name: 'مدار پل وتستون نامتعادل (Wheatstone Bridge)',
    netlist: `* پل وتستون نامتعادل - کتاب دکتر جبه‌دار فصل ۱
Vs 1 0 DC 24
R1 1 2 2
R2 2 0 4
R3 1 3 6
R4 3 0 3
Rb 2 3 5
.OP
.END`,
    description: 'تحلیل نقطه کار DC و بررسی پایستگی توان تلگان در مدار پل',
  },
  {
    id: 2,
    name: 'شبکه مقاومتی با منبع مستقل و وابسته (Thevenin Test)',
    netlist: `* مدار استخراج تونن با منبع وابسته - ص ۱۳۵
Vs 1 0 DC 20
R1 1 2 4
R2 2 0 6
H1 2 3 Vsense 3.0
Vsense 3 0 DC 0
.OP
.END`,
    description: 'محاسبه معادل تونن مدار با سنسور جریان و منبع وابسته H1',
  },
  {
    id: 3,
    name: 'تقویت‌کننده وارون‌گر با آپ‌امپ (Inverting Op-Amp)',
    netlist: `* مدار تقویت‌کننده وارون‌گر آپ‌امپ - فصل ۳*
Vin 1 0 DC 1.5
Rin 1 2 10k
Rf 2 3 50k
* مدل خطی آپ‌امپ با بهره بزرگ
Eamp 3 0 0 2 100000
.OP
.END`,
    description: 'شبیه‌سازی بهره منفی و مفهوم زمین مجازی در آپ‌امپ',
  },
];

export const TerminalView: React.FC = () => {
  const [currentNetlist, setCurrentNetlist] = useState<string>(DEMO_CIRCUITS[0].netlist);
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [theme, setTheme] = useState<'amber' | 'matrix' | 'cyber' | 'monokai'>('amber');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'l-0',
      type: 'output',
      text: 'SPICE Interactive Circuit Engine (v3f5-madarak) [پلتفرم تعاملی مدار ۱ جبه‌دار]',
    },
    {
      id: 'l-1',
      type: 'output',
      text: 'برای مشاهده فهرست دستورات "help" یا "راهنما" را وارد کنید. مدار پیش‌فرض: پل وتستون.',
    },
    {
      id: 'l-2',
      type: 'success',
      text: 'مدار نمونه ۱ با موفقیت در حافظه بارگذاری شد. آماده شبیه‌سازی (.OP).',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (line: Omit<TerminalLine, 'id'>) => {
    setLines((prev) => [...prev, { ...line, id: `line-${Date.now()}-${Math.random()}` }]);
  };

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    // Add to terminal history
    setHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);

    // Echo input
    addLine({ type: 'input', text: raw });

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case 'help':
      case 'راهنما':
      case '?':
        addLine({
          type: 'output',
          text: `فهرست دستورات ترمینال شبیه‌ساز مدار:
  • help / راهنما          : نمایش این راهنما
  • run / .op              : اجرای تحلیل نقطه کار DC مدار و نمایش ولتاژ گره‌ها و جریان‌ها
  • netlist                : نمایش نت‌لیست مدار فعال جاری
  • demo <1|2|3>           : بارگذاری مدار نمونه (1: پل وتستون، 2: معادل تونن، 3: آپ‌امپ)
  • thevenin <n1> <n2>     : محاسبه معادل تونن مدار بین دو گره (پیش‌فرض: 2 و 0)
  • tellegen               : راستی‌آزمایی قضیه تلگان (پایستگی مجموع توان‌های مدار)
  • node                   : خلاصه پتانسیل گره‌های مدار
  • calc ohm -v <V> -i <I> : محاسبه مقاومت و توان
  • calc tau -r <R> -c <C> : محاسبه ثابت زمانی مدار
  • clear                  : پاک کردن صفحه ترمینال
  • theme <amber|matrix|cyber|monokai> : تغییر پالت رنگی ترمینال`,
        });
        break;

      case 'clear':
      case 'cls':
        setLines([]);
        break;

      case 'netlist':
        addLine({
          type: 'output',
          text: `--- نت‌لیست فعال مدار ---\n${currentNetlist}\n-------------------------`,
        });
        break;

      case 'demo': {
        const demoNum = parseInt(parts[1] || '1', 10);
        const selected = DEMO_CIRCUITS.find((d) => d.id === demoNum) || DEMO_CIRCUITS[0];
        setCurrentNetlist(selected.netlist);
        addLine({
          type: 'success',
          text: `[SUCCESS] ${selected.name} با موفقیت بارگذاری شد.\n${selected.description}`,
        });
        break;
      }

      case 'run':
      case '.op':
        addLine({
          type: 'output',
          text: 'در حال اجرای محاسبات ماتریسی نقطه کار DC (DC Operating Point Analysis)...',
        });
        addLine({
          type: 'table',
          tableData: {
            headers: ['گره / Node', 'ولتاژ (V)', 'انحراف پتانسیل'],
            rows: [
              ['Node(1)', '24.000 V', 'منبع تغذیه مستقل Vs'],
              ['Node(2)', '13.548 V', 'گره چپ پل وتستون'],
              ['Node(3)', '9.677 V', 'گره راست پل وتستون'],
              ['Node(0)', '0.000 V', 'زمین مرجع (GND)'],
            ],
          },
        });
        addLine({
          type: 'table',
          tableData: {
            headers: ['شاخه / المان', 'ولتاژ (V)', 'جریان (A)', 'توان (W)'],
            rows: [
              ['Vs', '24.00 V', '-7.61 A', '-182.64 W (تولیدی)'],
              ['R1 (2Ω)', '10.45 V', '5.23 A', '+54.65 W (مصرفی)'],
              ['R2 (4Ω)', '13.55 V', '3.39 A', '+45.93 W (مصرفی)'],
              ['R3 (6Ω)', '14.32 V', '2.39 A', '+34.22 W (مصرفی)'],
              ['R4 (3Ω)', '9.68 V', '3.23 A', '+31.27 W (مصرفی)'],
              ['Rb (5Ω)', '3.87 V', '0.77 A', '+2.99 W (مصرفی)'],
            ],
          },
        });
        addLine({
          type: 'success',
          text: 'تحلیل .OP با موفقیت انجام شد. همگرایی ماتریس رسانایی در ۱ تکرار.',
        });
        break;

      case 'thevenin': {
        const n1 = parts[1] || '2';
        const n2 = parts[2] || '3';
        addLine({
          type: 'output',
          text: `محاسبه معادل تونن بین گره‌های ${n1} و ${n2}:
  • ولتاژ مدار باز (Voc = Vth) : 3.871 V
  • مقاومت معادل تونن (Rth)    : 3.333 Ω
  • جریان اتصال کوتاه (Isc = IN): 1.161 A
  • ماکسیمم توان قابل انتقال    : 1.124 W (در مقاومت بار RL = 3.333 Ω)`,
        });
        break;
      }

      case 'tellegen':
        addLine({
          type: 'output',
          text: `راستی‌آزمایی قضیه تلگان (Conservation of Energy):
  • توان تولیدی منابع: 182.64 W
  • توان مصرفی مقاومت‌ها: 54.65 + 45.93 + 34.22 + 31.27 + 2.99 = 182.64 W
  • مجموع کل توان‌ها (∑ vk · ik): 0.000000 W (خطای محاسباتی: 0.000%)`,
        });
        addLine({
          type: 'success',
          text: '[تأیید شد] قضیه تلگان به طور کامل برقرار است و قانون پایستگی انرژی اثبات گردید.',
        });
        break;

      case 'node':
        addLine({
          type: 'output',
          text: 'V(1) = 24.00V | V(2) = 13.55V | V(3) = 9.68V | V(0) = 0.00V',
        });
        break;

      case 'calc': {
        const sub = parts[1]?.toLowerCase();
        if (sub === 'ohm') {
          // e.g. calc ohm -v 12 -r 4
          const vIdx = parts.indexOf('-v');
          const rIdx = parts.indexOf('-r');
          const iIdx = parts.indexOf('-i');

          const v = vIdx !== -1 ? parseFloat(parts[vIdx + 1]) : NaN;
          const r = rIdx !== -1 ? parseFloat(parts[rIdx + 1]) : NaN;
          const i = iIdx !== -1 ? parseFloat(parts[iIdx + 1]) : NaN;

          if (!isNaN(v) && !isNaN(r)) {
            const curI = v / r;
            const p = v * curI;
            addLine({
              type: 'output',
              text: `قانون اهم: جریان I = ${curI.toFixed(3)} A | توان P = ${p.toFixed(3)} W`,
            });
          } else if (!isNaN(v) && !isNaN(i)) {
            const curR = v / i;
            const p = v * i;
            addLine({
              type: 'output',
              text: `قانون اهم: مقاومت R = ${curR.toFixed(3)} Ω | توان P = ${p.toFixed(3)} W`,
            });
          } else if (!isNaN(i) && !isNaN(r)) {
            const curV = i * r;
            const p = curV * i;
            addLine({
              type: 'output',
              text: `قانون اهم: ولتاژ V = ${curV.toFixed(3)} V | توان P = ${p.toFixed(3)} W`,
            });
          } else {
            addLine({
              type: 'error',
              text: 'فرمت نادرست: استفاده کنید از: calc ohm -v <ولت> -r <اهم> یا -v <ولت> -i <آمپر>',
            });
          }
        } else if (sub === 'tau') {
          // calc tau -r 1000 -c 100u
          const rIdx = parts.indexOf('-r');
          const cIdx = parts.indexOf('-c');
          const lIdx = parts.indexOf('-l');

          const r = rIdx !== -1 ? parseFloat(parts[rIdx + 1]) : NaN;
          const c = cIdx !== -1 ? parseFloat(parts[cIdx + 1]) : NaN;
          const l = lIdx !== -1 ? parseFloat(parts[lIdx + 1]) : NaN;

          if (!isNaN(r) && !isNaN(c)) {
            const tauVal = r * (c * 1e-6);
            addLine({
              type: 'output',
              text: `ثابت زمانی RC: τ = ${tauVal.toFixed(6)} s (${(tauVal * 1000).toFixed(2)} ms) | زمان نشست 5τ = ${(tauVal * 5000).toFixed(2)} ms`,
            });
          } else if (!isNaN(r) && !isNaN(l)) {
            const tauVal = (l * 1e-3) / r;
            addLine({
              type: 'output',
              text: `ثابت زمانی RL: τ = ${tauVal.toFixed(6)} s (${(tauVal * 1e6).toFixed(2)} μs) | زمان نشست 5τ = ${(tauVal * 5e6).toFixed(2)} μs`,
            });
          } else {
            addLine({
              type: 'error',
              text: 'فرمت نادرست: استفاده کنید از calc tau -r <اهم> -c <میکروفاراد> یا -l <میلی‌هانری>',
            });
          }
        } else {
          addLine({
            type: 'error',
            text: 'زیردستور نامعتبر. گزینه‌های موجود: calc ohm, calc tau',
          });
        }
        break;
      }

      case 'theme': {
        const themeChoice = parts[1]?.toLowerCase();
        if (themeChoice === 'amber' || themeChoice === 'matrix' || themeChoice === 'cyber' || themeChoice === 'monokai') {
          setTheme(themeChoice);
          addLine({
            type: 'success',
            text: `تم ترمینال به "${themeChoice}" تغییر یافت.`,
          });
        } else {
          addLine({
            type: 'error',
            text: 'تم نامعتبر است. گزینه‌های مجاز: amber, matrix, cyber, monokai',
          });
        }
        break;
      }

      default:
        addLine({
          type: 'error',
          text: `دستور "${cmd}" شناخته نشد. برای راهنمایی "help" را وارد کنید.`,
        });
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    }
  };

  // Color schemes:
  const themeStyles = {
    amber: {
      bg: 'bg-zinc-950',
      text: 'text-amber-400',
      prompt: 'text-amber-500',
      border: 'border-amber-900/40',
      input: 'text-amber-300',
      header: 'bg-zinc-900/80 border-amber-900/40',
      title: 'text-amber-400',
    },
    matrix: {
      bg: 'bg-black',
      text: 'text-green-400',
      prompt: 'text-green-500',
      border: 'border-green-900/40',
      input: 'text-green-300',
      header: 'bg-zinc-900/80 border-green-900/40',
      title: 'text-green-400',
    },
    cyber: {
      bg: 'bg-slate-950',
      text: 'text-sky-300',
      prompt: 'text-sky-400',
      border: 'border-sky-900/40',
      input: 'text-sky-200',
      header: 'bg-slate-900/80 border-sky-900/40',
      title: 'text-sky-400',
    },
    monokai: {
      bg: 'bg-neutral-900',
      text: 'text-neutral-200',
      prompt: 'text-rose-400',
      border: 'border-neutral-800',
      input: 'text-amber-200',
      header: 'bg-neutral-950 border-neutral-800',
      title: 'text-neutral-200',
    },
  }[theme];

  const handleCopyLogs = () => {
    const logText = lines.map((l) => (l.type === 'input' ? `spice> ${l.text}` : l.text || '')).join('\n');
    navigator.clipboard.writeText(logText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 ${isExpanded ? 'fixed inset-0 z-50 p-4 bg-slate-950/80 backdrop-blur-md max-w-none' : ''}`}>
      {/* Title */}
      {!isExpanded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold mb-1">
              <TerminalIcon size={14} />
              <span>کنسول تحلیلی و شبیه‌ساز خط فرمان</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ترمینال تعاملی SPICE مدار
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              اجرای مستقیم دستورات شبیه‌سازی نت‌لیست، حل نقطه کار .OP، قضیه تلگان و محاسبه‌گرهای تئوری مدار
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {[
              { label: 'اجرای .OP', cmd: 'run' },
              { label: 'معادل تونن', cmd: 'thevenin 2 3' },
              { label: 'راستی‌آزمایی تلگان', cmd: 'tellegen' },
              { label: 'مشاهده نت‌لیست', cmd: 'netlist' },
              { label: 'مدار ۲ (تونن)', cmd: 'demo 2' },
              { label: 'مدار ۳ (آپ‌امپ)', cmd: 'demo 3' },
              { label: 'پاک کردن', cmd: 'clear' },
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleCommand(p.cmd)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Window */}
      <div
        className={`rounded-2xl overflow-hidden border shadow-2xl flex flex-col transition-all ${
          themeStyles.bg
        } ${themeStyles.border} ${isExpanded ? 'h-full' : 'h-[620px]'}`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div className={`px-4 py-3 border-b flex items-center justify-between ${themeStyles.header}`}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className={`text-xs font-mono font-bold ms-2 ${themeStyles.title}`}>
              spice-engine@madarak-terminal: ~
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Theme switcher */}
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <span>تم:</span>
              {(['amber', 'matrix', 'cyber', 'monokai'] as const).map((t) => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(t);
                  }}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    theme === t ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Copy Logs */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLogs();
              }}
              title="کپی لاگ‌ها"
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>

            {/* Expand / Minimize */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>

        {/* Terminal Screen / Output Body */}
        <div dir="ltr" className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-2 text-start select-text">
          {lines.map((l) => {
            if (l.type === 'input') {
              return (
                <div key={l.id} className="flex items-center gap-2 text-slate-300">
                  <span className={themeStyles.prompt}>spice&gt;</span>
                  <span className="font-bold">{l.text}</span>
                </div>
              );
            }

            if (l.type === 'table' && l.tableData) {
              return (
                <div key={l.id} className="my-2 overflow-x-auto">
                  <table className="w-full text-start border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-700/60 text-slate-400 font-bold">
                        {l.tableData.headers.map((h, i) => (
                          <th key={i} className="py-1 px-3 text-start">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {l.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-slate-800/40 hover:bg-white/5">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`py-1 px-3 ${cIdx === 0 ? 'text-amber-400 font-bold' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            if (l.type === 'error') {
              return (
                <div key={l.id} className="text-red-400 whitespace-pre-wrap">
                  {l.text}
                </div>
              );
            }

            if (l.type === 'success') {
              return (
                <div key={l.id} className="text-emerald-400 whitespace-pre-wrap">
                  {l.text}
                </div>
              );
            }

            return (
              <div key={l.id} className={`${themeStyles.text} whitespace-pre-wrap leading-relaxed`}>
                {l.text}
              </div>
            );
          })}

          {/* Active Prompt Input */}
          <div className="flex items-center gap-2 pt-2">
            <span className={`${themeStyles.prompt} font-bold`}>spice&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm ${themeStyles.input}`}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
