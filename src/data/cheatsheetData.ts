import type { TheoremItem, ResistorColorBand } from '../types';

export const theoremsList: TheoremItem[] = [
  {
    id: 'thevenin',
    titleFa: 'قضیه مدار معادل تونن',
    titleEn: 'Thevenin\'s Theorem',
    discoveredByFa: 'لئون شارل تونن (Léon Charles Thévenin)',
    statementFa: 'هر مدار خطی فعال دوپایانه‌ای، از دید دو ترمینال خروجی خود، معادل است با یک منبع ولتاژ مستقل Vth متصل به صورت سری با یک مقاومت معادل Rth.',
    formulaTex: 'V_L = V_{th} \\cdot \\frac{R_L}{R_{th} + R_L}',
    conditionsFa: [
      'مدار باید خطی باشد (تشکیل شده از مقاومت‌های خطی، منابع مستقل و منابع وابسته خطی).',
      'هیچ کوپلاژ مغناطیسی یا منبع وابسته‌ای نباید متغیر کنترلی آن خارج از بلوک مدار باقی بماند.'
    ],
    examTipsFa: [
      'Vth همیشه برابر ولتاژ مدار باز پایانه‌ها (Voc) است.',
      'اگر منبع وابسته در مدار وجود دارد، هرگز آن را خاموش نکنید! باید از روش منبع آزمون (Vtest/Itest) یا نسبت Voc/Isc استفاده کنید.'
    ],
    applicationsFa: [
      'ساده‌سازی شبکه‌های عظیم قدرت و برق',
      'طراحی طبقات تقویت‌کننده و محاسبه امپدانس خروجی',
      'تحلیل اثر بارگذاری بر روی مدارها'
    ]
  },
  {
    id: 'norton',
    titleFa: 'قضیه مدار معادل نورتن',
    titleEn: 'Norton\'s Theorem',
    discoveredByFa: 'ادوارد لوری نورتن (Edward Lawry Norton)',
    statementFa: 'هر مدار خطی فعال دوپایانه‌ای، از دید دو ترمینال، معادل است با یک منبع جریان مستقل IN متصل به صورت موازی با یک مقاومت معادل RN.',
    formulaTex: 'I_N = I_{sc} \\quad , \\quad R_N = R_{th} = \\frac{V_{oc}}{I_{sc}}',
    conditionsFa: [
      'مدار باید خطی و زمان-ناپذیر باشد.',
      'پایانه‌های مورد نظر باید دسترسی مستقیم داشته باشند.'
    ],
    examTipsFa: [
      'جریان نورتن (IN) همیشه برابر جریان اتصال کوتاه دو پایانه (Isc) است.',
      'جهت پیکان منبع جریان نورتن به سمت پایانه‌ای است که در حالت مدار باز پتانسیل مثبت‌تری دارد.'
    ],
    applicationsFa: [
      'تحلیل مدارهای با ساختار موازی',
      'مدل‌سازی ترانزیستورهای ماسفت و BJT در سیگنال کوچک'
    ]
  },
  {
    id: 'tellegen',
    titleFa: 'قضیه تلگان و پایستگی توان',
    titleEn: 'Tellegen\'s Theorem',
    discoveredByFa: 'برنارد تلان (Bernard D. H. Tellegen)',
    statementFa: 'در هر مدار فشرده همبند، مجموع جبری حاصل‌ضرب ولتاژ شاخه‌ها در جریان شاخه‌ها همواره برابر صفر است: ∑ vk · ik = 0. این قضیه مستقل از نوع عناصر است.',
    formulaTex: '\\sum_{k=1}^{b} v_k(t) \\cdot i_k(t) = 0 \\quad \\text{یا} \\quad \\mathbf{v}^T \\mathbf{i} = 0',
    conditionsFa: [
      'بردار جریان‌ها باید در KCL صدق کند.',
      'بردار ولتاژها باید در KVL صدق کند.',
      'نیاز به هیچ پیش‌شرطی در مورد خطی یا غیرخطی بودن عناصر ندارد!'
    ],
    examTipsFa: [
      'اگر طراح سوال در کنکور عنصری عجیب، غیرخطی و متغیر با زمان داد، کلید حل در قضیه تلگان است!',
      'قضیه تلگان دو زمانه: ∑ vk(t1) · ik(t2) = 0 برای هر دو زمان دلخواه t1 و t2 برقرار است.'
    ],
    applicationsFa: [
      'اثبات پایستگی توان در سیستم‌های الکتریکی',
      'محاسبه حساسیت پارامترهای شبکه (Sensitivity Analysis)',
      'اثبات قضیه تقابل (Reciprocity)'
    ]
  },
  {
    id: 'superposition',
    titleFa: 'قضیه جمع آثار',
    titleEn: 'Superposition Theorem',
    discoveredByFa: 'برگرفته از اصل خطی بودن سیستم‌ها',
    statementFa: 'در هر مدار خطی شامل چند منبع مستقل، پاسخ هر شاخه برابر با مجموع جبری پاسخ‌هایی است که هر منبع مستقل به تنهایی ایجاد می‌کند.',
    formulaTex: 'x_{total} = \\sum_{k=1}^{m} x_k',
    conditionsFa: [
      'فقط برای سیستم‌های خطی معتبر است.',
      'تنها برای ولتاژ و جریان معتبر است؛ هرگز برای توان صدق نمی‌کند (P ≠ P1 + P2).'
    ],
    examTipsFa: [
      'منابع مستقل ولتاژ خاموش = اتصال کوتاه (سیم با مقاومت صفر).',
      'منابع مستقل جریان خاموش = مدار باز (سیم بریده با مقاومت بی‌نهایت).',
      'منابع وابسته هرگز خاموش نمی‌شوند!'
    ],
    applicationsFa: [
      'تحلیل مدارهای با چند منبع DC و AC همزمان',
      'تحلیل پاسخ فرکانسی و بسط سری فوریه'
    ]
  },
  {
    id: 'max-power',
    titleFa: 'قضیه انتقال حداکثر توان',
    titleEn: 'Maximum Power Transfer Theorem',
    discoveredByFa: 'موریتس فون یاکوبی (Moritz von Jacobi)',
    statementFa: 'حداکثر توان زمانی به یک بار مقاومتی RL منتقل می‌شود که مقاومت بار برابر با مقاومت درونی تونن مدار باشد: RL = Rth.',
    formulaTex: 'P_{max} = \\frac{V_{th}^2}{4 R_{th}} \\quad (R_L = R_{th})',
    conditionsFa: [
      'مدار منبع خطی و معادل تونن آن دارای Rth مثبت باشد.',
      'مقاومت بار RL قابل تنظیم باشد.'
    ],
    examTipsFa: [
      'در نقطه انتقال حداکثر توان، بازدهی مدار دقیقاً ۵۰٪ است.',
      'اگر بار RL ثابت باشد و ما بخواهیم مدار منبع را طوری بسازیم که بیشترین توان به بار برسد، باید Rth را تا حد امکان کوچک‌ترین (صفر) بسازیم!'
    ],
    applicationsFa: [
      'تطبیق امپدانس در فرستنده‌های رادیویی و آنتن‌ها',
      'طراحی تقویت‌کننده‌های صوتی و خروجی بلندگوها'
    ]
  },
  {
    id: 'millman',
    titleFa: 'قضیه میلمن (حل موازی شاخه‌ها)',
    titleEn: 'Millman\'s Theorem',
    discoveredByFa: 'جیکوب میلمن (Jacob Millman)',
    statementFa: 'ولتاژ میان دو گره که چندین شاخه موازی شامل منابع ولتاژ و مقاومت به آن‌ها متصل است، مستقیماً از نسبت مجموع جریان‌های اتصال کوتاه به مجموع رسانایی‌ها به دست می‌آید.',
    formulaTex: 'V_{AB} = \\frac{\\sum \\frac{E_k}{R_k} + \\sum I_k}{\\sum \\frac{1}{R_k}}',
    conditionsFa: [
      'تمام شاخه‌ها باید به صورت موازی بین دو گره اصلی A و B وصل شده باشند.'
    ],
    examTipsFa: [
      'یکی از سریع‌ترین فرمول‌ها برای حل تستی مدارهای تک‌حلقه‌ای و چندشاخه موازی در کنکور.'
    ],
    applicationsFa: [
      'تحلیل مدارهای مولتی ژنراتور',
      'محاسبه سریع پتانسیل نقطه نول در مدارهای سه‌فاز'
    ]
  }
];

