var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "العربية",
  title: "Ardublockly",
  blocks: "قطع",
  /* Menu */
  open: "فتح",
  save: "حفظ",
  deleteAll: "حذف الكل",
  settings: "الإعدادات",
  documentation: "وثائق",
  reportBug: "بلّغ عن خلل",
  examples: "أمثلة",
  /* Settings */
  compilerLocation: "مكان المحول البرمجي",
  compilerLocationDefault: "مكان المحول البرمجي مجهول",
  sketchFolder: "ملف المسودة",
  sketchFolderDefault: "ملف المسودة مجهول",
  arduinoBoard: "لوحات الأردوينو",
  arduinoBoardDefault: "لوحات الأردوينو مجهولة",
  comPort: "COM المنفذ التسلسلي",
  comPortDefault: "مجهول COM المنفذ التسلسلي",
  defaultIdeButton: "زر IDE الافتراضي",
  defaultIdeButtonDefault: "خيارات IDE غير معروفة",
  language: "اللغة",
  languageDefault: "اللغة مجهولة",
  sketchName: "اسم المسودة",
  /* Arduino console output */
  arduinoOpMainTitle: "خرج اردوينو IDE",
  arduinoOpWaiting: "في انتظار إخراج IDE ...",
  arduinoOpUploadedTitle: "تم رفع مسودة البرنامج بنجاح",
  arduinoOpVerifiedTitle: "تم التحقق بنجاح من مسودة البرنامج",
  arduinoOpOpenedTitle: "مسودة البرنامج افتتحت في IDE",
  arduinoOpOpenedBody: "يجب أن يتم تحميل الرسم في IDE الأردوينو.",
  arduinoOpErrorTitle: "هناك خطأ ما",
  arduinoOpErrorIdContext_0: "لا يوجد خطأ",
  arduinoOpErrorIdContext_1: "فشل البناء أو التحميل.",
  arduinoOpErrorIdContext_2: "مسودة برنامج غير موجودة.",
  arduinoOpErrorIdContext_3: "وسيطة سطر الأوامر غير صالحة.",
  arduinoOpErrorIdContext_4: "الأفضلية التي تم تمريرها إلى علامة 'get-pref' غير موجودة.",
  arduinoOpErrorIdContext_5: "غير واضح ، ولكن اردوينو IDE أخطاء في بعض الأحيان مع هذا.",
  arduinoOpErrorIdContext_50: "رمز خطأ غير متوقع من IDE الأردوينو",
  arduinoOpErrorIdContext_51: "لا يمكن إنشاء ملف مسودة برنامج",
  arduinoOpErrorIdContext_52: "مسار غير صالح لإنشاء ملف مسودة برنامج داخلي",
  arduinoOpErrorIdContext_53: "غير قادر على إيجاد IDE الأردوينو<br>" +
                              "لم يتم تعيين دليل برنامج التحويل البرمجي بشكل صحيح.<br>" +
                              "الرجاء التأكد من صحة المسار في الإعدادات.",
  arduinoOpErrorIdContext_54: "ماذا نفعل مع مسودة البرنامج؟<br>" +
                              "لم يتم تعيين خيار تشغيل IDE.<br>" +
                              "يرجى تحديد خيار IDE في الإعدادات.",
  arduinoOpErrorIdContext_55: "المنفذ التسلسلي غير متوفر<br>" +
                              "المنفذ التسلسلي غير قابل للوصول.<br>" +
                              "يرجى التحقق مما إذا كان الأردوينو متصل بشكل صحيح بالكمبيوتر وتحديد المنفذ التسلسلي في الإعدادات.",
  arduinoOpErrorIdContext_56: "لوحة اردوينو غير معروفة<br>" +
                              "لم يتم تعيين لوحة الاردوينو.<br>" +
                              "يرجى تحديد لوحة الأردوينو المناسبة من الإعدادات.",
  arduinoOpErrorIdContext_52: "خطأ غير متوقع في الخادم.",
  arduinoOpErrorIdContext_64: "غير قادر على توزيع JSON.",
  arduinoOpErrorUnknown: "خطأ غير متوقع",
  /* Modals */
  noServerTitle: "التطبيق Ardublockly لا يعمل",
  noServerTitleBody: "<p>بالنسبة لجميع ميزات Ardublockly ، يجب تشغيل تطبيق سطح المكتب Ardublockly محليًا على جهاز الكمبيوتر الخاص بك.</p>" +
                     "<p>إذا كنت تستخدم إصدارًا عبر الإنترنت ، فلن تتمكن من تهيئة الإعدادات ولا تحمّل شفرة الكتل إلى Arduino.</p>" +
                     "<p>تعليمات التثبيت يمكن العثور عليها في <a href=\"https://github.com/carlosperate/ardublockly\">مستودع Ardublockly</a>.</p>" +
                     "<p>إذا كان لديك Ardublockly مثبتًا بالفعل ، فتأكد من تشغيل التطبيق بشكل صحيح.</p>",
  noServerNoLangBody: "إذا لم يتم تشغيل تطبيق Ardublockly لا يمكن تغيير اللغة بالكامل.",
  addBlocksTitle: "كتل إضافية",
  /* Alerts */
  loadNewBlocksTitle: "تحميل كتل جديدة؟",
  loadNewBlocksBody: "تحميل ملف XML جديد سيحل محل الكتل الحالية من مساحة العمل.<br>" +
                     "هل انت متأكد انك تريد المتابعة؟",
  discardBlocksTitle: "حذف كتل؟",
  discardBlocksBody: "هناك %1 كتل في مساحة العمل.<br>" +
                     "هل أنت متأكد من أنك تريد حذفها؟",
  invalidXmlTitle: "XML غير صالح",
  invalidXmlBody: "لم يتم تحليل ملف XML بنجاح إلى كتل. يرجى مراجعة كود XML والمحاولة مرة أخرى.",
  /* Tooltips */
  uploadingSketch: "جارٍ تحميل مسودة البرنامج في اردوينو ...",
  uploadSketch: "تحميل مسودة البرنامج لاردوينو",
  verifyingSketch: "جارٍ التحقق من مسودة البرنامج ...",
  verifySketch: "تحقق من مسودة البرنامج",
  openingSketch: "جارٍ فتح مسودة البرنامج في اردوينو IDE ...",
  openSketch: "افتح مسودة البرنامج في IDE",
  notImplemented: "وظيفة لم تنفذ بعد",
  /* Prompts */
  ok: "موافق",
  okay: "حسناً",
  cancel: "إلغاء",
  return: "عودة",
  /* Cards */
  arduinoSourceCode: "الشفرة المصدرية اردوينو ",
  blocksXml: "XML قطع",
  /* Toolbox Categories*/
  catLogic: "منطق",
  catLoops: "حلقات",
  catMath: "حساب",
  catText: "نص",
  catVariables: "متغيرات",
  catFunctions: "مهام",
  catInputOutput: "إدخال/إخراج",
  catTime: "وقت",
  catAudio: "سمعي",
  catMotors: "محركات",
  catComms: "الإتصالات",
};
