var Ardublockly = Ardublockly || {};
Ardublockly.LOCALISED_TEXT = {
  translationLanguage: "Deutsch",
  title: "Ardublockly",
  blocks: "Blöcke",
  /* Menu */
  open: "Öffnen",
  save: "Speichern",
  deleteAll: "Alle löschen",
  settings: "Einstellungen",
  documentation: "Dokumentation",
  reportBug: "Fehler melden",
  examples: "Beispiele",
  /* Settings */
  compilerLocation: "Pfad zum Compiler",
  compilerLocationDefault: "Pfad zum Compiler unbekannt",
  sketchFolder: "Sketch Ordner",
  sketchFolderDefault: "Sketch Ordner unbekannt",
  arduinoBoard: "Arduino Board",
  arduinoBoardDefault: "Arduino Board unbekannt",
  comPort: "COM Port",
  comPortDefault: "COM Port unbekannt",
  defaultIdeButton: "Standard IDE Schaltfläche",
  defaultIdeButtonDefault: "Standardaktion für IDE Schaltfläche unbekannt",
  language: "Sprache",
  languageDefault: "Sprache unbekannt",
  sketchName: "Sketch Name",
  /* Arduino console output */
  arduinoOpMainTitle: "Arduino IDE Ausgabe",
  arduinoOpWaiting: "Wartet auf IDE Ausgabe...",
  arduinoOpUploadedTitle: "Sketch erfolgreich hochgeladen",
  arduinoOpVerifiedTitle: "Sketch erfolgreich geprüft",
  arduinoOpOpenedTitle: "Sketch in IDE geöffnet",
  arduinoOpOpenedBody: "Der Sketch sollte in der Arduino IDE geöffnet worden sein.",
  arduinoOpErrorTitle: "Ein Fehler ist aufgetreten",
  arduinoOpErrorIdContext_0: "Kein Fehler.",
  arduinoOpErrorIdContext_1: "Compilieren oder Hochladen fehlgeschlagen.",
  arduinoOpErrorIdContext_2: "Sketch wurde nicht gefunden.",
  arduinoOpErrorIdContext_3: "Ungültiges Befehlszeilen Argument.",
  arduinoOpErrorIdContext_4: "Preference-Flag welcher an 'get-pref' übergeben wurde existiert nicht.",
  arduinoOpErrorIdContext_5: "Unklarer Fehler, aber Arduino IDE wirft diesen Fehler manchmal.",
  arduinoOpErrorIdContext_50: "Unerwarteter Fehlercode der Arduino IDE",
  arduinoOpErrorIdContext_51: "Sketch Datei konnte nicht erstellt werden",
  arduinoOpErrorIdContext_52: "Ungültiger Pfad zur intern erstellen Sketch-Datei",
  arduinoOpErrorIdContext_53: "Arduino IDE kann nicht gefunden werden<br>" +
                              "Der Pfad zum Compiler wurde nicht korrekt festgelegt.<br>" +
                              "Bitte vergewissern sie sich, dass der Pfad in den Einstellungen korrekt festgelegt wurde.",
  arduinoOpErrorIdContext_54: "Was sollen wir mit dem Sketch machen?<br>" +
                              "Die Standardaktion zum Öffnen der IDE wurde nicht gesetzt.<br>" +
                              "Bitte wähle eine Standardaktion für die IDE in den Einstellungen.",
  arduinoOpErrorIdContext_55: "Serieller Port nicht verfügbar<br>" +
                              "Der serielle Port ist nicht verfügbar.<br>" +
                              "Bitte prüfe ob der Arduino korrekt an den PC angeschlossen ist und der Pfad in den Einstellungen korrekt gewählt wurde.",
  arduinoOpErrorIdContext_56: "Unbekanntes Arduino Board<br>" +
                              "Das Arduino Board wurde nicht ausgewählt.<br>" +
                              "Bitte wähle das passende Arduino Board in den Einstellungen.",
  arduinoOpErrorIdContext_52: "Unerwarteter Serverfehler.",
  arduinoOpErrorIdContext_64: "JSON konnte nicht geparsed werden.",
  arduinoOpErrorUnknown: "Unerwarteter Fehler",
  /* Modals */
  noServerTitle: "Ardublockly App läuft nicht",
  noServerTitleBody: "<p>Damit alle Ardublockly Features funktionieren, muss die Ardublockly Desktop App lokal auf ihrem Computer laufen.</p>" +
                     "<p>Falls sie eine Onlineversion nutzen, können sie weder die Einstellungen verändern, noch den Code der Blöcke auf den Arduino laden.</p>" +
                     "<p>Installations-Anweisungen können in der <a href=\"https://github.com/carlosperate/ardublockly\">Ardublockly Repository</a> nachgelesen werden.</p>" +
                     "<p>Sollte Ardublockly bereits installiert worden sein, vergewissern sie sich, dass die Anwendung korrekt läuft.</p>",
  noServerNoLangBody: "Wenn die Ardublockly Desktopp App nicht läuft, kann die Sprache nicht vollständig gewechselt werden.",
  addBlocksTitle: "Zusätzliche Blöcke",
  /* Alerts */
  loadNewBlocksTitle: "Neue Blöcke laden?",
  loadNewBlocksBody: "Das Laden einer neuen XML Datei überschreibt die aktuellen Blöcke im Arbeitsbereich.<br>" +
                     "Sind sie sicher, dass sie fortfahren möchten?",
  discardBlocksTitle: "Blöcke löschen?",
  discardBlocksBody: "Es befinden sich %1 Blöcke im Arbeitsbereich.<br>" +
                     "Sind sie sicher, dass sie diese löschen möchten?",
  invalidXmlTitle: "Ungültiges XML",
  invalidXmlBody: "Die XML Datei konnte nicht in Blöcke umgeschrieben werden. Bitte prüfen sie den XML Code und versuchen sie es erneut.",
  /* Tooltips */
  uploadingSketch: "Sketch wird zum Arduino hochgeladen...",
  uploadSketch: "Sketch zum Arduino hochladen",
  verifyingSketch: "Prüfe Sketch...",
  verifySketch: "Sketch prüfen",
  openingSketch: "Sketch wird in Arduino IDE geöffnet...",
  openSketch: "Sketch in Arduino IDE öffnen",
  notImplemented: "Funktion wurde noch nicht umgesetzt.",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Abbrechen",
  return: "Zurück",
  /* Cards */
  arduinoSourceCode: "Arduino Source Code",
  blocksXml: "Blöcke XML",
  /* Toolbox Categories*/
  catLogic: "Logik",
  catLoops: "Schleifen",
  catMath: "Mathematik",
  catText: "Text",
  catVariables: "Variabeln",
  catFunctions: "Funktionen",
  catInputOutput: "Ein-/Ausgänge",
  catTime: "Zeit",
  catAudio: "Audio",
  catMotors: "Motoren",
  catComms: "Kommunikation",
};