export const resistorColorCodes: ResistorColorBand[] = [
  { color: 'black', nameFa: 'سیاه', digit: 0, multiplier: 1, hex: '#0f172a', textColor: '#ffffff' },
  { color: 'brown', nameFa: 'قهوه‌ای', digit: 1, multiplier: 10, tolerance: 1, hex: '#854d0e', textColor: '#ffffff' },
  { color: 'red', nameFa: 'قرمز', digit: 2, multiplier: 100, tolerance: 2, hex: '#dc2626', textColor: '#ffffff' },
  { color: 'orange', nameFa: 'نارنجی', digit: 3, multiplier: 1000, hex: '#ea580c', textColor: '#ffffff' },
  { color: 'yellow', nameFa: 'زرد', digit: 4, multiplier: 10000, hex: '#eab308', textColor: '#0f172a' },
  { color: 'green', nameFa: 'سبز', digit: 5, multiplier: 100000, tolerance: 0.5, hex: '#16a34a', textColor: '#ffffff' },
  { color: 'blue', nameFa: 'آبی', digit: 6, multiplier: 1000000, tolerance: 0.25, hex: '#2563eb', textColor: '#ffffff' },
  { color: 'violet', nameFa: 'بنفش', digit: 7, multiplier: 10000000, tolerance: 0.1, hex: '#9333ea', textColor: '#ffffff' },
  { color: 'gray', nameFa: 'خاکستری', digit: 8, multiplier: 100000000, tolerance: 0.05, hex: '#64748b', textColor: '#ffffff' },
  { color: 'white', nameFa: 'سفید', digit: 9, multiplier: 1000000000, hex: '#f8fafc', textColor: '#0f172a' },
  { color: 'gold', nameFa: 'طلایی', multiplier: 0.1, tolerance: 5, hex: '#d97706', textColor: '#ffffff' },
  { color: 'silver', nameFa: 'نقره‌ای', multiplier: 0.01, tolerance: 10, hex: '#94a3b8', textColor: '#0f172a' }
];

