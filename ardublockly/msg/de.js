var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "Deutsch",
  title: "senseBox",
  blocks: "Blöcke",
  /* Menu */
  open: "Blöcke öffnen",
  save: "Blöcke speichern",
  save_ino: "Sketch speichern",
  deleteAll: "Alles löschen",
  settings: "Einstellungen",
  documentation: "Dokumentation",
  reportBug: "Fehler melden",
  examples: "Beispiele",
  Blink: "Blinken einer LED",
  Display_print: "Displayausgabe",
  GPS: "GPS + Display",
  send_osem: "Sende an oSeM",
  /* Settings */
  compilerLocation: "Compiler Verzeichnis",
  compilerLocationDefault: "Compiler Verzeichnis unbekannt",
  sketchFolder: "Sketch Ordner",
  sketchFolderDefault: "Sketch Ordner unbekannt",
  arduinoBoard: "Arduino Board",
  arduinoBoardDefault: "Arduino Board unbekannt",
  comPort: "COM Port",
  comPortDefault: "COM Port unbekannt",
  defaultIdeButton: "Standard IDE Schalter",
  defaultIdeButtonDefault: "IDE Optionen unbekannt",
  language: "Sprache",
  languageDefault: "Sprache unbekannt",
  sketchName: "Sketch Name",
  /* Arduino console output */
  arduinoOpMainTitle: "Arduino IDE Ausgabe",
  arduinoOpWaiting: "Warte auf die Arduino IDE Ausgabe...",
  arduinoOpUploadedTitle: "Sketch erfolgreich übertragen",
  arduinoOpVerifiedTitle: "Sketch überprüft",
  arduinoOpOpenedTitle: "Sketch in IDE geöffnet",
  arduinoOpOpenedBody: "Der Sketch sollte in der IDE geöffnet sein.",
  arduinoOpErrorTitle: "Es gab einen Fehler",
  arduinoOpErrorIdContext_0: "Kein Fehler.",
  arduinoOpErrorIdContext_1: "Kommpilieren oder Übertragung fehlgeschlagen.",
  arduinoOpErrorIdContext_2: "Sketch nicht gefunden.",
  arduinoOpErrorIdContext_3: "Ungültiges Kommandozeilen argument.",
  arduinoOpErrorIdContext_4: "Die hinterlegten Benutzereinstellungen konnten nicht gefunden werden.",
  arduinoOpErrorIdContext_5: "Wir sind unsicher, aber die Arduino IDE kommt damit manchmal nicht zurecht.",
  arduinoOpErrorIdContext_50: "Unerwarteter Fehler in der Arduino IDE",
  arduinoOpErrorIdContext_51: "Sketch-Datei konnte nicht übertragen werden",
  arduinoOpErrorIdContext_52: "Ungültiges Verzeichnis um den Sketch zu erstellen",
  arduinoOpErrorIdContext_53: "Arduino IDE konnte nicht gefunden werden<br>" +
                              "Das Compiler Verzeichnis wurde nicht korrekt ausgewählt.<br>" +
                              "Bitte überprüfe den Pfad in den Einstellungen.",
  arduinoOpErrorIdContext_54: "Was sollen wir mit den Sketch machen?<br>" +
                              "Die Startoptionen der IDE wurden nicht gewählt.<br>" +
                              "Bitte wähle eine IDE Option in den Einstellungen.",
  arduinoOpErrorIdContext_55: "Serieller Port ist nicht vorhanden.<br>" +
                              "Der Serielle Port ist nicht erreichbar.<br>" +
                              "Bitte überprüfe ob der Mikrocontroller ordnungsgemäß mit dem Computer verbunden ist und wähle den Seriellen Port in den Einstellungen.",
  arduinoOpErrorIdContext_56: "Unbekanntes Arduino Board<br>" +
                              "Das Arduino Board wurde nicht festgelegt.<br>" +
                              "Bitte wähle ein geeignetes Arduino Board aus den Einstellungen.",
  arduinoOpErrorIdContext_52: "Unerwarteter Serverfehler.",
  arduinoOpErrorIdContext_64: "Übertragende JSON konnte nicht zerlegt werden",
  arduinoOpErrorUnknown: "Unerwarteter Fehler",
  /* Modals */
  noServerTitle: "Die Ardublockly-App ist nich gestartet.",
  noServerTitleBody: "<p>Damit alle Arduino-Funktionen verfügbar sind, muss das Ardublockly Programm lokal auf deinem Computer installiert sein.</p>" +
                     "<p>Wenn du die Online Version benutzt wird es nicht möglich sein Einstellungen vorzunehmen noch den Blockly-Code auf den Arduino zu übertragen.</p>" +
                     "<p>Die Installationsanleitung findest du hier: <a href=\"https://github.com/carlosperate/ardublockly\">Ardublockly repository</a>.</p>" +
                     "<p>Wenn du das Ardublockly Programm schon installiert hast, überprüfe ob es ordnungsgemäß läuft.</p>",
  noServerNoLangBody: "Solang das Ardublocky Programm nicht läuft kann die Sprache nicht vollständig geändert werden.",
  addBlocksTitle: "Zusätzliche Blöcke",
  copy_paste_mcu: "Kopiere die .BIN Datei auf deine senseBox MCU. <br> Wird die senseBox MCU im Explorer nicht angezeigt mache eine Doppelklick auf den Roten Reset Button.<br>"+
                  "<img class='animated-gif' src=\"img/copy_to_mcu.gif\"> <br>" +
                  "Benötigst du mehr Information und Hilfe schau ins <a href=\"https://sensebox.github.io/books-v2/blockly/de/\" target=\"_blank\">Blockly für senseBox Buch</a>",
  
  /* Alerts */
  loadNewBlocksTitle: "Neue Blöcke laden?",
  loadNewBlocksBody: "Das Laden der neuen XML-Datei ersetzt die aktuellen Blöcke.<br>" +
                     "Bist du sicher, dass du fortfahren willst?",
  discardBlocksTitle: "Blöcke löschen?",
  discardBlocksBody: "Es sind %1 Blöcke auf dem Arbeitsbereich.<br>" +
                     "Möchtest du diese wirklich löschen?",
  invalidXmlTitle: "Ungültige XML",
  invalidXmlBody: "Die XML-Datei konnte nicht in Blöcke zerlegt werden. Bitte überprüfe den XML-Code und versuche es erneut.",
  errorFilename: "Der Dateiname darf maximal aus 8 Zeichen bestehen",
  /* Tooltips */
  uploadingSketch: "Sketch wird übertragen...",
  uploadSketch: "Sketch erfolgreich übertragen!",
  verifyingSketch: "Sketch überprüfen...",
  verifySketch: "Sketch erfolgreich überprüft!",
  openingSketch: "Sketch wird in der Arduino-IDE geöffnet...",
  openSketch: "Sketch in Arduino IDE geöffnet!",
  notImplemented: "Diese Funktion ist noch nicht verfügbar",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Abbrechen",
  return: "Zurück",
  notshow: "Diesen Hinweis nicht mehr anzeigen",
  /* Cards */
  arduinoSourceCode: "Arduino Quellcode",
  blocksXml: "XML Blöcke",
  /* Toolbox Categories*/
  catSenseBox_Sensor:"senseBox Sensoren",
  catSenseBox_Output:"senseBox Ausgabe",
  catsenseBoxDisplay:"Display",
  catsenseBoxOutput_SD:"SD",
  catsenseBoxOutput_Web:"Web",
  catsenseBoxOutput_Webserver:"Webserver",
  catLogic: "Logik",
  catLoops: "Schleifen",
  catMath: "Mathematik",
  catText: "Text",
  catVariables: "Variablen",
  catFunctions: "Funktionen",
  catInputOutput: "Eingang/Ausgang",
  catTime: "Zeit",
  catAudio: "Audio",
  catMotors: "Motoren",
  catComms: "Kommunikation",
  catAdvanced: "Erweitert",
  code_copied: "Code wurde kopiert",
  save_to_clipboard: "In Zwischenablage kopieren",
  compile_sketch: "Sketch kompilieren",
  sketch_compiled: "Sketch wurde kompiliert",
};
