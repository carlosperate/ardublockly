var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "Русский",
  title: "Ardublockly",
  blocks: "Blocks",
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
  defaultIdeButton: "Default IDE Button",
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
  arduinoOpErrorFlagTitle: "Неправильный command line аргумент",
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
  addBlocksTitle: "Additional Blocks",
  /* Alerts */
  loadNewBlocksTitle: "Load new blocks?",
  loadNewBlocksBody: "Loading a new XML file will replace the current blocks from the workspace.<br>" +
                     "Are you sure you want to proceed?",
  discardBlocksTitle: "Delete blocks?",
  discardBlocksBody: "There are %1 blocks on the workspace.<br>" +
                     "Are you sure you want to delete them?",
  invalidXmlTitle: "Invalid XML",
  invalidXmlBody: "The XML file was not successfully parsed into blocks. Please review the XML code and try again.",
  /* Tooltips */
  uploadingSketch: "Uploading Sketch into Arduino...",
  uploadSketch: "Upload Sketch to the Arduino",
  verifyingSketch: "Verifying Sketch...",
  verifySketch: "Verify the Sketch",
  openingSketch: "Opening Sketch in the Arduino IDE...",
  openSketch: "Open Sketch in IDE",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "Ok",
  okay: "Okay",
  cancel: "Отменить",
  return: "Вернуться",
  /* Cards */
  arduinoSourceCode: "Arduino Source Code",
  blocksXml: "Blocks XML",
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