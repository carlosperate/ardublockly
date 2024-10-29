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
  compilerLocationDefault: "Путь к компилятору по умолчанию",
  sketchFolder: "Папка со скетчами",
  sketchFolderDefault: "Папка со скетчами по умолчанию",
  arduinoBoard: "Плата Arduino",
  arduinoBoardDefault: "Плата Arduino по умолчанию",
  comPort: "COM Порт",
  comPortDefault: "COM Порт по умолчанию",
  defaultIdeButton: "Кнопка IDE по умолчанию",
  defaultIdeButtonDefault: "IDE опции по умолчанию",
  language: "Язык",
  languageDefault: "Язык по умолчанию",
  sketchName: "Название скетча",
  /* Arduino console output */
  arduinoOpMainTitle: "Сообщения Arduino IDE",
  arduinoOpWaiting: "Ждем сообщений от Arduino IDE...",
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
  arduinoOpErrorIdeOptionBody: "Параметры запуска IDE не были настроены.<br>" +
                               "Выберите параметры закуска IDE в настройках.",
  arduinoOpErrorIdePortTitle: "Последовательный порт не доступен",
  arduinoOpErrorIdePortBody: "Последовательный порт не доступен.<br>" +
                             "Проверьте, правильно ли подключена плата Arduino и выберите последовательный порт в Настройках.",
  arduinoOpErrorIdeBoardTitle: "Неизвестная плата Arduino",
  arduinoOpErrorIdeBoardBody: "Плата Arduino не была задана.<br>" +
                              "Выберите соответствующую плату Arduino из списка.",
  /* Modals */
  noServerTitle: "Ardublockly не запущен",
  noServerTitleBody: "<p>Чтобы воспользоваться всеми возможностями Ardublockly, приложение Ardublockly для рабочего стола должно быть запущено на пользовательском компьютере.</p>" +
                     "<p>Если вы используете онлайн версию, вы не сможете изменять настройки а также загружать код в Arduino.</p>" +
                     "<p>Инструкции по установке можно найти на <a href=\"https://github.com/carlosperate/ardublockly\">Ardublockly repository</a>.</p>" +
                     "<p>Если Ardublockly уже установлен, убедитесь что приложение работает корректно.</p>",
  noServerNoLangBody: "Если приложение Ardublockly не запущено, язык не может быть изменен.",
  addBlocksTitle: "Дополнительные блоки",
  /* Alerts */
  loadNewBlocksTitle: "Загрузить новые блоки?",
  loadNewBlocksBody: "Загрузка нового XML файла заменит текущие блоки в рабочем поле.<br>" +
                     "Вы уверены что хотите продолжить?",
  discardBlocksTitle: "Удалить блоки?",
  discardBlocksBody: "Имеется %1 блоков в рабочем поле.<br>" +
                     "Вы действительно хотите удалить их?",
  invalidXmlTitle: "Неверный XML",
  invalidXmlBody: "XML файл не был загружен. Проверьте код XML и попробуйте снова.",
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
  blocksXml: "XML блоки",
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
  catComms: "Интерфейсы",
};
