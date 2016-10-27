var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: 'Español',
  title: "Ardublockly",
  blocks: "Bloques",
  /* Menu */
  open: "Abrir",
  save: "Guardar",
  deleteAll: "Borrar todo",
  settings: "Opciones",
  documentation: "Documentación",
  reportBug: "Reportar Fallo",
  examples: "Ejemplos",
  /* Settings */
  compilerLocation: "Localización del Compilador",
  compilerLocationDefault: "Localización del Compilador desconocida",
  sketchFolder: "Carpeta del Sketch",
  sketchFolderDefault: "Carpeta del Sketch desconocida",
  arduinoBoard: "Placa de Arduino",
  arduinoBoardDefault: "Placa de Arduino desconocida",
  comPort: "Puerto COM",
  comPortDefault: "Puerto COM desconocido",
  defaultIdeButton: "Botón de IDE por defecto",
  defaultIdeButtonDefault: "Opción de IDE desconocida",
  language: "Lenguaje",
  languageDefault: "Lenguaje desconocido",
  sketchName: "Nombre del Sketch",
  /* Arduino console output */
  arduinoOpMainTitle: "Salida del Arduino IDE",
  arduinoOpWaiting: "Esperando la salida del Arduino IDE...",
  arduinoOpUploadedTitle: "Sketch subido exitosamente",
  arduinoOpVerifiedTitle: "Sketch verificado exitosamente",
  arduinoOpOpenedTitle: "Sketch abierto en el IDE",
  arduinoOpOpenedBody: "El sketch debería estar cargado en el IDE de Arduino.",
  arduinoOpErrorUpVerTitle: "Fallo en la construcción o subida",
  arduinoOpErrorSketchTitle: "Sketch no encontrado",
  arduinoOpErrorFlagTitle: "Argumento invalido en la linea de comandos",
  arduinoOpErrorFlagPrefTitle: "Preferencia pasada a la bandera 'get-pref' no existe",
  arduinoOpErrorIdeDirTitle: "Incapaz de encontrar el Arduino IDE",
  arduinoOpErrorIdeDirBody: "El directorio del compilador no ha sido configurado.<br>" +
                            "Por favor configuralo en las Opciones.",
  arduinoOpErrorIdeOptionTitle: "¿Que debemos hacer con el Sketch?",
  arduinoOpErrorIdeOptionBody: "La opción de cargar el Arduino IDE no ha sido configurada.<br>" +
                               "Por favor, selecciona una opción del IDE en las Opciones.",
  arduinoOpErrorIdePortTitle: "Puerto communicaciones no disponible",
  arduinoOpErrorIdePortBody: "El puerto de comunicaciones no es accesible.<br>" +
                             "Por favor, asegurate si el Arduino esta correctamente conectado al ordenador y si el puerto correcto esta selecionado en las Opciones.",
  arduinoOpErrorIdeBoardTitle: "Placa de Arduino desconocida",
  arduinoOpErrorIdeBoardBody: "La placa de Arduino no ha sido seleccionada.<br>" +
                              "Por favor, selecciona la placa adecuada en las Opciones.",
  /* Modals */
  noServerTitle: "Aplicación Ardublockly sin ejecutar",
  noServerTitleBody: "<p>Para que todas las funciones de Ardublockly estén disponibles, la aplicación de escritorio de Ardublockly debe de estar ejecutándose en su ordenador.</p>" +
                     "<p>Si estas usando una versión online no seras capaz de configurar las opciones o cargar el código de los bloques en un Arduino.</p>" +
                     "<p>Puedes encontrar las instrucciones de instalación en el <a href=\"https://github.com/carlosperate/ardublockly\">repositorio de Ardublockly</a>.</p>" +
                     "<p>Si ya tienes Ardublockly instalado, asegurate de que la aplicación este ejecutándose de forma correcta.</p>",
  noServerNoLangBody: "Si la aplicación de Ardublockly no esta ejecutándose el lenguaje no puede cargarse de forma completa.",
  addBlocksTitle: "Bloques Adicionales",
  /* Alerts */
  loadNewBlocksTitle: "¿Cargar bloques nuevos?",
  loadNewBlocksBody: "Cargar un nuevo archivo XML reemplazara los bloques actuales.<br>" +
                     "¿Estas seguro de proceder?",
  discardBlocksTitle: "¿Borrar todos los bloques?",
  discardBlocksBody: "Hay %1 bloques en el area de trabajo.<br>" +
                     "¿Estas seguro de borrarlos?",
  invalidXmlTitle: "XML invalido",
  invalidXmlBody: "El archivo XML no a sido convertido en bloques exitosamente. Por favor revisa el código XML e intentalo de nuevo.",
  /* Tooltips */
  uploadingSketch: "Subiendo el Sketch al Arduino...",
  uploadSketch: "Subir el Sketch al Arduino",
  verifyingSketch: "Verificando el Sketch...",
  verifySketch: "Verificar el Sketch",
  openingSketch: "Abriendo el Sketch en el Arduino IDE...",
  openSketch: "Abrir el Sketch en el IDE",
  notImplemented: "Función no implementada todavía",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancelar",
  return: "Volver",
  /* Cards */
  arduinoSourceCode: "Codigo de Arduino",
  blocksXml: "Bloques XML",
  /* Toolbox Categories*/
  catLogic: "Lógica",
  catLoops: "Secuencias",
  catMath: "Matemáticas",
  catText: "Texto",
  catVariables: "Variables",
  catFunctions: "Funciones",
  catInputOutput: "Input/Output",
  catTime: "Tiempo",
  catAudio: "Audio",
  catMotors: "Motores",
  catComms: "Comunicación",
};