export interface FormulaGroup {
  id: string;
  titleFa: string;
  items: {
    titleFa: string;
    formula: string;
    descriptionFa: string;
  }[];
}

export const formulasHandbook: FormulaGroup[] = [
  {
    id: 'basic-laws',
    titleFa: 'قوانین بنیادی و تعاریف متغیرها',
    items: [
      {
        titleFa: 'قانون جریان کیرشف (KCL)',
        formula: '\\sum_{k} i_k(t) = 0',
        descriptionFa: 'مجموع جبری جریان‌های وارد شونده به هر گره یا سطح بسته برابر صفر است.'
      },
      {
        titleFa: 'قانون ولتاژ کیرشف (KVL)',
        formula: '\\sum_{k} v_k(t) = 0',
        descriptionFa: 'مجموع جبری ولتاژهای اطراف هر حلقه بسته برابر صفر است.'
      },
      {
        titleFa: 'توان لحظه‌ای در قرارداد غیرفعال',
        formula: 'p(t) = v(t) \\cdot i(t)',
        descriptionFa: 'اگر p > 0 باشد مصرف‌کننده و اگر p < 0 باشد تولیدکننده توان است.'
      },
      {
        titleFa: 'قانون اهم و رسانایی',
        formula: 'v = R \\cdot i \\iff i = G \\cdot v \\quad (G = 1/R)',
        descriptionFa: 'رابطه ولتاژ و جریان در مقاومت خطی با رسانایی G بر حسب زیمنس.'
      }
    ]
  },
  {
    id: 'elements-dynamics',
    titleFa: 'روابط مشخصه عناصر پویا (خازن و سلف)',
    items: [
      {
        titleFa: 'رابطه ولتاژ-جریان خازن',
        formula: 'i(t) = C \\frac{dv(t)}{dt} \\iff v(t) = v(t_0) + \\frac{1}{C}\\int_{t_0}^t i(\\tau) d\\tau',
        descriptionFa: 'جریان متناسب با مشتق ولتاژ است؛ در حالت DC خازن مانند مدار باز عمل می‌کند.'
      },
      {
        titleFa: 'انرژی ذخیره‌شده در خازن',
        formula: 'w_C(t) = \\frac{1}{2} C v^2(t)',
        descriptionFa: 'انرژی در میدان الکتریکی میان صفحات خازن ذخیره می‌شود.'
      },
      {
        titleFa: 'رابطه ولتاژ-جریان سلف',
        formula: 'v(t) = L \\frac{di(t)}{dt} \\iff i(t) = i(t_0) + \\frac{1}{L}\\int_{t_0}^t v(\\tau) d\\tau',
        descriptionFa: 'ولتاژ متناسب با مشتق جریان است؛ در حالت DC سلف مانند اتصال کوتاه عمل می‌کند.'
      },
      {
        titleFa: 'انرژی ذخیره‌شده در سلف',
        formula: 'w_L(t) = \\frac{1}{2} L i^2(t)',
        descriptionFa: 'انرژی در میدان مغناطیسی سیم‌پیچ سلف ذخیره می‌شود.'
      },
      {
        titleFa: 'سلف‌های تزویج‌شده با ضریب کوپلاژ',
        formula: 'v_1 = L_1 \\frac{di_1}{dt} \\pm M \\frac{di_2}{dt} \\quad , \\quad M \\le \\sqrt{L_1 L_2}',
        descriptionFa: 'علامت M با قرارداد نقطه تعیین می‌شود؛ ضریب کوپلاژ k = M / √(L1·L2) ≤ 1.'
      }
    ]
  },
  {
    id: 'dividers-equivalents',
    titleFa: 'تقسیم‌کننده‌ها، اتصالات و تبدیل‌ها',
    items: [
      {
        titleFa: 'تقسیم ولتاژ در اتصال سری',
        formula: 'V_k = V_s \\cdot \\frac{R_k}{\\sum R_i}',
        descriptionFa: 'ولتاژ با خود مقاومت رابطه مستقیم دارد.'
      },
      {
        titleFa: 'تقسیم جریان در دو مقاومت موازی',
        formula: 'I_1 = I_s \\cdot \\frac{R_2}{R_1 + R_2}',
        descriptionFa: 'جریان عبوری با مقاومت شاخه دیگر رابطه مستقیم دارد.'
      },
      {
        titleFa: 'تبدیل مثلث به ستاره (Δ به Y)',
        formula: 'R_1 = \\frac{R_b R_c}{R_a + R_b + R_c}',
        descriptionFa: 'حاصل‌ضرب مقاومت‌های مجاور تقسیم بر مجموع سه مقاومت مثلث.'
      },
      {
        titleFa: 'تبدیل ستاره به مثلث (Y به Δ)',
        formula: 'R_a = \\frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_1}',
        descriptionFa: 'مجموع ضرب‌های دوتایی تقسیم بر مقاومت روبه‌رو.'
      }
    ]
  },
  {
    id: 'opamps-summary',
    titleFa: 'روابط تقویت‌کننده‌های عملیاتی (آپ‌امپ)',
    items: [
      {
        titleFa: 'تقویت‌کننده وارون‌گر (Inverting)',
        formula: 'A_v = -\\frac{R_f}{R_1} \\implies v_o = -\\frac{R_f}{R_1} v_{in}',
        descriptionFa: 'دارای ۱۸۰ درجه اختلاف فاز و زمین مجازی در گره منفی.'
      },
      {
        titleFa: 'تقویت‌کننده ناوارون‌گر (Non-Inverting)',
        formula: 'A_v = 1 + \\frac{R_f}{R_1} \\implies v_o = \\left(1 + \\frac{R_f}{R_1}\\right) v_{in}',
        descriptionFa: 'هم‌فاز با ورودی، با بهره همواره بزرگ‌تر یا مساوی ۱.'
      },
      {
        titleFa: 'پیرو ولتاژ / بافر (Buffer)',
        formula: 'A_v = 1 \\implies v_o = v_{in}',
        descriptionFa: 'امپدانس ورودی بسیار بالا و امپدانس خروجی نزدیک صفر جهت ایزولاسیون طبقات.'
      },
      {
        titleFa: 'تقویت‌کننده تفاضلی (Differential Subtractor)',
        formula: 'v_o = \\frac{R_2}{R_1} (v_2 - v_1) \\quad (R_2/R_1 = R_4/R_3)',
        descriptionFa: 'تقویت تفاضل دو ورودی با حذف نویز حالت مشترک (CMRR).'
      }
    ]
  },
  {
    id: 'first-order-transients',
    titleFa: 'مدارهای مرتبه اول (گذرا)',
    items: [
      {
        titleFa: 'پاسخ پله مدار مرتبه اول (فرمول همگانی)',
        formula: 'x(t) = x(\\infty) + [x(0^+) - x(\\infty)] e^{-t/\\tau}',
        descriptionFa: 'پاسخ کامل از ترکیب پاسخ حالت ماندگار x(∞) و پاسخ گذرا به دست می‌آید.'
      },
      {
        titleFa: 'ثابت زمانی مدار RC',
        formula: '\\tau = R_{th} \\cdot C',
        descriptionFa: 'زمان لازم برای رسیدن به ۶۳.۲٪ مقدار نهایی در پاسخ پله.'
      },
      {
        titleFa: 'ثابت زمانی مدار RL',
        formula: '\\tau = \\frac{L}{R_{th}}',
        descriptionFa: 'در زمان t = 5τ، پاسخ به بیش از ۹۹.۳٪ مقدار نهایی رسیده و مدار ماندگار فرض می‌شود.'
      }
    ]
  },
  {
    id: 'three-phase-and-pu',
    titleFa: 'سیستم‌های سه‌فاز و روابط پریونیت (Per-Unit)',
    items: [
      {
        titleFa: 'توان مختلط سیستم سه‌فاز متعادل',
        formula: 'S_{3\\phi} = \\sqrt{3} V_{LL} I_L^* = 3 V_{ph} I_{ph}^*',
        descriptionFa: 'محاسبه توان با ولتاژ خط به خط V_LL و جریان خط I_L.'
      },
      {
        titleFa: 'امپدانس پایه در سیستم پریونیت',
        formula: 'Z_{base} = \\frac{(kV_{LL})^2}{MVA_{3\\phi}} \\quad [\\Omega]',
        descriptionFa: 'امپدانس مبنا بر حسب مربع کیلوولت خط تقسیم بر مگاولت‌آمپر سه‌فاز.'
      },
      {
        titleFa: 'فرمول تغییر پایه امپدانس پریونیت',
        formula: 'Z_{pu}^{new} = Z_{pu}^{old} \\left(\\frac{V_{base}^{old}}{V_{base}^{new}}\\right)^2 \\left(\\frac{S_{base}^{new}}{S_{base}^{old}}\\right)',
        descriptionFa: 'انتقال امپدانس کاتالوگ تجهیزات به مقادیر پایه جدید سیستم قدرت.'
      },
      {
        titleFa: 'مدار معادل ستاره ترانسفورماتور سه‌سیم‌پیچه',
        formula: 'Z_p = \\frac{1}{2}(Z_{ps} + Z_{pt} - Z_{st})',
        descriptionFa: 'استخراج امپدانس اولیه، ثانویه و ثالثیه از روی آزمون‌های اتصال کوتاه زوجی.'
      }
    ]
  },
  {
    id: 'transmission-and-powerflow',
    titleFa: 'خطوط انتقال و معادلات پخش بار شبکه',
    items: [
      {
        titleFa: 'اندوکتانس خطوط با هادی باندل',
        formula: 'L = 2 \\times 10^{-7} \\ln\\left(\\frac{GMD}{GMR_L}\\right) \\quad [\\mathrm{H/m}]',
        descriptionFa: 'کاهش راکتانس خط با افزایش GMR در هادی‌های چندتایی (باندل).'
      },
      {
        titleFa: 'بارگذاری امپدانس موجی (SIL)',
        formula: 'SIL = \\frac{(V_{LL, rated})^2}{Z_c} \\quad (Z_c \\approx \\sqrt{L/C})',
        descriptionFa: 'بارگذاری طبیعی بدون افت گرادیان ولتاژ که در آن توان راکتیو سلف و خازن تراز است.'
      },
      {
        titleFa: 'پدیده فرانتی در خطوط بی‌بار',
        formula: 'V_R = \\frac{V_S}{\\cos(\\beta l)} > V_S',
        descriptionFa: 'افزایش ولتاژ در انتهای خط انتقال سبک‌بار به دلیل شارژ خازنی خط.'
      },
      {
        titleFa: 'درایه‌های ماتریس ادمیتانس شین (Y_bus)',
        formula: 'Y_{ii} = y_{i0} + \\sum_{k} y_{ik} \\quad , \\quad Y_{ij} = -y_{ij}',
        descriptionFa: 'عناصر قطری مجموع ادمیتانس‌های متصل و عناصر غیرقطری قرینه ادمیتانس خط.'
      },
      {
        titleFa: 'معادله پخش بار خطی DC',
        formula: 'P_{ik} = \\frac{\\delta_i - \\delta_k}{X_{ik}} \\implies \\mathbf{P}_{bus} = \\mathbf{B}_{bus} \\boldsymbol{\\delta}',
        descriptionFa: 'حل خطی یک‌مرحله‌ای پخش بار برای بازار برق و تحلیل حوادث N-1.'
      }
    ]
  }
];

