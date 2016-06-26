var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "English",
  title: "Ardublockly",
  blocks: "Blocks",
  /* Menu */
  open: "Open",
  save: "Save",
  deleteAll: "Delete All",
  settings: "Settings",
  documentation: "Documentation",
  reportBug: "Report Bug",
  examples: "Examples",
  /* Settings */
  compilerLocation: "Compiler Location",
  compilerLocationDefault: "Compiler Location unknown",
  sketchFolder: "Sketch Folder",
  sketchFolderDefault: "Sketch Folder unknown",
  arduinoBoard: "Arduino Board",
  arduinoBoardDefault: "Arduino Board unknown",
  comPort: "COM Port",
  comPortDefault: "COM Port unknown",
  defaultIdeButton: "Default IDE Button",
  defaultIdeButtonDefault: "IDE options unknown",
  language: "Language",
  languageDefault: "Language unknown",
  sketchName: "Sketch Name",
  /* Arduino console output */
  arduinoOpMainTitle: "Arduino IDE output",
  arduinoOpWaiting: "Waiting for the IDE output...",
  arduinoOpUploadedTitle: "Successfully Uploaded Sketch",
  arduinoOpVerifiedTitle: "Successfully Verified Sketch",
  arduinoOpOpenedTitle: "Sketch opened in IDE",
  arduinoOpOpenedBody: "The sketch should be loaded in the Arduino IDE.",
  arduinoOpErrorUpVerTitle: "Build or Upload failed",
  arduinoOpErrorSketchTitle: "Sketch not found",
  arduinoOpErrorFlagTitle: "Invalid command line argument",
  arduinoOpErrorFlagPrefTitle: "Preference passed to 'get-pref' flag does not exist",
  arduinoOpErrorIdeDirTitle: "Unable to find Arduino IDE",
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
  uploadSketch: "Upload Sketch to the Arduino",
  verifyingSketch: "Verifying Sketch...",
  verifySketch: "Verify the Sketch",
  openingSketch: "Opening Sketch in the Arduino IDE...",
  openSketch: "Open Sketch in IDE",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancel",
  return: "Return",
  /* Cards */
  arduinoSourceCode: "Arduino Source Code",
  blocksXml: "Blocks XML",
  /* Toolbox Categories*/
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  catVariables: "Variables",
  catFunctions: "Functions",
  catInputOutput: "Input/Output",
  catTime: "Time",
  catAudio: "Audio",
  catMotors: "Motors",
  catComms: "Comms",
};
