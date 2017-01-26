var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "Italian",
  title: "Ardublockly",
  blocks: "Blocchi",
  /* Menu */
  open: "Apri",
  save: "Salva",
  deleteAll: "Cancella Tutto",
  settings: "Impostazioni",
  documentation: "Documentazione",
  reportBug: "Segnala un Errore",
  examples: "Esempi",
  /* Settings */
  compilerLocation: "Posizione del compilatore",
  compilerLocationDefault: "Posizione del compilatore sconosciuta",
  sketchFolder: "Cartella degli Sketch",
  sketchFolderDefault: "Cartella degli Sketch sconosciuta",
  arduinoBoard: "Scheda Arduino",
  arduinoBoardDefault: "Scheda Arduino Sconosciuta",
  comPort: "Porta COM",
  comPortDefault: "Porta COM sconosciuta",
  defaultIdeButton: "Pulsante di default dell'IDE",
  defaultIdeButtonDefault: "Opzioni IDE sconosciute",
  language: "Lingua",
  languageDefault: "Lingua sconosciuta",
  sketchName: "Nome dello Sketch",
  /* Arduino console output */
  arduinoOpMainTitle: "Output dell'IDE Arduino",
  arduinoOpWaiting: "In attesa dell'output dell'IDE...",
  arduinoOpUploadedTitle: "Sketch caricato con successo",
  arduinoOpVerifiedTitle: "Sketch verificato con successo",
  arduinoOpOpenedTitle: "Sketch aperto nell'IDE",
  arduinoOpOpenedBody: "Lo schetch dovrebbe essere stato caricato nell'IDE Arduino.",
  arduinoOpErrorUpVerTitle: "Compilazione o Caricamento fallito",
  arduinoOpErrorSketchTitle: "Sketch non torvato",
  arduinoOpErrorFlagTitle: "Argomento a linea di comando non valido",
  arduinoOpErrorFlagPrefTitle: "L'opzione passata al flag 'get-pref' non esiste",
  arduinoOpErrorIdeDirTitle: "Impossibile trovare l'IDE Arduino",
  arduinoOpErrorIdeDirBody: "The compiler directory has not been set.<br>" +
                            "Please set it in the Settings.",
  arduinoOpErrorIdeOptionTitle: "What should we do with the Sketch?",
  arduinoOpErrorIdeOptionBody: "The launch IDE option has not been set.<br>" +
                               "Please select an IDE option in the Settings.",
  arduinoOpErrorIdePortTitle: "Serial Port unavailable",
  arduinoOpErrorIdePortBody: "The Serial Port is not accessible.<br>" +
                             "Please check if the Arduino is correctly connected to the PC and select the Serial Port in the Settings.",
  arduinoOpErrorIdeBoardTitle: "Unknown Arduino Board",
  arduinoOpErrorIdeBoardBody: "The Arduino Board has not been set.<br>" +
                              "Please select the appropriate Arduino Board from the settings.",
  /* Modals */
  noServerTitle: "Ardublockly app not running",
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
  uploadSketch: "Carica lo sketch su Arduino",
  verifyingSketch: "Verifying Sketch...",
  verifySketch: "Verifica lo Sketch",
  openingSketch: "Opening Sketch in the Arduino IDE...",
  openSketch: "Apri lo Sketch nell'IDE",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Annulla",
  return: "Ritorna",
  /* Cards */
  arduinoSourceCode: "Arduino Source Code",
  blocksXml: "XML dei blocchi",
  /* Toolbox Categories*/
  catLogic: "Logica",
  catLoops: "Cicli",
  catMath: "Matematica",
  catText: "Testo",
  catVariables: "Variabili",
  catFunctions: "Funzioni",
  catInputOutput: "Input/Output",
  catTime: "Tempo",
  catAudio: "Audio",
  catMotors: "Motori",
  catComms: "Communicazione",
};
