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
  arduinoOpOpenedBody: "Lo sketch dovrebbe essere stato caricato nell'IDE Arduino.",
  arduinoOpErrorUpVerTitle: "Compilazione o Caricamento fallito",
  arduinoOpErrorSketchTitle: "Sketch non torvato",
  arduinoOpErrorFlagTitle: "Argomento a linea di comando non valido",
  arduinoOpErrorFlagPrefTitle: "L'opzione passata al flag 'get-pref' non esiste",
  arduinoOpErrorIdeDirTitle: "Impossibile trovare l'IDE Arduino",
  arduinoOpErrorIdeDirBody: "La cartella del compilatore non è stata configurata.<br>" +
                            "Per favore selezionala nelle impostazioni.",
  arduinoOpErrorIdeOptionTitle: "Cosa dobbiamo fare con lo Sketch?",
  arduinoOpErrorIdeOptionBody: "L'opzione per lanciare l'IDE non è stata impostata.<br>" +
                               "Per favore configura l'opzione IDE nelle impostazioni.",
  arduinoOpErrorIdePortTitle: "Porta seriale non disponibile",
  arduinoOpErrorIdePortBody: "La porta seriale non è accessibile.<br>" +
                             "Per favore controlla che Arduino sia collegato correttamente al PC e seleziona la porta seriale nelle impostazioni.",
  arduinoOpErrorIdeBoardTitle: "Scheda Arduino sconosciuta",
  arduinoOpErrorIdeBoardBody: "La scheda Arduino non è stata configurata.<br>" +
                              "Per favore seleziona la scheda Arduino nelle opzioni.",
  /* Modals */
  noServerTitle: "L'applicazione Ardublockly non sta girando",
  noServerTitleBody: "<p>Affinché tutte le funzionalità di Ardublockly vengano abilitate, l'applicazione desktop di Ardublockly deve girare sul tuo computer.</p>" +
                     "<p>Se stai usando una versione online, non potrai configurare le opzioni e nemmeno caricare il codice dei blocchi su una scheda Arduino collegata al tuo PC.</p>" +
                     "<p>Le istruzioni di installazione si possono trovare nel <a href=\"https://github.com/carlosperate/ardublockly\">repository Ardublockly</a>.</p>" +
                     "<p>Se hai già installato Ardublockly, accertati che l'applicazione stia girando correttamente.</p>",
  noServerNoLangBody: "Se l'applicazione Ardublockly non sta girando, non si può cambiare lingua.",
  addBlocksTitle: "Blocchi aggiuntivi",
  /* Alerts */
  loadNewBlocksTitle: "Confermi il caricamento dei nuovi blocchi?",
  loadNewBlocksBody: "Caricando un nuovo file XML verranno sovrascritti i blocchi nell'area di lavoro attuale.<br>" +
                     "Sei sicuro di voler continuare?",
  discardBlocksTitle: "Confermi la cancellazione dei blocchi?",
  discardBlocksBody: "Ci sono %1 blocchi nell'area di lavoro.<br>" +
                     "Sei sicuro di volerli cancellare?",
  invalidXmlTitle: "XML non valido",
  invalidXmlBody: "Il file XML non è stato convertito correttamente. Per favore controlla il codice XML e riprova.",
  /* Tooltips */
  uploadingSketch: "Caricamento dello Sketch sulla scheda Arduino in corso...",
  uploadSketch: "Carica lo sketch sulla scheda Arduino",
  verifyingSketch: "Verifica dello Sketch in corso...",
  verifySketch: "Verifica lo Sketch",
  openingSketch: "Apertura dello Sketch nell'IDE di Arduino...",
  openSketch: "Apri lo Sketch nell'IDE",
  notImplemented: "Funzione non ancora implementata",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Annulla",
  return: "Ritorna",
  /* Cards */
  arduinoSourceCode: "Codice Sorgente Arduino",
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
  catComms: "Comunicazione",
};