export const spiceSyntaxGuide = [
  {
    element: 'مقاومت (Resistor)',
    prefix: 'R',
    syntax: 'R<name> <node+> <node-> <value>',
    example: 'R1 1 2 4.7k',
    descriptionFa: 'مقاومت ۴.۷ کیلو اهم بین گره‌های ۱ و ۲'
  },
  {
    element: 'خازن (Capacitor)',
    prefix: 'C',
    syntax: 'C<name> <node+> <node-> <value> [IC=<v0>]',
    example: 'Cload 2 0 100u IC=5',
    descriptionFa: 'خازن ۱۰۰ میکروفاراد بین گره ۲ و زمین با ولتاژ اولیه ۵ ولت'
  },
  {
    element: 'سلف (Inductor)',
    prefix: 'L',
    syntax: 'L<name> <node+> <node-> <value> [IC=<i0>]',
    example: 'L1 2 3 10m IC=0',
    descriptionFa: 'سلف ۱۰ میلی‌هانری بین گره‌های ۲ و ۳'
  },
  {
    element: 'منبع ولتاژ مستقل (DC Voltage)',
    prefix: 'V',
    syntax: 'V<name> <node+> <node-> DC <value>',
    example: 'Vin 1 0 DC 12',
    descriptionFa: 'منبع ولتاژ مستقیم ۱۲ ولت بین گره ۱ و زمین'
  },
  {
    element: 'منبع جریان مستقل (DC Current)',
    prefix: 'I',
    syntax: 'I<name> <node+> <node-> DC <value>',
    example: 'Isource 0 2 DC 2.5m',
    descriptionFa: 'منبع جریان ۲.۵ میلی‌آمپر از زمین به سمت گره ۲'
  },
  {
    element: 'منبع ولتاژ کنترل‌شده با ولتاژ (VCVS)',
    prefix: 'E',
    syntax: 'E<name> <n+> <n-> <nc+> <nc-> <gain>',
    example: 'E1 3 0 1 2 10.0',
    descriptionFa: 'ولتاژ گره ۳ به زمین برابر ۱۰ برابر اختلاف ولتاژ گره ۱ و ۲'
  },
  {
    element: 'منبع جریان کنترل‌شده با ولتاژ (VCCS)',
    prefix: 'G',
    syntax: 'G<name> <n+> <n-> <nc+> <nc-> <gm>',
    example: 'G1 2 0 1 0 5m',
    descriptionFa: 'جریان تزریقی به گره ۲ برابر ۵ میلی‌زیمنس در ولتاژ گره ۱'
  },
  {
    element: 'دستور تحلیل نقطه کار DC',
    prefix: '.OP',
    syntax: '.OP',
    example: '.OP',
    descriptionFa: 'محاسبه ولتاژ تمام گره‌ها و توان مصرفی عناصر در حالت ماندگار DC'
  },
  {
    element: 'دستور تحلیل گذرا (Transient)',
    prefix: '.TRAN',
    syntax: '.TRAN <tstep> <tstop>',
    example: '.TRAN 1u 5m',
    descriptionFa: 'تحلیل پاسخ زمانی از لحظه صفر تا ۵ میلی‌ثانیه با گام ۱ میکروثانیه'
  }
];
