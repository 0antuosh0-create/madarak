export interface LessonFigureMeta {
  lessonId: string;
  figureSrc: string;
  figureNumberFa: string;
  bookPage: number;
  captionFa: string;
  keyInsightsFa: string[];
}

export const lessonFiguresData: Record<string, LessonFigureMeta> = {
  // ==========================================
  // MODULE 1: LUMPED CIRCUITS & KIRCHHOFF LAWS
  // ==========================================
  'lesson-1-1': {
    lessonId: 'lesson-1-1',
    figureSrc: '/figures/fig_lesson_1_1.png',
    figureNumberFa: 'شکل ۱-۱',
    bookPage: 4,
    captionFa: 'فرضیه مدارهای فشرده در برابر خطوط انتقال (d ≪ λ)',
    keyInsightsFa: [
      'انتشار اثرات در مدار فشرده آنی فرض شده و ابعاد هندسی d بسیار کوچکتر از طول موج کاری سیگنال است.',
      'متغیرهای مدار فقط تابعی از زمان هستند و معادلات ماکسول به معادلات دیفرانسیل معمولی تقلیل می‌یابند.'
    ]
  },
  'lesson-1-2': {
    lessonId: 'lesson-1-2',
    figureSrc: '/figures/fig_lesson_1_2.png',
    figureNumberFa: 'شکل ۱-۲',
    bookPage: 6,
    captionFa: 'قرارداد علامت در عناصر غیرفعال و تراز توان لحظه‌ای',
    keyInsightsFa: [
      'پیکان جریان به پایانه‌ای وارد می‌شود که ولتاژ آن دارای علامت مثبت قراردادی است (p = v·i).',
      'توان مثبت مصرفی و توان منفی تولیدی است؛ تراز توان کل شبکه در هر لحظه دقیقاً صفر است.'
    ]
  },
  'lesson-1-3': {
    lessonId: 'lesson-1-3',
    figureSrc: '/figures/fig_lesson_1_3.png',
    figureNumberFa: 'شکل ۱-۳',
    bookPage: 8,
    captionFa: 'توپولوژی مدار، گراف همبند، درخت و لینک‌ها',
    keyInsightsFa: [
      'یک درخت زیرگرافی همبند شامل تمام گره‌ها بدون هیچ حلقه بسته‌ای است و دقیقاً n-1 شاخه دارد.',
      'هر لینک یا وتر به همراه شاخه‌های درخت یک حلقه اساسی KVL منحصربه‌فرد تشکیل می‌دهد.'
    ]
  },
  'lesson-1-4': {
    lessonId: 'lesson-1-4',
    figureSrc: '/figures/fig_lesson_1_4.png',
    figureNumberFa: 'شکل ۱-۳-ب',
    bookPage: 7,
    captionFa: 'قانون جریان کیرشف (KCL) برای گره‌ها و سطوح بسته',
    keyInsightsFa: [
      'مجموع جبری جریان‌های خروجی از هر گره یا هر سطح بسته فرضی در هر لحظه مساوی صفر است.',
      'در یک مدار با n گره، دقیقاً n-1 معادله KCL مستقل خطی وجود دارد.'
    ]
  },
  'lesson-1-5': {
    lessonId: 'lesson-1-5',
    figureSrc: '/figures/fig_lesson_1_5.png',
    figureNumberFa: 'شکل ۱-۴',
    bookPage: 10,
    captionFa: 'قانون ولتاژ کیرشف (KVL) در حلقه‌های بسته مدار',
    keyInsightsFa: [
      'مجموع جبری افت ولتاژها در امتداد هر حلقه بسته در هر لحظه زمانی مساوی صفر است.',
      'ولتاژ میان دو گره کاملاً مستقل از مسیر پیمایش در شبکه است.'
    ]
  },
  'lesson-1-6': {
    lessonId: 'lesson-1-6',
    figureSrc: '/figures/fig_lesson_1_6.png',
    figureNumberFa: 'شکل ۱-۶',
    bookPage: 13,
    captionFa: 'قضیه شگفت‌انگیز تلگان و تعامد بردار ولتاژ و جریان',
    keyInsightsFa: [
      'رابطه ∑ vk · ik = 0 در تمام شبکه‌های فشرده مستقل از خطی یا غیرخطی بودن عناصر برقرار است.',
      'این قضیه مستقیماً ناشی از ساختار توپولوژیک KCL و KVL بوده و پایستگی انرژی را اثبات می‌کند.'
    ]
  },

  // ==========================================
  // MODULE 2: AC SINUSOIDAL & 3-PHASE SYSTEMS
  // ==========================================
  'lesson-2-1': {
    lessonId: 'lesson-2-1',
    figureSrc: '/figures/fig_lesson_2_1.png',
    figureNumberFa: 'شکل ۲-۱ (Wikimedia Commons)',
    bookPage: 24,
    captionFa: 'شکل‌موج‌های سینوسی سه‌فاز متقارن با اختلاف فاز ۱۲۰ درجه',
    keyInsightsFa: [
      'سه ولتاژ سینوسی متقارن با دامنه برابر و اختلاف فاز ۱۲۰ درجه (2π/3 رادیان) توزیع شده‌اند.',
      'توان لحظه‌ای در شبکه سه‌فاز متعادل کاملاً ثابت در زمان بوده و هیچ نوسان مضاعف فرکانسی ندارد.'
    ]
  },
  'lesson-2-2': {
    lessonId: 'lesson-2-2',
    figureSrc: '/figures/fig_lesson_2_2.png',
    figureNumberFa: 'شکل ۲-۲ (Wikimedia Commons)',
    bookPage: 35,
    captionFa: 'مدار سنجش ضریب توان، ولت‌متر، آمپرمتر و وات‌متر با بار RLC',
    keyInsightsFa: [
      'ضریب توان با نسبت توان اکتیو وات‌متر P به حاصلضرب مقادیر مؤثر ولتاژ و جریان (Vrms × Irms) تعیین می‌شود.',
      'نصب بانک خازنی موازی جریان ورودی خط را کاهش داده و ضریب توان را به یک نزدیک می‌سازد.'
    ]
  },
  'lesson-2-3': {
    lessonId: 'lesson-2-3',
    figureSrc: '/figures/fig_lesson_2_3.png',
    figureNumberFa: 'شکل ۲-۳ (Wikimedia Commons)',
    bookPage: 48,
    captionFa: 'اتصالات سه‌فاز ستاره (Y) و مثلث (Δ) و تبدیل متقابل امپدانس‌ها',
    keyInsightsFa: [
      'در اتصال ستاره ولتاژ خط √3 برابر ولتاژ فاز است (V_LL = √3 V_ph ∠30°).',
      'در اتصال مثلث ولتاژ خط برابر ولتاژ فاز بوده و جریان خط √3 برابر جریان فاز است.'
    ]
  },
  'lesson-2-4': {
    lessonId: 'lesson-2-4',
    figureSrc: '/figures/fig_lesson_2_4.png',
    figureNumberFa: 'شکل ۲-۴ (Wikimedia Commons)',
    bookPage: 58,
    captionFa: 'دیاگرام تک‌خطی (SLD) سیستم قدرت شامل ژنراتور، شین‌ها، بریکرها و ترانس‌ها',
    keyInsightsFa: [
      'شبکه سه‌فاز متقارن با یک فاز و نمادهای استاندارد بین‌المللی تجهیزات ترسیم می‌شود.',
      'محاسبات پخش توان بر مبنای توان سه‌فاز کل و ولتاژهای خط-به-خط شین‌ها انجام می‌گیرد.'
    ]
  },
  'lesson-2-5': {
    lessonId: 'lesson-2-5',
    figureSrc: '/figures/fig_lesson_2_5.png',
    figureNumberFa: 'شکل ۲-۵ (Wikimedia Commons)',
    bookPage: 72,
    captionFa: 'منحنی مشخصه قابلیت کارکرد ۴ ناحیه‌ای اینورتر متصل به شبکه (P-Q Curve)',
    keyInsightsFa: [
      'اینورترهای خورشیدی و بادی مدرن می‌توانند مستقل از توان اکتیو P، توان راکتیو Q تزریق یا جذب کنند.',
      'در حالت Q-at-Night اینورتر در ساعات تاریکی شب به عنوان STATCOM برای کنترل ولتاژ کار می‌کند.'
    ]
  },

  // ==========================================
  // MODULE 3: CIRCUIT ELEMENTS & MODELS
  // ==========================================
  'lesson-3-1': {
    lessonId: 'lesson-3-1',
    figureSrc: '/figures/fig_lesson_3_1.png',
    figureNumberFa: 'شکل ۳-۱ (کتاب جبه‌دار)',
    bookPage: 22,
    captionFa: 'مشخصه ولتاژ-جریان مقاومت خطی، رسانایی G و اتصال موازی مقاومت‌ها',
    keyInsightsFa: [
      'مقاومت خطی تغییرناپذیر با زمان در قانون اهم v = R·i صدق کرده و شیب خط رسانایی G = 1/R است.',
      'مدار باز (i = 0) و اتصال کوتاه (v = 0) دو نمونه ویژه از مقاومت‌های خطی هستند.'
    ]
  },
  'lesson-3-2': {
    lessonId: 'lesson-3-2',
    figureSrc: '/figures/fig_lesson_3_2.png',
    figureNumberFa: 'شکل ۳-۲ (کتاب جبه‌دار)',
    bookPage: 49,
    captionFa: 'معادلات حاکم بر خازن، رابطه بار-ولتاژ q(t) و پیوستگی ولتاژ',
    keyInsightsFa: [
      'جریان خازن آهنگ تغییرات بار الکتریکی و مشتق ولتاژ است: i(t) = dq/dt = C (dv/dt).',
      'ولتاژ خازن نمی‌تواند تغییر جهشی داشته باشد و در حالت DC خازن مانند مدار باز عمل می‌کند.'
    ]
  },
  'lesson-3-3': {
    lessonId: 'lesson-3-3',
    figureSrc: '/figures/fig_lesson_3_3.png',
    figureNumberFa: 'شکل ۳-۳ (کتاب جبه‌دار)',
    bookPage: 61,
    captionFa: 'معادلات حاکم بر سلف، پیوند شار مغناطیسی Φ(t) و قانون القای فارادی',
    keyInsightsFa: [
      'ولتاژ سلف مشتق پیوند شار مغناطیسی نسبت به زمان است: v(t) = dΦ/dt = L (di/dt).',
      'جریان سلف پیوسته است و در حالت DC سلف بدون افت ولتاژ مانند اتصال کوتاه رفتار می‌کند.'
    ]
  },
  'lesson-3-4': {
    lessonId: 'lesson-3-4',
    figureSrc: '/figures/fig_lesson_3_4.png',
    figureNumberFa: 'شکل ۳-۴ (Wikimedia Commons)',
    bookPage: 65,
    captionFa: 'مدار معادل T برای سلف‌های تزویج‌شده مغناطیسی و اندوکتانس متقابل M',
    keyInsightsFa: [
      'سلف‌های تزویج‌شده با سلف‌های معادل L1-M و L2-M و شاخه مشترک M مدل‌سازی می‌شوند.',
      'علامت اندوکتانس متقابل M مستقیماً با قرارداد نقطه (Dot Convention) تعیین می‌گردد.'
    ]
  },
  'lesson-3-5': {
    lessonId: 'lesson-3-5',
    figureSrc: '/figures/fig_lesson_3_5.png',
    figureNumberFa: 'شکل ۳-۵ (Wikimedia Commons)',
    bookPage: 73,
    captionFa: 'شماتیک مداری منبع ولتاژ وابسته به ولتاژ (VCVS) با نماد لوزی',
    keyInsightsFa: [
      'خروجی منبع وابسته برابر حاصلضرب ضریب بهره در ولتاژ دو سر مقاومت کنترلی است (a·vx).',
      'منابع وابسته رفتار ترانزیستورها و مدارهای مجتمع تقویت‌کننده را مدل‌سازی می‌کنند.'
    ]
  },

  // ==========================================
  // MODULE 4: PER-UNIT SYSTEM & TRANSFORMERS
  // ==========================================
  'lesson-4-1': {
    lessonId: 'lesson-4-1',
    figureSrc: '/figures/fig_lesson_4_1.png',
    figureNumberFa: 'شکل ۴-۱ (MIT / LibreTexts)',
    bookPage: 85,
    captionFa: 'دیاگرام تک‌خطی سیستم قدرت با ترانسفورماتورها و نواحی پایه ولتاژ',
    keyInsightsFa: [
      'توان پایه S_base در سرتاسر شبکه یکسان انتخاب می‌شود.',
      'ولتاژ پایه در مرز ترانسفورماتورها هماهنگ با نسبت تبدیل دور تغییر می‌یابد.'
    ]
  },
  'lesson-4-2': {
    lessonId: 'lesson-4-2',
    figureSrc: '/figures/fig_lesson_4_2.png',
    figureNumberFa: 'شکل ۴-۲',
    bookPage: 92,
    captionFa: 'فرمول طلایی تبدیل مقادیر پریونیت میان پایه‌های ولتاژ و توان نامی',
    keyInsightsFa: [
      'Z_new = Z_old · (V_old / V_new)² · (S_new / S_old) فرمول تبدیل امپدانس است.',
      'امپدانس واقعی بر حسب اهم (Ω) در تمامی تبدیل پایه‌ها بدون تغییر باقی می‌ماند.'
    ]
  },
  'lesson-4-3': {
    lessonId: 'lesson-4-3',
    figureSrc: '/figures/fig_lesson_4_3.png',
    figureNumberFa: 'شکل ۴-۳ (MIT / LibreTexts)',
    bookPage: 104,
    captionFa: 'حذف ترانسفورماتورهای ایده‌آل در دیاگرام امپدانس دستگاه پریونیت',
    keyInsightsFa: [
      'در دستگاه پریونیت نسبت دور تمام ترانس‌های ایده‌آل ۱:۱ شده و نماد ترانس حذف می‌شود.',
      'ترانسفورماتورها تنها با راکتانس نشتی سری در دیاگرام امپدانس پیوسته ظاهر می‌شوند.'
    ]
  },
  'lesson-4-4': {
    lessonId: 'lesson-4-4',
    figureSrc: '/figures/fig_lesson_4_4.png',
    figureNumberFa: 'شکل ۴-۴ (MIT / LibreTexts)',
    bookPage: 115,
    captionFa: 'اتصال ترانسفورماتور سه‌فاز ستاره-مثلث با قرارداد نقطه و بار سه‌فاز',
    keyInsightsFa: [
      'سیم‌پیچ‌های اولیه ستاره و ثانویه مثلث با پلاریته نقطه‌دار فازورها را جابجا می‌کنند.',
      'اتصال ترانسفورماتور سه‌فاز باعث شیفت زاویه‌ای ۳۰ درجه میان ولتاژهای خط می‌شود.'
    ]
  },

  // ==========================================
  // MODULE 5: TRANSMISSION LINE PARAMETERS
  // ==========================================
  'lesson-5-1': {
    lessonId: 'lesson-5-1',
    figureSrc: '/figures/fig_lesson_5_1.png',
    figureNumberFa: 'شکل ۵-۱ (Wikimedia Commons)',
    bookPage: 128,
    captionFa: 'تصویر مقطع واقعی هادی رشته‌ای ACSR با مغزی فولادی و لایه‌های آلومینیوم',
    keyInsightsFa: [
      'هسته فولادی گالوانیزه مقاومت مکانیکی و رشته‌های آلومینیومی خارجی هدایت جریان را تأمین می‌کنند.',
      'در فرکانس AC اثر پوستی سبب رانده شدن جریان به پوسته بیرونی و افزایش مقاومت تا ۵٪ می‌شود.'
    ]
  },
  'lesson-5-2': {
    lessonId: 'lesson-5-2',
    figureSrc: '/figures/fig_lesson_5_2.png',
    figureNumberFa: 'شکل ۵-۲ (Wikimedia Commons)',
    bookPage: 142,
    captionFa: 'تصویر اسپیسر دمپر برای باندل ۴ تایی هادی‌های خطوط انتقال فشار قوی',
    keyInsightsFa: [
      'باندل کردن هادی‌ها شعاع خودی معادل (GMR) را افزایش داده و اندوکتانس خط را کاهش می‌دهد.',
      'اسپیسرها فاصله هندسی میان هادی‌ها را حفظ کرده و ارتعاشات ناشی از باد را مهار می‌کنند.'
    ]
  },
  'lesson-5-3': {
    lessonId: 'lesson-5-3',
    figureSrc: '/figures/fig_lesson_5_3.png',
    figureNumberFa: 'شکل ۵-۳ (Wikimedia Commons)',
    bookPage: 156,
    captionFa: 'روش هادی‌های تصویر الکترواستاتیک و توزیع خطوط میدان بالای سطح زمین',
    keyInsightsFa: [
      'سطح هم‌پتانسیل زمین با بارهای تصویر قرینه در عمق منفی h مدل‌سازی می‌شود.',
      'اثر زمین ظرفیت خازنی خط انتقال را افزایش داده و جریان شارژ خازنی را تقویت می‌کند.'
    ]
  },
  'lesson-5-4': {
    lessonId: 'lesson-5-4',
    figureSrc: '/figures/fig_lesson_5_4.png',
    figureNumberFa: 'شکل ۵-۴ (Wikimedia Commons)',
    bookPage: 170,
    captionFa: 'مدار معادل پای اسمی (Nominal-π) خط انتقال متوسط با امپدانس سری و ادمیتانس طرفین',
    keyInsightsFa: [
      'خازن کل خط به دو بخش مساوی Y/2 در ابتدا و انتهای خط تقسیم می‌شود.',
      'ضرایب ماتریس دوقطبی انتقال: A = D = 1 + ZY/2 و B = Z و شرط تقارن AD - BC = 1 است.'
    ]
  },
  'lesson-5-5': {
    lessonId: 'lesson-5-5',
    figureSrc: '/figures/fig_lesson_5_5.png',
    figureNumberFa: 'شکل ۵-۵ (Wikimedia Commons)',
    bookPage: 184,
    captionFa: 'المان دیفرانسیلی dx خط انتقال و مدل پارامترهای توزیع‌شده معادلات تلگرافی',
    keyInsightsFa: [
      'معادلات موج توزیع‌شده با توابع هایپربولیک cosh و sinh پاسخ دقیق ولتاژ و جریان را تولید می‌کنند.',
      'امپدانس موجی Zc = √(z/y) برای خطوط هوایی مقداری تقریباً حقیقی حدود ۴۰۰ اهم است.'
    ]
  },
  'lesson-5-6': {
    lessonId: 'lesson-5-6',
    figureSrc: '/figures/fig_lesson_5_6.png',
    figureNumberFa: 'شکل ۵-۶ (Wikimedia Commons)',
    bookPage: 198,
    captionFa: 'دیاگرام فازوری ولتاژ و جریان در پدیده فرانتی در خطوط انتقال بی‌بار',
    keyInsightsFa: [
      'در حالت بی‌باری جریان خازنی خط سبب افزایش ولتاژ شین انتهایی نسبت به ابتدا می‌شود (VR > VS).',
      'برای مهار اضافه ولتاژ فرانتی در خطوط بلند از سلف‌های موازی شنت (Shunt Reactor) استفاده می‌شود.'
    ]
  },

  // ==========================================
  // MODULE 6: SYSTEMATIC NETWORK ANALYSIS & Y_BUS
  // ==========================================
  'lesson-6-1': {
    lessonId: 'lesson-6-1',
    figureSrc: '/figures/fig_lesson_6_1.png',
    figureNumberFa: 'شکل ۶-۱ (کتاب جبه‌دار)',
    bookPage: 94,
    captionFa: 'روش تحلیل گره مدار با اعمال معادلات KCL و مدیریت منبع ولتاژ با ابرگره',
    keyInsightsFa: [
      'معادلات بر مبنای KCL در گره‌های مستقل نوشته شده و پتانسیل گره‌ها مجهول سیستم است.',
      'حضور منبع ولتاژ میان دو گره با تشکیل ابرگره (Supernode) تحلیل می‌شود.'
    ]
  },
  'lesson-6-2': {
    lessonId: 'lesson-6-2',
    figureSrc: '/figures/fig_lesson_6_2.png',
    figureNumberFa: 'شکل ۶-۲ (کتاب جبه‌دار)',
    bookPage: 108,
    captionFa: 'روش تحلیل مش و جریان حلقه در مدارهای مسطح و تکنیک ابرمش',
    keyInsightsFa: [
      'معادلات KVL برای حلقه‌های مش نوشته شده و جریان‌های فرضی مش مجهول سیستم هستند.',
      'منبع جریان مشترک میان دو مش با حذف شاخه و تشکیل ابرمش (Supermesh) تحلیل می‌شود.'
    ]
  },
  'lesson-6-3': {
    lessonId: 'lesson-6-3',
    figureSrc: '/figures/fig_lesson_6_3.png',
    figureNumberFa: 'شکل ۶-۳ (Wikimedia Commons)',
    bookPage: 210,
    captionFa: 'شبکه قدرت ۳ شینه برای تشکیل ماتریس ادمیتانس شین Y_bus',
    keyInsightsFa: [
      'عنصر قطری Y_ii برابر مجموع ادمیتانس‌های تمام شاخه‌های متصل به شین i است.',
      'عنصر غیرقطری Y_ij برابر منفی ادمیتانس خط متصل میان شین i و j است.'
    ]
  },
  'lesson-6-4': {
    lessonId: 'lesson-6-4',
    figureSrc: '/figures/fig_lesson_6_4.png',
    figureNumberFa: 'شکل ۶-۴ (Wikimedia Commons)',
    bookPage: 224,
    captionFa: 'ترانسفورماتور شیفت فاز (بوستر متعامد) و کنترل پخش توان در خطوط موازی',
    keyInsightsFa: [
      'تغییر تپ و شیفت فاز زاویه ولتاژ را کنترل کرده و توان اکتیو عبوری از خطوط موازی را بازتوزیع می‌کند.',
      'مدار معادل π شامل شاخه سری a*y و دو شاخه موازی وابسته به تپ در طرفین است.'
    ]
  },
  'lesson-6-5': {
    lessonId: 'lesson-6-5',
    figureSrc: '/figures/fig_lesson_6_5.png',
    figureNumberFa: 'شکل ۶-۵',
    bookPage: 238,
    captionFa: 'کاهش کرون (Kron Reduction) و فاکتورگیری شین‌های بدون تزریق بار',
    keyInsightsFa: [
      'شین‌های با تزریق جریان صفر (IB = 0) با رابطه Y_red = Y_AA - Y_AB · Y_BB⁻¹ · Y_BA حذف می‌شوند.',
      'ماتریس کاهش‌یافته تعامل الکتریکی میان شین‌های باقیمانده را به طور دقیق حفظ می‌کند.'
    ]
  },

  // ==========================================
  // MODULE 7: NETWORK THEOREMS & OP-AMPS
  // ==========================================
  'lesson-7-1': {
    lessonId: 'lesson-7-1',
    figureSrc: '/figures/fig_lesson_7_1.png',
    figureNumberFa: 'شکل ۷-۱ (کتاب جبه‌دار)',
    bookPage: 138,
    captionFa: 'مدار معادل تونن، ولتاژ مدار باز Voc و مقاومت معادل دیده شده',
    keyInsightsFa: [
      'هر مدار خطی پیچیده از دید پایانه‌ها به یک منبع ولتاژ Vth سری با مقاومت Rth تبدیل می‌شود.',
      'Vth برابر ولتاژ مدار باز و Rth مقاومت دیده شده با خاموش کردن منابع مستقل است.'
    ]
  },
  'lesson-7-2': {
    lessonId: 'lesson-7-2',
    figureSrc: '/figures/fig_lesson_7_2.png',
    figureNumberFa: 'شکل ۷-۲ (Wikimedia Commons)',
    bookPage: 141,
    captionFa: 'مدار معادل نورتن، دوگانی با تونن و تبدیل مستقیم منابع مستقل',
    keyInsightsFa: [
      'معادل نورتن شامل منبع جریان IN = Isc موازی با مقاومت RN = Rth است.',
      'تبدیل منبع ولتاژ سری به منبع جریان موازی مشخصه خطی بار v = Vth - Rth·i را حفظ می‌کند.'
    ]
  },
  'lesson-7-3': {
    lessonId: 'lesson-7-3',
    figureSrc: '/figures/fig_lesson_7_3.png',
    figureNumberFa: 'شکل ۷-۳ (کتاب جبه‌دار)',
    bookPage: 109,
    captionFa: 'قضیه جمع آثار در مدارهای خطی و اصل برهم‌نهی اثر تک‌تک منابع',
    keyInsightsFa: [
      'پاسخ خروجی برابر جمع جبری پاسخ‌های ناشی از هر منبع مستقل به تنهایی است.',
      'در هر مرحله سایر منابع ولتاژ اتصال کوتاه و منابع جریان مدار باز می‌شوند.'
    ]
  },
  'lesson-7-4': {
    lessonId: 'lesson-7-4',
    figureSrc: '/figures/fig_lesson_7_4.png',
    figureNumberFa: 'شکل ۷-۴ (کتاب جبه‌دار)',
    bookPage: 183,
    captionFa: 'آپ‌امپ ایده‌آل، نماد، مشخصه انتقال غیرخطی و قوانین طلایی فیدبک',
    keyInsightsFa: [
      'قانون طلایی اول: جریان‌های ورودی آپ‌امپ صفر هستند (i+ = i- = 0 به دلیل مقاومت ورودی بی‌نهایت).',
      'قانون طلایی دوم: در فیدبک منفی ولتاژهای ورودی برابرند (v+ = v- یا اتصال کوتاه مجازی).'
    ]
  },
  'lesson-7-5': {
    lessonId: 'lesson-7-5',
    figureSrc: '/figures/fig_lesson_7_5.png',
    figureNumberFa: 'شکل ۷-۵ (کتاب جبه‌دار)',
    bookPage: 184,
    captionFa: 'تقویت‌کننده وارون‌گر، ناوارون‌گر و مدار انتگرال‌گیر با آپ‌امپ',
    keyInsightsFa: [
      'بهره مدار وارون‌گر Av = -R2 / R1 با پایانه وارون‌گر در زمین مجازی (Virtual Ground) است.',
      'با جایگزینی خازن در فیدبک، مدار به یک انتگرال‌گیر دقیق با رابطه vo = -1/(RC) ∫ vi dt تبدیل می‌شود.'
    ]
  },

  // ==========================================
  // MODULE 8: COMPUTER METHODS & LOAD FLOW
  // ==========================================
  'lesson-8-1': {
    lessonId: 'lesson-8-1',
    figureSrc: '/figures/fig_lesson_8_1.png',
    figureNumberFa: 'شکل ۸-۱ (Wikimedia Commons)',
    bookPage: 250,
    captionFa: 'دیاگرام شبکه ۳ شینه در مسئله پخش بار (شین اسلک، ژنراتوری و بار)',
    keyInsightsFa: [
      'شین اسلک مرجع ولتاژ و زاویه صفر است و کمبود توان اکتیو و تلفات شبکه را جبران می‌کند.',
      'شین‌های PV ولتاژ کنترل‌شده دارند و شین‌های PQ بارهای مصرفی اکتیو و راکتیو هستند.'
    ]
  },
  'lesson-8-2': {
    lessonId: 'lesson-8-2',
    figureSrc: '/figures/fig_lesson_8_2.png',
    figureNumberFa: 'شکل ۸-۲ (Wikimedia Commons)',
    bookPage: 265,
    captionFa: 'همگرایی مماس هندسی در الگوریتم نیوتن-رافسون و ماتریس ژاکوبی قطبی',
    keyInsightsFa: [
      'الگوریتم نیوتن-رافسون دارای همگرایی درجه دو (Quadratic Convergence) در ۳ تا ۵ تکرار است.',
      'ماتریس ژاکوبی مشتقات جزئی عدم‌تعادل‌های توان P و Q نسبت به زاویه δ و ولتاژ |V| را تشکیل می‌دهد.'
    ]
  },
  'lesson-8-3': {
    lessonId: 'lesson-8-3',
    figureSrc: '/figures/fig_lesson_8_3.png',
    figureNumberFa: 'شکل ۸-۳',
    bookPage: 278,
    captionFa: 'پخش بار تفکیک‌شده سریع (FDLF) و ماتریس‌های تجزیه B\' و B\'\'',
    keyInsightsFa: [
      'بر پایه تفکیک طبیعی کوپلاژ P-δ از Q-V در شبکه‌های انتقال، ماتریس‌های B\' و B\'\' مستقل می‌شوند.',
      'ماتریس‌ها کاملاً متقارن و ثابت در طول تکرارها بوده و سرعت محاسبه تا ۵ برابر افزایش می‌یابد.'
    ]
  },
  'lesson-8-4': {
    lessonId: 'lesson-8-4',
    figureSrc: '/figures/fig_lesson_8_4.png',
    figureNumberFa: 'شکل ۸-۴ (Wikimedia Commons)',
    bookPage: 290,
    captionFa: 'منحنی مشخصه قابلیت کارکرد (D-Curve) ژنراتور سنکرون و حدود توان راکتیو',
    keyInsightsFa: [
      'حد گرمایی روتور سقف Qmax و حد گرمایی استاتور/پایداری کف Qmin توان راکتیو را معین می‌کند.',
      'با تجاوز توان راکتیو از این حدود، شین ژنراتوری در الگوریتم پخش بار به شین بار PQ تبدیل می‌شود.'
    ]
  },
  'lesson-8-5': {
    lessonId: 'lesson-8-5',
    figureSrc: '/figures/fig_lesson_8_5.png',
    figureNumberFa: 'شکل ۸-۵ (کتاب جبه‌دار)',
    bookPage: 123,
    captionFa: 'شبیه‌سازی مدارها با نرم‌افزار SPICE، شماره‌گذاری گره‌ها و فایل ورودی',
    keyInsightsFa: [
      'هر مدار با شماره‌گذاری گره‌ها و معرفی پایانه‌ها به گره زمین مرجع 0 مدل‌سازی می‌شود.',
      'دستورهای .DC و .PRINT متغیرهای مدار مانند جریان شاخه‌ها و ولتاژ گره‌ها را شبیه‌سازی می‌کنند.'
    ]
  }
};
