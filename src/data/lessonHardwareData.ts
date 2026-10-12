
export interface LessonHardwareData {
  lessonId: string;
  titleFa: string;
  subtitleFa: string;
  categoryFa: string;
  partNumbers: string[];
  visualKind: 'pcb-trace' | 'multimeter' | 'breadboard' | 'clamp-meter' | 'oscilloscope' | 'thermal-camera' | 'component-resistor' | 'component-capacitor' | 'component-inductor' | 'component-transformer' | 'power-supply' | 'potentiometer' | 'ldr-sensor' | 'motor-terminal' | 'test-points' | 'ground-loop' | 'diode-pack' | 'audio-thevenin' | 'transistor-norton' | 'audio-mixer' | 'rf-antenna' | 'ic-opamp-741' | 'opamp-breadboard' | 'ecg-diff-amp' | 'spice-gui' | 'spice-sweep';
  descriptionFa: string;
  labTipsFa: string[];
}

export const lessonHardwareData: Record<string, LessonHardwareData> = {
  'lesson-1-1': {
    lessonId: 'lesson-1-1',
    titleFa: 'مرز مدارهای فشرده روی برد الکترونیکی (PCB)',
    subtitleFa: 'تفاوت ترک ساده با خط میکروستریپ ۵۰ اهم فرکانس بالا',
    categoryFa: 'طراحی بورد الکترونیکی',
    partNumbers: ["FR4 Standard PCB", "50Ω Microstrip Trace", "SMA Connector"],
    visualKind: 'pcb-trace',
    descriptionFa: 'در فرکانس‌های گیگاهرتزی ترک‌های مسی به خط انتقال با امپدانس مشخصه تبدیل می‌شوند.',
    labTipsFa: ["در فرکانس‌های زیر ۱۰ مگاهرتز ترک‌ها فشرده فرض می‌شوند.", "در خطوط فرکانس بالا تطبیق امپدانس ۵۰ اهم الزامی است."]
  },
  'lesson-1-2': {
    lessonId: 'lesson-1-2',
    titleFa: 'سنجش توان و قطبیت با مولتی‌متر دیجیتال (Fluke DMM)',
    subtitleFa: 'تشخیص جهت جریان با پراب قرمز (+) و مشکی (COM)',
    categoryFa: 'ابزار دقیق اندازه‌گیری',
    partNumbers: ["Fluke 87V DMM", "10A Fused Input", "CAT IV 600V"],
    visualKind: 'multimeter',
    descriptionFa: 'مولتی‌متر دیجیتال جریان را به صورت سری می‌سنجد و علامت منفی نشانه تولید توان است.',
    labTipsFa: ["پراب مشکی همیشه به COM وصل شود.", "فیوز ورودی آمپرمتر را قبل از تست چک کنید."]
  },
  'lesson-1-3': {
    lessonId: 'lesson-1-3',
    titleFa: 'سیم‌بندی توپولوژی مدار روی بردبورد استاندارد MB-102',
    subtitleFa: 'تطبیق گره‌های مدار با ستون‌های ۵ تایی بردبورد',
    categoryFa: 'بردبورد آزمایشگاهی',
    partNumbers: ["MB-102 Solderless Breadboard", "22 AWG Jumper Wires"],
    visualKind: 'breadboard',
    descriptionFa: 'بردبوردهای آزمایشگاهی دارای ردیف‌های ۵ سوراخه متصل به هم هستند که نقش گره‌های مدار را دارند.',
    labTipsFa: ["سیم‌ها را کوتاه نگه دارید تا خازن پارازیتی ایجاد نشود.", "دو پایه مقاومت را در یک ستون نزنید تا اتصال کوتاه نشود."]
  },
  'lesson-1-4': {
    lessonId: 'lesson-1-4',
    titleFa: 'سنجش تجربی KCL با پراب کلمپ جریان اثر هال',
    subtitleFa: 'اندازه‌گیری جریان شاخه‌ها بدون بریدن سیم',
    categoryFa: 'تجهیزات اندازه‌گیری پیشرفته',
    partNumbers: ["Hall-Effect Clamp Meter", "Uni-T UT210E", "Resolution 1mA"],
    visualKind: 'clamp-meter',
    descriptionFa: 'پراب کلمپی میدان مغناطیسی سیم را سنجیده و KCL را با دقت میلی‌آمپر اثبات می‌کند.',
    labTipsFa: ["قبل از تست DC کلید Zero را بزنید.", "جمع جبری جریان‌های گره باید با خطای زیر ۱٪ صفر شود."]
  },
  'lesson-1-5': {
    lessonId: 'lesson-1-5',
    titleFa: 'ثبت افت ولتاژ حلقه‌ها با اسیلوسکوپ دیجیتال',
    subtitleFa: 'مشاهده همزمان ولتاژ منبع و افت ولتاژ مقاومت‌ها در KVL',
    categoryFa: 'اسیلوسکوپ آزمایشگاهی',
    partNumbers: ["Rigol DS1054Z 50MHz", "1X/10X Passive Probe", "Math Channel Add/Sub"],
    visualKind: 'oscilloscope',
    descriptionFa: 'با کانال‌های اسیلوسکوپ و تابع جبری ریاضی CH1 - CH2 افت پتانسیل حلقه تایید می‌شود.',
    labTipsFa: ["گیره سوسماری اسیلوسکوپ زمین Earth است و نباید به نقاط پرولتاژ بخورد.", "از پراب ۱۰X برای کاهش بارگذاری استفاده کنید."]
  },
  'lesson-1-6': {
    lessonId: 'lesson-1-6',
    titleFa: 'تصویربرداری حرارتی تابش گرما و تراز انرژی تلگان',
    subtitleFa: 'اثبات تجربی پایستگی توان و تبدیل کار به ژول گرمایی',
    categoryFa: 'ترموگرافی مهندسی',
    partNumbers: ["FLIR E4 Thermal Camera", "Infrared Sensor 80x60", "Emissivity 0.95"],
    visualKind: 'thermal-camera',
    descriptionFa: 'دوربین حرارتی نشان می‌دهد تمام توان جذب‌شده به گرما P = I²R تبدیل شده و انرژی هدر نمی‌رود.',
    labTipsFa: ["دمای مقاومت نباید از ۶۰ درجه بالاتر رود.", "تلگان بقای کامل انرژی را در شبکه اثبات می‌کند."]
  },
  'lesson-2-1': {
    lessonId: 'lesson-2-1',
    titleFa: 'دستگاه پاور آنالایزر دیجیتال رومیزی و تحلیل مثلث توان',
    subtitleFa: 'سنجش همزمان توان اکتیو، راکتیو و ظاهری در شبکه',
    categoryFa: 'تجهیزات سنجش توان شبکه',
    partNumbers: ["Yokogawa WT310 Power Analyzer", "0.1% Power Accuracy", "Direct 600V/20A"],
    visualKind: 'multimeter',
    descriptionFa: 'پاور آنالایزرهای صنعتی همزمان ولتاژ و جریان فاز را نمونه‌برداری کرده و مثلث توان P, Q, S را رسم می‌کنند.',
    labTipsFa: ["پاور آنالایزر اثر هارمونیک‌ها را بر ضریب توان حقیقی (True PF) نشان می‌دهد.", "اتصال ولتاژ موازی و جریان سری در دستگاه ضروری است."]
  },
  'lesson-2-2': {
    lessonId: 'lesson-2-2',
    titleFa: 'بانک‌های خازنی اصلاح ضریب توان صنعتی (APFC Panel)',
    subtitleFa: 'رگولاتورهای پله‌ای میکروپروسسوری برای جبران بار سلفی',
    categoryFa: 'تجهیزات پست‌های توزیع',
    partNumbers: ["Automatic Power Factor Controller", "Heavy Duty Shunt Capacitors 400V", "Detuned Reactors 7%"],
    visualKind: 'component-capacitor',
    descriptionFa: 'بانک‌های خازنی اتوماتیک با پایش ضریب توان، پله‌های خازنی را سوییچ کرده و ضریب توان را به ۰.۹۵ پس‌فاز می‌رسانند.',
    labTipsFa: ["برای جلوگیری از تشدید با هارمونیک‌ها از راکتور دیتون ۷٪ استفاده می‌شود.", "تخلیه خازن قبل از اتصال مجدد با مقاومت دشارژ الزامی است."]
  },
  'lesson-2-3': {
    lessonId: 'lesson-2-3',
    titleFa: 'ترمینال کلم الکتروموتورهای سه‌فاز و اتصالات ستاره/مثلث',
    subtitleFa: 'تخته کلم استاندارد با پایه‌های U1-V1-W1 و تسمه‌های اتصال',
    categoryFa: 'تجهیزات الکترومکانیک',
    partNumbers: ["Industrial Motor Terminal Block", "Brass Linking Strips", "Insulated Studs"],
    visualKind: 'motor-terminal',
    descriptionFa: 'با تغییر تسمه‌های تخته کلم، سیم‌بندی از ستاره (ولتاژ خط به نول) به مثلث (ولتاژ کامل خط) تبدیل می‌شود.',
    labTipsFa: ["در راه‌اندازی ستاره-مثلث جریان اولیه به یک‌سوم کاهش می‌یابد.", "اتصال نادرست تسمه‌ها موجب اتصال کوتاه دوفاز می‌شود."]
  },
  'lesson-2-4': {
    lessonId: 'lesson-2-4',
    titleFa: 'دیاگرام تک‌خطی تابلوی توزیع قدرت (Switchgear SLD)',
    subtitleFa: 'نقشه‌خوانی صنعتی با باس‌بارها، دژنکتورها و ترانس‌های جریان',
    categoryFa: 'تاسیسات برق فشار متوسط',
    partNumbers: ["Medium Voltage Switchgear 20kV", "Vacuum Circuit Breaker (VCB)", "Busbar 1250A"],
    visualKind: 'test-points',
    descriptionFa: 'در دیاگرام تک‌خطی تمام سه فاز به صورت یک خط واحد مدل شده و تجهیزات سوئیچگیر جانمایی می‌شوند.',
    labTipsFa: ["دیاگرام تک‌خطی نقشه مرجع اتاق فرمان و دیسپاچینگ پست است.", "مشخصات کلیدها و ظرفیت قطع اتصال کوتاه روی دیاگرام درج می‌شود."]
  },
  'lesson-2-5': {
    lessonId: 'lesson-2-5',
    titleFa: 'اینورترهای خورشیدی صنعتی با قابلیت ۴ ناحیه‌ای و STATCOM',
    subtitleFa: 'اینورترهای خورشیدی سنترال و استرینگ با پشتیبانی شبکه',
    categoryFa: 'الکترونیک قدرت مدرن',
    partNumbers: ["Sungrow 250kW Solar Inverter", "Grid-Forming Control", "IEEE 2800 Certified"],
    visualKind: 'power-supply',
    descriptionFa: 'اینورترهای مدرن با سوئیچ‌های IGBT توان اکتیو و راکتیو را به صورت آنی و مستقل در ۴ ناحیه تنظیم می‌کنند.',
    labTipsFa: ["در شب اینورتر به عنوان STATCOM ولتاژ شبکه را تثبیت می‌کند.", "تطبیق امپدانس و کنترل فیلتر LCL برای تزریق جریان تمیز حیاتی است."]
  },
  'lesson-3-1': {
    lessonId: 'lesson-3-1',
    titleFa: 'پکیج‌های فیزیکی مقاومت‌ها در صنعت الکترونیک',
    subtitleFa: 'از مقاومت‌های ۱/۴ وات تا آجری توان بالا و سایزهای SMD',
    categoryFa: 'قطعات الکترونیک',
    partNumbers: ["1/4W Metal Film 1%", "5W Ceramic Cement", "SMD 0805 1/8W"],
    visualKind: 'component-resistor',
    descriptionFa: 'مقاومت‌ها دارای کدهای رنگی و توان مجاز مشخص هستند و در دماهای بالا مقدارشان تغییر می‌کند.',
    labTipsFa: ["مقاومت‌های فیلم فلزی آبی دقت ۱٪ دارند.", "در مقاومت‌های توان بالا از محفظه آلومینیومی هیت‌سینک‌دار استفاده می‌شود."]
  },
  'lesson-3-2': {
    lessonId: 'lesson-3-2',
    titleFa: 'انواع خازن‌های فیزیکی، پلاریته و ولتاژ دی‌الکتریک',
    subtitleFa: 'خازن‌های الکترولیتی، سرامیکی دیسکی و پلی‌استر MKT',
    categoryFa: 'قطعات غیرفعال',
    partNumbers: ["Nichicon 100uF 50V", "Ceramic 100nF (104)", "Polyester Film MKT"],
    visualKind: 'component-capacitor',
    descriptionFa: 'خازن‌های الکترولیتی دارای قطب مثبت و منفی هستند و در صورت اتصال معکوس منفجر می‌شوند.',
    labTipsFa: ["ولتاژ کار خازن باید حداقل ۱.۵ برابر ولتاژ مدار باشد.", "خازن عدسی ۱۰۴ ظرفیت ۱۰۰ نانوفاراد دارد."]
  },
  'lesson-3-3': {
    lessonId: 'lesson-3-3',
    titleFa: 'سلف‌های سیم‌پیچی با هسته فریت و چوک‌های توروئیدی',
    subtitleFa: 'سیم مسی لاکی و هسته‌های فریت حلقوی فیلتر نویز',
    categoryFa: 'المان‌های مغناطیسی',
    partNumbers: ["Toroidal Power Inductor", "Radial Drum Choke 10mH", "Ferrite Bead Core"],
    visualKind: 'component-inductor',
    descriptionFa: 'هسته توروئیدی شار مغناطیسی را درون خود نگه داشته و مانع انتشار نویز الکترومغناطیسی می‌شود.',
    labTipsFa: ["از جریان اشباع سلف فراتر نروید تا اندوکتانس افت نکند.", "سلف‌ها دارای مقاومت سری DCR هستند."]
  },
  'lesson-3-4': {
    lessonId: 'lesson-3-4',
    titleFa: 'ترانسفورماتور فرکانس بالا و نشانگر فیزیکی نقطه فاز',
    subtitleFa: 'نقطه سفید روی بدنه برای تشخیص قطبیت و فاز سیم‌پیچ‌ها',
    categoryFa: 'تزویج مغناطیسی',
    partNumbers: ["EE-19 Ferrite Transformer", "Audio Coupling 600:600", "Pulse Transformer"],
    visualKind: 'component-transformer',
    descriptionFa: 'نقطه روی بدنه ترانسفورماتور پایه شماره ۱ را نشان می‌دهد که جریان ورودی به آن باعث ولتاژ هم‌فاز در ثانویه می‌شود.',
    labTipsFa: ["اتصال هم‌فاز ولتاژها را جمع و ناهم‌فاز تفریق می‌کند.", "با دستگاه LCR متر ضریب کوپلاژ k سنجیده می‌شود."]
  },
  'lesson-3-5': {
    lessonId: 'lesson-3-5',
    titleFa: 'منبع تغذیه متقارن دوبل آزمایشگاهی ±15V',
    subtitleFa: 'حالت‌های ولتاژ ثابت (CV) و جریان محدود (CC)',
    categoryFa: 'تجهیزات آزمایشگاهی',
    partNumbers: ["Dual Benchtop DC 0-30V 5A", "Tracking Mode ±15V", "GND Binding Post"],
    visualKind: 'power-supply',
    descriptionFa: 'منبع تغذیه رومیزی تغذیه متقارن ±15V را برای مدارهای تقویت‌کننده و آپ‌امپ فراهم می‌کند.',
    labTipsFa: ["ترمینال سبز زمین بدنه است و نباید با قطب منفی اشتباه شود.", "سقف جریان را برای جلوگیری از آسیب به قطعات تنظیم کنید."]
  },
  'lesson-4-1': {
    lessonId: 'lesson-4-1',
    titleFa: 'ترانسفورماتورهای قدرت پست‌های انتقال و تطبیق سطوح ولتاژ',
    subtitleFa: 'ترانسفورماتورهای اصلی نیروگاهی با نسبت ولتاژ ۲۳۰ به ۲۰ کیلوولت',
    categoryFa: 'تجهیزات پست فشار قوی',
    partNumbers: ["Power Transformer 230/20kV 160MVA", "OLTC Mechanism", "Buchholz Relay"],
    visualKind: 'power-supply',
    descriptionFa: 'ترانسفورماتورهای شبکه سطوح ولتاژ را جدا کرده و در سیستم پریونیت مرزهای ولتاژ پایه را تشکیل می‌دهند.',
    labTipsFa: ["یک مگاولت‌آمپر پایه مشترک (۱۰۰MVA) در تمام شبکه به کار می‌رود.", "ولتاژ پایه در هر منطقه متناسب با نسبت تبدیل اسمی ترانس تغییر می‌کند."]
  },
  'lesson-4-2': {
    lessonId: 'lesson-4-2',
    titleFa: 'پلاک مشخصات تجهیزات قدرت و تبدیل مقادیر نامی',
    subtitleFa: 'پلاک کارخانه سازنده با امپدانس درصدی %Z',
    categoryFa: 'مشخصات پلاک تجهیزات',
    partNumbers: ["Nameplate Data 100MVA 230kV", "Impedance 12.5%", "Vector Group YNd11"],
    visualKind: 'test-points',
    descriptionFa: 'امپدانس درج‌شده روی پلاک بر پایه توان خود قطعه است و باید با فرمول تغییر پایه به پایه سیستم منتقل شود.',
    labTipsFa: ["فرمول Z_new = Z_old · (V_old/V_new)² · (S_new/S_old) مبنای تمام مطالعات است.", "خطای نسبت ولتاژ با توان دوم به امپدانس ضرب می‌شود."]
  },
  'lesson-4-3': {
    lessonId: 'lesson-4-3',
    titleFa: 'دیاگرام امپدانس و راکتانس تک‌خطی شبکه انتقال',
    subtitleFa: 'مدار تک‌فاز معادل بدون ترانسفورماتور ایده‌آل',
    categoryFa: 'مدل‌سازی رایانه‌ای شبکه',
    partNumbers: ["Impedance Diagram 100MVA Base", "Per-Unit Transmission Model"],
    visualKind: 'test-points',
    descriptionFa: 'با تبدیل به پریونیت، تمام ترانسفورماتورهای ایده‌آل حذف شده و شبکه به امپدانس‌های سری و موازی بدل می‌شود.',
    labTipsFa: ["امپدانس پریونیت از هر دو سمت ترانسفورماتور یکسان است.", "محاسبات جریان و ولتاژ در تمام شبکه بدون ضریب تبدیل انجام می‌گیرد."]
  },
  'lesson-4-4': {
    lessonId: 'lesson-4-4',
    titleFa: 'سیم‌پیچ ثالثیه (Tertiary) در ترانسفورماتورهای قدرت ۲۳۰ کیلوولت',
    subtitleFa: 'سیم‌پیچی مثلث داخلی برای به دام انداختن هارمونیک سوم',
    categoryFa: 'ترانسفورماتورهای شبکه',
    partNumbers: ["Autotransformer 230/63/20kV", "Tertiary Delta 20kV", "Station Service Supply"],
    visualKind: 'component-transformer',
    descriptionFa: 'سیم‌پیچ ثالثیه مثلث به دام انداختن جریان‌های هارمونیک سوم و تغذیه مصرف داخلی پست را بر عهده دارد.',
    labTipsFa: ["امپدانس ستاره معادل سیم‌پیچ ثانویه یا ثالثیه می‌تواند منفی شود.", "آزمون‌های اتصال کوتاه زوجی برای استخراج Zps, Zpt, Zst به کار می‌روند."]
  },
  'lesson-5-1': {
    lessonId: 'lesson-5-1',
    titleFa: 'هادی‌های آلومینیومی مغز فولادی (ACSR) در خطوط ۴۰۰ کیلوولت',
    subtitleFa: 'هادی‌های تیپ Curlew و Drake با مقاومت کششی بالا',
    categoryFa: 'هادی‌های خطوط انتقال',
    partNumbers: ["ACSR Drake 795 kcmil", "Steel Core 7 Strands", "Aluminum 26 Strands"],
    visualKind: 'component-resistor',
    descriptionFa: 'هادی‌های ACSR استاندارد خطوط انتقال هوایی در جهان هستند و جریان بیشتر در لایه‌های آلومینیوم شارش می‌یابد.',
    labTipsFa: ["با افزایش دما مقاومت هادی بالا رفته و افت ولتاژ بیشتر می‌شود.", "برای کنترل دمای خط امروزه از سیستم‌های Dynamic Line Rating استفاده می‌شود."]
  },
  'lesson-5-2': {
    lessonId: 'lesson-5-2',
    titleFa: 'اسپیسرهای باندل هادی‌ها در دکل‌های ۴۰۰ کیلوولت (Bundle Spacers)',
    subtitleFa: 'اسپیسر دمپرهای ۴ تایی برای حفظ فاصله هادی‌ها در برابر باد',
    categoryFa: 'یراق‌آلات خطوط انتقال',
    partNumbers: ["Quad Bundle Spacer Damper", "Sub-conductor Spacing 45cm", "Vibration Damper"],
    visualKind: 'component-inductor',
    descriptionFa: 'باندل کردن هادی‌ها شعاع معادل GMR را به شدت افزایش داده و راکتانس خط و تلفات کرونا را کاهش می‌دهد.',
    labTipsFa: ["اسپیسرها مانع برخورد هادی‌ها در باد و نیروهای اتصال کوتاه می‌شوند.", "کاهش راکتانس خط موجب افزایش ظرفیت انتقال توان اکتیو می‌گردد."]
  },
  'lesson-5-3': {
    lessonId: 'lesson-5-3',
    titleFa: 'زنجیره مقره‌های بشقابی و پدیده کرونا در خطوط فشار قوی',
    subtitleFa: 'زنجیره‌های مقره شیشه‌ای و کامپوزیت سیلیکونی ۴۰۰ کیلوولت',
    categoryFa: 'عایق‌بندی خطوط انتقال',
    partNumbers: ["Toughened Glass Insulator Disc", "Silicone Rubber Composite", "Corona Ring Shield"],
    visualKind: 'component-capacitor',
    descriptionFa: 'حلقه کرونا (Corona Ring) شدت میدان الکتریکی را در انتهای زنجیره مقره توزیع کرده و مانع شکست دی‌الکتریک هوا می‌شود.',
    labTipsFa: ["جریان شارژ خازنی در کابل‌های زیرزمینی تا ۲۰ برابر خطوط هوایی است.", "در خطوط طولانی جریان شارژ نیاز به سلف موازی دارد."]
  },
  'lesson-5-4': {
    lessonId: 'lesson-5-4',
    titleFa: 'شبیه‌ساز تابلویی خطوط انتقال متوسط و تست مدار پای',
    subtitleFa: 'ماژول آزمایشگاهی خط انتقال با مدل پای اسمی و بار متغیر',
    categoryFa: 'تجهیزات آموزشی آزمایشگاه',
    partNumbers: ["Transmission Line Simulator Panel", "Variable R-L-C Load", "CT/PT Metering"],
    visualKind: 'oscilloscope',
    descriptionFa: 'ماژول‌های آزمایشگاهی خط انتقال با سلف‌ها و خازن‌های فشرده رفتار خط متوسط پای اسمی را بازسازی می‌کنند.',
    labTipsFa: ["در آزمایشگاه ماتریس ABCD با تست مدار باز و اتصال کوتاه استخراج می‌شود.", "رگولاسیون ولتاژ با تغییر بار سلفی به خازنی اندازه‌گیری می‌گردد."]
  },
  'lesson-5-5': {
    lessonId: 'lesson-5-5',
    titleFa: 'خطوط انتقال فوق توزیع طویل و تجهیزات جبران‌ساز سری',
    subtitleFa: 'خازن‌های سری (Series Capacitors) برای جبران راکتانس خطوط طویل',
    categoryFa: 'جبران‌سازی خطوط',
    partNumbers: ["Series Capacitor Bank 400kV", "Metal Oxide Varistor (MOV)", "Bypass Breaker"],
    visualKind: 'component-capacitor',
    descriptionFa: 'خازن‌های سری با خنثی کردن بخشی از راکتانس سلفی خط طویل، ظرفیت انتقال توان و پایداری شبکه را ارتقا می‌دهند.',
    labTipsFa: ["خازن سری امپدانس الکتریکی خط را به صورت مجازی کوتاه‌تر می‌کند.", "باید از تشدید زیرسنکرون (SSR) در توربین‌ها مراقبت شود."]
  },
  'lesson-5-6': {
    lessonId: 'lesson-5-6',
    titleFa: 'راکتورهای سلفی موازی ۴۰۰ کیلوولت در پست‌های انتقال',
    subtitleFa: 'سلف‌های موازی متصل به انتهای خط برای مهار پدیده فرانتی',
    categoryFa: 'کنترل ولتاژ خطوط',
    partNumbers: ["Shunt Reactor 50 MVAR 400kV", "Gapped Iron Core", "Oil Immersed"],
    visualKind: 'component-inductor',
    descriptionFa: 'سلف‌های موازی در زمان بار کم یا خروج بار با جذب توان راکتیو خازنی خط مانع افزایش ولتاژ فرانتی می‌شوند.',
    labTipsFa: ["در شب و روزهای تعطیل سلف‌های موازی در مدار وارد می‌شوند.", "خطوط انتقال زیرزمینی بدون راکتور موازی دچار شکست عایقی می‌شوند."]
  },
  'lesson-6-1': {
    lessonId: 'lesson-6-1',
    titleFa: 'تابلوهای رله و کنترل پست و اندازه‌گیری پتانسیل گره‌ها',
    subtitleFa: 'سیستم‌های حفاظت و کنترل دیجیتال با شین‌های فشار قوی',
    categoryFa: 'پست‌های فشار قوی',
    partNumbers: ["Digital Protection Relay", "Potential Transformer (PT)", "Substation Grounding Grid"],
    visualKind: 'test-points',
    descriptionFa: 'پتانسیل گره‌های شین پست نسبت به شبکه مش زمین (Ground Grid) توسط ترانس‌های ولتاژ PT خوانده می‌شود.',
    labTipsFa: ["مقاومت شبکه زمین پست باید کمتر از ۱ اهم باشد.", "تحلیل گره اساس نرم‌افزارهای دیسپاچینگ شبکه است."]
  },
  'lesson-6-2': {
    lessonId: 'lesson-6-2',
    titleFa: 'سیستم‌های مانیتورینگ جریان مش و رله‌های دیفرانسیل',
    subtitleFa: 'رله دیفرانسیل خط بر مبنای مقایسه جریان‌های ورودی و خروجی',
    categoryFa: 'حفاظت سیستم‌های قدرت',
    partNumbers: ["Differential Relay 87L", "Fiber Optic Current Channel", "Current Transformer 2000:5"],
    visualKind: 'clamp-meter',
    descriptionFa: 'رله‌های دیفرانسیل خط با پایش تفاضل جریان دو سر بر مبنای قوانین حلقه و مش، خطاهای درونی را در چند میلی‌ثانیه قطع می‌کنند.',
    labTipsFa: ["در شرایط عادی جمع جریان‌های دو سر خط باید تراز باشد.", "جریان شارژ خط در رله دیفرانسیل به صورت نرم‌افزاری فیلتر می‌شود."]
  },
  'lesson-6-3': {
    lessonId: 'lesson-6-3',
    titleFa: 'اتاق کنترل دیسپاچینگ و نرم‌افزار مدیریت انرژی (EMS)',
    subtitleFa: 'سامانه مانیتورینگ بلادرنگ ماتریس ادمیتانس Y_bus در شبکه ملی',
    categoryFa: 'دیسپاچینگ و اسکادا',
    partNumbers: ["SCADA / EMS Master Station", "State Estimation Engine", "Sparse Matrix Solver"],
    visualKind: 'spice-gui',
    descriptionFa: 'در مراکز دیسپاچینگ ملی، ماتریس Y_bus شبکه‌های چند هزار شینه با وضعیت کلیدها در هر لحظه به‌روزرسانی می‌شود.',
    labTipsFa: ["روش‌های فاکتورگیری خلوت (Sparse LU) حافظه رم را به شدت ذخیره می‌کنند.", "خروج هر خط تنها چند درایه از ماتریس Y_bus را تغییر می‌دهد."]
  },
  'lesson-6-4': {
    lessonId: 'lesson-6-4',
    titleFa: 'مکانیسم موتوری تپ‌چنجر زیر بار ترانسفورماتور (OLTC)',
    subtitleFa: 'مکانیزم مکانیکی سوئیچینگ تپ ترانس بدون قطع جریان برق',
    categoryFa: 'تپ‌چنجرهای قدرت',
    partNumbers: ["Reinhausen OLTC Motor Drive", "Vacuum Interrupter Tap", "Automatic Voltage Regulator"],
    visualKind: 'motor-terminal',
    descriptionFa: 'تپ‌چنجر زیر بار با جابجایی پله‌های سیم‌پیچ ولتاژ خروجی را در محدوده مجاز تثبیت می‌کند و تپ a را تغییر می‌دهد.',
    labTipsFa: ["هر پله تپ معمولاً ۱.۲۵ درصد تغییر ولتاژ ایجاد می‌کند.", "تغییر تپ در ماتریس Y_bus شین‌های متصل به ترانس را تعدیل می‌نماید."]
  },
  'lesson-6-5': {
    lessonId: 'lesson-6-5',
    titleFa: 'شبیه‌سازهای بلادرنگ شبکه قدرت (RTDS / OPAL-RT)',
    subtitleFa: 'سخت‌افزارهای محاسباتی فوق سریع برای آزمون رله‌ها با ماتریس Z_bus',
    categoryFa: 'شبیه‌سازی بلادرنگ',
    partNumbers: ["RTDS Simulator Hardware", "FPGA Processor Rack", "Hardware-in-the-Loop (HIL)"],
    visualKind: 'test-points',
    descriptionFa: 'دستگاه‌های RTDS با استفاده از پردازنده‌های موازی معادلات امپدانس شبکه را در میکروثانیه حل می‌کنند.',
    labTipsFa: ["برای تست رله‌های واقعی از خروجی‌های آنالوگ تقویت‌شده HIL استفاده می‌شود.", "ماتریس Z_bus در محاسبات امپدانس اتصال کوتاه کاربرد دارد."]
  },
  'lesson-7-1': {
    lessonId: 'lesson-7-1',
    titleFa: 'دستگاه تزریق جریان و آزمون امپدانس اتصال کوتاه شین',
    subtitleFa: 'دستگاه تست اولیه پست‌ها برای سنجش مقاومت تونن شبکه',
    categoryFa: 'تجهیزات تست رله',
    partNumbers: ["Omicron CMC 356 Relay Tester", "6-Phase Current Injection", "High Accuracy Measurement"],
    visualKind: 'audio-thevenin',
    descriptionFa: 'دستگاه‌های تست رله با تزریق جریان آزمون و سنجش پاسخ ولتاژ، امپدانس معادل تونن شبکه را در محل اندازه می‌گیرند.',
    labTipsFa: ["امپدانس تونن ظرفیت اتصال کوتاه MVA شین را تعیین می‌کند.", "پست‌های قوی دارای امپدانس تونن بسیار کوچک هستند."]
  },
  'lesson-7-2': {
    lessonId: 'lesson-7-2',
    titleFa: 'کلیدهای اتوماتیک قدرت و محدودکننده‌های جریان اتصال کوتاه',
    subtitleFa: 'دژنکتورهای گازی SF6 با ظرفیت قطع جریان اتصال کوتاه نورتن',
    categoryFa: 'کلیدهای قدرت',
    partNumbers: ["ABB 245kV SF6 Circuit Breaker", "Interrupting Capacity 40kA", "Spring Mechanism"],
    visualKind: 'test-points',
    descriptionFa: 'کلیدهای قدرت باید بتوانند جریان عظیم اتصال کوتاه نورتن (Isc) را بدون انفجار قطع کنند.',
    labTipsFa: ["گاز SF6 جرقه قوس الکتریکی را در کسری از ثانیه خنک و خاموش می‌کند.", "جریان نورتن حداکثر تنش الکترودینامیکی شین‌ها را رقم می‌زند."]
  },
  'lesson-7-3': {
    lessonId: 'lesson-7-3',
    titleFa: 'میز کنترل سیستم‌های انتقال انعطاف‌پذیر (FACTS)',
    subtitleFa: 'تجهیزات مدرن کنترل انتقال توان حداکثر نظیر TCSC و STATCOM',
    categoryFa: 'ادوات فکتس',
    partNumbers: ["Static VAR Compensator (SVC)", "Thyristor Switched Capacitor", "TCSC Control Cubicle"],
    visualKind: 'component-capacitor',
    descriptionFa: 'ادوات فکتس با تغییر سریع امپدانس خط انتقال توان بیشینه را به سمت سقف حرارتی خط هدایت می‌کنند.',
    labTipsFa: ["فکتس نوسانات گذرا را پس از خطا دمپ می‌کند.", "تطبیق توان با تریستورهای قدرت در چند میلی‌ثانیه انجام می‌شود."]
  },
  'lesson-7-4': {
    lessonId: 'lesson-7-4',
    titleFa: 'تراشه‌های پردازش سیگنال آنالوگ و ترانسدیوسرهای اندازه‌گیری',
    subtitleFa: 'ترانسدیوسرهای ولتاژ و جریان با آپ‌امپ‌های فوق کم‌نویز',
    categoryFa: 'ابزار دقیق صنعتی',
    partNumbers: ["LEM Current Transducer (Closed Loop)", "Precision Op-Amp OPA277", "Hall Element"],
    visualKind: 'ic-opamp-741',
    descriptionFa: 'ترانسدیوسرهای صنعتی با استفاده از آپ‌امپ‌های ابزاردقیق، ولتاژهای بالا را به سیگنال استاندارد ۴ تا ۲۰ میلی‌آمپر تبدیل می‌کنند.',
    labTipsFa: ["فیدبک منفی پایداری فوق‌العاده در برابر تغییرات دما ایجاد می‌کند.", "زمین مجازی در آپ‌امپ مانع از خطای پتانسیل نقطه صفر می‌شود."]
  },
  'lesson-7-5': {
    lessonId: 'lesson-7-5',
    titleFa: 'فیلترهای فعال آنالوگ و کارت‌های نمونه‌برداری دیسپاچینگ',
    subtitleFa: 'کارت‌های ورودی آنالوگ RTU با فیلترهای ضدپله آپ‌امپی',
    categoryFa: 'اتوماسیون پست',
    partNumbers: ["Anti-Aliasing Active Filter", "4-20mA to 0-5V Signal Conditioner", "Optocoupler Isolation"],
    visualKind: 'opamp-breadboard',
    descriptionFa: 'کارت‌های ورودی آنالوگ با آپ‌امپ‌های فیلتر پایین‌گذر فعال نویزهای فرکانس بالا را قبل از مبدل ADC حذف می‌کنند.',
    labTipsFa: ["بافر ولتاژ مانع افت سیگنال در کابل‌های طویل ارتباطی می‌شود.", "پری‌آمپلی‌فایر تفاضلی نویز زمین مشترک را خنثی می‌نماید."]
  },
  'lesson-8-1': {
    lessonId: 'lesson-8-1',
    titleFa: 'واحدهای اندازه‌گیری فازوری سنکرونیزه (PMU / WAMS)',
    subtitleFa: 'دستگاه‌های ثبت فازور ولتاژ با برچسب زمانی دقیق ماهواره‌ای GPS',
    categoryFa: 'پایش بلادرنگ شبکه',
    partNumbers: ["Schweitzer SEL-487E PMU", "GPS Time Receiver 1μs", "IEEE C37.118 Protocol"],
    visualKind: 'test-points',
    descriptionFa: 'دستگاه‌های PMU با نرخ ۶۰ نمونه در ثانیه زاویه و دامنه فازورهای ولتاژ شین‌ها را مستقیماً اندازه می‌گیرند.',
    labTipsFa: ["PMU مسئله غیرخطی پخش بار را به یک رابطه جبری خطی بلادرنگ تبدیل می‌کند.", "شناسایی نوسانات بین‌ناحیه‌ای در شبکه با PMU انجام می‌شود."]
  },
  'lesson-8-2': {
    lessonId: 'lesson-8-2',
    titleFa: 'نرم‌افزارهای تجاری پخش بار و مطالعات شبکه (PowerWorld / DIgSILENT)',
    subtitleFa: 'واسط کاربری و موتور محاسباتی نیوتن-رافسون در تحلیل سیستم‌ها',
    categoryFa: 'نرم‌افزارهای مهندسی',
    partNumbers: ["DIgSILENT PowerFactory 2024", "PowerWorld Simulator 23", "ETAP Enterprise"],
    visualKind: 'spice-gui',
    descriptionFa: 'نرم‌افزارهای صنعتی شبکه قدرت از روش نیوتن-رافسون در مختصات قطبی برای شبیه‌سازی پخش بار استفاده می‌کنند.',
    labTipsFa: ["نمودار گرافیکی توان‌های عبوری و ولتاژ شین‌ها به صورت زنده رنگ‌آمیزی می‌شود.", "خطوط با بار بیش از ۱۰۰٪ به رنگ قرمز چشمک‌زن درمی‌آیند."]
  },
  'lesson-8-3': {
    lessonId: 'lesson-8-3',
    titleFa: 'سامانه‌های محاسبات برخط بازار برق و تعیین قیمت‌های LMP',
    subtitleFa: 'موتورهای بهینه‌سازی و پخش بار خطی DC در بورس انرژی',
    categoryFa: 'مدیریت بازار برق',
    partNumbers: ["Locational Marginal Pricing (LMP)", "Security-Constrained Economic Dispatch", "Linear Programming Solver"],
    visualKind: 'spice-sweep',
    descriptionFa: 'در بازار برق با پخش بار خطی DC قیمت هر مگاوات ساعت برق در هر شین بر مبنای تراکم خطوط محاسبه می‌شود.',
    labTipsFa: ["پخش بار DC وابستگی قیمت‌ها به محدودیت‌های خط انتقال را نشان می‌دهد.", "سرعت حل در چند میلی‌ثانیه به مدیران بازار امکان حراج بلادرنگ می‌دهد."]
  },
  'lesson-8-4': {
    lessonId: 'lesson-8-4',
    titleFa: 'سیستم‌های خودکار کنترل ولتاژ و توان راکتیو (VQC / Volt-VAR)',
    subtitleFa: 'کنترل‌کننده‌های هوشمند پست برای سوئیچینگ خازن‌ها و پایش Q ژنراتورها',
    categoryFa: 'اتوماسیون هوشمند شبکه',
    partNumbers: ["Substation Volt-VAR Controller", "Automatic Tap Changer Relay", "Capacitor Bank Controller"],
    visualKind: 'power-supply',
    descriptionFa: 'سیستم‌های VQC با تنظیم پله‌های تپ و بانک‌های خازنی مانع خروج ژنراتورها از محدوده مجاز Q می‌شوند.',
    labTipsFa: ["اگر ژنراتور به سقف Q برسد پایداری ولتاژ آن شین آسیب‌پذیر می‌شود.", "خازن‌گذاری محلی ژنراتور را از تولید راکتیو بیش از حد بی‌نیاز می‌کند."]
  },
  'lesson-8-5': {
    lessonId: 'lesson-8-5',
    titleFa: 'محیط شبیه‌سازهای الکترومغناطیسی و گذرا (EMTP-RV / PSCAD)',
    subtitleFa: 'شبیه‌سازهای پیشرفته فرآیندهای سریع گذرا و صاعقه در شبکه',
    categoryFa: 'شبیه‌سازی گذراهای الکترومغناطیسی',
    partNumbers: ["PSCAD / EMTDC Software", "EMTP-RV Transient Engine", "Frequency-Dependent Line Model"],
    visualKind: 'oscilloscope',
    descriptionFa: 'نرم‌افزارهای کلاس EMTP با گام زمانی میکروثانیه پدیده‌های صاعقه، کلیدزنی خطوط و موج‌های سیار را شبیه‌سازی می‌کنند.',
    labTipsFa: ["نت‌لیست در این نرم‌افزارها رفتار غیرخطی برق‌گیرها و ترانس‌ها را مدل می‌کند.", "تحلیل‌های گذرا مبنای طراحی هماهنگی عایقی (Insulation Coordination) است."]
  },
};
