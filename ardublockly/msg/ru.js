var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "Русский",
  title: "Ardublockly",
  blocks: "Блоки",
  /* Menu */
  open: "Открыть",
  save: "Сохранить",
  deleteAll: "Удалить все",
  settings: "Настройки",
  documentation: "Документация",
  reportBug: "Сообщить об ошибке",
  examples: "Примеры",
  /* Settings */
  compilerLocation: "Путь к компилятору",
  compilerLocationDefault: "Путь к компилятору неизвестен",
  sketchFolder: "Папка со скетчами",
  sketchFolderDefault: "Папка со скетчами неизвестна",
  arduinoBoard: "Ардуино плата",
  arduinoBoardDefault: "Ардуино плата неизвестная",
  comPort: "COM Порт",
  comPortDefault: "COM Порт неизвестен",
  defaultIdeButton: "Кнопка IDE по умолчанию",
  defaultIdeButtonDefault: "IDE опции неизвестны",
  language: "Язык",
  languageDefault: "Язык неизвестен",
  sketchName: "Имя скетча",
  /* Arduino console output */
  arduinoOpMainTitle: "Arduino IDE вывод",
  arduinoOpWaiting: "Ждем IDE вывод...",
  arduinoOpUploadedTitle: "Скетч успешно загружен",
  arduinoOpVerifiedTitle: "Скетч успешно скомпилирован",
  arduinoOpOpenedTitle: "Скетч был открыт в Arduino IDE",
  arduinoOpOpenedBody: "Скетч должен быть загружен в Arduino IDE.",
  arduinoOpErrorUpVerTitle: "Компиляция или загрузка провалились",
  arduinoOpErrorSketchTitle: "Скетч не найден",
  arduinoOpErrorFlagTitle: "Неправильный аргумент командной строки",
  arduinoOpErrorFlagPrefTitle: "Preference passed to 'get-pref' flag does not exist",
  arduinoOpErrorIdeDirTitle: "Невозможно найти Arduino IDE",
  arduinoOpErrorIdeDirBody: "Не задан путь к компилятору.<br>" +
                            "Задайте путь в настройках.",
  arduinoOpErrorIdeOptionTitle: "Что нам нужно сделать с этим Скетчем?",
  arduinoOpErrorIdeOptionBody: "The launch IDE option has not been set.<br>" +
                               "Please select an IDE option in the Settings.",
  arduinoOpErrorIdePortTitle: "Последовательный порт не доступен",
  arduinoOpErrorIdePortBody: "Последовательный порт не доступен.<br>" +
                             "Please check if the Arduino is correctly connected to the PC and select the Serial Port in the Settings.",
  arduinoOpErrorIdeBoardTitle: "Неизвестная плата Arduino",
  arduinoOpErrorIdeBoardBody: "Плата Arduino не была задана.<br>" +
                              "Please select the appropriate Arduino Board from the settings.",
  /* Modals */
  noServerTitle: "Ardublockly не запущен",
  noServerTitleBody: "<p>For all the Ardublockly features to be enabled, the Ardublockly desktop application must be running locally on your computer.</p>" +
                     "<p>If you are using an online version you will not be able to configure the settings nor load the blocks code into an Arduino.</p>" +
                     "<p>Installation instruction can be found in the <a href=\"https://github.com/carlosperate/ardublockly\">Ardublockly repository</a>.</p>" +
                     "<p>If you have Ardublockly already installed, make sure the application is running correctly.</p>",
  noServerNoLangBody: "If the Ardublockly application is not running the language cannot be fully changed.",
  addBlocksTitle: "Дополнительные блоки",
  /* Alerts */
  loadNewBlocksTitle: "Загрузить новые блоки?",
  loadNewBlocksBody: "Loading a new XML file will replace the current blocks from the workspace.<br>" +
                     "Are you sure you want to proceed?",
  discardBlocksTitle: "Удалить блоки?",
  discardBlocksBody: "There are %1 blocks on the workspace.<br>" +
                     "Are you sure you want to delete them?",
  invalidXmlTitle: "Неверный XML",
  invalidXmlBody: "The XML file was not successfully parsed into blocks. Please review the XML code and try again.",
  /* Tooltips */
  uploadingSketch: "Загружаю код в Arduino...",
  uploadSketch: "Загрузить код в Arduino",
  verifyingSketch: "Проверка скетча...",
  verifySketch: "Проверить скетч на ошибки",
  openingSketch: "Открываем скетч в Arduino IDE...",
  openSketch: "Открыть скетч в Arduino IDE",
  notImplemented: "Функция еще не внедрена",
  /* Prompts */
  ok: "Ok",
  okay: "Okay",
  cancel: "Отменить",
  return: "Вернуться",
  /* Cards */
  arduinoSourceCode: "Исходный код Arduino",
  blocksXml: "Блоки в XML",
  /* Toolbox Categories*/
  catLogic: "Логика",
  catLoops: "Циклы",
  catMath: "Математика",
  catText: "Текст",
  catVariables: "Переменные",
  catFunctions: "Функции",
  catInputOutput: "Ввод/вывод",
  catTime: "Время",
  catAudio: "Аудио",
  catMotors: "Моторы",
  catComms: "Порты связи Comms",
};